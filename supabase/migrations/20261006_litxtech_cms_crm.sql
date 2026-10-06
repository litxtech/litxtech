-- LitxTech CMS + CRM + Admin Control Center
-- Super Admin auth.users.id: 26d4e301-9ae7-465d-805c-611ff302c04f

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Extend admin_users for Supabase Auth linkage + RBAC roles
ALTER TABLE IF EXISTS admin_users
  ADD COLUMN IF NOT EXISTS auth_user_id UUID UNIQUE,
  ADD COLUMN IF NOT EXISTS permissions JSONB DEFAULT '[]'::jsonb;

-- Allow SUPER_ADMIN style roles (keep legacy values)
ALTER TABLE admin_users DROP CONSTRAINT IF EXISTS admin_users_role_check;
ALTER TABLE admin_users
  ADD CONSTRAINT admin_users_role_check
  CHECK (role IN (
    'SUPER_ADMIN', 'ADMIN', 'EDITOR', 'CONTENT_MANAGER', 'SALES', 'SUPPORT',
    'ANALYTICS', 'READ_ONLY', 'admin', 'super_admin'
  ));

CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  actor_id UUID,
  actor_email TEXT,
  action TEXT NOT NULL,
  resource TEXT,
  resource_id TEXT,
  old_value JSONB,
  new_value JSONB,
  ip_address TEXT,
  user_agent TEXT,
  result TEXT DEFAULT 'OK'
);

CREATE TABLE IF NOT EXISTS login_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT,
  ip_address TEXT,
  success BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
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
  mobile TEXT,
  email TEXT DEFAULT 'support@litxtech.com',
  support_email TEXT DEFAULT 'support@litxtech.com',
  business_email TEXT,
  website TEXT DEFAULT 'https://www.litxtech.com',
  logo_url TEXT,
  favicon_url TEXT,
  copyright TEXT DEFAULT '© LitxTech. All rights reserved.',
  business_hours JSONB DEFAULT '{}'::jsonb,
  social JSONB DEFAULT '{}'::jsonb,
  whatsapp_enabled BOOLEAN DEFAULT true,
  whatsapp_number TEXT DEFAULT '13072715151',
  whatsapp_message TEXT DEFAULT 'Merhaba, LitxTech web sitesinden yazıyorum. Projem için bilgi almak istiyorum.',
  whatsapp_button_text TEXT DEFAULT 'WhatsApp',
  whatsapp_show_desktop BOOLEAN DEFAULT true,
  whatsapp_show_mobile BOOLEAN DEFAULT true,
  calendly_url TEXT DEFAULT 'https://calendly.com/litxtech/consultation',
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  updated_by UUID
);

INSERT INTO company_settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

CREATE TABLE IF NOT EXISTS cms_homepage (
  id INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
  content JSONB NOT NULL DEFAULT '{}'::jsonb,
  published_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  updated_by UUID
);

INSERT INTO cms_homepage (id, status, content, published_at)
VALUES (1, 'published', '{"seed":"use-fallback-homeContent"}'::jsonb, NOW())
ON CONFLICT (id) DO NOTHING;

