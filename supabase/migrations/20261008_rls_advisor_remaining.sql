-- Close the Advisor "RLS disabled in public" findings we can own.
-- The website API uses the service role, which bypasses RLS.
-- anon and authenticated get an explicit deny so the tables are not left policy-less.

DO $$
DECLARE
  t text;
  tables text[] := ARRAY[
    'admin_notifications',
    'admin_users',
    'ai_generations',
    'billing',
    'chat_conversations',
    'chat_messages',
    'cms_case_studies',
    'cms_media',
    'cms_navigation',
    'cms_pages',
    'cms_process_steps',
    'cms_services',
    'cms_technologies',
    'components',
    'content_moderation',
    'content_revisions',
    'conversation_participants',
    'conversations',
    'email_settings',
    'email_templates',
    'feed_comments',
    'feed_posts',
    'homepage_sections',
    'industry_packages',
    'lead_notes',
    'login_attempts',
    'message_reactions',
    'page_views',
    'post_embeddings',
    'seo_logs',
    'seo_metadata',
    'seo_redirects',
    'site_ctas',
    'support_messages',
    'support_presence',
    'support_tickets',
    'system_errors'
  ];
BEGIN
  FOREACH t IN ARRAY tables LOOP
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', t);
    EXECUTE format('REVOKE ALL ON TABLE public.%I FROM anon, authenticated', t);
    EXECUTE format('DROP POLICY IF EXISTS deny_public_api ON public.%I', t);
    EXECUTE format(
      'CREATE POLICY deny_public_api ON public.%I FOR ALL TO anon, authenticated USING (false) WITH CHECK (false)',
      t
    );
  END LOOP;
END $$;

ALTER VIEW public.v_discover SET (security_invoker = true);
