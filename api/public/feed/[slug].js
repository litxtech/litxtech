import feed from '../../_handlers/public/feed.js'

export default function handler(req, res) {
  req.platformRest = String(req.query.slug || '')
  return feed(req, res)
}
