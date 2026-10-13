globalThis.__nitro_main__ = import.meta.url;
import { c as serve, s as NodeResponse } from "./_libs/h3-v2+rou3+srvx.mjs";
import { i as toEventHandler, n as defineHandler, o as HTTPError, r as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { i as withoutTrailingSlash, n as joinURL, r as withLeadingSlash, t as decodePath } from "./_libs/ufo.mjs";
import { promises } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
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
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"9f-HO14TyKd/4qwktFzfKfM5KZm5e8\"",
		"mtime": "2026-10-13T11:53:15.839Z",
		"size": 159,
		"path": "../public/robots.txt"
	},
	"/assets/admin-Bb6J6V-9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c5a-Ja+odghvKLXD6AI0Ndh6Jc8mRAU\"",
		"mtime": "2026-10-13T11:53:12.180Z",
		"size": 7258,
		"path": "../public/assets/admin-Bb6J6V-9.js"
	},
	"/assets/admin-DO4H8r3y.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ac-1taJFc+0HkIh90XtTVC9PeLv40Q\"",
		"mtime": "2026-10-13T11:53:12.181Z",
		"size": 172,
		"path": "../public/assets/admin-DO4H8r3y.js"
	},
	"/assets/admin-aDQgwBbw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d8-8+379TlqE+MzEI2mzv+Eke4GOpY\"",
		"mtime": "2026-10-13T11:53:12.181Z",
		"size": 216,
		"path": "../public/assets/admin-aDQgwBbw.js"
	},
	"/assets/admin-ui-D9RkehOV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a98-eq1trmzxc5dCIzY5gqSK0Zr1pAA\"",
		"mtime": "2026-10-13T11:53:12.181Z",
		"size": 2712,
		"path": "../public/assets/admin-ui-D9RkehOV.js"
	},
	"/assets/admin.ativacoes-B25Jusa4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e6aa-1rDAmLesCNwCCxw9NfGGbmmmsEU\"",
		"mtime": "2026-10-13T11:53:12.182Z",
		"size": 59050,
		"path": "../public/assets/admin.ativacoes-B25Jusa4.js"
	},
	"/assets/admin.auditoria-C48hph2Q.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"570-uE/BaIiCfxpHEdcYDXtJirmd8Dk\"",
		"mtime": "2026-10-13T11:53:12.182Z",
		"size": 1392,
		"path": "../public/assets/admin.auditoria-C48hph2Q.js"
	},
	"/assets/admin.clientes-7V9KuWGz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11ff-6oNny/12/TXqdnh29TQVSXRfxxE\"",
		"mtime": "2026-10-13T11:53:12.182Z",
		"size": 4607,
		"path": "../public/assets/admin.clientes-7V9KuWGz.js"
	},
	"/assets/admin.configuracoes-BRzhQzkR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6c4-Er5RZShEAh1XPRz+woQrmsCdFLo\"",
		"mtime": "2026-10-13T11:53:12.183Z",
		"size": 1732,
		"path": "../public/assets/admin.configuracoes-BRzhQzkR.js"
	},
	"/assets/admin.cupons-DNDrDQcU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b43-MEwtJVXNLTmucSYfIKYWcU0x3Tg\"",
		"mtime": "2026-10-13T11:53:12.183Z",
		"size": 2883,
		"path": "../public/assets/admin.cupons-DNDrDQcU.js"
	},
	"/assets/admin.dispositivos-DwK6TRgD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a23-7H4vzmwFfAFnR3AbVoywqJ/gHBE\"",
		"mtime": "2026-10-13T11:53:12.183Z",
		"size": 6691,
		"path": "../public/assets/admin.dispositivos-DwK6TRgD.js"
	},
	"/assets/admin.fontes-DitKDiO_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a57-yIsWBx8dUQI6utm+1zPuhFpX3jM\"",
		"mtime": "2026-10-13T11:53:12.184Z",
		"size": 2647,
		"path": "../public/assets/admin.fontes-DitKDiO_.js"
	},
	"/assets/admin.index-BE7OdfJP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99c-Upsk0wFUny7KnnV9MXxrI27+WvM\"",
		"mtime": "2026-10-13T11:53:12.184Z",
		"size": 2460,
		"path": "../public/assets/admin.index-BE7OdfJP.js"
	},
	"/assets/admin.planos-CViye0N9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d02-9sGNiwbenHSjyQi3jiD70vRCiY0\"",
		"mtime": "2026-10-13T11:53:12.184Z",
		"size": 3330,
		"path": "../public/assets/admin.planos-CViye0N9.js"
	},
	"/assets/admin.servidores-psmtcPLJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1415-itG0neOJZPPsuQi7yI3OVH0INj4\"",
		"mtime": "2026-10-13T11:53:12.185Z",
		"size": 5141,
		"path": "../public/assets/admin.servidores-psmtcPLJ.js"
	},
	"/assets/admin.usuarios-CSYWtslX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b8f-jwj90U0m5U4taORVTQDsontz9ZQ\"",
		"mtime": "2026-10-13T11:53:12.185Z",
		"size": 2959,
		"path": "../public/assets/admin.usuarios-CSYWtslX.js"
	},
	"/assets/admin.vendas-DxMbBDgm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12e8-gI461o6hLPbG+Z+pfe9av5qXRrY\"",
		"mtime": "2026-10-13T11:53:12.185Z",
		"size": 4840,
		"path": "../public/assets/admin.vendas-DxMbBDgm.js"
	},
	"/assets/ativar-CBIL5-Bg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"aa1-tK78EjDqJTlIj/Ee4Xx27UwesmA\"",
		"mtime": "2026-10-13T11:53:12.185Z",
		"size": 2721,
		"path": "../public/assets/ativar-CBIL5-Bg.js"
	},
	"/assets/brand-CfT84gmH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"870-ykrM74zKTrZw9mWTZV4Dm/v5Eis\"",
		"mtime": "2026-10-13T11:53:12.186Z",
		"size": 2160,
		"path": "../public/assets/brand-CfT84gmH.js"
	},
	"/assets/button-DeIv-qIn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12da-IF7+JtWA8rLfolDSS8EiUXVHM4k\"",
		"mtime": "2026-10-13T11:53:12.186Z",
		"size": 4826,
		"path": "../public/assets/button-DeIv-qIn.js"
	},
	"/assets/cliente-ZWvH75Mt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"902-Vc6rsOLM0iYqeL1ZNqi5Svg6Xus\"",
		"mtime": "2026-10-13T11:53:12.186Z",
		"size": 2306,
		"path": "../public/assets/cliente-ZWvH75Mt.js"
	},
	"/assets/copy-BmHJmYOU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ec-vCUeeGphC4Xgze5Nvdth85mmQUE\"",
		"mtime": "2026-10-13T11:53:12.187Z",
		"size": 236,
		"path": "../public/assets/copy-BmHJmYOU.js"
	},
	"/assets/createLucideIcon-C8f4lLaO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4a0-NTAL9M0j6LxzNovOonT9n48Sqbg\"",
		"mtime": "2026-10-13T11:53:12.187Z",
		"size": 1184,
		"path": "../public/assets/createLucideIcon-C8f4lLaO.js"
	},
	"/assets/device-client-WFY6Hzd0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"465-tzFn0gGAy9ABFW/2OvNwFnpG0uk\"",
		"mtime": "2026-10-13T11:53:12.187Z",
		"size": 1125,
		"path": "../public/assets/device-client-WFY6Hzd0.js"
	},
	"/assets/dialog-BKecTB0N.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"70d0-Q2W5Ds9EWze+fym1YNCpavWWdC8\"",
		"mtime": "2026-10-13T11:53:12.188Z",
		"size": 28880,
		"path": "../public/assets/dialog-BKecTB0N.js"
	},
	"/assets/dist-A9sXpi_a.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e86-LffCP4opFK/F+gqm6MuULoa9dQ0\"",
		"mtime": "2026-10-13T11:53:12.188Z",
		"size": 7814,
		"path": "../public/assets/dist-A9sXpi_a.js"
	},
	"/assets/dist-CAvSC6oU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d2b-OrryJgETSRU+3HvhNjPyQYo2A9g\"",
		"mtime": "2026-10-13T11:53:12.188Z",
		"size": 7467,
		"path": "../public/assets/dist-CAvSC6oU.js"
	},
	"/assets/index-ivwaPC2Z.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"647c9-Hjve5J5WcQ+Dhdctsvks9bbAbC8\"",
		"mtime": "2026-10-13T11:53:12.180Z",
		"size": 411593,
		"path": "../public/assets/index-ivwaPC2Z.js"
	},
	"/assets/input-BD2X6wsI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"284-x72vg0L/7vpVmrC54UlDP0n2DSQ\"",
		"mtime": "2026-10-13T11:53:12.189Z",
		"size": 644,
		"path": "../public/assets/input-BD2X6wsI.js"
	},
	"/assets/key-round-DP4XvNfR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"163-HoFL7pU2Av0hJmK3VxowPIC/eDU\"",
		"mtime": "2026-10-13T11:53:12.189Z",
		"size": 355,
		"path": "../public/assets/key-round-DP4XvNfR.js"
	},
	"/assets/planos-Bfe-knCx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2b96-DsB71g02ShoGE0WoZar1PFq1SgQ\"",
		"mtime": "2026-10-13T11:53:12.190Z",
		"size": 11158,
		"path": "../public/assets/planos-Bfe-knCx.js"
	},
	"/assets/planos-C-mUYudy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a4-7OmmYnDMI5z7B0ascJCAACDUxg4\"",
		"mtime": "2026-10-13T11:53:12.190Z",
		"size": 164,
		"path": "../public/assets/planos-C-mUYudy.js"
	},
	"/assets/planos-D3CfnDLe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b7-mZ9jqXtJSqE2V1mFIa1loIKz0z8\"",
		"mtime": "2026-10-13T11:53:12.190Z",
		"size": 183,
		"path": "../public/assets/planos-D3CfnDLe.js"
	},
	"/assets/plus-CK5_0ous.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99-2+n67wU2592DEqxWenmrt9AhuAE\"",
		"mtime": "2026-10-13T11:53:12.191Z",
		"size": 153,
		"path": "../public/assets/plus-CK5_0ous.js"
	},
	"/assets/player-qwO0DH6C.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2ffb-kKH3FKGeawUfBB5l11ToUpbIaSM\"",
		"mtime": "2026-10-13T11:53:12.190Z",
		"size": 12283,
		"path": "../public/assets/player-qwO0DH6C.js"
	},
	"/assets/react-yIOJJ3r4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"20d2-kVhPh4bAQsY8cpxNQjSFv8q1v2A\"",
		"mtime": "2026-10-13T11:53:12.191Z",
		"size": 8402,
		"path": "../public/assets/react-yIOJJ3r4.js"
	},
	"/assets/refresh-cw-BVYdCPl3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"141-N5HomBB+2zrwqZi95HqvSLKmsHo\"",
		"mtime": "2026-10-13T11:53:12.191Z",
		"size": 321,
		"path": "../public/assets/refresh-cw-BVYdCPl3.js"
	},
	"/assets/routes-CcQ3SQZ9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a4e-ak9gEJaE2W6ACzgjgqJ6SYLN2wE\"",
		"mtime": "2026-10-13T11:53:12.192Z",
		"size": 2638,
		"path": "../public/assets/routes-CcQ3SQZ9.js"
	},
	"/assets/server-BlF7IxQk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"152-kyTietkyyrtUyPEGOuPFYnvXdDg\"",
		"mtime": "2026-10-13T11:53:12.192Z",
		"size": 338,
		"path": "../public/assets/server-BlF7IxQk.js"
	},
	"/assets/settings-2GH6wj7X.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e7-sOaDfOv51oRTi3NbvmJ6OoPbH20\"",
		"mtime": "2026-10-13T11:53:12.192Z",
		"size": 487,
		"path": "../public/assets/settings-2GH6wj7X.js"
	},
	"/assets/shield-check-Djzt63kg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"140-Hb6+ImKYLTyMKORxqiB5jj8pGMk\"",
		"mtime": "2026-10-13T11:53:12.193Z",
		"size": 320,
		"path": "../public/assets/shield-check-Djzt63kg.js"
	},
	"/assets/source-form-Dz4LJfdQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c12-99WaatgIGWfjWBeocO1tfogJMDE\"",
		"mtime": "2026-10-13T11:53:12.193Z",
		"size": 3090,
		"path": "../public/assets/source-form-Dz4LJfdQ.js"
	},
	"/assets/styles-Cerhg-Hv.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"139a8-I6cPq/+zgnWmBauV/1vMeI5b9u8\"",
		"mtime": "2026-10-13T11:53:12.195Z",
		"size": 80296,
		"path": "../public/assets/styles-Cerhg-Hv.css"
	},
	"/assets/switch-CerO2W0e.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12dd-D33uo1VehuipkTdOfl1wodzUma4\"",
		"mtime": "2026-10-13T11:53:12.193Z",
		"size": 4829,
		"path": "../public/assets/switch-CerO2W0e.js"
	},
	"/assets/tv-DUoZ45GY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b9-Yl7pEzPwu1yVSQECCLU2wh50XQg\"",
		"mtime": "2026-10-13T11:53:12.194Z",
		"size": 185,
		"path": "../public/assets/tv-DUoZ45GY.js"
	},
	"/assets/useBaseQuery-BqH4R7vn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f20-0EJjxKDLntoeOLIt9AFr+zB10K0\"",
		"mtime": "2026-10-13T11:53:12.194Z",
		"size": 7968,
		"path": "../public/assets/useBaseQuery-BqH4R7vn.js"
	},
	"/assets/useServerFn-OYUJDo8I.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"167-q8iKw5/FwWbOLeK5XVg+ffqPkwo\"",
		"mtime": "2026-10-13T11:53:12.194Z",
		"size": 359,
		"path": "../public/assets/useServerFn-OYUJDo8I.js"
	},
	"/assets/utils-4jUIYOBc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6bed-90NGITyc+kEKvxUkUtkYHgO1XH4\"",
		"mtime": "2026-10-13T11:53:12.195Z",
		"size": 27629,
		"path": "../public/assets/utils-4jUIYOBc.js"
	},
	"/assets/hls-BhcDaTqf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8c546-hnGn8vIsciiCtsWkmKZ1VwsqkPQ\"",
		"mtime": "2026-10-13T11:53:12.189Z",
		"size": 574790,
		"path": "../public/assets/hls-BhcDaTqf.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets-node
