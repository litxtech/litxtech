import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { Session, User } from '@supabase/supabase-js'
import { supabase, userAuth } from '@/lib/supabase'
import { trackEvent } from '@/lib/publicCms'

type AuthState = {
  user: User | null
  session: Session | null
  loading: boolean
  signOut: () => Promise<void>
}

const UserAuthContext = createContext<AuthState>({
  user: null,
  session: null,
  loading: true,
  signOut: async () => {},
})

async function pingPresence(token: string, status: 'online' | 'offline') {
  try {
    await fetch('/api/public/presence', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        status,
        device: navigator.userAgent,
      }),
    })
  } catch {
    // presence is best-effort
  }
}

export function UserAuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!supabase) {
      setLoading(false)
      return
    }

    let alive = true
    supabase.auth.getSession().then(({ data }) => {
      if (!alive) return
      setSession((current) => current ?? data.session ?? null)
      setLoading(false)
      if (data.session?.access_token) void pingPresence(data.session.access_token, 'online')
    })

    const { data: sub } = supabase.auth.onAuthStateChange((event, next) => {
      setSession(next)
      setLoading(false)
      if (event === 'SIGNED_IN' && next?.access_token) {
        void trackEvent('login', window.location.pathname)
        void pingPresence(next.access_token, 'online')
      }
      if (event === 'SIGNED_OUT') {
        void trackEvent('logout', window.location.pathname)
      }
      if (event === 'TOKEN_REFRESHED' && next?.access_token) {
        void pingPresence(next.access_token, 'online')
      }
    })

    return () => {
      alive = false
      sub.subscription.unsubscribe()
    }
  }, [])

  const value = useMemo<AuthState>(
    () => ({
      user: session?.user ?? null,
      session,
      loading,
      signOut: async () => {
        if (session?.access_token) await pingPresence(session.access_token, 'offline')
        await userAuth.signOut()
        setSession(null)
      },
    }),
    [session, loading],
  )

  return <UserAuthContext.Provider value={value}>{children}</UserAuthContext.Provider>
}

export function useUserAuth() {
  return useContext(UserAuthContext)
}
