import { createHash, createHmac, randomBytes, scrypt, timingSafeEqual } from "node:crypto";
//#region node_modules/.nitro/vite/services/ssr/assets/ratelimit.server-H848KJku.js
var _001_init_default = "-- MAXON PLAY — schema inicial (idempotente). PostgreSQL 13+.\nCREATE TABLE IF NOT EXISTS admin_users (\n  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),\n  name text NOT NULL,\n  email text NOT NULL UNIQUE,\n  password_hash text NOT NULL,\n  role text NOT NULL CHECK (role IN ('admin','vendedor')),\n  active boolean NOT NULL DEFAULT true,\n  created_at timestamptz NOT NULL DEFAULT now(),\n  last_login_at timestamptz\n);\n\nCREATE TABLE IF NOT EXISTS plans (\n  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),\n  code text NOT NULL UNIQUE,\n  name text NOT NULL,\n  description text NOT NULL DEFAULT '',\n  duration_days integer NOT NULL CHECK (duration_days > 0),\n  price_cents integer NOT NULL CHECK (price_cents >= 0),\n  highlight boolean NOT NULL DEFAULT false,\n  active boolean NOT NULL DEFAULT true,\n  sort integer NOT NULL DEFAULT 0,\n  created_at timestamptz NOT NULL DEFAULT now(),\n  updated_at timestamptz NOT NULL DEFAULT now()\n);\n\nCREATE TABLE IF NOT EXISTS customers (\n  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),\n  name text NOT NULL,\n  whatsapp text NOT NULL,\n  email text,\n  notes text NOT NULL DEFAULT '',\n  status text NOT NULL DEFAULT 'ativo' CHECK (status IN ('ativo','inativo','bloqueado')),\n  created_at timestamptz NOT NULL DEFAULT now()\n);\n\nCREATE TABLE IF NOT EXISTS devices (\n  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),\n  device_uid text NOT NULL UNIQUE,\n  display_id text NOT NULL,\n  platform text NOT NULL CHECK (platform IN ('android','tizen','web')),\n  model text NOT NULL DEFAULT '',\n  app_version text NOT NULL DEFAULT '',\n  status text NOT NULL DEFAULT 'ativo' CHECK (status IN ('ativo','bloqueado')),\n  created_at timestamptz NOT NULL DEFAULT now(),\n  last_seen_at timestamptz\n);\nCREATE INDEX IF NOT EXISTS devices_display_idx ON devices(display_id);\n\nCREATE TABLE IF NOT EXISTS activations (\n  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),\n  customer_id uuid REFERENCES customers(id) ON DELETE SET NULL,\n  plan_id uuid NOT NULL REFERENCES plans(id),\n  device_id uuid REFERENCES devices(id) ON DELETE SET NULL,\n  key_hash text NOT NULL UNIQUE,\n  key_last4 text NOT NULL,\n  status text NOT NULL DEFAULT 'pendente' CHECK (status IN ('pendente','ativa','expirada','bloqueada')),\n  starts_at timestamptz,\n  expires_at timestamptz,\n  created_by uuid REFERENCES admin_users(id) ON DELETE SET NULL,\n  created_at timestamptz NOT NULL DEFAULT now(),\n  updated_at timestamptz NOT NULL DEFAULT now()\n);\nCREATE INDEX IF NOT EXISTS activations_device_idx ON activations(device_id);\nCREATE INDEX IF NOT EXISTS activations_exp_idx ON activations(expires_at);\n\nCREATE TABLE IF NOT EXISTS coupons (\n  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),\n  code text NOT NULL UNIQUE,\n  percent_off integer NOT NULL CHECK (percent_off BETWEEN 1 AND 100),\n  max_uses integer,\n  uses integer NOT NULL DEFAULT 0,\n  expires_at timestamptz,\n  active boolean NOT NULL DEFAULT true,\n  created_at timestamptz NOT NULL DEFAULT now()\n);\n\nCREATE TABLE IF NOT EXISTS sales (\n  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),\n  order_number text NOT NULL UNIQUE,\n  customer_id uuid REFERENCES customers(id) ON DELETE SET NULL,\n  plan_id uuid REFERENCES plans(id),\n  activation_id uuid REFERENCES activations(id) ON DELETE SET NULL,\n  coupon_id uuid REFERENCES coupons(id) ON DELETE SET NULL,\n  amount_cents integer NOT NULL CHECK (amount_cents >= 0),\n  status text NOT NULL DEFAULT 'pendente' CHECK (status IN ('pendente','pago','cancelado')),\n  payment_method text NOT NULL DEFAULT 'pix',\n  seller_id uuid REFERENCES admin_users(id) ON DELETE SET NULL,\n  created_at timestamptz NOT NULL DEFAULT now(),\n  paid_at timestamptz\n);\n\nCREATE TABLE IF NOT EXISTS settings (\n  key text PRIMARY KEY,\n  value text NOT NULL\n);\n\nCREATE TABLE IF NOT EXISTS audit_logs (\n  id bigserial PRIMARY KEY,\n  actor_type text NOT NULL,\n  actor_id text,\n  actor_label text,\n  action text NOT NULL,\n  entity text,\n  entity_id text,\n  details jsonb NOT NULL DEFAULT '{}'::jsonb,\n  created_at timestamptz NOT NULL DEFAULT now()\n);\nCREATE INDEX IF NOT EXISTS audit_created_idx ON audit_logs(created_at DESC);";
var _002_sources_default = "-- Fontes / Listas autorizadas (M3U ou Xtream) fornecidas pelo operador/cliente.\n-- Credenciais ficam criptografadas (AES-256-GCM) em payload_enc com CONFIG_ENCRYPTION_KEY.\nCREATE TABLE IF NOT EXISTS sources (\n  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),\n  name text NOT NULL,\n  type text NOT NULL CHECK (type IN ('m3u','xtream')),\n  customer_id uuid REFERENCES customers(id) ON DELETE SET NULL,\n  payload_enc text NOT NULL,\n  display_hint text NOT NULL DEFAULT '',\n  version integer NOT NULL DEFAULT 1,\n  created_at timestamptz NOT NULL DEFAULT now(),\n  updated_at timestamptz NOT NULL DEFAULT now()\n);\nALTER TABLE activations ADD COLUMN IF NOT EXISTS source_id uuid REFERENCES sources(id) ON DELETE SET NULL;\nALTER TABLE activations ADD COLUMN IF NOT EXISTS config_rev integer NOT NULL DEFAULT 1;\nALTER TABLE devices ADD COLUMN IF NOT EXISTS source_id uuid REFERENCES sources(id) ON DELETE SET NULL;\nALTER TABLE devices ADD COLUMN IF NOT EXISTS config_rev integer NOT NULL DEFAULT 1;";
var seed_default = "-- Seed idempotente: só insere se ainda não existir. Preços editáveis no painel.\nINSERT INTO plans (code, name, description, duration_days, price_cents, highlight, sort)\nVALUES\n  ('mensal', '30 dias', 'Acesso ao app MAXON PLAY por 30 dias em 1 dispositivo.', 30, 3000, false, 1),\n  ('anual', '12 meses', 'Acesso por 12 meses em 1 dispositivo. Melhor custo-benefício.', 365, 9000, true, 2)\nON CONFLICT (code) DO NOTHING;\n\nINSERT INTO settings (key, value) VALUES\n  ('brand_name', 'MAXON PLAY'),\n  ('whatsapp_number', ''),\n  ('whatsapp_message', 'Olá! Quero comprar o plano {plano} do MAXON PLAY.'),\n  ('support_hours', 'Seg a Sáb, 9h às 21h')\nON CONFLICT (key) DO NOTHING;";
function env(name) {
	const v = (globalThis.process?.env ?? {})[name];
	return v && v.trim() !== "" ? v.trim() : void 0;
}
function isProduction() {
	return env("NODE_ENV") === "production" || env("APP_ENV") === "production";
}
var devSecret;
function jwtSecret() {
	const s = env("JWT_SECRET");
	if (s && s.length >= 32) return s;
	if (isProduction()) throw new Error("JWT_SECRET ausente ou curto (mínimo 32 caracteres) em produção.");
	if (!devSecret) {
		const b = /* @__PURE__ */ new Uint8Array(32);
		crypto.getRandomValues(b);
		devSecret = Array.from(b, (x) => x.toString(16).padStart(2, "0")).join("");
	}
	return devSecret;
}
function corsOrigins() {
	return (env("CORS_ORIGINS") ?? "*").split(",").map((s) => s.trim()).filter(Boolean);
}
/**
* Camada de acesso ao banco.
* - Com DATABASE_URL: PostgreSQL real via `pg` (Square Cloud, Neon, Supabase, etc.).
* - Sem DATABASE_URL (apenas desenvolvimento/preview): PostgreSQL embutido (PGlite)
*   persistido em ./.data/pglite. Em produção DATABASE_URL é obrigatório.
* Migrations e seed rodam automaticamente no primeiro acesso (idempotentes).
*/
var MIGRATIONS = [{
	version: "001_init",
	sql: _001_init_default
}, {
	version: "002_sources",
	sql: _002_sources_default
}];
var driverPromise;
var readyPromise;
async function createDriver() {
	const url = env("DATABASE_URL");
	if (url) {
		const pg = await import("../_libs/pg.mjs").then((n) => n.t);
		const Pool = (pg.default ?? pg).Pool;
		const ssl = env("DATABASE_SSL") === "false" ? false : /sslmode=require|neon|supabase|render/.test(url) || env("DATABASE_SSL") === "true" ? { rejectUnauthorized: false } : false;
		const pool = new Pool({
			connectionString: url,
			max: Number(env("DATABASE_POOL_MAX") ?? 5),
			ssl
		});
		return {
			kind: "postgres",
			async query(sql, params = []) {
				return (await pool.query(sql, params)).rows;
			},
			async exec(sql) {
				await pool.query(sql);
			}
		};
	}
	if (isProduction()) throw new Error("DATABASE_URL é obrigatório em produção.");
	const { PGlite } = await import("../_libs/electric-sql__pglite.mjs").then((n) => n.t);
	const dir = env("PGLITE_DIR") ?? "./.data/pglite";
	const { mkdirSync } = await import("node:fs");
	mkdirSync(dir, { recursive: true });
	const db = new PGlite(dir);
	await db.waitReady;
	return {
		kind: "pglite",
		async query(sql, params = []) {
			return (await db.query(sql, params)).rows;
		},
		async exec(sql) {
			await db.exec(sql);
		}
	};
}
async function driver() {
	if (!driverPromise) driverPromise = createDriver().catch((e) => {
		driverPromise = void 0;
		throw e;
	});
	return driverPromise;
}
async function runMigrations(d) {
	await d.exec("CREATE TABLE IF NOT EXISTS schema_migrations (version text PRIMARY KEY, applied_at timestamptz NOT NULL DEFAULT now())");
	const done = new Set((await d.query("SELECT version FROM schema_migrations")).map((r) => r.version));
	const applied = [];
	for (const m of MIGRATIONS) {
		if (done.has(m.version)) continue;
		await d.exec(m.sql);
		await d.query("INSERT INTO schema_migrations(version) VALUES ($1) ON CONFLICT DO NOTHING", [m.version]);
		applied.push(m.version);
	}
	await d.exec(seed_default);
	return applied;
}
async function prepare() {
	const d = await driver();
	await runMigrations(d);
	const { bootstrapAdmin } = await import("./bootstrap.server-lT9sauwC.mjs");
	await bootstrapAdmin();
	if (env("SEED_DEMO") === "true" || env("SEED_DEMO") !== "false" && d.kind === "pglite") {
		const { seedDemo } = await import("./demo.server-D9t3CSMV.mjs");
		await seedDemo();
	}
}
/** Garante que o banco está pronto (migrations + seed + admin inicial). */
async function ready() {
	if (!readyPromise) readyPromise = prepare().catch((e) => {
		readyPromise = void 0;
		throw e;
	});
	return readyPromise;
}
/** Consulta parametrizada ($1, $2...). Nunca concatenar input do usuário. */
async function q(sql, params = []) {
	return (await driver()).query(sql, params);
}
async function q1(sql, params = []) {
	return (await q(sql, params))[0];
}
async function dbKind() {
	return (await driver()).kind;
}
var lastSweep = 0;
/** Expiração automática: marca ativações vencidas (no máx. 1x/min). */
async function sweepExpired() {
	if (Date.now() - lastSweep < 6e4) return;
	lastSweep = Date.now();
	await q("UPDATE activations SET status='expirada', updated_at=now() WHERE status='ativa' AND expires_at < now()");
}
function scryptAsync(pw, salt, len) {
	return new Promise((res, rej) => scrypt(pw, salt, len, {
		N: 16384,
		r: 8,
		p: 1
	}, (e, k) => e ? rej(e) : res(k)));
}
async function hashPassword(pw) {
	const salt = randomBytes(16);
	const key = await scryptAsync(pw, salt, 64);
	return `scrypt$${salt.toString("base64")}$${key.toString("base64")}`;
}
async function verifyPassword(pw, stored) {
	const [alg, s, k] = stored.split("$");
	if (alg !== "scrypt" || !s || !k) return false;
	const expected = Buffer.from(k, "base64");
	const got = await scryptAsync(pw, Buffer.from(s, "base64"), expected.length);
	return got.length === expected.length && timingSafeEqual(got, expected);
}
var b64url = (b) => Buffer.from(b).toString("base64url");
function signJwt(payload, ttlSeconds) {
	const header = b64url(JSON.stringify({
		alg: "HS256",
		typ: "JWT"
	}));
	const body = b64url(JSON.stringify({
		...payload,
		iat: Math.floor(Date.now() / 1e3),
		exp: Math.floor(Date.now() / 1e3) + ttlSeconds
	}));
	return `${header}.${body}.${createHmac("sha256", jwtSecret()).update(`${header}.${body}`).digest("base64url")}`;
}
function verifyJwt(token, typ) {
	const parts = token.split(".");
	if (parts.length !== 3) return null;
	const [h, b, s] = parts;
	const expected = createHmac("sha256", jwtSecret()).update(`${h}.${b}`).digest();
	const got = Buffer.from(s, "base64url");
	if (got.length !== expected.length || !timingSafeEqual(got, expected)) return null;
	try {
		const p = JSON.parse(Buffer.from(b, "base64url").toString());
		if (p.typ !== typ || typeof p.exp !== "number" || p.exp < Date.now() / 1e3) return null;
		return p;
	} catch {
		return null;
	}
}
var ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
function generateActivationKey() {
	const bytes = randomBytes(16);
	let out = "";
	for (let i = 0; i < 16; i++) {
		out += ALPHABET[(bytes[i] ?? 0) % 32];
		if (i % 4 === 3 && i < 15) out += "-";
	}
	return out;
}
function normalizeKey(k) {
	return k.toUpperCase().replace(/[^A-Z0-9]/g, "").replace(/(.{4})(?=.)/g, "$1-");
}
function hashKey(k) {
	return createHash("sha256").update(normalizeKey(k)).digest("hex");
}
function maskKey(last4) {
	return `••••-••••-••••-${last4}`;
}
function displayIdFor(deviceUid) {
	const h = createHash("sha256").update(deviceUid).digest();
	const b = Array.from(h.subarray(0, 6));
	b[0] = ((b[0] ?? 0) | 2) & 254;
	return b.map((x) => x.toString(16).padStart(2, "0").toUpperCase()).join(":");
}
function orderNumber() {
	const d = /* @__PURE__ */ new Date();
	return `MX-${`${d.getUTCFullYear()}${String(d.getUTCMonth() + 1).padStart(2, "0")}${String(d.getUTCDate()).padStart(2, "0")}`}-${randomBytes(3).toString("hex").toUpperCase()}`;
}
var buckets = /* @__PURE__ */ new Map();
function rateLimit(key, limit, windowMs) {
	const now = Date.now();
	if (buckets.size > 2e4) {
		for (const [k, b] of buckets) if (b.reset < now) buckets.delete(k);
	}
	const b = buckets.get(key);
	if (!b || b.reset < now) {
		buckets.set(key, {
			count: 1,
			reset: now + windowMs
		});
		return {
			ok: true,
			retryAfter: 0
		};
	}
	b.count++;
	return {
		ok: b.count <= limit,
		retryAfter: Math.ceil((b.reset - now) / 1e3)
	};
}
//#endregion
export { verifyJwt as _, generateActivationKey as a, isProduction as c, q as d, q1 as f, sweepExpired as g, signJwt as h, env as i, maskKey as l, ready as m, dbKind as n, hashKey as o, rateLimit as p, displayIdFor as r, hashPassword as s, corsOrigins as t, orderNumber as u, verifyPassword as v };
