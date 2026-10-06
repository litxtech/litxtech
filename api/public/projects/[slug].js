import catalog from '../../_handlers/public/catalog.js'

export default function handler(req, res) {
  req.platformRest = String(req.query.slug || '')
  return catalog(req, res, 'projects')
}
