import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Shield,
  FileCheck,
  Users,
  Smartphone,
  Lock,
  HeartHandshake,
  MessageCircle,
  ClipboardList,
  ChevronDown,
  Sparkles
} from 'lucide-react'
import { SeoHead } from '../components/marketing/SeoHead'

const accent = '#818cf8'

const features = [
  {
    icon: Users,
    title: 'Profil ve keşfet',
    description: 'Profilinizi oluşturun, ilgi alanlarınızı paylaşın ve topluluk içinde güvenli şekilde yeni insanlarla tanışın.'
  },
  {
    icon: HeartHandshake,
    title: 'Eşleşme ve iletişim',
    description: 'Karşılıklı ilgi doğrultusunda eşleşin; mesajlaşma ve tanımlı kapsamda sesli veya görüntülü görüşme seçenekleri.'
  },
  {
    icon: Lock,
    title: 'Güven ve kurallar',
    description: 'Taciz, dolandırıcılık ve kötüye kullanıma karşı kurallar; bildirim ve moderasyon süreçleriyle desteklenen bir ortam.'
  },
  {
    icon: Shield,
    title: 'Gizlilik ve KVKK',
    description: 'Kişisel verileriniz şeffaf bir gizlilik politikası çerçevesinde işlenir; haklarınız ve saklama süreleri açıklanır.'
  },
  {
    icon: ClipboardList,
    title: 'Şartlar ve onay',
    description: 'Kullanım şartları ve gizlilik politikası uygulama içinde sunulur; mağaza listeleri için web üzerinden de erişilebilir.'
  },
  {
    icon: MessageCircle,
    title: 'Destek',
    description: 'Sorularınız ve teknik talepleriniz için uygulama içi Destek ile birlikte bu sitedeki destek sayfasını kullanabilirsiniz.'
  }
]

const faqs = [
  {
    question: 'Nocta nedir?',
    answer:
      'Nocta, reşit kullanıcıların profil oluşturup güvenli bir ortamda tanışabileceği, eşleşebileceği ve mesajlaşabileceği bir mobil arkadaş bulma ve sosyal keşif uygulamasıdır. Özellikler zaman içinde güncellenebilir.'
  },
  {
    question: 'Kimler kullanabilir?',
    answer:
      'Uygulama yalnızca yürürlükteki yerel yasalara göre reşit olan kullanıcılar içindir. Hesap bilgilerinizin doğru olması ve topluluk kurallarına uymanız beklenir.'
  },
  {
    question: 'Verilerim nasıl korunur?',
    answer:
      'Gizlilik Politikamızda toplanan veri kategorileri, işleme amaçları, saklama ve haklarınız ayrıntılı şekilde açıklanmıştır. Sorularınız için uygulama içi Destek veya destek sayfamızdaki kanalları kullanabilirsiniz.'
  },
  {
    question: 'Gizlilik, şartlar ve desteğe nereden ulaşırım?',
    answer:
      'Bu sayfadaki bağlantılar litxtech.com/nocta/gizlilik (Gizlilik Politikası), litxtech.com/nocta/kullanim-sartlari (Kullanım Şartları) ve litxtech.com/nocta/destek (Destek) adreslerine gider.'
  }
]

