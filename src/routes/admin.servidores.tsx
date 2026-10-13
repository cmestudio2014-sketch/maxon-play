import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Activity, Plus, RefreshCw, Server } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { DataTable, Field, PageHeader, Td, useAction, useAdminQuery } from "@/components/admin-ui";
import { deleteProviderServer, listProviderServers, saveProviderServer, testProviderServer, type ProviderServer } from "@/lib/admin.functions";

export const Route = createFileRoute("/admin/servidores")({ component: Servidores });

function healthLabel(s: ProviderServer) {
  if (!s.health_status) return <span className="text-muted-foreground">Não testado</span>;
  if (s.health_status === "online") return <span className="font-medium text-success">● Online</span>;
  if (s.health_status === "respondeu") return <span className="font-medium text-amber-500">● Respondeu</span>;
  return <span className="font-medium text-destructive">● Offline</span>;
}
function healthDetail(s: ProviderServer) {
  if (!s.health_status) return "—";
  const parts = [];
  if (s.health_http) parts.push(`HTTP ${s.health_http}`);
  if (s.health_latency_ms != null) parts.push(`${s.health_latency_ms} ms`);
  return parts.join(" · ") || "Sem resposta";
}

function Servidores() {
  const list = useServerFn(listProviderServers);
  const save = useServerFn(saveProviderServer);
  const del = useServerFn(deleteProviderServer);
  const test = useServerFn(testProviderServer);
  const act = useAction();
  const { data = [] } = useAdminQuery("provider-servers", () => list());
  const [editing, setEditing] = useState<ProviderServer | "new" | null>(null);
  const [testing, setTesting] = useState<string | null>(null);
  const [testingAll, setTestingAll] = useState(false);
  const current = editing === "new" ? null : editing;

  const runTest = async (id: string) => {
    setTesting(id);
    try { await act(test({ data: { id } }), "Teste concluído.", ["provider-servers"]); }
    finally { setTesting(null); }
  };
  const runAll = async () => {
    setTestingAll(true);
    try {
      for (const s of data.filter((x) => x.active)) await test({ data: { id: s.id } });
      await act(Promise.resolve({ ok: true }), "Todos os servidores ativos foram testados.", ["provider-servers"]);
    } finally { setTestingAll(false); }
  };

  return (
    <>
      <PageHeader
        title="Servidores"
        desc="DNS/servidores autorizados fornecidos pelo seu provedor. Teste disponibilidade e latência sem expor credenciais."
        action={
          <div className="flex gap-2">
            <Button variant="secondary" onClick={runAll} disabled={testingAll || data.length === 0}>
              <RefreshCw className={testingAll ? "animate-spin" : ""} /> {testingAll ? "Testando…" : "Testar todos"}
            </Button>
            <Button variant="hero" onClick={() => setEditing("new")}><Plus /> Novo servidor</Button>
          </div>
        }
      />
      <div className="mb-4 rounded-2xl border border-border bg-card p-4 text-sm text-muted-foreground">
        <Activity className="mr-2 inline h-4 w-4 text-primary" />
        O teste mede resposta HTTP e tempo do servidor. HTTP 404 ainda significa que o servidor respondeu; não confirma canais nem credenciais.
      </div>
      <DataTable head={["Nome", "DNS / URL base", "Prioridade", "Cadastro", "Saúde", "Resposta", ""]} empty={data.length === 0}>
        {data.map((s) => (
          <tr key={s.id}>
            <Td className="font-medium">{s.name}</Td>
            <Td className="text-muted-foreground">{s.base_url}</Td>
            <Td>{s.priority}</Td>
            <Td>{s.active ? "Ativo" : "Inativo"}</Td>
            <Td>{healthLabel(s)}</Td>
            <Td className="text-muted-foreground">{healthDetail(s)}</Td>
            <Td>
              <div className="flex gap-2">
                <Button size="sm" variant="secondary" disabled={testing === s.id} onClick={() => void runTest(s.id)}>
                  {testing === s.id ? "Testando…" : "Testar"}
                </Button>
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
