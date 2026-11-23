/**
 * LitxTech — tek kaynaklı çok dilli metin sözlüğü.
 *
 * Kural: bir sayfada `copy` nesnesinden gelmeyen hiçbir metin olmaz.
 * Böylece dil değiştiğinde karışık dil (TR/EN) kalmaz.
 */

export type Lang = 'en' | 'tr'

export const LANGS: Lang[] = ['en', 'tr']

export const langLabel: Record<Lang, string> = {
  en: 'English',
  tr: 'Türkçe',
}

export const langShort: Record<Lang, string> = {
  en: 'EN',
  tr: 'TR',
}

export const htmlLang: Record<Lang, string> = {
  en: 'en',
  tr: 'tr',
}

export const ogLocale: Record<Lang, string> = {
  en: 'en_US',
  tr: 'tr_TR',
}

type Localized<T> = Record<Lang, T>

/* ------------------------------------------------------------------ */
/* Navigasyon & ortak                                                  */
/* ------------------------------------------------------------------ */

const nav: Localized<{
  home: string
  products: string
  services: string
  solutions: string
  technology: string
  company: string
  insights: string
  blog: string
  support: string
  allSolutions: string
  search: string
  signIn: string
  signOut: string
  account: string
  startProject: string
  language: string
  openMenu: string
  closeMenu: string
  searchSite: string
  forgotPassword: string
  myAccount: string
}> = {
  en: {
    home: 'Home',
    products: 'Products',
    services: 'Services',
    solutions: 'Solutions',
    technology: 'Technology',
    company: 'Company',
    insights: 'Insights',
    blog: 'Blog',
    support: 'Support',
    allSolutions: 'All solutions',
    search: 'Search',
    signIn: 'Sign in',
    signOut: 'Sign out',
    account: 'Account',
    startProject: 'Start a project',
    language: 'Language',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    searchSite: 'Search the site',
    forgotPassword: 'Forgot password',
    myAccount: 'My account',
  },
  tr: {
    home: 'Ana sayfa',
    products: 'Ürünler',
    services: 'Hizmetler',
    solutions: 'Çözümler',
    technology: 'Teknoloji',
    company: 'Şirket',
    insights: 'İçgörüler',
    blog: 'Blog',
    support: 'Destek',
    allSolutions: 'Tüm çözümler',
    search: 'Ara',
    signIn: 'Giriş',
    signOut: 'Çıkış',
    account: 'Hesap',
    startProject: 'Proje başlat',
    language: 'Dil',
    openMenu: 'Menüyü aç',
    closeMenu: 'Menüyü kapat',
    searchSite: 'Sitede ara',
    forgotPassword: 'Şifremi unuttum',
    myAccount: 'Hesabım',
  },
}

/* ------------------------------------------------------------------ */
/* Ana sayfa                                                           */
/* ------------------------------------------------------------------ */

const home: Localized<{
  metaTitle: string
  metaDescription: string
  badge: string
  heroTitle: string
  heroSubtitle: string
  heroDescription: string
  ctaPrimary: string
  ctaSecondary: string
  ctaTertiary: string
  solutionsEyebrow: string
  solutionsTitle: string
  solutionsLead: string
  viewAllSolutions: string
  projectsEyebrow: string
  projectsTitle: string
  projectsLead: string
  viewAllProjects: string
  nowShowing: string
  previousProject: string
  nextProject: string
  inspect: string
  slide: string
  capabilitiesTitle: string
  capabilitiesSubtitle: string
  processTitle: string
  processSubtitle: string
  whyTitle: string
  whyLead: string
  faqTitle: string
  aboutTitle: string
  aboutBody: string
  aboutBody2: string
  finalTitle: string
  finalSubtitle: string
  finalQuote: string
  finalWhatsapp: string
  finalSupport: string
  trustTitle: string
}> = {
  en: {
    metaTitle: 'LitxTech | Software & Digital Product Studio',
    metaDescription:
      'LitxTech is a software company building modern web and mobile applications, custom software, digital products and technology platforms.',
    badge: 'Enterprise software · Web & mobile',
    heroTitle: 'We build software that moves businesses forward.',
    heroSubtitle: 'Mobile products, operating systems and custom software — shipped and supported by LitxTech.',
    heroDescription:
      'LitxTech builds products such as Vora and Tamuso, plus the business software behind hotels, restaurants and custom operations. From architecture to store release.',
    ctaPrimary: 'Start a project',
    ctaSecondary: 'Explore our products',
    ctaTertiary: 'Talk to us',
    solutionsEyebrow: 'Solution areas',
    solutionsTitle: 'Solution categories that grow your business',
    solutionsLead: 'Rather than listing features, we start from the categories of work that create value for you.',
    viewAllSolutions: 'View all solutions',
    projectsEyebrow: 'Featured work',
    projectsTitle: 'Selected work from our portfolio',
    projectsLead: 'We build trust with real products that are live today.',
    viewAllProjects: 'All projects',
    nowShowing: 'Now showing',
    previousProject: 'Previous project',
    nextProject: 'Next project',
    inspect: 'View details',
    slide: 'Slide',
    capabilitiesTitle: 'What we can build',
    capabilitiesSubtitle:
      'We do more than showcase existing products — we design and ship new ones around your business model.',
    processTitle: 'How we work',
    processSubtitle: 'A transparent, measurable and reliable delivery model.',
    whyTitle: 'Why LitxTech',
    whyLead: 'Not an amateur look — product-focused engineering, clear communication and measurable delivery.',
    faqTitle: 'Frequently asked questions',
    aboutTitle: 'What is LitxTech?',
    aboutBody:
      'LitxTech (also known as Litx) is a technology company that builds software products. We deliver mobile applications, social platforms, SaaS, hotel and restaurant management systems and custom software end to end. Our official site is www.litxtech.com.',
    aboutBody2:
      'For anyone looking for a software company, LitxTech combines planning, design, development, testing, store publishing and support under a single team. See our about, solutions and projects pages for details.',
    finalTitle: 'You have an idea. Let us build it.',
    finalSubtitle:
      'Tell us about your project in a few minutes. Our team will review your needs and define the right delivery approach.',
    finalQuote: 'Describe my project',
    finalWhatsapp: 'Chat on WhatsApp',
    finalSupport: 'Support center',
    trustTitle: 'Trusted delivery',
  },
  tr: {
    metaTitle: 'LitxTech | Yazılım ve Dijital Ürün Stüdyosu',
    metaDescription:
      'LitxTech; modern web ve mobil uygulamalar, özel yazılım çözümleri, dijital ürünler ve teknoloji platformları geliştiren bir yazılım şirketidir.',
    badge: 'Kurumsal yazılım · Web & mobil',
    heroTitle: 'İşinizi ileri taşıyan yazılımlar geliştiriyoruz.',
    heroSubtitle: 'Mobil ürünler, operasyon sistemleri ve özel yazılım — LitxTech tarafından geliştirilir ve desteklenir.',
    heroDescription:
      'LitxTech; Vora ve Tamuso gibi ürünlerin yanı sıra otel, restoran ve özel operasyonların arkasındaki iş yazılımlarını geliştirir. Mimariden mağaza yayınına kadar.',
    ctaPrimary: 'Proje başlat',
    ctaSecondary: 'Ürünlerimizi keşfedin',
    ctaTertiary: 'Bize ulaşın',
    solutionsEyebrow: 'Çözüm alanları',
    solutionsTitle: 'İşinizi büyüten çözüm kategorileri',
    solutionsLead:
      'Ürünleri tek tek listelemek yerine, işinize değer katan çözüm kategorileriyle ilerliyoruz.',
    viewAllSolutions: 'Tüm çözümleri görüntüle',
    projectsEyebrow: 'Öne çıkan işler',
    projectsTitle: 'Referanslarımızdan seçkiler',
    projectsLead: 'Gerçek ürünler ve yayında olan referanslarla güven oluşturuyoruz.',
    viewAllProjects: 'Tüm projeler',
    nowShowing: 'Şu an',
    previousProject: 'Önceki proje',
    nextProject: 'Sonraki proje',
    inspect: 'İncele',
    slide: 'Slayt',
    capabilitiesTitle: 'Neler geliştirebiliriz?',
    capabilitiesSubtitle:
      'Mevcut ürünlerimizi sergilemekle kalmıyor; iş modelinize göre yeni ürünler de tasarlayıp hayata geçiriyoruz.',
    processTitle: 'Çalışma süreci',
    processSubtitle: 'Şeffaf, ölçülebilir ve güven veren bir teslimat modeli.',
    whyTitle: 'Neden LitxTech?',
    whyLead:
      'Amatör görünüm değil; ürün odaklı mühendislik, net iletişim ve ölçülebilir teslimat.',
    faqTitle: 'Sık sorulan sorular',
    aboutTitle: 'LitxTech nedir?',
    aboutBody:
      'LitxTech (kısa adıyla Litx), yazılım ürünleri geliştiren bir teknoloji şirketidir. Mobil uygulamalar, sosyal platformlar, SaaS, otel ve restoran yönetim sistemleri ile işletmelere özel yazılımı uçtan uca teslim ederiz. Resmi site adresimiz www.litxtech.com.',
    aboutBody2:
      'Yazılım şirketi arayanlar için LitxTech; planlama, tasarım, geliştirme, test, mağaza yayını ve destek süreçlerini tek ekip altında birleştirir. Detaylar için hakkımızda, çözümler ve projeler sayfalarına bakın.',
    finalTitle: 'Bir fikriniz var. Onu gerçeğe dönüştürelim.',
    finalSubtitle:
      'Projenizi birkaç dakika içinde anlatın. Ekibimiz ihtiyaçlarınızı inceleyerek size uygun geliştirme yaklaşımını belirlesin.',
    finalQuote: 'Projemi anlat',
    finalWhatsapp: 'WhatsApp ile iletişim',
    finalSupport: 'Destek merkezi',
    trustTitle: 'Güvenilir teslimat',
  },
}

