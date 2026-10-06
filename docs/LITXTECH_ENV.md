# Environment Variables

## Public (Vite)

| Variable | Required | Notes |
|----------|----------|-------|
| `VITE_SUPABASE_URL` | Yes | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Yes | Anon key only |
| `VITE_PUBLIC_SITE_URL` | Yes | https://www.litxtech.com |
| `VITE_ADMIN_SITE_URL` | Yes | https://admin.litxtech.com |

## Server-only (Vercel)

| Variable | Required | Notes |
|----------|----------|-------|
| `SUPABASE_URL` | Yes | Same project URL |
| `SUPABASE_ANON_KEY` | Yes | Anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | **Never** expose to client |
| `ADMIN_SESSION_SECRET` | Recommended | Long random string |
| `STRIPE_SECRET_KEY` | Existing | Payments |

## Super Admin

Auth user UUID with full privileges:

`26d4e301-9ae7-465d-805c-611ff302c04f`

Seeded by migration into `admin_users` as `SUPER_ADMIN`.
