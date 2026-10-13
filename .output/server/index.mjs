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
		"mtime": "2026-10-13T12:21:32.993Z",
		"size": 159,
		"path": "../public/robots.txt"
	},
	"/assets/admin-BrmBo97t.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ac-jhhGx1BnAdetG1aPJR3eWvLJcGc\"",
		"mtime": "2026-10-13T12:21:28.501Z",
		"size": 172,
		"path": "../public/assets/admin-BrmBo97t.js"
	},
	"/assets/admin-CkiPhhcX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d8-2K8PUROgIi3QyV9fRBCj7FouBxA\"",
		"mtime": "2026-10-13T12:21:28.502Z",
		"size": 216,
		"path": "../public/assets/admin-CkiPhhcX.js"
	},
	"/assets/admin-TmWgacjW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1cbf-AeMws+3RFVSZEqpdY4nI1CWBdV0\"",
		"mtime": "2026-10-13T12:21:28.502Z",
		"size": 7359,
		"path": "../public/assets/admin-TmWgacjW.js"
	},
	"/assets/admin-ui-DLH7P6pf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a98-/c5GHNfjPrg41l6AYp5ybGV6/uU\"",
		"mtime": "2026-10-13T12:21:28.502Z",
		"size": 2712,
		"path": "../public/assets/admin-ui-DLH7P6pf.js"
	},
	"/assets/admin.ativacoes-DH4OsBqY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e6af-QyRirjkjkzKWmPf/fZXT0yRYQhg\"",
		"mtime": "2026-10-13T12:21:28.503Z",
		"size": 59055,
		"path": "../public/assets/admin.ativacoes-DH4OsBqY.js"
	},
	"/assets/admin.auditoria-DaSsCxmU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"570-pQjImcb0tQgwXpN9Gx8RWv6hVI4\"",
		"mtime": "2026-10-13T12:21:28.503Z",
		"size": 1392,
		"path": "../public/assets/admin.auditoria-DaSsCxmU.js"
	},
	"/assets/admin.clientes-BQxpU6NK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11ff-4VWDU1Om5qq0iqeCp6t1zFYZkH4\"",
		"mtime": "2026-10-13T12:21:28.503Z",
		"size": 4607,
		"path": "../public/assets/admin.clientes-BQxpU6NK.js"
	},
	"/assets/admin.configuracoes-7ei-NqYX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6c4-M2134qp571nrznOYs2VA56tB5TE\"",
		"mtime": "2026-10-13T12:21:28.503Z",
		"size": 1732,
		"path": "../public/assets/admin.configuracoes-7ei-NqYX.js"
	},
	"/assets/admin.cupons-Bf41YC12.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b43-/2qs3ws833DFxCfq/bxUdrvRBSw\"",
		"mtime": "2026-10-13T12:21:28.504Z",
		"size": 2883,
		"path": "../public/assets/admin.cupons-Bf41YC12.js"
	},
	"/assets/admin.dispositivos-ChCB19gm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a23-SUy2MSWRtS6jD2FkfDpYKpu3FL4\"",
		"mtime": "2026-10-13T12:21:28.504Z",
		"size": 6691,
		"path": "../public/assets/admin.dispositivos-ChCB19gm.js"
	},
	"/assets/admin.editor-listas-D3ajzBEx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"274e-tvVu4N7ZpNKIUie+GkOGM5F2UC4\"",
		"mtime": "2026-10-13T12:21:28.504Z",
		"size": 10062,
		"path": "../public/assets/admin.editor-listas-D3ajzBEx.js"
	},
	"/assets/admin.fontes-BhOyD6W5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a57-FdNvA+RbeoDvMT5fcVBe1jFV+98\"",
		"mtime": "2026-10-13T12:21:28.505Z",
		"size": 2647,
		"path": "../public/assets/admin.fontes-BhOyD6W5.js"
	},
	"/assets/admin.index-yjr6_DI4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99c-UDYJXDr120A21JYFlwE9JXpJA1s\"",
		"mtime": "2026-10-13T12:21:28.505Z",
		"size": 2460,
		"path": "../public/assets/admin.index-yjr6_DI4.js"
	},
	"/assets/admin.planos-D_PaUmqb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d02-2EpdTGuOEzkWHQ1E95JOzFW29iY\"",
		"mtime": "2026-10-13T12:21:28.505Z",
		"size": 3330,
		"path": "../public/assets/admin.planos-D_PaUmqb.js"
	},
	"/assets/admin.servidores-BSn5Qdaj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1415-Hp3lFYnvQpj7vW4jgC501h3V5ZU\"",
		"mtime": "2026-10-13T12:21:28.506Z",
		"size": 5141,
		"path": "../public/assets/admin.servidores-BSn5Qdaj.js"
	},
	"/assets/admin.usuarios-CXogluXP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b8f-O3UTFPBt+wyORAt/FhO/gRA/9nE\"",
		"mtime": "2026-10-13T12:21:28.506Z",
		"size": 2959,
		"path": "../public/assets/admin.usuarios-CXogluXP.js"
	},
	"/assets/admin.vendas-DcoPM-sx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12e8-bmsGsQbNSkvH0p+xoGgy1219ZHE\"",
		"mtime": "2026-10-13T12:21:28.506Z",
		"size": 4840,
		"path": "../public/assets/admin.vendas-DcoPM-sx.js"
	},
	"/assets/ativar-DNzIPSsn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"aa1-sZhPVVJN3dxKvz1zU2+LIhveLk4\"",
		"mtime": "2026-10-13T12:21:28.506Z",
		"size": 2721,
		"path": "../public/assets/ativar-DNzIPSsn.js"
	},
	"/assets/brand-JjWYM5O1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"870-XVS/oRVtTYeS9Gv/AnAcdLUkCUk\"",
		"mtime": "2026-10-13T12:21:28.507Z",
		"size": 2160,
		"path": "../public/assets/brand-JjWYM5O1.js"
	},
	"/assets/button-CNC0pIfR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12da-KFU2YNzGlpV++DeNBHKjXC85c9M\"",
		"mtime": "2026-10-13T12:21:28.507Z",
		"size": 4826,
		"path": "../public/assets/button-CNC0pIfR.js"
	},
	"/assets/cliente-Di1Q02_B.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"902-em7FHMbKsd5KpAEoKbjv6ivXYoY\"",
		"mtime": "2026-10-13T12:21:28.507Z",
		"size": 2306,
		"path": "../public/assets/cliente-Di1Q02_B.js"
	},
	"/assets/copy-BmHJmYOU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ec-vCUeeGphC4Xgze5Nvdth85mmQUE\"",
		"mtime": "2026-10-13T12:21:28.507Z",
		"size": 236,
		"path": "../public/assets/copy-BmHJmYOU.js"
	},
	"/assets/createLucideIcon-C8f4lLaO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4a0-NTAL9M0j6LxzNovOonT9n48Sqbg\"",
		"mtime": "2026-10-13T12:21:28.508Z",
		"size": 1184,
		"path": "../public/assets/createLucideIcon-C8f4lLaO.js"
	},
	"/assets/device-client-WFY6Hzd0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"465-tzFn0gGAy9ABFW/2OvNwFnpG0uk\"",
		"mtime": "2026-10-13T12:21:28.508Z",
		"size": 1125,
		"path": "../public/assets/device-client-WFY6Hzd0.js"
	},
	"/assets/dialog-rJ58ABG9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"70d0-lkQgkqWdhxf0qyOte+PoZa8xm74\"",
		"mtime": "2026-10-13T12:21:28.508Z",
		"size": 28880,
		"path": "../public/assets/dialog-rJ58ABG9.js"
	},
	"/assets/dist-BDHaLQf8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e86-K15xN6E+SiWFRa3ujierrOckc+0\"",
		"mtime": "2026-10-13T12:21:28.509Z",
		"size": 7814,
		"path": "../public/assets/dist-BDHaLQf8.js"
	},
	"/assets/dist-db4YDtEb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d2b-DFxs8Fczk1gE22EB2hZkk8ifhNo\"",
		"mtime": "2026-10-13T12:21:28.509Z",
		"size": 7467,
		"path": "../public/assets/dist-db4YDtEb.js"
	},
	"/assets/input-Yl1Cyyfk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"284-qQ66UQ0MfEauHGJ0hOXGi/NGRcg\"",
		"mtime": "2026-10-13T12:21:28.510Z",
		"size": 644,
		"path": "../public/assets/input-Yl1Cyyfk.js"
	},
	"/assets/key-round-DP4XvNfR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"163-HoFL7pU2Av0hJmK3VxowPIC/eDU\"",
		"mtime": "2026-10-13T12:21:28.510Z",
		"size": 355,
		"path": "../public/assets/key-round-DP4XvNfR.js"
	},
	"/assets/layers-BHt7oUqU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a5-VEE7MBx36EeV76ORlW4ZBjX5iEU\"",
		"mtime": "2026-10-13T12:21:28.510Z",
		"size": 421,
		"path": "../public/assets/layers-BHt7oUqU.js"
	},
	"/assets/planos-DB_eGsNK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a4-4KhinW3pUsGb/vZsq5vYLNsMHZY\"",
		"mtime": "2026-10-13T12:21:28.511Z",
		"size": 164,
		"path": "../public/assets/planos-DB_eGsNK.js"
	},
	"/assets/planos-BxzbLjrK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b7-cKIcrnXxg/JbQBOmz9ujxip9dvQ\"",
		"mtime": "2026-10-13T12:21:28.511Z",
		"size": 183,
		"path": "../public/assets/planos-BxzbLjrK.js"
	},
	"/assets/index-CF3LEKGV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"64cb0-QC+1Zmut5l8K6eaYJHf1YEHupZU\"",
		"mtime": "2026-10-13T12:21:28.501Z",
		"size": 412848,
		"path": "../public/assets/index-CF3LEKGV.js"
	},
	"/assets/planos-KdvKTH8g.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2b96-JeIua52pcJhYVDVeKNcwQ+UPQ/I\"",
		"mtime": "2026-10-13T12:21:28.511Z",
		"size": 11158,
		"path": "../public/assets/planos-KdvKTH8g.js"
	},
	"/assets/player-vLKQF8Oq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2d48-gJ7Z7zciY0gWaKAHFfc/tzAieqM\"",
		"mtime": "2026-10-13T12:21:28.511Z",
		"size": 11592,
		"path": "../public/assets/player-vLKQF8Oq.js"
	},
	"/assets/plus-CK5_0ous.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99-2+n67wU2592DEqxWenmrt9AhuAE\"",
		"mtime": "2026-10-13T12:21:28.512Z",
		"size": 153,
		"path": "../public/assets/plus-CK5_0ous.js"
	},
	"/assets/react-yIOJJ3r4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"20d2-kVhPh4bAQsY8cpxNQjSFv8q1v2A\"",
		"mtime": "2026-10-13T12:21:28.512Z",
		"size": 8402,
		"path": "../public/assets/react-yIOJJ3r4.js"
	},
	"/assets/refresh-cw-BVYdCPl3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"141-N5HomBB+2zrwqZi95HqvSLKmsHo\"",
		"mtime": "2026-10-13T12:21:28.549Z",
		"size": 321,
		"path": "../public/assets/refresh-cw-BVYdCPl3.js"
	},
	"/assets/routes-CV_E_Keq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a4e-AZkD6LRjwerASXr1mROner9Zids\"",
		"mtime": "2026-10-13T12:21:28.550Z",
		"size": 2638,
		"path": "../public/assets/routes-CV_E_Keq.js"
	},
	"/assets/search-PMc0BIAj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"339-QfpQGrmxavh5m9WMm2WssSBZn4s\"",
		"mtime": "2026-10-13T12:21:28.550Z",
		"size": 825,
		"path": "../public/assets/search-PMc0BIAj.js"
	},
	"/assets/server-BlF7IxQk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"152-kyTietkyyrtUyPEGOuPFYnvXdDg\"",
		"mtime": "2026-10-13T12:21:28.550Z",
		"size": 338,
		"path": "../public/assets/server-BlF7IxQk.js"
	},
	"/assets/settings-2GH6wj7X.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e7-sOaDfOv51oRTi3NbvmJ6OoPbH20\"",
		"mtime": "2026-10-13T12:21:28.551Z",
		"size": 487,
		"path": "../public/assets/settings-2GH6wj7X.js"
	},
	"/assets/shield-check-Djzt63kg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"140-Hb6+ImKYLTyMKORxqiB5jj8pGMk\"",
		"mtime": "2026-10-13T12:21:28.551Z",
		"size": 320,
		"path": "../public/assets/shield-check-Djzt63kg.js"
	},
	"/assets/source-form-ChBvFuJk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c12-+ex5tI7+wx+QTR6b1QoxpreZO0g\"",
		"mtime": "2026-10-13T12:21:28.551Z",
		"size": 3090,
		"path": "../public/assets/source-form-ChBvFuJk.js"
	},
	"/assets/styles-DNNvONg5.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"13ce6-vQm7QzwYfOFcscTCViE2uo9KGwo\"",
		"mtime": "2026-10-13T12:21:28.553Z",
		"size": 81126,
		"path": "../public/assets/styles-DNNvONg5.css"
	},
	"/assets/switch-BEanUtZ7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12dd-xDJnEHW09jrA8OiDQNneAk8IMH0\"",
		"mtime": "2026-10-13T12:21:28.552Z",
		"size": 4829,
		"path": "../public/assets/switch-BEanUtZ7.js"
	},
	"/assets/tv-DUoZ45GY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b9-Yl7pEzPwu1yVSQECCLU2wh50XQg\"",
		"mtime": "2026-10-13T12:21:28.552Z",
		"size": 185,
		"path": "../public/assets/tv-DUoZ45GY.js"
	},
	"/assets/useBaseQuery-B5ifKt5k.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f28-iqdw+gX940bY3kM7mJNxDCvVyFs\"",
		"mtime": "2026-10-13T12:21:28.552Z",
		"size": 7976,
		"path": "../public/assets/useBaseQuery-B5ifKt5k.js"
	},
	"/assets/hls-BhcDaTqf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8c546-hnGn8vIsciiCtsWkmKZ1VwsqkPQ\"",
		"mtime": "2026-10-13T12:21:28.509Z",
		"size": 574790,
		"path": "../public/assets/hls-BhcDaTqf.js"
	},
	"/assets/useServerFn-D4jQL9-i.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"167-hdsUd+VjhjccTkZVoGv3+a8uhVI\"",
		"mtime": "2026-10-13T12:21:28.553Z",
		"size": 359,
		"path": "../public/assets/useServerFn-D4jQL9-i.js"
	},
	"/assets/utils-4jUIYOBc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6bed-90NGITyc+kEKvxUkUtkYHgO1XH4\"",
		"mtime": "2026-10-13T12:21:28.553Z",
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