/* ------------------------------------------------------------------ */
/* Ana sayfa içerik listeleri                                          */
/* ------------------------------------------------------------------ */

const homeLists: Localized<{
  capabilities: string[]
  process: { title: string; desc: string }[]
  why: string[]
  faq: { q: string; a: string }[]
}> = {
  en: {
    capabilities: [
      'Single-panel operations for restaurants',
      'Reservation and operations systems for hotels',
      'City guides and local news applications',
      'Dating and social matching products',
      'Enterprise management dashboards',
      'Social networks and community platforms',
      'Custom reporting and accounting systems',
      'Camera, payment, notification and map integrations',
      'Mobile app + web panel systems working together',
    ],
    process: [
      { title: 'Discovery', desc: 'We align on goals, scope and success metrics together.' },
      { title: 'Design & architecture', desc: 'We map user journeys, system architecture and integrations.' },
      { title: 'Development', desc: 'Modular delivery brings early value and predictable releases.' },
      { title: 'Testing & release', desc: 'We ship after quality, security and performance checks.' },
      { title: 'Support & growth', desc: 'We monitor, improve and grow the product with new features.' },
    ],
    why: [
      'Built around your exact needs',
      'Modern, polished interfaces',
      'Responsive by default',
      'Scalable software architecture',
      'Fast communication and support',
      'Real products with proven delivery',
    ],
    faq: [
      {
        q: 'Which industries do you work with?',
        a: 'Hotels and hospitality, restaurants and food service, social platforms, city apps and custom enterprise software projects.',
      },
      {
        q: 'How is the project timeline planned?',
        a: 'We prepare a weekly sprint plan based on scope, integrations and team capacity, and share milestones in writing.',
      },
      {
        q: 'Do you provide support and maintenance?',
        a: 'Yes. We offer flexible support models for post-launch monitoring, bug fixes and feature requests.',
      },
      {
        q: 'What do you need to prepare a quote?',
        a: 'A short summary of needs, your current systems if any, and a target date are enough. You can start via WhatsApp or the contact form.',
      },
    ],
  },
  tr: {
    capabilities: [
      'Restoranlar için tek panel işletme yönetimi',
      'Oteller için rezervasyon ve operasyon sistemleri',
      'Şehir rehberi ve yerel haber uygulamaları',
      'Arkadaşlık ve eşleşme uygulamaları',
      'Kurumsal yönetim panelleri',
      'Sosyal ağ ve topluluk platformları',
      'İşletmelere özel raporlama ve muhasebe sistemleri',
      'Kamera, ödeme, bildirim ve harita entegrasyonları',
      'Mobil uygulama + web panel birlikte çalışan sistemler',
    ],
    process: [
      { title: 'İhtiyaç analizi', desc: 'Hedefler, kapsam ve başarı ölçütlerini birlikte netleştiriyoruz.' },
      { title: 'Arayüz ve sistem planlama', desc: 'Kullanıcı akışları, mimari ve entegrasyonları tasarlıyoruz.' },
      { title: 'Yazılım geliştirme', desc: 'Modüler geliştirme ile erken değer ve düzenli teslimat sağlıyoruz.' },
      { title: 'Test ve yayınlama', desc: 'Kalite, güvenlik ve performans kontrolleri sonrası canlıya alıyoruz.' },
      { title: 'Destek ve geliştirme', desc: 'İzleme, iyileştirme ve yeni özelliklerle ürünü büyütüyoruz.' },
    ],
    why: [
      'İhtiyaca özel geliştirme',
      'Modern arayüzler',
      'Mobil uyumlu yapı',
      'Ölçeklenebilir yazılım altyapısı',
      'Hızlı iletişim ve destek',
      'Gerçek projeler ve uygulanabilir çözümler',
    ],
    faq: [
      {
        q: 'Hangi sektörlere hizmet veriyorsunuz?',
        a: 'Otel ve konaklama, restoran ve yiyecek-içecek, sosyal platformlar, şehir uygulamaları ve kuruma özel yazılım projelerinde çalışıyoruz.',
      },
      {
        q: 'Proje süresi nasıl planlanıyor?',
        a: 'Kapsam, entegrasyonlar ve ekip yoğunluğuna göre haftalık sprint planı çıkarıyoruz; kilometre taşları yazılı olarak paylaşılır.',
      },
      {
        q: 'Destek ve bakım sunuyor musunuz?',
        a: 'Evet. Yayın sonrası izleme, hata giderme ve geliştirme talepleri için esnek destek modelleri sunuyoruz.',
      },
      {
        q: 'Teklif almak için ne gerekir?',
        a: 'Kısa bir ihtiyaç özeti, varsa mevcut sistemleriniz ve hedef tarih yeterli. İsterseniz WhatsApp veya iletişim formu üzerinden hızlıca başlayabilirsiniz.',
      },
    ],
  },
}

