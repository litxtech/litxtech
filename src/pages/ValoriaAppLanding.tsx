import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Shield,
  FileCheck,
  Building2,
  Smartphone,
  Lock,
  KeyRound,
  CheckCircle2,
  ClipboardList,
  MessageSquare,
  ChevronDown
} from 'lucide-react'

const accent = '#0d9488'

const features = [
  {
    icon: FileCheck,
    title: 'Rezervasyon ve check-in',
    description: 'Uygulama veya web üzerinden rezervasyon yapın, QR kod veya uygulama ile hızlı check-in.'
  },
  {
    icon: KeyRound,
    title: 'Dijital anahtar',
    description: 'Telefonunuzla oda kapınızı açın; fiziksel kart yerine dijital anahtar.'
  },
  {
    icon: Building2,
    title: 'Valoria Hotel deneyimi',
    description: 'Oda servisi, özel istekler ve otel kuralları tek uygulamada.'
  },
  {
    icon: Lock,
    title: 'Güvenli ve KVKK uyumlu',
    description: 'Kişisel verileriniz şifreli iletişim ve mevzuata uygun işlenir.'
  },
  {
    icon: ClipboardList,
    title: 'Sözleşme ve onay',
    description: 'Gizlilik ve kullanım şartları uygulama içinde okunup onaylanır.'
  },
  {
    icon: Shield,
    title: 'Hesap ve veri kontrolü',
    description: 'Hesap silme ve destek talepleriniz için sayfalarımız hazır.'
  }
]

const faqs = [
  {
    question: 'Valoria App nedir?',
    answer: 'Valoria App, Valoria Hotel misafirlerinin rezervasyon, check-in, dijital anahtar ve otel hizmetlerini tek yerden yönetebildiği mobil ve web uygulamasıdır.'
  },
  {
    question: 'Verilerim güvende mi?',
    answer: 'Evet. Gizlilik sözleşmemiz KVKK ve GDPR uyumludur. Verileriniz yalnızca belirtilen amaçlarla, güvenli altyapı ile işlenir; üçüncü taraflara pazarlama amaçlı satılmaz.'
  },
  {
    question: 'Hesabımı nasıl silebilirim?',
    answer: 'Uygulama içinden Ayarlar → Hesap → Hesabımı sil ile silebilir veya Hesap Silme sayfamızdan e-posta ile talep oluşturabilirsiniz.'
  },
  {
    question: 'Destek ve yasal sayfalara nereden ulaşırım?',
    answer: 'Aşağıdaki linklerden Valoria App Gizlilik, Kullanım Şartları, Hesap Silme ve Destek sayfalarına ulaşabilirsiniz.'
  }
]

