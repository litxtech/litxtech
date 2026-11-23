import { cors, json } from '../../_lib/supabaseAdmin.js'
import { getSeoContext } from '../../_lib/seoData.js'
import {
  buildHealth,
  buildJsonLd,
  publicPage,
  renderHeadBlock,
  resolveLang,
  resolveRequest,
} from '../../_lib/seoEngine.js'

/** Reads the active language from ?lang=, the visitor cookie or Accept-Language. */
export function detectLang(req, url) {
  const explicit = url.searchParams.get('lang')
  if (explicit) return resolveLang(explicit)
  const cookie = String(req.headers?.cookie || '')
  const match = cookie.match(/(?:^|;\s*)litxtech_lang=([^;]+)/)
  if (match) return resolveLang(decodeURIComponent(match[1]))
  const accept = String(req.headers?.['accept-language'] || '')
  if (/^tr\b/i.test(accept)) return 'tr'
  return 'en'
}

export default async function handler(req, res) {
  cors(req, res)
  if (req.method === 'OPTIONS') return json(res, 204, {})
  if (req.method !== 'GET') return json(res, 405, { error: 'Method not allowed' })

  const url = new URL(req.url || '/', 'http://localhost')
  const rest = String(req.platformRest || '')
  const ctx = { ...(await getSeoContext()), lang: detectLang(req, url) }
  if (rest === 'health') {
    const production = process.env.VERCEL_ENV === 'production' || process.env.NODE_ENV === 'production'
    if (production) return json(res, 404, { error: 'Not found' })
    return json(res, 200, { health: buildHealth(ctx) })
  }

  const path = url.searchParams.get('path') || '/'
  const resolved = resolveRequest(path, ctx)
  if (resolved.redirect) {
    return json(res, 200, { redirect: resolved.redirect })
  }
  const page = resolved.page
  const settings = ctx.settings || {}
  return json(res, 200, {
    status: resolved.status || 200,
    lang: ctx.lang,
    head: renderHeadBlock(page, ctx),
    page: publicPage(page, ctx.lang),
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
