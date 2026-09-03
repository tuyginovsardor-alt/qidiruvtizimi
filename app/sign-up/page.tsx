'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { authClient } from '@/lib/auth-client'

export default function SignUpPage() {
  const router = useRouter(); const [error, setError] = useState(''); const [busy, setBusy] = useState(false)
  async function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setBusy(true); setError(''); const form = new FormData(event.currentTarget); const result = await authClient.signUp.email({ name: String(form.get('name')), email: String(form.get('email')), password: String(form.get('password')) }); if (result.error) setError('Hisob yaratib bo‘lmadi. Ma’lumotlarni tekshiring.'); else { router.push('/profile'); router.refresh() } setBusy(false) }
  return <main className="auth-page"><form className="auth-card" onSubmit={submit}><p className="eyebrow">REPOQIDIRUV</p><h1>Hisob yaratish</h1><p>Shaxsiy saqlangan repolar va activity tarixini boshqaring.</p><label>Ism<input name="name" required autoComplete="name" /></label><label>Email<input name="email" type="email" required autoComplete="email" /></label><label>Parol<input name="password" type="password" minLength={8} required autoComplete="new-password" /></label>{error && <div className="auth-error" role="alert">{error}</div>}<button className="apply-button" disabled={busy}>{busy ? 'Yaratilmoqda...' : 'Hisob yaratish'}</button><p className="auth-switch">Hisobingiz bormi? <Link href="/sign-in">Kiring</Link></p></form></main>
}