/* ------------------------------------------------------------------ */
/* Çözümler                                                            */
/* ------------------------------------------------------------------ */

const solutions: Localized<{
  metaTitle: string
  metaDescription: string
  eyebrow: string
  title: string
  lead: string
  ctaQuote: string
  ctaProjects: string
  detailBadge: string
  detailCta: string
  featuresTitle: string
  audienceTitle: string
  audienceNote: string
  faqTitle: string
  closingTitle: string
  closingLead: string
  backToAll: string
  cardCta: string
  demo: string
}> = {
  en: {
    metaTitle: 'Software Development | LitxTech',
    metaDescription:
      'LitxTech software development: hotels, restaurants, mobile apps, social platforms and custom enterprise software. Review the scope and request a quote.',
    eyebrow: 'Solutions',
    title: 'Software solution areas that fit your business',
    lead: 'Each card is not a product — it represents an approach that strengthens your operation. Detail pages show the scope and process clearly.',
    ctaQuote: 'Request a quote',
    ctaProjects: 'Case studies',
    detailBadge: 'Solution detail',
    detailCta: 'Request a quote',
    featuresTitle: 'Core capabilities',
    audienceTitle: 'Who it is for',
    audienceNote: 'Let us schedule a short discovery call for a clearer proposal.',
    faqTitle: 'Frequently asked questions',
    closingTitle: 'Let us define this solution together',
    closingLead: 'In a short call we can align on scope, timeline and budget range.',
    backToAll: 'All solutions',
    cardCta: 'View details',
    demo: 'Demo',
  },
  tr: {
    metaTitle: 'Yazılım Geliştirme | LitxTech',
    metaDescription:
      'LitxTech yazılım geliştirme çözümleri: otel, restoran, mobil uygulama, sosyal platform ve kuruma özel yazılım. Kapsamı inceleyip teklif alın.',
    eyebrow: 'Çözümler',
    title: 'İşinize uygun yazılım çözüm alanları',
    lead: 'Her kart bir ürün değil; operasyonunuzu güçlendiren bir çözüm yaklaşımını temsil eder. Detay sayfalarında kapsamı ve süreci net şekilde görebilirsiniz.',
    ctaQuote: 'Teklif al',
    ctaProjects: 'Referans projeler',
    detailBadge: 'Çözüm detayı',
    detailCta: 'Teklif al',
    featuresTitle: 'Temel özellikler',
    audienceTitle: 'Kimler için?',
    audienceNote: 'Daha net bir teklif için kısa bir keşif görüşmesi planlayalım.',
    faqTitle: 'Sık sorulan sorular',
    closingTitle: 'Bu çözümü birlikte netleştirelim',
    closingLead: 'Kısa bir görüşmede kapsam, süre ve bütçe aralığını konuşalım.',
    backToAll: 'Tüm çözümler',
    cardCta: 'Detayları gör',
    demo: 'Demo',
  },
}

/* ------------------------------------------------------------------ */
/* Projeler                                                            */
/* ------------------------------------------------------------------ */

const projects: Localized<{
  metaTitle: string
  metaDescription: string
  eyebrow: string
  title: string
  lead: string
  inspect: string
  back: string
  overview: string
  scope: string
  talkTitle: string
  talkLead: string
  allProjects: string
  visit: string
  openProduct: string
}> = {
  en: {
    metaTitle: 'Projects and Case Studies | LitxTech',
    metaDescription:
      'LitxTech projects: hotel software, social platforms, mobile applications and city products. Explore the related solutions.',
    eyebrow: 'Projects',
    title: 'Products that work in the field',
    lead: 'The examples below reflect real usage scenarios. We can also build a similar product from scratch for your brand.',
    inspect: 'View details',
    back: 'All projects',
    overview: 'Overview',
    scope: 'Scope',
    talkTitle: 'Want something like this?',
    talkLead: 'Tell us about your product and we will map the fastest credible path to launch.',
    allProjects: 'All projects',
    visit: 'Visit site',
    openProduct: 'Open product page',
  },
  tr: {
    metaTitle: 'Projeler ve Vaka Çalışmaları | LitxTech',
    metaDescription:
      'LitxTech projeleri: otel yazılımı, sosyal platform, mobil uygulama ve şehir ürünleri. İlgili çözümlere buradan geçin.',
    eyebrow: 'Projeler',
    title: 'Sahada çalışan ürünler',
    lead: 'Aşağıdaki örnekler gerçek kullanım senaryoları içindir. Benzer bir ürünü markanıza göre sıfırdan da kurabiliriz.',
    inspect: 'İncele',
    back: 'Tüm projeler',
    overview: 'Genel bakış',
    scope: 'Kapsam',
    talkTitle: 'Böyle bir şey mi istiyorsunuz?',
    talkLead: 'Ürününüzü anlatın; yayına giden en hızlı ve güvenilir yolu birlikte çizelim.',
    allProjects: 'Tüm projeler',
    visit: 'Siteyi ziyaret et',
    openProduct: 'Ürün sayfasını aç',
  },
}

/* ------------------------------------------------------------------ */
/* Hakkımızda                                                          */
/* ------------------------------------------------------------------ */

