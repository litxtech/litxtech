/** Public pages a visitor or search engine can reach. Official origin is www. */
export type SearchEntry = {
  path: string
  title: string
  description: string
}

export const SITE_ORIGIN = 'https://www.litxtech.com'

export const publicSearchIndex: SearchEntry[] = [
  {
    path: '/',
    title: 'LitxTech',
    description: 'Resmi site. Yazılım, dijital ürünler ve teknoloji platformları.',
  },
  {
    path: '/products',
    title: 'Ürünler',
    description: 'Vora, Tamuso, Nocta, MyTrabzon, Valoria ve KBS Prime.',
  },
  { path: '/vora', title: 'Vora', description: 'LitxTech ürünü Vora.' },
  { path: '/tamuso', title: 'Tamuso', description: 'LitxTech ürünü Tamuso.' },
  { path: '/nocta', title: 'Nocta', description: 'LitxTech ürünü Nocta.' },
  { path: '/mytrabzon', title: 'MyTrabzon', description: 'LitxTech ürünü MyTrabzon.' },
  { path: '/valoria-app', title: 'Valoria', description: 'LitxTech ürünü Valoria.' },
  { path: '/kbs-prime', title: 'KBS Prime', description: 'LitxTech ürünü KBS Prime.' },
  {
    path: '/services',
    title: 'Hizmetler',
    description: 'Yazılım, ürün ve platform geliştirme hizmetleri.',
  },
  { path: '/cozumler', title: 'Çözümler', description: 'İş alanına göre yazılım çözümleri.' },
  { path: '/projeler', title: 'Projeler', description: 'Yayınlanan proje çalışmaları.' },
  { path: '/case-studies', title: 'Vaka çalışmaları', description: 'Ürün vaka çalışmaları.' },
  { path: '/technology', title: 'Teknoloji', description: 'Kullanılan teknoloji yığını.' },
  { path: '/process', title: 'Süreç', description: 'Bir projenin nasıl ilerlediği.' },
  { path: '/about', title: 'Hakkımızda', description: 'LitxTech yazılım şirketi.' },
  { path: '/contact', title: 'İletişim', description: 'Proje başlatmak için iletişim.' },
  { path: '/destek', title: 'Destek', description: 'Müşteri desteği.' },
  { path: '/sss', title: 'SSS', description: 'Sık sorulan sorular.' },
  { path: '/feed', title: 'Feed', description: 'Şirket ve ürün güncellemeleri.' },
  { path: '/blog', title: 'Blog', description: 'Yazılar ve güncellemeler.' },
  { path: '/privacy-policy', title: 'Gizlilik', description: 'Gizlilik politikası.' },
  { path: '/terms-of-service', title: 'Koşullar', description: 'Kullanım koşulları.' },
  { path: '/cookies', title: 'Çerezler', description: 'Çerez kullanımı.' },
]

export function searchSite(query: string): SearchEntry[] {
  const q = query.trim().toLocaleLowerCase('tr')
  if (!q) return publicSearchIndex
  return publicSearchIndex.filter((entry) => {
    const haystack = `${entry.title} ${entry.description} ${entry.path} ${SITE_ORIGIN}`.toLocaleLowerCase('tr')
    return q.split(/\s+/).every((part) => haystack.includes(part))
  })
}
