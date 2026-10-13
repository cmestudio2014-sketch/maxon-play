import { d as q } from "./ratelimit.server-H848KJku.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/audit.server-Bor7CQPd.js
var SENSITIVE = /key|password|senha|token|secret/i;
/** Remove qualquer campo sensível antes de gravar no log. */
function scrub(d) {
	const out = {};
	for (const [k, v] of Object.entries(d)) if (SENSITIVE.test(k) && k !== "key_last4") out[k] = "[oculto]";
	else out[k] = v;
	return out;
}
async function audit(e) {
	try {
		await q("INSERT INTO audit_logs(actor_type,actor_id,actor_label,action,entity,entity_id,details) VALUES ($1,$2,$3,$4,$5,$6,$7::jsonb)", [
			e.actorType,
			e.actorId ?? null,
			e.actorLabel ?? null,
			e.action,
			e.entity ?? null,
			e.entityId ?? null,
			JSON.stringify(scrub(e.details ?? {}))
		]);
	} catch (err) {
		console.error("[audit] falha ao gravar", err.message);
	}
}
//#endregion
export { audit as t };
