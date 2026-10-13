import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

const SECURITY_HEADERS: Record<string, string> = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "SAMEORIGIN",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "Cross-Origin-Opener-Policy": "same-origin",
};

function withSecurityHeaders(response: Response, request: Request): Response {
  try {
    const headers = new Headers(response.headers);
    for (const [k, v] of Object.entries(SECURITY_HEADERS)) if (!headers.has(k)) headers.set(k, v);
    const proto =
      request.headers.get("x-forwarded-proto") ?? new URL(request.url).protocol.replace(":", "");
    if (proto === "https")
      headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  } catch {
    return response;
  }
}


async function streamProxy(request: Request): Promise<Response | null> {
  const req = new URL(request.url);
  if (req.pathname !== "/api/stream-proxy") return null;
  const raw = req.searchParams.get("url") ?? "";
  let target: URL;
  try { target = new URL(raw); } catch { return new Response("URL inválida", { status: 400 }); }
  if (!["http:", "https:"].includes(target.protocol)) return new Response("Protocolo inválido", { status: 400 });

  const host = target.hostname.toLowerCase();
  if (host === "localhost" || host === "0.0.0.0" || host === "::1" ||
      /^127\./.test(host) || /^10\./.test(host) || /^192\.168\./.test(host) ||
      /^169\.254\./.test(host) || /^172\.(1[6-9]|2\d|3[01])\./.test(host)) {
    return new Response("Host não permitido", { status: 403 });
  }

  const headers: Record<string,string> = {
    "accept": request.headers.get("accept") ?? "*/*",
    "user-agent": request.headers.get("user-agent") ?? "Mozilla/5.0 MAXON-PLAY",
  };
  const range = request.headers.get("range");
  if (range) headers.range = range;

  let upstream: Response;
  try {
    upstream = await fetch(target, { headers, redirect: "follow", signal: AbortSignal.timeout(20000) });
  } catch {
    return new Response("Servidor de origem indisponível", {
      status: 502,
      headers: { "x-maxon-proxy-error": "upstream-fetch" },
    });
  }

  const ct = upstream.headers.get("content-type") ?? "";
  const finalUrl = upstream.url || target.href;
  const isPlaylist = /mpegurl|application\/vnd\.apple/i.test(ct) || /\.m3u8(?:[?#]|$)/i.test(finalUrl);

  if (isPlaylist && upstream.ok) {
    let body = await upstream.text();
    const proxify = (value: string) => {
      try { return "/api/stream-proxy?url=" + encodeURIComponent(new URL(value, finalUrl).href); }
      catch { return value; }
    };
    body = body.split(/\r?\n/).map((line) => {
      const s = line.trim();
      if (!s) return line;
      if (!s.startsWith("#")) return proxify(s);
      return line.replace(/URI="([^"]+)"/g, (_m, uri: string) => 'URI="' + proxify(uri) + '"');
    }).join("\n");
    return new Response(body, {
      status: upstream.status,
      headers: {
        "content-type": "application/vnd.apple.mpegurl",
        "cache-control": "no-store",
        "x-maxon-upstream-status": String(upstream.status),
      },
    });
  }

  const out = new Headers();
  for (const h of ["content-type","content-length","content-range","accept-ranges","etag","last-modified"]) {
    const v = upstream.headers.get(h); if (v) out.set(h, v);
  }
  out.set("cache-control", "no-store");
  out.set("x-maxon-upstream-status", String(upstream.status));
  return new Response(upstream.body, { status: upstream.status, statusText: upstream.statusText, headers: out });
}

async function streamProbe(request: Request): Promise<Response | null> {
  const req = new URL(request.url);
  if (req.pathname !== "/api/stream-probe") return null;
  const raw = req.searchParams.get("url") ?? "";
  let target: URL;
  try { target = new URL(raw); } catch { return Response.json({ ok: false, error: "URL inválida" }, { status: 400 }); }
  if (!["http:", "https:"].includes(target.protocol)) return Response.json({ ok: false, error: "Protocolo inválido" }, { status: 400 });
  const host = target.hostname.toLowerCase();
  if (host === "localhost" || host === "0.0.0.0" || host === "::1" || /^127\./.test(host) || /^10\./.test(host) || /^192\.168\./.test(host) || /^169\.254\./.test(host) || /^172\.(1[6-9]|2\d|3[01])\./.test(host))
    return Response.json({ ok: false, error: "Host não permitido" }, { status: 403 });
  try {
    const upstream = await fetch(target, {
      headers: { range: "bytes=0-65535", accept: "*/*", "user-agent": request.headers.get("user-agent") ?? "Mozilla/5.0 MAXON-PLAY" },
      redirect: "follow", signal: AbortSignal.timeout(15000),
    });
    const ct = upstream.headers.get("content-type") ?? "";
    const buf = upstream.ok ? new Uint8Array(await upstream.arrayBuffer()) : new Uint8Array();
    const head = new TextDecoder().decode(buf.slice(0, 256));
    const hls = /mpegurl/i.test(ct) || head.includes("#EXTM3U") || /\.m3u8(?:[?#]|$)/i.test(upstream.url);
    const ts = /mp2t|mpeg-ts/i.test(ct) || (buf.length > 188 && buf[0] === 0x47 && buf[188] === 0x47);
    const mp4 = /video\/mp4/i.test(ct) || (buf.length > 12 && String.fromCharCode(...buf.slice(4, 8)) === "ftyp");
    return Response.json({ ok: upstream.ok, status: upstream.status, contentType: ct || "desconhecido", format: hls ? "hls" : ts ? "mpegts" : mp4 ? "mp4" : "unknown" }, { headers: { "cache-control": "no-store" } });
  } catch (e) {
    const name = e instanceof Error ? e.name : "";
    const message = e instanceof Error ? e.message : "";
    const cause = e instanceof Error && "cause" in e ? String((e as Error & { cause?: unknown }).cause ?? "") : "";
    const detail = name === "TimeoutError" || /timeout/i.test(message)
      ? "timeout"
      : /ENOTFOUND|EAI_AGAIN|dns/i.test(message + cause)
        ? "dns"
        : /ECONNREFUSED|connection refused/i.test(message + cause)
          ? "connection-refused"
          : /ECONNRESET|socket|fetch failed/i.test(message + cause)
            ? "connection-failed"
            : "upstream-fetch";
    return Response.json({ ok: false, status: 502, contentType: "desconhecido", format: "unknown", detail }, { status: 200, headers: { "cache-control": "no-store" } });
  }
}

export default {
  async fetch(
    request: Request,
    env: unknown = {},
    ctx: unknown = {}
  ) {
    try {
      const probed = await streamProbe(request);
      if (probed) return withSecurityHeaders(probed, request);
      const proxied = await streamProxy(request);
      if (proxied) return withSecurityHeaders(proxied, request);
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return withSecurityHeaders(await normalizeCatastrophicSsrResponse(response), request);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};