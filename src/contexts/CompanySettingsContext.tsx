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
    fetchCompanySettings().then((s) => {
      if (alive) setSettings(s)
    })
    return () => {
      alive = false
    }
  }, [])

  return (
    <CompanySettingsContext.Provider value={settings}>{children}</CompanySettingsContext.Provider>
  )
}

export function useCompanySettings() {
  return useContext(CompanySettingsContext)
}
