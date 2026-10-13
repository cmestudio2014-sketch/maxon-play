import { createServerFn } from "@tanstack/react-start";
import { getRequestIP } from "@tanstack/react-start/server";
import { z } from "zod";
import { q, q1, ready } from "./server/db.server";
import {
  currentAdmin,
  endSession,
  requireAdmin,
  startSession,
  type AdminUser,
} from "./server/session.server";
import {
  generateActivationKey,
  hashKey,
  hashPassword,
  orderNumber,
  verifyPassword,
} from "./server/crypto.server";
import { audit } from "./server/audit.server";
import { rateLimit } from "./server/ratelimit.server";
import { hasAnyAdmin } from "./server/bootstrap.server";
import { isProduction, env } from "./server/env.server";

const actor = (u: AdminUser) => ({
  actorType: "admin" as const,
  actorId: u.id,
  actorLabel: u.email,
});
const uuid = z.string().uuid();

// ---------------- Auth ----------------
export const getSession = createServerFn({ method: "GET" }).handler(async () => {
  await ready();
  const user = await currentAdmin();
  const setupAllowed = !(await hasAnyAdmin()) && (!isProduction() || env("ALLOW_SETUP") === "true");
  return { user, setupAllowed };
});

export const login = createServerFn({ method: "POST" })
  .inputValidator((d) =>
    z.object({ email: z.string().email().max(120), password: z.string().min(1).max(200) }).parse(d),
  )
  .handler(async ({ data }) => {
    await ready();
    const ip = getRequestIP({ xForwardedFor: true }) ?? "local";
    const rl = rateLimit(`login:${ip}`, 8, 10 * 60_000);
    if (!rl.ok)
      return { ok: false as const, error: `Muitas tentativas. Aguarde ${rl.retryAfter}s.` };
    const u = await q1<AdminUser & { password_hash: string }>(
      "SELECT id, name, email, role, password_hash FROM admin_users WHERE email=$1 AND active",
      [data.email.toLowerCase()],
    );
    if (!u || !(await verifyPassword(data.password, u.password_hash))) {
      await audit({
        actorType: "public",
        action: "auth.login_failed",
        details: { email: data.email.toLowerCase() },
      });
      return { ok: false as const, error: "Email ou senha inválidos." };
    }
    await q("UPDATE admin_users SET last_login_at=now() WHERE id=$1", [u.id]);
    startSession({ id: u.id, name: u.name, email: u.email, role: u.role });
    await audit({ ...actor(u), action: "auth.login" });
    return { ok: true as const };
  });

export const setupFirstAdmin = createServerFn({ method: "POST" })
  .inputValidator((d) =>
    z
      .object({
        name: z.string().min(2).max(80),
        email: z.string().email().max(120),
        password: z.string().min(10).max(200),
      })
      .parse(d),
  )
  .handler(async ({ data }) => {
    await ready();
    if (await hasAnyAdmin()) return { ok: false as const, error: "Já existe administrador." };
    if (isProduction() && env("ALLOW_SETUP") !== "true")
      return { ok: false as const, error: "Configure ADMIN_EMAIL/ADMIN_PASSWORD." };
    const u = await q1<AdminUser>(
      "INSERT INTO admin_users(name,email,password_hash,role) VALUES ($1,$2,$3,'admin') RETURNING id,name,email,role",
      [data.name, data.email.toLowerCase(), await hashPassword(data.password)],
    );
    startSession(u!);
    await audit({ ...actor(u!), action: "admin.setup" });
    return { ok: true as const };
  });

export const logout = createServerFn({ method: "POST" }).handler(async () => {
  const u = await currentAdmin();
  endSession();
  if (u) await audit({ ...actor(u), action: "auth.logout" });
  return { ok: true };
});

// ---------------- Dashboard ----------------
export const getDashboard = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdmin();
  const n = async (sql: string) => Number((await q1<{ n: string }>(sql))?.n ?? 0);
  const [customers, active, expired, salesPaid, revenue, revenue30, pending] = await Promise.all([
    n("SELECT count(*)::text n FROM customers"),
    n("SELECT count(*)::text n FROM activations WHERE status='ativa'"),
    n("SELECT count(*)::text n FROM activations WHERE status='expirada'"),
    n("SELECT count(*)::text n FROM sales WHERE status='pago'"),
    n("SELECT coalesce(sum(amount_cents),0)::text n FROM sales WHERE status='pago'"),
    n(
      "SELECT coalesce(sum(amount_cents),0)::text n FROM sales WHERE status='pago' AND paid_at > now() - interval '30 days'",
    ),
    n("SELECT count(*)::text n FROM sales WHERE status='pendente'"),
  ]);
  const expiring = await q(
    `SELECT a.id, a.key_last4, a.expires_at, c.name AS customer, c.whatsapp, p.name AS plan
     FROM activations a JOIN plans p ON p.id=a.plan_id LEFT JOIN customers c ON c.id=a.customer_id
     WHERE a.status='ativa' AND a.expires_at < now() + interval '7 days' ORDER BY a.expires_at LIMIT 20`,
  );
  const recentSales = await q(
    `SELECT s.id, s.order_number, s.amount_cents, s.status, s.created_at, c.name AS customer, p.name AS plan
     FROM sales s LEFT JOIN customers c ON c.id=s.customer_id LEFT JOIN plans p ON p.id=s.plan_id ORDER BY s.created_at DESC LIMIT 8`,
  );
  return {
    customers,
    active,
    expired,
    salesPaid,
    revenue,
    revenue30,
    pending,
    expiring: expiring as Expiring[],
    recentSales: recentSales as RecentSale[],
  };
});
type Expiring = {
  id: string;
  key_last4: string;
  expires_at: string;
  customer: string | null;
  whatsapp: string | null;
  plan: string;
};
type RecentSale = {
  id: string;
  order_number: string;
  amount_cents: number;
  status: string;
  created_at: string;
  customer: string | null;
  plan: string | null;
};

// ---------------- Clientes ----------------
export type Customer = {
  id: string;
  name: string;
  whatsapp: string;
  email: string | null;
  notes: string;
  status: string;
  created_at: string;
  activations: number;
};
export const listCustomers = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdmin();
  return q<Customer>(
    `SELECT c.*, (SELECT count(*)::int FROM activations a WHERE a.customer_id=c.id) AS activations FROM customers c ORDER BY c.created_at DESC LIMIT 500`,
  );
});
const CustomerInput = z.object({
  id: uuid.optional(),
  name: z.string().trim().min(2).max(100),
  whatsapp: z
    .string()
    .trim()
    .regex(/^\+?\d{10,15}$/, "WhatsApp com DDI+DDD, só números"),
  email: z.string().trim().email().max(120).or(z.literal("")).optional(),
  notes: z.string().max(1000).default(""),
  status: z.enum(["ativo", "inativo", "bloqueado"]).default("ativo"),
});
export const saveCustomer = createServerFn({ method: "POST" })
  .inputValidator((d) => CustomerInput.parse(d))
  .handler(async ({ data }) => {
    const u = await requireAdmin();
    const email = data.email ? data.email : null;
    if (data.id) {
      await q(
        "UPDATE customers SET name=$2, whatsapp=$3, email=$4, notes=$5, status=$6 WHERE id=$1",
        [data.id, data.name, data.whatsapp, email, data.notes, data.status],
      );
      await audit({
        ...actor(u),
        action: "customer.update",
        entity: "customer",
        entityId: data.id,
        details: { status: data.status },
      });
      return { id: data.id };
    }
    let appUsername = "";
    let appPassword = "";

    for (let tentativa = 0; tentativa < 100; tentativa++) {
      const candidato = String(Math.floor(10000 + Math.random() * 90000));
      const existente = await q1<{ id: string }>(
        `SELECT id FROM customers WHERE app_username=$1 LIMIT 1`,
        [candidato],
      );

      if (!existente) {
        appUsername = candidato;
        break;
      }
    }

    if (!appUsername) {
      throw new Error("Nao foi possivel gerar usuario unico");
    }

    appPassword = String(Math.floor(10000 + Math.random() * 90000));

    const r = await q1<{ id: string }>(
      `INSERT INTO customers
       (name,whatsapp,email,notes,status,app_username,app_password)
       VALUES ($1,$2,$3,$4,$5,$6,$7)
       RETURNING id`,
      [
        data.name,
        data.whatsapp,
        email,
        data.notes,
        data.status,
        appUsername,
        appPassword,
      ],
    );
    await audit({ ...actor(u), action: "customer.create", entity: "customer", entityId: r!.id });
    return { id: r!.id };
  });

