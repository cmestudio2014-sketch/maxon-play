// Ponto de entrada na Square Cloud: valida env -> build -> migrations -> servidor.
// O build roda em todo deploy/restart para garantir que alterações em src/ entrem no .output.
import { execSync } from "node:child_process";

const run = (cmd) => execSync(cmd, { stdio: "inherit", env: process.env });

process.env.NODE_ENV = "production";
run("node scripts/predeploy-check.mjs --env-only");
console.log("[square] Gerando build de produção atualizado (node-server)…");
run("npm run build:node");
run("node scripts/migrate.mjs");
await import("./start.mjs");
