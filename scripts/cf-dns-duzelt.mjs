// litxtech.com apex + www kayıtlarını Cloudflare Pages'e yönlendirir.
//
// Kullanım:
//   $env:CLOUDFLARE_DNS_TOKEN="<Zone.DNS:Edit yetkili token>"
//   node scripts/cf-dns-duzelt.mjs
//
// Yapar:
//   - apex ve www üzerindeki A / AAAA kayıtlarını siler (eski Vercel IP'leri)
//   - apex ve www için CNAME litxtechweb.pages.dev ekler (proxied)
//   - MX / TXT / mail / ftp kayıtlarına DOKUNMAZ
//   - son durumu listeler
import fs from 'fs'
import os from 'os'
import path from 'path'

const ZONE_ID = process.env.CF_ZONE_ID || '017fe8de62bc10cb93c81ea1ad233fa1'
const ZONE_NAME = process.env.CF_ZONE || 'litxtech.com'
const TARGET = process.env.CF_PAGES_TARGET || 'litxtechweb.pages.dev'
const DRY = process.argv.includes('--dry-run')

function findToken() {
  if (process.env.CLOUDFLARE_DNS_TOKEN) return process.env.CLOUDFLARE_DNS_TOKEN
  if (process.env.CLOUDFLARE_API_TOKEN) return process.env.CLOUDFLARE_API_TOKEN
  const candidates = [
    path.join(os.homedir(), 'AppData', 'Roaming', 'xdg.config', '.wrangler', 'config', 'default.toml'),
    path.join(os.homedir(), '.config', '.wrangler', 'config', 'default.toml'),
  ]
  for (const file of candidates) {
    if (!fs.existsSync(file)) continue
    const m = fs.readFileSync(file, 'utf8').match(/(?:oauth_token|api_token)\s*=\s*"([^"]+)"/)
    if (m) return m[1]
  }
  throw new Error('Cloudflare token bulunamadı (CLOUDFLARE_DNS_TOKEN tanımla)')
}

const token = findToken()
const base = `https://api.cloudflare.com/client/v4/zones/${ZONE_ID}`

async function cf(pathname, init = {}) {
  const res = await fetch(`${base}${pathname}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
  })
  const text = await res.text()
  let body
  try {
    body = JSON.parse(text)
  } catch {
    body = { success: false, errors: [{ message: text.slice(0, 300) }] }
  }
  return { ok: res.ok && body.success !== false, body, status: res.status }
}

const probe = await cf('')
if (!probe.ok) {
  console.error('Token zone erişimi yok:', JSON.stringify(probe.body.errors || probe.body).slice(0, 400))
  process.exit(1)
}

const wanted = [`${ZONE_NAME}`, `www.${ZONE_NAME}`]
const list = await cf('/dns_records?per_page=200')
if (!list.ok) {
  console.error('DNS kayıtları okunamadı:', JSON.stringify(list.body.errors || {}).slice(0, 400))
  console.log('Not: token Zone.DNS:Edit yetkisi istiyor.')
  process.exit(1)
}

const records = list.body.result || []
console.log(`toplam kayıt: ${records.length}`)

// 1) Hedef adlardaki A/AAAA/CNAME kayıtlarını temizle
for (const record of records) {
  const isTarget = wanted.includes(record.name)
  if (!isTarget) continue
  if (!['A', 'AAAA', 'CNAME'].includes(record.type)) continue

  const alreadyRight =
    record.type === 'CNAME' && String(record.content).toLowerCase() === TARGET && record.proxied

  if (alreadyRight) {
    console.log(`bırakıldı : ${record.type} ${record.name} -> ${record.content} (zaten doğru)`)
    continue
  }

  if (DRY) {
    console.log(`[dry] silinecek: ${record.type} ${record.name} -> ${record.content}`)
    continue
  }
  const del = await cf(`/dns_records/${record.id}`, { method: 'DELETE' })
  console.log(
    del.ok
      ? `silindi   : ${record.type} ${record.name} -> ${record.content}`
      : `SİLİNEMEDİ: ${record.type} ${record.name} ${JSON.stringify(del.body.errors || {}).slice(0, 200)}`
  )
}

// 2) CNAME ekle
for (const name of wanted) {
  if (DRY) {
    console.log(`[dry] eklenecek: CNAME ${name} -> ${TARGET} (proxied)`)
    continue
  }
  const create = await cf('/dns_records', {
    method: 'POST',
    body: JSON.stringify({ type: 'CNAME', name, content: TARGET, proxied: true, ttl: 1 }),
  })
  if (create.ok) {
    console.log(`eklendi   : CNAME ${name} -> ${TARGET} (proxied)`)
  } else {
    const msg = JSON.stringify(create.body.errors || create.body).slice(0, 250)
    if (/already exists|duplicate/i.test(msg)) console.log(`zaten var : CNAME ${name}`)
    else console.log(`HATA      : CNAME ${name} -> ${msg}`)
  }
}

// 3) Son durum
const final = await cf('/dns_records?per_page=200')
const rows = (final.body.result || [])
  .filter((r) => r.name === ZONE_NAME || r.name === `www.${ZONE_NAME}` || r.type === 'MX' || r.type === 'TXT')
  .map((r) => `${r.type.padEnd(5)} ${r.name.padEnd(26)} ${r.content}${r.proxied ? '  [proxied]' : ''}`)
console.log('\nson durum:')
for (const row of rows) console.log('  ' + row)
