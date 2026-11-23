import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { MarketingChrome } from '@/components/marketing/MarketingChrome'
import { SeoHead } from '@/components/marketing/SeoHead'
import { WhatsAppFloat } from '@/components/marketing/WhatsAppFloat'
import { breadcrumbJsonLd, seoConfig } from '@/data/seoConfig'
import { useLanguage } from '@/contexts/LanguageContext'

export function AboutPage() {
  const { t } = useLanguage()
  const a = t.about

  return (
    <MarketingChrome>
      <SeoHead
        title={a.metaTitle}
        description={a.metaDescription}
        path="/about"
        jsonLd={breadcrumbJsonLd([
          { name: t.nav.company, path: '/' },
          { name: a.eyebrow, path: '/about' },
        ])}
      />

      <section className="relative overflow-hidden border-b border-white/[0.07]">
        <div className="pointer-events-none absolute inset-0 ltx-aurora" />
        <div className="pointer-events-none absolute inset-0 ltx-grid-lines opacity-60" />
        <div className="ltx-container relative py-16 sm:py-20 lg:py-24">
          <p className="ltx-eyebrow">{a.eyebrow}</p>
          <h1 className="ltx-h1 mt-4 max-w-3xl text-balance">{a.title}</h1>
          <p className="ltx-lead mt-6 max-w-2xl">{a.intro}</p>

          <div className="mt-12 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
            {a.stats.map((stat) => (
              <div key={stat.label} className="ltx-card p-4">
                <div className="font-display text-2xl font-semibold text-white">{stat.value}</div>
                <div className="mt-1 text-[11.5px] leading-snug text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ltx-container space-y-14 py-14 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="ltx-h3">{a.whatTitle}</h2>
            <p className="mt-4 text-[14.5px] leading-relaxed text-slate-400">{a.whatBody}</p>
          </div>
          <ul className="space-y-2.5">
            {a.whatItems.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-sky-400 to-violet-400" />
                <span className="text-[13.5px] leading-relaxed text-slate-300">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="ltx-h3">{a.whyTitle}</h2>
            <p className="mt-4 text-[14.5px] leading-relaxed text-slate-400">{a.whyBody}</p>
          </div>
          <div className="ltx-card p-6">
            <h2 className="font-display text-base font-semibold text-white">{a.factsTitle}</h2>
            <dl className="mt-5 space-y-3.5 text-[13px]">
              <div className="flex gap-3">
                <dt className="w-32 shrink-0 text-slate-500">{a.legalName}</dt>
                <dd className="text-slate-200">{seoConfig.legalName}</dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-32 shrink-0 text-slate-500">{a.web}</dt>
                <dd>
                  <a className="ltx-link" href={seoConfig.origin}>
                    www.litxtech.com
                  </a>
                </dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-32 shrink-0 text-slate-500">{a.email}</dt>
                <dd>
                  <a className="ltx-link" href={`mailto:${seoConfig.email}`}>
                    {seoConfig.email}
                  </a>
                </dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-32 shrink-0 text-slate-500">{a.phone}</dt>
                <dd className="text-slate-200">{seoConfig.phone}</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/[0.07] pt-10 sm:flex-row">
          <Link to="/projemi-anlat" className="ltx-btn-primary">
            {a.ctaProject}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/cozumler" className="ltx-btn-secondary">
            {a.ctaSolutions}
          </Link>
          <Link to="/contact" className="ltx-btn-ghost">
            {a.ctaContact}
          </Link>
        </div>
      </section>

      <WhatsAppFloat />
    </MarketingChrome>
  )
}
