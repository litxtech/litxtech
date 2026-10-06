import seo from '../../_handlers/public/seo.js'

export default function handler(req, res) {
  req.platformRest = String(req.query.part || '')
  return seo(req, res)
}
