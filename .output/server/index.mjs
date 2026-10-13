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
		"mtime": "2026-10-13T13:53:28.749Z",
		"size": 159,
		"path": "../public/robots.txt"
	},
	"/assets/admin-BoQkMq9a.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d8-wK2y5gMlzIG7dyuoGZzv0e9LI/E\"",
		"mtime": "2026-10-13T13:53:24.604Z",
		"size": 216,
		"path": "../public/assets/admin-BoQkMq9a.js"
	},
	"/assets/admin-RgLfe9BW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ac-eQHNgTP353pHRf9OdmdquM0zDZo\"",
		"mtime": "2026-10-13T13:53:24.605Z",
		"size": 172,
		"path": "../public/assets/admin-RgLfe9BW.js"
	},
	"/assets/admin-dvbqOA4h.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ceb-Q+iGFYurDBSgaYlDt5R3/4ii2C0\"",
		"mtime": "2026-10-13T13:53:24.605Z",
		"size": 7403,
		"path": "../public/assets/admin-dvbqOA4h.js"
	},
	"/assets/admin-ui-Br2dSq-a.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a99-FxaYRXcc3uZn8Nb1ailtPsfCu7A\"",
		"mtime": "2026-10-13T13:53:24.605Z",
		"size": 2713,
		"path": "../public/assets/admin-ui-Br2dSq-a.js"
	},
	"/assets/admin.ativacoes-CL1CbcYF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e6dc-Q1GV+MHVlMvD/u1obvbWwwnatgs\"",
		"mtime": "2026-10-13T13:53:24.605Z",
		"size": 59100,
		"path": "../public/assets/admin.ativacoes-CL1CbcYF.js"
	},
	"/assets/admin.auditoria-bvyfX9aq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"59c-2fHH6gxI6qWOtTeR7IdhBGRm3QU\"",
		"mtime": "2026-10-13T13:53:24.606Z",
		"size": 1436,
		"path": "../public/assets/admin.auditoria-bvyfX9aq.js"
	},
	"/assets/admin.clientes-B_UJ4dGW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"122b-ByQtffk+B0BPwosLcFqbC7fW4to\"",
		"mtime": "2026-10-13T13:53:24.606Z",
		"size": 4651,
		"path": "../public/assets/admin.clientes-B_UJ4dGW.js"
	},
	"/assets/admin.configuracoes-DKvLtHci.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6f0-+NcMWAhN96iwR1kxzS91OSSu1DY\"",
		"mtime": "2026-10-13T13:53:24.606Z",
		"size": 1776,
		"path": "../public/assets/admin.configuracoes-DKvLtHci.js"
	},
	"/assets/admin.cupons-BM3QPPFt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b6f-CtyCTu1D0dDEZlVBmmoLvf2qrbA\"",
		"mtime": "2026-10-13T13:53:24.607Z",
		"size": 2927,
		"path": "../public/assets/admin.cupons-BM3QPPFt.js"
	},
	"/assets/admin.dispositivos-0u2VIcSY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a4f-NkrLd1S9I6effyHGAJtUlHfK5Hw\"",
		"mtime": "2026-10-13T13:53:24.607Z",
		"size": 6735,
		"path": "../public/assets/admin.dispositivos-0u2VIcSY.js"
	},
	"/assets/admin.editor-listas-w4wxkaVv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2e25-HychAvlAfaXS26/0ut8fi8DzR7I\"",
		"mtime": "2026-10-13T13:53:24.607Z",
		"size": 11813,
		"path": "../public/assets/admin.editor-listas-w4wxkaVv.js"
	},
	"/assets/admin.fontes-BZXxwd4g.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a83-RJ3zX5+/ZpqeYyORtW5DjjwQm20\"",
		"mtime": "2026-10-13T13:53:24.608Z",
		"size": 2691,
		"path": "../public/assets/admin.fontes-BZXxwd4g.js"
	},
	"/assets/admin.index-CEHDhSN-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99c-fVdKmmNpRZCSy1kSFzChJ1WOkqw\"",
		"mtime": "2026-10-13T13:53:24.608Z",
		"size": 2460,
		"path": "../public/assets/admin.index-CEHDhSN-.js"
	},
	"/assets/admin.planos-Cu2dh2_i.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d2e-PWbB/GKQMc6d5NSJEOak0OKhAKQ\"",
		"mtime": "2026-10-13T13:53:24.608Z",
		"size": 3374,
		"path": "../public/assets/admin.planos-Cu2dh2_i.js"
	},
	"/assets/admin.servidores-Bst3Zi14.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"143c-GU7s2V6v/kzKkRu8C6lHfE/ylr8\"",
		"mtime": "2026-10-13T13:53:24.608Z",
		"size": 5180,
		"path": "../public/assets/admin.servidores-Bst3Zi14.js"
	},
	"/assets/admin.usuarios-rEmApRzK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bbb-GqzVVJKNvy7a3hVnemypP8+Euq4\"",
		"mtime": "2026-10-13T13:53:24.609Z",
		"size": 3003,
		"path": "../public/assets/admin.usuarios-rEmApRzK.js"
	},
	"/assets/admin.vendas-Bi7Y9luo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1315-ZuVj35ZZ30w4dAQx3DBCsLTOW6w\"",
		"mtime": "2026-10-13T13:53:24.609Z",
		"size": 4885,
		"path": "../public/assets/admin.vendas-Bi7Y9luo.js"
	},
	"/assets/ativar-BiiIVzep.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ace-shqsYNDyWMTFTJrEcQvqJkIbAtk\"",
		"mtime": "2026-10-13T13:53:24.609Z",
		"size": 2766,
		"path": "../public/assets/ativar-BiiIVzep.js"
	},
	"/assets/brand-C5A8NXKo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"870-3jA+TcN1s+iZOXm4QzAKQNAbtxA\"",
		"mtime": "2026-10-13T13:53:24.610Z",
		"size": 2160,
		"path": "../public/assets/brand-C5A8NXKo.js"
	},
	"/assets/button-BEy6Y6Aw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1306-eAMslcny9o6Uj466kN1pRxibPb0\"",
		"mtime": "2026-10-13T13:53:24.610Z",
		"size": 4870,
		"path": "../public/assets/button-BEy6Y6Aw.js"
	},
	"/assets/cliente--hgiU72_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"92e-CRyN4PmofeShb9Fpx2AYNG4Lrl4\"",
		"mtime": "2026-10-13T13:53:24.610Z",
		"size": 2350,
		"path": "../public/assets/cliente--hgiU72_.js"
	},
	"/assets/copy-DCHSmm07.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ec-1JmVfTyRpBOyIw0flknfQhVgMIU\"",
		"mtime": "2026-10-13T13:53:24.611Z",
		"size": 236,
		"path": "../public/assets/copy-DCHSmm07.js"
	},
	"/assets/createLucideIcon-CabK5vaI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4cc-QNaBMQOAZq2T/auAvCB/kK/H4/Y\"",
		"mtime": "2026-10-13T13:53:24.611Z",
		"size": 1228,
		"path": "../public/assets/createLucideIcon-CabK5vaI.js"
	},
	"/assets/device-client-WFY6Hzd0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"465-tzFn0gGAy9ABFW/2OvNwFnpG0uk\"",
		"mtime": "2026-10-13T13:53:24.611Z",
		"size": 1125,
		"path": "../public/assets/device-client-WFY6Hzd0.js"
	},
	"/assets/dialog-pmtNAJ1A.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"70fc-j5d0s2DgjRef/sILoaG0TSbe2Vk\"",
		"mtime": "2026-10-13T13:53:24.612Z",
		"size": 28924,
		"path": "../public/assets/dialog-pmtNAJ1A.js"
	},
	"/assets/dist-D2W_PVBq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1eb2-aN7jkMnFiPloin/SWdVM69xGhMk\"",
		"mtime": "2026-10-13T13:53:24.612Z",
		"size": 7858,
		"path": "../public/assets/dist-D2W_PVBq.js"
	},
	"/assets/dist-DrTOIght.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d57-xMX0FIZtlp0ofnoQa5sI1BIrGFg\"",
		"mtime": "2026-10-13T13:53:24.612Z",
		"size": 7511,
		"path": "../public/assets/dist-DrTOIght.js"
	},
	"/assets/input-D4tiM7UU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2b0-O0lbgVdjF6jn3Lj3cJO8qIfJHaU\"",
		"mtime": "2026-10-13T13:53:24.613Z",
		"size": 688,
		"path": "../public/assets/input-D4tiM7UU.js"
	},
	"/assets/key-round-Bn85nMhF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"163-O/P/nSoUI/+KEuwtTXtxoxDYrnE\"",
		"mtime": "2026-10-13T13:53:24.614Z",
		"size": 355,
		"path": "../public/assets/key-round-Bn85nMhF.js"
	},
	"/assets/layers-BGxYLKOt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a5-BisWeP/KgCOeM0bG26uuxFjstYU\"",
		"mtime": "2026-10-13T13:53:24.614Z",
		"size": 421,
		"path": "../public/assets/layers-BGxYLKOt.js"
	},
	"/assets/planos-B1zFzOFg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a4-TN8Ls3J9JNlLBR0B889UVf99RlU\"",
		"mtime": "2026-10-13T13:53:24.615Z",
		"size": 164,
		"path": "../public/assets/planos-B1zFzOFg.js"
	},
	"/assets/index-p24x-IJT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"64e75-4tc31ofS6jmy4JQ+tWoc/TgNDFE\"",
		"mtime": "2026-10-13T13:53:24.604Z",
		"size": 413301,
		"path": "../public/assets/index-p24x-IJT.js"
	},
	"/assets/planos-B4qfDJwv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b7-YjNhnIZJvLH2cV0u3V8CDsPBCjw\"",
		"mtime": "2026-10-13T13:53:24.615Z",
		"size": 183,
		"path": "../public/assets/planos-B4qfDJwv.js"
	},
	"/assets/mpegts-BETI8p9P.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"42805-dzPDTvQgix74GP6HreExDymE6UY\"",
		"mtime": "2026-10-13T13:53:24.614Z",
		"size": 272389,
		"path": "../public/assets/mpegts-BETI8p9P.js"
	},
	"/assets/planos-C74dKrQb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2bc2-bjIGRU/leUYitAbrlRSrlB4fc4A\"",
		"mtime": "2026-10-13T13:53:24.615Z",
		"size": 11202,
		"path": "../public/assets/planos-C74dKrQb.js"
	},
	"/assets/player-ORhqBSS4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"384f-sOwzATB1rOuQKE9zVZG61NXUMdU\"",
		"mtime": "2026-10-13T13:53:24.616Z",
		"size": 14415,
		"path": "../public/assets/player-ORhqBSS4.js"
	},
	"/assets/plus-CbMKM017.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99-aqcYFZgTys8a/7hyjfJsfu/4VT4\"",
		"mtime": "2026-10-13T13:53:24.616Z",
		"size": 153,
		"path": "../public/assets/plus-CbMKM017.js"
	},
	"/assets/react-DK6rpPfu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ec4-V1xNZhmjixlZV0LgvNOiaUJF4yk\"",
		"mtime": "2026-10-13T13:53:24.616Z",
		"size": 7876,
		"path": "../public/assets/react-DK6rpPfu.js"
	},
	"/assets/refresh-cw-CYL9LGno.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"141-Zc2Y+2YnuaiNQFwN2MZxws5+Fa4\"",
		"mtime": "2026-10-13T13:53:24.617Z",
		"size": 321,
		"path": "../public/assets/refresh-cw-CYL9LGno.js"
	},
	"/assets/rolldown-runtime-CbXtAM7H.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"24d-+aXgvbJ1Wwcp2A8AXKIBByksYC8\"",
		"mtime": "2026-10-13T13:53:24.617Z",
		"size": 589,
		"path": "../public/assets/rolldown-runtime-CbXtAM7H.js"
	},
	"/assets/routes-Bi-Wb1tr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a4e-4sZRKa2LXZq9E90pQkvhtmNvaq8\"",
		"mtime": "2026-10-13T13:53:24.617Z",
		"size": 2638,
		"path": "../public/assets/routes-Bi-Wb1tr.js"
	},
	"/assets/search-DLWCp_dZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"339-h33c/okndg6zkMJE7FmrTHT0U3Q\"",
		"mtime": "2026-10-13T13:53:24.618Z",
		"size": 825,
		"path": "../public/assets/search-DLWCp_dZ.js"
	},
	"/assets/server-mBZdm3QS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"152-r5S/rR4FsjS1tbZ3hMwc5anfMbI\"",
		"mtime": "2026-10-13T13:53:24.618Z",
		"size": 338,
		"path": "../public/assets/server-mBZdm3QS.js"
	},
	"/assets/settings-Civ9fmNU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e7-ncaTBpcHZCIAXmxXV083sTQOuQ8\"",
		"mtime": "2026-10-13T13:53:24.618Z",
		"size": 487,
		"path": "../public/assets/settings-Civ9fmNU.js"
	},
	"/assets/shield-check-TEr-fcUz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"140-M59jB9Cm7lnEFdolUmoxHh/Vpzs\"",
		"mtime": "2026-10-13T13:53:24.618Z",
		"size": 320,
		"path": "../public/assets/shield-check-TEr-fcUz.js"
	},
	"/assets/source-form-DdYwB5qR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1032-v2BtDobUUVUcMm2fRkGJemSu3Nw\"",
		"mtime": "2026-10-13T13:53:24.619Z",
		"size": 4146,
		"path": "../public/assets/source-form-DdYwB5qR.js"
	},
	"/assets/styles-oH0j3lRQ.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"13f14-eApduI12K9abx4TvF5gwXC1VfkM\"",
		"mtime": "2026-10-13T13:53:24.621Z",
		"size": 81684,
		"path": "../public/assets/styles-oH0j3lRQ.css"
	},
	"/assets/switch-Dk1lN1XO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1309-FudaMddRekknrLnurEm1Ig6KKR8\"",
		"mtime": "2026-10-13T13:53:24.619Z",
		"size": 4873,
		"path": "../public/assets/switch-Dk1lN1XO.js"
	},
	"/assets/hls-BhcDaTqf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8c546-hnGn8vIsciiCtsWkmKZ1VwsqkPQ\"",
		"mtime": "2026-10-13T13:53:24.613Z",
		"size": 574790,
		"path": "../public/assets/hls-BhcDaTqf.js"
	},
	"/assets/tv-DPSaO8AZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b9-0cUNWJZVOctR6GtcCyrUDZT26FU\"",
		"mtime": "2026-10-13T13:53:24.619Z",
		"size": 185,
		"path": "../public/assets/tv-DPSaO8AZ.js"
	},
	"/assets/useServerFn-Ye-LMVEP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"193-ZOVqGA1JUKvEgfhxRN+f8Knc0Zo\"",
		"mtime": "2026-10-13T13:53:24.620Z",
		"size": 403,
		"path": "../public/assets/useServerFn-Ye-LMVEP.js"
	},
	"/assets/useBaseQuery-6IISzvGQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f56-s+rdBP1m1sIJs6r+P9N5MGrZ6Zk\"",
		"mtime": "2026-10-13T13:53:24.620Z",
		"size": 8022,
		"path": "../public/assets/useBaseQuery-6IISzvGQ.js"
	},
	"/assets/utils-4jUIYOBc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6bed-90NGITyc+kEKvxUkUtkYHgO1XH4\"",
		"mtime": "2026-10-13T13:53:24.620Z",
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
