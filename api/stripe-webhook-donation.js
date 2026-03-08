// Vercel Serverless Function - Stripe Webhook for Donations
// Otomatik destekçi etiketi ekleme

import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export default async (req, res) => {
  const sig = req.headers['stripe-signature']
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!sig || !webhookSecret) {
    return res.status(400).send('Missing signature or webhook secret')
  }

  let event

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message)
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object
        
        // Eğer bağış ise
        if (session.metadata?.type === 'mytrabzon-support') {
          const amount = parseFloat(session.metadata.amount || '0')
          const donorName = session.metadata.donorName || 'Anonim'
          const currency = session.metadata.currency || 'TRY'
          
          // Customer email'den user_id bul (eğer varsa)
          let userId = null
          if (session.customer_email) {
            const { data: users } = await supabase.auth.admin.listUsers()
            const user = users?.users?.find(u => u.email === session.customer_email)
            if (user) {
              userId = user.id
            }
          }

          // Bağış kaydı ekle
          const { data: donation, error: donationError } = await supabase
            .from('donations')
            .insert({
              user_id: userId,
              amount: amount,
              currency: currency,
              stripe_session_id: session.id,
              stripe_payment_intent_id: session.payment_intent,
              donor_name: donorName,
              donation_type: 'mytrabzon-support',
              status: 'completed',
              completed_at: new Date().toISOString(),
              metadata: {
                customer_email: session.customer_email,
                customer_name: session.customer_details?.name,
              }
            })
            .select()
            .single()

          if (donationError) {
            console.error('Donation insert error:', donationError)
          }

          // Eğer user_id varsa, destekçi etiketi ekle
          if (userId && donation) {
            const { error: badgeError } = await supabase.rpc('add_supporter_badge', {
              p_user_id: userId,
              p_amount: amount
            })

            if (badgeError) {
              console.error('Badge add error:', badgeError)
              // Manuel olarak eklemeyi dene
              const { error: manualBadgeError } = await supabase
                .from('user_badges')
                .upsert({
                  user_id: userId,
                  badge_type: 'supporter',
                  badge_name: 'Destekçi',
                  badge_icon: 'heart',
                  badge_color: 'pink',
                  is_visible: true
                }, {
                  onConflict: 'user_id,badge_type'
                })

              if (manualBadgeError) {
                console.error('Manual badge insert error:', manualBadgeError)
              }
            }
          }

          console.log('Donation processed:', {
            sessionId: session.id,
            amount,
            userId,
            donationId: donation?.id
          })
        }
        
        break
      }
      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object
        console.log('Payment failed:', paymentIntent.id)
        
        // Bağış kaydını failed olarak işaretle
        if (paymentIntent.metadata?.type === 'mytrabzon-support') {
          await supabase
            .from('donations')
            .update({ status: 'failed' })
            .eq('stripe_payment_intent_id', paymentIntent.id)
        }
        
        break
      }
      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    res.json({ received: true })
  } catch (error) {
    console.error('Webhook handler error:', error)
    res.status(500).json({ error: 'Webhook handler failed' })
  }
}

