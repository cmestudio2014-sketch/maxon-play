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
		"mtime": "2026-10-13T14:32:03.319Z",
		"size": 159,
		"path": "../public/robots.txt"
	},
	"/assets/admin-BptQ4pko.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ac-x9b5Ff/TDBwtc2I5XY7g7aRzmvU\"",
		"mtime": "2026-10-13T14:31:58.363Z",
		"size": 172,
		"path": "../public/assets/admin-BptQ4pko.js"
	},
	"/assets/admin-CS1Kbn-_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ceb-JHLuHqbCGeMoNJGOddCtZFTOgAA\"",
		"mtime": "2026-10-13T14:31:58.364Z",
		"size": 7403,
		"path": "../public/assets/admin-CS1Kbn-_.js"
	},
	"/assets/admin-l5DyrGQ2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d8-RrBNXVRNWaAVRL8ZpDdZbHKWGx0\"",
		"mtime": "2026-10-13T14:31:58.364Z",
		"size": 216,
		"path": "../public/assets/admin-l5DyrGQ2.js"
	},
	"/assets/admin-ui-Cfnd6UkZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a99-bSRBZgqeS+9d6JQybwVlxz80WRA\"",
		"mtime": "2026-10-13T14:31:58.365Z",
		"size": 2713,
		"path": "../public/assets/admin-ui-Cfnd6UkZ.js"
	},
	"/assets/admin.ativacoes-DSpc9-RA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e6dc-heUSplILBZgHyB3xN3Zq1lrFDJU\"",
		"mtime": "2026-10-13T14:31:58.365Z",
		"size": 59100,
		"path": "../public/assets/admin.ativacoes-DSpc9-RA.js"
	},
	"/assets/admin.auditoria-wZutepOB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"59c-3Wl1dBrLRw+08z0VrlzN5O7m4Ag\"",
		"mtime": "2026-10-13T14:31:58.365Z",
		"size": 1436,
		"path": "../public/assets/admin.auditoria-wZutepOB.js"
	},
	"/assets/admin.clientes-CJ6wUf35.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"122b-a1r2IZvqhb3tgeZmM3qAYDzWmik\"",
		"mtime": "2026-10-13T14:31:58.366Z",
		"size": 4651,
		"path": "../public/assets/admin.clientes-CJ6wUf35.js"
	},
	"/assets/admin.configuracoes-CVPY7Cm7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6f0-9lMQUv/ygiT7MspI8U1+OXhpeQk\"",
		"mtime": "2026-10-13T14:31:58.366Z",
		"size": 1776,
		"path": "../public/assets/admin.configuracoes-CVPY7Cm7.js"
	},
	"/assets/admin.cupons-BBQBJ9n1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b6f-uifjSWvU9nZlOAVrgG6BS/7RlEA\"",
		"mtime": "2026-10-13T14:31:58.367Z",
		"size": 2927,
		"path": "../public/assets/admin.cupons-BBQBJ9n1.js"
	},
	"/assets/admin.dispositivos-D1TUqiR1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a4f-/5TA2rzd9IKPYFUewUo/UwhO1vY\"",
		"mtime": "2026-10-13T14:31:58.367Z",
		"size": 6735,
		"path": "../public/assets/admin.dispositivos-D1TUqiR1.js"
	},
	"/assets/admin.editor-listas-Cf4Av5oo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2e25-9K/V1YXDujLBR9wOCGcKN9eBxtI\"",
		"mtime": "2026-10-13T14:31:58.368Z",
		"size": 11813,
		"path": "../public/assets/admin.editor-listas-Cf4Av5oo.js"
	},
	"/assets/admin.fontes-C_PY04dh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a83-PKYIiBqmOj78KMTi+hn1GuFGi3M\"",
		"mtime": "2026-10-13T14:31:58.368Z",
		"size": 2691,
		"path": "../public/assets/admin.fontes-C_PY04dh.js"
	},
	"/assets/admin.index-BrMfHenL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99c-FAMDio18/jP0EtnQiacqhq3NU0Y\"",
		"mtime": "2026-10-13T14:31:58.368Z",
		"size": 2460,
		"path": "../public/assets/admin.index-BrMfHenL.js"
	},
	"/assets/admin.planos-4ZNInlmK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d2e-in5G5KWkvs/4ScfOqbpAfQRVsLc\"",
		"mtime": "2026-10-13T14:31:58.369Z",
		"size": 3374,
		"path": "../public/assets/admin.planos-4ZNInlmK.js"
	},
	"/assets/admin.servidores-CUW7KSI6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"143c-cOKqbrqL/gQxbZNTPaEolBwdIPc\"",
		"mtime": "2026-10-13T14:31:58.369Z",
		"size": 5180,
		"path": "../public/assets/admin.servidores-CUW7KSI6.js"
	},
	"/assets/admin.usuarios-Di2B7Q3c.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bbb-JHZM5CAAPKcdXyR5gWt/zvqocvY\"",
		"mtime": "2026-10-13T14:31:58.369Z",
		"size": 3003,
		"path": "../public/assets/admin.usuarios-Di2B7Q3c.js"
	},
	"/assets/admin.vendas-CyZ-cwLp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1315-qt6MDTSpQG/rYkPtYliQRsKCF4U\"",
		"mtime": "2026-10-13T14:31:58.370Z",
		"size": 4885,
		"path": "../public/assets/admin.vendas-CyZ-cwLp.js"
	},
	"/assets/ativar-C6VRq93s.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ace-iEWGkW2Wvj5W3rjPoudm1IY1Zz4\"",
		"mtime": "2026-10-13T14:31:58.370Z",
		"size": 2766,
		"path": "../public/assets/ativar-C6VRq93s.js"
	},
	"/assets/brand-BZheGQ8Y.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"870-u8MblGKVChJzp3vJ32xyWj0DgxY\"",
		"mtime": "2026-10-13T14:31:58.370Z",
		"size": 2160,
		"path": "../public/assets/brand-BZheGQ8Y.js"
	},
	"/assets/button-C4Q11NCa.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1306-fhe1lzRdZkHNvntdZo8jgJ4CKEk\"",
		"mtime": "2026-10-13T14:31:58.371Z",
		"size": 4870,
		"path": "../public/assets/button-C4Q11NCa.js"
	},
	"/assets/cliente-uuadADcV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"92e-gTbAinxxKS6vCnggKr9tQlg3M8w\"",
		"mtime": "2026-10-13T14:31:58.371Z",
		"size": 2350,
		"path": "../public/assets/cliente-uuadADcV.js"
	},
	"/assets/copy-DCHSmm07.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ec-1JmVfTyRpBOyIw0flknfQhVgMIU\"",
		"mtime": "2026-10-13T14:31:58.371Z",
		"size": 236,
		"path": "../public/assets/copy-DCHSmm07.js"
	},
	"/assets/createLucideIcon-CabK5vaI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4cc-QNaBMQOAZq2T/auAvCB/kK/H4/Y\"",
		"mtime": "2026-10-13T14:31:58.372Z",
		"size": 1228,
		"path": "../public/assets/createLucideIcon-CabK5vaI.js"
	},
	"/assets/device-client-WFY6Hzd0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"465-tzFn0gGAy9ABFW/2OvNwFnpG0uk\"",
		"mtime": "2026-10-13T14:31:58.372Z",
		"size": 1125,
		"path": "../public/assets/device-client-WFY6Hzd0.js"
	},
	"/assets/dialog-BkPojxcF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"70fc-TO1ph90eA4vjBrcW4aRML3wM5jw\"",
		"mtime": "2026-10-13T14:31:58.372Z",
		"size": 28924,
		"path": "../public/assets/dialog-BkPojxcF.js"
	},
	"/assets/dist-C6mbbyNB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1eb2-C23sONV+Ub7/ol8D3+L74oRBD24\"",
		"mtime": "2026-10-13T14:31:58.373Z",
		"size": 7858,
		"path": "../public/assets/dist-C6mbbyNB.js"
	},
	"/assets/dist-CRseYeYS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d57-ov6BzqlWrAYWpyZ7/s14anJiBDY\"",
		"mtime": "2026-10-13T14:31:58.373Z",
		"size": 7511,
		"path": "../public/assets/dist-CRseYeYS.js"
	},
	"/assets/key-round-Bn85nMhF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"163-O/P/nSoUI/+KEuwtTXtxoxDYrnE\"",
		"mtime": "2026-10-13T14:31:58.374Z",
		"size": 355,
		"path": "../public/assets/key-round-Bn85nMhF.js"
	},
	"/assets/layers-BGxYLKOt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a5-BisWeP/KgCOeM0bG26uuxFjstYU\"",
		"mtime": "2026-10-13T14:31:58.375Z",
		"size": 421,
		"path": "../public/assets/layers-BGxYLKOt.js"
	},
	"/assets/input-BRY4Yqmg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2b0-4lLGv2hmARlkLwMJgZ7k9zdYLoM\"",
		"mtime": "2026-10-13T14:31:58.374Z",
		"size": 688,
		"path": "../public/assets/input-BRY4Yqmg.js"
	},
	"/assets/planos-D2TgwkO5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a4-e/acHL89i5KJeIM6X86f788WS+Y\"",
		"mtime": "2026-10-13T14:31:58.376Z",
		"size": 164,
		"path": "../public/assets/planos-D2TgwkO5.js"
	},
	"/assets/planos-DZW6xd5E.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b7-T3U0Ta0ABXZcryMAmWvlnu4ovA4\"",
		"mtime": "2026-10-13T14:31:58.376Z",
		"size": 183,
		"path": "../public/assets/planos-DZW6xd5E.js"
	},
	"/assets/planos-CEUA4s0F.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2bc2-VncFatWAfFKmpZ9FpPVYm63oa8g\"",
		"mtime": "2026-10-13T14:31:58.376Z",
		"size": 11202,
		"path": "../public/assets/planos-CEUA4s0F.js"
	},
	"/assets/plus-CbMKM017.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99-aqcYFZgTys8a/7hyjfJsfu/4VT4\"",
		"mtime": "2026-10-13T14:31:58.377Z",
		"size": 153,
		"path": "../public/assets/plus-CbMKM017.js"
	},
	"/assets/mpegts-BETI8p9P.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"42805-dzPDTvQgix74GP6HreExDymE6UY\"",
		"mtime": "2026-10-13T14:31:58.375Z",
		"size": 272389,
		"path": "../public/assets/mpegts-BETI8p9P.js"
	},
	"/assets/player-CTPW924b.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3f5b-1ynGZS6x9Dub2BBKkQGV5NvM0MA\"",
		"mtime": "2026-10-13T14:31:58.377Z",
		"size": 16219,
		"path": "../public/assets/player-CTPW924b.js"
	},
	"/assets/index-DF9JbXbP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"64e75-h8UP+Cv0Fjuh9vGg9F+JUgq+4ic\"",
		"mtime": "2026-10-13T14:31:58.363Z",
		"size": 413301,
		"path": "../public/assets/index-DF9JbXbP.js"
	},
	"/assets/react-DK6rpPfu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ec4-V1xNZhmjixlZV0LgvNOiaUJF4yk\"",
		"mtime": "2026-10-13T14:31:58.377Z",
		"size": 7876,
		"path": "../public/assets/react-DK6rpPfu.js"
	},
	"/assets/refresh-cw-CYL9LGno.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"141-Zc2Y+2YnuaiNQFwN2MZxws5+Fa4\"",
		"mtime": "2026-10-13T14:31:58.377Z",
		"size": 321,
		"path": "../public/assets/refresh-cw-CYL9LGno.js"
	},
	"/assets/rolldown-runtime-CbXtAM7H.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"24d-+aXgvbJ1Wwcp2A8AXKIBByksYC8\"",
		"mtime": "2026-10-13T14:31:58.378Z",
		"size": 589,
		"path": "../public/assets/rolldown-runtime-CbXtAM7H.js"
	},
	"/assets/routes-CBw510Qx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a4e-UGQGa3eYA5cosp4XWwxQCwuqY0A\"",
		"mtime": "2026-10-13T14:31:58.378Z",
		"size": 2638,
		"path": "../public/assets/routes-CBw510Qx.js"
	},
	"/assets/search-DLWCp_dZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"339-h33c/okndg6zkMJE7FmrTHT0U3Q\"",
		"mtime": "2026-10-13T14:31:58.379Z",
		"size": 825,
		"path": "../public/assets/search-DLWCp_dZ.js"
	},
	"/assets/server-mBZdm3QS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"152-r5S/rR4FsjS1tbZ3hMwc5anfMbI\"",
		"mtime": "2026-10-13T14:31:58.379Z",
		"size": 338,
		"path": "../public/assets/server-mBZdm3QS.js"
	},
	"/assets/settings-Civ9fmNU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e7-ncaTBpcHZCIAXmxXV083sTQOuQ8\"",
		"mtime": "2026-10-13T14:31:58.380Z",
		"size": 487,
		"path": "../public/assets/settings-Civ9fmNU.js"
	},
	"/assets/shield-check-TEr-fcUz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"140-M59jB9Cm7lnEFdolUmoxHh/Vpzs\"",
		"mtime": "2026-10-13T14:31:58.380Z",
		"size": 320,
		"path": "../public/assets/shield-check-TEr-fcUz.js"
	},
	"/assets/source-form-tVYmOYsq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1032-wXzPfYepvLuznjI1y9BYOqSUdrM\"",
		"mtime": "2026-10-13T14:31:58.380Z",
		"size": 4146,
		"path": "../public/assets/source-form-tVYmOYsq.js"
	},
	"/assets/styles-oH0j3lRQ.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"13f14-eApduI12K9abx4TvF5gwXC1VfkM\"",
		"mtime": "2026-10-13T14:31:58.383Z",
		"size": 81684,
		"path": "../public/assets/styles-oH0j3lRQ.css"
	},
	"/assets/switch-BA3fXEVa.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1309-sKCM7FkVTpz8Aydk073Ye8Ma8bs\"",
		"mtime": "2026-10-13T14:31:58.381Z",
		"size": 4873,
		"path": "../public/assets/switch-BA3fXEVa.js"
	},
	"/assets/hls-BhcDaTqf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8c546-hnGn8vIsciiCtsWkmKZ1VwsqkPQ\"",
		"mtime": "2026-10-13T14:31:58.374Z",
		"size": 574790,
		"path": "../public/assets/hls-BhcDaTqf.js"
	},
	"/assets/tv-DPSaO8AZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b9-0cUNWJZVOctR6GtcCyrUDZT26FU\"",
		"mtime": "2026-10-13T14:31:58.381Z",
		"size": 185,
		"path": "../public/assets/tv-DPSaO8AZ.js"
	},
	"/assets/useBaseQuery-Byh6xdLO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f56-NdrVxxf7ZRkvLuA05iDFFMshfTs\"",
		"mtime": "2026-10-13T14:31:58.382Z",
		"size": 8022,
		"path": "../public/assets/useBaseQuery-Byh6xdLO.js"
	},
	"/assets/useServerFn-B3hta34e.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"193-71JZx9xqzAjjkgdH1jfomjftuZM\"",
		"mtime": "2026-10-13T14:31:58.382Z",
		"size": 403,
		"path": "../public/assets/useServerFn-B3hta34e.js"
	},
	"/assets/utils-4jUIYOBc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6bed-90NGITyc+kEKvxUkUtkYHgO1XH4\"",
		"mtime": "2026-10-13T14:31:58.383Z",
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
