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
		"mtime": "2026-10-13T16:29:02.318Z",
		"size": 159,
		"path": "../public/robots.txt"
	},
	"/assets/admin-BztbZRmg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ac-4YbE1t/bbSNHl0BopMTYo0U7eIE\"",
		"mtime": "2026-10-13T16:28:57.690Z",
		"size": 172,
		"path": "../public/assets/admin-BztbZRmg.js"
	},
	"/assets/admin-DDxOrq5y.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d8-Av70H4LmbfMvFe5IZg5bsjNCGfE\"",
		"mtime": "2026-10-13T16:28:57.690Z",
		"size": 216,
		"path": "../public/assets/admin-DDxOrq5y.js"
	},
	"/assets/admin-DcZlU3md.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d56-JZK9tkbFKzKpotzI3dihdo0Pd3c\"",
		"mtime": "2026-10-13T16:28:57.690Z",
		"size": 7510,
		"path": "../public/assets/admin-DcZlU3md.js"
	},
	"/assets/admin-ui-BmAmSqJN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a99-6amRz9+YT5uNT8HV3Saho20MXhI\"",
		"mtime": "2026-10-13T16:28:57.691Z",
		"size": 2713,
		"path": "../public/assets/admin-ui-BmAmSqJN.js"
	},
	"/assets/admin.ativacoes-BJjt2exS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e6dc-SfSCnlKBziiRyarDnLqLGItfiew\"",
		"mtime": "2026-10-13T16:28:57.691Z",
		"size": 59100,
		"path": "../public/assets/admin.ativacoes-BJjt2exS.js"
	},
	"/assets/admin.auditoria-DvqIyt2w.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"59c-rRn47HdCPinHpSwn2DMQMxMtbYw\"",
		"mtime": "2026-10-13T16:28:57.691Z",
		"size": 1436,
		"path": "../public/assets/admin.auditoria-DvqIyt2w.js"
	},
	"/assets/admin.clientes-BdgGyc1H.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1411-mWFPoaXITbjyIdUZaE9MfNN69Uk\"",
		"mtime": "2026-10-13T16:28:57.692Z",
		"size": 5137,
		"path": "../public/assets/admin.clientes-BdgGyc1H.js"
	},
	"/assets/admin.configuracoes-9n-RcSrv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6f0-wMjDCWMusbYm4YkNoj9bnpC3bOE\"",
		"mtime": "2026-10-13T16:28:57.692Z",
		"size": 1776,
		"path": "../public/assets/admin.configuracoes-9n-RcSrv.js"
	},
	"/assets/admin.cupons-BvE8QrGh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b6f-+nGnLOqu7WFRgL8DsmKJe2LbiL4\"",
		"mtime": "2026-10-13T16:28:57.692Z",
		"size": 2927,
		"path": "../public/assets/admin.cupons-BvE8QrGh.js"
	},
	"/assets/admin.dispositivos-CM1jVjri.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a4f-j0uFtWw7ZOIR1dW/yw4wPxmLYgw\"",
		"mtime": "2026-10-13T16:28:57.693Z",
		"size": 6735,
		"path": "../public/assets/admin.dispositivos-CM1jVjri.js"
	},
	"/assets/admin.editor-listas-B2zIu-rx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2d90-4Lb9oEMQMGp+SaCuJ2eo/ze0/nk\"",
		"mtime": "2026-10-13T16:28:57.693Z",
		"size": 11664,
		"path": "../public/assets/admin.editor-listas-B2zIu-rx.js"
	},
	"/assets/admin.fontes-B32AVmSR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a83-fRVzldACLV5Plzm4vPJSe0TNHEA\"",
		"mtime": "2026-10-13T16:28:57.693Z",
		"size": 2691,
		"path": "../public/assets/admin.fontes-B32AVmSR.js"
	},
	"/assets/admin.index-Bz93CA4h.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99c-c2dGdQwmhQAu24FHe8BYO4YnqzU\"",
		"mtime": "2026-10-13T16:28:57.694Z",
		"size": 2460,
		"path": "../public/assets/admin.index-Bz93CA4h.js"
	},
	"/assets/admin.planos-BBQVISK3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d2e-PHj1hpHEc4Z0qJxNZSPcgNyOLxI\"",
		"mtime": "2026-10-13T16:28:57.694Z",
		"size": 3374,
		"path": "../public/assets/admin.planos-BBQVISK3.js"
	},
	"/assets/admin.servidores-DvgVbXgP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"143c-NJPLZZHbZuqww/mQC0Doi+cKMzg\"",
		"mtime": "2026-10-13T16:28:57.694Z",
		"size": 5180,
		"path": "../public/assets/admin.servidores-DvgVbXgP.js"
	},
	"/assets/admin.streaming-CC9HbCed.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"75f-wcRnuE5MJ/Ni5eaX3KYeMnCCC74\"",
		"mtime": "2026-10-13T16:28:57.695Z",
		"size": 1887,
		"path": "../public/assets/admin.streaming-CC9HbCed.js"
	},
	"/assets/admin.usuarios-DhGjqXsE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bbb-vD5TTDYKRLzIBUOKQdDBDbg5TEY\"",
		"mtime": "2026-10-13T16:28:57.695Z",
		"size": 3003,
		"path": "../public/assets/admin.usuarios-DhGjqXsE.js"
	},
	"/assets/admin.vendas-BsfLSgXJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1315-HuTVQ5bgpTOyh8vpKh3IRDuROjI\"",
		"mtime": "2026-10-13T16:28:57.695Z",
		"size": 4885,
		"path": "../public/assets/admin.vendas-BsfLSgXJ.js"
	},
	"/assets/ativar-DTjee3vd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ace-XiTEvQoEGveYCVlnuVNNM3L0GhI\"",
		"mtime": "2026-10-13T16:28:57.696Z",
		"size": 2766,
		"path": "../public/assets/ativar-DTjee3vd.js"
	},
	"/assets/brand-Cmlc68Rj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"870-1mLxEn5vHsMN1u/UgdLowJZ0SOs\"",
		"mtime": "2026-10-13T16:28:57.696Z",
		"size": 2160,
		"path": "../public/assets/brand-Cmlc68Rj.js"
	},
	"/assets/button-CK-Kv5mR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1306-W7jNSl8M5f8OrWGPCFvXw2/ySEU\"",
		"mtime": "2026-10-13T16:28:57.696Z",
		"size": 4870,
		"path": "../public/assets/button-CK-Kv5mR.js"
	},
	"/assets/clapperboard-CYdw6Pc_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"168-+SBVbB0zhBB0WRtUMh1HCfRCID0\"",
		"mtime": "2026-10-13T16:28:57.697Z",
		"size": 360,
		"path": "../public/assets/clapperboard-CYdw6Pc_.js"
	},
	"/assets/cliente-B7m5HTi8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"92e-ngi1sCr5GpHNV6E0oBxchONxoAU\"",
		"mtime": "2026-10-13T16:28:57.697Z",
		"size": 2350,
		"path": "../public/assets/cliente-B7m5HTi8.js"
	},
	"/assets/copy-DCHSmm07.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ec-1JmVfTyRpBOyIw0flknfQhVgMIU\"",
		"mtime": "2026-10-13T16:28:57.698Z",
		"size": 236,
		"path": "../public/assets/copy-DCHSmm07.js"
	},
	"/assets/createLucideIcon-CabK5vaI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4cc-QNaBMQOAZq2T/auAvCB/kK/H4/Y\"",
		"mtime": "2026-10-13T16:28:57.698Z",
		"size": 1228,
		"path": "../public/assets/createLucideIcon-CabK5vaI.js"
	},
	"/assets/device-client-WFY6Hzd0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"465-tzFn0gGAy9ABFW/2OvNwFnpG0uk\"",
		"mtime": "2026-10-13T16:28:57.699Z",
		"size": 1125,
		"path": "../public/assets/device-client-WFY6Hzd0.js"
	},
	"/assets/dialog-DruSgXXP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"70fc-8CwXgd2kZtTBECQFPnD25u1DIVI\"",
		"mtime": "2026-10-13T16:28:57.700Z",
		"size": 28924,
		"path": "../public/assets/dialog-DruSgXXP.js"
	},
	"/assets/dist-C8QTpjBc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d57-8t8R1uxeuxYtBRXXzbIY3OLpufY\"",
		"mtime": "2026-10-13T16:28:57.700Z",
		"size": 7511,
		"path": "../public/assets/dist-C8QTpjBc.js"
	},
	"/assets/dist-CBLzdMz5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1eb2-TjtMAGjAEARTz6DfhLLx/q31Uko\"",
		"mtime": "2026-10-13T16:28:57.700Z",
		"size": 7858,
		"path": "../public/assets/dist-CBLzdMz5.js"
	},
	"/assets/film-FSAvqR_e.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"197-+xpljMM+RFb0tRbkrvE+4r4/qq0\"",
		"mtime": "2026-10-13T16:28:57.701Z",
		"size": 407,
		"path": "../public/assets/film-FSAvqR_e.js"
	},
	"/assets/input-Cbkj7NVd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2b0-Zb11DIANvNIlTagUovA1kIVOXSM\"",
		"mtime": "2026-10-13T16:28:57.702Z",
		"size": 688,
		"path": "../public/assets/input-Cbkj7NVd.js"
	},
	"/assets/key-round-Bn85nMhF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"163-O/P/nSoUI/+KEuwtTXtxoxDYrnE\"",
		"mtime": "2026-10-13T16:28:57.702Z",
		"size": 355,
		"path": "../public/assets/key-round-Bn85nMhF.js"
	},
	"/assets/layers-BGxYLKOt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a5-BisWeP/KgCOeM0bG26uuxFjstYU\"",
		"mtime": "2026-10-13T16:28:57.702Z",
		"size": 421,
		"path": "../public/assets/layers-BGxYLKOt.js"
	},
	"/assets/index-DYw_oAmY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"65064-6IJhttDdWcjWiHZvgEUbl01Kc98\"",
		"mtime": "2026-10-13T16:28:57.689Z",
		"size": 413796,
		"path": "../public/assets/index-DYw_oAmY.js"
	},
	"/assets/mpegts-BETI8p9P.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"42805-dzPDTvQgix74GP6HreExDymE6UY\"",
		"mtime": "2026-10-13T16:28:57.703Z",
		"size": 272389,
		"path": "../public/assets/mpegts-BETI8p9P.js"
	},
	"/assets/planos-CaPptxQo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a4-Es8gSXyDp1fFKaVQw4k6o23dZAY\"",
		"mtime": "2026-10-13T16:28:57.703Z",
		"size": 164,
		"path": "../public/assets/planos-CaPptxQo.js"
	},
	"/assets/planos-D1SqEhrv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b7-p0P/2Pp/uyOL9816Qup8MkDiUU0\"",
		"mtime": "2026-10-13T16:28:57.703Z",
		"size": 183,
		"path": "../public/assets/planos-D1SqEhrv.js"
	},
	"/assets/planos-DYWr20n9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2bc2-nufNRtCkBzqckab/25uX4dAz5Ss\"",
		"mtime": "2026-10-13T16:28:57.704Z",
		"size": 11202,
		"path": "../public/assets/planos-DYWr20n9.js"
	},
	"/assets/player-G201zCFS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3fc0-57aMCy9yrTMswaMM9kBJjGYklOg\"",
		"mtime": "2026-10-13T16:28:57.704Z",
		"size": 16320,
		"path": "../public/assets/player-G201zCFS.js"
	},
	"/assets/plus-CbMKM017.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99-aqcYFZgTys8a/7hyjfJsfu/4VT4\"",
		"mtime": "2026-10-13T16:28:57.704Z",
		"size": 153,
		"path": "../public/assets/plus-CbMKM017.js"
	},
	"/assets/react-DK6rpPfu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ec4-V1xNZhmjixlZV0LgvNOiaUJF4yk\"",
		"mtime": "2026-10-13T16:28:57.705Z",
		"size": 7876,
		"path": "../public/assets/react-DK6rpPfu.js"
	},
	"/assets/refresh-cw-CYL9LGno.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"141-Zc2Y+2YnuaiNQFwN2MZxws5+Fa4\"",
		"mtime": "2026-10-13T16:28:57.705Z",
		"size": 321,
		"path": "../public/assets/refresh-cw-CYL9LGno.js"
	},
	"/assets/rolldown-runtime-CbXtAM7H.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"24d-+aXgvbJ1Wwcp2A8AXKIBByksYC8\"",
		"mtime": "2026-10-13T16:28:57.705Z",
		"size": 589,
		"path": "../public/assets/rolldown-runtime-CbXtAM7H.js"
	},
	"/assets/routes-CmXzExjX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a4e-4YX7hka4fNXbABd7MN6rks+aZXk\"",
		"mtime": "2026-10-13T16:28:57.706Z",
		"size": 2638,
		"path": "../public/assets/routes-CmXzExjX.js"
	},
	"/assets/search-DOobwRYQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ae-t7YNN0uCKsTsnCtld42UI5lv+6Y\"",
		"mtime": "2026-10-13T16:28:57.706Z",
		"size": 174,
		"path": "../public/assets/search-DOobwRYQ.js"
	},
	"/assets/server-mBZdm3QS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"152-r5S/rR4FsjS1tbZ3hMwc5anfMbI\"",
		"mtime": "2026-10-13T16:28:57.706Z",
		"size": 338,
		"path": "../public/assets/server-mBZdm3QS.js"
	},
	"/assets/settings-Civ9fmNU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e7-ncaTBpcHZCIAXmxXV083sTQOuQ8\"",
		"mtime": "2026-10-13T16:28:57.706Z",
		"size": 487,
		"path": "../public/assets/settings-Civ9fmNU.js"
	},
	"/assets/shield-check-TEr-fcUz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"140-M59jB9Cm7lnEFdolUmoxHh/Vpzs\"",
		"mtime": "2026-10-13T16:28:57.707Z",
		"size": 320,
		"path": "../public/assets/shield-check-TEr-fcUz.js"
	},
	"/assets/hls-BhcDaTqf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8c546-hnGn8vIsciiCtsWkmKZ1VwsqkPQ\"",
		"mtime": "2026-10-13T16:28:57.701Z",
		"size": 574790,
		"path": "../public/assets/hls-BhcDaTqf.js"
	},
	"/assets/source-form-CmNWuEw6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1032-FmJmWm4p02gT+okCiMgOTrVURug\"",
		"mtime": "2026-10-13T16:28:57.707Z",
		"size": 4146,
		"path": "../public/assets/source-form-CmNWuEw6.js"
	},
	"/assets/styles-Cq-u-12h.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"13f74-lZuxmVXS2E1DkPScUFBV9Xk5rhk\"",
		"mtime": "2026-10-13T16:28:57.710Z",
		"size": 81780,
		"path": "../public/assets/styles-Cq-u-12h.css"
	},
	"/assets/switch-lPkzxBQF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1309-lTUDb2lxkCGZ942g3UmkOZ7gfio\"",
		"mtime": "2026-10-13T16:28:57.707Z",
		"size": 4873,
		"path": "../public/assets/switch-lPkzxBQF.js"
	},
	"/assets/trash-2-BN1HqQX-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"148-6Gte4kMzBdaw7wZdUW0FTa6ySaY\"",
		"mtime": "2026-10-13T16:28:57.708Z",
		"size": 328,
		"path": "../public/assets/trash-2-BN1HqQX-.js"
	},
	"/assets/tv-DPSaO8AZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b9-0cUNWJZVOctR6GtcCyrUDZT26FU\"",
		"mtime": "2026-10-13T16:28:57.708Z",
		"size": 185,
		"path": "../public/assets/tv-DPSaO8AZ.js"
	},
	"/assets/useBaseQuery-DGCjVx8v.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f56-rdXZZm8OE1umkUT/qqkR6A8Pz+s\"",
		"mtime": "2026-10-13T16:28:57.708Z",
		"size": 8022,
		"path": "../public/assets/useBaseQuery-DGCjVx8v.js"
	},
	"/assets/useServerFn-BEutOZt1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"193-hGDfW22JcQlha8wsWylcUOydtxY\"",
		"mtime": "2026-10-13T16:28:57.709Z",
		"size": 403,
		"path": "../public/assets/useServerFn-BEutOZt1.js"
	},
	"/assets/utils-4jUIYOBc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6bed-90NGITyc+kEKvxUkUtkYHgO1XH4\"",
		"mtime": "2026-10-13T16:28:57.709Z",
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
