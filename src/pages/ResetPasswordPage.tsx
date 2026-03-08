import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { userAuth, supabase } from '../lib/supabase'
import { Lock, Mail, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react'
import { openMyTrabzonDeepLink } from '../lib/utils'

export function ResetPasswordPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState<'request' | 'update'>('request')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('')

  // URL hash'inde token varsa (Supabase şifre sıfırlama linki) update sayfasına geç
  useEffect(() => {
    if (!supabase) return

    let mounted = true

    const checkForRecoveryToken = async () => {
      // URL hash'ini kontrol et (Supabase token'ları hash'te gönderir)
      const hash = window.location.hash.substring(1)
      if (!hash) return

      const hashParams = new URLSearchParams(hash)
      const type = hashParams.get('type')
      const accessToken = hashParams.get('access_token')
      
      // Eğer hash'te recovery token varsa
        if (type === 'recovery' && accessToken) {
        try {
          // Supabase otomatik olarak hash'teki token'ları işler
          // Biraz bekle ki Supabase session'ı ayarlasın
          await new Promise((r) => setTimeout(r, 100))
          
          // Session'ı kontrol et
          if (!supabase) return
          const { data: { session }, error: sessionError } = await supabase.auth.getSession()
          
          if (mounted) {
            if (session && !sessionError) {
              if (openMyTrabzonDeepLink('auth/reset-password', `#${hash}`)) {
                return
              }
              setStep('update')
              // Hash'i temizle (güvenlik için)
              window.history.replaceState(null, '', window.location.pathname)
            } else {
              console.error('Session error:', sessionError)
              setMessage('Geçersiz veya süresi dolmuş şifre sıfırlama bağlantısı')
              setMessageType('error')
            }
          }
        } catch (error) {
          console.error('Recovery token check error:', error)
          if (mounted) {
            setMessage('Şifre sıfırlama bağlantısı işlenirken bir hata oluştu')
            setMessageType('error')
          }
        }
      }
    }
    
    // Auth state değişikliklerini dinle
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) return
      
      console.log('Auth state change:', event, session ? 'has session' : 'no session')
      
      if (event === 'PASSWORD_RECOVERY' && session) {
        if (openMyTrabzonDeepLink('auth/reset-password', window.location.hash || '')) {
          return
        }
        setStep('update')
        window.history.replaceState(null, '', window.location.pathname)
      } else if (event === 'SIGNED_IN' && session) {
        // Eğer recovery token ile giriş yapıldıysa
        const hash = window.location.hash
        if (hash.includes('type=recovery')) {
          if (openMyTrabzonDeepLink('auth/reset-password', hash)) {
            return
          }
          setStep('update')
          window.history.replaceState(null, '', window.location.pathname)
        }
      }
    })
    
    // İlk kontrolü yap
    checkForRecoveryToken()
    
    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      setMessage('')
      setMessageType('')
      
      if (!email) {
        setMessage('Lütfen e-posta adresinizi girin')
        setMessageType('error')
        setLoading(false)
        return
      }

      await userAuth.resetPassword(email)
      setMessage('Şifre sıfırlama bağlantısı e-posta adresinize gönderildi! Lütfen e-postanızı kontrol edin (spam klasörü dahil). Bağlantı 1 saat süreyle geçerlidir.')
      setMessageType('success')
    } catch (e: any) {
      console.error('Password reset error:', e)
      setMessage(e.message || 'Şifre sıfırlama isteği gönderilemedi. Lütfen tekrar deneyin.')
      setMessageType('error')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      setMessage('')
      setMessageType('')

      if (!password || !confirmPassword) {
        setMessage('Lütfen tüm alanları doldurun')
        setMessageType('error')
        return
      }

      if (password.length < 6) {
        setMessage('Şifre en az 6 karakter olmalıdır')
        setMessageType('error')
        return
      }

      if (password !== confirmPassword) {
        setMessage('Şifreler eşleşmiyor')
        setMessageType('error')
        return
      }

      await userAuth.updatePassword(password)
      setMessage('Şifreniz başarıyla güncellendi! Giriş sayfasına yönlendiriliyorsunuz...')
      setMessageType('success')
      
      setTimeout(() => {
        // Mobil uygulamaya yönlendir (eğer mobil cihazdaysa)
        if (openMyTrabzonDeepLink('auth/callback', '')) return
        navigate('/auth')
      }, 2000)
    } catch (e: any) {
      console.error('Password update error:', e)
      setMessage(e.message || 'Şifre güncellenemedi. Lütfen tekrar deneyin.')
      setMessageType('error')
    } finally {
      setLoading(false)
    }
  }

  if (step === 'update') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 rounded-full mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Yeni Şifre Belirle</h1>
            <p className="text-gray-300">Yeni şifrenizi girin</p>
          </div>

          <form onSubmit={handleUpdatePassword} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Yeni Şifre
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="En az 6 karakter"
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                Şifreyi Tekrar Girin
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Şifreyi tekrar girin"
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {message && (
              <div className={`flex items-center gap-2 p-4 rounded-lg ${
                messageType === 'success' 
                  ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                  : 'bg-red-500/20 text-red-300 border border-red-500/30'
              }`}>
                {messageType === 'success' ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <AlertCircle className="w-5 h-5" />
                )}
                <p className="text-sm">{message}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              {loading ? 'Güncelleniyor...' : 'Şifreyi Güncelle'}
            </button>

            <Link
              to="/auth"
              className="flex items-center justify-center gap-2 text-gray-300 hover:text-white transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Giriş sayfasına dön
            </Link>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 rounded-full mb-4">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Şifremi Unuttum</h1>
          <p className="text-gray-300">E-posta adresinize şifre sıfırlama bağlantısı göndereceğiz</p>
          <p className="text-sm text-gray-400 mt-2">E-postanızı kontrol etmeyi unutmayın (spam klasörü dahil)</p>
        </div>

        <form onSubmit={handleRequestReset} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              E-posta Adresi
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ornek@email.com"
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {message && (
            <div className={`flex items-center gap-2 p-4 rounded-lg ${
              messageType === 'success' 
                ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                : 'bg-red-500/20 text-red-300 border border-red-500/30'
            }`}>
              {messageType === 'success' ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <AlertCircle className="w-5 h-5" />
              )}
              <p className="text-sm">{message}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
          >
            {loading ? 'Gönderiliyor...' : 'Şifre Sıfırlama Bağlantısı Gönder'}
          </button>

          <Link
            to="/auth"
            className="flex items-center justify-center gap-2 text-gray-300 hover:text-white transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Giriş sayfasına dön
          </Link>
        </form>
      </div>
    </div>
  )
}

