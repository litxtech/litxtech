import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { userAuth } from '../lib/supabase'
import { Lock, Mail, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react'
import { OtpCodeInput } from '@/components/auth/OtpCodeInput'
import { openMyTrabzonDeepLink } from '../lib/utils'

type Step = 'request' | 'verify' | 'update'

export function ResetPasswordPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState<Step>('request')
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('')

  const flash = (text: string, type: 'success' | 'error') => {
    setMessage(text)
    setMessageType(type)
  }

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
      flash('6 haneli doğrulama kodu e-posta adresinize gönderildi. Spam klasörünü de kontrol edin.', 'success')
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
      flash('Yeni kod gönderildi.', 'success')
    } catch (err: any) {
      flash(err.message || 'Kod yeniden gönderilemedi.', 'error')
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
      flash('Şifreniz güncellendi. Giriş sayfasına yönlendiriliyorsunuz…', 'success')
      setTimeout(() => {
        if (openMyTrabzonDeepLink('auth/callback', '')) return
        navigate('/auth')
      }, 1500)
    } catch (err: any) {
      flash(err.message || 'Şifre güncellenemedi.', 'error')
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

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="w-full max-w-md rounded-2xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-lg">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-purple-600">
            {step === 'update' ? <Lock className="h-8 w-8 text-white" /> : <Mail className="h-8 w-8 text-white" />}
          </div>
          <h1 className="mb-2 text-3xl font-bold text-white">
            {step === 'request' && 'Şifremi Unuttum'}
            {step === 'verify' && 'Doğrulama Kodu'}
            {step === 'update' && 'Yeni Şifre'}
          </h1>
          <p className="text-gray-300">
            {step === 'request' && 'E-postanıza 6 haneli kod göndereceğiz'}
            {step === 'verify' && `${email} adresine gelen 6 haneli kodu girin`}
            {step === 'update' && 'Hesabınız için yeni bir şifre belirleyin'}
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
              {loading ? 'Gönderiliyor…' : '6 Haneli Kod Gönder'}
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
            <button
              type="button"
              onClick={handleResend}
              disabled={loading}
              className="w-full text-sm text-purple-300 hover:text-purple-200 disabled:opacity-60"
            >
              Kodu tekrar gönder
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

        <Link
          to="/auth"
          className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-300 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Giriş sayfasına dön
        </Link>
      </div>
    </div>
  )
}
