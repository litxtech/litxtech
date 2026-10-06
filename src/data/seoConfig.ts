/** Canonical SEO defaults for LitxTech (Google-friendly entity + brand signals). */
export const seoConfig = {
  siteName: 'LitxTech',
  legalName: 'LitxTech LLC',
  alternateNames: ['Litx', 'Litx Tech', 'LitxTechnology', 'LitxTech Yazılım'],
  origin: 'https://www.litxtech.com',
  locale: 'tr_TR',
  language: 'tr',
  defaultTitle: 'LitxTech | Yazılım Şirketi – Mobil Uygulama, SaaS ve Özel Yazılım',
  defaultDescription:
    'LitxTech (Litx); mobil uygulama, SaaS, otel/restoran yazılımı ve özel yazılım geliştiren teknoloji şirketidir. Fikirden yayına kadar ürün tasarımı, geliştirme ve destek.',
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

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'ProfessionalService'],
    '@id': `${seoConfig.origin}/#organization`,
    name: seoConfig.siteName,
    legalName: seoConfig.legalName,
    alternateName: [...seoConfig.alternateNames],
    url: seoConfig.origin,
    logo: absoluteUrl('/og-litxtech.jpg'),
    image: absoluteUrl('/og-litxtech.jpg'),
    description: seoConfig.defaultDescription,
    email: seoConfig.email,
    telephone: seoConfig.phone,
    foundingDate: '2020',
    areaServed: ['TR', 'US', 'Worldwide'],
    knowsAbout: [
      'Software development',
      'Mobile application development',
      'SaaS',
      'Hotel management software',
      'Restaurant management software',
      'Custom software',
    ],
    address: {
      '@type': 'PostalAddress',
      ...seoConfig.address,
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: seoConfig.email,
        telephone: seoConfig.phone,
        availableLanguage: ['Turkish', 'English'],
      },
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: seoConfig.email,
        telephone: seoConfig.phone,
        availableLanguage: ['Turkish', 'English'],
      },
    ],
    sameAs: [...seoConfig.sameAs],
  }
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${seoConfig.origin}/#website`,
    url: seoConfig.origin,
    name: seoConfig.siteName,
    alternateName: [...seoConfig.alternateNames],
    description: seoConfig.defaultDescription,
    inLanguage: seoConfig.language,
    publisher: { '@id': `${seoConfig.origin}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${seoConfig.origin}/cozumler?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
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
