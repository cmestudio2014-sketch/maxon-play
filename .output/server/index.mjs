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
		"mtime": "2026-10-13T12:03:09.567Z",
		"size": 159,
		"path": "../public/robots.txt"
	},
	"/assets/admin-CKCAqJ5w.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ac-tOnl4LGoDnVpD5wk2sSb5OBqDbo\"",
		"mtime": "2026-10-13T12:03:05.741Z",
		"size": 172,
		"path": "../public/assets/admin-CKCAqJ5w.js"
	},
	"/assets/admin-DkR36Xd8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1cbf-egbwfz+vPmo1O+h2NZbRXLA/eWY\"",
		"mtime": "2026-10-13T12:03:05.742Z",
		"size": 7359,
		"path": "../public/assets/admin-DkR36Xd8.js"
	},
	"/assets/admin-DrmWItyI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d8-S2VJDHfzC+S0M4emvboz3A+2xRw\"",
		"mtime": "2026-10-13T12:03:05.742Z",
		"size": 216,
		"path": "../public/assets/admin-DrmWItyI.js"
	},
	"/assets/admin-ui-BL9WwgKw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a98-dKV1rA3f3rmEcA5s8Pkb0Fw/NCU\"",
		"mtime": "2026-10-13T12:03:05.742Z",
		"size": 2712,
		"path": "../public/assets/admin-ui-BL9WwgKw.js"
	},
	"/assets/admin.ativacoes-BrfxkdHm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e6af-/edGi77FWVd0zJR1TthvOlg0b48\"",
		"mtime": "2026-10-13T12:03:05.743Z",
		"size": 59055,
		"path": "../public/assets/admin.ativacoes-BrfxkdHm.js"
	},
	"/assets/admin.auditoria-DCf7pGlG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"570-nEfssCR14dBPtC+7Gbny1pG+CqA\"",
		"mtime": "2026-10-13T12:03:05.743Z",
		"size": 1392,
		"path": "../public/assets/admin.auditoria-DCf7pGlG.js"
	},
	"/assets/admin.clientes-Co381ryb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11ff-2YhrYHrUlxSK03kHG+g3STndBzo\"",
		"mtime": "2026-10-13T12:03:05.743Z",
		"size": 4607,
		"path": "../public/assets/admin.clientes-Co381ryb.js"
	},
	"/assets/admin.configuracoes-BkhkURhS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6c4-kUMRJj6K6W2boXuZQg+kGGdsNbs\"",
		"mtime": "2026-10-13T12:03:05.743Z",
		"size": 1732,
		"path": "../public/assets/admin.configuracoes-BkhkURhS.js"
	},
	"/assets/admin.cupons-Dat-hQ5u.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b43-hAZNa7acbdKgfjsVUhQkBK4VklI\"",
		"mtime": "2026-10-13T12:03:05.744Z",
		"size": 2883,
		"path": "../public/assets/admin.cupons-Dat-hQ5u.js"
	},
	"/assets/admin.dispositivos-FCu4mRBm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a23-AbSMoqhH4JnTKE7XWW3kwANAR9M\"",
		"mtime": "2026-10-13T12:03:05.744Z",
		"size": 6691,
		"path": "../public/assets/admin.dispositivos-FCu4mRBm.js"
	},
	"/assets/admin.editor-listas-BAkiJJZU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"183f-HzN4GyjzCk+HPcc6IMDXVyqauvU\"",
		"mtime": "2026-10-13T12:03:05.744Z",
		"size": 6207,
		"path": "../public/assets/admin.editor-listas-BAkiJJZU.js"
	},
	"/assets/admin.fontes-DlhF2kYV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a57-sdIXTsSZo8JwoEebQ1zKeRimK5w\"",
		"mtime": "2026-10-13T12:03:05.745Z",
		"size": 2647,
		"path": "../public/assets/admin.fontes-DlhF2kYV.js"
	},
	"/assets/admin.index-DE7qBlMC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99c-OySRX+n+AGUmI1aa4ZkLsiMYRss\"",
		"mtime": "2026-10-13T12:03:05.745Z",
		"size": 2460,
		"path": "../public/assets/admin.index-DE7qBlMC.js"
	},
	"/assets/admin.planos-CannhMnR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d02-hQw1mKY9tsXplLpugGXiSi5IXxU\"",
		"mtime": "2026-10-13T12:03:05.745Z",
		"size": 3330,
		"path": "../public/assets/admin.planos-CannhMnR.js"
	},
	"/assets/admin.servidores-CK6GG5cP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1415-HLDAXk49kkPUrJsPihX93/1bcmo\"",
		"mtime": "2026-10-13T12:03:05.746Z",
		"size": 5141,
		"path": "../public/assets/admin.servidores-CK6GG5cP.js"
	},
	"/assets/admin.usuarios-1bNq4ezK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b8f-sOfo4v4OMKh775ff3BKDrU71PxA\"",
		"mtime": "2026-10-13T12:03:05.746Z",
		"size": 2959,
		"path": "../public/assets/admin.usuarios-1bNq4ezK.js"
	},
	"/assets/admin.vendas-BDuDWYOU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12e8-MKTAWtBZzU2uBIrJwj62Lj6TIYo\"",
		"mtime": "2026-10-13T12:03:05.746Z",
		"size": 4840,
		"path": "../public/assets/admin.vendas-BDuDWYOU.js"
	},
	"/assets/ativar-DWscqQ0S.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"aa1-Nh/kXwGkN3K1K7tnfFndkEo6sCQ\"",
		"mtime": "2026-10-13T12:03:05.746Z",
		"size": 2721,
		"path": "../public/assets/ativar-DWscqQ0S.js"
	},
	"/assets/brand-BwIXFONl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"870-QG6Hkvll7ZVQPHy7ir5xyZPPT7c\"",
		"mtime": "2026-10-13T12:03:05.747Z",
		"size": 2160,
		"path": "../public/assets/brand-BwIXFONl.js"
	},
	"/assets/button-CgjaP9wP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12da-29QP3a7K6EMBY8n+hSjHj8S8TCs\"",
		"mtime": "2026-10-13T12:03:05.747Z",
		"size": 4826,
		"path": "../public/assets/button-CgjaP9wP.js"
	},
	"/assets/cliente-BiIZBP6U.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"902-s/pI9RIuTBUAEGn2Rc4IY2AfrUM\"",
		"mtime": "2026-10-13T12:03:05.747Z",
		"size": 2306,
		"path": "../public/assets/cliente-BiIZBP6U.js"
	},
	"/assets/copy-BmHJmYOU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ec-vCUeeGphC4Xgze5Nvdth85mmQUE\"",
		"mtime": "2026-10-13T12:03:05.748Z",
		"size": 236,
		"path": "../public/assets/copy-BmHJmYOU.js"
	},
	"/assets/createLucideIcon-C8f4lLaO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4a0-NTAL9M0j6LxzNovOonT9n48Sqbg\"",
		"mtime": "2026-10-13T12:03:05.748Z",
		"size": 1184,
		"path": "../public/assets/createLucideIcon-C8f4lLaO.js"
	},
	"/assets/device-client-WFY6Hzd0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"465-tzFn0gGAy9ABFW/2OvNwFnpG0uk\"",
		"mtime": "2026-10-13T12:03:05.748Z",
		"size": 1125,
		"path": "../public/assets/device-client-WFY6Hzd0.js"
	},
	"/assets/dialog-Cjvyo8W8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"70d0-3pkq0TzhOcx1sZdMwiBPusi+F0M\"",
		"mtime": "2026-10-13T12:03:05.749Z",
		"size": 28880,
		"path": "../public/assets/dialog-Cjvyo8W8.js"
	},
	"/assets/dist-BxDJLX6i.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d2b-Xl4dkHs+hTdtZ96hGzLu4GJtIPg\"",
		"mtime": "2026-10-13T12:03:05.749Z",
		"size": 7467,
		"path": "../public/assets/dist-BxDJLX6i.js"
	},
	"/assets/dist-DS0QMAaT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e86-guBozeSYU61riMAcq6CGmBDxOpU\"",
		"mtime": "2026-10-13T12:03:05.749Z",
		"size": 7814,
		"path": "../public/assets/dist-DS0QMAaT.js"
	},
	"/assets/input-DRbMWxH_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"284-jo1wI5Q7l8DlmCO+nG+JfqUybjM\"",
		"mtime": "2026-10-13T12:03:05.750Z",
		"size": 644,
		"path": "../public/assets/input-DRbMWxH_.js"
	},
	"/assets/index-H69lYndp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"64ad6-ZfTckFVfSehrBywPm9U3aVLpXgI\"",
		"mtime": "2026-10-13T12:03:05.741Z",
		"size": 412374,
		"path": "../public/assets/index-H69lYndp.js"
	},
	"/assets/key-round-DP4XvNfR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"163-HoFL7pU2Av0hJmK3VxowPIC/eDU\"",
		"mtime": "2026-10-13T12:03:05.750Z",
		"size": 355,
		"path": "../public/assets/key-round-DP4XvNfR.js"
	},
	"/assets/planos-Sc9t2ycb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a4-5H2pAvBcv5fiCGQfbMbRw89lQMA\"",
		"mtime": "2026-10-13T12:03:05.752Z",
		"size": 164,
		"path": "../public/assets/planos-Sc9t2ycb.js"
	},
	"/assets/layers-BHt7oUqU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a5-VEE7MBx36EeV76ORlW4ZBjX5iEU\"",
		"mtime": "2026-10-13T12:03:05.751Z",
		"size": 421,
		"path": "../public/assets/layers-BHt7oUqU.js"
	},
	"/assets/planos-B3tABhw5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2b96-11QInc5FCFlahrHboxgjoBAxKTc\"",
		"mtime": "2026-10-13T12:03:05.751Z",
		"size": 11158,
		"path": "../public/assets/planos-B3tABhw5.js"
	},
	"/assets/plus-CK5_0ous.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99-2+n67wU2592DEqxWenmrt9AhuAE\"",
		"mtime": "2026-10-13T12:03:05.752Z",
		"size": 153,
		"path": "../public/assets/plus-CK5_0ous.js"
	},
	"/assets/player-Ca5j_paw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2ffb-+F8yh+31ZHC7jE79h425FmynQFE\"",
		"mtime": "2026-10-13T12:03:05.752Z",
		"size": 12283,
		"path": "../public/assets/player-Ca5j_paw.js"
	},
	"/assets/planos-DoMwGvFP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b7-5oM40dptg1ZSPeNPn1bvHx89VXY\"",
		"mtime": "2026-10-13T12:03:05.751Z",
		"size": 183,
		"path": "../public/assets/planos-DoMwGvFP.js"
	},
	"/assets/react-yIOJJ3r4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"20d2-kVhPh4bAQsY8cpxNQjSFv8q1v2A\"",
		"mtime": "2026-10-13T12:03:05.753Z",
		"size": 8402,
		"path": "../public/assets/react-yIOJJ3r4.js"
	},
	"/assets/refresh-cw-BVYdCPl3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"141-N5HomBB+2zrwqZi95HqvSLKmsHo\"",
		"mtime": "2026-10-13T12:03:05.753Z",
		"size": 321,
		"path": "../public/assets/refresh-cw-BVYdCPl3.js"
	},
	"/assets/routes-BAg8GVUi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a4e-TLrmMZdNjBZrEu0Y6FEyjb0NG+4\"",
		"mtime": "2026-10-13T12:03:05.753Z",
		"size": 2638,
		"path": "../public/assets/routes-BAg8GVUi.js"
	},
	"/assets/server-BlF7IxQk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"152-kyTietkyyrtUyPEGOuPFYnvXdDg\"",
		"mtime": "2026-10-13T12:03:05.753Z",
		"size": 338,
		"path": "../public/assets/server-BlF7IxQk.js"
	},
	"/assets/settings-2GH6wj7X.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e7-sOaDfOv51oRTi3NbvmJ6OoPbH20\"",
		"mtime": "2026-10-13T12:03:05.754Z",
		"size": 487,
		"path": "../public/assets/settings-2GH6wj7X.js"
	},
	"/assets/shield-check-Djzt63kg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"140-Hb6+ImKYLTyMKORxqiB5jj8pGMk\"",
		"mtime": "2026-10-13T12:03:05.754Z",
		"size": 320,
		"path": "../public/assets/shield-check-Djzt63kg.js"
	},
	"/assets/source-form-DTsf1FSq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c12-KeprUp/pcYZbTjJoXA1sEgUBfrU\"",
		"mtime": "2026-10-13T12:03:05.754Z",
		"size": 3090,
		"path": "../public/assets/source-form-DTsf1FSq.js"
	},
	"/assets/styles-C7vziX5T.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"13b0e-nbeCXJixFvXrccUdClSaYWASbCc\"",
		"mtime": "2026-10-13T12:03:05.756Z",
		"size": 80654,
		"path": "../public/assets/styles-C7vziX5T.css"
	},
	"/assets/switch-BlIDOPCg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12dd-HOkBxb4TFGtLo5e2XUl+sBvu9Lc\"",
		"mtime": "2026-10-13T12:03:05.755Z",
		"size": 4829,
		"path": "../public/assets/switch-BlIDOPCg.js"
	},
	"/assets/tv-DUoZ45GY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b9-Yl7pEzPwu1yVSQECCLU2wh50XQg\"",
		"mtime": "2026-10-13T12:03:05.755Z",
		"size": 185,
		"path": "../public/assets/tv-DUoZ45GY.js"
	},
	"/assets/useBaseQuery-DKrMphAb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f24-pyTouiyGAjpR3MBHM4WyVaU+CUI\"",
		"mtime": "2026-10-13T12:03:05.755Z",
		"size": 7972,
		"path": "../public/assets/useBaseQuery-DKrMphAb.js"
	},
	"/assets/useServerFn-uYZWqhsU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"167-LoH3aSGZhcq1eXtCGbzc5/V2mEE\"",
		"mtime": "2026-10-13T12:03:05.756Z",
		"size": 359,
		"path": "../public/assets/useServerFn-uYZWqhsU.js"
	},
	"/assets/hls-BhcDaTqf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8c546-hnGn8vIsciiCtsWkmKZ1VwsqkPQ\"",
		"mtime": "2026-10-13T12:03:05.750Z",
		"size": 574790,
		"path": "../public/assets/hls-BhcDaTqf.js"
	},
	"/assets/utils-4jUIYOBc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6bed-90NGITyc+kEKvxUkUtkYHgO1XH4\"",
		"mtime": "2026-10-13T12:03:05.756Z",
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
