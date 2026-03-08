# Environment Variables Kontrol Rehberi

## ❌ YANLIŞ: Terminal'de çalıştırmayın!

Bu komutlar **terminal'de değil**, **browser console'da** çalıştırılmalı.

## ✅ DOĞRU: Browser Console'da Kontrol

### Adım 1: Uygulamayı Açın
1. Development server'ı başlatın: `npm run dev`
2. Browser'da uygulamayı açın (örn: http://localhost:5173)
3. **F12** tuşuna basın (veya sağ tık > Inspect)

### Adım 2: Console Sekmesine Geçin
1. Browser DevTools açıldığında
2. **Console** sekmesine tıklayın
3. Aşağıdaki komutları yazın ve Enter'a basın

### Adım 3: Kontrol Komutlarını Çalıştırın

```javascript
console.log('VITE_SUPABASE_URL:', import.meta.env.VITE_SUPABASE_URL)
console.log('VITE_SUPABASE_ANON_KEY:', import.meta.env.VITE_SUPABASE_ANON_KEY ? 'Set' : 'Missing')
```

### Sonuç Örnekleri:

**✅ Başarılı (Environment variables set):**
```
VITE_SUPABASE_URL: https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY: Set
```

**❌ Hata (Environment variables missing):**
```
VITE_SUPABASE_URL: undefined
VITE_SUPABASE_ANON_KEY: Missing
```

## Alternatif: Terminal'de Kontrol (Sadece .env dosyası için)

Eğer sadece `.env` dosyasının var olup olmadığını kontrol etmek istiyorsanız:

### Windows (PowerShell):
```powershell
cd c:\Users\ilkse\replit-1
Test-Path .env
Get-Content .env
```

### Windows (CMD):
```cmd
cd c:\Users\ilkse\replit-1
dir .env
type .env
```

### Linux/Mac:
```bash
cd /path/to/replit-1
ls -la .env
cat .env
```

## Hızlı Test: OAuth Butonuna Tıklayın

1. `/auth` sayfasına gidin
2. Browser console'u açın (F12)
3. "Google ile Giriş Yap" butonuna tıklayın
4. Console'da otomatik olarak environment variable kontrolü yapılacak

Eğer environment variable'lar eksikse, console'da şu mesajları göreceksiniz:

```
❌ Supabase Environment Variables Missing:
VITE_SUPABASE_URL: ✗ Missing
VITE_SUPABASE_ANON_KEY: ✗ Missing

📝 Çözüm:
1. Proje kök dizininde .env dosyası oluşturun
2. VITE_SUPABASE_URL ve VITE_SUPABASE_ANON_KEY ekleyin
3. Development server'ı yeniden başlatın
```

## .env Dosyası Oluşturma (Terminal'de)

### Windows (PowerShell):
```powershell
cd c:\Users\ilkse\replit-1
New-Item -Path .env -ItemType File
notepad .env
```

### Windows (CMD):
```cmd
cd c:\Users\ilkse\replit-1
type nul > .env
notepad .env
```

### Linux/Mac:
```bash
cd /path/to/replit-1
touch .env
nano .env
```

## .env Dosyası İçeriği

`.env` dosyasına şunları ekleyin:

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Önemli:** 
- `xxxxx` yerine gerçek Supabase project ID'nizi yazın
- `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` yerine gerçek anon key'inizi yazın
- Supabase Dashboard > Settings > API'den bu bilgileri alabilirsiniz

## Özet

- ✅ Browser console'da (F12) kontrol edin
- ❌ Terminal'de kontrol etmeyin
- ✅ `.env` dosyasını terminal'de oluşturabilirsiniz
- ✅ `.env` dosyasını oluşturduktan sonra server'ı yeniden başlatın

