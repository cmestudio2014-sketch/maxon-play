CREATE TABLE IF NOT EXISTS source_catalog_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_id uuid NOT NULL REFERENCES sources(id) ON DELETE CASCADE,
  external_key text NOT NULL,
  kind text NOT NULL CHECK (kind IN ('live','movie','series')),
  name text NOT NULL,
  category text NOT NULL DEFAULT 'Sem categoria',
  imported_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(source_id, external_key)
);
CREATE INDEX IF NOT EXISTS source_catalog_source_idx ON source_catalog_items(source_id, kind, category);
CREATE TABLE IF NOT EXISTS playlist_item_rules (
  playlist_id uuid NOT NULL REFERENCES playlists(id) ON DELETE CASCADE,
  catalog_item_id uuid NOT NULL REFERENCES source_catalog_items(id) ON DELETE CASCADE,
  enabled boolean NOT NULL DEFAULT true,
  custom_name text,
  custom_category text,
  sort_order integer NOT NULL DEFAULT 100,
  PRIMARY KEY (playlist_id, catalog_item_id)
);
