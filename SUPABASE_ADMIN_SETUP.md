# Supabase Admin Panel Kurulum Rehberi

## 1. Supabase Projesi Kurulumu

### Adım 1: Supabase Dashboard'a Git
1. https://supabase.com/dashboard adresine git
2. "New Project" butonuna tıkla
3. Proje adı: `litxtech-admin`
4. Database Password: Güçlü bir şifre oluştur
5. Region: En yakın bölgeyi seç
6. "Create new project" butonuna tıkla

### Adım 2: SQL Kodlarını Çalıştır
1. Supabase Dashboard'da "SQL Editor" sekmesine git
2. `supabase-admin-setup.sql` dosyasındaki tüm kodu kopyala
3. SQL Editor'a yapıştır
4. "Run" butonuna tıkla

### Adım 3: Environment Variables Ekle
Supabase Dashboard'da "Settings" > "API" sekmesinden:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## 2. Frontend Entegrasyonu

### Supabase Client Kurulumu
```bash
npm install @supabase/supabase-js
```

### Supabase Client Dosyası
`src/lib/supabase.ts` dosyası oluştur:

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Admin authentication fonksiyonları
export const adminAuth = {
  async login(email: string, password: string) {
    // Şifre hash'ini kontrol et
    const { data, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', email)
      .eq('is_active', true)
      .single()

    if (error || !data) {
      throw new Error('Invalid credentials')
    }

    // Şifre kontrolü (bcrypt ile hash'lenmiş)
    const bcrypt = await import('bcryptjs')
    const isValid = await bcrypt.compare(password, data.password_hash)
    
    if (!isValid) {
      throw new Error('Invalid credentials')
    }

    // Session token oluştur
    const sessionToken = crypto.randomUUID()
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 saat

    // Session kaydet
    const { error: sessionError } = await supabase
      .from('admin_sessions')
      .insert({
        admin_user_id: data.id,
        session_token: sessionToken,
        expires_at: expiresAt.toISOString(),
        ip_address: null, // Client-side'da IP alamayız
        user_agent: navigator.userAgent
      })

    if (sessionError) {
      throw new Error('Session creation failed')
    }

    // Session token'ı localStorage'a kaydet
    localStorage.setItem('admin_session_token', sessionToken)
    localStorage.setItem('admin_user', JSON.stringify({
      id: data.id,
      email: data.email,
      role: data.role,
      full_name: data.full_name
    }))

    return { user: data, sessionToken }
  },

  async logout() {
    const sessionToken = localStorage.getItem('admin_session_token')
    
    if (sessionToken) {
      await supabase
        .from('admin_sessions')
        .delete()
        .eq('session_token', sessionToken)
    }

    localStorage.removeItem('admin_session_token')
    localStorage.removeItem('admin_user')
  },

  async validateSession() {
    const sessionToken = localStorage.getItem('admin_session_token')
    
    if (!sessionToken) {
      return null
    }

    const { data, error } = await supabase
      .rpc('validate_admin_session', { token: sessionToken })

    if (error || !data || data.length === 0) {
      this.logout()
      return null
    }

    return data[0]
  },

  async getCurrentUser() {
    const session = await this.validateSession()
    if (!session) return null

    const userData = localStorage.getItem('admin_user')
    return userData ? JSON.parse(userData) : null
  }
}
```

## 3. Admin Panel Bileşenleri

### Güncellenmiş AdminLogin.tsx
```typescript
'use client'

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { adminAuth } from '../lib/supabase'

export function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    // Mevcut session'ı kontrol et
    adminAuth.validateSession().then(session => {
      if (session) {
        navigate('/admin')
      }
    })
  }, [navigate])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      await adminAuth.login(email, password)
      navigate('/admin')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Admin Panel</h1>
          <p className="text-gray-300">LitxTech LLC Management</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="admin@litxtech.com"
              autoComplete="username"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
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
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold disabled:opacity-50"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
```

### Güncellenmiş AdminPage.tsx
```typescript
'use client'

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { adminAuth } from '../lib/supabase'
import AdminDashboard from '../components/AdminDashboard'

export function AdminPage() {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const checkAuth = async () => {
      const currentUser = await adminAuth.getCurrentUser()
      if (!currentUser) {
        navigate('/admin/login')
        return
      }
      setUser(currentUser)
      setIsLoading(false)
    }

    checkAuth()
  }, [navigate])

  const handleLogout = async () => {
    await adminAuth.logout()
    navigate('/admin/login')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <AdminDashboard user={user} onLogout={handleLogout} />
    </div>
  )
}
```

## 4. Environment Variables

`.env.local` dosyası oluştur:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## 5. Paket Kurulumu

```bash
npm install @supabase/supabase-js bcryptjs
npm install --save-dev @types/bcryptjs
```

## 6. Test

1. Supabase Dashboard'da "Authentication" > "Users" sekmesine git
2. Admin kullanıcısının oluşturulduğunu kontrol et
3. `admin@litxtech.com` / `bavul2017?` ile giriş yap
4. Admin panelinin çalıştığını kontrol et

## 7. Güvenlik Notları

- Service Role Key'i asla frontend'de kullanma
- RLS politikaları aktif
- Session token'ları 24 saat sonra expire oluyor
- Şifreler bcrypt ile hash'leniyor
- IP ve User Agent loglanıyor
