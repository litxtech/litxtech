# LitxTech Admin Control Center — Architecture Audit & Plan

**Domain (public):** https://www.litxtech.com  
**Domain (admin target):** https://admin.litxtech.com  
**Repo:** `litxtech/litxtech` (Vite SPA under `litxtechweb/`)  
**Audit date:** 2026-10-06  
**Status:** AUDIT COMPLETE — implementation not started until this plan is approved

---

## 1. Current architecture (as-is)

### 1.1 Framework & stack

| Layer | Technology |
|--------|------------|
| Frontend | **React 18 + TypeScript + Vite** (SPA, not Next.js) |
| Routing | `react-router-dom` v6 — all routes in `src/App.tsx` |
| Styling | Tailwind CSS, Framer Motion, Lucide |
| Auth (public users) | Supabase Auth (`src/lib/supabase.ts` → `userAuth`) |
| Auth (admin, intended) | Partial: `adminAuth` + SQL schema; **not used by UI** |
| Auth (admin, actual UI) | **Hardcoded** email/password in `AdminLogin.tsx` + `localStorage` |
| Database | Supabase (Postgres) — scripts in `supabase-admin-setup.sql` |
| Payments | Stripe via Vercel serverless `api/*` |
| Deploy | **Vercel** (`vercel.json`, GitHub Actions → Vercel) |
| CMS | **None real** — mock UI + TS data modules |

This is a **client-rendered SPA**. There is no Next.js App Router, no SSR/ISR built-in. Public content is mostly compiled into the JS bundle from TypeScript data files and page components.

### 1.2 Deployment

- Build: `npm run build` → `dist/`
- Vercel SPA rewrite: `/(.*)` → `/index.html`
- API routes: `api/stripe-checkout.js`, `api/stripe-prices.js`, `api/donation.js`, `api/stripe-webhook-donation.js`
- Existing admin path headers for `/admin/(.*)` and `/api/admin/(.*)` (noindex, no-store)
- **No `admin.litxtech.com` project/domain configuration yet**

### 1.3 Environment variables (from `env.example` + code)

| Variable | Scope | Notes |
|----------|--------|------|
| `VITE_SUPABASE_URL` | PUBLIC (Vite) | Required for client Supabase |
| `VITE_SUPABASE_ANON_KEY` | PUBLIC (Vite) | Anon key only — never service role |
| `VITE_APP_NAME` / `VITE_APP_VERSION` | PUBLIC | Optional |
| Stripe secrets | SERVER (`api/*`) | Must stay server-only (Vercel env) |

**Missing for production admin:** `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_SESSION_SECRET`, `ADMIN_BOOTSTRAP_*`, storage keys, CSRF secret — not present in `env.example`.

### 1.4 Current public routes (high level)

**Marketing / corporate**

- `/` — HomePage
- `/cozumler`, `/cozumler/:slug` — Solutions
- `/projeler`, `/projeler/:slug` — Projects
- `/about`, `/contact`, `/blog`, `/packages`, `/investment`, `/donation`, `/ai-builder`

**Legal (site-wide)**

- `/privacy-policy`, `/terms-of-service`, `/refund-policy`, `/data-security-policy`
- `/commercial-agreement`, `/subprocessors`, `/account-deletion-policy`
- `/child-safety-policy`, `/community-policy`, `/legal`

**Product / app landings (hardcoded pages)**

- `/valoria-app` (+ privacy, terms, support, delete-account)
- `/kbs-prime` (+ privacy EN/TR, terms, support, delete-account)
- `/mytrabzon` (+ delete-account, support)
- `/nocta` (+ gizlilik, kullanım-şartları, destek, hesap-silme, child-safety)
- `/vora` (+ gizlilik, kullanım-şartları, destek, hesap-silme, child-safety, abonelik)
- `/tamuso` (+ gizlilik, kullanım-şartları, destek, hesap-silme, child-safety)

**Auth / user**

- `/auth`, `/auth/callback`, `/auth/reset-password`, `/auth/confirm`, `/auth/onboarding`
- `/login`, `/profile`, `/mytrabzon/callback`

**Admin (legacy, insecure)**

