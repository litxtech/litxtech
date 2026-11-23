-- LitxTech — Cloudflare/Pages dönemi için tam Supabase şeması (idempotent)
-- Eski projeler (xcvcplwimicylaxghiak, cobzwohfekgzbvxbwrll) silindiği için
-- bu dosya sıfırdan kurulabilecek şekilde birleştirilmiştir.

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ---------------------------------------------------------------- admin
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_user_id UUID UNIQUE,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL DEFAULT 'supabase-auth-managed',
  role TEXT NOT NULL DEFAULT 'ADMIN',
  permissions JSONB DEFAULT '[]'::jsonb,
  full_name TEXT,
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE admin_users ADD COLUMN IF NOT EXISTS auth_user_id UUID;
ALTER TABLE admin_users ADD COLUMN IF NOT EXISTS permissions JSONB DEFAULT '[]'::jsonb;
ALTER TABLE admin_users DROP CONSTRAINT IF EXISTS admin_users_role_check;
ALTER TABLE admin_users
  ADD CONSTRAINT admin_users_role_check
  CHECK (role IN (
    'SUPER_ADMIN', 'ADMIN', 'EDITOR', 'CONTENT_MANAGER', 'SALES', 'SUPPORT',
    'ANALYTICS', 'READ_ONLY', 'admin', 'super_admin'
  ));

-- Hem yeni (admin_id/token) hem eski (admin_user_id/session_token) şema
CREATE TABLE IF NOT EXISTS admin_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID REFERENCES admin_users(id) ON DELETE CASCADE,
  admin_user_id UUID REFERENCES admin_users(id) ON DELETE CASCADE,
  username TEXT,
  token TEXT,
  session_token TEXT,
  revoked BOOLEAN DEFAULT false,
  expires_at TIMESTAMPTZ NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE admin_sessions ADD COLUMN IF NOT EXISTS admin_id UUID;
ALTER TABLE admin_sessions ADD COLUMN IF NOT EXISTS username TEXT;
ALTER TABLE admin_sessions ADD COLUMN IF NOT EXISTS token TEXT;
ALTER TABLE admin_sessions ADD COLUMN IF NOT EXISTS revoked BOOLEAN DEFAULT false;

CREATE UNIQUE INDEX IF NOT EXISTS idx_admin_sessions_token_uq ON admin_sessions(token) WHERE token IS NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS idx_admin_sessions_legacy_uq ON admin_sessions(session_token) WHERE session_token IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_admin_sessions_expires ON admin_sessions(expires_at);

CREATE OR REPLACE FUNCTION validate_admin_session(p_token TEXT)
RETURNS TABLE(admin_id UUID, email TEXT, role TEXT) AS $$
BEGIN
  RETURN QUERY
  SELECT au.id, au.email, au.role
  FROM admin_sessions s
  JOIN admin_users au ON au.id = COALESCE(s.admin_id, s.admin_user_id)
  WHERE (s.token = p_token OR s.session_token = p_token)
    AND COALESCE(s.revoked, false) = false
    AND s.expires_at > NOW()
    AND COALESCE(au.is_active, true) = true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

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

-- ------------------------------------------------------------ company
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
  sales_email TEXT,
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
  whatsapp_country_code TEXT DEFAULT '1',
  whatsapp_display TEXT,
  working_hours TEXT,
  default_seo JSONB DEFAULT '{}'::jsonb,
  analytics_ids JSONB DEFAULT '{}'::jsonb,
  cookie_text TEXT,
  trust_stats JSONB DEFAULT '[]'::jsonb,
  calendly_url TEXT DEFAULT 'https://calendly.com/litxtech/consultation',
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  updated_by UUID
);

ALTER TABLE company_settings ADD COLUMN IF NOT EXISTS sales_email TEXT;
ALTER TABLE company_settings ADD COLUMN IF NOT EXISTS trust_stats JSONB DEFAULT '[]'::jsonb;
ALTER TABLE company_settings ADD COLUMN IF NOT EXISTS whatsapp_country_code TEXT DEFAULT '1';
ALTER TABLE company_settings ADD COLUMN IF NOT EXISTS whatsapp_display TEXT;
ALTER TABLE company_settings ADD COLUMN IF NOT EXISTS working_hours TEXT;
ALTER TABLE company_settings ADD COLUMN IF NOT EXISTS default_seo JSONB DEFAULT '{}'::jsonb;
ALTER TABLE company_settings ADD COLUMN IF NOT EXISTS analytics_ids JSONB DEFAULT '{}'::jsonb;
ALTER TABLE company_settings ADD COLUMN IF NOT EXISTS cookie_text TEXT;
ALTER TABLE company_settings ADD COLUMN IF NOT EXISTS business_email TEXT;
ALTER TABLE company_settings ADD COLUMN IF NOT EXISTS mobile TEXT;

