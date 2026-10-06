import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Activity,
  AppWindow,
  Bell,
  FileText,
  HeartPulse,
  Home,
  Image,
  Kanban,
  LayoutDashboard,
  LifeBuoy,
  LogOut,
  Mail,
  Menu,
  MessageCircle,
  Newspaper,
  ScrollText,
  Search,
  Settings,
  Shield,
  Users,
  X,
} from 'lucide-react'
import { useAdminAuth } from './AdminAuthContext'
import { CommandPalette } from './CommandPalette'
import { adminApi } from '@/lib/adminApi'
import { clsx } from 'clsx'

const groups = [
  {
    label: 'Dashboard',
    items: [{ to: '/dashboard', label: 'Genel bakış', icon: LayoutDashboard }],
  },
  {
    label: 'İçerik',
    items: [
      { to: '/content/homepage', label: 'Ana sayfa', icon: Home },
      { to: '/content/pages', label: 'Sayfalar', icon: FileText },
      { to: '/content/services', label: 'Hizmetler', icon: AppWindow },
      { to: '/applications', label: 'Projeler', icon: AppWindow },
      { to: '/content/feed', label: 'Feed', icon: Newspaper },
      { to: '/content/media', label: 'Medya', icon: Image },
      { to: '/faq', label: 'SSS', icon: FileText },
    ],
  },
  {
    label: 'Müşteriler',
    items: [
      { to: '/leads', label: 'Leads', icon: Users },
      { to: '/leads/pipeline', label: 'Pipeline', icon: Kanban },
      { to: '/messages', label: 'Mesajlar', icon: Mail },
      { to: '/customers/users', label: 'Kullanıcılar', icon: Users },
    ],
  },
  {
    label: 'Destek',
    items: [
      { to: '/support/chat', label: 'Canlı destek', icon: MessageCircle },
      { to: '/support/tickets', label: 'Talepler', icon: LifeBuoy },
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
      { to: '/marketing/ctas', label: 'CTA', icon: Search },
    ],
  },
  {
    label: 'Ayarlar',
    items: [
      { to: '/settings/company', label: 'Şirket ve WhatsApp', icon: Settings },
      { to: '/settings/email', label: 'E-posta', icon: Mail },
      { to: '/settings/navigation', label: 'Menü', icon: FileText },
    ],
  },
  {
    label: 'Sistem',
    items: [
      { to: '/system/notifications', label: 'Bildirimler', icon: Bell },
      { to: '/system/roles', label: 'Roller', icon: Shield },
      { to: '/security/audit-log', label: 'Audit log', icon: ScrollText },
      { to: '/system/health', label: 'Sistem sağlığı', icon: HeartPulse },
      { to: '/system/errors', label: 'Hatalar', icon: Activity },
    ],
  },
]

export function AdminShell({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAdminAuth()
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const [unread, setUnread] = useState(0)

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const load = () =>
      adminApi
        .platform('notifications')
        .then((d) => setUnread((d.items || []).filter((n: { read_at?: string }) => !n.read_at).length))
        .catch(() => setUnread(0))
    load()
    const t = window.setInterval(load, 15000)
    return () => window.clearInterval(t)
  }, [])

  const nav = (
    <nav className="space-y-5">
      {groups.map((group) => (
        <div key={group.label}>
          {!collapsed && (
            <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
              {group.label}
            </p>
          )}
          <div className="space-y-1">
            {group.items.map((item) => {
              const active = location.pathname === item.to
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  title={item.label}
                  className={clsx(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition',
                    active ? 'bg-white text-slate-950' : 'text-slate-300 hover:bg-white/5 hover:text-white',
                  )}
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              )
            })}
          </div>
        </div>
      ))}
    </nav>
  )

  return (
    <div className="min-h-screen bg-[#0b0d12] text-slate-100">
      <CommandPalette />
      <div className="flex min-h-screen">
        <aside
          className={clsx(
            'hidden shrink-0 border-r border-white/10 bg-[#0b0d12] p-4 lg:block',
            collapsed ? 'w-[4.5rem]' : 'w-64',
          )}
        >
          <div className="mb-6 flex items-center justify-between px-2">
            {!collapsed && (
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">LitxTech</p>
                <h1 className="text-base font-semibold text-white">Operasyon</h1>
              </div>
            )}
            <button
              type="button"
              className="rounded-md border border-white/10 p-1.5 text-slate-300"
              onClick={() => setCollapsed((v) => !v)}
              aria-label="Menüyü daralt"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
          {nav}
        </aside>

        {open && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <button className="absolute inset-0 bg-black/60" aria-label="Kapat" onClick={() => setOpen(false)} />
            <aside className="relative h-full w-72 overflow-y-auto border-r border-white/10 bg-[#0b0d12] p-4">
              <div className="mb-4 flex items-center justify-between">
                <p className="font-semibold">LitxTech</p>
                <button type="button" onClick={() => setOpen(false)} aria-label="Kapat">
                  <X className="h-5 w-5" />
                </button>
              </div>
              {nav}
            </aside>
          </div>
        )}

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3 lg:px-8">
            <button type="button" className="rounded-md border border-white/10 p-2 lg:hidden" onClick={() => setOpen(true)} aria-label="Menü">
              <Menu className="h-4 w-4" />
            </button>
            <div className="min-w-0">
              <p className="truncate text-sm text-slate-400">Oturum açık</p>
              <p className="truncate font-medium text-white">
                {user?.full_name || user?.email}
                <span className="ml-2 rounded bg-white/10 px-2 py-0.5 text-xs text-slate-200">{user?.role}</span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => window.dispatchEvent(new Event('ltx-command'))}
                className="hidden rounded-lg border border-white/10 px-3 py-2 text-xs text-slate-300 md:inline"
              >
                Ctrl K
              </button>
              <Link to="/system/notifications" className="relative rounded-lg border border-white/10 px-3 py-2 text-sm">
                <Bell className="h-4 w-4" />
                {unread > 0 && (
                  <span className="absolute -right-1 -top-1 rounded-full bg-white px-1.5 text-[10px] font-semibold text-slate-950">
                    {unread}
                  </span>
                )}
              </Link>
              <button
                type="button"
                onClick={() => logout()}
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-3 py-2 text-sm text-slate-200 hover:bg-white/5"
              >
                <LogOut className="h-4 w-4" /> <span className="hidden sm:inline">Çıkış</span>
              </button>
            </div>
          </header>
          <main className="flex-1 px-4 py-6 lg:px-8">{children}</main>
        </div>
      </div>
    </div>
  )
}
