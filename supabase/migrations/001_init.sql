-- ============================================================
-- THE ROYLANDZ UNIVERSE — Database Schema
-- Supabase project: jcdefelhenqtjiotqkes
-- ============================================================

-- Contact form submissions
CREATE TABLE IF NOT EXISTS contact_submissions (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL CHECK (char_length(name) BETWEEN 1 AND 100),
  email       TEXT NOT NULL CHECK (email ~* '^[^@]+@[^@]+\.[^@]+$'),
  purpose     TEXT NOT NULL CHECK (purpose IN ('collaboration','booking','press','partnership','other')),
  message     TEXT NOT NULL CHECK (char_length(message) BETWEEN 1 AND 2000),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Row Level Security: anonymous insert only
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anon_insert_contact" ON contact_submissions
  FOR INSERT TO anon WITH CHECK (true);

-- No SELECT/UPDATE/DELETE policy for anon role
-- Service role bypasses RLS automatically

-- Page analytics (privacy-first, no PII)
CREATE TABLE IF NOT EXISTS page_analytics (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page       TEXT NOT NULL,
  referrer   TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Row Level Security: anonymous insert only
ALTER TABLE page_analytics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anon_insert_analytics" ON page_analytics
  FOR INSERT TO anon WITH CHECK (true);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at 
  ON contact_submissions(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_page_analytics_page 
  ON page_analytics(page);

CREATE INDEX IF NOT EXISTS idx_page_analytics_created_at 
  ON page_analytics(created_at DESC);
