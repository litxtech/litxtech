import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  MessageCircle,
  MonitorPlay,
  Sparkles,
} from 'lucide-react'
import { DashboardMockup } from '@/components/marketing/DashboardMockup'
import { MarketingChrome } from '@/components/marketing/MarketingChrome'
import { SeoHead } from '@/components/marketing/SeoHead'
import { SolutionCard } from '@/components/marketing/SolutionCard'
import { WhatsAppFloat } from '@/components/marketing/WhatsAppFloat'
import { TrustStrip } from '@/components/marketing/TrustStrip'
import { homeContentByLang, type HomeContent } from '@/data/homeContent'
import { projectsData } from '@/data/projectsData'
import { solutionsData } from '@/data/solutionsData'
import { useCompanySettings } from '@/contexts/CompanySettingsContext'
import { useLanguage } from '@/contexts/LanguageContext'
import { fetchHomepageContent, getWhatsAppUrl, trackEvent } from '@/lib/publicCms'

export function HomePage() {
  const company = useCompanySettings()
  const { language, t } = useLanguage()
  const wa = getWhatsAppUrl(company)
  const base = homeContentByLang[language]
  const featured = useMemo(() => projectsData.slice(0, 4), [])
  const [slide, setSlide] = useState(0)
  const [layout, setLayout] = useState<Pick<HomeContent, 'sectionOrder' | 'hiddenSections'>>({})

  useEffect(() => {
    let alive = true
    // Only layout hints come from the CMS; all copy is local so language stays pure.
    fetchHomepageContent({ sectionOrder: [], hiddenSections: [] }).then((c) => {
      if (!alive) return
      const meta = c as Pick<HomeContent, 'sectionOrder' | 'hiddenSections'>
      setLayout({ sectionOrder: meta.sectionOrder, hiddenSections: meta.hiddenSections })
    })
    return () => {
      alive = false
    }
  }, [])

  const content = base
  const next = () => setSlide((s) => (s + 1) % featured.length)
  const prev = () => setSlide((s) => (s - 1 + featured.length) % featured.length)

  const active = featured[slide]
  const activeText = active.text[language]
  const order: string[] = layout.sectionOrder || []
  const hidden = new Set(layout.hiddenSections || [])
  const rank = (id: string) => {
    const i = order.indexOf(id)
    return i === -1 ? 50 : i
  }
  const sectionStyle = (id: string) =>
    hidden.has(id) ? { display: 'none' } : { order: rank(id) }

  return (
    <MarketingChrome>
      <SeoHead title={t.home.metaTitle} description={t.home.metaDescription} path="/" />

      <div className="flex flex-col">
        {/* ---------------------------------------------------------- Hero */}
        <section
          className="relative overflow-hidden border-b border-white/[0.07]"
          style={sectionStyle('hero')}
        >
          <div className="pointer-events-none absolute inset-0 ltx-aurora" />
          <div className="pointer-events-none absolute inset-0 ltx-grid-lines opacity-70" />

          <div className="ltx-container-wide relative grid items-center gap-14 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-28">
            <div className="max-w-[38rem]">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="ltx-pill"
              >
                <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                {t.home.badge}
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="ltx-h1 mt-6 text-balance"
              >
                {content.hero.title}
              </motion.h1>

              <p className="mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-slate-400 sm:text-lg">
                {content.hero.description}
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  to="/contact"
                  onClick={() => trackEvent('cta_click', '/')}
                  className="ltx-btn-primary"
                >
                  {content.hero.primaryCta}
                  <ChevronRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/products"
                  onClick={() => trackEvent('cta_click', '/products')}
                  className="ltx-btn-secondary"
                >
                  {content.hero.secondaryCta}
                </Link>
                <a
                  href={wa}
                  onClick={() => trackEvent('whatsapp_click', '/')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ltx-btn-ghost"
                >
                  <MessageCircle className="h-4 w-4 text-emerald-400" />
                  {content.hero.tertiaryCta}
                </a>
              </div>

              <TrustStrip />
            </div>

            <DashboardMockup />
          </div>
        </section>

        {/* ------------------------------------------------------ Solutions */}
        <section
          className="ltx-section ltx-container-wide"
          id="cozumler"
          style={sectionStyle('solutions')}
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="ltx-eyebrow">{content.sections.solutions}</p>
              <h2 className="ltx-h2 mt-3">{t.home.solutionsTitle}</h2>
              <p className="ltx-lead mt-4">{content.sections.solutionsLead}</p>
            </div>
            <Link
              to="/cozumler"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-300 transition hover:text-sky-200"
            >
              {t.home.viewAllSolutions}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {solutionsData.map((s, i) => (
              <SolutionCard key={s.slug} solution={s} index={i} />
            ))}
          </div>
        </section>

        {/* ------------------------------------------------ Featured work */}
        <section
          className="border-y border-white/[0.07] bg-[#050810]"
          id="projeler"
          style={sectionStyle('projects')}
        >
          <div className="ltx-container-wide ltx-section">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <p className="ltx-eyebrow">{content.sections.projects}</p>
                <h2 className="ltx-h2 mt-3">{t.home.projectsTitle}</h2>
                <p className="ltx-lead mt-4">{content.sections.projectsLead}</p>
              </div>
              <Link to="/projeler" className="ltx-btn-secondary ltx-btn-sm self-start md:self-auto">
                {t.home.viewAllProjects}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <div className="group relative overflow-hidden rounded-[1.25rem] border border-white/10 bg-black/40 shadow-2xl shadow-black/60">
                  <img
                    src={active.image}
                    alt={activeText.imageAlt}
                    className="aspect-[16/10] w-full object-cover transition duration-700 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050810] via-[#050810]/25 to-transparent" />
                  <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
                    <div>
                      <div className="text-[11px] uppercase tracking-[0.16em] text-slate-400">
                        {t.home.nowShowing}
                      </div>
                      <div className="font-display text-lg font-semibold text-white">
                        {activeText.title}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={prev}
                        className="rounded-xl border border-white/15 bg-black/45 p-2 text-white backdrop-blur transition hover:bg-black/65"
                        aria-label={t.home.previousProject}
                      >
                        <ArrowLeft className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={next}
                        className="rounded-xl border border-white/15 bg-black/45 p-2 text-white backdrop-blur transition hover:bg-black/65"
                        aria-label={t.home.nextProject}
                      >
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex justify-center gap-2">
                  {featured.map((p, i) => (
                    <button
                      key={p.slug}
                      type="button"
                      onClick={() => setSlide(i)}
                      className={`h-1.5 rounded-full transition-all ${
                        i === slide ? 'w-6 bg-sky-400' : 'w-1.5 bg-white/25 hover:bg-white/40'
                      }`}
                      aria-label={`${t.home.slide} ${i + 1}`}
                    />
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="space-y-2.5">
                  {featured.map((p) => {
                    const pt = p.text[language]
                    const isActive = active.slug === p.slug
                    return (
                      <Link
                        key={p.slug}
                        to={`/projeler/${p.slug}`}
                        onMouseEnter={() => setSlide(featured.findIndex((x) => x.slug === p.slug))}
                        className={`block rounded-xl border px-4 py-3.5 transition ${
                          isActive
                            ? 'border-sky-400/35 bg-white/[0.06]'
                            : 'border-white/[0.07] bg-white/[0.02] hover:border-white/15'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="text-[15px] font-semibold text-white">{pt.title}</div>
                            <div className="mt-1 line-clamp-2 text-[13px] leading-relaxed text-slate-400">
                              {pt.summary}
                            </div>
                          </div>
                          <ChevronRight
                            className={`mt-0.5 h-4 w-4 shrink-0 transition ${
                              isActive ? 'text-sky-300' : 'text-slate-600'
                            }`}
                          />
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------- Capabilities */}
        <section className="ltx-container-wide ltx-section" style={sectionStyle('capabilities')}>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="ltx-h2">{content.capabilities.title}</h2>
            <p className="ltx-lead mt-4">{content.capabilities.subtitle}</p>
          </div>
          <div className="mt-12 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
            {content.capabilities.items.map((item) => (
              <div
                key={item}
                className="group flex items-start gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-4 transition hover:border-white/15 hover:bg-white/[0.04]"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-400/10 ring-1 ring-emerald-400/25">
                  <Check className="h-3 w-3 text-emerald-300" strokeWidth={3} />
                </span>
                <span className="text-[13.5px] leading-relaxed text-slate-300">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------ Process */}
        <section
          className="border-y border-white/[0.07] bg-[#050810]"
          style={sectionStyle('process')}
        >
          <div className="ltx-container-wide ltx-section">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="ltx-h2">{content.process.title}</h2>
              <p className="ltx-lead mt-4">{content.process.subtitle}</p>
            </div>
            <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
              {content.process.steps.map((step, idx) => (
                <div
                  key={step.title}
                  className="relative rounded-xl border border-white/[0.07] bg-white/[0.02] p-5 transition hover:border-white/15"
                >
                  <div className="mb-4 flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-sky-500/25 to-violet-500/25 text-[11px] font-bold text-sky-200 ring-1 ring-white/10">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    {idx < content.process.steps.length - 1 && (
                      <span className="hidden h-px flex-1 bg-gradient-to-r from-white/15 to-transparent lg:block" />
                    )}
                  </div>
                  <h3 className="text-[14.5px] font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-slate-400">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- Why */}
        <section className="ltx-container-wide ltx-section" style={sectionStyle('why')}>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
            <div className="lg:sticky lg:top-28">
              <h2 className="ltx-h2">{content.why.title}</h2>
              <p className="ltx-lead mt-4 max-w-lg">{content.why.lead}</p>
              <Link to="/about" className="ltx-btn-secondary mt-7">
                {t.nav.company}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <ul className="grid gap-2.5 sm:grid-cols-2">
              {content.why.items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3.5"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-sky-400 to-violet-400" />
                  <span className="text-[13.5px] leading-relaxed text-slate-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------------------------------------------------------- FAQ */}
        <section
          className="border-t border-white/[0.07] bg-[#050810]"
          style={sectionStyle('faq')}
        >
          <div className="ltx-container-wide ltx-section">
            <h2 className="ltx-h2 text-center">{content.faq.title}</h2>
            <div className="mx-auto mt-10 max-w-3xl space-y-2.5">
              {content.faq.items.map((item) => (
                <details
                  key={item.q}
                  className="group rounded-xl border border-white/[0.07] bg-white/[0.02] px-5 py-4 transition open:border-white/15 open:bg-white/[0.04]"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-[14.5px] font-medium text-white [&::-webkit-details-marker]:hidden">
                    {item.q}
                    <span className="text-lg leading-none text-slate-500 transition group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-slate-400">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------ Entity / SEO */}
        <section className="ltx-container ltx-section-tight" id="litxtech" style={sectionStyle('about')}>
          <div className="mx-auto max-w-3xl">
            <h2 className="ltx-h3">{t.home.aboutTitle}</h2>
            <p className="mt-4 text-[14px] leading-relaxed text-slate-400">{t.home.aboutBody}</p>
            <p className="mt-3 text-[14px] leading-relaxed text-slate-400">
              {t.home.aboutBody2}{' '}
              <Link className="ltx-link" to="/about">
                {t.footer.about}
              </Link>
              {', '}
              <Link className="ltx-link" to="/cozumler">
                {t.footer.solutions}
              </Link>
              {', '}
              <Link className="ltx-link" to="/projeler">
                {t.footer.projects}
              </Link>
              .
            </p>
          </div>
        </section>

        {/* ------------------------------------------------------ Final CTA */}
        <section
          className="relative overflow-hidden border-t border-white/[0.07]"
          style={sectionStyle('cta')}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_120%,rgba(59,130,246,0.22),transparent_70%)]" />
          <div className="ltx-container relative py-20 lg:py-24">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="ltx-h2">{content.finalCta.title}</h2>
              <p className="mt-4 text-[15px] leading-relaxed text-slate-400 sm:text-base">
                {content.finalCta.subtitle}
              </p>
              <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap">
                <Link to="/projemi-anlat" className="ltx-btn-primary">
                  {content.finalCta.quote}
                  <ChevronRight className="h-4 w-4" />
                </Link>
                <a
                  href={wa}
                  onClick={() => trackEvent('whatsapp_click', '/')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ltx-btn-secondary"
                >
                  <MessageCircle className="h-4 w-4 text-emerald-400" />
                  {content.finalCta.whatsapp}
                </a>
                <Link to="/destek" className="ltx-btn-ghost">
                  <MonitorPlay className="h-4 w-4 text-sky-300" />
                  {content.finalCta.demo}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      <WhatsAppFloat />
    </MarketingChrome>
  )
}
