import { MarketingChrome } from '@/components/marketing/MarketingChrome'
import { SeoHead } from '@/components/marketing/SeoHead'
import { SolutionCard } from '@/components/marketing/SolutionCard'
import { WhatsAppFloat } from '@/components/marketing/WhatsAppFloat'
import { solutionsData } from '@/data/solutionsData'
import { Link } from 'react-router-dom'

export function SolutionsIndexPage() {
  return (
    <MarketingChrome>
      <SeoHead
        title="Çözümler | LitxTech"
        description="Otel, restoran, sosyal platform, eşleşme, şehir uygulamaları ve kuruma özel yazılım çözümleri."
        path="/cozumler"
      />
      <section className="border-b border-white/10 bg-gradient-to-b from-[#070a12] to-[#05070f]">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-300/90">Çözümler</p>
            <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-white md:text-5xl">
              İşinize uygun yazılım çözüm alanları
            </h1>
            <p className="mt-4 text-lg text-slate-400">
              Her kart bir ürün değil; operasyonunuzu güçlendiren bir çözüm yaklaşımını temsil eder. Detay sayfalarında
              kapsamı ve süreci net şekilde görebilirsiniz.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/25"
              >
                Teklif Al
              </Link>
              <Link
                to="/projeler"
                className="rounded-lg border border-white/15 px-5 py-3 text-sm font-semibold text-white hover:border-white/25"
              >
                Referans projeler
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {solutionsData.map((s, i) => (
            <SolutionCard key={s.slug} solution={s} index={i} />
          ))}
        </div>
      </section>
      <WhatsAppFloat />
    </MarketingChrome>
  )
}