INSERT INTO company_settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

-- ---------------------------------------------------------------- cms
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
  tagline TEXT,
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
  lifecycle TEXT DEFAULT 'live',
  badges TEXT[] DEFAULT '{}',
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

ALTER TABLE cms_applications ADD COLUMN IF NOT EXISTS tagline TEXT;
ALTER TABLE cms_applications ADD COLUMN IF NOT EXISTS lifecycle TEXT DEFAULT 'live';
ALTER TABLE cms_applications ADD COLUMN IF NOT EXISTS badges TEXT[] DEFAULT '{}';

CREATE TABLE IF NOT EXISTS cms_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT,
  summary TEXT,
  description TEXT,
  problem TEXT,
  solution TEXT,
  result TEXT,
  features JSONB DEFAULT '[]'::jsonb,
  technology TEXT[] DEFAULT '{}',
  technologies JSONB DEFAULT '[]'::jsonb,
  screenshots JSONB DEFAULT '[]'::jsonb,
  gallery JSONB DEFAULT '[]'::jsonb,
  internal_path TEXT,
  external_url TEXT,
  demo_url TEXT,
  website_url TEXT,
  app_store_url TEXT,
  play_store_url TEXT,
  video_url TEXT,
  image_url TEXT,
  cover_image TEXT,
  desktop_image TEXT,
  mobile_image TEXT,
  dashboard_image TEXT,
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
  used_in JSONB DEFAULT '[]'::jsonb,
  uploaded_by UUID,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

ALTER TABLE cms_media ADD COLUMN IF NOT EXISTS folder TEXT;
ALTER TABLE cms_media ADD COLUMN IF NOT EXISTS used_in JSONB DEFAULT '[]'::jsonb;

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

CREATE TABLE IF NOT EXISTS cms_case_studies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  product_slug TEXT,
  summary TEXT,
  challenge TEXT,
  approach TEXT,
  solution TEXT,
  implementation TEXT,
  result TEXT,
  technology JSONB DEFAULT '[]'::jsonb,
  screenshots JSONB DEFAULT '[]'::jsonb,
  gallery JSONB DEFAULT '[]'::jsonb,
  metrics JSONB DEFAULT '[]'::jsonb,
  cover TEXT,
  status TEXT NOT NULL DEFAULT 'draft',
  featured BOOLEAN DEFAULT false,
  sort_order INT DEFAULT 0,
  seo JSONB DEFAULT '{}'::jsonb,
  published_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS cms_process_steps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  step_number INT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  active BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS cms_technologies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  logo_url TEXT,
  active BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS homepage_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_key TEXT UNIQUE NOT NULL,
  active BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0,
  title TEXT,
  subtitle TEXT,
  description TEXT,
  media JSONB DEFAULT '{}'::jsonb,
  cta_label TEXT,
  cta_href TEXT,
  theme TEXT DEFAULT 'dark',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- --------------------------------------------------------------- feed
CREATE TABLE IF NOT EXISTS feed_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL DEFAULT 'update',
  category TEXT DEFAULT 'Company Update',
  title TEXT,
  slug TEXT,
  excerpt TEXT,
  body TEXT,
  cover TEXT,
  author TEXT,
  media JSONB DEFAULT '[]'::jsonb,
  link_url TEXT,
  project_slug TEXT,
  tags JSONB DEFAULT '[]'::jsonb,
  seo JSONB DEFAULT '{}'::jsonb,
  status TEXT NOT NULL DEFAULT 'draft',
  featured BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  scheduled_at TIMESTAMPTZ,
  likes INT DEFAULT 0,
  views INT DEFAULT 0,
  shares INT DEFAULT 0,
  locale TEXT DEFAULT 'tr',
  deleted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE feed_posts ADD COLUMN IF NOT EXISTS slug TEXT;
ALTER TABLE feed_posts ADD COLUMN IF NOT EXISTS excerpt TEXT;
ALTER TABLE feed_posts ADD COLUMN IF NOT EXISTS cover TEXT;
ALTER TABLE feed_posts ADD COLUMN IF NOT EXISTS author TEXT;
ALTER TABLE feed_posts ADD COLUMN IF NOT EXISTS seo JSONB DEFAULT '{}'::jsonb;
ALTER TABLE feed_posts ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ;

