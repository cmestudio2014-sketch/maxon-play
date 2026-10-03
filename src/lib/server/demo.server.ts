// Dados demo fictícios (sem conteúdo IPTV). Só roda em preview ou com SEED_DEMO=true.
import { q, q1 } from "./db.server";
import { displayIdFor, hashKey } from "./crypto.server";

export const DEMO_KEYS = ["DEMO-AAAA-BBBB-CCC2", "DEMO-AAAA-BBBB-CCC3", "DEMO-AAAA-BBBB-CCC4"];

export async function seedDemo(): Promise<void> {
  const exists = await q1("SELECT 1 FROM customers WHERE notes LIKE '[demo]%' LIMIT 1");
  if (exists) return;
  const plans = await q<{ id: string; code: string; price_cents: number }>(
    "SELECT id, code, price_cents FROM plans",
  );
  const mensal = plans.find((p) => p.code === "mensal");
  const anual = plans.find((p) => p.code === "anual");
  if (!mensal || !anual) return;

  const people = [
    ["Ana Souza", "5511990000001", "ana@exemplo.com"],
    ["Bruno Lima", "5521990000002", null],
    ["Carla Mendes", "5531990000003", "carla@exemplo.com"],
    ["Diego Rocha", "5541990000004", null],
    ["Elisa Prado", "5551990000005", null],
  ] as const;

  for (let i = 0; i < people.length; i++) {
    const [name, wa, email] = people[i]!;
    const c = await q1<{ id: string }>(
      "INSERT INTO customers(name,whatsapp,email,notes) VALUES ($1,$2,$3,$4) RETURNING id",
      [name, wa, email, "[demo] cliente fictício"],
    );
    const plan = i % 2 === 0 ? anual : mensal;
    const status = i === 3 ? "pago" : i === 4 ? "pendente" : "pago";
    await q(
      "INSERT INTO sales(order_number,customer_id,plan_id,amount_cents,status,payment_method,created_at,paid_at) VALUES ($1,$2,$3,$4,$5,'pix', now() - ($6 || ' days')::interval, CASE WHEN $5='pago' THEN now() - ($6 || ' days')::interval END)",
      [
        `MX-DEMO-${String(i + 1).padStart(3, "0")}`,
        c!.id,
        plan.id,
        plan.price_cents,
        status,
        String(i * 6),
      ],
    );
    if (i < 3) {
      const uid = `demo-device-${i + 1}`;
      const dev = await q1<{ id: string }>(
        "INSERT INTO devices(device_uid,display_id,platform,model,app_version,last_seen_at) VALUES ($1,$2,$3,$4,'1.0.0', now() - interval '2 hours') RETURNING id",
        [
          uid,
          displayIdFor(uid),
          i === 1 ? "tizen" : "android",
          i === 1 ? "Samsung TV (demo)" : "Android TV Box (demo)",
        ],
      );
      const key = DEMO_KEYS[i]!;
      const days = i === 2 ? -3 : i === 1 ? 5 : 200;
      await q(
        "INSERT INTO activations(customer_id,plan_id,device_id,key_hash,key_last4,status,starts_at,expires_at) VALUES ($1,$2,$3,$4,$5,$6, now() - interval '30 days', now() + ($7 || ' days')::interval)",
        [
          c!.id,
          plan.id,
          dev!.id,
          hashKey(key),
          key.slice(-4),
          days < 0 ? "expirada" : "ativa",
          String(days),
        ],
      );
    }
  }
  console.log("[demo] Dados demo criados.");
}