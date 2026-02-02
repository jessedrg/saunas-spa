-- Translations cache table for on-demand AI translations
CREATE TABLE IF NOT EXISTS public.translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_text TEXT NOT NULL,
  source_locale VARCHAR(10) NOT NULL DEFAULT 'en',
  target_locale VARCHAR(10) NOT NULL,
  translated_text TEXT NOT NULL,
  content_type VARCHAR(50) DEFAULT 'general',
  source_id VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT unique_translation UNIQUE (source_text, source_locale, target_locale, content_type)
);

-- Index for fast lookups
CREATE INDEX IF NOT EXISTS idx_translations_lookup 
  ON public.translations (source_text, source_locale, target_locale, content_type);

-- Enable RLS with public access
ALTER TABLE public.translations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "translations_public_read" ON public.translations FOR SELECT USING (true);
CREATE POLICY "translations_public_insert" ON public.translations FOR INSERT WITH CHECK (true);
CREATE POLICY "translations_public_update" ON public.translations FOR UPDATE USING (true);
