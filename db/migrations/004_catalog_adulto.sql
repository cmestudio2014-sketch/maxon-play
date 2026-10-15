-- Inclui a categoria Adulto em instalações existentes do catálogo.
ALTER TABLE catalog_contents
  DROP CONSTRAINT IF EXISTS catalog_contents_category_check;
ALTER TABLE catalog_contents
  ADD CONSTRAINT catalog_contents_category_check
  CHECK (category IN ('ao_vivo','futebol','infantil','filmes','series','adulto'));
