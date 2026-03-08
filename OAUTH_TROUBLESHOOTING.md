# OAuth (Google/X) Giriş Sorun Giderme Rehberi

## Sorun: "Sistem yapılandırması eksik" Hatası

Google veya X (Twitter) ile giriş yaparken bu hata alınıyorsa, aşağıdaki adımları kontrol edin.

## 1. Environment Variables Kontrolü

### Kontrol Listesi

- [ ] `.env` dosyası proje kök dizininde var mı?
- [ ] `VITE_SUPABASE_URL` değişkeni ayarlı mı?
- [ ] `VITE_SUPABASE_ANON_KEY` değişkeni ayarlı mı?

### Nasıl Kontrol Edilir?

1. Proje kök dizininde `.env` dosyası oluşturun (yoksa):
```bash
# .env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

2. Supabase Dashboard'dan bilgileri alın:
   - https://supabase.com/dashboard
   - Projenizi seçin
   - **Settings** > **API**
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon/public key** → `VITE_SUPABASE_ANON_KEY`

3. Development server'ı yeniden başlatın:
```bash
npm run dev
```

4. Browser console'u açın (F12) ve kontrol edin:
```javascript
console.log('VITE_SUPABASE_URL:', import.meta.env.VITE_SUPABASE_URL)
console.log('VITE_SUPABASE_ANON_KEY:', import.meta.env.VITE_SUPABASE_ANON_KEY ? 'Set' : 'Missing')
```

## 2. Supabase Dashboard OAuth Yapılandırması

### Google OAuth

1. **Supabase Dashboard**:
   - Settings > Authentication > Providers
   - **Google** provider'ını bulun
   - **Enable** butonuna tıklayın
   - **Client ID** ve **Client Secret** girin

2. **Google Cloud Console**:
   - https://console.cloud.google.com/
   - Projenizi seçin
   - **APIs & Services** > **Credentials**
   - **OAuth 2.0 Client ID** oluşturun
   - **Authorized redirect URIs** ekleyin:
     ```
     https://YOUR_PROJECT_ID.supabase.co/auth/v1/callback
     ```
   - **Client ID** ve **Client Secret**'ı kopyalayın

### X (Twitter) OAuth

1. **Supabase Dashboard**:
   - Settings > Authentication > Providers
   - **Twitter** provider'ını bulun
   - **Enable** butonuna tıklayın
   - **API Key** ve **API Secret Key** girin

2. **Twitter Developer Portal**:
   - https://developer.twitter.com/
   - App oluşturun
   - **App settings** > **User authentication settings**
   - **Callback URI / Redirect URL** ekleyin:
     ```
     https://YOUR_PROJECT_ID.supabase.co/auth/v1/callback
     ```
   - **API Key** ve **API Secret**'ı kopyalayın

## 3. Redirect URL Kontrolü

Supabase Dashboard'da **Settings** > **Authentication** > **URL Configuration** bölümünde şu URL'lerin ekli olduğundan emin olun:

```
https://www.litxtech.com/auth/callback
https://litxtech.com/auth/callback
http://localhost:3000/auth/callback
http://localhost:8081/auth/callback
mytrabzon://auth/callback
litxtech://auth/callback
```

## 4. Browser Console Kontrolü

OAuth butonuna tıkladığınızda browser console'da (F12) şunları kontrol edin:

### Başarılı Durum:
```
Product found: {...}
Frontend price: 99
OAuth redirect başlatılıyor...
```

### Hata Durumları:

**"Auth not configured"**:
```
✗ VITE_SUPABASE_URL: Missing
✗ VITE_SUPABASE_ANON_KEY: Missing
```
→ Environment variable'ları ayarlayın

**"OAuth provider not enabled"**:
```
Error: OAuth provider not enabled
```
→ Supabase Dashboard'da provider'ı aktif edin

**"Redirect URI mismatch"**:
```
Error: redirect_uri_mismatch
```
→ Google/Twitter dashboard'da redirect URI'yi kontrol edin

## 5. Adım Adım Test

### Test 1: Environment Variables
```bash
# Terminal'de
echo $VITE_SUPABASE_URL
echo $VITE_SUPABASE_ANON_KEY
```

### Test 2: Supabase Bağlantısı
Browser console'da:
```javascript
// Supabase client'ın oluşturulup oluşturulmadığını kontrol edin
import { supabase } from './lib/supabase'
console.log('Supabase client:', supabase ? 'OK' : 'NULL')
```

### Test 3: OAuth Provider Durumu
Supabase Dashboard'da:
- Settings > Authentication > Providers
- Google ve Twitter'ın **Enabled** olduğunu kontrol edin
- Credential'ların dolu olduğunu kontrol edin

## 6. Yaygın Hatalar ve Çözümleri

### Hata: "Auth not configured"
**Çözüm**: `.env` dosyasını oluşturun ve environment variable'ları ekleyin

### Hata: "OAuth provider not enabled"
**Çözüm**: Supabase Dashboard'da provider'ı aktif edin ve credential'ları girin

### Hata: "redirect_uri_mismatch"
**Çözüm**: 
- Google Cloud Console'da redirect URI'yi kontrol edin
- Twitter Developer Portal'da callback URI'yi kontrol edin
- Supabase project ID'nizi doğru kullandığınızdan emin olun

### Hata: "Invalid client"
**Çözüm**: 
- Client ID ve Secret'ların doğru kopyalandığından emin olun
- Boşluk veya fazladan karakter olmadığını kontrol edin
- Provider'ı disable/enable yaparak yeniden deneyin

## 7. Production (Vercel) Kontrolü

Vercel'de deploy ediyorsanız:

1. Vercel Dashboard > Projeniz > Settings > Environment Variables
2. Şu variable'ları ekleyin:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. Deploy'u yeniden yapın

## 8. Debug Checklist

- [ ] `.env` dosyası var ve doğru dizinde
- [ ] Environment variable'lar doğru yazılmış (typo yok)
- [ ] Development server yeniden başlatıldı
- [ ] Supabase Dashboard'da provider'lar aktif
- [ ] Google/Twitter dashboard'da redirect URI'ler doğru
- [ ] Browser console'da hata mesajı kontrol edildi
- [ ] Network tab'ında API istekleri kontrol edildi

## 9. Hızlı Test Komutu

Browser console'da çalıştırın:
```javascript
// Environment variable kontrolü
const checkEnv = () => {
  const url = import.meta.env.VITE_SUPABASE_URL
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY
  
  console.log('=== Environment Variables Check ===')
  console.log('VITE_SUPABASE_URL:', url ? '✓ Set' : '✗ Missing')
  console.log('VITE_SUPABASE_ANON_KEY:', key ? '✓ Set' : '✗ Missing')
  
  if (!url || !key) {
    console.error('❌ Environment variables are missing!')
    console.log('Create .env file with:')
    console.log('VITE_SUPABASE_URL=your_url')
    console.log('VITE_SUPABASE_ANON_KEY=your_key')
  } else {
    console.log('✅ Environment variables are set')
  }
}

checkEnv()
```

## 10. Destek

Eğer hala sorun devam ediyorsa:

1. Browser console'daki tam hata mesajını kaydedin
2. Network tab'ında failed request'leri kontrol edin
3. Supabase Dashboard'da provider ayarlarını screenshot alın
4. Bu bilgilerle yöneticiye başvurun

