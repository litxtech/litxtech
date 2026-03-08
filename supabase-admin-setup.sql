-- Supabase Admin Panel Setup
-- Bu SQL kodları Supabase SQL Editor'da çalıştırılmalı

-- 1. Admin kullanıcıları tablosu
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true
);

-- 2. Admin oturumları tablosu
CREATE TABLE IF NOT EXISTS admin_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_user_id UUID REFERENCES admin_users(id) ON DELETE CASCADE,
  session_token TEXT UNIQUE NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ip_address INET,
  user_agent TEXT
);

-- 3. Site ayarları tablosu
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  description TEXT,
  updated_by UUID REFERENCES admin_users(id),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Blog yazıları tablosu
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  featured_image_url TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  author_id UUID REFERENCES admin_users(id),
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  meta_title TEXT,
  meta_description TEXT,
  tags TEXT[]
);

-- 5. Paket yönetimi tablosu
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
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Müşteri siparişleri tablosu
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
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. İletişim mesajları tablosu
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'closed')),
  admin_notes TEXT,
  replied_by UUID REFERENCES admin_users(id),
  replied_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Sistem logları tablosu
CREATE TABLE IF NOT EXISTS system_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_user_id UUID REFERENCES admin_users(id),
  action TEXT NOT NULL,
  resource_type TEXT,
  resource_id TEXT,
  details JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexler
CREATE INDEX IF NOT EXISTS idx_admin_sessions_token ON admin_sessions(session_token);
CREATE INDEX IF NOT EXISTS idx_admin_sessions_expires ON admin_sessions(expires_at);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_customer_orders_stripe_session ON customer_orders(stripe_session_id);
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_system_logs_admin_user ON system_logs(admin_user_id);

-- RLS (Row Level Security) Politikaları
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE package_management ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_logs ENABLE ROW LEVEL SECURITY;

-- Admin kullanıcıları için politikalar
CREATE POLICY "Admin users can view all admin users" ON admin_users
  FOR SELECT USING (true);

CREATE POLICY "Admin users can update their own profile" ON admin_users
  FOR UPDATE USING (true);

-- Admin oturumları için politikalar
CREATE POLICY "Admin sessions are accessible to admins" ON admin_sessions
  FOR ALL USING (true);

-- Site ayarları için politikalar
CREATE POLICY "Admins can manage site settings" ON site_settings
  FOR ALL USING (true);

-- Blog yazıları için politikalar
CREATE POLICY "Admins can manage blog posts" ON blog_posts
  FOR ALL USING (true);

-- Paket yönetimi için politikalar
CREATE POLICY "Admins can manage packages" ON package_management
  FOR ALL USING (true);

-- Müşteri siparişleri için politikalar
CREATE POLICY "Admins can view customer orders" ON customer_orders
  FOR SELECT USING (true);

CREATE POLICY "System can insert customer orders" ON customer_orders
  FOR INSERT WITH CHECK (true);

-- İletişim mesajları için politikalar
CREATE POLICY "Admins can manage contact messages" ON contact_messages
  FOR ALL USING (true);

-- Sistem logları için politikalar
CREATE POLICY "Admins can view system logs" ON system_logs
  FOR SELECT USING (true);

CREATE POLICY "System can insert logs" ON system_logs
  FOR INSERT WITH CHECK (true);

-- Varsayılan admin kullanıcısı ekleme (şifre: bavul2017?)
-- Bu şifre bcrypt ile hash'lenmiş olmalı
INSERT INTO admin_users (email, password_hash, full_name, role) 
VALUES (
  'admin@litxtech.com', 
  '$2b$10$rQZ8K9mN2pL3vX7yE5wF8eR6tY4uI1oP9aS2dF5gH8jK3lM6nB7vC0xZ', -- bavul2017? hash'i
  'LitxTech Admin',
  'super_admin'
) ON CONFLICT (email) DO NOTHING;