- `/admin` — AdminPage
- `/admin/login` — AdminLogin (hardcoded credentials)
- `/admin/blog` — BlogManagement

### 1.5 Current data sources

| Source | Location | Used by | CMS? |
|--------|----------|---------|------|
| `siteConfig` | `src/data/siteConfig.ts` | Phone, email, WhatsApp, Calendly | Hardcoded TS |
| `homeContent` | `src/data/homeContent.ts` | Homepage copy/stats/FAQ/CTA | Hardcoded TS |
| `solutionsData` | `src/data/solutionsData.ts` | Solutions index/detail | Hardcoded TS |
| `projectsData` | `src/data/projectsData.ts` | Projects catalog (Valoria, KBS, Vora, Tamuso, MyTrabzon…) | Hardcoded TS |
| `packages` | `src/data/packages.ts` | Packages page | Hardcoded TS |
| `voraSubscriptionData` | `src/data/voraSubscriptionData.ts` | Vora pricing | Hardcoded TS |
| App page components | `src/pages/*App*.tsx` | Full legal + marketing copy per app | Hardcoded React |
| Supabase tables (schema exists) | `supabase-admin-setup.sql` | Partially referenced by `adminData` / `adminAuth` | **Not wired to public site** |

### 1.6 Current components (marketing shell)

- `MarketingChrome` — header nav, footer, phone/WhatsApp from `siteConfig`
- `WhatsAppFloat` — floating WA button
- `SeoHead` — client-side `document.title` + basic OG tags (not SSR)
- `SolutionCard`, `DashboardMockup`, etc.

Navigation labels/URLs are **hardcoded in `MarketingChrome.tsx`**, not CMS-driven.

### 1.7 Forms & contact

- `ContactPage`: form only `console.log` — **does not write to `contact_messages`**
- Contact details partially hardcoded on Contact page (email) and partially from `siteConfig` in chrome
- Calendly URL duplicated (`ContactPage` + `siteConfig`)

### 1.8 SEO

- Client-only via `SeoHead` (`useEffect`)
- No dynamic `sitemap.xml` / `robots.txt` generation from CMS
- Base origin hardcoded: `https://www.litxtech.com`
- Vercel headers already set `X-Robots-Tag: noindex` for `/admin/*`

### 1.9 Existing admin / CMS reality check

| Feature | Claimed / UI | Reality |
|---------|--------------|---------|
| Login | Email+password UI | **Hardcoded** `admin@litxtech.com` / password in source |
| Session | localStorage flag | Not HTTP-only cookie; no CSRF; no rate limit |
| Dashboard stats | Numbers shown | **Fake** hardcoded (1247 users, etc.) |
| CMS | Blog/pages/media UI | **Mock in-memory arrays** |
| `adminAuth` in supabase.ts | bcrypt + sessions | Exists but **AdminLogin does not call it** |
| SQL schema | admin_users, sessions, site_settings, blog, contact_messages | Schema file exists; RLS policies are weak/incomplete for production CMS |
| Public site ↔ CMS | — | **Not connected** |

**CRITICAL SECURITY FINDING:** Production admin UI currently authenticates with a plaintext password check in the frontend bundle. This must be removed before any real admin launch.

### 1.10 Storage & media

- Static assets under `public/assets/` (e.g. MyTrabzon)
- No Supabase Storage media library integration in admin UI
- Unsplash remote URLs used in `projectsData`

### 1.11 Analytics

- No analytics provider integration found in marketing pages
- Admin dashboard analytics are placeholders

---

## 2. What is hardcoded (CMS candidates)

Priority for moving to CMS (one source of truth):

1. **Company / contact:** phone, WhatsApp, email, Calendly (`siteConfig` + Contact page duplicates)
2. **Homepage sections:** hero, stats, capabilities, process, why, FAQ, final CTA (`homeContent`)
3. **Navigation / footer links** (`MarketingChrome`)
4. **Applications catalog:** projects/apps metadata (`projectsData` + per-app landings)
5. **SEO defaults** (site title, description, OG image)
6. **Contact form submissions** → `contact_messages` (wire existing table)
7. Later: legal page bodies, blog, media library

