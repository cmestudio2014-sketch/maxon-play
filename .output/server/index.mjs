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
		"mtime": "2026-10-13T15:39:30.845Z",
		"size": 159,
		"path": "../public/robots.txt"
	},
	"/assets/admin-CkX5GYpZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1bfc-iNVFxX4XdVr/y87YGBf+8uzqrmM\"",
		"mtime": "2026-10-13T15:39:27.656Z",
		"size": 7164,
		"path": "../public/assets/admin-CkX5GYpZ.js"
	},
	"/assets/admin-DACRFUNs.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d8-CNBl9hGTaOm9pNuH1r/jYcX9syA\"",
		"mtime": "2026-10-13T15:39:27.656Z",
		"size": 216,
		"path": "../public/assets/admin-DACRFUNs.js"
	},
	"/assets/admin-Dk6nxBcQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ac-3QaIG7Ci1axY/mw+2WtpqHYAyeo\"",
		"mtime": "2026-10-13T15:39:27.657Z",
		"size": 172,
		"path": "../public/assets/admin-Dk6nxBcQ.js"
	},
	"/assets/admin-ui-BcGN849z.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a97-WQa1JSzX8j8x+j5omLrFIGdsyWE\"",
		"mtime": "2026-10-13T15:39:27.657Z",
		"size": 2711,
		"path": "../public/assets/admin-ui-BcGN849z.js"
	},
	"/assets/admin.ativacoes-L64Tc3kq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e687-My96ezEJ3rIfQXVgzsQA64NhXNw\"",
		"mtime": "2026-10-13T15:39:27.657Z",
		"size": 59015,
		"path": "../public/assets/admin.ativacoes-L64Tc3kq.js"
	},
	"/assets/admin.auditoria-CBgfO_HY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"570-QKnDG+u7isR3bEWwJsoSJjGC5WQ\"",
		"mtime": "2026-10-13T15:39:27.658Z",
		"size": 1392,
		"path": "../public/assets/admin.auditoria-CBgfO_HY.js"
	},
	"/assets/admin.clientes-CRIyxS6J.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1173-Paop3LtueI6jahsNOAz4J6fJv50\"",
		"mtime": "2026-10-13T15:39:27.658Z",
		"size": 4467,
		"path": "../public/assets/admin.clientes-CRIyxS6J.js"
	},
	"/assets/admin.configuracoes-wK6slfhP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6c4-2Oi8taD+0COxZQ9nIZTk4XI6tto\"",
		"mtime": "2026-10-13T15:39:27.658Z",
		"size": 1732,
		"path": "../public/assets/admin.configuracoes-wK6slfhP.js"
	},
	"/assets/admin.cupons-2oHXmUjm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b23-37TV6Y90pcPoFhWONyHky//8PBI\"",
		"mtime": "2026-10-13T15:39:27.658Z",
		"size": 2851,
		"path": "../public/assets/admin.cupons-2oHXmUjm.js"
	},
	"/assets/admin.dispositivos-C-RrR4Kf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a36-O7pZHRI6w/VvoBZTc+Vp6q/piPM\"",
		"mtime": "2026-10-13T15:39:27.659Z",
		"size": 2614,
		"path": "../public/assets/admin.dispositivos-C-RrR4Kf.js"
	},
	"/assets/admin.fontes-Cbp9rGh5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a32-pSml50w/w5g62OgdpO2TuvQNCvk\"",
		"mtime": "2026-10-13T15:39:27.659Z",
		"size": 2610,
		"path": "../public/assets/admin.fontes-Cbp9rGh5.js"
	},
	"/assets/admin.index-DU8t1YwK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99c-jCd7cep9i1DdG1nnKnaTxKTjLWs\"",
		"mtime": "2026-10-13T15:39:27.659Z",
		"size": 2460,
		"path": "../public/assets/admin.index-DU8t1YwK.js"
	},
	"/assets/admin.planos-WQAr_jO2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ce2-RSmGsQ4Ux+dUnzZKhdP+7APt7kw\"",
		"mtime": "2026-10-13T15:39:27.660Z",
		"size": 3298,
		"path": "../public/assets/admin.planos-WQAr_jO2.js"
	},
	"/assets/admin.usuarios-BVgf4Ad6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b6f-MBD+wXA0VigXVgEqJ/YuHovw5Jg\"",
		"mtime": "2026-10-13T15:39:27.660Z",
		"size": 2927,
		"path": "../public/assets/admin.usuarios-BVgf4Ad6.js"
	},
	"/assets/admin.vendas-pydtNldz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12c8-ZAgtypaGIDloLYFhRv4wXkRFSus\"",
		"mtime": "2026-10-13T15:39:27.660Z",
		"size": 4808,
		"path": "../public/assets/admin.vendas-pydtNldz.js"
	},
	"/assets/ativar-BWJB6NKv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"aa0-YBbv+cCcHjJc7UBMvs3/EA7K3g4\"",
		"mtime": "2026-10-13T15:39:27.661Z",
		"size": 2720,
		"path": "../public/assets/ativar-BWJB6NKv.js"
	},
	"/assets/brand-TsGMebkh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"86f-H9upQVSAf+mZ5+p83ufl4E1MK/4\"",
		"mtime": "2026-10-13T15:39:27.661Z",
		"size": 2159,
		"path": "../public/assets/brand-TsGMebkh.js"
	},
	"/assets/button-Bgpc0xua.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12da-sVPH+FYFqKx0db0G79w4nwjzZ9A\"",
		"mtime": "2026-10-13T15:39:27.661Z",
		"size": 4826,
		"path": "../public/assets/button-Bgpc0xua.js"
	},
	"/assets/cliente-fs5XlwVg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"902-28Bm+JS0efCq9GKx/UUo+pfKt94\"",
		"mtime": "2026-10-13T15:39:27.661Z",
		"size": 2306,
		"path": "../public/assets/cliente-fs5XlwVg.js"
	},
	"/assets/copy-BmHJmYOU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ec-vCUeeGphC4Xgze5Nvdth85mmQUE\"",
		"mtime": "2026-10-13T15:39:27.662Z",
		"size": 236,
		"path": "../public/assets/copy-BmHJmYOU.js"
	},
	"/assets/createLucideIcon-C8f4lLaO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4a0-NTAL9M0j6LxzNovOonT9n48Sqbg\"",
		"mtime": "2026-10-13T15:39:27.662Z",
		"size": 1184,
		"path": "../public/assets/createLucideIcon-C8f4lLaO.js"
	},
	"/assets/device-client-WFY6Hzd0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"465-tzFn0gGAy9ABFW/2OvNwFnpG0uk\"",
		"mtime": "2026-10-13T15:39:27.662Z",
		"size": 1125,
		"path": "../public/assets/device-client-WFY6Hzd0.js"
	},
	"/assets/dialog-D3pGrHwj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7131-C/rbfrtPWwasuY7IdLvss/HcirA\"",
		"mtime": "2026-10-13T15:39:27.663Z",
		"size": 28977,
		"path": "../public/assets/dialog-D3pGrHwj.js"
	},
	"/assets/dist-B9qerlgr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e86-e4dsq76Q2yHttKMsLIScnR/JMNY\"",
		"mtime": "2026-10-13T15:39:27.663Z",
		"size": 7814,
		"path": "../public/assets/dist-B9qerlgr.js"
	},
	"/assets/dist-Cn2UHMem.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d2b-CvBuvGiXkXWGhR9yW9JonokmbfU\"",
		"mtime": "2026-10-13T15:39:27.663Z",
		"size": 7467,
		"path": "../public/assets/dist-Cn2UHMem.js"
	},
	"/assets/input-CmAbW1HG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"284-WcWFGa96UosjLRmMABpJHLgRYIY\"",
		"mtime": "2026-10-13T15:39:27.664Z",
		"size": 644,
		"path": "../public/assets/input-CmAbW1HG.js"
	},
	"/assets/key-round-DP4XvNfR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"163-HoFL7pU2Av0hJmK3VxowPIC/eDU\"",
		"mtime": "2026-10-13T15:39:27.665Z",
		"size": 355,
		"path": "../public/assets/key-round-DP4XvNfR.js"
	},
	"/assets/planos-B7oRdxXt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a4-XsudfHYLR4rsC0fAmLTVHWIY+NY\"",
		"mtime": "2026-10-13T15:39:27.665Z",
		"size": 164,
		"path": "../public/assets/planos-B7oRdxXt.js"
	},
	"/assets/planos-BpUl322n.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2b96-lsPoRuviM05A35AWgzClK0fmjHc\"",
		"mtime": "2026-10-13T15:39:27.665Z",
		"size": 11158,
		"path": "../public/assets/planos-BpUl322n.js"
	},
	"/assets/planos-DMjRRa5B.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b7-Be3WIus+QlqJfXzMbzDc1Sl36JQ\"",
		"mtime": "2026-10-13T15:39:27.665Z",
		"size": 183,
		"path": "../public/assets/planos-DMjRRa5B.js"
	},
	"/assets/player-BU_48mpM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30cd-8MXXwNNN05W6ttv2KFURJDOfZy0\"",
		"mtime": "2026-10-13T15:39:27.666Z",
		"size": 12493,
		"path": "../public/assets/player-BU_48mpM.js"
	},
	"/assets/react-yIOJJ3r4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"20d2-kVhPh4bAQsY8cpxNQjSFv8q1v2A\"",
		"mtime": "2026-10-13T15:39:27.666Z",
		"size": 8402,
		"path": "../public/assets/react-yIOJJ3r4.js"
	},
	"/assets/routes-BsbUFduM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a4d-mEXx0Cnq9W1WPANG/LniV/0Mp58\"",
		"mtime": "2026-10-13T15:39:27.667Z",
		"size": 2637,
		"path": "../public/assets/routes-BsbUFduM.js"
	},
	"/assets/settings-2GH6wj7X.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e7-sOaDfOv51oRTi3NbvmJ6OoPbH20\"",
		"mtime": "2026-10-13T15:39:27.667Z",
		"size": 487,
		"path": "../public/assets/settings-2GH6wj7X.js"
	},
	"/assets/index-CaUhYiuU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"64398-ydY6NXYXeZ5cm5u8tydXcGkwzUk\"",
		"mtime": "2026-10-13T15:39:27.656Z",
		"size": 410520,
		"path": "../public/assets/index-CaUhYiuU.js"
	},
	"/assets/shield-check-Djzt63kg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"140-Hb6+ImKYLTyMKORxqiB5jj8pGMk\"",
		"mtime": "2026-10-13T15:39:27.667Z",
		"size": 320,
		"path": "../public/assets/shield-check-Djzt63kg.js"
	},
	"/assets/source-form-CCkf4s7Z.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c12-r8/vLBHB1+Jn9Uj21HgbmVcIEkw\"",
		"mtime": "2026-10-13T15:39:27.668Z",
		"size": 3090,
		"path": "../public/assets/source-form-CCkf4s7Z.js"
	},
	"/assets/styles-DXtwnKjN.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"138db-nxuH8+WrYPDmW1ik4pLG6nTnq0I\"",
		"mtime": "2026-10-13T15:39:27.669Z",
		"size": 80091,
		"path": "../public/assets/styles-DXtwnKjN.css"
	},
	"/assets/switch-B8Y42atj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12dd-F2psa3naAtYZeiACQi1uGp9Ge98\"",
		"mtime": "2026-10-13T15:39:27.668Z",
		"size": 4829,
		"path": "../public/assets/switch-B8Y42atj.js"
	},
	"/assets/tv-DUoZ45GY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b9-Yl7pEzPwu1yVSQECCLU2wh50XQg\"",
		"mtime": "2026-10-13T15:39:27.668Z",
		"size": 185,
		"path": "../public/assets/tv-DUoZ45GY.js"
	},
	"/assets/useBaseQuery-BKYYw0a0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f1c-sJnq+4WSiMM/Sr5PmojHaXF83kU\"",
		"mtime": "2026-10-13T15:39:27.668Z",
		"size": 7964,
		"path": "../public/assets/useBaseQuery-BKYYw0a0.js"
	},
	"/assets/useServerFn-BEhqZ5_M.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"167-HHnV7jtcNdvjOaR9+Uh6+71XchY\"",
		"mtime": "2026-10-13T15:39:27.669Z",
		"size": 359,
		"path": "../public/assets/useServerFn-BEhqZ5_M.js"
	},
	"/assets/utils-4jUIYOBc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6bed-90NGITyc+kEKvxUkUtkYHgO1XH4\"",
		"mtime": "2026-10-13T15:39:27.669Z",
		"size": 27629,
		"path": "../public/assets/utils-4jUIYOBc.js"
	},
	"/assets/hls-BhcDaTqf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8c546-hnGn8vIsciiCtsWkmKZ1VwsqkPQ\"",
		"mtime": "2026-10-13T15:39:27.664Z",
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
