import { runHandler } from './_lib/adapt.js'
import handler from './_sitemap.js'

export const onRequest = (context) => runHandler(handler, context)
