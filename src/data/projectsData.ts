import type { Lang } from '@/i18n/copy'

export type ProjectText = {
  title: string
  summary: string
  description: string
  imageAlt: string
  tags: string[]
  ctaLabel: string
}

export type ProjectEntry = {
  slug: string
  /** Path inside this SPA */
  internalPath?: string
  externalUrl?: string
  image: string
  text: Record<Lang, ProjectText>
}

export const projectsData: ProjectEntry[] = [
  {
    slug: 'valoriahotel',
    internalPath: '/valoria-app',
    image:
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    text: {
      en: {
        title: 'Valoria Hotel',
        summary: 'A mobile experience focused on guest communication for hotels and hospitality.',
        description:
          'Built in the Valoria line, this solution offers a mobile-first structure for guest communication, brand presentation and operational visibility. Corporate compliance is maintained with privacy, terms and support pages.',
        imageAlt: 'Modern hotel lobby and guest area',
        tags: ['Hotel', 'Mobile', 'Hospitality'],
        ctaLabel: 'Open product page',
      },
      tr: {
        title: 'Valoria Hotel',
        summary: 'Otel ve konaklama işletmeleri için mobil deneyim ve iletişim odağı.',
        description:
          'Valoria çizgisinde geliştirilen bu çözüm; konuk iletişimi, marka sunumu ve operasyonel görünürlük için mobil öncelikli bir yapı sunar. Gizlilik, kullanım şartları ve destek sayfalarıyla kurumsal uyum korunur.',
        imageAlt: 'Modern otel lobisi ve konuk alanı',
        tags: ['Otel', 'Mobil', 'Konaklama'],
        ctaLabel: 'Ürün sayfasını aç',
      },
    },
  },
  {
    slug: 'sosyal-platform',
    externalUrl: 'https://kbsprime.com',
    image:
      'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&q=80',
    text: {
      en: {
        title: 'KBS Prime',
        summary: 'A live-card and community-focused social platform experience.',
        description:
          'A scalable social platform suited to user engagement, content sharing and live usage scenarios. A store-accessible product example that keeps evolving.',
        imageAlt: 'Social media and mobile application',
        tags: ['Social platform', 'Community', 'Live'],
        ctaLabel: 'Visit site',
      },
      tr: {
        title: 'KBS Prime',
        summary: 'Canlı kart ve topluluk odaklı sosyal platform deneyimi.',
        description:
          'Kullanıcı etkileşimi, içerik paylaşımı ve canlı kullanım senaryolarına uygun, ölçeklenebilir bir sosyal platform. Mağaza üzerinden erişilebilir, sürekli geliştirilen bir ürün örneği.',
        imageAlt: 'Sosyal medya ve mobil uygulama',
        tags: ['Sosyal platform', 'Topluluk', 'Canlı'],
        ctaLabel: 'Siteyi ziyaret et',
      },
    },
  },
  {
    slug: 'dating-app',
    image:
      'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=1200&q=80',
    text: {
      en: {
        title: 'Dating & matching solutions',
        summary: 'Modern dating apps with profiles, matching, chat and membership models.',
        description:
          'From Tinder-like flows to corporate matching projects, we build end-to-end products with secure messaging, moderation and payment integrations. Grow your existing product or design it from scratch.',
        imageAlt: 'Mobile application and connection',
        tags: ['Matching', 'Chat', 'Membership'],
        ctaLabel: 'Request a quote',
      },
      tr: {
        title: 'Eşleşme & arkadaşlık çözümleri',
        summary: 'Profil, eşleşme, sohbet ve üyelik modelleriyle modern tanışma uygulamaları.',
        description:
          'Tinder benzeri akışlardan kurumsal eşleşme projelerine kadar; güvenli mesajlaşma, moderasyon ve ödeme entegrasyonlarıyla uçtan uca ürün geliştiriyoruz. İsterseniz mevcut ürününüzü büyütelim, isterseniz sıfırdan tasarlayalım.',
        imageAlt: 'Mobil uygulama ve bağlantı',
        tags: ['Eşleşme', 'Sohbet', 'Üyelik'],
        ctaLabel: 'Teklif al',
      },
    },
  },
  {
    slug: 'safdas',
    internalPath: '/safdas',
    image:
      'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=1200&q=80',
    text: {
      en: {
        title: 'SAFDAŞ',
        summary: 'Prayer times, Quran, qibla and an Islamic social community app.',
        description:
          'SAFDAŞ combines prayer times, a qibla compass, Quran, supplications, dhikr and worship tracking with SAF circles, social posts and live audio rooms. Privacy, terms, child safety, account deletion and support pages ensure store compliance.',
        imageAlt: 'Mosque and prayer time atmosphere',
        tags: ['Prayer', 'Islamic life', 'Community'],
        ctaLabel: 'Product page',
      },
      tr: {
        title: 'SAFDAŞ',
        summary: 'Namaz vakitleri, Kur’an, kıble ve İslami sosyal topluluk uygulaması.',
        description:
          'SAFDAŞ; namaz vakitleri, kıble pusulası, Kur’an, dua, zikir ve ibadet takibini SAF Halkaları, sosyal gönderiler ve canlı sesli odalarla birleştirir. Gizlilik, kullanım şartları, çocuk koruma, hesap silme ve destek sayfalarıyla mağaza uyumu sağlanır.',
        imageAlt: 'Cami ve namaz vakti atmosferi',
        tags: ['Namaz', 'İslami yaşam', 'Topluluk'],
        ctaLabel: 'Tanıtım sayfası',
      },
    },
  },
  {
    slug: 'vora',
    internalPath: '/vora',
    image:
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80',
    text: {
      en: {
        title: 'Vora',
        summary: 'An instant communication and community platform for Black Sea cities.',
        description:
          'An instant messaging, local content and community experience designed for the Black Sea cities from Trabzon to Samsun. A safe platform with city channels, notifications and moderation tools.',
        imageAlt: 'Black Sea coast and city view',
        tags: ['Community', 'Black Sea', 'Instant messaging'],
        ctaLabel: 'Product page',
      },
      tr: {
        title: 'Vora',
        summary: 'Karadeniz şehirleri için anlık haberleşme ve topluluk platformu.',
        description:
          "Trabzon'dan Samsun'a Karadeniz illeri için tasarlanmış anlık mesajlaşma, yerel içerik ve topluluk deneyimi. Şehir kanalları, bildirimler ve moderasyon araçlarıyla güvenli bir platform.",
        imageAlt: 'Karadeniz kıyısı ve şehir manzarası',
        tags: ['Topluluk', 'Karadeniz', 'Anlık haberleşme'],
        ctaLabel: 'Tanıtım sayfası',
      },
    },
  },
  {
    slug: 'tamuso',
    internalPath: '/tamuso',
    image:
      'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80',
    text: {
      en: {
        title: 'Tamuso',
        summary: 'A modern voice chat platform with live audio rooms.',
        description:
          'Join live rooms as a speaker or listener. Promotional and legal pages compliant with App Store / Google Play, including moderation, privacy and child safety policies.',
        imageAlt: 'Voice studio and microphone',
        tags: ['Voice room', 'Live chat', 'Community'],
        ctaLabel: 'Product page',
      },
      tr: {
        title: 'Tamuso',
        summary: 'Canlı sesli odalar ve modern sesli sohbet platformu.',
        description:
          'Konuşmacı veya dinleyici olarak canlı odalara katılın. Moderasyon, gizlilik ve çocuk koruma politikalarıyla App Store / Google Play uyumlu tanıtım ve yasal sayfalar.',
        imageAlt: 'Ses stüdyosu ve mikrofon',
        tags: ['Sesli oda', 'Canlı sohbet', 'Topluluk'],
        ctaLabel: 'Tanıtım sayfası',
      },
    },
  },
  {
    slug: 'sehir-uygulamasi',
    internalPath: '/mytrabzon',
    image: '/assets/mytrabzon/hero.png',
    text: {
      en: {
        title: 'Trabzon Live (MyTrabzon)',
        summary: 'A mobile app for the city guide, local content and community.',
        description:
          'A mobile experience bringing together city news, events and local businesses. Live on Google Play — a strong reference for city branding and user loyalty.',
        imageAlt: 'Trabzon Live application screens',
        tags: ['City app', 'Local content', 'Mobile'],
        ctaLabel: 'Product page',
      },
      tr: {
        title: 'Trabzon Live (MyTrabzon)',
        summary: 'Şehir rehberi, yerel içerik ve topluluk için mobil uygulama.',
        description:
          'Şehre özel haber, etkinlik ve yerel işletmeleri bir araya getiren mobil deneyim. Google Play üzerinden yayında; şehir markası ve kullanıcı sadakati için güçlü bir referans.',
        imageAlt: 'Trabzon Live uygulama görselleri',
        tags: ['Şehir uygulaması', 'Yerel içerik', 'Mobil'],
        ctaLabel: 'Tanıtım sayfası',
      },
    },
  },
]

export function getProjectBySlug(slug: string | undefined): ProjectEntry | undefined {
  return projectsData.find((p) => p.slug === slug)
}
