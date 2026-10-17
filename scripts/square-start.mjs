// Ponto de entrada na Square Cloud: valida env -> build (se necessário) -> migrations -> servidor.
// Usa o build já versionado quando disponível para evitar recompilação a cada restart e falta de RAM.
import { existsSync } from "node:fs";
import { execSync } from "node:child_process";

const run = (cmd) => execSync(cmd, { stdio: "inherit", env: process.env });

process.env.NODE_ENV = "production";
run("node scripts/predeploy-check.mjs --env-only");

if (existsSync(".output/server/index.mjs")) {
  console.log("[square] Build de produção encontrado; pulando recompilação para economizar memória.");
} else {
  console.log("[square] Build de produção não encontrado; gerando build (node-server)...");
  run("npm run build:node");
}

run("node scripts/migrate.mjs");
await import("./start.mjs");