const DeleteCustomerInput = z.object({ id: uuid });
export const deleteCustomer = createServerFn({ method: "POST" })
  .inputValidator((d) => DeleteCustomerInput.parse(d))
  .handler(async ({ data }) => {
    const u = await requireAdmin();
    const linked = await q1<{ activations: number; sales: number; sources: number }>(
      `SELECT
        (SELECT count(*)::int FROM activations WHERE customer_id=$1) AS activations,
        (SELECT count(*)::int FROM sales WHERE customer_id=$1) AS sales,
        (SELECT count(*)::int FROM sources WHERE customer_id=$1) AS sources`,
      [data.id],
    );
    const total = (linked?.activations ?? 0) + (linked?.sales ?? 0) + (linked?.sources ?? 0);
    if (total > 0) {
      throw new Error("Este cliente possui ativações, vendas ou fontes vinculadas. Remova os vínculos antes de excluir.");
    }
    await q("DELETE FROM customers WHERE id=$1", [data.id]);
    await audit({ ...actor(u), action: "customer.delete", entity: "customer", entityId: data.id });
    return { id: data.id };
  });

// ---------------- Dispositivos ----------------
export type Device = {
  source_id: string | null;
  source_name: string | null;
  id: string;
  display_id: string;
  platform: string;
  model: string;
  app_version: string;
  status: string;
  created_at: string;
  last_seen_at: string | null;
  customer: string | null;
  license_status: string | null;
  expires_at: string | null;
};
export const listDevices = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdmin();
  return q<Device>(
    `SELECT d.source_id, (SELECT name FROM sources WHERE id=d.source_id) AS source_name, d.id, d.display_id, d.platform, d.model, d.app_version, d.status, d.created_at, d.last_seen_at,
       (SELECT c.name FROM activations a LEFT JOIN customers c ON c.id=a.customer_id WHERE a.device_id=d.id ORDER BY a.expires_at DESC NULLS LAST LIMIT 1) AS customer,
       (SELECT a.status FROM activations a WHERE a.device_id=d.id ORDER BY a.expires_at DESC NULLS LAST LIMIT 1) AS license_status,
       (SELECT a.expires_at FROM activations a WHERE a.device_id=d.id ORDER BY a.expires_at DESC NULLS LAST LIMIT 1) AS expires_at
     FROM devices d ORDER BY d.last_seen_at DESC NULLS LAST LIMIT 500`,
  );
});
export const activateDeviceByTvCode = createServerFn({ method: "POST" })
  .inputValidator((d) => z.object({
    code: z.string().trim().regex(/^\\d{6}$/, "Código deve ter 6 números."),
    customer_id: uuid.nullable(), plan_id: uuid, source_id: uuid.nullable().default(null),
  }).parse(d))
  .handler(async ({ data }) => {
    const u = await requireAdmin();
    const pair = await q1<{ id:string; device_id:string; display_id:string; status:string; expires_at:string }>(
      `SELECT pc.id, pc.device_id, d.display_id, pc.status, pc.expires_at
       FROM tv_pairing_codes pc JOIN devices d ON d.id=pc.device_id
       WHERE pc.code=$1 ORDER BY pc.created_at DESC LIMIT 1`, [data.code]);
    if (!pair) throw new Error("Código da TV não encontrado.");
    if (pair.status !== "pendente") throw new Error("Este código da TV já foi utilizado ou cancelado.");
    if (new Date(pair.expires_at).getTime() <= Date.now()) {
      await q("UPDATE tv_pairing_codes SET status='expirado' WHERE id=$1", [pair.id]);
      throw new Error("Código da TV expirado. Gere um novo código no aparelho.");
    }
    const plan = await q1<{ duration_days:number }>("SELECT duration_days FROM plans WHERE id=$1 AND active", [data.plan_id]);
    if (!plan) throw new Error("Plano não encontrado ou inativo.");
    const existing = await q1<{ id:string }>("SELECT id FROM activations WHERE device_id=$1 AND status='ativa' AND expires_at > now() ORDER BY expires_at DESC LIMIT 1", [pair.device_id]);
    if (existing) throw new Error("Este aparelho já possui uma ativação ativa.");
    const key = generateActivationKey();
    const activation = await q1<{ id:string }>(
      `INSERT INTO activations(customer_id,plan_id,device_id,key_hash,key_last4,status,starts_at,expires_at,created_by,source_id)
       VALUES ($1,$2,$3,$4,$5,'ativa',now(),now() + ($6 || ' days')::interval,$7,$8) RETURNING id`,
      [data.customer_id,data.plan_id,pair.device_id,hashKey(key),key.slice(-4),String(plan.duration_days),u.id,data.source_id]);
    await q("UPDATE devices SET status='ativo', source_id=$2, config_rev=config_rev+1 WHERE id=$1", [pair.device_id,data.source_id]);
    await q("UPDATE tv_pairing_codes SET status='ativado', activation_id=$2, activated_at=now() WHERE id=$1", [pair.id,activation!.id]);
    await audit({ ...actor(u), action:"device.activate_by_tv_code", entity:"activation", entityId:activation!.id, details:{ code:data.code, display_id:pair.display_id, plan_id:data.plan_id } });
    return { ok:true, activation_id:activation!.id, display_id:pair.display_id };
  });