const about: Localized<{
  metaTitle: string
  metaDescription: string
  eyebrow: string
  title: string
  intro: string
  whatTitle: string
  whatBody: string
  whatItems: string[]
  whyTitle: string
  whyBody: string
  factsTitle: string
  legalName: string
  web: string
  email: string
  phone: string
  ctaProject: string
  ctaSolutions: string
  ctaContact: string
  stats: { value: string; label: string }[]
}> = {
  en: {
    metaTitle: 'About | LitxTech',
    metaDescription:
      'LitxTech builds modern web and mobile applications, custom software and digital products. Services, products and contact details.',
    eyebrow: 'About',
    title: 'LitxTech — the team that turns software into business',
    intro:
      'LitxTech (Litx for short) is a technology company building modern software products for businesses and founders. We plan, design, build and support mobile applications, SaaS platforms, hotel and restaurant management systems and custom enterprise software — from idea to launch.',
    whatTitle: 'What we do',
    whatBody:
      'We deliver product-focused engineering: interface, backend, mobile publishing, integrations and post-launch maintenance. Our goal is not a pretty website — it is software that produces measurable business value.',
    whatItems: [
      'Mobile app development (iOS & Android)',
      'SaaS platforms and web dashboards',
      'Hotel and restaurant operations software',
      'Social platforms and city applications',
      'Custom software and integrations',
    ],
    whyTitle: 'Why LitxTech',
    whyBody:
      'Our brand is known as LitxTech / Litx. We work with transparent process, fast communication and real reference products. Whether you need an MVP or a scalable enterprise system, we build the architecture around the need.',
    factsTitle: 'Company details',
    legalName: 'Legal name',
    web: 'Web',
    email: 'Email',
    phone: 'Phone',
    ctaProject: 'Describe your project',
    ctaSolutions: 'Explore solutions',
    ctaContact: 'Contact',
    stats: [
      { value: '6+', label: 'Solutions in production' },
      { value: '8', label: 'Live products' },
      { value: '2', label: 'Store platforms' },
      { value: '24/7', label: 'Monitoring' },
    ],
  },
  tr: {
    metaTitle: 'Hakkımızda | LitxTech',
    metaDescription:
      'LitxTech; modern web ve mobil uygulamalar, özel yazılım ve dijital ürünler geliştiren bir yazılım şirketidir. Hizmetler, ürünler ve iletişim burada.',
    eyebrow: 'Hakkımızda',
    title: 'LitxTech — yazılımı işe dönüştüren ekip',
    intro:
      'LitxTech (kısaca Litx), işletmeler ve girişimler için modern yazılım ürünleri geliştiren bir teknoloji şirketidir. Mobil uygulamalar, SaaS platformları, otel ve restoran yönetim sistemleri ile kurumlara özel yazılımı fikir aşamasından yayına kadar planlar, tasarlar ve destekleriz.',
    whatTitle: 'Ne yapıyoruz?',
    whatBody:
      'LitxTech olarak ürün odaklı mühendislik sunuyoruz: kullanıcı arayüzü, backend, mobil yayınlama, entegrasyonlar ve yayın sonrası bakım. Amacımız amatör bir site değil; ölçülebilir iş değeri üreten yazılım teslim etmek.',
    whatItems: [
      'Mobil uygulama geliştirme (iOS & Android)',
      'SaaS ve web panelleri',
      'Otel ve restoran operasyon yazılımları',
      'Sosyal platform ve şehir uygulamaları',
      'Özel yazılım ve entegrasyonlar',
    ],
    whyTitle: 'Neden LitxTech?',
    whyBody:
      'Markamız LitxTech / Litx olarak tanınır. Şeffaf süreç, hızlı iletişim ve gerçek referans ürünlerle çalışırız. İster MVP ister ölçeklenebilir kurumsal sistem — ihtiyaca göre mimari kurarız.',
    factsTitle: 'Şirket bilgileri',
    legalName: 'Ticari unvan',
    web: 'Web',
    email: 'E-posta',
    phone: 'Telefon',
    ctaProject: 'Projeni anlat',
    ctaSolutions: 'Çözümleri incele',
    ctaContact: 'İletişim',
    stats: [
      { value: '6+', label: 'Yayında çözüm alanı' },
      { value: '8', label: 'Canlı ürün' },
      { value: '2', label: 'Mağaza platformu' },
      { value: '7/24', label: 'İzleme' },
    ],
  },
}

/* ------------------------------------------------------------------ */
/* İletişim                                                            */
/* ------------------------------------------------------------------ */

const contact: Localized<{
  metaTitle: string
  metaDescription: string
  title: string
  lead: string
  ctaProject: string
  consultTitle: string
  consultLead: string
  consultCta: string
  quickTitle: string
  quickMeta: string
  formTitle: string
  labelName: string
  labelEmail: string
  labelSubject: string
  labelMessage: string
  send: string
  sending: string
  sendError: string
  sent: string
  channelsTitle: string
  email: string
  phone: string
  whatsapp: string
  whatsappCta: string
  address: string
  responseTitle: string
  responseBody: string
}> = {
  en: {
    metaTitle: 'Contact | LitxTech',
    metaDescription:
      'Contact LitxTech about a project, support or partnership. Fill in the form or reach us by phone, email and WhatsApp.',
    title: 'Contact',
    lead: 'Ready to start your project? Get in touch with our team today.',
    ctaProject: 'Describe my project',
    consultTitle: 'Book a free consultation',
    consultLead: 'Schedule a call to discuss your project requirements.',
    consultCta: 'Schedule a call',
    quickTitle: 'Quick call',
    quickMeta: '15 minutes · Free consultation',
    formTitle: 'Send us a message',
    labelName: 'Full name',
    labelEmail: 'Email address',
    labelSubject: 'Subject',
    labelMessage: 'Message',
    send: 'Send message',
    sending: 'Sending…',
    sendError: 'Could not send',
    sent: 'Message received',
    channelsTitle: 'Get in touch',
    email: 'Email',
    phone: 'Phone',
    whatsapp: 'WhatsApp',
    whatsappCta: 'Chat on WhatsApp',
    address: 'Address',
    responseTitle: 'Response time',
    responseBody: 'We reply to most messages within one business day.',
  },
  tr: {
    metaTitle: 'İletişim | LitxTech',
    metaDescription:
      'Proje, destek veya iş birliği için LitxTech ile iletişime geçin. Formu doldurun ya da telefon, e-posta ve WhatsApp üzerinden yazın.',
    title: 'İletişim',
    lead: 'Projenize başlamaya hazır mısınız? Bugün ekibimizle iletişime geçin.',
    ctaProject: 'Projemi anlat',
    consultTitle: 'Ücretsiz görüşme planlayın',
    consultLead: 'Proje ihtiyaçlarınızı konuşmak için bir görüşme planlayın.',
    consultCta: 'Görüşme planla',
    quickTitle: 'Hızlı görüşme',
    quickMeta: '15 dakika · Ücretsiz danışmanlık',
    formTitle: 'Bize mesaj gönderin',
    labelName: 'Ad soyad',
    labelEmail: 'E-posta adresi',
    labelSubject: 'Konu',
    labelMessage: 'Mesaj',
    send: 'Mesajı gönder',
    sending: 'Gönderiliyor…',
    sendError: 'Gönderilemedi',
    sent: 'Mesajınız alındı',
    channelsTitle: 'İletişim kanalları',
    email: 'E-posta',
    phone: 'Telefon',
    whatsapp: 'WhatsApp',
    whatsappCta: 'WhatsApp ile yazın',
    address: 'Adres',
    responseTitle: 'Yanıt süresi',
    responseBody: 'Mesajların çoğuna bir iş günü içinde yanıt veriyoruz.',
  },
}

/* ------------------------------------------------------------------ */
/* Destek / SSS                                                        */
/* ------------------------------------------------------------------ */