CREATE UNIQUE INDEX IF NOT EXISTS idx_feed_posts_slug
  ON feed_posts(slug) WHERE slug IS NOT NULL AND deleted_at IS NULL;

CREATE TABLE IF NOT EXISTS feed_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES feed_posts(id) ON DELETE CASCADE,
  user_id UUID,
  author_name TEXT,
  body TEXT NOT NULL,
  status TEXT DEFAULT 'visible',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- --------------------------------------------------------------- chat
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

-- ---------------------------------------------------------------- seo
CREATE TABLE IF NOT EXISTS seo_metadata (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  path TEXT UNIQUE NOT NULL,
  title TEXT,
  description TEXT,
  h1 TEXT,
  canonical TEXT,
  og_title TEXT,
  og_description TEXT,
  og_image TEXT,
  robots TEXT DEFAULT 'index,follow',
  keywords TEXT,
  focus_topic TEXT,
  schema_type TEXT,
  status TEXT DEFAULT 'published',
  include_in_sitemap BOOLEAN DEFAULT true,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE seo_metadata ADD COLUMN IF NOT EXISTS h1 TEXT;
ALTER TABLE seo_metadata ADD COLUMN IF NOT EXISTS focus_topic TEXT;
ALTER TABLE seo_metadata ADD COLUMN IF NOT EXISTS schema_type TEXT;
ALTER TABLE seo_metadata ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'published';
ALTER TABLE seo_metadata ADD COLUMN IF NOT EXISTS include_in_sitemap BOOLEAN DEFAULT true;

CREATE TABLE IF NOT EXISTS seo_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL,
  path TEXT,
  detail JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS seo_redirects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source TEXT UNIQUE NOT NULL,
  destination TEXT NOT NULL,
  status_code INT DEFAULT 301,
  enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------- crm
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

CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'closed')),
  admin_notes TEXT,
  replied_by UUID,
  replied_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- -------------------------------------------------------- analytics
CREATE TABLE IF NOT EXISTS analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_name TEXT NOT NULL,
  path TEXT,
  meta JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

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

-- ------------------------------------------------------- settings/ops
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

CREATE TABLE IF NOT EXISTS support_presence (
  id INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  online BOOLEAN DEFAULT false,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO support_presence (id, online) VALUES (1, false) ON CONFLICT (id) DO NOTHING;

-- ------------------------------------------- legacy client-side tables
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  description TEXT,
  updated_by UUID,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  featured_image_url TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  author_id UUID,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  meta_title TEXT,
  meta_description TEXT,
  tags TEXT[]
);

CREATE TABLE IF NOT EXISTS package_management (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  package_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  description TEXT,
  features JSONB,
  stripe_price_id TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS customer_orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  stripe_session_id TEXT UNIQUE,
  package_id TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_name TEXT,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  stripe_payment_intent_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS system_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_user_id UUID,
  action TEXT NOT NULL,
  resource_type TEXT,
  resource_id TEXT,
  details JSONB,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------- donations
CREATE TABLE IF NOT EXISTS donations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  amount DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(10) DEFAULT 'TRY',
  stripe_session_id VARCHAR(255),
  stripe_payment_intent_id VARCHAR(255),
  donor_name VARCHAR(255),
  donation_type VARCHAR(50) DEFAULT 'mytrabzon-support',
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  metadata JSONB
);

CREATE TABLE IF NOT EXISTS user_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  badge_type VARCHAR(50) NOT NULL,
  badge_name VARCHAR(100) NOT NULL,
  badge_icon VARCHAR(50),
  badge_color VARCHAR(20),
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, badge_type)
);

