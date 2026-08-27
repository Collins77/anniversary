import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  const { password } = await request.json()
  if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD) return NextResponse.json({ error: 'Incorrect password' }, { status: 401 })
  const jar = await cookies()
  jar.set('anniversary_admin', 'authenticated', { httpOnly: true, secure: true, sameSite: 'lax', maxAge: 60 * 60 * 8, path: '/' })
  return NextResponse.json({ ok: true })
}
