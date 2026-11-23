/**
 * Cloudflare Pages middleware — Vercel `middleware.js` + `vercel.json`
 * host kurallarının karşılığı.
 *
 * Üç iş yapar:
 *  1. apex (litxtech.com) → www yönlendirmesi  (vercel.json, host koşullu)
 *  2. SPA fallback + SEO head enjeksiyonu      (middleware.js)
 *  3. admin.* host'unda dokunmadan geçmek      (Vercel'de ayrı davranıyordu)
 */
import { injectDocument, normalizePath } from './api/_lib/seoEngine.js'
import { runHandler } from './api/_lib/adapt.js'
import seoHandler from './api/_handlers/public/seo.js'
import robotsHandler from './api/_robots.js'
import sitemapHandler from './api/_sitemap.js'

const APEX = 'litxtech.com'
const WWW = 'www.litxtech.com'

export async function onRequest(context) {
  const { request, env, next } = context
  const url = new URL(request.url)
  const host = request.headers.get('host') || ''

  // 1) apex → www (kalıcı)
  if (host === APEX) {
    return Response.redirect(
      new URL(url.pathname + url.search, `https://${WWW}`).toString(),
      301,
    )
  }

  // 3) admin alt alanı ayrı akış
  if (host.startsWith('admin.')) return next()

  const pathname = url.pathname

  // 2b) vercel.json rewrite'ları: /robots.txt → /api/robots, /sitemap.xml → /api/sitemap
  // (Pages `_redirects` statik → Function rewrite'ını desteklemediği için burada)
  if (pathname === '/robots.txt') return runHandler(robotsHandler, context)
  if (pathname === '/sitemap.xml') return runHandler(sitemapHandler, context)

  // API / asset / dosya istekleri middleware'i atlar
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/assets') ||
    pathname.includes('.')
  ) {
    return next()
  }

  try {
    const shellRes = await env.ASSETS.fetch(new URL('/index.html', url.origin))
    if (!shellRes.ok) return next()
    const shell = await shellRes.text()

    // 2a) SEO meta — alt istek yerine handler'ı aynı isolate'te çağır
    try {
      const metaUrl = new URL('/api/public/seo', url.origin)
      metaUrl.searchParams.set('path', pathname)
      const metaRes = await runHandler(seoHandler, {
        request: new Request(metaUrl.toString(), { method: 'GET', headers: request.headers }),
        env,
      })
      if (metaRes.ok) {
        const meta = await metaRes.json()
        if (meta.redirect?.destination) {
          return Response.redirect(
            new URL(meta.redirect.destination, url.origin).toString(),
            meta.redirect.status_code || 301,
          )
        }
        if (meta.head && shell.includes('<!-- litx-seo:start -->')) {
          const html = shell.replace(
            /<!-- litx-seo:start -->[\s\S]*?<!-- litx-seo:end -->/,
            `<!-- litx-seo:start -->\n    ${meta.head}\n    <!-- litx-seo:end -->`,
          )
          const headers = new Headers()
          headers.set('Content-Type', 'text/html; charset=utf-8')
          headers.set('X-Robots-Tag', meta.page?.robots || 'index, follow')
          headers.set(
            'Cache-Control',
            meta.status === 404 ? 'no-store' : 'public, max-age=120',
          )
          return new Response(
            html.replace(/<html[^>]*>/, `<html lang="tr" data-seo-path="${pathname}">`),
            { status: meta.status || 200, headers },
          )
        }
      }
    } catch {
      // SEO API düşerse statik enjeksiyona düş
    }

    // 2b) Yerel SEO motoruyla enjeksiyon (SPA fallback)
    const sonuc = injectDocument(shell, normalizePath(pathname), {})
    if (sonuc.passthrough) return next()
    if (sonuc.redirect) {
      return Response.redirect(
        new URL(sonuc.redirect.destination, url.origin).toString(),
        sonuc.redirect.status_code || 301,
      )
    }
    return new Response(sonuc.html, {
      status: sonuc.status || 200,
      headers: sonuc.headers,
    })
  } catch {
    return next()
  }
}
