// Vercel Serverless Function - Real Stripe Integration
// This will work on www.litxtech.com

import Stripe from 'stripe'

// Initialize Stripe with error handling
if (!process.env.STRIPE_SECRET_KEY) {
  console.error('❌ STRIPE_SECRET_KEY environment variable is missing!')
  console.error('Please set STRIPE_SECRET_KEY in Vercel Environment Variables')
}

const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-06-20',
    })
  : null

// Real Stripe Products - 18 packages with actual Product IDs
const STRIPE_PRODUCTS = {
  'starter-website': {
    name: 'Starter Website',
    description: 'Perfect for individuals and small businesses.',
    priceId: 'prod_TJx1tMK4kjAKYw'
  },
  'professional-website-suite': {
    name: 'Professional Website Suite', 
    description: 'Best for growing startups needing automation.',
    priceId: 'prod_TJx2DQI2ya2TRE'
  },
  'enterprise-saas-platform': {
    name: 'Enterprise SaaS Platform',
    description: 'For SaaS products and scalable business platforms.', 
    priceId: 'prod_TJx3685vaECdcB'
  },
  'ai-lite': {
    name: 'AI Lite',
    description: 'Entry-level AI integration for websites or apps.',
    priceId: 'prod_TJx4FeOKSgVjsY'
  },
  'ai-pro': {
    name: 'AI Pro',
    description: 'Advanced automation & data-driven AI.',
    priceId: 'prod_TJx7xGb2pBFQsA'
  },
  'ai-enterprise': {
    name: 'AI Enterprise',
    description: 'For large-scale AI-driven businesses.',
    priceId: 'prod_TJx85dkj0qblrw'
  },
  'smart-hotel-suite': {
    name: 'Smart Hotel Suite',
    description: 'For hotels, villas, and B&Bs.',
    priceId: 'prod_TJx8NFA5ektMlM'
  },
  'restaurant-pro': {
    name: 'Restaurant Pro',
    description: 'For restaurants, cafés, and bars.',
    priceId: 'prod_TJx9mc9WGeeTS5'
  },
  'travel-agency-hub': {
    name: 'Travel & Agency Hub',
    description: 'For tourism agencies and transfer services.',
    priceId: 'prod_TJxAosCL7gRfYQ'
  },
  'corporate-site': {
    name: 'Corporate Site',
    description: 'For professional companies needing authority online.',
    priceId: 'prod_TJxAosCL7gRfYQ'
  },
  'erp-crm-suite': {
    name: 'ERP / CRM Suite',
    description: 'For businesses needing comprehensive management systems.',
    priceId: 'prod_TJxAg8uJVRzthM'
  },
  'ecommerce-ultra': {
    name: 'E-Commerce Ultra',
    description: 'For online stores and marketplaces.',
    priceId: 'prod_TJxBIgZuYnIadp'
  },
  'full-digital-suite': {
    name: 'Full Digital Suite',
    description: 'Complete digital transformation package.',
    priceId: 'prod_TJxBIgZuYnIadp'
  },
  'custom-enterprise-solutions': {
    name: 'Custom Enterprise Solutions',
    description: 'Tailored solutions for large enterprises.',
    priceId: 'prod_TJcc3OTPPk4Uf9'
  },
  'ui-ux-design-suite': {
    name: 'UI/UX Design Suite',
    description: 'Professional design and user experience services.',
    priceId: 'prod_TJcac84nb1EnsO'
  },
  'annual-maintenance-plan': {
    name: 'Annual Maintenance Plan',
    description: 'Yearly maintenance and support package.',
    priceId: 'prod_TJxpyXo2HM4hkT'
  },
  'custom-software-development': {
    name: 'Custom Software Development',
    description: 'Bespoke software solutions tailored to your needs.',
    priceId: 'prod_TJxoeD8wdnwC9c'
  },
  'digital-suite': {
    name: 'Digital Suite',
    description: 'Comprehensive digital transformation package.',
    priceId: 'prod_TJcbY7ejfso2Yq'
  }
}

