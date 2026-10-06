/** Normalize Vercel/env values that sometimes include literal \\r\\n. */
export function env(name, fallback = '') {
  const raw = process.env[name] ?? fallback
  if (raw == null) return ''
  return String(raw)
    .replace(/\\r\\n/g, '')
    .replace(/\\n/g, '')
    .replace(/\\r/g, '')
    .replace(/[\r\n]/g, '')
    .trim()
    .replace(/^["']|["']$/g, '')
}
