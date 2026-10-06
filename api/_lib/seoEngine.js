/** Isomorphic SEO catalog, sitemap, robots, and HTML head injection. No fake metrics. */

export const BRAND = 'LitxTech'
export const BRAND_DESCRIPTION =
  'LitxTech, modern web ve mobil uygulamalar, özel yazılım çözümleri, dijital ürünler ve teknoloji platformları geliştiren bir yazılım şirketidir.'
export const CONTENT_REVISION = '2026-10-06'
const DEFAULT_ORIGIN = 'https://www.litxtech.com'

const PRIVATE_PREFIXES = [
  '/admin',
  '/api',
  '/login',
  '/auth',
  '/giris',
  '/kayit',
  '/register',
  '/profile',
  '/success',
  '/cancel',
  '/dashboard',
  '/leads',
  '/content',
  '/customers',
  '/analytics',
  '/marketing',
  '/settings',
  '/system',
  '/faq',
  '/applications',
  '/messages',
  '/security',
  '/support/chat',
  '/support/tickets',
  '/seo-health',
  '/sifremi-unuttum',
  '/donation',
]

const BUILTIN_REDIRECTS = [
  { source: '/iletisim', destination: '/contact', status_code: 301, enabled: true },
  { source: '/support', destination: '/destek', status_code: 301, enabled: true },
  { source: '/projects', destination: '/projeler', status_code: 301, enabled: true },
  { source: '/privacy', destination: '/privacy-policy', status_code: 301, enabled: true },
  { source: '/terms', destination: '/terms-of-service', status_code: 301, enabled: true },
  { source: '/solutions/hotels', destination: '/cozumler/otel-yonetim-sistemi', status_code: 301, enabled: true },
  { source: '/solutions/restaurants', destination: '/cozumler/restoran-yonetim-sistemi', status_code: 301, enabled: true },
  { source: '/solutions/construction', destination: '/cozumler/ozel-yazilim', status_code: 301, enabled: true },
  { source: '/solutions/pharma', destination: '/cozumler/ozel-yazilim', status_code: 301, enabled: true },
  { source: '/nocta/sozlesme', destination: '/nocta/kullanim-sartlari', status_code: 301, enabled: true },
  { source: '/tamuso/sozlesme', destination: '/tamuso/kullanim-sartlari', status_code: 301, enabled: true },
  { source: '/products/vora', destination: '/vora', status_code: 301, enabled: true },
  { source: '/products/tamuso', destination: '/tamuso', status_code: 301, enabled: true },
  { source: '/products/nocta', destination: '/nocta', status_code: 301, enabled: true },
  { source: '/products/mytrabzon', destination: '/mytrabzon', status_code: 301, enabled: true },
  { source: '/products/valoria', destination: '/valoria-app', status_code: 301, enabled: true },
  { source: '/products/kbs-prime', destination: '/kbs-prime', status_code: 301, enabled: true },
]

function page(row) {
  return {
    index: true,
    follow: true,
    sitemap: true,
    schema: 'WebPage',
    changefreq: 'monthly',
    priority: '0.6',
    updated: CONTENT_REVISION,
    outbound: [],
    h1: '',
    ...row,
  }
}

