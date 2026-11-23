-- Eski admin paneli tablolarını gerçek projede (cobzwohfekgzbvxbwrll) oluşturur.
--
-- Bu tablolar kodda kullanılıyor ama projede hiç yoktu, bu yüzden admin
-- ekranları 404 (relation does not exist) alıyordu.
--
-- Tamamen idempotent: var olan tabloya/veriye dokunmaz.

-- 1) site_settings
CREATE TABLE IF NOT EXISTS public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  description TEXT,
  updated_by UUID,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2) blog_posts
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL DEFAULT '',
  excerpt TEXT,
  featured_image_url TEXT,
  status TEXT NOT NULL DEFAULT 'draft',
  author_id UUID,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  meta_title TEXT,
  meta_description TEXT,
  tags TEXT[]
);

-- 3) package_management
CREATE TABLE IF NOT EXISTS public.package_management (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  package_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  price NUMERIC(10, 2) NOT NULL DEFAULT 0,
  description TEXT,
  features JSONB,
  stripe_price_id TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4) customer_orders
CREATE TABLE IF NOT EXISTS public.customer_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_session_id TEXT UNIQUE,
  package_id TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_name TEXT,
  amount NUMERIC(10, 2) NOT NULL DEFAULT 0,
  currency TEXT DEFAULT 'USD',
  status TEXT NOT NULL DEFAULT 'pending',
  stripe_payment_intent_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5) system_logs
CREATE TABLE IF NOT EXISTS public.system_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_user_id UUID,
  action TEXT NOT NULL,
  resource_type TEXT,
  resource_id TEXT,
  details JSONB,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6) Admin panel özet görünümü
CREATE OR REPLACE VIEW public.admin_dashboard_stats AS
SELECT
  (SELECT COUNT(*) FROM public.customer_orders WHERE status = 'completed') AS total_orders,
  (SELECT COUNT(*) FROM public.contact_messages WHERE status = 'new') AS new_messages,
  (SELECT COUNT(*) FROM public.blog_posts WHERE status = 'published') AS published_posts,
  (SELECT COALESCE(SUM(amount), 0) FROM public.customer_orders
    WHERE status = 'completed' AND created_at >= date_trunc('month', NOW())) AS monthly_revenue;

-- 7) İndeksler
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts (slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON public.blog_posts (status);
CREATE INDEX IF NOT EXISTS idx_customer_orders_session ON public.customer_orders (stripe_session_id);
CREATE INDEX IF NOT EXISTS idx_customer_orders_status ON public.customer_orders (status);
CREATE INDEX IF NOT EXISTS idx_system_logs_admin ON public.system_logs (admin_user_id);
CREATE INDEX IF NOT EXISTS idx_site_settings_key ON public.site_settings (key);

-- 8) İzinler
DO $$
DECLARE
  t text;
BEGIN
  FOREACH t IN ARRAY ARRAY['site_settings', 'blog_posts', 'package_management',
                           'customer_orders', 'system_logs'] LOOP
    BEGIN
      EXECUTE format('GRANT ALL ON public.%I TO service_role', t);
      EXECUTE format('GRANT SELECT ON public.%I TO anon, authenticated', t);
      EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', t);
      EXECUTE format('DROP POLICY IF EXISTS public_read_access ON public.%I', t);
      EXECUTE format(
        'CREATE POLICY public_read_access ON public.%I FOR SELECT TO anon, authenticated USING (true)', t
      );
    EXCEPTION WHEN insufficient_privilege THEN
      RAISE NOTICE 'izin atlandı: %', t;
    END;
  END LOOP;
  BEGIN
    EXECUTE 'GRANT SELECT ON public.admin_dashboard_stats TO service_role, authenticated';
  EXCEPTION WHEN insufficient_privilege THEN
    RAISE NOTICE 'view izni atlandı';
  END;
END $$;

-- 9) Doğrulama
SELECT to_regclass('public.site_settings') AS site_settings,
       to_regclass('public.blog_posts') AS blog_posts,
       to_regclass('public.package_management') AS package_management,
       to_regclass('public.customer_orders') AS customer_orders,
       to_regclass('public.system_logs') AS system_logs,
       to_regclass('public.admin_dashboard_stats') AS admin_dashboard_stats;