const support: Localized<{
  metaTitle: string
  metaDescription: string
  title: string
  lead: string
  projectCard: string
  projectCardMeta: string
  whatsappCard: string
  whatsappFallback: string
  emailCard: string
  ticketTitle: string
  ticketName: string
  ticketEmail: string
  ticketSubject: string
  ticketMessage: string
  ticketSend: string
  ticketOk: string
  ticketError: string
  faqTitle: string
  faqSeeAll: string
}> = {
  en: {
    metaTitle: 'Support Center | LitxTech',
    metaDescription:
      'LitxTech support center: frequently asked questions, project requests and direct contact. Get help with your product or software project.',
    title: 'How can we help you?',
    lead: 'FAQ, project requests and direct contact channels.',
    projectCard: 'Project request',
    projectCardMeta: 'New product or software idea',
    whatsappCard: 'WhatsApp',
    whatsappFallback: 'Message us',
    emailCard: 'Email',
    ticketTitle: 'Support request',
    ticketName: 'Name',
    ticketEmail: 'Email',
    ticketSubject: 'Subject',
    ticketMessage: 'Message',
    ticketSend: 'Send',
    ticketOk: 'Request received',
    ticketError: 'Could not send',
    faqTitle: 'FAQ',
    faqSeeAll: 'See all',
  },
  tr: {
    metaTitle: 'Destek Merkezi | LitxTech',
    metaDescription:
      'LitxTech destek merkezi: sık sorulan sorular, proje talebi ve doğrudan iletişim. Ürün ve yazılım projeleriniz için yardım alın.',
    title: 'Size nasıl yardımcı olabiliriz?',
    lead: 'SSS, proje talebi ve doğrudan iletişim kanalları.',
    projectCard: 'Proje talebi',
    projectCardMeta: 'Yeni ürün / yazılım fikri',
    whatsappCard: 'WhatsApp',
    whatsappFallback: 'Yazın',
    emailCard: 'E-posta',
    ticketTitle: 'Destek talebi',
    ticketName: 'Ad',
    ticketEmail: 'E-posta',
    ticketSubject: 'Konu',
    ticketMessage: 'Mesaj',
    ticketSend: 'Gönder',
    ticketOk: 'Talebiniz alındı',
    ticketError: 'Gönderilemedi',
    faqTitle: 'SSS',
    faqSeeAll: 'Tümünü gör',
  },
}

const faq: Localized<{
  metaTitle: string
  metaDescription: string
  title: string
  lead: string
  empty: string
  fallback: { category: string; question: string; answer: string }[]
}> = {
  en: {
    metaTitle: 'Frequently Asked Questions | LitxTech',
    metaDescription: 'LitxTech FAQ: mobile apps, social platforms, custom software and support.',
    title: 'Frequently asked questions',
    lead: 'Content is managed from the admin panel.',
    empty: 'No published FAQ yet. You can add one from Admin → FAQ.',
    fallback: [
      {
        category: 'General',
        question: 'What does LitxTech build?',
        answer: 'We build mobile applications, social platforms, SaaS products, business software and custom digital systems.',
      },
      {
        category: 'General',
        question: 'How can I request a quote?',
        answer: 'Fill in the “Describe your project” form or reach us via WhatsApp or email.',
      },
    ],
  },
  tr: {
    metaTitle: 'Sıkça Sorulan Sorular | LitxTech',
    metaDescription: 'LitxTech SSS: mobil uygulama, sosyal platform, özel yazılım ve destek.',
    title: 'Sıkça sorulan sorular',
    lead: 'İçerik admin panelinden yönetilir.',
    empty: 'Henüz yayınlanmış SSS yok. Admin → FAQ üzerinden ekleyebilirsiniz.',
    fallback: [
      {
        category: 'Genel',
        question: 'LitxTech ne geliştiriyor?',
        answer: 'Mobil uygulamalar, sosyal platformlar, SaaS ürünleri, işletme yazılımları ve özel dijital sistemler geliştiriyoruz.',
      },
      {
        category: 'Genel',
        question: 'Nasıl teklif alabilirim?',
        answer: 'Projemi Anlat formunu doldurun veya WhatsApp / e-posta ile bize ulaşın.',
      },
    ],
  },
}

/* ------------------------------------------------------------------ */
/* Katalog (hizmetler, ürünler, vaka, teknoloji, süreç, 404)            */
/* ------------------------------------------------------------------ */

const catalog: Localized<{
  servicesMetaTitle: string
  servicesMetaDescription: string
  servicesEyebrow: string
  servicesTitle: string
  servicesLead: string
  productsMetaTitle: string
  productsMetaDescription: string
  productsEyebrow: string
  productsTitle: string
  productsLead: string
  casesMetaTitle: string
  casesMetaDescription: string
  casesEyebrow: string
  casesTitle: string
  casesLead: string
  technologyMetaTitle: string
  technologyMetaDescription: string
  technologyEyebrow: string
  technologyTitle: string
  technologyLead: string
  processMetaTitle: string
  processMetaDescription: string
  processEyebrow: string
  processTitle: string
  processLead: string
  explore: string
  readCase: string
  talkCta: string
  notFoundTitle: string
  notFoundLead: string
  notFoundCta: string
  serverErrorTitle: string
  serverErrorLead: string
  emptyState: string
  relatedSolutions: string
}> = {
  en: {
    servicesMetaTitle: 'Services | LitxTech',
    servicesMetaDescription: 'Product engineering, design, mobile and web development, integrations and support.',
    servicesEyebrow: 'Services',
    servicesTitle: 'Everything needed to ship a product',
    servicesLead: 'From discovery to store release and ongoing support.',
    productsMetaTitle: 'Products | LitxTech',
    productsMetaDescription: 'Live products built by LitxTech: Vora, Tamuso, SAFDAŞ, KBS Prime and more.',
    productsEyebrow: 'Products',
    productsTitle: 'Products we build and operate',
    productsLead: 'Real products with real users, shipped and maintained by our team.',
    casesMetaTitle: 'Case Studies | LitxTech',
    casesMetaDescription: 'Selected LitxTech case studies across hospitality, social and city products.',
    casesEyebrow: 'Case studies',
    casesTitle: 'How the work gets done',
    casesLead: 'Scope, decisions and outcomes from selected projects.',
    technologyMetaTitle: 'Technology | LitxTech',
    technologyMetaDescription: 'The stack we use to build scalable, secure and high-performance software.',
    technologyEyebrow: 'Technology',
    technologyTitle: 'A stack chosen for longevity',
    technologyLead: 'Boring where it should be, modern where it matters.',
    processMetaTitle: 'Process | LitxTech',
    processMetaDescription: 'Our delivery process: discovery, design, build, release and support.',
    processEyebrow: 'Process',
    processTitle: 'A predictable way to deliver software',
    processLead: 'Clear milestones, weekly rhythm and no surprises.',
    explore: 'Explore',
    readCase: 'Read case study',
    talkCta: 'Talk to us',
    notFoundTitle: 'Page not found',
    notFoundLead: 'The page you are looking for moved or never existed.',
    notFoundCta: 'Back to home',
    serverErrorTitle: 'Something went wrong',
    serverErrorLead: 'We logged the error. Please try again in a moment.',
    emptyState: 'Nothing published yet.',
    relatedSolutions: 'Related solutions',
  },
  tr: {
    servicesMetaTitle: 'Hizmetler | LitxTech',
    servicesMetaDescription: 'Ürün mühendisliği, tasarım, mobil ve web geliştirme, entegrasyon ve destek.',
    servicesEyebrow: 'Hizmetler',
    servicesTitle: 'Bir ürünü yayına almak için gereken her şey',
    servicesLead: 'Keşiften mağaza yayınına ve sürekli desteğe kadar.',
    productsMetaTitle: 'Ürünler | LitxTech',
    productsMetaDescription: 'LitxTech tarafından geliştirilen canlı ürünler: Vora, Tamuso, SAFDAŞ, KBS Prime ve daha fazlası.',
    productsEyebrow: 'Ürünler',
    productsTitle: 'Geliştirdiğimiz ve işlettiğimiz ürünler',
    productsLead: 'Gerçek kullanıcısı olan, ekibimiz tarafından geliştirilen ve sürdürülen ürünler.',
    casesMetaTitle: 'Vaka Çalışmaları | LitxTech',
    casesMetaDescription: 'Konaklama, sosyal ve şehir ürünleri alanında seçilmiş LitxTech vaka çalışmaları.',
    casesEyebrow: 'Vaka çalışmaları',
    casesTitle: 'İş nasıl tamamlanıyor',
    casesLead: 'Seçilmiş projelerde kapsam, kararlar ve sonuçlar.',
    technologyMetaTitle: 'Teknoloji | LitxTech',
    technologyMetaDescription: 'Ölçeklenebilir, güvenli ve yüksek performanslı yazılım için kullandığımız teknoloji yığını.',
    technologyEyebrow: 'Teknoloji',
    technologyTitle: 'Uzun ömür için seçilmiş teknoloji yığını',
    technologyLead: 'Gerektiği yerde sade, önemli olduğu yerde modern.',
    processMetaTitle: 'Süreç | LitxTech',
    processMetaDescription: 'Teslimat sürecimiz: keşif, tasarım, geliştirme, yayın ve destek.',
    processEyebrow: 'Süreç',
    processTitle: 'Yazılımı teslim etmenin öngörülebilir yolu',
    processLead: 'Net kilometre taşları, haftalık ritim ve sürpriz yok.',
    explore: 'Keşfet',
    readCase: 'Vakayı oku',
    talkCta: 'Bize ulaşın',
    notFoundTitle: 'Sayfa bulunamadı',
    notFoundLead: 'Aradığınız sayfa taşınmış veya hiç var olmamış olabilir.',
    notFoundCta: 'Ana sayfaya dön',
    serverErrorTitle: 'Bir şeyler ters gitti',
    serverErrorLead: 'Hatayı kaydettik. Lütfen birazdan tekrar deneyin.',
    emptyState: 'Henüz yayınlanmış içerik yok.',
    relatedSolutions: 'İlgili çözümler',
  },
}

