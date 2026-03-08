'use client'

import React, { useState } from 'react'
import { 
  BarChart3, 
  Users, 
  FolderOpen, 
  CreditCard, 
  Settings, 
  FileText, 
  Activity,
  Bell,
  Menu,
  X,
  LogOut,
  Home,
  TrendingUp,
  DollarSign,
  Globe,
  Shield,
  Zap,
  CheckCircle,
  AlertCircle
} from 'lucide-react'

// Admin Dashboard Component
export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [stats] = useState({
    totalUsers: 1247,
    activeProjects: 89,
    monthlyRevenue: 15420,
    aiRequests: 4567
  })

  const handleEditPolicy = (policyType: string) => {
    console.log(`Editing ${policyType}`)
    // TODO: Implement policy editor modal
    alert(`Policy editor for ${policyType} will be implemented soon`)
  }

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('admin_authenticated')
      localStorage.removeItem('admin_email')
      window.location.href = '/admin/login'
    }
  }

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, color: 'text-blue-500' },
    { id: 'users', label: 'Kullanıcı Yönetimi', icon: Users, color: 'text-green-500' },
    { id: 'projects', label: 'Proje Yönetimi', icon: FolderOpen, color: 'text-purple-500' },
    { id: 'billing', label: 'Faturalandırma', icon: CreditCard, color: 'text-yellow-500' },
    { id: 'content', label: 'İçerik Yönetimi', icon: FileText, color: 'text-pink-500' },
    { id: 'legal', label: 'Hukuki Dokümanlar', icon: Shield, color: 'text-red-500' },
    { id: 'analytics', label: 'Analitikler', icon: Activity, color: 'text-indigo-500' },
    { id: 'settings', label: 'Sistem Ayarları', icon: Settings, color: 'text-gray-500' }
  ]

  const recentActivities = [
    { id: 1, user: 'Ahmet Yılmaz', action: 'Yeni proje oluşturdu', time: '2 dakika önce', type: 'project' },
    { id: 2, user: 'Fatma Demir', action: 'Pro plan satın aldı', time: '5 dakika önce', type: 'billing' },
    { id: 3, user: 'Mehmet Kaya', action: 'AI Builder kullandı', time: '8 dakika önce', type: 'ai' },
    { id: 4, user: 'Ayşe Özkan', action: 'Proje deploy etti', time: '12 dakika önce', type: 'deploy' }
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Toplam Kullanıcı</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-500" />
                </div>
                <div className="mt-4">
                  <span className="text-green-600 text-sm font-medium">+12% bu ay</span>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Aktif Projeler</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.activeProjects}</p>
                  </div>
                  <FolderOpen className="h-8 w-8 text-green-500" />
                </div>
                <div className="mt-4">
                  <span className="text-green-600 text-sm font-medium">+8% bu hafta</span>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-yellow-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Aylık Gelir</p>
                    <p className="text-3xl font-bold text-gray-900">${stats.monthlyRevenue.toLocaleString()}</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-yellow-500" />
                </div>
                <div className="mt-4">
                  <span className="text-green-600 text-sm font-medium">+23% bu ay</span>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-purple-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">AI İstekleri</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.aiRequests.toLocaleString()}</p>
                  </div>
                  <Zap className="h-8 w-8 text-purple-500" />
                </div>
                <div className="mt-4">
                  <span className="text-green-600 text-sm font-medium">+45% bu ay</span>
                </div>
              </div>
            </div>

            {/* Charts and Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue Chart */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Aylık Gelir Trendi</h3>
                <div className="h-64 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <TrendingUp className="h-12 w-12 text-blue-500 mx-auto mb-2" />
                    <p className="text-gray-600">Grafik burada görünecek</p>
                    <p className="text-sm text-gray-500">Chart.js veya Recharts entegrasyonu</p>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Son Aktiviteler</h3>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className={`w-2 h-2 rounded-full ${
                        activity.type === 'project' ? 'bg-blue-500' :
                        activity.type === 'billing' ? 'bg-green-500' :
                        activity.type === 'ai' ? 'bg-purple-500' : 'bg-yellow-500'
                      }`}></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{activity.user}</p>
                        <p className="text-sm text-gray-600">{activity.action}</p>
                      </div>
                      <span className="text-xs text-gray-500">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )

      case 'legal':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Hukuki Doküman Yönetimi</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <Shield className="h-8 w-8 text-blue-500 mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">Privacy Policy</h3>
                  <p className="text-sm text-gray-600 mb-4">GDPR, CCPA, KVKK uyumlu gizlilik politikası</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">v3.2 - 8 Ağu 2025</span>
                    <button 
                      onClick={() => handleEditPolicy('Privacy Policy')}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      Düzenle
                    </button>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <FileText className="h-8 w-8 text-green-500 mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">Terms of Service</h3>
                  <p className="text-sm text-gray-600 mb-4">Wyoming yasalarına uygun hizmet şartları</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">v2.1 - 8 Ağu 2025</span>
                    <button 
                      onClick={() => handleEditPolicy('Terms of Service')}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      Düzenle
                    </button>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <Users className="h-8 w-8 text-purple-500 mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">Subprocessors</h3>
                  <p className="text-sm text-gray-600 mb-4">35 alt işlemci ve veri işleme ortakları</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">v1.0 - 1 Eyl 2025</span>
                    <button 
                      onClick={() => handleEditPolicy('Subprocessors')}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      Düzenle
                    </button>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <CheckCircle className="h-8 w-8 text-yellow-500 mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">Refund Policy</h3>
                  <p className="text-sm text-gray-600 mb-4">İade ve iptal politikaları</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">v1.5 - 15 Ağu 2025</span>
                    <button 
                      onClick={() => handleEditPolicy('Refund Policy')}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      Düzenle
                    </button>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <Globe className="h-8 w-8 text-pink-500 mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">Cookie Policy</h3>
                  <p className="text-sm text-gray-600 mb-4">Çerez kullanımı ve takip politikaları</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">v1.2 - 20 Ağu 2025</span>
                    <button 
                      onClick={() => handleEditPolicy('Cookie Policy')}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      Düzenle
                    </button>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <AlertCircle className="h-8 w-8 text-red-500 mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">Data Security</h3>
                  <p className="text-sm text-gray-600 mb-4">Veri güvenliği ve şifreleme politikaları</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">v2.0 - 25 Ağu 2025</span>
                    <button 
                      onClick={() => handleEditPolicy('Data Security')}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      Düzenle
                    </button>
                  </div>
                </div>
              </div>

              {/* Legal Compliance Status */}
              <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Uyumluluk Durumu</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                    <div>
                      <p className="font-medium text-gray-900">GDPR Uyumlu</p>
                      <p className="text-sm text-gray-600">Avrupa Birliği</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                    <div>
                      <p className="font-medium text-gray-900">CCPA Uyumlu</p>
                      <p className="text-sm text-gray-600">Kaliforniya</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                    <div>
                      <p className="font-medium text-gray-900">KVKK Uyumlu</p>
                      <p className="text-sm text-gray-600">Türkiye</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {menuItems.find(item => item.id === activeTab)?.label || 'Sayfa'}
            </h2>
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                {React.createElement(menuItems.find(item => item.id === activeTab)?.icon || Settings, { className: "h-16 w-16 mx-auto" })}
              </div>
              <p className="text-gray-600">Bu bölüm geliştirme aşamasında...</p>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Home Button */}
      <div className="fixed top-4 left-4 z-50">
        <a 
          href="/"
          className="flex items-center space-x-2 bg-white text-gray-700 px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-blue-300"
        >
          <Home className="h-4 w-4" />
          <span className="text-sm font-medium">Ana Sayfaya Dön</span>
        </a>
      </div>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">LitxTech Admin</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === item.id
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className={`h-5 w-5 mr-3 ${activeTab === item.id ? 'text-blue-700' : item.color}`} />
                  {item.label}
                </button>
              )
            })}
          </div>
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Çıkış Yap
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
              >
                <Menu className="h-6 w-6" />
              </button>
              <h1 className="text-2xl font-semibold text-gray-900">
                {menuItems.find(item => item.id === activeTab)?.label || 'Dashboard'}
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Bell className="h-6 w-6" />
              </button>
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-sm">
                  A
                </div>
                <span className="text-sm font-medium text-gray-700">Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {renderContent()}
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}
