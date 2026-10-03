// Cliente da API /api/v1 para o Web Player (mesmo contrato dos apps Android TV/Tizen).
// Chamar somente em efeitos/eventos do navegador.

export type DeviceStatus = {
  device_id: string;
  platform: string;
  status: "nao_ativado" | "ativo" | "expirado" | "bloqueado";
  license: { plan: string; expires_at: string | null; days_left: number; key: string } | null;
  config_version: string;
  token?: string;
};
export type SourceConfig =
  | { type: "m3u"; m3u_url: string; epg_url?: string }
  | { type: "xtream"; server: string; username: string; password: string };

const UID_KEY = "maxon.device_uid";
const TOKEN_KEY = "maxon.device_token";

export function deviceUid(): string {
  let id = localStorage.getItem(UID_KEY);
  if (!id) {
    id = `web-${crypto.randomUUID()}`;
    localStorage.setItem(UID_KEY, id);
  }
  return id;
}

async function call<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = sessionStorage.getItem(TOKEN_KEY);
  const res = await fetch(`/api/v1${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init.headers ?? {}),
    },
  });
  const body = (await res.json().catch(() => null)) as {
    ok: boolean;
    data?: T;
    error?: { code: string; message: string };
  } | null;
  if (!body?.ok)
    throw Object.assign(new Error(body?.error?.message ?? "Falha de comunicação."), {
      code: body?.error?.code ?? "NETWORK",
      status: res.status,
    });
  return body.data as T;
}

export async function register(): Promise<DeviceStatus> {
  const d = await call<DeviceStatus>("/device/register", {
    method: "POST",
    body: JSON.stringify({
      device_uid: deviceUid(),
      platform: "web",
      model: navigator.userAgent.slice(0, 60),
      app_version: "web-1.0",
    }),
  });
  if (d.token) sessionStorage.setItem(TOKEN_KEY, d.token);
  return d;
}
export async function activate(key: string) {
  return call<DeviceStatus>("/activation/activate", {
    method: "POST",
    body: JSON.stringify({ key }),
  });
}
export async function heartbeat(): Promise<DeviceStatus> {
  try {
    const d = await call<DeviceStatus>("/device/heartbeat", { method: "POST", body: "{}" });
    if (d.token) sessionStorage.setItem(TOKEN_KEY, d.token);
    return d;
  } catch (e) {
    if ((e as { status?: number }).status === 401) return register();
    throw e;
  }
}
export async function fetchConfig() {
  return call<{ config_version: string; source: SourceConfig | null }>("/device/config");
}