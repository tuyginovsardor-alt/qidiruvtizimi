import { NextRequest, NextResponse } from 'next/server'
import { sql } from 'drizzle-orm'
import { db } from '@/lib/db'

export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams
  const query = params.get('q')?.trim() || 'stars:>1000'
  const language = params.get('language')?.trim()
  const stars = params.get('stars')?.trim()
  const pushed = params.get('pushed')?.trim()
  const sort = params.get('sort')?.trim() || 'stars'
  const page = Math.max(1, Number(params.get('page') || 1))
  const qualifiers = [
    query,
    language && language !== 'Barchasi' ? `language:${language}` : '',
    stars && stars !== 'Barchasi' ? `stars:>=${stars}` : '',
    pushed && pushed !== 'Istalgan vaqtda' ? `pushed:>${pushed}` : '',
  ].filter(Boolean).join(' ')
  const url = new URL('https://api.github.com/search/repositories')
  url.searchParams.set('q', qualifiers)
  url.searchParams.set('sort', sort === 'Eng yangi' ? 'updated' : 'stars')
  url.searchParams.set('order', 'desc')
  url.searchParams.set('per_page', '10')
  url.searchParams.set('page', String(page))

  const headers: HeadersInit = { Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28' }
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  let response: Response
  try {
    response = await fetch(url, { headers, next: { revalidate: 60 }, signal: AbortSignal.timeout(8000) })
  } catch {
    return NextResponse.json({ error: 'GitHub API vaqtida javob bermadi' }, { status: 504 })
  }
  if (!response.ok) return NextResponse.json({ error: 'GitHub API so‘rovi bajarilmadi' }, { status: response.status })
  const data = await response.json()
  const items = (data.items || []).map((repo: Record<string, unknown>) => ({
    id: repo.id, name: repo.name, fullName: repo.full_name, description: repo.description, language: repo.language || 'Noma’lum',
    stars: repo.stargazers_count, forks: repo.forks_count, updatedAt: repo.updated_at, htmlUrl: repo.html_url,
    avatar: repo.owner && (repo.owner as Record<string, unknown>).avatar_url,
  }))
  try { await db.execute(sql`INSERT INTO repo_searches (query, language, results) VALUES (${query}, ${language || null}, ${JSON.stringify(items)}::jsonb)`) } catch { /* logging must not block search */ }
  return NextResponse.json({ total: data.total_count || 0, items })
}
