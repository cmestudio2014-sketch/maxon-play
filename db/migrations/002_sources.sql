-- Fontes / Listas autorizadas (M3U ou Xtream) fornecidas pelo operador/cliente.
-- Credenciais ficam criptografadas (AES-256-GCM) em payload_enc com CONFIG_ENCRYPTION_KEY.
CREATE TABLE IF NOT EXISTS sources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL CHECK (type IN ('m3u','xtream')),
  customer_id uuid REFERENCES customers(id) ON DELETE SET NULL,
  payload_enc text NOT NULL,
  display_hint text NOT NULL DEFAULT '',
  version integer NOT NULL DEFAULT 1,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE activations ADD COLUMN IF NOT EXISTS source_id uuid REFERENCES sources(id) ON DELETE SET NULL;
ALTER TABLE activations ADD COLUMN IF NOT EXISTS config_rev integer NOT NULL DEFAULT 1;
ALTER TABLE devices ADD COLUMN IF NOT EXISTS source_id uuid REFERENCES sources(id) ON DELETE SET NULL;
ALTER TABLE devices ADD COLUMN IF NOT EXISTS config_rev integer NOT NULL DEFAULT 1;