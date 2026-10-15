-- Catálogo editorial gerenciado pelo painel MAXON PLAY.
CREATE TABLE IF NOT EXISTS catalog_contents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL CHECK (category IN ('ao_vivo','futebol','infantil','filmes','series','adulto')),
  content_url text NOT NULL,
  logo_url text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  enabled boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS catalog_contents_category_idx
  ON catalog_contents(category, sort_order, title);
