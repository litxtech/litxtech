import { buildRobotsTxt } from './_lib/seoEngine.js'
import { getSeoContext } from './_lib/seoData.js'

export default async function handler(req, res) {
  const ctx = await getSeoContext()
  const body = buildRobotsTxt(ctx)
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  res.setHeader('Cache-Control', 'public, max-age=3600')
  res.end(body)
}
