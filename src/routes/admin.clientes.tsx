import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { fmtDate } from "@/components/brand";
import { listCustomers, saveCustomer, type Customer } from "@/lib/admin.functions";

export const Route = createFileRoute("/admin/clientes")({ component: Clientes });

type Form = {
  id?: string;
  name: string;
  whatsapp: string;
  email: string;
  notes: string;
  status: "ativo" | "inativo" | "bloqueado";
};
const empty: Form = { name: "", whatsapp: "", email: "", notes: "", status: "ativo" };

function Clientes() {
  const list = useServerFn(listCustomers);
  const save = useServerFn(saveCustomer);
  const act = useAction();
  const { data = [] } = useAdminQuery("customers", () => list());
  const [form, setForm] = useState<Form | null>(null);
  const [search, setSearch] = useState("");
  const rows = data.filter((c) =>
    `${c.name} ${c.whatsapp} ${c.email ?? ""}`.toLowerCase().includes(search.toLowerCase()),
  );
  const edit = (c: Customer) =>
    setForm({
      id: c.id,
      name: c.name,
      whatsapp: c.whatsapp,
      email: c.email ?? "",
      notes: c.notes,
      status: c.status as Form["status"],
    });
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;
    const r = await act(save({ data: form }), "Cliente salvo.", ["customers"]);
    if (r) setForm(null);
  };
  return (
    <>
      <PageHeader
        title="Clientes"
        desc={`${data.length} cadastrados`}
        action={
          <Button variant="hero" onClick={() => setForm(empty)}>
            <Plus />
            Novo cliente
          </Button>
        }
      />
      <Input
        placeholder="Buscar por nome, WhatsApp ou email"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 max-w-sm"
      />
      <DataTable
        head={["Nome", "WhatsApp", "Usuário", "Senha", "Email", "Ativações", "Status", "Desde", ""]}
        empty={rows.length === 0}
      >
        {rows.map((c) => (
          <tr key={c.id}>
            <Td className="font-medium">{c.name}</Td>
            <Td>
              <a
                href={`https://wa.me/${(c.whatsapp ?? "").replace(/\D/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="text-primary"
              >
                {c.whatsapp}
              </a>
            </Td>
              <Td className="font-mono font-semibold">{c.app_username ?? "—"}</Td>
              <Td className="font-mono font-semibold">{c.app_password ?? "—"}</Td>
            <Td>{c.email ?? "—"}</Td>
            <Td>{c.activations}</Td>
            <Td>
              <StatusBadge s={c.status} />
            </Td>
            <Td>{fmtDate(c.created_at)}</Td>
            <Td>
              <div className="flex gap-2">
                <Button size="sm" variant="secondary" onClick={() => edit(c)}>
                  Editar
                </Button>

                {c.whatsapp && c.app_username && c.app_password && (
                  <a
                    href={`https://wa.me/${c.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
                      `Olá ${c.name}! Sua MAXON PLAY está ativa.\n\nUsuário: ${c.app_username}\nSenha: ${c.app_password}\n\nBom entretenimento!`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Button size="sm" variant="hero">
                      WhatsApp
                    </Button>
                  </a>
                )}
              </div>
            </Td>
          </tr>
        ))}
      </DataTable>
      <Dialog open={!!form} onOpenChange={(o) => !o && setForm(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{form?.id ? "Editar cliente" : "Novo cliente"}</DialogTitle>
          </DialogHeader>
          {form && (
            <form onSubmit={submit} className="space-y-3">
              <Field label="Nome">
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </Field>
              <Field label="WhatsApp" hint="DDI + DDD + número, só dígitos. Ex: 5511999999999">
                <Input
                  value={form.whatsapp}
                  onChange={(e) =>
                    setForm({ ...form, whatsapp: e.target.value.replace(/\D/g, "") })
                  }
                  required
                />
              </Field>
              <Field label="Email (opcional)">
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </Field>
              <Field label="Observações">
                <Textarea
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                />
              </Field>
              <Field label="Status">
                <select
                  className={selectCls}
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value as Form["status"] })}
                >
                  <option value="ativo">Ativo</option>
                  <option value="inativo">Inativo</option>
                  <option value="bloqueado">Bloqueado</option>
                </select>
              </Field>
              <Button type="submit" variant="hero" className="w-full">
                Salvar
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