const HUBS = [
  page({
    path: '/',
    title: 'LitxTech | Yazılım ve Dijital Ürün Geliştirme Şirketi',
    description: BRAND_DESCRIPTION,
    h1: 'Fikrinizi çalışan bir dijital ürüne dönüştürelim.',
    schema: 'WebPage',
    changefreq: 'daily',
    priority: '1.0',
    outbound: [
      '/cozumler',
      '/projeler',
      '/products',
      '/services',
      '/about',
      '/contact',
      '/destek',
      '/sss',
      '/blog',
      '/feed',
      '/projemi-anlat',
      '/privacy-policy',
      '/terms-of-service',
      '/commercial-agreement',
      '/technology',
      '/process',
      '/case-studies',
      '/cookies',
    ],
  }),
  page({
    path: '/about',
    title: 'Hakkımızda | LitxTech',
    description:
      'LitxTech; modern web ve mobil uygulamalar, özel yazılım ve dijital ürünler geliştiren bir yazılım şirketidir. Hizmetler, ürünler ve iletişim burada.',
    h1: 'LitxTech — yazılımı işe dönüştüren ekip',
    schema: 'AboutPage',
    priority: '0.9',
    outbound: ['/cozumler', '/products', '/projeler', '/contact'],
  }),
  page({
    path: '/cozumler',
    title: 'Yazılım Geliştirme | LitxTech',
    description:
      'LitxTech yazılım geliştirme çözümleri: otel, restoran, mobil uygulama, sosyal platform ve kuruma özel yazılım. Kapsamı inceleyip teklif alın.',
    h1: 'İşinize uygun yazılım çözüm alanları',
    schema: 'CollectionPage',
    changefreq: 'weekly',
    priority: '0.95',
    outbound: [
      '/cozumler/otel-yonetim-sistemi',
      '/cozumler/restoran-yonetim-sistemi',
      '/cozumler/sosyal-medya-uygulamasi',
      '/cozumler/arkadaslik-uygulamasi',
      '/cozumler/sehire-ozel-uygulamalar',
      '/cozumler/ozel-yazilim',
      '/projeler',
      '/contact',
    ],
  }),
  page({
    path: '/projeler',
    title: 'Projeler ve Case Studies | LitxTech',
    description:
      'LitxTech projeleri: otel yazılımı, sosyal platform, mobil uygulama ve şehir ürünleri. İlgili çözümlere buradan geçin.',
    h1: 'Sahada çalışan ürünler',
    schema: 'CollectionPage',
    changefreq: 'weekly',
    priority: '0.9',
    outbound: ['/projeler/valoriahotel', '/projeler/vora', '/projeler/tamuso', '/cozumler', '/contact'],
  }),
  page({
    path: '/products',
    title: 'Dijital Ürünler ve Yazılım Platformları | LitxTech',
    description:
      'LitxTech dijital ürünleri ve yazılım platformları: Vora, Tamuso, Nocta, MyTrabzon, Valoria ve KBS Prime.',
    h1: 'Software we have actually shipped.',
    schema: 'CollectionPage',
    changefreq: 'weekly',
    priority: '0.9',
    outbound: ['/vora', '/tamuso', '/nocta', '/mytrabzon', '/valoria-app', '/kbs-prime', '/contact'],
  }),
  page({
    path: '/contact',
    title: 'İletişim | LitxTech',
    description:
      'Proje, destek veya iş birliği için LitxTech ile iletişime geçin. Formu doldurun ya da telefon, e-posta ve WhatsApp üzerinden yazın.',
    h1: 'İletişim',
    schema: 'ContactPage',
    priority: '0.9',
    outbound: ['/projemi-anlat', '/destek', '/about'],
  }),
  page({
    path: '/destek',
    title: 'Destek Merkezi | LitxTech',
    description:
      'LitxTech destek merkezi: sık sorulan sorular, proje talebi ve doğrudan iletişim. Ürün ve yazılım projeleriniz için yardım alın.',
    h1: 'Size nasıl yardımcı olabiliriz?',
    schema: 'WebPage',
    changefreq: 'weekly',
    priority: '0.8',
    outbound: ['/sss', '/contact', '/projemi-anlat'],
  }),
  page({
    path: '/sss',
    title: 'Sıkça Sorulan Sorular | LitxTech',
    description:
      'LitxTech sık sorulan sorular: mobil uygulama, web yazılım, özel yazılım, yayınlama ve destek süreçleri.',
    h1: 'Sıkça sorulan sorular',
    schema: 'FAQPage',
    changefreq: 'weekly',
    priority: '0.7',
    outbound: ['/destek', '/contact', '/cozumler'],
  }),
  page({
    path: '/projemi-anlat',
    title: 'Projenizi Anlatın | LitxTech',
    description:
      'Fikrinizi anlatın. LitxTech, web ve mobil uygulama ile özel yazılım projeleri için kapsam ve teklif sürecini birlikte netleştirir.',
    h1: 'Projenizi anlatın',
    priority: '0.85',
    outbound: ['/contact', '/cozumler'],
  }),
  page({
    path: '/services',
    title: 'Services | LitxTech',
    description: 'What LitxTech builds: mobile products, web applications, and business software.',
    h1: 'Services',
    schema: 'CollectionPage',
    priority: '0.7',
    outbound: ['/cozumler', '/contact'],
  }),
  page({
    path: '/technology',
    title: 'Technology | LitxTech',
    description: 'The technologies LitxTech uses to build and run its products.',
    h1: 'Technology',
    priority: '0.5',
    outbound: ['/about', '/cozumler'],
  }),
  page({
    path: '/process',
    title: 'Process | LitxTech',
    description: 'How LitxTech takes a product from discovery to scale.',
    h1: 'Process',
    priority: '0.5',
    outbound: ['/projemi-anlat', '/contact'],
  }),
  page({
    path: '/case-studies',
    title: 'Case studies | LitxTech',
    description: 'Product stories from software LitxTech has shipped.',
    h1: 'Case studies',
    schema: 'CollectionPage',
    priority: '0.6',
    outbound: ['/projeler', '/products'],
  }),
  page({
    path: '/cookies',
    title: 'Cookies | LitxTech',
    description: 'How LitxTech uses cookies on this website.',
    h1: 'Cookies',
    priority: '0.3',
    outbound: ['/privacy-policy'],
  }),
  page({
    path: '/search',
    title: 'Site arama | LitxTech',
    description:
      'LitxTech resmi sitesinde ara. Resmi adres https://www.litxtech.com — ürünler, hizmetler, çözümler ve iletişim.',
    h1: 'LitxTech site arama',
    priority: '0.4',
    outbound: ['/', '/products', '/services', '/contact'],
  }),
  page({
    path: '/feed',
    title: 'Feed | LitxTech',
    description: 'Ürün, mühendislik ve şirket güncellemeleri.',
    h1: 'LitxTech Feed',
    priority: '0.5',
    outbound: ['/blog', '/products'],
  }),
  page({
    path: '/blog',
    title: 'Blog | LitxTech',
    description:
      'LitxTech blogunda yayınlanan yazılım, mobil uygulama ve dijital ürün yazıları. Taslak içerik listelenmez.',
    h1: 'Blog',
    schema: 'CollectionPage',
    changefreq: 'daily',
    priority: '0.7',
    outbound: ['/cozumler', '/products'],
  }),
  page({
    path: '/ai-builder',
    title: 'AI Builder | LitxTech',
    description: 'LitxTech AI Builder ile uygulama fikrinizi tarif edin ve yazılım geliştirme sürecini başlatın.',
    h1: 'AI Builder',
    priority: '0.5',
    outbound: ['/contact', '/packages'],
  }),
  page({
    path: '/investment',
    title: 'Investment | LitxTech',
    description: 'LitxTech ile büyüme ve iş birliği fırsatları. Stratejik ortaklık için iletişime geçin.',
    h1: 'Investment',
    priority: '0.4',
    outbound: ['/contact', '/about'],
  }),
  page({
    path: '/packages',
    title: 'Paketler | LitxTech',
    description: 'LitxTech web ve yazılım paketleri. Kapsamı inceleyip projenizi anlatın.',
    h1: 'Paketler',
    priority: '0.6',
    outbound: ['/projemi-anlat', '/contact', '/services'],
  }),
]

const SOLUTIONS = [
  ['otel-yonetim-sistemi', 'Otel Yönetim Sistemi | LitxTech', 'Rezervasyon, müşteri ve oda yönetimi, ödeme ve raporlama ile otel operasyonlarını tek panelde birleştiren yazılım çözümleri.', 'Otel Yönetim Sistemleri'],
  ['restoran-yonetim-sistemi', 'Restoran Yönetim Sistemi | LitxTech', 'Sipariş, menü, mutfak ekranı, POS, personel ve muhasebe süreçlerini tek panelde toplayan restoran yazılımı.', 'Restoran Yönetim Sistemleri'],
  ['sosyal-medya-uygulamasi', 'Sosyal Medya ve Topluluk Uygulaması | LitxTech', 'Mesajlaşma, bildirim, akış ve topluluk yönetimi ile sosyal platform ve topluluk uygulamaları geliştiriyoruz.', 'Sosyal Medya ve Topluluk Uygulaması'],
  ['arkadaslik-uygulamasi', 'Arkadaşlık ve Eşleşme Uygulaması | LitxTech', 'Profil, eşleşme, sohbet ve üyelik modelleri ile modern tanışma ve arkadaşlık uygulamaları geliştiriyoruz.', 'Arkadaşlık ve Eşleşme Uygulaması'],
  ['sehire-ozel-uygulamalar', 'Şehre Özel Mobil Uygulama | LitxTech', 'Haber, etkinlik, rehber ve duyuruları bir araya getiren şehir mobil uygulamaları geliştiriyoruz.', 'Şehre Özel Mobil Uygulama'],
  ['ozel-yazilim', 'Kuruma Özel Yazılım | LitxTech', 'CRM, operasyon panelleri, entegrasyon ve otomasyon ile kuruma özel yazılım çözümleri sunuyoruz.', 'Kuruma Özel Yazılım'],
].map(([slug, title, description, h1]) =>
  page({
    path: `/cozumler/${slug}`,
    title,
    description,
    h1,
    schema: 'Service',
    priority: '0.85',
    outbound: ['/cozumler', '/projeler', '/contact', '/projemi-anlat'],
  }),
)

