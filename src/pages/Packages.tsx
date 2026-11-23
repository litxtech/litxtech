import { Link } from 'react-router-dom'
import { Check, Crown, Rocket, Sparkles, Star, Zap } from 'lucide-react'
import { MarketingChrome } from '@/components/marketing/MarketingChrome'
import { SeoHead } from '@/components/marketing/SeoHead'
import { useLanguage } from '@/contexts/LanguageContext'

const icons = [Zap, Rocket, Crown]
const tones = [
  'from-sky-400 to-cyan-400',
  'from-violet-400 to-fuchsia-400',
  'from-amber-400 to-orange-400',
]

export function Packages() {
  const { t } = useLanguage()
  const p = t.packages

  return (
    <MarketingChrome>
      <SeoHead title={p.metaTitle} description={p.metaDescription} path="/packages" />

      <section className="relative overflow-hidden border-b border-white/[0.07]">
        <div className="pointer-events-none absolute inset-0 ltx-aurora" />
        <div className="pointer-events-none absolute inset-0 ltx-grid-lines opacity-60" />
        <div className="ltx-container-wide relative py-16 sm:py-20 lg:py-24">
          <div className="max-w-3xl">
            <p className="ltx-eyebrow">{p.eyebrow}</p>
            <h1 className="ltx-h1 mt-4 text-balance">{p.title}</h1>
            <p className="ltx-lead mt-5">{p.lead}</p>
          </div>
          <p className="mt-7 inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1.5 text-[12px] font-medium text-amber-200">
            <Star className="h-3.5 w-3.5" />
            {p.popularNote}
          </p>
        </div>
      </section>

      <section className="ltx-container-wide ltx-section">
        <div className="grid gap-5 lg:grid-cols-3">
          {p.tiers.map((tier, index) => {
            const Icon = icons[index] ?? Sparkles
            const popular = index === 1
            return (
              <div
                key={tier.name}
                className={`relative flex flex-col rounded-[1.25rem] border p-7 ${
                  popular
                    ? 'border-sky-400/35 bg-gradient-to-b from-sky-500/[0.08] to-white/[0.02] shadow-[0_30px_80px_-40px_rgba(59,130,246,0.8)]'
                    : 'border-white/[0.08] bg-white/[0.02]'
                }`}
              >
                {popular && (
                  <span className="absolute -top-3 left-7 rounded-full bg-gradient-to-r from-sky-500 to-violet-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                    {p.popularBadge}
                  </span>
                )}

                <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${tones[index]} shadow-lg`}>
                  <Icon className="h-6 w-6 text-slate-950" strokeWidth={2.4} />
                </div>

                <h2 className="mt-5 font-display text-2xl font-semibold tracking-tight text-white">
                  {tier.name}
                </h2>
                <p className="mt-1.5 text-[13px] text-slate-400">{tier.description}</p>

                <div className="mt-5 flex items-baseline gap-1">
                  <span className="font-display text-4xl font-semibold text-white">{tier.price}</span>
                  <span className="text-[13px] text-slate-500">{tier.period}</span>
                </div>

                <ul className="mt-6 flex-1 space-y-2.5">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-[13px] text-slate-300">
                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-400/10 ring-1 ring-emerald-400/25">
                        <Check className="h-2.5 w-2.5 text-emerald-300" strokeWidth={3.5} />
                      </span>
                      <span className="leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to={`/projemi-anlat?plan=${tier.name}&project_type=${index === 2 ? 'custom' : 'web'}`}
                  className={`mt-7 w-full ${popular ? 'ltx-btn-primary' : 'ltx-btn-secondary'}`}
                >
                  {popular ? p.request : p.choose}
                </Link>
              </div>
            )
          })}
        </div>

        <div className="ltx-card mt-14 p-8">
          <h3 className="text-center font-display text-xl font-semibold text-white">{p.includedTitle}</h3>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {p.included.map((item) => (
              <div key={item.title} className="text-center">
                <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400/20 to-violet-500/15 ring-1 ring-white/10">
                  <Sparkles className="h-5 w-5 text-sky-300" />
                </div>
                <h4 className="text-[14px] font-semibold text-white">{item.title}</h4>
                <p className="mt-1 text-[12.5px] leading-relaxed text-slate-500">{item.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 text-center">
          <h3 className="font-display text-2xl font-semibold text-white">{p.customTitle}</h3>
          <p className="mx-auto mt-3 max-w-xl text-[14px] text-slate-400">{p.customLead}</p>
          <Link to="/projemi-anlat?plan=CUSTOM" className="ltx-btn-primary mt-6">
            {p.customCta}
          </Link>
        </div>
      </section>
    </MarketingChrome>
  )
}