CREATE TABLE IF NOT EXISTS cms_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  short_description TEXT,
  description TEXT,
  logo_url TEXT,
  cover_image_url TEXT,
  platforms TEXT[] DEFAULT '{}',
  ios_url TEXT,
  android_url TEXT,
  web_url TEXT,
  website_url TEXT,
  privacy_policy_url TEXT,
  terms_url TEXT,
  support_url TEXT,
  category TEXT,
  features JSONB DEFAULT '[]'::jsonb,
  screenshots JSONB DEFAULT '[]'::jsonb,
  video_url TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  featured BOOLEAN DEFAULT false,
  sort_order INT DEFAULT 0,
  seo_title TEXT,
  seo_description TEXT,
  og_image TEXT,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS cms_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT,
  summary TEXT,
  description TEXT,
  problem TEXT,
  solution TEXT,
  technology TEXT[] DEFAULT '{}',
  screenshots JSONB DEFAULT '[]'::jsonb,
  internal_path TEXT,
  external_url TEXT,
  image_url TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  featured BOOLEAN DEFAULT false,
  sort_order INT DEFAULT 0,
  seo_title TEXT,
  seo_description TEXT,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS cms_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content JSONB DEFAULT '[]'::jsonb,
  featured_image TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  seo_title TEXT,
  seo_description TEXT,
  og_image TEXT,
  canonical_url TEXT,
  no_index BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS cms_navigation (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  location TEXT NOT NULL CHECK (location IN ('header', 'footer', 'mobile')),
  label TEXT NOT NULL,
  url TEXT NOT NULL,
  item_type TEXT DEFAULT 'internal',
  icon TEXT,
  target TEXT DEFAULT '_self',
  visible BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0,
  parent_id UUID REFERENCES cms_navigation(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS cms_media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  filename TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  url TEXT NOT NULL,
  mime_type TEXT,
  size_bytes BIGINT,
  width INT,
  height INT,
  alt TEXT,
  caption TEXT,
  folder TEXT DEFAULT 'general',
  uploaded_by UUID,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

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
  status TEXT NOT NULL DEFAULT 'NEW' CHECK (status IN (
    'NEW', 'CONTACTED', 'DISCOVERY', 'QUALIFIED', 'PROPOSAL',
    'NEGOTIATION', 'WON', 'LOST', 'ARCHIVED'
  )),
  assigned_to UUID,
  tags TEXT[] DEFAULT '{}',
  next_follow_up TIMESTAMPTZ,
  last_contact_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS lead_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  author_id UUID,
  author_email TEXT,
  note TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
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

CREATE TABLE IF NOT EXISTS support_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reference_code TEXT UNIQUE NOT NULL,
  customer_name TEXT,
  customer_email TEXT NOT NULL,
  subject TEXT NOT NULL,
  category TEXT DEFAULT 'General',
  priority TEXT DEFAULT 'NORMAL' CHECK (priority IN ('LOW', 'NORMAL', 'HIGH', 'URGENT')),
  status TEXT DEFAULT 'OPEN' CHECK (status IN ('OPEN', 'IN_PROGRESS', 'WAITING_CUSTOMER', 'RESOLVED', 'CLOSED')),
  assigned_to UUID,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS support_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id UUID NOT NULL REFERENCES support_tickets(id) ON DELETE CASCADE,
  sender_type TEXT NOT NULL CHECK (sender_type IN ('customer', 'admin')),
  sender_email TEXT,
  body TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_name TEXT NOT NULL,
  path TEXT,
  meta JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS seo_redirects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source TEXT UNIQUE NOT NULL,
  destination TEXT NOT NULL,
  status_code INT DEFAULT 301,
  enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_cms_applications_slug ON cms_applications(slug);
CREATE INDEX IF NOT EXISTS idx_cms_projects_slug ON cms_projects(slug);
CREATE INDEX IF NOT EXISTS idx_analytics_events_name ON analytics_events(event_name);

-- Seed SUPER_ADMIN for provided auth user UUID
INSERT INTO admin_users (id, auth_user_id, email, password_hash, full_name, role, is_active)
VALUES (
  '26d4e301-9ae7-465d-805c-611ff302c04f',
  '26d4e301-9ae7-465d-805c-611ff302c04f',
  COALESCE(
    (SELECT email FROM auth.users WHERE id = '26d4e301-9ae7-465d-805c-611ff302c04f'),
    'admin@litxtech.com'
  ),
  'supabase-auth-managed',
  'LitxTech Super Admin',
  'SUPER_ADMIN',
  true
)
ON CONFLICT (id) DO UPDATE SET
  auth_user_id = EXCLUDED.auth_user_id,
  role = 'SUPER_ADMIN',
  is_active = true,
  password_hash = 'supabase-auth-managed';

-- Also match if row exists by auth_user_id only
INSERT INTO admin_users (auth_user_id, email, password_hash, full_name, role, is_active)
SELECT
  '26d4e301-9ae7-465d-805c-611ff302c04f',
  COALESCE(u.email, 'admin@litxtech.com'),
  'supabase-auth-managed',
  'LitxTech Super Admin',
  'SUPER_ADMIN',
  true
FROM auth.users u
WHERE u.id = '26d4e301-9ae7-465d-805c-611ff302c04f'
  AND NOT EXISTS (
    SELECT 1 FROM admin_users a WHERE a.auth_user_id = '26d4e301-9ae7-465d-805c-611ff302c04f'
  );

-- Seed published applications from known products (editable in admin)
INSERT INTO cms_applications (name, slug, short_description, description, category, status, featured, sort_order, website_url, privacy_policy_url, terms_url, support_url, published_at)
VALUES
  ('Tamuso', 'tamuso', 'Canlı sesli odalar ve modern sesli sohbet platformu.', 'Konuşmacı veya dinleyici olarak canlı odalara katılın.', 'Social', 'published', true, 1, 'https://www.litxtech.com/tamuso', 'https://www.litxtech.com/tamuso/gizlilik', 'https://www.litxtech.com/tamuso/kullanim-sartlari', 'https://www.litxtech.com/tamuso/destek', NOW()),
  ('Vora', 'vora', 'Karadeniz şehirleri için anlık haberleşme ve topluluk platformu.', 'Şehir kanalları, bildirimler ve moderasyon.', 'Community', 'published', true, 2, 'https://www.litxtech.com/vora', 'https://www.litxtech.com/vora/gizlilik', 'https://www.litxtech.com/vora/kullanim-sartlari', 'https://www.litxtech.com/vora/destek', NOW()),
  ('Nocta', 'nocta', 'Güvenli arkadaş bulma ve sosyal keşif uygulaması.', 'Profil, eşleşme ve güvenli iletişim.', 'Social', 'published', false, 3, 'https://www.litxtech.com/nocta', 'https://www.litxtech.com/nocta/gizlilik', 'https://www.litxtech.com/nocta/kullanim-sartlari', 'https://www.litxtech.com/nocta/destek', NOW()),
  ('MyTrabzon', 'mytrabzon', 'Trabzon için şehir rehberi ve topluluk uygulaması.', 'Yerel içerik ve etkinlikler.', 'City', 'published', false, 4, 'https://www.litxtech.com/mytrabzon', NULL, NULL, 'https://www.litxtech.com/support/mytrabzon', NOW())
ON CONFLICT (slug) DO NOTHING;

INSERT INTO cms_projects (name, slug, category, summary, description, internal_path, status, featured, sort_order, published_at)
VALUES
  ('Tamuso', 'tamuso', 'Social Platform', 'Canlı sesli odalar ve topluluk deneyimi.', 'Gerçek zamanlı iletişim odaklı sosyal platform.', '/tamuso', 'published', true, 1, NOW()),
  ('Vora', 'vora', 'Community', 'Karadeniz anlık haberleşme platformu.', 'Şehir odaklı topluluk uygulaması.', '/vora', 'published', true, 2, NOW()),
  ('Valoria Hotel', 'valoriahotel', 'Hospitality', 'Otel mobil deneyimi.', 'Konuk iletişimi ve marka sunumu.', '/valoria-app', 'published', false, 3, NOW())
ON CONFLICT (slug) DO NOTHING;

-- Public read policies for published content only
ALTER TABLE company_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_homepage ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_company_settings" ON company_settings;
CREATE POLICY "public_read_company_settings" ON company_settings FOR SELECT USING (true);

DROP POLICY IF EXISTS "public_read_published_apps" ON cms_applications;
CREATE POLICY "public_read_published_apps" ON cms_applications
  FOR SELECT USING (status = 'published' AND deleted_at IS NULL);

DROP POLICY IF EXISTS "public_read_published_projects" ON cms_projects;
CREATE POLICY "public_read_published_projects" ON cms_projects
  FOR SELECT USING (status = 'published' AND deleted_at IS NULL);

DROP POLICY IF EXISTS "public_read_published_homepage" ON cms_homepage;
CREATE POLICY "public_read_published_homepage" ON cms_homepage
  FOR SELECT USING (status = 'published');

DROP POLICY IF EXISTS "public_read_faqs" ON cms_faqs;
CREATE POLICY "public_read_faqs" ON cms_faqs FOR SELECT USING (published = true);

-- Leads/analytics: insert via anon for public forms; admin via service role
DROP POLICY IF EXISTS "public_insert_leads" ON leads;
CREATE POLICY "public_insert_leads" ON leads FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "public_insert_analytics" ON analytics_events;
CREATE POLICY "public_insert_analytics" ON analytics_events FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "public_insert_contact" ON contact_messages;
CREATE POLICY "public_insert_contact" ON contact_messages FOR INSERT WITH CHECK (true);
