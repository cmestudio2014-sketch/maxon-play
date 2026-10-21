import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Plus, Server as ServerIcon, Trash2, Wifi } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DataTable, PageHeader, Td, useAction, useAdminQuery } from "@/components/admin-ui";
import { deleteHostingServer, listHostingServers, saveHostingServer, testHostingServer } from "@/lib/admin.functions";

export const Route = createFileRoute("/admin/servidores")({ component: Servidores });

function Servidores() {
  const listFn = useServerFn(listHostingServers);
  const saveFn = useServerFn(saveHostingServer);
  const deleteFn = useServerFn(deleteHostingServer);
  const testFn = useServerFn(testHostingServer);
  const act = useAction();
  const { data = [], isLoading, error } = useAdminQuery("hosting-servers", () => listFn());
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [host, setHost] = useState("");
  const [port, setPort] = useState("443");
  const [protocol, setProtocol] = useState<"http" | "https" | "tcp">("https");
  const [busyId, setBusyId] = useState<string | null>(null);

  async function addServer(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const p = Number(port);
    if (!Number.isInteger(p) || p < 1 || p > 65535) {
      toast.error("Informe uma porta entre 1 e 65535.");
      return;
    }
    const saved = await act(saveFn({ data: { name, host, port: p, protocol } }),
      "Servidor adicionado.", ["hosting-servers"]);
    if (saved) {
      setOpen(false); setName(""); setHost(""); setPort(protocol === "http" ? "80" : protocol === "https" ? "443" : "22");
    }
  }

  return (
    <>
      <PageHeader title="Servidores" desc="Cadastre servidores e teste a conexão."
        action={<Button variant="hero" onClick={() => setOpen(true)}><Plus /> Adicionar servidor</Button>} />
      <div className="mb-4 flex items-start gap-3 rounded-2xl border border-border bg-card p-4 text-sm text-muted-foreground">
        <ServerIcon className="mt-0.5 h-5 w-5 shrink-0" />
        <p>Cadastre o domínio ou IP e a porta. O teste verifica a conexão HTTP, HTTPS ou TCP. Não informe senhas nesta tela.</p>
      </div>
      {error && <p className="mb-4 text-sm text-destructive">Não foi possível carregar a lista. Confira o login e o banco local.</p>}
      <DataTable head={["Nome","Endereço","Porta","Protocolo","Ações"]} empty={!isLoading && data.length === 0}>
        {data.map(s => <tr key={s.id}>
          <Td className="font-medium">{s.name}</Td>
          <Td>{s.host}</Td>
          <Td>{s.port}</Td>
          <Td className="uppercase">{s.protocol}</Td>
          <Td><div className="flex flex-wrap gap-2">
            <Button size="sm" variant="secondary" disabled={busyId === s.id} onClick={() => {
              void (async () => {
                setBusyId(s.id);
                try {
                  const result = await testFn({ data: { id: s.id } });
                  if (result.ok) toast.success(result.message);
                  else toast.error(result.message);
                } catch (e) {
                  toast.error(e instanceof Error ? e.message : "Falha no teste.");
                } finally { setBusyId(null); }
              })();
            }}><Wifi /> {busyId === s.id ? "Testando..." : "Testar"}</Button>
            <Button size="sm" variant="destructive" onClick={() => {
              if (confirm(`Excluir o servidor "${s.name}"? Esta ação não pode ser desfeita.`))
                void act(deleteFn({ data: { id: s.id } }), "Servidor excluído.", ["hosting-servers"]);
            }}><Trash2 /> Excluir</Button>
          </div></Td>
        </tr>)}
      </DataTable>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Adicionar servidor</DialogTitle></DialogHeader>
          <form className="space-y-4" onSubmit={addServer}>
            <label className="block space-y-1 text-sm font-medium">Nome
              <Input value={name} onChange={e => setName(e.target.value)} required maxLength={100} placeholder="Ex.: Servidor principal" />
            </label>
            <label className="block space-y-1 text-sm font-medium">Domínio ou IP
              <Input value={host} onChange={e => setHost(e.target.value)} required maxLength={253} placeholder="Ex.: servidor.exemplo.com" />
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className="block space-y-1 text-sm font-medium">Protocolo
                <select className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm" value={protocol}
                  onChange={e => { const v = e.target.value as typeof protocol; setProtocol(v); setPort(v === "http" ? "80" : v === "https" ? "443" : "22"); }}>
                  <option value="https">HTTPS</option><option value="http">HTTP</option><option value="tcp">TCP</option>
                </select>
              </label>
              <label className="block space-y-1 text-sm font-medium">Porta
                <Input type="number" min="1" max="65535" value={port} onChange={e => setPort(e.target.value)} required />
              </label>
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
              <Button type="submit"><Plus /> Salvar servidor</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
