# Supabase Authentication Yapılandırma Rehberi

Eksiksiz authentication sisteminin çalışması için Supabase Dashboard'da aşağıdaki ayarları yapmanız gerekiyor:

## 1. Site URL Ayarları

1. Supabase Dashboard'a giriş yapın: https://supabase.com/dashboard
2. Projenizi seçin
3. **Settings** > **Authentication** > **URL Configuration** bölümüne gidin
4. **Site URL** alanına sitenizin URL'ini girin:
   ```
   https://litxtech.com
   ```

## 2. Redirect URLs Ayarları

Aynı sayfada **Redirect URLs** bölümüne şu URL'leri ekleyin (her URL'yi ayrı satırda):

### Production URLs
```
https://www.litxtech.com/auth/reset-password
https://www.litxtech.com/auth/confirm
https://www.litxtech.com/auth/callback
https://litxtech.com/auth/reset-password
https://litxtech.com/auth/callback
https://litxtech.com/auth/onboarding
https://xcvcplwimicylaxghiak.supabase.co/auth/v1/callback
```

### Development URLs
```
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
```
mytrabzon://auth/reset-password
mytrabzon://auth/callback
mytrabzon://auth/onboarding
litxtech://auth/onboarding
```

**Önemli:** Her URL'yi ayrı satırda ekleyin ve **Save** butonuna tıklayın.

## 3. Email Template Ayarları

1. **Settings** > **Authentication** > **Email Templates** bölümüne gidin

### Signup Email Template
- **Confirm signup** template'ini seçin
- Email template'inde `{{ .ConfirmationURL }}` değişkeninin kullanıldığından emin olun
- Redirect URL: `https://litxtech.com/auth/confirm` veya `https://www.litxtech.com/auth/confirm`

### Reset Password Email Template
- **Reset Password** template'ini seçin
- Email template'inde `{{ .ConfirmationURL }}` değişkeninin kullanıldığından emin olun
- Redirect URL: `https://litxtech.com/auth/reset-password` veya `https://www.litxtech.com/auth/reset-password`

### Magic Link Email Template
- **Magic Link** template'ini seçin
- Email template'inde `{{ .ConfirmationURL }}` değişkeninin kullanıldığından emin olun
- Redirect URL: `https://litxtech.com/auth/callback` veya `https://www.litxtech.com/auth/callback`

## 4. Email Confirmation Ayarları

1. **Settings** > **Authentication** > **Auth Settings** bölümüne gidin
2. **Enable email confirmations** seçeneğinin aktif olduğundan emin olun
3. **Confirm email** seçeneğini açın (yeni kullanıcılar için email doğrulama zorunlu)

## 5. Test Etme

### Kayıt Olma Testi
1. `/auth` sayfasına gidin
2. "Kayıt Ol" sekmesine geçin
3. E-posta ve şifre girin
4. "Kayıt Ol" butonuna tıklayın
5. E-postanızı kontrol edin
6. E-postadaki doğrulama linkine tıklayın
7. `/auth/confirm` sayfasına yönlendirilmelisiniz
8. Doğrulama sonrası `/auth/onboarding` sayfasına yönlendirilmelisiniz

### Şifre Sıfırlama Testi
1. `/auth/reset-password` sayfasına gidin
2. Kayıtlı bir e-posta adresi girin
3. E-postanızı kontrol edin
4. E-postadaki linke tıklayın
5. Yeni şifre belirleme sayfasına yönlendirilmelisiniz

## Sorun Giderme

### E-posta gelmiyor
- Supabase Dashboard'da **Settings** > **Authentication** > **SMTP Settings** bölümünü kontrol edin
- Varsayılan olarak Supabase kendi SMTP sunucusunu kullanır, ancak production için kendi SMTP ayarlarınızı yapmanız önerilir

### Redirect çalışmıyor
- Redirect URL'lerin doğru eklendiğinden emin olun
- URL'lerin tam olarak eşleştiğinden emin olun (trailing slash, http vs https)
- Browser console'da hata mesajlarını kontrol edin

### Token geçersiz hatası
- Token'ların süresi dolmuş olabilir (varsayılan 1 saat)
- Yeni bir şifre sıfırlama isteği gönderin
- Supabase Dashboard'da **Settings** > **Authentication** > **Auth Settings** bölümünde token süresini kontrol edin

## Notlar

- Şifre sıfırlama linkleri 1 saat geçerlidir (varsayılan)
- Her link sadece bir kez kullanılabilir
- Production ortamında HTTPS kullanmanız şiddetle önerilir

