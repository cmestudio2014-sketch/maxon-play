-- Seed idempotente: só insere se ainda não existir. Preços editáveis no painel.
INSERT INTO plans (code, name, description, duration_days, price_cents, highlight, sort)
VALUES
  ('mensal', '30 dias', 'Acesso ao app MAXON PLAY por 30 dias em 1 dispositivo.', 30, 3000, false, 1),
  ('anual', '12 meses', 'Acesso por 12 meses em 1 dispositivo. Melhor custo-benefício.', 365, 9000, true, 2)
ON CONFLICT (code) DO NOTHING;

INSERT INTO settings (key, value) VALUES
  ('brand_name', 'MAXON PLAY'),
  ('whatsapp_number', ''),
  ('whatsapp_message', 'Olá! Quero comprar o plano {plano} do MAXON PLAY.'),
  ('support_hours', 'Seg a Sáb, 9h às 21h')
ON CONFLICT (key) DO NOTHING;