import { createCipheriv, createDecipheriv, createHash, randomBytes } from "node:crypto";
import { env, isProduction } from "./env.server";
import { q1 } from "./db.server";

export type SourcePayload =
  | { type: "m3u"; m3u_url: string; epg_url?: string }
  | { type: "xtream"; server: string; username: string; password: string };

function encKey(): Buffer {
  const k = env("CONFIG_ENCRYPTION_KEY");
  if (k && k.length >= 32) return createHash("sha256").update(k).digest();
  if (isProduction())
    throw new Error("CONFIG_ENCRYPTION_KEY ausente ou curta (mín. 32 caracteres) em produção.");
  // Apenas desenvolvimento/preview. NUNCA usado em produção.
  return createHash("sha256").update("maxon-dev-only-config-key").digest();
}

export function encryptPayload(p: SourcePayload): string {
  const iv = randomBytes(12);
  const c = createCipheriv("aes-256-gcm", encKey(), iv);
  const data = Buffer.concat([c.update(JSON.stringify(p), "utf8"), c.final()]);
  return `v1.${iv.toString("base64")}.${c.getAuthTag().toString("base64")}.${data.toString("base64")}`;
}
export function decryptPayload(s: string): SourcePayload {
  const [v, iv, tag, data] = s.split(".");
  if (v !== "v1" || !iv || !tag || !data) throw new Error("payload inválido");
  const d = createDecipheriv("aes-256-gcm", encKey(), Buffer.from(iv, "base64"));
  d.setAuthTag(Buffer.from(tag, "base64"));
  return JSON.parse(
    Buffer.concat([d.update(Buffer.from(data, "base64")), d.final()]).toString("utf8"),
  ) as SourcePayload;
}

/** Texto seguro para exibir no painel (sem senha, sem caminho/token da URL). */
export function displayHint(p: SourcePayload): string {
  try {
    if (p.type === "m3u") return `M3U · ${new URL(p.m3u_url).host}`;
    const u = p.username;
    return `Xtream · ${new URL(p.server).host} · ${u.slice(0, 2)}${"•".repeat(Math.max(2, u.length - 2))}`;
  } catch {
    return p.type === "m3u" ? "M3U" : "Xtream";
  }
}

type Resolved =
  { id: string; type: string; payload_enc: string; version: number; rev: string } | undefined;

/** Fonte efetiva do dispositivo: atribuição direta ao aparelho > atribuição à ativação. */
async function resolve(deviceId: string): Promise<Resolved> {
  return q1(
    `SELECT s.id, s.type, s.payload_enc, s.version, (d.config_rev || '-' || coalesce(a.config_rev,0)) AS rev
     FROM devices d
     LEFT JOIN LATERAL (SELECT id, source_id, config_rev FROM activations WHERE device_id=d.id AND status='ativa' AND expires_at > now() ORDER BY expires_at DESC LIMIT 1) a ON true
     JOIN sources s ON s.id = coalesce(d.source_id, a.source_id)
     WHERE d.id=$1`,
    [deviceId],
  );
}

/** Versão da configuração (muda quando a fonte é alterada/atribuída/removida). Não revela dados. */
export async function configVersion(deviceId: string, licensed: boolean): Promise<string> {
  if (!licensed) return "none";
  const r = await resolve(deviceId);
  if (!r) return "none";
  return createHash("sha256").update(`${r.id}:${r.version}:${r.rev}`).digest("hex").slice(0, 16);
}

/** Configuração completa — chamar somente após confirmar licença ativa do dispositivo. */
export async function deviceConfig(
  deviceId: string,
): Promise<{ config_version: string; source: SourcePayload | null }> {
  const r = await resolve(deviceId);
  if (!r) return { config_version: "none", source: null };
  return {
    config_version: createHash("sha256")
      .update(`${r.id}:${r.version}:${r.rev}`)
      .digest("hex")
      .slice(0, 16),
    source: decryptPayload(r.payload_enc),
  };
}