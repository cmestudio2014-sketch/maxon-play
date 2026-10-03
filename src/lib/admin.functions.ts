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
    const r = await q1<{ id: string }>(
      "INSERT INTO customers(name,whatsapp,email,notes,status) VALUES ($1,$2,$3,$4,$5) RETURNING id",
      [data.name, data.whatsapp, email, data.notes, data.status],
    );
    await audit({ ...actor(u), action: "customer.create", entity: "customer", entityId: r!.id });
    return { id: r!.id };
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