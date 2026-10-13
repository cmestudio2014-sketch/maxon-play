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
		"mtime": "2026-10-13T14:13:19.413Z",
		"size": 159,
		"path": "../public/robots.txt"
	},
	"/assets/admin-D4Ccd4si.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ceb-vViLUcenDCmH4d/3Rgc7hSkrqxs\"",
		"mtime": "2026-10-13T14:13:15.351Z",
		"size": 7403,
		"path": "../public/assets/admin-D4Ccd4si.js"
	},
	"/assets/admin-DzURA1js.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ac-a8wsRoHXdn9TmNhBVcV77KgKrEo\"",
		"mtime": "2026-10-13T14:13:15.351Z",
		"size": 172,
		"path": "../public/assets/admin-DzURA1js.js"
	},
	"/assets/admin-pLH3p7yq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d8-jVpGn+g73iQwmfiqV8porPuHYvs\"",
		"mtime": "2026-10-13T14:13:15.351Z",
		"size": 216,
		"path": "../public/assets/admin-pLH3p7yq.js"
	},
	"/assets/admin-ui-CsmEYmq5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a99-GLuFl2WrTYfCK8aorvtEwHehYKM\"",
		"mtime": "2026-10-13T14:13:15.352Z",
		"size": 2713,
		"path": "../public/assets/admin-ui-CsmEYmq5.js"
	},
	"/assets/admin.ativacoes-DcZ1mYDI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e6dc-OXCgSR0PGNc2EygAq1yQyv0gt6o\"",
		"mtime": "2026-10-13T14:13:15.352Z",
		"size": 59100,
		"path": "../public/assets/admin.ativacoes-DcZ1mYDI.js"
	},
	"/assets/admin.auditoria-D8JOl62S.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"59c-t4PUJfZ3g1smEWJBMrXNHjflX5w\"",
		"mtime": "2026-10-13T14:13:15.352Z",
		"size": 1436,
		"path": "../public/assets/admin.auditoria-D8JOl62S.js"
	},
	"/assets/admin.clientes-gRcAhFZK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"122b-tQxNkqsqVXzBWw922Hp1aLHOQsM\"",
		"mtime": "2026-10-13T14:13:15.353Z",
		"size": 4651,
		"path": "../public/assets/admin.clientes-gRcAhFZK.js"
	},
	"/assets/admin.configuracoes-BXt2TD69.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6f0-BRaegW7LsEhDdTi6TROL1q1enLs\"",
		"mtime": "2026-10-13T14:13:15.353Z",
		"size": 1776,
		"path": "../public/assets/admin.configuracoes-BXt2TD69.js"
	},
	"/assets/admin.cupons-DJx98yAM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b6f-LJEcBmOo5V6QQpKOqBwN5OGaHLw\"",
		"mtime": "2026-10-13T14:13:15.353Z",
		"size": 2927,
		"path": "../public/assets/admin.cupons-DJx98yAM.js"
	},
	"/assets/admin.dispositivos-CnP5jyIc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a4f-s50WVa9L2RhaPY998EqZMS3rKlw\"",
		"mtime": "2026-10-13T14:13:15.354Z",
		"size": 6735,
		"path": "../public/assets/admin.dispositivos-CnP5jyIc.js"
	},
	"/assets/admin.editor-listas-DuwBMhtY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2e25-WgOYNozJ1sFjJSVkEH1i6o6GgaM\"",
		"mtime": "2026-10-13T14:13:15.354Z",
		"size": 11813,
		"path": "../public/assets/admin.editor-listas-DuwBMhtY.js"
	},
	"/assets/admin.fontes-DcAojEtA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a83-Xx4U77B6EqSRpFmkGPfyYvMyMTk\"",
		"mtime": "2026-10-13T14:13:15.354Z",
		"size": 2691,
		"path": "../public/assets/admin.fontes-DcAojEtA.js"
	},
	"/assets/admin.index-DWWj9W7Q.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99c-gsv0mjpYMgcgMCiykQZjI+XFfvY\"",
		"mtime": "2026-10-13T14:13:15.355Z",
		"size": 2460,
		"path": "../public/assets/admin.index-DWWj9W7Q.js"
	},
	"/assets/admin.planos-CN1g0wxX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d2e-0ZRNB4N1Pzg25VEu2D1ANeAPZSE\"",
		"mtime": "2026-10-13T14:13:15.355Z",
		"size": 3374,
		"path": "../public/assets/admin.planos-CN1g0wxX.js"
	},
	"/assets/admin.servidores-BDCEG7LC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"143c-vDfvVV7nVmJIBDPXfzTIzLySR18\"",
		"mtime": "2026-10-13T14:13:15.355Z",
		"size": 5180,
		"path": "../public/assets/admin.servidores-BDCEG7LC.js"
	},
	"/assets/admin.usuarios-BSbDOckq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bbb-l/nHgmCZZGg0qhseSiJ9BID2TMI\"",
		"mtime": "2026-10-13T14:13:15.356Z",
		"size": 3003,
		"path": "../public/assets/admin.usuarios-BSbDOckq.js"
	},
	"/assets/admin.vendas-Cw86ktLy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1315-6DkvgAdRtzd2MtzSF/Arcomb4ys\"",
		"mtime": "2026-10-13T14:13:15.356Z",
		"size": 4885,
		"path": "../public/assets/admin.vendas-Cw86ktLy.js"
	},
	"/assets/ativar-BquUJnBP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ace-2pAqxfNDfjLbTyoP5ErEtT0+8gw\"",
		"mtime": "2026-10-13T14:13:15.356Z",
		"size": 2766,
		"path": "../public/assets/ativar-BquUJnBP.js"
	},
	"/assets/brand-Bpj-R7bU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"870-vRn9/GH7dKp82fAfZo450Tb2qFc\"",
		"mtime": "2026-10-13T14:13:15.356Z",
		"size": 2160,
		"path": "../public/assets/brand-Bpj-R7bU.js"
	},
	"/assets/button-Bjl4dXZ2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1306-E62ynmfkQCei5hGMczCtu5mapvw\"",
		"mtime": "2026-10-13T14:13:15.357Z",
		"size": 4870,
		"path": "../public/assets/button-Bjl4dXZ2.js"
	},
	"/assets/cliente-CeH1l4hy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"92e-UJgC+DZSdfHNLL/a/J9HLEp0pP0\"",
		"mtime": "2026-10-13T14:13:15.357Z",
		"size": 2350,
		"path": "../public/assets/cliente-CeH1l4hy.js"
	},
	"/assets/copy-DCHSmm07.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ec-1JmVfTyRpBOyIw0flknfQhVgMIU\"",
		"mtime": "2026-10-13T14:13:15.357Z",
		"size": 236,
		"path": "../public/assets/copy-DCHSmm07.js"
	},
	"/assets/createLucideIcon-CabK5vaI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4cc-QNaBMQOAZq2T/auAvCB/kK/H4/Y\"",
		"mtime": "2026-10-13T14:13:15.358Z",
		"size": 1228,
		"path": "../public/assets/createLucideIcon-CabK5vaI.js"
	},
	"/assets/device-client-WFY6Hzd0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"465-tzFn0gGAy9ABFW/2OvNwFnpG0uk\"",
		"mtime": "2026-10-13T14:13:15.358Z",
		"size": 1125,
		"path": "../public/assets/device-client-WFY6Hzd0.js"
	},
	"/assets/dialog-DU_iBBPa.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"70fc-Ljtb/a6DWDbKzyIXhxiBCzsYmQ0\"",
		"mtime": "2026-10-13T14:13:15.358Z",
		"size": 28924,
		"path": "../public/assets/dialog-DU_iBBPa.js"
	},
	"/assets/dist-BX4KhBHz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d57-ezO0Xce9gKOuy2B8oYnBkjqlNsg\"",
		"mtime": "2026-10-13T14:13:15.359Z",
		"size": 7511,
		"path": "../public/assets/dist-BX4KhBHz.js"
	},
	"/assets/dist-CZFWJfIl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1eb2-ko/P1U2a624+qROUmJ90nAIdiyY\"",
		"mtime": "2026-10-13T14:13:15.359Z",
		"size": 7858,
		"path": "../public/assets/dist-CZFWJfIl.js"
	},
	"/assets/key-round-Bn85nMhF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"163-O/P/nSoUI/+KEuwtTXtxoxDYrnE\"",
		"mtime": "2026-10-13T14:13:15.360Z",
		"size": 355,
		"path": "../public/assets/key-round-Bn85nMhF.js"
	},
	"/assets/input-ByRY3VwL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2b0-mlevVuzjt9ORkWrBChE19YM+j00\"",
		"mtime": "2026-10-13T14:13:15.360Z",
		"size": 688,
		"path": "../public/assets/input-ByRY3VwL.js"
	},
	"/assets/layers-BGxYLKOt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a5-BisWeP/KgCOeM0bG26uuxFjstYU\"",
		"mtime": "2026-10-13T14:13:15.360Z",
		"size": 421,
		"path": "../public/assets/layers-BGxYLKOt.js"
	},
	"/assets/index--UxsPgwq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"64e75-GwPMQuAhcbpoiMGrnDgkosFVYVQ\"",
		"mtime": "2026-10-13T14:13:15.350Z",
		"size": 413301,
		"path": "../public/assets/index--UxsPgwq.js"
	},
	"/assets/planos-BEW6WKbd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a4-iOc9gXWaiV6WRG8LWdqgJ8o4A8k\"",
		"mtime": "2026-10-13T14:13:15.361Z",
		"size": 164,
		"path": "../public/assets/planos-BEW6WKbd.js"
	},
	"/assets/planos-Z8GjzOWz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2bc2-vI3VIwU1YdDgegEmjv5Ok0TRgnc\"",
		"mtime": "2026-10-13T14:13:15.362Z",
		"size": 11202,
		"path": "../public/assets/planos-Z8GjzOWz.js"
	},
	"/assets/planos-BkTgYxbV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b7-g8+/LiXhf690QYrS25QRcaI8gy8\"",
		"mtime": "2026-10-13T14:13:15.361Z",
		"size": 183,
		"path": "../public/assets/planos-BkTgYxbV.js"
	},
	"/assets/player-DpJZgsmI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3c3d-C++4IcSwRFa1HltHVlKF/P7xsUo\"",
		"mtime": "2026-10-13T14:13:15.362Z",
		"size": 15421,
		"path": "../public/assets/player-DpJZgsmI.js"
	},
	"/assets/plus-CbMKM017.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99-aqcYFZgTys8a/7hyjfJsfu/4VT4\"",
		"mtime": "2026-10-13T14:13:15.362Z",
		"size": 153,
		"path": "../public/assets/plus-CbMKM017.js"
	},
	"/assets/react-DK6rpPfu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ec4-V1xNZhmjixlZV0LgvNOiaUJF4yk\"",
		"mtime": "2026-10-13T14:13:15.363Z",
		"size": 7876,
		"path": "../public/assets/react-DK6rpPfu.js"
	},
	"/assets/mpegts-BETI8p9P.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"42805-dzPDTvQgix74GP6HreExDymE6UY\"",
		"mtime": "2026-10-13T14:13:15.361Z",
		"size": 272389,
		"path": "../public/assets/mpegts-BETI8p9P.js"
	},
	"/assets/refresh-cw-CYL9LGno.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"141-Zc2Y+2YnuaiNQFwN2MZxws5+Fa4\"",
		"mtime": "2026-10-13T14:13:15.363Z",
		"size": 321,
		"path": "../public/assets/refresh-cw-CYL9LGno.js"
	},
	"/assets/rolldown-runtime-CbXtAM7H.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"24d-+aXgvbJ1Wwcp2A8AXKIBByksYC8\"",
		"mtime": "2026-10-13T14:13:15.363Z",
		"size": 589,
		"path": "../public/assets/rolldown-runtime-CbXtAM7H.js"
	},
	"/assets/routes-DpgENdfj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a4e-0lGPx5eYC3k/JErttFaMlvyZcgk\"",
		"mtime": "2026-10-13T14:13:15.364Z",
		"size": 2638,
		"path": "../public/assets/routes-DpgENdfj.js"
	},
	"/assets/search-DLWCp_dZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"339-h33c/okndg6zkMJE7FmrTHT0U3Q\"",
		"mtime": "2026-10-13T14:13:15.364Z",
		"size": 825,
		"path": "../public/assets/search-DLWCp_dZ.js"
	},
	"/assets/server-mBZdm3QS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"152-r5S/rR4FsjS1tbZ3hMwc5anfMbI\"",
		"mtime": "2026-10-13T14:13:15.364Z",
		"size": 338,
		"path": "../public/assets/server-mBZdm3QS.js"
	},
	"/assets/settings-Civ9fmNU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e7-ncaTBpcHZCIAXmxXV083sTQOuQ8\"",
		"mtime": "2026-10-13T14:13:15.364Z",
		"size": 487,
		"path": "../public/assets/settings-Civ9fmNU.js"
	},
	"/assets/shield-check-TEr-fcUz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"140-M59jB9Cm7lnEFdolUmoxHh/Vpzs\"",
		"mtime": "2026-10-13T14:13:15.365Z",
		"size": 320,
		"path": "../public/assets/shield-check-TEr-fcUz.js"
	},
	"/assets/source-form-B2UDJZPS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1032-YvmWoGa5ZbR8w2m4DYv+vw5DVG4\"",
		"mtime": "2026-10-13T14:13:15.365Z",
		"size": 4146,
		"path": "../public/assets/source-form-B2UDJZPS.js"
	},
	"/assets/styles-oH0j3lRQ.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"13f14-eApduI12K9abx4TvF5gwXC1VfkM\"",
		"mtime": "2026-10-13T14:13:15.367Z",
		"size": 81684,
		"path": "../public/assets/styles-oH0j3lRQ.css"
	},
	"/assets/switch-BeyA6F5K.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1309-DzS7Tpxx+p/B3igBYs1IHuKu3F8\"",
		"mtime": "2026-10-13T14:13:15.365Z",
		"size": 4873,
		"path": "../public/assets/switch-BeyA6F5K.js"
	},
	"/assets/hls-BhcDaTqf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8c546-hnGn8vIsciiCtsWkmKZ1VwsqkPQ\"",
		"mtime": "2026-10-13T14:13:15.359Z",
		"size": 574790,
		"path": "../public/assets/hls-BhcDaTqf.js"
	},
	"/assets/tv-DPSaO8AZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b9-0cUNWJZVOctR6GtcCyrUDZT26FU\"",
		"mtime": "2026-10-13T14:13:15.366Z",
		"size": 185,
		"path": "../public/assets/tv-DPSaO8AZ.js"
	},
	"/assets/useBaseQuery-D1Rs5vrf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f56-AJspRXRW6QFWtqPr3+21/Awb7HM\"",
		"mtime": "2026-10-13T14:13:15.366Z",
		"size": 8022,
		"path": "../public/assets/useBaseQuery-D1Rs5vrf.js"
	},
	"/assets/useServerFn-CaIZp-t5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"193-JHxaRmwjZ1D2s4c7q9gFMpXkKh0\"",
		"mtime": "2026-10-13T14:13:15.366Z",
		"size": 403,
		"path": "../public/assets/useServerFn-CaIZp-t5.js"
	},
	"/assets/utils-4jUIYOBc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6bed-90NGITyc+kEKvxUkUtkYHgO1XH4\"",
		"mtime": "2026-10-13T14:13:15.367Z",
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
