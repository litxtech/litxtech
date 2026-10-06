# LitxTech Current Audit

**Date:** 2026-10-06  
**Public:** https://www.litxtech.com  
**Admin target:** https://admin.litxtech.com

## Stack

- React 18 + TypeScript + Vite SPA
- react-router-dom v6
- Tailwind + Framer Motion
- Supabase (auth + Postgres)
- Vercel (SPA + serverless `api/*`)
- Stripe (checkout/donation)

## Critical gaps (pre-implementation)

| Area | Reality |
|------|---------|
| Admin login | Hardcoded credentials in frontend |
| CMS | Mock UI, not connected to DB |
| Contact form | `console.log` only |
| admin.litxtech.com | Not configured |
| Public content | Mostly hardcoded TS modules |
| Analytics | Not configured (must show NOT CONFIGURED) |

## Hardcoded content sources

- `src/data/siteConfig.ts` — phone, WhatsApp, email
- `src/data/homeContent.ts` — homepage
- `src/data/projectsData.ts` / `solutionsData.ts`
- App landing pages (Tamuso, Vora, Nocta, Valoria, MyTrabzon, KBS)
- `MarketingChrome.tsx` — nav/footer

## Migration risks

1. Removing hardcoded admin login may lock out old `/admin` users until Supabase admin user is seeded.
2. SPA cannot SSR SEO; sitemap/robots via serverless.
3. Public site must keep TS fallbacks if CMS fetch fails.
4. Existing weak RLS on admin tables must be replaced with server-only service role access.

## Super Admin seed

Supabase auth user UUID (full privileges):

`26d4e301-9ae7-465d-805c-611ff302c04f`

See `supabase/migrations/20261006_litxtech_cms_crm.sql`.
