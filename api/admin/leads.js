import {
  cors,
  getServiceClient,
  json,
  readBody,
  requireAdmin,
  writeAudit,
} from '../_lib/supabaseAdmin.js'

export default async function handler(req, res) {
  cors(req, res)
  if (req.method === 'OPTIONS') return json(res, 204, {})

  const admin = await requireAdmin(req, res)
  if (!admin) return

  const supabase = getServiceClient()

  try {
    if (req.method === 'GET') {
      const url = new URL(req.url, 'http://localhost')
      const status = url.searchParams.get('status')
      const q = url.searchParams.get('q')
      const limit = Math.min(Number(url.searchParams.get('limit') || 50), 100)

      let query = supabase
        .from('leads')
        .select('*')
        .is('deleted_at', null)
        .order('created_at', { ascending: false })
        .limit(limit)

      if (status) query = query.eq('status', status)
      if (q) query = query.or(`name.ilike.%${q}%,email.ilike.%${q}%,company.ilike.%${q}%,reference_code.ilike.%${q}%`)

      const { data, error } = await query
      if (error) return json(res, 500, { error: 'Could not load leads' })
      return json(res, 200, { leads: data || [] })
    }

    if (req.method === 'PATCH') {
      const body = await readBody(req)
      const { id, status, assigned_to, tags, next_follow_up, note } = body
      if (!id) return json(res, 400, { error: 'id required' })

      const { data: existing } = await supabase.from('leads').select('*').eq('id', id).single()
      if (!existing) return json(res, 404, { error: 'Lead not found' })

      const patch = { updated_at: new Date().toISOString() }
      if (status) patch.status = status
      if (assigned_to !== undefined) patch.assigned_to = assigned_to
      if (tags) patch.tags = tags
      if (next_follow_up !== undefined) patch.next_follow_up = next_follow_up
      if (status) patch.last_contact_at = new Date().toISOString()

      const { data, error } = await supabase.from('leads').update(patch).eq('id', id).select('*').single()
      if (error) return json(res, 500, { error: 'Update failed' })

      if (status && status !== existing.status) {
        await supabase.from('lead_events').insert({
          lead_id: id,
          event_type: 'STATUS_CHANGED',
          from_status: existing.status,
          to_status: status,
          actor_id: admin.id,
        })
      }

      if (note) {
        await supabase.from('lead_notes').insert({
          lead_id: id,
          author_id: admin.id,
          author_email: admin.email,
          note,
        })
      }

      await writeAudit(supabase, {
        actor_id: admin.id,
        actor_email: admin.email,
        action: 'LEAD_UPDATED',
        resource: 'leads',
        resource_id: id,
        old_value: { status: existing.status },
        new_value: patch,
      })

      return json(res, 200, { lead: data })
    }

    return json(res, 405, { error: 'Method not allowed' })
  } catch {
    return json(res, 500, { error: 'Server error' })
  }
}
