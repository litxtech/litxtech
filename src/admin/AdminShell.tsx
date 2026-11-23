import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Activity,
  AppWindow,
  Bell,
  ChevronRight,
  FileText,
  HeartPulse,
  Home,
  Image as ImageIcon,
  Kanban,
  LayoutDashboard,
  LifeBuoy,
  LogOut,
  Mail,
  Menu,
  MessageCircle,
  Newspaper,
  Search,
  Settings,
  Shield,
  ScrollText,
  Sparkles,
  Users,
  X,
} from 'lucide-react'
import { useAdminAuth } from './AdminAuthContext'
import { CommandPalette } from './CommandPalette'
import { AdminLiveDock, AdminLiveProvider, LivePill, useAdminLive } from './AdminLive'
import { ToastProvider, cx } from './ui'

type NavItem = {
  to: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  badge?: 'leads' | 'messages' | 'chat' | 'tickets' | 'signups'
}

const groups: { label: string; items: NavItem[] }[] = [
  {
    label: 'Panel',
    items: [{ to: '/dashboard', label: 'Genel bakış', icon: LayoutDashboard }],
  },
  {
    label: 'İçerik',
    items: [
      { to: '/content/homepage', label: 'Ana sayfa', icon: Home },
      { to: '/content/pages', label: 'Sayfalar', icon: FileText },
      { to: '/content/services', label: 'Hizmetler', icon: AppWindow },
      { to: '/applications', label: 'Projeler', icon: Sparkles },
      { to: '/content/feed', label: 'Feed', icon: Newspaper },
      { to: '/content/media', label: 'Medya', icon: ImageIcon },
      { to: '/faq', label: 'SSS', icon: FileText },
    ],
  },
  {
    label: 'Müşteriler',
    items: [
      { to: '/leads', label: 'Lead’ler', icon: Users, badge: 'leads' },
      { to: '/leads/pipeline', label: 'Pipeline', icon: Kanban },
      { to: '/messages', label: 'Mesajlar', icon: Mail, badge: 'messages' },
      { to: '/customers/users', label: 'Kullanıcılar', icon: Users, badge: 'signups' },
    ],
  },
  {
    label: 'Destek',
    items: [
      { to: '/support/chat', label: 'Canlı destek', icon: MessageCircle, badge: 'chat' },
      { to: '/support/tickets', label: 'Talepler', icon: LifeBuoy, badge: 'tickets' },
    ],
  },
  {
    label: 'Analitik',
    items: [{ to: '/analytics', label: 'Trafik ve olaylar', icon: Activity }],
  },
  {
    label: 'Pazarlama',
    items: [
      { to: '/marketing/seo', label: 'SEO', icon: Search },
      { to: '/marketing/ctas', label: 'CTA', icon: Sparkles },
    ],
  },
  {
    label: 'Ayarlar',
    items: [
      { to: '/settings/company', label: 'Şirket bilgileri', icon: Settings },
      { to: '/settings/email', label: 'E-posta', icon: Mail },
      { to: '/settings/navigation', label: 'Menü', icon: FileText },
    ],
  },
  {
    label: 'Sistem',
    items: [
      { to: '/system/notifications', label: 'Bildirimler', icon: Bell },
      { to: '/system/roles', label: 'Roller', icon: Shield },
      { to: '/security/audit-log', label: 'Denetim kaydı', icon: ScrollText },
      { to: '/system/health', label: 'Sistem sağlığı', icon: HeartPulse },
      { to: '/system/errors', label: 'Hatalar', icon: Activity },
    ],
  },
]

const ALL_ITEMS = groups.flatMap((group) => group.items)

function useActivePath() {
  const { pathname } = useLocation()
  return useMemo(() => {
    const sorted = [...ALL_ITEMS].sort((a, b) => b.to.length - a.to.length)
    return sorted.find((item) => pathname === item.to || pathname.startsWith(`${item.to}/`))?.to || pathname
  }, [pathname])
}

function BrandMark() {
  return (
    <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 via-sky-500 to-indigo-500 shadow-[0_8px_24px_-10px_rgba(56,189,248,0.9)]">
      <Activity className="h-4 w-4 text-slate-950" strokeWidth={2.6} />
    </span>
  )
}

