# Supabase Environment Variables Kurulum Rehberi

## Sorun: "Auth not configured" Hatası

Google/X (Twitter) ile giriş yapmaya çalışırken "Auth not configured" hatası alıyorsanız, Supabase environment variable'ları eksik demektir.

## Çözüm

### 1. Supabase Proje Bilgilerini Alın

1. https://supabase.com/dashboard adresine gidin
2. Projenizi seçin
3. **Settings** > **API** bölümüne gidin
4. Şu bilgileri kopyalayın:
   - **Project URL** (örn: `https://xxxxx.supabase.co`)
   - **anon/public key** (JWT token)

### 2. Environment Variables Oluşturun

Proje kök dizininde `.env` dosyası oluşturun (yoksa):

```bash
# .env dosyası
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 3. Vercel/Production için Environment Variables

Vercel'de deploy ediyorsanız:

1. Vercel Dashboard'a gidin
2. Projenizi seçin
3. **Settings** > **Environment Variables** bölümüne gidin
4. Şu variable'ları ekleyin:
   - `VITE_SUPABASE_URL` = Supabase Project URL
   - `VITE_SUPABASE_ANON_KEY` = Supabase anon/public key

### 4. Development'ta Kontrol

Development modunda çalıştırırken, browser console'da şu uyarıları görebilirsiniz:

```
⚠ Supabase environment variables are missing!
⚠ VITE_SUPABASE_URL: ✗ Missing
⚠ VITE_SUPABASE_ANON_KEY: ✗ Missing
```

Bu uyarılar görünüyorsa, `.env` dosyasını kontrol edin.

### 5. Dosya Yapısı

```
replit-1/
├── .env                 # Environment variables (git'e eklenmemeli!)
├── .env.example         # Örnek dosya (opsiyonel)
├── src/
└── ...
```

### 6. .gitignore Kontrolü

`.env` dosyasının `.gitignore`'da olduğundan emin olun:

```gitignore
# .gitignore
.env
.env.local
.env.*.local
```

### 7. Test Etme

Environment variable'ları ayarladıktan sonra:

1. Development server'ı yeniden başlatın (`npm run dev`)
2. Browser console'u açın
3. Google ile giriş yapmayı deneyin
4. Artık "Auth not configured" hatası görünmemeli

### 8. Hata Ayıklama

Eğer hala hata alıyorsanız:

1. Browser console'u açın (F12)
2. Console'da hata mesajlarını kontrol edin
3. Network tab'ında API isteklerini kontrol edin
4. Environment variable'ların doğru yüklendiğini kontrol edin:

```javascript
// Browser console'da test edin
console.log('VITE_SUPABASE_URL:', import.meta.env.VITE_SUPABASE_URL)
console.log('VITE_SUPABASE_ANON_KEY:', import.meta.env.VITE_SUPABASE_ANON_KEY ? 'Set' : 'Missing')
```

### 9. Önemli Notlar

- ⚠️ `.env` dosyasını asla git'e commit etmeyin!
- ⚠️ `VITE_SUPABASE_ANON_KEY` public bir key'dir, ancak yine de güvenli tutun
- ⚠️ Production'da environment variable'ları mutlaka ayarlayın
- ⚠️ Development server'ı environment variable değişikliklerinden sonra yeniden başlatın

### 10. Hızlı Kontrol Listesi

- [ ] Supabase Dashboard'dan Project URL ve anon key'i aldım
- [ ] `.env` dosyası oluşturdum
- [ ] `VITE_SUPABASE_URL` ve `VITE_SUPABASE_ANON_KEY` ekledim
- [ ] Development server'ı yeniden başlattım
- [ ] Browser console'da uyarı yok
- [ ] Google/X ile giriş çalışıyor

## Sorun Giderme

### "Auth not configured" hatası devam ediyor
- `.env` dosyasının proje kök dizininde olduğundan emin olun
- Development server'ı yeniden başlatın
- Browser console'da environment variable'ları kontrol edin

### OAuth redirect çalışmıyor
- Supabase Dashboard'da Redirect URL'leri kontrol edin
- `https://www.litxtech.com/auth/callback` URL'sinin ekli olduğundan emin olun

### Environment variable'lar yüklenmiyor
- Vite için `VITE_` prefix'i gerekli
- Dosya adı tam olarak `.env` olmalı (`.env.local` değil)
- Server'ı yeniden başlatın

