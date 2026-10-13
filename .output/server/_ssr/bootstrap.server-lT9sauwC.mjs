import { d as q, f as q1, i as env, s as hashPassword } from "./ratelimit.server-H848KJku.mjs";
import { t as audit } from "./audit.server-Bor7CQPd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/bootstrap.server-lT9sauwC.js
/** Cria o primeiro admin a partir de ADMIN_EMAIL/ADMIN_PASSWORD (somente se não houver admin). */
async function bootstrapAdmin() {
	const email = env("ADMIN_EMAIL")?.toLowerCase();
	const password = env("ADMIN_PASSWORD");
	if (!email || !password) return;
	const existing = await q1("SELECT count(*)::text AS n FROM admin_users WHERE role='admin'");
	if (existing && Number(existing.n) > 0) return;
	if (password.length < 10) {
		console.warn("[bootstrap] ADMIN_PASSWORD precisa ter 10+ caracteres; admin não criado.");
		return;
	}
	const hash = await hashPassword(password);
	await q("INSERT INTO admin_users(name,email,password_hash,role) VALUES ($1,$2,$3,'admin') ON CONFLICT (email) DO NOTHING", [
		env("ADMIN_NAME") ?? "Administrador",
		email,
		hash
	]);
	await audit({
		actorType: "system",
		action: "admin.bootstrap",
		entity: "admin_user",
		details: { email }
	});
	console.log(`[bootstrap] Admin inicial criado: ${email}`);
}
async function hasAnyAdmin() {
	const r = await q1("SELECT count(*)::text AS n FROM admin_users");
	return !!r && Number(r.n) > 0;
}
//#endregion
export { bootstrapAdmin, hasAnyAdmin };
