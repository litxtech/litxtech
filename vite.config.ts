import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath, pathToFileURL } from 'url'

const configDir = path.dirname(fileURLToPath(import.meta.url))

async function loadSeoEngine() {
  const href = pathToFileURL(path.resolve(configDir, 'api/_lib/seoEngine.js')).href
  return import(href)
}

function seoHtmlPlugin() {
  return {
    name: 'litxtech-seo-html',
    async transformIndexHtml(html: string, ctx: { originalUrl?: string }) {
      const pathname = (ctx?.originalUrl || '/').split('?')[0] || '/'
      const engine = await loadSeoEngine()
      const result = engine.injectDocument(html, pathname, {})
      return result.html || html
    },
    configureServer(server: { middlewares: { use: (fn: (req: any, res: any, next: () => void) => void) => void } }) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url || '/'
        const pathname = url.split('?')[0]
        if (!pathname.startsWith('/api') && !pathname.startsWith('/@') && !pathname.includes('.')) {
          const early = await loadSeoEngine()
          const resolvedEarly = early.resolveRequest(pathname, {})
          if (resolvedEarly.redirect) {
            res.statusCode = resolvedEarly.redirect.status_code || 301
            res.setHeader('Location', resolvedEarly.redirect.destination)
            res.end()
            return
          }
        }
        if (pathname !== '/robots.txt' && pathname !== '/sitemap.xml' && !pathname.startsWith('/api/public/seo')) {
          next()
          return
        }
        const engine = await loadSeoEngine()
        if (pathname === '/robots.txt') {
          res.setHeader('Content-Type', 'text/plain; charset=utf-8')
          res.end(engine.buildRobotsTxt({}))
          return
        }
        if (pathname === '/sitemap.xml') {
          res.setHeader('Content-Type', 'application/xml; charset=utf-8')
          res.end(engine.buildSitemapXml({}))
          return
        }
        const params = new URL(url, 'http://localhost')
        if (pathname.endsWith('/health')) {
          res.setHeader('Content-Type', 'application/json; charset=utf-8')
          res.end(JSON.stringify({ health: engine.buildHealth({}) }))
          return
        }
        const resolved = engine.resolveRequest(params.searchParams.get('path') || '/', {})
        res.setHeader('Content-Type', 'application/json; charset=utf-8')
        res.end(
          JSON.stringify({
            status: resolved.status || 200,
            redirect: resolved.redirect || null,
            page: resolved.page ? engine.publicPage(resolved.page) : null,
            head: resolved.page ? engine.renderHeadBlock(resolved.page, {}) : '',
            analytics: { ga: '', gtm: '', pixel: '' },
            verification: { google: '', bing: '' },
          }),
        )
      })
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), seoHtmlPlugin()],
  esbuild: {
    target: 'esnext',
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext',
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    headers: {
      // Security headers for admin routes
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    }
  },
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          admin: ['./src/pages/AdminPage.tsx', './src/pages/AdminLogin.tsx']
        }
      }
    }
  }
})
