import { useEffect } from 'react'

/**
 * Legacy route /admin/login — redirects to dedicated admin domain.
 * Hardcoded password login REMOVED for security.
 */
export function AdminLogin() {
  useEffect(() => {
    const target =
      window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? '/login?admin=1'
        : 'https://admin.litxtech.com/login'
    window.location.replace(target)
  }, [])

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-200">
      Redirecting to secure admin login…
    </div>
  )
}