export default async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  if (req.method === 'GET') {
    if (!stripe) {
      return res.status(500).json({ 
        status: 'ERROR', 
        timestamp: new Date().toISOString(),
        message: 'Stripe is not configured. Please set STRIPE_SECRET_KEY environment variable.',
        error: 'STRIPE_SECRET_KEY is missing'
      })
    }
    return res.json({ 
      status: 'OK', 
      timestamp: new Date().toISOString(),
      message: 'Stripe API is ready for payments',
      hasStripeKey: !!process.env.STRIPE_SECRET_KEY
    })
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Check if Stripe is configured
  if (!stripe) {
    return res.status(500).json({ 
      error: 'Stripe is not configured',
      message: 'Please set STRIPE_SECRET_KEY environment variable in Vercel',
      help: 'Go to Vercel Dashboard → Settings → Environment Variables → Add STRIPE_SECRET_KEY'
    })
  }

  try {
    const { packageId, packageName, packagePrice } = req.body

    if (!packageId || !STRIPE_PRODUCTS[packageId]) {
      return res.status(400).json({ error: 'Invalid package ID' })
    }

    const product = STRIPE_PRODUCTS[packageId]

    console.log('Product found:', product)
    console.log('Frontend price:', packagePrice)
    console.log('Price ID:', product.priceId)

    // Frontend'den gelen fiyatı kullan (bağış sistemi gibi)
    // packagePrice dolar cinsinden geliyor, cent'e çevir
    const amountInCents = Math.round((packagePrice || 0) * 100)

    if (!packagePrice || packagePrice <= 0) {
      return res.status(400).json({ error: 'Invalid package price' })
    }

    // Check if priceId is a Product ID (starts with prod_) and try to find matching price
    let stripePrice
    if (product.priceId && product.priceId.startsWith('prod_')) {
      console.log('Product ID detected, fetching prices...')
      try {
        const prices = await stripe.prices.list({
          product: product.priceId,
          active: true,
          limit: 100
        })
        
        if (prices.data.length === 0) {
          // Eğer price bulunamazsa, dynamic price oluştur
          console.log('No prices found, creating dynamic price...')
        } else {
          // Frontend'den gelen fiyata en yakın price'ı bul
          const targetAmount = amountInCents
          const matched = prices.data.find(p => {
            const priceAmount = p.unit_amount || 0
            // 1 dolar toleransla eşleş
            return Math.abs(priceAmount - targetAmount) <= 100
          })
          
          if (matched) {
            stripePrice = matched
            console.log('Found matching price:', stripePrice.id, 'Amount:', stripePrice.unit_amount)
          } else {
            // Eşleşen price yoksa, dynamic price oluştur
            console.log('No matching price found, creating dynamic price...')
          }
        }
      } catch (priceError) {
        console.error('Error fetching prices for product:', priceError)
        // Hata durumunda dynamic price oluştur
      }
    } else {
      // Direct price ID - kontrol et
      try {
        stripePrice = await stripe.prices.retrieve(product.priceId)
        console.log('Stripe price retrieved:', stripePrice.id, 'Amount:', stripePrice.unit_amount)
        
        // Eğer Stripe'daki fiyat frontend'den gelen fiyatla eşleşmiyorsa, dynamic price kullan
        if (stripePrice.unit_amount !== amountInCents) {
          console.log('Price mismatch! Stripe:', stripePrice.unit_amount, 'Frontend:', amountInCents)
          console.log('Using dynamic price instead...')
          stripePrice = null // Dynamic price oluştur
        }
      } catch (priceError) {
        console.error('Error fetching Stripe price:', priceError)
        // Hata durumunda dynamic price oluştur
        stripePrice = null
      }
    }

    // Eğer uygun price bulunamadıysa, dynamic price oluştur (bağış sistemi gibi)
    if (!stripePrice) {
      console.log('Creating dynamic price for amount:', amountInCents, 'cents ($' + packagePrice + ')')
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        stripePrice ? {
          price: stripePrice.id, // Eğer uygun price varsa kullan
          quantity: 1,
        } : {
          // Dynamic price oluştur (bağış sistemi gibi)
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.name,
              description: product.description,
            },
            unit_amount: amountInCents, // Frontend'den gelen fiyat
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : process.env.NEXT_PUBLIC_SITE_URL || 'https://www.litxtech.com'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : process.env.NEXT_PUBLIC_SITE_URL || 'https://www.litxtech.com'}/cancel`,
      metadata: {
        packageId,
        packageName: product.name,
        packagePrice: packagePrice.toString(), // Frontend'den gelen fiyat
        stripePriceId: stripePrice?.id || 'dynamic',
        isDynamicPrice: (!stripePrice).toString()
      },
      custom_fields: [
        {
          key: 'company_name',
          label: {
            type: 'custom',
            custom: 'Company Name',
          },
          type: 'text',
          optional: true,
        },
        {
          key: 'phone',
          label: {
            type: 'custom', 
            custom: 'Phone Number',
          },
          type: 'text',
          optional: true,
        },
      ],
    })

    res.json({ 
      url: session.url,
      price: packagePrice, // Frontend'den gelen fiyat
      currency: stripePrice?.currency || 'usd',
      packageName: product.name,
      packageId: packageId
    })
  } catch (error) {
    console.error('Stripe checkout error:', error)
    res.status(500).json({ error: error.message || 'Checkout creation failed' })
  }
}