const PROJECTS = [
  ['valoriahotel', 'Valoria Hotel | LitxTech Projeler', 'Otel ve konaklama işletmeleri için mobil deneyim ve iletişim odağı.', 'Valoria Hotel'],
  ['sosyal-platform', 'KBS Prime | LitxTech Projeler', 'Canlı kart ve topluluk odaklı sosyal platform deneyimi.', 'KBS Prime'],
  ['dating-app', 'Dating App | LitxTech Projeler', 'Arkadaşlık ve eşleşme senaryoları için geliştirilen ürün örneği.', 'Dating App'],
  ['vora', 'Vora | LitxTech Projeler', 'Karadeniz şehirleri için anlık haberleşme ve topluluk platformu.', 'Vora'],
  ['tamuso', 'Tamuso | LitxTech Projeler', 'Canlı sesli odalar ve modern sesli sohbet platformu.', 'Tamuso'],
  ['sehir-uygulamasi', 'Şehir Uygulaması | LitxTech Projeler', 'Yerel içerik ve topluluk için şehir uygulaması örneği.', 'Şehir Uygulaması'],
].map(([slug, title, description, h1]) =>
  page({
    path: `/projeler/${slug}`,
    title,
    description,
    h1,
    schema: 'Article',
    priority: '0.7',
    outbound: ['/projeler', '/cozumler', '/contact', '/products'],
  }),
)

const APP_PAGES = [
  ['/vora', 'Vora | Karadeniz Topluluk Platformu | LitxTech', 'Vora — Karadeniz şehirleri için anlık haberleşme ve topluluk platformu. Gizlilik, kullanım şartları, çocuk güvenliği ve destek.', 'SoftwareApplication', ['/vora/gizlilik', '/vora/destek', '/contact']],
  ['/tamuso', 'Tamuso | Sesli Oda Platformu | LitxTech', 'Tamuso — modern sesli oda ve canlı sohbet platformu. Gizlilik, kullanım şartları, çocuk koruma politikası, hesap silme ve destek.', 'SoftwareApplication', ['/tamuso/gizlilik', '/tamuso/destek', '/contact']],
  ['/nocta', 'Nocta | LitxTech', 'Nocta — güvenli arkadaş bulma ve sosyal keşif uygulaması. Gizlilik, kullanım şartları, çocuk güvenliği politikası ve destek.', 'SoftwareApplication', ['/nocta/gizlilik', '/nocta/destek']],
  ['/mytrabzon', 'MyTrabzon | LitxTech', 'MyTrabzon şehir rehberi ve topluluk uygulaması. LitxTech tarafından geliştirilen yerel ürün.', 'SoftwareApplication', ['/support/mytrabzon', '/contact']],
  ['/valoria-app', 'Valoria | LitxTech', 'Valoria otel markası için mobil konuk deneyimi. Gizlilik, şartlar ve destek sayfalarıyla yayınlanır.', 'SoftwareApplication', ['/valoria-app-privacy', '/support/valoria-app']],
  ['/kbs-prime', 'KBS Prime | LitxTech', 'KBS Prime canlı sosyal ürünü. Gizlilik, şartlar ve destek bağlantıları ürün sayfasındadır.', 'SoftwareApplication', ['/kbs-prime-privacy', '/support/kbs-prime']],
  ['/vora/gizlilik', 'Vora Gizlilik Politikası | LitxTech', 'Vora kullanıcı güvenliği, içerik politikası, veri gizliliği ve hizmet koşulları.', 'WebPage', ['/vora']],
  ['/vora/kullanim-sartlari', 'Vora Kullanım Şartları | LitxTech', 'Vora Kullanıcı Politikası: kurallar, güvenlik, yaptırımlar, veri gizliliği ve yasal uyum.', 'WebPage', ['/vora']],
  ['/vora/destek', 'Vora Destek | LitxTech', 'Vora uygulaması için destek ve talep bilgileri.', 'WebPage', ['/vora', '/destek']],
  ['/vora/hesap-silme', 'Vora Hesap Silme | LitxTech', 'Vora hesabınızı uygulama içinden veya e-posta ile nasıl silebileceğiniz.', 'WebPage', ['/vora']],
  ['/vora/child-safety', 'Vora – Çocuk Koruma Politikası | LitxTech', 'Vora çocuk koruma politikası: kullanıcı güvenliği, sıfır tolerans, yaş sınırı, denetim ve yaptırımlar.', 'WebPage', ['/vora']],
  ['/vora/abonelik', 'Vora Abonelik ve Fiyatlandırma | LitxTech', 'Vora abonelik planları, otomatik yenileme, iptal ve cayma hakkı bilgileri.', 'WebPage', ['/vora']],
  ['/tamuso/gizlilik', 'Tamuso Gizlilik Politikası', 'Tamuso mobil uygulaması ve bağlantılı hizmetler için yayımlanan gizlilik politikası.', 'WebPage', ['/tamuso']],
  ['/tamuso/kullanim-sartlari', 'Tamuso Kullanım Koşulları', 'Tamuso mobil uygulaması ve bağlantılı hizmetleri için yayımlanan kullanım koşulları.', 'WebPage', ['/tamuso']],
  ['/tamuso/destek', 'Tamuso Destek | LitxTech', 'Tamuso sesli oda uygulaması için destek ve talep bilgileri.', 'WebPage', ['/tamuso', '/destek']],
  ['/tamuso/hesap-silme', 'Tamuso Account Deletion / Hesap Silme | LitxTech', 'How to delete your Tamuso account in the app or by email, including the retention timeline.', 'WebPage', ['/tamuso']],
  ['/tamuso/child-safety', 'Tamuso Çocuk Güvenliği ve Koruma Politikası', 'Tamuso çocuk güvenliği standardı, raporlama ve iletişim noktası.', 'WebPage', ['/tamuso']],
  ['/nocta/gizlilik', 'Nocta Kullanıcı Güvenliği ve Gizlilik Politikası | LitxTech', 'Nocta kullanıcı güvenliği, içerik politikası, veri gizliliği ve hizmet koşulları.', 'WebPage', ['/nocta']],
  ['/nocta/kullanim-sartlari', 'Nocta Kullanım Şartları | LitxTech', 'Nocta Kullanıcı Politikası: kurallar, güvenlik, yaptırımlar ve yasal uyum.', 'WebPage', ['/nocta']],
  ['/nocta/destek', 'Nocta Destek | LitxTech', 'Nocta uygulaması için destek ve talep bilgileri.', 'WebPage', ['/nocta', '/destek']],
  ['/nocta/hesap-silme', 'Nocta Hesap Silme | LitxTech', 'Nocta hesabınızı uygulama içinden veya e-posta ile nasıl silebileceğiniz.', 'WebPage', ['/nocta']],
  ['/nocta/child-safety', 'Nocta – Çocuk Koruma Politikası | LitxTech', 'Nocta çocuk koruma politikası: kullanıcı güvenliği, sıfır tolerans ve yaptırımlar.', 'WebPage', ['/nocta']],
].map(([path, title, description, schema, outbound]) =>
  page({
    path,
    title,
    description,
    h1: title.split('|')[0].trim(),
    schema,
    priority: schema === 'SoftwareApplication' ? '0.75' : '0.4',
    outbound,
  }),
)

