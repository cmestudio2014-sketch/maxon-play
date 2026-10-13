-- Código temporário exibido na TV para ativação pelo painel.
CREATE TABLE IF NOT EXISTS tv_pairing_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  device_id uuid NOT NULL REFERENCES devices(id) ON DELETE CASCADE,
  code text NOT NULL UNIQUE,
  status text NOT NULL DEFAULT 'pendente' CHECK (status IN ('pendente','ativado','expirado','cancelado')),
  activation_id uuid REFERENCES activations(id) ON DELETE SET NULL,
  expires_at timestamptz NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  activated_at timestamptz
);
CREATE INDEX IF NOT EXISTS tv_pairing_device_idx ON tv_pairing_codes(device_id, created_at DESC);
CREATE INDEX IF NOT EXISTS tv_pairing_exp_idx ON tv_pairing_codes(expires_at);
