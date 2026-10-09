import { l as createServerFn } from "./createServerFn-DDDJMFWM.mjs";
import { a as objectType, i as numberType, n as enumType, o as stringType, r as literalType, s as unionType, t as booleanType } from "../_libs/zod.mjs";
import { n as getCookie, o as setCookie$1, r as getRequestIP$1, t as deleteCookie$1 } from "./request-response-CG_yhwzM.mjs";
import { t as createServerRpc } from "./createServerRpc-CxD4EZ5P.mjs";
import { _ as verifyJwt, a as generateActivationKey, c as isProduction, d as q, f as q1, g as sweepExpired, h as signJwt, i as env, m as ready, o as hashKey, p as rateLimit, s as hashPassword, u as orderNumber, v as verifyPassword } from "./ratelimit.server-H848KJku.mjs";
import { t as audit } from "./audit.server-Bor7CQPd.mjs";
import { hasAnyAdmin } from "./bootstrap.server-lT9sauwC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.functions-CiNMRdYu.js
var COOKIE = "maxon_session";
var TTL = 28800;
function startSession(user) {
	setCookie$1(COOKIE, signJwt({
		sub: user.id,
		typ: "admin",
		role: user.role
	}, TTL), {
		httpOnly: true,
		sameSite: "lax",
		secure: isProduction(),
		path: "/",
		maxAge: TTL
	});
}
function endSession() {
	deleteCookie$1(COOKIE, { path: "/" });
}
async function currentAdmin() {
	const t = getCookie(COOKIE);
	if (!t) return null;
	const p = verifyJwt(t, "admin");
	if (!p) return null;
	await ready();
	return await q1("SELECT id, name, email, role FROM admin_users WHERE id=$1 AND active", [p.sub]) ?? null;
}
var AuthError = class extends Error {};
/** Exige sessão e (opcional) papel. Lança erro legível para o painel. */
async function requireAdmin(roles = ["admin", "vendedor"]) {
	const u = await currentAdmin();
	if (!u) throw new AuthError("Sessão expirada. Faça login novamente.");
	if (!roles.includes(u.role)) throw new AuthError("Permissão insuficiente para esta ação.");
	await sweepExpired();
	return u;
}
var actor = (u) => ({
	actorType: "admin",
	actorId: u.id,
	actorLabel: u.email
});
var uuid = stringType().uuid();
var getSession_createServerFn_handler = createServerRpc({
	id: "dc54eae1edc361315022ee97c40ae4ea0f12ea2cc904d1487c081fb538f9c5b6",
	name: "getSession",
	filename: "src/lib/admin.functions.ts"
}, (opts) => getSession.__executeServer(opts));
var getSession = createServerFn({ method: "GET" }).handler(getSession_createServerFn_handler, async () => {
	await ready();
	return {
		user: await currentAdmin(),
		setupAllowed: !await hasAnyAdmin() && (!isProduction() || env("ALLOW_SETUP") === "true")
	};
});
var login_createServerFn_handler = createServerRpc({
	id: "7a264258ea05d71b79dac878d9ffb746a26219259b8e3fa8f01dfd039abab085",
	name: "login",
	filename: "src/lib/admin.functions.ts"
}, (opts) => login.__executeServer(opts));
var login = createServerFn({ method: "POST" }).inputValidator((d) => objectType({
	email: stringType().email().max(120),
	password: stringType().min(1).max(200)
}).parse(d)).handler(login_createServerFn_handler, async ({ data }) => {
	await ready();
	const ip = getRequestIP$1({ xForwardedFor: true }) ?? "local";
	const rl = rateLimit(`login:${ip}`, 8, 6e5);
	if (!rl.ok) return {
		ok: false,
		error: `Muitas tentativas. Aguarde ${rl.retryAfter}s.`
	};
	const u = await q1("SELECT id, name, email, role, password_hash FROM admin_users WHERE email=$1 AND active", [data.email.toLowerCase()]);
	if (!u || !await verifyPassword(data.password, u.password_hash)) {
		await audit({
			actorType: "public",
			action: "auth.login_failed",
			details: { email: data.email.toLowerCase() }
		});
		return {
			ok: false,
			error: "Email ou senha inválidos."
		};
	}
	await q("UPDATE admin_users SET last_login_at=now() WHERE id=$1", [u.id]);
	startSession({
		id: u.id,
		name: u.name,
		email: u.email,
		role: u.role
	});
	await audit({
		...actor(u),
		action: "auth.login"
	});
	return { ok: true };
});
var setupFirstAdmin_createServerFn_handler = createServerRpc({
	id: "4006b4dc89298c141643adcbf1246f8704810cd6d97933528ee240acb1149e32",
	name: "setupFirstAdmin",
	filename: "src/lib/admin.functions.ts"
}, (opts) => setupFirstAdmin.__executeServer(opts));
var setupFirstAdmin = createServerFn({ method: "POST" }).inputValidator((d) => objectType({
	name: stringType().min(2).max(80),
	email: stringType().email().max(120),
	password: stringType().min(10).max(200)
}).parse(d)).handler(setupFirstAdmin_createServerFn_handler, async ({ data }) => {
	await ready();
	if (await hasAnyAdmin()) return {
		ok: false,
		error: "Já existe administrador."
	};
	if (isProduction() && env("ALLOW_SETUP") !== "true") return {
		ok: false,
		error: "Configure ADMIN_EMAIL/ADMIN_PASSWORD."
	};
	const u = await q1("INSERT INTO admin_users(name,email,password_hash,role) VALUES ($1,$2,$3,'admin') RETURNING id,name,email,role", [
		data.name,
		data.email.toLowerCase(),
		await hashPassword(data.password)
	]);
	startSession(u);
	await audit({
		...actor(u),
		action: "admin.setup"
	});
	return { ok: true };
});
var logout_createServerFn_handler = createServerRpc({
	id: "7c22a38a244b147aa46b746e87c79c3b801ae277b30fe90addd051105f42ea6a",
	name: "logout",
	filename: "src/lib/admin.functions.ts"
}, (opts) => logout.__executeServer(opts));
var logout = createServerFn({ method: "POST" }).handler(logout_createServerFn_handler, async () => {
	const u = await currentAdmin();
	endSession();
	if (u) await audit({
		...actor(u),
		action: "auth.logout"
	});
	return { ok: true };
});
var getDashboard_createServerFn_handler = createServerRpc({
	id: "11e6a2fd1fff029943bfdcd8ae9d8192cd136468d209063ff1004e8c8e147db6",
	name: "getDashboard",
	filename: "src/lib/admin.functions.ts"
}, (opts) => getDashboard.__executeServer(opts));
var getDashboard = createServerFn({ method: "GET" }).handler(getDashboard_createServerFn_handler, async () => {
	await requireAdmin();
	const n = async (sql) => Number((await q1(sql))?.n ?? 0);
	const [customers, active, expired, salesPaid, revenue, revenue30, pending] = await Promise.all([
		n("SELECT count(*)::text n FROM customers"),
		n("SELECT count(*)::text n FROM activations WHERE status='ativa'"),
		n("SELECT count(*)::text n FROM activations WHERE status='expirada'"),
		n("SELECT count(*)::text n FROM sales WHERE status='pago'"),
		n("SELECT coalesce(sum(amount_cents),0)::text n FROM sales WHERE status='pago'"),
		n("SELECT coalesce(sum(amount_cents),0)::text n FROM sales WHERE status='pago' AND paid_at > now() - interval '30 days'"),
		n("SELECT count(*)::text n FROM sales WHERE status='pendente'")
	]);
	return {
		customers,
		active,
		expired,
		salesPaid,
		revenue,
		revenue30,
		pending,
		expiring: await q(`SELECT a.id, a.key_last4, a.expires_at, c.name AS customer, c.whatsapp, p.name AS plan
     FROM activations a JOIN plans p ON p.id=a.plan_id LEFT JOIN customers c ON c.id=a.customer_id
     WHERE a.status='ativa' AND a.expires_at < now() + interval '7 days' ORDER BY a.expires_at LIMIT 20`),
		recentSales: await q(`SELECT s.id, s.order_number, s.amount_cents, s.status, s.created_at, c.name AS customer, p.name AS plan
     FROM sales s LEFT JOIN customers c ON c.id=s.customer_id LEFT JOIN plans p ON p.id=s.plan_id ORDER BY s.created_at DESC LIMIT 8`)
	};
});
var listCustomers_createServerFn_handler = createServerRpc({
	id: "bbbc6bac537dd93f6b1643dc038c6fb8fcc130edf741772fb605f18dd1b4445f",
	name: "listCustomers",
	filename: "src/lib/admin.functions.ts"
}, (opts) => listCustomers.__executeServer(opts));
var listCustomers = createServerFn({ method: "GET" }).handler(listCustomers_createServerFn_handler, async () => {
	await requireAdmin();
	return q(`SELECT c.*, (SELECT count(*)::int FROM activations a WHERE a.customer_id=c.id) AS activations FROM customers c ORDER BY c.created_at DESC LIMIT 500`);
});
var CustomerInput = objectType({
	id: uuid.optional(),
	name: stringType().trim().min(2).max(100),
	whatsapp: stringType().trim().regex(/^\+?\d{10,15}$/, "WhatsApp com DDI+DDD, só números"),
	email: stringType().trim().email().max(120).or(literalType("")).optional(),
	notes: stringType().max(1e3).default(""),
	status: enumType([
		"ativo",
		"inativo",
		"bloqueado"
	]).default("ativo")
});
var saveCustomer_createServerFn_handler = createServerRpc({
	id: "1f1b8b0281a452d5a0a06cc6fc7ebe7bc1a66f8145c45061f67b57c73dde3fa6",
	name: "saveCustomer",
	filename: "src/lib/admin.functions.ts"
}, (opts) => saveCustomer.__executeServer(opts));
var saveCustomer = createServerFn({ method: "POST" }).inputValidator((d) => CustomerInput.parse(d)).handler(saveCustomer_createServerFn_handler, async ({ data }) => {
	const u = await requireAdmin();
	const email = data.email ? data.email : null;
	if (data.id) {
		await q("UPDATE customers SET name=$2, whatsapp=$3, email=$4, notes=$5, status=$6 WHERE id=$1", [
			data.id,
			data.name,
			data.whatsapp,
			email,
			data.notes,
			data.status
		]);
		await audit({
			...actor(u),
			action: "customer.update",
			entity: "customer",
			entityId: data.id,
			details: { status: data.status }
		});
		return { id: data.id };
	}
	const r = await q1("INSERT INTO customers(name,whatsapp,email,notes,status) VALUES ($1,$2,$3,$4,$5) RETURNING id", [
		data.name,
		data.whatsapp,
		email,
		data.notes,
		data.status
	]);
	await audit({
		...actor(u),
		action: "customer.create",
		entity: "customer",
		entityId: r.id
	});
	return { id: r.id };
});
var listDevices_createServerFn_handler = createServerRpc({
	id: "37a6697a58f4b78e4e732d516574cb4b3ad109823d3ca0c4b4cbf1943545c1c4",
	name: "listDevices",
	filename: "src/lib/admin.functions.ts"
}, (opts) => listDevices.__executeServer(opts));
var listDevices = createServerFn({ method: "GET" }).handler(listDevices_createServerFn_handler, async () => {
	await requireAdmin();
	return q(`SELECT d.source_id, (SELECT name FROM sources WHERE id=d.source_id) AS source_name, d.id, d.display_id, d.platform, d.model, d.app_version, d.status, d.created_at, d.last_seen_at,
       (SELECT c.name FROM activations a LEFT JOIN customers c ON c.id=a.customer_id WHERE a.device_id=d.id ORDER BY a.expires_at DESC NULLS LAST LIMIT 1) AS customer,
       (SELECT a.status FROM activations a WHERE a.device_id=d.id ORDER BY a.expires_at DESC NULLS LAST LIMIT 1) AS license_status,
       (SELECT a.expires_at FROM activations a WHERE a.device_id=d.id ORDER BY a.expires_at DESC NULLS LAST LIMIT 1) AS expires_at
     FROM devices d ORDER BY d.last_seen_at DESC NULLS LAST LIMIT 500`);
});
var activateDeviceByDisplayId_createServerFn_handler = createServerRpc({
	id: "c3eca020b8864cf22ffc15170402fbe0c2e2487a67ea5d4ee12cb8d7854bf4b2",
	name: "activateDeviceByDisplayId",
	filename: "src/lib/admin.functions.ts"
}, (opts) => activateDeviceByDisplayId.__executeServer(opts));
var activateDeviceByDisplayId = createServerFn({ method: "POST" }).inputValidator((d) => objectType({
	display_id: stringType().trim().min(4).max(40),
	customer_id: uuid.nullable(),
	plan_id: uuid,
	source_id: uuid.nullable().default(null)
}).parse(d)).handler(activateDeviceByDisplayId_createServerFn_handler, async ({ data }) => {
	const u = await requireAdmin();
	const displayId = data.display_id.trim().toUpperCase();
	let device = await q1("SELECT id FROM devices WHERE upper(display_id)=upper($1)", [displayId]);
	if (!device) device = await q1(`INSERT INTO devices(display_id,platform,model,app_version,status,last_seen_at)
         VALUES ($1,'android','Aguardando aparelho','—','ativo',NULL) RETURNING id`, [displayId]);
	const plan = await q1("SELECT duration_days FROM plans WHERE id=$1 AND active", [data.plan_id]);
	if (!plan) throw new Error("Plano não encontrado ou inativo.");
	if (await q1("SELECT id FROM activations WHERE device_id=$1 AND status='ativa' AND expires_at > now() ORDER BY expires_at DESC LIMIT 1", [device.id])) throw new Error("Este MAC / Device ID já possui uma ativação ativa.");
	const key = generateActivationKey();
	const activation = await q1(`INSERT INTO activations(customer_id,plan_id,device_id,key_hash,key_last4,status,starts_at,expires_at,created_by,source_id)
       VALUES ($1,$2,$3,$4,$5,'ativa',now(),now() + ($6 || ' days')::interval,$7,$8) RETURNING id`, [
		data.customer_id,
		data.plan_id,
		device.id,
		hashKey(key),
		key.slice(-4),
		String(plan.duration_days),
		u.id,
		data.source_id
	]);
	await q("UPDATE devices SET status='ativo', source_id=$2, config_rev=config_rev+1 WHERE id=$1", [device.id, data.source_id]);
	await audit({
		...actor(u),
		action: "device.activate_by_display_id",
		entity: "activation",
		entityId: activation.id,
		details: {
			display_id: displayId,
			plan_id: data.plan_id
		}
	});
	return {
		ok: true,
		activation_id: activation.id,
		device_id: device.id
	};
});
var activateDeviceDirect_createServerFn_handler = createServerRpc({
	id: "cb36c6b39463514f2c22749742a03b971af17641764d355fb1b3267aac71c2ba",
	name: "activateDeviceDirect",
	filename: "src/lib/admin.functions.ts"
}, (opts) => activateDeviceDirect.__executeServer(opts));
var activateDeviceDirect = createServerFn({ method: "POST" }).inputValidator((d) => objectType({
	device_id: uuid,
	customer_id: uuid.nullable(),
	plan_id: uuid,
	source_id: uuid.nullable().default(null)
}).parse(d)).handler(activateDeviceDirect_createServerFn_handler, async ({ data }) => {
	const u = await requireAdmin();
	const device = await q1("SELECT id, display_id FROM devices WHERE id=$1", [data.device_id]);
	if (!device) throw new Error("Dispositivo não encontrado.");
	const plan = await q1("SELECT duration_days FROM plans WHERE id=$1 AND active", [data.plan_id]);
	if (!plan) throw new Error("Plano não encontrado ou inativo.");
	const key = generateActivationKey();
	const r = await q1(`INSERT INTO activations(customer_id,plan_id,device_id,key_hash,key_last4,status,starts_at,expires_at,created_by,source_id)
       VALUES ($1,$2,$3,$4,$5,'ativa',now(),now() + ($6 || ' days')::interval,$7,$8) RETURNING id`, [
		data.customer_id,
		data.plan_id,
		data.device_id,
		hashKey(key),
		key.slice(-4),
		String(plan.duration_days),
		u.id,
		data.source_id
	]);
	await q("UPDATE devices SET status='ativo', source_id=$2, config_rev=config_rev+1 WHERE id=$1", [data.device_id, data.source_id]);
	await audit({
		...actor(u),
		action: "device.activate_direct",
		entity: "activation",
		entityId: r.id,
		details: {
			device_id: data.device_id,
			display_id: device.display_id,
			plan_id: data.plan_id
		}
	});
	return {
		ok: true,
		activation_id: r.id
	};
});
var setDeviceStatus_createServerFn_handler = createServerRpc({
	id: "feee79c3c19e7f1350dbe0859ae3f43d11013733558e7d54eae0dbb634c83b2a",
	name: "setDeviceStatus",
	filename: "src/lib/admin.functions.ts"
}, (opts) => setDeviceStatus.__executeServer(opts));
var setDeviceStatus = createServerFn({ method: "POST" }).inputValidator((d) => objectType({
	id: uuid,
	status: enumType(["ativo", "bloqueado"])
}).parse(d)).handler(setDeviceStatus_createServerFn_handler, async ({ data }) => {
	const u = await requireAdmin(["admin"]);
	await q("UPDATE devices SET status=$2 WHERE id=$1", [data.id, data.status]);
	await audit({
		...actor(u),
		action: `device.${data.status === "bloqueado" ? "block" : "unblock"}`,
		entity: "device",
		entityId: data.id
	});
	return { ok: true };
});
var listActivations_createServerFn_handler = createServerRpc({
	id: "ee411b1eb65902ff1a3d14e18ead7a6f3a825780124da48f83f8ff27ac736213",
	name: "listActivations",
	filename: "src/lib/admin.functions.ts"
}, (opts) => listActivations.__executeServer(opts));
var listActivations = createServerFn({ method: "GET" }).handler(listActivations_createServerFn_handler, async () => {
	await requireAdmin();
	return q(`SELECT a.source_id, s.name AS source_name, a.id, a.key_last4, a.status, a.starts_at, a.expires_at, a.created_at, a.plan_id, p.name AS plan, a.customer_id, c.name AS customer, a.device_id, d.display_id, d.platform
     FROM activations a JOIN plans p ON p.id=a.plan_id LEFT JOIN customers c ON c.id=a.customer_id LEFT JOIN devices d ON d.id=a.device_id LEFT JOIN sources s ON s.id=a.source_id
     ORDER BY a.created_at DESC LIMIT 500`);
});
var createActivation_createServerFn_handler = createServerRpc({
	id: "73aa50d19eda8d7231756aaad8018530cc19a6735ca1b5f0bafa44a1801ac7a8",
	name: "createActivation",
	filename: "src/lib/admin.functions.ts"
}, (opts) => createActivation.__executeServer(opts));
var createActivation = createServerFn({ method: "POST" }).inputValidator((d) => objectType({
	customer_id: uuid.nullable(),
	plan_id: uuid,
	start_now: booleanType().default(false),
	source_id: uuid.nullable().default(null)
}).parse(d)).handler(createActivation_createServerFn_handler, async ({ data }) => {
	const u = await requireAdmin();
	const plan = await q1("SELECT duration_days FROM plans WHERE id=$1", [data.plan_id]);
	if (!plan) throw new Error("Plano não encontrado.");
	const key = generateActivationKey();
	const r = await q1(`INSERT INTO activations(customer_id,plan_id,key_hash,key_last4,status,starts_at,expires_at,created_by,source_id)
       VALUES ($1,$2,$3,$4,$5, CASE WHEN $5='ativa' THEN now() END, CASE WHEN $5='ativa' THEN now() + ($6 || ' days')::interval END, $7, $8) RETURNING id`, [
		data.customer_id,
		data.plan_id,
		hashKey(key),
		key.slice(-4),
		data.start_now ? "ativa" : "pendente",
		String(plan.duration_days),
		u.id,
		data.source_id
	]);
	await audit({
		...actor(u),
		action: "activation.create",
		entity: "activation",
		entityId: r.id,
		details: { key_last4: key.slice(-4) }
	});
	return {
		id: r.id,
		key
	};
});
var renewActivation_createServerFn_handler = createServerRpc({
	id: "928a9dc207cd4930e7d245b3bec8819c14892795788ac73abd566055fdddfd8f",
	name: "renewActivation",
	filename: "src/lib/admin.functions.ts"
}, (opts) => renewActivation.__executeServer(opts));
var renewActivation = createServerFn({ method: "POST" }).inputValidator((d) => objectType({
	id: uuid,
	days: unionType([literalType(30), literalType(365)])
}).parse(d)).handler(renewActivation_createServerFn_handler, async ({ data }) => {
	const u = await requireAdmin();
	await q(`UPDATE activations SET
         expires_at = GREATEST(coalesce(expires_at, now()), now()) + ($2 || ' days')::interval,
         starts_at = coalesce(starts_at, now()),
         status = CASE WHEN status='bloqueada' THEN 'bloqueada' ELSE 'ativa' END, updated_at=now()
       WHERE id=$1`, [data.id, String(data.days)]);
	await audit({
		...actor(u),
		action: "activation.renew",
		entity: "activation",
		entityId: data.id,
		details: { days: data.days }
	});
	return { ok: true };
});
var setActivationBlocked_createServerFn_handler = createServerRpc({
	id: "ebeed6f1e1a2be64b1e0eeb709267ada0ae50e4fe6eb0f5af14ebc11ec7672a0",
	name: "setActivationBlocked",
	filename: "src/lib/admin.functions.ts"
}, (opts) => setActivationBlocked.__executeServer(opts));
var setActivationBlocked = createServerFn({ method: "POST" }).inputValidator((d) => objectType({
	id: uuid,
	blocked: booleanType()
}).parse(d)).handler(setActivationBlocked_createServerFn_handler, async ({ data }) => {
	const u = await requireAdmin();
	if (data.blocked) await q("UPDATE activations SET status='bloqueada', updated_at=now() WHERE id=$1", [data.id]);
	else await q(`UPDATE activations SET status = CASE WHEN starts_at IS NULL THEN 'pendente' WHEN expires_at < now() THEN 'expirada' ELSE 'ativa' END, updated_at=now() WHERE id=$1`, [data.id]);
	await audit({
		...actor(u),
		action: data.blocked ? "activation.block" : "activation.unblock",
		entity: "activation",
		entityId: data.id
	});
	return { ok: true };
});
var changeActivationDevice_createServerFn_handler = createServerRpc({
	id: "284b4d861652f7bb13bde556ebbb8d8ed3780d9f2b9c1cdf3306fec0dda6c880",
	name: "changeActivationDevice",
	filename: "src/lib/admin.functions.ts"
}, (opts) => changeActivationDevice.__executeServer(opts));
var changeActivationDevice = createServerFn({ method: "POST" }).inputValidator((d) => objectType({
	id: uuid,
	display_id: stringType().trim().max(40).nullable(),
	reason: stringType().trim().min(3).max(300)
}).parse(d)).handler(changeActivationDevice_createServerFn_handler, async ({ data }) => {
	const u = await requireAdmin();
	const before = await q1("SELECT a.device_id, d.display_id FROM activations a LEFT JOIN devices d ON d.id=a.device_id WHERE a.id=$1", [data.id]);
	if (!before) throw new Error("Ativação não encontrada.");
	let newId = null;
	if (data.display_id) {
		const dev = await q1("SELECT id FROM devices WHERE upper(display_id)=upper($1)", [data.display_id]);
		if (!dev) throw new Error("Dispositivo não encontrado. Abra o app na TV para registrá-lo primeiro.");
		newId = dev.id;
	}
	await q("UPDATE activations SET device_id=$2, updated_at=now() WHERE id=$1", [data.id, newId]);
	await audit({
		...actor(u),
		action: "activation.change_device",
		entity: "activation",
		entityId: data.id,
		details: {
			from: before.display_id,
			to: data.display_id,
			reason: data.reason
		}
	});
	return { ok: true };
});
var regenerateKey_createServerFn_handler = createServerRpc({
	id: "efae2cba8bf6b240421334393f5e5214577db6dc7df6dddbcd35b4da7a2bf011",
	name: "regenerateKey",
	filename: "src/lib/admin.functions.ts"
}, (opts) => regenerateKey.__executeServer(opts));
var regenerateKey = createServerFn({ method: "POST" }).inputValidator((d) => objectType({ id: uuid }).parse(d)).handler(regenerateKey_createServerFn_handler, async ({ data }) => {
	const u = await requireAdmin(["admin"]);
	const key = generateActivationKey();
	await q("UPDATE activations SET key_hash=$2, key_last4=$3, updated_at=now() WHERE id=$1", [
		data.id,
		hashKey(key),
		key.slice(-4)
	]);
	await audit({
		...actor(u),
		action: "activation.regenerate_key",
		entity: "activation",
		entityId: data.id,
		details: { key_last4: key.slice(-4) }
	});
	return { key };
});
var listPlans_createServerFn_handler = createServerRpc({
	id: "6a4c15486b3510a7d503ea724d6da07ff761e5ad6f5d15d78fbf29f03da824a7",
	name: "listPlans",
	filename: "src/lib/admin.functions.ts"
}, (opts) => listPlans.__executeServer(opts));
var listPlans = createServerFn({ method: "GET" }).handler(listPlans_createServerFn_handler, async () => {
	await requireAdmin();
	return q("SELECT id, code, name, description, duration_days, price_cents, highlight, active, sort FROM plans ORDER BY sort, duration_days");
});
var savePlan_createServerFn_handler = createServerRpc({
	id: "5f1d95ccfc76f6049488a31da4444963902deebaf99d1eeec2578bb507452601",
	name: "savePlan",
	filename: "src/lib/admin.functions.ts"
}, (opts) => savePlan.__executeServer(opts));
var savePlan = createServerFn({ method: "POST" }).inputValidator((d) => objectType({
	id: uuid.optional(),
	code: stringType().trim().regex(/^[a-z0-9-]{2,30}$/),
	name: stringType().trim().min(2).max(40),
	description: stringType().max(300).default(""),
	duration_days: numberType().int().min(1).max(3650),
	price_cents: numberType().int().min(0).max(1e7),
	highlight: booleanType(),
	active: booleanType(),
	sort: numberType().int().min(0).max(999)
}).parse(d)).handler(savePlan_createServerFn_handler, async ({ data }) => {
	const u = await requireAdmin(["admin"]);
	if (data.id) await q("UPDATE plans SET code=$2,name=$3,description=$4,duration_days=$5,price_cents=$6,highlight=$7,active=$8,sort=$9,updated_at=now() WHERE id=$1", [
		data.id,
		data.code,
		data.name,
		data.description,
		data.duration_days,
		data.price_cents,
		data.highlight,
		data.active,
		data.sort
	]);
	else await q("INSERT INTO plans(code,name,description,duration_days,price_cents,highlight,active,sort) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)", [
		data.code,
		data.name,
		data.description,
		data.duration_days,
		data.price_cents,
		data.highlight,
		data.active,
		data.sort
	]);
	await audit({
		...actor(u),
		action: data.id ? "plan.update" : "plan.create",
		entity: "plan",
		entityId: data.id ?? null,
		details: { price_cents: data.price_cents }
	});
	return { ok: true };
});
var listSales_createServerFn_handler = createServerRpc({
	id: "cfec4b59a1c318a4e5dd66d8040166f8097da9a9e261071cceafdf956af5b6dc",
	name: "listSales",
	filename: "src/lib/admin.functions.ts"
}, (opts) => listSales.__executeServer(opts));
var listSales = createServerFn({ method: "GET" }).handler(listSales_createServerFn_handler, async () => {
	await requireAdmin();
	return q(`SELECT s.id, s.order_number, s.amount_cents, s.status, s.payment_method, s.created_at, s.paid_at, s.activation_id,
       c.name AS customer, p.name AS plan, cp.code AS coupon, u.name AS seller
     FROM sales s LEFT JOIN customers c ON c.id=s.customer_id LEFT JOIN plans p ON p.id=s.plan_id
     LEFT JOIN coupons cp ON cp.id=s.coupon_id LEFT JOIN admin_users u ON u.id=s.seller_id
     ORDER BY s.created_at DESC LIMIT 500`);
});
var createSale_createServerFn_handler = createServerRpc({
	id: "99802eb76ec666c3288b05c5dd6fade86646b81bbc11eb5c7eac9f56be96868b",
	name: "createSale",
	filename: "src/lib/admin.functions.ts"
}, (opts) => createSale.__executeServer(opts));
var createSale = createServerFn({ method: "POST" }).inputValidator((d) => objectType({
	customer_id: uuid,
	plan_id: uuid,
	coupon_code: stringType().trim().max(30).optional(),
	payment_method: enumType([
		"pix",
		"dinheiro",
		"cartao",
		"transferencia",
		"outro"
	]),
	status: enumType(["pendente", "pago"])
}).parse(d)).handler(createSale_createServerFn_handler, async ({ data }) => {
	const u = await requireAdmin();
	const plan = await q1("SELECT price_cents FROM plans WHERE id=$1", [data.plan_id]);
	if (!plan) throw new Error("Plano não encontrado.");
	let amount = plan.price_cents;
	let couponId = null;
	if (data.coupon_code) {
		const c = await q1("SELECT id, percent_off FROM coupons WHERE upper(code)=upper($1) AND active AND (expires_at IS NULL OR expires_at > now()) AND (max_uses IS NULL OR uses < max_uses)", [data.coupon_code]);
		if (!c) throw new Error("Cupom inválido ou esgotado.");
		couponId = c.id;
		amount = Math.round(amount * (100 - c.percent_off) / 100);
		await q("UPDATE coupons SET uses=uses+1 WHERE id=$1", [c.id]);
	}
	const r = await q1(`INSERT INTO sales(order_number,customer_id,plan_id,coupon_id,amount_cents,status,payment_method,seller_id,paid_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8, CASE WHEN $6='pago' THEN now() END) RETURNING id, order_number`, [
		orderNumber(),
		data.customer_id,
		data.plan_id,
		couponId,
		amount,
		data.status,
		data.payment_method,
		u.id
	]);
	await audit({
		...actor(u),
		action: "sale.create",
		entity: "sale",
		entityId: r.id,
		details: {
			amount_cents: amount,
			status: data.status
		}
	});
	return r;
});
var setSaleStatus_createServerFn_handler = createServerRpc({
	id: "a69b68940b33d587d1b0d4ed1ea45d3577206254f38fb9733390123c67913763",
	name: "setSaleStatus",
	filename: "src/lib/admin.functions.ts"
}, (opts) => setSaleStatus.__executeServer(opts));
var setSaleStatus = createServerFn({ method: "POST" }).inputValidator((d) => objectType({
	id: uuid,
	status: enumType([
		"pendente",
		"pago",
		"cancelado"
	]),
	generate_key: booleanType().default(false)
}).parse(d)).handler(setSaleStatus_createServerFn_handler, async ({ data }) => {
	const u = await requireAdmin();
	await q("UPDATE sales SET status=$2, paid_at = CASE WHEN $2='pago' THEN coalesce(paid_at, now()) ELSE paid_at END WHERE id=$1", [data.id, data.status]);
	let key = null;
	if (data.status === "pago" && data.generate_key) {
		const s = await q1("SELECT customer_id, plan_id, activation_id FROM sales WHERE id=$1", [data.id]);
		if (s && !s.activation_id) {
			key = generateActivationKey();
			const a = await q1("INSERT INTO activations(customer_id,plan_id,key_hash,key_last4,status,created_by) VALUES ($1,$2,$3,$4,'pendente',$5) RETURNING id", [
				s.customer_id,
				s.plan_id,
				hashKey(key),
				key.slice(-4),
				u.id
			]);
			await q("UPDATE sales SET activation_id=$2 WHERE id=$1", [data.id, a.id]);
		}
	}
	await audit({
		...actor(u),
		action: "sale.status",
		entity: "sale",
		entityId: data.id,
		details: {
			status: data.status,
			key_last4: key?.slice(-4) ?? null
		}
	});
	return { key };
});
var listCoupons_createServerFn_handler = createServerRpc({
	id: "5be0bc667c26e29e57bc08b777386155f5971b8e88aed68fb3ca925393a8ae81",
	name: "listCoupons",
	filename: "src/lib/admin.functions.ts"
}, (opts) => listCoupons.__executeServer(opts));
var listCoupons = createServerFn({ method: "GET" }).handler(listCoupons_createServerFn_handler, async () => {
	await requireAdmin();
	return q("SELECT id, code, percent_off, max_uses, uses, expires_at, active FROM coupons ORDER BY created_at DESC");
});
var saveCoupon_createServerFn_handler = createServerRpc({
	id: "7d200662f95d083d3ec6289006d6775af2f59f731bf9975c50d4270c46c9c00e",
	name: "saveCoupon",
	filename: "src/lib/admin.functions.ts"
}, (opts) => saveCoupon.__executeServer(opts));
var saveCoupon = createServerFn({ method: "POST" }).inputValidator((d) => objectType({
	id: uuid.optional(),
	code: stringType().trim().toUpperCase().regex(/^[A-Z0-9_-]{3,30}$/),
	percent_off: numberType().int().min(1).max(100),
	max_uses: numberType().int().min(1).nullable(),
	expires_at: stringType().nullable(),
	active: booleanType()
}).parse(d)).handler(saveCoupon_createServerFn_handler, async ({ data }) => {
	const u = await requireAdmin(["admin"]);
	const exp = data.expires_at ? new Date(data.expires_at).toISOString() : null;
	if (data.id) await q("UPDATE coupons SET code=$2,percent_off=$3,max_uses=$4,expires_at=$5,active=$6 WHERE id=$1", [
		data.id,
		data.code,
		data.percent_off,
		data.max_uses,
		exp,
		data.active
	]);
	else await q("INSERT INTO coupons(code,percent_off,max_uses,expires_at,active) VALUES ($1,$2,$3,$4,$5)", [
		data.code,
		data.percent_off,
		data.max_uses,
		exp,
		data.active
	]);
	await audit({
		...actor(u),
		action: data.id ? "coupon.update" : "coupon.create",
		entity: "coupon",
		entityId: data.id ?? null,
		details: { code: data.code }
	});
	return { ok: true };
});
var listUsers_createServerFn_handler = createServerRpc({
	id: "ae1d531e1714d053869d1e069815a71e199346ef621d80ab0f46be85080718ab",
	name: "listUsers",
	filename: "src/lib/admin.functions.ts"
}, (opts) => listUsers.__executeServer(opts));
var listUsers = createServerFn({ method: "GET" }).handler(listUsers_createServerFn_handler, async () => {
	await requireAdmin(["admin"]);
	return q("SELECT id, name, email, role, active, created_at, last_login_at FROM admin_users ORDER BY created_at");
});
var saveUser_createServerFn_handler = createServerRpc({
	id: "e80a7ac87c9a302fc9a7840d3333e8cff0e60218c059c3681396154d351abd97",
	name: "saveUser",
	filename: "src/lib/admin.functions.ts"
}, (opts) => saveUser.__executeServer(opts));
var saveUser = createServerFn({ method: "POST" }).inputValidator((d) => objectType({
	id: uuid.optional(),
	name: stringType().trim().min(2).max(80),
	email: stringType().trim().email().max(120),
	role: enumType(["admin", "vendedor"]),
	active: booleanType(),
	password: stringType().min(10).max(200).optional().or(literalType(""))
}).parse(d)).handler(saveUser_createServerFn_handler, async ({ data }) => {
	const u = await requireAdmin(["admin"]);
	if (data.id === u.id && (!data.active || data.role !== "admin")) throw new Error("Você não pode remover seu próprio acesso de admin.");
	if (data.id) {
		await q("UPDATE admin_users SET name=$2,email=$3,role=$4,active=$5 WHERE id=$1", [
			data.id,
			data.name,
			data.email.toLowerCase(),
			data.role,
			data.active
		]);
		if (data.password) await q("UPDATE admin_users SET password_hash=$2 WHERE id=$1", [data.id, await hashPassword(data.password)]);
	} else {
		if (!data.password) throw new Error("Senha obrigatória (mín. 10 caracteres).");
		await q("INSERT INTO admin_users(name,email,password_hash,role,active) VALUES ($1,$2,$3,$4,$5)", [
			data.name,
			data.email.toLowerCase(),
			await hashPassword(data.password),
			data.role,
			data.active
		]);
	}
	await audit({
		...actor(u),
		action: data.id ? "user.update" : "user.create",
		entity: "admin_user",
		entityId: data.id ?? null,
		details: {
			email: data.email,
			role: data.role
		}
	});
	return { ok: true };
});
var getSettingsAdmin_createServerFn_handler = createServerRpc({
	id: "c58b4c11eb85c44781657b98c3a546fdabeb9514fe85c2963a862aef7e654007",
	name: "getSettingsAdmin",
	filename: "src/lib/admin.functions.ts"
}, (opts) => getSettingsAdmin.__executeServer(opts));
var getSettingsAdmin = createServerFn({ method: "GET" }).handler(getSettingsAdmin_createServerFn_handler, async () => {
	await requireAdmin(["admin"]);
	const rows = await q("SELECT key, value FROM settings");
	return Object.fromEntries(rows.map((r) => [r.key, r.value]));
});
var saveSettings_createServerFn_handler = createServerRpc({
	id: "4fd75b29b7e95d89fa1c14c63821ab2c1ba9b2c0d3915ece8fe8ff7e18fe35cb",
	name: "saveSettings",
	filename: "src/lib/admin.functions.ts"
}, (opts) => saveSettings.__executeServer(opts));
var saveSettings = createServerFn({ method: "POST" }).inputValidator((d) => objectType({
	brand_name: stringType().trim().min(2).max(40),
	whatsapp_number: stringType().trim().regex(/^(\d{10,15})?$/, "Somente números com DDI (ex: 5511999999999)"),
	whatsapp_message: stringType().trim().max(300),
	support_hours: stringType().trim().max(80)
}).parse(d)).handler(saveSettings_createServerFn_handler, async ({ data }) => {
	const u = await requireAdmin(["admin"]);
	for (const [k, v] of Object.entries(data)) await q("INSERT INTO settings(key,value) VALUES ($1,$2) ON CONFLICT (key) DO UPDATE SET value=EXCLUDED.value", [k, v]);
	await audit({
		...actor(u),
		action: "settings.update",
		entity: "settings",
		details: data
	});
	return { ok: true };
});
var listAudit_createServerFn_handler = createServerRpc({
	id: "467f84d6d531fdce76f0581f425531ca1e810bf08231fdda18eb058ea8dfbac5",
	name: "listAudit",
	filename: "src/lib/admin.functions.ts"
}, (opts) => listAudit.__executeServer(opts));
var listAudit = createServerFn({ method: "GET" }).handler(listAudit_createServerFn_handler, async () => {
	await requireAdmin(["admin"]);
	return q("SELECT id::text, actor_type, actor_label, action, entity, entity_id, details::text AS details, created_at::text AS created_at FROM audit_logs ORDER BY id DESC LIMIT 300");
});
var listSources_createServerFn_handler = createServerRpc({
	id: "efd96b6bfc7cd77f8b9591c31b08ea5613ac244e8aee4ef2a5bbb26fb1f24ffd",
	name: "listSources",
	filename: "src/lib/admin.functions.ts"
}, (opts) => listSources.__executeServer(opts));
var listSources = createServerFn({ method: "GET" }).handler(listSources_createServerFn_handler, async () => {
	await requireAdmin();
	return q(`SELECT s.id, s.name, s.type, s.customer_id, c.name AS customer, s.display_hint, s.version, s.updated_at::text AS updated_at,
       (SELECT count(*)::int FROM activations a WHERE a.source_id=s.id) AS activations,
       (SELECT count(*)::int FROM devices d WHERE d.source_id=s.id) AS devices
     FROM sources s LEFT JOIN customers c ON c.id=s.customer_id ORDER BY s.updated_at DESC`);
});
var httpUrl = stringType().trim().url().max(500).refine((u) => /^https?:\/\//i.test(u), "Use http(s)://");
var saveSource_createServerFn_handler = createServerRpc({
	id: "bcfa4267e66ec3a19ad39d421b6708fe9015f6f27785bab1b16ad2c1162b64e9",
	name: "saveSource",
	filename: "src/lib/admin.functions.ts"
}, (opts) => saveSource.__executeServer(opts));
var saveSource = createServerFn({ method: "POST" }).inputValidator((d) => objectType({
	id: uuid.optional(),
	name: stringType().trim().min(2).max(80),
	type: enumType(["m3u", "xtream"]),
	customer_id: uuid.nullable(),
	m3u_url: httpUrl.optional().or(literalType("")),
	epg_url: httpUrl.optional().or(literalType("")),
	server: httpUrl.optional().or(literalType("")),
	username: stringType().trim().max(120).optional(),
	password: stringType().max(200).optional()
}).parse(d)).handler(saveSource_createServerFn_handler, async ({ data }) => {
	const u = await requireAdmin();
	const { encryptPayload, decryptPayload, displayHint } = await import("./sources.server-DwelJx91.mjs").then((n) => n.n);
	let current = null;
	if (data.id) {
		const row = await q1("SELECT payload_enc, type FROM sources WHERE id=$1", [data.id]);
		if (!row) throw new Error("Fonte não encontrada.");
		if (row.type === data.type) current = decryptPayload(row.payload_enc);
	}
	let payload;
	if (data.type === "m3u") {
		const prev = current?.type === "m3u" ? current : null;
		const url = data.m3u_url || prev?.m3u_url;
		if (!url) throw new Error("Informe a URL M3U autorizada.");
		const epg = data.epg_url || prev?.epg_url;
		payload = epg ? {
			type: "m3u",
			m3u_url: url,
			epg_url: epg
		} : {
			type: "m3u",
			m3u_url: url
		};
	} else {
		const prev = current?.type === "xtream" ? current : null;
		const server = data.server || prev?.server;
		const username = data.username || prev?.username;
		const password = data.password || prev?.password;
		if (!server || !username || !password) throw new Error("Informe servidor, usuário e senha Xtream autorizados.");
		payload = {
			type: "xtream",
			server: server.replace(/\/+$/, ""),
			username,
			password
		};
	}
	const enc = encryptPayload(payload);
	const hint = displayHint(payload);
	let id = data.id;
	if (id) await q("UPDATE sources SET name=$2,type=$3,customer_id=$4,payload_enc=$5,display_hint=$6,version=version+1,updated_at=now() WHERE id=$1", [
		id,
		data.name,
		data.type,
		data.customer_id,
		enc,
		hint
	]);
	else id = (await q1("INSERT INTO sources(name,type,customer_id,payload_enc,display_hint) VALUES ($1,$2,$3,$4,$5) RETURNING id", [
		data.name,
		data.type,
		data.customer_id,
		enc,
		hint
	])).id;
	await audit({
		...actor(u),
		action: data.id ? "source.update" : "source.create",
		entity: "source",
		entityId: id,
		details: {
			name: data.name,
			type: data.type
		}
	});
	return { id };
});
var deleteSource_createServerFn_handler = createServerRpc({
	id: "49b12827469d696a322522d244d8b7f467ee584ed3dc5228a225e118af83c8ac",
	name: "deleteSource",
	filename: "src/lib/admin.functions.ts"
}, (opts) => deleteSource.__executeServer(opts));
var deleteSource = createServerFn({ method: "POST" }).inputValidator((d) => objectType({ id: uuid }).parse(d)).handler(deleteSource_createServerFn_handler, async ({ data }) => {
	const u = await requireAdmin();
	await q("UPDATE activations SET source_id=NULL, config_rev=config_rev+1 WHERE source_id=$1", [data.id]);
	await q("UPDATE devices SET source_id=NULL, config_rev=config_rev+1 WHERE source_id=$1", [data.id]);
	await q("DELETE FROM sources WHERE id=$1", [data.id]);
	await audit({
		...actor(u),
		action: "source.delete",
		entity: "source",
		entityId: data.id
	});
	return { ok: true };
});
var assignSource_createServerFn_handler = createServerRpc({
	id: "1d5c59ed6c4ec656ddd06fd43ec0a9e8f59495143e31696bcf2d7def517b367b",
	name: "assignSource",
	filename: "src/lib/admin.functions.ts"
}, (opts) => assignSource.__executeServer(opts));
var assignSource = createServerFn({ method: "POST" }).inputValidator((d) => objectType({
	target: enumType(["activation", "device"]),
	id: uuid,
	source_id: uuid.nullable()
}).parse(d)).handler(assignSource_createServerFn_handler, async ({ data }) => {
	const u = await requireAdmin();
	const table = data.target === "activation" ? "activations" : "devices";
	await q(`UPDATE ${table} SET source_id=$2, config_rev=config_rev+1 WHERE id=$1`, [data.id, data.source_id]);
	await audit({
		...actor(u),
		action: data.source_id ? "source.assign" : "source.unassign",
		entity: data.target,
		entityId: data.id,
		details: { source_id: data.source_id }
	});
	return { ok: true };
});
var forceSync_createServerFn_handler = createServerRpc({
	id: "df8b4326699fdbf0d6dc3c19070d34e75baf9b8d224f4649b3039284e2d4c51f",
	name: "forceSync",
	filename: "src/lib/admin.functions.ts"
}, (opts) => forceSync.__executeServer(opts));
var forceSync = createServerFn({ method: "POST" }).inputValidator((d) => objectType({
	target: enumType(["activation", "device"]),
	id: uuid
}).parse(d)).handler(forceSync_createServerFn_handler, async ({ data }) => {
	const u = await requireAdmin();
	await q(`UPDATE ${data.target === "activation" ? "activations" : "devices"} SET config_rev=config_rev+1 WHERE id=$1`, [data.id]);
	await audit({
		...actor(u),
		action: "source.force_sync",
		entity: data.target,
		entityId: data.id
	});
	return { ok: true };
});
//#endregion
export { activateDeviceByDisplayId_createServerFn_handler, activateDeviceDirect_createServerFn_handler, assignSource_createServerFn_handler, changeActivationDevice_createServerFn_handler, createActivation_createServerFn_handler, createSale_createServerFn_handler, deleteSource_createServerFn_handler, forceSync_createServerFn_handler, getDashboard_createServerFn_handler, getSession_createServerFn_handler, getSettingsAdmin_createServerFn_handler, listActivations_createServerFn_handler, listAudit_createServerFn_handler, listCoupons_createServerFn_handler, listCustomers_createServerFn_handler, listDevices_createServerFn_handler, listPlans_createServerFn_handler, listSales_createServerFn_handler, listSources_createServerFn_handler, listUsers_createServerFn_handler, login_createServerFn_handler, logout_createServerFn_handler, regenerateKey_createServerFn_handler, renewActivation_createServerFn_handler, saveCoupon_createServerFn_handler, saveCustomer_createServerFn_handler, savePlan_createServerFn_handler, saveSettings_createServerFn_handler, saveSource_createServerFn_handler, saveUser_createServerFn_handler, setActivationBlocked_createServerFn_handler, setDeviceStatus_createServerFn_handler, setSaleStatus_createServerFn_handler, setupFirstAdmin_createServerFn_handler };
