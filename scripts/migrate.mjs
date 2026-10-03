// Aplica db/migrations/*.sql e db/seed.sql (idempotente) no DATABASE_URL.
import { readdirSync, readFileSync } from "node:fs";
import pg from "pg";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL não definido.");
  process.exit(1);
}
const ssl =
  process.env.DATABASE_SSL === "false"
    ? false
    : /sslmode=require|neon|supabase|render/.test(url) || process.env.DATABASE_SSL === "true"
      ? { rejectUnauthorized: false }
      : false;
const client = new pg.Client({ connectionString: url, ssl });
await client.connect();
try {
  await client.query(
    "CREATE TABLE IF NOT EXISTS schema_migrations (version text PRIMARY KEY, applied_at timestamptz NOT NULL DEFAULT now())",
  );
  const done = new Set(
    (await client.query("SELECT version FROM schema_migrations")).rows.map((r) => r.version),
  );
  const files = process.argv.includes("--seed-only")
    ? []
    : readdirSync("db/migrations").filter((f) => f.endsWith(".sql")).sort();
  for (const f of files) {
    const version = f.replace(/\.sql$/, "");
    if (done.has(version)) continue;
    console.log(`[migrate] aplicando ${version}`);
    await client.query("BEGIN");
    await client.query(readFileSync(`db/migrations/${f}`, "utf8"));
    await client.query("INSERT INTO schema_migrations(version) VALUES ($1)", [version]);
    await client.query("COMMIT");
  }
  await client.query(readFileSync("db/seed.sql", "utf8"));
  console.log("[migrate] OK");
} catch (e) {
  await client.query("ROLLBACK").catch(() => {});
  console.error("[migrate] falhou:", e.message);
  process.exitCode = 1;
} finally {
  await client.end();
}