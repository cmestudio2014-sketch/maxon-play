import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as createFileRoute, b as useRouter, d as Scripts, f as HeadContent, g as lazyRouteComponent, h as Outlet, m as createRouter, v as createRootRouteWithContext, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { a as objectType, n as enumType, o as stringType } from "../_libs/zod.mjs";
import { t as Route$24 } from "./admin-BfZA5_gW.mjs";
import { i as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { _ as verifyJwt, d as q, f as q1, g as sweepExpired, h as signJwt, l as maskKey, m as ready, n as dbKind, o as hashKey, p as rateLimit, r as displayIdFor, t as corsOrigins } from "./ratelimit.server-H848KJku.mjs";
import { t as audit } from "./audit.server-Bor7CQPd.mjs";
import { t as catalogQuery } from "./planos-B4Q9PNnu.mjs";
import { t as deviceConfig } from "./sources.server-DwelJx91.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-C4siMDhO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
var styles_default = "/assets/styles-C6dvGzVB.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message,
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$23 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "MAXON PLAY" },
			{
				name: "description",
				content: "Player de TV para listas autorizadas, com ativação por dispositivo."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Sora:wght@500;600;700;800&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "pt-BR",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$23.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {
			richColors: true,
			position: "top-right"
		})]
	});
}
var $$splitComponentImporter$15 = () => import("./routes-C8iipSYK.mjs");
var Route$22 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "MAXON PLAY — Player de TV para suas listas autorizadas" },
		{
			name: "description",
			content: "Player moderno para Android TV, Samsung Tizen e navegador. Ative com uma KEY e use suas listas M3U ou Xtream autorizadas."
		},
		{
			property: "og:title",
			content: "MAXON PLAY — Player de TV"
		},
		{
			property: "og:description",
			content: "Ative com uma KEY e assista suas listas autorizadas na TV."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
var $$splitComponentImporter$14 = () => import("./ativar-C3IYVMh3.mjs");
var Route$21 = createFileRoute("/ativar")({
	head: () => ({ meta: [
		{ title: "Ativar dispositivo — MAXON PLAY" },
		{
			name: "description",
			content: "Veja o Device ID deste aparelho e ative o MAXON PLAY com sua KEY."
		},
		{
			property: "og:title",
			content: "Ativar MAXON PLAY"
		},
		{
			property: "og:description",
			content: "Digite sua KEY para ativar o player."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./cliente-BUw0ZkWr.mjs");
var Route$20 = createFileRoute("/cliente")({
	head: () => ({ meta: [
		{ title: "Minha conta — MAXON PLAY" },
		{
			name: "description",
			content: "Consulte a validade do seu plano e o dispositivo vinculado à sua KEY."
		},
		{
			property: "og:title",
			content: "Minha conta MAXON PLAY"
		},
		{
			property: "og:description",
			content: "Consulte validade e dispositivo."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var Route$19 = createFileRoute("/health")({ server: { handlers: { GET: async () => {
	const started = Date.now();
	try {
		await ready();
		await q("SELECT 1");
		return Response.json({
			status: "ok",
			db: await dbKind(),
			latency_ms: Date.now() - started,
			time: (/* @__PURE__ */ new Date()).toISOString()
		}, { headers: { "Cache-Control": "no-store" } });
	} catch (e) {
		console.error("[health]", e.message);
		return Response.json({
			status: "error",
			db: "unavailable"
		}, {
			status: 503,
			headers: { "Cache-Control": "no-store" }
		});
	}
} } } });
var $$splitNotFoundComponentImporter = () => import("./planos-CpEeu-IK.mjs");
var $$splitErrorComponentImporter = () => import("./planos-Cc85zH1S.mjs");
var $$splitComponentImporter$12 = () => import("./planos-uRwRQLpI.mjs");
var Route$18 = createFileRoute("/planos")({
	head: () => ({ meta: [
		{ title: "Planos MAXON PLAY — 30 dias e 12 meses" },
		{
			name: "description",
			content: "Escolha seu plano MAXON PLAY e ative o app na sua TV em minutos."
		},
		{
			property: "og:title",
			content: "Planos MAXON PLAY"
		},
		{
			property: "og:description",
			content: "Planos de 30 dias e 12 meses para o player MAXON PLAY."
		}
	] }),
	loader: ({ context }) => context.queryClient.ensureQueryData(catalogQuery),
	component: lazyRouteComponent($$splitComponentImporter$12, "component"),
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent"),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent")
});
var $$splitComponentImporter$11 = () => import("./player-B8SycbxI.mjs");
var Route$17 = createFileRoute("/player")({
	ssr: false,
	head: () => ({ meta: [
		{ title: "Web Player — MAXON PLAY" },
		{
			name: "description",
			content: "Assista suas listas M3U ou Xtream autorizadas no navegador."
		},
		{
			property: "og:title",
			content: "MAXON PLAY Web Player"
		},
		{
			property: "og:description",
			content: "Player web para listas autorizadas."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./admin.index-B0WBAqpj.mjs");
var Route$16 = createFileRoute("/admin/")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./admin.ativacoes-BLQNNRcR.mjs");
var Route$15 = createFileRoute("/admin/ativacoes")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./admin.auditoria-DFXynlxJ.mjs");
var Route$14 = createFileRoute("/admin/auditoria")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./admin.clientes-CvyZziv5.mjs");
var Route$13 = createFileRoute("/admin/clientes")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./admin.configuracoes-8lgXDKEV.mjs");
var Route$12 = createFileRoute("/admin/configuracoes")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./admin.cupons-BIWxd0l1.mjs");
var Route$11 = createFileRoute("/admin/cupons")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./admin.dispositivos-QCeIOenS.mjs");
var Route$10 = createFileRoute("/admin/dispositivos")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./admin.fontes-Z47ej9pN.mjs");
var Route$9 = createFileRoute("/admin/fontes")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./admin.planos-B5ismRj1.mjs");
var Route$8 = createFileRoute("/admin/planos")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./admin.usuarios-SYpomu82.mjs");
var Route$7 = createFileRoute("/admin/usuarios")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./admin.vendas-BfMwYJUN.mjs");
var Route$6 = createFileRoute("/admin/vendas")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
function corsHeaders(request) {
	const origins = corsOrigins();
	const origin = request.headers.get("origin") ?? "";
	const allow = origins.includes("*") ? "*" : origins.includes(origin) ? origin : "";
	const h = {
		"Access-Control-Allow-Methods": "GET,POST,OPTIONS",
		"Access-Control-Allow-Headers": "Content-Type, Authorization",
		"Access-Control-Max-Age": "600",
		Vary: "Origin"
	};
	if (allow) h["Access-Control-Allow-Origin"] = allow;
	return h;
}
function ok(request, data, status = 200) {
	return Response.json({
		ok: true,
		data
	}, {
		status,
		headers: {
			...corsHeaders(request),
			"Cache-Control": "no-store"
		}
	});
}
function fail(request, status, code, message, extra = {}) {
	return Response.json({
		ok: false,
		error: {
			code,
			message
		}
	}, {
		status,
		headers: {
			...corsHeaders(request),
			"Cache-Control": "no-store",
			...extra
		}
	});
}
function preflight(request) {
	return new Response(null, {
		status: 204,
		headers: corsHeaders(request)
	});
}
function clientIp(request) {
	return (request.headers.get("x-forwarded-for")?.split(",")[0] ?? request.headers.get("x-real-ip") ?? "local").trim();
}
/** Envolve um handler da API: rate limit, preparo do banco e erros padronizados. */
async function apiHandler(request, bucket, limit, fn) {
	const rl = rateLimit(`${bucket}:${clientIp(request)}`, limit, 6e4);
	if (!rl.ok) return fail(request, 429, "RATE_LIMITED", "Muitas requisições. Tente novamente em instantes.", { "Retry-After": String(rl.retryAfter) });
	try {
		await ready();
		await sweepExpired();
		return await fn();
	} catch (e) {
		console.error(`[api:${bucket}]`, e.message);
		return fail(request, 500, "INTERNAL", "Erro interno.");
	}
}
async function parseBody(request, schema) {
	let raw;
	try {
		const text = await request.text();
		if (text.length > 8192) return { error: "Payload muito grande." };
		raw = text ? JSON.parse(text) : {};
	} catch {
		return { error: "JSON inválido." };
	}
	const r = schema.safeParse(raw);
	if (!r.success) return { error: r.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; ") };
	return { data: r.data };
}
function deviceFromAuth(request) {
	const h = request.headers.get("authorization") ?? "";
	const m = /^Bearer\s+(.+)$/i.exec(h);
	if (!m?.[1]) return null;
	const p = verifyJwt(m[1], "device");
	return p ? p.sub : null;
}
async function registerDevice(input) {
	const display = displayIdFor(input.deviceUid);
	return await q1(`INSERT INTO devices(device_uid,display_id,platform,model,app_version,last_seen_at)
     VALUES ($1,$2,$3,$4,$5,now())
     ON CONFLICT (device_uid) DO UPDATE SET model=EXCLUDED.model, app_version=EXCLUDED.app_version, last_seen_at=now()
     RETURNING id, device_uid, display_id, platform, model, status`, [
		input.deviceUid,
		display,
		input.platform,
		input.model,
		input.appVersion
	]);
}
async function getDevice(id) {
	return q1("SELECT id, device_uid, display_id, platform, model, status FROM devices WHERE id=$1", [id]);
}
async function activeLicenseFor(deviceId) {
	return q1(`SELECT a.id, a.status, a.expires_at, a.device_id, a.key_last4, p.name AS plan_name, p.duration_days, c.status AS customer_status
     FROM activations a JOIN plans p ON p.id=a.plan_id LEFT JOIN customers c ON c.id=a.customer_id
     WHERE a.device_id=$1 ORDER BY (a.status='ativa') DESC, a.expires_at DESC NULLS LAST LIMIT 1`, [deviceId]);
}
function deviceStatusPayload(dev, lic) {
	const now = Date.now();
	const exp = lic?.expires_at ? new Date(lic.expires_at).getTime() : null;
	let status = "nao_ativado";
	if (dev.status === "bloqueado") status = "bloqueado";
	else if (lic) {
		if (lic.status === "bloqueada" || lic.customer_status === "bloqueado") status = "bloqueado";
		else if (lic.status === "ativa" && exp && exp > now) status = "ativo";
		else if (lic.status === "ativa" || lic.status === "expirada") status = "expirado";
	}
	return {
		device_id: dev.display_id,
		platform: dev.platform,
		status,
		license: lic ? {
			plan: lic.plan_name,
			expires_at: lic.expires_at,
			days_left: exp ? Math.max(0, Math.ceil((exp - now) / 864e5)) : 0,
			key: maskKey(lic.key_last4)
		} : null
	};
}
function deviceToken(deviceId) {
	return {
		token: signJwt({
			sub: deviceId,
			typ: "device"
		}, 900),
		expires_in: 900
	};
}
async function findByKey(key) {
	return q1(`SELECT a.id, a.status, a.device_id, a.expires_at, p.duration_days, a.key_last4, c.status AS customer_status
     FROM activations a JOIN plans p ON p.id=a.plan_id LEFT JOIN customers c ON c.id=a.customer_id WHERE a.key_hash=$1`, [hashKey(key)]);
}
function keyProblem(a, deviceId) {
	if (!a) return {
		code: "KEY_INVALID",
		message: "KEY inválida."
	};
	if (a.status === "bloqueada" || a.customer_status === "bloqueado") return {
		code: "KEY_BLOCKED",
		message: "KEY bloqueada. Fale com o suporte."
	};
	if (a.status === "expirada" || a.expires_at && new Date(a.expires_at).getTime() < Date.now()) return {
		code: "KEY_EXPIRED",
		message: "KEY expirada. Renove seu plano."
	};
	if (a.device_id && a.device_id !== deviceId) return {
		code: "KEY_IN_USE",
		message: "KEY já vinculada a outro dispositivo."
	};
	return null;
}
/** Vincula a KEY ao dispositivo (1 licença por dispositivo). Inicia validade se pendente. */
async function activateKey(a, deviceId, ip) {
	if (a.status === "pendente") await q(`UPDATE activations SET device_id=$2, status='ativa', starts_at=now(), expires_at=now() + ($3 || ' days')::interval, updated_at=now() WHERE id=$1`, [
		a.id,
		deviceId,
		String(a.duration_days)
	]);
	else await q("UPDATE activations SET device_id=$2, updated_at=now() WHERE id=$1", [a.id, deviceId]);
	await q("UPDATE activations SET device_id=NULL, updated_at=now() WHERE device_id=$1 AND id<>$2 AND status<>'ativa'", [deviceId, a.id]);
	await audit({
		actorType: "device",
		actorId: deviceId,
		action: "activation.activate",
		entity: "activation",
		entityId: a.id,
		details: {
			key_last4: a.key_last4,
			ip_prefix: ip.split(".").slice(0, 2).join(".")
		}
	});
}
/** Status + config_version (sem segredos). Licença inativa => config_version "none" (acesso revogado). */
async function statusWithConfig(dev) {
	const { configVersion } = await import("./sources.server-DwelJx91.mjs").then((n) => n.n);
	const payload = deviceStatusPayload(dev, await activeLicenseFor(dev.id));
	return {
		...payload,
		config_version: await configVersion(dev.id, payload.status === "ativo")
	};
}
var Body$2 = objectType({ key: stringType().trim().min(16).max(24) });
var Route$5 = createFileRoute("/api/v1/activation/activate")({ server: { handlers: {
	OPTIONS: ({ request }) => preflight(request),
	POST: ({ request }) => apiHandler(request, "activation", 10, async () => {
		const id = deviceFromAuth(request);
		if (!id) return fail(request, 401, "UNAUTHORIZED", "Token ausente ou expirado.");
		const dev = await getDevice(id);
		if (!dev) return fail(request, 404, "DEVICE_NOT_FOUND", "Dispositivo não encontrado.");
		if (dev.status === "bloqueado") return fail(request, 403, "DEVICE_BLOCKED", "Dispositivo bloqueado.");
		const b = await parseBody(request, Body$2);
		if ("error" in b) return fail(request, 400, "VALIDATION", b.error);
		const a = await findByKey(b.data.key);
		const p = keyProblem(a, id);
		if (p) {
			await audit({
				actorType: "device",
				actorId: id,
				action: "activation.denied",
				entity: "device",
				entityId: id,
				details: { reason: p.code }
			});
			return fail(request, 422, p.code, p.message);
		}
		await activateKey(a, id, clientIp(request));
		return ok(request, await statusWithConfig(dev));
	})
} } });
var Body$1 = objectType({ key: stringType().trim().min(16).max(24) });
var Route$4 = createFileRoute("/api/v1/activation/validate")({ server: { handlers: {
	OPTIONS: ({ request }) => preflight(request),
	POST: ({ request }) => apiHandler(request, "activation", 10, async () => {
		const id = deviceFromAuth(request);
		if (!id) return fail(request, 401, "UNAUTHORIZED", "Token ausente ou expirado.");
		const b = await parseBody(request, Body$1);
		if ("error" in b) return fail(request, 400, "VALIDATION", b.error);
		const a = await findByKey(b.data.key);
		const p = keyProblem(a, id);
		if (p) return fail(request, 422, p.code, p.message);
		return ok(request, {
			valid: true,
			already_bound: a.device_id === id,
			duration_days: a.duration_days
		});
	})
} } });
var Route$3 = createFileRoute("/api/v1/device/config")({ server: { handlers: {
	OPTIONS: ({ request }) => preflight(request),
	GET: ({ request }) => apiHandler(request, "config", 20, async () => {
		const id = deviceFromAuth(request);
		if (!id) return fail(request, 401, "UNAUTHORIZED", "Token ausente ou expirado.");
		const dev = await getDevice(id);
		if (!dev) return fail(request, 404, "DEVICE_NOT_FOUND", "Dispositivo não encontrado.");
		if (deviceStatusPayload(dev, await activeLicenseFor(id)).status !== "ativo") return fail(request, 403, "LICENSE_INACTIVE", "Licença inativa: configuração indisponível.");
		const cfg = await deviceConfig(id);
		await audit({
			actorType: "device",
			actorId: id,
			action: "config.fetch",
			entity: "device",
			entityId: id,
			details: {
				config_version: cfg.config_version,
				has_source: !!cfg.source
			}
		});
		return ok(request, cfg);
	})
} } });
var Route$2 = createFileRoute("/api/v1/device/heartbeat")({ server: { handlers: {
	OPTIONS: ({ request }) => preflight(request),
	POST: ({ request }) => apiHandler(request, "heartbeat", 30, async () => {
		const id = deviceFromAuth(request);
		if (!id) return fail(request, 401, "UNAUTHORIZED", "Token ausente ou expirado. Chame /device/register.");
		const dev = await getDevice(id);
		if (!dev) return fail(request, 404, "DEVICE_NOT_FOUND", "Dispositivo não encontrado.");
		await q("UPDATE devices SET last_seen_at=now() WHERE id=$1", [id]);
		return ok(request, {
			...await statusWithConfig(dev),
			...deviceToken(dev.id)
		});
	})
} } });
var Body = objectType({
	device_uid: stringType().trim().min(16).max(128).regex(/^[A-Za-z0-9._:-]+$/, "formato inválido"),
	platform: enumType([
		"android",
		"tizen",
		"web"
	]),
	model: stringType().trim().max(80).default(""),
	app_version: stringType().trim().max(20).default("")
});
var Route$1 = createFileRoute("/api/v1/device/register")({ server: { handlers: {
	OPTIONS: ({ request }) => preflight(request),
	POST: ({ request }) => apiHandler(request, "register", 20, async () => {
		const b = await parseBody(request, Body);
		if ("error" in b) return fail(request, 400, "VALIDATION", b.error);
		const dev = await registerDevice({
			deviceUid: b.data.device_uid,
			platform: b.data.platform,
			model: b.data.model,
			appVersion: b.data.app_version
		});
		if (dev.status === "bloqueado") return fail(request, 403, "DEVICE_BLOCKED", "Dispositivo bloqueado.");
		await audit({
			actorType: "device",
			actorId: dev.id,
			action: "device.register",
			entity: "device",
			entityId: dev.id,
			details: { platform: dev.platform }
		});
		return ok(request, {
			...await statusWithConfig(dev),
			...deviceToken(dev.id)
		});
	})
} } });
var Route = createFileRoute("/api/v1/device/status")({ server: { handlers: {
	OPTIONS: ({ request }) => preflight(request),
	GET: ({ request }) => apiHandler(request, "status", 60, async () => {
		const id = deviceFromAuth(request);
		if (!id) return fail(request, 401, "UNAUTHORIZED", "Token ausente ou expirado. Chame /device/register.");
		const dev = await getDevice(id);
		if (!dev) return fail(request, 404, "DEVICE_NOT_FOUND", "Dispositivo não encontrado.");
		return ok(request, await statusWithConfig(dev));
	})
} } });
var IndexRoute = Route$22.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$23
});
var AdminRoute = Route$24.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => Route$23
});
var AtivarRoute = Route$21.update({
	id: "/ativar",
	path: "/ativar",
	getParentRoute: () => Route$23
});
var ClienteRoute = Route$20.update({
	id: "/cliente",
	path: "/cliente",
	getParentRoute: () => Route$23
});
var HealthRoute = Route$19.update({
	id: "/health",
	path: "/health",
	getParentRoute: () => Route$23
});
var PlanosRoute = Route$18.update({
	id: "/planos",
	path: "/planos",
	getParentRoute: () => Route$23
});
var PlayerRoute = Route$17.update({
	id: "/player",
	path: "/player",
	getParentRoute: () => Route$23
});
var AdminIndexRoute = Route$16.update({
	id: "/",
	path: "/",
	getParentRoute: () => AdminRoute
});
var AdminAtivacoesRoute = Route$15.update({
	id: "/ativacoes",
	path: "/ativacoes",
	getParentRoute: () => AdminRoute
});
var AdminAuditoriaRoute = Route$14.update({
	id: "/auditoria",
	path: "/auditoria",
	getParentRoute: () => AdminRoute
});
var AdminClientesRoute = Route$13.update({
	id: "/clientes",
	path: "/clientes",
	getParentRoute: () => AdminRoute
});
var AdminConfiguracoesRoute = Route$12.update({
	id: "/configuracoes",
	path: "/configuracoes",
	getParentRoute: () => AdminRoute
});
var AdminCuponsRoute = Route$11.update({
	id: "/cupons",
	path: "/cupons",
	getParentRoute: () => AdminRoute
});
var AdminDispositivosRoute = Route$10.update({
	id: "/dispositivos",
	path: "/dispositivos",
	getParentRoute: () => AdminRoute
});
var AdminFontesRoute = Route$9.update({
	id: "/fontes",
	path: "/fontes",
	getParentRoute: () => AdminRoute
});
var AdminPlanosRoute = Route$8.update({
	id: "/planos",
	path: "/planos",
	getParentRoute: () => AdminRoute
});
var AdminUsuariosRoute = Route$7.update({
	id: "/usuarios",
	path: "/usuarios",
	getParentRoute: () => AdminRoute
});
var AdminVendasRoute = Route$6.update({
	id: "/vendas",
	path: "/vendas",
	getParentRoute: () => AdminRoute
});
var ApiV1ActivationActivateRoute = Route$5.update({
	id: "/api/v1/activation/activate",
	path: "/api/v1/activation/activate",
	getParentRoute: () => Route$23
});
var ApiV1ActivationValidateRoute = Route$4.update({
	id: "/api/v1/activation/validate",
	path: "/api/v1/activation/validate",
	getParentRoute: () => Route$23
});
var ApiV1DeviceConfigRoute = Route$3.update({
	id: "/api/v1/device/config",
	path: "/api/v1/device/config",
	getParentRoute: () => Route$23
});
var ApiV1DeviceHeartbeatRoute = Route$2.update({
	id: "/api/v1/device/heartbeat",
	path: "/api/v1/device/heartbeat",
	getParentRoute: () => Route$23
});
var ApiV1DeviceRegisterRoute = Route$1.update({
	id: "/api/v1/device/register",
	path: "/api/v1/device/register",
	getParentRoute: () => Route$23
});
var ApiV1DeviceStatusRoute = Route.update({
	id: "/api/v1/device/status",
	path: "/api/v1/device/status",
	getParentRoute: () => Route$23
});
var AdminRouteChildren = {
	AdminAtivacoesRoute,
	AdminAuditoriaRoute,
	AdminClientesRoute,
	AdminConfiguracoesRoute,
	AdminCuponsRoute,
	AdminDispositivosRoute,
	AdminFontesRoute,
	AdminPlanosRoute,
	AdminUsuariosRoute,
	AdminVendasRoute,
	AdminIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	AdminRoute: AdminRoute._addFileChildren(AdminRouteChildren),
	AtivarRoute,
	ClienteRoute,
	HealthRoute,
	PlanosRoute,
	PlayerRoute,
	ApiV1ActivationActivateRoute,
	ApiV1ActivationValidateRoute,
	ApiV1DeviceConfigRoute,
	ApiV1DeviceHeartbeatRoute,
	ApiV1DeviceRegisterRoute,
	ApiV1DeviceStatusRoute
};
var routeTree = Route$23._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
