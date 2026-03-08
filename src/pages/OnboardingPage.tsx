import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { openMyTrabzonDeepLink } from '../lib/utils'
import { User, Mail, CheckCircle, ArrowRight, Loader2 } from 'lucide-react'

export function OnboardingPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [step, setStep] = useState(1)
  const [fullName, setFullName] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const checkUser = async () => {
      if (!supabase) {
        navigate('/auth')
        return
      }

      try {
        const { data: { user: currentUser }, error } = await supabase.auth.getUser()
        
        if (error || !currentUser) {
          navigate('/auth')
          return
        }

        setUser(currentUser)
        
        // Eğer kullanıcı zaten profil bilgilerine sahipse, ana sayfaya yönlendir
        if (currentUser.user_metadata?.full_name) {
          navigate('/')
          return
        }

        setLoading(false)
      } catch (error) {
        console.error('User check error:', error)
        navigate('/auth')
      }
    }

    checkUser()
  }, [navigate])

  const handleComplete = async () => {
    if (!fullName.trim()) {
      alert('Lütfen adınızı ve soyadınızı girin')
      return
    }

    if (!supabase) return
    
    try {
      setSaving(true)
      
      // Kullanıcı metadata'sını güncelle
      const { error } = await supabase.auth.updateUser({
        data: {
          full_name: fullName,
          onboarding_completed: true
        }
      })

      if (error) throw error

      setStep(2)
      
      // 2 saniye sonra mobil uygulamaya veya ana sayfaya yönlendir
      setTimeout(() => {
        if (openMyTrabzonDeepLink('auth/callback', '')) return
        navigate('/')
      }, 2000)
    } catch (error: any) {
      console.error('Update error:', error)
      alert(error.message || 'Profil güncellenirken bir hata oluştu')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-white animate-spin mx-auto mb-4" />
          <p className="text-white">Yükleniyor...</p>
        </div>
      </div>
    )
  }

  if (step === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 rounded-full mb-4">
              <User className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Hoş Geldiniz!</h1>
            <p className="text-gray-300">Hesabınızı tamamlamak için birkaç bilgi daha gerekiyor</p>
          </div>

          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                E-posta Adresi
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 opacity-60 cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-2">
                Adınız ve Soyadınız <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Adınız ve Soyadınız"
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <button
              onClick={handleComplete}
              disabled={saving || !fullName.trim()}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              {saving ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Kaydediliyor...
                </>
              ) : (
                <>
                  Hesabı Tamamla
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            <button
              onClick={() => navigate('/')}
              className="w-full text-gray-300 hover:text-white transition-colors text-sm"
            >
              Şimdilik atla
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-full mb-4">
          <CheckCircle className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Hesabınız Hazır!</h1>
        <p className="text-gray-300 mb-6">
          Profil bilgileriniz kaydedildi. Ana sayfaya yönlendiriliyorsunuz...
        </p>
        <Loader2 className="w-8 h-8 text-white animate-spin mx-auto" />
      </div>
    </div>
  )
}

