import { useEffect } from 'react'
import { absoluteUrl, organizationJsonLd, seoConfig, websiteJsonLd } from '@/data/seoConfig'
import { useCompanySettings } from '@/contexts/CompanySettingsContext'

type SeoHeadProps = {
  title: string
  description?: string
  path?: string
  /** index,follow (default) or noindex for private pages */
  robots?: string
  image?: string
  type?: 'website' | 'article'
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
}

function upsertMeta(attr: 'name' | 'property' | 'http-equiv', key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel: string, href: string, extra?: Record<string, string>) {
  const selector = extra?.hreflang
    ? `link[rel="${rel}"][hreflang="${extra.hreflang}"]`
    : `link[rel="${rel}"]`
  let el = document.querySelector(selector) as HTMLLinkElement | null
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    if (extra) {
      for (const [k, v] of Object.entries(extra)) el.setAttribute(k, v)
    }
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function upsertJsonLd(id: string, data: unknown) {
  let el = document.getElementById(id) as HTMLScriptElement | null
  if (!el) {
    el = document.createElement('script')
    el.id = id
    el.type = 'application/ld+json'
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(data)
}

export function SeoHead({
  title,
  description = seoConfig.defaultDescription,
  path = '',
  robots = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  image = seoConfig.ogImagePath,
  type = 'website',
  jsonLd,
}: SeoHeadProps) {
  const company = useCompanySettings()
  const jsonLdKey = jsonLd ? JSON.stringify(jsonLd) : ''

  useEffect(() => {
    const url = absoluteUrl(path)
    const imageUrl = absoluteUrl(image)

    document.title = title
    document.documentElement.lang = seoConfig.language

    upsertMeta('name', 'description', description)
    upsertMeta('name', 'robots', robots)
    upsertMeta('name', 'googlebot', robots)
    upsertMeta('name', 'author', seoConfig.legalName)
    upsertMeta('name', 'application-name', seoConfig.siteName)
    upsertMeta('name', 'theme-color', '#070a12')

    upsertMeta('property', 'og:type', type)
    upsertMeta('property', 'og:site_name', seoConfig.siteName)
    upsertMeta('property', 'og:locale', seoConfig.locale)
    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:image', imageUrl)
    upsertMeta('property', 'og:image:alt', `${seoConfig.siteName} – yazılım şirketi`)

    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', title)
    upsertMeta('name', 'twitter:description', description)
    upsertMeta('name', 'twitter:image', imageUrl)

    upsertLink('canonical', url)
    upsertLink('alternate', url, { hreflang: 'tr' })
    upsertLink('alternate', url, { hreflang: 'x-default' })

    const verification = import.meta.env.VITE_GOOGLE_SITE_VERIFICATION as string | undefined
    if (verification) {
      upsertMeta('name', 'google-site-verification', verification)
    }

    upsertJsonLd('ld-organization', organizationJsonLd(company))
    upsertJsonLd('ld-website', websiteJsonLd(company))

    if (jsonLdKey) {
      const parsed = JSON.parse(jsonLdKey) as Record<string, unknown> | Record<string, unknown>[]
      const payload = Array.isArray(parsed) ? parsed : [parsed]
      upsertJsonLd('ld-page', payload.length === 1 ? payload[0] : payload)
    }

    return () => {
      const pageLd = document.getElementById('ld-page')
      if (pageLd) pageLd.remove()
    }
  }, [title, description, path, robots, image, type, jsonLdKey, company])

  return null
}
