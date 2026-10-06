import services from '../../_handlers/public/services.js'

export default function handler(req, res) {
  req.platformRest = String(req.query.slug || '')
  return services(req, res)
}
