import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { CheckCircle, XCircle, Mail, ArrowRight, Loader2 } from 'lucide-react'

export function EmailConfirmPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'expired'>('loading')
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    const verifyEmail = async () => {
      if (!supabase) {
        setStatus('error')
        setMessage('Authentication servisi yapılandırılmamış')
        return
      }

      try {
        // URL hash'inden token'ları al
        const hash = window.location.hash.substring(1)
        const hashParams = new URLSearchParams(hash)
        const accessToken = hashParams.get('access_token')
        const type = hashParams.get('type')
        const token = searchParams.get('token') || accessToken

        // Eğer hash'te confirmation token varsa
        if (type === 'signup' || type === 'email' || token) {
          // Supabase otomatik olarak session'ı ayarlar
          await new Promise((r) => setTimeout(r, 500))

          const { data: { session }, error: sessionError } = await supabase.auth.getSession()
          
          if (session && !sessionError) {
            // Email doğrulandı
            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
              setEmail(user.email || '')
              setStatus('success')
              setMessage('E-posta adresiniz başarıyla doğrulandı!')
              
              // Hash'i temizle
              window.history.replaceState(null, '', window.location.pathname)
              
              // 3 saniye sonra onboarding'e yönlendir
              setTimeout(() => {
                navigate('/auth/onboarding')
              }, 3000)
            } else {
              setStatus('error')
              setMessage('Kullanıcı bilgileri alınamadı')
            }
          } else {
            setStatus('error')
            setMessage(sessionError?.message || 'E-posta doğrulama başarısız oldu')
          }
        } else {
          // Token yok, kullanıcıya bilgi ver
          setStatus('expired')
          setMessage('E-posta doğrulama bağlantısı bulunamadı veya süresi dolmuş')
        }
      } catch (error: any) {
        console.error('Email confirmation error:', error)
        setStatus('error')
        setMessage(error.message || 'E-posta doğrulama sırasında bir hata oluştu')
      }
    }

    verifyEmail()

    // Auth state değişikliklerini dinle
    if (supabase) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_IN' && session) {
          const hash = window.location.hash
          if (hash.includes('type=signup') || hash.includes('type=email')) {
            setStatus('success')
            setMessage('E-posta adresiniz başarıyla doğrulandı!')
            window.history.replaceState(null, '', window.location.pathname)
            setTimeout(() => {
              navigate('/auth/onboarding')
            }, 3000)
          }
        }
      })

      return () => {
        subscription.unsubscribe()
      }
    }
  }, [navigate, searchParams])

  const handleResendEmail = async () => {
    if (!email) {
      setMessage('E-posta adresi bulunamadı')
      return
    }

    if (!supabase) return
    
    try {
      // Email confirmation yeniden gönderme
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email
      })

      if (error) throw error
      setMessage('Doğrulama e-postası tekrar gönderildi. Lütfen e-postanızı kontrol edin.')
    } catch (error: any) {
      setMessage(error.message || 'E-posta gönderilemedi')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
        <div className="text-center mb-8">
          {status === 'loading' && (
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 rounded-full mb-4">
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            </div>
          )}
          {status === 'success' && (
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-full mb-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
          )}
          {(status === 'error' || status === 'expired') && (
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600 rounded-full mb-4">
              <XCircle className="w-8 h-8 text-white" />
            </div>
          )}
          
          <h1 className="text-3xl font-bold text-white mb-2">
            {status === 'loading' && 'E-posta Doğrulanıyor...'}
            {status === 'success' && 'E-posta Doğrulandı!'}
            {(status === 'error' || status === 'expired') && 'Doğrulama Hatası'}
          </h1>
          <p className="text-gray-300">{message || 'Lütfen bekleyin...'}</p>
        </div>

        {status === 'success' && (
          <div className="space-y-4">
            <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
              <p className="text-green-300 text-sm">
                Hesabınız başarıyla oluşturuldu! Hoş geldiniz sayfasına yönlendiriliyorsunuz...
              </p>
            </div>
            <Link
              to="/auth/onboarding"
              className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all duration-200"
            >
              Devam Et
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {(status === 'error' || status === 'expired') && (
          <div className="space-y-4">
            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4">
              <p className="text-red-300 text-sm">{message}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleResendEmail}
                className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                <Mail className="w-4 h-4 inline mr-2" />
                E-postayı Tekrar Gönder
              </button>
              <Link
                to="/auth"
                className="flex-1 bg-gray-700 text-white py-2 px-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors text-center"
              >
                Giriş Sayfası
              </Link>
            </div>
          </div>
        )}

        {status === 'loading' && (
          <div className="text-center">
            <p className="text-gray-400 text-sm">E-posta doğrulama işlemi gerçekleştiriliyor...</p>
          </div>
        )}
      </div>
    </div>
  )
}

