const ROLE_PERMISSIONS = {
  SUPER_ADMIN: ['*'],
  super_admin: ['*'],
  ADMIN: ['*'],
  admin: ['*'],
  EDITOR: ['content.read', 'content.write', 'analytics.read'],
  CONTENT_MANAGER: ['content.read', 'content.write'],
  SUPPORT: ['support.manage', 'users.read', 'content.read'],
  SALES: ['leads.manage', 'analytics.read', 'content.read'],
  ANALYTICS: ['analytics.read', 'content.read'],
  ANALYST: ['analytics.read', 'content.read'],
  READ_ONLY: ['content.read', 'analytics.read', 'users.read'],
}

export function permissionsFor(role) {
  return ROLE_PERMISSIONS[role] || ['content.read']
}

export function can(admin, permission) {
  const list = permissionsFor(admin?.role)
  if (list.includes('*')) return true
  return list.includes(permission)
}

export function assertCan(admin, res, permission, json) {
  if (can(admin, permission)) return true
  json(res, 403, { error: 'Bu işlem için yetkiniz yok.' })
  return false
}
