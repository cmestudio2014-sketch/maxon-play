import { l as createServerFn } from "./createServerFn-DDDJMFWM.mjs";
import { a as numberType, c as unionType, i as literalType, n as booleanType, o as objectType, r as enumType, s as stringType, t as arrayType } from "../_libs/zod.mjs";
import { n as getCookie, o as setCookie$1, r as getRequestIP$1, t as deleteCookie$1 } from "./request-response-CG_yhwzM.mjs";
import { t as createServerRpc } from "./createServerRpc-CxD4EZ5P.mjs";
import { _ as verifyJwt, a as generateActivationKey, c as isProduction, d as q, f as q1, g as sweepExpired, h as signJwt, i as env, m as ready, o as hashKey, p as rateLimit, s as hashPassword, u as orderNumber, v as verifyPassword } from "./ratelimit.server-Bwk2PF-V.mjs";
import { t as audit } from "./audit.server-Oy8fc_dY.mjs";
import { hasAnyAdmin } from "./bootstrap.server-BQbw6Uxm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.functions-DESgGBUu.js
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
	let appUsername = "";
	let appPassword = "";
	for (let tentativa = 0; tentativa < 100; tentativa++) {
		const candidato = String(Math.floor(1e4 + Math.random() * 9e4));
		if (!await q1(`SELECT id FROM customers WHERE app_username=$1 LIMIT 1`, [candidato])) {
			appUsername = candidato;
			break;
		}
	}
	if (!appUsername) throw new Error("Nao foi possivel gerar usuario unico");
	appPassword = String(Math.floor(1e4 + Math.random() * 9e4));
	const r = await q1(`INSERT INTO customers
       (name,whatsapp,email,notes,status,app_username,app_password)
       VALUES ($1,$2,$3,$4,$5,$6,$7)
       RETURNING id`, [
		data.name,
		data.whatsapp,
		email,
		data.notes,
		data.status,
		appUsername,
		appPassword
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
var listProviderServers_createServerFn_handler = createServerRpc({
	id: "72c30f6f754debf6958ec98b8bae7b18fe4bb4c3daf6a257127254200b65a169",
	name: "listProviderServers",
	filename: "src/lib/admin.functions.ts"
}, (opts) => listProviderServers.__executeServer(opts));
var listProviderServers = createServerFn({ method: "GET" }).handler(listProviderServers_createServerFn_handler, async () => {
	await requireAdmin();
	return q("SELECT id,name,base_url,priority,active,updated_at::text AS updated_at,health_status,health_http,health_latency_ms,health_checked_at::text AS health_checked_at FROM provider_servers ORDER BY priority,name");
});
var providerServerUrl = stringType().trim().url().max(500).refine((u) => /^https?:\/\//i.test(u), "Use http(s)://");
function privateIp(ip) {
	const x = ip.toLowerCase();
	if (x === "::1" || x === "0.0.0.0" || x.startsWith("127.") || x.startsWith("10.") || x.startsWith("192.168.") || x.startsWith("169.254.")) return true;
	const m = x.match(/^172\.(\d+)\./);
	if (m && Number(m[1]) >= 16 && Number(m[1]) <= 31) return true;
	if (x.startsWith("fc") || x.startsWith("fd") || x.startsWith("fe80:")) return true;
	return false;
}
async function assertPublicHost(url) {
	const { lookup } = await import("node:dns/promises");
	const { isIP } = await import("node:net");
	if (["localhost", "localhost.localdomain"].includes(url.hostname.toLowerCase())) throw new Error("Destino local não permitido.");
	const addresses = isIP(url.hostname) ? [{ address: url.hostname }] : await lookup(url.hostname, { all: true });
	if (!addresses.length || addresses.some((a) => privateIp(a.address))) throw new Error("Destino privado/local não permitido.");
}
async function probeServer(baseUrl) {
	let current = new URL(baseUrl);
	const started = Date.now();
	let response = null;
	for (let redirect = 0; redirect < 4; redirect++) {
		await assertPublicHost(current);
		response = await fetch(current, {
			method: "GET",
			redirect: "manual",
			signal: AbortSignal.timeout(8e3),
			headers: {
				"user-agent": "MAXON-PLAY-ServerCheck/1.0",
				accept: "*/*"
			}
		});
		if (![
			301,
			302,
			303,
			307,
			308
		].includes(response.status)) break;
		const location = response.headers.get("location");
		if (!location) break;
		current = new URL(location, current);
	}
	const latency = Date.now() - started;
	const http = response?.status ?? null;
	const status = http && http >= 200 && http < 400 ? "online" : http ? "respondeu" : "offline";
	try {
		await response?.body?.cancel();
	} catch {}
	return {
		status,
		http,
		latency
	};
}
var testProviderServer_createServerFn_handler = createServerRpc({
	id: "142dffac6c30232acc08d8a3358c5f05105ab20d0327a68dff47080a638c7af9",
	name: "testProviderServer",
	filename: "src/lib/admin.functions.ts"
}, (opts) => testProviderServer.__executeServer(opts));
var testProviderServer = createServerFn({ method: "POST" }).inputValidator((d) => objectType({ id: uuid }).parse(d)).handler(testProviderServer_createServerFn_handler, async ({ data }) => {
	const u = await requireAdmin(["admin"]);
	const row = await q1("SELECT id,name,base_url FROM provider_servers WHERE id=$1", [data.id]);
	if (!row) throw new Error("Servidor não encontrado.");
	let result;
	try {
		const r = await probeServer(row.base_url);
		result = {
			status: r.status,
			http: r.http,
			latency: r.latency
		};
	} catch (e) {
		result = {
			status: "offline",
			http: null,
			latency: null,
			error: e instanceof Error ? e.message : "Falha no teste"
		};
	}
	await q("UPDATE provider_servers SET health_status=$2,health_http=$3,health_latency_ms=$4,health_checked_at=now() WHERE id=$1", [
		data.id,
		result.status,
		result.http,
		result.latency
	]);
	await audit({
		...actor(u),
		action: "server.test",
		entity: "provider_server",
		entityId: data.id,
		details: {
			status: result.status,
			http: result.http,
			latency_ms: result.latency
		}
	});
	return result;
});
var saveProviderServer_createServerFn_handler = createServerRpc({
	id: "66ac44d69decd3b8a6e77bcd7e86bad44a84fd692bbc4eb2725a32afc0e0807b",
	name: "saveProviderServer",
	filename: "src/lib/admin.functions.ts"
}, (opts) => saveProviderServer.__executeServer(opts));
var saveProviderServer = createServerFn({ method: "POST" }).inputValidator((d) => objectType({
	id: uuid.optional(),
	name: stringType().trim().min(2).max(80),
	base_url: providerServerUrl,
	priority: numberType().int().min(1).max(999),
	active: booleanType()
}).parse(d)).handler(saveProviderServer_createServerFn_handler, async ({ data }) => {
	const u = await requireAdmin(["admin"]);
	const baseUrl = data.base_url.replace(/\/+$/, "");
	let id = data.id;
	if (id) await q("UPDATE provider_servers SET name=$2,base_url=$3,priority=$4,active=$5,health_status=NULL,health_http=NULL,health_latency_ms=NULL,health_checked_at=NULL,updated_at=now() WHERE id=$1", [
		id,
		data.name,
		baseUrl,
		data.priority,
		data.active
	]);
	else id = (await q1("INSERT INTO provider_servers(name,base_url,priority,active) VALUES ($1,$2,$3,$4) RETURNING id", [
		data.name,
		baseUrl,
		data.priority,
		data.active
	])).id;
	await audit({
		...actor(u),
		action: data.id ? "server.update" : "server.create",
		entity: "provider_server",
		entityId: id,
		details: {
			name: data.name,
			priority: data.priority,
			active: data.active
		}
	});
	return { id };
});
var deleteProviderServer_createServerFn_handler = createServerRpc({
	id: "d45376b0f4b5e6f0a3c5b41955f5a3945e3e22777b70cc6a207bbf27e7326587",
	name: "deleteProviderServer",
	filename: "src/lib/admin.functions.ts"
}, (opts) => deleteProviderServer.__executeServer(opts));
var deleteProviderServer = createServerFn({ method: "POST" }).inputValidator((d) => objectType({ id: uuid }).parse(d)).handler(deleteProviderServer_createServerFn_handler, async ({ data }) => {
	const u = await requireAdmin(["admin"]);
	await q("DELETE FROM provider_servers WHERE id=$1", [data.id]);
	await audit({
		...actor(u),
		action: "server.delete",
		entity: "provider_server",
		entityId: data.id
	});
	return { ok: true };
});
function catalogPrivateIp(ip) {
	const x = ip.toLowerCase();
	if (x === "::1" || x === "0.0.0.0" || x.startsWith("127.") || x.startsWith("10.") || x.startsWith("192.168.") || x.startsWith("169.254.")) return true;
	const m = x.match(/^172\.(\d+)\./);
	if (m && Number(m[1]) >= 16 && Number(m[1]) <= 31) return true;
	return x.startsWith("fc") || x.startsWith("fd") || x.startsWith("fe80:");
}
async function catalogAssertPublic(url) {
	const { lookup } = await import("node:dns/promises");
	const { isIP } = await import("node:net");
	const a = isIP(url.hostname) ? [{ address: url.hostname }] : await lookup(url.hostname, { all: true });
	if (!a.length || a.some((x) => catalogPrivateIp(x.address))) throw new Error("Destino privado/local não permitido.");
}
async function catalogFetch(url) {
	let u = new URL(url);
	for (let i = 0; i < 4; i++) {
		await catalogAssertPublic(u);
		const r = await fetch(u, {
			redirect: "manual",
			signal: AbortSignal.timeout(15e3),
			headers: {
				"user-agent": "MAXON-PLAY-Catalog/1.0",
				accept: "*/*"
			}
		});
		if ([
			301,
			302,
			303,
			307,
			308
		].includes(r.status)) {
			const l = r.headers.get("location");
			if (!l) return r;
			u = new URL(l, u);
			continue;
		}
		return r;
	}
	throw new Error("Muitos redirecionamentos.");
}
function attr(line, key) {
	return line.match(new RegExp(key + "=\"([^\"]*)\"", "i"))?.[1]?.trim() || "";
}
function safeName(v, fallback) {
	return String(v ?? fallback).trim().slice(0, 180) || fallback;
}
var importSourceCatalog_createServerFn_handler = createServerRpc({
	id: "d85369a747abb62679995a152796f40482551f8e74df7283bde73062f03006b6",
	name: "importSourceCatalog",
	filename: "src/lib/admin.functions.ts"
}, (opts) => importSourceCatalog.__executeServer(opts));
var importSourceCatalog = createServerFn({ method: "POST" }).inputValidator((d) => objectType({ source_id: uuid }).parse(d)).handler(importSourceCatalog_createServerFn_handler, async ({ data }) => {
	const u = await requireAdmin(["admin"]);
	const row = await q1("SELECT id,name,payload_enc FROM sources WHERE id=$1", [data.source_id]);
	if (!row) throw new Error("Fonte não encontrada.");
	const { decryptPayload } = await import("./sources.server-CRJr63sN.mjs").then((n) => n.n);
	const p = decryptPayload(row.payload_enc);
	const items = [];
	if (p.type === "m3u") {
		const r = await catalogFetch(p.m3u_url);
		if (!r.ok) throw new Error(`Fonte respondeu HTTP ${r.status}.`);
		const lines = (await r.text()).slice(0, 25e6).split(/\r?\n/);
		const { createHash } = await import("node:crypto");
		for (let i = 0; i < lines.length && items.length < 3e4; i++) {
			const l = lines[i].trim();
			if (!l.startsWith("#EXTINF:")) continue;
			let j = i + 1;
			while (j < lines.length && (!lines[j].trim() || lines[j].trim().startsWith("#"))) j++;
			const stream = lines[j]?.trim();
			if (!stream || !/^https?:\/\//i.test(stream)) continue;
			const name = safeName(l.split(",").slice(1).join(","), "Canal");
			const category = safeName(attr(l, "group-title"), "Sem categoria");
			const key = createHash("sha256").update(stream).digest("hex").slice(0, 32);
			const probe = (name + " " + category).toLowerCase();
			const kindGuess = /\b(series?|séries?|temporadas?|novelas?|animes?)\b|\bs\d{1,2}\b|\btemporada\b/i.test(probe) ? "series" : /\b(filmes?|movies?|cinema|vod)\b/i.test(probe) ? "movie" : "live";
			items.push({
				external_key: key,
				kind: kindGuess,
				name,
				category,
				stream_ref: stream
			});
		}
	} else {
		const base = p.server.replace(/\/+$/, "");
		const auth = `username=${encodeURIComponent(p.username)}&password=${encodeURIComponent(p.password)}`;
		const endpoints = [
			["get_live_streams", "live"],
			["get_vod_streams", "movie"],
			["get_series", "series"]
		];
		const categories = /* @__PURE__ */ new Map();
		for (const [action, kind] of endpoints) {
			const cr = await catalogFetch(`${base}/player_api.php?${auth}&action=get_${kind === "live" ? "live" : kind === "movie" ? "vod" : "series"}_categories`);
			if (cr.ok) for (const c of await cr.json()) categories.set(`${kind}:${c.category_id}`, safeName(c.category_name, "Sem categoria"));
			const r = await catalogFetch(`${base}/player_api.php?${auth}&action=${action}`);
			if (!r.ok) continue;
			const arr = await r.json();
			for (const x of arr.slice(0, 3e4 - items.length)) {
				const raw = kind === "series" ? x.series_id : x.stream_id;
				if (raw == null) continue;
				const ext = String(x.container_extension || "").replace(/[^a-zA-Z0-9]/g, "") || (kind === "live" ? "ts" : "mp4");
				const streamRef = kind === "series" ? void 0 : `${base}/${kind === "live" ? "live" : "movie"}/${encodeURIComponent(p.username)}/${encodeURIComponent(p.password)}/${raw}.${ext}`;
				items.push({
					external_key: `${kind}:${String(raw)}`,
					kind,
					name: safeName(x.name, kind === "live" ? "Canal" : kind === "movie" ? "Filme" : "Série"),
					category: categories.get(`${kind}:${x.category_id}`) || "Sem categoria",
					stream_ref: streamRef
				});
			}
		}
	}
	await q("DELETE FROM source_catalog_items WHERE source_id=$1", [data.source_id]);
	const { encryptSecret } = await import("./sources.server-CRJr63sN.mjs").then((n) => n.n);
	for (const x of items) await q("INSERT INTO source_catalog_items(source_id,external_key,kind,name,category,stream_ref_enc) VALUES ($1,$2,$3,$4,$5,$6) ON CONFLICT(source_id,external_key) DO UPDATE SET kind=EXCLUDED.kind,name=EXCLUDED.name,category=EXCLUDED.category,stream_ref_enc=EXCLUDED.stream_ref_enc,imported_at=now()", [
		data.source_id,
		x.external_key,
		x.kind,
		x.name,
		x.category,
		x.stream_ref ? encryptSecret(x.stream_ref) : null
	]);
	await audit({
		...actor(u),
		action: "source.catalog_import",
		entity: "source",
		entityId: data.source_id,
		details: { items: items.length }
	});
	return {
		ok: true,
		count: items.length
	};
});
var listPlaylistCategories_createServerFn_handler = createServerRpc({
	id: "64fc3abdb09c66f66ee2025b01999c3f1d6d5fe4a088d307e66f87b15d6d324c",
	name: "listPlaylistCategories",
	filename: "src/lib/admin.functions.ts"
}, (opts) => listPlaylistCategories.__executeServer(opts));
var listPlaylistCategories = createServerFn({ method: "POST" }).inputValidator((d) => objectType({ playlist_id: uuid }).parse(d)).handler(listPlaylistCategories_createServerFn_handler, async ({ data }) => {
	await requireAdmin();
	return q(`SELECT ci.source_id,s.name source_name,ci.category,
   coalesce(cr.kind, CASE WHEN count(*) FILTER(WHERE ci.kind='series')>=greatest(count(*) FILTER(WHERE ci.kind='movie'),count(*) FILTER(WHERE ci.kind='live')) THEN 'series'
                          WHEN count(*) FILTER(WHERE ci.kind='movie')>count(*) FILTER(WHERE ci.kind='live') THEN 'movie' ELSE 'live' END) kind,
   count(*)::int items,cr.custom_category
   FROM source_catalog_items ci
   JOIN playlist_sources ps ON ps.source_id=ci.source_id AND ps.playlist_id=$1 AND ps.active
   JOIN sources s ON s.id=ci.source_id
   LEFT JOIN playlist_category_rules cr ON cr.playlist_id=$1 AND cr.source_id=ci.source_id AND cr.source_category=ci.category
   GROUP BY ci.source_id,s.name,ci.category,cr.kind,cr.custom_category ORDER BY s.name,ci.category`, [data.playlist_id]);
});
var savePlaylistCategoryRule_createServerFn_handler = createServerRpc({
	id: "a2c8eb31e6447ec6c27c05b291ea3fde19efa3e07410d33c2f2db42caf3e3747",
	name: "savePlaylistCategoryRule",
	filename: "src/lib/admin.functions.ts"
}, (opts) => savePlaylistCategoryRule.__executeServer(opts));
var savePlaylistCategoryRule = createServerFn({ method: "POST" }).inputValidator((d) => objectType({
	playlist_id: uuid,
	source_id: uuid,
	category: stringType().min(1).max(180),
	kind: enumType([
		"live",
		"movie",
		"series"
	]),
	custom_category: stringType().trim().max(120).nullable().optional()
}).parse(d)).handler(savePlaylistCategoryRule_createServerFn_handler, async ({ data }) => {
	const u = await requireAdmin(["admin"]);
	await q(`INSERT INTO playlist_category_rules(playlist_id,source_id,source_category,kind,custom_category)
   VALUES($1,$2,$3,$4,$5) ON CONFLICT(playlist_id,source_id,source_category)
   DO UPDATE SET kind=EXCLUDED.kind,custom_category=EXCLUDED.custom_category,updated_at=now()`, [
		data.playlist_id,
		data.source_id,
		data.category,
		data.kind,
		data.custom_category || null
	]);
	await q("UPDATE source_catalog_items SET kind=$3 WHERE source_id=$1 AND category=$2", [
		data.source_id,
		data.category,
		data.kind
	]);
	await audit({
		...actor(u),
		action: "playlist.category_rule",
		entity: "playlist",
		entityId: data.playlist_id,
		details: {
			source_id: data.source_id,
			category: data.category,
			kind: data.kind
		}
	});
	return { ok: true };
});
var listPlaylistCatalog_createServerFn_handler = createServerRpc({
	id: "e6b107c2e844628785409f23921bec64ae17dc590272133bbd7fff827ef15a95",
	name: "listPlaylistCatalog",
	filename: "src/lib/admin.functions.ts"
}, (opts) => listPlaylistCatalog.__executeServer(opts));
var listPlaylistCatalog = createServerFn({ method: "POST" }).inputValidator((d) => objectType({ playlist_id: uuid }).parse(d)).handler(listPlaylistCatalog_createServerFn_handler, async ({ data }) => {
	await requireAdmin();
	return q(`SELECT ci.id,ci.source_id,s.name source_name,ci.kind,ci.name,ci.category,
    coalesce(r.enabled,true) enabled,r.custom_name,r.custom_category
    FROM source_catalog_items ci JOIN playlist_sources ps ON ps.source_id=ci.source_id AND ps.playlist_id=$1 AND ps.active
    JOIN sources s ON s.id=ci.source_id LEFT JOIN playlist_item_rules r ON r.catalog_item_id=ci.id AND r.playlist_id=$1
    ORDER BY ci.kind,ci.category,ci.name LIMIT 30000`, [data.playlist_id]);
});
var savePlaylistItemRule_createServerFn_handler = createServerRpc({
	id: "e99dd68155260024e8940924bc0345d9e3c90dd0119a57471593e4ea5f1b2761",
	name: "savePlaylistItemRule",
	filename: "src/lib/admin.functions.ts"
}, (opts) => savePlaylistItemRule.__executeServer(opts));
var savePlaylistItemRule = createServerFn({ method: "POST" }).inputValidator((d) => objectType({
	playlist_id: uuid,
	item_id: uuid,
	enabled: booleanType(),
	custom_name: stringType().trim().max(180).nullable().optional(),
	custom_category: stringType().trim().max(120).nullable().optional()
}).parse(d)).handler(savePlaylistItemRule_createServerFn_handler, async ({ data }) => {
	const u = await requireAdmin(["admin"]);
	await q(`INSERT INTO playlist_item_rules(playlist_id,catalog_item_id,enabled,custom_name,custom_category)
   VALUES($1,$2,$3,$4,$5) ON CONFLICT(playlist_id,catalog_item_id) DO UPDATE SET enabled=EXCLUDED.enabled,custom_name=EXCLUDED.custom_name,custom_category=EXCLUDED.custom_category`, [
		data.playlist_id,
		data.item_id,
		data.enabled,
		data.custom_name || null,
		data.custom_category || null
	]);
	await audit({
		...actor(u),
		action: "playlist.item_rule",
		entity: "playlist",
		entityId: data.playlist_id,
		details: {
			item_id: data.item_id,
			enabled: data.enabled
		}
	});
	return { ok: true };
});
function m3uClean(v) {
	return v.replace(/[\r\n"]/g, " ").trim();
}
var exportPlaylistM3u_createServerFn_handler = createServerRpc({
	id: "e2d1100abee1c9c8cfa8251278b0f80585820e9cfcbab52c711b4074f764a161",
	name: "exportPlaylistM3u",
	filename: "src/lib/admin.functions.ts"
}, (opts) => exportPlaylistM3u.__executeServer(opts));
var exportPlaylistM3u = createServerFn({ method: "POST" }).inputValidator((d) => objectType({ playlist_id: uuid }).parse(d)).handler(exportPlaylistM3u_createServerFn_handler, async ({ data }) => {
	const u = await requireAdmin(["admin"]);
	const p = await q1("SELECT name FROM playlists WHERE id=$1 AND active", [data.playlist_id]);
	if (!p) throw new Error("Lista não encontrada ou inativa.");
	const rows = await q(`SELECT ci.id,ci.name,ci.category,r.custom_name,r.custom_category,ci.stream_ref_enc
     FROM source_catalog_items ci JOIN playlist_sources ps ON ps.source_id=ci.source_id AND ps.playlist_id=$1 AND ps.active
     LEFT JOIN playlist_item_rules r ON r.playlist_id=$1 AND r.catalog_item_id=ci.id
     WHERE ci.kind IN ('live','movie') AND coalesce(r.enabled,true)=true AND ci.stream_ref_enc IS NOT NULL
     ORDER BY ps.priority,coalesce(r.sort_order,100),coalesce(r.custom_category,ci.category),coalesce(r.custom_name,ci.name)`, [data.playlist_id]);
	const { decryptSecret } = await import("./sources.server-CRJr63sN.mjs").then((n) => n.n);
	const seen = /* @__PURE__ */ new Set();
	const lines = ["#EXTM3U"];
	for (const x of rows) {
		let url;
		try {
			url = decryptSecret(x.stream_ref_enc);
		} catch {
			continue;
		}
		if (seen.has(url)) continue;
		seen.add(url);
		const name = m3uClean(x.custom_name || x.name), group = m3uClean(x.custom_category || x.category);
		lines.push(`#EXTINF:-1 group-title="${group}",${name}`, url);
	}
	await audit({
		...actor(u),
		action: "playlist.export_m3u",
		entity: "playlist",
		entityId: data.playlist_id,
		details: { items: seen.size }
	});
	return {
		filename: `${p.name.replace(/[^a-zA-Z0-9_-]+/g, "-") || "maxon-play"}.m3u`,
		content: lines.join("\n"),
		count: seen.size
	};
});
var listPlaylists_createServerFn_handler = createServerRpc({
	id: "4dbdf0282876399f9641a69be944cdb71faa5f262e3e2e6f7492b9d7fe82a106",
	name: "listPlaylists",
	filename: "src/lib/admin.functions.ts"
}, (opts) => listPlaylists.__executeServer(opts));
var listPlaylists = createServerFn({ method: "GET" }).handler(listPlaylists_createServerFn_handler, async () => {
	await requireAdmin();
	return q(`SELECT p.id,p.name,p.description,p.active,p.updated_at::text AS updated_at,
       count(ps.source_id)::int AS sources,
       coalesce(string_agg(s.name, ', ' ORDER BY ps.priority) FILTER (WHERE ps.active), '') AS source_names
     FROM playlists p
     LEFT JOIN playlist_sources ps ON ps.playlist_id=p.id
     LEFT JOIN sources s ON s.id=ps.source_id
     GROUP BY p.id ORDER BY p.updated_at DESC`);
});
var getPlaylistEditor_createServerFn_handler = createServerRpc({
	id: "76d47248b8d6f2f421f1d02fbe97278e7da92774e0b7f6eebb0731baa4a9955b",
	name: "getPlaylistEditor",
	filename: "src/lib/admin.functions.ts"
}, (opts) => getPlaylistEditor.__executeServer(opts));
var getPlaylistEditor = createServerFn({ method: "POST" }).inputValidator((d) => objectType({ id: uuid }).parse(d)).handler(getPlaylistEditor_createServerFn_handler, async ({ data }) => {
	await requireAdmin();
	const playlist = await q1("SELECT id,name,description,active FROM playlists WHERE id=$1", [data.id]);
	if (!playlist) throw new Error("Lista não encontrada.");
	return {
		playlist,
		selected: await q("SELECT source_id,priority,active FROM playlist_sources WHERE playlist_id=$1 ORDER BY priority", [data.id])
	};
});
var savePlaylist_createServerFn_handler = createServerRpc({
	id: "176a350847cca00bf8e57f8b3bc0d6fc4b078b6e35ce24418bdbde7da1d2985a",
	name: "savePlaylist",
	filename: "src/lib/admin.functions.ts"
}, (opts) => savePlaylist.__executeServer(opts));
var savePlaylist = createServerFn({ method: "POST" }).inputValidator((d) => objectType({
	id: uuid.optional(),
	name: stringType().trim().min(2).max(80),
	description: stringType().trim().max(300).default(""),
	active: booleanType().default(true),
	source_ids: arrayType(uuid).max(50).default([])
}).parse(d)).handler(savePlaylist_createServerFn_handler, async ({ data }) => {
	const u = await requireAdmin(["admin"]);
	let id = data.id;
	if (id) await q("UPDATE playlists SET name=$2,description=$3,active=$4,updated_at=now() WHERE id=$1", [
		id,
		data.name,
		data.description,
		data.active
	]);
	else id = (await q1("INSERT INTO playlists(name,description,active) VALUES ($1,$2,$3) RETURNING id", [
		data.name,
		data.description,
		data.active
	])).id;
	await q("DELETE FROM playlist_sources WHERE playlist_id=$1", [id]);
	for (let i = 0; i < data.source_ids.length; i++) await q("INSERT INTO playlist_sources(playlist_id,source_id,priority,active) VALUES ($1,$2,$3,true)", [
		id,
		data.source_ids[i],
		i + 1
	]);
	await audit({
		...actor(u),
		action: data.id ? "playlist.update" : "playlist.create",
		entity: "playlist",
		entityId: id,
		details: {
			name: data.name,
			sources: data.source_ids.length
		}
	});
	return { id };
});
var deletePlaylist_createServerFn_handler = createServerRpc({
	id: "07f81357e0c53c0cf9c1da84eec3a22151b674af1ccc69ae6dc59c6b3fb4753f",
	name: "deletePlaylist",
	filename: "src/lib/admin.functions.ts"
}, (opts) => deletePlaylist.__executeServer(opts));
var deletePlaylist = createServerFn({ method: "POST" }).inputValidator((d) => objectType({ id: uuid }).parse(d)).handler(deletePlaylist_createServerFn_handler, async ({ data }) => {
	const u = await requireAdmin(["admin"]);
	await q("DELETE FROM playlists WHERE id=$1", [data.id]);
	await audit({
		...actor(u),
		action: "playlist.delete",
		entity: "playlist",
		entityId: data.id
	});
	return { ok: true };
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
	const { encryptPayload, decryptPayload, displayHint } = await import("./sources.server-CRJr63sN.mjs").then((n) => n.n);
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
var generateMissingCustomerCredentials_createServerFn_handler = createServerRpc({
	id: "1ed96a116f5b11be7f92939cb1e53eff7ab315d0a56c29d599ec69eaa506af14",
	name: "generateMissingCustomerCredentials",
	filename: "src/lib/admin.functions.ts"
}, (opts) => generateMissingCustomerCredentials.__executeServer(opts));
var generateMissingCustomerCredentials = createServerFn({ method: "POST" }).handler(generateMissingCustomerCredentials_createServerFn_handler, async () => {
	const u = await requireAdmin();
	const customers = await q(`SELECT id, app_username, app_password
       FROM customers
       WHERE app_username IS NULL OR app_password IS NULL`);
	let updated = 0;
	for (const customer of customers) {
		let username = customer.app_username;
		if (!username) for (let tentativa = 0; tentativa < 100; tentativa++) {
			const candidato = String(Math.floor(1e4 + Math.random() * 9e4));
			if (!await q1(`SELECT id FROM customers WHERE app_username=$1 LIMIT 1`, [candidato])) {
				username = candidato;
				break;
			}
		}
		if (!username) throw new Error("Nao foi possivel gerar usuario unico");
		const password = customer.app_password ?? String(Math.floor(1e4 + Math.random() * 9e4));
		await q(`UPDATE customers
         SET app_username=$2, app_password=$3
         WHERE id=$1`, [
			customer.id,
			username,
			password
		]);
		updated++;
	}
	await audit({
		...actor(u),
		action: "customer.credentials.backfill",
		entity: "customer",
		details: { updated }
	});
	return {
		ok: true,
		updated
	};
});
//#endregion
export { activateDeviceByDisplayId_createServerFn_handler, activateDeviceDirect_createServerFn_handler, assignSource_createServerFn_handler, changeActivationDevice_createServerFn_handler, createActivation_createServerFn_handler, createSale_createServerFn_handler, deletePlaylist_createServerFn_handler, deleteProviderServer_createServerFn_handler, deleteSource_createServerFn_handler, exportPlaylistM3u_createServerFn_handler, forceSync_createServerFn_handler, generateMissingCustomerCredentials_createServerFn_handler, getDashboard_createServerFn_handler, getPlaylistEditor_createServerFn_handler, getSession_createServerFn_handler, getSettingsAdmin_createServerFn_handler, importSourceCatalog_createServerFn_handler, listActivations_createServerFn_handler, listAudit_createServerFn_handler, listCoupons_createServerFn_handler, listCustomers_createServerFn_handler, listDevices_createServerFn_handler, listPlans_createServerFn_handler, listPlaylistCatalog_createServerFn_handler, listPlaylistCategories_createServerFn_handler, listPlaylists_createServerFn_handler, listProviderServers_createServerFn_handler, listSales_createServerFn_handler, listSources_createServerFn_handler, listUsers_createServerFn_handler, login_createServerFn_handler, logout_createServerFn_handler, regenerateKey_createServerFn_handler, renewActivation_createServerFn_handler, saveCoupon_createServerFn_handler, saveCustomer_createServerFn_handler, savePlan_createServerFn_handler, savePlaylistCategoryRule_createServerFn_handler, savePlaylistItemRule_createServerFn_handler, savePlaylist_createServerFn_handler, saveProviderServer_createServerFn_handler, saveSettings_createServerFn_handler, saveSource_createServerFn_handler, saveUser_createServerFn_handler, setActivationBlocked_createServerFn_handler, setDeviceStatus_createServerFn_handler, setSaleStatus_createServerFn_handler, setupFirstAdmin_createServerFn_handler, testProviderServer_createServerFn_handler };
