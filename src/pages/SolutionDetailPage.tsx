import { Link, Navigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Check, MessageCircle, MonitorPlay, Phone } from 'lucide-react'
import { MarketingChrome } from '@/components/marketing/MarketingChrome'
import { DashboardMockup } from '@/components/marketing/DashboardMockup'
import { SeoHead } from '@/components/marketing/SeoHead'
import { WhatsAppFloat } from '@/components/marketing/WhatsAppFloat'
import { getSolutionBySlug } from '@/data/solutionsData'
import { useCompanySettings } from '@/contexts/CompanySettingsContext'
import { useLanguage } from '@/contexts/LanguageContext'
import { getWhatsAppUrl, trackEvent } from '@/lib/publicCms'
import { solutionAccentClasses } from '@/lib/solutionStyles'

export function SolutionDetailPage() {
  const { slug } = useParams()
  const company = useCompanySettings()
  const { language, t } = useLanguage()
  const wa = getWhatsAppUrl(company)
  const solution = getSolutionBySlug(slug)

  if (!solution) {
    return <Navigate to="/cozumler" replace />
  }

  const text = solution.text[language]
  const s = t.solutions
  const Icon = solution.icon
  const a = solutionAccentClasses(solution.accent)

  return (
    <MarketingChrome>
      <SeoHead title={text.metaTitle} description={text.metaDescription} path={`/cozumler/${solution.slug}`} />

      <section className="relative overflow-hidden border-b border-white/[0.07]">
        <div className="pointer-events-none absolute inset-0 ltx-aurora" />
        <div className="ltx-container-wide relative grid items-center gap-12 py-14 sm:py-16 lg:grid-cols-2 lg:gap-16 lg:py-20">
          <div>
            <div className="ltx-pill">
              <span className={`inline-flex h-7 w-7 items-center justify-center rounded-lg ${a.iconBg}`}>
                <Icon className="h-3.5 w-3.5" />
              </span>
              {s.detailBadge}
            </div>
            <h1 className="ltx-h1 mt-5 text-balance">{text.title}</h1>
            <p className="mt-4 text-lg font-medium text-slate-300">{text.tagline}</p>
            <p className="mt-5 max-w-xl text-[14.5px] leading-relaxed text-slate-400">{text.problem}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="ltx-btn-primary">
                {s.detailCta}
              </Link>
              <a
                href={wa}
                onClick={() => trackEvent('whatsapp_click', `/cozumler/${solution.slug}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="ltx-btn-secondary"
              >
                <MessageCircle className="h-4 w-4 text-emerald-400" />
                WhatsApp
              </a>
              <a
                href={company.calendly_url || company.website || '/contact'}
                target="_blank"
                rel="noopener noreferrer"
                className="ltx-btn-ghost"
              >
                <MonitorPlay className="h-4 w-4 text-sky-300" />
                {s.demo}
              </a>
            </div>
          </div>
          <DashboardMockup />
        </div>
      </section>

      <section className="ltx-container-wide ltx-section">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-white">
              {s.featuresTitle}
            </h2>
            <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {text.features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-start gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3 text-[13.5px] text-slate-300"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  <span className="leading-relaxed">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="ltx-card h-fit p-6">
            <h3 className="font-display text-lg font-semibold text-white">{s.audienceTitle}</h3>
            <ul className="mt-4 space-y-3 text-[13.5px] text-slate-300">
              {text.audience.map((row) => (
                <li key={row} className="flex items-start gap-2.5 leading-relaxed">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-sky-400 to-violet-400" />
                  {row}
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded-xl border border-white/[0.07] bg-black/25 p-4 text-[13px] leading-relaxed text-slate-400">
              {s.audienceNote}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/[0.07] bg-[#050810]">
        <div className="ltx-container-wide ltx-section-tight">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-white">{s.faqTitle}</h2>
          <div className="mt-7 max-w-3xl space-y-2.5">
            {text.faq.map((item) => (
              <details
                key={item.question}
                className="group rounded-xl border border-white/[0.07] bg-white/[0.02] px-5 py-4 transition open:border-white/15 open:bg-white/[0.04]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-white [&::-webkit-details-marker]:hidden">
                  {item.question}
                  <span className="text-lg leading-none text-slate-500 transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-[13.5px] leading-relaxed text-slate-400">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-white/[0.07]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_120%,rgba(59,130,246,0.18),transparent_70%)]" />
        <div className="ltx-container-wide relative flex flex-col items-start justify-between gap-6 py-14 md:flex-row md:items-center">
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight text-white">{s.closingTitle}</h2>
            <p className="mt-2 max-w-xl text-[14px] text-slate-400">{s.closingLead}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/contact" className="ltx-btn-primary">
              <Phone className="h-4 w-4" />
              {s.detailCta}
            </Link>
            <a
              href={wa}
              onClick={() => trackEvent('whatsapp_click', `/cozumler/${solution.slug}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="ltx-btn-secondary"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="ltx-container-wide pb-16 pt-8"
      >
        <Link to="/cozumler" className="inline-flex items-center gap-2 text-sm font-medium text-sky-300 hover:text-sky-200">
          <ArrowLeft className="h-4 w-4" />
          {s.backToAll}
        </Link>
      </motion.div>

      <WhatsAppFloat />
    </MarketingChrome>
  )
}
