'use client'

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminDashboard from '../components/AdminDashboard'
import { ContentManagementSystem } from '../components/ContentManagementSystem'
import { BlogManagement } from './BlogManagement'

export function AdminPage() {
  const [activeSection, setActiveSection] = useState<'dashboard' | 'cms' | 'blog'>('dashboard')
  const navigate = useNavigate()

  // Authentication guard
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const authStatus = localStorage.getItem('admin_authenticated')
      const adminEmail = localStorage.getItem('admin_email')
      
      if (authStatus !== 'true' || adminEmail !== 'admin@litxtech.com') {
        navigate('/admin/login')
      }
    }
  }, [navigate])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Admin Navigation */}
      <div className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
              <nav className="flex space-x-6">
                <button
                  onClick={() => setActiveSection('dashboard')}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    activeSection === 'dashboard'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setActiveSection('cms')}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    activeSection === 'cms'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  Content Management
                </button>
                <button
                  onClick={() => setActiveSection('blog')}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    activeSection === 'blog'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  Blog Management
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeSection === 'dashboard' && <AdminDashboard />}
        {activeSection === 'cms' && <ContentManagementSystem />}
        {activeSection === 'blog' && <BlogManagement />}
      </div>
    </div>
  )
}