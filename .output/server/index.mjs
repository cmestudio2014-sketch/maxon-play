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
		"mtime": "2026-10-13T13:23:47.191Z",
		"size": 159,
		"path": "../public/robots.txt"
	},
	"/assets/admin-Ba-JqpnH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1cbf-F96GmIdYt+u9lV1V8lpuyqmPPTw\"",
		"mtime": "2026-10-13T13:23:43.125Z",
		"size": 7359,
		"path": "../public/assets/admin-Ba-JqpnH.js"
	},
	"/assets/admin-Dj6IuIO4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ac-CyuX1cgsmw8pEw6mnG5dX6ZQKMY\"",
		"mtime": "2026-10-13T13:23:43.125Z",
		"size": 172,
		"path": "../public/assets/admin-Dj6IuIO4.js"
	},
	"/assets/admin-euV62zB2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d8-243t1r7tkK6Wsexx+WBDCqAOOr0\"",
		"mtime": "2026-10-13T13:23:43.126Z",
		"size": 216,
		"path": "../public/assets/admin-euV62zB2.js"
	},
	"/assets/admin-ui-DogOomDN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a99-JGd4cNPev/7JfiJA7HBlvjF6XQM\"",
		"mtime": "2026-10-13T13:23:43.126Z",
		"size": 2713,
		"path": "../public/assets/admin-ui-DogOomDN.js"
	},
	"/assets/admin.ativacoes-DSmLC7s_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e6b0-utTBxjYHgrZ6miFjbv9zl5ZZt3c\"",
		"mtime": "2026-10-13T13:23:43.126Z",
		"size": 59056,
		"path": "../public/assets/admin.ativacoes-DSmLC7s_.js"
	},
	"/assets/admin.auditoria-DP693eAo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"570-nzOswzUUnAAynRy9GwRSCXeTcdM\"",
		"mtime": "2026-10-13T13:23:43.127Z",
		"size": 1392,
		"path": "../public/assets/admin.auditoria-DP693eAo.js"
	},
	"/assets/admin.clientes-CR0cXJra.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11ff-d9++EtmpRQl4l9gr8/rS03BkJms\"",
		"mtime": "2026-10-13T13:23:43.127Z",
		"size": 4607,
		"path": "../public/assets/admin.clientes-CR0cXJra.js"
	},
	"/assets/admin.configuracoes-DAsJGY44.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6c4-VTLBP/6SF7un9ClAArlqb4Ktd3M\"",
		"mtime": "2026-10-13T13:23:43.127Z",
		"size": 1732,
		"path": "../public/assets/admin.configuracoes-DAsJGY44.js"
	},
	"/assets/admin.cupons-CCpCZj61.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b43-YLTG033vM5dqn9RkYll6UAx5b2I\"",
		"mtime": "2026-10-13T13:23:43.127Z",
		"size": 2883,
		"path": "../public/assets/admin.cupons-CCpCZj61.js"
	},
	"/assets/admin.dispositivos-D64RVsph.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a23-VG5YlTpRddWCCgDL+5hU/JnUAak\"",
		"mtime": "2026-10-13T13:23:43.128Z",
		"size": 6691,
		"path": "../public/assets/admin.dispositivos-D64RVsph.js"
	},
	"/assets/admin.editor-listas-CHlFt1Rn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2df9-K0jcsZ8RZi0S7xb8aRiKxZ2+ShM\"",
		"mtime": "2026-10-13T13:23:43.128Z",
		"size": 11769,
		"path": "../public/assets/admin.editor-listas-CHlFt1Rn.js"
	},
	"/assets/admin.fontes-BDoAHcZd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a57-hM9vzzli4iqLnoMMc8ZLg6UJKaA\"",
		"mtime": "2026-10-13T13:23:43.128Z",
		"size": 2647,
		"path": "../public/assets/admin.fontes-BDoAHcZd.js"
	},
	"/assets/admin.index-BbDxZ87G.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99c-Xgxz3f0h/KKT/k8m95727xNZN1s\"",
		"mtime": "2026-10-13T13:23:43.129Z",
		"size": 2460,
		"path": "../public/assets/admin.index-BbDxZ87G.js"
	},
	"/assets/admin.planos-CnX25c7B.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d02-a++LtWQnXsRtkVAPBXD6AR98VSM\"",
		"mtime": "2026-10-13T13:23:43.129Z",
		"size": 3330,
		"path": "../public/assets/admin.planos-CnX25c7B.js"
	},
	"/assets/admin.servidores-CatsNgvb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1410-UjOgY2h247iQ/XtyAJcC63juvpU\"",
		"mtime": "2026-10-13T13:23:43.130Z",
		"size": 5136,
		"path": "../public/assets/admin.servidores-CatsNgvb.js"
	},
	"/assets/admin.usuarios-B-P41ugP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b8f-BiV7vEDQzThZKulP6OCRqRlSNGc\"",
		"mtime": "2026-10-13T13:23:43.130Z",
		"size": 2959,
		"path": "../public/assets/admin.usuarios-B-P41ugP.js"
	},
	"/assets/admin.vendas-DsfE2E-A.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12e9-q2s8Tk/9chqLF0IwjoL1sw2pxy8\"",
		"mtime": "2026-10-13T13:23:43.130Z",
		"size": 4841,
		"path": "../public/assets/admin.vendas-DsfE2E-A.js"
	},
	"/assets/ativar-CCAnWvwO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"aa2-iOZIbC+XZKbtrolhsMj598y8qGg\"",
		"mtime": "2026-10-13T13:23:43.131Z",
		"size": 2722,
		"path": "../public/assets/ativar-CCAnWvwO.js"
	},
	"/assets/brand-IcCpyWxW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"870-DMP4lR26linK8F4yw6q7QYrf/v8\"",
		"mtime": "2026-10-13T13:23:43.131Z",
		"size": 2160,
		"path": "../public/assets/brand-IcCpyWxW.js"
	},
	"/assets/button-JLidV9bS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12da-1IPd5zXYVJPTgJBAWlJb5EPPDmU\"",
		"mtime": "2026-10-13T13:23:43.131Z",
		"size": 4826,
		"path": "../public/assets/button-JLidV9bS.js"
	},
	"/assets/cliente-CXNdX70d.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"902-Ke86jtb5xvYLVeIATHtU0UeacUE\"",
		"mtime": "2026-10-13T13:23:43.131Z",
		"size": 2306,
		"path": "../public/assets/cliente-CXNdX70d.js"
	},
	"/assets/copy-BmHJmYOU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ec-vCUeeGphC4Xgze5Nvdth85mmQUE\"",
		"mtime": "2026-10-13T13:23:43.132Z",
		"size": 236,
		"path": "../public/assets/copy-BmHJmYOU.js"
	},
	"/assets/createLucideIcon-C8f4lLaO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4a0-NTAL9M0j6LxzNovOonT9n48Sqbg\"",
		"mtime": "2026-10-13T13:23:43.132Z",
		"size": 1184,
		"path": "../public/assets/createLucideIcon-C8f4lLaO.js"
	},
	"/assets/device-client-WFY6Hzd0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"465-tzFn0gGAy9ABFW/2OvNwFnpG0uk\"",
		"mtime": "2026-10-13T13:23:43.132Z",
		"size": 1125,
		"path": "../public/assets/device-client-WFY6Hzd0.js"
	},
	"/assets/dialog-DBGafVHs.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"70d0-1A8MM2QzztGrMydWuKrtIbIXDNM\"",
		"mtime": "2026-10-13T13:23:43.133Z",
		"size": 28880,
		"path": "../public/assets/dialog-DBGafVHs.js"
	},
	"/assets/dist-DJapzIPF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d2b-TlFM+/ZrxbVPP76JIlj42LR4gj8\"",
		"mtime": "2026-10-13T13:23:43.133Z",
		"size": 7467,
		"path": "../public/assets/dist-DJapzIPF.js"
	},
	"/assets/dist-BCu3-Gec.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e86-w1Zv3MGXv6iAWvqH50waYoIJsFo\"",
		"mtime": "2026-10-13T13:23:43.133Z",
		"size": 7814,
		"path": "../public/assets/dist-BCu3-Gec.js"
	},
	"/assets/input-Bi14IoCx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"284-Lx2QiJQET1deJQjvsU33wocvEsA\"",
		"mtime": "2026-10-13T13:23:43.134Z",
		"size": 644,
		"path": "../public/assets/input-Bi14IoCx.js"
	},
	"/assets/layers-BHt7oUqU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a5-VEE7MBx36EeV76ORlW4ZBjX5iEU\"",
		"mtime": "2026-10-13T13:23:43.135Z",
		"size": 421,
		"path": "../public/assets/layers-BHt7oUqU.js"
	},
	"/assets/key-round-DP4XvNfR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"163-HoFL7pU2Av0hJmK3VxowPIC/eDU\"",
		"mtime": "2026-10-13T13:23:43.134Z",
		"size": 355,
		"path": "../public/assets/key-round-DP4XvNfR.js"
	},
	"/assets/planos-Bnqt3bnH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a4-pLNXoEmgtqULtlmKZjSVpcB1lVg\"",
		"mtime": "2026-10-13T13:23:43.135Z",
		"size": 164,
		"path": "../public/assets/planos-Bnqt3bnH.js"
	},
	"/assets/planos-DurojII3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b7-rv2YWnH6+O0qkMbI+oMIMRtI8bA\"",
		"mtime": "2026-10-13T13:23:43.136Z",
		"size": 183,
		"path": "../public/assets/planos-DurojII3.js"
	},
	"/assets/player-DytwLGZN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3512-ubhgkv943s0AOIIgU6e4aYZATlE\"",
		"mtime": "2026-10-13T13:23:43.136Z",
		"size": 13586,
		"path": "../public/assets/player-DytwLGZN.js"
	},
	"/assets/planos-CuO5oSr0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2b96-9Z92HTRZnLoU/bo5aHs8TMRiVdU\"",
		"mtime": "2026-10-13T13:23:43.135Z",
		"size": 11158,
		"path": "../public/assets/planos-CuO5oSr0.js"
	},
	"/assets/index-BwY8JkfY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"64dff-rveA6+C/aXgYd5WNYq9z2/mr9qs\"",
		"mtime": "2026-10-13T13:23:43.125Z",
		"size": 413183,
		"path": "../public/assets/index-BwY8JkfY.js"
	},
	"/assets/plus-CK5_0ous.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99-2+n67wU2592DEqxWenmrt9AhuAE\"",
		"mtime": "2026-10-13T13:23:43.136Z",
		"size": 153,
		"path": "../public/assets/plus-CK5_0ous.js"
	},
	"/assets/react-yIOJJ3r4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"20d2-kVhPh4bAQsY8cpxNQjSFv8q1v2A\"",
		"mtime": "2026-10-13T13:23:43.136Z",
		"size": 8402,
		"path": "../public/assets/react-yIOJJ3r4.js"
	},
	"/assets/routes-CyaOabI1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a4e-+5PJofX3PD2EvjSn7V9ZCJxPtJk\"",
		"mtime": "2026-10-13T13:23:43.137Z",
		"size": 2638,
		"path": "../public/assets/routes-CyaOabI1.js"
	},
	"/assets/refresh-cw-BVYdCPl3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"141-N5HomBB+2zrwqZi95HqvSLKmsHo\"",
		"mtime": "2026-10-13T13:23:43.137Z",
		"size": 321,
		"path": "../public/assets/refresh-cw-BVYdCPl3.js"
	},
	"/assets/search-PMc0BIAj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"339-QfpQGrmxavh5m9WMm2WssSBZn4s\"",
		"mtime": "2026-10-13T13:23:43.137Z",
		"size": 825,
		"path": "../public/assets/search-PMc0BIAj.js"
	},
	"/assets/server-BlF7IxQk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"152-kyTietkyyrtUyPEGOuPFYnvXdDg\"",
		"mtime": "2026-10-13T13:23:43.137Z",
		"size": 338,
		"path": "../public/assets/server-BlF7IxQk.js"
	},
	"/assets/settings-2GH6wj7X.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e7-sOaDfOv51oRTi3NbvmJ6OoPbH20\"",
		"mtime": "2026-10-13T13:23:43.138Z",
		"size": 487,
		"path": "../public/assets/settings-2GH6wj7X.js"
	},
	"/assets/shield-check-Djzt63kg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"140-Hb6+ImKYLTyMKORxqiB5jj8pGMk\"",
		"mtime": "2026-10-13T13:23:43.138Z",
		"size": 320,
		"path": "../public/assets/shield-check-Djzt63kg.js"
	},
	"/assets/source-form-BTcriUxY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1006-qFT8bSvPJR6VFdrGWN2Q4K0z6us\"",
		"mtime": "2026-10-13T13:23:43.138Z",
		"size": 4102,
		"path": "../public/assets/source-form-BTcriUxY.js"
	},
	"/assets/styles-oH0j3lRQ.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"13f14-eApduI12K9abx4TvF5gwXC1VfkM\"",
		"mtime": "2026-10-13T13:23:43.140Z",
		"size": 81684,
		"path": "../public/assets/styles-oH0j3lRQ.css"
	},
	"/assets/switch-a8KNO9oV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12dd-TfmHrE+cqtLXiPIH9Dt2uLKiZFg\"",
		"mtime": "2026-10-13T13:23:43.139Z",
		"size": 4829,
		"path": "../public/assets/switch-a8KNO9oV.js"
	},
	"/assets/tv-DUoZ45GY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b9-Yl7pEzPwu1yVSQECCLU2wh50XQg\"",
		"mtime": "2026-10-13T13:23:43.139Z",
		"size": 185,
		"path": "../public/assets/tv-DUoZ45GY.js"
	},
	"/assets/useBaseQuery-Do5_sIsH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f2a-SDS+0viehoJcz9AmBJO9GsfqEks\"",
		"mtime": "2026-10-13T13:23:43.139Z",
		"size": 7978,
		"path": "../public/assets/useBaseQuery-Do5_sIsH.js"
	},
	"/assets/hls-BhcDaTqf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8c546-hnGn8vIsciiCtsWkmKZ1VwsqkPQ\"",
		"mtime": "2026-10-13T13:23:43.134Z",
		"size": 574790,
		"path": "../public/assets/hls-BhcDaTqf.js"
	},
	"/assets/useServerFn-CHSRwtUV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"167-fpR2fiXLyeNcobP4m68Rg0AvnBs\"",
		"mtime": "2026-10-13T13:23:43.139Z",
		"size": 359,
		"path": "../public/assets/useServerFn-CHSRwtUV.js"
	},
	"/assets/utils-4jUIYOBc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6bed-90NGITyc+kEKvxUkUtkYHgO1XH4\"",
		"mtime": "2026-10-13T13:23:43.140Z",
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