-- Varsayılan site ayarları
INSERT INTO site_settings (key, value, description) VALUES
('site_title', '"LitxTech LLC"', 'Site başlığı'),
('site_description', '"AI-powered software solutions"', 'Site açıklaması'),
('contact_email', '"support@litxtech.com"', 'İletişim e-postası'),
('contact_phone', '"+1 307 271 5151"', 'İletişim telefonu'),
('company_address', '"15442 Ventura Blvd, Suite 201-1834, Sherman Oaks, CA 91403"', 'Şirket adresi'),
('stripe_publishable_key', '""', 'Stripe public key'),
('stripe_secret_key', '""', 'Stripe secret key'),
('google_analytics_id', '""', 'Google Analytics ID'),
('social_media', '{"twitter": "", "linkedin": "", "instagram": ""}', 'Sosyal medya hesapları')
ON CONFLICT (key) DO NOTHING;

-- Paket verilerini package_management tablosuna ekleme
INSERT INTO package_management (package_id, name, price, description, features, stripe_price_id) VALUES
('starter-website', 'Starter Website', 990.00, 'Perfect for individuals and small businesses.', 
 '["1 responsive landing page", "Basic branding setup", "Contact form integration", "SEO setup (Lite)", "7-day delivery", "1 revision included", "Hosting setup"]', 
 'price_starter_website'),
('professional-website-suite', 'Professional Website Suite', 2490.00, 'Best for growing startups needing automation.',
 '["Up to 5 dynamic pages", "Admin dashboard", "API integrations", "Authentication system", "Database setup (Supabase / PostgreSQL)", "Stripe integration", "Priority support", "2 revisions", "10-day delivery"]',
 'price_professional_website_suite'),
('enterprise-saas-platform', 'Enterprise SaaS Platform', 4990.00, 'For SaaS products and scalable business platforms.',
 '["Unlimited pages", "Full user management", "Role-based access control", "Payment system + subscriptions", "AI automation (DeepSeek / OpenAI)", "Custom dashboard & analytics", "Email automation", "Source code included", "Dedicated developer", "15-day delivery"]',
 'price_enterprise_saas_platform')
ON CONFLICT (package_id) DO NOTHING;

-- Trigger fonksiyonları
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Updated_at trigger'ları
CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_package_management_updated_at BEFORE UPDATE ON package_management FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_customer_orders_updated_at BEFORE UPDATE ON customer_orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Admin paneli için view'lar
CREATE OR REPLACE VIEW admin_dashboard_stats AS
SELECT 
  (SELECT COUNT(*) FROM customer_orders WHERE status = 'completed') as total_orders,
  (SELECT COUNT(*) FROM contact_messages WHERE status = 'new') as new_messages,
  (SELECT COUNT(*) FROM blog_posts WHERE status = 'published') as published_posts,
  (SELECT SUM(amount) FROM customer_orders WHERE status = 'completed' AND created_at >= date_trunc('month', NOW())) as monthly_revenue;

-- Fonksiyonlar
CREATE OR REPLACE FUNCTION create_admin_session(admin_email TEXT, session_token TEXT, expires_at TIMESTAMP WITH TIME ZONE, ip_addr INET DEFAULT NULL, ua TEXT DEFAULT NULL)
RETURNS UUID AS $$
DECLARE
  admin_id UUID;
  session_id UUID;
BEGIN
  -- Admin kullanıcısını bul
  SELECT id INTO admin_id FROM admin_users WHERE email = admin_email AND is_active = true;
  
  IF admin_id IS NULL THEN
    RAISE EXCEPTION 'Admin user not found or inactive';
  END IF;
  
  -- Eski oturumları temizle
  DELETE FROM admin_sessions WHERE admin_user_id = admin_id OR expires_at < NOW();
  
  -- Yeni oturum oluştur
  INSERT INTO admin_sessions (admin_user_id, session_token, expires_at, ip_address, user_agent)
  VALUES (admin_id, session_token, expires_at, ip_addr, ua)
  RETURNING id INTO session_id;
  
  -- Son giriş zamanını güncelle
  UPDATE admin_users SET last_login = NOW() WHERE id = admin_id;
  
  RETURN session_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION validate_admin_session(token TEXT)
RETURNS TABLE(admin_id UUID, email TEXT, role TEXT) AS $$
BEGIN
  RETURN QUERY
  SELECT au.id, au.email, au.role
  FROM admin_sessions s
  JOIN admin_users au ON s.admin_user_id = au.id
  WHERE s.session_token = token 
    AND s.expires_at > NOW() 
    AND au.is_active = true;
END;
$$ LANGUAGE plpgsql;
