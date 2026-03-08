import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase, userAuth } from '../lib/supabase'
import { User, Mail, Heart, Eye, EyeOff, LogOut, ArrowLeft, MapPin, Lock, KeyRound } from 'lucide-react'

export function ProfilePage() {
  const navigate = useNavigate()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [badges, setBadges] = useState<any[]>([])
  const [showChangePassword, setShowChangePassword] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordLoading, setPasswordLoading] = useState(false)
  const [passwordMessage, setPasswordMessage] = useState('')
  const [passwordMessageType, setPasswordMessageType] = useState<'success' | 'error' | ''>('')

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await userAuth.getUser()
        if (!currentUser) {
          navigate('/auth')
          return
        }

        setUser(currentUser)

        // Kullanıcının etiketlerini getir
        if (supabase) {
          const { data, error } = await supabase
            .from('user_badges')
            .select('*')
            .eq('user_id', currentUser.id)
            .order('created_at', { ascending: false })

          if (!error && data) {
            setBadges(data)
          }
        }
      } catch (error) {
        console.error('Error fetching user:', error)
        navigate('/auth')
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [navigate])

  const toggleBadgeVisibility = async (badgeType: string, currentVisibility: boolean) => {
    if (!supabase || !user) return

    try {
      const { error } = await supabase
        .from('user_badges')
        .update({ is_visible: !currentVisibility })
        .eq('user_id', user.id)
        .eq('badge_type', badgeType)

      if (error) throw error

      // Local state'i güncelle
      setBadges(badges.map(badge => 
        badge.badge_type === badgeType 
          ? { ...badge, is_visible: !currentVisibility }
          : badge
      ))
    } catch (error) {
      console.error('Error toggling badge:', error)
      alert('Etiket görünürlüğü değiştirilemedi')
    }
  }

  const handleLogout = async () => {
    try {
      await userAuth.signOut()
      navigate('/auth')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setPasswordLoading(true)
      setPasswordMessage('')
      setPasswordMessageType('')

      if (!currentPassword || !newPassword || !confirmPassword) {
        setPasswordMessage('Lütfen tüm alanları doldurun')
        setPasswordMessageType('error')
        return
      }

      if (newPassword.length < 6) {
        setPasswordMessage('Yeni şifre en az 6 karakter olmalıdır')
        setPasswordMessageType('error')
        return
      }

      if (newPassword !== confirmPassword) {
        setPasswordMessage('Yeni şifreler eşleşmiyor')
        setPasswordMessageType('error')
        return
      }

      // Mevcut şifreyi kontrol et
      if (user.email) {
        const { error: signInError } = await supabase?.auth.signInWithPassword({
          email: user.email,
          password: currentPassword
        }) || { error: new Error('Supabase not configured') }

        if (signInError) {
          setPasswordMessage('Mevcut şifre yanlış')
          setPasswordMessageType('error')
          return
        }
      }

      // Şifreyi güncelle
      await userAuth.updatePassword(newPassword)
      setPasswordMessage('Şifreniz başarıyla güncellendi!')
      setPasswordMessageType('success')
      
      // Formu temizle
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
      
      setTimeout(() => {
        setShowChangePassword(false)
        setPasswordMessage('')
        setPasswordMessageType('')
      }, 2000)
    } catch (e: any) {
      console.error('Password change error:', e)
      setPasswordMessage(e.message || 'Şifre güncellenemedi. Lütfen tekrar deneyin.')
      setPasswordMessageType('error')
    } finally {
      setPasswordLoading(false)
    }
  }

  // Kullanıcının email/şifre ile giriş yapıp yapmadığını kontrol et
  // OAuth kullanıcıları (Google, Apple) için false döner
  const isEmailPasswordUser = user && (
    user.app_metadata?.provider === 'email' || 
    (!user.app_metadata?.provider && user.identities?.some((identity: any) => identity.provider === 'email'))
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white">Yükleniyor...</div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Geri
          </button>
          <h1 className="text-4xl font-bold text-white mb-2">Profil</h1>
        </div>

        {/* Profile Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20 mb-6">
          {/* Avatar & Basic Info */}
          <div className="flex items-center gap-6 mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-1">
                {user.user_metadata?.full_name || user.email?.split('@')[0] || 'Kullanıcı'}
              </h2>
              <p className="text-gray-300 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                {user.email}
              </p>
            </div>
          </div>

          {/* Badges Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Heart className="w-5 h-5 text-pink-400" />
              Etiketlerim
            </h3>
            {badges.length > 0 ? (
              <div className="space-y-3">
                {badges.map((badge) => (
                  <div
                    key={badge.id}
                    className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        badge.badge_color === 'pink' ? 'bg-pink-500/20' :
                        badge.badge_color === 'blue' ? 'bg-blue-500/20' :
                        'bg-purple-500/20'
                      }`}>
                        {badge.badge_icon === 'heart' ? (
                          <Heart className={`w-5 h-5 ${
                            badge.badge_color === 'pink' ? 'text-pink-400' :
                            badge.badge_color === 'blue' ? 'text-blue-400' :
                            'text-purple-400'
                          }`} />
                        ) : (
                          <MapPin className={`w-5 h-5 ${
                            badge.badge_color === 'pink' ? 'text-pink-400' :
                            badge.badge_color === 'blue' ? 'text-blue-400' :
                            'text-purple-400'
                          }`} />
                        )}
                      </div>
                      <div>
                        <p className="text-white font-medium">{badge.badge_name}</p>
                        <p className="text-gray-400 text-sm">
                          {badge.badge_type === 'supporter' ? 'Destekçi etiketi' : 'İlçe etiketi'}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleBadgeVisibility(badge.badge_type, badge.is_visible)}
                      className={`p-2 rounded-lg transition-colors ${
                        badge.is_visible
                          ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                          : 'bg-gray-500/20 text-gray-400 hover:bg-gray-500/30'
                      }`}
                      title={badge.is_visible ? 'Etiketi gizle' : 'Etiketi göster'}
                    >
                      {badge.is_visible ? (
                        <Eye className="w-5 h-5" />
                      ) : (
                        <EyeOff className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                <Heart className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Henüz etiketiniz yok</p>
                <p className="text-sm mt-2">
                  <a href="/donation" className="text-purple-400 hover:text-purple-300">
                    Destek ol
                  </a> ve "Destekçi" etiketi kazan!
                </p>
              </div>
            )}
          </div>

          {/* Change Password Section */}
          {isEmailPasswordUser && (
            <div className="mb-6 pt-6 border-t border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-purple-400" />
                Şifre Ayarları
              </h3>
              
              {!showChangePassword ? (
                <button
                  onClick={() => setShowChangePassword(true)}
                  className="w-full bg-white/5 border border-white/20 text-white py-3 px-4 rounded-lg font-semibold hover:bg-white/10 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Lock className="w-5 h-5" />
                  Şifre Değiştir
                </button>
              ) : (
                <form onSubmit={handleChangePassword} className="space-y-4">
                  <div>
                    <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-300 mb-2">
                      Mevcut Şifre
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        id="currentPassword"
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Mevcut şifrenizi girin"
                        className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-300 mb-2">
                      Yeni Şifre
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        id="newPassword"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="En az 6 karakter"
                        className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                      Yeni Şifreyi Tekrar Girin
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Yeni şifreyi tekrar girin"
                        className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  {passwordMessage && (
                    <div className={`p-4 rounded-lg ${
                      passwordMessageType === 'success'
                        ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                        : 'bg-red-500/20 text-red-300 border border-red-500/30'
                    }`}>
                      <p className="text-sm">{passwordMessage}</p>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button
                      type="submit"
                      disabled={passwordLoading}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {passwordLoading ? 'Güncelleniyor...' : 'Şifreyi Güncelle'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowChangePassword(false)
                        setCurrentPassword('')
                        setNewPassword('')
                        setConfirmPassword('')
                        setPasswordMessage('')
                        setPasswordMessageType('')
                      }}
                      className="px-4 py-3 bg-white/5 border border-white/20 text-white rounded-lg font-semibold hover:bg-white/10 transition-all duration-200"
                    >
                      İptal
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* Forgot Password Link for Email/Password Users */}
          {isEmailPasswordUser && !showChangePassword && (
            <div className="mb-6">
              <Link
                to="/auth/reset-password"
                className="text-sm text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-2"
              >
                <Lock className="w-4 h-4" />
                Şifremi Unuttum
              </Link>
            </div>
          )}

          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={() => navigate('/donation')}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Heart className="w-5 h-5" />
              Destek Ol
            </button>
            <button
              onClick={handleLogout}
              className="w-full bg-red-500/20 border border-red-500/30 text-red-300 py-3 px-4 rounded-lg font-semibold hover:bg-red-500/30 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <LogOut className="w-5 h-5" />
              Çıkış Yap
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

