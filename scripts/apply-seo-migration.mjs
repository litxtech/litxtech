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

const supabaseUrl = val('SUPABASE_URL') || val('VITE_SUPABASE_URL')
const serviceKey = val('SUPABASE_SERVICE_ROLE_KEY')

function redact(text) {
  return String(text)
    .replace(/eyJ[A-Za-z0-9_\-]+\.[A-Za-z0-9_\-]+\.[A-Za-z0-9_\-]+/g, '[jwt]')
    .replace(/sb_[A-Za-z0-9_]+/g, '[sb]')
    .slice(0, 800)
}

async function tryHttpSql() {
  if (!supabaseUrl || !serviceKey) {
    console.log('missing supabase url or service role')
    return false
  }
  const anonKey = val('SUPABASE_ANON_KEY') || val('VITE_SUPABASE_ANON_KEY')
  if (anonKey) {
    const anon = await fetch(`${supabaseUrl}/rest/v1/company_settings?select=id&id=eq.1`, {
      headers: { apikey: anonKey, Authorization: `Bearer ${anonKey}` },
    })
    console.log('anon_status', anon.status, redact(await anon.text()))
  }
  const probe = await fetch(`${supabaseUrl}/rest/v1/company_settings?select=id,default_seo&id=eq.1`, {
    headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}` },
  })
  console.log('rest_status', probe.status, redact(await probe.text()))
  for (const check of [
    'seo_metadata?select=h1,focus_topic,schema_type,status,include_in_sitemap&limit=1',
    'seo_logs?select=id&limit=1',
  ]) {
    const res = await fetch(`${supabaseUrl}/rest/v1/${check}`, {
      headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}` },
    })
    console.log('schema', check.split('?')[0], res.status, redact(await res.text()))
  }

  const sqlBody = fs.readFileSync(
    new URL('../supabase/migrations/20261006_seo_system.sql', import.meta.url),
    'utf8'
  )
  const targets = [
    `${supabaseUrl}/pg/query`,
    `${supabaseUrl}/pg-meta/default/query`,
  ]
  for (const target of targets) {
    const res = await fetch(target, {
      method: 'POST',
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: sqlBody }),
    })
    const body = redact(await res.text())
    console.log('sql_endpoint', new URL(target).pathname, res.status, body)
    if (res.ok) return true
  }

  const ref = new URL(supabaseUrl).hostname.split('.')[0]
  const client = new pg.Client({
    host: `db.${ref}.supabase.co`,
    port: 5432,
    user: 'postgres',
    password: serviceKey,
    database: 'postgres',
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 12000,
  })
  try {
    await client.connect()
    await client.query(sqlBody)
    console.log('direct_sql applied')
    return true
  } catch (error) {
    console.log('direct_sql', error.code || '', String(error.message).slice(0, 300))
    return false
  } finally {
    await client.end().catch(() => {})
  }
}

if (!url) {
  const applied = await tryHttpSql()
  if (!applied) {
    console.log('No Postgres connection string, and the HTTP SQL endpoints did not apply the migration.')
    process.exit(2)
  }
  console.log('migration applied via HTTP SQL endpoint')
  process.exit(0)
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
