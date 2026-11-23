import { Link } from 'react-router-dom'
import { MarketingChrome } from '@/components/marketing/MarketingChrome'
import { SeoHead } from '@/components/marketing/SeoHead'
import { SolutionCard } from '@/components/marketing/SolutionCard'
import { WhatsAppFloat } from '@/components/marketing/WhatsAppFloat'
import { solutionsData } from '@/data/solutionsData'
import { useLanguage } from '@/contexts/LanguageContext'

export function SolutionsIndexPage() {
  const { t } = useLanguage()
  const s = t.solutions

  return (
    <MarketingChrome>
      <SeoHead title={s.metaTitle} description={s.metaDescription} path="/cozumler" />

      <section className="relative overflow-hidden border-b border-white/[0.07]">
        <div className="pointer-events-none absolute inset-0 ltx-aurora" />
        <div className="pointer-events-none absolute inset-0 ltx-grid-lines opacity-60" />
        <div className="ltx-container-wide relative py-16 sm:py-20 lg:py-24">
          <div className="max-w-3xl">
            <p className="ltx-eyebrow">{s.eyebrow}</p>
            <h1 className="ltx-h1 mt-4 text-balance">{s.title}</h1>
            <p className="ltx-lead mt-5 max-w-2xl">{s.lead}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="ltx-btn-primary">
                {s.ctaQuote}
              </Link>
              <Link to="/projeler" className="ltx-btn-secondary">
                {s.ctaProjects}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="ltx-container-wide ltx-section">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {solutionsData.map((item, i) => (
            <SolutionCard key={item.slug} solution={item} index={i} />
          ))}
        </div>
      </section>

      <WhatsAppFloat />
    </MarketingChrome>
  )
}
