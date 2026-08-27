'use client'

import { useState } from 'react'

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  const [rsvps, setRsvps] = useState<any[]>([])
  async function login(e: React.FormEvent) { e.preventDefault(); const res = await fetch('/api/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }) }); if (!res.ok) return setStatus('That password did not match.') ; setLoggedIn(true); setStatus(''); const data = await fetch('/api/admin/rsvps').then(r => r.json()); setRsvps(data) }
  if (!loggedIn) return <main className="admin-shell"><div className="admin-card"><p className="eyebrow">Private page</p><h1>RSVPs</h1><p>Enter the admin password to see replies.</p><form onSubmit={login}><input aria-label="Admin password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" /><button type="submit">Unlock</button></form><span className="form-error">{status}</span></div></main>
  return <main className="admin-shell"><div className="admin-card admin-wide"><p className="eyebrow">Two years, together</p><h1>Guest replies</h1>{rsvps.length === 0 ? <p>No replies yet.</p> : <div className="rsvp-list">{rsvps.map((r) => <article key={r.id}><div><strong>{r.name}</strong><span>{r.email}</span><span>{r.preferred_date || 'No date'} · {r.preferred_time || 'No time'}</span></div><b>Preference</b></article>)}</div>}</div></main>
}
