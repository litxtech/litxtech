-- Canlı şemaya (admin_sessions: admin_id / token / revoked / expires_at) uygun
-- validate_admin_session fonksiyonu. Yoksa oluşturur, varsa günceller.
--
-- requireAdmin() önce bu RPC'yi dener; yoksa her istekte hata alıp
-- yedek sorguya düşüyordu.

CREATE OR REPLACE FUNCTION public.validate_admin_session(p_token TEXT)
RETURNS TABLE(admin_id UUID, email TEXT, role TEXT) AS $$
BEGIN
  RETURN QUERY
  SELECT au.id, au.email, au.role
  FROM public.admin_sessions s
  JOIN public.admin_users au ON au.id = s.admin_id
  WHERE s.token = p_token
    AND COALESCE(s.revoked, false) = false
    AND s.expires_at > NOW()
    AND COALESCE(au.is_active, true) = true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DO $$
BEGIN
  EXECUTE 'REVOKE ALL ON FUNCTION public.validate_admin_session(TEXT) FROM PUBLIC';
  EXECUTE 'GRANT EXECUTE ON FUNCTION public.validate_admin_session(TEXT) TO anon, authenticated, service_role';
EXCEPTION WHEN insufficient_privilege THEN
  RAISE NOTICE 'validate_admin_session izni atlandı';
END $$;

SELECT p.proname AS fonksiyon, pg_get_function_identity_arguments(p.oid) AS argumanlar
FROM pg_proc p
JOIN pg_namespace n ON n.oid = p.pronamespace
WHERE n.nspname = 'public' AND p.proname = 'validate_admin_session';