export const activateDeviceByDisplayId = createServerFn({ method: "POST" })
  .inputValidator((d) =>
    z.object({
      display_id: z.string().trim().min(4).max(40),
      customer_id: uuid.nullable(),
      plan_id: uuid,
      source_id: uuid.nullable().default(null),
    }).parse(d),
  )
  .handler(async ({ data }) => {
    const u = await requireAdmin();
    const displayId = data.display_id.trim().toUpperCase();
    let device = await q1<{ id: string }>(
      "SELECT id FROM devices WHERE upper(display_id)=upper($1)",
      [displayId],
    );
    if (!device) {
      device = await q1<{ id: string }>(
        `INSERT INTO devices(device_uid,display_id,platform,model,app_version,status,last_seen_at)
         VALUES ($1,$2,'android','Aguardando aparelho','—','ativo',NULL) RETURNING id`,
        [\`manual:\${displayId}\`, displayId],
      );
    }
    const plan = await q1<{ duration_days: number }>(
      "SELECT duration_days FROM plans WHERE id=$1 AND active",
      [data.plan_id],
    );
    if (!plan) throw new Error("Plano não encontrado ou inativo.");
    const existing = await q1<{ id: string }>(
      "SELECT id FROM activations WHERE device_id=$1 AND status='ativa' AND expires_at > now() ORDER BY expires_at DESC LIMIT 1",
      [device!.id],
    );
    if (existing) throw new Error("Este MAC / Device ID já possui uma ativação ativa.");

    const key = generateActivationKey();
    const activation = await q1<{ id: string }>(
      `INSERT INTO activations(customer_id,plan_id,device_id,key_hash,key_last4,status,starts_at,expires_at,created_by,source_id)
       VALUES ($1,$2,$3,$4,$5,'ativa',now(),now() + ($6 || ' days')::interval,$7,$8) RETURNING id`,
      [data.customer_id,data.plan_id,device!.id,hashKey(key),key.slice(-4),String(plan.duration_days),u.id,data.source_id],
    );
    await q(
      "UPDATE devices SET status='ativo', source_id=$2, config_rev=config_rev+1 WHERE id=$1",
      [device!.id, data.source_id],
    );
    await audit({
      ...actor(u),
      action: "device.activate_by_display_id",
      entity: "activation",
      entityId: activation!.id,
      details: { display_id: displayId, plan_id: data.plan_id },
    });
    return { ok: true, activation_id: activation!.id, device_id: device!.id };
  });

export const activateDeviceDirect = createServerFn({ method: "POST" })
  .inputValidator((d) =>
    z
      .object({
        device_id: uuid,
        customer_id: uuid.nullable(),
        plan_id: uuid,
        source_id: uuid.nullable().default(null),
      })
      .parse(d),
  )
  .handler(async ({ data }) => {
    const u = await requireAdmin();
    const device = await q1<{ id: string; display_id: string }>(
      "SELECT id, display_id FROM devices WHERE id=$1",
      [data.device_id],
    );
    if (!device) throw new Error("Dispositivo não encontrado.");
    const plan = await q1<{ duration_days: number }>(
      "SELECT duration_days FROM plans WHERE id=$1 AND active",
      [data.plan_id],
    );
    if (!plan) throw new Error("Plano não encontrado ou inativo.");

    const key = generateActivationKey();
    const r = await q1<{ id: string }>(
      `INSERT INTO activations(customer_id,plan_id,device_id,key_hash,key_last4,status,starts_at,expires_at,created_by,source_id)
       VALUES ($1,$2,$3,$4,$5,'ativa',now(),now() + ($6 || ' days')::interval,$7,$8) RETURNING id`,
      [
        data.customer_id,
        data.plan_id,
        data.device_id,
        hashKey(key),
        key.slice(-4),
        String(plan.duration_days),
        u.id,
        data.source_id,
      ],
    );
    await q(
      "UPDATE devices SET status='ativo', source_id=$2, config_rev=config_rev+1 WHERE id=$1",
      [data.device_id, data.source_id],
    );
    await audit({
      ...actor(u),
      action: "device.activate_direct",
      entity: "activation",
      entityId: r!.id,
      details: { device_id: data.device_id, display_id: device.display_id, plan_id: data.plan_id },
    });
    return { ok: true, activation_id: r!.id };
  });

export const setDeviceStatus = createServerFn({ method: "POST" })
  .inputValidator((d) => z.object({ id: uuid, status: z.enum(["ativo", "bloqueado"]) }).parse(d))
  .handler(async ({ data }) => {
    const u = await requireAdmin(["admin"]);
    await q("UPDATE devices SET status=$2 WHERE id=$1", [data.id, data.status]);
    await audit({
      ...actor(u),
      action: `device.${data.status === "bloqueado" ? "block" : "unblock"}`,
      entity: "device",
      entityId: data.id,
    });
    return { ok: true };
  });

// ---------------- Ativações ----------------
export type Activation = {
  source_id: string | null;
  source_name: string | null;
  id: string;
  key_last4: string;
  status: string;
  starts_at: string | null;
  expires_at: string | null;
  created_at: string;
  plan_id: string;
  plan: string;
  customer_id: string | null;
  customer: string | null;
  device_id: string | null;
  display_id: string | null;
  platform: string | null;
};
export const listActivations = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdmin();
  return q<Activation>(
    `SELECT a.source_id, s.name AS source_name, a.id, a.key_last4, a.status, a.starts_at, a.expires_at, a.created_at, a.plan_id, p.name AS plan, a.customer_id, c.name AS customer, a.device_id, d.display_id, d.platform
     FROM activations a JOIN plans p ON p.id=a.plan_id LEFT JOIN customers c ON c.id=a.customer_id LEFT JOIN devices d ON d.id=a.device_id LEFT JOIN sources s ON s.id=a.source_id
     ORDER BY a.created_at DESC LIMIT 500`,
  );
});

export const createActivation = createServerFn({ method: "POST" })
  .inputValidator((d) =>
    z
      .object({
        customer_id: uuid.nullable(),
        plan_id: uuid,
        start_now: z.boolean().default(false),
        source_id: uuid.nullable().default(null),
      })
      .parse(d),
  )
  .handler(async ({ data }) => {
    const u = await requireAdmin();
    const plan = await q1<{ duration_days: number }>(
      "SELECT duration_days FROM plans WHERE id=$1",
      [data.plan_id],
    );
    if (!plan) throw new Error("Plano não encontrado.");
    const key = generateActivationKey();
    const r = await q1<{ id: string }>(
      `INSERT INTO activations(customer_id,plan_id,key_hash,key_last4,status,starts_at,expires_at,created_by,source_id)
       VALUES ($1,$2,$3,$4,$5, CASE WHEN $5='ativa' THEN now() END, CASE WHEN $5='ativa' THEN now() + ($6 || ' days')::interval END, $7, $8) RETURNING id`,
      [
        data.customer_id,
        data.plan_id,
        hashKey(key),
        key.slice(-4),
        data.start_now ? "ativa" : "pendente",
        String(plan.duration_days),
        u.id,
        data.source_id,
      ],
    );
    await audit({
      ...actor(u),
      action: "activation.create",
      entity: "activation",
      entityId: r!.id,
      details: { key_last4: key.slice(-4) },
    });
    // A KEY completa só é retornada uma vez, nesta resposta.
    return { id: r!.id, key };
  });

export const renewActivation = createServerFn({ method: "POST" })
  .inputValidator((d) =>
    z.object({ id: uuid, days: z.union([z.literal(30), z.literal(365)]) }).parse(d),
  )
  .handler(async ({ data }) => {
    const u = await requireAdmin();
    await q(
      `UPDATE activations SET
         expires_at = GREATEST(coalesce(expires_at, now()), now()) + ($2 || ' days')::interval,
         starts_at = coalesce(starts_at, now()),
         status = CASE WHEN status='bloqueada' THEN 'bloqueada' ELSE 'ativa' END, updated_at=now()
       WHERE id=$1`,
      [data.id, String(data.days)],
    );
    await audit({
      ...actor(u),
      action: "activation.renew",
      entity: "activation",
      entityId: data.id,
      details: { days: data.days },
    });
    return { ok: true };
  });

export const setActivationBlocked = createServerFn({ method: "POST" })
  .inputValidator((d) => z.object({ id: uuid, blocked: z.boolean() }).parse(d))
  .handler(async ({ data }) => {
    const u = await requireAdmin();
    if (data.blocked)
      await q("UPDATE activations SET status='bloqueada', updated_at=now() WHERE id=$1", [data.id]);
    else
      await q(
        `UPDATE activations SET status = CASE WHEN starts_at IS NULL THEN 'pendente' WHEN expires_at < now() THEN 'expirada' ELSE 'ativa' END, updated_at=now() WHERE id=$1`,
        [data.id],
      );
    await audit({
      ...actor(u),
      action: data.blocked ? "activation.block" : "activation.unblock",
      entity: "activation",
      entityId: data.id,
    });
    return { ok: true };
  });

export const changeActivationDevice = createServerFn({ method: "POST" })
  .inputValidator((d) =>
    z
      .object({
        id: uuid,
        display_id: z.string().trim().max(40).nullable(),
        reason: z.string().trim().min(3).max(300),
      })
      .parse(d),
  )
  .handler(async ({ data }) => {
    const u = await requireAdmin();
    const before = await q1<{ device_id: string | null; display_id: string | null }>(
      "SELECT a.device_id, d.display_id FROM activations a LEFT JOIN devices d ON d.id=a.device_id WHERE a.id=$1",
      [data.id],
    );
    if (!before) throw new Error("Ativação não encontrada.");
    let newId: string | null = null;
    if (data.display_id) {
      const dev = await q1<{ id: string }>(
        "SELECT id FROM devices WHERE upper(display_id)=upper($1)",
        [data.display_id],
      );
      if (!dev)
        throw new Error("Dispositivo não encontrado. Abra o app na TV para registrá-lo primeiro.");
      newId = dev.id;
    }
    await q("UPDATE activations SET device_id=$2, updated_at=now() WHERE id=$1", [data.id, newId]);
    await audit({
      ...actor(u),
      action: "activation.change_device",
      entity: "activation",
      entityId: data.id,
      details: { from: before.display_id, to: data.display_id, reason: data.reason },
    });
    return { ok: true };
  });

export const regenerateKey = createServerFn({ method: "POST" })
  .inputValidator((d) => z.object({ id: uuid }).parse(d))
  .handler(async ({ data }) => {
    const u = await requireAdmin(["admin"]);
    const key = generateActivationKey();
    await q("UPDATE activations SET key_hash=$2, key_last4=$3, updated_at=now() WHERE id=$1", [
      data.id,
      hashKey(key),
      key.slice(-4),
    ]);
    await audit({
      ...actor(u),
      action: "activation.regenerate_key",
      entity: "activation",
      entityId: data.id,
      details: { key_last4: key.slice(-4) },
    });
    return { key };
  });

// ---------------- Planos ----------------
export type Plan = {
  id: string;
  code: string;
  name: string;
  description: string;
  duration_days: number;
  price_cents: number;
  highlight: boolean;
  active: boolean;
  sort: number;
};
export const listPlans = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdmin();
  return q<Plan>(
    "SELECT id, code, name, description, duration_days, price_cents, highlight, active, sort FROM plans ORDER BY sort, duration_days",
  );
});
export const savePlan = createServerFn({ method: "POST" })
  .inputValidator((d) =>
    z
      .object({
        id: uuid.optional(),
        code: z
          .string()
          .trim()
          .regex(/^[a-z0-9-]{2,30}$/),
        name: z.string().trim().min(2).max(40),
        description: z.string().max(300).default(""),
        duration_days: z.number().int().min(1).max(3650),
        price_cents: z.number().int().min(0).max(10_000_000),
        highlight: z.boolean(),
        active: z.boolean(),
        sort: z.number().int().min(0).max(999),
      })
      .parse(d),
  )
  .handler(async ({ data }) => {
    const u = await requireAdmin(["admin"]);
    if (data.id) {
      await q(
        "UPDATE plans SET code=$2,name=$3,description=$4,duration_days=$5,price_cents=$6,highlight=$7,active=$8,sort=$9,updated_at=now() WHERE id=$1",
        [
          data.id,
          data.code,
          data.name,
          data.description,
          data.duration_days,
          data.price_cents,
          data.highlight,
          data.active,
          data.sort,
        ],
      );
    } else {
      await q(
        "INSERT INTO plans(code,name,description,duration_days,price_cents,highlight,active,sort) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)",
        [
          data.code,
          data.name,
          data.description,
          data.duration_days,
          data.price_cents,
          data.highlight,
          data.active,
          data.sort,
        ],
      );
    }
    await audit({
      ...actor(u),
      action: data.id ? "plan.update" : "plan.create",
      entity: "plan",
      entityId: data.id ?? null,
      details: { price_cents: data.price_cents },
    });
    return { ok: true };
  });

// ---------------- Vendas ----------------
export type Sale = {
  id: string;
  order_number: string;
  amount_cents: number;
  status: string;
  payment_method: string;
  created_at: string;
  paid_at: string | null;
  customer: string | null;
  plan: string | null;
  coupon: string | null;
  seller: string | null;
  activation_id: string | null;
};
export const listSales = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdmin();
  return q<Sale>(
    `SELECT s.id, s.order_number, s.amount_cents, s.status, s.payment_method, s.created_at, s.paid_at, s.activation_id,
       c.name AS customer, p.name AS plan, cp.code AS coupon, u.name AS seller
     FROM sales s LEFT JOIN customers c ON c.id=s.customer_id LEFT JOIN plans p ON p.id=s.plan_id
     LEFT JOIN coupons cp ON cp.id=s.coupon_id LEFT JOIN admin_users u ON u.id=s.seller_id
     ORDER BY s.created_at DESC LIMIT 500`,
  );
});
export const createSale = createServerFn({ method: "POST" })
  .inputValidator((d) =>
    z
      .object({
        customer_id: uuid,
        plan_id: uuid,
        coupon_code: z.string().trim().max(30).optional(),
        payment_method: z.enum(["pix", "dinheiro", "cartao", "transferencia", "outro"]),
        status: z.enum(["pendente", "pago"]),
      })
      .parse(d),
  )
  .handler(async ({ data }) => {
    const u = await requireAdmin();
    const plan = await q1<{ price_cents: number }>("SELECT price_cents FROM plans WHERE id=$1", [
      data.plan_id,
    ]);
    if (!plan) throw new Error("Plano não encontrado.");
    let amount = plan.price_cents;
    let couponId: string | null = null;
    if (data.coupon_code) {
      const c = await q1<{ id: string; percent_off: number }>(
        "SELECT id, percent_off FROM coupons WHERE upper(code)=upper($1) AND active AND (expires_at IS NULL OR expires_at > now()) AND (max_uses IS NULL OR uses < max_uses)",
        [data.coupon_code],
      );
      if (!c) throw new Error("Cupom inválido ou esgotado.");
      couponId = c.id;
      amount = Math.round((amount * (100 - c.percent_off)) / 100);
      await q("UPDATE coupons SET uses=uses+1 WHERE id=$1", [c.id]);
    }
    const r = await q1<{ id: string; order_number: string }>(
      `INSERT INTO sales(order_number,customer_id,plan_id,coupon_id,amount_cents,status,payment_method,seller_id,paid_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8, CASE WHEN $6='pago' THEN now() END) RETURNING id, order_number`,
      [
        orderNumber(),
        data.customer_id,
        data.plan_id,
        couponId,
        amount,
        data.status,
        data.payment_method,
        u.id,
      ],
    );
    await audit({
      ...actor(u),
      action: "sale.create",
      entity: "sale",
      entityId: r!.id,
      details: { amount_cents: amount, status: data.status },
    });
    return r!;
  });
export const setSaleStatus = createServerFn({ method: "POST" })
  .inputValidator((d) =>
    z
      .object({
        id: uuid,
        status: z.enum(["pendente", "pago", "cancelado"]),
        generate_key: z.boolean().default(false),
      })
      .parse(d),
  )
  .handler(async ({ data }) => {
    const u = await requireAdmin();
    await q(
      "UPDATE sales SET status=$2, paid_at = CASE WHEN $2='pago' THEN coalesce(paid_at, now()) ELSE paid_at END WHERE id=$1",
      [data.id, data.status],
    );
    let key: string | null = null;
    if (data.status === "pago" && data.generate_key) {
      const s = await q1<{
        customer_id: string | null;
        plan_id: string;
        activation_id: string | null;
      }>("SELECT customer_id, plan_id, activation_id FROM sales WHERE id=$1", [data.id]);
      if (s && !s.activation_id) {
        key = generateActivationKey();
        const a = await q1<{ id: string }>(
          "INSERT INTO activations(customer_id,plan_id,key_hash,key_last4,status,created_by) VALUES ($1,$2,$3,$4,'pendente',$5) RETURNING id",
          [s.customer_id, s.plan_id, hashKey(key), key.slice(-4), u.id],
        );
        await q("UPDATE sales SET activation_id=$2 WHERE id=$1", [data.id, a!.id]);
      }
    }
    await audit({
      ...actor(u),
      action: "sale.status",
      entity: "sale",
      entityId: data.id,
      details: { status: data.status, key_last4: key?.slice(-4) ?? null },
    });
    return { key };
  });

// ---------------- Cupons ----------------
export type Coupon = {
  id: string;
  code: string;
  percent_off: number;
  max_uses: number | null;
  uses: number;
  expires_at: string | null;
  active: boolean;
};
export const listCoupons = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdmin();
  return q<Coupon>(
    "SELECT id, code, percent_off, max_uses, uses, expires_at, active FROM coupons ORDER BY created_at DESC",
  );
});
export const saveCoupon = createServerFn({ method: "POST" })
  .inputValidator((d) =>
    z
      .object({
        id: uuid.optional(),
        code: z
          .string()
          .trim()
          .toUpperCase()
          .regex(/^[A-Z0-9_-]{3,30}$/),
        percent_off: z.number().int().min(1).max(100),
        max_uses: z.number().int().min(1).nullable(),
        expires_at: z.string().nullable(),
        active: z.boolean(),
      })
      .parse(d),
  )
  .handler(async ({ data }) => {
    const u = await requireAdmin(["admin"]);
    const exp = data.expires_at ? new Date(data.expires_at).toISOString() : null;
    if (data.id)
      await q(
        "UPDATE coupons SET code=$2,percent_off=$3,max_uses=$4,expires_at=$5,active=$6 WHERE id=$1",
        [data.id, data.code, data.percent_off, data.max_uses, exp, data.active],
      );
    else
      await q(
        "INSERT INTO coupons(code,percent_off,max_uses,expires_at,active) VALUES ($1,$2,$3,$4,$5)",
        [data.code, data.percent_off, data.max_uses, exp, data.active],
      );
    await audit({
      ...actor(u),
      action: data.id ? "coupon.update" : "coupon.create",
      entity: "coupon",
      entityId: data.id ?? null,
      details: { code: data.code },
    });
    return { ok: true };
  });

// ---------------- Usuários (admin) ----------------
export type StaffUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  active: boolean;
  created_at: string;
  last_login_at: string | null;
};
export const listUsers = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdmin(["admin"]);
  return q<StaffUser>(
    "SELECT id, name, email, role, active, created_at, last_login_at FROM admin_users ORDER BY created_at",
  );
});
export const saveUser = createServerFn({ method: "POST" })
  .inputValidator((d) =>
    z
      .object({
        id: uuid.optional(),
        name: z.string().trim().min(2).max(80),
        email: z.string().trim().email().max(120),
        role: z.enum(["admin", "vendedor"]),
        active: z.boolean(),
        password: z.string().min(10).max(200).optional().or(z.literal("")),
      })
      .parse(d),
  )
  .handler(async ({ data }) => {
    const u = await requireAdmin(["admin"]);
    if (data.id === u.id && (!data.active || data.role !== "admin"))
      throw new Error("Você não pode remover seu próprio acesso de admin.");
    if (data.id) {
      await q("UPDATE admin_users SET name=$2,email=$3,role=$4,active=$5 WHERE id=$1", [
        data.id,
        data.name,
        data.email.toLowerCase(),
        data.role,
        data.active,
      ]);
      if (data.password)
        await q("UPDATE admin_users SET password_hash=$2 WHERE id=$1", [
          data.id,
          await hashPassword(data.password),
        ]);
    } else {
      if (!data.password) throw new Error("Senha obrigatória (mín. 10 caracteres).");
      await q(
        "INSERT INTO admin_users(name,email,password_hash,role,active) VALUES ($1,$2,$3,$4,$5)",
        [
          data.name,
          data.email.toLowerCase(),
          await hashPassword(data.password),
          data.role,
          data.active,
        ],
      );
    }
    await audit({
      ...actor(u),
      action: data.id ? "user.update" : "user.create",
      entity: "admin_user",
      entityId: data.id ?? null,
      details: { email: data.email, role: data.role },
    });
    return { ok: true };
  });

// ---------------- Configurações ----------------
export const getSettingsAdmin = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdmin(["admin"]);
  const rows = await q<{ key: string; value: string }>("SELECT key, value FROM settings");
  return Object.fromEntries(rows.map((r) => [r.key, r.value])) as Record<string, string>;
});
export const saveSettings = createServerFn({ method: "POST" })
  .inputValidator((d) =>
    z
      .object({
        brand_name: z.string().trim().min(2).max(40),
        whatsapp_number: z
          .string()
          .trim()
          .regex(/^(\d{10,15})?$/, "Somente números com DDI (ex: 5511999999999)"),
        whatsapp_message: z.string().trim().max(300),
        support_hours: z.string().trim().max(80),
      })
      .parse(d),
  )
  .handler(async ({ data }) => {
    const u = await requireAdmin(["admin"]);
    for (const [k, v] of Object.entries(data)) {
      await q(
        "INSERT INTO settings(key,value) VALUES ($1,$2) ON CONFLICT (key) DO UPDATE SET value=EXCLUDED.value",
        [k, v],
      );
    }
    await audit({ ...actor(u), action: "settings.update", entity: "settings", details: data });
    return { ok: true };
  });

// ---------------- Auditoria ----------------
export type AuditLog = {
  id: string;
  actor_type: string;
  actor_label: string | null;
  action: string;
  entity: string | null;
  entity_id: string | null;
  details: string;
  created_at: string;
};
export const listAudit = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdmin(["admin"]);
  return q<AuditLog>(
    "SELECT id::text, actor_type, actor_label, action, entity, entity_id, details::text AS details, created_at::text AS created_at FROM audit_logs ORDER BY id DESC LIMIT 300",
  );
});

// ---------------- Servidores autorizados ----------------
export type ProviderServer = {
  id: string;
  name: string;
  base_url: string;
  priority: number;
  active: boolean;
  updated_at: string;
  health_status: string | null;
  health_http: number | null;
  health_latency_ms: number | null;
  health_checked_at: string | null;
};
export const listProviderServers = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdmin();
  return q<ProviderServer>(
    "SELECT id,name,base_url,priority,active,updated_at::text AS updated_at,health_status,health_http,health_latency_ms,health_checked_at::text AS health_checked_at FROM provider_servers ORDER BY priority,name",
  );
});
const providerServerUrl = z.string().trim().url().max(500).refine((u) => /^https?:\/\//i.test(u), "Use http(s)://");

function privateIp(ip: string): boolean {
  const x = ip.toLowerCase();
  if (x === "::1" || x === "0.0.0.0" || x.startsWith("127.") || x.startsWith("10.") || x.startsWith("192.168.") || x.startsWith("169.254.")) return true;
  const m = x.match(/^172\.(\d+)\./);
  if (m && Number(m[1]) >= 16 && Number(m[1]) <= 31) return true;
  if (x.startsWith("fc") || x.startsWith("fd") || x.startsWith("fe80:")) return true;
  return false;
}
async function assertPublicHost(url: URL): Promise<void> {
  const { lookup } = await import("node:dns/promises");
  const { isIP } = await import("node:net");
  if (["localhost", "localhost.localdomain"].includes(url.hostname.toLowerCase())) throw new Error("Destino local não permitido.");
  const addresses = isIP(url.hostname) ? [{ address: url.hostname }] : await lookup(url.hostname, { all: true });
  if (!addresses.length || addresses.some((a) => privateIp(a.address))) throw new Error("Destino privado/local não permitido.");
}
async function probeServer(baseUrl: string) {
  let current = new URL(baseUrl);
  const started = Date.now();
  let response: Response | null = null;
  for (let redirect = 0; redirect < 4; redirect++) {
    await assertPublicHost(current);
    response = await fetch(current, {
      method: "GET",
      redirect: "manual",
      signal: AbortSignal.timeout(8000),
      headers: { "user-agent": "MAXON-PLAY-ServerCheck/1.0", accept: "*/*" },
    });
    if (![301,302,303,307,308].includes(response.status)) break;
    const location = response.headers.get("location");
    if (!location) break;
    current = new URL(location, current);
  }
  const latency = Date.now() - started;
  const http = response?.status ?? null;
  const status = http && http >= 200 && http < 400 ? "online" : http ? "respondeu" : "offline";
  try { await response?.body?.cancel(); } catch {}
  return { status, http, latency };
}
export const testProviderServer = createServerFn({ method: "POST" })
  .inputValidator((d) => z.object({ id: uuid }).parse(d))
  .handler(async ({ data }) => {
    const u = await requireAdmin(["admin"]);
    const row = await q1<{ id:string; name:string; base_url:string }>("SELECT id,name,base_url FROM provider_servers WHERE id=$1", [data.id]);
    if (!row) throw new Error("Servidor não encontrado.");
    let result: { status: string; http: number | null; latency: number | null; error?: string };
    try {
      const r = await probeServer(row.base_url);
      result = { status: r.status, http: r.http, latency: r.latency };
    } catch (e) {
      result = { status: "offline", http: null, latency: null, error: e instanceof Error ? e.message : "Falha no teste" };
    }
    await q("UPDATE provider_servers SET health_status=$2,health_http=$3,health_latency_ms=$4,health_checked_at=now() WHERE id=$1",
      [data.id,result.status,result.http,result.latency]);
    await audit({ ...actor(u), action: "server.test", entity: "provider_server", entityId: data.id, details: { status: result.status, http: result.http, latency_ms: result.latency } });
    return result;
  });
export const saveProviderServer = createServerFn({ method: "POST" })
  .inputValidator((d) => z.object({
    id: uuid.optional(),
    name: z.string().trim().min(2).max(80),
    base_url: providerServerUrl,
    priority: z.number().int().min(1).max(999),
    active: z.boolean(),
  }).parse(d))
  .handler(async ({ data }) => {
    const u = await requireAdmin(["admin"]);
    const baseUrl = data.base_url.replace(/\/+$/, "");
    let id = data.id;
    if (id) {
      await q("UPDATE provider_servers SET name=$2,base_url=$3,priority=$4,active=$5,health_status=NULL,health_http=NULL,health_latency_ms=NULL,health_checked_at=NULL,updated_at=now() WHERE id=$1",
        [id,data.name,baseUrl,data.priority,data.active]);
    } else {
      id = (await q1<{id:string}>("INSERT INTO provider_servers(name,base_url,priority,active) VALUES ($1,$2,$3,$4) RETURNING id",
        [data.name,baseUrl,data.priority,data.active]))!.id;
    }
    await audit({ ...actor(u), action: data.id ? "server.update" : "server.create", entity: "provider_server", entityId: id, details: { name: data.name, priority: data.priority, active: data.active } });
    return { id };
  });
export const deleteProviderServer = createServerFn({ method: "POST" })
  .inputValidator((d) => z.object({ id: uuid }).parse(d))
  .handler(async ({ data }) => {
    const u = await requireAdmin(["admin"]);
    await q("DELETE FROM provider_servers WHERE id=$1", [data.id]);
    await audit({ ...actor(u), action: "server.delete", entity: "provider_server", entityId: data.id });
    return { ok: true };
  });

// ---------------- Catálogo autorizado para Editor ----------------
function catalogPrivateIp(ip: string): boolean {
  const x=ip.toLowerCase();
  if(x==="::1"||x==="0.0.0.0"||x.startsWith("127.")||x.startsWith("10.")||x.startsWith("192.168.")||x.startsWith("169.254.")) return true;
  const m=x.match(/^172\.(\d+)\./); if(m&&Number(m[1])>=16&&Number(m[1])<=31) return true;
  return x.startsWith("fc")||x.startsWith("fd")||x.startsWith("fe80:");
}
async function catalogAssertPublic(url: URL) {
  const {lookup}=await import("node:dns/promises"); const {isIP}=await import("node:net");
  const a=isIP(url.hostname)?[{address:url.hostname}]:await lookup(url.hostname,{all:true});
  if(!a.length||a.some(x=>catalogPrivateIp(x.address))) throw new Error("Destino privado/local não permitido.");
}
async function catalogFetch(url: string) {
  let u=new URL(url);
  for(let i=0;i<4;i++){
    await catalogAssertPublic(u);
    const r=await fetch(u,{redirect:"manual",signal:AbortSignal.timeout(15000),headers:{"user-agent":"MAXON-PLAY-Catalog/1.0",accept:"*/*"}});
    if([301,302,303,307,308].includes(r.status)){const l=r.headers.get("location");if(!l) return r;u=new URL(l,u);continue}
    return r;
  }
  throw new Error("Muitos redirecionamentos.");
}
function attr(line:string,key:string){const m=line.match(new RegExp(key+'="([^"]*)"',"i"));return m?.[1]?.trim()||"";}
function safeName(v:unknown,fallback:string){return String(v??fallback).trim().slice(0,180)||fallback;}
export const importSourceCatalog = createServerFn({method:"POST"})
  .inputValidator(d=>z.object({source_id:uuid}).parse(d))
  .handler(async({data})=>{
    const u=await requireAdmin(["admin"]);
    const row=await q1<{id:string;name:string;payload_enc:string}>("SELECT id,name,payload_enc FROM sources WHERE id=$1",[data.source_id]);
    if(!row) throw new Error("Fonte não encontrada.");
    const {decryptPayload}=await import("./server/sources.server");
    const p=decryptPayload(row.payload_enc);
    const items:{external_key:string;kind:"live"|"movie"|"series";name:string;category:string;stream_ref?:string}[]=[];
    if(p.type==="m3u"){
      const r=await catalogFetch(p.m3u_url); if(!r.ok) throw new Error(`Fonte respondeu HTTP ${r.status}.`);
      const text=(await r.text()).slice(0,25_000_000); const lines=text.split(/\r?\n/);
      const {createHash}=await import("node:crypto");
      for(let i=0;i<lines.length&&items.length<30000;i++){
        const l=lines[i].trim(); if(!l.startsWith("#EXTINF:")) continue;
        let j=i+1; while(j<lines.length&&(!lines[j].trim()||lines[j].trim().startsWith("#"))) j++;
        const stream=lines[j]?.trim(); if(!stream||!/^https?:\/\//i.test(stream)) continue;
        const name=safeName(l.split(",").slice(1).join(","),"Canal");
        const category=safeName(attr(l,"group-title"),"Sem categoria");
        const key=createHash("sha256").update(stream).digest("hex").slice(0,32);
        const probe=(name+" "+category).toLowerCase();
        const movieRx=/\b(filmes?|movies?|cinema|vod)\b/i;
        const seriesRx=/\b(series?|séries?|temporadas?|novelas?|animes?)\b|\bs\d{1,2}\b|\btemporada\b/i;
        const kindGuess:"live"|"movie"|"series"=seriesRx.test(probe)?"series":movieRx.test(probe)?"movie":"live";
        items.push({external_key:key,kind:kindGuess,name,category,stream_ref:stream});
      }
    } else {
      const base=p.server.replace(/\/+$/,""); const auth=`username=${encodeURIComponent(p.username)}&password=${encodeURIComponent(p.password)}`;
      const endpoints:[string,"live"|"movie"|"series"][]=[["get_live_streams","live"],["get_vod_streams","movie"],["get_series","series"]];
      const categories=new Map<string,string>();
      for(const [action,kind] of endpoints){
        const cr=await catalogFetch(`${base}/player_api.php?${auth}&action=get_${kind==="live"?"live":kind==="movie"?"vod":"series"}_categories`);
        if(cr.ok){for(const c of await cr.json() as any[]) categories.set(`${kind}:${c.category_id}`,safeName(c.category_name,"Sem categoria"))}
        const r=await catalogFetch(`${base}/player_api.php?${auth}&action=${action}`); if(!r.ok) continue;
        const arr=await r.json() as any[];
        for(const x of arr.slice(0,30000-items.length)){
          const raw=kind==="series"?x.series_id:x.stream_id; if(raw==null) continue;
          const ext=String(x.container_extension||"").replace(/[^a-zA-Z0-9]/g,"")|| (kind==="live"?"ts":"mp4");
          const streamRef=kind==="series"?undefined:`${base}/${kind==="live"?"live":"movie"}/${encodeURIComponent(p.username)}/${encodeURIComponent(p.password)}/${raw}.${ext}`;
          items.push({external_key:`${kind}:${String(raw)}`,kind,name:safeName(x.name,kind==="live"?"Canal":kind==="movie"?"Filme":"Série"),category:categories.get(`${kind}:${x.category_id}`)||"Sem categoria",stream_ref:streamRef});
        }
      }
    }
    await q("DELETE FROM source_catalog_items WHERE source_id=$1",[data.source_id]);
    const {encryptSecret}=await import("./server/sources.server");
    for(const x of items) await q("INSERT INTO source_catalog_items(source_id,external_key,kind,name,category,stream_ref_enc) VALUES ($1,$2,$3,$4,$5,$6) ON CONFLICT(source_id,external_key) DO UPDATE SET kind=EXCLUDED.kind,name=EXCLUDED.name,category=EXCLUDED.category,stream_ref_enc=EXCLUDED.stream_ref_enc,imported_at=now()",[data.source_id,x.external_key,x.kind,x.name,x.category,x.stream_ref?encryptSecret(x.stream_ref):null]);
    await audit({...actor(u),action:"source.catalog_import",entity:"source",entityId:data.source_id,details:{items:items.length}});
    return {ok:true,count:items.length};
  });

export type CatalogCategory={source_id:string;source_name:string;category:string;kind:"live"|"movie"|"series";items:number;custom_category:string|null};
export const listPlaylistCategories=createServerFn({method:"POST"})
 .inputValidator(d=>z.object({playlist_id:uuid}).parse(d))
 .handler(async({data})=>{await requireAdmin();return q<CatalogCategory>(
 `SELECT ci.source_id,s.name source_name,ci.category,
   coalesce(cr.kind, CASE WHEN count(*) FILTER(WHERE ci.kind='series')>=greatest(count(*) FILTER(WHERE ci.kind='movie'),count(*) FILTER(WHERE ci.kind='live')) THEN 'series'
                          WHEN count(*) FILTER(WHERE ci.kind='movie')>count(*) FILTER(WHERE ci.kind='live') THEN 'movie' ELSE 'live' END) kind,
   count(*)::int items,cr.custom_category
   FROM source_catalog_items ci
   JOIN playlist_sources ps ON ps.source_id=ci.source_id AND ps.playlist_id=$1 AND ps.active
   JOIN sources s ON s.id=ci.source_id
   LEFT JOIN playlist_category_rules cr ON cr.playlist_id=$1 AND cr.source_id=ci.source_id AND cr.source_category=ci.category
   GROUP BY ci.source_id,s.name,ci.category,cr.kind,cr.custom_category ORDER BY s.name,ci.category`,[data.playlist_id])});
export const savePlaylistCategoryRule=createServerFn({method:"POST"})
 .inputValidator(d=>z.object({playlist_id:uuid,source_id:uuid,category:z.string().min(1).max(180),kind:z.enum(["live","movie","series"]),custom_category:z.string().trim().max(120).nullable().optional()}).parse(d))
 .handler(async({data})=>{const u=await requireAdmin(["admin"]);
  await q(`INSERT INTO playlist_category_rules(playlist_id,source_id,source_category,kind,custom_category)
   VALUES($1,$2,$3,$4,$5) ON CONFLICT(playlist_id,source_id,source_category)
   DO UPDATE SET kind=EXCLUDED.kind,custom_category=EXCLUDED.custom_category,updated_at=now()`,
   [data.playlist_id,data.source_id,data.category,data.kind,data.custom_category||null]);
  await q("UPDATE source_catalog_items SET kind=$3 WHERE source_id=$1 AND category=$2",[data.source_id,data.category,data.kind]);
  await audit({...actor(u),action:"playlist.category_rule",entity:"playlist",entityId:data.playlist_id,details:{source_id:data.source_id,category:data.category,kind:data.kind}});
  return{ok:true}});

export type CatalogItem={id:string;source_id:string;source_name:string;kind:"live"|"movie"|"series";name:string;category:string;enabled:boolean;custom_name:string|null;custom_category:string|null};
export const listPlaylistCatalog = createServerFn({method:"POST"})
 .inputValidator(d=>z.object({playlist_id:uuid}).parse(d))
 .handler(async({data})=>{await requireAdmin();return q<CatalogItem>(
   `SELECT ci.id,ci.source_id,s.name source_name,ci.kind,ci.name,ci.category,
    coalesce(r.enabled,true) enabled,r.custom_name,r.custom_category
    FROM source_catalog_items ci JOIN playlist_sources ps ON ps.source_id=ci.source_id AND ps.playlist_id=$1 AND ps.active
    JOIN sources s ON s.id=ci.source_id LEFT JOIN playlist_item_rules r ON r.catalog_item_id=ci.id AND r.playlist_id=$1
    ORDER BY ci.kind,ci.category,ci.name LIMIT 30000`,[data.playlist_id])});
export const savePlaylistItemRule=createServerFn({method:"POST"})
 .inputValidator(d=>z.object({playlist_id:uuid,item_id:uuid,enabled:z.boolean(),custom_name:z.string().trim().max(180).nullable().optional(),custom_category:z.string().trim().max(120).nullable().optional()}).parse(d))
 .handler(async({data})=>{const u=await requireAdmin(["admin"]);await q(
  `INSERT INTO playlist_item_rules(playlist_id,catalog_item_id,enabled,custom_name,custom_category)
   VALUES($1,$2,$3,$4,$5) ON CONFLICT(playlist_id,catalog_item_id) DO UPDATE SET enabled=EXCLUDED.enabled,custom_name=EXCLUDED.custom_name,custom_category=EXCLUDED.custom_category`,
  [data.playlist_id,data.item_id,data.enabled,data.custom_name||null,data.custom_category||null]);
  await audit({...actor(u),action:"playlist.item_rule",entity:"playlist",entityId:data.playlist_id,details:{item_id:data.item_id,enabled:data.enabled}});return{ok:true}});


function m3uClean(v:string){return v.replace(/[\r\n"]/g," ").trim();}
export const exportPlaylistM3u=createServerFn({method:"POST"})
 .inputValidator(d=>z.object({playlist_id:uuid}).parse(d))
 .handler(async({data})=>{
   const u=await requireAdmin(["admin"]);
   const p=await q1<{name:string}>("SELECT name FROM playlists WHERE id=$1 AND active",[data.playlist_id]);
   if(!p) throw new Error("Lista não encontrada ou inativa.");
   const rows=await q<{id:string;name:string;category:string;custom_name:string|null;custom_category:string|null;stream_ref_enc:string|null}>(
    `SELECT ci.id,ci.name,ci.category,r.custom_name,r.custom_category,ci.stream_ref_enc
     FROM source_catalog_items ci JOIN playlist_sources ps ON ps.source_id=ci.source_id AND ps.playlist_id=$1 AND ps.active
     LEFT JOIN playlist_item_rules r ON r.playlist_id=$1 AND r.catalog_item_id=ci.id
     WHERE ci.kind IN ('live','movie') AND coalesce(r.enabled,true)=true AND ci.stream_ref_enc IS NOT NULL
     ORDER BY ps.priority,coalesce(r.sort_order,100),coalesce(r.custom_category,ci.category),coalesce(r.custom_name,ci.name)`,[data.playlist_id]);
   const {decryptSecret}=await import("./server/sources.server");
   const seen=new Set<string>(); const lines=["#EXTM3U"];
   for(const x of rows){
     let url:string; try{url=decryptSecret(x.stream_ref_enc!)}catch{continue}
     if(seen.has(url)) continue; seen.add(url);
     const name=m3uClean(x.custom_name||x.name),group=m3uClean(x.custom_category||x.category);
     lines.push(`#EXTINF:-1 group-title="${group}",${name}`,url);
   }
   await audit({...actor(u),action:"playlist.export_m3u",entity:"playlist",entityId:data.playlist_id,details:{items:seen.size}});
   return {filename:`${p.name.replace(/[^a-zA-Z0-9_-]+/g,"-")||"maxon-play"}.m3u`,content:lines.join("\n"),count:seen.size};
 });

// ---------------- Editor de listas ----------------
export type Playlist = {
  id: string;
  name: string;
  description: string;
  active: boolean;
  updated_at: string;
  sources: number;
  source_names: string;
};
export const listPlaylists = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdmin();
  return q<Playlist>(
    `SELECT p.id,p.name,p.description,p.active,p.updated_at::text AS updated_at,
       count(ps.source_id)::int AS sources,
       coalesce(string_agg(s.name, ', ' ORDER BY ps.priority) FILTER (WHERE ps.active), '') AS source_names
     FROM playlists p
     LEFT JOIN playlist_sources ps ON ps.playlist_id=p.id
     LEFT JOIN sources s ON s.id=ps.source_id
     GROUP BY p.id ORDER BY p.updated_at DESC`,
  );
});
export const getPlaylistEditor = createServerFn({ method: "POST" })
  .inputValidator((d) => z.object({ id: uuid }).parse(d))
  .handler(async ({ data }) => {
    await requireAdmin();
    const playlist = await q1<{id:string;name:string;description:string;active:boolean}>(
      "SELECT id,name,description,active FROM playlists WHERE id=$1", [data.id]
    );
    if (!playlist) throw new Error("Lista não encontrada.");
    const selected = await q<{source_id:string;priority:number;active:boolean}>(
      "SELECT source_id,priority,active FROM playlist_sources WHERE playlist_id=$1 ORDER BY priority", [data.id]
    );
    return { playlist, selected };
  });
