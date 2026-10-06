export function resolveHandler(routes, key) {
  if (routes[key]) return { handler: routes[key], key, rest: '' }
  const parts = String(key || '').split('/').filter(Boolean)
  for (let i = parts.length - 1; i > 0; i -= 1) {
    const prefix = parts.slice(0, i).join('/')
    if (routes[prefix]) {
      return { handler: routes[prefix], key: prefix, rest: parts.slice(i).join('/') }
    }
  }
  return null
}
