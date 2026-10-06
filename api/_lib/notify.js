export async function notifyAdmin(supabase, entry) {
  try {
    await supabase.from('admin_notifications').insert({
      type: entry.type,
      title: entry.title,
      body: entry.body || null,
      href: entry.href || null,
    })
  } catch {
    // table may not be migrated yet
  }
}

export function clientGeo(req) {
  const country = req.headers['x-vercel-ip-country']
  const city = req.headers['x-vercel-ip-city']
  return {
    country: typeof country === 'string' ? country : null,
    city: typeof city === 'string' ? decodeURIComponent(city) : null,
  }
}

export function deviceFromUa(ua) {
  const s = String(ua || '')
  const device = /iPhone|Android.+Mobile|Mobile/i.test(s)
    ? 'mobile'
    : /iPad|Tablet/i.test(s)
      ? 'tablet'
      : 'desktop'
  const browser = /Edg\//.test(s)
    ? 'Edge'
    : /Chrome\//.test(s)
      ? 'Chrome'
      : /Safari\//.test(s)
        ? 'Safari'
        : /Firefox\//.test(s)
          ? 'Firefox'
          : 'Other'
  const os = /Windows/.test(s)
    ? 'Windows'
    : /Mac OS/.test(s)
      ? 'macOS'
      : /Android/.test(s)
        ? 'Android'
        : /iPhone|iPad/.test(s)
          ? 'iOS'
          : /Linux/.test(s)
            ? 'Linux'
            : 'Other'
  return { device, browser, os }
}
