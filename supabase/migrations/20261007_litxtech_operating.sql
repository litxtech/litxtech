-- Additive operating-platform tables. Does not delete existing rows.

ALTER TABLE company_settings ADD COLUMN IF NOT EXISTS sales_email TEXT;
ALTER TABLE company_settings ADD COLUMN IF NOT EXISTS trust_stats JSONB DEFAULT '[]'::jsonb;

ALTER TABLE cms_applications ADD COLUMN IF NOT EXISTS tagline TEXT;
ALTER TABLE cms_applications ADD COLUMN IF NOT EXISTS lifecycle TEXT DEFAULT 'live';
ALTER TABLE cms_applications ADD COLUMN IF NOT EXISTS badges TEXT[] DEFAULT '{}';

ALTER TABLE feed_posts ADD COLUMN IF NOT EXISTS slug TEXT;
ALTER TABLE feed_posts ADD COLUMN IF NOT EXISTS excerpt TEXT;
ALTER TABLE feed_posts ADD COLUMN IF NOT EXISTS cover TEXT;
ALTER TABLE feed_posts ADD COLUMN IF NOT EXISTS author TEXT;
ALTER TABLE feed_posts ADD COLUMN IF NOT EXISTS seo JSONB DEFAULT '{}'::jsonb;
ALTER TABLE feed_posts ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ;

CREATE UNIQUE INDEX IF NOT EXISTS idx_feed_posts_slug ON feed_posts(slug) WHERE slug IS NOT NULL AND deleted_at IS NULL;

CREATE TABLE IF NOT EXISTS cms_case_studies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  product_slug TEXT,
  summary TEXT,
  challenge TEXT,
  approach TEXT,
  solution TEXT,
  implementation TEXT,
  result TEXT,
  technology JSONB DEFAULT '[]'::jsonb,
  screenshots JSONB DEFAULT '[]'::jsonb,
  gallery JSONB DEFAULT '[]'::jsonb,
  metrics JSONB DEFAULT '[]'::jsonb,
  cover TEXT,
  status TEXT NOT NULL DEFAULT 'draft',
  featured BOOLEAN DEFAULT false,
  sort_order INT DEFAULT 0,
  seo JSONB DEFAULT '{}'::jsonb,
  published_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS cms_process_steps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  step_number INT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  active BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS cms_technologies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  logo_url TEXT,
  active BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS homepage_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_key TEXT UNIQUE NOT NULL,
  active BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0,
  title TEXT,
  subtitle TEXT,
  description TEXT,
  media JSONB DEFAULT '{}'::jsonb,
  cta_label TEXT,
  cta_href TEXT,
  theme TEXT DEFAULT 'dark',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO cms_services (slug, title, short_description, detailed_description, status, sort_order, cta_label, cta_url)
SELECT v.slug, v.title, v.short_description, v.detailed_description, 'published', v.sort_order, 'Start a Project', '/contact'
FROM (
  VALUES
    ('web-applications', 'Web Applications', 'Browser-based products with accounts, dashboards, and integrations.', 'We design and ship web applications that teams actually operate: authenticated dashboards, customer portals, and internal tools connected to real data.', 1),
    ('mobile-applications', 'Mobile Applications', 'iOS and Android products with store-ready legal and support surfaces.', 'LitxTech ships mobile products — including Vora, Tamuso, Nocta, and MyTrabzon — with privacy, terms, support, and account-deletion pages required by the stores.', 2),
    ('saas-platforms', 'SaaS Platforms', 'Multi-tenant software with billing, roles, and an admin surface.', 'Subscription products, operator dashboards, and customer accounts. Billing integrations are scoped per product, including the Stripe flows already used on this site.', 3),
    ('custom-software', 'Custom Software', 'Systems built around a specific operation, not a generic template.', 'Hotel, restaurant, and company-specific software when an off-the-shelf tool does not match how the business runs.', 4),
    ('hotel-operations', 'Hotel Operations Software', 'Reservations, guest records, room status, and reporting in one panel.', 'Built for properties that still run occupancy and guest communication across spreadsheets and phone calls.', 5),
    ('restaurant-operations', 'Restaurant Operations Software', 'Orders, floor, payments, and daily reporting for food service.', 'A single operating panel for restaurants that need service, payments, and reporting to agree.', 6)
) AS v(slug, title, short_description, detailed_description, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM cms_services LIMIT 1);

