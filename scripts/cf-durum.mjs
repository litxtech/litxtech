// Cloudflare durum özeti: zone (litxtech.com) durumu, nameserver'lar, DNS kayıtları
// ve Pages projesinin bağlı domainleri. Sır basmaz.
import fs from 'fs'
import os from 'os'
import path from 'path'

const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID || 'acf99dc4d05885166e2c3300aff7b2ef'
const PROJECT = process.env.CF_PAGES_PROJECT || 'litxtechweb'
const ZONE_NAME = process.env.CF_ZONE || 'litxtech.com'

function findToken() {
  if (process.env.CLOUDFLARE_API_TOKEN) return process.env.CLOUDFLARE_API_TOKEN
  const candidates = [
    path.join(os.homedir(), 'AppData', 'Roaming', 'xdg.config', '.wrangler', 'config', 'default.toml'),
    path.join(os.homedir(), '.config', '.wrangler', 'config', 'default.toml'),
  ]
  for (const file of candidates) {
    if (!fs.existsSync(file)) continue
    const text = fs.readFileSync(file, 'utf8')
    const m = text.match(/(?:oauth_token|api_token)\s*=\s*"([^"]+)"/)
    if (m) return m[1]
  }
  throw new Error('Cloudflare token bulunamadı')
}

const token = findToken()
async function cf(pathname) {
  const res = await fetch(`https://api.cloudflare.com/client/v4${pathname}`, {
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
  })
  const body = await res.json()
  if (!body.success) throw new Error(JSON.stringify(body.errors).slice(0, 500))
  return body.result
}

const zones = await cf(`/zones?name=${ZONE_NAME}`)
if (!zones.length) {
  console.log(`${ZONE_NAME} bu hesapta yok.`)
} else {
  const zone = zones[0]
  console.log(`zone        : ${zone.name}`)
  console.log(`zone id     : ${zone.id}`)
  console.log(`status      : ${zone.status}`)
  console.log(`nameservers : ${(zone.name_servers || []).join(', ')}`)
  console.log(`paused      : ${zone.paused}`)

  try {
    const records = await cf(`/zones/${zone.id}/dns_records?per_page=100`)
    console.log('\nDNS kayıtları:')
    for (const r of records) {
      const extra = r.priority ? ` priority=${r.priority}` : ''
      console.log(
        `  ${r.type.padEnd(6)} ${String(r.name).padEnd(28)} ${r.content}${extra}${r.proxied ? '  (proxied)' : ''}`
      )
    }
  } catch (error) {
    console.log('\nDNS kayıtları okunamadı (token kapsamı yetersiz):', error.message.slice(0, 120))
  }
}

try {
  const project = await cf(`/accounts/${ACCOUNT_ID}/pages/projects/${PROJECT}`)
  console.log('\nPages projesi:', project.name)
  console.log('  subdomain :', project.subdomain)
  console.log('  domains   :', (project.domains || []).join(', ') || '(özel domain bağlı değil)')
} catch (error) {
  console.log('\nPages projesi okunamadı:', error.message.slice(0, 120))
}
