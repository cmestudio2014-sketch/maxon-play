ALTER TABLE customers
ADD COLUMN IF NOT EXISTS app_username VARCHAR(5);

ALTER TABLE customers
ADD COLUMN IF NOT EXISTS app_password VARCHAR(5);

CREATE UNIQUE INDEX IF NOT EXISTS customers_app_username_unique
ON customers(app_username)
WHERE app_username IS NOT NULL;
