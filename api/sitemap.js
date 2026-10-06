import { buildSitemapXml } from './_lib/seoEngine.js'
import { getSeoContext } from './_lib/seoData.js'

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.statusCode = 405
    res.end('Method not allowed')
    return
  }
  const ctx = await getSeoContext()
  const xml = buildSitemapXml(ctx)
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/xml; charset=utf-8')
  res.setHeader('Cache-Control', 'public, max-age=60, stale-while-revalidate=120')
  res.end(xml)
}