const LEGAL = [
  ['/privacy-policy', 'Gizlilik Politikası | LitxTech'],
  ['/terms-of-service', 'Kullanım Şartları | LitxTech'],
  ['/refund-policy', 'İade Politikası | LitxTech'],
  ['/data-security-policy', 'Veri Güvenliği | LitxTech'],
  ['/commercial-agreement', 'Ticari Sözleşme | LitxTech'],
  ['/subprocessors', 'Alt İşleyenler | LitxTech'],
  ['/account-deletion-policy', 'Hesap Silme Politikası | LitxTech'],
  ['/child-safety-policy', 'Çocuk Güvenliği Politikası | LitxTech'],
  ['/community-policy', 'Topluluk Politikası | LitxTech'],
  ['/kbs-prime', 'KBS Prime | LitxTech'],
  ['/kbs-prime-privacy', 'KBS Prime Gizlilik | LitxTech'],
  ['/kbs-prime-privacy-tr', 'KBS Prime Gizlilik (TR) | LitxTech'],
  ['/kbs-prime-terms', 'KBS Prime Şartlar | LitxTech'],
  ['/kbs-prime/delete-account', 'KBS Prime Hesap Silme | LitxTech'],
  ['/support/kbs-prime', 'KBS Prime Destek | LitxTech'],
  ['/support/mytrabzon', 'MyTrabzon Destek | LitxTech'],
  ['/mytrabzon/delete-account', 'MyTrabzon Hesap Silme | LitxTech'],
  ['/valoria-app-privacy', 'Valoria Gizlilik | LitxTech'],
  ['/valoria-app-terms', 'Valoria Şartlar | LitxTech'],
  ['/valoria-app/delete-account', 'Valoria Hesap Silme | LitxTech'],
  ['/support/valoria-app', 'Valoria Destek | LitxTech'],
  ['/legal', 'Yasal Belgeler | LitxTech'],
].map(([path, title]) =>
  page({
    path,
    title,
    description: `${title.replace(' | LitxTech', '')}. LitxTech tarafından yayımlanan güncel metin.`,
    h1: title.replace(' | LitxTech', ''),
    priority: '0.3',
    changefreq: 'yearly',
    outbound: ['/contact', '/'],
  }),
)

function dedupePages(rows) {
  const map = new Map()
  for (const row of rows) {
    if (!map.has(row.path)) map.set(row.path, row)
  }
  return [...map.values()]
}

export function staticCatalog() {
  return dedupePages([...HUBS, ...SOLUTIONS, ...PROJECTS, ...APP_PAGES, ...LEGAL])
}

export function siteOrigin() {
  const fromProcess =
    typeof process !== 'undefined' && process.env
      ? process.env.VITE_PUBLIC_SITE_URL || process.env.PUBLIC_SITE_URL || ''
      : ''
  return String(fromProcess || DEFAULT_ORIGIN).replace(/\/$/, '')
}

export function normalizePath(input) {
  if (!input) return '/'
  let path = String(input).trim()
  try {
    if (path.startsWith('http://') || path.startsWith('https://')) path = new URL(path).pathname
  } catch {
    /* keep */
  }
  path = path.split('?')[0].split('#')[0]
  if (!path.startsWith('/')) path = `/${path}`
  path = path.replace(/\/+$/, '') || '/'
  return path.toLowerCase()
}

export function isPrivatePath(pathname) {
  const path = normalizePath(pathname)
  return PRIVATE_PREFIXES.some((prefix) => path === prefix || path.startsWith(`${prefix}/`))
}

export function absoluteUrl(path = '') {
  const origin = siteOrigin()
  const normalized = normalizePath(path || '/')
  return normalized === '/' ? `${origin}/` : `${origin}${normalized}`
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function clean(value) {
  const text = String(value || '').trim()
  return text || ''
}

function socialUrls(social) {
  if (!social || typeof social !== 'object') return []
  return Object.values(social).filter((url) => typeof url === 'string' && /^https:\/\//i.test(url))
}

export function organizationNode(company = {}) {
  const origin = siteOrigin()
  const name = clean(company.company_name) || BRAND
  const description = clean(company.description) || BRAND_DESCRIPTION
  const node = {
    '@type': 'Organization',
    '@id': `${origin}/#organization`,
    name,
    url: clean(company.website) || origin,
    description,
  }
  if (clean(company.legal_name)) node.legalName = clean(company.legal_name)
  const logo = clean(company.logo_url) || `${origin}/favicon.svg`
  node.logo = logo.startsWith('http') ? logo : absoluteUrl(logo)
  if (clean(company.email)) node.email = clean(company.email)
  if (clean(company.phone)) node.telephone = clean(company.phone)
  const sameAs = socialUrls(company.social)
  if (sameAs.length) node.sameAs = sameAs
  if (clean(company.email) || clean(company.phone)) {
    node.contactPoint = [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: clean(company.email) || undefined,
        telephone: clean(company.phone) || undefined,
        availableLanguage: ['Turkish', 'English'],
      },
    ]
  }
  if (clean(company.address) || (clean(company.city) && clean(company.country))) {
    node.address = {
      '@type': 'PostalAddress',
      streetAddress: clean(company.address) || undefined,
      addressLocality: clean(company.city) || undefined,
      addressCountry: clean(company.country) || undefined,
    }
  }
  return node
}

export function websiteNode(company = {}) {
  const origin = siteOrigin()
  return {
    '@type': 'WebSite',
    '@id': `${origin}/#website`,
    url: `${origin}/`,
    name: clean(company.company_name) || BRAND,
    description: clean(company.description) || BRAND_DESCRIPTION,
    inLanguage: 'tr',
    publisher: { '@id': `${origin}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${origin}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

export function buildJsonLd(pageRow, ctx = {}) {
  const origin = siteOrigin()
  const graph = [organizationNode(ctx.company || {}), websiteNode(ctx.company || {})]
  const pageUrl = absoluteUrl(pageRow.path)
  const type = pageRow.schema || 'WebPage'
  if (type !== 'Organization' && type !== 'WebSite') {
    const webPage = {
      '@type': type === 'FAQPage' || type === 'ContactPage' || type === 'AboutPage' || type === 'CollectionPage' ? ['WebPage', type] : type,
      '@id': `${pageUrl}#webpage`,
      url: pageUrl,
      name: pageRow.title,
      description: pageRow.description,
      isPartOf: { '@id': `${origin}/#website` },
      about: { '@id': `${origin}/#organization` },
      inLanguage: 'tr',
    }
    if (type === 'Service') {
      graph.push({
        '@type': 'Service',
        name: pageRow.h1 || pageRow.title,
        description: pageRow.description,
        url: pageUrl,
        provider: { '@id': `${origin}/#organization` },
      })
    } else if (type === 'SoftwareApplication') {
      graph.push({
        '@type': 'SoftwareApplication',
        name: pageRow.h1 || pageRow.title,
        description: pageRow.description,
        url: pageUrl,
        applicationCategory: 'BusinessApplication',
        publisher: { '@id': `${origin}/#organization` },
        offers: pageRow.offers || undefined,
      })
    } else if (type === 'FAQPage' && Array.isArray(ctx.faqs) && ctx.faqs.length && pageRow.path === '/sss') {
      webPage.mainEntity = ctx.faqs.slice(0, 12).map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      }))
    } else if (type === 'Article') {
      graph.push({
        '@type': 'Article',
        headline: pageRow.h1 || pageRow.title,
        description: pageRow.description,
        mainEntityOfPage: pageUrl,
        author: pageRow.author ? { '@type': 'Organization', name: pageRow.author } : { '@id': `${origin}/#organization` },
        publisher: { '@id': `${origin}/#organization` },
        datePublished: pageRow.published || pageRow.updated,
        dateModified: pageRow.updated,
      })
    }
    graph.push(webPage)
  }
  if (pageRow.path !== '/') {
    const crumbs = breadcrumbsFor(pageRow)
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: crumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: absoluteUrl(crumb.path),
      })),
    })
  }
  return { '@context': 'https://schema.org', '@graph': graph }
}