INSERT INTO cms_process_steps (step_number, title, description, sort_order)
SELECT v.n, v.title, v.description, v.n
FROM (
  VALUES
    (1, 'Discover', 'We map the operation, the users, and the constraints before writing a scope.'),
    (2, 'Strategy', 'We decide what ships first, what waits, and how success will be measured.'),
    (3, 'Architecture', 'Data, auth, integrations, and deployment are chosen for the product that has to run.'),
    (4, 'UX/UI', 'Interfaces are designed around the actual workflow, then reviewed against real screens.'),
    (5, 'Development', 'We build in increments so a working slice exists before the full release.'),
    (6, 'Testing', 'We verify the paths users and operators actually take, including failure states.'),
    (7, 'Launch', 'Store listings, domains, support pages, and handover are part of the release.'),
    (8, 'Scale', 'After launch we watch usage, fix what breaks, and extend what is working.')
) AS v(n, title, description)
WHERE NOT EXISTS (SELECT 1 FROM cms_process_steps LIMIT 1);

INSERT INTO cms_technologies (name, slug, category, description, sort_order)
SELECT v.name, v.slug, v.category, v.description, v.sort_order
FROM (
  VALUES
    ('React', 'react', 'Frontend', 'Interface layer for the public site and admin.', 1),
    ('TypeScript', 'typescript', 'Frontend', 'Typed application code across the website.', 2),
    ('Vite', 'vite', 'Frontend', 'Build tool for the LitxTech web app.', 3),
    ('Tailwind CSS', 'tailwind', 'Frontend', 'Design system utilities for public and admin UI.', 4),
    ('Node.js', 'nodejs', 'Backend', 'Server handlers for API routes.', 5),
    ('Supabase', 'supabase', 'Database', 'Postgres, auth, and storage for this platform.', 6),
    ('Stripe', 'stripe', 'Backend', 'Payments used by donation and subscription flows.', 7),
    ('Vercel', 'vercel', 'Cloud', 'Hosting for the site and serverless API.', 8)
) AS v(name, slug, category, description, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM cms_technologies LIMIT 1);

INSERT INTO homepage_sections (section_key, active, sort_order, title, subtitle, description, cta_label, cta_href)
SELECT v.section_key, true, v.sort_order, v.title, v.subtitle, v.description, v.cta_label, v.cta_href
FROM (
  VALUES
    ('hero', 1, 'We build software that moves businesses forward.', 'Products, platforms, and operating systems — designed, shipped, and supported by LitxTech.', 'LitxTech is a software company. We ship mobile products such as Vora and Tamuso, and we build the business systems behind hotels, restaurants, and custom operations.', 'Start a Project', '/contact'),
    ('trust', 2, 'Built for real businesses. Built to scale.', 'Counts below come from published records in this system.', NULL, NULL, NULL),
    ('products', 3, 'Products', 'Software LitxTech has actually shipped.', NULL, 'Explore products', '/products'),
    ('services', 4, 'What we build', 'Capabilities we deliver, managed from the admin CMS.', NULL, 'View services', '/services'),
    ('technology', 5, 'Technology', 'The stack this company uses to ship.', NULL, 'See the stack', '/technology'),
    ('process', 6, 'How we work', 'Eight steps, editable in admin.', NULL, 'See the process', '/process'),
    ('feed', 7, 'Latest from LitxTech', 'Product updates, engineering notes, and company news.', NULL, 'Explore all insights', '/feed'),
    ('cta', 8, 'Start a project with LitxTech.', 'Tell us what you need to run. We will reply from the contact details configured in company settings.', NULL, 'Start a Project', '/contact')
) AS v(section_key, sort_order, title, subtitle, description, cta_label, cta_href)
WHERE NOT EXISTS (SELECT 1 FROM homepage_sections LIMIT 1);

INSERT INTO cms_case_studies (slug, title, product_slug, summary, challenge, approach, solution, result, technology, status, featured, sort_order, published_at)
SELECT v.slug, v.title, v.product_slug, v.summary, v.challenge, v.approach, v.solution, v.result, v.technology::jsonb, 'published', true, v.sort_order, NOW()
FROM (
  VALUES
    (
      'vora',
      'Vora',
      'vora',
      'A community product for Black Sea cities, built and published by LitxTech.',
      'People in a region needed a local channel for messages and community, not another generic global feed.',
      'Design the product around city channels, notifications, and moderation, then ship store-ready legal and support pages with it.',
      'Vora is a LitxTech mobile product with its own landing, privacy, terms, support, and account-deletion flows on this site.',
      'The product is live as a LitxTech release. Usage metrics are entered in admin only when they are measured.',
      '["React","Mobile","Supabase"]',
      1
    ),
    (
      'tamuso',
      'Tamuso',
      'tamuso',
      'Live audio rooms, built as a LitxTech social product.',
      'A voice product has to handle live rooms, speaker and listener roles, and store policies for safety.',
      'Ship the product together with privacy, terms, child-safety, and support pages so the release can stand on its own.',
      'Tamuso runs as a LitxTech product with a public landing and policy set on litxtech.com.',
      'Published product. No unverified audience numbers are shown.',
      '["Mobile","Realtime audio"]',
      2
    )
) AS v(slug, title, product_slug, summary, challenge, approach, solution, result, technology, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM cms_case_studies LIMIT 1);
