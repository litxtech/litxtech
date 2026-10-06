import { Link } from 'react-router-dom'
import { MarketingChrome } from '@/components/marketing/MarketingChrome'
import { SeoHead } from '@/components/marketing/SeoHead'
import { WhatsAppFloat } from '@/components/marketing/WhatsAppFloat'
import { breadcrumbJsonLd, seoConfig } from '@/data/seoConfig'

export function AboutPage() {
  return (
    <MarketingChrome>
      <SeoHead
        title="LitxTech Hakkında | Yazılım ve Teknoloji Şirketi (Litx)"
        description="LitxTech (Litx) kimdir? Mobil uygulama, SaaS, otel/restoran yazılımı ve özel yazılım geliştiren LitxTech LLC hakkında bilgi edinin."
        path="/about"
        jsonLd={breadcrumbJsonLd([
          { name: 'Ana Sayfa', path: '/' },
          { name: 'Hakkımızda', path: '/about' },
        ])}
      />

      <section className="border-b border-white/10">
        <div className="mx-auto max-w-3xl px-4 py-16 md:px-6 md:py-24">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-300/90">Hakkımızda</p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-white md:text-5xl">
            LitxTech — yazılımı işe dönüştüren ekip
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-300">
            <strong className="font-semibold text-white">LitxTech</strong> (kısaca{' '}
            <strong className="font-semibold text-white">Litx</strong>), işletmeler ve girişimler için
            modern yazılım ürünleri geliştiren bir teknoloji şirketidir. Mobil uygulamalar, SaaS
            platformları, otel ve restoran yönetim sistemleri ile kurumlara özel yazılımı fikir
            aşamasından yayına kadar planlar, tasarlar ve destekleriz.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl space-y-10 px-4 py-14 md:px-6">
        <div>
          <h2 className="font-display text-2xl font-bold text-white">Ne yapıyoruz?</h2>
          <p className="mt-4 leading-relaxed text-slate-400">
            LitxTech olarak ürün odaklı mühendislik sunuyoruz: kullanıcı arayüzü, backend, mobil
            yayınlama, entegrasyonlar ve yayın sonrası bakım. Amacımız amatör bir site değil; ölçülebilir
            iş değeri üreten yazılım teslim etmek.
          </p>
          <ul className="mt-6 space-y-3 text-slate-300">
            <li>· Mobil uygulama geliştirme (iOS &amp; Android)</li>
            <li>· SaaS ve web panelleri</li>
            <li>· Otel ve restoran operasyon yazılımları</li>
            <li>· Sosyal platform ve şehir uygulamaları</li>
            <li>· Özel yazılım ve entegrasyonlar</li>
          </ul>
        </div>

        <div>
          <h2 className="font-display text-2xl font-bold text-white">Neden LitxTech?</h2>
          <p className="mt-4 leading-relaxed text-slate-400">
            Markamız <strong className="text-slate-200">LitxTech</strong> /{' '}
            <strong className="text-slate-200">Litx</strong> olarak tanınır. Şeffaf süreç, hızlı iletişim
            ve gerçek referans ürünlerle çalışırız. İster MVP ister ölçeklenebilir kurumsal sistem —
            ihtiyaca göre mimari kurarız.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl font-bold text-white">Şirket bilgileri</h2>
          <dl className="mt-4 space-y-2 text-sm text-slate-400">
            <div className="flex gap-2">
              <dt className="w-36 shrink-0 text-slate-500">Ticari unvan</dt>
              <dd className="text-slate-200">{seoConfig.legalName}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-36 shrink-0 text-slate-500">Web</dt>
              <dd>
                <a className="text-blue-300 hover:text-blue-200" href={seoConfig.origin}>
                  www.litxtech.com
                </a>
              </dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-36 shrink-0 text-slate-500">E-posta</dt>
              <dd>
                <a className="text-blue-300 hover:text-blue-200" href={`mailto:${seoConfig.email}`}>
                  {seoConfig.email}
                </a>
              </dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-36 shrink-0 text-slate-500">Telefon</dt>
              <dd className="text-slate-200">{seoConfig.phone}</dd>
            </div>
          </dl>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 pt-10 sm:flex-row">
          <Link
            to="/projemi-anlat"
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-3.5 text-sm font-semibold text-white"
          >
            Projeni anlat
          </Link>
          <Link
            to="/cozumler"
            className="inline-flex items-center justify-center rounded-xl border border-white/15 px-6 py-3.5 text-sm font-semibold text-white hover:border-white/25"
          >
            Çözümleri incele
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-xl border border-white/15 px-6 py-3.5 text-sm font-semibold text-white hover:border-white/25"
          >
            İletişim
          </Link>
        </div>
      </section>

      <WhatsAppFloat />
    </MarketingChrome>
  )
}
