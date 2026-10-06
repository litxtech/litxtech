import products from '../../_handlers/public/products.js'

export default function handler(req, res) {
  req.platformRest = String(req.query.slug || '')
  return products(req, res)
}
