import { q, q1 } from "./db.server";
import { env } from "./env.server";
import { hashPassword } from "./crypto.server";
import { audit } from "./audit.server";

/** Cria o primeiro admin a partir de ADMIN_EMAIL/ADMIN_PASSWORD (somente se não houver admin). */
export async function bootstrapAdmin(): Promise<void> {
  const email = env("ADMIN_EMAIL")?.toLowerCase();
  const password = env("ADMIN_PASSWORD");
  if (!email || !password) return;
  const existing = await q1<{ n: string }>(
    "SELECT count(*)::text AS n FROM admin_users WHERE role='admin'",
  );
  if (existing && Number(existing.n) > 0) return;
  if (password.length < 10) {
    console.warn("[bootstrap] ADMIN_PASSWORD precisa ter 10+ caracteres; admin não criado.");
    return;
  }
  const hash = await hashPassword(password);
  await q(
    "INSERT INTO admin_users(name,email,password_hash,role) VALUES ($1,$2,$3,'admin') ON CONFLICT (email) DO NOTHING",
    [env("ADMIN_NAME") ?? "Administrador", email, hash],
  );
  await audit({
    actorType: "system",
    action: "admin.bootstrap",
    entity: "admin_user",
    details: { email },
  });
  console.log(`[bootstrap] Admin inicial criado: ${email}`);
}

export async function hasAnyAdmin(): Promise<boolean> {
  const r = await q1<{ n: string }>("SELECT count(*)::text AS n FROM admin_users");
  return !!r && Number(r.n) > 0;
}