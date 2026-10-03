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
  selectCls,
  useAction,
  useAdminQuery,
} from "@/components/admin-ui";
import { fmtDateTime } from "@/components/brand";
import { listUsers, saveUser, type StaffUser } from "@/lib/admin.functions";

export const Route = createFileRoute("/admin/usuarios")({ component: Usuarios });

type F = {
  id?: string;
  name: string;
  email: string;
  role: "admin" | "vendedor";
  active: boolean;
  password: string;
};

function Usuarios() {
  const list = useServerFn(listUsers);
  const save = useServerFn(saveUser);
  const act = useAction();
  const { data = [], error } = useAdminQuery("users", () => list());
  const [f, setF] = useState<F | null>(null);
  const open = (u?: StaffUser) =>
    setF(
      u
        ? {
            id: u.id,
            name: u.name,
            email: u.email,
            role: u.role as F["role"],
            active: u.active,
            password: "",
          }
        : { name: "", email: "", role: "vendedor", active: true, password: "" },
    );
  const submit = async () => {
    if (!f) return;
    const r = await act(save({ data: f }), "Usuário salvo.", ["users"]);
    if (r) setF(null);
  };
  if (error) return <p className="text-destructive">{(error as Error).message}</p>;
  return (
    <>
      <PageHeader
        title="Usuários"
        desc="Admin: acesso total. Vendedor: clientes, ativações, fontes e vendas."
        action={
          <Button variant="hero" onClick={() => open()}>
            <Plus />
            Novo usuário
          </Button>
        }
      />
      <DataTable head={["Nome", "Email", "Papel", "Status", "Último login", ""]}>
        {data.map((u) => (
          <tr key={u.id}>
            <Td className="font-medium">{u.name}</Td>
            <Td>{u.email}</Td>
            <Td className="capitalize">{u.role}</Td>
            <Td>
              <StatusBadge s={u.active ? "ativo" : "inativo"} />
            </Td>
            <Td>{fmtDateTime(u.last_login_at)}</Td>
            <Td>
              <Button size="sm" variant="secondary" onClick={() => open(u)}>
                Editar
              </Button>
            </Td>
          </tr>
        ))}
      </DataTable>
      <Dialog open={!!f} onOpenChange={(o) => !o && setF(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{f?.id ? "Editar usuário" : "Novo usuário"}</DialogTitle>
          </DialogHeader>
          {f && (
            <div className="space-y-3">
              <Field label="Nome">
                <Input value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
              </Field>
              <Field label="Email">
                <Input
                  type="email"
                  value={f.email}
                  onChange={(e) => setF({ ...f, email: e.target.value })}
                />
              </Field>
              <Field label="Papel">
                <select
                  className={selectCls}
                  value={f.role}
                  onChange={(e) => setF({ ...f, role: e.target.value as F["role"] })}
                >
                  <option value="vendedor">Vendedor</option>
                  <option value="admin">Admin</option>
                </select>
              </Field>
              <Field label={f.id ? "Nova senha (opcional)" : "Senha"} hint="Mínimo 10 caracteres">
                <Input
                  type="password"
                  value={f.password}
                  onChange={(e) => setF({ ...f, password: e.target.value })}
                  autoComplete="new-password"
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