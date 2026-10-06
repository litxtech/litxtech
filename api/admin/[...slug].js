import { json } from '../_lib/supabaseAdmin.js'
import { resolveHandler } from '../_lib/routeMatch.js'
import applications from '../_handlers/admin/applications.js'
import audit from '../_handlers/admin/audit.js'
import dashboard from '../_handlers/admin/dashboard.js'
import faqs from '../_handlers/admin/faqs.js'
import homepage from '../_handlers/admin/homepage.js'
import leads from '../_handlers/admin/leads.js'
import messages from '../_handlers/admin/messages.js'
import platform from '../_handlers/admin/platform.js'
import session from '../_handlers/admin/auth/session.js'
import settings from '../_handlers/admin/settings.js'
import tickets from '../_handlers/admin/tickets.js'

const routes = {
  applications,
  audit,
  dashboard,
  faqs,
  homepage,
  leads,
  messages,
  settings,
  tickets,
  session,
  'auth/session': session,
}

function resolveSlug(req) {
  const q = req.query?.slug
  if (Array.isArray(q)) return q.join('/')
  if (typeof q === 'string' && q) return q
  const url = new URL(req.url || '/', 'http://localhost')
  const parts = url.pathname.replace(/^\/api\/admin\/?/, '').split('/').filter(Boolean)
  return parts.join('/')
}

export default async function handler(req, res) {
  const key = resolveSlug(req)
  if (key === 'platform' || key.startsWith('platform/')) {
    req.platformPath = key.replace(/^platform\/?/, '')
    return platform(req, res)
  }
  const match = resolveHandler(routes, key)
  if (!match) return json(res, 404, { error: 'Not found', path: key })
  req.platformRest = match.rest
  return match.handler(req, res)
}
