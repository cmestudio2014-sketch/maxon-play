// Verificação pré-deploy. Uso:
//   node scripts/predeploy-check.mjs            -> env + conexão + migrations + build
//   node scripts/predeploy-check.mjs --env-only -> só variáveis
import { execSync } from "node:child_process";

const envOnly = process.argv.includes("--env-only");
const errors = [];
const warns = [];
const need = (k, test, msg) => {
  const v = process.env[k];
  if (!v || !test(v)) errors.push(`${k}: ${msg}`);
};

need(
  "DATABASE_URL",
  (v) => /^postgres(ql)?:\/\//.test(v),
  "obrigatório (postgres://usuario:senha@host:5432/banco)",
);
need("JWT_SECRET", (v) => v.length >= 32, "obrigatório, mínimo 32 caracteres aleatórios");
need(
  "CONFIG_ENCRYPTION_KEY",
  (v) => v.length >= 32,
  "obrigatório, mínimo 32 caracteres aleatórios (diferente do JWT_SECRET)",
);
need("APP_URL", (v) => /^https:\/\//.test(v), "obrigatório, URL pública com https://");
if (process.env.JWT_SECRET && process.env.JWT_SECRET === process.env.CONFIG_ENCRYPTION_KEY)
  errors.push("CONFIG_ENCRYPTION_KEY deve ser diferente de JWT_SECRET");
if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD)
  warns.push(
    "ADMIN_EMAIL/ADMIN_PASSWORD ausentes: o primeiro admin não será criado automaticamente.",
  );
else if (process.env.ADMIN_PASSWORD.length < 10)
  errors.push("ADMIN_PASSWORD: mínimo 10 caracteres");
if (!process.env.WHATSAPP_NUMBER)
  warns.push("WHATSAPP_NUMBER vazio: configure depois em Painel > Configurações.");
if ((process.env.CORS_ORIGINS ?? "*") === "*")
  warns.push("CORS_ORIGINS='*' (ok para apps de TV; restrinja se quiser).");
if (process.env.SEED_DEMO === "true")
  warns.push("SEED_DEMO=true: dados fictícios serão criados em produção.");

warns.forEach((w) => console.warn(`⚠  ${w}`));
if (errors.length) {
  errors.forEach((e) => console.error(`✖  ${e}`));
  console.error("\nCorrija as variáveis acima (veja .env.example).");
  process.exit(1);
}
console.log("✔  Variáveis obrigatórias OK");
if (envOnly) process.exit(0);

const pg = (await import("pg")).default;
const url = process.env.DATABASE_URL;
const ssl =
  process.env.DATABASE_SSL === "false"
    ? false
    : /sslmode=require|neon|supabase|render/.test(url) || process.env.DATABASE_SSL === "true"
      ? { rejectUnauthorized: false }
      : false;
const c = new pg.Client({ connectionString: url, ssl });
try {
  await c.connect();
  const v = await c.query("SHOW server_version");
  console.log(`✔  Conexão PostgreSQL OK (versão ${v.rows[0].server_version})`);
} catch (e) {
  console.error(`✖  Falha ao conectar no banco: ${e.message}`);
  process.exit(1);
} finally {
  await c.end().catch(() => {});
}
execSync("node scripts/migrate.mjs", { stdio: "inherit" });
console.log("…  Gerando build node-server");
execSync("npm run build:node", { stdio: "inherit" });
console.log("\n✔  Pronto para deploy.");