export function ValoriaAppLanding() {
  const [openFaq, setOpenFaq] = useState<string | null>(null)

  return (
    <div className="bg-[#030712] text-white">
      {/* Hero */}
      <section className="relative isolate overflow-hidden px-6 pt-16 pb-24 lg:px-12 lg:pt-24">
        <div className="absolute inset-0 bg-gradient-to-b from-[#052e2a] via-[#050b16] to-[#030712] opacity-95" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(13,148,136,0.25),transparent)]" />
        <div className="relative z-10 mx-auto max-w-6xl flex flex-col items-center gap-14 lg:flex-row lg:gap-16">
          <div className="max-w-xl space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-gray-300">
              <Building2 className="h-4 w-4" style={{ color: accent }} />
              <span>Valoria Hotel</span>
            </div>
            <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Valoria App – Otel deneyiminiz tek uygulamada
            </h1>
            <p className="text-lg text-gray-300">
              Rezervasyon yapın, check-in olun, dijital anahtar ile odanıza girin. Gizlilik ve kullanım şartları tek yerden; hesap silme ve destek sayfalarına aşağıdaki linklerden ulaşın.
            </p>
            <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
              <a
                href="https://apps.apple.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-14 items-center rounded-2xl bg-black px-6 py-3 font-semibold text-white shadow-xl transition hover:scale-[1.02]"
              >
                <svg className="mr-2 h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                App Store
              </a>
              <a
                href="https://play.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-14 items-center rounded-2xl border border-white/30 bg-white/5 px-6 py-3 font-semibold text-white backdrop-blur transition hover:border-white/50 hover:bg-white/10"
              >
                <svg className="mr-2 h-8 w-8" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                </svg>
                Google Play
              </a>
            </div>
          </div>
          <motion.div
            className="relative mx-auto w-full max-w-sm overflow-hidden rounded-[36px] border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur-xl"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            whileHover={{ y: -8 }}
          >
            <div className="rounded-[28px] border border-white/20 bg-[#0b1628] p-6 flex flex-col items-center justify-center min-h-[320px]">
              <div className="rounded-2xl bg-white/10 p-8">
                <Building2 className="h-24 w-24 text-white/80" style={{ color: accent }} />
              </div>
              <p className="mt-4 text-sm text-gray-400">Valoria App</p>
              <p className="text-xs text-gray-500">Rezervasyon · Check-in · Dijital anahtar</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What is Valoria App */}
      <section id="about" className="bg-white px-6 py-20 text-gray-900 lg:px-12">
        <div className="mx-auto max-w-5xl space-y-10">
          <div className="space-y-4 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest" style={{ color: accent }}>Valoria App nedir?</p>
            <h2 className="text-3xl font-bold">Valoria Hotel misafir uygulaması</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Valoria App, Valoria Hotel&apos;in mobil ve web uygulamasıdır. Rezervasyon, check-in, dijital oda anahtarı ve otel kuralları ile gizlilik/kullanım şartları tek platformda sunulur.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { title: 'Misafirler', desc: 'Otelimizde konaklayan veya konaklayacak tüm misafirler uygulamayı kullanabilir.' },
              { title: 'Güvenli giriş', desc: 'Telefon numarası ile kayıt, SMS doğrulama ve güvenli oturum.' },
              { title: 'Yasal uyum', desc: 'KVKK ve GDPR uyumlu gizlilik; net kullanım şartları ve hesap silme.' }
            ].map((card) => (
              <div key={card.title} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition">
                <h3 className="text-xl font-semibold text-gray-900">{card.title}</h3>
                <p className="mt-3 text-gray-600">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-[#050b16] px-6 py-20 text-white lg:px-12">
        <div className="mx-auto max-w-6xl space-y-12">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest" style={{ color: accent }}>Özellikler</p>
            <h2 className="text-3xl font-bold mt-2">Uygulama ile neler yapabilirsiniz?</h2>
            <p className="text-gray-400 mt-2">Güvenli, sade ve otel deneyiminize odaklı.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <motion.div
                key={f.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
                whileHover={{ scale: 1.02 }}
              >
                <div className="rounded-xl bg-white/10 p-3 w-fit" style={{ color: accent }}>
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">{f.title}</h3>
                <p className="mt-2 text-sm text-gray-300">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Legal & Support – altında linkler (KBS tanıtımı gibi) */}
      <section className="bg-[#050b16] px-6 py-20 text-white lg:px-12">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl backdrop-blur lg:p-10">
            <div className="flex flex-col gap-10 lg:flex-row">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-3">
                  <Shield className="h-10 w-10" style={{ color: accent }} />
                  <h2 className="text-2xl font-bold">Yasal metinler ve destek</h2>
                </div>
                <p className="text-gray-300">
                  Valoria App, Valoria Hotel tarafından işletilmektedir. Gizlilik ve kullanım şartlarımızı okuyabilir, hesap silme talebinde bulunabilir veya destek sayfasından bize ulaşabilirsiniz.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    to="/valoria-app-privacy"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    <FileCheck className="h-4 w-4" /> Valoria App Gizlilik
                  </Link>
                  <Link
                    to="/valoria-app-terms"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    <ClipboardList className="h-4 w-4" /> Valoria App Kullanım Şartları
                  </Link>
                  <Link
                    to="/valoria-app/delete-account"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    <Smartphone className="h-4 w-4" /> Hesap silme
                  </Link>
                  <Link
                    to="/support/valoria-app"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    <MessageSquare className="h-4 w-4" /> Destek
                  </Link>
                </div>
              </div>
              <div className="flex-1 rounded-2xl bg-white/5 p-6">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5" style={{ color: accent }} />
                  Neden önemli?
                </h3>
                <ul className="mt-4 space-y-2 text-sm text-gray-300">
                  <li>• Şifreli iletişim (HTTPS)</li>
                  <li>• Kişisel verilerin satışı yok</li>
                  <li>• Veri yalnızca yasal zorunluluk veya hizmet için paylaşılır</li>
                  <li>• Net Gizlilik ve Kullanım Şartları; hesap silme ve destek mevcut</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#030712] px-6 py-20 text-white lg:px-12">
        <div className="mx-auto max-w-4xl space-y-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest" style={{ color: accent }}>SSS</p>
            <h2 className="text-3xl font-bold mt-2">Sıkça sorulan sorular</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
                <button
                  className="flex w-full items-center justify-between px-6 py-4 text-left"
                  onClick={() => setOpenFaq((prev) => (prev === faq.question ? null : faq.question))}
                >
                  <span className="text-lg font-semibold text-white pr-4">{faq.question}</span>
                  <ChevronDown className={`h-5 w-5 text-gray-400 shrink-0 transition-transform ${openFaq === faq.question ? 'rotate-180' : ''}`} />
                </button>
                <motion.div
                  className="overflow-hidden"
                  initial={false}
                  animate={{ height: openFaq === faq.question ? 'auto' : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="px-6 pb-4 text-sm text-gray-300">{faq.answer}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer – linkler KBS tanıtımı gibi */}
      <footer className="bg-[#03060e] px-6 py-10 text-sm text-gray-400 lg:px-12">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 border-t border-white/5 pt-6 md:flex-row md:items-center md:justify-between">
          <p>
            Valoria App, <strong className="text-white">Valoria Hotel</strong> tarafından işletilmektedir. Veriler Gizlilik Sözleşmesi ve Kullanım Şartları kapsamında işlenir.
          </p>
          <div className="flex flex-wrap gap-4 text-white">
            <Link to="/valoria-app" className="hover:opacity-80" style={{ color: accent }}>Valoria App Tanıtım</Link>
            <Link to="/valoria-app-privacy" className="hover:opacity-80" style={{ color: accent }}>Valoria App Gizlilik</Link>
            <Link to="/valoria-app-terms" className="hover:opacity-80" style={{ color: accent }}>Valoria App Kullanım Şartları</Link>
            <Link to="/valoria-app/delete-account" className="hover:opacity-80" style={{ color: accent }}>Hesap silme</Link>
            <Link to="/support/valoria-app" className="hover:opacity-80" style={{ color: accent }}>Destek</Link>
            <Link to="/" className="hover:opacity-80" style={{ color: accent }}>LitxTech Ana Sayfa</Link>
          </div>
        </div>
        <p className="mt-4 text-center text-xs text-gray-500">© 2025 Valoria Hotel. Tüm hakları saklıdır.</p>
      </footer>
    </div>
  )
}
