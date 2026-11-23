-- =====================================================================
-- Admin panel repair (2026-11-23)
-- Fixes "Update failed" errors on /admin settings + homepage CMS.
-- Adds columns that the admin API writes but the live schema lacked.
-- Idempotent: safe to run multiple times.
-- =====================================================================

-- ---------------------------------------------------------------- company
ALTER TABLE IF EXISTS public.company_settings
  ADD COLUMN IF NOT EXISTS mobile TEXT,
  ADD COLUMN IF NOT EXISTS business_email TEXT,
  ADD COLUMN IF NOT EXISTS sales_email TEXT,
  ADD COLUMN IF NOT EXISTS favicon_url TEXT,
  ADD COLUMN IF NOT EXISTS business_hours JSONB DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS trust_stats JSONB DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS updated_by UUID;

-- ---------------------------------------------------------------- homepage
ALTER TABLE IF EXISTS public.cms_homepage
  ADD COLUMN IF NOT EXISTS updated_by UUID;

-- ---------------------------------------------------------------- cms pages
ALTER TABLE IF EXISTS public.cms_pages
  ADD COLUMN IF NOT EXISTS updated_by UUID;

-- ---------------------------------------------------------------- audit
-- Canonical admin audit sink used by the API (system_logs).
CREATE TABLE IF NOT EXISTS public.system_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_user_id UUID,
  action TEXT,
  resource_type TEXT,
  resource_id TEXT,
  details JSONB,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS system_logs_created_at_idx ON public.system_logs (created_at DESC);

-- ---------------------------------------------------------------- presence
-- Guard the dashboard "online users" metric.
ALTER TABLE IF EXISTS public.user_presence
  ADD COLUMN IF NOT EXISTS is_online BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS last_seen TIMESTAMPTZ DEFAULT NOW();

-- ---------------------------------------------------------------- live feed
-- Fast lookups for the realtime admin activity bubbles.
CREATE INDEX IF NOT EXISTS leads_created_at_idx ON public.leads (created_at DESC);
CREATE INDEX IF NOT EXISTS contact_messages_created_at_idx ON public.contact_messages (created_at DESC);
CREATE INDEX IF NOT EXISTS support_messages_created_at_idx ON public.support_messages (created_at DESC);
CREATE INDEX IF NOT EXISTS chat_messages_created_at_idx ON public.chat_messages (created_at DESC);
CREATE INDEX IF NOT EXISTS profiles_created_at_idx ON public.profiles (created_at DESC);
