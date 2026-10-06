import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, useLocation } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App.tsx'
import { AdminApp } from './admin/AdminApp'
import { CompanySettingsProvider } from './contexts/CompanySettingsContext'
import { UserAuthProvider } from './contexts/UserAuthContext'
import './index.css'

const queryClient = new QueryClient()

const ADMIN_PREFIXES = [
  '/dashboard',
  '/leads',
  '/content',
  '/customers',
  '/analytics',
  '/marketing',
  '/settings',
  '/system',
  '/faq',
  '/applications',
  '/messages',
  '/security',
  '/support/chat',
  '/support/tickets',
]

export function isAdminLocation(pathname: string, search: string) {
  if (typeof window !== 'undefined') {
    const host = window.location.hostname
    if (host === 'admin.litxtech.com' || host.startsWith('admin.')) return true
  }
  if (new URLSearchParams(search).get('admin') === '1') return true
  const path = pathname.replace(/\/$/, '') || '/'
  return ADMIN_PREFIXES.some((prefix) => path === prefix || path.startsWith(`${prefix}/`))
}

function RootSwitch() {
  const location = useLocation()
  if (isAdminLocation(location.pathname, location.search)) return <AdminApp />
  return (
    <UserAuthProvider>
      <CompanySettingsProvider>
        <App />
      </CompanySettingsProvider>
    </UserAuthProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
        <RootSwitch />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
)
