import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Shield,
  FileCheck,
  BookOpen,
  Smartphone,
  Lock,
  Compass,
  MessageCircle,
  ClipboardList,
  ChevronDown,
  Sparkles,
  ShieldAlert,
  Radio,
  Bell,
  CreditCard,
  MoonStar
} from 'lucide-react'
import { SeoHead } from '../components/marketing/SeoHead'

const accent = '#34d399'

const features = [
  {
    icon: MoonStar,
    title: 'Namaz vakitleri',
    description: 'Seçtiğiniz ülke, şehir veya konuma göre namaz vakitleri ve hatırlatıcılar.'
  },
  {
    icon: Compass,
    title: 'Kıble pusulası',
    description: 'Cihaz konum ve yön sensörleriyle kıble yönünü gösteren yardımcı pusula.'
  },
  {
    icon: BookOpen,
    title: 'Kur’an, dua ve zikir',
    description: 'Kur’an-ı Kerim, meal, sesli tilavet, dualar, zikir sayacı ve ibadet takibi.'
  },
  {
    icon: MessageCircle,
    title: 'SAF Halkaları',
    description: 'Ortak konular etrafında saygılı topluluklar, gönderiler, yorumlar ve takip.'
  },
  {
    icon: Radio,
    title: 'Canlı sesli odalar',
    description: 'Topluluk sohbetleri için canlı sesli odalar. Mikrofon izni yalnızca bu özellik için istenir.'
  },
  {
    icon: Bell,
    title: 'Hatırlatıcılar',
    description: 'Namaz vakti, ibadet ve topluluk bildirimleri cihaz izinlerinize göre yönetilir.'
  },
  {
    icon: Shield,
    title: 'Güvenlik ve moderasyon',
    description: 'Bildirme, engelleme ve moderasyon araçlarıyla güvenli bir topluluk ortamı.'
  },
  {
    icon: Lock,
    title: 'Gizlilik ve KVKK',
    description: 'İbadet kayıtları hassas veri olarak ele alınır; sosyal paylaşım sizin tercihinize bağlıdır.'
  }
]

const faqs = [
  {
    question: 'SAFDAŞ nedir?',
    answer:
      'SAFDAŞ, LITXTECH LLC tarafından geliştirilen İslami yaşam uygulamasıdır. Namaz vakitleri, Kur’an-ı Kerim, kıble, dua, zikir ve ibadet takibini SAF Halkaları, sosyal gönderiler, özel mesajlaşma ve canlı sesli odalarla bir araya getirir. Slogan: Aynı safta, aynı gönülde.'
  },
  {
    question: 'Resmî bir dinî kurum mudur?',
    answer:
      'Hayır. SAFDAŞ bilgilendirme ve yardımcı kullanım amacıyla sunulan bir teknoloji platformudur. Fetva kurumu, ibadethane veya devlet kurumu değildir. Namaz vakitlerinde yerel kurumların açıkladığı saatleri de kontrol etmeniz önerilir.'
  },
  {
    question: 'Kimler kullanabilir?',
    answer:
      'Asgari yaş, hedef ülke mevzuatı ve mağaza yaş derecelendirmesine göre belirlenir ve kayıtta gösterilir. Bu sınırın altındaki kişilerin hesap oluşturmasına izin verilmez. Çocuk güvenliği için sıfır tolerans politikası uygulanır.'
  },
  {
    question: 'Hesabımı nasıl silerim?',
    answer:
      'Uygulama içinde Ayarlar → Hesap → Hesabımı sil yolunu kullanın. Uygulamaya giremiyorsanız support@litxtech.com adresine “SAFDAŞ Hesap Silme Talebi” konulu e-posta gönderin. Uygulamayı silmek sunucudaki hesabı silmez.'
  },
  {
    question: 'Ücretli abonelik var mı?',
    answer:
      'Bazı özellikler ücretsiz sunulabilir. Bu tarihte yayımlanmış sabit fiyatlı bir plan yoktur. İleride ücretli özellik açılırsa fiyat, süre ve iptal koşulları satın almadan önce gösterilir. Ayrıntı: litxtech.com/safdas/abonelik.'
  },
  {
    question: 'Gizlilik, şartlar ve desteğe nereden ulaşırım?',
    answer:
      'litxtech.com/safdas/gizlilik, litxtech.com/safdas/kullanim-sartlari, litxtech.com/safdas/child-safety, litxtech.com/safdas/destek, litxtech.com/safdas/hesap-silme ve litxtech.com/safdas/abonelik adreslerine gidin.'
  }
]

