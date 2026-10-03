import { q, q1 } from "./db.server";
import { displayIdFor, hashKey, maskKey, signJwt } from "./crypto.server";
import { audit } from "./audit.server";

export const DEVICE_TOKEN_TTL = 15 * 60; // 15 minutos

export type DeviceRow = {
  id: string;
  device_uid: string;
  display_id: string;
  platform: string;
  model: string;
  status: string;
};
export type ActivationRow = {
  id: string;
  status: string;
  expires_at: string | null;
  device_id: string | null;
  key_last4: string;
  plan_name: string;
  duration_days: number;
  customer_status: string | null;
};

export async function registerDevice(input: {
  deviceUid: string;
  platform: string;
  model: string;
  appVersion: string;
}) {
  const display = displayIdFor(input.deviceUid);
  const row = await q1<DeviceRow>(
    `INSERT INTO devices(device_uid,display_id,platform,model,app_version,last_seen_at)
     VALUES ($1,$2,$3,$4,$5,now())
     ON CONFLICT (device_uid) DO UPDATE SET model=EXCLUDED.model, app_version=EXCLUDED.app_version, last_seen_at=now()
     RETURNING id, device_uid, display_id, platform, model, status`,
    [input.deviceUid, display, input.platform, input.model, input.appVersion],
  );
  return row!;
}

export async function getDevice(id: string) {
  return q1<DeviceRow>(
    "SELECT id, device_uid, display_id, platform, model, status FROM devices WHERE id=$1",
    [id],
  );
}

export async function activeLicenseFor(deviceId: string) {
  return q1<ActivationRow>(
    `SELECT a.id, a.status, a.expires_at, a.device_id, a.key_last4, p.name AS plan_name, p.duration_days, c.status AS customer_status
     FROM activations a JOIN plans p ON p.id=a.plan_id LEFT JOIN customers c ON c.id=a.customer_id
     WHERE a.device_id=$1 ORDER BY (a.status='ativa') DESC, a.expires_at DESC NULLS LAST LIMIT 1`,
    [deviceId],
  );
}

export function deviceStatusPayload(dev: DeviceRow, lic: ActivationRow | undefined) {
  const now = Date.now();
  const exp = lic?.expires_at ? new Date(lic.expires_at).getTime() : null;
  let status: "nao_ativado" | "ativo" | "expirado" | "bloqueado" = "nao_ativado";
  if (dev.status === "bloqueado") status = "bloqueado";
  else if (lic) {
    if (lic.status === "bloqueada" || lic.customer_status === "bloqueado") status = "bloqueado";
    else if (lic.status === "ativa" && exp && exp > now) status = "ativo";
    else if (lic.status === "ativa" || lic.status === "expirada") status = "expirado";
  }
  return {
    device_id: dev.display_id,
    platform: dev.platform,
    status,
    license: lic
      ? {
          plan: lic.plan_name,
          expires_at: lic.expires_at,
          days_left: exp ? Math.max(0, Math.ceil((exp - now) / 86_400_000)) : 0,
          key: maskKey(lic.key_last4),
        }
      : null,
  };
}

export function deviceToken(deviceId: string) {
  return {
    token: signJwt({ sub: deviceId, typ: "device" }, DEVICE_TOKEN_TTL),
    expires_in: DEVICE_TOKEN_TTL,
  };
}

type KeyLookup = {
  id: string;
  status: string;
  device_id: string | null;
  expires_at: string | null;
  duration_days: number;
  key_last4: string;
  customer_status: string | null;
};
export async function findByKey(key: string) {
  return q1<KeyLookup>(
    `SELECT a.id, a.status, a.device_id, a.expires_at, p.duration_days, a.key_last4, c.status AS customer_status
     FROM activations a JOIN plans p ON p.id=a.plan_id LEFT JOIN customers c ON c.id=a.customer_id WHERE a.key_hash=$1`,
    [hashKey(key)],
  );
}

export function keyProblem(
  a: KeyLookup | undefined,
  deviceId: string,
): { code: string; message: string } | null {
  if (!a) return { code: "KEY_INVALID", message: "KEY inválida." };
  if (a.status === "bloqueada" || a.customer_status === "bloqueado")
    return { code: "KEY_BLOCKED", message: "KEY bloqueada. Fale com o suporte." };
  if (a.status === "expirada" || (a.expires_at && new Date(a.expires_at).getTime() < Date.now()))
    return { code: "KEY_EXPIRED", message: "KEY expirada. Renove seu plano." };
  if (a.device_id && a.device_id !== deviceId)
    return { code: "KEY_IN_USE", message: "KEY já vinculada a outro dispositivo." };
  return null;
}

/** Vincula a KEY ao dispositivo (1 licença por dispositivo). Inicia validade se pendente. */
export async function activateKey(a: KeyLookup, deviceId: string, ip: string) {
  if (a.status === "pendente") {
    await q(
      `UPDATE activations SET device_id=$2, status='ativa', starts_at=now(), expires_at=now() + ($3 || ' days')::interval, updated_at=now() WHERE id=$1`,
      [a.id, deviceId, String(a.duration_days)],
    );
  } else {
    await q("UPDATE activations SET device_id=$2, updated_at=now() WHERE id=$1", [a.id, deviceId]);
  }
  // Política: uma licença ativa por dispositivo — desvincula outras licenças do mesmo aparelho.
  await q(
    "UPDATE activations SET device_id=NULL, updated_at=now() WHERE device_id=$1 AND id<>$2 AND status<>'ativa'",
    [deviceId, a.id],
  );
  await audit({
    actorType: "device",
    actorId: deviceId,
    action: "activation.activate",
    entity: "activation",
    entityId: a.id,
    details: { key_last4: a.key_last4, ip_prefix: ip.split(".").slice(0, 2).join(".") },
  });
}

/** Status + config_version (sem segredos). Licença inativa => config_version "none" (acesso revogado). */
export async function statusWithConfig(dev: DeviceRow) {
  const { configVersion } = await import("./sources.server");
  const payload = deviceStatusPayload(dev, await activeLicenseFor(dev.id));
  return { ...payload, config_version: await configVersion(dev.id, payload.status === "ativo") };
}