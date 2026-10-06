-- Additive platform tables. Existing rows are not deleted.

ALTER TABLE company_settings ADD COLUMN IF NOT EXISTS whatsapp_country_code TEXT DEFAULT '1';
ALTER TABLE company_settings ADD COLUMN IF NOT EXISTS whatsapp_display TEXT;
ALTER TABLE company_settings ADD COLUMN IF NOT EXISTS working_hours TEXT;
ALTER TABLE company_settings ADD COLUMN IF NOT EXISTS default_seo JSONB DEFAULT '{}'::jsonb;
ALTER TABLE company_settings ADD COLUMN IF NOT EXISTS analytics_ids JSONB DEFAULT '{}'::jsonb;
ALTER TABLE company_settings ADD COLUMN IF NOT EXISTS cookie_text TEXT;

CREATE TABLE IF NOT EXISTS page_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  path TEXT NOT NULL,
  visitor_id TEXT,
  session_id TEXT,
  country TEXT,
  city TEXT,
  device TEXT,
  browser TEXT,
  os TEXT,
  referrer TEXT,
  utm JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_page_views_created ON page_views(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_page_views_path ON page_views(path);
CREATE INDEX IF NOT EXISTS idx_analytics_events_created ON analytics_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_events_name ON analytics_events(event_name);

CREATE TABLE IF NOT EXISTS user_presence (
  user_id UUID PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  phone TEXT,
  status TEXT DEFAULT 'offline',
  last_seen TIMESTAMPTZ,
  last_login TIMESTAMPTZ,
  login_count INT DEFAULT 0,
  device TEXT,
  browser TEXT,
  ip_masked TEXT,
  role TEXT DEFAULT 'user',
  is_active BOOLEAN DEFAULT true,
  blocked BOOLEAN DEFAULT false,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS cms_services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  short_description TEXT,
  detailed_description TEXT,
  icon TEXT,
  hero_image TEXT,
  gallery JSONB DEFAULT '[]'::jsonb,
  benefits JSONB DEFAULT '[]'::jsonb,
  technologies JSONB DEFAULT '[]'::jsonb,
  process JSONB DEFAULT '[]'::jsonb,
  cta_label TEXT,
  cta_url TEXT,
  seo JSONB DEFAULT '{}'::jsonb,
  status TEXT NOT NULL DEFAULT 'published',
  sort_order INT DEFAULT 0,
  locale TEXT DEFAULT 'tr',
  deleted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS feed_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL DEFAULT 'update',
  category TEXT DEFAULT 'Company Update',
  title TEXT,
  body TEXT,
  media JSONB DEFAULT '[]'::jsonb,
  link_url TEXT,
  project_slug TEXT,
  tags JSONB DEFAULT '[]'::jsonb,
  status TEXT NOT NULL DEFAULT 'draft',
  featured BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  scheduled_at TIMESTAMPTZ,
  likes INT DEFAULT 0,
  views INT DEFAULT 0,
  shares INT DEFAULT 0,
  locale TEXT DEFAULT 'tr',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS feed_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES feed_posts(id) ON DELETE CASCADE,
  user_id UUID,
  author_name TEXT,
  body TEXT NOT NULL,
  status TEXT DEFAULT 'visible',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS chat_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_token TEXT NOT NULL,
  visitor_name TEXT,
  visitor_email TEXT,
  page TEXT,
  status TEXT DEFAULT 'open',
  admin_online BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES chat_conversations(id) ON DELETE CASCADE,
  sender TEXT NOT NULL,
  body TEXT,
  attachment_url TEXT,
  status TEXT DEFAULT 'sent',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS admin_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  body TEXT,
  href TEXT,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS content_revisions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  resource TEXT NOT NULL,
  resource_id TEXT NOT NULL,
  snapshot JSONB NOT NULL,
  actor_email TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS seo_metadata (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  path TEXT UNIQUE NOT NULL,
  title TEXT,
  description TEXT,
  canonical TEXT,
  og_title TEXT,
  og_description TEXT,
  og_image TEXT,
  robots TEXT DEFAULT 'index,follow',
  keywords TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS email_settings (
  id INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  provider TEXT DEFAULT 'smtp',
  from_name TEXT DEFAULT 'LitxTech',
  from_email TEXT,
  reply_to TEXT,
  configured BOOLEAN DEFAULT false,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO email_settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

CREATE TABLE IF NOT EXISTS email_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  subject TEXT NOT NULL,
  body TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO email_templates (key, subject, body) VALUES
  ('welcome', 'LitxTech hesabınız hazır', 'Merhaba {{name}}, hesabınız oluşturuldu.'),
  ('contact_received', 'Mesajınız alındı', 'Merhaba {{name}}, talebinizi aldık. Referans: {{reference}}.'),
  ('ticket_created', 'Destek talebi oluşturuldu', 'Talebiniz {{reference}} kayda alındı.'),
  ('ticket_reply', 'Destek talebinize yanıt', '{{reference}} numaralı talebe yanıt verildi.'),
  ('password_reset', 'Şifre sıfırlama', 'Şifre sıfırlama bağlantınız hazır.'),
  ('support_notification', 'Yeni destek bildirimi', 'Yeni bir destek kaydı var.')
ON CONFLICT (key) DO NOTHING;

CREATE TABLE IF NOT EXISTS system_errors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message TEXT NOT NULL,
  endpoint TEXT,
  user_email TEXT,
  severity TEXT DEFAULT 'error',
  reference_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS site_ctas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  label TEXT NOT NULL,
  href TEXT NOT NULL,
  active BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0
);

INSERT INTO site_ctas (key, label, href) VALUES
  ('start_project', 'Projenizi Anlatın', '/projemi-anlat'),
  ('request_demo', 'Demo talep et', '/contact'),
  ('talk_expert', 'Uzmanla konuş', '/contact'),
  ('get_support', 'Destek al', '/destek'),
  ('whatsapp', 'WhatsApp', 'whatsapp'),
  ('view_case', 'Projeleri incele', '/projeler')
ON CONFLICT (key) DO NOTHING;

CREATE TABLE IF NOT EXISTS support_presence (
  id INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  online BOOLEAN DEFAULT false,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO support_presence (id, online) VALUES (1, false) ON CONFLICT (id) DO NOTHING;

ALTER TABLE cms_media ADD COLUMN IF NOT EXISTS folder TEXT;
ALTER TABLE cms_media ADD COLUMN IF NOT EXISTS used_in JSONB DEFAULT '[]'::jsonb;

ALTER TABLE cms_projects ADD COLUMN IF NOT EXISTS problem TEXT;
ALTER TABLE cms_projects ADD COLUMN IF NOT EXISTS solution TEXT;
ALTER TABLE cms_projects ADD COLUMN IF NOT EXISTS features JSONB DEFAULT '[]'::jsonb;
ALTER TABLE cms_projects ADD COLUMN IF NOT EXISTS technologies JSONB DEFAULT '[]'::jsonb;
ALTER TABLE cms_projects ADD COLUMN IF NOT EXISTS result TEXT;
ALTER TABLE cms_projects ADD COLUMN IF NOT EXISTS demo_url TEXT;
ALTER TABLE cms_projects ADD COLUMN IF NOT EXISTS website_url TEXT;
ALTER TABLE cms_projects ADD COLUMN IF NOT EXISTS app_store_url TEXT;
ALTER TABLE cms_projects ADD COLUMN IF NOT EXISTS play_store_url TEXT;
ALTER TABLE cms_projects ADD COLUMN IF NOT EXISTS video_url TEXT;
ALTER TABLE cms_projects ADD COLUMN IF NOT EXISTS cover_image TEXT;
ALTER TABLE cms_projects ADD COLUMN IF NOT EXISTS desktop_image TEXT;
ALTER TABLE cms_projects ADD COLUMN IF NOT EXISTS mobile_image TEXT;
ALTER TABLE cms_projects ADD COLUMN IF NOT EXISTS dashboard_image TEXT;
ALTER TABLE cms_projects ADD COLUMN IF NOT EXISTS gallery JSONB DEFAULT '[]'::jsonb;
