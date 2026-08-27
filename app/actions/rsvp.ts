'use server'

import { revalidatePath } from 'next/cache'
import { neon } from '@neondatabase/serverless'

function getSql() {
  if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not configured')
  return neon(process.env.DATABASE_URL)
}

type RSVPInput = { preferredDate: string; preferredTime: string }

export async function submitRSVP(input: RSVPInput) {
  const preferredDate = input.preferredDate.trim()
  const preferredTime = input.preferredTime.trim()
  if (!/^\d{4}-\d{2}-\d{2}$/.test(preferredDate) || !/^\d{2}:\d{2}$/.test(preferredTime)) {
    return { ok: false, error: 'Please choose a date and preferred time.' }
  }
  const sql = getSql()
  await sql`INSERT INTO anniversary_rsvps (name, email, attendance, plus_one, message, preferred_date, preferred_time) VALUES ('Story guest', 'not-provided@anniversary.local', 'yes', false, NULL, ${preferredDate}, ${preferredTime})`
  if (process.env.RESEND_API_KEY && process.env.ANNIVERSARY_NOTIFICATION_EMAIL) {
    await fetch('https://api.resend.com/emails', { method: 'POST', headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ from: 'Anniversary RSVP <onboarding@resend.dev>', to: [process.env.ANNIVERSARY_NOTIFICATION_EMAIL], subject: 'New anniversary date preference', text: `Preferred date: ${preferredDate}\nPreferred time: ${preferredTime}` }) }).catch(() => undefined)
  }
  revalidatePath('/admin')
  return { ok: true }
}

export async function getRSVPs() {
  const sql = getSql()
  return sql`SELECT id, name, email, preferred_date, preferred_time, created_at FROM anniversary_rsvps ORDER BY created_at DESC`
}
