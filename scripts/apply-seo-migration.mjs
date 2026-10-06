import fs from 'fs'
import pg from 'pg'

const envFile = process.argv[2] || '.env.production.local'
const raw = fs.readFileSync(envFile, 'utf8')
const keys = [...raw.matchAll(/^([A-Z0-9_]+)=/gm)].map((m) => m[1])
const interesting = keys.filter((k) => /SUPABASE|POSTGRES|DATABASE|DB_|DIRECT_URL/i.test(k))
console.log('relevant env names:', interesting.join(', ') || '(none)')

function val(name) {
  const m = raw.match(new RegExp(`^${name}=(?:"([^"]*)"|'([^']*)'|([^\\n]*))$`, 'm'))
  if (!m) return ''
  return m[1] ?? m[2] ?? m[3] ?? ''
}

const url =
  val('DATABASE_URL') ||
  val('POSTGRES_URL') ||
  val('POSTGRES_PRISMA_URL') ||
  val('SUPABASE_DB_URL') ||
  val('DIRECT_URL')

if (!url) {
  console.log('No Postgres connection string in Vercel production env. SQL was not run.')
  process.exit(2)
}

const sql = fs.readFileSync(new URL('../supabase/migrations/20261006_seo_system.sql', import.meta.url), 'utf8')
const client = new pg.Client({ connectionString: url, ssl: { rejectUnauthorized: false } })

try {
  await client.connect()
  const size = await client.query('select pg_database_size(current_database()) as bytes')
  const bytes = Number(size.rows[0].bytes)
  console.log('database_size_mb', Math.round(bytes / 1024 / 1024))
  await client.query(sql)
  const cols = await client.query(`
    select column_name
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'seo_metadata'
      and column_name in ('h1','focus_topic','schema_type','status','include_in_sitemap')
    order by column_name
  `)
  const logs = await client.query(`select to_regclass('public.seo_logs') as name`)
  console.log('seo_metadata columns', cols.rows.map((r) => r.column_name).join(', '))
  console.log('seo_logs', logs.rows[0].name ? 'present' : 'missing')
} catch (error) {
  console.log('sql_error', error.code || '', error.message)
  process.exit(1)
} finally {
  await client.end().catch(() => {})
}
