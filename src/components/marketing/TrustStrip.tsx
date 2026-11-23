import { useEffect, useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

type Stat = { key?: string; value: string; label: string }

const labels = {
  en: {
    products: 'Published products',
    projects: 'Published projects',
    services: 'Published services',
  },
  tr: {
    products: 'Yayınlanan ürünler',
    projects: 'Yayınlanan projeler',
    services: 'Yayınlanan hizmetler',
  },
} as const

export function TrustStrip() {
  const { language } = useLanguage()
  const [stats, setStats] = useState<Stat[]>([])

  useEffect(() => {
    fetch('/api/public/studio/trust')
      .then((r) => r.json())
      .then((d) => setStats(Array.isArray(d.stats) ? d.stats : []))
      .catch(() => setStats([]))
  }, [])

  if (!stats.length) return null

  const dict = labels[language]
  const labelFor = (stat: Stat) => {
    const key = stat.key as keyof typeof dict | undefined
    if (key && dict[key]) return dict[key]
    return stat.label
  }

  return (
    <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4"
        >
          <div className="font-display text-2xl font-semibold text-white">{stat.value}</div>
          <div className="mt-1 text-[11.5px] text-slate-400">{labelFor(stat)}</div>
        </div>
      ))}
    </div>
  )
}
