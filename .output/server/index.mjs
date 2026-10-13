globalThis.__nitro_main__ = import.meta.url;
import { i as HTTPError, n as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
import { s as FastResponse } from "./_libs/h3-v2+rou3+srvx.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"9f-HO14TyKd/4qwktFzfKfM5KZm5e8\"",
		"mtime": "2026-10-13T15:27:36.187Z",
		"size": 159,
		"path": "../public/robots.txt"
	},
	"/assets/admin-C6rC6eZC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1bfc-6bsitdKnH5TzjiGKMqDZlKNVA5U\"",
		"mtime": "2026-10-13T15:27:32.970Z",
		"size": 7164,
		"path": "../public/assets/admin-C6rC6eZC.js"
	},
	"/assets/admin-4FMd6Nf_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d8-aSF6lX+UQL0XDw1hVf2iqvO7Q3Y\"",
		"mtime": "2026-10-13T15:27:32.970Z",
		"size": 216,
		"path": "../public/assets/admin-4FMd6Nf_.js"
	},
	"/assets/admin-DTwaaLf_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ac-/ZrfOTEwSuUY3Bl28OQbmOMnTrw\"",
		"mtime": "2026-10-13T15:27:32.971Z",
		"size": 172,
		"path": "../public/assets/admin-DTwaaLf_.js"
	},
	"/assets/admin-ui-BesXafGk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a97-XPIZtcf07BB0zwOIzPz9otQKs4M\"",
		"mtime": "2026-10-13T15:27:32.971Z",
		"size": 2711,
		"path": "../public/assets/admin-ui-BesXafGk.js"
	},
	"/assets/admin.ativacoes-9Vjn4jXC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e687-FUZJf9ePYNFn1I3As60JjHogv7E\"",
		"mtime": "2026-10-13T15:27:32.971Z",
		"size": 59015,
		"path": "../public/assets/admin.ativacoes-9Vjn4jXC.js"
	},
	"/assets/admin.auditoria-D5c6SEtw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"570-BSzu+4YvklItBqaSChgUrKxWH+Q\"",
		"mtime": "2026-10-13T15:27:32.972Z",
		"size": 1392,
		"path": "../public/assets/admin.auditoria-D5c6SEtw.js"
	},
	"/assets/admin.clientes-C2eG8WoA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1121-c+521KxUIZhG2n80R23vezGyXC0\"",
		"mtime": "2026-10-13T15:27:32.972Z",
		"size": 4385,
		"path": "../public/assets/admin.clientes-C2eG8WoA.js"
	},
	"/assets/admin.configuracoes-BdH4GD4s.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6c4-2Ug8zdUe8E9KZOWFHlmRnEm4mkk\"",
		"mtime": "2026-10-13T15:27:32.972Z",
		"size": 1732,
		"path": "../public/assets/admin.configuracoes-BdH4GD4s.js"
	},
	"/assets/admin.cupons-4mFrgqmC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b23-dtagGhLc8CaRBX39k4xqHlF6lwQ\"",
		"mtime": "2026-10-13T15:27:32.972Z",
		"size": 2851,
		"path": "../public/assets/admin.cupons-4mFrgqmC.js"
	},
	"/assets/admin.dispositivos-CY2hbL7G.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a36-sAe4mVVgGhw4R846G6wxmz2GUXE\"",
		"mtime": "2026-10-13T15:27:32.973Z",
		"size": 2614,
		"path": "../public/assets/admin.dispositivos-CY2hbL7G.js"
	},
	"/assets/admin.fontes-S-pbYXPV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a32-TtnI7EHT0pD9RxYNT89118DV/po\"",
		"mtime": "2026-10-13T15:27:32.973Z",
		"size": 2610,
		"path": "../public/assets/admin.fontes-S-pbYXPV.js"
	},
	"/assets/admin.index-vvIYJ-I6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99c-bqClwMQ4TvR6m9QQjV9DfXLsP6o\"",
		"mtime": "2026-10-13T15:27:32.973Z",
		"size": 2460,
		"path": "../public/assets/admin.index-vvIYJ-I6.js"
	},
	"/assets/admin.planos-B9KYFhI4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ce2-3lh6graWZIUC7UxdXV4bA0MWlAg\"",
		"mtime": "2026-10-13T15:27:32.974Z",
		"size": 3298,
		"path": "../public/assets/admin.planos-B9KYFhI4.js"
	},
	"/assets/admin.usuarios-DOLQTGpg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b6f-noFASenjFmkmC6DfcN14pqXRnSs\"",
		"mtime": "2026-10-13T15:27:32.974Z",
		"size": 2927,
		"path": "../public/assets/admin.usuarios-DOLQTGpg.js"
	},
	"/assets/admin.vendas-CM5FW2z2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12c8-F5drH6grcGIqnIBpgV5MFraAdF8\"",
		"mtime": "2026-10-13T15:27:32.974Z",
		"size": 4808,
		"path": "../public/assets/admin.vendas-CM5FW2z2.js"
	},
	"/assets/ativar-GtYNYdLr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"aa0-Y+y/bQ+6faXaVR/mMjlyEHKWMoY\"",
		"mtime": "2026-10-13T15:27:32.975Z",
		"size": 2720,
		"path": "../public/assets/ativar-GtYNYdLr.js"
	},
	"/assets/brand-C170AoZq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"86f-T0GHQVjyY/6zJX60hJhmXbs1qjg\"",
		"mtime": "2026-10-13T15:27:32.975Z",
		"size": 2159,
		"path": "../public/assets/brand-C170AoZq.js"
	},
	"/assets/button-BohNdBmg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12da-Ve7gNhrNj1cGF4PZzxg3t0fwfRc\"",
		"mtime": "2026-10-13T15:27:32.975Z",
		"size": 4826,
		"path": "../public/assets/button-BohNdBmg.js"
	},
	"/assets/cliente-DfR5r-g9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"902-1myua+twdqK5mlRGnm0ovyz3nmQ\"",
		"mtime": "2026-10-13T15:27:32.976Z",
		"size": 2306,
		"path": "../public/assets/cliente-DfR5r-g9.js"
	},
	"/assets/copy-BmHJmYOU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ec-vCUeeGphC4Xgze5Nvdth85mmQUE\"",
		"mtime": "2026-10-13T15:27:32.976Z",
		"size": 236,
		"path": "../public/assets/copy-BmHJmYOU.js"
	},
	"/assets/createLucideIcon-C8f4lLaO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4a0-NTAL9M0j6LxzNovOonT9n48Sqbg\"",
		"mtime": "2026-10-13T15:27:32.977Z",
		"size": 1184,
		"path": "../public/assets/createLucideIcon-C8f4lLaO.js"
	},
	"/assets/device-client-WFY6Hzd0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"465-tzFn0gGAy9ABFW/2OvNwFnpG0uk\"",
		"mtime": "2026-10-13T15:27:32.977Z",
		"size": 1125,
		"path": "../public/assets/device-client-WFY6Hzd0.js"
	},
	"/assets/dialog-BKbsKMp4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7131-HBl1ApvbFhqVwcyLEo+/cwP7Q8E\"",
		"mtime": "2026-10-13T15:27:32.977Z",
		"size": 28977,
		"path": "../public/assets/dialog-BKbsKMp4.js"
	},
	"/assets/dist-C-sOnfKd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d2b-0lu6V3PrlZiKtf7jhulftPl+ajM\"",
		"mtime": "2026-10-13T15:27:32.978Z",
		"size": 7467,
		"path": "../public/assets/dist-C-sOnfKd.js"
	},
	"/assets/dist-Cl6QLEvh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e86-oUptn9Vspxc5Enuw5bL0O7lK3yQ\"",
		"mtime": "2026-10-13T15:27:32.979Z",
		"size": 7814,
		"path": "../public/assets/dist-Cl6QLEvh.js"
	},
	"/assets/input-_5t6TjzI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"284-lCsr+aeKSmyaENk8DGYq2mSW0zg\"",
		"mtime": "2026-10-13T15:27:32.980Z",
		"size": 644,
		"path": "../public/assets/input-_5t6TjzI.js"
	},
	"/assets/index-CC4t2Qcr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"64398-Zg/7OLJkhTs5sxzFidEw+in9Eog\"",
		"mtime": "2026-10-13T15:27:32.970Z",
		"size": 410520,
		"path": "../public/assets/index-CC4t2Qcr.js"
	},
	"/assets/key-round-DP4XvNfR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"163-HoFL7pU2Av0hJmK3VxowPIC/eDU\"",
		"mtime": "2026-10-13T15:27:32.980Z",
		"size": 355,
		"path": "../public/assets/key-round-DP4XvNfR.js"
	},
	"/assets/planos-B3dnx6qx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2b96-M2HI1VLaM/ortnjwCiFmZyqPsMo\"",
		"mtime": "2026-10-13T15:27:32.980Z",
		"size": 11158,
		"path": "../public/assets/planos-B3dnx6qx.js"
	},
	"/assets/planos-D_V7x2Xr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b7-0lTbuNiClZ5sIWSi/GmqDC2vKPI\"",
		"mtime": "2026-10-13T15:27:32.981Z",
		"size": 183,
		"path": "../public/assets/planos-D_V7x2Xr.js"
	},
	"/assets/planos-avKf5761.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a4-UOYnd9GNme9NlmumTuGzLIlI1Ao\"",
		"mtime": "2026-10-13T15:27:32.981Z",
		"size": 164,
		"path": "../public/assets/planos-avKf5761.js"
	},
	"/assets/react-yIOJJ3r4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"20d2-kVhPh4bAQsY8cpxNQjSFv8q1v2A\"",
		"mtime": "2026-10-13T15:27:32.982Z",
		"size": 8402,
		"path": "../public/assets/react-yIOJJ3r4.js"
	},
	"/assets/player-BqWSrTwu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30cd-GlONIJkclQSzAQ+085IKdjNN6u0\"",
		"mtime": "2026-10-13T15:27:32.981Z",
		"size": 12493,
		"path": "../public/assets/player-BqWSrTwu.js"
	},
	"/assets/routes-BX9D1A5r.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a4d-0juX5p+VgDmUYJRrWIqAiLgf/M4\"",
		"mtime": "2026-10-13T15:27:32.982Z",
		"size": 2637,
		"path": "../public/assets/routes-BX9D1A5r.js"
	},
	"/assets/settings-2GH6wj7X.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e7-sOaDfOv51oRTi3NbvmJ6OoPbH20\"",
		"mtime": "2026-10-13T15:27:32.982Z",
		"size": 487,
		"path": "../public/assets/settings-2GH6wj7X.js"
	},
	"/assets/shield-check-Djzt63kg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"140-Hb6+ImKYLTyMKORxqiB5jj8pGMk\"",
		"mtime": "2026-10-13T15:27:32.983Z",
		"size": 320,
		"path": "../public/assets/shield-check-Djzt63kg.js"
	},
	"/assets/source-form-B3DSzkR9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c12-5POxxnBF1AMNaONfC5tPrmgaRHE\"",
		"mtime": "2026-10-13T15:27:32.984Z",
		"size": 3090,
		"path": "../public/assets/source-form-B3DSzkR9.js"
	},
	"/assets/styles-C6dvGzVB.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"138ba-GYGIYEIg018oOUU1jH9Kkcj3/NU\"",
		"mtime": "2026-10-13T15:27:32.986Z",
		"size": 80058,
		"path": "../public/assets/styles-C6dvGzVB.css"
	},
	"/assets/switch-C0EmJzRn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12dd-K/naEvbAUDqMsog1HrbIW9ZYbLQ\"",
		"mtime": "2026-10-13T15:27:32.984Z",
		"size": 4829,
		"path": "../public/assets/switch-C0EmJzRn.js"
	},
	"/assets/tv-DUoZ45GY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b9-Yl7pEzPwu1yVSQECCLU2wh50XQg\"",
		"mtime": "2026-10-13T15:27:32.984Z",
		"size": 185,
		"path": "../public/assets/tv-DUoZ45GY.js"
	},
	"/assets/useBaseQuery-BoZu1Lho.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f1c-01msRlIocyrZATcXODdfXDLYwGg\"",
		"mtime": "2026-10-13T15:27:32.985Z",
		"size": 7964,
		"path": "../public/assets/useBaseQuery-BoZu1Lho.js"
	},
	"/assets/useServerFn-BlQXEGJi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"167-yHgwvynsVngBCmAGnbeVhdgqayo\"",
		"mtime": "2026-10-13T15:27:32.985Z",
		"size": 359,
		"path": "../public/assets/useServerFn-BlQXEGJi.js"
	},
	"/assets/utils-4jUIYOBc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6bed-90NGITyc+kEKvxUkUtkYHgO1XH4\"",
		"mtime": "2026-10-13T15:27:32.985Z",
		"size": 27629,
		"path": "../public/assets/utils-4jUIYOBc.js"
	},
	"/assets/hls-BhcDaTqf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8c546-hnGn8vIsciiCtsWkmKZ1VwsqkPQ\"",
		"mtime": "2026-10-13T15:27:32.979Z",
		"size": 574790,
		"path": "../public/assets/hls-BhcDaTqf.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_ARUcGo = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_ARUcGo
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
