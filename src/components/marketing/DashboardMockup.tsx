import { motion } from 'framer-motion'
import { BarChart3, Bell, LayoutGrid, LineChart, Settings, Users } from 'lucide-react'

export function DashboardMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative mx-auto w-full max-w-lg"
    >
      <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-blue-500/20 via-violet-500/15 to-fuchsia-500/20 blur-2xl" />
      <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-slate-950/60 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <div className="flex items-center gap-2 text-sm font-medium text-white/90">
            <LayoutGrid className="h-4 w-4 text-blue-400" />
            Operasyon paneli
          </div>
          <div className="flex items-center gap-2 text-white/60">
            <Bell className="h-4 w-4" />
            <Settings className="h-4 w-4" />
          </div>
        </div>
        <div className="grid gap-3 p-4 md:grid-cols-3">
          {[
            { label: 'Aktif kullanıcı', value: '12.4K', icon: Users, tone: 'text-emerald-400' },
            { label: 'Dönüşüm', value: '%3.8', icon: LineChart, tone: 'text-blue-400' },
            { label: 'Gelir (30g)', value: '₺1.2M', icon: BarChart3, tone: 'text-violet-400' },
          ].map((k) => (
            <div
              key={k.label}
              className="rounded-xl border border-white/10 bg-white/[0.04] p-3"
            >
              <div className="mb-2 flex items-center justify-between text-xs text-white/55">
                <span>{k.label}</span>
                <k.icon className={`h-4 w-4 ${k.tone}`} />
              </div>
              <div className="text-lg font-semibold text-white">{k.value}</div>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-blue-500 to-violet-500" />
              </div>
            </div>
          ))}
        </div>
        <div className="grid gap-3 px-4 pb-4 md:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-4">
            <div className="mb-3 text-sm font-medium text-white/85">Canlı aktivite</div>
            <div className="space-y-2">
              {['Yeni sipariş · Masa 12', 'Rezervasyon onayı · Suit', 'Stok uyarısı · Depo B'].map(
                (row) => (
                  <div
                    key={row}
                    className="rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-xs text-white/75"
                  >
                    {row}
                  </div>
                ),
              )}
            </div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
            <div className="mb-3 flex items-center justify-between text-sm font-medium text-white/85">
              <span>Performans</span>
              <span className="text-xs text-emerald-300">Stabil</span>
            </div>
            <div className="h-28 w-full rounded-lg bg-[linear-gradient(180deg,rgba(59,130,246,0.35),rgba(139,92,246,0.15))] p-2">
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