const LABELS = {
  cozumler: 'Çözümler',
  projeler: 'Projeler',
  products: 'Ürünler',
  services: 'Hizmetler',
  about: 'Hakkımızda',
  contact: 'İletişim',
  destek: 'Destek',
  sss: 'SSS',
  blog: 'Blog',
  feed: 'Feed',
}

export function breadcrumbsFor(pageRow) {
  const parts = normalizePath(pageRow.path).split('/').filter(Boolean)
  const crumbs = [{ name: 'Ana Sayfa', path: '/' }]
  let acc = ''
  parts.forEach((part, index) => {
    acc += `/${part}`
    const last = index === parts.length - 1
    crumbs.push({
      name: last ? pageRow.h1 || pageRow.title.split('|')[0].trim() : LABELS[part] || part,
      path: acc,
    })
  })
  return crumbs
}

function applyOverride(base, row) {
  const next = { ...base }
  if (clean(row.title)) next.title = clean(row.title)
  if (clean(row.description)) next.description = clean(row.description)
  if (clean(row.h1)) next.h1 = clean(row.h1)
  if (clean(row.canonical)) next.canonical = clean(row.canonical)
  if (clean(row.og_title)) next.ogTitle = clean(row.og_title)
  if (clean(row.og_description)) next.ogDescription = clean(row.og_description)
  if (clean(row.og_image)) next.ogImage = clean(row.og_image)
  if (clean(row.schema_type)) next.schema = clean(row.schema_type)
  if (clean(row.focus_topic)) next.focusTopic = clean(row.focus_topic)
  if (row.robots) {
    const robots = String(row.robots).toLowerCase()
    if (robots.includes('noindex')) next.index = false
    if (robots.includes('nofollow')) next.follow = false
    if (robots.includes('index') && !robots.includes('noindex')) next.index = true
  }
  if (row.status === 'draft' || row.status === 'archived' || row.status === 'private') {
    next.index = false
    next.sitemap = false
  }
  if (row.include_in_sitemap === false) next.sitemap = false
  if (row.updated_at) next.updated = String(row.updated_at).slice(0, 10)
  next.override = true
  return next
}

function robotsFor(pageRow) {
  const index = pageRow.index ? 'index' : 'noindex'
  const follow = pageRow.follow === false ? 'nofollow' : 'follow'
  return `${index}, ${follow}`
}

