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

## Uygulama akışları
| Akış | Sayfa | API |
|------|-------|-----|
| Kayıt doğrulama | `/auth` | `signUp` → `verifyOtp(type=signup)` |
| Şifremi unuttum | `/auth/reset-password` | `resetPasswordForEmail` → `verifyOtp(type=recovery)` → `updateUser(password)` |
| Kod ile giriş | `/auth` | `signInWithOtp` → `verifyOtp(type=email)` |
