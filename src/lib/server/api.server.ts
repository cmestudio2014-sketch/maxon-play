import type { z } from "zod";
import { corsOrigins } from "./env.server";
import { rateLimit } from "./ratelimit.server";
import { verifyJwt } from "./crypto.server";
import { ready, sweepExpired } from "./db.server";

export function corsHeaders(request: Request): Record<string, string> {
  const origins = corsOrigins();
  const origin = request.headers.get("origin") ?? "";
  const allow = origins.includes("*") ? "*" : origins.includes(origin) ? origin : "";
  const h: Record<string, string> = {
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Max-Age": "600",
    Vary: "Origin",
  };
  if (allow) h["Access-Control-Allow-Origin"] = allow;
  return h;
}

export function ok(request: Request, data: unknown, status = 200): Response {
  return Response.json(
    { ok: true, data },
    { status, headers: { ...corsHeaders(request), "Cache-Control": "no-store" } },
  );
}
export function fail(
  request: Request,
  status: number,
  code: string,
  message: string,
  extra: Record<string, string> = {},
): Response {
  return Response.json(
    { ok: false, error: { code, message } },
    { status, headers: { ...corsHeaders(request), "Cache-Control": "no-store", ...extra } },
  );
}
export function preflight(request: Request): Response {
  return new Response(null, { status: 204, headers: corsHeaders(request) });
}

export function clientIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0] ??
    request.headers.get("x-real-ip") ??
    "local"
  ).trim();
}

/** Envolve um handler da API: rate limit, preparo do banco e erros padronizados. */
export async function apiHandler(
  request: Request,
  bucket: string,
  limit: number,
  fn: () => Promise<Response>,
): Promise<Response> {
  const rl = rateLimit(`${bucket}:${clientIp(request)}`, limit, 60_000);
  if (!rl.ok)
    return fail(request, 429, "RATE_LIMITED", "Muitas requisições. Tente novamente em instantes.", {
      "Retry-After": String(rl.retryAfter),
    });
  try {
    await ready();
    await sweepExpired();
    return await fn();
  } catch (e) {
    console.error(`[api:${bucket}]`, (e as Error).message);
    return fail(request, 500, "INTERNAL", "Erro interno.");
  }
}

export async function parseBody<T extends z.ZodTypeAny>(
  request: Request,
  schema: T,
): Promise<{ data: z.infer<T> } | { error: string }> {
  let raw: unknown;
  try {
    const text = await request.text();
    if (text.length > 8_192) return { error: "Payload muito grande." };
    raw = text ? JSON.parse(text) : {};
  } catch {
    return { error: "JSON inválido." };
  }
  const r = schema.safeParse(raw);
  if (!r.success)
    return { error: r.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; ") };
  return { data: r.data };
}

export function deviceFromAuth(request: Request): string | null {
  const h = request.headers.get("authorization") ?? "";
  const m = /^Bearer\s+(.+)$/i.exec(h);
  if (!m?.[1]) return null;
  const p = verifyJwt(m[1], "device");
  return p ? p.sub : null;
}