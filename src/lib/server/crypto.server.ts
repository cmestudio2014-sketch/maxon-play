import { createHash, createHmac, randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { jwtSecret } from "./env.server";

// ---------- Senhas (scrypt, N=16384, r=8, p=1) ----------
function scryptAsync(pw: string, salt: Buffer, len: number): Promise<Buffer> {
  return new Promise((res, rej) =>
    scrypt(pw, salt, len, { N: 16384, r: 8, p: 1 }, (e, k) => (e ? rej(e) : res(k))),
  );
}
export async function hashPassword(pw: string): Promise<string> {
  const salt = randomBytes(16);
  const key = await scryptAsync(pw, salt, 64);
  return `scrypt$${salt.toString("base64")}$${key.toString("base64")}`;
}
export async function verifyPassword(pw: string, stored: string): Promise<boolean> {
  const [alg, s, k] = stored.split("$");
  if (alg !== "scrypt" || !s || !k) return false;
  const expected = Buffer.from(k, "base64");
  const got = await scryptAsync(pw, Buffer.from(s, "base64"), expected.length);
  return got.length === expected.length && timingSafeEqual(got, expected);
}

// ---------- JWT HS256 mínimo ----------
const b64url = (b: Buffer | string) => Buffer.from(b).toString("base64url");
export type JwtPayload = {
  sub: string;
  typ: "admin" | "device";
  exp: number;
  [k: string]: unknown;
};

export function signJwt(payload: Omit<JwtPayload, "exp">, ttlSeconds: number): string {
  const header = b64url(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const body = b64url(
    JSON.stringify({
      ...payload,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + ttlSeconds,
    }),
  );
  const sig = createHmac("sha256", jwtSecret()).update(`${header}.${body}`).digest("base64url");
  return `${header}.${body}.${sig}`;
}
export function verifyJwt(token: string, typ: JwtPayload["typ"]): JwtPayload | null {
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [h, b, s] = parts as [string, string, string];
  const expected = createHmac("sha256", jwtSecret()).update(`${h}.${b}`).digest();
  const got = Buffer.from(s, "base64url");
  if (got.length !== expected.length || !timingSafeEqual(got, expected)) return null;
  try {
    const p = JSON.parse(Buffer.from(b, "base64url").toString()) as JwtPayload;
    if (p.typ !== typ || typeof p.exp !== "number" || p.exp < Date.now() / 1000) return null;
    return p;
  } catch {
    return null;
  }
}

// ---------- KEYs de ativação ----------
const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // sem 0/O/1/I
export function generateActivationKey(): string {
  const bytes = randomBytes(16);
  let out = "";
  for (let i = 0; i < 16; i++) {
    out += ALPHABET[(bytes[i] ?? 0) % 32];
    if (i % 4 === 3 && i < 15) out += "-";
  }
  return out;
}
export function normalizeKey(k: string): string {
  const c = k.toUpperCase().replace(/[^A-Z0-9]/g, "");
  return c.replace(/(.{4})(?=.)/g, "$1-");
}
export function hashKey(k: string): string {
  return createHash("sha256").update(normalizeKey(k)).digest("hex");
}
export function maskKey(last4: string): string {
  return `••••-••••-••••-${last4}`;
}

// Device ID estilo MAC derivado do identificador app-scoped (bit "localmente administrado").
export function displayIdFor(deviceUid: string): string {
  const h = createHash("sha256").update(deviceUid).digest();
  const b = Array.from(h.subarray(0, 6));
  b[0] = ((b[0] ?? 0) | 0x02) & 0xfe;
  return b.map((x) => x.toString(16).padStart(2, "0").toUpperCase()).join(":");
}

export function orderNumber(): string {
  const d = new Date();
  const ymd = `${d.getUTCFullYear()}${String(d.getUTCMonth() + 1).padStart(2, "0")}${String(d.getUTCDate()).padStart(2, "0")}`;
  return `MX-${ymd}-${randomBytes(3).toString("hex").toUpperCase()}`;
}