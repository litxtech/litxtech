import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userAuth, supabase } from '../lib/supabase'
import { openMyTrabzonDeepLink } from '../lib/utils'
import { Mail, Lock, LogIn, UserPlus, Sparkles, HelpCircle } from 'lucide-react'
import { OtpCodeInput } from '@/components/auth/OtpCodeInput'

export function AuthPage() {
  const navigate = useNavigate()
  const [mode, setMode] = useState<'signin' | 'signup' | 'verify-signup' | 'otp-login'>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('')

  const handleProvider = async (provider: 'google' | 'apple') => {
    try {
      setLoading(true)
      setMessage('')
      setMessageType('')
      
      // Supabase yapılandırmasını kontrol et
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
      
      if (!supabaseUrl || !supabaseKey) {
        console.error('❌ Supabase Environment Variables Missing:')
        console.error('VITE_SUPABASE_URL:', supabaseUrl ? '✓ Set' : '✗ Missing')
        console.error('VITE_SUPABASE_ANON_KEY:', supabaseKey ? '✓ Set' : '✗ Missing')
        console.error('')
        console.error('📝 Çözüm:')
        console.error('1. Proje kök dizininde .env dosyası oluşturun')
        console.error('2. VITE_SUPABASE_URL ve VITE_SUPABASE_ANON_KEY ekleyin')
        console.error('3. Development server\'ı yeniden başlatın')
        console.error('')
        console.error('Detaylı rehber: OAUTH_TROUBLESHOOTING.md dosyasına bakın')
        throw new Error('Supabase yapılandırması eksik. Lütfen .env dosyasını kontrol edin ve development server\'ı yeniden başlatın.')
      }
      
      console.log('✓ Supabase environment variables OK')
      console.log('✓ Starting OAuth flow for:', provider)
      
      await userAuth.signInWithProvider(provider)
      // OAuth redirect olacak, bu yüzden loading state'i burada kalacak
    } catch (e: any) {
      console.error('OAuth error:', e)
      let errorMessage = e.message || 'Sign-in failed. Please try again.'
      
      // Daha kullanıcı dostu hata mesajları
      if (errorMessage.includes('Auth not configured')) {
        errorMessage = 'Kimlik doğrulama yapılandırması eksik. Lütfen daha sonra tekrar deneyin veya yöneticiye başvurun.'
      } else if (errorMessage.includes('Supabase')) {
        errorMessage = 'Sistem yapılandırması eksik. Lütfen yöneticiye başvurun.'
      }
      
      setMessage(errorMessage)
      setMessageType('error')
      setLoading(false)
    }
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      setMessage('')
      setMessageType('')
      
      if (!email || !password) {
        setMessage('Please fill in all fields')
        setMessageType('error')
        setLoading(false)
        return
      }

      await userAuth.signInWithEmail(email, password)

      // Session'ı kontrol et
      if (!supabase) {
        throw new Error('Auth not configured')
      }

      // Session'ın kurulması için biraz bekle
      await new Promise((r) => setTimeout(r, 500))

      const { data: { user }, error: userError } = await supabase.auth.getUser()
      
      if (userError || !user) {
        throw new Error('Could not sign in. Please try again.')
      }

      setMessage('Sign-in successful! Redirecting...')
      setMessageType('success')
      
      // Onboarding kontrolü ve mobil deep link yönlendirme
      if (!user.user_metadata?.onboarding_completed && !user.user_metadata?.full_name) {
        setTimeout(() => {
          if (openMyTrabzonDeepLink('auth/onboarding', '')) return
          navigate('/auth/onboarding')
        }, 1000)
      } else {
        setTimeout(() => {
          if (openMyTrabzonDeepLink('auth/callback', '')) return
          navigate('/')
        }, 1000)
      }
    } catch (e: any) {
      console.error('Sign in error:', e)
      setMessage(e.message || 'Sign-in failed')
      setMessageType('error')
      setLoading(false)
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      setMessage('')
      setMessageType('')
      
      if (!email || !password || !confirmPassword) {
        setMessage('Please fill in all fields')
        setMessageType('error')
        return
      }

      if (password.length < 6) {
        setMessage('Password must be at least 6 characters')
        setMessageType('error')
        return
      }

      if (password !== confirmPassword) {
        setMessage('Passwords do not match')
        setMessageType('error')
        return
      }

      await userAuth.signUpWithEmail(email, password)
      setOtp('')
      setMode('verify-signup')
      setMessage('Kayıt alındı. E-postanıza gelen 6 haneli doğrulama kodunu girin.')
      setMessageType('success')
    } catch (e: any) {
      setMessage(e.message || 'Registration failed')
      setMessageType('error')
    } finally {
      setLoading(false)
    }
  }

  const handleVerifySignup = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      setMessage('')
      setMessageType('')
      await userAuth.verifySignupOtp(email, otp)
      setMessage('E-posta doğrulandı! Yönlendiriliyorsunuz…')
      setMessageType('success')
      setTimeout(() => {
        if (openMyTrabzonDeepLink('auth/onboarding', '')) return
        navigate('/auth/onboarding')
      }, 1000)
    } catch (e: any) {
      setMessage(e.message || 'Kod geçersiz veya süresi dolmuş')
      setMessageType('error')
    } finally {
      setLoading(false)
    }
  }

  const handleSendLoginOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      setMessage('')
      setMessageType('')
      if (!email) {
        setMessage('E-posta adresinizi girin')
        setMessageType('error')
        return
      }
      await userAuth.sendEmailOtp(email, false)
      setOtp('')
      setMode('otp-login')
      setMessage('6 haneli giriş kodu e-postanıza gönderildi.')
      setMessageType('success')
    } catch (e: any) {
      setMessage(e.message || 'Kod gönderilemedi')
      setMessageType('error')
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyLoginOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      setMessage('')
      setMessageType('')
      await userAuth.verifyEmailOtp(email, otp, 'email')
      setMessage('Giriş başarılı! Yönlendiriliyorsunuz…')
      setMessageType('success')
      setTimeout(() => {
        if (openMyTrabzonDeepLink('auth/callback', '')) return
        navigate('/')
      }, 1000)
    } catch (e: any) {
      setMessage(e.message || 'Kod geçersiz veya süresi dolmuş')
      setMessageType('error')
    } finally {
      setLoading(false)
    }
  }

  const handleResendSignupOtp = async () => {
    try {
      setLoading(true)
      await userAuth.resendSignupOtp(email)
      setMessage('Yeni doğrulama kodu gönderildi.')
      setMessageType('success')
    } catch (e: any) {
      setMessage(e.message || 'Kod yeniden gönderilemedi')
      setMessageType('error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 rounded-full mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            {mode === 'signin' && 'Hoş geldiniz'}
            {mode === 'signup' && 'Hesap oluştur'}
            {mode === 'verify-signup' && 'E-posta doğrulama'}
            {mode === 'otp-login' && 'Giriş kodu'}
          </h1>
          <p className="text-gray-300">
            {mode === 'signin' && 'Hesabınıza giriş yapın'}
            {mode === 'signup' && 'Yeni hesap oluşturun'}
            {mode === 'verify-signup' && `${email} adresine gelen 6 haneli kodu girin`}
            {mode === 'otp-login' && `${email} adresine gelen 6 haneli kodu girin`}
          </p>
        </div>

        {(mode === 'signin' || mode === 'signup') && (
        <div className="flex bg-white/5 rounded-lg p-1 mb-6">
          <button
            onClick={() => {
              setMode('signin')
              setMessage('')
              setMessageType('')
            }}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-semibold transition-all ${
              mode === 'signin'
                ? 'bg-purple-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Giriş
          </button>
          <button
            onClick={() => {
              setMode('signup')
              setMessage('')
              setMessageType('')
            }}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-semibold transition-all ${
              mode === 'signup'
                ? 'bg-purple-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Kayıt
          </button>
        </div>
        )}

        {(mode === 'signin' || mode === 'signup') && (
          <>
        <div className="space-y-3 mb-6">
          <button
            disabled={loading}
            onClick={() => handleProvider('google')}
            className="w-full bg-white/10 hover:bg-white/20 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed border border-white/20 flex items-center justify-center gap-2"
          >
            Google ile devam et
          </button>
          <button
            disabled={loading}
            onClick={() => handleProvider('apple')}
            className="w-full bg-white/10 hover:bg-white/20 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed border border-white/20 flex items-center justify-center gap-2"
          >
            Apple ile devam et
          </button>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/20"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-transparent text-gray-400">veya</span>
          </div>
        </div>

        <form onSubmit={mode === 'signin' ? handleSignIn : handleSignUp} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              E-posta
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

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Şifre
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {mode === 'signup' && (
            <>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                  Şifre tekrar
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
              <div className="flex items-start gap-2 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <HelpCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-gray-300">
                  Kayıttan sonra e-postanıza 6 haneli doğrulama kodu gelir. Şifrenizi unutursanız{' '}
                  <Link to="/auth/reset-password" className="text-purple-400 hover:text-purple-300 underline">
                    şifremi unuttum
                  </Link>{' '}
                  ile yine 6 haneli kod kullanın.
                </p>
              </div>
            </>
          )}

          {mode === 'signin' && (
            <div className="flex items-center justify-end">
              <Link
                to="/auth/reset-password"
                className="text-sm text-purple-400 hover:text-purple-300 transition-colors font-medium underline underline-offset-2"
              >
                Şifremi unuttum
              </Link>
            </div>
          )}

          {message && (
            <div className={`p-4 rounded-lg ${
              messageType === 'success'
                ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                : 'bg-red-500/20 text-red-300 border border-red-500/30'
            }`}>
              <p className="text-sm">{message}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            {loading ? (
              'İşleniyor…'
            ) : (
              <>
                {mode === 'signin' ? (
                  <>
                    <LogIn className="w-5 h-5" />
                    Giriş yap
                  </>
                ) : (
                  <>
                    <UserPlus className="w-5 h-5" />
                    Kayıt ol
                  </>
                )}
              </>
            )}
          </button>
        </form>

        {mode === 'signin' && (
          <div className="mt-6">
            <button
              onClick={handleSendLoginOtp}
              disabled={loading}
              className="w-full text-gray-300 hover:text-white transition-colors text-sm flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4" />
              E-posta ile 6 haneli kod gönder
            </button>
          </div>
        )}
          </>
        )}

        {mode === 'verify-signup' && (
          <form onSubmit={handleVerifySignup} className="space-y-6">
            <OtpCodeInput value={otp} onChange={setOtp} disabled={loading} />
            {message && (
              <div className={`p-4 rounded-lg ${
                messageType === 'success'
                  ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                  : 'bg-red-500/20 text-red-300 border border-red-500/30'
              }`}>
                <p className="text-sm">{message}</p>
              </div>
            )}
            <button
              type="submit"
              disabled={loading || otp.replace(/\D/g, '').length !== 6}
              className="w-full rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 py-3 font-semibold text-white disabled:opacity-60"
            >
              {loading ? 'Doğrulanıyor…' : 'Kodu doğrula'}
            </button>
            <button
              type="button"
              onClick={handleResendSignupOtp}
              disabled={loading}
              className="w-full text-sm text-purple-300 hover:text-purple-200"
            >
              Kodu tekrar gönder
            </button>
          </form>
        )}

        {mode === 'otp-login' && (
          <form onSubmit={handleVerifyLoginOtp} className="space-y-6">
            <OtpCodeInput value={otp} onChange={setOtp} disabled={loading} />
            {message && (
              <div className={`p-4 rounded-lg ${
                messageType === 'success'
                  ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                  : 'bg-red-500/20 text-red-300 border border-red-500/30'
              }`}>
                <p className="text-sm">{message}</p>
              </div>
            )}
            <button
              type="submit"
              disabled={loading || otp.replace(/\D/g, '').length !== 6}
              className="w-full rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 py-3 font-semibold text-white disabled:opacity-60"
            >
              {loading ? 'Giriş yapılıyor…' : 'Kod ile giriş yap'}
            </button>
            <button
              type="button"
              onClick={handleSendLoginOtp}
              disabled={loading}
              className="w-full text-sm text-purple-300 hover:text-purple-200"
            >
              Kodu tekrar gönder
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('signin')
                setOtp('')
                setMessage('')
              }}
              className="w-full text-sm text-gray-400 hover:text-white"
            >
              Şifre ile girişe dön
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
