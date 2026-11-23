import { runHandler } from './_lib/adapt.js'
import handler from './_stripe-checkout.js'

export const onRequest = (context) => runHandler(handler, context)
