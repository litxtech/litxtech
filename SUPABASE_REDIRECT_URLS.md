# Supabase Redirect URL'leri - Güncel Liste

Bu dosya Supabase Dashboard'da **Settings** > **Authentication** > **URL Configuration** bölümüne eklenmesi gereken tüm redirect URL'lerini içerir.

## Site URL

```text
https://litxtech.com
```

## Redirect URLs (Her URL'yi ayrı satırda ekleyin)

### Production URLs

```text
https://www.litxtech.com/auth/reset-password
https://www.litxtech.com/auth/confirm
https://www.litxtech.com/auth/callback
https://litxtech.com/auth/reset-password
https://litxtech.com/auth/callback
https://litxtech.com/auth/onboarding
https://xcvcplwimicylaxghiak.supabase.co/auth/v1/callback
```

### Development URLs

```text
http://localhost:3000
http://localhost:3000/auth/reset-password
http://localhost:3000/auth/callback
http://localhost:3000/auth/onboarding
http://localhost:8081
http://localhost:8081/auth/reset-password
http://localhost:8081/auth/callback
http://localhost:8081/auth/onboarding
```

### Mobile/Deep Link URLs

```text
mytrabzon://auth/reset-password
mytrabzon://auth/callback
mytrabzon://auth/onboarding
litxtech://auth/onboarding
```

## Önemli Notlar

1. **Her URL'yi ayrı satırda ekleyin** - Supabase her URL'yi ayrı bir satır olarak bekler
2. **Trailing slash kullanmayın** - URL'lerin sonunda `/` olmamalı
3. **HTTP vs HTTPS** - Production için HTTPS, development için HTTP kullanın
4. **Supabase Callback URL** - `https://xcvcplwimicylaxghiak.supabase.co/auth/v1/callback` OAuth provider'lar için gereklidir
5. **Değişikliklerin etkili olması** - URL'leri ekledikten sonra birkaç dakika bekleyin

## Nasıl Eklenir?

1. Supabase Dashboard'a gidin: <https://supabase.com/dashboard>
2. Projenizi seçin
3. **Settings** > **Authentication** > **URL Configuration** bölümüne gidin
4. **Site URL** alanına `https://litxtech.com` yazın
5. **Redirect URLs** bölümüne yukarıdaki tüm URL'leri kopyalayıp yapıştırın (her URL ayrı satırda)
6. **Save** butonuna tıklayın
7. Birkaç dakika bekleyin (değişikliklerin yayılması için)

## Test Etme

URL'leri ekledikten sonra şu işlemleri test edin:

- ✅ OAuth girişi (Google/Apple)
- ✅ Şifre sıfırlama
- ✅ E-posta doğrulama
- ✅ Magic link girişi
- ✅ Onboarding akışı

## Sorun Giderme

### "Redirect URI mismatch" hatası

- URL'lerin tam olarak eşleştiğinden emin olun
- Trailing slash olmadığından emin olun
- HTTP/HTTPS protokolünün doğru olduğundan emin olun

### URL eklenmiyor

- Her URL'yi ayrı satırda yazdığınızdan emin olun
- Özel karakterler olmadığından emin olun
- Supabase Dashboard'u yenileyin
