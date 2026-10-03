/**
 * Camada de acesso ao banco.
 * - Com DATABASE_URL: PostgreSQL real via `pg` (Square Cloud, Neon, Supabase, etc.).
 * - Sem DATABASE_URL (apenas desenvolvimento/preview): PostgreSQL embutido (PGlite)
 *   persistido em ./.data/pglite. Em produção DATABASE_URL é obrigatório.
 * Migrations e seed rodam automaticamente no primeiro acesso (idempotentes).
 */
import migration001 from "../../../db/migrations/001_init.sql?raw";
import migration002 from "../../../db/migrations/002_sources.sql?raw";
import seedSql from "../../../db/seed.sql?raw";
import { env, isProduction } from "./env.server";

export const MIGRATIONS: { version: string; sql: string }[] = [
  { version: "001_init", sql: migration001 },
  { version: "002_sources", sql: migration002 },
];

type Row = Record<string, unknown>;
interface Driver {
  query<T = Row>(sql: string, params?: unknown[]): Promise<T[]>;
  exec(sql: string): Promise<void>;
  kind: "postgres" | "pglite";
}

let driverPromise: Promise<Driver> | undefined;
let readyPromise: Promise<void> | undefined;

async function createDriver(): Promise<Driver> {
  const url = env("DATABASE_URL");
  if (url) {
    const pg = await import("pg");
    const Pool = (pg.default ?? pg).Pool;
    const ssl =
      env("DATABASE_SSL") === "false"
        ? false
        : /sslmode=require|neon|supabase|render/.test(url) || env("DATABASE_SSL") === "true"
          ? { rejectUnauthorized: false }
          : false;
    const pool = new Pool({
      connectionString: url,
      max: Number(env("DATABASE_POOL_MAX") ?? 5),
      ssl,
    });
    return {
      kind: "postgres",
      async query(sql, params = []) {
        const r = await pool.query(sql, params as unknown[]);
        return r.rows as never[];
      },
      async exec(sql) {
        await pool.query(sql);
      },
    };
  }
  if (isProduction()) throw new Error("DATABASE_URL é obrigatório em produção.");
  const { PGlite } = await import("@electric-sql/pglite");
  const dir = env("PGLITE_DIR") ?? "./.data/pglite";
  const { mkdirSync } = await import("node:fs");
  mkdirSync(dir, { recursive: true });
  const db = new PGlite(dir);
  await db.waitReady;
  return {
    kind: "pglite",
    async query(sql, params = []) {
      const r = await db.query(sql, params as unknown[]);
      return r.rows as never[];
    },
    async exec(sql) {
      await db.exec(sql);
    },
  };
}

async function driver(): Promise<Driver> {
  if (!driverPromise)
    driverPromise = createDriver().catch((e) => {
      driverPromise = undefined;
      throw e;
    });
  return driverPromise;
}

export async function runMigrations(d: Driver): Promise<string[]> {
  await d.exec(
    "CREATE TABLE IF NOT EXISTS schema_migrations (version text PRIMARY KEY, applied_at timestamptz NOT NULL DEFAULT now())",
  );
  const done = new Set(
    (await d.query<{ version: string }>("SELECT version FROM schema_migrations")).map(
      (r) => r.version,
    ),
  );
  const applied: string[] = [];
  for (const m of MIGRATIONS) {
    if (done.has(m.version)) continue;
    await d.exec(m.sql);
    await d.query("INSERT INTO schema_migrations(version) VALUES ($1) ON CONFLICT DO NOTHING", [
      m.version,
    ]);
    applied.push(m.version);
  }
  await d.exec(seedSql);
  return applied;
}

async function prepare(): Promise<void> {
  const d = await driver();
  await runMigrations(d);
  const { bootstrapAdmin } = await import("./bootstrap.server");
  await bootstrapAdmin();
  if (env("SEED_DEMO") === "true" || (env("SEED_DEMO") !== "false" && d.kind === "pglite")) {
    const { seedDemo } = await import("./demo.server");
    await seedDemo();
  }
}

/** Garante que o banco está pronto (migrations + seed + admin inicial). */
export async function ready(): Promise<void> {
  if (!readyPromise)
    readyPromise = prepare().catch((e) => {
      readyPromise = undefined;
      throw e;
    });
  return readyPromise;
}

/** Consulta parametrizada ($1, $2...). Nunca concatenar input do usuário. */
export async function q<T = Row>(sql: string, params: unknown[] = []): Promise<T[]> {
  const d = await driver();
  return d.query<T>(sql, params);
}
export async function q1<T = Row>(sql: string, params: unknown[] = []): Promise<T | undefined> {
  return (await q<T>(sql, params))[0];
}
export async function dbKind(): Promise<string> {
  return (await driver()).kind;
}

let lastSweep = 0;
/** Expiração automática: marca ativações vencidas (no máx. 1x/min). */
export async function sweepExpired(): Promise<void> {
  if (Date.now() - lastSweep < 60_000) return;
  lastSweep = Date.now();
  await q(
    "UPDATE activations SET status='expirada', updated_at=now() WHERE status='ativa' AND expires_at < now()",
  );
}