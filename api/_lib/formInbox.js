import { env } from './env.js'
import { getDbClient, isDbRestrictedError } from './supabaseAdmin.js'

function refCode(prefix = 'LTX') {
  return `${prefix}-${Date.now().toString().slice(-6)}-${Math.floor(1000 + Math.random() * 9000)}`
}

/** Persist lead/contact when Supabase is healthy; otherwise GitHub issue fallback. */
export async function saveLeadOrFallback(payload) {
  const reference_code = payload.reference_code || refCode()
  const row = {
    reference_code,
    name: payload.name,
    email: payload.email,
    phone: payload.phone || null,
    whatsapp: payload.whatsapp || null,
    company: payload.company || null,
    customer_type: payload.customer_type || null,
    project_type: payload.project_type || null,
    budget_range: payload.budget_range || null,
    timeline: payload.timeline || null,
    platforms: Array.isArray(payload.platforms) ? payload.platforms : [],
    project_description: payload.project_description || payload.message || '',
    preferred_contact: payload.preferred_contact || null,
    source: payload.source || 'website',
    status: 'NEW',
  }

  try {
    const supabase = getDbClient()
    const { data, error } = await supabase.from('leads').insert(row).select('id, reference_code').single()
    if (error) throw error
    try {
      await supabase.from('lead_events').insert({
        lead_id: data.id,
        event_type: 'FORM_SUBMITTED',
        to_status: 'NEW',
        meta: { source: row.source },
      })
    } catch {
      // optional
    }
    try {
      await supabase.from('analytics_events').insert({
        event_name: 'lead_completed',
        path: payload.path || '/projemi-anlat',
        meta: { reference_code, project_type: row.project_type },
      })
    } catch {
      // optional
    }
    return { ok: true, reference_code: data.reference_code, channel: 'supabase' }
  } catch (err) {
    if (!isDbRestrictedError(err) && !/not configured|relation|schema cache|JWT|permission|RLS|row-level/i.test(String(err?.message || err))) {
      // still try fallback for common outages
    }
    const gh = await saveToGitHubIssue({
      title: `[Lead ${reference_code}] ${row.name} — ${row.project_type || row.source}`,
      body: [
        `**Ref:** ${reference_code}`,
        `**Name:** ${row.name}`,
        `**Email:** ${row.email}`,
        `**Phone:** ${row.phone || '-'}`,
        `**Company:** ${row.company || '-'}`,
        `**Type:** ${row.customer_type || '-'} / ${row.project_type || '-'}`,
        `**Budget:** ${row.budget_range || '-'}`,
        `**Timeline:** ${row.timeline || '-'}`,
        `**Source:** ${row.source}`,
        '',
        '## Description',
        row.project_description,
      ].join('\n'),
      labels: ['lead', 'website'],
    })
    if (gh.ok) return { ok: true, reference_code, channel: 'github-fallback' }
    throw err
  }
}

export async function saveContactOrFallback(payload) {
  const reference_code = refCode('MSG')
  const name = payload.name
  const email = payload.email
  const message = payload.message
  const subject = payload.subject || 'Contact form'

  try {
    const supabase = getDbClient()
    const { error: cErr } = await supabase.from('contact_messages').insert({
      name,
      email,
      phone: payload.phone || null,
      subject,
      message,
      status: 'new',
    })
    if (cErr) throw cErr

    // Also mirror into leads CRM
    try {
      await supabase.from('leads').insert({
        reference_code,
        name,
        email,
        phone: payload.phone || null,
        project_description: `${subject}\n\n${message}`,
        project_type: 'contact',
        customer_type: 'other',
        source: 'contact-form',
        status: 'NEW',
      })
    } catch {
      // lead table may be missing; contact already saved
    }

    return { ok: true, reference_code, channel: 'supabase' }
  } catch (err) {
    const gh = await saveToGitHubIssue({
      title: `[Contact ${reference_code}] ${name} — ${subject}`,
      body: [
        `**Ref:** ${reference_code}`,
        `**Name:** ${name}`,
        `**Email:** ${email}`,
        `**Phone:** ${payload.phone || '-'}`,
        `**Subject:** ${subject}`,
        '',
        message,
      ].join('\n'),
      labels: ['contact', 'website'],
    })
    if (gh.ok) return { ok: true, reference_code, channel: 'github-fallback' }
    throw err
  }
}

async function saveToGitHubIssue({ title, body, labels }) {
  const token = env('GITHUB_TOKEN') || env('GH_TOKEN')
  const repo = env('GITHUB_LEADS_REPO') || 'litxtech/litxtech'
  if (!token) return { ok: false, error: 'No GITHUB_TOKEN' }

  try {
    const res = await fetch(`https://api.github.com/repos/${repo}/issues`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
        'Content-Type': 'application/json',
        'User-Agent': 'litxtech-web-forms',
      },
      body: JSON.stringify({ title, body, labels }),
    })
    if (!res.ok) {
      const t = await res.text()
      return { ok: false, error: t }
    }
    return { ok: true }
  } catch (e) {
    return { ok: false, error: String(e.message || e) }
  }
}
