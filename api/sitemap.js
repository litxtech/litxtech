import { getServiceClient, json } from './_lib/supabaseAdmin.js'

const STATIC = [
  '/',
  '/cozumler',
  '/projeler',
  '/about',
  '/contact',
  '/projemi-anlat',
  '/destek',
  '/sss',
  '/tamuso',
  '/vora',
  '/nocta',
  '/mytrabzon',
  '/valoria-app',
  '/kbs-prime',
  '/privacy-policy',
  '/terms-of-service',
]

export default async function handler(req, res) {
  if (req.method !== 'GET') return json(res, 405, { error: 'Method not allowed' })
  const origin = process.env.VITE_PUBLIC_SITE_URL || 'https://www.litxtech.com'

  let apps = []
  try {
    const supabase = getServiceClient()
    const { data } = await supabase
      .from('cms_applications')
      .select('slug, website_url, updated_at')
      .eq('status', 'published')
      .is('deleted_at', null)
    apps = data || []
  } catch {
    apps = []
  }

  const urls = [
    ...STATIC.map((path) => `${origin}${path}`),
    ...apps.map((a) => a.website_url || `${origin}/${a.slug}`),
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (loc) => `  <url><loc>${loc}</loc><changefreq>weekly</changefreq><priority>0.7</priority></url>`,
  )
  .join('\n')}
</urlset>`

  res.statusCode = 200
  res.setHeader('Content-Type', 'application/xml; charset=utf-8')
  res.setHeader('Cache-Control', 'public, max-age=3600')
  res.end(xml)
}
