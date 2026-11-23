import type { Lang } from '@/i18n/copy'

/** Public pages a visitor or search engine can reach. Official origin is www. */
export type SearchEntry = {
  path: string
  text: Record<Lang, { title: string; description: string }>
}

export const SITE_ORIGIN = 'https://www.litxtech.com'

export const publicSearchIndex: SearchEntry[] = [
  {
    path: '/',
    text: {
      en: { title: 'LitxTech', description: 'Official site. Software, digital products and technology platforms.' },
      tr: { title: 'LitxTech', description: 'Resmi site. Yazılım, dijital ürünler ve teknoloji platformları.' },
    },
  },
  {
    path: '/products',
    text: {
      en: { title: 'Products', description: 'SAFDAŞ, Vora, Tamuso, Nocta, MyTrabzon, Valoria and KBS Prime.' },
      tr: { title: 'Ürünler', description: 'SAFDAŞ, Vora, Tamuso, Nocta, MyTrabzon, Valoria ve KBS Prime.' },
    },
  },
  {
    path: '/safdas',
    text: {
      en: { title: 'SAFDAŞ', description: 'Prayer times and Islamic community app.' },
      tr: { title: 'SAFDAŞ', description: 'Namaz vakitleri ve İslami topluluk uygulaması.' },
    },
  },
  {
    path: '/vora',
    text: {
      en: { title: 'Vora', description: 'Community messaging and city channels by LitxTech.' },
      tr: { title: 'Vora', description: 'LitxTech ürünü Vora.' },
    },
  },
  {
    path: '/tamuso',
    text: {
      en: { title: 'Tamuso', description: 'Live audio rooms by LitxTech.' },
      tr: { title: 'Tamuso', description: 'LitxTech ürünü Tamuso.' },
    },
  },
  {
    path: '/nocta',
    text: {
      en: { title: 'Nocta', description: 'Social discovery product by LitxTech.' },
      tr: { title: 'Nocta', description: 'LitxTech ürünü Nocta.' },
    },
  },
  {
    path: '/mytrabzon',
    text: {
      en: { title: 'MyTrabzon', description: 'City guide app by LitxTech.' },
      tr: { title: 'MyTrabzon', description: 'LitxTech ürünü MyTrabzon.' },
    },
  },
  {
    path: '/valoria-app',
    text: {
      en: { title: 'Valoria', description: 'Hotel guest experience by LitxTech.' },
      tr: { title: 'Valoria', description: 'LitxTech ürünü Valoria.' },
    },
  },
  {
    path: '/kbs-prime',
    text: {
      en: { title: 'KBS Prime', description: 'Live social product by LitxTech.' },
      tr: { title: 'KBS Prime', description: 'LitxTech ürünü KBS Prime.' },
    },
  },
  {
    path: '/services',
    text: {
      en: { title: 'Services', description: 'Software, product and platform engineering services.' },
      tr: { title: 'Hizmetler', description: 'Yazılım, ürün ve platform geliştirme hizmetleri.' },
    },
  },
  {
    path: '/cozumler',
    text: {
      en: { title: 'Solutions', description: 'Software solutions by business area.' },
      tr: { title: 'Çözümler', description: 'İş alanına göre yazılım çözümleri.' },
    },
  },
  {
    path: '/projeler',
    text: {
      en: { title: 'Projects', description: 'Shipped project work.' },
      tr: { title: 'Projeler', description: 'Yayınlanan proje çalışmaları.' },
    },
  },
  {
    path: '/case-studies',
    text: {
      en: { title: 'Case studies', description: 'Product case studies.' },
      tr: { title: 'Vaka çalışmaları', description: 'Ürün vaka çalışmaları.' },
    },
  },
  {
    path: '/technology',
    text: {
      en: { title: 'Technology', description: 'The technology stack we use.' },
      tr: { title: 'Teknoloji', description: 'Kullanılan teknoloji yığını.' },
    },
  },
  {
    path: '/process',
    text: {
      en: { title: 'Process', description: 'How a project moves forward.' },
      tr: { title: 'Süreç', description: 'Bir projenin nasıl ilerlediği.' },
    },
  },
  {
    path: '/about',
    text: {
      en: { title: 'About', description: 'LitxTech software company.' },
      tr: { title: 'Hakkımızda', description: 'LitxTech yazılım şirketi.' },
    },
  },
  {
    path: '/contact',
    text: {
      en: { title: 'Contact', description: 'Get in touch to start a project.' },
      tr: { title: 'İletişim', description: 'Proje başlatmak için iletişim.' },
    },
  },
  {
    path: '/destek',
    text: {
      en: { title: 'Support', description: 'Customer support.' },
      tr: { title: 'Destek', description: 'Müşteri desteği.' },
    },
  },
  {
    path: '/sss',
    text: {
      en: { title: 'FAQ', description: 'Frequently asked questions.' },
      tr: { title: 'SSS', description: 'Sık sorulan sorular.' },
    },
  },
  {
    path: '/feed',
    text: {
      en: { title: 'Feed', description: 'Company and product updates.' },
      tr: { title: 'Feed', description: 'Şirket ve ürün güncellemeleri.' },
    },
  },
  {
    path: '/blog',
    text: {
      en: { title: 'Blog', description: 'Articles and updates.' },
      tr: { title: 'Blog', description: 'Yazılar ve güncellemeler.' },
    },
  },
  {
    path: '/privacy-policy',
    text: {
      en: { title: 'Privacy', description: 'Privacy policy.' },
      tr: { title: 'Gizlilik', description: 'Gizlilik politikası.' },
    },
  },
  {
    path: '/terms-of-service',
    text: {
      en: { title: 'Terms', description: 'Terms of service.' },
      tr: { title: 'Koşullar', description: 'Kullanım koşulları.' },
    },
  },
  {
    path: '/cookies',
    text: {
      en: { title: 'Cookies', description: 'How cookies are used.' },
      tr: { title: 'Çerezler', description: 'Çerez kullanımı.' },
    },
  },
]

export type LocalizedSearchEntry = { path: string; title: string; description: string }

export function searchSite(query: string, lang: Lang = 'en'): LocalizedSearchEntry[] {
  const localised = publicSearchIndex.map((entry) => ({
    path: entry.path,
    ...entry.text[lang],
  }))
  const q = query.trim().toLocaleLowerCase(lang === 'tr' ? 'tr' : 'en')
  if (!q) return localised
  return localised.filter((entry) => {
    const haystack = `${entry.title} ${entry.description} ${entry.path} ${SITE_ORIGIN}`.toLocaleLowerCase(
      lang === 'tr' ? 'tr' : 'en',
    )
    return q.split(/\s+/).every((part) => haystack.includes(part))
  })
}
