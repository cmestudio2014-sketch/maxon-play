import { isIP, createConnection } from "node:net";
import { lookup } from "node:dns/promises";

function isPrivateAddress(ip: string): boolean {
  const v = ip.toLowerCase().split("%")[0] ?? "";
  if (v === "::1" || v === "::" || v.startsWith("fe8") || v.startsWith("fe9") ||
      v.startsWith("fea") || v.startsWith("feb") || v.startsWith("fc") ||
      v.startsWith("fd") || v.startsWith("ff")) return true;
  if (v.startsWith("::ffff:")) return isPrivateAddress(v.slice(7));
  const p = v.split(".").map(Number);
  if (p.length !== 4 || p.some(n => !Number.isInteger(n) || n < 0 || n > 255)) return true;
  return (p[0] ?? NaN) === 0 || (p[0] ?? NaN) === 10 || (p[0] ?? NaN) === 127 || (p[0] ?? NaN) >= 224 ||
    ((p[0] ?? NaN) === 169 && (p[1] ?? NaN) === 254) || ((p[0] ?? NaN) === 172 && (p[1] ?? NaN) >= 16 && (p[1] ?? NaN) <= 31) ||
    ((p[0] ?? NaN) === 192 && (p[1] ?? NaN) === 168) || ((p[0] ?? NaN) === 100 && (p[1] ?? NaN) >= 64 && (p[1] ?? NaN) <= 127);
}

export function validateHost(host: string): string {
  const h = host.trim().replace(/^\[|\]$/g, "").replace(/\.$/, "").toLowerCase();
  if (!h || h.length > 253 || /[^a-z0-9.:-]/i.test(h) || h.includes("://") ||
      h.includes("/") || h.includes("@") || h.includes(" ")) {
    throw new Error("Informe um domínio ou IP válido, sem protocolo ou caminho.");
  }
  if (isIP(h) && isPrivateAddress(h)) throw new Error("Endereço local ou reservado não permitido.");
  return h;
}

export async function testServer(hostInput: string, port: number, protocol: string) {
  const host = validateHost(hostInput);
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error("Porta inválida.");
  if (!["http", "https", "tcp"].includes(protocol)) throw new Error("Protocolo inválido.");

  const addresses = isIP(host) ? [{ address: host }] : await lookup(host, { all: true, verbatim: true });
  if (!addresses.length || addresses.some(a => isPrivateAddress(a.address))) {
    throw new Error("Domínio resolve para IP privado ou reservado; teste bloqueado.");
  }

  if (protocol === "tcp") {
    await new Promise<void>((resolve, reject) => {
      const socket = createConnection({ host, port });
      const timer = setTimeout(() => socket.destroy(new Error("Tempo limite de 8 segundos.")), 8000);
      socket.once("connect", () => { clearTimeout(timer); socket.destroy(); resolve(); });
      socket.once("error", e => { clearTimeout(timer); reject(new Error(`Falha TCP: ${e.message}`)); });
    });
    return { ok: true, message: `Conexão TCP estabelecida em ${host}:${port}.` };
  }

  const urlHost = isIP(host) === 6 ? `[${host}]` : host;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const response = await fetch(`${protocol}://${urlHost}:${port}/`, {
      method: "GET", redirect: "manual", signal: controller.signal,
    });
    await response.body?.cancel();
    if (response.status >= 300 && response.status < 400)
      throw new Error("O servidor redirecionou a conexão; teste bloqueado.");
    return { ok: true, message: `Resposta HTTP ${response.status} recebida de ${host}:${port}.` };
  } catch (e) {
    if (e instanceof Error && e.name === "AbortError") throw new Error("Tempo limite de 8 segundos.");
    throw e instanceof Error ? e : new Error("Falha ao conectar.");
  } finally {
    clearTimeout(timer);
  }
}
