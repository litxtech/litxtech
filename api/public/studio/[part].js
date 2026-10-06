import studio from '../../_handlers/public/studio.js'

export default function handler(req, res) {
  req.platformRest = String(req.query.part || '')
  return studio(req, res)
}
