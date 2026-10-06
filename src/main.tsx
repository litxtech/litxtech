import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App.tsx'
import { AdminApp } from './admin/AdminApp'
import { CompanySettingsProvider } from './contexts/CompanySettingsContext'
import { UserAuthProvider } from './contexts/UserAuthContext'
import './index.css'

const queryClient = new QueryClient()

function isAdminHost() {
  if (typeof window === 'undefined') return false
  const host = window.location.hostname
  if (host === 'admin.litxtech.com' || host.startsWith('admin.')) return true
  // Local admin testing: persist across client navigations
  if (new URLSearchParams(window.location.search).get('admin') === '1') {
    sessionStorage.setItem('ltx_admin_mode', '1')
    return true
  }
  if (sessionStorage.getItem('ltx_admin_mode') === '1') return true
  return false
}

const adminMode = isAdminHost()
const Root = adminMode ? <AdminApp /> : <App />

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
        {adminMode ? (
          Root
        ) : (
          <UserAuthProvider>
            <CompanySettingsProvider>{Root}</CompanySettingsProvider>
          </UserAuthProvider>
        )}
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
)