export function NoctaAppLanding() {
  const [openFaq, setOpenFaq] = useState<string | null>(null)

  return (
    <div className="bg-[#0b1020] text-white">
      <SeoHead
        title="Nocta | LitxTech"
        description="Nocta — güvenli arkadaş bulma ve sosyal keşif uygulaması. Gizlilik politikası, kullanım şartları ve destek."
        path="/nocta"
      />
      <section className="relative isolate overflow-hidden px-6 pt-16 pb-24 lg:px-12 lg:pt-24">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1e1b4b]/90 via-[#0b1020] to-[#0b1020]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(129,140,248,0.22),transparent)]" />
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-14 lg:flex-row lg:gap-16">
          <div className="max-w-xl space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-indigo-100">
              <Sparkles className="h-4 w-4" style={{ color: accent }} />
              <span>Nocta · LitxTech</span>
            </div>
            <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Nocta ile güvenli sosyal keşif
            </h1>
            <p className="text-lg text-indigo-100/90">
              Yeni insanlarla tanışın, eşleşin ve saygılı iletişim kurallarıyla mesajlaşın. Gizlilik politikası ve kullanım şartlarına aşağıdaki
              resmi bağlantılardan ulaşabilirsiniz; destek için{' '}
              <Link to="/nocta/destek" className="font-semibold underline decoration-indigo-300/60 underline-offset-2 hover:text-white">
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
            <p className="text-xs text-indigo-200/70">
              Mağaza bağlantıları yayımlandığında güncellenecektir. Şimdilik resmi yasal metinler aşağıdaki sabit URL’lerdedir.
            </p>
          </div>
          <motion.div
            className="relative mx-auto w-full max-w-sm overflow-hidden rounded-[36px] border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur-xl"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.75 }}
            whileHover={{ y: -6 }}
          >
            <div className="flex min-h-[300px] flex-col items-center justify-center rounded-[28px] border border-white/15 bg-[#12182e] p-8">
              <div className="rounded-2xl bg-indigo-500/15 p-10">
                <Users className="h-20 w-20 text-indigo-200" />
              </div>
              <p className="mt-5 text-sm font-medium text-white">Nocta</p>
              <p className="text-center text-xs text-indigo-200/80">Keşfet · Eşleş · Güvenli iletişim</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-slate-50 px-6 py-20 text-slate-900 lg:px-12">
        <div className="mx-auto max-w-5xl space-y-10">
          <div className="space-y-4 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">Hizmet özeti</p>
            <h2 className="text-3xl font-bold">Nocta ile neler yapabilirsiniz?</h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-600">
              Uygulama; profil, keşfet, eşleşme, mesajlaşma ve hizmet kapsamında sunulan sesli veya görüntülü iletişim özelliklerini bir arada
              sunar. Tüm kullanıcıların saygılı ve yasalara uygun davranması esastır.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: 'Reşit kullanıcılar',
                desc: 'Hizmet, reşit olmayanlar için tasarlanmamıştır. Yaş ve kimlik doğrulama süreçleri politikalarımıza göre uygulanabilir.'
              },
              {
                title: 'Topluluk kuralları',
                desc: 'Taciz, nefret söylemi, dolandırıcılık ve spam yasaktır. İhlallerde hesap kısıtlaması veya sonlandırma uygulanabilir.'
              },
              {
                title: 'Şeffaf yasal metinler',
                desc: 'Gizlilik Politikası ve Kullanım Şartları Türkçe olarak web’de ve uygulama içinde yayımlanır.'
              }
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <h3 className="text-xl font-semibold text-slate-900">{card.title}</h3>
                <p className="mt-3 text-slate-600">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0f1428] px-6 py-20 text-white lg:px-12">
        <div className="mx-auto max-w-6xl space-y-12">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest" style={{ color: accent }}>
              Özellikler
            </p>
            <h2 className="mt-2 text-3xl font-bold">Uygulama deneyimi</h2>
            <p className="mt-2 text-indigo-200/80">Sade arayüz; odak: güvenli tanışma ve iletişim.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                <p className="mt-2 text-sm text-indigo-100/85">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0b1020] px-6 py-20 text-white lg:px-12">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-8 shadow-xl backdrop-blur lg:p-10">
            <div className="flex flex-col gap-10 lg:flex-row">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-3">
                  <Shield className="h-10 w-10 shrink-0" style={{ color: accent }} />
                  <h2 className="text-2xl font-bold">Yasal metinler ve destek</h2>
                </div>
                <p className="text-indigo-100/85">
                  App Store ve Google Play listeleri için aşağıdaki kalıcı URL’leri kullanabilirsiniz. Metinler Türkçedir ve uygulama içindeki
                  sürümlerle uyumludur.
                </p>
                <ul className="space-y-2 text-sm text-indigo-100/90">
                  <li>
                    <span className="font-mono text-indigo-200">https://www.litxtech.com/nocta/gizlilik</span> — Gizlilik Politikası
                  </li>
                  <li>
                    <span className="font-mono text-indigo-200">https://www.litxtech.com/nocta/kullanim-sartlari</span> — Kullanım Şartları
                  </li>
                  <li>
                    <span className="font-mono text-indigo-200">https://www.litxtech.com/nocta/destek</span> — Destek
                  </li>
                  <li>
                    <span className="font-mono text-indigo-200">https://www.litxtech.com/nocta/hesap-silme</span> — Hesap silme bilgisi
                  </li>
                </ul>
                <div className="flex flex-wrap gap-3">
                  <Link
                    to="/nocta/gizlilik"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    <FileCheck className="h-4 w-4" /> Gizlilik Politikası
                  </Link>
                  <Link
                    to="/nocta/kullanim-sartlari"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    <ClipboardList className="h-4 w-4" /> Kullanım Şartları
                  </Link>
                  <Link
                    to="/nocta/destek"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    <MessageCircle className="h-4 w-4" /> Destek
                  </Link>
                  <Link
                    to="/nocta/hesap-silme"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    <Smartphone className="h-4 w-4" /> Hesap silme
                  </Link>
                </div>
              </div>
              <div className="flex-1 rounded-2xl bg-white/5 p-6">
                <h3 className="flex items-center gap-2 text-lg font-semibold text-white">
                  <Lock className="h-5 w-5" style={{ color: accent }} />
                  Mağaza incelemeleri için not
                </h3>
                <ul className="mt-4 space-y-2 text-sm text-indigo-100/85">
                  <li>• Uygulama reşit kullanıcılar içindir; çocuklara yönelik değildir.</li>
                  <li>• Kullanıcı üretimi içerik ve iletişim kuralları Kullanım Şartları’nda özetlenir.</li>
                  <li>• Ödeme ve cüzdan özellikleri varsa ilgili ekranlarda ayrıca bilgilendirme yapılır.</li>
                  <li>• Hesap silme yolu uygulama içinden veya destek e-postası ile mümkündür.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#080c18] px-6 py-20 text-white lg:px-12">
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
                    className={`h-5 w-5 shrink-0 text-indigo-300 transition-transform ${openFaq === faq.question ? 'rotate-180' : ''}`}
                  />
                </button>
                <motion.div
                  className="overflow-hidden"
                  initial={false}
                  animate={{ height: openFaq === faq.question ? 'auto' : 0 }}
                  transition={{ duration: 0.28 }}
                >
                  <p className="px-6 pb-4 text-sm text-indigo-100/88">{faq.answer}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-white/5 bg-[#060914] px-6 py-10 text-sm text-indigo-200/70 lg:px-12">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 pt-6 md:flex-row md:items-center md:justify-between">
          <p>
            Nocta, <strong className="text-white">LitxTech</strong> tarafından sunulmaktadır. Kişisel veriler Gizlilik Politikası kapsamında
            işlenir.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/nocta" className="font-medium hover:underline" style={{ color: accent }}>
              Tanıtım
            </Link>
            <Link to="/nocta/gizlilik" className="font-medium hover:underline" style={{ color: accent }}>
              Gizlilik
            </Link>
            <Link to="/nocta/kullanim-sartlari" className="font-medium hover:underline" style={{ color: accent }}>
              Kullanım Şartları
            </Link>
            <Link to="/nocta/destek" className="font-medium hover:underline" style={{ color: accent }}>
              Destek
            </Link>
            <Link to="/nocta/hesap-silme" className="font-medium hover:underline" style={{ color: accent }}>
              Hesap silme
            </Link>
            <Link to="/" className="font-medium hover:underline" style={{ color: accent }}>
              LitxTech ana sayfa
            </Link>
          </div>
        </div>
        <p className="mt-6 text-center text-xs text-indigo-300/40">© {new Date().getFullYear()} LitxTech. Tüm hakları saklıdır.</p>
      </footer>
    </div>
  )
}
