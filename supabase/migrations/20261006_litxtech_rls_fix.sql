-- LitxTech RLS cleanup + public form grants
-- Run in Supabase SQL Editor AFTER storage quota is restored.

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Ensure contact_messages exists (legacy admin schema)
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new',
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ensure core CRM tables exist (idempotent with prior migration)
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reference_code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  whatsapp TEXT,
  company TEXT,
  customer_type TEXT,
  project_type TEXT,
  budget_range TEXT,
  timeline TEXT,
  platforms TEXT[] DEFAULT '{}',
  project_description TEXT,
  preferred_contact TEXT,
  source TEXT DEFAULT 'website',
  status TEXT NOT NULL DEFAULT 'NEW',
  assigned_to UUID,
  tags TEXT[] DEFAULT '{}',
  next_follow_up TIMESTAMPTZ,
  last_contact_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS lead_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  from_status TEXT,
  to_status TEXT,
  meta JSONB DEFAULT '{}'::jsonb,
  actor_id UUID,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_name TEXT NOT NULL,
  path TEXT,
  meta JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS company_settings (
  id INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  company_name TEXT NOT NULL DEFAULT 'LitxTech',
  legal_name TEXT DEFAULT 'LitxTech LLC',
  description TEXT,
  address TEXT,
  country TEXT,
  city TEXT,
  phone TEXT DEFAULT '+1 307 271 5151',
  phone_tel TEXT DEFAULT '+13072715151',
  email TEXT DEFAULT 'support@litxtech.com',
  support_email TEXT DEFAULT 'support@litxtech.com',
  website TEXT DEFAULT 'https://www.litxtech.com',
  logo_url TEXT,
  copyright TEXT DEFAULT '© LitxTech. All rights reserved.',
  social JSONB DEFAULT '{}'::jsonb,
  whatsapp_enabled BOOLEAN DEFAULT true,
  whatsapp_number TEXT DEFAULT '13072715151',
  whatsapp_message TEXT DEFAULT 'Merhaba, LitxTech web sitesinden yazıyorum.',
  whatsapp_button_text TEXT DEFAULT 'WhatsApp',
  whatsapp_show_desktop BOOLEAN DEFAULT true,
  whatsapp_show_mobile BOOLEAN DEFAULT true,
  calendly_url TEXT DEFAULT 'https://calendly.com/litxtech/consultation',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO company_settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

CREATE TABLE IF NOT EXISTS cms_faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL DEFAULT 'Genel',
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sort_order INT DEFAULT 0,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS cms_homepage (
  id INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  status TEXT NOT NULL DEFAULT 'published',
  content JSONB NOT NULL DEFAULT '{}'::jsonb,
  published_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO cms_homepage (id, status, content, published_at)
VALUES (1, 'published', '{"seed":"use-fallback-homeContent"}'::jsonb, NOW())
ON CONFLICT (id) DO NOTHING;

-- Enable RLS
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_homepage ENABLE ROW LEVEL SECURITY;

-- Drop conflicting old policies
DROP POLICY IF EXISTS "Admins can manage contact messages" ON contact_messages;
DROP POLICY IF EXISTS "public_insert_contact" ON contact_messages;
DROP POLICY IF EXISTS "public_insert_leads" ON leads;
DROP POLICY IF EXISTS "public_insert_analytics" ON analytics_events;
DROP POLICY IF EXISTS "public_read_company_settings" ON company_settings;
DROP POLICY IF EXISTS "public_read_faqs" ON cms_faqs;
DROP POLICY IF EXISTS "public_read_published_homepage" ON cms_homepage;
DROP POLICY IF EXISTS "public_insert_lead_events" ON lead_events;
DROP POLICY IF EXISTS "anon_insert_contact" ON contact_messages;
DROP POLICY IF EXISTS "anon_insert_leads" ON leads;
DROP POLICY IF EXISTS "anon_insert_analytics" ON analytics_events;
DROP POLICY IF EXISTS "anon_insert_lead_events" ON lead_events;
DROP POLICY IF EXISTS "anon_read_company" ON company_settings;
DROP POLICY IF EXISTS "anon_read_faqs" ON cms_faqs;
DROP POLICY IF EXISTS "anon_read_homepage" ON cms_homepage;

-- Public read
CREATE POLICY "anon_read_company" ON company_settings FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "anon_read_faqs" ON cms_faqs FOR SELECT TO anon, authenticated USING (published = true);
CREATE POLICY "anon_read_homepage" ON cms_homepage FOR SELECT TO anon, authenticated USING (status = 'published');

-- Public write (forms)
CREATE POLICY "anon_insert_contact" ON contact_messages FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "anon_insert_leads" ON leads FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "anon_insert_analytics" ON analytics_events FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "anon_insert_lead_events" ON lead_events FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Grants
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT SELECT ON company_settings, cms_faqs, cms_homepage TO anon, authenticated;
GRANT INSERT ON contact_messages, leads, analytics_events, lead_events TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO service_role;

-- Seed FAQs if empty
INSERT INTO cms_faqs (category, question, answer, sort_order, published)
SELECT v.category, v.question, v.answer, v.sort_order, true
FROM (
  VALUES
    ('Genel', 'LitxTech ne geliştiriyor?', 'Mobil uygulamalar, SaaS, otel/restoran sistemleri ve özel yazılım.', 1),
    ('Genel', 'Nasıl teklif alabilirim?', 'www.litxtech.com/projemi-anlat formunu doldurun.', 2),
    ('Destek', 'Destek kanalları neler?', '/destek, e-posta ve WhatsApp.', 3)
) AS v(category, question, answer, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM cms_faqs LIMIT 1);
