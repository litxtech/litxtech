import { json } from '../_lib/supabaseAdmin.js'
import { resolveHandler } from '../_lib/routeMatch.js'
import applications from '../_handlers/public/applications.js'
import cases from '../_handlers/public/cases.js'
import catalog from '../_handlers/public/catalog.js'
import chat from '../_handlers/public/chat.js'
import company from '../_handlers/public/company.js'
import contact from '../_handlers/public/contact.js'
import faqs from '../_handlers/public/faqs.js'
import feed from '../_handlers/public/feed.js'
import homepage from '../_handlers/public/homepage.js'
import leads from '../_handlers/public/leads.js'
import presence from '../_handlers/public/presence.js'
import pages from '../_handlers/public/pages.js'
import products from '../_handlers/public/products.js'
import services from '../_handlers/public/services.js'
import seo from '../_handlers/public/seo.js'
import studio from '../_handlers/public/studio.js'
import tickets from '../_handlers/public/tickets.js'
import track from '../_handlers/public/track.js'

const routes = {
  applications,
  cases,
  chat,
  company,
  contact,
  faqs,
  feed,
  homepage,
  leads,
  pages,
  presence,
  products,
  services,
  seo,
  studio,
  tickets,
  track,
  projects: (req, res) => catalog(req, res, 'projects'),
  navigation: (req, res) => catalog(req, res, 'navigation'),
}

function resolveSlug(req) {
  const q = req.query?.slug
  let key = ''
  if (Array.isArray(q)) key = q.join('/')
  else if (typeof q === 'string' && q) key = q
  else {
    const url = new URL(req.url || '/', 'http://localhost')
    key = url.pathname.replace(/^\/api\/public\/?/, '').split('/').filter(Boolean).join('/')
  }
  const rest = req.query?.rest
  if (rest && !key.includes('/')) {
    const extra = Array.isArray(rest) ? rest.join('/') : String(rest)
    if (extra) key = `${key}/${extra}`
  }
  return key
}

export default async function handler(req, res) {
  const key = resolveSlug(req)
  const match = resolveHandler(routes, key)
  if (!match) return json(res, 404, { error: 'Not found', path: key })
  req.platformRest = match.rest
  req.platformKey = match.key
  return match.handler(req, res)
}
