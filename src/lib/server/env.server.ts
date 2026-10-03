// Leitura centralizada de variáveis de ambiente. Chamar apenas dentro de handlers.
// Lê de globalThis.process para evitar substituição estática de `process.env` no build.
export function env(name: string): string | undefined {
  const all =
    (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env ?? {};
  const v = all[name];
  return v && v.trim() !== "" ? v.trim() : undefined;
}

export function isProduction(): boolean {
  return env("NODE_ENV") === "production" || env("APP_ENV") === "production";
}

let devSecret: string | undefined;
export function jwtSecret(): string {
  const s = env("JWT_SECRET");
  if (s && s.length >= 32) return s;
  if (isProduction()) {
    throw new Error("JWT_SECRET ausente ou curto (mínimo 32 caracteres) em produção.");
  }
  // Desenvolvimento/preview: segredo efêmero por processo (sessões caem ao reiniciar).
  if (!devSecret) {
    const b = new Uint8Array(32);
    crypto.getRandomValues(b);
    devSecret = Array.from(b, (x) => x.toString(16).padStart(2, "0")).join("");
  }
  return devSecret;
}

export function corsOrigins(): string[] {
  return (env("CORS_ORIGINS") ?? "*")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}