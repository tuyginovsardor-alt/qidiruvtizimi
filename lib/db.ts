import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'

const globalForDb = globalThis as unknown as { pool?: Pool }

function getDatabaseUrl() {
  const connectionString = process.env.DATABASE_URL
  if (!connectionString) throw new Error('DATABASE_URL is not configured')

  const url = new URL(connectionString)
  if (url.searchParams.get('sslmode') === 'require') {
    url.searchParams.set('sslmode', 'verify-full')
  }
  return url.toString()
}

export const pool = globalForDb.pool ?? new Pool({ connectionString: getDatabaseUrl(), max: 5 })
if (process.env.NODE_ENV !== 'production') globalForDb.pool = pool
export const db = drizzle(pool)
