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
		"mtime": "2026-10-13T18:28:47.963Z",
		"size": 159,
		"path": "../public/robots.txt"
	},
	"/assets/admin-BhhszE_K.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d56-fB4ViVagSz7X45onY9Vyze/ZOEw\"",
		"mtime": "2026-10-13T18:28:43.294Z",
		"size": 7510,
		"path": "../public/assets/admin-BhhszE_K.js"
	},
	"/assets/admin-Dv4bXnSM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d8-Fhx9GWVYVd28lYKrnITJc/WqUjc\"",
		"mtime": "2026-10-13T18:28:43.294Z",
		"size": 216,
		"path": "../public/assets/admin-Dv4bXnSM.js"
	},
	"/assets/admin-G8NS8kmX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ac-OhwMC+MEsQHSZupz8LglWRQDC4M\"",
		"mtime": "2026-10-13T18:28:43.295Z",
		"size": 172,
		"path": "../public/assets/admin-G8NS8kmX.js"
	},
	"/assets/admin-ui-5QdiocSS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a99-washt5K0uWM7FsV5fyOQRf9rAm8\"",
		"mtime": "2026-10-13T18:28:43.295Z",
		"size": 2713,
		"path": "../public/assets/admin-ui-5QdiocSS.js"
	},
	"/assets/admin.ativacoes-BZdy687R.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ef94-swzAnvr7KRYcoKSKVQyYORrG/2g\"",
		"mtime": "2026-10-13T18:28:43.295Z",
		"size": 61332,
		"path": "../public/assets/admin.ativacoes-BZdy687R.js"
	},
	"/assets/admin.auditoria-WhrAeNO6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"59c-z8arZme4xWKUqAr9W0Y0YN0Pfs4\"",
		"mtime": "2026-10-13T18:28:43.296Z",
		"size": 1436,
		"path": "../public/assets/admin.auditoria-WhrAeNO6.js"
	},
	"/assets/admin.clientes-BpjYUWoU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1411-UGNFIBHc7KAYVYLBVBmiPkANczM\"",
		"mtime": "2026-10-13T18:28:43.296Z",
		"size": 5137,
		"path": "../public/assets/admin.clientes-BpjYUWoU.js"
	},
	"/assets/admin.configuracoes-BQaghn9l.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6f0-pMfK1nrILwHbw2Q0ZBZnUOO5vUU\"",
		"mtime": "2026-10-13T18:28:43.296Z",
		"size": 1776,
		"path": "../public/assets/admin.configuracoes-BQaghn9l.js"
	},
	"/assets/admin.cupons-DdWEsRM6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b6f-FMdcK4hIZNC2AlgqwrzHFmHv/P4\"",
		"mtime": "2026-10-13T18:28:43.297Z",
		"size": 2927,
		"path": "../public/assets/admin.cupons-DdWEsRM6.js"
	},
	"/assets/admin.dispositivos-Q6DoDslS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a4f-y6sYXBpKReXPru2smn08l5H8LiM\"",
		"mtime": "2026-10-13T18:28:43.297Z",
		"size": 6735,
		"path": "../public/assets/admin.dispositivos-Q6DoDslS.js"
	},
	"/assets/admin.editor-listas-BpHd9Pea.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2d90-BMUaPjSPuevhyv4odwZ74ZWGdUY\"",
		"mtime": "2026-10-13T18:28:43.298Z",
		"size": 11664,
		"path": "../public/assets/admin.editor-listas-BpHd9Pea.js"
	},
	"/assets/admin.fontes-BnrbcHpP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a83-Md+SfLafj3A6nnepoexJaB66srI\"",
		"mtime": "2026-10-13T18:28:43.298Z",
		"size": 2691,
		"path": "../public/assets/admin.fontes-BnrbcHpP.js"
	},
	"/assets/admin.index-BwFCwVgW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99c-tOmTSsPoWhzL3k24KDQWcIPfGD0\"",
		"mtime": "2026-10-13T18:28:43.298Z",
		"size": 2460,
		"path": "../public/assets/admin.index-BwFCwVgW.js"
	},
	"/assets/admin.planos-fcvH0zQG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d2e-Ct8tCJ7CEGHl0OzWY10kJE1SOpk\"",
		"mtime": "2026-10-13T18:28:43.299Z",
		"size": 3374,
		"path": "../public/assets/admin.planos-fcvH0zQG.js"
	},
	"/assets/admin.servidores-D0Sqx7e4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"143c-z9I1/8STPo6Be0YbUNtO55/x2uU\"",
		"mtime": "2026-10-13T18:28:43.299Z",
		"size": 5180,
		"path": "../public/assets/admin.servidores-D0Sqx7e4.js"
	},
	"/assets/admin.streaming-CInYQJ-R.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1148-iW08p7D9+90P/9U2S1e4swh1IzQ\"",
		"mtime": "2026-10-13T18:28:43.300Z",
		"size": 4424,
		"path": "../public/assets/admin.streaming-CInYQJ-R.js"
	},
	"/assets/admin.usuarios-B6uLSNGy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bbb-RLGnDED0VA5CTKnJqAhpI9BK+xI\"",
		"mtime": "2026-10-13T18:28:43.300Z",
		"size": 3003,
		"path": "../public/assets/admin.usuarios-B6uLSNGy.js"
	},
	"/assets/admin.vendas-Ct4BPGSl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1315-0t7EIY/SA7AF1Vu43XzoKnksX3c\"",
		"mtime": "2026-10-13T18:28:43.300Z",
		"size": 4885,
		"path": "../public/assets/admin.vendas-Ct4BPGSl.js"
	},
	"/assets/ativar-BSGrB9jl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ace-ePhLuqKJ7/ZYKTuV+mlC41pHSzA\"",
		"mtime": "2026-10-13T18:28:43.301Z",
		"size": 2766,
		"path": "../public/assets/ativar-BSGrB9jl.js"
	},
	"/assets/brand-BOWvEtIh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"870-+wqLEeLcGpruUPPFyJlXF8Nb62M\"",
		"mtime": "2026-10-13T18:28:43.301Z",
		"size": 2160,
		"path": "../public/assets/brand-BOWvEtIh.js"
	},
	"/assets/button-ChNV7YVI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1306-66VeTA5CixYvU0arnmyRrTC0tMo\"",
		"mtime": "2026-10-13T18:28:43.301Z",
		"size": 4870,
		"path": "../public/assets/button-ChNV7YVI.js"
	},
	"/assets/clapperboard-CYdw6Pc_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"168-+SBVbB0zhBB0WRtUMh1HCfRCID0\"",
		"mtime": "2026-10-13T18:28:43.302Z",
		"size": 360,
		"path": "../public/assets/clapperboard-CYdw6Pc_.js"
	},
	"/assets/cliente-CSQqEanK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"92e-9P4AT9T11ejnXdz2kZdzoeB+S8U\"",
		"mtime": "2026-10-13T18:28:43.302Z",
		"size": 2350,
		"path": "../public/assets/cliente-CSQqEanK.js"
	},
	"/assets/copy-DCHSmm07.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ec-1JmVfTyRpBOyIw0flknfQhVgMIU\"",
		"mtime": "2026-10-13T18:28:43.302Z",
		"size": 236,
		"path": "../public/assets/copy-DCHSmm07.js"
	},
	"/assets/createLucideIcon-CabK5vaI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4cc-QNaBMQOAZq2T/auAvCB/kK/H4/Y\"",
		"mtime": "2026-10-13T18:28:43.302Z",
		"size": 1228,
		"path": "../public/assets/createLucideIcon-CabK5vaI.js"
	},
	"/assets/device-client-WFY6Hzd0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"465-tzFn0gGAy9ABFW/2OvNwFnpG0uk\"",
		"mtime": "2026-10-13T18:28:43.303Z",
		"size": 1125,
		"path": "../public/assets/device-client-WFY6Hzd0.js"
	},
	"/assets/dialog-BSDiq7qe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"70fc-BdnuaotypFcY/rg2RVpTChuu/hA\"",
		"mtime": "2026-10-13T18:28:43.303Z",
		"size": 28924,
		"path": "../public/assets/dialog-BSDiq7qe.js"
	},
	"/assets/dist-CvM6q2in.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d57-+K8AablDcsSa8A9vvIqe5Dn2+Ks\"",
		"mtime": "2026-10-13T18:28:43.303Z",
		"size": 7511,
		"path": "../public/assets/dist-CvM6q2in.js"
	},
	"/assets/dist-D5Inrib6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1eb2-569YrDCA1KYMCDc2+cEvKAFC+gs\"",
		"mtime": "2026-10-13T18:28:43.304Z",
		"size": 7858,
		"path": "../public/assets/dist-D5Inrib6.js"
	},
	"/assets/film-FSAvqR_e.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"197-+xpljMM+RFb0tRbkrvE+4r4/qq0\"",
		"mtime": "2026-10-13T18:28:43.304Z",
		"size": 407,
		"path": "../public/assets/film-FSAvqR_e.js"
	},
	"/assets/input-Ctp7z_3-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2b0-/B6CupWursbc5AFuvnfTelVZeiU\"",
		"mtime": "2026-10-13T18:28:43.305Z",
		"size": 688,
		"path": "../public/assets/input-Ctp7z_3-.js"
	},
	"/assets/key-round-Bn85nMhF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"163-O/P/nSoUI/+KEuwtTXtxoxDYrnE\"",
		"mtime": "2026-10-13T18:28:43.305Z",
		"size": 355,
		"path": "../public/assets/key-round-Bn85nMhF.js"
	},
	"/assets/layers-BGxYLKOt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a5-BisWeP/KgCOeM0bG26uuxFjstYU\"",
		"mtime": "2026-10-13T18:28:43.305Z",
		"size": 421,
		"path": "../public/assets/layers-BGxYLKOt.js"
	},
	"/assets/planos-BJrpOnk8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2bc2-3O+BxYkPHepHL1OkYv+MMKMN7n4\"",
		"mtime": "2026-10-13T18:28:43.306Z",
		"size": 11202,
		"path": "../public/assets/planos-BJrpOnk8.js"
	},
	"/assets/index-C6M9Ri5H.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"650cc-z0PJdY3lrC/W12Z9/sno3o0LDz0\"",
		"mtime": "2026-10-13T18:28:43.294Z",
		"size": 413900,
		"path": "../public/assets/index-C6M9Ri5H.js"
	},
	"/assets/planos-CJ1gR6Pt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b7-ztjsDqYgsuBgnG5OLgj9DL2CFWk\"",
		"mtime": "2026-10-13T18:28:43.306Z",
		"size": 183,
		"path": "../public/assets/planos-CJ1gR6Pt.js"
	},
	"/assets/planos-Dc25IVhI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a4-4a3h+D7acgwXeZv/pWJlbcdXNaE\"",
		"mtime": "2026-10-13T18:28:43.307Z",
		"size": 164,
		"path": "../public/assets/planos-Dc25IVhI.js"
	},
	"/assets/mpegts-BETI8p9P.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"42805-dzPDTvQgix74GP6HreExDymE6UY\"",
		"mtime": "2026-10-13T18:28:43.306Z",
		"size": 272389,
		"path": "../public/assets/mpegts-BETI8p9P.js"
	},
	"/assets/player-CxGCX_gE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3fc0-zxOZ6Prx6tu8h1HgsXD92BHa3oo\"",
		"mtime": "2026-10-13T18:28:43.307Z",
		"size": 16320,
		"path": "../public/assets/player-CxGCX_gE.js"
	},
	"/assets/plus-CbMKM017.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99-aqcYFZgTys8a/7hyjfJsfu/4VT4\"",
		"mtime": "2026-10-13T18:28:43.307Z",
		"size": 153,
		"path": "../public/assets/plus-CbMKM017.js"
	},
	"/assets/react-DK6rpPfu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ec4-V1xNZhmjixlZV0LgvNOiaUJF4yk\"",
		"mtime": "2026-10-13T18:28:43.308Z",
		"size": 7876,
		"path": "../public/assets/react-DK6rpPfu.js"
	},
	"/assets/refresh-cw-CYL9LGno.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"141-Zc2Y+2YnuaiNQFwN2MZxws5+Fa4\"",
		"mtime": "2026-10-13T18:28:43.308Z",
		"size": 321,
		"path": "../public/assets/refresh-cw-CYL9LGno.js"
	},
	"/assets/rolldown-runtime-CbXtAM7H.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"24d-+aXgvbJ1Wwcp2A8AXKIBByksYC8\"",
		"mtime": "2026-10-13T18:28:43.308Z",
		"size": 589,
		"path": "../public/assets/rolldown-runtime-CbXtAM7H.js"
	},
	"/assets/routes-Cdh1Ii8C.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a4e-79GUNYTeLmeGqS33DrzAAjW9eC4\"",
		"mtime": "2026-10-13T18:28:43.308Z",
		"size": 2638,
		"path": "../public/assets/routes-Cdh1Ii8C.js"
	},
	"/assets/search-DOobwRYQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ae-t7YNN0uCKsTsnCtld42UI5lv+6Y\"",
		"mtime": "2026-10-13T18:28:43.309Z",
		"size": 174,
		"path": "../public/assets/search-DOobwRYQ.js"
	},
	"/assets/server-mBZdm3QS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"152-r5S/rR4FsjS1tbZ3hMwc5anfMbI\"",
		"mtime": "2026-10-13T18:28:43.309Z",
		"size": 338,
		"path": "../public/assets/server-mBZdm3QS.js"
	},
	"/assets/settings-Civ9fmNU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e7-ncaTBpcHZCIAXmxXV083sTQOuQ8\"",
		"mtime": "2026-10-13T18:28:43.309Z",
		"size": 487,
		"path": "../public/assets/settings-Civ9fmNU.js"
	},
	"/assets/shield-check-TEr-fcUz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"140-M59jB9Cm7lnEFdolUmoxHh/Vpzs\"",
		"mtime": "2026-10-13T18:28:43.310Z",
		"size": 320,
		"path": "../public/assets/shield-check-TEr-fcUz.js"
	},
	"/assets/hls-BhcDaTqf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8c546-hnGn8vIsciiCtsWkmKZ1VwsqkPQ\"",
		"mtime": "2026-10-13T18:28:43.304Z",
		"size": 574790,
		"path": "../public/assets/hls-BhcDaTqf.js"
	},
	"/assets/source-form-C3afOpto.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1033-hNUYsfzrGeP5Rmn3TfBMoXeMyTE\"",
		"mtime": "2026-10-13T18:28:43.310Z",
		"size": 4147,
		"path": "../public/assets/source-form-C3afOpto.js"
	},
	"/assets/styles-j2RQ6XJ4.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"140e3-W3gbeo/GybZ0YX6iXRbGnHbTqXc\"",
		"mtime": "2026-10-13T18:28:43.312Z",
		"size": 82147,
		"path": "../public/assets/styles-j2RQ6XJ4.css"
	},
	"/assets/switch-Ddcc6ezs.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1309-+Iizd8B6nDmbxAaPtV89fFDbwIg\"",
		"mtime": "2026-10-13T18:28:43.310Z",
		"size": 4873,
		"path": "../public/assets/switch-Ddcc6ezs.js"
	},
	"/assets/trash-2-BN1HqQX-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"148-6Gte4kMzBdaw7wZdUW0FTa6ySaY\"",
		"mtime": "2026-10-13T18:28:43.310Z",
		"size": 328,
		"path": "../public/assets/trash-2-BN1HqQX-.js"
	},
	"/assets/tv-DPSaO8AZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b9-0cUNWJZVOctR6GtcCyrUDZT26FU\"",
		"mtime": "2026-10-13T18:28:43.311Z",
		"size": 185,
		"path": "../public/assets/tv-DPSaO8AZ.js"
	},
	"/assets/useBaseQuery-D1bJJsPd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f56-aP4MNEHi6yZiahFGNvlYKDi/KO4\"",
		"mtime": "2026-10-13T18:28:43.311Z",
		"size": 8022,
		"path": "../public/assets/useBaseQuery-D1bJJsPd.js"
	},
	"/assets/useServerFn-DiBeD2Mv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"193-Mu/sxy2RgD91O1oBbYwTr45OEeY\"",
		"mtime": "2026-10-13T18:28:43.311Z",
		"size": 403,
		"path": "../public/assets/useServerFn-DiBeD2Mv.js"
	},
	"/assets/utils-4jUIYOBc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6bed-90NGITyc+kEKvxUkUtkYHgO1XH4\"",
		"mtime": "2026-10-13T18:28:43.311Z",
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
