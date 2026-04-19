import { Link, Navigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Check, MessageCircle, MonitorPlay, Phone } from 'lucide-react'
import { MarketingChrome } from '@/components/marketing/MarketingChrome'
import { DashboardMockup } from '@/components/marketing/DashboardMockup'
import { SeoHead } from '@/components/marketing/SeoHead'
import { WhatsAppFloat } from '@/components/marketing/WhatsAppFloat'
import { getSolutionBySlug } from '@/data/solutionsData'
import { getWhatsAppLink, siteConfig } from '@/data/siteConfig'
import { solutionAccentClasses } from '@/lib/solutionStyles'

export function SolutionDetailPage() {
  const { slug } = useParams()
  const solution = getSolutionBySlug(slug)

  if (!solution) {
    return <Navigate to="/cozumler" replace />
  }

  const Icon = solution.icon
  const a = solutionAccentClasses(solution.accent)

  return (
    <MarketingChrome>
      <SeoHead title={solution.metaTitle} description={solution.metaDescription} path={`/cozumler/${solution.slug}`} />
      <section className="border-b border-white/10 bg-gradient-to-b from-[#070a12] via-[#070a12] to-[#05070f]">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-14 md:px-6 md:py-20 lg:grid-cols-2">
          <div>
            <div className={`mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300`}>
              <span className={`inline-flex h-8 w-8 items-center justify-center rounded-lg ${a.iconBg}`}>
                <Icon className="h-4 w-4" />
              </span>
              Çözüm detayı
            </div>
            <h1 className="font-display text-4xl font-bold tracking-tight text-white md:text-5xl">{solution.title}</h1>
            <p className="mt-4 text-xl text-slate-300">{solution.tagline}</p>
            <p className="mt-6 text-base leading-relaxed text-slate-400">{solution.problem}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/25"
              >
                Teklif Al
              </Link>
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-5 py-3 text-sm font-semibold text-white hover:border-white/25"
              >
                <MessageCircle className="h-4 w-4 text-emerald-400" />
                WhatsApp
              </a>
              <a
                href={siteConfig.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-5 py-3 text-sm font-semibold text-white hover:border-white/25"
              >
                <MonitorPlay className="h-4 w-4 text-blue-300" />
                Demo
              </a>
            </div>
          </div>
          <DashboardMockup />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-16">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="font-display text-2xl font-bold text-white">Temel özellikler</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {solution.features.map((f) => (
                <div
                  key={f}
                  className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-200"
                >
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-400" />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h3 className="font-display text-lg font-semibold text-white">Kimler için?</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              {solution.audience.map((row) => (
                <li key={row} className="leading-relaxed">
                  · {row}
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded-xl border border-white/10 bg-black/30 p-4 text-sm text-slate-400">
              Daha net bir teklif için kısa bir keşif görüşmesi planlayalım.
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#05070f]">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-16">
          <h2 className="font-display text-2xl font-bold text-white">Sık sorulan sorular</h2>
          <div className="mt-8 space-y-3">
            {solution.faq.map((item) => (
              <details
                key={item.question}
                className="group rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 open:bg-white/[0.05]"
              >
                <summary className="cursor-pointer list-none font-medium text-white [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center justify-between gap-3">
                    {item.question}
                    <span className="text-slate-500 transition group-open:rotate-45">+</span>
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-gradient-to-r from-blue-600/15 via-violet-600/10 to-fuchsia-600/10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-12 md:flex-row md:items-center md:px-6">
          <div>
            <h2 className="font-display text-2xl font-bold text-white">Bu çözümü birlikte netleştirelim</h2>
            <p className="mt-2 text-slate-300">Kısa bir görüşmede kapsam, süre ve bütçe aralığını konuşalım.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-slate-900"
            >
              <Phone className="h-4 w-4" />
              Teklif Al
            </Link>
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-5 py-3 text-sm font-semibold text-white hover:bg-white/5"
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
        className="mx-auto max-w-7xl px-4 pb-16 pt-6 md:px-6"
      >
        <Link to="/cozumler" className="text-sm font-medium text-blue-300 hover:text-blue-200">
          ← Tüm çözümler
        </Link>
      </motion.div>

      <WhatsAppFloat />
    </MarketingChrome>
  )
}
