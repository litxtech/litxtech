import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userAuth, supabase } from '../lib/supabase'
import { openMyTrabzonDeepLink } from '../lib/utils'
import { Mail, Lock, LogIn, UserPlus, Sparkles, HelpCircle } from 'lucide-react'

export function AuthPage() {
  const navigate = useNavigate()
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
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
      let errorMessage = e.message || 'Giriş başarısız oldu. Lütfen tekrar deneyin.'
      
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
        setMessage('Lütfen tüm alanları doldurun')
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
        throw new Error('Giriş yapılamadı. Lütfen tekrar deneyin.')
      }

      setMessage('Giriş başarılı! Yönlendiriliyorsunuz...')
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
      setMessage(e.message || 'Giriş başarısız oldu')
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

      await userAuth.signUpWithEmail(email, password)
      setMessage('Kayıt başarılı! E-posta adresinize doğrulama linki gönderildi. Lütfen e-postanızı kontrol edin.')
      setMessageType('success')
    } catch (e: any) {
      setMessage(e.message || 'Kayıt başarısız oldu')
      setMessageType('error')
    } finally {
      setLoading(false)
    }
  }

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      setMessage('')
      setMessageType('')
      
      if (!email) {
        setMessage('Lütfen e-posta adresinizi girin')
        setMessageType('error')
        return
      }

      await userAuth.signInWithMagicLink(email)
      setMessage('Magic link e-posta adresinize gönderildi! Lütfen e-postanızı kontrol edin.')
      setMessageType('success')
    } catch (e: any) {
      setMessage(e.message || 'Magic link gönderilemedi')
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
            {mode === 'signin' ? 'Hoş Geldiniz' : 'Hesap Oluştur'}
          </h1>
          <p className="text-gray-300">
            {mode === 'signin' 
              ? 'Hesabınıza giriş yapın' 
              : 'Yeni hesap oluşturun ve başlayın'}
          </p>
        </div>

        {/* Mode Toggle */}
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
            Giriş Yap
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
            Kayıt Ol
          </button>
        </div>

        {/* Social Login */}
        <div className="space-y-3 mb-6">
          <button
            disabled={loading}
            onClick={() => handleProvider('google')}
            className="w-full bg-white/10 hover:bg-white/20 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed border border-white/20 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Google ile {mode === 'signin' ? 'Giriş Yap' : 'Kayıt Ol'}
          </button>
          <button
            disabled={loading}
            onClick={() => handleProvider('apple')}
            className="w-full bg-white/10 hover:bg-white/20 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed border border-white/20 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" fill="currentColor"/>
            </svg>
            Apple ile {mode === 'signin' ? 'Giriş Yap' : 'Kayıt Ol'}
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

        {/* Email/Password Form */}
        <form onSubmit={mode === 'signin' ? handleSignIn : handleSignUp} className="space-y-4">
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
                  Şifreyi Tekrar Girin
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
                  Şifrenizi unutursanız, giriş sayfasındaki <Link to="/auth/reset-password" className="text-purple-400 hover:text-purple-300 underline">"Şifremi Unuttum"</Link> linkini kullanabilirsiniz.
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
                Şifremi Unuttum?
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
              'İşleniyor...'
            ) : (
              <>
                {mode === 'signin' ? (
                  <>
                    <LogIn className="w-5 h-5" />
                    Giriş Yap
                  </>
                ) : (
                  <>
                    <UserPlus className="w-5 h-5" />
                    Kayıt Ol
                  </>
                )}
              </>
            )}
          </button>
        </form>

        {/* Magic Link */}
        <div className="mt-6">
          <button
            onClick={handleMagicLink}
            disabled={loading}
            className="w-full text-gray-300 hover:text-white transition-colors text-sm flex items-center justify-center gap-2"
          >
            <Mail className="w-4 h-4" />
            Magic Link ile {mode === 'signin' ? 'Giriş Yap' : 'Kayıt Ol'}
          </button>
        </div>
      </div>
    </div>
  )
}
