import React, { createContext, useContext, useState, useEffect } from 'react'

// Translation types
export type Language = 'en' | 'tr'

export interface Translations {
  // Navigation
  nav: {
    home: string
    about: string
    solutions: string
    pricing: string
    blog: string
    contact: string
    login: string
    getQuote: string
  }
  
  // Hero section
  hero: {
    badge: string
    title1: string
    title2: string
    title3: string
    description: string
    viewPackages: string
    watchDemo: string
  }
  
  // Stats
  stats: {
    projectsDelivered: string
    happyClients: string
    support: string
    successRate: string
  }
  
  // Tech stack
  tech: {
    title: string
    subtitle: string
  }
  
  // Packages
  packages: {
    title: string
    subtitle: string
    selectCategory: string
    buyNow: string
    popular: string
  }
  
  // Footer
  footer: {
    company: string
    address: string
    phone: string
    email: string
    rights: string
    poweredBy: string
  }
  
  // Common
  common: {
    loading: string
    error: string
    success: string
    cancel: string
    confirm: string
  }
  
  // Donation/Support
  donation: {
    support: string
    title: string
    subtitle: string
    description: string
    breakfast: string
    breakfastDesc: string
    tours: string
    toursDesc: string
    development: string
    developmentDesc: string
    supportButton: string
    packagesFrom: string
    optional: string
    badgeTitle: string
    badgeDesc: string
    basic: string
    standard: string
    premium: string
  }
}

