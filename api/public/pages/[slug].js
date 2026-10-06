import pages from '../../_handlers/public/pages.js'

export default function handler(req, res) {
  req.platformRest = String(req.query.slug || '')
  return pages(req, res)
}
