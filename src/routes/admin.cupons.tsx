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
import { fmtDate } from "@/components/brand";
import { listCoupons, saveCoupon, type Coupon } from "@/lib/admin.functions";

export const Route = createFileRoute("/admin/cupons")({ component: Cupons });

type F = {
  id?: string;
  code: string;
  percent_off: number;
  max_uses: string;
  expires_at: string;
  active: boolean;
};

function Cupons() {
  const list = useServerFn(listCoupons);
  const save = useServerFn(saveCoupon);
  const act = useAction();
  const { data = [] } = useAdminQuery("coupons", () => list());
  const [f, setF] = useState<F | null>(null);
  const open = (c?: Coupon) =>
    setF(
      c
        ? {
            id: c.id,
            code: c.code,
            percent_off: c.percent_off,
            max_uses: c.max_uses ? String(c.max_uses) : "",
            expires_at: c.expires_at ? new Date(c.expires_at).toISOString().slice(0, 10) : "",
            active: c.active,
          }
        : { code: "", percent_off: 10, max_uses: "", expires_at: "", active: true },
    );
  const submit = async () => {
    if (!f) return;
    const r = await act(
      save({
        data: {
          ...(f.id ? { id: f.id } : {}),
          code: f.code,
          percent_off: f.percent_off,
          max_uses: f.max_uses ? Number(f.max_uses) : null,
          expires_at: f.expires_at || null,
          active: f.active,
        },
      }),
      "Cupom salvo.",
      ["coupons"],
    );
    if (r) setF(null);
  };
  return (
    <>
      <PageHeader
        title="Cupons"
        desc="Descontos percentuais aplicados nas vendas."
        action={
          <Button variant="hero" onClick={() => open()}>
            <Plus />
            Novo cupom
          </Button>
        }
      />
      <DataTable
        head={["Código", "Desconto", "Usos", "Expira", "Status", ""]}
        empty={data.length === 0}
      >
        {data.map((c) => (
          <tr key={c.id}>
            <Td className="font-mono">{c.code}</Td>
            <Td>{c.percent_off}%</Td>
            <Td>
              {c.uses}
              {c.max_uses ? ` / ${c.max_uses}` : ""}
            </Td>
            <Td>{fmtDate(c.expires_at)}</Td>
            <Td>
              <StatusBadge s={c.active ? "ativo" : "inativo"} />
            </Td>
            <Td>
              <Button size="sm" variant="secondary" onClick={() => open(c)}>
                Editar
              </Button>
            </Td>
          </tr>
        ))}
      </DataTable>
      <Dialog open={!!f} onOpenChange={(o) => !o && setF(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{f?.id ? "Editar cupom" : "Novo cupom"}</DialogTitle>
          </DialogHeader>
          {f && (
            <div className="space-y-3">
              <Field label="Código">
                <Input
                  value={f.code}
                  onChange={(e) => setF({ ...f, code: e.target.value.toUpperCase() })}
                />
              </Field>
              <Field label="Desconto (%)">
                <Input
                  type="number"
                  min={1}
                  max={100}
                  value={f.percent_off}
                  onChange={(e) => setF({ ...f, percent_off: Number(e.target.value) })}
                />
              </Field>
              <Field label="Limite de usos (opcional)">
                <Input
                  type="number"
                  value={f.max_uses}
                  onChange={(e) => setF({ ...f, max_uses: e.target.value })}
                />
              </Field>
              <Field label="Expira em (opcional)">
                <Input
                  type="date"
                  value={f.expires_at}
                  onChange={(e) => setF({ ...f, expires_at: e.target.value })}
                />
              </Field>
              <label className="flex items-center gap-2 text-sm">
                <Switch checked={f.active} onCheckedChange={(v) => setF({ ...f, active: v })} />
                Ativo
              </label>
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