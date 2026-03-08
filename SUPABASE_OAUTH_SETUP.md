# Supabase OAuth Provider Yapılandırma Rehberi

Google ve Apple ile giriş/kayıt işlemlerinin çalışması için Supabase Dashboard'da OAuth provider'ları yapılandırmanız gerekiyor.

## 1. Google OAuth Yapılandırması

### Adım 1: Google Cloud Console'da Proje Oluşturma

1. https://console.cloud.google.com/ adresine gidin
2. Yeni bir proje oluşturun veya mevcut projeyi seçin
3. **APIs & Services** > **Credentials** bölümüne gidin
4. **Create Credentials** > **OAuth client ID** seçin
5. **Application type**: Web application seçin
6. **Authorized JavaScript origins** ekleyin:
   ```
   https://www.litxtech.com
   https://litxtech.com
   http://localhost:3000
   http://localhost:8081
   ```
7. **Authorized redirect URIs** ekleyin:
   ```
   https://YOUR_PROJECT_ID.supabase.co/auth/v1/callback
   ```
   (YOUR_PROJECT_ID'i Supabase Dashboard'dan alın)
8. **Client ID** ve **Client Secret** değerlerini kopyalayın

### Adım 2: Supabase'de Google Provider'ı Aktif Etme

1. Supabase Dashboard'a gidin: https://supabase.com/dashboard
2. Projenizi seçin
3. **Settings** > **Authentication** > **Providers** bölümüne gidin
4. **Google** provider'ını bulun ve **Enable** butonuna tıklayın
5. **Client ID (for OAuth)** alanına Google'dan aldığınız Client ID'yi yapıştırın
6. **Client Secret (for OAuth)** alanına Google'dan aldığınız Client Secret'ı yapıştırın
7. **Save** butonuna tıklayın

## 2. Apple OAuth Yapılandırması

### Adım 1: Apple Developer Portal'da Services ID Oluşturma

1. https://developer.apple.com/account adresine gidin
2. Apple Developer hesabınızla giriş yapın
3. **Certificates, Identifiers & Profiles** bölümüne gidin
4. **Identifiers** > **Services IDs** bölümüne gidin
5. **+** butonuna tıklayarak yeni bir Services ID oluşturun
6. **Description** alanına uygulamanızın adını girin
7. **Identifier** alanına benzersiz bir ID girin (örn: `com.yourcompany.yourapp`)
8. **Sign in with Apple** seçeneğini işaretleyin
9. **Configure** butonuna tıklayın
10. **Primary App ID** seçin
11. **Website URLs** bölümüne:
    - **Domains and Subdomains**: `your-project.supabase.co`
    - **Return URLs**: `https://YOUR_PROJECT_ID.supabase.co/auth/v1/callback`
    (YOUR_PROJECT_ID'i Supabase Dashboard'dan alın)
12. **Save** butonuna tıklayın

### Adım 2: Apple Key Oluşturma

1. **Keys** bölümüne gidin
2. **+** butonuna tıklayarak yeni bir key oluşturun
3. **Key Name** girin
4. **Sign in with Apple** seçeneğini işaretleyin
5. **Configure** butonuna tıklayın ve Primary App ID'yi seçin
6. **Continue** ve **Register** butonlarına tıklayın
7. **Download** butonuna tıklayarak `.p8` dosyasını indirin (sadece bir kez indirilebilir!)
8. **Key ID** değerini kopyalayın

### Adım 3: Supabase'de Apple Provider'ı Aktif Etme

1. Supabase Dashboard'a gidin: https://supabase.com/dashboard
2. Projenizi seçin
3. **Settings** > **Authentication** > **Providers** bölümüne gidin
4. **Apple** provider'ını bulun ve **Enable** butonuna tıklayın
5. **Services ID** alanına Apple Developer'dan aldığınız Services ID'yi yapıştırın
6. **Secret Key** alanına indirdiğiniz `.p8` dosyasının içeriğini yapıştırın
7. **Key ID** alanına Apple Developer'dan aldığınız Key ID'yi yapıştırın
8. **Team ID** alanına Apple Developer Team ID'nizi yapıştırın (Apple Developer hesabınızın sağ üst köşesinde bulunur)
9. **Save** butonuna tıklayın

## 3. Redirect URL Kontrolü

Supabase Dashboard'da **Settings** > **Authentication** > **URL Configuration** bölümünde şu URL'lerin olduğundan emin olun:

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

## 4. Test Etme

1. `/auth` sayfasına gidin
2. "Google ile Giriş Yap" veya "Apple ile Giriş Yap" butonuna tıklayın
3. OAuth provider'ın login sayfasına yönlendirilmelisiniz
4. Giriş yaptıktan sonra `/auth/callback` sayfasına yönlendirilmelisiniz
5. Başarılı giriş sonrası ana sayfaya veya onboarding sayfasına yönlendirilmelisiniz

## Sorun Giderme

### "OAuth provider not enabled" hatası
- Supabase Dashboard'da provider'ın aktif olduğundan emin olun
- Client ID ve Secret'ların doğru girildiğini kontrol edin

### "Redirect URI mismatch" hatası
- Google Cloud Console ve Apple Developer Portal'da redirect URI'lerin doğru olduğundan emin olun
- Supabase project ID'nizi doğru kullandığınızı kontrol edin

### "Invalid client" hatası
- Client ID ve Secret'ların doğru kopyalandığından emin olun
- Boşluk veya fazladan karakter olmadığını kontrol edin

### OAuth sayfası açılmıyor
- Browser console'da hata mesajlarını kontrol edin
- Network tab'ında API isteklerini kontrol edin
- Supabase URL ve key'lerin doğru yapılandırıldığından emin olun

## Önemli Notlar

- OAuth provider ayarları değişikliklerinin etkili olması birkaç dakika sürebilir
- Production ve development için ayrı OAuth uygulamaları oluşturmanız önerilir
- Client Secret'ları ve Apple Key dosyalarını asla frontend kodunda veya public repository'lerde saklamayın
- Apple OAuth için Services ID ve Key ID'lerin doğru yapılandırıldığından emin olun
- Apple Key (.p8) dosyası sadece bir kez indirilebilir, güvenli bir yerde saklayın