// Translation data
const translations: Record<Language, Translations> = {
  en: {
    nav: {
      home: '🏠 Home',
      about: '🧍‍♂️ About',
      solutions: '🧩 Solutions',
      pricing: '💰 Pricing',
      blog: '📰 Blog',
      contact: '📞 Contact',
      login: '🔑 Login',
      getQuote: '🚀 Get Quote'
    },
    hero: {
      badge: 'AI-Powered Software Development',
      title1: 'Build Amazing',
      title2: 'Software',
      title3: 'Solutions',
      description: 'From web applications to AI-powered systems, we create cutting-edge software that transforms businesses and drives innovation.',
      viewPackages: 'View Packages',
      watchDemo: 'Watch Demo'
    },
    stats: {
      projectsDelivered: 'Projects Delivered',
      happyClients: 'Happy Clients',
      support: 'Support',
      successRate: 'Success Rate'
    },
    tech: {
      title: 'Powered by Modern Tech',
      subtitle: 'We use the latest technologies and frameworks to build scalable, secure, and high-performance applications.'
    },
    packages: {
      title: 'Software Packages',
      subtitle: 'Choose the perfect solution for your business needs',
      selectCategory: 'Select Category',
      buyNow: 'Buy Now',
      popular: 'Popular'
    },
    footer: {
      company: 'LitxTech LLC',
      address: '15442 Ventura Blvd., STE 201-1834, Sherman Oaks, California 91403',
      phone: '+1 307 271 5151',
      email: 'support@litxtech.com',
      rights: 'All Rights Reserved',
      poweredBy: 'Powered by DeepSeek AI • Hosted on Vercel • Database: Supabase'
    },
    common: {
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      cancel: 'Cancel',
      confirm: 'Confirm'
    },
    donation: {
      support: 'Support',
      title: 'Support the',
      subtitle: 'Student Community',
      description: 'MyTrabzon is a mobile application that brings university students together; facilitating events, community organizations, social gatherings, and city life.',
      breakfast: 'Breakfast events for university students',
      breakfastDesc: 'Social gatherings and community activity expenses',
      tours: 'Culture-travel and nature tours',
      toursDesc: 'Organization support and event expenses',
      development: 'Application development',
      developmentDesc: 'Security and infrastructure costs',
      supportButton: 'Support',
      packagesFrom: 'Packages Starting from',
      optional: '💡 Donations are not mandatory. All support is completely voluntary.',
      badgeTitle: 'Supporter Badge',
      badgeDesc: 'Special badge for donors',
      basic: 'Basic',
      standard: 'Standard',
      premium: 'Premium'
    }
  },
  tr: {
    nav: {
      home: '🏠 Ana Sayfa',
      about: '🧍‍♂️ Hakkımızda',
      solutions: '🧩 Çözümler',
      pricing: '💰 Fiyatlar',
      blog: '📰 Blog',
      contact: '📞 İletişim',
      login: '🔑 Giriş',
      getQuote: '🚀 Teklif Al'
    },
    hero: {
      badge: 'Yapay Zeka Destekli Yazılım Geliştirme',
      title1: 'Harika Yazılım',
      title2: 'Çözümleri',
      title3: 'İnşa Edin',
      description: 'Web uygulamalarından yapay zeka destekli sistemlere kadar, işletmeleri dönüştüren ve inovasyonu destekleyen son teknoloji yazılımlar oluşturuyoruz.',
      viewPackages: 'Paketleri Görüntüle',
      watchDemo: 'Demo İzle'
    },
    stats: {
      projectsDelivered: 'Teslim Edilen Projeler',
      happyClients: 'Mutlu Müşteriler',
      support: 'Destek',
      successRate: 'Başarı Oranı'
    },
    tech: {
      title: 'Modern Teknoloji ile Güçlendirilmiş',
      subtitle: 'Ölçeklenebilir, güvenli ve yüksek performanslı uygulamalar oluşturmak için en son teknolojileri ve framework\'leri kullanıyoruz.'
    },
    packages: {
      title: 'Yazılım Paketleri',
      subtitle: 'İş ihtiyaçlarınız için mükemmel çözümü seçin',
      selectCategory: 'Kategori Seçin',
      buyNow: 'Satın Al',
      popular: 'Popüler'
    },
    footer: {
      company: 'LitxTech LLC',
      address: '15442 Ventura Blvd., STE 201-1834, Sherman Oaks, California 91403',
      phone: '+1 307 271 5151',
      email: 'support@litxtech.com',
      rights: 'Tüm Hakları Saklıdır',
      poweredBy: 'DeepSeek AI ile Desteklenmektedir • Vercel\'de Barındırılmaktadır • Veritabanı: Supabase'
    },
    common: {
      loading: 'Yükleniyor...',
      error: 'Hata',
      success: 'Başarılı',
      cancel: 'İptal',
      confirm: 'Onayla'
    },
    donation: {
      support: 'Destek',
      title: 'Öğrenci Topluluğuna',
      subtitle: 'Destek Olun',
      description: 'MyTrabzon, üniversite öğrencilerini bir araya getiren; etkinlikler, topluluk organizasyonları, sosyal buluşmalar ve şehir içi yaşamı kolaylaştıran bir mobil uygulamadır.',
      breakfast: 'Üniversiteliler için kahvaltı etkinlikleri',
      breakfastDesc: 'Sosyal buluşmalar ve topluluk aktivite giderleri',
      tours: 'Kültür-gezi ve doğa turları',
      toursDesc: 'Organizasyon desteği ve etkinlik giderleri',
      development: 'Uygulama geliştirme',
      developmentDesc: 'Güvenlik ve altyapı masrafları',
      supportButton: 'Destek Ol',
      packagesFrom: '89 ₺\'den Başlayan Paketler',
      optional: '💡 Bağış yapmak zorunlu değildir. Tüm destekler tamamen isteğe bağlıdır.',
      badgeTitle: 'Destekçi Rozeti',
      badgeDesc: 'Bağış yapanlara özel etiket',
      basic: 'Temel',
      standard: 'Standart',
      premium: 'Premium'
    }
  }
}

// Language Context
interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Language Provider Component
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en')

  // Load language from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('litxtech-language') as Language
      if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'tr')) {
        setLanguageState(savedLanguage)
      } else {
        // Detect browser language
        const browserLang = navigator.language.split('-')[0]
        if (browserLang === 'tr') {
          setLanguageState('tr')
        }
      }
    }
  }, [])

  // Save language to localStorage when changed
  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    if (typeof window !== 'undefined') {
      localStorage.setItem('litxtech-language', lang)
    }
  }

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: translations[language]
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

// Hook to use language context
export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

// Translation hook for easy access
export function useTranslation() {
  const { t } = useLanguage()
  return t
}
