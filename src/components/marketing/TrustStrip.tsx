import { useEffect, useState } from 'react'

type Stat = { key?: string; value: string; label: string }

export function TrustStrip() {
  const [stats, setStats] = useState<Stat[]>([])
  useEffect(() => {
    fetch('/api/public/studio/trust')
      .then((r) => r.json())
      .then((d) => setStats(Array.isArray(d.stats) ? d.stats : []))
      .catch(() => setStats([]))
  }, [])
  if (!stats.length) return null
  return (
    <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
      {stats.map((stat) => (
        <div key={stat.label} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="text-2xl font-semibold text-white">{stat.value}</div>
          <div className="mt-1 text-xs text-slate-400">{stat.label}</div>
        </div>
      ))}
    </div>
  )
}
