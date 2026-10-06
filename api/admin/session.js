/** Dedicated entry so /api/admin/session works (nested auth/session 404s on Vercel catch-all). */
export { default } from '../_handlers/admin/auth/session.js'