/* ------------------------------------------------------------------ */
/* Footer & genel                                                      */
/* ------------------------------------------------------------------ */

const footer: Localized<{
  solutions: string
  company: string
  contact: string
  projects: string
  about: string
  support: string
  faq: string
  projectRequest: string
  blog: string
  myAccount: string
  signIn: string
  forgotPassword: string
  donation: string
  privacy: string
  terms: string
  commercial: string
  sitemap: string
  rights: string
  tagline: string
}> = {
  en: {
    solutions: 'Solutions',
    company: 'Company',
    contact: 'Contact',
    projects: 'Projects',
    about: 'About',
    support: 'Support',
    faq: 'FAQ',
    projectRequest: 'Project request',
    blog: 'Blog',
    myAccount: 'My account',
    signIn: 'Sign in',
    forgotPassword: 'Forgot password',
    donation: 'Donate (MyTrabzon)',
    privacy: 'Privacy',
    terms: 'Terms',
    commercial: 'Commercial agreement',
    sitemap: 'Sitemap',
    rights: 'All rights reserved.',
    tagline: 'Enterprise software, mobile products and digital platforms.',
  },
  tr: {
    solutions: 'Çözümler',
    company: 'Kurumsal',
    contact: 'İletişim',
    projects: 'Projeler',
    about: 'Hakkımızda',
    support: 'Destek',
    faq: 'SSS',
    projectRequest: 'Proje talebi',
    blog: 'Blog',
    myAccount: 'Hesabım',
    signIn: 'Giriş',
    forgotPassword: 'Şifremi unuttum',
    donation: 'Destek (MyTrabzon)',
    privacy: 'Gizlilik',
    terms: 'Şartlar',
    commercial: 'Ticari sözleşme',
    sitemap: 'Site haritası',
    rights: 'Tüm hakları saklıdır.',
    tagline: 'Kurumsal yazılım, mobil ürünler ve dijital platformlar.',
  },
}

/** Legacy stats labels (used by AnimatedStats). */
const stats: Localized<{
  projectsDelivered: string
  happyClients: string
  support: string
  successRate: string
}> = {
  en: {
    projectsDelivered: 'Projects delivered',
    happyClients: 'Happy clients',
    support: 'Support',
    successRate: 'Success rate',
  },
  tr: {
    projectsDelivered: 'Teslim edilen projeler',
    happyClients: 'Mutlu müşteriler',
    support: 'Destek',
    successRate: 'Başarı oranı',
  },
}

/** Editorial (feed/blog/search) UI labels. */
const editorial: Localized<{
  feedTitle: string
  feedLead: string
  feedEmpty: string
  feedError: string
  comment: string
  commentSend: string
  commentSignIn: string
  blogTitle: string
  blogLead: string
  blogEmpty: string
  readPost: string
  searchTitle: string
  searchLead: string
  searchPlaceholder: string
  searchButton: string
  searchEmpty: string
}> = {
  en: {
    feedTitle: 'LitxTech Feed',
    feedLead: 'Published product notes, engineering write-ups and company updates.',
    feedEmpty: 'No published posts yet.',
    feedError: 'Feed could not be loaded.',
    comment: 'Comment',
    commentSend: 'Send',
    commentSignIn: 'Sign in to comment.',
    blogTitle: 'Articles',
    blogLead: 'Only posts published from the admin panel are listed. Drafts are never indexed.',
    blogEmpty: 'No published articles yet.',
    readPost: 'Read article',
    searchTitle: 'Search LitxTech',
    searchLead: 'Search products, services and pages on the official LitxTech site.',
    searchPlaceholder: 'Product, service or page',
    searchButton: 'Search',
    searchEmpty: 'No published page matches this search.',
  },
  tr: {
    feedTitle: 'LitxTech Feed',
    feedLead: 'Yayınlanan ürün notları, mühendislik yazıları ve şirket güncellemeleri.',
    feedEmpty: 'Henüz yayınlanmış gönderi yok.',
    feedError: 'Feed yüklenemedi.',
    comment: 'Yorum',
    commentSend: 'Gönder',
    commentSignIn: 'Yorum için giriş yapın.',
    blogTitle: 'Yazılar',
    blogLead: 'Yalnızca admin panelinden yayınlanan yazılar listelenir. Taslaklar dizine eklenmez.',
    blogEmpty: 'Henüz yayınlanmış yazı yok.',
    readPost: 'Yazıyı oku',
    searchTitle: 'LitxTech site arama',
    searchLead: 'LitxTech resmi sitesinde ürün, hizmet ve sayfa arayın.',
    searchPlaceholder: 'Ürün, hizmet veya sayfa',
    searchButton: 'Ara',
    searchEmpty: 'Bu arama için yayınlanmış bir sayfa yok.',
  },
}

