import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Shield } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { adminApi } from '@/lib/adminApi'
import { useAdminAuth } from '../AdminAuthContext'

export function AdminLoginPage() {
  const { user, setUser, loading } = useAdminAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  if (!loading && user) return <Navigate to="/dashboard" replace />

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setBusy(true)
    try {
      if (!supabase) throw new Error('Auth not configured')
      const { data, error: signError } = await supabase.auth.signInWithPassword({ email, password })
      if (signError || !data.session) throw new Error('Invalid credentials')

      const session = await adminApi.createSession(data.session.access_token)
      setUser(session.user)
      // Clear client auth storage preference: admin uses HTTP-only cookie
      await supabase.auth.signOut({ scope: 'local' })
      navigate('/dashboard', { replace: true })
    } catch (err: any) {
      setError(err?.message || 'Login failed')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/20">
            <Shield className="h-7 w-7 text-cyan-300" />
          </div>
          <h1 className="text-2xl font-bold text-white">LitxTech Admin</h1>
          <p className="mt-2 text-sm text-slate-400">Secure administrator access only</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm text-slate-300">Email</label>
            <input
              type="email"
              required
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-white/15 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-slate-300">Password</label>
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-white/15 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
            />
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-xl bg-cyan-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:opacity-60"
          >
            {busy ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}
