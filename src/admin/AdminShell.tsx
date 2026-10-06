import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  AppWindow,
  Settings,
  Shield,
  LogOut,
  Kanban,
  Home,
  HelpCircle,
  Mail,
  LifeBuoy,
  ScrollText,
} from 'lucide-react'
import { useAdminAuth } from './AdminAuthContext'
import { clsx } from 'clsx'

const nav = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/content/homepage', label: 'Homepage', icon: Home },
  { to: '/leads', label: 'Leads / CRM', icon: Users },
  { to: '/leads/pipeline', label: 'Pipeline', icon: Kanban },
  { to: '/messages', label: 'Messages', icon: Mail },
  { to: '/support/tickets', label: 'Tickets', icon: LifeBuoy },
  { to: '/faq', label: 'FAQ', icon: HelpCircle },
  { to: '/applications', label: 'Applications', icon: AppWindow },
  { to: '/settings/company', label: 'Company & Contact', icon: Settings },
  { to: '/security', label: 'Security', icon: Shield },
  { to: '/security/audit-log', label: 'Audit Log', icon: ScrollText },
]

export function AdminShell({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAdminAuth()
  const location = useLocation()

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 shrink-0 border-r border-white/10 bg-slate-950/90 p-4 lg:block">
          <div className="mb-8 px-2">
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-400">LitxTech</p>
            <h1 className="text-lg font-semibold text-white">Admin Control</h1>
          </div>
          <nav className="space-y-1">
            {nav.map((item) => {
              const active = location.pathname === item.to
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={clsx(
                    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition',
                    active
                      ? 'bg-cyan-500/15 text-cyan-200'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white',
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex items-center justify-between border-b border-white/10 px-4 py-3 lg:px-8">
            <div>
              <p className="text-sm text-slate-400">Signed in</p>
              <p className="font-medium text-white">
                {user?.full_name || user?.email}{' '}
                <span className="ml-2 rounded bg-white/10 px-2 py-0.5 text-xs text-cyan-200">
                  {user?.role}
                </span>
              </p>
            </div>
            <button
              type="button"
              onClick={() => logout()}
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-3 py-2 text-sm text-slate-200 hover:bg-white/5"
            >
              <LogOut className="h-4 w-4" /> Logout
            </button>
          </header>
          <main className="flex-1 px-4 py-6 lg:px-8">{children}</main>
        </div>
      </div>
    </div>
  )
}
