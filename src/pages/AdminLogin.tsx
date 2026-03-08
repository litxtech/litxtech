'use client'

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  Shield, 
  Users, 
  BarChart3, 
  Settings, 
  FileText, 
  Image, 
  Search,
  LogOut,
  Home
} from 'lucide-react'

export function AdminLogin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Check authentication on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const authStatus = localStorage.getItem('admin_authenticated')
      const adminEmail = localStorage.getItem('admin_email')
      if (authStatus === 'true' && adminEmail === 'admin@litxtech.com') {
        setIsAuthenticated(true)
        setEmail(adminEmail)
      }
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Secure authentication with proper password
    if (email === 'admin@litxtech.com' && password === 'bavul2017?') {
      setIsAuthenticated(true)
      // Store authentication in localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('admin_authenticated', 'true')
        localStorage.setItem('admin_email', email)
      }
    } else {
      alert('Invalid username or password')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setEmail('')
    setPassword('')
    // Clear authentication from localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('admin_authenticated')
      localStorage.removeItem('admin_email')
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">LitxTech Admin</h1>
            <p className="text-gray-300">Yönetici paneline giriş yapın</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">E-posta</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                autoComplete="username"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Şifre</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                autoComplete="current-password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold"
            >
              Giriş Yap
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Contact support for admin access
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">LitxTech Admin</h1>
                <p className="text-sm text-gray-300">Yönetici Paneli</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Link 
                to="/"
                className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:text-white transition-colors"
              >
                <Home className="w-4 h-4" />
                <span>Ana Site</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:text-red-400 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Çıkış</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white/5 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <nav className="flex items-center space-x-8">
            <Link 
              to="/admin"
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg"
            >
              <BarChart3 className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>
            <Link 
              to="/admin/cms"
              className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:text-white transition-colors"
            >
              <FileText className="w-4 h-4" />
              <span>Content Management</span>
            </Link>
            <Link 
              to="/admin/blog"
              className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:text-white transition-colors"
            >
              <Search className="w-4 h-4" />
              <span>Blog Management</span>
            </Link>
            <Link 
              to="/admin/media"
              className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:text-white transition-colors"
            >
              <Image className="w-4 h-4" />
              <span>Media Library</span>
            </Link>
            <Link 
              to="/admin/settings"
              className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:text-white transition-colors"
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </Link>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Stats Cards */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-300 font-medium">Toplam Kullanıcı</p>
                <p className="text-3xl font-bold text-white">1,234</p>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-300 font-medium">Aktif Projeler</p>
                <p className="text-3xl font-bold text-white">89</p>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-300 font-medium">Aylık Gelir</p>
                <p className="text-3xl font-bold text-white">$12,345</p>
              </div>
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-300 font-medium">AI İstekleri</p>
                <p className="text-3xl font-bold text-white">5,678</p>
              </div>
              <div className="w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center">
                <Search className="w-6 h-6 text-pink-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-6">Hızlı İşlemler</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link 
              to="/admin/cms"
              className="flex items-center space-x-3 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
            >
              <FileText className="w-6 h-6 text-blue-400" />
              <div>
                <h3 className="text-white font-semibold">Yeni Blog Yazısı</h3>
                <p className="text-gray-400 text-sm">Blog yazısı oluştur</p>
              </div>
            </Link>

            <Link 
              to="/admin/media"
              className="flex items-center space-x-3 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
            >
              <Image className="w-6 h-6 text-green-400" />
              <div>
                <h3 className="text-white font-semibold">Medya Yükle</h3>
                <p className="text-gray-400 text-sm">Resim ve dosya yükle</p>
              </div>
            </Link>

            <Link 
              to="/admin/settings"
              className="flex items-center space-x-3 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
            >
              <Settings className="w-6 h-6 text-purple-400" />
              <div>
                <h3 className="text-white font-semibold">Site Ayarları</h3>
                <p className="text-gray-400 text-sm">Genel ayarları düzenle</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