function readAsset(id) {
	const serverDir = dirname(fileURLToPath(globalThis.__nitro_main__));
	return promises.readFile(resolve(serverDir, public_assets_data_default[id].path));
}
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
function getAsset(id) {
	return public_assets_data_default[id];
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/static.mjs
var METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
var EncodingMap = {
	gzip: ".gz",
	br: ".br",
	zstd: ".zst"
};
var static_default = defineHandler((event) => {
	if (event.req.method && !METHODS.has(event.req.method)) return;
	let id = decodePath(withLeadingSlash(withoutTrailingSlash(event.url.pathname)));
	let asset;
	const encodings = [...(event.req.headers.get("accept-encoding") || "").split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(), ""];
	for (const encoding of encodings) for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
		const _asset = getAsset(_id);
		if (_asset) {
			asset = _asset;
			id = _id;
			break;
		}
	}
	if (!asset) {
		if (isPublicAssetURL(id)) {
			event.res.headers.delete("Cache-Control");
			throw new HTTPError({ status: 404 });
		}
		return;
	}
	if (encodings.length > 1) event.res.headers.append("Vary", "Accept-Encoding");
	if (event.req.headers.get("if-none-match") === asset.etag) {
		event.res.status = 304;
		event.res.statusText = "Not Modified";
		return "";
	}
	const ifModifiedSinceH = event.req.headers.get("if-modified-since");
	const mtimeDate = new Date(asset.mtime);
	if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
		event.res.status = 304;
		event.res.statusText = "Not Modified";
		return "";
	}
	if (asset.type) event.res.headers.set("Content-Type", asset.type);
	if (asset.etag && !event.res.headers.has("ETag")) event.res.headers.set("ETag", asset.etag);
	if (asset.mtime && !event.res.headers.has("Last-Modified")) event.res.headers.set("Last-Modified", mtimeDate.toUTCString());
	if (asset.encoding && !event.res.headers.has("Content-Encoding")) event.res.headers.set("Content-Encoding", asset.encoding);
	if (asset.size > 0 && !event.res.headers.has("Content-Length")) event.res.headers.set("Content-Length", asset.size.toString());
	return readAsset(id);
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
var globalMiddleware = [toEventHandler(static_default)].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new NodeResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
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
	h3App["~middleware"].push(...globalMiddleware);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		middleware.push(...h3App["~middleware"]);
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
//#region node_modules/nitro/dist/runtime/internal/error/hooks.mjs
function _captureError(error, type) {
	console.error(`[${type}]`, error);
	useNitroApp().captureError?.(error, { tags: [type] });
}
function trapUnhandledErrors() {
	process.on("unhandledRejection", (error) => _captureError(error, "unhandledRejection"));
	process.on("uncaughtException", (error) => _captureError(error, "uncaughtException"));
}
//#endregion
//#region #nitro/virtual/tracing
var tracingSrvxPlugins = [];
//#endregion
//#region node_modules/nitro/dist/presets/node/runtime/node-server.mjs
var _parsedPort = Number.parseInt(process.env.NITRO_PORT ?? process.env.PORT ?? "");
var port = Number.isNaN(_parsedPort) ? 3e3 : _parsedPort;
var host = process.env.NITRO_HOST || process.env.HOST;
var cert = process.env.NITRO_SSL_CERT;
var key = process.env.NITRO_SSL_KEY;
var nitroApp = useNitroApp();
serve({
	port,
	hostname: host,
	tls: cert && key ? {
		cert,
		key
	} : void 0,
	fetch: nitroApp.fetch,
	plugins: [...tracingSrvxPlugins]
});
trapUnhandledErrors();
var node_server_default = {};
//#endregion
export { node_server_default as default };
