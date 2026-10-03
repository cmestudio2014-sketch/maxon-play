// Ponto de entrada na Square Cloud: valida env -> build (se necessário) -> migrations -> servidor.
import { existsSync } from "node:fs";
import { execSync } from "node:child_process";

const run = (cmd) => execSync(cmd, { stdio: "inherit", env: process.env });

process.env.NODE_ENV = "production";
run("node scripts/predeploy-check.mjs --env-only");
if (!existsSync(".output/server/index.mjs") || process.env.FORCE_BUILD === "true") {
  console.log("[square] Gerando build de produção (node-server)…");
  run("npm run build:node");
}
run("node scripts/migrate.mjs");
await import("./start.mjs");