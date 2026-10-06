import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { userAuth, supabase } from '../lib/supabase'
import { Lock, Mail, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react'
import { OtpCodeInput } from '@/components/auth/OtpCodeInput'
import { MarketingChrome } from '@/components/marketing/MarketingChrome'
import { openMyTrabzonDeepLink } from '../lib/utils'
import {
  clearPasswordRecovery,
  getAuthUrlParams,
  isPasswordRecoveryUrl,
  markPasswordRecovery,
} from '@/lib/authRedirect'

type Step = 'request' | 'verify' | 'update'

export function ResetPasswordPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState<Step>('request')
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [booting, setBooting] = useState(true)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('')

  const flash = (text: string, type: 'success' | 'error') => {
    setMessage(text)
    setMessageType(type)
  }

  // Handle magic-link / recovery redirect from email
  useEffect(() => {
    let mounted = true
    const client = supabase
    if (!client) {
      setBooting(false)
      flash('Kimlik doğrulama servisi kullanılamıyor.', 'error')
      return
    }

    const goUpdate = () => {
      if (!mounted) return
      markPasswordRecovery()
      setStep('update')
      flash('Bağlantı doğrulandı. Yeni şifrenizi yazın.', 'success')
      // Clean sensitive tokens from URL after session is established
      window.history.replaceState(null, '', '/auth/reset-password')
    }

    const boot = async () => {
      try {
        const { type, accessToken, code } = getAuthUrlParams()

        if (type === 'recovery' || isPasswordRecoveryUrl()) {
          markPasswordRecovery()
        }

        // Let Supabase parse hash / exchange PKCE code
        if (accessToken || code || type === 'recovery') {
          await new Promise((r) => setTimeout(r, 400))
          const { data } = await client.auth.getSession()
          if (data.session && (type === 'recovery' || isPasswordRecoveryUrl())) {
            goUpdate()
            return
          }
        }

        // Already in recovery session (navigated from AuthHashRedirect)
        if (isPasswordRecoveryUrl()) {
          const { data } = await client.auth.getSession()
          if (data.session) {
            goUpdate()
            return
          }
        }
      } finally {
        if (mounted) setBooting(false)
      }
    }

    const { data: sub } = client.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY' && session) {
        if (openMyTrabzonDeepLink('auth/reset-password', window.location.hash || '')) return
        goUpdate()
      }
    })

    void boot()
    return () => {
      mounted = false
      sub.subscription.unsubscribe()
    }
  }, [])

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      setMessage('')
      if (!email.trim()) {
        flash('Lütfen e-posta adresinizi girin', 'error')
        return
      }
      await userAuth.resetPassword(email.trim())
      setOtp('')
      setStep('verify')
      flash(
        'E-postanıza 6 haneli kod ve/veya sıfırlama bağlantısı gönderildi. Kodu buraya girebilir veya e-postadaki linke tıklayabilirsiniz.',
        'success',
      )
    } catch (err: any) {
      flash(err.message || 'Kod gönderilemedi. Lütfen tekrar deneyin.', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      setMessage('')
      await userAuth.verifyRecoveryOtp(email.trim(), otp)
      markPasswordRecovery()
      setStep('update')
      flash('Kod doğrulandı. Yeni şifrenizi belirleyin.', 'success')
    } catch (err: any) {
      flash(err.message || 'Kod geçersiz veya süresi dolmuş.', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    try {
      setLoading(true)
      setMessage('')
      await userAuth.resetPassword(email.trim())
      flash('Yeni kod / bağlantı gönderildi.', 'success')
    } catch (err: any) {
      flash(err.message || 'Yeniden gönderilemedi.', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      setMessage('')
      if (!password || !confirmPassword) {
        flash('Lütfen tüm alanları doldurun', 'error')
        return
      }
      if (password.length < 6) {
        flash('Şifre en az 6 karakter olmalıdır', 'error')
        return
      }
      if (password !== confirmPassword) {
        flash('Şifreler eşleşmiyor', 'error')
        return
      }
      await userAuth.updatePassword(password)
      clearPasswordRecovery()
      flash('Şifreniz güncellendi. Giriş sayfasına yönlendiriliyorsunuz…', 'success')
      setTimeout(() => {
        if (openMyTrabzonDeepLink('auth/callback', '')) return
        navigate('/auth')
      }, 1500)
    } catch (err: any) {
      flash(err.message || 'Şifre güncellenemedi. Link süresi dolmuş olabilir; kod ile tekrar deneyin.', 'error')
    } finally {
      setLoading(false)
    }
  }

  const banner =
    message && (
      <div
        className={`flex items-start gap-2 rounded-lg border p-4 ${
          messageType === 'success'
            ? 'border-green-500/30 bg-green-500/20 text-green-300'
            : 'border-red-500/30 bg-red-500/20 text-red-300'
        }`}
      >
        {messageType === 'success' ? <CheckCircle className="mt-0.5 h-5 w-5" /> : <AlertCircle className="mt-0.5 h-5 w-5" />}
        <p className="text-sm">{message}</p>
      </div>
    )

  if (booting) {
    return (
      <MarketingChrome>
        <div className="flex min-h-[50vh] items-center justify-center bg-[#070a12] p-4 text-white">
          Bağlantı doğrulanıyor…
        </div>
      </MarketingChrome>
    )
  }

  return (
    <MarketingChrome>
    <div className="flex min-h-[70vh] items-center justify-center bg-gradient-to-br from-[#070a12] via-slate-900 to-[#0b1220] p-4">
      <div className="w-full max-w-md rounded-2xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-lg">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-purple-600">
            {step === 'update' ? <Lock className="h-8 w-8 text-white" /> : <Mail className="h-8 w-8 text-white" />}
          </div>
          <h1 className="mb-2 text-3xl font-bold text-white">
            {step === 'request' && 'Şifremi Unuttum'}
            {step === 'verify' && 'Doğrulama Kodu'}
            {step === 'update' && 'Yeni Şifre Belirle'}
          </h1>
          <p className="text-gray-300">
            {step === 'request' && 'E-postanıza 6 haneli kod veya sıfırlama linki göndereceğiz'}
            {step === 'verify' && `${email} adresine gelen 6 haneli kodu girin`}
            {step === 'update' && 'Hesabınız için yeni bir şifre yazın'}
          </p>
        </div>

        {step === 'request' && (
          <form onSubmit={handleRequestReset} className="space-y-6">
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-300">
                E-posta
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ornek@email.com"
                  className="w-full rounded-lg border border-white/20 bg-white/10 py-3 pl-10 pr-4 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
            </div>
            {banner}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 py-3 font-semibold text-white disabled:opacity-60"
            >
              {loading ? 'Gönderiliyor…' : 'Kod / Link Gönder'}
            </button>
          </form>
        )}

        {step === 'verify' && (
          <form onSubmit={handleVerifyOtp} className="space-y-6">
            <OtpCodeInput value={otp} onChange={setOtp} disabled={loading} />
            {banner}
            <button
              type="submit"
              disabled={loading || otp.replace(/\D/g, '').length !== 6}
              className="w-full rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 py-3 font-semibold text-white disabled:opacity-60"
            >
              {loading ? 'Doğrulanıyor…' : 'Kodu Doğrula'}
            </button>
            <button type="button" onClick={handleResend} disabled={loading} className="w-full text-sm text-purple-300">
              Kodu / linki tekrar gönder
            </button>
            <button
              type="button"
              onClick={() => {
                setStep('request')
                setOtp('')
                setMessage('')
              }}
              className="w-full text-sm text-gray-400 hover:text-white"
            >
              E-postayı değiştir
            </button>
          </form>
        )}

        {step === 'update' && (
          <form onSubmit={handleUpdatePassword} className="space-y-6">
            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-300">
                Yeni şifre
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="En az 6 karakter"
                className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-purple-500"
                required
                autoFocus
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-gray-300">
                Şifre tekrar
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Şifreyi tekrar girin"
                className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            {banner}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 py-3 font-semibold text-white disabled:opacity-60"
            >
              {loading ? 'Güncelleniyor…' : 'Şifreyi Güncelle'}
            </button>
          </form>
        )}

        <Link to="/giris" className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-300 hover:text-white">
          <ArrowLeft className="h-4 w-4" />
          Giriş sayfasına dön
        </Link>
      </div>
    </div>
    </MarketingChrome>
  )
}
