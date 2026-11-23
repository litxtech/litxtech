/**
 * litxtech.com DNS'ini Cloudflare Pages'e yönlendirir.
 *
 * Yaptığı iş:
 *   - `@` ve `www` üzerindeki eski Vercel A kayıtlarını (216.198.79.1) siler
 *   - yerine `litxtechweb.pages.dev` CNAME kayıtlarını (proxied) ekler
 *   - MX / SPF / doğrulama TXT kayıtlarına DOKUNMAZ
 *
 * Token: CF_DNS_API_TOKEN ortam değişkeni veya kökte `.cf-dns-token` dosyası.
 * Gerekli izinler: Zone → DNS → Edit, Zone → Zone → Read (yalnızca litxtech.com).
 *
 * Kullanım:
 *   node scripts/cf-dns-pages.mjs            # uygula
 *   node scripts/cf-dns-pages.mjs --dry-run  # sadece göster
 */
import fs from 'node:fs'
import path from 'node:path'

const ZONE_NAME = 'litxtech.com'
const TARGET = 'litxtechweb.pages.dev'
const OLD_VERCEL_IPS = new Set(['216.198.79.1', '76.76.21.21'])
const DRY = process.argv.includes('--dry-run')

function readToken() {
  if (process.env.CF_DNS_API_TOKEN) return process.env.CF_DNS_API_TOKEN.trim()
  const file = path.join(process.cwd(), '.cf-dns-token')
  if (fs.existsSync(file)) return fs.readFileSync(file, 'utf8').trim()
  throw new Error('CF_DNS_API_TOKEN yok. Token dosyası: .cf-dns-token')
}

const token = readToken()
const api = 'https://api.cloudflare.com/client/v4'

async function cf(pathname, init = {}) {
  const response = await fetch(`${api}${pathname}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
  })
  const payload = await response.json().catch(() => ({}))
  if (!response.ok || payload.success === false) {
    const detail = JSON.stringify(payload.errors || payload)
    throw new Error(`${init.method || 'GET'} ${pathname} → ${response.status} ${detail}`)
  }
  return payload.result
}

const zones = await cf(`/zones?name=${ZONE_NAME}`)
const zone = zones?.[0]
if (!zone) throw new Error(`${ZONE_NAME} zone bulunamadı (token izinlerini kontrol edin)`)
console.log(`zone: ${zone.name} (${zone.id}) status=${zone.status}`)

const records = await cf(`/zones/${zone.id}/dns_records?per_page=100`)
for (const key of ['@', 'www']) {
  const name = key === '@' ? ZONE_NAME : `www.${ZONE_NAME}`
  const existing = records.filter((r) => r.name === name)
  for (const record of existing) {
    const isOldA = record.type === 'A' && OLD_VERCEL_IPS.has(record.content)
    const isCname = record.type === 'CNAME'
    if (!isOldA && !isCname) {
      console.log(`korunuyor: ${record.type} ${record.name} → ${record.content}`)
      continue
    }
    if (isCname && record.content === TARGET) {
      console.log(`zaten doğru: CNAME ${record.name} → ${record.content}`)
      continue
    }
    console.log(`${DRY ? '[dry] ' : ''}siliniyor: ${record.type} ${record.name} → ${record.content}`)
    if (!DRY) await cf(`/zones/${zone.id}/dns_records/${record.id}`, { method: 'DELETE' })
  }

  const nameForApi = key === '@' ? ZONE_NAME : `www.${ZONE_NAME}`
  const body = {
    type: 'CNAME',
    name: nameForApi,
    content: TARGET,
    proxied: true,
    ttl: 1,
    comment: 'litxtechweb Pages',
  }
  console.log(`${DRY ? '[dry] ' : ''}ekleniyor: CNAME ${nameForApi} → ${TARGET} (proxied)`)
  if (!DRY) {
    try {
      await cf(`/zones/${zone.id}/dns_records`, { method: 'POST', body: JSON.stringify(body) })
    } catch (error) {
      // Aynı isimde kayıt kaldıysa güncellemeye çalış
      const again = await cf(`/zones/${zone.id}/dns_records?per_page=100`)
      const match = again.find((r) => r.name === nameForApi)
      if (!match) throw error
      await cf(`/zones/${zone.id}/dns_records/${match.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ content: TARGET, proxied: true }),
      })
    }
  }
}

console.log(DRY ? 'dry-run bitti.' : 'DNS kayıtları güncellendi.')
console.log('MX/TXT kayıtları değiştirilmedi; Cloudflare → DNS ekranından doğrulayın.')