export const savePlaylist = createServerFn({ method: "POST" })
  .inputValidator((d) => z.object({
    id: uuid.optional(),
    name: z.string().trim().min(2).max(80),
    description: z.string().trim().max(300).default(""),
    active: z.boolean().default(true),
    source_ids: z.array(uuid).max(50).default([]),
  }).parse(d))
  .handler(async ({ data }) => {
    const u = await requireAdmin(["admin"]);
    let id=data.id;
    if (id) {
      await q("UPDATE playlists SET name=$2,description=$3,active=$4,updated_at=now() WHERE id=$1",
        [id,data.name,data.description,data.active]);
    } else {
      id=(await q1<{id:string}>("INSERT INTO playlists(name,description,active) VALUES ($1,$2,$3) RETURNING id",
        [data.name,data.description,data.active]))!.id;
    }
    await q("DELETE FROM playlist_sources WHERE playlist_id=$1",[id]);
    for (let i=0;i<data.source_ids.length;i++) {
      await q("INSERT INTO playlist_sources(playlist_id,source_id,priority,active) VALUES ($1,$2,$3,true)",
        [id,data.source_ids[i],i+1]);
    }
    await audit({ ...actor(u), action: data.id ? "playlist.update" : "playlist.create", entity: "playlist", entityId:id,
      details:{name:data.name,sources:data.source_ids.length} });
    return {id};
  });
