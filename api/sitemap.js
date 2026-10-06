import { getServiceClient, json } from './_lib/supabaseAdmin.js'

const ORIGIN = process.env.VITE_PUBLIC_SITE_URL || 'https://www.litxtech.com'

/** @type {{ path: string, changefreq: string, priority: string }[]} */
const STATIC = [
  { path: '/', changefreq: 'daily', priority: '1.0' },
  { path: '/cozumler', changefreq: 'weekly', priority: '0.95' },
  { path: '/projeler', changefreq: 'weekly', priority: '0.95' },
  { path: '/about', changefreq: 'monthly', priority: '0.9' },
  { path: '/contact', changefreq: 'monthly', priority: '0.9' },
  { path: '/projemi-anlat', changefreq: 'weekly', priority: '0.9' },
  { path: '/destek', changefreq: 'weekly', priority: '0.8' },
  { path: '/sss', changefreq: 'weekly', priority: '0.8' },
  { path: '/blog', changefreq: 'weekly', priority: '0.75' },
  { path: '/cozumler/otel-yonetim-sistemi', changefreq: 'monthly', priority: '0.85' },
  { path: '/cozumler/restoran-yonetim-sistemi', changefreq: 'monthly', priority: '0.85' },
  { path: '/cozumler/sosyal-medya-uygulamasi', changefreq: 'monthly', priority: '0.85' },
  { path: '/cozumler/arkadaslik-uygulamasi', changefreq: 'monthly', priority: '0.85' },
  { path: '/cozumler/sehire-ozel-uygulamalar', changefreq: 'monthly', priority: '0.85' },
  { path: '/cozumler/ozel-yazilim', changefreq: 'monthly', priority: '0.9' },
  { path: '/projeler/valoriahotel', changefreq: 'monthly', priority: '0.75' },
  { path: '/projeler/sosyal-platform', changefreq: 'monthly', priority: '0.75' },
  { path: '/projeler/dating-app', changefreq: 'monthly', priority: '0.75' },
  { path: '/projeler/vora', changefreq: 'monthly', priority: '0.75' },
  { path: '/projeler/tamuso', changefreq: 'monthly', priority: '0.75' },
  { path: '/projeler/sehir-uygulamasi', changefreq: 'monthly', priority: '0.75' },
  { path: '/tamuso', changefreq: 'weekly', priority: '0.7' },
  { path: '/vora', changefreq: 'weekly', priority: '0.7' },
  { path: '/nocta', changefreq: 'weekly', priority: '0.7' },
  { path: '/mytrabzon', changefreq: 'weekly', priority: '0.7' },
  { path: '/valoria-app', changefreq: 'weekly', priority: '0.7' },
  { path: '/kbs-prime', changefreq: 'weekly', priority: '0.7' },
  { path: '/privacy-policy', changefreq: 'yearly', priority: '0.3' },
  { path: '/terms-of-service', changefreq: 'yearly', priority: '0.3' },
]

function escapeXml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export default async function handler(req, res) {
  if (req.method !== 'GET') return json(res, 405, { error: 'Method not allowed' })

  const lastmod = new Date().toISOString().slice(0, 10)
  const seen = new Set()
  const entries = []

  const push = (loc, changefreq = 'weekly', priority = '0.7') => {
    const url = loc.startsWith('http') ? loc : `${ORIGIN}${loc}`
    if (seen.has(url)) return
    seen.add(url)
    entries.push({ loc: url, changefreq, priority, lastmod })
  }

  for (const row of STATIC) push(row.path, row.changefreq, row.priority)

  try {
    const supabase = getServiceClient()
    const { data } = await supabase
      .from('cms_applications')
      .select('slug, website_url, updated_at')
      .eq('status', 'published')
      .is('deleted_at', null)
    for (const a of data || []) {
      const loc = a.website_url || `${ORIGIN}/${a.slug}`
      push(loc, 'weekly', '0.7')
    }
  } catch {
    // CMS optional
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (e) => `  <url>
    <loc>${escapeXml(e.loc)}</loc>
    <lastmod>${e.lastmod}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>`

  res.statusCode = 200
  res.setHeader('Content-Type', 'application/xml; charset=utf-8')
  res.setHeader('Cache-Control', 'public, max-age=3600')
  res.end(xml)
}
