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
		"mtime": "2026-10-11T10:43:52.085Z",
		"size": 159,
		"path": "../public/robots.txt"
	},
	"/assets/admin-CBsLjipT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1bfd-uqVUq1lZpbKDdWUDEI6u+1n45JE\"",
		"mtime": "2026-10-11T10:43:48.756Z",
		"size": 7165,
		"path": "../public/assets/admin-CBsLjipT.js"
	},
	"/assets/admin-CZM1vU2D.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d8-6MWYJF9XEXE2curEWwtezn+Wru0\"",
		"mtime": "2026-10-11T10:43:48.756Z",
		"size": 216,
		"path": "../public/assets/admin-CZM1vU2D.js"
	},
	"/assets/admin-DPLT-cvl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ac-tw9NdsmWcrTnrOdq+rq42uiUYmw\"",
		"mtime": "2026-10-11T10:43:48.757Z",
		"size": 172,
		"path": "../public/assets/admin-DPLT-cvl.js"
	},
	"/assets/admin-ui-gGvoJUxA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a97-HBmWtFKtPxeM77EJwtnASC7Yf0E\"",
		"mtime": "2026-10-11T10:43:48.757Z",
		"size": 2711,
		"path": "../public/assets/admin-ui-gGvoJUxA.js"
	},
	"/assets/admin.ativacoes-DfJWuu2z.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e6af-RfSiUif+DE+dAxqFI77koVhJ9tE\"",
		"mtime": "2026-10-11T10:43:48.757Z",
		"size": 59055,
		"path": "../public/assets/admin.ativacoes-DfJWuu2z.js"
	},
	"/assets/admin.auditoria-DdId4XEl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"570-NW/53/LWLBZ4B4OOoUv8oH+JKMk\"",
		"mtime": "2026-10-11T10:43:48.757Z",
		"size": 1392,
		"path": "../public/assets/admin.auditoria-DdId4XEl.js"
	},
	"/assets/admin.clientes-BTVxfCin.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10fc-0gXRVIHf2wgF5Cgr0LegKlt+Ydg\"",
		"mtime": "2026-10-11T10:43:48.758Z",
		"size": 4348,
		"path": "../public/assets/admin.clientes-BTVxfCin.js"
	},
	"/assets/admin.configuracoes-DlDBUyD-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6c4-4B0aT50KMt+K9Md0VvEVDMNZ6Fs\"",
		"mtime": "2026-10-11T10:43:48.758Z",
		"size": 1732,
		"path": "../public/assets/admin.configuracoes-DlDBUyD-.js"
	},
	"/assets/admin.cupons-Ccun3Pgq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b43-QnCdvafa/5C/WA7zdOeSPOlkFCk\"",
		"mtime": "2026-10-11T10:43:48.758Z",
		"size": 2883,
		"path": "../public/assets/admin.cupons-Ccun3Pgq.js"
	},
	"/assets/admin.dispositivos-Bs0zn9m0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a1e-MmnQeKnDMy/8KQ4DDHnkBoByZXM\"",
		"mtime": "2026-10-11T10:43:48.759Z",
		"size": 6686,
		"path": "../public/assets/admin.dispositivos-Bs0zn9m0.js"
	},
	"/assets/admin.fontes-Dax8Cc0N.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a52-OGEC8L4wF7VE8iy+BTsHIOBoe3A\"",
		"mtime": "2026-10-11T10:43:48.759Z",
		"size": 2642,
		"path": "../public/assets/admin.fontes-Dax8Cc0N.js"
	},
	"/assets/admin.index-BjjestYC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99c-bJ8V2NPMcD0upmLVfvk8094w1G0\"",
		"mtime": "2026-10-11T10:43:48.759Z",
		"size": 2460,
		"path": "../public/assets/admin.index-BjjestYC.js"
	},
	"/assets/admin.planos-DSzQh75n.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d02-H8IRqY1Pz5neQCkvErimdEDibco\"",
		"mtime": "2026-10-11T10:43:48.760Z",
		"size": 3330,
		"path": "../public/assets/admin.planos-DSzQh75n.js"
	},
	"/assets/admin.usuarios-DGVPHtQ6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b8f-kIN5UVkY/2POV4drJUdrZT58QPc\"",
		"mtime": "2026-10-11T10:43:48.760Z",
		"size": 2959,
		"path": "../public/assets/admin.usuarios-DGVPHtQ6.js"
	},
	"/assets/admin.vendas-xBW7RGhw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12e8-dadk1q4DGumKu+j6skZ5OUI6sqo\"",
		"mtime": "2026-10-11T10:43:48.760Z",
		"size": 4840,
		"path": "../public/assets/admin.vendas-xBW7RGhw.js"
	},
	"/assets/ativar-BsebEZhi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"aa1-qpSiNyXaCtZoR6S7qhvwEb8AODM\"",
		"mtime": "2026-10-11T10:43:48.761Z",
		"size": 2721,
		"path": "../public/assets/ativar-BsebEZhi.js"
	},
	"/assets/brand-8SP-3LTa.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"870-W7v+2XnwtA67a49slE5YEcNgvK8\"",
		"mtime": "2026-10-11T10:43:48.761Z",
		"size": 2160,
		"path": "../public/assets/brand-8SP-3LTa.js"
	},
	"/assets/button-BASNjIsk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12da-q+IrNizwpX+VSKY/kf4WwHfiRv0\"",
		"mtime": "2026-10-11T10:43:48.761Z",
		"size": 4826,
		"path": "../public/assets/button-BASNjIsk.js"
	},
	"/assets/cliente-BCXROH84.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"902-HSr1ce7uOj+uq8J5yAOhhPOhNjk\"",
		"mtime": "2026-10-11T10:43:48.762Z",
		"size": 2306,
		"path": "../public/assets/cliente-BCXROH84.js"
	},
	"/assets/copy-BmHJmYOU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ec-vCUeeGphC4Xgze5Nvdth85mmQUE\"",
		"mtime": "2026-10-11T10:43:48.762Z",
		"size": 236,
		"path": "../public/assets/copy-BmHJmYOU.js"
	},
	"/assets/createLucideIcon-C8f4lLaO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4a0-NTAL9M0j6LxzNovOonT9n48Sqbg\"",
		"mtime": "2026-10-11T10:43:48.762Z",
		"size": 1184,
		"path": "../public/assets/createLucideIcon-C8f4lLaO.js"
	},
	"/assets/device-client-WFY6Hzd0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"465-tzFn0gGAy9ABFW/2OvNwFnpG0uk\"",
		"mtime": "2026-10-11T10:43:48.762Z",
		"size": 1125,
		"path": "../public/assets/device-client-WFY6Hzd0.js"
	},
	"/assets/dialog-BpduezG6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"70d0-I7s07QjPjJnU5sKqMPU7fC9hI+o\"",
		"mtime": "2026-10-11T10:43:48.763Z",
		"size": 28880,
		"path": "../public/assets/dialog-BpduezG6.js"
	},
	"/assets/dist-BDXAut4V.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d2b-50leO9DlYUylRlgmvm7314j4e4I\"",
		"mtime": "2026-10-11T10:43:48.763Z",
		"size": 7467,
		"path": "../public/assets/dist-BDXAut4V.js"
	},
	"/assets/dist-DM_dEJvo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e86-9w5N4oYrCCDxXFIefCIHmz89/8w\"",
		"mtime": "2026-10-11T10:43:48.763Z",
		"size": 7814,
		"path": "../public/assets/dist-DM_dEJvo.js"
	},
	"/assets/input-B8CQistD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"284-Is6JlAYbqvxGOJiPRegxCBa+N6s\"",
		"mtime": "2026-10-11T10:43:48.764Z",
		"size": 644,
		"path": "../public/assets/input-B8CQistD.js"
	},
	"/assets/key-round-DP4XvNfR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"163-HoFL7pU2Av0hJmK3VxowPIC/eDU\"",
		"mtime": "2026-10-11T10:43:48.764Z",
		"size": 355,
		"path": "../public/assets/key-round-DP4XvNfR.js"
	},
	"/assets/planos-B7vrBU4A.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b7-69T2J/DvGj9UpMP/+Mg/cNQ9auQ\"",
		"mtime": "2026-10-11T10:43:48.765Z",
		"size": 183,
		"path": "../public/assets/planos-B7vrBU4A.js"
	},
	"/assets/planos-CmaliKZ7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2b96-m62keXtDPO024MHPdiKsj4NExcI\"",
		"mtime": "2026-10-11T10:43:48.765Z",
		"size": 11158,
		"path": "../public/assets/planos-CmaliKZ7.js"
	},
	"/assets/planos-D09ypM3k.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a4-1/8AJj9doc7ZvTLMFt3sRfCmRRI\"",
		"mtime": "2026-10-11T10:43:48.765Z",
		"size": 164,
		"path": "../public/assets/planos-D09ypM3k.js"
	},
	"/assets/player--_22PYeJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30ce-vQy1jMf4cxVknZZlkuzOTaJPLxQ\"",
		"mtime": "2026-10-11T10:43:48.766Z",
		"size": 12494,
		"path": "../public/assets/player--_22PYeJ.js"
	},
	"/assets/plus-CK5_0ous.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99-2+n67wU2592DEqxWenmrt9AhuAE\"",
		"mtime": "2026-10-11T10:43:48.766Z",
		"size": 153,
		"path": "../public/assets/plus-CK5_0ous.js"
	},
	"/assets/react-yIOJJ3r4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"20d2-kVhPh4bAQsY8cpxNQjSFv8q1v2A\"",
		"mtime": "2026-10-11T10:43:48.766Z",
		"size": 8402,
		"path": "../public/assets/react-yIOJJ3r4.js"
	},
	"/assets/routes-DXzgbz16.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a4e-Jl/1A0eVxfZIYY3giocnXJyJ86E\"",
		"mtime": "2026-10-11T10:43:48.767Z",
		"size": 2638,
		"path": "../public/assets/routes-DXzgbz16.js"
	},
	"/assets/settings-2GH6wj7X.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e7-sOaDfOv51oRTi3NbvmJ6OoPbH20\"",
		"mtime": "2026-10-11T10:43:48.767Z",
		"size": 487,
		"path": "../public/assets/settings-2GH6wj7X.js"
	},
	"/assets/shield-check-Djzt63kg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"140-Hb6+ImKYLTyMKORxqiB5jj8pGMk\"",
		"mtime": "2026-10-11T10:43:48.767Z",
		"size": 320,
		"path": "../public/assets/shield-check-Djzt63kg.js"
	},
	"/assets/source-form-D5ind7TW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c12-mdC0/dAtY0s4ifgGA4EMbHCHP9o\"",
		"mtime": "2026-10-11T10:43:48.768Z",
		"size": 3090,
		"path": "../public/assets/source-form-D5ind7TW.js"
	},
	"/assets/switch-cluhgRJR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12dd-AtIfUPrne1SfKbhhmCWUnVNu3hE\"",
		"mtime": "2026-10-11T10:43:48.768Z",
		"size": 4829,
		"path": "../public/assets/switch-cluhgRJR.js"
	},
	"/assets/tv-DUoZ45GY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b9-Yl7pEzPwu1yVSQECCLU2wh50XQg\"",
		"mtime": "2026-10-11T10:43:48.768Z",
		"size": 185,
		"path": "../public/assets/tv-DUoZ45GY.js"
	},
	"/assets/index-Bap9J-jP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6443d-EGQqeVcTQfPCihX+z9vm81E4ME4\"",
		"mtime": "2026-10-11T10:43:48.756Z",
		"size": 410685,
		"path": "../public/assets/index-Bap9J-jP.js"
	},
	"/assets/useBaseQuery-BXxEawx-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f1c-T94nM4Fqo21UXit9FpEiLv3mLWI\"",
		"mtime": "2026-10-11T10:43:48.769Z",
		"size": 7964,
		"path": "../public/assets/useBaseQuery-BXxEawx-.js"
	},
	"/assets/styles-C6dvGzVB.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"138ba-GYGIYEIg018oOUU1jH9Kkcj3/NU\"",
		"mtime": "2026-10-11T10:43:48.769Z",
		"size": 80058,
		"path": "../public/assets/styles-C6dvGzVB.css"
	},
	"/assets/useServerFn-CT3JcHbN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"167-kK+Rt72h1Zzzyosw9T+JJoUMw/I\"",
		"mtime": "2026-10-11T10:43:48.769Z",
		"size": 359,
		"path": "../public/assets/useServerFn-CT3JcHbN.js"
	},
	"/assets/utils-4jUIYOBc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6bed-90NGITyc+kEKvxUkUtkYHgO1XH4\"",
		"mtime": "2026-10-11T10:43:48.769Z",
		"size": 27629,
		"path": "../public/assets/utils-4jUIYOBc.js"
	},
	"/assets/hls-BhcDaTqf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8c546-hnGn8vIsciiCtsWkmKZ1VwsqkPQ\"",
		"mtime": "2026-10-11T10:43:48.764Z",
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
