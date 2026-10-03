import { l as createServerFn } from "./createServerFn-DDDJMFWM.mjs";
import { a as objectType, o as stringType } from "../_libs/zod.mjs";
import { r as getRequestIP$1 } from "./request-response-CG_yhwzM.mjs";
import { t as createServerRpc } from "./createServerRpc-CxD4EZ5P.mjs";
import { d as q, f as q1, g as sweepExpired, l as maskKey, m as ready, o as hashKey, p as rateLimit } from "./ratelimit.server-H848KJku.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/public.functions-uNLPemjn.js
var getPublicCatalog_createServerFn_handler = createServerRpc({
	id: "214c12e79391c07c82385477b09386591409c9714b8ff62f7dc301203190b0b8",
	name: "getPublicCatalog",
	filename: "src/lib/public.functions.ts"
}, (opts) => getPublicCatalog.__executeServer(opts));
var getPublicCatalog = createServerFn({ method: "GET" }).handler(getPublicCatalog_createServerFn_handler, async () => {
	await ready();
	const plans = await q("SELECT id, code, name, description, duration_days, price_cents, highlight FROM plans WHERE active ORDER BY sort, duration_days");
	const rows = await q("SELECT key, value FROM settings WHERE key IN ('brand_name','whatsapp_number','whatsapp_message','support_hours')");
	const s = Object.fromEntries(rows.map((r) => [r.key, r.value]));
	return {
		plans,
		brand: s["brand_name"] ?? "MAXON PLAY",
		whatsapp: (() => {
			const d = (s["whatsapp_number"] || process.env["WHATSAPP_NUMBER"] || "").replace(/\D/g, "");
			return d.length >= 10 && d.length <= 15 ? d : "";
		})(),
		whatsappMessage: s["whatsapp_message"] ?? "",
		supportHours: s["support_hours"] ?? ""
	};
});
var lookupLicense_createServerFn_handler = createServerRpc({
	id: "ecc9fb1190dcb74fe7387290ec71df0dc7f78ac7b099f6601872572ce91d2c77",
	name: "lookupLicense",
	filename: "src/lib/public.functions.ts"
}, (opts) => lookupLicense.__executeServer(opts));
var lookupLicense = createServerFn({ method: "POST" }).inputValidator((d) => objectType({ key: stringType().trim().min(16).max(24) }).parse(d)).handler(lookupLicense_createServerFn_handler, async ({ data }) => {
	await ready();
	const ip = getRequestIP$1({ xForwardedFor: true }) ?? "local";
	if (!rateLimit(`lookup:${ip}`, 10, 6e4).ok) return {
		ok: false,
		error: "Muitas consultas. Aguarde um minuto."
	};
	await sweepExpired();
	const a = await q1(`SELECT a.status, a.expires_at, a.key_last4, p.name AS plan, d.display_id, d.platform, d.model, d.last_seen_at, c.name AS customer
       FROM activations a JOIN plans p ON p.id=a.plan_id LEFT JOIN devices d ON d.id=a.device_id LEFT JOIN customers c ON c.id=a.customer_id
       WHERE a.key_hash=$1`, [hashKey(data.key)]);
	if (!a) return {
		ok: false,
		error: "KEY não encontrada."
	};
	const firstName = a.customer?.split(" ")[0] ?? null;
	return {
		ok: true,
		license: {
			key: maskKey(a.key_last4),
			plan: a.plan,
			status: a.status,
			expires_at: a.expires_at,
			customer: firstName,
			device: a.display_id ? {
				id: `${a.display_id.slice(0, 8)}:••:••:••`,
				platform: a.platform,
				model: a.model,
				last_seen_at: a.last_seen_at
			} : null
		}
	};
});
//#endregion
export { getPublicCatalog_createServerFn_handler, lookupLicense_createServerFn_handler };
