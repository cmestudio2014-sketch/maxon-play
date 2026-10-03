import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  DataTable,
  Field,
  PageHeader,
  StatusBadge,
  Td,
  useAction,
  useAdminQuery,
} from "@/components/admin-ui";
import { brl } from "@/components/brand";
import { listPlans, savePlan, type Plan } from "@/lib/admin.functions";

export const Route = createFileRoute("/admin/planos")({ component: Planos });

type F = Omit<Plan, "id"> & { id?: string; price: string };

function Planos() {
  const list = useServerFn(listPlans);
  const save = useServerFn(savePlan);
  const act = useAction();
  const { data = [] } = useAdminQuery("plans", () => list());
  const [f, setF] = useState<F | null>(null);
  const open = (p?: Plan) =>
    setF(
      p
        ? { ...p, price: (p.price_cents / 100).toFixed(2) }
        : {
            code: "",
            name: "",
            description: "",
            duration_days: 30,
            price_cents: 0,
            highlight: false,
            active: true,
            sort: data.length + 1,
            price: "",
          },
    );
  const submit = async () => {
    if (!f) return;
    const { price, ...rest } = f;
    const r = await act(
      save({ data: { ...rest, price_cents: Math.round(Number(price.replace(",", ".")) * 100) } }),
      "Plano salvo. A página /planos já mostra o novo valor.",
      ["plans"],
    );
    if (r) setF(null);
  };
  return (
    <>
      <PageHeader
        title="Planos"
        desc="Preços exibidos em /planos e usados nas vendas."
        action={
          <Button variant="hero" onClick={() => open()}>
            <Plus />
            Novo plano
          </Button>
        }
      />
      <DataTable head={["Nome", "Código", "Duração", "Preço", "Destaque", "Status", ""]}>
        {data.map((p) => (
          <tr key={p.id}>
            <Td className="font-medium">{p.name}</Td>
            <Td className="font-mono text-xs">{p.code}</Td>
            <Td>{p.duration_days} dias</Td>
            <Td>{brl(p.price_cents)}</Td>
            <Td>{p.highlight ? "Sim" : "—"}</Td>
            <Td>
              <StatusBadge s={p.active ? "ativo" : "inativo"} />
            </Td>
            <Td>
              <Button size="sm" variant="secondary" onClick={() => open(p)}>
                Editar
              </Button>
            </Td>
          </tr>
        ))}
      </DataTable>
      <Dialog open={!!f} onOpenChange={(o) => !o && setF(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{f?.id ? "Editar plano" : "Novo plano"}</DialogTitle>
          </DialogHeader>
          {f && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Field label="Nome">
                  <Input value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
                </Field>
                <Field label="Código" hint="minúsculas, ex: mensal">
                  <Input
                    value={f.code}
                    onChange={(e) => setF({ ...f, code: e.target.value.toLowerCase() })}
                  />
                </Field>
                <Field label="Duração (dias)">
                  <Input
                    type="number"
                    value={f.duration_days}
                    onChange={(e) => setF({ ...f, duration_days: Number(e.target.value) })}
                  />
                </Field>
                <Field label="Preço (R$)">
                  <Input
                    inputMode="decimal"
                    value={f.price}
                    onChange={(e) => setF({ ...f, price: e.target.value })}
                  />
                </Field>
              </div>
              <Field label="Descrição">
                <Input
                  value={f.description}
                  onChange={(e) => setF({ ...f, description: e.target.value })}
                />
              </Field>
              <Field label="Ordem">
                <Input
                  type="number"
                  value={f.sort}
                  onChange={(e) => setF({ ...f, sort: Number(e.target.value) })}
                />
              </Field>
              <div className="flex gap-6 text-sm">
                <label className="flex items-center gap-2">
                  <Switch
                    checked={f.highlight}
                    onCheckedChange={(v) => setF({ ...f, highlight: v })}
                  />
                  Destaque
                </label>
                <label className="flex items-center gap-2">
                  <Switch checked={f.active} onCheckedChange={(v) => setF({ ...f, active: v })} />
                  Ativo
                </label>
              </div>
              <Button variant="hero" className="w-full" onClick={submit}>
                Salvar
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}