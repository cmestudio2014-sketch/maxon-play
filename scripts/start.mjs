// Inicia o servidor Node gerado em .output (preset node-server do Nitro).
import { existsSync } from "node:fs";

process.env.NODE_ENV ??= "production";
process.env.HOST ??= "0.0.0.0";
process.env.NITRO_HOST ??= process.env.HOST;
process.env.PORT ??= "80"; // Square Cloud expõe sites na porta 80
process.env.NITRO_PORT ??= process.env.PORT;

if (!existsSync(".output/server/index.mjs")) {
  console.error("Build não encontrado. Rode: npm run build:node");
  process.exit(1);
}
console.log(`[maxon] Servindo em http://${process.env.HOST}:${process.env.PORT}`);
await import("../.output/server/index.mjs");