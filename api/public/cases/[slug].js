import cases from '../../_handlers/public/cases.js'

export default function handler(req, res) {
  req.platformRest = String(req.query.slug || '')
  return cases(req, res)
}
