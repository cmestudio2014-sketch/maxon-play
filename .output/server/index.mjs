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
		"mtime": "2026-10-09T22:45:28.177Z",
		"size": 159,
		"path": "../public/robots.txt"
	},
	"/assets/admin-BdDBTjFz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ac-mN67uIGNXGFU7aekR98LndfGdk0\"",
		"mtime": "2026-10-09T22:45:22.047Z",
		"size": 172,
		"path": "../public/assets/admin-BdDBTjFz.js"
	},
	"/assets/admin-BxTzvo8y.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1bfd-qoUGtIpRkIZv6NrVPGbT7zS+xF0\"",
		"mtime": "2026-10-09T22:45:22.047Z",
		"size": 7165,
		"path": "../public/assets/admin-BxTzvo8y.js"
	},
	"/assets/admin-Bxu2bSSi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d8-ap53F+GtV+b4y81qebkJQn4G4Co\"",
		"mtime": "2026-10-09T22:45:22.048Z",
		"size": 216,
		"path": "../public/assets/admin-Bxu2bSSi.js"
	},
	"/assets/admin-ui-DXmNvlD1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a97-opv3aeYou9qVSx9dVijWmsoGzYA\"",
		"mtime": "2026-10-09T22:45:22.048Z",
		"size": 2711,
		"path": "../public/assets/admin-ui-DXmNvlD1.js"
	},
	"/assets/admin.ativacoes-CrhxjOkH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e6af-pAAqMbnfK873PBSmnOZf66R/6eo\"",
		"mtime": "2026-10-09T22:45:22.049Z",
		"size": 59055,
		"path": "../public/assets/admin.ativacoes-CrhxjOkH.js"
	},
	"/assets/admin.auditoria-BPOfadbq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"570-i2Y34v2GQ7e2/vRKpuy6CURZQyQ\"",
		"mtime": "2026-10-09T22:45:22.049Z",
		"size": 1392,
		"path": "../public/assets/admin.auditoria-BPOfadbq.js"
	},
	"/assets/admin.clientes-ZmRBGD42.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e9d-oI/yCudo7AJW8T5x4dHiajIssxk\"",
		"mtime": "2026-10-09T22:45:22.050Z",
		"size": 3741,
		"path": "../public/assets/admin.clientes-ZmRBGD42.js"
	},
	"/assets/admin.configuracoes-D2zCf157.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6c4-GBiH+871UzeWsI/KzJm4oov4XyM\"",
		"mtime": "2026-10-09T22:45:22.050Z",
		"size": 1732,
		"path": "../public/assets/admin.configuracoes-D2zCf157.js"
	},
	"/assets/admin.cupons-DzmTYKIV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b43-a8x9+z7lgkfnb3CUps6d3uDKxe4\"",
		"mtime": "2026-10-09T22:45:22.051Z",
		"size": 2883,
		"path": "../public/assets/admin.cupons-DzmTYKIV.js"
	},
	"/assets/admin.dispositivos-D45wGTFj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a1e-kMdrXne0165mSHr62i2d5mpIOac\"",
		"mtime": "2026-10-09T22:45:22.051Z",
		"size": 6686,
		"path": "../public/assets/admin.dispositivos-D45wGTFj.js"
	},
	"/assets/admin.fontes-Bc6RdyH_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a52-FiOW8x+yvJr12roO9S/ZRtEAS3o\"",
		"mtime": "2026-10-09T22:45:22.052Z",
		"size": 2642,
		"path": "../public/assets/admin.fontes-Bc6RdyH_.js"
	},
	"/assets/admin.index-CLztnE01.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99c-YhkMAVBDYJkeUhq7ln8bqciF5Nc\"",
		"mtime": "2026-10-09T22:45:22.052Z",
		"size": 2460,
		"path": "../public/assets/admin.index-CLztnE01.js"
	},
	"/assets/admin.planos-BcTTUSns.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d02-VeyNCwX3YUgx6hiS7on0hfDTIHk\"",
		"mtime": "2026-10-09T22:45:22.053Z",
		"size": 3330,
		"path": "../public/assets/admin.planos-BcTTUSns.js"
	},
	"/assets/admin.usuarios-UcNjoHII.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b8f-C8OqUOuLSQKRzDAll87elu8X5lw\"",
		"mtime": "2026-10-09T22:45:22.053Z",
		"size": 2959,
		"path": "../public/assets/admin.usuarios-UcNjoHII.js"
	},
	"/assets/admin.vendas-Hw538pb3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12e8-zNOOLLWtsN/D8fTJGLA1v1j6rWk\"",
		"mtime": "2026-10-09T22:45:22.053Z",
		"size": 4840,
		"path": "../public/assets/admin.vendas-Hw538pb3.js"
	},
	"/assets/ativar-Cm57IChK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"aa1-L+gj53J3y4n29Kmmv1u4FaiEt5g\"",
		"mtime": "2026-10-09T22:45:22.054Z",
		"size": 2721,
		"path": "../public/assets/ativar-Cm57IChK.js"
	},
	"/assets/brand-DLrw_MR3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"870-5gH6s2gvI8UYdrEPj5c3jIW42zw\"",
		"mtime": "2026-10-09T22:45:22.054Z",
		"size": 2160,
		"path": "../public/assets/brand-DLrw_MR3.js"
	},
	"/assets/button-D-7JRPfB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12da-0foJ48f6GnXCQvDBagvDnHWgDTM\"",
		"mtime": "2026-10-09T22:45:22.055Z",
		"size": 4826,
		"path": "../public/assets/button-D-7JRPfB.js"
	},
	"/assets/cliente-ia-wPG7d.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"902-A7qezjWVjrj81lxm6RhMTcgcGKM\"",
		"mtime": "2026-10-09T22:45:22.055Z",
		"size": 2306,
		"path": "../public/assets/cliente-ia-wPG7d.js"
	},
	"/assets/copy-BmHJmYOU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ec-vCUeeGphC4Xgze5Nvdth85mmQUE\"",
		"mtime": "2026-10-09T22:45:22.056Z",
		"size": 236,
		"path": "../public/assets/copy-BmHJmYOU.js"
	},
	"/assets/createLucideIcon-C8f4lLaO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4a0-NTAL9M0j6LxzNovOonT9n48Sqbg\"",
		"mtime": "2026-10-09T22:45:22.056Z",
		"size": 1184,
		"path": "../public/assets/createLucideIcon-C8f4lLaO.js"
	},
	"/assets/device-client-WFY6Hzd0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"465-tzFn0gGAy9ABFW/2OvNwFnpG0uk\"",
		"mtime": "2026-10-09T22:45:22.057Z",
		"size": 1125,
		"path": "../public/assets/device-client-WFY6Hzd0.js"
	},
	"/assets/dist-CBv_y7BW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d2b-iLS6xpMp8QNfCgMkdrQPPRHHYhc\"",
		"mtime": "2026-10-09T22:45:22.058Z",
		"size": 7467,
		"path": "../public/assets/dist-CBv_y7BW.js"
	},
	"/assets/dialog-Bp_1MRTX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"70d0-qkMT16Fc7BIZMbReZ3LjQbd4vzo\"",
		"mtime": "2026-10-09T22:45:22.057Z",
		"size": 28880,
		"path": "../public/assets/dialog-Bp_1MRTX.js"
	},
	"/assets/dist-CwuVhErp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e86-BsbnIPnc1dxrvRXfjX8OMfDe2Yw\"",
		"mtime": "2026-10-09T22:45:22.058Z",
		"size": 7814,
		"path": "../public/assets/dist-CwuVhErp.js"
	},
	"/assets/input-DVbCDZcS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"284-t3KYZoYlRgUd6jjqYCtKUgBdDwk\"",
		"mtime": "2026-10-09T22:45:22.060Z",
		"size": 644,
		"path": "../public/assets/input-DVbCDZcS.js"
	},
	"/assets/key-round-DP4XvNfR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"163-HoFL7pU2Av0hJmK3VxowPIC/eDU\"",
		"mtime": "2026-10-09T22:45:22.060Z",
		"size": 355,
		"path": "../public/assets/key-round-DP4XvNfR.js"
	},
	"/assets/index-REPW_Bc0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6443d-ybe7yx7BovfrKU9FjWaU9v4ossM\"",
		"mtime": "2026-10-09T22:45:22.046Z",
		"size": 410685,
		"path": "../public/assets/index-REPW_Bc0.js"
	},
	"/assets/planos-BKmC-K0F.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b7-WVc7gcoClOQuq+vMxFgG4Fi9fV4\"",
		"mtime": "2026-10-09T22:45:22.061Z",
		"size": 183,
		"path": "../public/assets/planos-BKmC-K0F.js"
	},
	"/assets/planos-C2iBcifV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a4-CADKVdCQ0PBDZjHAJyeyFZp2IKM\"",
		"mtime": "2026-10-09T22:45:22.061Z",
		"size": 164,
		"path": "../public/assets/planos-C2iBcifV.js"
	},
	"/assets/planos-D7UXrSzs.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2b96-yUfy4/bwqBOh1Q5FIpenMBZyCf8\"",
		"mtime": "2026-10-09T22:45:22.062Z",
		"size": 11158,
		"path": "../public/assets/planos-D7UXrSzs.js"
	},
	"/assets/player-DnBtREP1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30ce-rPviDXfN6b6jSV04lGKAHOTku3s\"",
		"mtime": "2026-10-09T22:45:22.062Z",
		"size": 12494,
		"path": "../public/assets/player-DnBtREP1.js"
	},
	"/assets/plus-CK5_0ous.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99-2+n67wU2592DEqxWenmrt9AhuAE\"",
		"mtime": "2026-10-09T22:45:22.063Z",
		"size": 153,
		"path": "../public/assets/plus-CK5_0ous.js"
	},
	"/assets/react-yIOJJ3r4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"20d2-kVhPh4bAQsY8cpxNQjSFv8q1v2A\"",
		"mtime": "2026-10-09T22:45:22.063Z",
		"size": 8402,
		"path": "../public/assets/react-yIOJJ3r4.js"
	},
	"/assets/routes-CI8gzyHR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a4e-mpeUgCLWbgF/m8pbtTqj3JI6pDk\"",
		"mtime": "2026-10-09T22:45:22.064Z",
		"size": 2638,
		"path": "../public/assets/routes-CI8gzyHR.js"
	},
	"/assets/settings-2GH6wj7X.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e7-sOaDfOv51oRTi3NbvmJ6OoPbH20\"",
		"mtime": "2026-10-09T22:45:22.064Z",
		"size": 487,
		"path": "../public/assets/settings-2GH6wj7X.js"
	},
	"/assets/shield-check-Djzt63kg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"140-Hb6+ImKYLTyMKORxqiB5jj8pGMk\"",
		"mtime": "2026-10-09T22:45:22.065Z",
		"size": 320,
		"path": "../public/assets/shield-check-Djzt63kg.js"
	},
	"/assets/source-form-Bk001KTt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c12-zbbm3OxC/7+G9MPxsEviq58sNdQ\"",
		"mtime": "2026-10-09T22:45:22.065Z",
		"size": 3090,
		"path": "../public/assets/source-form-Bk001KTt.js"
	},
	"/assets/styles-C6dvGzVB.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"138ba-GYGIYEIg018oOUU1jH9Kkcj3/NU\"",
		"mtime": "2026-10-09T22:45:22.069Z",
		"size": 80058,
		"path": "../public/assets/styles-C6dvGzVB.css"
	},
	"/assets/switch-B2J3P8nT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12dd-46LI1jLHTzbJjQ+NeONG/PQ7J2M\"",
		"mtime": "2026-10-09T22:45:22.066Z",
		"size": 4829,
		"path": "../public/assets/switch-B2J3P8nT.js"
	},
	"/assets/tv-DUoZ45GY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b9-Yl7pEzPwu1yVSQECCLU2wh50XQg\"",
		"mtime": "2026-10-09T22:45:22.067Z",
		"size": 185,
		"path": "../public/assets/tv-DUoZ45GY.js"
	},
	"/assets/useBaseQuery-Da1BVKUx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f1c-D4wDwGX+NNk/a9pPXEfxT1rrpnA\"",
		"mtime": "2026-10-09T22:45:22.067Z",
		"size": 7964,
		"path": "../public/assets/useBaseQuery-Da1BVKUx.js"
	},
	"/assets/useServerFn-CZfhA5f-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"167-1OqCU7/CRiEjD88tRXh3pDkNzxM\"",
		"mtime": "2026-10-09T22:45:22.068Z",
		"size": 359,
		"path": "../public/assets/useServerFn-CZfhA5f-.js"
	},
	"/assets/utils-4jUIYOBc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6bed-90NGITyc+kEKvxUkUtkYHgO1XH4\"",
		"mtime": "2026-10-09T22:45:22.068Z",
		"size": 27629,
		"path": "../public/assets/utils-4jUIYOBc.js"
	},
	"/assets/hls-BhcDaTqf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8c546-hnGn8vIsciiCtsWkmKZ1VwsqkPQ\"",
		"mtime": "2026-10-09T22:45:22.059Z",
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
var _lazy_8XUH_4 = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_8XUH_4
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