export const deletePlaylist = createServerFn({ method: "POST" })
  .inputValidator((d) => z.object({id:uuid}).parse(d))
  .handler(async ({data}) => {
    const u=await requireAdmin(["admin"]);
    await q("DELETE FROM playlists WHERE id=$1",[data.id]);
    await audit({...actor(u),action:"playlist.delete",entity:"playlist",entityId:data.id});
    return {ok:true};
  });

// ---------------- Fontes / Listas autorizadas ----------------
export type Source = {
  id: string;
  name: string;
  type: "m3u" | "xtream";
  customer_id: string | null;
  customer: string | null;
  display_hint: string;
  version: number;
  updated_at: string;
  activations: number;
  devices: number;
};
export const listSources = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdmin();
  // payload_enc NUNCA é retornado ao painel.
  return q<Source>(
    `SELECT s.id, s.name, s.type, s.customer_id, c.name AS customer, s.display_hint, s.version, s.updated_at::text AS updated_at,
       (SELECT count(*)::int FROM activations a WHERE a.source_id=s.id) AS activations,
       (SELECT count(*)::int FROM devices d WHERE d.source_id=s.id) AS devices
     FROM sources s LEFT JOIN customers c ON c.id=s.customer_id ORDER BY s.updated_at DESC`,
  );
});
const httpUrl = z
  .string()
  .trim()
  .url()
  .max(500)
  .refine((u) => /^https?:\/\//i.test(u), "Use http(s)://");
export const uploadM3uSource = createServerFn({ method: "POST" })
  .inputValidator((d) => z.object({
    name: z.string().trim().min(2).max(80),
    customer_id: uuid.nullable(),
    filename: z.string().trim().min(1).max(180),
    content: z.string().min(1).max(8_000_000),
  }).parse(d))
  .handler(async ({ data }) => {
    const u = await requireAdmin(["admin"]);
    const raw = data.content.replace(/^\uFEFF/, "");
    if (!raw.trimStart().startsWith("#EXTM3U")) throw new Error("Arquivo M3U inválido: cabeçalho #EXTM3U não encontrado.");
    const lines = raw.split(/\r?\n/);
    const { createHash } = await import("node:crypto");
    const { encryptPayload, encryptSecret } = await import("./server/sources.server");
    const localRef = `upload://${createHash("sha256").update(raw).digest("hex").slice(0,24)}/${data.filename.replace(/[^a-zA-Z0-9._-]/g,"_")}`;
    const enc = encryptPayload({ type:"m3u", m3u_url: localRef });
    let source = await q1<{id:string}>(
      "SELECT id FROM sources WHERE name=$1 AND type='m3u' AND customer_id IS NOT DISTINCT FROM $2 AND display_hint LIKE 'M3U enviado · %' ORDER BY updated_at DESC LIMIT 1",
      [data.name,data.customer_id]
    );
    if (source) {
      await q("UPDATE sources SET payload_enc=$2,display_hint=$3,updated_at=now(),version=version+1 WHERE id=$1",
        [source.id,enc,`M3U enviado · ${data.filename.slice(0,80)}`]);
      await q("DELETE FROM source_catalog_items WHERE source_id=$1",[source.id]);
    } else {
      source = await q1<{id:string}>(
        "INSERT INTO sources(name,type,customer_id,payload_enc,display_hint) VALUES ($1,'m3u',$2,$3,$4) RETURNING id",
        [data.name,data.customer_id,enc,`M3U enviado · ${data.filename.slice(0,80)}`]
      );
    }
    if (!source) throw new Error("Não foi possível criar ou atualizar a fonte.");
    let pending:{name:string;category:string}|null=null, count=0;
    const parsed:{key:string;kind:"live"|"movie"|"series";name:string;category:string;enc:string}[]=[];
    const seriesRx=/\b(series?|séries?|temporadas?|novelas?|animes?)\b|\bs\d{1,2}\b|\btemporada\b/i;
    const movieRx=/\b(filmes?|movies?|cinema|vod)\b/i;
    for (const line0 of lines) {
      const line=line0.trim();
      if (line.startsWith("#EXTINF:")) {
        const m=line.match(/group-title="([^"]*)"/i);
        const name=(line.split(",").slice(1).join(",").trim()||"Item").slice(0,180);
        pending={name,category:(m?.[1]?.trim()||"Sem categoria").slice(0,180)};
        continue;
      }
      if (!pending || !/^https?:\/\//i.test(line)) continue;
      const probe=(pending.name+" "+pending.category).toLowerCase();
      const kind:"live"|"movie"|"series"=seriesRx.test(probe)?"series":movieRx.test(probe)?"movie":"live";
      const key=createHash("sha256").update(line).digest("hex").slice(0,32);
      parsed.push({key,kind,name:pending.name,category:pending.category,enc:encryptSecret(line)});
      pending=null;
      if(parsed.length>=30000) break;
    }
    for(let offset=0;offset<parsed.length;offset+=200){
      const batch=parsed.slice(offset,offset+200);
      const params:unknown[]=[];
      const values=batch.map((x,i)=>{
        const n=i*6;
        params.push(source.id,x.key,x.kind,x.name,x.category,x.enc);
        return `($${n+1},$${n+2},$${n+3},$${n+4},$${n+5},$${n+6})`;
      }).join(",");
      await q(`INSERT INTO source_catalog_items(source_id,external_key,kind,name,category,stream_ref_enc)
        VALUES ${values}
        ON CONFLICT(source_id,external_key) DO UPDATE SET kind=EXCLUDED.kind,name=EXCLUDED.name,category=EXCLUDED.category,stream_ref_enc=EXCLUDED.stream_ref_enc,imported_at=now()`,params);
      count+=batch.length;
    }
    if (!count) { await q("DELETE FROM sources WHERE id=$1",[source.id]); throw new Error("Nenhum stream HTTP/HTTPS válido foi encontrado no arquivo."); }
    await audit({...actor(u),action:"source.upload_m3u",entity:"source",entityId:source.id,details:{filename:data.filename,items:count}});
    return {id:source.id,count};
  });

export const saveSource = createServerFn({ method: "POST" })
  .inputValidator((d) =>
    z
      .object({
        id: uuid.optional(),
        name: z.string().trim().min(2).max(80),
        type: z.enum(["m3u", "xtream"]),
        customer_id: uuid.nullable(),
        m3u_url: httpUrl.optional().or(z.literal("")),
        epg_url: httpUrl.optional().or(z.literal("")),
        server: httpUrl.optional().or(z.literal("")),
        username: z.string().trim().max(120).optional(),
        password: z.string().max(200).optional(),
      })
      .parse(d),
  )
  .handler(async ({ data }) => {
    const u = await requireAdmin();
    const { encryptPayload, decryptPayload, displayHint } = await import("./server/sources.server");
    let current: import("./server/sources.server").SourcePayload | null = null;
    if (data.id) {
      const row = await q1<{ payload_enc: string; type: string }>(
        "SELECT payload_enc, type FROM sources WHERE id=$1",
        [data.id],
      );
      if (!row) throw new Error("Fonte não encontrada.");
      if (row.type === data.type) current = decryptPayload(row.payload_enc);
    }
    let payload: import("./server/sources.server").SourcePayload;
    if (data.type === "m3u") {
      const prev = current?.type === "m3u" ? current : null;
      const url = data.m3u_url || prev?.m3u_url;
      if (!url) throw new Error("Informe a URL M3U autorizada.");
      const epg = data.epg_url || prev?.epg_url;
      payload = epg ? { type: "m3u", m3u_url: url, epg_url: epg } : { type: "m3u", m3u_url: url };
    } else {
      const prev = current?.type === "xtream" ? current : null;
      const server = data.server || prev?.server;
      const username = data.username || prev?.username;
      const password = data.password || prev?.password; // em branco = manter a senha salva
      if (!server || !username || !password)
        throw new Error("Informe servidor, usuário e senha Xtream autorizados.");
      payload = { type: "xtream", server: server.replace(/\/+$/, ""), username, password };
    }
    const enc = encryptPayload(payload);
    const hint = displayHint(payload);
    let id = data.id;
    if (id) {
      await q(
        "UPDATE sources SET name=$2,type=$3,customer_id=$4,payload_enc=$5,display_hint=$6,version=version+1,updated_at=now() WHERE id=$1",
        [id, data.name, data.type, data.customer_id, enc, hint],
      );
    } else {
      id = (await q1<{ id: string }>(
        "INSERT INTO sources(name,type,customer_id,payload_enc,display_hint) VALUES ($1,$2,$3,$4,$5) RETURNING id",
        [data.name, data.type, data.customer_id, enc, hint],
      ))!.id;
    }
    await audit({
      ...actor(u),
      action: data.id ? "source.update" : "source.create",
      entity: "source",
      entityId: id,
      details: { name: data.name, type: data.type },
    });
    return { id };
  });
export const deleteSource = createServerFn({ method: "POST" })
  .inputValidator((d) => z.object({ id: uuid }).parse(d))
  .handler(async ({ data }) => {
    const u = await requireAdmin();
    await q("UPDATE activations SET source_id=NULL, config_rev=config_rev+1 WHERE source_id=$1", [
      data.id,
    ]);
    await q("UPDATE devices SET source_id=NULL, config_rev=config_rev+1 WHERE source_id=$1", [
      data.id,
    ]);
    await q("DELETE FROM sources WHERE id=$1", [data.id]);
    await audit({ ...actor(u), action: "source.delete", entity: "source", entityId: data.id });
    return { ok: true };
  });
/** Fonte atribuída à ativação ou ao aparelho. source_id null = remover. O app sincroniza no próximo heartbeat. */
export const assignSource = createServerFn({ method: "POST" })
  .inputValidator((d) =>
    z
      .object({ target: z.enum(["activation", "device"]), id: uuid, source_id: uuid.nullable() })
      .parse(d),
  )
  .handler(async ({ data }) => {
    const u = await requireAdmin();
    const table = data.target === "activation" ? "activations" : "devices";
    await q(`UPDATE ${table} SET source_id=$2, config_rev=config_rev+1 WHERE id=$1`, [
      data.id,
      data.source_id,
    ]);
    await audit({
      ...actor(u),
      action: data.source_id ? "source.assign" : "source.unassign",
      entity: data.target,
      entityId: data.id,
      details: { source_id: data.source_id },
    });
    return { ok: true };
  });
/** "Sincronizar no aparelho": força nova config_version para o app recarregar a lista. */
export const forceSync = createServerFn({ method: "POST" })
  .inputValidator((d) => z.object({ target: z.enum(["activation", "device"]), id: uuid }).parse(d))
  .handler(async ({ data }) => {
    const u = await requireAdmin();
    await q(
      `UPDATE ${data.target === "activation" ? "activations" : "devices"} SET config_rev=config_rev+1 WHERE id=$1`,
      [data.id],
    );
    await audit({
      ...actor(u),
      action: "source.force_sync",
      entity: data.target,
      entityId: data.id,
    });
    return { ok: true };
  });

export const generateMissingCustomerCredentials = createServerFn({ method: "POST" })
  .handler(async () => {
    const u = await requireAdmin();

    const customers = await q<{
      id: string;
      app_username: string | null;
      app_password: string | null;
    }>(
      `SELECT id, app_username, app_password
       FROM customers
       WHERE app_username IS NULL OR app_password IS NULL`
    );

    let updated = 0;

    for (const customer of customers) {
      let username = customer.app_username;

      if (!username) {
        for (let tentativa = 0; tentativa < 100; tentativa++) {
          const candidato = String(Math.floor(10000 + Math.random() * 90000));

          const existente = await q1<{ id: string }>(
            `SELECT id FROM customers WHERE app_username=$1 LIMIT 1`,
            [candidato],
          );

          if (!existente) {
            username = candidato;
            break;
          }
        }
      }

      if (!username) {
        throw new Error("Nao foi possivel gerar usuario unico");
      }

      const password =
        customer.app_password ??
        String(Math.floor(10000 + Math.random() * 90000));

      await q(
        `UPDATE customers
         SET app_username=$2, app_password=$3
         WHERE id=$1`,
        [customer.id, username, password],
      );

      updated++;
    }

    await audit({
      ...actor(u),
      action: "customer.credentials.backfill",
      entity: "customer",
      details: { updated },
    });

    return { ok: true, updated };
  });
