// Inicia o build publicado manualmente. Prefere o build novo aninhado quando presente.
import { existsSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

process.env.NODE_ENV ??= "production";
process.env.HOST ??= "0.0.0.0";
process.env.NITRO_HOST ??= process.env.HOST;
process.env.PORT ??= "80";
process.env.NITRO_PORT ??= process.env.PORT;

const nested = resolve(".output/.output/server/index.mjs");
const normal = resolve(".output/server/index.mjs");
const entry = existsSync(nested) ? nested : normal;

if (!existsSync(entry)) {
  console.error("[maxon] Build não encontrado:", entry);
  process.exit(1);
}
console.log("[maxon] Usando build:", entry);
console.log(`[maxon] Servindo em http://${process.env.HOST}:${process.env.PORT}`);
await import(pathToFileURL(entry).href);
