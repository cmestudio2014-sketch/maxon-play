import { createServerFn } from "@tanstack/react-start";
import { getRequestIP } from "@tanstack/react-start/server";
import { z } from "zod";
import { q, q1, ready, sweepExpired } from "./server/db.server";
import { hashKey, maskKey } from "./server/crypto.server";
import { rateLimit } from "./server/ratelimit.server";

export type PublicPlan = {
  id: string;
  code: string;
  name: string;
  description: string;
  duration_days: number;
  price_cents: number;
  highlight: boolean;
};

/** Dados públicos: planos ativos + configurações não sensíveis. */
export const getPublicCatalog = createServerFn({ method: "GET" }).handler(async () => {
  await ready();
  const plans = await q<PublicPlan>(
    "SELECT id, code, name, description, duration_days, price_cents, highlight FROM plans WHERE active ORDER BY sort, duration_days",
  );
  const rows = await q<{ key: string; value: string }>(
    "SELECT key, value FROM settings WHERE key IN ('brand_name','whatsapp_number','whatsapp_message','support_hours')",
  );
  const s = Object.fromEntries(rows.map((r) => [r.key, r.value])) as Record<string, string>;
  return {
    plans,
    brand: s["brand_name"] ?? "MAXON PLAY",
    // Só dígitos (wa.me exige DDI+número); fallback para WHATSAPP_NUMBER do ambiente.
    whatsapp: (() => {
      const d = (s["whatsapp_number"] || process.env["WHATSAPP_NUMBER"] || "").replace(/\D/g, "");
      return d.length >= 10 && d.length <= 15 ? d : "";
    })(),
    whatsappMessage: s["whatsapp_message"] ?? "",
    supportHours: s["support_hours"] ?? "",
  };
});

/** Área do cliente: consulta pela KEY. Retorna apenas dados mascarados. */
export const lookupLicense = createServerFn({ method: "POST" })
  .inputValidator((d) => z.object({ key: z.string().trim().min(16).max(24) }).parse(d))
  .handler(async ({ data }) => {
    await ready();
    const ip = getRequestIP({ xForwardedFor: true }) ?? "local";
    if (!rateLimit(`lookup:${ip}`, 10, 60_000).ok)
      return { ok: false as const, error: "Muitas consultas. Aguarde um minuto." };
    await sweepExpired();
    const a = await q1<{
      status: string;
      expires_at: string | null;
      key_last4: string;
      plan: string;
      display_id: string | null;
      platform: string | null;
      model: string | null;
      last_seen_at: string | null;
      customer: string | null;
    }>(
      `SELECT a.status, a.expires_at, a.key_last4, p.name AS plan, d.display_id, d.platform, d.model, d.last_seen_at, c.name AS customer
       FROM activations a JOIN plans p ON p.id=a.plan_id LEFT JOIN devices d ON d.id=a.device_id LEFT JOIN customers c ON c.id=a.customer_id
       WHERE a.key_hash=$1`,
      [hashKey(data.key)],
    );
    if (!a) return { ok: false as const, error: "KEY não encontrada." };
    const firstName = a.customer?.split(" ")[0] ?? null;
    return {
      ok: true as const,
      license: {
        key: maskKey(a.key_last4),
        plan: a.plan,
        status: a.status,
        expires_at: a.expires_at,
        customer: firstName,
        device: a.display_id
          ? {
              id: `${a.display_id.slice(0, 8)}:••:••:••`,
              platform: a.platform,
              model: a.model,
              last_seen_at: a.last_seen_at,
            }
          : null,
      },
    };
  });