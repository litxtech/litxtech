import type { LucideIcon } from 'lucide-react'
import {
  Building2,
  HeartHandshake,
  Hotel,
  MapPinned,
  Share2,
  UtensilsCrossed,
} from 'lucide-react'
import type { Lang } from '@/i18n/copy'

export type SolutionIcon = LucideIcon

export type SolutionFAQ = { question: string; answer: string }

/** Language-independent shell. All copy lives in `text`. */
export type SolutionEntry = {
  slug: string
  icon: SolutionIcon
  /** Decorative gradient for cards / hero accents */
  accent: 'blue' | 'violet' | 'emerald' | 'rose' | 'amber' | 'cyan'
  text: Record<Lang, SolutionText>
}

export type SolutionText = {
  title: string
  cardDescription: string
  tagline: string
  metaTitle: string
  metaDescription: string
  problem: string
  features: string[]
  audience: string[]
  faq: SolutionFAQ[]
}

export const solutionsData: SolutionEntry[] = [
  {
    slug: 'otel-yonetim-sistemi',
    icon: Hotel,
    accent: 'blue',
    text: {
      en: {
        title: 'Hotel Management Systems',
        cardDescription:
          'Manage reservations, guests, rooms, payments, reporting and operations from a single panel.',
        tagline: 'Run occupancy, revenue and operations from one place.',
        metaTitle: 'Hotel Management System | LitxTech',
        metaDescription:
          'Software that unifies reservations, guest and room management, payments and reporting in a single hotel operations panel.',
        problem:
          'Scattered spreadsheets, phone-based bookings and unreported revenue leaks add friction in hotels. A single source of truth and a responsive panel make teams faster.',
        features: [
          'Reservation and occupancy management',
          'Guest profiles and communication history',
          'Room status and housekeeping flow',
          'Payment and invoicing integrations',
          'Revenue management and KPI reports',
          'Multi-branch structure and permissions',
          'Responsive management panel',
        ],
        audience: [
          'Boutique and chain hotels',
          'Apart hotels and guesthouses',
          'Hospitality management companies',
        ],
        faq: [
          {
            question: 'Do you integrate with existing channel managers?',
            answer:
              'Yes. Depending on the need we plan integrations with OTAs and payment providers, confirmed after a technical discovery.',
          },
          {
            question: 'How long does setup take?',
            answer:
              'It depends on scope and integrations. Typical projects are planned between 4 and 12 weeks with modular delivery.',
          },
          {
            question: 'Where is the data stored?',
            answer:
              'We offer cloud or dedicated hosting options, with backup and access policies defined together.',
          },
        ],
      },
      tr: {
        title: 'Otel Yönetim Sistemleri',
        cardDescription:
          'Rezervasyon, müşteri yönetimi, oda takibi, ödeme, raporlama ve operasyon süreçlerini tek panelden yönetin.',
        tagline: 'Doluluk, gelir ve operasyonu tek merkezden yönetin.',
        metaTitle: 'Otel Yönetim Sistemi | LitxTech',
        metaDescription:
          'Rezervasyon, müşteri ve oda yönetimi, ödeme ve raporlama ile otel operasyonlarını tek panelde birleştiren yazılım çözümleri.',
        problem:
          'Dağınık tablolar, telefon ile yürüyen rezervasyonlar ve raporlanmayan gelir kayıpları otellerde sürtünmeyi artırır. Tek bir doğruluk kaynağı ve mobil uyumlu panel ile ekipler hızlanır.',
        features: [
          'Rezervasyon ve doluluk yönetimi',
          'Misafir profilleri ve iletişim geçmişi',
          'Oda durumu ve housekeeping akışı',
          'Ödeme ve faturalama entegrasyonları',
          'Gelir yönetimi ve KPI raporları',
          'Çok şubeli yapı ve yetkilendirme',
          'Mobil uyumlu yönetim paneli',
        ],
        audience: [
          'Butik ve zincir oteller',
          'Apart otel ve pansiyon işletmeleri',
          'Konaklama yönetim şirketleri',
        ],
        faq: [
          {
            question: 'Mevcut kanal yöneticileri ile entegre olur musunuz?',
            answer:
              'Evet. İhtiyaca göre OTA ve ödeme sağlayıcıları ile entegrasyon planlanır; teknik keşif sonrası netleştirilir.',
          },
          {
            question: 'Kurulum süresi ne kadar?',
            answer:
              'Kapsam ve entegrasyonlara göre değişir. Tipik projelerde modüler teslimat ile 4–12 hafta aralığında planlanır.',
          },
          {
            question: 'Veriler nerede tutulur?',
            answer:
              'Bulut veya kuruma özel barındırma seçenekleri sunulur; yedekleme ve erişim politikaları birlikte tanımlanır.',
          },
        ],
      },
    },
  },
  {
    slug: 'restoran-yonetim-sistemi',
    icon: UtensilsCrossed,
    accent: 'amber',
    text: {
      en: {
        title: 'Restaurant Management Systems',
        cardDescription:
          'Unify orders, POS, menu, kitchen display, accounting, staff, expenses and operations in one place.',
        tagline: 'Uninterrupted flow from order to kitchen, from till to report.',
        metaTitle: 'Restaurant Management System | LitxTech',
        metaDescription:
          'Restaurant software that brings orders, menu, kitchen display, POS, staff and accounting into a single panel.',
        problem:
          'Lost orders during peak hours, a gap between kitchen and floor, and scattered expense tracking all erode profitability. A single, responsive system clarifies operations.',
        features: [
          'Order management',
          'Menu management',
          'Kitchen display',
          'POS and payment tracking',
          'Staff management',
          'Revenue and expense tracking',
          'Accounting reports',
          'Camera system integration',
          'Branch-based management',
          'Responsive admin panel',
        ],
        audience: [
          'Restaurants, cafés and fast food businesses',
          'Franchises and multi-branch brands',
          'Catering and ghost kitchen operations',
        ],
        faq: [
          {
            question: 'Does it work with our existing POS or cash register?',
            answer:
              'Yes. Depending on your hardware and software inventory we can plan an integration or a phased migration.',
          },
          {
            question: 'Can the kitchen display be customised?',
            answer: 'Preparation times, stations and alerts are defined around your workflow.',
          },
          {
            question: 'Can I export the reports?',
            answer: 'Export to Excel/CSV and to accounting or BI tools via API is supported.',
          },
        ],
      },
      tr: {
        title: 'Restoran Yönetim Sistemleri',
        cardDescription:
          'Sipariş, POS, menü, mutfak ekranı, muhasebe, personel, gider ve operasyon süreçlerini tek merkezde birleştirin.',
        tagline: 'Siparişten mutfağa, kasadan rapora kesintisiz operasyon.',
        metaTitle: 'Restoran Yönetim Sistemi | LitxTech',
        metaDescription:
          'Sipariş, menü, mutfak ekranı, POS, personel ve muhasebe süreçlerini tek panelde toplayan restoran yazılımı.',
        problem:
          'Yoğun saatlerde sipariş kaçırma, mutfak ile salon arasında kopukluk ve dağınık gider takibi kârlılığı düşürür. Tek merkezden yönetilen, mobil uyumlu bir sistem ile operasyon netleşir.',
        features: [
          'Sipariş yönetimi',
          'Menü yönetimi',
          'Mutfak ekranı',
          'POS ve ödeme takibi',
          'Personel yönetimi',
          'Gelir / gider takibi',
          'Muhasebe raporları',
          'Kamera sistemi entegrasyonu',
          'Şube bazlı yönetim',
          'Mobil uyumlu panel',
        ],
        audience: [
          'Restoran, kafe ve fast-food işletmeleri',
          'Franchise ve çok şubeli markalar',
          'Catering ve ghost kitchen operasyonları',
        ],
        faq: [
          {
            question: 'Mevcut POS veya yazarkasa ile çalışır mı?',
            answer:
              'Evet. Donanım ve yazılım envanterinize göre entegrasyon veya aşamalı geçiş planlanabilir.',
          },
          {
            question: 'Mutfak ekranı özelleştirilebilir mi?',
            answer: 'İş akışınıza göre hazırlık süreleri, istasyonlar ve uyarılar tanımlanır.',
          },
          {
            question: 'Raporları dışarı aktarabilir miyim?',
            answer: 'Excel/CSV ve API üzerinden muhasebe ve BI araçlarına aktarım desteklenir.',
          },
        ],
      },
    },
  },
  {
    slug: 'sosyal-medya-uygulamasi',
    icon: Share2,
    accent: 'violet',
    text: {
      en: {
        title: 'Social & Community Applications',
        cardDescription:
          'Build social platforms with user engagement, posts, messaging, notifications and community management.',
        tagline: 'Engagement, content and community — on scalable architecture.',
        metaTitle: 'Social & Community Application | LitxTech',
        metaDescription:
          'We build social platforms and community apps with messaging, notifications, feeds and community management.',
        problem:
          'The limits of ready-made networks and the need for brand independence require your own platform. Performance, moderation and security must be designed together.',
        features: [
          'Feed, post and engagement models',
          'Real-time messaging infrastructure',
          'Notification and preference management',
          'Community roles and moderation',
          'Media upload and CDN optimisation',
          'Analytics and growth metrics',
        ],
        audience: [
          'Community and internal social networks',
          'Niche interest groups and clubs',
          'Creator-focused platforms',
        ],
        faq: [
          {
            question: 'How is moderation and security handled?',
            answer:
              'Role-based permissions, reporting flows and automated filters are added as needed.',
          },
          {
            question: 'Web and mobile together?',
            answer:
              'Yes. The same backend supports a web panel and native/hybrid mobile clients.',
          },
        ],
      },
      tr: {
        title: 'Sosyal Medya ve Topluluk Uygulamaları',
        cardDescription:
          'Kullanıcı etkileşimi, paylaşımlar, mesajlaşma, bildirimler ve topluluk yönetimi özelliklerine sahip sosyal platformlar geliştirin.',
        tagline: 'Etkileşim, içerik ve topluluk — ölçeklenebilir mimari ile.',
        metaTitle: 'Sosyal Medya ve Topluluk Uygulaması | LitxTech',
        metaDescription:
          'Mesajlaşma, bildirim, akış ve topluluk yönetimi ile sosyal platform ve topluluk uygulamaları geliştiriyoruz.',
        problem:
          'Hazır sosyal ağların sınırları ve marka bağımsızlığı ihtiyacı, kendi platformunuzu kurmayı gerektirir. Performans, moderasyon ve güvenlik birlikte tasarlanmalıdır.',
        features: [
          'Akış, gönderi ve etkileşim modelleri',
          'Gerçek zamanlı mesajlaşma altyapısı',
          'Bildirim ve tercih yönetimi',
          'Topluluk rolleri ve moderasyon',
          'Medya yükleme ve CDN optimizasyonu',
          'Analitik ve büyüme metrikleri',
        ],
        audience: [
          'Topluluk ve marka içi sosyal ağlar',
          'Niş ilgi grupları ve kulüpler',
          'İçerik üreticisi odaklı platformlar',
        ],
        faq: [
          {
            question: 'Moderasyon ve güvenlik nasıl sağlanır?',
            answer: 'Rol bazlı yetkiler, raporlama akışları ve otomatik filtreler ihtiyaca göre eklenir.',
          },
          {
            question: 'Web ve mobil birlikte mi?',
            answer: 'Evet. Aynı backend ile web paneli ve native/hybrid mobil istemciler desteklenir.',
          },
        ],
      },
    },
  },
  {
    slug: 'arkadaslik-uygulamasi',
    icon: HeartHandshake,
    accent: 'rose',
    text: {
      en: {
        title: 'Dating & Matching Applications',
        cardDescription:
          'Build modern dating products with matching algorithms, profiles, chat infrastructure and premium memberships.',
        tagline: 'Safe matching, smooth chat and sustainable monetisation.',
        metaTitle: 'Dating & Matching Application | LitxTech',
        metaDescription:
          'We build modern dating and friendship apps with profiles, matching, chat and membership models.',
        problem:
          'Matching products do not scale without user trust, content safety and scalable chat infrastructure. Product and architecture must be designed together.',
        features: [
          'Profile and preference-based matching',
          'Secure chat and media sharing',
          'Premium membership and payment integrations',
          'Location and privacy controls',
          'Report / block and safety flows',
          'Admin panel and analytics',
        ],
        audience: [
          'Next-generation dating applications',
          'Niche community and event-based matching',
          'Regional or corporate partnership models',
        ],
        faq: [
          {
            question: 'Which payment methods are supported?',
            answer:
              'App Store / Google Play subscriptions or integrations with providers such as Stripe can be planned.',
          },
          {
            question: 'Is moderation mandatory?',
            answer:
              'Moderation and reporting are recommended and implemented for store policies and user safety.',
          },
        ],
      },
      tr: {
        title: 'Arkadaşlık / Eşleşme Uygulamaları',
        cardDescription:
          'Eşleşme algoritmaları, kullanıcı profilleri, sohbet altyapısı ve premium üyelik sistemleriyle modern arkadaşlık uygulamaları oluşturun.',
        tagline: 'Güvenli eşleşme, akıcı sohbet ve sürdürülebilir monetizasyon.',
        metaTitle: 'Arkadaşlık ve Eşleşme Uygulaması | LitxTech',
        metaDescription:
          'Profil, eşleşme, sohbet ve üyelik modelleri ile modern tanışma ve arkadaşlık uygulamaları geliştiriyoruz.',
        problem:
          'Kullanıcı güveni, içerik güvenliği ve ölçeklenebilir sohbet altyapısı olmadan eşleşme ürünleri büyümez. Ürün ve teknik mimari birlikte kurgulanmalıdır.',
        features: [
          'Profil ve tercih tabanlı eşleşme',
          'Güvenli sohbet ve medya paylaşımı',
          'Premium üyelik ve ödeme entegrasyonları',
          'Konum ve gizlilik kontrolleri',
          'Şikayet / engelleme ve güvenlik akışları',
          'Yönetim paneli ve analitik',
        ],
        audience: [
          'Yeni nesil tanışma uygulamaları',
          'Niş topluluk ve etkinlik bazlı eşleşme',
          'Bölgesel veya kurumsal partnerlik modelleri',
        ],
        faq: [
          {
            question: 'Hangi ödeme yöntemleri desteklenir?',
            answer:
              'App Store / Google Play abonelikleri veya Stripe vb. sağlayıcılarla entegrasyon planlanabilir.',
          },
          {
            question: 'Moderasyon zorunlu mu?',
            answer:
              'Mağaza politikaları ve kullanıcı güvenliği için moderasyon ve raporlama önerilir ve uygulanır.',
          },
        ],
      },
    },
  },
  {
    slug: 'sehire-ozel-uygulamalar',
    icon: MapPinned,
    accent: 'emerald',
    text: {
      en: {
        title: 'City Mobile Applications',
        cardDescription:
          'Build apps with news, events, places, local businesses, municipal announcements and city guides.',
        tagline: 'One app for city brand, local economy and citizen communication.',
        metaTitle: 'City Mobile Application | LitxTech',
        metaDescription:
          'We build city mobile applications that bring together news, events, guides and announcements.',
        problem:
          'Scattered websites and social channels fragment the city experience. Reliable information, the local economy and events should come together in one app.',
        features: [
          'News and announcement module',
          'Event calendar and ticketing flows',
          'Venue and local business guide',
          'Map and location-based discovery',
          'Notification and campaign management',
          'Admin panel and content approval',
        ],
        audience: [
          'Municipalities and city brands',
          'NGOs and local tourism projects',
          'Universities and student communities',
        ],
        faq: [
          {
            question: 'Who manages the content?',
            answer:
              'A role-based panel supports editor approval, scheduled publishing and archive flows.',
          },
          {
            question: 'Is multi-language supported?',
            answer: 'Yes. Multi-language structure is supported for both content and interface.',
          },
        ],
      },
      tr: {
        title: 'Şehre Özel Mobil Uygulamalar',
        cardDescription:
          'Haber, etkinlik, mekanlar, yerel işletmeler, belediye duyuruları ve şehir rehberi özelliklerine sahip uygulamalar geliştirin.',
        tagline: 'Şehir markası, yerel ekonomi ve vatandaş iletişimi için tek uygulama.',
        metaTitle: 'Şehre Özel Mobil Uygulama | LitxTech',
        metaDescription:
          'Haber, etkinlik, rehber ve duyuruları bir araya getiren şehir mobil uygulamaları geliştiriyoruz.',
        problem:
          'Dağınık web siteleri ve sosyal kanallar şehir deneyimini parçalar. Tek uygulamada güvenilir bilgi, yerel ekonomi ve etkinlikler birleşmelidir.',
        features: [
          'Haber ve duyuru modülü',
          'Etkinlik takvimi ve bilet akışları',
          'Mekan ve yerel işletme rehberi',
          'Harita ve konum bazlı keşif',
          'Bildirim ve kampanya yönetimi',
          'Yönetim paneli ve içerik onayı',
        ],
        audience: [
          'Belediye ve şehir markaları',
          'STK ve yerel turizm projeleri',
          'Üniversite ve öğrenci toplulukları',
        ],
        faq: [
          {
            question: 'İçerik yönetimi kimde olur?',
            answer:
              'Rol bazlı panel ile editör onayı, zamanlanmış yayın ve arşiv akışları kurulabilir.',
          },
          {
            question: 'Çok dilli destek var mı?',
            answer: 'Evet. İçerik ve arayüz için çoklu dil yapısı desteklenir.',
          },
        ],
      },
    },
  },
  {
    slug: 'ozel-yazilim',
    icon: Building2,
    accent: 'cyan',
    text: {
      en: {
        title: 'Custom Enterprise Software',
        cardDescription:
          'We build custom admin panels, CRM, tracking systems, integrations and automation for your company.',
        tagline: 'Scalable, integrated and sustainable software around your business model.',
        metaTitle: 'Custom Enterprise Software | LitxTech',
        metaDescription:
          'CRM, operations panels, integrations and automation — custom enterprise software solutions.',
        problem:
          'Off-the-shelf packages rarely fit every workflow. Data silos and manual Excel processes create errors and cost. Custom software plans integrations and automation together.',
        features: [
          'Enterprise management panels',
          'CRM and customer tracking flows',
          'ERP / accounting / payment integrations',
          'Reporting and business intelligence views',
          'System composition via API and webhooks',
          'Roles and audit trails',
        ],
        audience: [
          'SMBs and enterprises digitalising operations',
          'Field teams and service companies',
          'Regulation-sensitive processes',
        ],
        faq: [
          {
            question: 'Do you connect to our existing systems?',
            answer:
              'Yes. Integration is chosen via REST API, file transfer or custom connectors.',
          },
          {
            question: 'How do maintenance and development work?',
            answer:
              'SLA-based support and a product roadmap enable continuous improvement.',
          },
        ],
      },
      tr: {
        title: 'Kuruma Özel Yazılım Çözümleri',
        cardDescription:
          'Firmanıza özel yönetim paneli, CRM, takip sistemleri, entegrasyonlar ve özel otomasyon çözümleri geliştirelim.',
        tagline: 'İş modelinize göre ölçeklenebilir, entegre ve sürdürülebilir yazılım.',
        metaTitle: 'Kuruma Özel Yazılım | LitxTech',
        metaDescription:
          'CRM, operasyon panelleri, entegrasyon ve otomasyon ile kuruma özel yazılım çözümleri sunuyoruz.',
        problem:
          'Standart paketler her iş akışına uymaz. Veri siloları ve manuel Excel süreçleri hata ve maliyet üretir. İhtiyaca özel yazılım ile entegrasyonlar ve otomasyon bir arada planlanır.',
        features: [
          'Kurumsal yönetim panelleri',
          'CRM ve müşteri takip akışları',
          'ERP / muhasebe / ödeme entegrasyonları',
          'Raporlama ve iş zekâsı görünümleri',
          'API ve webhook ile sistem birleştirme',
          'Rol ve denetim izi (audit) yapıları',
        ],
        audience: [
          'Operasyonu dijitalleştiren KOBİ ve kurumlar',
          'Saha ekipleri ve servis şirketleri',
          'Regülasyona duyarlı süreçler',
        ],
        faq: [
          {
            question: 'Mevcut sistemlerimize bağlanır mısınız?',
            answer:
              'Evet. REST API, dosya aktarımı veya özel bağlayıcılar ile entegrasyon yolu seçilir.',
          },
          {
            question: 'Bakım ve geliştirme nasıl işler?',
            answer: 'SLA tabanlı destek ve ürün yol haritası ile sürekli iyileştirme planlanabilir.',
          },
        ],
      },
    },
  },
]

export function getSolutionBySlug(slug: string | undefined): SolutionEntry | undefined {
  return solutionsData.find((s) => s.slug === slug)
}
