import { createContext, useContext, useEffect, useState } from 'react'
import {
  fallbackCompanySettings,
  fetchCompanySettings,
  type PublicCompanySettings,
} from '@/lib/publicCms'

const CompanySettingsContext = createContext<PublicCompanySettings>(fallbackCompanySettings())

export function CompanySettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<PublicCompanySettings>(fallbackCompanySettings())

  useEffect(() => {
    let alive = true
    const load = () => {
      fetchCompanySettings().then((s) => {
        if (alive) setSettings(s)
      })
    }
    load()
    const timer = window.setInterval(load, 20000)
    window.addEventListener('focus', load)
    return () => {
      alive = false
      window.clearInterval(timer)
      window.removeEventListener('focus', load)
    }
  }, [])

  return (
    <CompanySettingsContext.Provider value={settings}>{children}</CompanySettingsContext.Provider>
  )
}

export function useCompanySettings() {
  return useContext(CompanySettingsContext)
}
