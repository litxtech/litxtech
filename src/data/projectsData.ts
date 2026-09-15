export type ProjectEntry = {
  slug: string
  title: string
  summary: string
  description: string
  /** Path inside this SPA */
  internalPath?: string
  externalUrl?: string
  image: string
  imageAlt: string
  tags: string[]
  ctaLabel: string
}

export const projectsData: ProjectEntry[] = [
  {
    slug: 'valoriahotel',
    title: 'Valoria Hotel',
    summary: 'Otel ve konaklama işletmeleri için mobil deneyim ve iletişim odağı.',
    description:
      'Valoria çizgisinde geliştirilen bu çözüm; konuk iletişimi, marka sunumu ve operasyonel görünürlük için mobil öncelikli bir yapı sunar. Gizlilik, kullanım şartları ve destek sayfalarıyla kurumsal uyum korunur.',
    internalPath: '/valoria-app',
    image:
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Modern otel lobisi ve konuk alanı',
    tags: ['Otel', 'Mobil', 'Konaklama'],
    ctaLabel: 'Ürün sayfasını aç',
  },
  {
    slug: 'sosyal-platform',
    title: 'KBS Prime',
    summary: 'Canlı kart ve topluluk odaklı sosyal platform deneyimi.',
    description:
      'Kullanıcı etkileşimi, içerik paylaşımı ve canlı kullanım senaryolarına uygun, ölçeklenebilir bir sosyal platform. Mağaza üzerinden erişilebilir, sürekli geliştirilen bir ürün örneği.',
    externalUrl: 'https://kbsprime.com',
    image:
      'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Sosyal medya ve mobil uygulama',
    tags: ['Sosyal platform', 'Topluluk', 'Canlı'],
    ctaLabel: 'Siteyi ziyaret et',
  },
  {
    slug: 'dating-app',
    title: 'Eşleşme & arkadaşlık çözümleri',
    summary: 'Profil, eşleşme, sohbet ve üyelik modelleriyle modern tanışma uygulamaları.',
    description:
      'Tinder benzeri akışlardan kurumsal eşleşme projelerine kadar; güvenli mesajlaşma, moderasyon ve ödeme entegrasyonlarıyla uçtan uca ürün geliştiriyoruz. İsterseniz mevcut ürününüzü büyütelim, isterseniz sıfırdan tasarlayalım.',
    image:
      'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Mobil uygulama ve bağlantı',
    tags: ['Eşleşme', 'Sohbet', 'Üyelik'],
    ctaLabel: 'Teklif al',
  },
  {
    slug: 'vora',
    title: 'Vora',
    summary: 'Karadeniz şehirleri için anlık haberleşme ve topluluk platformu.',
    description:
      'Trabzon\'dan Samsun\'a Karadeniz illeri için tasarlanmış anlık mesajlaşma, yerel içerik ve topluluk deneyimi. Şehir kanalları, bildirimler ve moderasyon araçlarıyla güvenli bir platform.',
    internalPath: '/vora',
    image:
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Karadeniz kıyısı ve şehir manzarası',
    tags: ['Topluluk', 'Karadeniz', 'Anlık haberleşme'],
    ctaLabel: 'Tanıtım sayfası',
  },
  {
    slug: 'tamuso',
    title: 'Tamuso',
    summary: 'Canlı sesli odalar ve modern sesli sohbet platformu.',
    description:
      'Konuşmacı veya dinleyici olarak canlı odalara katılın. Moderasyon, gizlilik ve çocuk koruma politikalarıyla App Store / Google Play uyumlu tanıtım ve yasal sayfalar.',
    internalPath: '/tamuso',
    image:
      'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Ses stüdyosu ve mikrofon',
    tags: ['Sesli oda', 'Canlı sohbet', 'Topluluk'],
    ctaLabel: 'Tanıtım sayfası',
  },
  {
    slug: 'sehir-uygulamasi',
    title: 'Trabzon Live (MyTrabzon)',
    summary: 'Şehir rehberi, yerel içerik ve topluluk için mobil uygulama.',
    description:
      'Şehre özel haber, etkinlik ve yerel işletmeleri bir araya getiren mobil deneyim. Google Play üzerinden yayında; şehir markası ve kullanıcı sadakati için güçlü bir referans.',
    internalPath: '/mytrabzon',
    image: '/assets/mytrabzon/hero.png',
    imageAlt: 'Trabzon Live uygulama görselleri',
    tags: ['Şehir uygulaması', 'Yerel içerik', 'Mobil'],
    ctaLabel: 'Tanıtım sayfası',
  },
]

export function getProjectBySlug(slug: string | undefined): ProjectEntry | undefined {
  return projectsData.find((p) => p.slug === slug)
}
