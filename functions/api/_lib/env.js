/** Normalize Vercel/Cloudflare env values that sometimes include literal \\r\\n. */
export function env(name, fallback = '') {
  const runtime =
    typeof globalThis !== 'undefined' && globalThis.__LITX_ENV__ ? globalThis.__LITX_ENV__ : null
  const fromRuntime = runtime && runtime[name] != null ? runtime[name] : undefined
  const raw = fromRuntime ?? process.env[name] ?? fallback
  if (raw == null) return ''
  return String(raw)
    .replace(/\\r\\n/g, '')
    .replace(/\\n/g, '')
    .replace(/\\r/g, '')
    .replace(/[\r\n]/g, '')
    .trim()
    .replace(/^["']|["']$/g, '')
}
