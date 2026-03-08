# 🚀 Stripe Dashboard Kurulum Rehberi

## 📋 Adım 1: Stripe Dashboard'a Giriş
1. [Stripe Dashboard](https://dashboard.stripe.com) → Giriş yap
2. **Test Mode** aktif olduğundan emin ol (geliştirme için)

## 💳 Adım 2: Ürünler Oluştur

### LITE Paketi ($199)
1. **Products** → **Add Product**
2. **Product Name:** `LITE Package`
3. **Description:** `Basit web site (kurumsal / portföy)`
4. **Pricing Model:** `One-time`
5. **Price:** `$199.00`
6. **Currency:** `USD`
7. **Save** → Price ID'yi kopyala: `price_xxxxx`

### PRO Paketi ($499)
1. **Products** → **Add Product**
2. **Product Name:** `PRO Package`
3. **Description:** `Otomasyonlu SaaS / API entegrasyonlu site`
4. **Pricing Model:** `One-time`
5. **Price:** `$499.00`
6. **Currency:** `USD`
7. **Save** → Price ID'yi kopyala: `price_xxxxx`

### ULTRA Paketi ($999)
1. **Products** → **Add Product**
2. **Product Name:** `ULTRA Package`
3. **Description:** `Tam sistem + kullanıcı yönetimi + ödeme entegrasyonu`
4. **Pricing Model:** `One-time`
5. **Price:** `$999.00`
6. **Currency:** `USD`
7. **Save** → Price ID'yi kopyala: `price_xxxxx`

## 🔑 Adım 3: API Keys Al
1. **Developers** → **API Keys**
2. **Publishable key** kopyala: `pk_test_xxxxx`
3. **Secret key** kopyala: `sk_test_xxxxx`

## 🔗 Adım 4: Webhook Oluştur
1. **Developers** → **Webhooks** → **Add endpoint**
2. **Endpoint URL:** `http://localhost:3001/api/stripe/webhook`
3. **Events to send:**
   - `checkout.session.completed`
   - `payment_intent.payment_failed`
4. **Add endpoint** → **Signing secret** kopyala: `whsec_xxxxx`

## ⚙️ Adım 5: Environment Variables Ayarla

### Backend (.env)
```bash
STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
STRIPE_LITE_PRICE_ID=price_xxxxx
STRIPE_PRO_PRICE_ID=price_xxxxx
STRIPE_ULTRA_PRICE_ID=price_xxxxx
CLIENT_URL=http://localhost:5173
PORT=3001
```

### Frontend (.env.local)
```bash
VITE_API_URL=http://localhost:3001
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
VITE_SITE_URL=https://www.litxtech.com
```

## 🧪 Adım 6: Test Kartları
Stripe test kartları:
- **Başarılı:** `4242 4242 4242 4242`
- **Başarısız:** `4000 0000 0000 0002`
- **CVV:** `123`
- **Tarih:** Gelecek tarih
- **ZIP:** `12345`

## 🚀 Adım 7: Test Et
1. `npm run server` (backend)
2. `npm run dev` (frontend)
3. Ana sayfa → Paket seç → Satın Al
4. Test kartı ile ödeme yap
5. Success sayfasına yönlendirilmeli

## 🔧 Sorun Giderme

### Server Bağlantı Hatası
```bash
# Server çalışıyor mu kontrol et
curl http://localhost:3001/api/health
```

### CORS Hatası
- Backend'de CORS ayarları kontrol et
- Frontend URL'i doğru mu?

### Stripe API Hatası
- API key'ler doğru mu?
- Test mode aktif mi?
- Price ID'ler doğru mu?

## 📞 Destek
- **Stripe Docs:** https://stripe.com/docs
- **Test Kartları:** https://stripe.com/docs/testing
- **Webhook Test:** https://stripe.com/docs/webhooks/test
