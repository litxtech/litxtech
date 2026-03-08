# 🔧 Stripe Sorunları ve Çözümleri

## ❌ Tespit Edilen Sorunlar

### 1. **Environment Variable Eksikliği**
- `STRIPE_SECRET_KEY` Vercel'de ayarlanmamış olabilir
- API endpoint'i Stripe key olmadan çalışamaz

### 2. **API URL Sorunu**
- Frontend sabit olarak `https://www.litxtech.com` kullanıyor
- Vercel deploy edildiğinde farklı URL kullanılmalı

### 3. **Hata Mesajları Eksik**
- Stripe key yoksa kullanıcıya net hata mesajı gösterilmiyor

## ✅ Yapılan Düzeltmeler

### 1. **API Endpoint Güncellemeleri** (`api/stripe-checkout.js`)

#### Stripe Initialization
```javascript
// Önce: Hata kontrolü yoktu
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// Sonra: Hata kontrolü eklendi
if (!process.env.STRIPE_SECRET_KEY) {
  console.error('❌ STRIPE_SECRET_KEY environment variable is missing!')
}
const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2024-06-20' })
  : null
```

#### GET Endpoint (Health Check)
```javascript
// Stripe key kontrolü eklendi
if (!stripe) {
  return res.status(500).json({ 
    status: 'ERROR',
    message: 'Stripe is not configured. Please set STRIPE_SECRET_KEY environment variable.',
    error: 'STRIPE_SECRET_KEY is missing'
  })
}
```

#### POST Endpoint (Checkout)
```javascript
// Stripe key kontrolü eklendi
if (!stripe) {
  return res.status(500).json({ 
    error: 'Stripe is not configured',
    message: 'Please set STRIPE_SECRET_KEY environment variable in Vercel',
    help: 'Go to Vercel Dashboard → Settings → Environment Variables → Add STRIPE_SECRET_KEY'
  })
}
```

#### Success/Cancel URL'leri
```javascript
// Önce: Sabit URL
success_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.litxtech.com'}/success`

// Sonra: Vercel URL desteği
success_url: `${process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : process.env.NEXT_PUBLIC_SITE_URL || 'https://www.litxtech.com'}/success`
```

### 2. **Frontend API URL Güncellemesi** (`src/lib/stripe.ts`)

#### Dynamic API URL
```typescript
// Önce: Sabit URL
const API_BASE_URL = 'https://www.litxtech.com'

// Sonra: Dinamik URL
const getApiBaseUrl = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL
  }
  if (window.location.hostname.includes('vercel.app')) {
    return `https://${window.location.hostname}`
  }
  if (window.location.hostname === 'www.litxtech.com') {
    return 'https://www.litxtech.com'
  }
  return 'http://localhost:3001'
}
```

## 📋 Yapılması Gerekenler

### 1. Vercel Environment Variables Ayarlayın

Vercel Dashboard → Settings → Environment Variables:

```bash
# Zorunlu
STRIPE_SECRET_KEY=sk_live_xxxxx (veya sk_test_xxxxx test için)
NEXT_PUBLIC_SITE_URL=https://your-project.vercel.app

# Opsiyonel (frontend için)
VITE_API_URL=https://your-project.vercel.app
```

### 2. Deploy Sonrası Test

```bash
# 1. Health check
curl https://your-project.vercel.app/api/stripe-checkout

# Beklenen yanıt:
# {"status":"OK","message":"Stripe API is ready for payments","hasStripeKey":true}

# 2. Eğer hata varsa:
# {"status":"ERROR","message":"Stripe is not configured...","error":"STRIPE_SECRET_KEY is missing"}
```

### 3. Browser Console Kontrolü

F12 → Console'da şunları kontrol edin:
- API isteği gönderiliyor mu?
- Hata mesajı var mı?
- Response döndü mü?

## 🔍 Sorun Giderme

### Stripe Hala Çalışmıyor mu?

1. **Vercel Environment Variables Kontrolü**
   - ✅ `STRIPE_SECRET_KEY` var mı?
   - ✅ `NEXT_PUBLIC_SITE_URL` var mı?

2. **API Endpoint Testi**
   ```bash
   curl https://your-project.vercel.app/api/stripe-checkout
   ```

3. **Vercel Function Logs**
   - Vercel Dashboard → Deployments → Function Logs
   - Stripe API hatalarını kontrol edin

4. **Browser Console**
   - F12 → Console tab
   - Network tab → API isteğini inceleyin

## ✅ Beklenen Sonuç

Stripe düzgün çalıştığında:
- ✅ API endpoint health check başarılı
- ✅ Checkout session oluşturuluyor
- ✅ Stripe checkout sayfası açılıyor
- ✅ Ödeme sonrası success sayfasına yönlendiriliyor


