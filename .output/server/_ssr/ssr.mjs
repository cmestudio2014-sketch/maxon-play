//#region node_modules/.nitro/vite/services/ssr/index.js
var lastCapturedError;
var TTL_MS = 5e3;
function record(error) {
	lastCapturedError = {
		error,
		at: Date.now()
	};
}
var CAUSE_DEPTH_LIMIT = 5;
var DESCRIPTION_LENGTH_LIMIT = 8e3;
function describeError(error) {
	const parts = [];
	let current = error;
	for (let depth = 0; depth < CAUSE_DEPTH_LIMIT && current != null; depth++) {
		if (!(current instanceof Error)) {
			parts.push(typeof current === "string" ? current : safeStringify(current));
			break;
		}
		const label = depth === 0 ? "" : "caused by: ";
		const status = describeStatus(current);
		parts.push(`${label}${current.stack ?? `${current.name}: ${current.message}`}${status}`);
		current = current.cause;
	}
	return parts.join("\n").slice(0, DESCRIPTION_LENGTH_LIMIT);
}
function describeStatus(error) {
	const { status, statusCode } = error;
	const value = status ?? statusCode;
	return typeof value === "number" ? ` (status ${value})` : "";
}
function safeStringify(value) {
	try {
		return JSON.stringify(value) ?? String(value);
	} catch {
		return String(value);
	}
}
function isErrorLike(value) {
	return value instanceof Error;
}
var originalConsoleError = console.error.bind(console);
console.error = (...args) => {
	originalConsoleError(...args.map((arg) => {
		if (!isErrorLike(arg)) return arg;
		record(arg);
		return describeError(arg);
	}));
};
if (typeof globalThis.addEventListener === "function") {
	globalThis.addEventListener("error", (event) => record(event.error ?? event));
	globalThis.addEventListener("unhandledrejection", (event) => record(event.reason));
}
function consumeLastCapturedError() {
	if (!lastCapturedError) return void 0;
	if (Date.now() - lastCapturedError.at > TTL_MS) {
		lastCapturedError = void 0;
		return;
	}
	const { error } = lastCapturedError;
	lastCapturedError = void 0;
	return error;
}
function renderErrorPage() {
	return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>This page didn't load</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body { font: 15px/1.5 system-ui, -apple-system, sans-serif; background: #fafafa; color: #111; display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 1.5rem; }
      .card { max-width: 28rem; width: 100%; text-align: center; padding: 2rem; }
      h1 { font-size: 1.25rem; margin: 0 0 0.5rem; }
      p { color: #4b5563; margin: 0 0 1.5rem; }
      .actions { display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; }
      a, button { padding: 0.5rem 1rem; border-radius: 0.375rem; font: inherit; cursor: pointer; text-decoration: none; border: 1px solid transparent; }
      .primary { background: #111; color: #fff; }
      .secondary { background: #fff; color: #111; border-color: #d1d5db; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>This page didn't load</h1>
      <p>Something went wrong on our end. You can try refreshing or head back home.</p>
      <div class="actions">
        <button class="primary" onclick="location.reload()">Try again</button>
        <a class="secondary" href="/">Go home</a>
      </div>
    </div>
  </body>
</html>`;
}
var serverEntryPromise;
async function getServerEntry() {
	if (!serverEntryPromise) serverEntryPromise = import("./server-DM1CB_zO.mjs").then((m) => m.default ?? m);
	return serverEntryPromise;
}
async function normalizeCatastrophicSsrResponse(response) {
	if (response.status < 500) return response;
	if (!(response.headers.get("content-type") ?? "").includes("application/json")) return response;
	const body = await response.clone().text();
	if (!isH3SwallowedErrorBody(body)) return response;
	console.error(consumeLastCapturedError() ?? /* @__PURE__ */ new Error(`h3 swallowed SSR error: ${body}`));
	return new Response(renderErrorPage(), {
		status: 500,
		headers: { "content-type": "text/html; charset=utf-8" }
	});
}
function isH3SwallowedErrorBody(body) {
	try {
		const payload = JSON.parse(body);
		return payload.unhandled === true && payload.message === "HTTPError";
	} catch {
		return false;
	}
}
var SECURITY_HEADERS = {
	"X-Content-Type-Options": "nosniff",
	"X-Frame-Options": "SAMEORIGIN",
	"Referrer-Policy": "strict-origin-when-cross-origin",
	"Permissions-Policy": "camera=(), microphone=(), geolocation=()",
	"Cross-Origin-Opener-Policy": "same-origin"
};
function withSecurityHeaders(response, request) {
	try {
		const headers = new Headers(response.headers);
		for (const [k, v] of Object.entries(SECURITY_HEADERS)) if (!headers.has(k)) headers.set(k, v);
		if ((request.headers.get("x-forwarded-proto") ?? new URL(request.url).protocol.replace(":", "")) === "https") headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
		return new Response(response.body, {
			status: response.status,
			statusText: response.statusText,
			headers
		});
	} catch {
		return response;
	}
}
async function streamProxy(request) {
	const req = new URL(request.url);
	if (req.pathname !== "/api/stream-proxy") return null;
	const raw = req.searchParams.get("url") ?? "";
	let target;
	try {
		target = new URL(raw);
	} catch {
		return new Response("URL inválida", { status: 400 });
	}
	if (!["http:", "https:"].includes(target.protocol)) return new Response("Protocolo inválido", { status: 400 });
	const host = target.hostname.toLowerCase();
	if (host === "localhost" || host === "0.0.0.0" || host === "::1" || /^127\./.test(host) || /^10\./.test(host) || /^192\.168\./.test(host) || /^169\.254\./.test(host) || /^172\.(1[6-9]|2\d|3[01])\./.test(host)) return new Response("Host não permitido", { status: 403 });
	const headers = {
		"accept": request.headers.get("accept") ?? "*/*",
		"user-agent": request.headers.get("user-agent") ?? "Mozilla/5.0 MAXON-PLAY"
	};
	const range = request.headers.get("range");
	if (range) headers.range = range;
	let upstream;
	try {
		upstream = await fetch(target, {
			headers,
			redirect: "follow",
			signal: AbortSignal.timeout(2e4)
		});
	} catch {
		return new Response("Servidor de origem indisponível", {
			status: 502,
			headers: { "x-maxon-proxy-error": "upstream-fetch" }
		});
	}
	const ct = upstream.headers.get("content-type") ?? "";
	const finalUrl = upstream.url || target.href;
	if ((/mpegurl|application\/vnd\.apple/i.test(ct) || /\.m3u8(?:[?#]|$)/i.test(finalUrl)) && upstream.ok) {
		let body = await upstream.text();
		const proxify = (value) => {
			try {
				return "/api/stream-proxy?url=" + encodeURIComponent(new URL(value, finalUrl).href);
			} catch {
				return value;
			}
		};
		body = body.split(/\r?\n/).map((line) => {
			const s = line.trim();
			if (!s) return line;
			if (!s.startsWith("#")) return proxify(s);
			return line.replace(/URI="([^"]+)"/g, (_m, uri) => "URI=\"" + proxify(uri) + "\"");
		}).join("\n");
		return new Response(body, {
			status: upstream.status,
			headers: {
				"content-type": "application/vnd.apple.mpegurl",
				"cache-control": "no-store",
				"x-maxon-upstream-status": String(upstream.status)
			}
		});
	}
	const out = new Headers();
	for (const h of [
		"content-type",
		"content-length",
		"content-range",
		"accept-ranges",
		"etag",
		"last-modified"
	]) {
		const v = upstream.headers.get(h);
		if (v) out.set(h, v);
	}
	out.set("cache-control", "no-store");
	out.set("x-maxon-upstream-status", String(upstream.status));
	return new Response(upstream.body, {
		status: upstream.status,
		statusText: upstream.statusText,
		headers: out
	});
}
async function streamProbe(request) {
	const req = new URL(request.url);
	if (req.pathname !== "/api/stream-probe") return null;
	const raw = req.searchParams.get("url") ?? "";
	let target;
	try {
		target = new URL(raw);
	} catch {
		return Response.json({
			ok: false,
			error: "URL inválida"
		}, { status: 400 });
	}
	if (!["http:", "https:"].includes(target.protocol)) return Response.json({
		ok: false,
		error: "Protocolo inválido"
	}, { status: 400 });
	const host = target.hostname.toLowerCase();
	if (host === "localhost" || host === "0.0.0.0" || host === "::1" || /^127\./.test(host) || /^10\./.test(host) || /^192\.168\./.test(host) || /^169\.254\./.test(host) || /^172\.(1[6-9]|2\d|3[01])\./.test(host)) return Response.json({
		ok: false,
		error: "Host não permitido"
	}, { status: 403 });
	try {
		const upstream = await fetch(target, {
			headers: {
				range: "bytes=0-65535",
				accept: "*/*",
				"user-agent": request.headers.get("user-agent") ?? "Mozilla/5.0 MAXON-PLAY"
			},
			redirect: "follow",
			signal: AbortSignal.timeout(15e3)
		});
		const ct = upstream.headers.get("content-type") ?? "";
		const buf = upstream.ok ? new Uint8Array(await upstream.arrayBuffer()) : /* @__PURE__ */ new Uint8Array();
		const head = new TextDecoder().decode(buf.slice(0, 256));
		const hls = /mpegurl/i.test(ct) || head.includes("#EXTM3U") || /\.m3u8(?:[?#]|$)/i.test(upstream.url);
		const ts = /mp2t|mpeg-ts/i.test(ct) || buf.length > 188 && buf[0] === 71 && buf[188] === 71;
		const mp4 = /video\/mp4/i.test(ct) || buf.length > 12 && String.fromCharCode(...buf.slice(4, 8)) === "ftyp";
		return Response.json({
			ok: upstream.ok,
			status: upstream.status,
			contentType: ct || "desconhecido",
			format: hls ? "hls" : ts ? "mpegts" : mp4 ? "mp4" : "unknown"
		}, { headers: { "cache-control": "no-store" } });
	} catch (e) {
		const name = e instanceof Error ? e.name : "";
		const message = e instanceof Error ? e.message : "";
		const cause = e instanceof Error && "cause" in e ? String(e.cause ?? "") : "";
		const detail = name === "TimeoutError" || /timeout/i.test(message) ? "timeout" : /ENOTFOUND|EAI_AGAIN|dns/i.test(message + cause) ? "dns" : /ECONNREFUSED|connection refused/i.test(message + cause) ? "connection-refused" : /ECONNRESET|socket|fetch failed/i.test(message + cause) ? "connection-failed" : "upstream-fetch";
		return Response.json({
			ok: false,
			status: 502,
			contentType: "desconhecido",
			format: "unknown",
			detail
		}, {
			status: 200,
			headers: { "cache-control": "no-store" }
		});
	}
}
var server_default = { async fetch(request, env = {}, ctx = {}) {
	try {
		const probed = await streamProbe(request);
		if (probed) return withSecurityHeaders(probed, request);
		const proxied = await streamProxy(request);
		if (proxied) return withSecurityHeaders(proxied, request);
		return withSecurityHeaders(await normalizeCatastrophicSsrResponse(await (await getServerEntry()).fetch(request, env, ctx)), request);
	} catch (error) {
		console.error(error);
		return new Response(renderErrorPage(), {
			status: 500,
			headers: { "content-type": "text/html; charset=utf-8" }
		});
	}
} };
//#endregion
export { server_default as default, renderErrorPage as t };
