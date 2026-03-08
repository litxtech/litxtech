# 🔧 Stripe Sorun Giderme Rehberi

## ❌ Yaygın Sorunlar ve Çözümleri

### 1. "Stripe API is not configured" Hatası

**Sorun:** `STRIPE_SECRET_KEY` environment variable'ı ayarlanmamış.

**Çözüm:**
1. Vercel Dashboard'a gidin: https://vercel.com/dashboard
2. Projenizi seçin → **Settings** → **Environment Variables**
3. Şu değişkenleri ekleyin:
   ```
   STRIPE_SECRET_KEY=sk_live_xxxxx (veya sk_test_xxxxx test için)
   NEXT_PUBLIC_SITE_URL=https://your-project.vercel.app
   ```

### 2. "API request failed" Hatası

**Sorun:** API endpoint'ine erişilemiyor.

**Kontrol Listesi:**
- ✅ Vercel'de deploy edilmiş mi?
- ✅ `/api/stripe-checkout` endpoint'i çalışıyor mu?
- ✅ CORS ayarları doğru mu?

**Test:**
```bash
# API endpoint'ini test et
curl https://your-project.vercel.app/api/stripe-checkout
```

### 3. "Invalid package ID" Hatası

**Sorun:** Frontend'den gönderilen `packageId` backend'de tanımlı değil.

**Çözüm:**
- `api/stripe-checkout.js` dosyasındaki `STRIPE_PRODUCTS` objesine yeni paket ekleyin
- Frontend'deki paket ID'lerinin backend ile eşleştiğinden emin olun

### 4. Checkout Sayfası Açılmıyor

**Sorun:** Stripe Checkout Session oluşturulamıyor.

**Kontrol:**
1. Browser console'da hata mesajlarını kontrol edin
2. Network tab'ında API isteğini kontrol edin
3. Vercel function logs'ları kontrol edin

### 5. Ödeme Sonrası Yönlendirme Çalışmıyor

**Sorun:** Success/Cancel URL'leri yanlış.

**Çözüm:**
- `NEXT_PUBLIC_SITE_URL` environment variable'ını doğru ayarlayın
- Success ve Cancel sayfalarının mevcut olduğundan emin olun

## 🔍 Debug Adımları

### 1. Environment Variables Kontrolü

Vercel Dashboard'da kontrol edin:
```
✅ STRIPE_SECRET_KEY
✅ NEXT_PUBLIC_SITE_URL
```

### 2. API Endpoint Testi

```bash
# Health check
curl https://your-project.vercel.app/api/stripe-checkout

# Beklenen yanıt:
# {"status":"OK","message":"Stripe API is ready for payments"}
```

### 3. Browser Console Kontrolü

F12 → Console tab'ında şunları kontrol edin:
- API isteği gönderiliyor mu?
- Hata mesajı var mı?
- Response döndü mü?

### 4. Vercel Function Logs

Vercel Dashboard → **Deployments** → **Function Logs** bölümünde:
- Stripe API hataları
- Environment variable eksiklikleri
- Request/response logları

## ✅ Doğru Yapılandırma

### Vercel Environment Variables

```bash
# Stripe Keys
STRIPE_SECRET_KEY=sk_live_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://your-project.vercel.app

# Supabase (eğer kullanılıyorsa)
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### API Endpoint Yapısı

```
/api/stripe-checkout.js  → Vercel Serverless Function
  ├── GET  → Health check
  └── POST → Create checkout session
```

### Frontend Integration

```typescript
// src/lib/stripe.ts
const API_BASE_URL = 'https://your-project.vercel.app'
const response = await fetch(`${API_BASE_URL}/api/stripe-checkout`, {
  method: 'POST',
  body: JSON.stringify({ packageId, packageName, packagePrice })
})
```

## 🚨 Acil Çözümler

### Stripe Çalışmıyor mu?

1. **Vercel'e deploy edildi mi?**
   ```bash
   vercel --prod
   ```

2. **Environment variables ayarlandı mı?**
   - Vercel Dashboard → Settings → Environment Variables

3. **API endpoint çalışıyor mu?**
   - https://your-project.vercel.app/api/stripe-checkout

4. **Stripe key'leri doğru mu?**
   - Test mode: `sk_test_...`
   - Live mode: `sk_live_...`

### Hala Çalışmıyor mu?

1. Vercel function logs'larını kontrol edin
2. Browser console'da hata mesajlarını okuyun
3. Network tab'ında API isteğini inceleyin
4. Stripe Dashboard'da webhook'ları kontrol edin


