import { deleteCookie, getCookie, setCookie } from "@tanstack/react-start/server";
import { signJwt, verifyJwt } from "./crypto.server";
import { q1, ready, sweepExpired } from "./db.server";
import { isProduction } from "./env.server";

const COOKIE = "maxon_session";
const TTL = 8 * 60 * 60;

export type AdminUser = { id: string; name: string; email: string; role: "admin" | "vendedor" };

export function startSession(user: AdminUser) {
  setCookie(COOKIE, signJwt({ sub: user.id, typ: "admin", role: user.role }, TTL), {
    httpOnly: true,
    sameSite: "lax",
    secure: isProduction(),
    path: "/",
    maxAge: TTL,
  });
}
export function endSession() {
  deleteCookie(COOKIE, { path: "/" });
}

export async function currentAdmin(): Promise<AdminUser | null> {
  const t = getCookie(COOKIE);
  if (!t) return null;
  const p = verifyJwt(t, "admin");
  if (!p) return null;
  await ready();
  const u = await q1<AdminUser>(
    "SELECT id, name, email, role FROM admin_users WHERE id=$1 AND active",
    [p.sub],
  );
  return u ?? null;
}

export class AuthError extends Error {}

/** Exige sessão e (opcional) papel. Lança erro legível para o painel. */
export async function requireAdmin(
  roles: AdminUser["role"][] = ["admin", "vendedor"],
): Promise<AdminUser> {
  const u = await currentAdmin();
  if (!u) throw new AuthError("Sessão expirada. Faça login novamente.");
  if (!roles.includes(u.role)) throw new AuthError("Permissão insuficiente para esta ação.");
  await sweepExpired();
  return u;
}