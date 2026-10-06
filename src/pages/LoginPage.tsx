import { Navigate } from 'react-router-dom'

/** Legacy /login → unified auth (OTP + password). */
export function LoginPage() {
  return <Navigate to="/auth" replace />
}
