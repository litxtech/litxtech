import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Shield,
  FileCheck,
  Smartphone,
  Lock,
  MessageCircle,
  ClipboardList,
  ChevronDown,
  Mic,
  Radio,
  Headphones,
  Users,
  Volume2,
  ShieldAlert,
  Sparkles
} from 'lucide-react'
import { SeoHead } from '../components/marketing/SeoHead'

const accent = '#f59e0b'

const features = [
  {
    icon: Mic,
    title: 'Canlı sesli odalar',
    description: 'Konu bazlı odalar açın; konuşmacı olun veya dinleyici olarak katılın. Gerçek zamanlı ses deneyimi.'
  },
  {
    icon: Radio,
    title: 'Sahne ve dinleyici',
    description: 'Oda sahipleri konuşmacı davet eder; dinleyiciler sıraya girer. Kontrollü ve akıcı bir yayın düzeni.'
  },
  {
    icon: Users,
    title: 'Topluluk ve takip',
    description: 'İlgi alanlarınıza göre odaları keşfedin, profil oluşturun ve güvenli sosyal etkileşim kurun.'
  },
  {
    icon: Headphones,
    title: 'Düşük gecikmeli ses',
    description: 'Modern ses altyapısıyla net konuşma; mikrofon ve kulaklık izinleriyle optimize edilmiş deneyim.'
  },
  {
    icon: Shield,
    title: 'Moderasyon ve güvenlik',
    description: 'Bildir, engelle ve oda yönetimi araçlarıyla taciz, spam ve kötüye kullanıma karşı koruma.'
  },
  {
    icon: Lock,
    title: 'Gizlilik ve KVKK',
    description: 'Kişisel verileriniz şeffaf gizlilik politikası çerçevesinde işlenir; haklarınız açıkça belirtilir.'
  }
]

const faqs = [
  {
    question: 'Tamuso nedir?',
    answer:
      'Tamuso, reşit kullanıcıların canlı sesli odalarda buluştuğu modern bir sesli sohbet ve topluluk platformudur. Konuşmacı veya dinleyici olarak odalara katılabilir, konu bazlı odalar açabilirsiniz.'
  },
  {
    question: 'Kimler kullanabilir?',
    answer:
      'Tamuso yalnızca 18 yaş ve üzeri kullanıcılar içindir. Hesap bilgilerinizin doğru olması ve topluluk kurallarına uymanız beklenir.'
  },
  {
    question: 'Sesli odalarda neler yasaktır?',
    answer:
      'Taciz, nefret söylemi, çocuklara yönelik içerik, dolandırıcılık, spam ve yasa dışı faaliyetler yasaktır. İhlallerde hesap kısıtlanır veya kalıcı kapatılır. Detaylar Kullanım Şartları ve Çocuk Koruma Politikası’ndadır.'
  },
  {
    question: 'Verilerim nasıl korunur?',
    answer:
      'Gizlilik Politikamızda toplanan veri kategorileri, işleme amaçları, saklama ve haklarınız açıklanır. Sorularınız için destek sayfamızı veya support@litxtech.com adresini kullanın.'
  },
  {
    question: 'Gizlilik, şartlar ve desteğe nereden ulaşırım?',
    answer:
      'litxtech.com/tamuso/gizlilik, litxtech.com/tamuso/kullanim-sartlari, litxtech.com/tamuso/child-safety, litxtech.com/tamuso/destek ve litxtech.com/tamuso/hesap-silme adreslerine gidin.'
  }
]

