export default async function handler(req, res) {
  const origin = process.env.VITE_PUBLIC_SITE_URL || 'https://www.litxtech.com'
  const body = `User-agent: *
Allow: /

Disallow: /admin
Disallow: /api/admin
Disallow: /auth/

Sitemap: ${origin}/api/sitemap
`

  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  res.end(body)
}
