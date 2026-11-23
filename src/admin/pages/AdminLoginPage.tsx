import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { ArrowRight, Lock, Mail, ShieldCheck, Sparkles } from 'lucide-react'
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
      if (signError || !data.session) throw new Error('E-posta veya şifre hatalı')

      const session = await adminApi.createSession(data.session.access_token)
      setUser(session.user)
      await supabase.auth.signOut({ scope: 'local' })
      navigate('/dashboard', { replace: true })
    } catch (err: any) {
      setError(err?.message || 'Giriş başarısız')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#070a11] px-4 text-slate-100">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-[-10%] h-[28rem] w-[28rem] rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute -right-24 bottom-[-10%] h-[26rem] w-[26rem] rounded-full bg-indigo-500/10 blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.04),transparent_55%)]" />
      </div>

      <div className="relative w-full max-w-[26rem]">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 via-sky-500 to-indigo-500 shadow-[0_12px_30px_-12px_rgba(56,189,248,0.9)]">
            <Sparkles className="h-5 w-5 text-slate-950" strokeWidth={2.4} />
          </span>
          <div>
            <p className="text-[15px] font-semibold leading-tight text-white">LitxTech</p>
            <p className="text-[10.5px] uppercase tracking-[0.2em] text-slate-500">Control Center</p>
          </div>
        </div>

        <div className="rounded-3xl border border-white/[0.08] bg-white/[0.028] p-7 shadow-[0_40px_100px_-40px_rgba(0,0,0,0.95)] backdrop-blur-xl">
          <h1 className="text-[22px] font-semibold tracking-tight text-white">Yönetici girişi</h1>
          <p className="mt-1.5 text-[12.5px] leading-relaxed text-slate-400">
            Panele erişim yalnızca yetkili hesaplara açıktır. Oturum sunucu tarafında HttpOnly çerez ile korunur.
          </p>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-[12px] font-medium text-slate-300">E-posta</span>
              <span className="relative block">
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  type="email"
                  required
                  autoComplete="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@litxtech.com"
                  className="w-full rounded-xl border border-white/10 bg-[#0a0e17] py-3 pl-10 pr-3.5 text-[13.5px] text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/15"
                />
              </span>
            </label>

            <label className="block">
              <span className="mb-1.5 block text-[12px] font-medium text-slate-300">Şifre</span>
              <span className="relative block">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-white/10 bg-[#0a0e17] py-3 pl-10 pr-3.5 text-[13.5px] text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/15"
                />
              </span>
            </label>

            {error && (
              <p className="rounded-xl border border-rose-400/25 bg-rose-500/[0.08] px-3.5 py-2.5 text-[12px] text-rose-200">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={busy}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-500 px-4 py-3 text-[13.5px] font-semibold text-slate-950 shadow-[0_16px_40px_-18px_rgba(34,211,238,0.8)] transition hover:from-cyan-300 hover:to-sky-400 disabled:opacity-60"
            >
              {busy ? 'Giriş yapılıyor…' : 'Giriş yap'}
              {!busy && <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />}
            </button>
          </form>

          <div className="mt-5 flex items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.02] px-3 py-2.5 text-[11px] text-slate-500">
            <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-emerald-300" />
            Oturum bilgileri tarayıcıda saklanmaz; sunucu tarafında doğrulanır.
          </div>
        </div>

        <p className="mt-5 text-center text-[11px] text-slate-600">LitxTech LLC · Operasyon paneli</p>
      </div>
    </div>
  )
}
