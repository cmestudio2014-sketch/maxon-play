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
		"mtime": "2026-10-13T14:08:31.387Z",
		"size": 159,
		"path": "../public/robots.txt"
	},
	"/assets/admin-B1qgVe71.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ceb-luFdC/94QmywfdHDmtgpbmf+2uU\"",
		"mtime": "2026-10-13T14:08:27.345Z",
		"size": 7403,
		"path": "../public/assets/admin-B1qgVe71.js"
	},
	"/assets/admin-DA1_C-S3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d8-73mJMNV2tC4DBtS766Y/Glt7VWM\"",
		"mtime": "2026-10-13T14:08:27.345Z",
		"size": 216,
		"path": "../public/assets/admin-DA1_C-S3.js"
	},
	"/assets/admin-DvLkFS32.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ac-sltkrZ6Fwig68idAz0chVc4aJrs\"",
		"mtime": "2026-10-13T14:08:27.346Z",
		"size": 172,
		"path": "../public/assets/admin-DvLkFS32.js"
	},
	"/assets/admin-ui-DXMnReeT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a99-tv/YMZ0TYmtPeTKwkxM7iHBT1Sw\"",
		"mtime": "2026-10-13T14:08:27.346Z",
		"size": 2713,
		"path": "../public/assets/admin-ui-DXMnReeT.js"
	},
	"/assets/admin.ativacoes-B8Ewy5eU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e6dc-lNqyADfStPVWtQ6oUvARmV3ouPk\"",
		"mtime": "2026-10-13T14:08:27.346Z",
		"size": 59100,
		"path": "../public/assets/admin.ativacoes-B8Ewy5eU.js"
	},
	"/assets/admin.auditoria-CYP9Oy1_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"59c-Ank7KUk1VTsYS61XJJY1kgo5KKY\"",
		"mtime": "2026-10-13T14:08:27.347Z",
		"size": 1436,
		"path": "../public/assets/admin.auditoria-CYP9Oy1_.js"
	},
	"/assets/admin.clientes-Dj1JUuwG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"122b-bNDe361/DpygDSl5/srsAb3vVT8\"",
		"mtime": "2026-10-13T14:08:27.347Z",
		"size": 4651,
		"path": "../public/assets/admin.clientes-Dj1JUuwG.js"
	},
	"/assets/admin.configuracoes-wtDJA4FE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6f0-pAUt0RD0s13wANpgAzDgAdhiB/I\"",
		"mtime": "2026-10-13T14:08:27.347Z",
		"size": 1776,
		"path": "../public/assets/admin.configuracoes-wtDJA4FE.js"
	},
	"/assets/admin.cupons-tSdvyRr0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b6f-icD9XJ7ILhYsVt7Qn67kH0pZxfs\"",
		"mtime": "2026-10-13T14:08:27.347Z",
		"size": 2927,
		"path": "../public/assets/admin.cupons-tSdvyRr0.js"
	},
	"/assets/admin.dispositivos-DW-5ZjXK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a4f-MCFjtf12B214VBw/fL1BCUKAgH4\"",
		"mtime": "2026-10-13T14:08:27.348Z",
		"size": 6735,
		"path": "../public/assets/admin.dispositivos-DW-5ZjXK.js"
	},
	"/assets/admin.editor-listas-CNKiZ7pb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2e25-DE1MUSu0GCp+34OKbR2U9wRoVAY\"",
		"mtime": "2026-10-13T14:08:27.348Z",
		"size": 11813,
		"path": "../public/assets/admin.editor-listas-CNKiZ7pb.js"
	},
	"/assets/admin.fontes-BxJRfFy2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a83-6aI6uBuaPmPeTPbokdMzscJWVVk\"",
		"mtime": "2026-10-13T14:08:27.348Z",
		"size": 2691,
		"path": "../public/assets/admin.fontes-BxJRfFy2.js"
	},
	"/assets/admin.index-CUwDo266.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99c-Dg2zFrSagXbwwgH04w/lay54sF8\"",
		"mtime": "2026-10-13T14:08:27.349Z",
		"size": 2460,
		"path": "../public/assets/admin.index-CUwDo266.js"
	},
	"/assets/admin.planos-DyJhKaaq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d2e-hQIekd4vik63aonuwlirsxvaVgc\"",
		"mtime": "2026-10-13T14:08:27.349Z",
		"size": 3374,
		"path": "../public/assets/admin.planos-DyJhKaaq.js"
	},
	"/assets/admin.servidores-DGBGT8pr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"143c-BMHx0TgOZmOHtwAHApGk6FhiEH4\"",
		"mtime": "2026-10-13T14:08:27.349Z",
		"size": 5180,
		"path": "../public/assets/admin.servidores-DGBGT8pr.js"
	},
	"/assets/admin.usuarios-DW_BJ6T6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bbb-PZF/DNavVHrVe5K23aYYrExwhlM\"",
		"mtime": "2026-10-13T14:08:27.350Z",
		"size": 3003,
		"path": "../public/assets/admin.usuarios-DW_BJ6T6.js"
	},
	"/assets/admin.vendas-23miE7_I.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1315-u/6G7wow2DQgvN2svqh5WESd8x8\"",
		"mtime": "2026-10-13T14:08:27.350Z",
		"size": 4885,
		"path": "../public/assets/admin.vendas-23miE7_I.js"
	},
	"/assets/ativar-Bp28bf78.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ace-OJJZ6BlRKvwv7OGrDv+cfpBKZgs\"",
		"mtime": "2026-10-13T14:08:27.350Z",
		"size": 2766,
		"path": "../public/assets/ativar-Bp28bf78.js"
	},
	"/assets/brand-CU8yBQOG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"870-KhZnsMDOfIsDSs1guOMpvGoj2Ww\"",
		"mtime": "2026-10-13T14:08:27.351Z",
		"size": 2160,
		"path": "../public/assets/brand-CU8yBQOG.js"
	},
	"/assets/button-IWUVfKRR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1306-lHga809gdUTNk+yAH3z9/t0+MBE\"",
		"mtime": "2026-10-13T14:08:27.351Z",
		"size": 4870,
		"path": "../public/assets/button-IWUVfKRR.js"
	},
	"/assets/cliente-CLL0GiH3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"92e-I+fTQR3Apacgr3RrVxSKiksdO1Q\"",
		"mtime": "2026-10-13T14:08:27.351Z",
		"size": 2350,
		"path": "../public/assets/cliente-CLL0GiH3.js"
	},
	"/assets/copy-DCHSmm07.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ec-1JmVfTyRpBOyIw0flknfQhVgMIU\"",
		"mtime": "2026-10-13T14:08:27.352Z",
		"size": 236,
		"path": "../public/assets/copy-DCHSmm07.js"
	},
	"/assets/createLucideIcon-CabK5vaI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4cc-QNaBMQOAZq2T/auAvCB/kK/H4/Y\"",
		"mtime": "2026-10-13T14:08:27.352Z",
		"size": 1228,
		"path": "../public/assets/createLucideIcon-CabK5vaI.js"
	},
	"/assets/device-client-WFY6Hzd0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"465-tzFn0gGAy9ABFW/2OvNwFnpG0uk\"",
		"mtime": "2026-10-13T14:08:27.352Z",
		"size": 1125,
		"path": "../public/assets/device-client-WFY6Hzd0.js"
	},
	"/assets/dialog-nWo0eVPg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"70fc-PBByHWY7peq4VWHLfJPN1QVNn/Y\"",
		"mtime": "2026-10-13T14:08:27.352Z",
		"size": 28924,
		"path": "../public/assets/dialog-nWo0eVPg.js"
	},
	"/assets/dist-BRIVwk90.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1eb2-/euxpPG0raSuVWUxfSwD50NUmJg\"",
		"mtime": "2026-10-13T14:08:27.353Z",
		"size": 7858,
		"path": "../public/assets/dist-BRIVwk90.js"
	},
	"/assets/dist-D_VgVXxL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d57-cW7oRmOjPoM1E7AxhmEnO0aITb4\"",
		"mtime": "2026-10-13T14:08:27.353Z",
		"size": 7511,
		"path": "../public/assets/dist-D_VgVXxL.js"
	},
	"/assets/input-Bof9aAlv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2b0-lT/fO50Nv4CpxL/9VZQZoIbbUfs\"",
		"mtime": "2026-10-13T14:08:27.354Z",
		"size": 688,
		"path": "../public/assets/input-Bof9aAlv.js"
	},
	"/assets/layers-BGxYLKOt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a5-BisWeP/KgCOeM0bG26uuxFjstYU\"",
		"mtime": "2026-10-13T14:08:27.354Z",
		"size": 421,
		"path": "../public/assets/layers-BGxYLKOt.js"
	},
	"/assets/key-round-Bn85nMhF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"163-O/P/nSoUI/+KEuwtTXtxoxDYrnE\"",
		"mtime": "2026-10-13T14:08:27.354Z",
		"size": 355,
		"path": "../public/assets/key-round-Bn85nMhF.js"
	},
	"/assets/planos-BNomGD8r.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a4-gKX5RIhMDMov6D23DciYiW3Mn80\"",
		"mtime": "2026-10-13T14:08:27.355Z",
		"size": 164,
		"path": "../public/assets/planos-BNomGD8r.js"
	},
	"/assets/planos-DP9sLfgs.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b7-hhPDAj7DzHvaRY5vvJ/jKN3CmrY\"",
		"mtime": "2026-10-13T14:08:27.356Z",
		"size": 183,
		"path": "../public/assets/planos-DP9sLfgs.js"
	},
	"/assets/index-DtciP3NI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"64e75-xp00T3lV+9KTdBz5FYiRZwUwe6g\"",
		"mtime": "2026-10-13T14:08:27.344Z",
		"size": 413301,
		"path": "../public/assets/index-DtciP3NI.js"
	},
	"/assets/planos-DfLHAVJG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2bc2-HC+WXMGuOy8Vlx3tADri7mxGhiY\"",
		"mtime": "2026-10-13T14:08:27.356Z",
		"size": 11202,
		"path": "../public/assets/planos-DfLHAVJG.js"
	},
	"/assets/plus-CbMKM017.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99-aqcYFZgTys8a/7hyjfJsfu/4VT4\"",
		"mtime": "2026-10-13T14:08:27.356Z",
		"size": 153,
		"path": "../public/assets/plus-CbMKM017.js"
	},
	"/assets/mpegts-BETI8p9P.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"42805-dzPDTvQgix74GP6HreExDymE6UY\"",
		"mtime": "2026-10-13T14:08:27.355Z",
		"size": 272389,
		"path": "../public/assets/mpegts-BETI8p9P.js"
	},
	"/assets/player-B6UaELqo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3a88-+H2Tfm7F/aHhrJEAZ1Lq2h5T+AQ\"",
		"mtime": "2026-10-13T14:08:27.356Z",
		"size": 14984,
		"path": "../public/assets/player-B6UaELqo.js"
	},
	"/assets/react-DK6rpPfu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ec4-V1xNZhmjixlZV0LgvNOiaUJF4yk\"",
		"mtime": "2026-10-13T14:08:27.357Z",
		"size": 7876,
		"path": "../public/assets/react-DK6rpPfu.js"
	},
	"/assets/refresh-cw-CYL9LGno.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"141-Zc2Y+2YnuaiNQFwN2MZxws5+Fa4\"",
		"mtime": "2026-10-13T14:08:27.357Z",
		"size": 321,
		"path": "../public/assets/refresh-cw-CYL9LGno.js"
	},
	"/assets/rolldown-runtime-CbXtAM7H.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"24d-+aXgvbJ1Wwcp2A8AXKIBByksYC8\"",
		"mtime": "2026-10-13T14:08:27.358Z",
		"size": 589,
		"path": "../public/assets/rolldown-runtime-CbXtAM7H.js"
	},
	"/assets/routes-DLMt5TfC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a4e-vqN+U5vfhiWBx54T/J5wfWzg36E\"",
		"mtime": "2026-10-13T14:08:27.358Z",
		"size": 2638,
		"path": "../public/assets/routes-DLMt5TfC.js"
	},
	"/assets/search-DLWCp_dZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"339-h33c/okndg6zkMJE7FmrTHT0U3Q\"",
		"mtime": "2026-10-13T14:08:27.358Z",
		"size": 825,
		"path": "../public/assets/search-DLWCp_dZ.js"
	},
	"/assets/server-mBZdm3QS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"152-r5S/rR4FsjS1tbZ3hMwc5anfMbI\"",
		"mtime": "2026-10-13T14:08:27.358Z",
		"size": 338,
		"path": "../public/assets/server-mBZdm3QS.js"
	},
	"/assets/shield-check-TEr-fcUz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"140-M59jB9Cm7lnEFdolUmoxHh/Vpzs\"",
		"mtime": "2026-10-13T14:08:27.359Z",
		"size": 320,
		"path": "../public/assets/shield-check-TEr-fcUz.js"
	},
	"/assets/settings-Civ9fmNU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e7-ncaTBpcHZCIAXmxXV083sTQOuQ8\"",
		"mtime": "2026-10-13T14:08:27.359Z",
		"size": 487,
		"path": "../public/assets/settings-Civ9fmNU.js"
	},
	"/assets/source-form-DGyHPOOc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1032-i1hCma44jxI0WX0A6JsNfNM1XDc\"",
		"mtime": "2026-10-13T14:08:27.359Z",
		"size": 4146,
		"path": "../public/assets/source-form-DGyHPOOc.js"
	},
	"/assets/styles-oH0j3lRQ.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"13f14-eApduI12K9abx4TvF5gwXC1VfkM\"",
		"mtime": "2026-10-13T14:08:27.361Z",
		"size": 81684,
		"path": "../public/assets/styles-oH0j3lRQ.css"
	},
	"/assets/switch-Dyy_ngjn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1309-UaTI668/yIrReLGby9G1Z1F7+94\"",
		"mtime": "2026-10-13T14:08:27.360Z",
		"size": 4873,
		"path": "../public/assets/switch-Dyy_ngjn.js"
	},
	"/assets/hls-BhcDaTqf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8c546-hnGn8vIsciiCtsWkmKZ1VwsqkPQ\"",
		"mtime": "2026-10-13T14:08:27.353Z",
		"size": 574790,
		"path": "../public/assets/hls-BhcDaTqf.js"
	},
	"/assets/tv-DPSaO8AZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b9-0cUNWJZVOctR6GtcCyrUDZT26FU\"",
		"mtime": "2026-10-13T14:08:27.360Z",
		"size": 185,
		"path": "../public/assets/tv-DPSaO8AZ.js"
	},
	"/assets/useBaseQuery-ITZXR1v5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f56-caPQcrnzf2rlEc3SJBo8gM4JWSM\"",
		"mtime": "2026-10-13T14:08:27.360Z",
		"size": 8022,
		"path": "../public/assets/useBaseQuery-ITZXR1v5.js"
	},
	"/assets/useServerFn-75dZ0kNe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"193-8bVO6ek+tHk/GdvQFbBDZvtZ6P8\"",
		"mtime": "2026-10-13T14:08:27.361Z",
		"size": 403,
		"path": "../public/assets/useServerFn-75dZ0kNe.js"
	},
	"/assets/utils-4jUIYOBc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6bed-90NGITyc+kEKvxUkUtkYHgO1XH4\"",
		"mtime": "2026-10-13T14:08:27.361Z",
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
