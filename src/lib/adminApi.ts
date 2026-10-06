export type AdminUser = {
  id: string
  email: string
  role: string
  full_name?: string | null
  is_super_admin?: boolean
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(path, {
    ...init,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(data.error || `Request failed (${res.status})`)
  }
  return data as T
}

export const adminApi = {
  me: () => request<{ user: AdminUser }>('/api/admin/auth/session'),
  createSession: (access_token: string) =>
    request<{ user: AdminUser }>('/api/admin/auth/session', {
      method: 'POST',
      body: JSON.stringify({ access_token }),
    }),
  logout: () => request<{ ok: boolean }>('/api/admin/auth/session', { method: 'DELETE' }),
  dashboard: () => request<any>('/api/admin/dashboard'),
  leads: (params?: { status?: string; q?: string }) => {
    const qs = new URLSearchParams()
    if (params?.status) qs.set('status', params.status)
    if (params?.q) qs.set('q', params.q)
    const suffix = qs.toString() ? `?${qs}` : ''
    return request<{ leads: any[] }>(`/api/admin/leads${suffix}`)
  },
  updateLead: (body: Record<string, unknown>) =>
    request<{ lead: any }>('/api/admin/leads', { method: 'PATCH', body: JSON.stringify(body) }),
  settings: () => request<{ settings: any }>('/api/admin/settings'),
  updateSettings: (body: Record<string, unknown>) =>
    request<{ settings: any }>('/api/admin/settings', { method: 'PUT', body: JSON.stringify(body) }),
  applications: () => request<{ applications: any[] }>('/api/admin/applications'),
  createApplication: (body: Record<string, unknown>) =>
    request<{ application: any }>('/api/admin/applications', {
      method: 'POST',
      body: JSON.stringify(body),
    }),
  updateApplication: (body: Record<string, unknown>) =>
    request<{ application: any }>('/api/admin/applications', {
      method: 'PUT',
      body: JSON.stringify(body),
    }),
}
