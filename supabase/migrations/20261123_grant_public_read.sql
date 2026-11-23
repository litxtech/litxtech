-- litxtech gerçek projesi (cobzwohfekgzbvxbwrll) için eksik okuma/yazma izinleri.
--
-- Durum: cms_services, cms_pages, feed_posts, seo_metadata gibi tablolarda
-- anon SELECT yetkisi yok; site bu yüzden "permission denied for table ..."
-- alıp statik yedeğe düşüyordu.
--
-- Yalnızca izin ekler; hiçbir satır silmez, mevcut veriye dokunmaz.
-- Her adım hata toleranslı (EXCEPTION) yazıldı, eksik nesne olsa da devam eder.

-- 0) Şema kullanımı
DO $$
BEGIN
  EXECUTE 'GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role';
EXCEPTION WHEN insufficient_privilege THEN
  RAISE NOTICE 'şema grant atlandı';
END $$;

-- 1) service_role tam yetkili olmalı (sunucu tarafı: formlar, admin paneli)
DO $$
DECLARE
  r record;
BEGIN
  FOR r IN
    SELECT c.relname
    FROM pg_class c
    JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE n.nspname = 'public' AND c.relkind IN ('r', 'p', 'v', 'm')
  LOOP
    BEGIN
      EXECUTE format('GRANT ALL ON public.%I TO service_role', r.relname);
    EXCEPTION WHEN insufficient_privilege THEN
      RAISE NOTICE 'service_role grant atlandı: %', r.relname;
    END;
  END LOOP;

  FOR r IN
    SELECT c.relname
    FROM pg_class c
    JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE n.nspname = 'public' AND c.relkind = 'S'
  LOOP
    BEGIN
      EXECUTE format('GRANT ALL ON public.%I TO service_role', r.relname);
    EXCEPTION WHEN insufficient_privilege THEN
      RAISE NOTICE 'sequence grant atlandı: %', r.relname;
    END;
  END LOOP;

  FOR r IN
    SELECT p.proname, pg_get_function_identity_arguments(p.oid) AS args
    FROM pg_proc p
    JOIN pg_namespace n ON n.oid = p.pronamespace
    WHERE n.nspname = 'public'
  LOOP
    BEGIN
      EXECUTE format('GRANT EXECUTE ON FUNCTION public.%I(%s) TO service_role', r.proname, r.args);
    EXCEPTION WHEN insufficient_privilege OR undefined_object THEN
      RAISE NOTICE 'function grant atlandı: %', r.proname;
    END;
  END LOOP;
END $$;

-- 2) Herkese açık okunabilir içerik tabloları
DO $$
DECLARE
  t text;
  public_read text[] := ARRAY[
    'company_settings', 'cms_homepage', 'cms_faqs', 'cms_applications',
    'cms_projects', 'cms_pages', 'cms_services', 'cms_case_studies',
    'cms_navigation', 'cms_process_steps', 'cms_technologies',
    'cms_media', 'homepage_sections', 'feed_posts', 'feed_comments',
    'seo_metadata', 'seo_redirects', 'site_ctas', 'email_settings',
    'site_settings', 'blog_posts'
  ];
BEGIN
  FOREACH t IN ARRAY public_read LOOP
    IF EXISTS (
      SELECT 1 FROM information_schema.tables
      WHERE table_schema = 'public' AND table_name = t
    ) THEN
      BEGIN
        EXECUTE format('GRANT SELECT ON public.%I TO anon, authenticated', t);
        EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', t);
        EXECUTE format('DROP POLICY IF EXISTS public_read_access ON public.%I', t);
        EXECUTE format(
          'CREATE POLICY public_read_access ON public.%I FOR SELECT TO anon, authenticated USING (true)', t
        );
      EXCEPTION WHEN insufficient_privilege THEN
        RAISE NOTICE 'okuma izni atlandı: %', t;
      END;
    END IF;
  END LOOP;
END $$;

-- 3) Herkese açık form yazma (iletişim, lead, analitik, bağış)
DO $$
DECLARE
  t text;
  public_write text[] := ARRAY[
    'leads', 'lead_events', 'contact_messages', 'analytics_events',
    'page_views', 'donations', 'user_presence', 'support_presence',
    'system_errors'
  ];
BEGIN
  FOREACH t IN ARRAY public_write LOOP
    IF EXISTS (
      SELECT 1 FROM information_schema.tables
      WHERE table_schema = 'public' AND table_name = t
    ) THEN
      BEGIN
        EXECUTE format('GRANT INSERT ON public.%I TO anon, authenticated', t);
        EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', t);
        EXECUTE format('DROP POLICY IF EXISTS public_insert_access ON public.%I', t);
        EXECUTE format(
          'CREATE POLICY public_insert_access ON public.%I FOR INSERT TO anon, authenticated WITH CHECK (true)', t
        );
      EXCEPTION WHEN insufficient_privilege THEN
        RAISE NOTICE 'yazma izni atlandı: %', t;
      END;
    END IF;
  END LOOP;
END $$;

-- 4) Doğrulama: kritik tablolarda anon SELECT var mı?
SELECT c.relname AS tablo,
       has_table_privilege('anon', c.oid, 'SELECT') AS anon_select
FROM pg_class c
JOIN pg_namespace n ON n.oid = c.relnamespace
WHERE n.nspname = 'public' AND c.relkind = 'r'
  AND c.relname IN (
    'cms_services', 'cms_pages', 'cms_case_studies', 'cms_projects',
    'cms_navigation', 'cms_process_steps', 'cms_technologies', 'cms_media',
    'homepage_sections', 'feed_posts', 'seo_metadata', 'site_ctas'
  )
ORDER BY 2, 1;
