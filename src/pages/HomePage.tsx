import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  CheckCircle2,
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
import { homeContent } from '@/data/homeContent'
import { projectsData } from '@/data/projectsData'
import { solutionsData } from '@/data/solutionsData'
import { getWhatsAppLink, siteConfig } from '@/data/siteConfig'

export function HomePage() {
  const featured = useMemo(() => projectsData.slice(0, 4), [])
  const [slide, setSlide] = useState(0)

  const next = () => setSlide((s) => (s + 1) % featured.length)
  const prev = () => setSlide((s) => (s - 1 + featured.length) % featured.length)

  const active = featured[slide]

  return (
    <MarketingChrome>
      <SeoHead
        title="LitxTech | İşletmeler için modern yazılım çözümleri"
        description={siteConfig.tagline}
        path="/"
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.22),transparent_55%),radial-gradient(ellipse_at_bottom,rgba(139,92,246,0.18),transparent_55%)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 md:px-6 md:py-24 lg:grid-cols-2 lg:gap-16">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-slate-200"
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-300" />
              Kurumsal yazılım · Web & mobil
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.05 }}
              className="mt-6 font-display text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl"
            >
              {homeContent.hero.title}
            </motion.h1>
            <p className="mt-4 text-lg font-medium text-slate-200 md:text-xl">{homeContent.hero.subtitle}</p>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-400 md:text-lg">
              {homeContent.hero.description}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                to="/projeler"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-900/30 transition hover:opacity-95"
              >
                {homeContent.hero.primaryCta}
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-xl border border-white/15 px-6 py-3.5 text-sm font-semibold text-white hover:border-white/25"
              >
                {homeContent.hero.secondaryCta}
              </Link>
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl border border-emerald-500/25 bg-emerald-500/10 px-6 py-3.5 text-sm font-semibold text-emerald-100 hover:bg-emerald-500/15"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                {homeContent.hero.tertiaryCta}
              </a>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {homeContent.stats.map((s) => (
                <div key={s.label} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="text-2xl font-bold text-white">{s.value}</div>
                  <div className="mt-1 text-xs text-slate-400">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <DashboardMockup />
        </div>
      </section>

      {/* Solutions */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20" id="cozumler">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-300/90">
            {homeContent.sections.solutions}
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-white md:text-4xl">
            İşinizi büyüten çözüm kategorileri
          </h2>
          <p className="mt-4 text-lg text-slate-400">{homeContent.sections.solutionsLead}</p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {solutionsData.map((s, i) => (
            <SolutionCard key={s.slug} solution={s} index={i} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            to="/cozumler"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-300 hover:text-blue-200"
          >
            Tüm çözümleri görüntüle
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Featured projects */}
      <section
        className="border-y border-white/10 bg-gradient-to-b from-[#05070f] to-[#070a12] py-16 md:py-20"
        id="projeler"
      >
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-300/90">
                {homeContent.sections.projects}
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold text-white md:text-4xl">Referanslarımızdan seçkiler</h2>
              <p className="mt-3 text-lg text-slate-400">{homeContent.sections.projectsLead}</p>
            </div>
            <Link
              to="/projeler"
              className="inline-flex items-center justify-center rounded-lg border border-white/15 px-4 py-2 text-sm font-semibold text-white hover:border-white/25"
            >
              Tüm projeler
            </Link>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/30 shadow-2xl">
                <img
                  src={active.image}
                  alt={active.imageAlt}
                  className="aspect-[16/10] w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070a12] via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-sm text-slate-300">Şu an</div>
                    <div className="font-display text-lg font-bold text-white">{active.title}</div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={prev}
                      className="rounded-lg border border-white/15 bg-black/40 p-2 text-white backdrop-blur hover:bg-black/55"
                      aria-label="Önceki proje"
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={next}
                      className="rounded-lg border border-white/15 bg-black/40 p-2 text-white backdrop-blur hover:bg-black/55"
                      aria-label="Sonraki proje"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-3 flex justify-center gap-2">
                {featured.map((p, i) => (
                  <button
                    key={p.slug}
                    type="button"
                    onClick={() => setSlide(i)}
                    className={`h-2 w-2 rounded-full ${i === slide ? 'bg-blue-400' : 'bg-white/20'}`}
                    aria-label={`Slayt ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="space-y-3">
                {featured.map((p) => (
                  <Link
                    key={p.slug}
                    to={`/projeler/${p.slug}`}
                    onMouseEnter={() => setSlide(featured.findIndex((x) => x.slug === p.slug))}
                    className={`block rounded-xl border px-4 py-4 transition ${
                      active.slug === p.slug
                        ? 'border-blue-400/40 bg-white/[0.06]'
                        : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-semibold text-white">{p.title}</div>
                        <div className="mt-1 text-sm text-slate-400">{p.summary}</div>
                      </div>
                      <BarChart3 className="h-5 w-5 text-blue-300/80" />
                    </div>
                    <div className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-blue-300">
                      İncele
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-bold text-white md:text-4xl">{homeContent.capabilities.title}</h2>
          <p className="mt-4 text-lg text-slate-400">{homeContent.capabilities.subtitle}</p>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {homeContent.capabilities.items.map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-sm text-slate-200 transition hover:border-white/20"
            >
              <div className="flex gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-400/90" />
                <span className="leading-relaxed">{item}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="border-y border-white/10 bg-[#05070f] py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-bold text-white md:text-4xl">{homeContent.process.title}</h2>
            <p className="mt-4 text-lg text-slate-400">{homeContent.process.subtitle}</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
            {homeContent.process.steps.map((step, idx) => (
              <div key={step.title} className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <div className="text-sm font-semibold text-blue-300">0{idx + 1}</div>
                <h3 className="mt-3 font-display text-lg font-bold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="font-display text-3xl font-bold text-white md:text-4xl">{homeContent.why.title}</h2>
            <p className="mt-4 text-lg text-slate-400">
              Amatör görünüm değil; ürün odaklı mühendislik, net iletişim ve ölçülebilir teslimat.
            </p>
          </div>
          <ul className="space-y-3">
            {homeContent.why.items.map((w) => (
              <li
                key={w}
                className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-slate-200"
              >
                <span className="mt-1 h-2 w-2 rounded-full bg-gradient-to-r from-blue-400 to-violet-400" />
                <span>{w}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-white/10 bg-gradient-to-b from-[#070a12] to-[#05070f] py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <h2 className="text-center font-display text-3xl font-bold text-white md:text-4xl">
            {homeContent.faq.title}
          </h2>
          <div className="mx-auto mt-10 max-w-3xl space-y-3">
            {homeContent.faq.items.map((item) => (
              <details
                key={item.q}
                className="group rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 open:bg-white/[0.05]"
              >
                <summary className="cursor-pointer list-none text-left font-medium text-white [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center justify-between gap-3">
                    {item.q}
                    <span className="text-slate-500 transition group-open:rotate-45">+</span>
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-white/10 bg-gradient-to-r from-blue-600/20 via-violet-600/15 to-fuchsia-600/15">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-bold text-white md:text-4xl">{homeContent.finalCta.title}</h2>
            <p className="mt-4 text-lg text-slate-200">{homeContent.finalCta.subtitle}</p>
            <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-slate-900"
              >
                {homeContent.finalCta.quote}
              </Link>
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-emerald-500/10 px-6 py-3.5 text-sm font-semibold text-emerald-50 hover:bg-emerald-500/15"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                {homeContent.finalCta.whatsapp}
              </a>
              <a
                href={siteConfig.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/5"
              >
                <MonitorPlay className="mr-2 h-4 w-4" />
                {homeContent.finalCta.demo}
              </a>
            </div>
          </div>
        </div>
      </section>

      <WhatsAppFloat />
    </MarketingChrome>
  )
}