export function TamusoAppLanding() {
  const [openFaq, setOpenFaq] = useState<string | null>(null)

  return (
    <div className="bg-[#0a0c10] text-white" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
      <SeoHead
        title="Tamuso | Sesli Oda Platformu | LitxTech"
        description="Tamuso — modern sesli oda ve canlı sohbet platformu. Gizlilik, kullanım şartları, çocuk koruma politikası, hesap silme ve destek."
        path="/tamuso"
      />

      <section className="relative isolate min-h-[100svh] overflow-hidden px-6 pt-16 pb-20 lg:px-12 lg:pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_20%_10%,rgba(245,158,11,0.28),transparent_55%),radial-gradient(ellipse_70%_50%_at_90%_20%,rgba(6,182,212,0.18),transparent_50%),linear-gradient(180deg,#12151c_0%,#0a0c10_55%,#07080c_100%)]" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
          }}
        />

        <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center justify-center gap-12 pt-8 text-center lg:pt-16">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/25 bg-amber-500/10 px-4 py-2 text-sm text-amber-100">
              <Sparkles className="h-4 w-4" style={{ color: accent }} />
              <span>Tamuso · Sesli Oda · LitxTech</span>
            </div>

            <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
              Tamuso
            </h1>
            <p className="mx-auto max-w-xl text-lg text-zinc-300 sm:text-xl">
              Canlı sesli odalarda buluşun. Konuşun, dinleyin, topluluğunuzu büyütün — güvenli ve modern bir ses platformu.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://apps.apple.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-14 items-center rounded-2xl bg-black px-6 py-3 font-semibold text-white shadow-xl ring-1 ring-white/15 transition hover:scale-[1.02]"
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
                className="inline-flex h-14 items-center rounded-2xl border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white backdrop-blur transition hover:border-amber-400/40 hover:bg-white/10"
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
            <p className="text-xs text-zinc-500">
              Mağaza bağlantıları yayımlandığında güncellenir. Resmi yasal metinler aşağıdaki sabit URL’lerdedir.
            </p>
          </motion.div>

          <motion.div
            className="relative w-full max-w-md"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.15 }}
          >
            <div className="rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/10 to-white/[0.03] p-8 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center justify-center gap-1.5">
                {[0.4, 0.7, 1, 0.55, 0.85, 0.45, 0.95, 0.6].map((h, i) => (
                  <motion.span
                    key={i}
                    className="w-2 rounded-full bg-amber-400"
                    style={{ height: `${h * 48}px` }}
                    animate={{ scaleY: [0.5, 1, 0.65, 1.1, 0.5] }}
                    transition={{ duration: 1.4 + i * 0.08, repeat: Infinity, ease: 'easeInOut' }}
                  />
                ))}
              </div>
              <div className="mt-6 flex items-center justify-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-500/20 ring-2 ring-amber-400/40">
                  <Volume2 className="h-7 w-7 text-amber-300" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-white">Canlı oda</p>
                  <p className="text-sm text-zinc-400">Konuş · Dinle · Bağlan</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-[#f7f5f2] px-6 py-20 text-zinc-900 lg:px-12">
        <div className="mx-auto max-w-5xl space-y-10">
          <div className="space-y-4 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-amber-700">Platform</p>
            <h2 className="text-3xl font-bold sm:text-4xl">Sesli odalar, modern topluluk</h2>
            <p className="mx-auto max-w-2xl text-lg text-zinc-600">
              Tamuso; canlı odalar, konuşmacı sahnesi ve dinleyici deneyimini tek uygulamada birleştirir. Saygılı iletişim ve 18+ kullanım
              esastır.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: '18+ kullanıcılar',
                desc: 'Hizmet çocuklara yönelik değildir. Yaş beyanı ve politikalarımız gereği reşit olmayan hesaplar kapatılır.'
              },
              {
                title: 'Oda kuralları',
                desc: 'Taciz, nefret söylemi, spam ve yasa dışı içerik yasaktır. Oda sahipleri ve moderasyon araçları desteklenir.'
              },
              {
                title: 'Şeffaf metinler',
                desc: 'Gizlilik, kullanım şartları ve çocuk koruma politikası web’de ve uygulama içinde erişilebilir.'
              }
            ].map((item, i) => (
              <motion.div
                key={item.title}
                className="space-y-3 border-t-2 border-amber-500/40 pt-6"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-zinc-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0a0c10] px-6 py-20 text-white lg:px-12">
        <div className="mx-auto max-w-6xl space-y-12">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest" style={{ color: accent }}>
              Özellikler
            </p>
            <h2 className="mt-2 text-3xl font-bold">Uygulama deneyimi</h2>
            <p className="mt-2 text-zinc-400">Odak: net ses, kontrollü odalar, güvenli topluluk.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                className="border border-white/10 bg-white/[0.03] p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -4, borderColor: 'rgba(245,158,11,0.35)' }}
              >
                <div className="w-fit rounded-xl bg-amber-500/15 p-3" style={{ color: accent }}>
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">{f.title}</h3>
                <p className="mt-2 text-sm text-zinc-400">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0e1016] px-6 py-20 text-white lg:px-12">
        <div className="mx-auto max-w-5xl">
          <div className="border border-white/10 bg-gradient-to-br from-amber-500/10 via-transparent to-cyan-500/5 p-8 lg:p-10">
            <div className="flex flex-col gap-10 lg:flex-row">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-3">
                  <Shield className="h-10 w-10 shrink-0" style={{ color: accent }} />
                  <h2 className="text-2xl font-bold">Yasal metinler ve destek</h2>
                </div>
                <p className="text-zinc-400">
                  App Store Connect ve Google Play Console’a yapıştırabileceğiniz kalıcı URL’ler. Child Safety sayfası İngilizce standart metin
                  içerir (Apple Child Safety Standards alanı).
                </p>
                <ul className="space-y-2 font-mono text-sm text-amber-100/80">
                  <li>https://www.litxtech.com/tamuso/gizlilik — Privacy Policy</li>
                  <li>https://www.litxtech.com/tamuso/kullanim-sartlari — Terms of Use</li>
                  <li>https://www.litxtech.com/tamuso/child-safety — Child Safety Standards</li>
                  <li>https://www.litxtech.com/tamuso/hesap-silme — Account Deletion</li>
                  <li>https://www.litxtech.com/tamuso/destek — Support</li>
                </ul>
                <div className="flex flex-wrap gap-3">
                  <Link
                    to="/tamuso/gizlilik"
                    className="inline-flex items-center gap-2 border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold transition hover:border-amber-400/40 hover:bg-white/10"
                  >
                    <FileCheck className="h-4 w-4" /> Gizlilik
                  </Link>
                  <Link
                    to="/tamuso/kullanim-sartlari"
                    className="inline-flex items-center gap-2 border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold transition hover:border-amber-400/40 hover:bg-white/10"
                  >
                    <ClipboardList className="h-4 w-4" /> Kullanım Şartları
                  </Link>
                  <Link
                    to="/tamuso/child-safety"
                    className="inline-flex items-center gap-2 border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold transition hover:border-amber-400/40 hover:bg-white/10"
                  >
                    <ShieldAlert className="h-4 w-4" /> Çocuk Koruma
                  </Link>
                  <Link
                    to="/tamuso/destek"
                    className="inline-flex items-center gap-2 border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold transition hover:border-amber-400/40 hover:bg-white/10"
                  >
                    <MessageCircle className="h-4 w-4" /> Destek
                  </Link>
                  <Link
                    to="/tamuso/hesap-silme"
                    className="inline-flex items-center gap-2 border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold transition hover:border-amber-400/40 hover:bg-white/10"
                  >
                    <Smartphone className="h-4 w-4" /> Hesap silme
                  </Link>
                </div>
              </div>
              <div className="flex-1 border border-white/10 bg-black/30 p-6">
                <h3 className="flex items-center gap-2 text-lg font-semibold">
                  <Lock className="h-5 w-5" style={{ color: accent }} />
                  Mağaza incelemesi için not
                </h3>
                <ul className="mt-4 space-y-2 text-sm text-zinc-400">
                  <li>• 18+ only — not directed at children (COPPA / age rating uyumu).</li>
                  <li>• UGC sesli odalar: Report + Block + moderasyon (App Store 1.2).</li>
                  <li>• Child Safety Standards (EN): /tamuso/child-safety — CSAE sıfır tolerans, 24s inceleme hedefi.</li>
                  <li>• Account deletion web URL: /tamuso/hesap-silme — silinen veri + 30 gün hedefi.</li>
                  <li>• Privacy: veri satılmaz; Data Safety / Privacy Labels ile uyumlu kategori listesi.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#07080c] px-6 py-20 text-white lg:px-12">
        <div className="mx-auto max-w-4xl space-y-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest" style={{ color: accent }}>
              SSS
            </p>
            <h2 className="mt-2 text-3xl font-bold">Sıkça sorulan sorular</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <div key={faq.question} className="overflow-hidden border border-white/10 bg-white/[0.03]">
                <button
                  type="button"
                  className="flex w-full items-center justify-between px-6 py-4 text-left"
                  onClick={() => setOpenFaq((prev) => (prev === faq.question ? null : faq.question))}
                >
                  <span className="pr-4 text-lg font-semibold">{faq.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-amber-400 transition-transform ${openFaq === faq.question ? 'rotate-180' : ''}`}
                  />
                </button>
                <motion.div
                  className="overflow-hidden"
                  initial={false}
                  animate={{ height: openFaq === faq.question ? 'auto' : 0 }}
                  transition={{ duration: 0.28 }}
                >
                  <p className="px-6 pb-4 text-sm text-zinc-400">{faq.answer}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-white/5 bg-[#050608] px-6 py-10 text-sm text-zinc-500 lg:px-12">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p>
            Tamuso, <strong className="text-zinc-300">LitxTech</strong> tarafından sunulmaktadır. Kişisel veriler Gizlilik Politikası kapsamında
            işlenir.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/tamuso/gizlilik" className="hover:text-amber-400">
              Gizlilik
            </Link>
            <Link to="/tamuso/kullanim-sartlari" className="hover:text-amber-400">
              Şartlar
            </Link>
            <Link to="/tamuso/child-safety" className="hover:text-amber-400">
              Çocuk koruma
            </Link>
            <Link to="/tamuso/hesap-silme" className="hover:text-amber-400">
              Hesap silme
            </Link>
            <Link to="/tamuso/destek" className="hover:text-amber-400">
              Destek
            </Link>
            <Link to="/" className="hover:text-amber-400">
              LitxTech
            </Link>
          </div>
        </div>
        <p className="mt-6 text-center text-xs text-zinc-600">© {new Date().getFullYear()} LitxTech. Tüm hakları saklıdır.</p>
      </footer>
    </div>
  )
}
