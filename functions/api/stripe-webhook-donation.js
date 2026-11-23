import { runHandler } from './_lib/adapt.js'
import handler from './_stripe-webhook-donation.js'

export const onRequest = (context) => runHandler(handler, context)
