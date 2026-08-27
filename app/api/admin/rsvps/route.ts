import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getRSVPs } from '@/app/actions/rsvp'

export async function GET() {
  const jar = await cookies()
  if (jar.get('anniversary_admin')?.value !== 'authenticated') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  return NextResponse.json(await getRSVPs())
}
