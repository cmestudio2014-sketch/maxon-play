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
		"mtime": "2026-10-13T15:13:18.077Z",
		"size": 159,
		"path": "../public/robots.txt"
	},
	"/assets/admin-B39RBWLo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ac-3mPAV/DCAR2PFfntUjuhONCZqVo\"",
		"mtime": "2026-10-13T15:13:14.752Z",
		"size": 172,
		"path": "../public/assets/admin-B39RBWLo.js"
	},
	"/assets/admin-CXHgS1fT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d8-0+NSUrtRK8Z/EIxBE6elothzp4I\"",
		"mtime": "2026-10-13T15:13:14.753Z",
		"size": 216,
		"path": "../public/assets/admin-CXHgS1fT.js"
	},
	"/assets/admin-EEo8ryvA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1bfc-T3mjxLcQ1Dc2cVh/+V0I2OTt5Fg\"",
		"mtime": "2026-10-13T15:13:14.753Z",
		"size": 7164,
		"path": "../public/assets/admin-EEo8ryvA.js"
	},
	"/assets/admin-ui-BpmSMWW6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a97-+wMUDuk/C9pOwFUJ676Lw8q3Z/8\"",
		"mtime": "2026-10-13T15:13:14.753Z",
		"size": 2711,
		"path": "../public/assets/admin-ui-BpmSMWW6.js"
	},
	"/assets/admin.ativacoes-BlDdFD87.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e687-jx2sXjWLJzW6DmT91xUjHy7euoY\"",
		"mtime": "2026-10-13T15:13:14.754Z",
		"size": 59015,
		"path": "../public/assets/admin.ativacoes-BlDdFD87.js"
	},
	"/assets/admin.auditoria-frnBPcmY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"570-CjzH2TWepK0oO2iQ9+MJ7puyqKQ\"",
		"mtime": "2026-10-13T15:13:14.754Z",
		"size": 1392,
		"path": "../public/assets/admin.auditoria-frnBPcmY.js"
	},
	"/assets/admin.clientes-CbyyieBG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10f8-ECJKMTuekuyU+9JiLVxXXhrFOnM\"",
		"mtime": "2026-10-13T15:13:14.754Z",
		"size": 4344,
		"path": "../public/assets/admin.clientes-CbyyieBG.js"
	},
	"/assets/admin.configuracoes-DcUoskI6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6c4-IlbuMUYq9A+LMC2oHm5rrjVJGcE\"",
		"mtime": "2026-10-13T15:13:14.754Z",
		"size": 1732,
		"path": "../public/assets/admin.configuracoes-DcUoskI6.js"
	},
	"/assets/admin.cupons-BnmkxQVi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b23-pUOdXgOSgeqt1vG7ViVVNSKuT/I\"",
		"mtime": "2026-10-13T15:13:14.755Z",
		"size": 2851,
		"path": "../public/assets/admin.cupons-BnmkxQVi.js"
	},
	"/assets/admin.dispositivos-BgH52nr9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a36-idrXoAinNmJ/jDQQrgmBw6Hr7aE\"",
		"mtime": "2026-10-13T15:13:14.755Z",
		"size": 2614,
		"path": "../public/assets/admin.dispositivos-BgH52nr9.js"
	},
	"/assets/admin.fontes-DK6sXfEh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a32-IjSRlUKDVzIwjuOO1V6NmTtUgFY\"",
		"mtime": "2026-10-13T15:13:14.755Z",
		"size": 2610,
		"path": "../public/assets/admin.fontes-DK6sXfEh.js"
	},
	"/assets/admin.index-B2HwhbSF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99c-KW8XULq21xBK3AuNVEMY0aMKJSE\"",
		"mtime": "2026-10-13T15:13:14.756Z",
		"size": 2460,
		"path": "../public/assets/admin.index-B2HwhbSF.js"
	},
	"/assets/admin.planos-BsTY50gf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ce2-O2K4V/kUwl7HiPuQ6iNwSvy4fqE\"",
		"mtime": "2026-10-13T15:13:14.756Z",
		"size": 3298,
		"path": "../public/assets/admin.planos-BsTY50gf.js"
	},
	"/assets/admin.usuarios-BNsXN707.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b6f-VjrfUJ8oX4+dJkhrF/jXppPTm5k\"",
		"mtime": "2026-10-13T15:13:14.756Z",
		"size": 2927,
		"path": "../public/assets/admin.usuarios-BNsXN707.js"
	},
	"/assets/admin.vendas-BGk5pdIW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12c8-7ImEYfkBGZaQ3l0grf1SFodxcXQ\"",
		"mtime": "2026-10-13T15:13:14.756Z",
		"size": 4808,
		"path": "../public/assets/admin.vendas-BGk5pdIW.js"
	},
	"/assets/ativar-Ff8_kvHJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"aa0-tbMhRoQ3pUViKPukgX5EzEnif5M\"",
		"mtime": "2026-10-13T15:13:14.757Z",
		"size": 2720,
		"path": "../public/assets/ativar-Ff8_kvHJ.js"
	},
	"/assets/brand-Da64XTxi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"86f-HzvcApIRhEWVQguin2+itQAChK4\"",
		"mtime": "2026-10-13T15:13:14.757Z",
		"size": 2159,
		"path": "../public/assets/brand-Da64XTxi.js"
	},
	"/assets/button-Bi6LAxtk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12da-5NG0jk+EuQ+JetedeqL620yg+lU\"",
		"mtime": "2026-10-13T15:13:14.757Z",
		"size": 4826,
		"path": "../public/assets/button-Bi6LAxtk.js"
	},
	"/assets/cliente-z7MyTKdD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"902-XN4vDmjPmYwNFWoDjq0rjHUke7A\"",
		"mtime": "2026-10-13T15:13:14.758Z",
		"size": 2306,
		"path": "../public/assets/cliente-z7MyTKdD.js"
	},
	"/assets/copy-BmHJmYOU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ec-vCUeeGphC4Xgze5Nvdth85mmQUE\"",
		"mtime": "2026-10-13T15:13:14.758Z",
		"size": 236,
		"path": "../public/assets/copy-BmHJmYOU.js"
	},
	"/assets/createLucideIcon-C8f4lLaO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4a0-NTAL9M0j6LxzNovOonT9n48Sqbg\"",
		"mtime": "2026-10-13T15:13:14.758Z",
		"size": 1184,
		"path": "../public/assets/createLucideIcon-C8f4lLaO.js"
	},
	"/assets/device-client-WFY6Hzd0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"465-tzFn0gGAy9ABFW/2OvNwFnpG0uk\"",
		"mtime": "2026-10-13T15:13:14.758Z",
		"size": 1125,
		"path": "../public/assets/device-client-WFY6Hzd0.js"
	},
	"/assets/dialog-DIWnI2US.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7131-MXRSvpS4R8P0lvtEPQ1Vc4Gh8vE\"",
		"mtime": "2026-10-13T15:13:14.759Z",
		"size": 28977,
		"path": "../public/assets/dialog-DIWnI2US.js"
	},
	"/assets/dist-BL3VTBPB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d2b-fi7GpIKgVzE9Gc/OdiMWD4OYiPA\"",
		"mtime": "2026-10-13T15:13:14.759Z",
		"size": 7467,
		"path": "../public/assets/dist-BL3VTBPB.js"
	},
	"/assets/dist-Do-lTLcb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e86-57FmdRy9Dzud3F10XHVmbF+HupY\"",
		"mtime": "2026-10-13T15:13:14.759Z",
		"size": 7814,
		"path": "../public/assets/dist-Do-lTLcb.js"
	},
	"/assets/key-round-DP4XvNfR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"163-HoFL7pU2Av0hJmK3VxowPIC/eDU\"",
		"mtime": "2026-10-13T15:13:14.760Z",
		"size": 355,
		"path": "../public/assets/key-round-DP4XvNfR.js"
	},
	"/assets/input-tww4-MB-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"284-EiP0Zb5g0YNFnaFfKixwSZkb69s\"",
		"mtime": "2026-10-13T15:13:14.760Z",
		"size": 644,
		"path": "../public/assets/input-tww4-MB-.js"
	},
	"/assets/planos-BIhml9-J.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2b96-FbR0p0Vg6j+Djo5tY26GEUHbAzQ\"",
		"mtime": "2026-10-13T15:13:14.761Z",
		"size": 11158,
		"path": "../public/assets/planos-BIhml9-J.js"
	},
	"/assets/planos-CdYOte10.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b7-Tn9EyU3w/uUpW9SBmE/7POHJF4g\"",
		"mtime": "2026-10-13T15:13:14.761Z",
		"size": 183,
		"path": "../public/assets/planos-CdYOte10.js"
	},
	"/assets/index-CXKuqVd_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"64398-asTIAdmhc/su7CX/XjNdWlv7WlQ\"",
		"mtime": "2026-10-13T15:13:14.752Z",
		"size": 410520,
		"path": "../public/assets/index-CXKuqVd_.js"
	},
	"/assets/planos-CgDXr7yU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a4-KF+I0TmZs3MpT8hEBnPGJ2cqqVo\"",
		"mtime": "2026-10-13T15:13:14.761Z",
		"size": 164,
		"path": "../public/assets/planos-CgDXr7yU.js"
	},
	"/assets/player-D4OlbnGR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30cd-YkYG9rW6ovFJa9xYxFClWskMbk8\"",
		"mtime": "2026-10-13T15:13:14.762Z",
		"size": 12493,
		"path": "../public/assets/player-D4OlbnGR.js"
	},
	"/assets/react-yIOJJ3r4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"20d2-kVhPh4bAQsY8cpxNQjSFv8q1v2A\"",
		"mtime": "2026-10-13T15:13:14.762Z",
		"size": 8402,
		"path": "../public/assets/react-yIOJJ3r4.js"
	},
	"/assets/routes-DynKueZ-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a4d-bATRWbbhpvrIM8RXs7qBTTCRpRY\"",
		"mtime": "2026-10-13T15:13:14.762Z",
		"size": 2637,
		"path": "../public/assets/routes-DynKueZ-.js"
	},
	"/assets/settings-2GH6wj7X.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e7-sOaDfOv51oRTi3NbvmJ6OoPbH20\"",
		"mtime": "2026-10-13T15:13:14.763Z",
		"size": 487,
		"path": "../public/assets/settings-2GH6wj7X.js"
	},
	"/assets/shield-check-Djzt63kg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"140-Hb6+ImKYLTyMKORxqiB5jj8pGMk\"",
		"mtime": "2026-10-13T15:13:14.763Z",
		"size": 320,
		"path": "../public/assets/shield-check-Djzt63kg.js"
	},
	"/assets/source-form-B9Kl4WHW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c12-OtzOtn1WjEMRM/1ltMAA0F+pFXI\"",
		"mtime": "2026-10-13T15:13:14.763Z",
		"size": 3090,
		"path": "../public/assets/source-form-B9Kl4WHW.js"
	},
	"/assets/styles-C6dvGzVB.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"138ba-GYGIYEIg018oOUU1jH9Kkcj3/NU\"",
		"mtime": "2026-10-13T15:13:14.765Z",
		"size": 80058,
		"path": "../public/assets/styles-C6dvGzVB.css"
	},
	"/assets/switch-Cm1csDs9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12dd-sNKgXA19Og5xvIBkyS2W2WXLMAw\"",
		"mtime": "2026-10-13T15:13:14.764Z",
		"size": 4829,
		"path": "../public/assets/switch-Cm1csDs9.js"
	},
	"/assets/tv-DUoZ45GY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b9-Yl7pEzPwu1yVSQECCLU2wh50XQg\"",
		"mtime": "2026-10-13T15:13:14.764Z",
		"size": 185,
		"path": "../public/assets/tv-DUoZ45GY.js"
	},
	"/assets/useBaseQuery-Ct1qLPpr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f1c-r7mcP99/+OACvgSfUAMBGpl6+Mo\"",
		"mtime": "2026-10-13T15:13:14.764Z",
		"size": 7964,
		"path": "../public/assets/useBaseQuery-Ct1qLPpr.js"
	},
	"/assets/useServerFn-XOSkwdrz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"167-p5rsM4iz55M1oGlFiFPZppCay2o\"",
		"mtime": "2026-10-13T15:13:14.764Z",
		"size": 359,
		"path": "../public/assets/useServerFn-XOSkwdrz.js"
	},
	"/assets/utils-4jUIYOBc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6bed-90NGITyc+kEKvxUkUtkYHgO1XH4\"",
		"mtime": "2026-10-13T15:13:14.765Z",
		"size": 27629,
		"path": "../public/assets/utils-4jUIYOBc.js"
	},
	"/assets/hls-BhcDaTqf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8c546-hnGn8vIsciiCtsWkmKZ1VwsqkPQ\"",
		"mtime": "2026-10-13T15:13:14.760Z",
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
