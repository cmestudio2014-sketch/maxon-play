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
	"/assets/admin-ChKJmvni.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d8-MEawsafCrUrJ475G7W2/GIEY6js\"",
		"mtime": "2026-10-13T13:01:11.652Z",
		"size": 216,
		"path": "../public/assets/admin-ChKJmvni.js"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"9f-HO14TyKd/4qwktFzfKfM5KZm5e8\"",
		"mtime": "2026-10-13T13:01:15.641Z",
		"size": 159,
		"path": "../public/robots.txt"
	},
	"/assets/admin-DZxmDPWk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1cbf-/iL3WTGOUq/PMpiXBvhhrZb83/g\"",
		"mtime": "2026-10-13T13:01:11.652Z",
		"size": 7359,
		"path": "../public/assets/admin-DZxmDPWk.js"
	},
	"/assets/admin-DsgoH5_K.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ac-dCJuVKdNul4oJK8uvLyu2aPyQL8\"",
		"mtime": "2026-10-13T13:01:11.652Z",
		"size": 172,
		"path": "../public/assets/admin-DsgoH5_K.js"
	},
	"/assets/admin-ui-y8HkEqeF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a99-RpURUwLpfqWtdcEmGm/Ima47v8E\"",
		"mtime": "2026-10-13T13:01:11.653Z",
		"size": 2713,
		"path": "../public/assets/admin-ui-y8HkEqeF.js"
	},
	"/assets/admin.ativacoes-BVSMNSdb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e6b0-+uanG3AoOzfHDg7sVTzBQI7P7yo\"",
		"mtime": "2026-10-13T13:01:11.653Z",
		"size": 59056,
		"path": "../public/assets/admin.ativacoes-BVSMNSdb.js"
	},
	"/assets/admin.clientes-DFUbl6xT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11ff-dgWc3Nf23JOXeWD/jk5eahJ9Lp0\"",
		"mtime": "2026-10-13T13:01:11.653Z",
		"size": 4607,
		"path": "../public/assets/admin.clientes-DFUbl6xT.js"
	},
	"/assets/admin.auditoria-CxfHQV5C.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"570-Ca/UScqt0cxzTNEnXw49oGt9wew\"",
		"mtime": "2026-10-13T13:01:11.653Z",
		"size": 1392,
		"path": "../public/assets/admin.auditoria-CxfHQV5C.js"
	},
	"/assets/admin.configuracoes-D3Y76PM8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6c4-1dyNgf7IgJPjgCzpnB3EJ+3FAdE\"",
		"mtime": "2026-10-13T13:01:11.654Z",
		"size": 1732,
		"path": "../public/assets/admin.configuracoes-D3Y76PM8.js"
	},
	"/assets/admin.cupons-yJii9FMZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b43-EWCLu2EPo+xGMUWggweE5sPMZQI\"",
		"mtime": "2026-10-13T13:01:11.654Z",
		"size": 2883,
		"path": "../public/assets/admin.cupons-yJii9FMZ.js"
	},
	"/assets/admin.dispositivos-BF8C0RMx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a23-WHAwcyIQNIZIbt8bxYpuIvCkbPM\"",
		"mtime": "2026-10-13T13:01:11.654Z",
		"size": 6691,
		"path": "../public/assets/admin.dispositivos-BF8C0RMx.js"
	},
	"/assets/admin.editor-listas-BVgwqoOa.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2df9-sApTuBKSDA0eAyq4hJvW8JWGxTc\"",
		"mtime": "2026-10-13T13:01:11.655Z",
		"size": 11769,
		"path": "../public/assets/admin.editor-listas-BVgwqoOa.js"
	},
	"/assets/admin.fontes-DpZGMYw_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a57-ikNMg1Tg6WX/xPI0BP/qBU+OyYg\"",
		"mtime": "2026-10-13T13:01:11.655Z",
		"size": 2647,
		"path": "../public/assets/admin.fontes-DpZGMYw_.js"
	},
	"/assets/admin.index-Cn4RRK0U.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99c-fmOG1K7jN6KK8iY1ovzPoIlh7bw\"",
		"mtime": "2026-10-13T13:01:11.655Z",
		"size": 2460,
		"path": "../public/assets/admin.index-Cn4RRK0U.js"
	},
	"/assets/admin.planos-BwGzae2y.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d02-LaX3SLCe2cjo/TL+aXnp5R6uZZ0\"",
		"mtime": "2026-10-13T13:01:11.655Z",
		"size": 3330,
		"path": "../public/assets/admin.planos-BwGzae2y.js"
	},
	"/assets/admin.servidores-DzI4dDaQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1410-OS52cEgbgx6MK2WNN7o+jVZievM\"",
		"mtime": "2026-10-13T13:01:11.656Z",
		"size": 5136,
		"path": "../public/assets/admin.servidores-DzI4dDaQ.js"
	},
	"/assets/admin.usuarios-DvuW38Qq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b8f-Li72k/nSsyHfvHq61PiEXbvlCFw\"",
		"mtime": "2026-10-13T13:01:11.656Z",
		"size": 2959,
		"path": "../public/assets/admin.usuarios-DvuW38Qq.js"
	},
	"/assets/admin.vendas-12mJ28g3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12e9-XnjRjwRNQ40C4Cjh1sFs+5Gu+Lo\"",
		"mtime": "2026-10-13T13:01:11.656Z",
		"size": 4841,
		"path": "../public/assets/admin.vendas-12mJ28g3.js"
	},
	"/assets/ativar-SKtutTBb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"aa2-8HkLw6XYsUhlF8esKJWtMmv6aS4\"",
		"mtime": "2026-10-13T13:01:11.657Z",
		"size": 2722,
		"path": "../public/assets/ativar-SKtutTBb.js"
	},
	"/assets/brand-N4SNwsZq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"870-a11J0AuPnyt358HN3VJhsiRw+mM\"",
		"mtime": "2026-10-13T13:01:11.657Z",
		"size": 2160,
		"path": "../public/assets/brand-N4SNwsZq.js"
	},
	"/assets/button-CbtgWrOk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12da-OLMsUVod2ydztd2iUeBAYOe5lFQ\"",
		"mtime": "2026-10-13T13:01:11.657Z",
		"size": 4826,
		"path": "../public/assets/button-CbtgWrOk.js"
	},
	"/assets/cliente-CkqJ87sr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"902-CYYOTFHVr7B2lexzjwzKF1uE63A\"",
		"mtime": "2026-10-13T13:01:11.658Z",
		"size": 2306,
		"path": "../public/assets/cliente-CkqJ87sr.js"
	},
	"/assets/copy-BmHJmYOU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ec-vCUeeGphC4Xgze5Nvdth85mmQUE\"",
		"mtime": "2026-10-13T13:01:11.658Z",
		"size": 236,
		"path": "../public/assets/copy-BmHJmYOU.js"
	},
	"/assets/createLucideIcon-C8f4lLaO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4a0-NTAL9M0j6LxzNovOonT9n48Sqbg\"",
		"mtime": "2026-10-13T13:01:11.658Z",
		"size": 1184,
		"path": "../public/assets/createLucideIcon-C8f4lLaO.js"
	},
	"/assets/device-client-WFY6Hzd0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"465-tzFn0gGAy9ABFW/2OvNwFnpG0uk\"",
		"mtime": "2026-10-13T13:01:11.659Z",
		"size": 1125,
		"path": "../public/assets/device-client-WFY6Hzd0.js"
	},
	"/assets/dialog-Bc4EfH_-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"70d0-4hkN5fjXIwsJejIhQef3STC/9QY\"",
		"mtime": "2026-10-13T13:01:11.659Z",
		"size": 28880,
		"path": "../public/assets/dialog-Bc4EfH_-.js"
	},
	"/assets/dist-B2yJ31Td.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e86-p0DhkjI06NivnVqU1F/YbN4nVLA\"",
		"mtime": "2026-10-13T13:01:11.659Z",
		"size": 7814,
		"path": "../public/assets/dist-B2yJ31Td.js"
	},
	"/assets/dist-DfCE72sQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d2b-JFLOGhcfx2CdNLVTt+KF39YG7ZY\"",
		"mtime": "2026-10-13T13:01:11.660Z",
		"size": 7467,
		"path": "../public/assets/dist-DfCE72sQ.js"
	},
	"/assets/input-DoJRdyjn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"284-CQO/P13IAmyt7dTKkbvpnPCS6tI\"",
		"mtime": "2026-10-13T13:01:11.660Z",
		"size": 644,
		"path": "../public/assets/input-DoJRdyjn.js"
	},
	"/assets/key-round-DP4XvNfR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"163-HoFL7pU2Av0hJmK3VxowPIC/eDU\"",
		"mtime": "2026-10-13T13:01:11.661Z",
		"size": 355,
		"path": "../public/assets/key-round-DP4XvNfR.js"
	},
	"/assets/index-CT_IHxcJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"64dff-L1mtIlhEvtYPNYADt0CIGmClBhc\"",
		"mtime": "2026-10-13T13:01:11.651Z",
		"size": 413183,
		"path": "../public/assets/index-CT_IHxcJ.js"
	},
	"/assets/layers-BHt7oUqU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a5-VEE7MBx36EeV76ORlW4ZBjX5iEU\"",
		"mtime": "2026-10-13T13:01:11.661Z",
		"size": 421,
		"path": "../public/assets/layers-BHt7oUqU.js"
	},
	"/assets/planos-C3EXSZXX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2b96-9GNmKEAVoE1cqytH9WZqwQo2IDY\"",
		"mtime": "2026-10-13T13:01:11.661Z",
		"size": 11158,
		"path": "../public/assets/planos-C3EXSZXX.js"
	},
	"/assets/planos-Q4gfIPIV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b7-2Tqe1dSLtRkFHhl/aHc+QMwC09Q\"",
		"mtime": "2026-10-13T13:01:11.662Z",
		"size": 183,
		"path": "../public/assets/planos-Q4gfIPIV.js"
	},
	"/assets/planos-CBEIPoNA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a4-xvrX9o46kS4Nk/yiEje1pSQuoRU\"",
		"mtime": "2026-10-13T13:01:11.662Z",
		"size": 164,
		"path": "../public/assets/planos-CBEIPoNA.js"
	},
	"/assets/react-yIOJJ3r4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"20d2-kVhPh4bAQsY8cpxNQjSFv8q1v2A\"",
		"mtime": "2026-10-13T13:01:11.663Z",
		"size": 8402,
		"path": "../public/assets/react-yIOJJ3r4.js"
	},
	"/assets/plus-CK5_0ous.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99-2+n67wU2592DEqxWenmrt9AhuAE\"",
		"mtime": "2026-10-13T13:01:11.663Z",
		"size": 153,
		"path": "../public/assets/plus-CK5_0ous.js"
	},
	"/assets/refresh-cw-BVYdCPl3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"141-N5HomBB+2zrwqZi95HqvSLKmsHo\"",
		"mtime": "2026-10-13T13:01:11.663Z",
		"size": 321,
		"path": "../public/assets/refresh-cw-BVYdCPl3.js"
	},
	"/assets/player-DSk1Lzm9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2d49-k91QznuwO4nsvg1X+FPee52RAGM\"",
		"mtime": "2026-10-13T13:01:11.662Z",
		"size": 11593,
		"path": "../public/assets/player-DSk1Lzm9.js"
	},
	"/assets/routes-Fb3jCAv1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a4e-7VCNMtPKHLbMjyPGPFctCnbHCd8\"",
		"mtime": "2026-10-13T13:01:11.663Z",
		"size": 2638,
		"path": "../public/assets/routes-Fb3jCAv1.js"
	},
	"/assets/search-PMc0BIAj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"339-QfpQGrmxavh5m9WMm2WssSBZn4s\"",
		"mtime": "2026-10-13T13:01:11.664Z",
		"size": 825,
		"path": "../public/assets/search-PMc0BIAj.js"
	},
	"/assets/server-BlF7IxQk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"152-kyTietkyyrtUyPEGOuPFYnvXdDg\"",
		"mtime": "2026-10-13T13:01:11.664Z",
		"size": 338,
		"path": "../public/assets/server-BlF7IxQk.js"
	},
	"/assets/settings-2GH6wj7X.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e7-sOaDfOv51oRTi3NbvmJ6OoPbH20\"",
		"mtime": "2026-10-13T13:01:11.664Z",
		"size": 487,
		"path": "../public/assets/settings-2GH6wj7X.js"
	},
	"/assets/shield-check-Djzt63kg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"140-Hb6+ImKYLTyMKORxqiB5jj8pGMk\"",
		"mtime": "2026-10-13T13:01:11.665Z",
		"size": 320,
		"path": "../public/assets/shield-check-Djzt63kg.js"
	},
	"/assets/source-form-BbPaXhXw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1006-Twk+3gyqUeTqjw+q9oGva7Vsitk\"",
		"mtime": "2026-10-13T13:01:11.665Z",
		"size": 4102,
		"path": "../public/assets/source-form-BbPaXhXw.js"
	},
	"/assets/styles-CpJa1tAV.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"13d2f-8Qmvhawc9PMxPeR7awt+eFfxcCc\"",
		"mtime": "2026-10-13T13:01:11.667Z",
		"size": 81199,
		"path": "../public/assets/styles-CpJa1tAV.css"
	},
	"/assets/switch-CdPN3EKT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12dd-voHzwkR1MF9z1+R9iKW6Dgc44ZI\"",
		"mtime": "2026-10-13T13:01:11.665Z",
		"size": 4829,
		"path": "../public/assets/switch-CdPN3EKT.js"
	},
	"/assets/tv-DUoZ45GY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b9-Yl7pEzPwu1yVSQECCLU2wh50XQg\"",
		"mtime": "2026-10-13T13:01:11.665Z",
		"size": 185,
		"path": "../public/assets/tv-DUoZ45GY.js"
	},
	"/assets/useBaseQuery-BouwN8FJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f2a-usAH/flIZ6jy3/hhJzMkxzgkXbY\"",
		"mtime": "2026-10-13T13:01:11.666Z",
		"size": 7978,
		"path": "../public/assets/useBaseQuery-BouwN8FJ.js"
	},
	"/assets/hls-BhcDaTqf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8c546-hnGn8vIsciiCtsWkmKZ1VwsqkPQ\"",
		"mtime": "2026-10-13T13:01:11.660Z",
		"size": 574790,
		"path": "../public/assets/hls-BhcDaTqf.js"
	},
	"/assets/useServerFn-DMIzl7bH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"167-5XyEL55P5UtrqKg1UIV6F2nirA4\"",
		"mtime": "2026-10-13T13:01:11.666Z",
		"size": 359,
		"path": "../public/assets/useServerFn-DMIzl7bH.js"
	},
	"/assets/utils-4jUIYOBc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6bed-90NGITyc+kEKvxUkUtkYHgO1XH4\"",
		"mtime": "2026-10-13T13:01:11.666Z",
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
