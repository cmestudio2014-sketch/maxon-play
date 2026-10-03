-- MAXON PLAY — schema inicial (idempotente). PostgreSQL 13+.
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL UNIQUE,
  password_hash text NOT NULL,
  role text NOT NULL CHECK (role IN ('admin','vendedor')),
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  last_login_at timestamptz
);

CREATE TABLE IF NOT EXISTS plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text NOT NULL UNIQUE,
  name text NOT NULL,
  description text NOT NULL DEFAULT '',
  duration_days integer NOT NULL CHECK (duration_days > 0),
  price_cents integer NOT NULL CHECK (price_cents >= 0),
  highlight boolean NOT NULL DEFAULT false,
  active boolean NOT NULL DEFAULT true,
  sort integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  whatsapp text NOT NULL,
  email text,
  notes text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'ativo' CHECK (status IN ('ativo','inativo','bloqueado')),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS devices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  device_uid text NOT NULL UNIQUE,
  display_id text NOT NULL,
  platform text NOT NULL CHECK (platform IN ('android','tizen','web')),
  model text NOT NULL DEFAULT '',
  app_version text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'ativo' CHECK (status IN ('ativo','bloqueado')),
  created_at timestamptz NOT NULL DEFAULT now(),
  last_seen_at timestamptz
);
CREATE INDEX IF NOT EXISTS devices_display_idx ON devices(display_id);

CREATE TABLE IF NOT EXISTS activations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid REFERENCES customers(id) ON DELETE SET NULL,
  plan_id uuid NOT NULL REFERENCES plans(id),
  device_id uuid REFERENCES devices(id) ON DELETE SET NULL,
  key_hash text NOT NULL UNIQUE,
  key_last4 text NOT NULL,
  status text NOT NULL DEFAULT 'pendente' CHECK (status IN ('pendente','ativa','expirada','bloqueada')),
  starts_at timestamptz,
  expires_at timestamptz,
  created_by uuid REFERENCES admin_users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS activations_device_idx ON activations(device_id);
CREATE INDEX IF NOT EXISTS activations_exp_idx ON activations(expires_at);

CREATE TABLE IF NOT EXISTS coupons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text NOT NULL UNIQUE,
  percent_off integer NOT NULL CHECK (percent_off BETWEEN 1 AND 100),
  max_uses integer,
  uses integer NOT NULL DEFAULT 0,
  expires_at timestamptz,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sales (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number text NOT NULL UNIQUE,
  customer_id uuid REFERENCES customers(id) ON DELETE SET NULL,
  plan_id uuid REFERENCES plans(id),
  activation_id uuid REFERENCES activations(id) ON DELETE SET NULL,
  coupon_id uuid REFERENCES coupons(id) ON DELETE SET NULL,
  amount_cents integer NOT NULL CHECK (amount_cents >= 0),
  status text NOT NULL DEFAULT 'pendente' CHECK (status IN ('pendente','pago','cancelado')),
  payment_method text NOT NULL DEFAULT 'pix',
  seller_id uuid REFERENCES admin_users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  paid_at timestamptz
);

CREATE TABLE IF NOT EXISTS settings (
  key text PRIMARY KEY,
  value text NOT NULL
);

CREATE TABLE IF NOT EXISTS audit_logs (
  id bigserial PRIMARY KEY,
  actor_type text NOT NULL,
  actor_id text,
  actor_label text,
  action text NOT NULL,
  entity text,
  entity_id text,
  details jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS audit_created_idx ON audit_logs(created_at DESC);