**Keep in code (do not over-CMS):**

- Layout/design system (Tailwind, section structure)
- Security, Stripe, auth business logic
- App-specific legal prose that must be carefully reviewed (migrate gradually with draft/publish)

---

## 3. Constraints from current stack

Because the site is a **Vite SPA on Vercel**:

1. **True SSR/ISR does not exist today.** “Publish → public updates without redeploy” requires either:
   - **A)** Public site fetches **published** content from Supabase (anon + RLS) / public API at runtime with cache headers, or
   - **B)** Admin publish triggers a rebuild/webhook (heavier), or
   - **C)** Hybrid: critical config (phone, WA, apps list) fetched at runtime; heavy pages stay code until migrated

2. **Admin on `admin.litxtech.com`** should be a **separate Vercel project** (or same monorepo, separate entry) that:
   - Never ships service-role keys to the browser
   - Calls **server-only** admin APIs (`/api/admin/*`) with HTTP-only session cookies
   - Is `noindex` + auth-gated

3. **Do not rewrite the public website** into a different framework in phase 1.

---

## 4. Proposed architecture (smallest safe production path)

### 4.1 Target topology

```
www.litxtech.com          → Public Vite SPA (existing)
admin.litxtech.com        → Admin SPA (new entry / project)
api.litxtech.com OR
  www/admin /api/admin/*  → Vercel serverless admin APIs (Node)

Supabase Postgres         → Source of truth for CMS + admin auth
Supabase Storage          → Media assets
```

### 4.2 Auth model (replace current admin login)

- Server-side login: email + password (bcrypt/argon2 hashes in DB)
- Session: opaque token in **HTTP-only Secure SameSite cookie**
- Server validates session on every `/api/admin/*` call
- Rate limit + lockout + audit log for login
- Bootstrap first SUPER_ADMIN via env (`ADMIN_BOOTSTRAP_EMAIL` + `ADMIN_BOOTSTRAP_SECRET`) once, then disable
- RBAC roles: SUPER_ADMIN, ADMIN, EDITOR, CONTENT_MANAGER, ANALYTICS, SUPPORT, READ_ONLY
- 2FA/TOTP in phase 2 if needed for launch; scaffold tables in phase 1

**Remove immediately:** hardcoded password in `AdminLogin.tsx`, fake dashboard stats, client-side role trust.

### 4.3 Data model (extend existing Supabase schema)

Reuse / extend:

- `admin_users`, `admin_sessions`, `site_settings`, `blog_posts`, `contact_messages`, `system_logs`

Add (migrations):

- `admin_roles` / `admin_permissions` / role maps (or JSON permissions on role)
- `audit_logs` (append-only)
- `cms_homepage` / `cms_homepage_revisions`
- `cms_applications` (+ features, screenshots, revisions)
- `cms_pages` (+ revisions)
- `cms_navigation_items`
- `cms_media_assets`
- `cms_redirects`
- `analytics_events` (optional, privacy-respecting)
- `login_attempts`

Public read: only **published** rows via RLS or public edge functions.  
Admin write: **service role only on server**, never in browser.

### 4.4 Public site integration pattern

```
Admin saves draft → Publish → DB published snapshot
Public site:
  - fetchPublishedSiteConfig()  // phone, WA, email, nav
  - fetchPublishedApplications()
  - fetchPublishedHomepage()
  - fallback to local TS defaults if fetch fails (site stays up)
```

Fallback rule: **public site must work if admin API is down** (cached or static fallback).

### 4.5 Admin UI routes (admin.litxtech.com)

```
/login
/dashboard
/content/homepage
/pages
/applications
/applications/:id
/media
/messages
/analytics
/seo
/seo/redirects
/settings/company
/settings/contact
/settings/navigation
/settings/social
/settings/system
/users
/security
/security/audit-log
/system/health
```

### 4.6 What NOT to do in phase 1

- Do not migrate every legal HTML page into CMS on day one
- Do not invent analytics numbers
- Do not put service role in `VITE_*`
- Do not keep `/admin` hardcoded login as production path
- Do not destroy existing marketing UI

---

## 5. Migration plan (phased)

