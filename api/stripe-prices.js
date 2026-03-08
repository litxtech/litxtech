// Test endpoint to get Stripe prices
export default async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    
    // Get all products and their prices
    const products = await stripe.products.list({ active: true })
    const prices = await stripe.prices.list({ active: true })
    
    const productPrices = products.data.map(product => {
      const productPrices = prices.data.filter(price => price.product === product.id)
      return {
        id: product.id,
        name: product.name,
        description: product.description,
        prices: productPrices.map(price => ({
          id: price.id,
          amount: price.unit_amount / 100,
          currency: price.currency,
          type: price.type
        }))
      }
    })

    res.json({
      products: productPrices,
      totalProducts: products.data.length,
      totalPrices: prices.data.length
    })
  } catch (error) {
    console.error('Error fetching Stripe data:', error)
    res.status(500).json({ error: error.message || 'Failed to fetch Stripe data' })
  }
}
