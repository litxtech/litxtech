import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const PRIVATE = ['/admin', '/login', '/auth', '/giris', '/kayit', '/profile', '/success', '/cancel', '/seo-health', '/donation']

function upsertMeta(name: string, content: string) {
  if (!content) return
  let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('name', name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

let analyticsLoaded = false

function loadAnalytics(analytics: { ga?: string; gtm?: string; pixel?: string }) {
  if (analyticsLoaded) return
  const ga = analytics.ga?.trim()
  const gtm = analytics.gtm?.trim()
  const pixel = analytics.pixel?.trim()
  if (!ga && !gtm && !pixel) return
  analyticsLoaded = true
  const w = window as unknown as { dataLayer?: unknown[] }
  w.dataLayer = w.dataLayer || []
  if (ga) {
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ga)}`
    document.head.appendChild(script)
    w.dataLayer.push(['js', new Date()])
    w.dataLayer.push(['config', ga])
  }
  if (gtm) {
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtm)}`
    document.head.appendChild(script)
  }
  if (pixel) {
    const script = document.createElement('script')
    script.async = true
    script.src = 'https://connect.facebook.net/en_US/fbevents.js'
    document.head.appendChild(script)
  }
}

export function SeoRuntime() {
  const location = useLocation()

  useEffect(() => {
    const path = location.pathname
    const privatePath = PRIVATE.some((prefix) => path === prefix || path.startsWith(`${prefix}/`))
    if (privatePath) upsertMeta('robots', 'noindex, nofollow')

    const controller = new AbortController()
    fetch(`/api/public/seo?path=${encodeURIComponent(path)}`, { signal: controller.signal })
      .then((response) => response.json())
      .then((data) => {
        if (data?.redirect?.destination) {
          window.location.replace(data.redirect.destination)
          return
        }
        if (data?.verification?.google) upsertMeta('google-site-verification', data.verification.google)
        if (data?.verification?.bing) upsertMeta('msvalidate.01', data.verification.bing)
        if (data?.page?.override) {
          if (data.page.title) document.title = data.page.title
          if (data.page.description) upsertMeta('description', data.page.description)
          if (data.page.robots) upsertMeta('robots', data.page.robots)
        }
        loadAnalytics(data?.analytics || {})
      })
      .catch(() => {})
    return () => controller.abort()
  }, [location.pathname])

  return null
}

export function SeoHealthPage() {
  const [text, setText] = useState('Yükleniyor…')

  useEffect(() => {
    if (import.meta.env.PROD) {
      setText('Üretimde bu uç nokta kapalıdır. Admin → SEO ekranını kullanın.')
      return
    }
    fetch('/api/public/seo/health')
      .then((response) => response.json())
      .then((data) => setText(JSON.stringify(data.health?.counts || data, null, 2)))
      .catch(() => setText('Geliştirme sunucusu SEO özetini döndüremedi.'))
  }, [])

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 text-slate-200">
      <h1 className="text-3xl font-semibold text-white">SEO health</h1>
      <p className="mt-3 text-slate-400">
        Ayrıntılı tarama admin panelindeki SEO ekranındadır. Bu adres üretimde dizine eklenmez.
      </p>
      <pre className="mt-6 overflow-auto rounded-xl border border-white/10 bg-slate-950 p-4 text-xs">{text}</pre>
    </section>
  )
}