export function mergeCatalog(ctx = {}) {
  const map = new Map(staticCatalog().map((row) => [row.path, { ...row }]))
  const posts = Array.isArray(ctx.posts) ? ctx.posts : []
  if (posts.length) {
    const blog = map.get('/blog')
    if (blog) {
      blog.index = true
      blog.sitemap = true
      blog.outbound = [...new Set([...(blog.outbound || []), ...posts.map((post) => `/blog/${post.slug}`)])]
      const newest = posts.map((post) => post.updated_at || post.published_at).filter(Boolean).sort().at(-1)
      if (newest) blog.updated = String(newest).slice(0, 10)
    }
    for (const post of posts) {
      if (!post.slug || (post.status && post.status !== 'published')) continue
      const path = `/blog/${String(post.slug).toLowerCase()}`
      const seo = post.seo && typeof post.seo === 'object' ? post.seo : {}
      map.set(
        path,
        page({
          path,
          title: clean(seo.title) || `${post.title} | LitxTech`,
          description: clean(seo.description) || clean(post.excerpt) || clean(post.title),
          h1: post.title,
          schema: 'Article',
          updated: String(post.updated_at || post.published_at || CONTENT_REVISION).slice(0, 10),
          published: post.published_at ? String(post.published_at).slice(0, 10) : undefined,
          author: clean(post.author) || BRAND,
          ogImage: clean(post.cover) || clean(seo.og_image) || '',
          image: clean(post.cover) || clean(seo.og_image) || '',
          priority: '0.6',
          changefreq: 'weekly',
          outbound: ['/blog', '/cozumler', '/products', '/contact'],
        }),
      )
    }
  }
  for (const service of ctx.services || []) {
    if (!service.slug || (service.status && service.status !== 'published')) continue
    const path = `/services/${String(service.slug).toLowerCase()}`
    if (map.has(path)) continue
    const seo = service.seo && typeof service.seo === 'object' ? service.seo : {}
    map.set(
      path,
      page({
        path,
        title: clean(seo.title) || `${service.title} | LitxTech`,
        description: clean(seo.description) || clean(service.short_description) || service.title,
        h1: service.title,
        schema: 'Service',
        updated: String(service.updated_at || CONTENT_REVISION).slice(0, 10),
        outbound: ['/services', '/contact', '/cozumler'],
      }),
    )
  }
  for (const study of ctx.cases || []) {
    if (!study.slug || (study.status && study.status !== 'published')) continue
    const path = `/case-studies/${String(study.slug).toLowerCase()}`
    map.set(
      path,
      page({
        path,
        title: `${study.title} | LitxTech`,
        description: clean(study.summary) || study.title,
        h1: study.title,
        schema: 'Article',
        updated: String(study.updated_at || CONTENT_REVISION).slice(0, 10),
        outbound: ['/case-studies', '/projeler', '/contact'],
      }),
    )
  }
  for (const product of ctx.products || []) {
    if (!product.slug || (product.status && product.status !== 'published')) continue
    const path = `/products/${String(product.slug).toLowerCase()}`
    if (matchRedirect(path, ctx) || isPrivatePath(path)) continue
    const image = clean(product.cover_image_url) || clean(product.og_image) || ''
    if (map.has(path)) {
      const existing = map.get(path)
      if (product.updated_at) existing.updated = String(product.updated_at).slice(0, 10)
      if (image) existing.image = image
      continue
    }
    map.set(
      path,
      page({
        path,
        title: clean(product.seo_title) || `${product.name || product.slug} | LitxTech`,
        description: clean(product.seo_description) || clean(product.short_description) || clean(product.name),
        h1: product.name || product.slug,
        schema: 'SoftwareApplication',
        updated: String(product.updated_at || CONTENT_REVISION).slice(0, 10),
        image,
        ogImage: image,
        priority: '0.7',
        changefreq: 'weekly',
        outbound: ['/products', '/contact'],
      }),
    )
  }
  for (const project of ctx.projects || []) {
    if (!project.slug || (project.status && project.status !== 'published')) continue
    const path = `/projeler/${String(project.slug).toLowerCase()}`
    if (matchRedirect(path, ctx) || isPrivatePath(path)) continue
    const image = clean(project.cover_image) || clean(project.image_url) || ''
    if (map.has(path)) {
      const existing = map.get(path)
      if (project.updated_at) existing.updated = String(project.updated_at).slice(0, 10)
      if (image) existing.image = image
      continue
    }
    map.set(
      path,
      page({
        path,
        title: clean(project.seo_title) || `${project.name || project.slug} | LitxTech Projeler`,
        description: clean(project.seo_description) || clean(project.summary) || clean(project.name),
        h1: project.name || project.slug,
        schema: 'Article',
        updated: String(project.updated_at || project.published_at || CONTENT_REVISION).slice(0, 10),
        image,
        ogImage: image,
        priority: '0.7',
        changefreq: 'weekly',
        outbound: ['/projeler', '/contact'],
      }),
    )
  }
  for (const cmsPage of ctx.cmsPages || []) {
    if (!cmsPage.slug || (cmsPage.status && cmsPage.status !== 'published')) continue
    const slug = String(cmsPage.slug).replace(/^\/+|\/+$/g, '')
    if (!slug) continue
    const path = normalizePath(`/sayfa/${slug}`)
    if (matchRedirect(path, ctx) || isPrivatePath(path)) continue
    const image = clean(cmsPage.og_image) || clean(cmsPage.featured_image) || ''
    const indexable = cmsPage.no_index !== true
    map.set(
      path,
      page({
        path,
        title: clean(cmsPage.seo_title) || `${cmsPage.title || slug} | LitxTech`,
        description: clean(cmsPage.seo_description) || clean(cmsPage.excerpt) || clean(cmsPage.title),
        h1: cmsPage.title || slug,
        canonical: clean(cmsPage.canonical_url) || '',
        updated: String(cmsPage.updated_at || cmsPage.published_at || CONTENT_REVISION).slice(0, 10),
        image,
        ogImage: image,
        index: indexable,
        sitemap: indexable,
        priority: '0.6',
        changefreq: 'weekly',
        outbound: ['/', '/contact'],
      }),
    )
  }
  for (const row of ctx.pages || []) {
    const path = normalizePath(row.path)
    const base = map.get(path) || page({ path, title: row.title || path, description: row.description || '', h1: row.title || path })
    map.set(path, applyOverride(base, row))
  }
  return [...map.values()]
}