function NavList({ collapsed, onNavigate }: { collapsed?: boolean; onNavigate?: () => void }) {
  const active = useActivePath()
  const { counts } = useAdminLive()

  const badgeValue = (badge?: NavItem['badge']) => {
    if (!badge) return 0
    if (badge === 'leads') return counts.new_leads
    if (badge === 'messages') return counts.new_messages
    if (badge === 'chat') return counts.unread_chat
    if (badge === 'tickets') return counts.open_tickets
    return counts.signups_today
  }

  return (
    <nav className="space-y-6">
      {groups.map((group) => (
        <div key={group.label}>
          {!collapsed && (
            <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-600">
              {group.label}
            </p>
          )}
          <div className="space-y-0.5">
            {group.items.map((item) => {
              const isActive = active === item.to
              const count = badgeValue(item.badge)
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  title={item.label}
                  onClick={onNavigate}
                  className={cx(
                    'group relative flex items-center gap-3 rounded-xl px-3 py-2 text-[13px] font-medium transition',
                    isActive
                      ? 'bg-gradient-to-r from-cyan-400/[0.14] to-indigo-500/[0.06] text-white'
                      : 'text-slate-400 hover:bg-white/[0.045] hover:text-slate-100',
                    collapsed && 'justify-center px-0',
                  )}
                >
                  {isActive && (
                    <span className="absolute left-0 top-1/2 h-5 w-[2px] -translate-y-1/2 rounded-r bg-gradient-to-b from-cyan-300 to-sky-500" />
                  )}
                  <item.icon
                    className={cx(
                      'h-4 w-4 shrink-0 transition',
                      isActive ? 'text-cyan-300' : 'text-slate-500 group-hover:text-slate-300',
                    )}
                  />
                  {!collapsed && <span className="flex-1 truncate">{item.label}</span>}
                  {!collapsed && count > 0 && (
                    <span
                      className={cx(
                        'rounded-full px-1.5 py-0.5 text-[10px] font-bold tabular-nums',
                        item.badge === 'signups'
                          ? 'bg-rose-400/15 text-rose-200'
                          : 'bg-cyan-400/15 text-cyan-200',
                      )}
                    >
                      {count > 99 ? '99+' : count}
                    </span>
                  )}
                </Link>
              )
            })}
          </div>
        </div>
      ))}
    </nav>
  )
}

