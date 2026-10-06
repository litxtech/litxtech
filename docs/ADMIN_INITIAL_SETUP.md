# Admin Initial Setup

## 1. Supabase

1. Open Supabase SQL Editor.
2. Run `supabase/migrations/20261006_litxtech_cms_crm.sql`.
3. Confirm user `26d4e301-9ae7-465d-805c-611ff302c04f` exists in `auth.users`.
4. Confirm row in `admin_users` with `role = 'SUPER_ADMIN'`.

## 2. Vercel environment (server-only)

```
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_ANON_KEY=
ADMIN_SESSION_SECRET=  # long random string
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_PUBLIC_SITE_URL=https://www.litxtech.com
VITE_ADMIN_SITE_URL=https://admin.litxtech.com
```

Never put `SUPABASE_SERVICE_ROLE_KEY` in `VITE_*`.

## 3. Domains

| Host | Project |
|------|---------|
| www.litxtech.com | Public SPA |
| admin.litxtech.com | Same deployment (hostname router) |

Add `admin.litxtech.com` as domain alias on the Vercel project. See `docs/LITXTECH_DNS.md`.

## 4. Login

1. Open https://admin.litxtech.com/login
2. Sign in with the Supabase credentials for user UUID above.
3. App exchanges session for HTTP-only admin cookie via `/api/admin/auth/session`.

## 5. Bootstrap lock

After SUPER_ADMIN exists, bootstrap insert is idempotent (`ON CONFLICT DO NOTHING`). No hardcoded passwords in frontend.
