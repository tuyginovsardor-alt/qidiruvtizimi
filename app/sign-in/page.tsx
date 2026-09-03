'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { authClient } from '@/lib/auth-client'

export default function SignInPage() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError('')
    const form = new FormData(event.currentTarget)
    const result = await authClient.signIn.email({ email: String(form.get('email')), password: String(form.get('password')) })
    if (result.error) setError('Email yoki parol noto‘g‘ri.')
    else { router.push('/profile'); router.refresh() }
    setBusy(false)
  }
  return <main className="auth-page"><form className="auth-card" onSubmit={submit}><p className="eyebrow">REPOQIDIRUV</p><h1>Kirish</h1><p>GitHub loyihalarini saqlash va profilingizni boshqarish uchun kiring.</p><label>Email<input name="email" type="email" required autoComplete="email" /></label><label>Parol<input name="password" type="password" required autoComplete="current-password" /></label>{error && <div className="auth-error" role="alert">{error}</div>}<button className="apply-button" disabled={busy}>{busy ? 'Kirilmoqda...' : 'Email bilan kirish'}</button><p className="auth-switch">Hisobingiz yo‘qmi? <Link href="/sign-up">Ro‘yxatdan o‘ting</Link></p></form></main>
}
