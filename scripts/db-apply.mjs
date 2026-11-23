// Supabase Management API üzerinden SQL dosyası uygular.
// Kullanım: SUPABASE_ACCESS_TOKEN=sbp_... node scripts/db-apply.mjs supabase/migrations/xxx.sql
import fs from 'fs'
import path from 'path'

const PROJECT_REF = process.env.SUPABASE_PROJECT_REF || 'cobzwohfekgzbvxbwrll'
const token = process.env.SUPABASE_ACCESS_TOKEN

if (!token) {
  console.error('SUPABASE_ACCESS_TOKEN tanımlı değil.')
  process.exit(2)
}

const files = process.argv.slice(2)
if (files.length === 0) {
  console.error('Kullanım: node scripts/db-apply.mjs <sql-dosyası> [daha fazla]')
  process.exit(2)
}

async function runSql(sql) {
  const res = await fetch(
    `https://api.supabase.com/v1/projects/${PROJECT_REF}/database/query`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: sql }),
    }
  )
  const text = await res.text()
  if (!res.ok) {
    throw new Error(`${res.status} ${text.slice(0, 1200)}`)
  }
  try {
    return JSON.parse(text)
  } catch {
    return text
  }
}

for (const file of files) {
  const sql = fs.readFileSync(path.resolve(file), 'utf8')
  process.stdout.write(`\n=== ${file} (${sql.length} karakter)\n`)
  try {
    const out = await runSql(sql)
    const preview = JSON.stringify(out)
    console.log(`OK  ${preview.length > 1500 ? preview.slice(0, 1500) + '…' : preview}`)
  } catch (error) {
    console.error(`HATA ${path.basename(file)}:`, error.message)
    process.exit(1)
  }
}

console.log('\nTüm dosyalar uygulandı.')