CREATE OR REPLACE FUNCTION add_supporter_badge(p_user_id UUID, p_amount DECIMAL)
RETURNS void AS $$
BEGIN
  INSERT INTO user_badges (user_id, badge_type, badge_name, badge_icon, badge_color, is_visible)
  VALUES (p_user_id, 'supporter', 'Destekçi', 'heart', 'pink', true)
  ON CONFLICT (user_id, badge_type)
  DO UPDATE SET updated_at = NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- --------------------------------------------------------- indexes
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_cms_applications_slug ON cms_applications(slug);
CREATE INDEX IF NOT EXISTS idx_cms_projects_slug ON cms_projects(slug);
CREATE INDEX IF NOT EXISTS idx_cms_services_slug ON cms_services(slug);
CREATE INDEX IF NOT EXISTS idx_analytics_events_created ON analytics_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_events_name ON analytics_events(event_name);
CREATE INDEX IF NOT EXISTS idx_page_views_created ON page_views(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_page_views_path ON page_views(path);
CREATE INDEX IF NOT EXISTS idx_donations_status ON donations(status);
CREATE INDEX IF NOT EXISTS idx_user_badges_user ON user_badges(user_id);

-- ----------------------------------------------------------- grants
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO service_role;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO service_role;

-- -------------------------------------------------------------- RLS
-- Servis rolü RLS'i atlar; anon yalnızca herkese açık içeriği okur ve form yazar.
DO $$
DECLARE
  t text;
  public_read text[] := ARRAY[
    'company_settings', 'cms_homepage', 'cms_faqs', 'cms_applications',
    'cms_projects', 'cms_pages', 'cms_services', 'cms_case_studies',
    'cms_navigation', 'cms_process_steps', 'cms_technologies',
    'homepage_sections', 'feed_posts', 'seo_metadata', 'seo_redirects',
    'site_ctas', 'support_presence', 'email_settings', 'site_settings', 'blog_posts'
  ];
  public_write text[] := ARRAY['leads', 'lead_events', 'contact_messages', 'analytics_events', 'page_views', 'donations'];
  private_tables text[] := ARRAY[
    'admin_users', 'admin_sessions', 'audit_logs', 'login_attempts',
    'cms_media', 'chat_conversations', 'chat_messages', 'admin_notifications',
    'content_revisions', 'feed_comments', 'lead_notes', 'support_tickets',
    'support_messages', 'user_presence', 'email_templates', 'system_errors',
    'system_logs', 'package_management', 'customer_orders', 'user_badges', 'seo_logs'
  ];
BEGIN
  FOREACH t IN ARRAY public_read LOOP
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', t);
    EXECUTE format('DROP POLICY IF EXISTS deny_public_api ON public.%I', t);
    EXECUTE format('DROP POLICY IF EXISTS public_read_access ON public.%I', t);
    EXECUTE format(
      'CREATE POLICY public_read_access ON public.%I FOR SELECT TO anon, authenticated USING (true)', t
    );
    EXECUTE format('GRANT SELECT ON public.%I TO anon, authenticated', t);
  END LOOP;

  FOREACH t IN ARRAY public_write LOOP
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', t);
    EXECUTE format('DROP POLICY IF EXISTS public_insert_access ON public.%I', t);
    EXECUTE format(
      'CREATE POLICY public_insert_access ON public.%I FOR INSERT TO anon, authenticated WITH CHECK (true)', t
    );
    EXECUTE format('GRANT INSERT ON public.%I TO anon, authenticated', t);
  END LOOP;

  FOREACH t IN ARRAY private_tables LOOP
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', t);
    EXECUTE format('DROP POLICY IF EXISTS deny_public_api ON public.%I', t);
    EXECUTE format(
      'CREATE POLICY deny_public_api ON public.%I FOR ALL TO anon, authenticated USING (false) WITH CHECK (false)', t
    );
    EXECUTE format('REVOKE ALL ON TABLE public.%I FROM anon, authenticated', t);
  END LOOP;
END $$;

-- ---------------------------------------------------------- updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

DO $$
DECLARE
  t text;
  tables text[] := ARRAY[
    'admin_users', 'blog_posts', 'package_management', 'customer_orders',
    'cms_applications', 'cms_projects', 'cms_pages', 'cms_faqs', 'cms_services',
    'cms_case_studies', 'feed_posts', 'chat_conversations', 'seo_metadata',
    'leads', 'support_tickets'
  ];
BEGIN
  FOREACH t IN ARRAY tables LOOP
    EXECUTE format('DROP TRIGGER IF EXISTS set_updated_at ON public.%I', t);
    EXECUTE format(
      'CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.%I FOR EACH ROW EXECUTE FUNCTION update_updated_at_column()', t
    );
  END LOOP;
END $$;

-- ------------------------------------------------------- admin view
CREATE OR REPLACE VIEW admin_dashboard_stats AS
SELECT
  (SELECT COUNT(*) FROM customer_orders WHERE status = 'completed') AS total_orders,
  (SELECT COUNT(*) FROM contact_messages WHERE status = 'new') AS new_messages,
  (SELECT COUNT(*) FROM blog_posts WHERE status = 'published') AS published_posts,
  (SELECT COALESCE(SUM(amount), 0) FROM customer_orders
     WHERE status = 'completed' AND created_at >= date_trunc('month', NOW())) AS monthly_revenue;

GRANT SELECT ON admin_dashboard_stats TO service_role;
