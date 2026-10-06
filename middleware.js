import { injectDocument, normalizePath } from './api/_lib/seoEngine.js'

export const config = {
  matcher: ['/((?!api/|assets/).*)'],
}

export default async function middleware(request) {
  const url = new URL(request.url)
  const host = request.headers.get('host') || ''
  if (host.startsWith('admin.')) return
  const pathname = url.pathname
  if (pathname.startsWith('/api') || pathname.startsWith('/assets') || pathname.includes('.')) return

  try {
    const shellRes = await fetch(new URL('/index.html', request.url))
    if (!shellRes.ok) return
    const shell = await shellRes.text()
    let ctx = {}
    try {
      const metaRes = await fetch(new URL(`/api/public/seo?path=${encodeURIComponent(pathname)}`, request.url))
      if (metaRes.ok) {
        const meta = await metaRes.json()
        if (meta.redirect?.destination) {
          return Response.redirect(new URL(meta.redirect.destination, request.url), meta.redirect.status_code || 301)
        }
        if (meta.head && shell.includes('<!-- litx-seo:start -->')) {
          const html = shell.replace(
            /<!-- litx-seo:start -->[\s\S]*?<!-- litx-seo:end -->/,
            `<!-- litx-seo:start -->\n    ${meta.head}\n    <!-- litx-seo:end -->`,
          )
          const headers = new Headers()
          headers.set('Content-Type', 'text/html; charset=utf-8')
          headers.set('X-Robots-Tag', meta.page?.robots || 'index, follow')
          headers.set('Cache-Control', meta.status === 404 ? 'no-store' : 'public, max-age=120')
          return new Response(html.replace(/<html[^>]*>/, `<html lang="tr" data-seo-path="${pathname}">`), {
            status: meta.status || 200,
            headers,
          })
        }
      }
    } catch {
      ctx = {}
    }
    const result = injectDocument(shell, normalizePath(pathname), ctx)
    if (result.passthrough) return
    if (result.redirect) {
      return Response.redirect(new URL(result.redirect.destination, request.url), result.redirect.status_code || 301)
    }
    return new Response(result.html, { status: result.status || 200, headers: result.headers })
  } catch {
    return
  }
}
