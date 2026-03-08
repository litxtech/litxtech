# 🔍 Stripe Sorun Giderme Rehberi

## ❌ Stripe Neden Çalışmıyor?

### 1. Environment Variables Kontrolü

Vercel Dashboard'da şu değişkenlerin ayarlı olduğundan emin olun:

```env
STRIPE_SECRET_KEY=sk_live_xxxxx (veya sk_test_xxxxx test için)
NEXT_PUBLIC_SITE_URL=https://litxtech.com (veya Vercel URL'iniz)
```

**Kontrol:**
1. Vercel Dashboard → Projeniz → Settings → Environment Variables
2. `STRIPE_SECRET_KEY` var mı kontrol edin
3. Production, Preview ve Development için ayrı ayrı ekleyin

### 2. API Endpoint Kontrolü

Stripe API endpoint'inin çalışıp çalışmadığını test edin:

```bash
# Health check
curl https://your-project.vercel.app/api/stripe-checkout

# Beklenen yanıt:
# {"status":"OK","message":"Stripe API is ready for payments","hasStripeKey":true}
```

**Eğer hata alıyorsanız:**
- `{"status":"ERROR","error":"STRIPE_SECRET_KEY is missing"}` → Environment variable eksik
- `404 Not Found` → API route yanlış yapılandırılmış
- `500 Internal Server Error` → Stripe key geçersiz veya hatalı

### 3. Browser Console Kontrolü

Tarayıcı konsolunda şu hataları kontrol edin:

- `Failed to fetch` → API endpoint'e erişilemiyor
- `CORS error` → CORS ayarları yanlış
- `Checkout URL oluşturulamadı` → Stripe session oluşturulamıyor

### 4. Vercel Function Logs

Vercel Dashboard → Projeniz → Deployments → Son deployment → Functions → `api/stripe-checkout` → Logs

Burada şu hataları görebilirsiniz:
- `STRIPE_SECRET_KEY is missing`
- `Invalid API Key`
- `Package ID not found`

## ✅ Hızlı Çözümler

### Çözüm 1: Environment Variables Ekle

Vercel Dashboard'da:
1. Settings → Environment Variables
2. Add New:
   - Key: `STRIPE_SECRET_KEY`
   - Value: `sk_live_xxxxx` (Stripe Dashboard'dan alın)
   - Environment: Production, Preview, Development (hepsini seçin)
3. Save
4. Redeploy yapın

### Çözüm 2: API URL Kontrolü

`src/lib/stripe.ts` dosyasında API URL'inin doğru olduğundan emin olun:

```typescript
// Production URL kontrolü
if (window.location.hostname === 'www.litxtech.com' || window.location.hostname === 'litxtech.com') {
  return 'https://www.litxtech.com'
}
```

### Çözüm 3: Stripe Key Testi

Stripe Dashboard'da:
1. Developers → API Keys
2. Test mode'da mı yoksa Live mode'da mı olduğunuzu kontrol edin
3. Secret key'i kopyalayın ve Vercel'e ekleyin
4. Test için: `sk_test_xxxxx`
5. Production için: `sk_live_xxxxx`

## 🔧 Debug Adımları

### Adım 1: API Health Check

Tarayıcı console'unda:
```javascript
fetch('https://your-project.vercel.app/api/stripe-checkout')
  .then(r => r.json())
  .then(console.log)
```

### Adım 2: Checkout Test

```javascript
fetch('https://your-project.vercel.app/api/stripe-checkout', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    packageId: 'starter-website',
    packageName: 'Starter Website',
    packagePrice: 199
  })
})
.then(r => r.json())
.then(console.log)
```

### Adım 3: Vercel Logs Kontrolü

Vercel Dashboard → Deployments → Son deployment → Functions → Logs

## 📝 Yaygın Hatalar

### "Stripe is not configured"
- **Neden:** `STRIPE_SECRET_KEY` environment variable eksik
- **Çözüm:** Vercel Dashboard'da environment variable ekleyin

### "Invalid package ID"
- **Neden:** Frontend'den gönderilen packageId backend'de tanımlı değil
- **Çözüm:** `api/stripe-checkout.js` dosyasındaki `STRIPE_PRODUCTS` objesini kontrol edin

### "API request failed"
- **Neden:** API endpoint'e erişilemiyor
- **Çözüm:** Vercel'de deploy edilmiş mi kontrol edin, API URL'ini kontrol edin

### "Checkout URL oluşturulamadı"
- **Neden:** Stripe session oluşturulamıyor
- **Çözüm:** Stripe key'in geçerli olduğundan emin olun, Vercel logs'ları kontrol edin

