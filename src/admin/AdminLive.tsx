import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Activity,
  BellRing,
  CircleDot,
  LifeBuoy,
  Mail,
  MessageCircle,
  Sparkles,
  UserPlus,
  Users,
  X,
} from 'lucide-react'
import { adminApi } from '@/lib/adminApi'
import { Badge, Dot, cx, timeAgo, useToast } from './ui'

export type LiveItem = {
  key: string
  id: string
  type: 'lead' | 'message' | 'chat' | 'ticket' | 'signup' | 'application' | string
  title: string
  subtitle?: string
  created_at: string
  href: string
  label: string
  tone: string
  unread?: boolean
}

export type LiveCounts = {
  new_leads: number
  new_messages: number
  unread_chat: number
  open_tickets: number
  signups_today: number
  total: number
}

const EMPTY: LiveCounts = {
  new_leads: 0,
  new_messages: 0,
  unread_chat: 0,
  open_tickets: 0,
  signups_today: 0,
  total: 0,
}

const ICONS: Record<string, React.ReactNode> = {
  lead: <Users className="h-3.5 w-3.5" />,
  message: <Mail className="h-3.5 w-3.5" />,
  chat: <MessageCircle className="h-3.5 w-3.5" />,
  ticket: <LifeBuoy className="h-3.5 w-3.5" />,
  signup: <UserPlus className="h-3.5 w-3.5" />,
  application: <Sparkles className="h-3.5 w-3.5" />,
}

const TONES: Record<string, string> = {
  amber: 'bg-amber-400/10 text-amber-300 ring-amber-400/20',
  sky: 'bg-sky-400/10 text-sky-300 ring-sky-400/20',
  emerald: 'bg-emerald-400/10 text-emerald-300 ring-emerald-400/20',
  violet: 'bg-violet-400/10 text-violet-300 ring-violet-400/20',
  rose: 'bg-rose-400/10 text-rose-300 ring-rose-400/20',
  cyan: 'bg-cyan-400/10 text-cyan-300 ring-cyan-400/20',
  slate: 'bg-white/[0.06] text-slate-300 ring-white/10',
}

type LiveCtx = {
  counts: LiveCounts
  items: LiveItem[]
  loading: boolean
  error: string
  lastSync: string | null
  unseen: number
  refresh: () => Promise<void>
  markSeen: () => void
  dockOpen: boolean
  setDockOpen: (open: boolean) => void
}

const Ctx = createContext<LiveCtx | null>(null)

