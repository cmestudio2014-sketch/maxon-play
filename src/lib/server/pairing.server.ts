import { randomInt } from "node:crypto";
import { q, q1 } from "./db.server";

const TTL_MINUTES = 10;

function newCode() {
  return String(randomInt(0, 1_000_000)).padStart(6, "0");
}

export async function issuePairingCode(deviceId: string) {
  await q("UPDATE tv_pairing_codes SET status='cancelado' WHERE device_id=$1 AND status='pendente'", [deviceId]);
  for (let i = 0; i < 8; i++) {
    const code = newCode();
    try {
      const row = await q1<{ code: string; expires_at: string }>(
        `INSERT INTO tv_pairing_codes(device_id,code,expires_at)
         VALUES ($1,$2,now() + interval '${TTL_MINUTES} minutes') RETURNING code, expires_at`,
        [deviceId, code],
      );
      return row!;
    } catch (e) {
      if (i === 7) throw e;
    }
  }
  throw new Error("Não foi possível gerar o código da TV.");
}

export async function pairingStatus(deviceId: string, code: string) {
  const row = await q1<{ status: string; expires_at: string; activation_id: string | null }>(
    `SELECT status, expires_at, activation_id FROM tv_pairing_codes
     WHERE device_id=$1 AND code=$2 ORDER BY created_at DESC LIMIT 1`,
    [deviceId, code],
  );
  if (!row) return { status: "invalido" as const };
  if (row.status === "pendente" && new Date(row.expires_at).getTime() <= Date.now()) {
    await q("UPDATE tv_pairing_codes SET status='expirado' WHERE device_id=$1 AND code=$2", [deviceId, code]);
    return { status: "expirado" as const };
  }
  return { status: row.status, activation_id: row.activation_id };
}
