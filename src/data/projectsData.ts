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
    image: '/assets/projects/valoria.svg',
    text: {
      en: {
        title: 'Valoria Hotel',
        summary: 'A mobile experience focused on guest communication for hotels and hospitality.',
        description:
          'Built in the Valoria line, this solution offers a mobile-first structure for guest communication, brand presentation and operational visibility. Corporate compliance is maintained with privacy, terms and support pages.',
        imageAlt: 'Valoria Hotel guest mobile app with suite card, concierge chat and digital key',
        tags: ['Hotel', 'Mobile', 'Hospitality'],
        ctaLabel: 'Open product page',
      },
      tr: {
        title: 'Valoria Hotel',
        summary: 'Otel ve konaklama işletmeleri için mobil deneyim ve iletişim odağı.',
        description:
          'Valoria çizgisinde geliştirilen bu çözüm; konuk iletişimi, marka sunumu ve operasyonel görünürlük için mobil öncelikli bir yapı sunar. Gizlilik, kullanım şartları ve destek sayfalarıyla kurumsal uyum korunur.',
        imageAlt: 'Valoria Hotel misafir mobil uygulaması: oda kartı, resepsiyon sohbeti ve dijital anahtar',
        tags: ['Otel', 'Mobil', 'Konaklama'],
        ctaLabel: 'Ürün sayfasını aç',
      },
    },
  },
  {
    slug: 'sosyal-platform',
    externalUrl: 'https://kbsprime.com',
    image: '/assets/projects/kbs-prime.svg',
    text: {
      en: {
        title: 'KBS Prime',
        summary: 'A live-card and community-focused social platform experience.',
        description:
          'A scalable social platform suited to user engagement, content sharing and live usage scenarios. A store-accessible product example that keeps evolving.',
        imageAlt: 'KBS Prime community feed with live cards, composer and suggested profiles',
        tags: ['Social platform', 'Community', 'Live'],
        ctaLabel: 'Visit site',
      },
      tr: {
        title: 'KBS Prime',
        summary: 'Canlı kart ve topluluk odaklı sosyal platform deneyimi.',
        description:
          'Kullanıcı etkileşimi, içerik paylaşımı ve canlı kullanım senaryolarına uygun, ölçeklenebilir bir sosyal platform. Mağaza üzerinden erişilebilir, sürekli geliştirilen bir ürün örneği.',
        imageAlt: 'KBS Prime topluluk akışı: canlı kartlar, paylaşım alanı ve önerilen profiller',
        tags: ['Sosyal platform', 'Topluluk', 'Canlı'],
        ctaLabel: 'Siteyi ziyaret et',
      },
    },
  },
  {
    slug: 'dating-app',
    image: '/assets/projects/dating.svg',
    text: {
      en: {
        title: 'Dating & matching solutions',
        summary: 'Modern dating apps with profiles, matching, chat and membership models.',
        description:
          'From Tinder-like flows to corporate matching projects, we build end-to-end products with secure messaging, moderation and payment integrations. Grow your existing product or design it from scratch.',
        imageAlt: 'Dating and matching app with swipe cards, match notification and chat',
        tags: ['Matching', 'Chat', 'Membership'],
        ctaLabel: 'Request a quote',
      },
      tr: {
        title: 'Eşleşme & arkadaşlık çözümleri',
        summary: 'Profil, eşleşme, sohbet ve üyelik modelleriyle modern tanışma uygulamaları.',
        description:
          'Tinder benzeri akışlardan kurumsal eşleşme projelerine kadar; güvenli mesajlaşma, moderasyon ve ödeme entegrasyonlarıyla uçtan uca ürün geliştiriyoruz. İsterseniz mevcut ürününüzü büyütelim, isterseniz sıfırdan tasarlayalım.',
        imageAlt: 'Eşleşme uygulaması: profil kartları, eşleşme bildirimi ve sohbet',
        tags: ['Eşleşme', 'Sohbet', 'Üyelik'],
        ctaLabel: 'Teklif al',
      },
    },
  },
  {
    slug: 'safdas',
    internalPath: '/safdas',
    image: '/assets/projects/safdas.svg',
    text: {
      en: {
        title: 'SAFDAŞ',
        summary: 'Prayer times, Quran, qibla and an Islamic social community app.',
        description:
          'SAFDAŞ combines prayer times, a qibla compass, Quran, supplications, dhikr and worship tracking with SAF circles, social posts and live audio rooms. Privacy, terms, child safety, account deletion and support pages ensure store compliance.',
        imageAlt: 'SAFDAŞ app with prayer times, qibla compass and daily reading progress',
        tags: ['Prayer', 'Islamic life', 'Community'],
        ctaLabel: 'Product page',
      },
      tr: {
        title: 'SAFDAŞ',
        summary: 'Namaz vakitleri, Kur’an, kıble ve İslami sosyal topluluk uygulaması.',
        description:
          'SAFDAŞ; namaz vakitleri, kıble pusulası, Kur’an, dua, zikir ve ibadet takibini SAF Halkaları, sosyal gönderiler ve canlı sesli odalarla birleştirir. Gizlilik, kullanım şartları, çocuk koruma, hesap silme ve destek sayfalarıyla mağaza uyumu sağlanır.',
        imageAlt: 'SAFDAŞ uygulaması: namaz vakitleri, kıble pusulası ve günlük okuma takibi',
        tags: ['Namaz', 'İslami yaşam', 'Topluluk'],
        ctaLabel: 'Tanıtım sayfası',
      },
    },
  },
  {
    slug: 'vora',
    internalPath: '/vora',
    image: '/assets/projects/vora.svg',
    text: {
      en: {
        title: 'Vora',
        summary: 'An instant communication and community platform for Black Sea cities.',
        description:
          'An instant messaging, local content and community experience designed for the Black Sea cities from Trabzon to Samsun. A safe platform with city channels, notifications and moderation tools.',
        imageAlt: 'Vora city app with hyperlocal feed, nearby map and city channels',
        tags: ['Community', 'Black Sea', 'Instant messaging'],
        ctaLabel: 'Product page',
      },
      tr: {
        title: 'Vora',
        summary: 'Karadeniz şehirleri için anlık haberleşme ve topluluk platformu.',
        description:
          "Trabzon'dan Samsun'a Karadeniz illeri için tasarlanmış anlık mesajlaşma, yerel içerik ve topluluk deneyimi. Şehir kanalları, bildirimler ve moderasyon araçlarıyla güvenli bir platform.",
        imageAlt: 'Vora şehir uygulaması: yerel akış, harita ve şehir kanalları',
        tags: ['Topluluk', 'Karadeniz', 'Anlık haberleşme'],
        ctaLabel: 'Tanıtım sayfası',
      },
    },
  },
  {
    slug: 'tamuso',
    internalPath: '/tamuso',
    image: '/assets/projects/tamuso.svg',
    text: {
      en: {
        title: 'Tamuso',
        summary: 'A modern voice chat platform with live audio rooms.',
        description:
          'Join live rooms as a speaker or listener. Promotional and legal pages compliant with App Store / Google Play, including moderation, privacy and child safety policies.',
        imageAlt: 'Tamuso live voice room with speaker seats, waveform and listeners',
        tags: ['Voice room', 'Live chat', 'Community'],
        ctaLabel: 'Product page',
      },
      tr: {
        title: 'Tamuso',
        summary: 'Canlı sesli odalar ve modern sesli sohbet platformu.',
        description:
          'Konuşmacı veya dinleyici olarak canlı odalara katılın. Moderasyon, gizlilik ve çocuk koruma politikalarıyla App Store / Google Play uyumlu tanıtım ve yasal sayfalar.',
        imageAlt: 'Tamuso canlı sesli oda: konuşmacı koltukları, ses dalgası ve dinleyiciler',
        tags: ['Sesli oda', 'Canlı sohbet', 'Topluluk'],
        ctaLabel: 'Tanıtım sayfası',
      },
    },
  },
  {
    slug: 'sehir-uygulamasi',
    internalPath: '/mytrabzon',
    image: '/assets/projects/mytrabzon.svg',
    text: {
      en: {
        title: 'Trabzon Live (MyTrabzon)',
        summary: 'A mobile app for the city guide, local content and community.',
        description:
          'A mobile experience bringing together city news, events and local businesses. Live on Google Play — a strong reference for city branding and user loyalty.',
        imageAlt: 'Trabzon Live city guide app with places, events, weather and map',
        tags: ['City app', 'Local content', 'Mobile'],
        ctaLabel: 'Product page',
      },
      tr: {
        title: 'Trabzon Live (MyTrabzon)',
        summary: 'Şehir rehberi, yerel içerik ve topluluk için mobil uygulama.',
        description:
          'Şehre özel haber, etkinlik ve yerel işletmeleri bir araya getiren mobil deneyim. Google Play üzerinden yayında; şehir markası ve kullanıcı sadakati için güçlü bir referans.',
        imageAlt: 'Trabzon Live şehir rehberi uygulaması: mekânlar, etkinlikler, hava durumu ve harita',
        tags: ['Şehir uygulaması', 'Yerel içerik', 'Mobil'],
        ctaLabel: 'Tanıtım sayfası',
      },
    },
  },
]

export function getProjectBySlug(slug: string | undefined): ProjectEntry | undefined {
  return projectsData.find((p) => p.slug === slug)
}
