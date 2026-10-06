import { json } from '../_lib/supabaseAdmin.js'
import applications from '../_handlers/public/applications.js'
import company from '../_handlers/public/company.js'
import contact from '../_handlers/public/contact.js'
import faqs from '../_handlers/public/faqs.js'
import homepage from '../_handlers/public/homepage.js'
import leads from '../_handlers/public/leads.js'
import track from '../_handlers/public/track.js'

const routes = {
  applications,
  company,
  contact,
  faqs,
  homepage,
  leads,
  track,
}

function resolveSlug(req) {
  const q = req.query?.slug
  if (Array.isArray(q)) return q.join('/')
  if (typeof q === 'string' && q) return q
  const url = new URL(req.url || '/', 'http://localhost')
  const parts = url.pathname.replace(/^\/api\/public\/?/, '').split('/').filter(Boolean)
  return parts.join('/')
}

export default async function handler(req, res) {
  const key = resolveSlug(req)
  const route = routes[key]
  if (!route) return json(res, 404, { error: 'Not found', path: key })
  return route(req, res)
}
