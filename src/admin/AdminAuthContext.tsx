import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { adminApi, type AdminUser } from '@/lib/adminApi'

type Ctx = {
  user: AdminUser | null
  loading: boolean
  refresh: () => Promise<void>
  logout: () => Promise<void>
  setUser: (u: AdminUser | null) => void
}

const AdminAuthContext = createContext<Ctx | null>(null)

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null)
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    try {
      const data = await adminApi.me()
      setUser(data.user)
    } catch {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  const logout = async () => {
    try {
      await adminApi.logout()
    } finally {
      setUser(null)
    }
  }

  return (
    <AdminAuthContext.Provider value={{ user, loading, refresh, logout, setUser }}>
      {children}
    </AdminAuthContext.Provider>
  )
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext)
  if (!ctx) throw new Error('useAdminAuth outside provider')
  return ctx
}
