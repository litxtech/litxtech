// Vercel Serverless Function - MyTrabzon Donation System
// Support packages: 89, 139, 339 TL

import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

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
    return res.json({ 
      status: 'OK', 
      timestamp: new Date().toISOString(),
      message: 'MyTrabzon Donation API is ready',
      packages: [89, 139, 339],
      currency: 'TRY'
    })
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { amount, donorName, type, currency = 'TRY' } = req.body

    if (!amount || amount < 1) {
      return res.status(400).json({ error: 'Geçersiz bağış miktarı' })
    }

    // Amount'u kuruş'a çevir (TRY için)
    const amountInCents = Math.round(amount * 100)

    // Create Stripe Checkout Session for donation
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: currency.toLowerCase(),
            product_data: {
              name: 'MyTrabzon Destek Paketi',
              description: `MyTrabzon uygulamasına destek - ${donorName || 'Anonim'}`,
              images: [],
            },
            unit_amount: amountInCents,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.litxtech.com'}/success?session_id={CHECKOUT_SESSION_ID}&type=donation`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.litxtech.com'}/donation`,
      metadata: {
        type: type || 'mytrabzon-support',
        donorName: donorName || 'Anonim',
        amount: amount.toString(),
        currency: currency,
      },
      payment_intent_data: {
        description: `MyTrabzon destek paketi - ${amount} ${currency}`,
      },
    })

    res.json({ 
      url: session.url,
      amount: amount,
      currency: currency,
      sessionId: session.id
    })
  } catch (error) {
    console.error('Donation checkout error:', error)
    res.status(500).json({ error: error.message || 'Bağış işlemi oluşturulamadı' })
  }
}

