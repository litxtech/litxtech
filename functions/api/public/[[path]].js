import { handleCatchAll } from '../_lib/adapt.js'
import handler from './_handler.js'

// Pages `params.path` dizi veya string olabilir; handleCatchAll ikisini de işler.
export const onRequest = (context) => handleCatchAll(handler, context)
