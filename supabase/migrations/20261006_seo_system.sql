-- SEO metadata fields, logs, and default settings container.
-- Does not delete existing rows.

ALTER TABLE seo_metadata ADD COLUMN IF NOT EXISTS h1 TEXT;
ALTER TABLE seo_metadata ADD COLUMN IF NOT EXISTS focus_topic TEXT;
ALTER TABLE seo_metadata ADD COLUMN IF NOT EXISTS schema_type TEXT;
ALTER TABLE seo_metadata ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'published';
ALTER TABLE seo_metadata ADD COLUMN IF NOT EXISTS include_in_sitemap BOOLEAN DEFAULT true;

ALTER TABLE company_settings ADD COLUMN IF NOT EXISTS default_seo JSONB DEFAULT '{}'::jsonb;

CREATE TABLE IF NOT EXISTS seo_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL,
  path TEXT,
  detail JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE seo_logs ENABLE ROW LEVEL SECURITY;
