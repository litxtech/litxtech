export default async function handler(req, res) {
  const origin = process.env.VITE_PUBLIC_SITE_URL || 'https://www.litxtech.com'
  const body = `# LitxTech — https://www.litxtech.com
User-agent: *
Allow: /
Allow: /cozumler
Allow: /projeler
Allow: /about
Allow: /contact
Allow: /blog
Allow: /og-litxtech.jpg

Disallow: /admin
Disallow: /admin/
Disallow: /api/admin
Disallow: /api/admin/
Disallow: /auth/
Disallow: /login
Disallow: /profile
Disallow: /success
Disallow: /cancel

User-agent: Googlebot
Allow: /
Disallow: /admin
Disallow: /api/admin
Disallow: /auth/

User-agent: Googlebot-Image
Allow: /og-litxtech.jpg

Sitemap: ${origin}/sitemap.xml
Sitemap: ${origin}/api/sitemap
Host: ${origin.replace(/^https?:\/\//, '')}
`

  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  res.setHeader('Cache-Control', 'public, max-age=3600')
  res.end(body)
}
