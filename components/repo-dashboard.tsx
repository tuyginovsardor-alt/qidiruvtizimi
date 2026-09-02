'use client'

import { useMemo, useState } from 'react'
import {
  Bell,
  BookOpen,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Code2,
  Database,
  GitBranch,
  Heart,
  Home,
  Lightbulb,
  Menu,
  Moon,
  Plus,
  Search,
  Settings2,
  Sparkles,
  Star,
  Sun,
  TrendingUp,
  Trophy,
  Users,
  X,
  Zap,
} from 'lucide-react'

type Project = {
  name: string
  description: string
  language: string
  stars: string
  forks: string
  icon: string
  color: string
}

const projects: Project[] = [
  { name: 'chatgpt-web', description: 'ChatGPT web ilovasi', language: 'TypeScript', stars: '24.3k', forks: '3.1k', icon: '✦', color: 'bg-emerald-500' },
  { name: 'next.js', description: 'React framework production uchun', language: 'JavaScript', stars: '112k', forks: '22.1k', icon: 'N', color: 'bg-black' },
  { name: 'python-telegram-bot', description: 'Telegram Bot API uchun official Python framework', language: 'Python', stars: '12.8k', forks: '2.3k', icon: '🐍', color: 'bg-sky-600' },
  { name: 'supabase', description: 'Open source Firebase alternativi', language: 'TypeScript', stars: '47.2k', forks: '6.1k', icon: '↯', color: 'bg-emerald-950' },
  { name: 'react-hook-form', description: 'React form boshqarish uchun eng yaxshi kutubxona', language: 'TypeScript', stars: '32.6k', forks: '5.4k', icon: '◉', color: 'bg-orange-500' },
]

const recentProjects = [
  ['awesome-readme', 'README fayllar uchun ajoyib shablonlar to‘plami', 'JavaScript', '2.1k', '2 soat oldin'],
  ['fastapi-boilerplate', 'FastAPI uchun tayyor loyiha shabloni', 'Python', '1.6k', '5 soat oldin'],
  ['flutter-social-app', 'Flutter yordamida ijtimoiy tarmoq ilovasi', 'Dart', '890', '7 soat oldin'],
  ['django-ecommerce', 'Django bilan elektron tijorat tizimi', 'Python', '1.2k', '8 soat oldin'],
  ['ai-image-generator', 'Sun’iy intellekt bilan rasm generatsiya qilish', 'Python', '3.7k', '10 soat oldin'],
]

const navItems = [
  { label: 'Bosh sahifa', icon: Home },
  { label: 'Qidiruv', icon: Search },
  { label: 'Trenddagi loyihalar', icon: TrendingUp },
  { label: 'Top toifalar', icon: Trophy },
  { label: 'Saqlanganlar', icon: Heart },
  { label: 'Mening qidiruvlarim', icon: Sparkles },
  { label: 'Mening profilim', icon: Users },
]

function Logo() {
  return <div className="flex items-center gap-3"><div className="grid size-11 place-items-center rounded-xl bg-slate-950 shadow-sm"><img src="https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/github/light.svg" alt="GitHub" className="size-7" /></div><div><div className="text-[20px] font-bold tracking-tight text-slate-900">Repo<span className="text-violet-600">Qidiruv</span></div><div className="text-[11px] text-slate-500">GitHub loyihalarini qidirish</div></div></div>
}

function ProjectIcon({ project }: { project: Project }) {
  return <div className={`grid size-12 shrink-0 place-items-center rounded-full text-xl font-bold text-white shadow-sm ${project.color}`}>{project.icon}</div>
}

