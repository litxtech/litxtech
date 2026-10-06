/** Parse Supabase auth params from hash or query. */
export function getAuthUrlParams() {
  const hash = window.location.hash?.startsWith('#')
    ? window.location.hash.slice(1)
    : window.location.hash || ''
  const fromHash = new URLSearchParams(hash)
  const fromQuery = new URLSearchParams(window.location.search)

  const type = fromHash.get('type') || fromQuery.get('type')
  const accessToken = fromHash.get('access_token') || fromQuery.get('access_token')
  const code = fromQuery.get('code')
  const error = fromHash.get('error_description') || fromQuery.get('error_description')

  return { type, accessToken, code, error, hash: window.location.hash }
}

export function isPasswordRecoveryUrl() {
  const { type, accessToken, code } = getAuthUrlParams()
  if (type === 'recovery') return true
  // Some templates land with tokens but type already consumed; sessionStorage flag set by listener
  if (sessionStorage.getItem('ltx_password_recovery') === '1') return true
  // Implicit recovery often has access_token + type=recovery; PKCE may only have code on reset URL
  if (accessToken && type === 'recovery') return true
  if (code && window.location.pathname.includes('reset-password')) return true
  return false
}

export function markPasswordRecovery() {
  sessionStorage.setItem('ltx_password_recovery', '1')
}

export function clearPasswordRecovery() {
  sessionStorage.removeItem('ltx_password_recovery')
}
