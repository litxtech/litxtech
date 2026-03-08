# 🚀 Vercel Deploy Talimatları

## Hızlı Deploy (Vercel CLI ile)

### 1. Vercel CLI Kurulumu

```bash
npm install -g vercel
```

### 2. Vercel'e Giriş Yapın

```bash
vercel login
```

### 3. Projeyi Deploy Edin

```bash
# Production deploy
vercel --prod

# Veya npm script kullanarak
npm run deploy
```

## GitHub ile Otomatik Deploy

### 1. GitHub Repository'ye Push Edin

```bash
git add .
git commit -m "🚀 Deploy hazırlığı"
git push origin main
```

### 2. Vercel Dashboard'da Proje Bağlayın

1. <https://vercel.com/dashboard> adresine gidin
2. **Add New Project** butonuna tıklayın
3. GitHub repository'nizi seçin
4. **Import** butonuna tıklayın

### 3. Environment Variables Ayarlayın

Vercel Dashboard'da **Settings** > **Environment Variables** bölümüne gidin ve şu değişkenleri ekleyin:

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
STRIPE_SECRET_KEY=sk_live_xxxxx (veya sk_test_xxxxx test için)
NEXT_PUBLIC_SITE_URL=https://litxtech.com
```

**Önemli:** Production, Preview ve Development için ayrı ayrı ekleyin.

**Stripe Key Alma:**

1. [Stripe Dashboard](https://dashboard.stripe.com) → **Developers** → **API Keys**
2. **Secret key**'i kopyalayın (`sk_live_xxxxx` veya `sk_test_xxxxx`)
3. Vercel'e ekleyin

### 4. Build Ayarları

Vercel otomatik olarak `vercel.json` dosyasındaki ayarları kullanacak:

- **Framework:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

## Deploy Sonrası Kontroller

### 1. Supabase Redirect URL'leri Güncelleyin

Supabase Dashboard'da **Settings** > **Authentication** > **URL Configuration** bölümüne gidin ve deploy edilen URL'i ekleyin:

```text
https://your-project.vercel.app/auth/callback
https://your-project.vercel.app/mytrabzon/callback
https://your-project.vercel.app/auth/reset-password
https://your-project.vercel.app/auth/confirm
https://your-project.vercel.app/auth/onboarding
```

### 2. Google OAuth Ayarları

Google Cloud Console'da **Authorized redirect URIs** bölümüne ekleyin:

```text
https://your-project.vercel.app/auth/callback
```

### 3. Apple OAuth Ayarları

Apple Developer Portal'da **Services ID** yapılandırmasında **Return URLs** bölümüne ekleyin:

```text
https://your-project.vercel.app/auth/callback
```

**Not:** Apple OAuth için Supabase Dashboard'da Apple provider'ını yapılandırmanız gerekmektedir. Detaylı bilgi için `SUPABASE_OAUTH_SETUP.md` dosyasına bakın.

## Sorun Giderme

### Build Hatası

- Environment variables'ların doğru ayarlandığından emin olun
- `npm run build` komutunu lokal olarak test edin
- Vercel build loglarını kontrol edin

### OAuth Çalışmıyor

- Supabase redirect URL'lerinin doğru olduğundan emin olun
- Google/Apple OAuth ayarlarını kontrol edin
- Browser console'da hata mesajlarını kontrol edin

### 404 Hatası

- `vercel.json` dosyasındaki rewrites ayarlarını kontrol edin
- React Router'ın doğru yapılandırıldığından emin olun

## Önemli Notlar

- ✅ `vercel.json` dosyası SPA routing için gerekli
- ✅ Environment variables production'da mutlaka ayarlanmalı
- ✅ OAuth callback URL'leri hem Supabase hem de OAuth provider'larda ayarlanmalı
- ✅ Mobil uygulama için web sitesi deploy edilmiş olmalı
- ✅ Şifre sıfırlama için redirect URL'lerinin doğru yapılandırıldığından emin olun
