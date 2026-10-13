CREATE TABLE IF NOT EXISTS playlist_category_rules (
  playlist_id uuid NOT NULL REFERENCES playlists(id) ON DELETE CASCADE,
  source_id uuid NOT NULL REFERENCES sources(id) ON DELETE CASCADE,
  source_category text NOT NULL,
  kind text NOT NULL CHECK (kind IN ('live','movie','series')),
  custom_category text,
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (playlist_id, source_id, source_category)
);
CREATE INDEX IF NOT EXISTS playlist_category_rules_playlist_idx ON playlist_category_rules(playlist_id, kind);
