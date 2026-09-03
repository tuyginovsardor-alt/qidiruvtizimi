'use client'

import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'

type User = { name: string; email: string; image?: string | null }

export default function ProfileClient({ user }: { user: User }) {
  const router = useRouter()
  async function logout() { await authClient.signOut(); router.push('/'); router.refresh() }
  return <main className="profile-page"><div className="profile-head"><div className="profile-avatar">{user.name.slice(0, 1).toUpperCase()}</div><div><p className="eyebrow">PROFIL</p><h1>{user.name}</h1><p>{user.email}</p></div><button className="secondary-button" onClick={logout}>Chiqish</button></div><div className="profile-grid"><section className="profile-panel"><p className="eyebrow">ACTIVITY</p><h2>Faollik tarixi</h2><div className="activity-item"><span className="activity-dot" /><div><strong>RepoQidiruv hisobiga qo‘shildingiz</strong><p>Shaxsiy qidiruvlaringiz va saqlangan repolar shu yerda ko‘rinadi.</p></div></div><div className="activity-item"><span className="activity-dot" /><div><strong>Profil tayyor</strong><p>GitHub hisobingizni ulab, shaxsiy repository ma’lumotlariga kiring.</p></div></div></section><aside className="profile-panel"><p className="eyebrow">ACCOUNT</p><h2>Hisob sozlamalari</h2><button className="secondary-button full-width" onClick={() => router.push('/')}>Repolarga qaytish</button></aside></div></main>
}