function TopBar({ onMenu }: { onMenu: () => void }) {
  const { user, logout } = useAdminAuth()
  const active = useActivePath()
  const current = ALL_ITEMS.find((item) => item.to === active)
  const { counts } = useAdminLive()

  return (
    <header className="sticky top-0 z-30 border-b border-white/[0.06] bg-[#070a11]/85 backdrop-blur-xl">
      <div className="flex items-center gap-3 px-4 py-3 lg:px-8">
        <button
          type="button"
          className="rounded-lg border border-white/10 p-2 text-slate-300 lg:hidden"
          onClick={onMenu}
          aria-label="Menü"
        >
          <Menu className="h-4 w-4" />
        </button>

        <div className="hidden min-w-0 items-center gap-2 text-[12.5px] text-slate-500 sm:flex">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            LitxTech Operasyon
          </span>
          <ChevronRight className="h-3.5 w-3.5 text-slate-700" />
          <span className="truncate font-medium text-slate-200">{current?.label || 'Panel'}</span>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event('ltx-command'))}
            className="group hidden items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-[12px] text-slate-400 transition hover:border-white/20 hover:text-slate-200 md:inline-flex"
          >
            <Search className="h-3.5 w-3.5" />
            <span>Ara</span>
            <kbd className="rounded border border-white/10 bg-black/30 px-1.5 py-0.5 text-[10px] text-slate-500">
              Ctrl K
            </kbd>
          </button>

          <LivePill />

          <Link
            to="/system/notifications"
            className="relative rounded-xl border border-white/10 bg-white/[0.03] p-2.5 text-slate-300 transition hover:border-white/20 hover:text-white"
            aria-label="Bildirimler"
          >
            <Bell className="h-4 w-4" />
            {counts.total > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-cyan-400 px-1 text-[9.5px] font-bold text-slate-950">
                {counts.total > 99 ? '99+' : counts.total}
              </span>
            )}
          </Link>

          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] py-1 pl-1 pr-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-slate-200 to-slate-400 text-[11px] font-bold text-slate-900">
              {(user?.full_name || user?.email || 'A').slice(0, 1).toUpperCase()}
            </span>
            <div className="hidden leading-tight lg:block">
              <p className="max-w-[9rem] truncate text-[12px] font-medium text-white">{user?.full_name || user?.email}</p>
              <p className="text-[10px] uppercase tracking-wide text-slate-500">{user?.role}</p>
            </div>
            <button
              type="button"
              onClick={() => void logout()}
              className="ml-1 rounded-lg p-1.5 text-slate-400 transition hover:bg-white/5 hover:text-rose-300"
              aria-label="Çıkış"
              title="Çıkış"
            >
              <LogOut className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const { user } = useAdminAuth()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  return (
    <ToastProvider>
      <AdminLiveProvider>
        <div className="min-h-screen bg-[#070a11] text-slate-100 selection:bg-cyan-400/25">
          <CommandPalette />
          <div className="pointer-events-none fixed inset-x-0 top-0 h-72 bg-[radial-gradient(60%_120%_at_50%_-20%,rgba(56,189,248,0.12),transparent_70%)]" />

          <div className="relative flex min-h-screen">
            <aside
              className={cx(
                'sticky top-0 hidden h-screen shrink-0 flex-col border-r border-white/[0.06] bg-[#080c14]/80 backdrop-blur-xl lg:flex',
                collapsed ? 'w-[4.75rem]' : 'w-[15.5rem]',
              )}
            >
              <div className={cx('flex items-center gap-2.5 px-4 py-5', collapsed && 'justify-center px-0')}>
                <BrandMark />
                {!collapsed && (
                  <div className="min-w-0">
                    <p className="text-[13.5px] font-semibold leading-tight text-white">LitxTech</p>
                    <p className="text-[10.5px] uppercase tracking-[0.18em] text-slate-500">Control Center</p>
                  </div>
                )}
              </div>

              <div className="flex-1 overflow-y-auto px-2.5 pb-6 ltx-scroll">
                <NavList collapsed={collapsed} />
              </div>

              <div className="border-t border-white/[0.06] p-2.5">
                <button
                  type="button"
                  onClick={() => setCollapsed((value) => !value)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/[0.08] px-3 py-2 text-[11.5px] text-slate-400 transition hover:bg-white/[0.04] hover:text-slate-200"
                >
                  <ChevronRight className={cx('h-3.5 w-3.5 transition', collapsed ? '' : 'rotate-180')} />
                  {!collapsed && 'Daralt'}
                </button>
              </div>
            </aside>

            {open && (
              <div className="fixed inset-0 z-50 lg:hidden">
                <button
                  className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                  aria-label="Kapat"
                  onClick={() => setOpen(false)}
                />
                <aside className="ltx-dock-in relative h-full w-[16.5rem] overflow-y-auto border-r border-white/10 bg-[#080c14] p-3 ltx-scroll">
                  <div className="mb-4 flex items-center justify-between px-1">
                    <div className="flex items-center gap-2">
                      <BrandMark />
                      <p className="text-[13.5px] font-semibold text-white">LitxTech</p>
                    </div>
                    <button type="button" onClick={() => setOpen(false)} aria-label="Kapat" className="p-1 text-slate-400">
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  <NavList onNavigate={() => setOpen(false)} />
                </aside>
              </div>
            )}

            <div className="flex min-w-0 flex-1 flex-col">
              <TopBar onMenu={() => setOpen(true)} />
              <main className="ltx-admin-main flex-1 px-4 pb-24 pt-6 lg:px-8 lg:pt-8">
                <div className="mx-auto w-full max-w-[1320px]">{children}</div>
              </main>
              <footer className="border-t border-white/[0.05] px-4 py-4 text-[11px] text-slate-600 lg:px-8">
                <div className="mx-auto flex w-full max-w-[1320px] flex-wrap items-center justify-between gap-2">
                  <span>LitxTech LLC · Operasyon paneli</span>
                  <span className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    {user?.email}
                  </span>
                </div>
              </footer>
            </div>
          </div>

          <AdminLiveDock />
        </div>
      </AdminLiveProvider>
    </ToastProvider>
  )
}
