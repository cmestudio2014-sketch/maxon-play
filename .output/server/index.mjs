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
		"mtime": "2026-10-13T14:01:24.319Z",
		"size": 159,
		"path": "../public/robots.txt"
	},
	"/assets/admin-Bc1_nBfo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d8-qpTmTlaeLvDXwxjvJ00DKaZlsXs\"",
		"mtime": "2026-10-13T14:01:20.271Z",
		"size": 216,
		"path": "../public/assets/admin-Bc1_nBfo.js"
	},
	"/assets/admin-CkUoU2-Y.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ceb-/q2SzAZDlNTf/tEnGjobPUNRlPk\"",
		"mtime": "2026-10-13T14:01:20.272Z",
		"size": 7403,
		"path": "../public/assets/admin-CkUoU2-Y.js"
	},
	"/assets/admin-DnxblxZG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ac-KnEHBVgwsXf1qyo9j/NlEH71z7c\"",
		"mtime": "2026-10-13T14:01:20.272Z",
		"size": 172,
		"path": "../public/assets/admin-DnxblxZG.js"
	},
	"/assets/admin-ui-B-xfgj91.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a99-+qMnEtXWE/wzPBzFrpfMGAQwPV0\"",
		"mtime": "2026-10-13T14:01:20.272Z",
		"size": 2713,
		"path": "../public/assets/admin-ui-B-xfgj91.js"
	},
	"/assets/admin.ativacoes-InW2Y3e9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e6dc-ewCVFZTghK/WMs1uEUz/CSH0Tbc\"",
		"mtime": "2026-10-13T14:01:20.273Z",
		"size": 59100,
		"path": "../public/assets/admin.ativacoes-InW2Y3e9.js"
	},
	"/assets/admin.auditoria-BgDeb-9G.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"59c-WTQ1G0+WQQCauSd6fvq8pkkluaU\"",
		"mtime": "2026-10-13T14:01:20.273Z",
		"size": 1436,
		"path": "../public/assets/admin.auditoria-BgDeb-9G.js"
	},
	"/assets/admin.clientes-8Q_NgMmE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"122b-XjQJRci0PKU3UAaktPUKDYD3uAk\"",
		"mtime": "2026-10-13T14:01:20.273Z",
		"size": 4651,
		"path": "../public/assets/admin.clientes-8Q_NgMmE.js"
	},
	"/assets/admin.configuracoes-hWNqcfqY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6f0-Eq6kuarBFans57Ci0nW3HTPZF3I\"",
		"mtime": "2026-10-13T14:01:20.274Z",
		"size": 1776,
		"path": "../public/assets/admin.configuracoes-hWNqcfqY.js"
	},
	"/assets/admin.cupons-CGlsEU2s.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b6f-3y/47u7nvS8e6+DgOfGZmUeCFtw\"",
		"mtime": "2026-10-13T14:01:20.274Z",
		"size": 2927,
		"path": "../public/assets/admin.cupons-CGlsEU2s.js"
	},
	"/assets/admin.dispositivos-BSEcW8B7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a4f-hHBBHlSxyXvKM3oZRmwrTdNnCyM\"",
		"mtime": "2026-10-13T14:01:20.274Z",
		"size": 6735,
		"path": "../public/assets/admin.dispositivos-BSEcW8B7.js"
	},
	"/assets/admin.editor-listas-yuT-3syg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2e25-DgsfJkVJI086FeCDyIzdNS62Qi8\"",
		"mtime": "2026-10-13T14:01:20.275Z",
		"size": 11813,
		"path": "../public/assets/admin.editor-listas-yuT-3syg.js"
	},
	"/assets/admin.fontes-5NJuoJhF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a83-VlbXKeIZOeGPadUn1aSYHJIbFsM\"",
		"mtime": "2026-10-13T14:01:20.275Z",
		"size": 2691,
		"path": "../public/assets/admin.fontes-5NJuoJhF.js"
	},
	"/assets/admin.index-It--cZ8V.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99c-MvOZ/digS5S0CQJbYrRJhEhcfrY\"",
		"mtime": "2026-10-13T14:01:20.275Z",
		"size": 2460,
		"path": "../public/assets/admin.index-It--cZ8V.js"
	},
	"/assets/admin.planos-DTbLawOW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d2e-vdppWW5pZQiSEYFazjVu5i0ZiIs\"",
		"mtime": "2026-10-13T14:01:20.276Z",
		"size": 3374,
		"path": "../public/assets/admin.planos-DTbLawOW.js"
	},
	"/assets/admin.servidores-DhMugPHV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"143c-n9g53uu199Y6QRInuv/aHTVIee4\"",
		"mtime": "2026-10-13T14:01:20.276Z",
		"size": 5180,
		"path": "../public/assets/admin.servidores-DhMugPHV.js"
	},
	"/assets/admin.usuarios-TWi3GxVO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bbb-v4WJAUmjwCs/RsNU1G8p9zwLwSY\"",
		"mtime": "2026-10-13T14:01:20.276Z",
		"size": 3003,
		"path": "../public/assets/admin.usuarios-TWi3GxVO.js"
	},
	"/assets/admin.vendas-MRRBr_-2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1315-Fpoz+8ouDVyLtANYWvlVRUlSLu0\"",
		"mtime": "2026-10-13T14:01:20.277Z",
		"size": 4885,
		"path": "../public/assets/admin.vendas-MRRBr_-2.js"
	},
	"/assets/ativar-Q_xdYD4x.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ace-nvPD2BgZfqYHBrFOz7W1woaICI8\"",
		"mtime": "2026-10-13T14:01:20.277Z",
		"size": 2766,
		"path": "../public/assets/ativar-Q_xdYD4x.js"
	},
	"/assets/brand-B3RENpdA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"870-0P6bqGMnnSP6GJPzdbbLxEhnh8w\"",
		"mtime": "2026-10-13T14:01:20.277Z",
		"size": 2160,
		"path": "../public/assets/brand-B3RENpdA.js"
	},
	"/assets/button-DqbbKduY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1306-VXH13d0KV9r9HJx5V3Ef6hmSiTQ\"",
		"mtime": "2026-10-13T14:01:20.278Z",
		"size": 4870,
		"path": "../public/assets/button-DqbbKduY.js"
	},
	"/assets/cliente-7l8obApR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"92e-ijr6J+psAspaf4GGBr7Of0rOXzA\"",
		"mtime": "2026-10-13T14:01:20.278Z",
		"size": 2350,
		"path": "../public/assets/cliente-7l8obApR.js"
	},
	"/assets/copy-DCHSmm07.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ec-1JmVfTyRpBOyIw0flknfQhVgMIU\"",
		"mtime": "2026-10-13T14:01:20.278Z",
		"size": 236,
		"path": "../public/assets/copy-DCHSmm07.js"
	},
	"/assets/createLucideIcon-CabK5vaI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4cc-QNaBMQOAZq2T/auAvCB/kK/H4/Y\"",
		"mtime": "2026-10-13T14:01:20.279Z",
		"size": 1228,
		"path": "../public/assets/createLucideIcon-CabK5vaI.js"
	},
	"/assets/device-client-WFY6Hzd0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"465-tzFn0gGAy9ABFW/2OvNwFnpG0uk\"",
		"mtime": "2026-10-13T14:01:20.279Z",
		"size": 1125,
		"path": "../public/assets/device-client-WFY6Hzd0.js"
	},
	"/assets/dialog-Oaz_9GGs.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"70fc-C2l+1ELhoQihjy1Cr1lpb2ueUUY\"",
		"mtime": "2026-10-13T14:01:20.279Z",
		"size": 28924,
		"path": "../public/assets/dialog-Oaz_9GGs.js"
	},
	"/assets/dist-B4HzKOss.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1eb2-QPtNZ+zLRcmNJjzfBzL7qtj2sBo\"",
		"mtime": "2026-10-13T14:01:20.279Z",
		"size": 7858,
		"path": "../public/assets/dist-B4HzKOss.js"
	},
	"/assets/dist-BSzDK3Vg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d57-snfFIj8h1GYpR9D3PaNQWa9pB7k\"",
		"mtime": "2026-10-13T14:01:20.280Z",
		"size": 7511,
		"path": "../public/assets/dist-BSzDK3Vg.js"
	},
	"/assets/input-AXBfCHEm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2b0-A7/chDCua0FOsp+peg/jgAtCjhE\"",
		"mtime": "2026-10-13T14:01:20.281Z",
		"size": 688,
		"path": "../public/assets/input-AXBfCHEm.js"
	},
	"/assets/layers-BGxYLKOt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a5-BisWeP/KgCOeM0bG26uuxFjstYU\"",
		"mtime": "2026-10-13T14:01:20.281Z",
		"size": 421,
		"path": "../public/assets/layers-BGxYLKOt.js"
	},
	"/assets/key-round-Bn85nMhF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"163-O/P/nSoUI/+KEuwtTXtxoxDYrnE\"",
		"mtime": "2026-10-13T14:01:20.281Z",
		"size": 355,
		"path": "../public/assets/key-round-Bn85nMhF.js"
	},
	"/assets/index-dsYDNRcv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"64e75-V41VD2WbTsgS1clpNvCyte47mf0\"",
		"mtime": "2026-10-13T14:01:20.271Z",
		"size": 413301,
		"path": "../public/assets/index-dsYDNRcv.js"
	},
	"/assets/planos-CCshnZax.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a4-Zu+jrdUzHMnPTIHD5UIm8suD3Es\"",
		"mtime": "2026-10-13T14:01:20.282Z",
		"size": 164,
		"path": "../public/assets/planos-CCshnZax.js"
	},
	"/assets/planos-OiU2jtmP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2bc2-UgzarH/G28EGA5agsACnZFVW1U4\"",
		"mtime": "2026-10-13T14:01:20.282Z",
		"size": 11202,
		"path": "../public/assets/planos-OiU2jtmP.js"
	},
	"/assets/plus-CbMKM017.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99-aqcYFZgTys8a/7hyjfJsfu/4VT4\"",
		"mtime": "2026-10-13T14:01:20.283Z",
		"size": 153,
		"path": "../public/assets/plus-CbMKM017.js"
	},
	"/assets/mpegts-BETI8p9P.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"42805-dzPDTvQgix74GP6HreExDymE6UY\"",
		"mtime": "2026-10-13T14:01:20.282Z",
		"size": 272389,
		"path": "../public/assets/mpegts-BETI8p9P.js"
	},
	"/assets/player-DmpBAA8e.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"37af-bPeUFpTH0rmT75h0QQwYzhPGU4I\"",
		"mtime": "2026-10-13T14:01:20.283Z",
		"size": 14255,
		"path": "../public/assets/player-DmpBAA8e.js"
	},
	"/assets/react-DK6rpPfu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ec4-V1xNZhmjixlZV0LgvNOiaUJF4yk\"",
		"mtime": "2026-10-13T14:01:20.283Z",
		"size": 7876,
		"path": "../public/assets/react-DK6rpPfu.js"
	},
	"/assets/refresh-cw-CYL9LGno.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"141-Zc2Y+2YnuaiNQFwN2MZxws5+Fa4\"",
		"mtime": "2026-10-13T14:01:20.284Z",
		"size": 321,
		"path": "../public/assets/refresh-cw-CYL9LGno.js"
	},
	"/assets/planos-BgCMialK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b7-1OLxL5CrR77Syud9jTnRyjGsPdU\"",
		"mtime": "2026-10-13T14:01:20.282Z",
		"size": 183,
		"path": "../public/assets/planos-BgCMialK.js"
	},
	"/assets/rolldown-runtime-CbXtAM7H.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"24d-+aXgvbJ1Wwcp2A8AXKIBByksYC8\"",
		"mtime": "2026-10-13T14:01:20.284Z",
		"size": 589,
		"path": "../public/assets/rolldown-runtime-CbXtAM7H.js"
	},
	"/assets/routes-CKNMU5Ki.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a4e-sQMcWTBI3rwo3LTnYOFjxE4iOow\"",
		"mtime": "2026-10-13T14:01:20.284Z",
		"size": 2638,
		"path": "../public/assets/routes-CKNMU5Ki.js"
	},
	"/assets/search-DLWCp_dZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"339-h33c/okndg6zkMJE7FmrTHT0U3Q\"",
		"mtime": "2026-10-13T14:01:20.285Z",
		"size": 825,
		"path": "../public/assets/search-DLWCp_dZ.js"
	},
	"/assets/server-mBZdm3QS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"152-r5S/rR4FsjS1tbZ3hMwc5anfMbI\"",
		"mtime": "2026-10-13T14:01:20.285Z",
		"size": 338,
		"path": "../public/assets/server-mBZdm3QS.js"
	},
	"/assets/settings-Civ9fmNU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e7-ncaTBpcHZCIAXmxXV083sTQOuQ8\"",
		"mtime": "2026-10-13T14:01:20.285Z",
		"size": 487,
		"path": "../public/assets/settings-Civ9fmNU.js"
	},
	"/assets/shield-check-TEr-fcUz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"140-M59jB9Cm7lnEFdolUmoxHh/Vpzs\"",
		"mtime": "2026-10-13T14:01:20.286Z",
		"size": 320,
		"path": "../public/assets/shield-check-TEr-fcUz.js"
	},
	"/assets/source-form-Bkwpn8Lz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1032-jJzNGpRrfMhcQ5ObhKdbBQsxPG8\"",
		"mtime": "2026-10-13T14:01:20.286Z",
		"size": 4146,
		"path": "../public/assets/source-form-Bkwpn8Lz.js"
	},
	"/assets/styles-oH0j3lRQ.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"13f14-eApduI12K9abx4TvF5gwXC1VfkM\"",
		"mtime": "2026-10-13T14:01:20.288Z",
		"size": 81684,
		"path": "../public/assets/styles-oH0j3lRQ.css"
	},
	"/assets/switch-C8fv_35F.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1309-fSNOFOOAkr2Rdo4eGhcniA9D4IU\"",
		"mtime": "2026-10-13T14:01:20.286Z",
		"size": 4873,
		"path": "../public/assets/switch-C8fv_35F.js"
	},
	"/assets/hls-BhcDaTqf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8c546-hnGn8vIsciiCtsWkmKZ1VwsqkPQ\"",
		"mtime": "2026-10-13T14:01:20.280Z",
		"size": 574790,
		"path": "../public/assets/hls-BhcDaTqf.js"
	},
	"/assets/tv-DPSaO8AZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b9-0cUNWJZVOctR6GtcCyrUDZT26FU\"",
		"mtime": "2026-10-13T14:01:20.287Z",
		"size": 185,
		"path": "../public/assets/tv-DPSaO8AZ.js"
	},
	"/assets/useBaseQuery-BSlkoTUn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f56-hh8mO8y+dN0ghavG0DF9wYMaDak\"",
		"mtime": "2026-10-13T14:01:20.287Z",
		"size": 8022,
		"path": "../public/assets/useBaseQuery-BSlkoTUn.js"
	},
	"/assets/useServerFn-HxKyN7d_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"193-5bXdfjyGStReyqtpWfBuAgNjCG0\"",
		"mtime": "2026-10-13T14:01:20.287Z",
		"size": 403,
		"path": "../public/assets/useServerFn-HxKyN7d_.js"
	},
	"/assets/utils-4jUIYOBc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6bed-90NGITyc+kEKvxUkUtkYHgO1XH4\"",
		"mtime": "2026-10-13T14:01:20.287Z",
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
