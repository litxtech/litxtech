# Deployment

## Stack

- Vercel (SPA + serverless `/api`)
- Supabase (Postgres + Auth)
- Domain: www.litxtech.com + admin.litxtech.com

## Steps

1. Push `main` to GitHub → Vercel auto-deploy.
2. Run `supabase/migrations/20261006_litxtech_cms_crm.sql` in Supabase SQL Editor.
3. Set Vercel env vars (`docs/LITXTECH_ENV.md`).
4. Add domain `admin.litxtech.com` to same Vercel project.
5. Login: https://admin.litxtech.com/login with the SUPER_ADMIN auth account.

## Verify

- Public: https://www.litxtech.com/projemi-anlat
- Admin: https://admin.litxtech.com/dashboard
- Sitemap: https://www.litxtech.com/sitemap.xml
- Robots: https://www.litxtech.com/robots.txt

## Local admin

http://localhost:5173/login?admin=1
