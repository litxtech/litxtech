-- litxtech gerçek projesi (cobzwohfekgzbvxbwrll) için eksik okuma izinleri.
--
-- Durum: aşağıdaki tablolarda anon SELECT yetkisi yok, bu yüzden site
-- "permission denied for table ..." alıp statik yedeğe düşüyor.
--
-- Supabase Dashboard → SQL Editor içine yapıştırıp çalıştırın.
-- Yalnızca izin ekler; hiçbir satır silmez, mevcut veriye dokunmaz.

-- 1) service_role tam yetkili olmalı (sunucu tarafı: formlar, admin paneli)
GRANT USAGE ON SCHEMA public TO service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO service_role;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO service_role;

-- 2) Herkese açık okunabilir içerik tabloları
DO $$
DECLARE
  t text;
  public_read text[] := ARRAY[
    'company_settings', 'cms_homepage', 'cms_faqs', 'cms_applications',
    'cms_projects', 'cms_pages', 'cms_services', 'cms_case_studies',
    'cms_navigation', 'cms_process_steps', 'cms_technologies',
    'homepage_sections', 'feed_posts', 'seo_metadata', 'seo_redirects',
    'site_ctas', 'support_presence', 'email_settings'
  ];
BEGIN
  FOREACH t IN ARRAY public_read LOOP
    IF EXISTS (
      SELECT 1 FROM information_schema.tables
      WHERE table_schema = 'public' AND table_name = t
    ) THEN
      EXECUTE format('GRANT SELECT ON public.%I TO anon, authenticated', t);
      EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', t);
      EXECUTE format('DROP POLICY IF EXISTS public_read_access ON public.%I', t);
      EXECUTE format(
        'CREATE POLICY public_read_access ON public.%I FOR SELECT TO anon, authenticated USING (true)', t
      );
    END IF;
  END LOOP;
END $$;

-- 3) Herkese açık form yazma (iletişim, lead, analitik)
DO $$
DECLARE
  t text;
  public_write text[] := ARRAY[
    'leads', 'lead_events', 'contact_messages', 'analytics_events', 'page_views', 'donations'
  ];
BEGIN
  FOREACH t IN ARRAY public_write LOOP
    IF EXISTS (
      SELECT 1 FROM information_schema.tables
      WHERE table_schema = 'public' AND table_name = t
    ) THEN
      EXECUTE format('GRANT INSERT ON public.%I TO anon, authenticated', t);
      EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', t);
      EXECUTE format('DROP POLICY IF EXISTS public_insert_access ON public.%I', t);
      EXECUTE format(
        'CREATE POLICY public_insert_access ON public.%I FOR INSERT TO anon, authenticated WITH CHECK (true)', t
      );
    END IF;
  END LOOP;
END $$;

-- 4) Doğrulama: her tabloda anon SELECT var mı?
SELECT c.relname AS tablo,
       has_table_privilege('anon', c.oid, 'SELECT') AS anon_select
FROM pg_class c
JOIN pg_namespace n ON n.oid = c.relnamespace
WHERE n.nspname = 'public' AND c.relkind = 'r'
ORDER BY 2, 1;
