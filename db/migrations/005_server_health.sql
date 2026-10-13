ALTER TABLE provider_servers ADD COLUMN IF NOT EXISTS health_status text;
ALTER TABLE provider_servers ADD COLUMN IF NOT EXISTS health_http integer;
ALTER TABLE provider_servers ADD COLUMN IF NOT EXISTS health_latency_ms integer;
ALTER TABLE provider_servers ADD COLUMN IF NOT EXISTS health_checked_at timestamptz;