### Phase 0 — Security hotfix (required before any admin use)

1. Disable or remove hardcoded `AdminLogin` credential check from production builds
2. Document that current `/admin` is non-production
3. Rotate any credentials that appeared in source/docs history

### Phase 1 — Foundation

1. Migrations for RBAC, audit, login_attempts, CMS core tables
2. Server APIs: `/api/admin/auth/*`, session cookie middleware, bootstrap
3. New admin app shell on `admin.litxtech.com` (login + dashboard with **real** stats only)
4. Docs: `ADMIN_INITIAL_SETUP.md`, `DOMAIN_AND_DNS_SETUP.md`

### Phase 2 — Company + contact + WhatsApp (highest ROI)

1. Seed `site_settings` / company tables from current `siteConfig`
2. Public site reads contact channels from published config with TS fallback
3. Wire Contact form → `contact_messages` + Messages inbox in admin
4. Admin pages: company, contact, WhatsApp

### Phase 3 — Homepage CMS

1. Map actual HomePage sections (hero, stats, capabilities, process, why, FAQ, CTA, solutions/projects teasers)
2. Draft/publish + revisions
3. Public HomePage consumes published JSON

### Phase 4 — Applications CMS

1. Model applications (Tamuso, Vora, Nocta, Valoria, MyTrabzon, KBS…)
2. Admin CRUD + App Store / Play URLs + SEO fields
3. Public projects index + optional generic app landing driven by CMS
4. Keep complex legal pages as code initially; link URLs from CMS fields

### Phase 5 — Media, SEO, navigation, redirects

1. Supabase Storage + media library
2. Nav/footer CMS
3. SEO defaults + dynamic sitemap/robots (via serverless)
4. Redirect management

### Phase 6 — Hardening

1. 2FA, session management UI, full audit UI
2. Rate limits, CSRF, CSP audit
3. Tests (auth, RBAC, CRUD, e2e publish flow)
4. Implementation report with PASS / FAIL / TEST EDİLEMEDİ

---

## 6. DNS (proposed — Vercel)

Document exact records in `DOMAIN_AND_DNS_SETUP.md` after confirming Vercel project IDs.

Typical:

| Host | Type | Value |
|------|------|--------|
| `www` | CNAME | `cname.vercel-dns.com` (or project-specific) |
| `admin` | CNAME | separate Vercel project CNAME |
| apex `@` | A / ALIAS | per Vercel docs |

HTTPS via Vercel certificates. Admin cookies: `Secure`, `HttpOnly`, `SameSite=None` or `Lax` depending on API host strategy.

---

## 7. Environment classification

| Name | Public? | Purpose |
|------|---------|---------|
| `VITE_SUPABASE_URL` | Yes | Public Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Yes | Published-content read under RLS |
| `VITE_PUBLIC_SITE_URL` | Yes | https://www.litxtech.com |
| `SUPABASE_SERVICE_ROLE_KEY` | **No** | Admin API only |
| `ADMIN_SESSION_SECRET` | **No** | Cookie signing / encryption |
| `ADMIN_BOOTSTRAP_EMAIL` | **No** | First admin |
| `ADMIN_BOOTSTRAP_SECRET` | **No** | One-time bootstrap |
| Stripe / SMTP / storage secrets | **No** | Server only |

---

## 8. Success criteria (definition of done)

Admin → Database → Public site connected:

- [ ] Change phone in admin → public header/footer/contact update without code deploy
- [ ] Change WhatsApp → float + CTAs update
- [ ] Create application → appears on public projects/apps list
- [ ] Contact form → appears in admin Messages
- [ ] Publish homepage draft → public homepage updates
- [ ] No secrets in client bundle
- [ ] No fake analytics
- [ ] Admin domain noindex + auth required
- [ ] Audit log for sensitive actions

---

## 9. Immediate next step

**Do not implement the full 80-point system in one shot.**

Recommended next implementation slice after approval of this document:

1. Phase 0 security (kill hardcoded admin password path)
2. Phase 1 auth + admin shell on `admin.litxtech.com`
3. Phase 2 company/contact/WhatsApp + contact messages

Await product owner confirmation before coding Phase 1+.
