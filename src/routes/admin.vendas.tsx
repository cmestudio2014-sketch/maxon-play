import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Copy, Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  DataTable,
  Field,
  PageHeader,
  StatusBadge,
  Td,
  selectCls,
  useAction,
  useAdminQuery,
} from "@/components/admin-ui";
import { brl, fmtDateTime } from "@/components/brand";
import {
  createSale,
  listCustomers,
  listPlans,
  listSales,
  setSaleStatus,
} from "@/lib/admin.functions";

export const Route = createFileRoute("/admin/vendas")({ component: Vendas });

type Method = "pix" | "dinheiro" | "cartao" | "transferencia" | "outro";

function Vendas() {
  const list = useServerFn(listSales);
  const customers = useServerFn(listCustomers);
  const plans = useServerFn(listPlans);
  const create = useServerFn(createSale);
  const setStatus = useServerFn(setSaleStatus);
  const act = useAction();
  const { data = [] } = useAdminQuery("sales", () => list());
  const { data: cs = [] } = useAdminQuery("customers", () => customers());
  const { data: ps = [] } = useAdminQuery("plans", () => plans());
  const [open, setOpen] = useState(false);
  const [key, setKey] = useState<string | null>(null);
  const [f, setF] = useState({
    customer_id: "",
    plan_id: "",
    coupon_code: "",
    payment_method: "pix" as Method,
    status: "pendente" as "pendente" | "pago",
  });

  const markPaid = async (id: string) => {
    const r = await act(
      setStatus({ data: { id, status: "pago", generate_key: true } }),
      "Venda marcada como paga.",
      ["sales", "activations", "dashboard"],
    );
    if (r?.key) setKey(r.key);
  };
  const submit = async () => {
    const planId = f.plan_id || ps[0]?.id || "";
    const r = await act(
      create({
        data: {
          customer_id: f.customer_id,
          plan_id: planId,
          payment_method: f.payment_method,
          status: f.status,
          ...(f.coupon_code ? { coupon_code: f.coupon_code } : {}),
        },
      }),
      "Venda registrada.",
      ["sales", "dashboard"],
    );
    if (r) {
      setOpen(false);
      if (f.status === "pago") await markPaid(r.id);
    }
  };
  return (
    <>
      <PageHeader
        title="Vendas"
        desc="Ao marcar como paga, uma KEY é gerada para o cliente."
        action={
          <Button variant="hero" onClick={() => setOpen(true)}>
            <Plus />
            Nova venda
          </Button>
        }
      />
      <DataTable
        head={[
          "Pedido",
          "Cliente",
          "Plano",
          "Valor",
          "Cupom",
          "Método",
          "Status",
          "Data",
          "Vendedor",
          "",
        ]}
        empty={data.length === 0}
      >
        {data.map((s) => (
          <tr key={s.id}>
            <Td className="font-mono text-xs">{s.order_number}</Td>
            <Td>{s.customer ?? "—"}</Td>
            <Td>{s.plan ?? "—"}</Td>
            <Td>{brl(s.amount_cents)}</Td>
            <Td>{s.coupon ?? "—"}</Td>
            <Td className="capitalize">{s.payment_method}</Td>
            <Td>
              <StatusBadge s={s.status} />
            </Td>
            <Td>{fmtDateTime(s.created_at)}</Td>
            <Td>{s.seller ?? "—"}</Td>
            <Td>
              {s.status === "pendente" && (
                <div className="flex gap-2">
                  <Button size="sm" variant="hero" onClick={() => markPaid(s.id)}>
                    Marcar pago
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() =>
                      act(
                        setStatus({ data: { id: s.id, status: "cancelado", generate_key: false } }),
                        "Venda cancelada.",
                        ["sales", "dashboard"],
                      )
                    }
                  >
                    Cancelar
                  </Button>
                </div>
              )}
            </Td>
          </tr>
        ))}
      </DataTable>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nova venda</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Field label="Cliente">
              <select
                className={selectCls}
                value={f.customer_id}
                onChange={(e) => setF({ ...f, customer_id: e.target.value })}
              >
                <option value="">— selecione —</option>
                {cs.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Plano">
              <select
                className={selectCls}
                value={f.plan_id || ps[0]?.id || ""}
                onChange={(e) => setF({ ...f, plan_id: e.target.value })}
              >
                {ps
                  .filter((p) => p.active)
                  .map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} — {brl(p.price_cents)}
                    </option>
                  ))}
              </select>
            </Field>
            <Field label="Cupom (opcional)">
              <Input
                value={f.coupon_code}
                onChange={(e) => setF({ ...f, coupon_code: e.target.value.toUpperCase() })}
              />
            </Field>
            <Field label="Método de pagamento">
              <select
                className={selectCls}
                value={f.payment_method}
                onChange={(e) => setF({ ...f, payment_method: e.target.value as Method })}
              >
                <option value="pix">PIX</option>
                <option value="dinheiro">Dinheiro</option>
                <option value="cartao">Cartão</option>
                <option value="transferencia">Transferência</option>
                <option value="outro">Outro</option>
              </select>
            </Field>
            <Field label="Status">
              <select
                className={selectCls}
                value={f.status}
                onChange={(e) => setF({ ...f, status: e.target.value as "pendente" | "pago" })}
              >
                <option value="pendente">Pendente</option>
                <option value="pago">Pago (gera KEY)</option>
              </select>
            </Field>
            <Button variant="hero" className="w-full" disabled={!f.customer_id} onClick={submit}>
              Registrar venda
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={!!key} onOpenChange={(o) => !o && setKey(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>KEY do cliente</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Envie ao cliente agora — ela não será exibida novamente. Para enviar lista ao ativar,
            atribua uma fonte em Ativações.
          </p>
          <p className="rounded-xl bg-secondary p-4 text-center font-mono text-2xl tracking-widest text-primary">
            {key}
          </p>
          <Button
            variant="hero"
            onClick={() => {
              void navigator.clipboard.writeText(key ?? "");
              toast.success("Copiada!");
            }}
          >
            <Copy />
            Copiar
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}