const legalLinks = [
  { href: 'https://www.litxtech.com/safdas/gizlilik', to: '/safdas/gizlilik', label: 'Gizlilik Politikası', short: 'Gizlilik', icon: FileCheck },
  { href: 'https://www.litxtech.com/safdas/kullanim-sartlari', to: '/safdas/kullanim-sartlari', label: 'Kullanım Şartları', short: 'Kullanım Şartları', icon: ClipboardList },
  { href: 'https://www.litxtech.com/safdas/child-safety', to: '/safdas/child-safety', label: 'Çocuk Koruma Politikası', short: 'Çocuk koruma', icon: ShieldAlert },
  { href: 'https://www.litxtech.com/safdas/destek', to: '/safdas/destek', label: 'Destek', short: 'Destek', icon: MessageCircle },
  { href: 'https://www.litxtech.com/safdas/hesap-silme', to: '/safdas/hesap-silme', label: 'Hesap silme bilgisi', short: 'Hesap silme', icon: Smartphone },
  { href: 'https://www.litxtech.com/safdas/abonelik', to: '/safdas/abonelik', label: 'Abonelik ve fiyatlandırma', short: 'Abonelik', icon: CreditCard }
]

export function SafdasAppLanding() {
  const [openFaq, setOpenFaq] = useState<string | null>(null)

  return (
    <div className="bg-[#071510] text-white">
      <SeoHead
        title="SAFDAŞ | Namaz Vakitleri ve Topluluk | LitxTech"
        description="SAFDAŞ — namaz vakitleri, Kur’an, kıble ve SAF Halkaları ile İslami yaşam ve sosyal topluluk uygulaması. Gizlilik, kullanım şartları, çocuk güvenliği ve destek."
        path="/safdas"
      />
      <section className="relative isolate overflow-hidden px-6 pt-16 pb-24 lg:px-12 lg:pt-24">
        <div className="absolute inset-0 bg-gradient-to-b from-[#064e3b]/80 via-[#071510] to-[#071510]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(52,211,153,0.22),transparent)]" />
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-14 lg:flex-row lg:gap-16">
          <div className="max-w-xl space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-emerald-100">
              <Sparkles className="h-4 w-4" style={{ color: accent }} />
              <span>SAFDAŞ · Aynı safta, aynı gönülde</span>
            </div>
            <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Namaz vakitleri ve İslami topluluk
            </h1>
            <p className="text-lg text-emerald-100/90">
              SAFDAŞ; namaz vakitleri, Kur’an-ı Kerim, kıble pusulası, dua, zikir ve ibadet takibini SAF Halkaları, sosyal gönderiler ve canlı
              sesli odalarla birleştirir. Gizlilik ve kullanım şartları Türkçedir. Destek için{' '}
              <Link to="/safdas/destek" className="font-semibold underline decoration-emerald-300/60 underline-offset-2 hover:text-white">
                Destek
              </Link>{' '}
              sayfasını kullanın.
            </p>
            <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
              <a
                href="https://apps.apple.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-14 items-center rounded-2xl bg-black px-6 py-3 font-semibold text-white shadow-xl transition hover:scale-[1.02]"
              >
                <svg className="mr-2 h-8 w-8" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                App Store
              </a>
              <a
                href="https://play.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-14 items-center rounded-2xl border border-white/25 bg-white/5 px-6 py-3 font-semibold text-white backdrop-blur transition hover:border-white/45 hover:bg-white/10"
              >
                <svg className="mr-2 h-8 w-8" viewBox="0 0 24 24" aria-hidden>
                  <path
                    fill="currentColor"
                    d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"
                  />
                </svg>
                Google Play
              </a>
            </div>
            <p className="text-xs text-emerald-200/70">
              Mağaza bağlantıları yayımlandığında güncellenecektir. Uygulama kimliği: com.litxtech.namazim. Yasal metinler aşağıdaki sabit
              URL&apos;lerdedir.
            </p>
          </div>
          <motion.div
            className="relative mx-auto w-full max-w-sm overflow-hidden rounded-[36px] border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur-xl"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.75 }}
            whileHover={{ y: -6 }}
          >
            <div className="flex min-h-[300px] flex-col items-center justify-center rounded-[28px] border border-white/15 bg-[#0a1f18] p-8">
              <div className="rounded-2xl bg-emerald-500/15 p-10">
                <MoonStar className="h-20 w-20 text-emerald-200" />
              </div>
              <p className="mt-5 text-sm font-medium text-white">SAFDAŞ</p>
              <p className="text-center text-xs text-emerald-200/80">Aynı safta, aynı gönülde</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-slate-50 px-6 py-20 text-slate-900 lg:px-12">
        <div className="mx-auto max-w-5xl space-y-10">
          <div className="space-y-4 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-700">İslami yaşam ve topluluk</p>
            <h2 className="text-3xl font-bold">İbadet araçları ve sosyal platform</h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-600">
              SAFDAŞ, kişisel ibadet takibini herkese açık sosyal içerik hâline getirmez. Paylaştığınız gönderiler, seçtiğiniz görünürlük
              ayarına göre diğer kullanıcılar tarafından görülebilir.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: 'Vakit ve kıble',
                desc: 'Konum izni isteğe bağlıdır. İzni kapatırsanız ülke ve şehri elle seçebilirsiniz.'
              },
              {
                title: 'Topluluk kuralları',
                desc: 'Taciz, nefret söylemi, spam ve çocuk güvenliğini tehdit eden içerikler yasaktır.'
              },
              {
                title: 'Şeffaf yasal metinler',
                desc: 'Gizlilik ve kullanım şartları Türkçedir. Çocuk güvenliği mağaza gereksinimleriyle uyumludur.'
              }
            ].map((card) => (
              <div key={card.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-slate-900">{card.title}</h3>
                <p className="mt-3 text-slate-600">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0a1f18] px-6 py-20 text-white lg:px-12">
        <div className="mx-auto max-w-6xl space-y-12">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest" style={{ color: accent }}>
              Özellikler
            </p>
            <h2 className="mt-2 text-3xl font-bold">SAFDAŞ ile neler yapabilirsiniz?</h2>
            <p className="mt-2 text-emerald-200/80">Namaz, Kur’an, kıble ve saygılı bir sosyal topluluk — tek uygulamada.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <motion.div
                key={f.title}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur"
                whileHover={{ scale: 1.02 }}
              >
                <div className="w-fit rounded-xl bg-white/10 p-3" style={{ color: accent }}>
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">{f.title}</h3>
                <p className="mt-2 text-sm text-emerald-100/85">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-100 px-6 py-20 text-slate-900 lg:px-12">
        <div className="mx-auto max-w-3xl space-y-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-700">Abonelik</p>
          <h2 className="text-3xl font-bold">Ücretli plan yayımlanmadı</h2>
          <p className="text-slate-600">
            Temel özellikler ücretsiz sunulabilir. Sabit fiyatlı bir abonelik bu sayfada duyurulmadan satışa çıkmaz. Ücretli özellik
            açılırsa fiyat, süre, yenileme ve iptal satın alma öncesinde gösterilir.
          </p>
          <Link
            to="/safdas/abonelik"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800"
          >
            <CreditCard className="h-4 w-4" />
            Abonelik ve fiyatlandırma
          </Link>
        </div>
      </section>

      <section className="bg-[#071510] px-6 py-20 text-white lg:px-12">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-8 shadow-xl backdrop-blur lg:p-10">
            <div className="flex flex-col gap-10 lg:flex-row">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-3">
                  <Shield className="h-10 w-10 shrink-0" style={{ color: accent }} />
                  <h2 className="text-2xl font-bold">Yasal metinler ve destek</h2>
                </div>
                <p className="text-emerald-100/85">
                  App Store ve Google Play listeleri için aşağıdaki kalıcı URL&apos;leri kullanabilirsiniz. Gizlilik ve kullanım şartları
                  Türkçedir; çocuk güvenliği standartları mağaza gereksinimleriyle uyumludur.
                </p>
                <ul className="space-y-2 text-sm text-emerald-100/90">
                  {legalLinks.map((item) => (
                    <li key={item.href}>
                      <span className="font-mono text-emerald-200">{item.href}</span> — {item.label}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-3">
                  {legalLinks.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
                    >
                      <item.icon className="h-4 w-4" /> {item.short}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="flex-1 rounded-2xl bg-white/5 p-6">
                <h3 className="flex items-center gap-2 text-lg font-semibold text-white">
                  <Lock className="h-5 w-5" style={{ color: accent }} />
                  Mağaza incelemeleri için not
                </h3>
                <ul className="mt-4 space-y-2 text-sm text-emerald-100/85">
                  <li>• Geliştirici: LITXTECH LLC · support@litxtech.com</li>
                  <li>• Uygulama kimliği: com.litxtech.namazim</li>
                  <li>• Kullanıcı üretimi içerik, mesajlaşma ve canlı odalar Kullanım Koşulları’na tabidir.</li>
                  <li>• Bildirme ve engelleme uygulama içinde sunulur.</li>
                  <li>• Hesap silme uygulama içinden veya destek e-postası ile mümkündür.</li>
                  <li>• Çocuk güvenliği için /safdas/child-safety sayfasına bakın.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#04110d] px-6 py-20 text-white lg:px-12">
        <div className="mx-auto max-w-4xl space-y-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest" style={{ color: accent }}>
              SSS
            </p>
            <h2 className="mt-2 text-3xl font-bold">Sıkça sorulan sorular</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                <button
                  type="button"
                  className="flex w-full items-center justify-between px-6 py-4 text-left"
                  onClick={() => setOpenFaq((prev) => (prev === faq.question ? null : faq.question))}
                >
                  <span className="pr-4 text-lg font-semibold text-white">{faq.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-emerald-300 transition-transform ${openFaq === faq.question ? 'rotate-180' : ''}`}
                  />
                </button>
                <motion.div
                  className="overflow-hidden"
                  initial={false}
                  animate={{ height: openFaq === faq.question ? 'auto' : 0 }}
                  transition={{ duration: 0.28 }}
                >
                  <p className="px-6 pb-4 text-sm text-emerald-100/88">{faq.answer}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-white/5 bg-[#030a08] px-6 py-10 text-sm text-emerald-200/70 lg:px-12">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 pt-6 md:flex-row md:items-center md:justify-between">
          <p>
            SAFDAŞ, <strong className="text-white">LITXTECH LLC</strong> tarafından sunulmaktadır. Namaz vakitleri ve İslami sosyal topluluk
            uygulaması.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/safdas" className="font-medium hover:underline" style={{ color: accent }}>
              Tanıtım
            </Link>
            {legalLinks.map((item) => (
              <Link key={item.to} to={item.to} className="font-medium hover:underline" style={{ color: accent }}>
                {item.short}
              </Link>
            ))}
            <Link to="/" className="font-medium hover:underline" style={{ color: accent }}>
              LitxTech ana sayfa
            </Link>
          </div>
        </div>
        <p className="mt-6 text-center text-xs text-emerald-300/40">© {new Date().getFullYear()} LITXTECH LLC. Tüm hakları saklıdır.</p>
      </footer>
    </div>
  )
}
