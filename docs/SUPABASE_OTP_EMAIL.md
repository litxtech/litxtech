# Supabase 6 haneli e-posta kodu (OTP)

SMTP sizin tarafınızda yapılandırıldı. Kodların **link yerine 6 haneli** gitmesi için Auth e-posta şablonlarında `{{ .Token }}` kullanın.

## Auth → Email Templates

### Confirm signup
```
Kodunuz: {{ .Token }}
```

### Reset password / Recovery
```
Şifre sıfırlama kodunuz: {{ .Token }}
```

### Magic Link (OTP girişi)
```
Giriş kodunuz: {{ .Token }}
```

İsterseniz `{{ .ConfirmationURL }}` satırını kaldırın; uygulama kod doğrular.

## Auth ayarları
- Email provider açık
- OTP / token uzunluğu: **6** (Supabase varsayılanı genelde 6–8; Dashboard’da OTP length varsa 6 seçin)

## Redirect URL (kritik)
Authentication → URL Configuration:
- **Site URL:** `https://www.litxtech.com`
- **Redirect URLs** listesine ekleyin:
  - `https://www.litxtech.com/auth/reset-password`
  - `https://www.litxtech.com/auth/callback`
  - `https://www.litxtech.com/auth/confirm`
  - `http://localhost:5173/auth/reset-password`

Recovery e-postasındaki link Site URL’ye (`/`) düşerse uygulama `type=recovery` hash’ini yakalayıp `/auth/reset-password` + **Yeni Şifre** formuna yönlendirir.

## Uygulama akışları
| Akış | Sayfa | API |
|------|-------|-----|
| Kayıt doğrulama | `/auth` | `signUp` → `verifyOtp(type=signup)` |
| Şifremi unuttum | `/auth/reset-password` | `resetPasswordForEmail` → `verifyOtp(type=recovery)` → `updateUser(password)` |
| Kod ile giriş | `/auth` | `signInWithOtp` → `verifyOtp(type=email)` |
