import type { LucideIcon } from 'lucide-react'
import {
  Building2,
  HeartHandshake,
  Hotel,
  MapPinned,
  Share2,
  UtensilsCrossed,
} from 'lucide-react'

export type SolutionIcon = LucideIcon

export type SolutionFAQ = { question: string; answer: string }

export type SolutionEntry = {
  slug: string
  title: string
  cardDescription: string
  tagline: string
  metaTitle: string
  metaDescription: string
  problem: string
  features: string[]
  audience: string[]
  faq: SolutionFAQ[]
  icon: SolutionIcon
  /** Decorative gradient for cards / hero accents */
  accent: 'blue' | 'violet' | 'emerald' | 'rose' | 'amber' | 'cyan'
}

export const solutionsData: SolutionEntry[] = [
  {
    slug: 'otel-yonetim-sistemi',
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
    icon: Hotel,
    accent: 'blue',
  },
  {
    slug: 'restoran-yonetim-sistemi',
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
        answer:
          'İş akışınıza göre hazırlık süreleri, istasyonlar ve uyarılar tanımlanır.',
      },
      {
        question: 'Raporları dışarı aktarabilir miyim?',
        answer:
          'Excel/CSV ve API üzerinden muhasebe ve BI araçlarına aktarım desteklenir.',
      },
    ],
    icon: UtensilsCrossed,
    accent: 'amber',
  },
  {
    slug: 'sosyal-medya-uygulamasi',
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
        answer:
          'Rol bazlı yetkiler, raporlama akışları ve otomatik filtreler ihtiyaca göre eklenir.',
      },
      {
        question: 'Web ve mobil birlikte mi?',
        answer:
          'Evet. Aynı backend ile web paneli ve native/hybrid mobil istemciler desteklenir.',
      },
    ],
    icon: Share2,
    accent: 'violet',
  },
  {
    slug: 'arkadaslik-uygulamasi',
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
    icon: HeartHandshake,
    accent: 'rose',
  },
  {
    slug: 'sehire-ozel-uygulamalar',
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
        answer:
          'Evet. İçerik ve arayüz için çoklu dil yapısı desteklenir.',
      },
    ],
    icon: MapPinned,
    accent: 'emerald',
  },
  {
    slug: 'ozel-yazilim',
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
        answer:
          'SLA tabanlı destek ve ürün yol haritası ile sürekli iyileştirme planlanabilir.',
      },
    ],
    icon: Building2,
    accent: 'cyan',
  },
]

export function getSolutionBySlug(slug: string | undefined): SolutionEntry | undefined {
  return solutionsData.find((s) => s.slug === slug)
}
