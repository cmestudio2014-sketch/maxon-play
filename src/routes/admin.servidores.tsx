import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Plus, Server } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { DataTable, Field, PageHeader, Td, useAction, useAdminQuery } from "@/components/admin-ui";
import { deleteProviderServer, listProviderServers, saveProviderServer, type ProviderServer } from "@/lib/admin.functions";

export const Route = createFileRoute("/admin/servidores")({ component: Servidores });

function Servidores() {
  const list = useServerFn(listProviderServers);
  const save = useServerFn(saveProviderServer);
  const del = useServerFn(deleteProviderServer);
  const act = useAction();
  const { data = [] } = useAdminQuery("provider-servers", () => list());
  const [editing, setEditing] = useState<ProviderServer | "new" | null>(null);
  const current = editing === "new" ? null : editing;

  return (
    <>
      <PageHeader
        title="Servidores"
        desc="DNS/servidores autorizados fornecidos pelo seu provedor."
        action={<Button variant="hero" onClick={() => setEditing("new")}><Plus /> Novo servidor</Button>}
      />
      <DataTable head={["Nome", "DNS / URL base", "Prioridade", "Status", ""]} empty={data.length === 0}>
        {data.map((s) => (
          <tr key={s.id}>
            <Td className="font-medium">{s.name}</Td>
            <Td className="text-muted-foreground">{s.base_url}</Td>
            <Td>{s.priority}</Td>
            <Td>{s.active ? "Ativo" : "Inativo"}</Td>
            <Td>
              <div className="flex gap-2">
                <Button size="sm" variant="secondary" onClick={() => setEditing(s)}>Editar</Button>
                <Button size="sm" variant="destructive" onClick={() => {
                  if (confirm(`Remover "${s.name}"?`))
                    void act(del({ data: { id: s.id } }), "Servidor removido.", ["provider-servers"]);
                }}>Remover</Button>
              </div>
            </Td>
          </tr>
        ))}
      </DataTable>
      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editing === "new" ? "Novo servidor" : "Editar servidor"}</DialogTitle></DialogHeader>
          {editing && <ServerForm initial={current} onSave={async (data) => {
            await act(save({ data }), "Servidor salvo.", ["provider-servers"]);
            setEditing(null);
          }} />}
        </DialogContent>
      </Dialog>
    </>
  );
}

function ServerForm({ initial, onSave }: { initial: ProviderServer | null; onSave: (data: { id?: string; name: string; base_url: string; priority: number; active: boolean }) => Promise<void> }) {
  const [name, setName] = useState(initial?.name ?? "");
  const [baseUrl, setBaseUrl] = useState(initial?.base_url ?? "");
  const [priority, setPriority] = useState(initial?.priority ?? 100);
  const [active, setActive] = useState(initial?.active ?? true);
  const [busy, setBusy] = useState(false);
  return (
    <form className="space-y-4" onSubmit={async (e) => {
      e.preventDefault(); setBusy(true);
      try { await onSave({ ...(initial ? { id: initial.id } : {}), name, base_url: baseUrl, priority, active }); }
      finally { setBusy(false); }
    }}>
      <Field label="Nome interno"><Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex: Servidor 1" required /></Field>
      <Field label="DNS / URL base"><Input value={baseUrl} onChange={(e) => setBaseUrl(e.target.value)} placeholder="https://servidor.exemplo" required /></Field>
      <Field label="Prioridade" hint="Menor número = maior prioridade"><Input type="number" min={1} max={999} value={priority} onChange={(e) => setPriority(Number(e.target.value))} required /></Field>
      <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)} /> Ativo</label>
      <Button type="submit" variant="hero" className="w-full" disabled={busy}><Server className="h-4 w-4" /> {busy ? "Salvando…" : "Salvar servidor"}</Button>
    </form>
  );
}
