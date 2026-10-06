-- These extension tables are owned by supabase_admin, so RLS cannot be
-- enabled directly. Moving the extensions out of public removes them from
-- the Data API and clears the Advisor findings.

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM pg_extension e
    JOIN pg_namespace n ON n.oid = e.extnamespace
    WHERE e.extname = 'address_standardizer_data_us' AND n.nspname = 'public'
  ) THEN
    ALTER EXTENSION address_standardizer_data_us SET SCHEMA extensions;
  END IF;

  IF EXISTS (
    SELECT 1
    FROM pg_extension e
    JOIN pg_namespace n ON n.oid = e.extnamespace
    WHERE e.extname = 'wrappers' AND n.nspname = 'public'
  ) THEN
    ALTER EXTENSION wrappers SET SCHEMA extensions;
  END IF;
END $$;
