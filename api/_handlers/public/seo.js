import { cors, json } from '../../_lib/supabaseAdmin.js'
import { getSeoContext } from '../../_lib/seoData.js'
import {
  buildHealth,
  buildJsonLd,
  publicPage,
  renderHeadBlock,
  resolveRequest,
} from '../../_lib/seoEngine.js'

export default async function handler(req, res) {
  cors(req, res)
  if (req.method === 'OPTIONS') return json(res, 204, {})
  if (req.method !== 'GET') return json(res, 405, { error: 'Method not allowed' })

  const rest = String(req.platformRest || '')
  const ctx = await getSeoContext()
  if (rest === 'health') {
    const production = process.env.VERCEL_ENV === 'production' || process.env.NODE_ENV === 'production'
    if (production) return json(res, 404, { error: 'Not found' })
    return json(res, 200, { health: buildHealth(ctx) })
  }

  const url = new URL(req.url || '/', 'http://localhost')
  const path = url.searchParams.get('path') || '/'
  const resolved = resolveRequest(path, ctx)
  if (resolved.redirect) {
    return json(res, 200, { redirect: resolved.redirect })
  }
  const page = resolved.page
  const settings = ctx.settings || {}
  return json(res, 200, {
    status: resolved.status || 200,
    head: renderHeadBlock(page, ctx),
    page: publicPage(page),
    jsonLd: buildJsonLd(page, ctx),
    analytics: {
      ga: settings.ga_measurement_id || '',
      gtm: settings.gtm_id || '',
      pixel: settings.meta_pixel_id || '',
    },
    verification: {
      google: settings.google_verification || '',
      bing: settings.bing_verification || '',
    },
  })
}
