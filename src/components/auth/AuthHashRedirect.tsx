import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { getAuthUrlParams, markPasswordRecovery } from '@/lib/authRedirect'

/**
 * Catches Supabase email links that land on `/` (Site URL) with
 * `#access_token=...&type=recovery` and routes to the new-password screen.
 */
export function AuthHashRedirect() {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!supabase) return

    const { type, accessToken, code, error } = getAuthUrlParams()
    if (error) return

    const sendToReset = () => {
      markPasswordRecovery()
      const hash = window.location.hash || ''
      if (location.pathname !== '/auth/reset-password') {
        navigate(`/auth/reset-password${hash}`, { replace: true })
      }
    }

    if (type === 'recovery' || (accessToken && type === 'recovery')) {
      sendToReset()
      return
    }

    // PKCE: recovery links may hit Site URL with ?code=
    if (code && (type === 'recovery' || location.pathname === '/' || location.pathname === '')) {
      // Let supabase exchange the code, then check event
      void supabase.auth.getSession().then(({ data }) => {
        if (data.session && type === 'recovery') sendToReset()
      })
    }

    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        sendToReset()
      }
    })

    return () => sub.subscription.unsubscribe()
  }, [navigate, location.pathname])

  return null
}
