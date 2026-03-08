import express from 'express'
import cors from 'cors'

const app = express()
const port = 3001

// Middleware
app.use(cors())
app.use(express.json())

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

// Mock checkout endpoint
app.post('/api/stripe/checkout', async (req, res) => {
  try {
    const { packageId, packageName, packagePrice } = req.body
    
    console.log('Checkout request:', { packageId, packageName, packagePrice })
    
    // Mock response - redirect to success page
    const mockSessionId = `cs_test_${Date.now()}`
    
    res.json({ 
      url: `http://localhost:5173/success?session_id=${mockSessionId}&package=${packageName}&price=${packagePrice}`,
      sessionId: mockSessionId
    })
  } catch (error) {
    console.error('Checkout error:', error)
    res.status(500).json({ error: 'Checkout oluşturulamadı' })
  }
})

// Start server
app.listen(port, () => {
  console.log(`🚀 Test server running on port ${port}`)
  console.log(`📊 Health check: http://localhost:${port}/api/health`)
  console.log(`💳 Mock checkout: http://localhost:${port}/api/stripe/checkout`)
})
