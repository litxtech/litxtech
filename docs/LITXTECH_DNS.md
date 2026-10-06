# DNS — litxtech.com

Provider: whatever manages `litxtech.com` DNS (not assumed).

## Required records (Vercel)

| Type | Name | Value |
|------|------|--------|
| CNAME | `www` | `cname.vercel-dns.com` (or project CNAME from Vercel) |
| CNAME | `admin` | same Vercel project CNAME |
| A / ALIAS | `@` | per Vercel apex instructions |

## Domains in Vercel

1. Project Settings → Domains
2. Add `www.litxtech.com`
3. Add `admin.litxtech.com`
4. Enable HTTPS (automatic)

## Behavior

Same SPA build:

- Host `admin.litxtech.com` → Admin Control Center
- Host `www.litxtech.com` / `litxtech.com` → public site

Admin must remain `noindex` (headers in `vercel.json`).
