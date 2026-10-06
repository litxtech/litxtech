import platform from '../../_handlers/admin/platform.js'

export default async function handler(req, res) {
  const q = req.query?.path
  const rest = Array.isArray(q) ? q.join('/') : typeof q === 'string' ? q : ''
  req.platformPath = rest
  return platform(req, res)
}
