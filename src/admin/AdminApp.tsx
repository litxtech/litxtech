import { Navigate, Route, Routes } from 'react-router-dom'
import { AdminAuthProvider, useAdminAuth } from './AdminAuthContext'
import { AdminShell } from './AdminShell'
import { AdminLoginPage } from './pages/AdminLoginPage'
import { AdminDashboardPage } from './pages/AdminDashboardPage'
import { AdminLeadsPage } from './pages/AdminLeadsPage'
import { AdminSettingsPage } from './pages/AdminSettingsPage'
import { AdminApplicationsPage } from './pages/AdminApplicationsPage'
import { AdminSecurityPage } from './pages/AdminSecurityPage'
import { AdminHomepagePage } from './pages/AdminHomepagePage'
import { AdminFaqsPage } from './pages/AdminFaqsPage'
import { AdminMessagesPage } from './pages/AdminMessagesPage'
import { AdminTicketsPage } from './pages/AdminTicketsPage'
import { AdminAuditPage } from './pages/AdminAuditPage'
import { useEffect } from 'react'

function Guard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAdminAuth()
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-200">
        Oturum kontrol ediliyor…
      </div>
    )
  }
  if (!user) return <Navigate to="/login" replace />
  return <>{children}</>
}

export function AdminApp() {
  useEffect(() => {
    document.title = 'LitxTech Admin'
    let robots = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null
    if (!robots) {
      robots = document.createElement('meta')
      robots.setAttribute('name', 'robots')
      document.head.appendChild(robots)
    }
    robots.setAttribute('content', 'noindex, nofollow, noarchive')
  }, [])

  return (
    <AdminAuthProvider>
      <Routes>
        <Route path="/login" element={<AdminLoginPage />} />
        <Route
          path="/*"
          element={
            <Guard>
              <AdminShell>
                <Routes>
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  <Route path="/dashboard" element={<AdminDashboardPage />} />
                  <Route path="/content/homepage" element={<AdminHomepagePage />} />
                  <Route path="/leads" element={<AdminLeadsPage />} />
                  <Route path="/leads/pipeline" element={<AdminLeadsPage />} />
                  <Route path="/messages" element={<AdminMessagesPage />} />
                  <Route path="/support/tickets" element={<AdminTicketsPage />} />
                  <Route path="/faq" element={<AdminFaqsPage />} />
                  <Route path="/applications" element={<AdminApplicationsPage />} />
                  <Route path="/settings/company" element={<AdminSettingsPage />} />
                  <Route path="/settings/contact" element={<AdminSettingsPage />} />
                  <Route path="/security" element={<AdminSecurityPage />} />
                  <Route path="/security/audit-log" element={<AdminAuditPage />} />
                  <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
              </AdminShell>
            </Guard>
          }
        />
      </Routes>
    </AdminAuthProvider>
  )
}
