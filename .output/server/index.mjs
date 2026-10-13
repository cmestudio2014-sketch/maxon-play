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
		"mtime": "2026-10-13T11:34:22.853Z",
		"size": 159,
		"path": "../public/robots.txt"
	},
	"/assets/admin-B_EUDhiV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ac-oXudnLlBPtou21G/vMIW5WcfSt8\"",
		"mtime": "2026-10-13T11:34:19.079Z",
		"size": 172,
		"path": "../public/assets/admin-B_EUDhiV.js"
	},
	"/assets/admin-BJ3yDFw8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d8-2OgcmlPchCTUb/PX/HmKxgOeSuA\"",
		"mtime": "2026-10-13T11:34:19.078Z",
		"size": 216,
		"path": "../public/assets/admin-BJ3yDFw8.js"
	},
	"/assets/admin-Kduidmjp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c5a-uQsiLsrLUmJ5zEw59UuGfXE80v0\"",
		"mtime": "2026-10-13T11:34:19.079Z",
		"size": 7258,
		"path": "../public/assets/admin-Kduidmjp.js"
	},
	"/assets/admin-ui-BZJ4oCZ2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a98-0hqNV/z/nEe5QLgO9NpOORTvGck\"",
		"mtime": "2026-10-13T11:34:19.079Z",
		"size": 2712,
		"path": "../public/assets/admin-ui-BZJ4oCZ2.js"
	},
	"/assets/admin.ativacoes-DzPSlywg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e6af-QYNSOrAap17z4Rh3TTQ/tcxnFIA\"",
		"mtime": "2026-10-13T11:34:19.079Z",
		"size": 59055,
		"path": "../public/assets/admin.ativacoes-DzPSlywg.js"
	},
	"/assets/admin.auditoria-DngMySsH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"570-2gfaq7jRRt2t7e6UMWadSnnFC6w\"",
		"mtime": "2026-10-13T11:34:19.080Z",
		"size": 1392,
		"path": "../public/assets/admin.auditoria-DngMySsH.js"
	},
	"/assets/admin.clientes-DTHmf2UL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11ff-qsSNDgrME1wPFIIrtayTdxyQeKk\"",
		"mtime": "2026-10-13T11:34:19.080Z",
		"size": 4607,
		"path": "../public/assets/admin.clientes-DTHmf2UL.js"
	},
	"/assets/admin.configuracoes-BSIxuUSB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6c4-fCkESv2oJTtNfQAcwM6Qy+Lc4vs\"",
		"mtime": "2026-10-13T11:34:19.080Z",
		"size": 1732,
		"path": "../public/assets/admin.configuracoes-BSIxuUSB.js"
	},
	"/assets/admin.cupons-JktuLeo7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b43-1UdWz80j3bX8mP7Xv7clf9j2lpw\"",
		"mtime": "2026-10-13T11:34:19.081Z",
		"size": 2883,
		"path": "../public/assets/admin.cupons-JktuLeo7.js"
	},
	"/assets/admin.dispositivos-BCL_Rxu2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a23-4A9oLfosc1ssFD3RwBUcVVEusJY\"",
		"mtime": "2026-10-13T11:34:19.081Z",
		"size": 6691,
		"path": "../public/assets/admin.dispositivos-BCL_Rxu2.js"
	},
	"/assets/admin.fontes-s9zfKqna.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a57-EPNJ4LJ8FgRTfg8e3EktpccXWm8\"",
		"mtime": "2026-10-13T11:34:19.081Z",
		"size": 2647,
		"path": "../public/assets/admin.fontes-s9zfKqna.js"
	},
	"/assets/admin.index-amLfMEPa.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99c-Inpyk+meAsy9hkETtnWjHDG5J6E\"",
		"mtime": "2026-10-13T11:34:19.082Z",
		"size": 2460,
		"path": "../public/assets/admin.index-amLfMEPa.js"
	},
	"/assets/admin.planos-BJQUYqT_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d02-pOF8MHBvqtp80aijY6ZGyAJpu4Q\"",
		"mtime": "2026-10-13T11:34:19.082Z",
		"size": 3330,
		"path": "../public/assets/admin.planos-BJQUYqT_.js"
	},
	"/assets/admin.servidores-VRoIAWYK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"be9-aJenaRB18Soo73/U9c4P0pTvOgQ\"",
		"mtime": "2026-10-13T11:34:19.082Z",
		"size": 3049,
		"path": "../public/assets/admin.servidores-VRoIAWYK.js"
	},
	"/assets/admin.usuarios-B2KNUcNg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b8f-Dycie6gNFn2sLCDvwjD9DmV7eDg\"",
		"mtime": "2026-10-13T11:34:19.082Z",
		"size": 2959,
		"path": "../public/assets/admin.usuarios-B2KNUcNg.js"
	},
	"/assets/admin.vendas-B6n5YnSS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12e8-76B5v+jCDmdrMH2iw7PZW0C1PLw\"",
		"mtime": "2026-10-13T11:34:19.083Z",
		"size": 4840,
		"path": "../public/assets/admin.vendas-B6n5YnSS.js"
	},
	"/assets/ativar-CSLvv7yB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"aa1-DkoIQoCDVD/P2mYgUg9yWxUgxfY\"",
		"mtime": "2026-10-13T11:34:19.083Z",
		"size": 2721,
		"path": "../public/assets/ativar-CSLvv7yB.js"
	},
	"/assets/brand-gKA8rnrr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"870-O2G65f5qVgrAc1o1E7+ytjtcW5k\"",
		"mtime": "2026-10-13T11:34:19.083Z",
		"size": 2160,
		"path": "../public/assets/brand-gKA8rnrr.js"
	},
	"/assets/button-YHpw5Jb5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12da-MtnrX+2Z6SoDWFlRub5eVuJFpZU\"",
		"mtime": "2026-10-13T11:34:19.084Z",
		"size": 4826,
		"path": "../public/assets/button-YHpw5Jb5.js"
	},
	"/assets/cliente-DV1ek4S1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"902-uvGvpvhtiwsJcjoVpm3tkEhxxP0\"",
		"mtime": "2026-10-13T11:34:19.084Z",
		"size": 2306,
		"path": "../public/assets/cliente-DV1ek4S1.js"
	},
	"/assets/copy-BmHJmYOU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ec-vCUeeGphC4Xgze5Nvdth85mmQUE\"",
		"mtime": "2026-10-13T11:34:19.084Z",
		"size": 236,
		"path": "../public/assets/copy-BmHJmYOU.js"
	},
	"/assets/createLucideIcon-C8f4lLaO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4a0-NTAL9M0j6LxzNovOonT9n48Sqbg\"",
		"mtime": "2026-10-13T11:34:19.085Z",
		"size": 1184,
		"path": "../public/assets/createLucideIcon-C8f4lLaO.js"
	},
	"/assets/device-client-WFY6Hzd0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"465-tzFn0gGAy9ABFW/2OvNwFnpG0uk\"",
		"mtime": "2026-10-13T11:34:19.085Z",
		"size": 1125,
		"path": "../public/assets/device-client-WFY6Hzd0.js"
	},
	"/assets/dialog-frxKzMFh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"70d0-YXblWTlQx7zSMdxliqOfbYkDf30\"",
		"mtime": "2026-10-13T11:34:19.085Z",
		"size": 28880,
		"path": "../public/assets/dialog-frxKzMFh.js"
	},
	"/assets/dist-CPvdK_v7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d2b-5zNaSuvmo2d4pWVitKfETO7NtFI\"",
		"mtime": "2026-10-13T11:34:19.086Z",
		"size": 7467,
		"path": "../public/assets/dist-CPvdK_v7.js"
	},
	"/assets/dist-uKSzuqR0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e86-F4pli/LYeNmt++xMvoX5pqMhedU\"",
		"mtime": "2026-10-13T11:34:19.086Z",
		"size": 7814,
		"path": "../public/assets/dist-uKSzuqR0.js"
	},
	"/assets/key-round-DP4XvNfR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"163-HoFL7pU2Av0hJmK3VxowPIC/eDU\"",
		"mtime": "2026-10-13T11:34:19.087Z",
		"size": 355,
		"path": "../public/assets/key-round-DP4XvNfR.js"
	},
	"/assets/planos-BltOqudD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b7-3NPmIs2dxXIoRiF/wncerxaqSDI\"",
		"mtime": "2026-10-13T11:34:19.087Z",
		"size": 183,
		"path": "../public/assets/planos-BltOqudD.js"
	},
	"/assets/input-By3E1nca.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"284-0Svog3ZVaOZ+t0hCPsg1XvR7PEc\"",
		"mtime": "2026-10-13T11:34:19.087Z",
		"size": 644,
		"path": "../public/assets/input-By3E1nca.js"
	},
	"/assets/planos-D59ZwN-n.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2b96-BVnP++yOfncDBPHeFA1kDM3Ic4A\"",
		"mtime": "2026-10-13T11:34:19.088Z",
		"size": 11158,
		"path": "../public/assets/planos-D59ZwN-n.js"
	},
	"/assets/planos-DGstK0vf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a4-xjY7ZL93HTPuE1NbG87G2jMoD9Y\"",
		"mtime": "2026-10-13T11:34:19.088Z",
		"size": 164,
		"path": "../public/assets/planos-DGstK0vf.js"
	},
	"/assets/plus-CK5_0ous.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99-2+n67wU2592DEqxWenmrt9AhuAE\"",
		"mtime": "2026-10-13T11:34:19.089Z",
		"size": 153,
		"path": "../public/assets/plus-CK5_0ous.js"
	},
	"/assets/player-DA_bpuJ8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30ce-6zTAzVAlaLJHqzIBF30yQWCR0Ao\"",
		"mtime": "2026-10-13T11:34:19.088Z",
		"size": 12494,
		"path": "../public/assets/player-DA_bpuJ8.js"
	},
	"/assets/index-B6rt4NQV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"64737-b22xHAJHtXRGrH8LvxZGDtPwMzQ\"",
		"mtime": "2026-10-13T11:34:19.078Z",
		"size": 411447,
		"path": "../public/assets/index-B6rt4NQV.js"
	},
	"/assets/react-yIOJJ3r4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"20d2-kVhPh4bAQsY8cpxNQjSFv8q1v2A\"",
		"mtime": "2026-10-13T11:34:19.089Z",
		"size": 8402,
		"path": "../public/assets/react-yIOJJ3r4.js"
	},
	"/assets/routes-3drHTgrd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a4e-LC23RKjww3yT9oRZX+8zbSAP1iU\"",
		"mtime": "2026-10-13T11:34:19.089Z",
		"size": 2638,
		"path": "../public/assets/routes-3drHTgrd.js"
	},
	"/assets/server-BlF7IxQk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"152-kyTietkyyrtUyPEGOuPFYnvXdDg\"",
		"mtime": "2026-10-13T11:34:19.090Z",
		"size": 338,
		"path": "../public/assets/server-BlF7IxQk.js"
	},
	"/assets/settings-2GH6wj7X.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e7-sOaDfOv51oRTi3NbvmJ6OoPbH20\"",
		"mtime": "2026-10-13T11:34:19.090Z",
		"size": 487,
		"path": "../public/assets/settings-2GH6wj7X.js"
	},
	"/assets/shield-check-Djzt63kg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"140-Hb6+ImKYLTyMKORxqiB5jj8pGMk\"",
		"mtime": "2026-10-13T11:34:19.090Z",
		"size": 320,
		"path": "../public/assets/shield-check-Djzt63kg.js"
	},
	"/assets/source-form-Bh3bufox.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c12-SYo+9/SeQiLfiVLUcx49sDxifUk\"",
		"mtime": "2026-10-13T11:34:19.090Z",
		"size": 3090,
		"path": "../public/assets/source-form-Bh3bufox.js"
	},
	"/assets/styles-C6dvGzVB.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"138ba-GYGIYEIg018oOUU1jH9Kkcj3/NU\"",
		"mtime": "2026-10-13T11:34:19.092Z",
		"size": 80058,
		"path": "../public/assets/styles-C6dvGzVB.css"
	},
	"/assets/switch-Cv1qcUsB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12dd-aSya9YwV1TvZRL56VbygGjFycKI\"",
		"mtime": "2026-10-13T11:34:19.091Z",
		"size": 4829,
		"path": "../public/assets/switch-Cv1qcUsB.js"
	},
	"/assets/tv-DUoZ45GY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b9-Yl7pEzPwu1yVSQECCLU2wh50XQg\"",
		"mtime": "2026-10-13T11:34:19.091Z",
		"size": 185,
		"path": "../public/assets/tv-DUoZ45GY.js"
	},
	"/assets/useBaseQuery-MWLbVDa7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f1f-ICuHJaI5p6ftvjo7G9o3/0lLAMQ\"",
		"mtime": "2026-10-13T11:34:19.091Z",
		"size": 7967,
		"path": "../public/assets/useBaseQuery-MWLbVDa7.js"
	},
	"/assets/useServerFn-M34ZjPvT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"167-qeAfhdZQb6Hr7QX4SUmuZueI5Ao\"",
		"mtime": "2026-10-13T11:34:19.092Z",
		"size": 359,
		"path": "../public/assets/useServerFn-M34ZjPvT.js"
	},
	"/assets/utils-4jUIYOBc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6bed-90NGITyc+kEKvxUkUtkYHgO1XH4\"",
		"mtime": "2026-10-13T11:34:19.092Z",
		"size": 27629,
		"path": "../public/assets/utils-4jUIYOBc.js"
	},
	"/assets/hls-BhcDaTqf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8c546-hnGn8vIsciiCtsWkmKZ1VwsqkPQ\"",
		"mtime": "2026-10-13T11:34:19.086Z",
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