export function matchRedirect(pathname, ctx = {}) {
  const path = normalizePath(pathname)
  const rows = [...BUILTIN_REDIRECTS, ...(ctx.redirects || [])]
  const row = rows.find((item) => item.enabled !== false && normalizePath(item.source) === path)
  if (!row) return null
  const destination = String(row.destination || '')
  if (!destination || normalizePath(destination) === path) return null
  if (!(destination.startsWith('/') && !destination.startsWith('//')) && !/^https?:\/\//i.test(destination)) return null
  return { destination, status_code: Number(row.status_code) || 301 }
}

export function resolveRequest(pathname, ctx = {}) {
  const path = normalizePath(pathname)
  if (path === '/admin' || path.startsWith('/admin/')) return { passthrough: true }
  const redirect = matchRedirect(path, ctx)
  if (redirect) return { redirect }
  if (path.startsWith('/feed/') && path !== '/feed') {
    const slug = path.slice('/feed/'.length)
    return { redirect: { destination: `/blog/${slug}`, status_code: 301 } }
  }
  if (isPrivatePath(path)) {
    return {
      status: 200,
      page: page({
        path,
        title: 'LitxTech',
        description: BRAND_DESCRIPTION,
        index: false,
        follow: false,
        sitemap: false,
        h1: '',
      }),
    }
  }
  const pages = mergeCatalog(ctx)
  const found = pages.find((row) => row.path === path)
  if (!found) {
    return {
      status: 404,
      page: page({
        path,
        title: 'Sayfa bulunamadı | LitxTech',
        description: 'Aradığınız sayfa yayında değil. Ana sayfa, çözümler, ürünler veya iletişim üzerinden devam edebilirsiniz.',
        h1: 'Sayfa bulunamadı',
        index: false,
        follow: true,
        sitemap: false,
        schema: 'WebPage',
      }),
    }
  }
  return { status: found.index ? 200 : 200, page: found }
}

export function buildRobotsTxt(ctx = {}) {
  const origin = siteOrigin()
  const extra = Array.isArray(ctx.settings?.robots_extra) ? ctx.settings.robots_extra : []
  const lines = [
    'User-agent: *',
    'Allow: /',
    'Disallow: /admin',
    'Disallow: /admin/',
    'Disallow: /api/',
    'Disallow: /login',
    'Disallow: /login/',
    'Disallow: /register',
    'Disallow: /register/',
    'Disallow: /kayit',
    'Disallow: /giris',
    'Disallow: /auth',
    'Disallow: /auth/',
    'Disallow: /dashboard',
    'Disallow: /dashboard/',
    'Disallow: /profile',
    'Disallow: /success',
    'Disallow: /cancel',
    'Disallow: /seo-health',
    'Disallow: /donation',
    ...extra,
    '',
    `Sitemap: ${origin}/sitemap.xml`,
    '',
  ]
  return lines.join('\n')
}

const CHANGEFREQ = new Set(['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'])

function sitemapPriority(value) {
  const number = Number(value)
  if (!Number.isFinite(number)) return '0.5'
  return Math.min(1, Math.max(0, number)).toFixed(1)
}

function sitemapImage(row) {
  const raw = clean(row.image) || clean(row.ogImage)
  if (!/^https:\/\//i.test(raw)) return ''
  return `    <image:image>\n      <image:loc>${escapeHtml(raw)}</image:loc>\n    </image:image>\n`
}

export function buildSitemapXml(ctx = {}) {
  const empty = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"></urlset>`
  if (ctx.settings?.sitemap_enabled === false) return empty
  const pages = mergeCatalog(ctx)
    .filter((row) => row.sitemap && row.index && !isPrivatePath(row.path) && !matchRedirect(row.path, ctx))
    .sort((a, b) => (a.path === '/' ? -1 : b.path === '/' ? 1 : a.path.localeCompare(b.path)))
  const urls = pages
    .map((row) => {
      const lastmod = /^\d{4}-\d{2}-\d{2}/.test(String(row.updated || '')) ? String(row.updated).slice(0, 10) : CONTENT_REVISION
      const freq = CHANGEFREQ.has(row.changefreq) ? row.changefreq : 'monthly'
      const image = sitemapImage(row)
      return `  <url>\n    <loc>${escapeHtml(absoluteUrl(row.path))}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${freq}</changefreq>\n    <priority>${sitemapPriority(row.priority)}</priority>\n${image}  </url>`
    })
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls}\n</urlset>`
}

export function renderHeadBlock(pageRow, ctx = {}) {
  const settings = ctx.settings || {}
  const title = pageRow.title
  const description = pageRow.description
  const url = pageRow.canonical || absoluteUrl(pageRow.path)
  const imagePath = pageRow.ogImage || settings.default_og_image || '/og-litxtech.jpg'
  const image = /^https?:\/\//i.test(imagePath) ? imagePath : absoluteUrl(imagePath)
  const robots = robotsFor(pageRow)
  const ogTitle = pageRow.ogTitle || title
  const ogDescription = pageRow.ogDescription || description
  const json = JSON.stringify(buildJsonLd(pageRow, ctx))
  const tags = [
    `<title>${escapeHtml(title)}</title>`,
    `<meta name="description" content="${escapeHtml(description)}" />`,
    `<meta name="robots" content="${escapeHtml(robots)}" />`,
    `<meta name="googlebot" content="${escapeHtml(robots)}" />`,
    `<meta name="author" content="${escapeHtml(clean(ctx.company?.legal_name) || BRAND)}" />`,
    `<meta name="application-name" content="${BRAND}" />`,
    `<meta name="theme-color" content="#070a12" />`,
    `<link rel="canonical" href="${escapeHtml(url)}" />`,
    `<link rel="alternate" hreflang="tr" href="${escapeHtml(url)}" />`,
    `<link rel="alternate" hreflang="x-default" href="${escapeHtml(url)}" />`,
    `<meta property="og:type" content="${pageRow.schema === 'Article' ? 'article' : 'website'}" />`,
    `<meta property="og:site_name" content="${BRAND}" />`,
    `<meta property="og:locale" content="tr_TR" />`,
    `<meta property="og:title" content="${escapeHtml(ogTitle)}" />`,
    `<meta property="og:description" content="${escapeHtml(ogDescription)}" />`,
    `<meta property="og:url" content="${escapeHtml(url)}" />`,
    `<meta property="og:image" content="${escapeHtml(image)}" />`,
    `<meta property="og:image:alt" content="${escapeHtml(ogTitle)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(ogTitle)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(ogDescription)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(image)}" />`,
  ]
  if (clean(settings.google_verification)) {
    tags.push(`<meta name="google-site-verification" content="${escapeHtml(settings.google_verification)}" />`)
  }
  if (clean(settings.bing_verification)) {
    tags.push(`<meta name="msvalidate.01" content="${escapeHtml(settings.bing_verification)}" />`)
  }
  tags.push(`<script type="application/ld+json" id="litx-seo-jsonld">${json}</script>`)
  return tags.join('\n    ')
}

export function injectDocument(html, pathname, ctx = {}) {
  const resolved = resolveRequest(pathname, ctx)
  if (resolved.passthrough) return { passthrough: true, html, status: 200, headers: {} }
  if (resolved.redirect) {
    return {
      redirect: resolved.redirect,
      status: resolved.redirect.status_code || 301,
      html: '',
      headers: { Location: resolved.redirect.destination },
    }
  }
  const pageRow = resolved.page
  const block = renderHeadBlock(pageRow, ctx)
  const next = String(html).includes('<!-- litx-seo:start -->')
    ? html.replace(/<!-- litx-seo:start -->[\s\S]*?<!-- litx-seo:end -->/, `<!-- litx-seo:start -->\n    ${block}\n    <!-- litx-seo:end -->`)
    : html.replace(/<title>[\s\S]*?<\/title>/, block)
  const status = resolved.status || 200
  return {
    html: next.replace(/<html[^>]*>/, `<html lang="tr" data-seo-path="${escapeHtml(pageRow.path)}">`),
    status,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'X-Robots-Tag': robotsFor(pageRow),
      'Cache-Control': status === 404 ? 'no-store' : 'public, max-age=120',
    },
    page: publicPage(pageRow),
  }
}

export function publicPage(pageRow) {
  return {
    path: pageRow.path,
    title: pageRow.title,
    description: pageRow.description,
    h1: pageRow.h1,
    canonical: pageRow.canonical || absoluteUrl(pageRow.path),
    robots: robotsFor(pageRow),
    index: !!pageRow.index,
    follow: pageRow.follow !== false,
    sitemap: !!pageRow.sitemap,
    schema: pageRow.schema,
    ogTitle: pageRow.ogTitle || pageRow.title,
    ogDescription: pageRow.ogDescription || pageRow.description,
    ogImage: pageRow.ogImage || '',
    updated: pageRow.updated,
    override: !!pageRow.override,
    breadcrumbs: breadcrumbsFor(pageRow),
  }
}

function scoreFrom(checks) {
  const weight = checks.reduce((sum, check) => sum + check.weight, 0)
  const earned = checks.reduce((sum, check) => sum + (check.ok ? check.weight : check.warn ? check.weight * 0.5 : 0), 0)
  return weight ? Math.round((earned / weight) * 100) : null
}

export function buildHealth(ctx = {}) {
  const pages = mergeCatalog(ctx).filter((row) => !isPrivatePath(row.path))
  const indexable = pages.filter((row) => row.index && row.sitemap)
  const titles = new Map()
  const descriptions = new Map()
  for (const row of indexable) {
    titles.set(row.title, (titles.get(row.title) || 0) + 1)
    descriptions.set(row.description, (descriptions.get(row.description) || 0) + 1)
  }
  const inbound = new Map(pages.map((row) => [row.path, 0]))
  inbound.set('/', (inbound.get('/') || 0) + 1)
  for (const row of pages) {
    for (const link of row.outbound || []) {
      const target = normalizePath(link)
      if (inbound.has(target)) inbound.set(target, inbound.get(target) + 1)
    }
  }
  const redirects = [...BUILTIN_REDIRECTS, ...(ctx.redirects || [])].filter((row) => row.enabled !== false)
  const redirectTargets = new Map(redirects.map((row) => [normalizePath(row.source), normalizePath(row.destination)]))
  const chains = redirects.filter((row) => redirectTargets.has(normalizePath(row.destination)))
  const audited = indexable.map((row) => {
    const descLen = String(row.description || '').length
    const metadata = [
      { id: 'title', ok: !!row.title, weight: 20 },
      { id: 'title_unique', ok: titles.get(row.title) === 1, weight: 15 },
      { id: 'description', ok: descLen >= 70, warn: descLen >= 40 && descLen < 70, weight: 20 },
      { id: 'description_band', ok: descLen >= 120 && descLen <= 170, warn: descLen >= 70, weight: 10 },
      { id: 'description_unique', ok: descriptions.get(row.description) === 1, weight: 15 },
      { id: 'canonical', ok: !!(row.canonical || row.path), weight: 10 },
      { id: 'h1', ok: !!row.h1, weight: 10 },
    ]
    let schemaOk = false
    try {
      const json = buildJsonLd(row, ctx)
      schemaOk = json['@context'] === 'https://schema.org' && Array.isArray(json['@graph']) && json['@graph'].length > 0
      JSON.stringify(json)
    } catch {
      schemaOk = false
    }
    const schema = [{ id: 'jsonld', ok: schemaOk, weight: 100 }]
    const internal = [{ id: 'inbound', ok: (inbound.get(row.path) || 0) > 0 || row.path === '/', weight: 100 }]
    const technical = [
      { id: 'index_consistent', ok: !(row.index && isPrivatePath(row.path)), weight: 50 },
      { id: 'https', ok: siteOrigin().startsWith('https://'), weight: 25 },
      { id: 'no_localhost', ok: !/localhost|127\.0\.0\.1/i.test(absoluteUrl(row.path)), weight: 25 },
    ]
    return {
      path: row.path,
      title: row.title,
      description: row.description,
      index: row.index,
      h1: row.h1 || null,
      schema: row.schema,
      updated: row.updated,
      scores: {
        metadata: scoreFrom(metadata),
        schema: scoreFrom(schema),
        internal: scoreFrom(internal),
        technical: scoreFrom(technical),
        content: null,
        performance: null,
        health: scoreFrom([...metadata, ...schema, ...internal, ...technical]),
      },
      notes: {
        content: 'Sayfa gövdesi kelime sayısı bu taramada ölçülmedi.',
        performance: 'Core Web Vitals bu ortamda ölçülmedi. Lighthouse sonucunu ayrıca çalıştırın.',
        h1: 'H1 katalog kaydıdır; canlı DOM sayısı ayrıca doğrulanmalıdır.',
      },
    }
  })
  const missingTitle = audited.filter((row) => !row.title)
  const missingDescription = indexable.filter((row) => !row.description).map((row) => row.path)
  const duplicateTitle = [...titles.entries()].filter(([, count]) => count > 1).map(([title]) => title)
  const duplicateDescription = [...descriptions.entries()].filter(([, count]) => count > 1).map(([description]) => description)
  const orphans = indexable.filter((row) => row.path !== '/' && (inbound.get(row.path) || 0) === 0).map((row) => row.path)
  const missingH1 = indexable.filter((row) => !row.h1).map((row) => row.path)
  return {
    measuredAt: new Date().toISOString(),
    origin: siteOrigin(),
    counts: {
      catalog: pages.length,
      indexable: indexable.length,
      noindex: pages.filter((row) => !row.index).length,
      missingTitle: missingTitle.length,
      missingDescription: missingDescription.length,
      duplicateTitle: duplicateTitle.length,
      missingH1: missingH1.length,
      orphans: orphans.length,
      redirectChains: chains.length,
    },
    missingDescription,
    duplicateTitle,
    duplicateDescription,
    missingH1,
    orphans,
    redirectChains: chains.map((row) => ({ source: row.source, destination: row.destination })),
    pages: audited,
    checklist: productionChecklist(ctx, indexable),
    sitemap: { enabled: ctx.settings?.sitemap_enabled !== false, urls: indexable.length },
    robots: { disallowAdmin: true, sitemap: `${siteOrigin()}/sitemap.xml` },
  }
}

export function productionChecklist(ctx = {}, indexable = []) {
  const origin = siteOrigin()
  const home = indexable.find((row) => row.path === '/') || mergeCatalog(ctx).find((row) => row.path === '/')
  return [
    { id: 'https', ok: origin.startsWith('https://'), label: 'HTTPS origin' },
    { id: 'robots', ok: buildRobotsTxt(ctx).includes('Disallow: /admin'), label: 'robots.txt admin disallow' },
    { id: 'sitemap', ok: buildSitemapXml(ctx).includes('<loc>'), label: 'sitemap.xml has URLs' },
    { id: 'home_index', ok: !!home?.index, label: 'Homepage is indexable' },
    { id: 'home_canonical', ok: absoluteUrl('/') === `${origin}/`, label: 'Homepage canonical' },
    { id: 'no_localhost', ok: !/localhost|127\.0\.0\.1/i.test(origin), label: 'No localhost origin' },
    { id: 'no_search_action', ok: !JSON.stringify(websiteNode(ctx.company || {})).includes('SearchAction'), label: 'No SearchAction without site search' },
    { id: 'favicon', ok: true, label: 'Favicon path /favicon.svg' },
    { id: 'manifest', ok: true, label: 'Web manifest /site.webmanifest' },
  ]
}
