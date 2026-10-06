import { Navigate, useSearchParams } from 'react-router-dom'

/** Legacy /login → unified auth (OTP + password). */
export function LoginPage() {
  const [params] = useSearchParams()
  const mode = params.get('mode')
  const to = mode === 'signup' ? '/auth?mode=signup' : '/auth'
  return <Navigate to={to} replace />
}
