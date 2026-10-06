-- Advisor: RLS was off while anon and authenticated had full table privileges.
-- Ticket APIs use the service role, which bypasses RLS.
-- No public policies: these rows include customer messages or Stripe price ids.
-- wrappers_fdw_stats is owned by supabase_admin; this role cannot enable RLS on it.

ALTER TABLE public.industry_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_messages ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON TABLE public.industry_packages FROM anon, authenticated;
REVOKE ALL ON TABLE public.support_tickets FROM anon, authenticated;
REVOKE ALL ON TABLE public.support_messages FROM anon, authenticated;
