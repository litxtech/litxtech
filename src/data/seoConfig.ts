/** Canonical SEO defaults for LitxTech (Google-friendly entity + brand signals). */
export const seoConfig = {
  siteName: 'LitxTech',
  legalName: 'LitxTech LLC',
  alternateNames: ['Litx', 'Litx Tech', 'LitxTechnology', 'LitxTech Yazılım'],
  origin: 'https://www.litxtech.com',
  locale: 'tr_TR',
  language: 'tr',
  defaultTitle: 'LitxTech | Yazılım ve Dijital Ürün Geliştirme Şirketi',
  defaultDescription:
    'LitxTech, modern web ve mobil uygulamalar, özel yazılım çözümleri, dijital ürünler ve teknoloji platformları geliştiren bir yazılım şirketidir.',
  ogImagePath: '/og-litxtech.jpg',
  twitterHandle: '@litxtech',
  email: 'support@litxtech.com',
  phone: '+1-307-271-5151',
  address: {
    addressCountry: 'US',
    addressRegion: 'WY',
    addressLocality: 'Cheyenne',
  },
  sameAs: [
    'https://www.litxtech.com',
    'https://github.com/litxtech',
  ],
  primaryKeywords: [
    'LitxTech',
    'Litx',
    'yazılım şirketi',
    'mobil uygulama geliştirme',
    'özel yazılım',
    'SaaS',
    'otel yönetim sistemi',
    'restoran yazılımı',
  ],
} as const

export function absoluteUrl(path = ''): string {
  if (!path) return seoConfig.origin
  if (path.startsWith('http')) return path
  return `${seoConfig.origin}${path.startsWith('/') ? path : `/${path}`}`
}

type CompanySeoInput = {
  company_name?: string
  legal_name?: string | null
  description?: string | null
  email?: string
  phone?: string
  website?: string
  logo_url?: string | null
  address?: string | null
  city?: string | null
  country?: string | null
  social?: Record<string, string> | null
}

export function organizationJsonLd(company?: CompanySeoInput) {
  const email = company?.email || seoConfig.email
  const phone = company?.phone || seoConfig.phone
  const sameAs = Object.values(company?.social || {}).filter((url) => typeof url === 'string' && url.startsWith('https://'))
  const node: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${seoConfig.origin}/#organization`,
    name: company?.company_name || seoConfig.siteName,
    url: company?.website || seoConfig.origin,
    logo: company?.logo_url || absoluteUrl('/favicon.svg'),
    description: company?.description || seoConfig.defaultDescription,
    email,
    telephone: phone,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email,
        telephone: phone,
        availableLanguage: ['Turkish', 'English'],
      },
    ],
  }
  if (company?.legal_name || seoConfig.legalName) node.legalName = company?.legal_name || seoConfig.legalName
  if (sameAs.length) node.sameAs = sameAs
  if (company?.address || (company?.city && company?.country)) {
    node.address = {
      '@type': 'PostalAddress',
      streetAddress: company?.address || undefined,
      addressLocality: company?.city || undefined,
      addressCountry: company?.country || undefined,
    }
  }
  return node
}

export function websiteJsonLd(company?: CompanySeoInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${seoConfig.origin}/#website`,
    url: `${seoConfig.origin}/`,
    name: company?.company_name || seoConfig.siteName,
    description: company?.description || seoConfig.defaultDescription,
    inLanguage: seoConfig.language,
    publisher: { '@id': `${seoConfig.origin}/#organization` },
  }
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}
