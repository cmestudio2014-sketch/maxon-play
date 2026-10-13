CREATE TABLE IF NOT EXISTS provider_servers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  base_url text NOT NULL,
  priority integer NOT NULL DEFAULT 100,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX IF NOT EXISTS provider_servers_base_url_uq ON provider_servers (lower(base_url));
CREATE INDEX IF NOT EXISTS provider_servers_priority_idx ON provider_servers (active, priority, name);
