import { runHandler } from '../_lib/adapt.js'
import handler from './_session.js'

export const onRequest = (context) => runHandler(handler, context)