/** Guided project brief (lead) form. */
const lead: Localized<{
  metaTitle: string
  metaDescription: string
  eyebrow: string
  title: string
  lead: string
  stepLabel: string
  step1Title: string
  step2Title: string
  step3Title: string
  step4Title: string
  projectTypes: { id: string; label: string }[]
  customerTypes: { id: string; label: string }[]
  descriptionPlaceholder: string
  companyPlaceholder: string
  namePlaceholder: string
  emailPlaceholder: string
  phonePlaceholder: string
  whatsappPlaceholder: string
  back: string
  next: string
  submit: string
  submitting: string
  successTitle: string
  successRef: string
  successBody: string
  home: string
  whatsapp: string
  errProjectType: string
  errCustomerType: string
  errDescription: string
  errContact: string
  errSend: string
}> = {
  en: {
    metaTitle: 'Tell us about your project | LitxTech',
    metaDescription: 'Turn your idea into a working digital product. Send your project brief in a few steps.',
    eyebrow: 'Project brief',
    title: 'Let us turn your idea into a working digital product.',
    lead: 'Describe your project in a few short steps. Our team will review your needs and get back to you.',
    stepLabel: 'Step',
    step1Title: 'What do you want to build?',
    step2Title: 'Who is this project for?',
    step3Title: 'Describe your project briefly',
    step4Title: 'How should we reach you?',
    projectTypes: [
      { id: 'mobile', label: 'Mobile application' },
      { id: 'web', label: 'Web application' },
      { id: 'social', label: 'Social platform' },
      { id: 'saas', label: 'SaaS' },
      { id: 'hotel', label: 'Hotel system' },
      { id: 'restaurant', label: 'Restaurant / business' },
      { id: 'custom', label: 'Custom software' },
      { id: 'ai', label: 'Artificial intelligence' },
      { id: 'other', label: 'Other' },
    ],
    customerTypes: [
      { id: 'business', label: 'I own a business' },
      { id: 'entrepreneur', label: 'I have an idea' },
      { id: 'company', label: 'Software for my company' },
      { id: 'startup', label: 'Startup' },
      { id: 'individual', label: 'Individual' },
      { id: 'other', label: 'Other' },
    ],
    descriptionPlaceholder: 'Target users, core features, current status…',
    companyPlaceholder: 'Company / brand (optional)',
    namePlaceholder: 'Full name',
    emailPlaceholder: 'Email',
    phonePlaceholder: 'Phone (optional)',
    whatsappPlaceholder: 'WhatsApp (optional)',
    back: 'Back',
    next: 'Continue',
    submit: 'Send request',
    submitting: 'Sending…',
    successTitle: 'We received your request.',
    successRef: 'Reference number:',
    successBody: 'Our LitxTech team will review your project and get in touch with you.',
    home: 'Home',
    whatsapp: 'Message on WhatsApp',
    errProjectType: 'Please choose a project type.',
    errCustomerType: 'Please choose a customer type.',
    errDescription: 'Please describe your project in at least a few sentences.',
    errContact: 'Name and email are required.',
    errSend: 'Could not send',
  },
  tr: {
    metaTitle: 'Projenizi Anlatın | LitxTech',
    metaDescription: 'Fikrinizi çalışan bir dijital ürüne dönüştürelim. Proje talebinizi birkaç adımda iletin.',
    eyebrow: 'Proje talebi',
    title: 'Fikrinizi çalışan bir dijital ürüne dönüştürelim.',
    lead: 'Birkaç kısa adımda projenizi anlatın. Ekibimiz ihtiyaçlarınızı inceleyerek sizinle iletişime geçer.',
    stepLabel: 'Adım',
    step1Title: 'Ne geliştirmek istiyorsunuz?',
    step2Title: 'Bu proje kimin için?',
    step3Title: 'Projenizi kısaca anlatın',
    step4Title: 'Size nasıl ulaşalım?',
    projectTypes: [
      { id: 'mobile', label: 'Mobil uygulama' },
      { id: 'web', label: 'Web uygulaması' },
      { id: 'social', label: 'Sosyal platform' },
      { id: 'saas', label: 'SaaS' },
      { id: 'hotel', label: 'Otel sistemi' },
      { id: 'restaurant', label: 'Restoran / işletme' },
      { id: 'custom', label: 'Özel yazılım' },
      { id: 'ai', label: 'Yapay zeka' },
      { id: 'other', label: 'Diğer' },
    ],
    customerTypes: [
      { id: 'business', label: 'İşletme sahibiyim' },
      { id: 'entrepreneur', label: 'Bir fikrim var' },
      { id: 'company', label: 'Şirketim için yazılım' },
      { id: 'startup', label: 'Startup' },
      { id: 'individual', label: 'Bireysel' },
      { id: 'other', label: 'Diğer' },
    ],
    descriptionPlaceholder: 'Hedef kullanıcılar, temel özellikler, mevcut durum…',
    companyPlaceholder: 'Şirket / marka (opsiyonel)',
    namePlaceholder: 'Ad Soyad',
    emailPlaceholder: 'E-posta',
    phonePlaceholder: 'Telefon (opsiyonel)',
    whatsappPlaceholder: 'WhatsApp (opsiyonel)',
    back: 'Geri',
    next: 'Devam',
    submit: 'Talebi gönder',
    submitting: 'Gönderiliyor…',
    successTitle: 'Talebinizi aldık.',
    successRef: 'Referans numarası:',
    successBody: 'LITXTECH ekibimiz projenizi inceleyerek sizinle iletişime geçecek.',
    home: 'Ana sayfa',
    whatsapp: 'WhatsApp’tan yaz',
    errProjectType: 'Lütfen bir proje tipi seçin.',
    errCustomerType: 'Lütfen müşteri tipini seçin.',
    errDescription: 'Lütfen projenizi en az birkaç cümle ile anlatın.',
    errContact: 'Ad ve e-posta zorunludur.',
    errSend: 'Gönderilemedi',
  },
}

