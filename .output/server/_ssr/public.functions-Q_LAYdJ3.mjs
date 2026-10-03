import { l as createServerFn } from "./createServerFn-DDDJMFWM.mjs";
import { t as createSsrRpc } from "./createSsrRpc-B28PUaCx.mjs";
import { a as objectType, o as stringType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/public.functions-Q_LAYdJ3.js
/** Dados públicos: planos ativos + configurações não sensíveis. */
var getPublicCatalog = createServerFn({ method: "GET" }).handler(createSsrRpc("214c12e79391c07c82385477b09386591409c9714b8ff62f7dc301203190b0b8"));
/** Área do cliente: consulta pela KEY. Retorna apenas dados mascarados. */
var lookupLicense = createServerFn({ method: "POST" }).inputValidator((d) => objectType({ key: stringType().trim().min(16).max(24) }).parse(d)).handler(createSsrRpc("ecc9fb1190dcb74fe7387290ec71df0dc7f78ac7b099f6601872572ce91d2c77"));
//#endregion
export { lookupLicense as n, getPublicCatalog as t };
