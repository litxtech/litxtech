import { motion } from 'framer-motion'
import { BarChart3, Bell, LayoutGrid, LineChart, Settings, Users } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const strings = {
  en: {
    title: 'Operations panel',
    activeUsers: 'Active users',
    conversion: 'Conversion',
    revenue: 'Revenue (30d)',
    live: 'Live activity',
    performance: 'Performance',
    stable: 'Stable',
    rows: ['New order · Table 12', 'Reservation confirmed · Suite', 'Stock alert · Warehouse B'],
  },
  tr: {
    title: 'Operasyon paneli',
    activeUsers: 'Aktif kullanıcı',
    conversion: 'Dönüşüm',
    revenue: 'Gelir (30g)',
    live: 'Canlı aktivite',
    performance: 'Performans',
    stable: 'Stabil',
    rows: ['Yeni sipariş · Masa 12', 'Rezervasyon onayı · Suit', 'Stok uyarısı · Depo B'],
  },
} as const

export function DashboardMockup() {
  const { language } = useLanguage()
  const s = strings[language]

  const kpis = [
    { label: s.activeUsers, value: '12.4K', icon: Users, tone: 'text-emerald-400' },
    { label: s.conversion, value: language === 'tr' ? '%3,8' : '3.8%', icon: LineChart, tone: 'text-sky-400' },
    { label: s.revenue, value: language === 'tr' ? '₺1,2M' : '$1.2M', icon: BarChart3, tone: 'text-violet-400' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative mx-auto w-full max-w-lg"
    >
      <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-blue-500/20 via-violet-500/12 to-cyan-400/15 blur-3xl" />
      <div className="relative overflow-hidden rounded-2xl border border-white/[0.12] bg-[#080c15]/85 shadow-2xl shadow-black/70 backdrop-blur-xl">
        <div className="flex items-center justify-between border-b border-white/[0.08] px-4 py-3">
          <div className="flex items-center gap-2 text-[13px] font-medium text-white/90">
            <LayoutGrid className="h-4 w-4 text-sky-400" />
            {s.title}
          </div>
          <div className="flex items-center gap-2 text-white/40">
            <Bell className="h-4 w-4" />
            <Settings className="h-4 w-4" />
          </div>
        </div>

        <div className="grid gap-2.5 p-4 md:grid-cols-3">
          {kpis.map((k) => (
            <div key={k.label} className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-3">
              <div className="mb-2 flex items-center justify-between text-[11px] text-white/50">
                <span className="truncate">{k.label}</span>
                <k.icon className={`h-3.5 w-3.5 ${k.tone}`} />
              </div>
              <div className="font-display text-lg font-semibold text-white">{k.value}</div>
              <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-sky-500 to-violet-500" />
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-2.5 px-4 pb-4 md:grid-cols-2">
          <div className="rounded-xl border border-white/[0.08] bg-gradient-to-br from-white/[0.05] to-white/[0.015] p-4">
            <div className="mb-3 text-[12px] font-medium text-white/80">{s.live}</div>
            <div className="space-y-2">
              {s.rows.map((row) => (
                <div
                  key={row}
                  className="rounded-lg border border-white/[0.06] bg-black/25 px-3 py-2 text-[11px] text-white/70"
                >
                  {row}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4">
            <div className="mb-3 flex items-center justify-between text-[12px] font-medium text-white/80">
              <span>{s.performance}</span>
              <span className="text-[10px] text-emerald-300">{s.stable}</span>
            </div>
            <div className="h-28 w-full rounded-lg bg-[linear-gradient(180deg,rgba(59,130,246,0.28),rgba(139,92,246,0.1))] p-2">
              <div className="flex h-full items-end gap-1">
                {[40, 55, 48, 70, 62, 78, 66, 88, 74, 92].map((h, i) => (
                  <div key={i} className="flex-1 rounded-sm bg-white/25" style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
