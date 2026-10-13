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
		"mtime": "2026-10-13T12:12:17.503Z",
		"size": 159,
		"path": "../public/robots.txt"
	},
	"/assets/admin-COGP22KZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d8-fuI1Qbn5hBaKnwIcXajxRNjuu3I\"",
		"mtime": "2026-10-13T12:12:13.645Z",
		"size": 216,
		"path": "../public/assets/admin-COGP22KZ.js"
	},
	"/assets/admin-CkP5MeiA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ac-mEvwoWZXWY/8ycoiHTrAquAkWXc\"",
		"mtime": "2026-10-13T12:12:13.645Z",
		"size": 172,
		"path": "../public/assets/admin-CkP5MeiA.js"
	},
	"/assets/admin-Coj0Bivh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1cbf-Ikwg649SeOsgt04YFoyNmUrqMf0\"",
		"mtime": "2026-10-13T12:12:13.645Z",
		"size": 7359,
		"path": "../public/assets/admin-Coj0Bivh.js"
	},
	"/assets/admin-ui-CWRDnBwj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a98-4gh59ugcIThxhjFhUYHMvA1DGAk\"",
		"mtime": "2026-10-13T12:12:13.645Z",
		"size": 2712,
		"path": "../public/assets/admin-ui-CWRDnBwj.js"
	},
	"/assets/admin.ativacoes-CKCc0Y5p.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e6af-2ViWE6qHzVmQ2mHMz+r2D/fmUmE\"",
		"mtime": "2026-10-13T12:12:13.646Z",
		"size": 59055,
		"path": "../public/assets/admin.ativacoes-CKCc0Y5p.js"
	},
	"/assets/admin.auditoria-CgeIbj58.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"570-gEiIQgT9og2zMKj4haO3MN9eVf4\"",
		"mtime": "2026-10-13T12:12:13.646Z",
		"size": 1392,
		"path": "../public/assets/admin.auditoria-CgeIbj58.js"
	},
	"/assets/admin.clientes-BuVco0Jf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11ff-lpeCDfytJPd8JMr6u65nnsOteyk\"",
		"mtime": "2026-10-13T12:12:13.646Z",
		"size": 4607,
		"path": "../public/assets/admin.clientes-BuVco0Jf.js"
	},
	"/assets/admin.configuracoes-p3L8CIk-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6c4-UjoQ9Yuq6VNuOMt8pfanU6Vkcrg\"",
		"mtime": "2026-10-13T12:12:13.646Z",
		"size": 1732,
		"path": "../public/assets/admin.configuracoes-p3L8CIk-.js"
	},
	"/assets/admin.cupons-DCIUx4k9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b43-rykTiLsFXPt2r74AtX1mkNWW2iw\"",
		"mtime": "2026-10-13T12:12:13.647Z",
		"size": 2883,
		"path": "../public/assets/admin.cupons-DCIUx4k9.js"
	},
	"/assets/admin.dispositivos-Bcd7wLki.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a23-ObUx9uoaQV836eMNzeN/KI821cU\"",
		"mtime": "2026-10-13T12:12:13.647Z",
		"size": 6691,
		"path": "../public/assets/admin.dispositivos-Bcd7wLki.js"
	},
	"/assets/admin.editor-listas-ByKPWS8m.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"24ea-yjRmftukLiqK+o69aq7JQ9SwN5w\"",
		"mtime": "2026-10-13T12:12:13.647Z",
		"size": 9450,
		"path": "../public/assets/admin.editor-listas-ByKPWS8m.js"
	},
	"/assets/admin.fontes-BY4X1t-J.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a57-Zv/U9hT77vAR7GoV5wqSeZTg4yA\"",
		"mtime": "2026-10-13T12:12:13.648Z",
		"size": 2647,
		"path": "../public/assets/admin.fontes-BY4X1t-J.js"
	},
	"/assets/admin.index-BZRqowFR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99c-Mz0rElPsU+qIjv4RRvLmnZ6fmFc\"",
		"mtime": "2026-10-13T12:12:13.648Z",
		"size": 2460,
		"path": "../public/assets/admin.index-BZRqowFR.js"
	},
	"/assets/admin.planos-Daq3Pjj-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d02-QDrLV6J2FfevfNlj6MIgFeeol/Q\"",
		"mtime": "2026-10-13T12:12:13.648Z",
		"size": 3330,
		"path": "../public/assets/admin.planos-Daq3Pjj-.js"
	},
	"/assets/admin.servidores-BJeHDZ27.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1415-iubRxZ23/t0Xua+isru/5e7bGrQ\"",
		"mtime": "2026-10-13T12:12:13.649Z",
		"size": 5141,
		"path": "../public/assets/admin.servidores-BJeHDZ27.js"
	},
	"/assets/admin.usuarios-8p-qRSAJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b8f-qmzQdpbCfJpHcORqgRnrX0U66EY\"",
		"mtime": "2026-10-13T12:12:13.649Z",
		"size": 2959,
		"path": "../public/assets/admin.usuarios-8p-qRSAJ.js"
	},
	"/assets/admin.vendas-C3qeXW2Q.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12e8-BCWaGRJffdFiH3g91HUIYNRzI60\"",
		"mtime": "2026-10-13T12:12:13.649Z",
		"size": 4840,
		"path": "../public/assets/admin.vendas-C3qeXW2Q.js"
	},
	"/assets/ativar-DqReK_b0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"aa1-62Y7BQUGbpzyIDvllFrtoLasTjs\"",
		"mtime": "2026-10-13T12:12:13.649Z",
		"size": 2721,
		"path": "../public/assets/ativar-DqReK_b0.js"
	},
	"/assets/brand-DO9k71YA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"870-wQjst6DKyFIZENAc91WEG3rdv6c\"",
		"mtime": "2026-10-13T12:12:13.650Z",
		"size": 2160,
		"path": "../public/assets/brand-DO9k71YA.js"
	},
	"/assets/button-kP8qkyRM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12da-WHRGoiSE7z0sHFyT6LKPTGfpHSY\"",
		"mtime": "2026-10-13T12:12:13.650Z",
		"size": 4826,
		"path": "../public/assets/button-kP8qkyRM.js"
	},
	"/assets/cliente-8ww2p0CY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"902-y1jcQJ4n3nch5ROVxqIzPxOGbJ8\"",
		"mtime": "2026-10-13T12:12:13.650Z",
		"size": 2306,
		"path": "../public/assets/cliente-8ww2p0CY.js"
	},
	"/assets/copy-BmHJmYOU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ec-vCUeeGphC4Xgze5Nvdth85mmQUE\"",
		"mtime": "2026-10-13T12:12:13.651Z",
		"size": 236,
		"path": "../public/assets/copy-BmHJmYOU.js"
	},
	"/assets/createLucideIcon-C8f4lLaO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4a0-NTAL9M0j6LxzNovOonT9n48Sqbg\"",
		"mtime": "2026-10-13T12:12:13.651Z",
		"size": 1184,
		"path": "../public/assets/createLucideIcon-C8f4lLaO.js"
	},
	"/assets/device-client-WFY6Hzd0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"465-tzFn0gGAy9ABFW/2OvNwFnpG0uk\"",
		"mtime": "2026-10-13T12:12:13.651Z",
		"size": 1125,
		"path": "../public/assets/device-client-WFY6Hzd0.js"
	},
	"/assets/dialog-BB-1JUBA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"70d0-8SLZtrHu+ScwTRi8Df1+utnQEQE\"",
		"mtime": "2026-10-13T12:12:13.651Z",
		"size": 28880,
		"path": "../public/assets/dialog-BB-1JUBA.js"
	},
	"/assets/dist-iRQsmxu7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e86-H0NcHNe52YgWUJKaveoulZpAXqs\"",
		"mtime": "2026-10-13T12:12:13.652Z",
		"size": 7814,
		"path": "../public/assets/dist-iRQsmxu7.js"
	},
	"/assets/dist-B3v7Xg4N.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d2b-OJBchh1+WDl5MWfAatYT8e9nGv4\"",
		"mtime": "2026-10-13T12:12:13.652Z",
		"size": 7467,
		"path": "../public/assets/dist-B3v7Xg4N.js"
	},
	"/assets/input-Cyup7e6C.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"284-VsZdqV2PMtsE20yoMuDpz6kLuU4\"",
		"mtime": "2026-10-13T12:12:13.653Z",
		"size": 644,
		"path": "../public/assets/input-Cyup7e6C.js"
	},
	"/assets/key-round-DP4XvNfR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"163-HoFL7pU2Av0hJmK3VxowPIC/eDU\"",
		"mtime": "2026-10-13T12:12:13.653Z",
		"size": 355,
		"path": "../public/assets/key-round-DP4XvNfR.js"
	},
	"/assets/layers-BHt7oUqU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a5-VEE7MBx36EeV76ORlW4ZBjX5iEU\"",
		"mtime": "2026-10-13T12:12:13.653Z",
		"size": 421,
		"path": "../public/assets/layers-BHt7oUqU.js"
	},
	"/assets/index-C8VvfwZc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"64c47-WM14BVH9PV+qeZ9x6wbU96jZYhc\"",
		"mtime": "2026-10-13T12:12:13.644Z",
		"size": 412743,
		"path": "../public/assets/index-C8VvfwZc.js"
	},
	"/assets/planos-0p0qUYTe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2b96-lDAFWs3+tJX+rb1HdYIzuxJug9I\"",
		"mtime": "2026-10-13T12:12:13.654Z",
		"size": 11158,
		"path": "../public/assets/planos-0p0qUYTe.js"
	},
	"/assets/planos-CwAs7KuA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b7-/b+OF1zYhbdsMW1HC3V9X7Y0kFg\"",
		"mtime": "2026-10-13T12:12:13.654Z",
		"size": 183,
		"path": "../public/assets/planos-CwAs7KuA.js"
	},
	"/assets/planos-Dh9aBhpd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a4-zU0ss+hsZDULhZwzBhynSxTOutE\"",
		"mtime": "2026-10-13T12:12:13.654Z",
		"size": 164,
		"path": "../public/assets/planos-Dh9aBhpd.js"
	},
	"/assets/player-C9Eqmdcy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2d48-xJy+/NHw88nMGGP8AfT+YJb5i9Q\"",
		"mtime": "2026-10-13T12:12:13.655Z",
		"size": 11592,
		"path": "../public/assets/player-C9Eqmdcy.js"
	},
	"/assets/plus-CK5_0ous.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99-2+n67wU2592DEqxWenmrt9AhuAE\"",
		"mtime": "2026-10-13T12:12:13.655Z",
		"size": 153,
		"path": "../public/assets/plus-CK5_0ous.js"
	},
	"/assets/react-yIOJJ3r4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"20d2-kVhPh4bAQsY8cpxNQjSFv8q1v2A\"",
		"mtime": "2026-10-13T12:12:13.655Z",
		"size": 8402,
		"path": "../public/assets/react-yIOJJ3r4.js"
	},
	"/assets/refresh-cw-BVYdCPl3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"141-N5HomBB+2zrwqZi95HqvSLKmsHo\"",
		"mtime": "2026-10-13T12:12:13.655Z",
		"size": 321,
		"path": "../public/assets/refresh-cw-BVYdCPl3.js"
	},
	"/assets/routes-BKIszNYM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a4e-4h/ulI/zowwLJLGe6ImI62K5GTE\"",
		"mtime": "2026-10-13T12:12:13.656Z",
		"size": 2638,
		"path": "../public/assets/routes-BKIszNYM.js"
	},
	"/assets/search-PMc0BIAj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"339-QfpQGrmxavh5m9WMm2WssSBZn4s\"",
		"mtime": "2026-10-13T12:12:13.656Z",
		"size": 825,
		"path": "../public/assets/search-PMc0BIAj.js"
	},
	"/assets/server-BlF7IxQk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"152-kyTietkyyrtUyPEGOuPFYnvXdDg\"",
		"mtime": "2026-10-13T12:12:13.656Z",
		"size": 338,
		"path": "../public/assets/server-BlF7IxQk.js"
	},
	"/assets/settings-2GH6wj7X.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e7-sOaDfOv51oRTi3NbvmJ6OoPbH20\"",
		"mtime": "2026-10-13T12:12:13.657Z",
		"size": 487,
		"path": "../public/assets/settings-2GH6wj7X.js"
	},
	"/assets/shield-check-Djzt63kg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"140-Hb6+ImKYLTyMKORxqiB5jj8pGMk\"",
		"mtime": "2026-10-13T12:12:13.657Z",
		"size": 320,
		"path": "../public/assets/shield-check-Djzt63kg.js"
	},
	"/assets/source-form-jJfRbTas.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c12-eV/Wo5OjUumlvS4gtkfNOBA4h3A\"",
		"mtime": "2026-10-13T12:12:13.657Z",
		"size": 3090,
		"path": "../public/assets/source-form-jJfRbTas.js"
	},
	"/assets/styles-DNNvONg5.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"13ce6-vQm7QzwYfOFcscTCViE2uo9KGwo\"",
		"mtime": "2026-10-13T12:12:13.659Z",
		"size": 81126,
		"path": "../public/assets/styles-DNNvONg5.css"
	},
	"/assets/switch-Bqf_nCON.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12dd-LZ1nQpADZrO5Pp5klnY7h1eUUSQ\"",
		"mtime": "2026-10-13T12:12:13.658Z",
		"size": 4829,
		"path": "../public/assets/switch-Bqf_nCON.js"
	},
	"/assets/tv-DUoZ45GY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b9-Yl7pEzPwu1yVSQECCLU2wh50XQg\"",
		"mtime": "2026-10-13T12:12:13.658Z",
		"size": 185,
		"path": "../public/assets/tv-DUoZ45GY.js"
	},
	"/assets/useBaseQuery-DBjDQVmX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f27-YiwpudUmkWhPvmRLsIwjKUGVX/4\"",
		"mtime": "2026-10-13T12:12:13.658Z",
		"size": 7975,
		"path": "../public/assets/useBaseQuery-DBjDQVmX.js"
	},
	"/assets/hls-BhcDaTqf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8c546-hnGn8vIsciiCtsWkmKZ1VwsqkPQ\"",
		"mtime": "2026-10-13T12:12:13.652Z",
		"size": 574790,
		"path": "../public/assets/hls-BhcDaTqf.js"
	},
	"/assets/useServerFn-BCd92GQJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"167-NUfGiDr4BM8uGivPnED4gzHCeMo\"",
		"mtime": "2026-10-13T12:12:13.658Z",
		"size": 359,
		"path": "../public/assets/useServerFn-BCd92GQJ.js"
	},
	"/assets/utils-4jUIYOBc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6bed-90NGITyc+kEKvxUkUtkYHgO1XH4\"",
		"mtime": "2026-10-13T12:12:13.659Z",
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
