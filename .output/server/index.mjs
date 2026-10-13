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
		"mtime": "2026-10-13T13:32:18.880Z",
		"size": 159,
		"path": "../public/robots.txt"
	},
	"/assets/admin-BCn-oQdu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d8-dtD9lLN/U41Udk9ElFzh/yV/D4w\"",
		"mtime": "2026-10-13T13:32:14.810Z",
		"size": 216,
		"path": "../public/assets/admin-BCn-oQdu.js"
	},
	"/assets/admin-DseBwN9-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ac-N35OukiAeDJAs4mFC+Sp1Hc5+/Y\"",
		"mtime": "2026-10-13T13:32:14.810Z",
		"size": 172,
		"path": "../public/assets/admin-DseBwN9-.js"
	},
	"/assets/admin-ui-y0Ni4GRh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a99-QZafKoG7dGASnRptmCf9LzKuf5Q\"",
		"mtime": "2026-10-13T13:32:14.810Z",
		"size": 2713,
		"path": "../public/assets/admin-ui-y0Ni4GRh.js"
	},
	"/assets/admin-xQRByW0R.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1cbf-WUYFbZVa/Yz/CPUyDt+kcwlyYpQ\"",
		"mtime": "2026-10-13T13:32:14.810Z",
		"size": 7359,
		"path": "../public/assets/admin-xQRByW0R.js"
	},
	"/assets/admin.ativacoes-Bg_c6NES.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e6b0-o4+JMeBJIIphYPGzxNBC6TYnzGI\"",
		"mtime": "2026-10-13T13:32:14.811Z",
		"size": 59056,
		"path": "../public/assets/admin.ativacoes-Bg_c6NES.js"
	},
	"/assets/admin.auditoria-Br06kqCU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"570-z65+UPyes/aldQKNZ4CknujZ3sM\"",
		"mtime": "2026-10-13T13:32:14.811Z",
		"size": 1392,
		"path": "../public/assets/admin.auditoria-Br06kqCU.js"
	},
	"/assets/admin.clientes-X0Sf8wM6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11ff-/3nQf2Ty8N29cIyQJGURVpaOv8Y\"",
		"mtime": "2026-10-13T13:32:14.811Z",
		"size": 4607,
		"path": "../public/assets/admin.clientes-X0Sf8wM6.js"
	},
	"/assets/admin.configuracoes-Cb4Q_y9l.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6c4-2GBNCTzPwrat0v57eSOjazd7n9I\"",
		"mtime": "2026-10-13T13:32:14.812Z",
		"size": 1732,
		"path": "../public/assets/admin.configuracoes-Cb4Q_y9l.js"
	},
	"/assets/admin.cupons-D9yZUSZ8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b43-r1vKRYOUAmcQDp6R2y3cNZUc7hc\"",
		"mtime": "2026-10-13T13:32:14.812Z",
		"size": 2883,
		"path": "../public/assets/admin.cupons-D9yZUSZ8.js"
	},
	"/assets/admin.dispositivos-BHXsjhSZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a23-0+rnwgY7rUg8Zc73V28AaeYGXVE\"",
		"mtime": "2026-10-13T13:32:14.812Z",
		"size": 6691,
		"path": "../public/assets/admin.dispositivos-BHXsjhSZ.js"
	},
	"/assets/admin.editor-listas-D0gOiXpW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2df9-5fFPX6qnclxWELD1fbLY1rA9f7g\"",
		"mtime": "2026-10-13T13:32:14.813Z",
		"size": 11769,
		"path": "../public/assets/admin.editor-listas-D0gOiXpW.js"
	},
	"/assets/admin.fontes-xqNuk6PM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a57-KeiJars72axSiIK0cBcADkN6XsM\"",
		"mtime": "2026-10-13T13:32:14.813Z",
		"size": 2647,
		"path": "../public/assets/admin.fontes-xqNuk6PM.js"
	},
	"/assets/admin.index-Xn2qxzcp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99c-HKXZasUm51Vwyfb9HGOEfjYqEaU\"",
		"mtime": "2026-10-13T13:32:14.813Z",
		"size": 2460,
		"path": "../public/assets/admin.index-Xn2qxzcp.js"
	},
	"/assets/admin.planos-CcGQfi9u.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d02-/l2bfqDF1gw9ZuJiqeiDFAJuprg\"",
		"mtime": "2026-10-13T13:32:14.814Z",
		"size": 3330,
		"path": "../public/assets/admin.planos-CcGQfi9u.js"
	},
	"/assets/admin.servidores-D4NRL4t2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1410-YJqrPd5xxLUnusjGLf+FBzwNdoo\"",
		"mtime": "2026-10-13T13:32:14.814Z",
		"size": 5136,
		"path": "../public/assets/admin.servidores-D4NRL4t2.js"
	},
	"/assets/admin.usuarios-BX0hksZ-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b8f-8yZs5VAsKM+AVVFvTogoDVdS2kA\"",
		"mtime": "2026-10-13T13:32:14.814Z",
		"size": 2959,
		"path": "../public/assets/admin.usuarios-BX0hksZ-.js"
	},
	"/assets/admin.vendas-BYZQyB90.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12e9-d7Hx/gFWF1CdNHuKN3JO9mu6Daw\"",
		"mtime": "2026-10-13T13:32:14.814Z",
		"size": 4841,
		"path": "../public/assets/admin.vendas-BYZQyB90.js"
	},
	"/assets/ativar-DvGX8CG5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"aa2-mp7RttGxOwvKlfSjfNAwwvAdqjw\"",
		"mtime": "2026-10-13T13:32:14.815Z",
		"size": 2722,
		"path": "../public/assets/ativar-DvGX8CG5.js"
	},
	"/assets/brand-CqNPPtsp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"870-9/dXYb8etBYwe13J9IlZgmZ9mTY\"",
		"mtime": "2026-10-13T13:32:14.815Z",
		"size": 2160,
		"path": "../public/assets/brand-CqNPPtsp.js"
	},
	"/assets/button-C1h16Qjv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12da-biMn354gNwRAEUPXqXrxU8/zv0k\"",
		"mtime": "2026-10-13T13:32:14.815Z",
		"size": 4826,
		"path": "../public/assets/button-C1h16Qjv.js"
	},
	"/assets/cliente-xtvkUkYx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"902-JD2fBUpHLUlOb59RAwuicqwlxNc\"",
		"mtime": "2026-10-13T13:32:14.816Z",
		"size": 2306,
		"path": "../public/assets/cliente-xtvkUkYx.js"
	},
	"/assets/copy-BmHJmYOU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ec-vCUeeGphC4Xgze5Nvdth85mmQUE\"",
		"mtime": "2026-10-13T13:32:14.816Z",
		"size": 236,
		"path": "../public/assets/copy-BmHJmYOU.js"
	},
	"/assets/createLucideIcon-C8f4lLaO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4a0-NTAL9M0j6LxzNovOonT9n48Sqbg\"",
		"mtime": "2026-10-13T13:32:14.816Z",
		"size": 1184,
		"path": "../public/assets/createLucideIcon-C8f4lLaO.js"
	},
	"/assets/device-client-WFY6Hzd0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"465-tzFn0gGAy9ABFW/2OvNwFnpG0uk\"",
		"mtime": "2026-10-13T13:32:14.817Z",
		"size": 1125,
		"path": "../public/assets/device-client-WFY6Hzd0.js"
	},
	"/assets/dialog-AecLNBwm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"70d0-TqpmSPUI2NkGGqB3iFCIItbm48w\"",
		"mtime": "2026-10-13T13:32:14.817Z",
		"size": 28880,
		"path": "../public/assets/dialog-AecLNBwm.js"
	},
	"/assets/dist-BjWzU0b-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d2b-YSZGJkuFe703Pcrz0eaY4sY6p4Y\"",
		"mtime": "2026-10-13T13:32:14.817Z",
		"size": 7467,
		"path": "../public/assets/dist-BjWzU0b-.js"
	},
	"/assets/dist-ChAfpJMN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e86-lrmz4l+GowXwnskCIcpRTWhkpO0\"",
		"mtime": "2026-10-13T13:32:14.818Z",
		"size": 7814,
		"path": "../public/assets/dist-ChAfpJMN.js"
	},
	"/assets/input-DXewL22Y.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"284-KBJqiXHbWjcSHXwioFmZNG1AwXg\"",
		"mtime": "2026-10-13T13:32:14.819Z",
		"size": 644,
		"path": "../public/assets/input-DXewL22Y.js"
	},
	"/assets/layers-BHt7oUqU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a5-VEE7MBx36EeV76ORlW4ZBjX5iEU\"",
		"mtime": "2026-10-13T13:32:14.819Z",
		"size": 421,
		"path": "../public/assets/layers-BHt7oUqU.js"
	},
	"/assets/index-DmeK3K54.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"64dff-mrPLyBnAtd7VJ4DWMn9P486Xv2I\"",
		"mtime": "2026-10-13T13:32:14.809Z",
		"size": 413183,
		"path": "../public/assets/index-DmeK3K54.js"
	},
	"/assets/planos-B_NDGlFw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a4-xETOLCZ1iYovSdYrl3I8SWRtbxM\"",
		"mtime": "2026-10-13T13:32:14.820Z",
		"size": 164,
		"path": "../public/assets/planos-B_NDGlFw.js"
	},
	"/assets/planos-C79mFkFY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b7-z1ycIKQWj7kIYeUN9BmrcRWlJwk\"",
		"mtime": "2026-10-13T13:32:14.820Z",
		"size": 183,
		"path": "../public/assets/planos-C79mFkFY.js"
	},
	"/assets/key-round-DP4XvNfR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"163-HoFL7pU2Av0hJmK3VxowPIC/eDU\"",
		"mtime": "2026-10-13T13:32:14.819Z",
		"size": 355,
		"path": "../public/assets/key-round-DP4XvNfR.js"
	},
	"/assets/planos-wTrmen8y.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2b96-3oGK02FRjYVLiBu5cimorG9IKxk\"",
		"mtime": "2026-10-13T13:32:14.820Z",
		"size": 11158,
		"path": "../public/assets/planos-wTrmen8y.js"
	},
	"/assets/player-DlPeQS-T.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"348c-OqOhdaehSeOBGdZAXSl0VIB3M/s\"",
		"mtime": "2026-10-13T13:32:14.821Z",
		"size": 13452,
		"path": "../public/assets/player-DlPeQS-T.js"
	},
	"/assets/plus-CK5_0ous.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99-2+n67wU2592DEqxWenmrt9AhuAE\"",
		"mtime": "2026-10-13T13:32:14.821Z",
		"size": 153,
		"path": "../public/assets/plus-CK5_0ous.js"
	},
	"/assets/react-yIOJJ3r4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"20d2-kVhPh4bAQsY8cpxNQjSFv8q1v2A\"",
		"mtime": "2026-10-13T13:32:14.822Z",
		"size": 8402,
		"path": "../public/assets/react-yIOJJ3r4.js"
	},
	"/assets/refresh-cw-BVYdCPl3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"141-N5HomBB+2zrwqZi95HqvSLKmsHo\"",
		"mtime": "2026-10-13T13:32:14.822Z",
		"size": 321,
		"path": "../public/assets/refresh-cw-BVYdCPl3.js"
	},
	"/assets/routes-y0C3ezmX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a4e-LKtTg9ywH0N+AZRF6RYnKD2Sf/0\"",
		"mtime": "2026-10-13T13:32:14.822Z",
		"size": 2638,
		"path": "../public/assets/routes-y0C3ezmX.js"
	},
	"/assets/search-PMc0BIAj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"339-QfpQGrmxavh5m9WMm2WssSBZn4s\"",
		"mtime": "2026-10-13T13:32:14.823Z",
		"size": 825,
		"path": "../public/assets/search-PMc0BIAj.js"
	},
	"/assets/server-BlF7IxQk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"152-kyTietkyyrtUyPEGOuPFYnvXdDg\"",
		"mtime": "2026-10-13T13:32:14.823Z",
		"size": 338,
		"path": "../public/assets/server-BlF7IxQk.js"
	},
	"/assets/settings-2GH6wj7X.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e7-sOaDfOv51oRTi3NbvmJ6OoPbH20\"",
		"mtime": "2026-10-13T13:32:14.824Z",
		"size": 487,
		"path": "../public/assets/settings-2GH6wj7X.js"
	},
	"/assets/shield-check-Djzt63kg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"140-Hb6+ImKYLTyMKORxqiB5jj8pGMk\"",
		"mtime": "2026-10-13T13:32:14.824Z",
		"size": 320,
		"path": "../public/assets/shield-check-Djzt63kg.js"
	},
	"/assets/source-form-TxxguBsD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1006-WVE+12je5a8AZNI/5zmRrDKhITA\"",
		"mtime": "2026-10-13T13:32:14.825Z",
		"size": 4102,
		"path": "../public/assets/source-form-TxxguBsD.js"
	},
	"/assets/styles-oH0j3lRQ.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"13f14-eApduI12K9abx4TvF5gwXC1VfkM\"",
		"mtime": "2026-10-13T13:32:14.827Z",
		"size": 81684,
		"path": "../public/assets/styles-oH0j3lRQ.css"
	},
	"/assets/switch-BcVs7mr1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12dd-+l53pKtL8vMv7GdYIDotjwhr/bs\"",
		"mtime": "2026-10-13T13:32:14.825Z",
		"size": 4829,
		"path": "../public/assets/switch-BcVs7mr1.js"
	},
	"/assets/tv-DUoZ45GY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b9-Yl7pEzPwu1yVSQECCLU2wh50XQg\"",
		"mtime": "2026-10-13T13:32:14.825Z",
		"size": 185,
		"path": "../public/assets/tv-DUoZ45GY.js"
	},
	"/assets/useBaseQuery-BvUfOrJf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f2a-BGyys6fIdkGRbej1YGs/1dLvHSQ\"",
		"mtime": "2026-10-13T13:32:14.826Z",
		"size": 7978,
		"path": "../public/assets/useBaseQuery-BvUfOrJf.js"
	},
	"/assets/hls-BhcDaTqf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8c546-hnGn8vIsciiCtsWkmKZ1VwsqkPQ\"",
		"mtime": "2026-10-13T13:32:14.818Z",
		"size": 574790,
		"path": "../public/assets/hls-BhcDaTqf.js"
	},
	"/assets/useServerFn-D65XoYu_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"167-DsCtpHsGmvUiNxz3LiJ3DabRt1Y\"",
		"mtime": "2026-10-13T13:32:14.826Z",
		"size": 359,
		"path": "../public/assets/useServerFn-D65XoYu_.js"
	},
	"/assets/utils-4jUIYOBc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6bed-90NGITyc+kEKvxUkUtkYHgO1XH4\"",
		"mtime": "2026-10-13T13:32:14.827Z",
		"size": 27629,
		"path": "../public/assets/utils-4jUIYOBc.js"
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
