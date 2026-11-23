import { handleCatchAll } from '../_lib/adapt.js'
import handler from './_handler.js'

export const onRequest = (context) => handleCatchAll(handler, context)
