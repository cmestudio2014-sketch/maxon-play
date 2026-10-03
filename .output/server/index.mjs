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
		"mtime": "2026-10-03T16:55:38.310Z",
		"size": 159,
		"path": "../public/robots.txt"
	},
	"/assets/admin-Co6GTXeh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ac-sKIGh18oPHz3MFL3bgDEBFj41y4\"",
		"mtime": "2026-10-03T16:55:33.945Z",
		"size": 172,
		"path": "../public/assets/admin-Co6GTXeh.js"
	},
	"/assets/admin-DC6cxN9B.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1bfb-gZWTd0YFgRFH573ZWt9sp0SsKv8\"",
		"mtime": "2026-10-03T16:55:33.945Z",
		"size": 7163,
		"path": "../public/assets/admin-DC6cxN9B.js"
	},
	"/assets/admin-DoRFV5DN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d8-H4x06BABssEQL63TUhPt8pa/F0c\"",
		"mtime": "2026-10-03T16:55:33.946Z",
		"size": 216,
		"path": "../public/assets/admin-DoRFV5DN.js"
	},
	"/assets/admin-ui-rFvhjjEk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a97-e2fng/iNSOu6ZlYtVR9TlthTAGE\"",
		"mtime": "2026-10-03T16:55:33.946Z",
		"size": 2711,
		"path": "../public/assets/admin-ui-rFvhjjEk.js"
	},
	"/assets/admin.ativacoes-TNB_OUHH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e691-/6VSZypP05GEB+obPQTeC/qcZ5M\"",
		"mtime": "2026-10-03T16:55:33.946Z",
		"size": 59025,
		"path": "../public/assets/admin.ativacoes-TNB_OUHH.js"
	},
	"/assets/admin.auditoria-XDwwbGam.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"570-0Y2KAugByNvNokyCryL8dj9nXFI\"",
		"mtime": "2026-10-03T16:55:33.947Z",
		"size": 1392,
		"path": "../public/assets/admin.auditoria-XDwwbGam.js"
	},
	"/assets/admin.clientes-DFFl39NJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e7d-1Z72a9s5yVY2ykXnp/cgRG5W1dI\"",
		"mtime": "2026-10-03T16:55:33.947Z",
		"size": 3709,
		"path": "../public/assets/admin.clientes-DFFl39NJ.js"
	},
	"/assets/admin.configuracoes-BmxFh5WE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6c4-T/TnZUiLc/wndTGyFtM1ta/vhZU\"",
		"mtime": "2026-10-03T16:55:33.948Z",
		"size": 1732,
		"path": "../public/assets/admin.configuracoes-BmxFh5WE.js"
	},
	"/assets/admin.cupons-BS9uDxpa.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b23-74KeASRCi2Rngp0nKVOUn1W/q0U\"",
		"mtime": "2026-10-03T16:55:33.948Z",
		"size": 2851,
		"path": "../public/assets/admin.cupons-BS9uDxpa.js"
	},
	"/assets/admin.dispositivos-5cCnlsxq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a36-ZAMqnuldAIURL2JdV5R2psfB83A\"",
		"mtime": "2026-10-03T16:55:33.948Z",
		"size": 2614,
		"path": "../public/assets/admin.dispositivos-5cCnlsxq.js"
	},
	"/assets/admin.fontes-BpEOwKpz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a2d-T252zi5iYlia+zeAZ5QxRWeO8H4\"",
		"mtime": "2026-10-03T16:55:33.949Z",
		"size": 2605,
		"path": "../public/assets/admin.fontes-BpEOwKpz.js"
	},
	"/assets/admin.index-D5vV3gk7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99c-TD1e8WpkqE/UUoBhN4hvaueX1H8\"",
		"mtime": "2026-10-03T16:55:33.949Z",
		"size": 2460,
		"path": "../public/assets/admin.index-D5vV3gk7.js"
	},
	"/assets/admin.planos-DCvUb5LD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ce2-g+3cIo5eky9DhGYoaFd/ernQSt0\"",
		"mtime": "2026-10-03T16:55:33.949Z",
		"size": 3298,
		"path": "../public/assets/admin.planos-DCvUb5LD.js"
	},
	"/assets/admin.usuarios-C30TELMn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b6f-RLY0eWcJzlD84c05l/x95H52Bc8\"",
		"mtime": "2026-10-03T16:55:33.950Z",
		"size": 2927,
		"path": "../public/assets/admin.usuarios-C30TELMn.js"
	},
	"/assets/admin.vendas-Ac_J-Zo0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12c3-3Q0ScpRX3AO6ew6rhyG+VbytgCs\"",
		"mtime": "2026-10-03T16:55:33.950Z",
		"size": 4803,
		"path": "../public/assets/admin.vendas-Ac_J-Zo0.js"
	},
	"/assets/ativar-CNxwZD-f.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"aa0-xfdkUO/BGgG2zu7c3YeBSuSlxe0\"",
		"mtime": "2026-10-03T16:55:33.950Z",
		"size": 2720,
		"path": "../public/assets/ativar-CNxwZD-f.js"
	},
	"/assets/brand-D9s9wChU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"86f-Em5eK8vaxe3U0A5yw3VXRvBBBJI\"",
		"mtime": "2026-10-03T16:55:33.951Z",
		"size": 2159,
		"path": "../public/assets/brand-D9s9wChU.js"
	},
	"/assets/button-e7B8i4ww.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12da-NgSI7GYUJv591xVQyH/GDzSx63k\"",
		"mtime": "2026-10-03T16:55:33.951Z",
		"size": 4826,
		"path": "../public/assets/button-e7B8i4ww.js"
	},
	"/assets/cliente-DeLiJf9d.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"902-Bo1JL5u+fvsMGu/CV+r1mQ2oEug\"",
		"mtime": "2026-10-03T16:55:33.951Z",
		"size": 2306,
		"path": "../public/assets/cliente-DeLiJf9d.js"
	},
	"/assets/copy-BmHJmYOU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ec-vCUeeGphC4Xgze5Nvdth85mmQUE\"",
		"mtime": "2026-10-03T16:55:33.952Z",
		"size": 236,
		"path": "../public/assets/copy-BmHJmYOU.js"
	},
	"/assets/createLucideIcon-C8f4lLaO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4a0-NTAL9M0j6LxzNovOonT9n48Sqbg\"",
		"mtime": "2026-10-03T16:55:33.952Z",
		"size": 1184,
		"path": "../public/assets/createLucideIcon-C8f4lLaO.js"
	},
	"/assets/device-client-WFY6Hzd0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"465-tzFn0gGAy9ABFW/2OvNwFnpG0uk\"",
		"mtime": "2026-10-03T16:55:33.952Z",
		"size": 1125,
		"path": "../public/assets/device-client-WFY6Hzd0.js"
	},
	"/assets/dialog-CZGhOLdU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7131-yUQ1NBMYXcn+aMOrhO6/rqCb6K4\"",
		"mtime": "2026-10-03T16:55:33.953Z",
		"size": 28977,
		"path": "../public/assets/dialog-CZGhOLdU.js"
	},
	"/assets/dist-BmgRz-SQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d2b-6jyVhMMCSje0o0LME4GWDy3nKy0\"",
		"mtime": "2026-10-03T16:55:33.953Z",
		"size": 7467,
		"path": "../public/assets/dist-BmgRz-SQ.js"
	},
	"/assets/dist-Dyndfa4G.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e86-PTJEhD3q5ExQCz6NfEjmi54qafg\"",
		"mtime": "2026-10-03T16:55:33.953Z",
		"size": 7814,
		"path": "../public/assets/dist-Dyndfa4G.js"
	},
	"/assets/input-JSkkXm8Z.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"284-CHe94nsz+Xw6g5KbatyepTfBVSU\"",
		"mtime": "2026-10-03T16:55:33.954Z",
		"size": 644,
		"path": "../public/assets/input-JSkkXm8Z.js"
	},
	"/assets/key-round-DP4XvNfR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"163-HoFL7pU2Av0hJmK3VxowPIC/eDU\"",
		"mtime": "2026-10-03T16:55:33.954Z",
		"size": 355,
		"path": "../public/assets/key-round-DP4XvNfR.js"
	},
	"/assets/planos-BX0Ejj-c.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a4-Al2/gmcmSkbie0P4PsFI7BTBtX4\"",
		"mtime": "2026-10-03T16:55:33.955Z",
		"size": 164,
		"path": "../public/assets/planos-BX0Ejj-c.js"
	},
	"/assets/index-B0FbRwRF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"64329-OqKGlwBaKmuf1eUVAVk0M9MMsGA\"",
		"mtime": "2026-10-03T16:55:33.945Z",
		"size": 410409,
		"path": "../public/assets/index-B0FbRwRF.js"
	},
	"/assets/planos-D_Od0Z8d.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b7-bYODlXHox1UPHnwcK7NmnscJZ4c\"",
		"mtime": "2026-10-03T16:55:33.955Z",
		"size": 183,
		"path": "../public/assets/planos-D_Od0Z8d.js"
	},
	"/assets/planos-di3LkYyD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2b96-q89DHKguHLIImQi6gZj1GSGOsSo\"",
		"mtime": "2026-10-03T16:55:33.955Z",
		"size": 11158,
		"path": "../public/assets/planos-di3LkYyD.js"
	},
	"/assets/player-IqNCpcTm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30cd-bht0YzwsnjJcQIpwG359rzWa6sk\"",
		"mtime": "2026-10-03T16:55:33.955Z",
		"size": 12493,
		"path": "../public/assets/player-IqNCpcTm.js"
	},
	"/assets/react-yIOJJ3r4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"20d2-kVhPh4bAQsY8cpxNQjSFv8q1v2A\"",
		"mtime": "2026-10-03T16:55:33.956Z",
		"size": 8402,
		"path": "../public/assets/react-yIOJJ3r4.js"
	},
	"/assets/routes-BvBhDyZK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a4d-DG7CP4hN63JuS2vpcXh9AQkemyo\"",
		"mtime": "2026-10-03T16:55:33.956Z",
		"size": 2637,
		"path": "../public/assets/routes-BvBhDyZK.js"
	},
	"/assets/settings-2GH6wj7X.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e7-sOaDfOv51oRTi3NbvmJ6OoPbH20\"",
		"mtime": "2026-10-03T16:55:33.956Z",
		"size": 487,
		"path": "../public/assets/settings-2GH6wj7X.js"
	},
	"/assets/shield-check-Djzt63kg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"140-Hb6+ImKYLTyMKORxqiB5jj8pGMk\"",
		"mtime": "2026-10-03T16:55:33.957Z",
		"size": 320,
		"path": "../public/assets/shield-check-Djzt63kg.js"
	},
	"/assets/source-form-DNF_4cGA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c12-+m5jvtpaz4wgaopMMu4C3J9S9Dc\"",
		"mtime": "2026-10-03T16:55:33.957Z",
		"size": 3090,
		"path": "../public/assets/source-form-DNF_4cGA.js"
	},
	"/assets/styles-C6dvGzVB.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"138ba-GYGIYEIg018oOUU1jH9Kkcj3/NU\"",
		"mtime": "2026-10-03T16:55:33.959Z",
		"size": 80058,
		"path": "../public/assets/styles-C6dvGzVB.css"
	},
	"/assets/switch-DQyp2KD-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12dd-yUH4LRb2rD8kAk4x2p0xI48695o\"",
		"mtime": "2026-10-03T16:55:33.957Z",
		"size": 4829,
		"path": "../public/assets/switch-DQyp2KD-.js"
	},
	"/assets/tv-DUoZ45GY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b9-Yl7pEzPwu1yVSQECCLU2wh50XQg\"",
		"mtime": "2026-10-03T16:55:33.957Z",
		"size": 185,
		"path": "../public/assets/tv-DUoZ45GY.js"
	},
	"/assets/useBaseQuery-CPHtxT1-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f1c-t5Dci9xA4e3sc6TQO0RePV/XW3A\"",
		"mtime": "2026-10-03T16:55:33.958Z",
		"size": 7964,
		"path": "../public/assets/useBaseQuery-CPHtxT1-.js"
	},
	"/assets/useServerFn-BFpTRTAc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"166-ZW8z+2VpZzUZWdPtqZHxH7aSc0A\"",
		"mtime": "2026-10-03T16:55:33.958Z",
		"size": 358,
		"path": "../public/assets/useServerFn-BFpTRTAc.js"
	},
	"/assets/utils-4jUIYOBc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6bed-90NGITyc+kEKvxUkUtkYHgO1XH4\"",
		"mtime": "2026-10-03T16:55:33.958Z",
		"size": 27629,
		"path": "../public/assets/utils-4jUIYOBc.js"
	},
	"/assets/hls-BhcDaTqf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8c546-hnGn8vIsciiCtsWkmKZ1VwsqkPQ\"",
		"mtime": "2026-10-03T16:55:33.954Z",
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
var _lazy_ZklH2F = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_ZklH2F
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
