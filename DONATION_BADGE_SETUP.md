# MyTrabzon Destekçi Etiket Sistemi Kurulum Rehberi

## 1. Supabase SQL Kurulumu

1. Supabase Dashboard'a gidin: https://supabase.com/dashboard
2. Projenizi seçin
3. **SQL Editor** sekmesine gidin
4. `supabase-donation-badge-setup.sql` dosyasındaki tüm kodu kopyalayın
5. SQL Editor'a yapıştırın ve **Run** butonuna tıklayın

Bu SQL kodu şunları oluşturur:
- `user_badges` tablosu (kullanıcı etiketleri)
- `donations` tablosu (bağış kayıtları)
- `add_supporter_badge()` fonksiyonu (otomatik etiket ekleme)
- `toggle_badge_visibility()` fonksiyonu (etiket görünürlüğü)
- `get_user_badges()` fonksiyonu (kullanıcı etiketlerini getirme)
- RLS (Row Level Security) politikaları
- Trigger (bağış tamamlandığında otomatik etiket ekleme)

## 2. Stripe Webhook Yapılandırması

### Vercel Serverless Function

1. `api/stripe-webhook-donation.js` dosyasını Vercel'e deploy edin
2. Stripe Dashboard'da webhook endpoint ekleyin:
   - URL: `https://www.litxtech.com/api/stripe-webhook-donation`
   - Events: `checkout.session.completed`, `payment_intent.payment_failed`
3. Webhook secret'ı environment variable olarak ekleyin: `STRIPE_WEBHOOK_SECRET`

### Environment Variables

Vercel'de şu environment variable'ları ekleyin:
```
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## 3. Destek Paketleri

Sistem şu paketleri destekler:
- **89 ₺** - Temel Destek Paketi
- **139 ₺** - Standart Destek Paketi  
- **339 ₺** - Premium Destek Paketi
- **Özel Miktar** - Kullanıcı istediği miktarı girebilir

## 4. Etiket Sistemi

### Destekçi Etiketi
- Ödeme yapan kullanıcılara otomatik eklenir
- Etiket adı: "Destekçi"
- İkon: Kalp (heart)
- Renk: Pembe (pink)
- Kullanıcı isterse gizleyebilir/gösterebilir

### İlçe Etiketi (Örnek)
- Manuel olarak eklenebilir
- Etiket adı: İlçe adı (örn: "Ortahisar")
- İkon: Harita işareti (map-pin)
- Renk: Mavi (blue)

## 5. Kullanım

### Kullanıcı Tarafı
1. `/donation` sayfasına gidin
2. Destek paketi seçin veya özel miktar girin
3. Ödeme yapın
4. Ödeme tamamlandığında otomatik olarak "Destekçi" etiketi eklenir
5. `/profile` sayfasından etiket görünürlüğünü açıp/kapatabilirsiniz

### Admin Tarafı
- Supabase Dashboard'da `user_badges` tablosundan tüm etiketleri görebilirsiniz
- `donations` tablosundan tüm bağışları görebilirsiniz
- Manuel olarak etiket eklemek için SQL kullanabilirsiniz:

```sql
INSERT INTO user_badges (user_id, badge_type, badge_name, badge_icon, badge_color)
VALUES ('user-uuid', 'district', 'Ortahisar', 'map-pin', 'blue')
ON CONFLICT (user_id, badge_type) DO NOTHING;
```

## 6. Test Etme

1. Test ödemesi yapın (Stripe test kartı: 4242 4242 4242 4242)
2. Webhook'un çalıştığını kontrol edin
3. Supabase'de `donations` tablosunda kaydın oluştuğunu kontrol edin
4. `user_badges` tablosunda "Destekçi" etiketinin eklendiğini kontrol edin
5. Kullanıcı profilinde etiketin göründüğünü kontrol edin

## 7. Sorun Giderme

### Etiket eklenmiyor
- Webhook'un çalıştığını kontrol edin
- Supabase service role key'in doğru olduğundan emin olun
- SQL fonksiyonlarının oluşturulduğunu kontrol edin
- Browser console'da hata mesajlarını kontrol edin

### Etiket görünmüyor
- `user_badges` tablosunda `is_visible = true` olduğundan emin olun
- Kullanıcının doğru user_id'ye sahip olduğunu kontrol edin
- RLS politikalarının doğru yapılandırıldığını kontrol edin

