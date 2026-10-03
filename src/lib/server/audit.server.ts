import { q } from "./db.server";

const SENSITIVE = /key|password|senha|token|secret/i;

/** Remove qualquer campo sensível antes de gravar no log. */
function scrub(d: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(d)) {
    if (SENSITIVE.test(k) && k !== "key_last4") out[k] = "[oculto]";
    else out[k] = v;
  }
  return out;
}

export async function audit(e: {
  actorType: "admin" | "device" | "system" | "public";
  actorId?: string | null;
  actorLabel?: string | null;
  action: string;
  entity?: string;
  entityId?: string | null;
  details?: Record<string, unknown>;
}): Promise<void> {
  try {
    await q(
      "INSERT INTO audit_logs(actor_type,actor_id,actor_label,action,entity,entity_id,details) VALUES ($1,$2,$3,$4,$5,$6,$7::jsonb)",
      [
        e.actorType,
        e.actorId ?? null,
        e.actorLabel ?? null,
        e.action,
        e.entity ?? null,
        e.entityId ?? null,
        JSON.stringify(scrub(e.details ?? {})),
      ],
    );
  } catch (err) {
    console.error("[audit] falha ao gravar", (err as Error).message);
  }
}