/** Packages page. */
const packages: Localized<{
  metaTitle: string
  metaDescription: string
  eyebrow: string
  title: string
  lead: string
  popularNote: string
  popularBadge: string
  choose: string
  request: string
  includedTitle: string
  included: { title: string; body: string }[]
  customTitle: string
  customLead: string
  customCta: string
  tiers: { name: string; price: string; period: string; description: string; features: string[] }[]
}> = {
  en: {
    metaTitle: 'Packages | LitxTech',
    metaDescription: 'Fixed-scope software packages for startups and businesses: LITE, PRO and ULTRA.',
    eyebrow: 'Packages',
    title: 'Software packages',
    lead: 'Choose the right starting point for your business. Every package uses a modern stack and professional design.',
    popularNote: 'Most popular: PRO package',
    popularBadge: 'Most popular',
    choose: 'Choose this package',
    request: 'Send request',
    includedTitle: 'What is included in every package?',
    included: [
      { title: 'Modern stack', body: 'React, TypeScript, Supabase and Tailwind CSS.' },
      { title: 'Fast delivery', body: 'Quick turnaround times with quality assurance.' },
      { title: 'Professional support', body: 'Dedicated support and maintenance included.' },
    ],
    customTitle: 'Need something custom?',
    customLead: 'We also build custom software tailored to your specific business needs.',
    customCta: 'Request a custom quote',
    tiers: [
      {
        name: 'LITE',
        price: '$1,199',
        period: '/project',
        description: 'Perfect for startups and small businesses',
        features: [
          '1-page responsive website',
          'Mobile-optimized design',
          'Basic SEO setup',
          '3-day delivery',
          '1 revision included',
          'Hosting setup',
        ],
      },
      {
        name: 'PRO',
        price: '$2,359',
        period: '/project',
        description: 'Ideal for growing businesses with automation needs',
        features: [
          '3-page responsive website',
          'Custom dashboard',
          'API integrations',
          'User authentication',
          'Database setup',
          '5-day delivery',
          '3 revisions included',
          'Priority support',
        ],
      },
      {
        name: 'ULTRA',
        price: '$4,980',
        period: '/project',
        description: 'Complete system with advanced features',
        features: [
          'Unlimited pages',
          'Admin panel',
          'Payment integration (Stripe)',
          'Email automation',
          'User management',
          'Advanced analytics',
          '7-day delivery',
          'Unlimited revisions',
          'Dedicated support',
          'Source code included',
        ],
      },
    ],
  },
  tr: {
    metaTitle: 'Paketler | LitxTech',
    metaDescription: 'Girişimler ve işletmeler için sabit kapsamlı yazılım paketleri: LITE, PRO ve ULTRA.',
    eyebrow: 'Paketler',
    title: 'Yazılım paketleri',
    lead: 'İşletmeniz için doğru başlangıç noktasını seçin. Her paket modern teknoloji ve profesyonel tasarım içerir.',
    popularNote: 'En popüler: PRO paketi',
    popularBadge: 'En popüler',
    choose: 'Bu paketi seç',
    request: 'Talep gönder',
    includedTitle: 'Her pakete neler dahil?',
    included: [
      { title: 'Modern teknoloji', body: 'React, TypeScript, Supabase ve Tailwind CSS.' },
      { title: 'Hızlı teslimat', body: 'Kalite güvencesiyle hızlı teslim süreleri.' },
      { title: 'Profesyonel destek', body: 'Özel destek ve bakım dahil.' },
    ],
    customTitle: 'Özel bir şey mi gerekiyor?',
    customLead: 'İş ihtiyaçlarınıza özel yazılım da geliştiriyoruz.',
    customCta: 'Özel teklif iste',
    tiers: [
      {
        name: 'LITE',
        price: '$1.199',
        period: '/proje',
        description: 'Girişimler ve küçük işletmeler için ideal',
        features: [
          '1 sayfalık mobil uyumlu site',
          'Mobil için optimize tasarım',
          'Temel SEO kurulumu',
          '3 gün teslim',
          '1 revizyon dahil',
          'Barındırma kurulumu',
        ],
      },
      {
        name: 'PRO',
        price: '$2.359',
        period: '/proje',
        description: 'Otomasyon ihtiyacı olan büyüyen işletmeler için',
        features: [
          '3 sayfalık mobil uyumlu site',
          'Özel yönetim paneli',
          'API entegrasyonları',
          'Kullanıcı kimlik doğrulama',
          'Veritabanı kurulumu',
          '5 gün teslim',
          '3 revizyon dahil',
          'Öncelikli destek',
        ],
      },
      {
        name: 'ULTRA',
        price: '$4.980',
        period: '/proje',
        description: 'Gelişmiş özellikli eksiksiz sistem',
        features: [
          'Sınırsız sayfa',
          'Yönetim paneli',
          'Ödeme entegrasyonu (Stripe)',
          'E-posta otomasyonu',
          'Kullanıcı yönetimi',
          'Gelişmiş analitik',
          '7 gün teslim',
          'Sınırsız revizyon',
          'Özel destek',
          'Kaynak kodu dahil',
        ],
      },
    ],
  },
}

const common: Localized<{
  loading: string
  error: string
  success: string
  cancel: string
  confirm: string
  send: string
  close: string
  cookieText: string
  cookieDecline: string
  cookieAccept: string
  whatsappAria: string
  searchPlaceholder: string
  noResults: string
  packages: string
  pricing: string
  contactUs: string
}> = {
  en: {
    loading: 'Loading…',
    error: 'Error',
    success: 'Success',
    cancel: 'Cancel',
    confirm: 'Confirm',
    send: 'Send',
    close: 'Close',
    cookieText: 'Analytics on this site runs only if you accept. Sign-in cookies stay on either way.',
    cookieDecline: 'Decline',
    cookieAccept: 'Accept',
    whatsappAria: 'Contact us on WhatsApp',
    searchPlaceholder: 'Search pages, solutions and articles…',
    noResults: 'No results found.',
    packages: 'Packages',
    pricing: 'Pricing',
    contactUs: 'Contact us',
  },
  tr: {
    loading: 'Yükleniyor…',
    error: 'Hata',
    success: 'Başarılı',
    cancel: 'İptal',
    confirm: 'Onayla',
    send: 'Gönder',
    close: 'Kapat',
    cookieText: 'Bu sitedeki analitik yalnızca kabul ederseniz çalışır. Oturum çerezleri her durumda korunur.',
    cookieDecline: 'Reddet',
    cookieAccept: 'Kabul et',
    whatsappAria: 'WhatsApp ile iletişime geç',
    searchPlaceholder: 'Sayfa, çözüm ve yazı ara…',
    noResults: 'Sonuç bulunamadı.',
    packages: 'Paketler',
    pricing: 'Fiyatlar',
    contactUs: 'Bize ulaşın',
  },
}

function build(lang: Lang) {
  return {
    nav: nav[lang],
    home: home[lang],
    homeLists: homeLists[lang],
    solutions: solutions[lang],
    projects: projects[lang],
    about: about[lang],
    contact: contact[lang],
    support: support[lang],
    faq: faq[lang],
    catalog: catalog[lang],
    footer: footer[lang],
    common: common[lang],
    stats: stats[lang],
    editorial: editorial[lang],
    lead: lead[lang],
    packages: packages[lang],
  }
}

export type Copy = ReturnType<typeof build>

/** Full dictionary per language — the single source of UI copy. */
export const dictionaries: Record<Lang, Copy> = {
  en: build('en'),
  tr: build('tr'),
}