export function AdminLiveProvider({ children }: { children: React.ReactNode }) {
  const { push } = useToast()
  const [counts, setCounts] = useState<LiveCounts>(EMPTY)
  const [items, setItems] = useState<LiveItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [lastSync, setLastSync] = useState<string | null>(null)
  const [unseen, setUnseen] = useState(0)
  const [dockOpen, setDockOpen] = useState(false)
  const seen = useRef<Set<string>>(new Set())
  const primed = useRef(false)

  const refresh = useCallback(async () => {
    try {
      const data = await adminApi.live(14)
      const next: LiveItem[] = Array.isArray(data.items) ? data.items : []
      setCounts({ ...EMPTY, ...(data.counts || {}) })
      setItems(next)
      setError('')
      setLastSync(data.server_time || new Date().toISOString())

      if (!primed.current) {
        primed.current = true
        next.forEach((row) => seen.current.add(row.key))
        setLoading(false)
        return
      }

      const fresh = next.filter((row) => !seen.current.has(row.key))
      next.forEach((row) => seen.current.add(row.key))
      if (seen.current.size > 600) {
        seen.current = new Set(next.map((row) => row.key))
      }
      if (fresh.length) {
        setUnseen((value) => value + fresh.length)
        fresh.slice(0, 3).forEach((row) => {
          push({
            tone: 'info',
            title: `${row.label}: ${row.title}`,
            body: row.subtitle?.slice(0, 90) || timeAgo(row.created_at),
          })
        })
        if (fresh.length > 3) {
          push({ tone: 'info', title: `+${fresh.length - 3} yeni hareket`, body: 'Canlı akışı açarak tümünü görün.' })
        }
      }
      setLoading(false)
    } catch (err: any) {
      setError(err?.message || 'Canlı akış alınamadı')
      setLoading(false)
    }
  }, [push])

  useEffect(() => {
    void refresh()
    const timer = window.setInterval(() => void refresh(), 12000)
    const onVisible = () => {
      if (document.visibilityState === 'visible') void refresh()
    }
    document.addEventListener('visibilitychange', onVisible)
    return () => {
      window.clearInterval(timer)
      document.removeEventListener('visibilitychange', onVisible)
    }
  }, [refresh])

  const markSeen = useCallback(() => setUnseen(0), [])

  const value = useMemo<LiveCtx>(
    () => ({ counts, items, loading, error, lastSync, unseen, refresh, markSeen, dockOpen, setDockOpen }),
    [counts, items, loading, error, lastSync, unseen, refresh, markSeen, dockOpen],
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useAdminLive() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useAdminLive outside AdminLiveProvider')
  return ctx
}

export function LivePill() {
  const { counts, setDockOpen, lastSync } = useAdminLive()
  return (
    <button
      type="button"
      onClick={() => setDockOpen(true)}
      className="group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-[12px] font-medium text-slate-300 transition hover:border-cyan-400/30 hover:bg-cyan-400/[0.06] hover:text-white"
      title={lastSync ? `Son eşitleme ${new Date(lastSync).toLocaleTimeString('tr-TR')}` : 'Canlı akış'}
    >
      <span className="relative flex h-2 w-2">
        <span className="ltx-live-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
      </span>
      <span className="hidden sm:inline">Canlı</span>
      {counts.total > 0 && (
        <span className="rounded-full bg-white/10 px-1.5 py-0.5 text-[10.5px] font-semibold text-white tabular-nums">
          {counts.total > 99 ? '99+' : counts.total}
        </span>
      )}
    </button>
  )
}

export function AdminLiveDock() {
  const { counts, items, setDockOpen, dockOpen, unseen, markSeen, loading, error, refresh, lastSync } = useAdminLive()

  const open = () => {
    setDockOpen(!dockOpen)
    if (!dockOpen) markSeen()
  }

  return (
    <div className="fixed bottom-5 right-4 z-[70] flex flex-col items-end gap-2 sm:bottom-6 sm:right-6">
      {dockOpen && (
        <div className="ltx-dock-in mb-1 w-[min(92vw,23rem)] overflow-hidden rounded-2xl border border-white/10 bg-[#080d16]/95 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.95)] backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-400/10 ring-1 ring-cyan-400/20">
                <Activity className="h-3.5 w-3.5 text-cyan-300" />
              </span>
              <div>
                <p className="text-[13px] font-semibold text-white">Canlı akış</p>
                <p className="text-[10.5px] text-slate-500">
                  {lastSync ? `Güncellendi ${timeAgo(lastSync)}` : 'Bağlanıyor…'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => void refresh()}
                className="rounded-lg px-2 py-1 text-[11px] text-slate-400 hover:bg-white/5 hover:text-white"
              >
                Yenile
              </button>
              <button
                type="button"
                aria-label="Kapat"
                onClick={() => setDockOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-white/5 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-px bg-white/[0.05]">
            {[
              ['Lead', counts.new_leads],
              ['Mesaj', counts.new_messages],
              ['Sohbet', counts.unread_chat],
              ['Talep', counts.open_tickets],
            ].map(([label, value]) => (
              <div key={String(label)} className="bg-[#080d16] px-2 py-2.5 text-center">
                <p className="text-[15px] font-semibold text-white tabular-nums">{value as number}</p>
                <p className="text-[10px] uppercase tracking-wide text-slate-500">{label}</p>
              </div>
            ))}
          </div>

          <div className="max-h-[20rem] overflow-y-auto p-2">
            {loading && !items.length && <p className="px-2 py-6 text-center text-[12px] text-slate-500">Yükleniyor…</p>}
            {error && <p className="px-2 py-3 text-[11.5px] text-rose-300">{error}</p>}
            {!loading && !items.length && !error && (
              <p className="px-2 py-6 text-center text-[12px] text-slate-500">Henüz hareket yok.</p>
            )}
            {items.slice(0, 12).map((row) => (
              <Link
                key={row.key}
                to={row.href}
                onClick={() => setDockOpen(false)}
                className="flex items-start gap-2.5 rounded-xl px-2 py-2.5 transition hover:bg-white/[0.05]"
              >
                <span
                  className={cx(
                    'mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ring-1',
                    TONES[row.tone] || TONES.slate,
                  )}
                >
                  {ICONS[row.type] || <CircleDot className="h-3.5 w-3.5" />}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-1.5">
                    <span className="truncate text-[12.5px] font-medium text-white">{row.title}</span>
                    {row.unread && <Dot tone="rose" />}
                  </span>
                  {row.subtitle && <span className="mt-0.5 block truncate text-[11px] text-slate-500">{row.subtitle}</span>}
                  <span className="mt-0.5 block text-[10.5px] text-slate-600">
                    {row.label} · {timeAgo(row.created_at)}
                  </span>
                </span>
              </Link>
            ))}
          </div>
          <div className="border-t border-white/[0.07] px-4 py-2.5">
            <Link
              to="/system/notifications"
              onClick={() => setDockOpen(false)}
              className="text-[11.5px] font-medium text-cyan-300 hover:text-cyan-200"
            >
              Tüm bildirimler →
            </Link>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={open}
        className="ltx-live-bubble relative flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-[#0b1220]/95 text-white shadow-[0_18px_45px_-15px_rgba(34,211,238,0.5)] backdrop-blur transition hover:scale-[1.04] hover:border-cyan-300/40"
        aria-label="Canlı bildirimleri aç"
      >
        <BellRing className="h-5 w-5 text-cyan-200" />
        {(counts.total > 0 || unseen > 0) && (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-gradient-to-br from-rose-400 to-rose-600 px-1 text-[10px] font-bold text-white ring-2 ring-[#0b1220] tabular-nums">
            {counts.total > 99 ? '99+' : counts.total || unseen}
          </span>
        )}
        {unseen > 0 && <span className="ltx-live-ping absolute inset-0 rounded-full ring-2 ring-cyan-400/50" />}
      </button>
    </div>
  )
}

export function LiveStatBubbles() {
  const { counts } = useAdminLive()
  const rows = [
    { label: 'Yeni lead', value: counts.new_leads, tone: 'amber' as const, href: '/leads' },
    { label: 'Okunmamış mesaj', value: counts.new_messages, tone: 'cyan' as const, href: '/messages' },
    { label: 'Canlı destek', value: counts.unread_chat, tone: 'emerald' as const, href: '/support/chat' },
    { label: 'Açık talep', value: counts.open_tickets, tone: 'violet' as const, href: '/support/tickets' },
    { label: 'Bugünkü üye', value: counts.signups_today, tone: 'rose' as const, href: '/customers/users' },
  ]
  return (
    <div className="flex flex-wrap items-center gap-2">
      {rows.map((row) => (
        <Link
          key={row.label}
          to={row.href}
          className={cx(
            'inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11.5px] font-medium transition hover:bg-white/[0.07]',
            row.value > 0
              ? 'border-cyan-400/25 bg-cyan-400/[0.07] text-white'
              : 'border-white/10 bg-white/[0.02] text-slate-400',
          )}
        >
          <Dot tone={row.tone} />
          {row.label}
          <Badge tone={row.value > 0 ? 'cyan' : 'slate'}>{row.value}</Badge>
        </Link>
      ))}
    </div>
  )
}
