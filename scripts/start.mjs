// Inicia o build publicado manualmente. Prefere o build novo aninhado quando presente.
import { existsSync } from "node:fs";

process.env.NODE_ENV ??= "production";
process.env.HOST ??= "0.0.0.0";
process.env.NITRO_HOST ??= process.env.HOST;
process.env.PORT ??= "80";
process.env.NITRO_PORT ??= process.env.PORT;

const entry = existsSync(".output/.output/server/index.mjs")
  ? "../.output/.output/server/index.mjs"
  : "../.output/server/index.mjs";

if (!existsSync(entry.slice(3))) {
  console.error("Build não encontrado.");
  process.exit(1);
}
console.log(`[maxon] Usando build: ${entry}`);
console.log(`[maxon] Servindo em http://${process.env.HOST}:${process.env.PORT}`);
await import(entry);
