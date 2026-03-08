import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import Stripe from 'stripe'

// Environment variables
dotenv.config()

const app = express()
const port = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-06-20',
})

// Stripe Products Configuration
const STRIPE_PRODUCTS = {
  lite: {
    name: 'LITE Package',
    description: 'Basit web site (kurumsal / portföy)',
    price: 19900, // $199 in cents
    priceId: process.env.STRIPE_LITE_PRICE_ID || 'price_lite_199'
  },
  pro: {
    name: 'PRO Package', 
    description: 'Otomasyonlu SaaS / API entegrasyonlu site',
    price: 49900, // $499 in cents
    priceId: process.env.STRIPE_PRO_PRICE_ID || 'price_pro_499'
  },
  ultra: {
    name: 'ULTRA Package',
    description: 'Tam sistem + kullanıcı yönetimi + ödeme entegrasyonu', 
    price: 99900, // $999 in cents
    priceId: process.env.STRIPE_ULTRA_PRICE_ID || 'price_ultra_999'
  }
}

// Create Checkout Session
app.post('/api/stripe/checkout', async (req, res) => {
  try {
    const { packageId, packageName, packagePrice } = req.body

    if (!packageId || !STRIPE_PRODUCTS[packageId]) {
      return res.status(400).json({ error: 'Geçersiz paket ID' })
    }

    const product = STRIPE_PRODUCTS[packageId]

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.name,
              description: product.description,
            },
            unit_amount: product.price,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/cancel`,
      metadata: {
        packageId,
        packageName: product.name,
        packagePrice: product.price.toString(),
      },
      custom_fields: [
        {
          key: 'company_name',
          label: {
            type: 'custom',
            custom: 'Şirket Adı',
          },
          type: 'text',
          optional: true,
        },
        {
          key: 'phone',
          label: {
            type: 'custom', 
            custom: 'Telefon',
          },
          type: 'text',
          optional: true,
        },
      ],
    })

    res.json({ url: session.url })
  } catch (error: any) {
    console.error('Stripe checkout error:', error)
    res.status(500).json({ error: error.message || 'Checkout oluşturulamadı' })
  }
})

// Webhook endpoint
app.post('/api/stripe/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature']
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!sig || !webhookSecret) {
    return res.status(400).send('Missing signature or webhook secret')
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret)
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message)
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        console.log('Payment successful:', session.id)
        
        // Eğer bağış ise, destekçi etiketi ekle
        if (session.metadata?.type === 'mytrabzon-support') {
          // Bu işlem Vercel serverless function'da yapılacak
          // api/stripe-webhook-donation.js dosyasına bakın
          console.log('Donation payment completed:', session.id)
        } else {
          // Normal paket satışı
          // TODO: Send confirmation email, update database, etc.
          // await sendConfirmationEmail(session.customer_email)
          // await updateOrderStatus(session.metadata.packageId, 'completed')
        }
        
        break
      }
      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.log('Payment failed:', paymentIntent.id)
        
        // TODO: Handle failed payment
        // await updateOrderStatus(paymentIntent.metadata.packageId, 'failed')
        
        break
      }
      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    res.json({ received: true })
  } catch (error: any) {
    console.error('Webhook handler error:', error)
    res.status(500).json({ error: 'Webhook handler failed' })
  }
})

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

// Start server
app.listen(port, () => {
  console.log(`🚀 Stripe API server running on port ${port}`)
  console.log(`📊 Health check: http://localhost:${port}/api/health`)
  console.log(`💳 Stripe checkout: http://localhost:${port}/api/stripe/checkout`)
})
