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
		"mtime": "2026-10-13T14:25:30.801Z",
		"size": 159,
		"path": "../public/robots.txt"
	},
	"/assets/admin-BS7a43c1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d8-Upaecr9PrX+xUvTXqqvFjR1n3n0\"",
		"mtime": "2026-10-13T14:25:26.665Z",
		"size": 216,
		"path": "../public/assets/admin-BS7a43c1.js"
	},
	"/assets/admin-Bp47K0gw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ceb-C+aer/5FtJxLdhYkMqe4Wmr3yl8\"",
		"mtime": "2026-10-13T14:25:26.666Z",
		"size": 7403,
		"path": "../public/assets/admin-Bp47K0gw.js"
	},
	"/assets/admin-aMpKjWR-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ac-ncCyA0PDGtVLfZPCgDDel/KYlJg\"",
		"mtime": "2026-10-13T14:25:26.666Z",
		"size": 172,
		"path": "../public/assets/admin-aMpKjWR-.js"
	},
	"/assets/admin-ui-BbUUv4Gx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a99-DGPjvHj76oEcqve4O2wpvaUSfzc\"",
		"mtime": "2026-10-13T14:25:26.666Z",
		"size": 2713,
		"path": "../public/assets/admin-ui-BbUUv4Gx.js"
	},
	"/assets/admin.ativacoes-DvtExtBp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e6dc-K39fM2ghxCmynDmPTHBYZo2CfWM\"",
		"mtime": "2026-10-13T14:25:26.667Z",
		"size": 59100,
		"path": "../public/assets/admin.ativacoes-DvtExtBp.js"
	},
	"/assets/admin.auditoria-C2Rh-jzB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"59c-oXE59ngqIVBzlAzyv5WHXAIGz90\"",
		"mtime": "2026-10-13T14:25:26.667Z",
		"size": 1436,
		"path": "../public/assets/admin.auditoria-C2Rh-jzB.js"
	},
	"/assets/admin.clientes-CS6bRGWk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"122b-yBiuKMkyq1DSTLJV0ayWKQT9F5k\"",
		"mtime": "2026-10-13T14:25:26.667Z",
		"size": 4651,
		"path": "../public/assets/admin.clientes-CS6bRGWk.js"
	},
	"/assets/admin.configuracoes-DExMckMN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6f0-zoJCg8aY8VP0LyrPAGQEzKc1UR4\"",
		"mtime": "2026-10-13T14:25:26.668Z",
		"size": 1776,
		"path": "../public/assets/admin.configuracoes-DExMckMN.js"
	},
	"/assets/admin.cupons-CnXrHHZJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b6f-1S35qw+KekuiHqP+MidTLoBIhpc\"",
		"mtime": "2026-10-13T14:25:26.668Z",
		"size": 2927,
		"path": "../public/assets/admin.cupons-CnXrHHZJ.js"
	},
	"/assets/admin.dispositivos-DhB_G7rA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a4f-vmyJ28PsPOsMYg6UX77dnkQIUQ0\"",
		"mtime": "2026-10-13T14:25:26.668Z",
		"size": 6735,
		"path": "../public/assets/admin.dispositivos-DhB_G7rA.js"
	},
	"/assets/admin.editor-listas-5OtT-vsV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2e25-0jphyYs/Z/cAjHgecnQp4/n1b30\"",
		"mtime": "2026-10-13T14:25:26.669Z",
		"size": 11813,
		"path": "../public/assets/admin.editor-listas-5OtT-vsV.js"
	},
	"/assets/admin.fontes-jp88gzOQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a83-Diye92yi2/Ft/ObxEdcUq2JFVp4\"",
		"mtime": "2026-10-13T14:25:26.669Z",
		"size": 2691,
		"path": "../public/assets/admin.fontes-jp88gzOQ.js"
	},
	"/assets/admin.index-BPQsr6UK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99c-TrcFXWg17pNCDxaiHBMNaZvt0g8\"",
		"mtime": "2026-10-13T14:25:26.669Z",
		"size": 2460,
		"path": "../public/assets/admin.index-BPQsr6UK.js"
	},
	"/assets/admin.planos-CrhM8SQq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d2e-kjS4o1c7ezJDktVMYwoh0XHiGbM\"",
		"mtime": "2026-10-13T14:25:26.670Z",
		"size": 3374,
		"path": "../public/assets/admin.planos-CrhM8SQq.js"
	},
	"/assets/admin.servidores-BlJfbY7V.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"143c-bGQohAh+r+eA4hVdLePPICjf8XI\"",
		"mtime": "2026-10-13T14:25:26.670Z",
		"size": 5180,
		"path": "../public/assets/admin.servidores-BlJfbY7V.js"
	},
	"/assets/admin.usuarios-ymAO5HmK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bbb-RJ+S/8pzDVFvsmemP16KcweJgws\"",
		"mtime": "2026-10-13T14:25:26.670Z",
		"size": 3003,
		"path": "../public/assets/admin.usuarios-ymAO5HmK.js"
	},
	"/assets/admin.vendas-ay-3HF8o.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1315-E3LYF1oMefGPKX8KWW01MyWiQMc\"",
		"mtime": "2026-10-13T14:25:26.671Z",
		"size": 4885,
		"path": "../public/assets/admin.vendas-ay-3HF8o.js"
	},
	"/assets/ativar-D2PKayw7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ace-dSk2kAIxLc+jjkbBr8SKJgjaZJA\"",
		"mtime": "2026-10-13T14:25:26.671Z",
		"size": 2766,
		"path": "../public/assets/ativar-D2PKayw7.js"
	},
	"/assets/brand-CGWBYfYY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"870-5jr44NHkQSFd2P+/rUnWImYAjSE\"",
		"mtime": "2026-10-13T14:25:26.671Z",
		"size": 2160,
		"path": "../public/assets/brand-CGWBYfYY.js"
	},
	"/assets/button-h6J_H-00.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1306-RcEL7iMdlaNuWBpw7nR9rLiOLjc\"",
		"mtime": "2026-10-13T14:25:26.672Z",
		"size": 4870,
		"path": "../public/assets/button-h6J_H-00.js"
	},
	"/assets/cliente-t8M94KW4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"92e-dAfbE94VFmhiFWB950FVLinuN2A\"",
		"mtime": "2026-10-13T14:25:26.672Z",
		"size": 2350,
		"path": "../public/assets/cliente-t8M94KW4.js"
	},
	"/assets/copy-DCHSmm07.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ec-1JmVfTyRpBOyIw0flknfQhVgMIU\"",
		"mtime": "2026-10-13T14:25:26.672Z",
		"size": 236,
		"path": "../public/assets/copy-DCHSmm07.js"
	},
	"/assets/createLucideIcon-CabK5vaI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4cc-QNaBMQOAZq2T/auAvCB/kK/H4/Y\"",
		"mtime": "2026-10-13T14:25:26.672Z",
		"size": 1228,
		"path": "../public/assets/createLucideIcon-CabK5vaI.js"
	},
	"/assets/device-client-WFY6Hzd0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"465-tzFn0gGAy9ABFW/2OvNwFnpG0uk\"",
		"mtime": "2026-10-13T14:25:26.673Z",
		"size": 1125,
		"path": "../public/assets/device-client-WFY6Hzd0.js"
	},
	"/assets/dialog-CTSuqMcW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"70fc-Kvnbv9itDYtQP22UaSJV0PGD7NA\"",
		"mtime": "2026-10-13T14:25:26.673Z",
		"size": 28924,
		"path": "../public/assets/dialog-CTSuqMcW.js"
	},
	"/assets/dist-D2u8fECL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d57-4/ah+lGdikTP2xBnNtY5dam/hwY\"",
		"mtime": "2026-10-13T14:25:26.674Z",
		"size": 7511,
		"path": "../public/assets/dist-D2u8fECL.js"
	},
	"/assets/dist-CgDMLV_r.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1eb2-BNJkxXjxfJPQvS4dmYEJjM9hJlU\"",
		"mtime": "2026-10-13T14:25:26.673Z",
		"size": 7858,
		"path": "../public/assets/dist-CgDMLV_r.js"
	},
	"/assets/input-DBI9m3N_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2b0-lzo407/7hbInFoBAUMQ4DU5Nnfs\"",
		"mtime": "2026-10-13T14:25:26.674Z",
		"size": 688,
		"path": "../public/assets/input-DBI9m3N_.js"
	},
	"/assets/key-round-Bn85nMhF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"163-O/P/nSoUI/+KEuwtTXtxoxDYrnE\"",
		"mtime": "2026-10-13T14:25:26.675Z",
		"size": 355,
		"path": "../public/assets/key-round-Bn85nMhF.js"
	},
	"/assets/layers-BGxYLKOt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a5-BisWeP/KgCOeM0bG26uuxFjstYU\"",
		"mtime": "2026-10-13T14:25:26.675Z",
		"size": 421,
		"path": "../public/assets/layers-BGxYLKOt.js"
	},
	"/assets/index-z67d59fN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"64e75-2GUwGNbnJrPMFuxzNNrK2lhXdj0\"",
		"mtime": "2026-10-13T14:25:26.665Z",
		"size": 413301,
		"path": "../public/assets/index-z67d59fN.js"
	},
	"/assets/mpegts-BETI8p9P.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"42805-dzPDTvQgix74GP6HreExDymE6UY\"",
		"mtime": "2026-10-13T14:25:26.675Z",
		"size": 272389,
		"path": "../public/assets/mpegts-BETI8p9P.js"
	},
	"/assets/planos-B4nntVJy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2bc2-AfrHNMYrRxMga+LwU4MfRwqInx4\"",
		"mtime": "2026-10-13T14:25:26.676Z",
		"size": 11202,
		"path": "../public/assets/planos-B4nntVJy.js"
	},
	"/assets/planos-B_ZAReMm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b7-k4etbqTyp3swuTR4uns3VaVdthU\"",
		"mtime": "2026-10-13T14:25:26.676Z",
		"size": 183,
		"path": "../public/assets/planos-B_ZAReMm.js"
	},
	"/assets/planos-CZAQfuNO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a4-lrLF0ScYCH6Kap7pe+BGZA8QnP4\"",
		"mtime": "2026-10-13T14:25:26.676Z",
		"size": 164,
		"path": "../public/assets/planos-CZAQfuNO.js"
	},
	"/assets/player-pIq7D8dx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3e5e-jvuUSL5P8xKO0I1DjEWOyppsK04\"",
		"mtime": "2026-10-13T14:25:26.677Z",
		"size": 15966,
		"path": "../public/assets/player-pIq7D8dx.js"
	},
	"/assets/plus-CbMKM017.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99-aqcYFZgTys8a/7hyjfJsfu/4VT4\"",
		"mtime": "2026-10-13T14:25:26.677Z",
		"size": 153,
		"path": "../public/assets/plus-CbMKM017.js"
	},
	"/assets/react-DK6rpPfu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ec4-V1xNZhmjixlZV0LgvNOiaUJF4yk\"",
		"mtime": "2026-10-13T14:25:26.677Z",
		"size": 7876,
		"path": "../public/assets/react-DK6rpPfu.js"
	},
	"/assets/refresh-cw-CYL9LGno.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"141-Zc2Y+2YnuaiNQFwN2MZxws5+Fa4\"",
		"mtime": "2026-10-13T14:25:26.678Z",
		"size": 321,
		"path": "../public/assets/refresh-cw-CYL9LGno.js"
	},
	"/assets/rolldown-runtime-CbXtAM7H.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"24d-+aXgvbJ1Wwcp2A8AXKIBByksYC8\"",
		"mtime": "2026-10-13T14:25:26.678Z",
		"size": 589,
		"path": "../public/assets/rolldown-runtime-CbXtAM7H.js"
	},
	"/assets/routes-DcHSLNk8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a4e-Xc/DaG8eizlDivg9uIxPfSBXDAU\"",
		"mtime": "2026-10-13T14:25:26.678Z",
		"size": 2638,
		"path": "../public/assets/routes-DcHSLNk8.js"
	},
	"/assets/search-DLWCp_dZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"339-h33c/okndg6zkMJE7FmrTHT0U3Q\"",
		"mtime": "2026-10-13T14:25:26.679Z",
		"size": 825,
		"path": "../public/assets/search-DLWCp_dZ.js"
	},
	"/assets/server-mBZdm3QS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"152-r5S/rR4FsjS1tbZ3hMwc5anfMbI\"",
		"mtime": "2026-10-13T14:25:26.679Z",
		"size": 338,
		"path": "../public/assets/server-mBZdm3QS.js"
	},
	"/assets/settings-Civ9fmNU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e7-ncaTBpcHZCIAXmxXV083sTQOuQ8\"",
		"mtime": "2026-10-13T14:25:26.679Z",
		"size": 487,
		"path": "../public/assets/settings-Civ9fmNU.js"
	},
	"/assets/shield-check-TEr-fcUz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"140-M59jB9Cm7lnEFdolUmoxHh/Vpzs\"",
		"mtime": "2026-10-13T14:25:26.680Z",
		"size": 320,
		"path": "../public/assets/shield-check-TEr-fcUz.js"
	},
	"/assets/source-form-BLeS3xnL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1032-w0ZtjGUXp64EZw0bwNlxgffRUuU\"",
		"mtime": "2026-10-13T14:25:26.680Z",
		"size": 4146,
		"path": "../public/assets/source-form-BLeS3xnL.js"
	},
	"/assets/styles-oH0j3lRQ.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"13f14-eApduI12K9abx4TvF5gwXC1VfkM\"",
		"mtime": "2026-10-13T14:25:26.682Z",
		"size": 81684,
		"path": "../public/assets/styles-oH0j3lRQ.css"
	},
	"/assets/switch-Qo5EEyJe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1309-Uw0a0/i4g7emZQFT8QG3NJfqy74\"",
		"mtime": "2026-10-13T14:25:26.680Z",
		"size": 4873,
		"path": "../public/assets/switch-Qo5EEyJe.js"
	},
	"/assets/hls-BhcDaTqf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8c546-hnGn8vIsciiCtsWkmKZ1VwsqkPQ\"",
		"mtime": "2026-10-13T14:25:26.674Z",
		"size": 574790,
		"path": "../public/assets/hls-BhcDaTqf.js"
	},
	"/assets/tv-DPSaO8AZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b9-0cUNWJZVOctR6GtcCyrUDZT26FU\"",
		"mtime": "2026-10-13T14:25:26.680Z",
		"size": 185,
		"path": "../public/assets/tv-DPSaO8AZ.js"
	},
	"/assets/useBaseQuery-DIFeyvTk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f56-VangQKXx6dd+Jq3RtBQVf2agDls\"",
		"mtime": "2026-10-13T14:25:26.681Z",
		"size": 8022,
		"path": "../public/assets/useBaseQuery-DIFeyvTk.js"
	},
	"/assets/useServerFn-CYdN1yJ1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"193-fVQVMGSJHxUctyvykjTUOLOmKwQ\"",
		"mtime": "2026-10-13T14:25:26.681Z",
		"size": 403,
		"path": "../public/assets/useServerFn-CYdN1yJ1.js"
	},
	"/assets/utils-4jUIYOBc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6bed-90NGITyc+kEKvxUkUtkYHgO1XH4\"",
		"mtime": "2026-10-13T14:25:26.681Z",
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