export function RepoDashboard() {
  const [query, setQuery] = useState('')
  const [activeNav, setActiveNav] = useState('Bosh sahifa')
  const [language, setLanguage] = useState('Barchasi')
  const [sort, setSort] = useState('Eng mos keluvchi')
  const [dark, setDark] = useState(false)
  const [mobileNav, setMobileNav] = useState(false)

  const filteredRows = useMemo(() => recentProjects.filter(([name, description, lang]) => `${name} ${description} ${lang}`.toLowerCase().includes(query.toLowerCase()) && (language === 'Barchasi' || lang === language)), [query, language])

  return <div className={dark ? 'app-shell dark-mode' : 'app-shell'}>
    <aside className={mobileNav ? 'sidebar mobile-open' : 'sidebar'}>
      <div className="sidebar-top"><Logo /><button className="icon-button mobile-close" aria-label="Menyuni yopish" onClick={() => setMobileNav(false)}><X /></button></div>
      <nav className="nav-list" aria-label="Asosiy menyu">{navItems.map(({ label, icon: Icon }) => <button key={label} onClick={() => { setActiveNav(label); setMobileNav(false) }} className={activeNav === label ? 'nav-item active' : 'nav-item'}><Icon /><span>{label}</span></button>)}</nav>
      <div className="sidebar-section"><p className="eyebrow">KATEGORIYALAR</p>{[['Web dasturlash', BookOpen], ['Mobil ilovalar', Code2], ['Telegram botlar', Zap], ['Sun’iy intellekt', Sparkles], ['O‘yinlar', Trophy], ["Ma’lumotlar bazasi", Database], ['DevOps', GitBranch]].map(([label, Icon]) => <button className="nav-item" key={label as string}><Icon /><span>{label as string}</span></button>)}</div>
      <div className="sidebar-section helpful"><p className="eyebrow">FOYDALI</p><button className="nav-item"><Plus /><span>Loyiha qo‘shish</span></button><button className="nav-item"><Lightbulb /><span>Fikr bildirish</span></button><button className="nav-item"><CircleHelp /><span>Yordam</span></button></div>
      <div className="token-card"><strong>GitHub token ulang</strong><p>Ko‘proq natija va cheklanmagan qidiruv uchun GitHub tokeningizni ulang.</p><button>Ulash</button></div>
    </aside>

    <div className="main-area">
      <header className="topbar"><button className="icon-button menu-button" aria-label="Menyuni ochish" onClick={() => setMobileNav(true)}><Menu /></button><div className="search-wrap"><Search /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Loyiha nomi, texnologiya yoki kalit so‘z..." aria-label="Loyiha qidirish" /><button onClick={() => setQuery(query.trim())}>Qidirish</button></div><div className="top-actions"><button className="icon-button" aria-label="Temani almashtirish" onClick={() => setDark(!dark)}>{dark ? <Sun /> : <Moon />}</button><button className="icon-button" aria-label="Bildirishnomalar"><Bell /></button><div className="profile"><div className="avatar">S</div><strong>Sardor</strong><ChevronDown /></div></div></header>
      <main className="content">
        <section className="welcome"><div><h1>Xush kelibsiz, Sardor!</h1><p>GitHub’dan eng yaxshi loyihalarni qidirish va topish oson.</p></div><button className="settings-button"><Settings2 /> Sozlamalar</button></section>
        <section className="stats-grid">{[['Jami loyihalar', '12 540 786', 'GitHub’da mavjud', 'document'], ['Yulduzlar', '3 245 987', 'Bugungacha berilgan', 'star'], ['Forklar', '1 125 654', 'Loyihalar nusxalari', 'fork'], ['Dasturchilar', '578 920', 'Faol contributor', 'code']].map(([label, value, sub, type]) => <div className={`stat-card ${type}`} key={label}><div className="stat-icon">{type === 'star' ? <Star /> : type === 'fork' ? <GitBranch /> : type === 'code' ? <Code2 /> : <BookOpen />}</div><div><strong>{value}</strong><h3>{label}</h3><p>{sub}</p></div></div>)}</section>
        <section className="section-block"><div className="section-heading"><h2><span>🔥</span> Trenddagi loyihalar</h2><button>Barchasini ko‘rish</button></div><div className="trend-grid">{projects.map((project, index) => <article className="trend-card" key={project.name}><div className="rank">{index + 1}</div><ProjectIcon project={project} /><a href={`https://github.com/${project.name}`} target="_blank" rel="noreferrer">{project.name}</a><p>{project.description}</p><span className={`language-pill ${project.language.toLowerCase()}`}>{project.language}</span><div className="project-meta"><span><Star /> {project.stars}</span><span><GitBranch /> {project.forks}</span></div></article>)}<button className="carousel-next" aria-label="Keyingi loyihalar"><ChevronRight /></button></div></section>
        <section className="section-block recent"><div className="section-heading"><h2>Yangi qo‘shilgan loyihalar</h2><button>Barchasini ko‘rish</button></div><div className="table-card"><div className="table-head"><span>Loyiha nomi</span><span>Til</span><span>Yulduzlar</span><span>Yangilangan</span></div>{filteredRows.map(([name, description, lang, stars, updated]) => <div className="table-row" key={name}><div className="repo-name"><div className="repo-mini"><Code2 /></div><div><a href={`https://github.com/${name}`} target="_blank" rel="noreferrer">{name}</a><small>{description}</small></div></div><div className="table-language"><i className={lang.toLowerCase()} />{lang}</div><span><Star /> {stars}</span><span>{updated}</span></div>)}{filteredRows.length === 0 && <div className="empty-row">Qidiruv bo‘yicha loyiha topilmadi.</div>}<button className="more-button">Ko‘proq yangi loyihalar</button></div></section>
      </main>
    </div>

    <aside className="right-rail"><div className="filter-card"><div className="rail-heading"><h2>Qidiruv filtrlari</h2><button onClick={() => { setLanguage('Barchasi'); setSort('Eng mos keluvchi') }}>Tozalash</button></div><label>Dasturlash tili<select value={language} onChange={(e) => setLanguage(e.target.value)}><option>Barchasi</option><option>JavaScript</option><option>Python</option></select></label><label>Yulduzlar soni<select><option>Barchasi</option><option>1 000+</option><option>10 000+</option></select></label><label>Yangilangan vaqti<select><option>Istalgan vaqtda</option><option>Bugun</option><option>Bu hafta</option></select></label><label>Loyiha turi<select><option>Barchasi</option><option>Web loyiha</option><option>CLI dastur</option></select></label><label>Saralash<select value={sort} onChange={(e) => setSort(e.target.value)}><option>Eng mos keluvchi</option><option>Eng ko‘p yulduzli</option><option>Eng yangi</option></select></label><button className="apply-button" onClick={() => setQuery(query.trim())}>Filtrni qo‘llash</button></div><div className="rail-card"><h2>Top tillar</h2>{[['JavaScript', '2.4M', 'yellow'], ['Python', '1.6M', 'blue'], ['TypeScript', '1.1M', 'blue'], ['Java', '836K', 'red'], ['C#', '524K', 'green']].map(([name, count, color]) => <div className="rail-row" key={name}><span><i className={`dot ${color}`} />{name}</span><strong>{count}</strong></div>)}<button className="rail-link">Barchasini ko‘rish</button></div><div className="rail-card"><h2>Mashhur toifalar</h2>{[['Web dasturlash', '3.2M', BookOpen], ['Telegram botlar', '1.1M', Zap], ['Sun’iy intellekt', '850K', Sparkles], ['Mobil ilovalar', '730K', Code2], ['DevOps', '620K', GitBranch]].map(([name, count, Icon]) => <div className="rail-row" key={name as string}><span><Icon />{name as string}</span><strong>{count as string}</strong></div>)}<button className="rail-link">Barchasini ko‘rish</button></div></aside>
  </div>
}

export default RepoDashboard
