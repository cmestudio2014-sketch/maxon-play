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
		"mtime": "2026-10-11T10:51:29.214Z",
		"size": 159,
		"path": "../public/robots.txt"
	},
	"/assets/admin-CP4yHcYD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d8-NEJDfdS9T8BsSMVslToVgcjIILA\"",
		"mtime": "2026-10-11T10:51:25.895Z",
		"size": 216,
		"path": "../public/assets/admin-CP4yHcYD.js"
	},
	"/assets/admin-CZtWah62.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1bfd-HycRjnJuCaRLoozZLmXGY/t4qy8\"",
		"mtime": "2026-10-11T10:51:25.895Z",
		"size": 7165,
		"path": "../public/assets/admin-CZtWah62.js"
	},
	"/assets/admin-DkyLI_tk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ac-1CRO6BjshQX2J4I0tCzfMN3F1aU\"",
		"mtime": "2026-10-11T10:51:25.896Z",
		"size": 172,
		"path": "../public/assets/admin-DkyLI_tk.js"
	},
	"/assets/admin-ui-Csw-e_1z.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a97-9zTZsn8vYp7ekIo09EwS5A0/bqs\"",
		"mtime": "2026-10-11T10:51:25.896Z",
		"size": 2711,
		"path": "../public/assets/admin-ui-Csw-e_1z.js"
	},
	"/assets/admin.ativacoes-DiTDjExu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e6af-iB8MwrQtXKEK7ZXQcMQGeA23cu0\"",
		"mtime": "2026-10-11T10:51:25.896Z",
		"size": 59055,
		"path": "../public/assets/admin.ativacoes-DiTDjExu.js"
	},
	"/assets/admin.auditoria-DSDjb3kh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"570-btHthyQZUHxao+uXPBzZJ5oSBIU\"",
		"mtime": "2026-10-11T10:51:25.897Z",
		"size": 1392,
		"path": "../public/assets/admin.auditoria-DSDjb3kh.js"
	},
	"/assets/admin.clientes-picaQqFC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10fc-9N9V9y/18vDLKbmEUv6+aKH/kCA\"",
		"mtime": "2026-10-11T10:51:25.897Z",
		"size": 4348,
		"path": "../public/assets/admin.clientes-picaQqFC.js"
	},
	"/assets/admin.configuracoes-DGQqvS45.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6c4-zd5XTgC27KXeaMVDG1yW+eouQlQ\"",
		"mtime": "2026-10-11T10:51:25.897Z",
		"size": 1732,
		"path": "../public/assets/admin.configuracoes-DGQqvS45.js"
	},
	"/assets/admin.cupons-6p-g7u0z.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b43-OTYItfIb20/iZ1WjCUzL8wjE1zE\"",
		"mtime": "2026-10-11T10:51:25.897Z",
		"size": 2883,
		"path": "../public/assets/admin.cupons-6p-g7u0z.js"
	},
	"/assets/admin.dispositivos-Bc4E0sDh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a1e-RItg18oNTWUSB6W8GtB4srhS+8c\"",
		"mtime": "2026-10-11T10:51:25.898Z",
		"size": 6686,
		"path": "../public/assets/admin.dispositivos-Bc4E0sDh.js"
	},
	"/assets/admin.fontes-Wl3ZDfKE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a52-KGS0malq18+44TUPDDRo67gV6VA\"",
		"mtime": "2026-10-11T10:51:25.898Z",
		"size": 2642,
		"path": "../public/assets/admin.fontes-Wl3ZDfKE.js"
	},
	"/assets/admin.index-BoSDgv8S.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99c-2jxs5+FxpbmOMrQlCk7GIauWY+w\"",
		"mtime": "2026-10-11T10:51:25.898Z",
		"size": 2460,
		"path": "../public/assets/admin.index-BoSDgv8S.js"
	},
	"/assets/admin.planos-DNbs9Ww5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d02-ZauwWxZAUKr2W3pgNcdfFGTMk78\"",
		"mtime": "2026-10-11T10:51:25.899Z",
		"size": 3330,
		"path": "../public/assets/admin.planos-DNbs9Ww5.js"
	},
	"/assets/admin.usuarios-7Q0viu_0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b8f-iEDpbBP59ZYYM3xu9FoGcKEb240\"",
		"mtime": "2026-10-11T10:51:25.899Z",
		"size": 2959,
		"path": "../public/assets/admin.usuarios-7Q0viu_0.js"
	},
	"/assets/admin.vendas-CXdzBOAW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12e8-VVmqUWZoapOhQBXc97GlKUJFSWA\"",
		"mtime": "2026-10-11T10:51:25.899Z",
		"size": 4840,
		"path": "../public/assets/admin.vendas-CXdzBOAW.js"
	},
	"/assets/ativar-DUq-M44b.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"aa1-kFB16Tt4akPtg1I+PuOOuJT3tR0\"",
		"mtime": "2026-10-11T10:51:25.900Z",
		"size": 2721,
		"path": "../public/assets/ativar-DUq-M44b.js"
	},
	"/assets/brand-D6M_CBWz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"870-CgBxTU3RcNj7O02SPDv0RgJ03/c\"",
		"mtime": "2026-10-11T10:51:25.900Z",
		"size": 2160,
		"path": "../public/assets/brand-D6M_CBWz.js"
	},
	"/assets/button-Bl0VfzN_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12da-QeWtNrS8iq1bYdHd3/JOJNKylHA\"",
		"mtime": "2026-10-11T10:51:25.900Z",
		"size": 4826,
		"path": "../public/assets/button-Bl0VfzN_.js"
	},
	"/assets/cliente-Dk3Z03a1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"902-5Yr18VY1tq4u1yYlxwlmpQTAbD8\"",
		"mtime": "2026-10-11T10:51:25.901Z",
		"size": 2306,
		"path": "../public/assets/cliente-Dk3Z03a1.js"
	},
	"/assets/copy-BmHJmYOU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ec-vCUeeGphC4Xgze5Nvdth85mmQUE\"",
		"mtime": "2026-10-11T10:51:25.901Z",
		"size": 236,
		"path": "../public/assets/copy-BmHJmYOU.js"
	},
	"/assets/createLucideIcon-C8f4lLaO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4a0-NTAL9M0j6LxzNovOonT9n48Sqbg\"",
		"mtime": "2026-10-11T10:51:25.901Z",
		"size": 1184,
		"path": "../public/assets/createLucideIcon-C8f4lLaO.js"
	},
	"/assets/device-client-WFY6Hzd0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"465-tzFn0gGAy9ABFW/2OvNwFnpG0uk\"",
		"mtime": "2026-10-11T10:51:25.901Z",
		"size": 1125,
		"path": "../public/assets/device-client-WFY6Hzd0.js"
	},
	"/assets/dialog-CviTeXG6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"70d0-1yzeFKdynJc6Kh6eGRGYmgx8eEo\"",
		"mtime": "2026-10-11T10:51:25.902Z",
		"size": 28880,
		"path": "../public/assets/dialog-CviTeXG6.js"
	},
	"/assets/dist-B3nXzkwP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d2b-5Zt59Z/ymJv0K0f5ehs2p+Nu3fE\"",
		"mtime": "2026-10-11T10:51:25.902Z",
		"size": 7467,
		"path": "../public/assets/dist-B3nXzkwP.js"
	},
	"/assets/dist-Dw7TBhYo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e86-q5NqymhVUg4YyU8fY4cNQqP2J00\"",
		"mtime": "2026-10-11T10:51:25.903Z",
		"size": 7814,
		"path": "../public/assets/dist-Dw7TBhYo.js"
	},
	"/assets/key-round-DP4XvNfR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"163-HoFL7pU2Av0hJmK3VxowPIC/eDU\"",
		"mtime": "2026-10-11T10:51:25.904Z",
		"size": 355,
		"path": "../public/assets/key-round-DP4XvNfR.js"
	},
	"/assets/input-BXNxGW2V.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"284-QGuM3sFfl3LTYyzX9OvVc9aFQpE\"",
		"mtime": "2026-10-11T10:51:25.903Z",
		"size": 644,
		"path": "../public/assets/input-BXNxGW2V.js"
	},
	"/assets/planos-B2UdHj-m.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b7-50ANZHebnIWu1et/ixuA2BMxNOU\"",
		"mtime": "2026-10-11T10:51:25.904Z",
		"size": 183,
		"path": "../public/assets/planos-B2UdHj-m.js"
	},
	"/assets/index-CKNJTOtY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"644a3-7aXDSKqH9VdaUtToEr9Igzv4oMg\"",
		"mtime": "2026-10-11T10:51:25.895Z",
		"size": 410787,
		"path": "../public/assets/index-CKNJTOtY.js"
	},
	"/assets/planos-C80SdGic.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2b96-jVugOauDoD7SPrjXtePatv5CGLY\"",
		"mtime": "2026-10-11T10:51:25.904Z",
		"size": 11158,
		"path": "../public/assets/planos-C80SdGic.js"
	},
	"/assets/planos-DOa10jqg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a4-cvIGOK3B9yBlaj5b1B4te6DQH7U\"",
		"mtime": "2026-10-11T10:51:25.905Z",
		"size": 164,
		"path": "../public/assets/planos-DOa10jqg.js"
	},
	"/assets/player-DfojARyG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30ce-xRY1U0mh1eCfP8mexNFl57h4htI\"",
		"mtime": "2026-10-11T10:51:25.905Z",
		"size": 12494,
		"path": "../public/assets/player-DfojARyG.js"
	},
	"/assets/plus-CK5_0ous.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99-2+n67wU2592DEqxWenmrt9AhuAE\"",
		"mtime": "2026-10-11T10:51:25.905Z",
		"size": 153,
		"path": "../public/assets/plus-CK5_0ous.js"
	},
	"/assets/react-yIOJJ3r4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"20d2-kVhPh4bAQsY8cpxNQjSFv8q1v2A\"",
		"mtime": "2026-10-11T10:51:25.906Z",
		"size": 8402,
		"path": "../public/assets/react-yIOJJ3r4.js"
	},
	"/assets/routes-B6_98izF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a4e-jebE/k8Qnk+ROk0jr4/JfGqpVC8\"",
		"mtime": "2026-10-11T10:51:25.906Z",
		"size": 2638,
		"path": "../public/assets/routes-B6_98izF.js"
	},
	"/assets/settings-2GH6wj7X.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e7-sOaDfOv51oRTi3NbvmJ6OoPbH20\"",
		"mtime": "2026-10-11T10:51:25.906Z",
		"size": 487,
		"path": "../public/assets/settings-2GH6wj7X.js"
	},
	"/assets/shield-check-Djzt63kg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"140-Hb6+ImKYLTyMKORxqiB5jj8pGMk\"",
		"mtime": "2026-10-11T10:51:25.906Z",
		"size": 320,
		"path": "../public/assets/shield-check-Djzt63kg.js"
	},
	"/assets/source-form-fbTIptPY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c12-xg5RfDr2ZEsYJUvRm5kJ2Dd9Oxk\"",
		"mtime": "2026-10-11T10:51:25.907Z",
		"size": 3090,
		"path": "../public/assets/source-form-fbTIptPY.js"
	},
	"/assets/styles-C6dvGzVB.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"138ba-GYGIYEIg018oOUU1jH9Kkcj3/NU\"",
		"mtime": "2026-10-11T10:51:25.909Z",
		"size": 80058,
		"path": "../public/assets/styles-C6dvGzVB.css"
	},
	"/assets/switch-CamvHivF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12dd-ktVoGQYGUB6X7sb+xWvcuwYGzlY\"",
		"mtime": "2026-10-11T10:51:25.907Z",
		"size": 4829,
		"path": "../public/assets/switch-CamvHivF.js"
	},
	"/assets/tv-DUoZ45GY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b9-Yl7pEzPwu1yVSQECCLU2wh50XQg\"",
		"mtime": "2026-10-11T10:51:25.907Z",
		"size": 185,
		"path": "../public/assets/tv-DUoZ45GY.js"
	},
	"/assets/useBaseQuery-BlpXnaZA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f1c-ttUjIkvX4imtXJMKaltYXHajdAI\"",
		"mtime": "2026-10-11T10:51:25.908Z",
		"size": 7964,
		"path": "../public/assets/useBaseQuery-BlpXnaZA.js"
	},
	"/assets/useServerFn-B7zK3ZKB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"167-hbTpfkfIhVIBNl3zzZ5MlcssNYM\"",
		"mtime": "2026-10-11T10:51:25.908Z",
		"size": 359,
		"path": "../public/assets/useServerFn-B7zK3ZKB.js"
	},
	"/assets/utils-4jUIYOBc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6bed-90NGITyc+kEKvxUkUtkYHgO1XH4\"",
		"mtime": "2026-10-11T10:51:25.908Z",
		"size": 27629,
		"path": "../public/assets/utils-4jUIYOBc.js"
	},
	"/assets/hls-BhcDaTqf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8c546-hnGn8vIsciiCtsWkmKZ1VwsqkPQ\"",
		"mtime": "2026-10-11T10:51:25.903Z",
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
