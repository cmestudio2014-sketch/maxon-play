import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Plus, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DataTable, PageHeader, Td, useAction, useAdminQuery } from "@/components/admin-ui";
import { fmtDateTime } from "@/components/brand";
import { SourceForm } from "@/components/source-form";
import { deleteSource, listCustomers, listSources, type Source } from "@/lib/admin.functions";

export const Route = createFileRoute("/admin/fontes")({ component: Fontes });

function Fontes() {
  const list = useServerFn(listSources);
  const customers = useServerFn(listCustomers);
  const del = useServerFn(deleteSource);
  const act = useAction();
  const { data = [] } = useAdminQuery("sources", () => list());
  const { data: cs = [] } = useAdminQuery("customers", () => customers());
  const [editing, setEditing] = useState<Source | "new" | null>(null);
  return (
    <>
      <PageHeader
        title="Fontes / Listas"
        desc="Listas M3U ou Xtream autorizadas, entregues automaticamente ao aparelho licenciado."
        action={
          <Button variant="hero" onClick={() => setEditing("new")}>
            <Plus />
            Nova fonte
          </Button>
        }
      />
      <div className="mb-4 flex items-start gap-3 rounded-2xl border border-border bg-card p-4 text-sm text-muted-foreground">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-success" />
        <p>
          Credenciais são criptografadas e nunca exibidas novamente. Só aparelhos com licença ativa
          recebem a fonte; ao expirar, bloquear ou desvincular, o acesso é revogado. Atribua em{" "}
          <b>Ativações</b> ou <b>Dispositivos</b>.
        </p>
      </div>
      <DataTable
        head={[
          "Nome",
          "Tipo / destino",
          "Cliente",
          "Ativações",
          "Aparelhos",
          "Versão",
          "Atualizada",
          "",
        ]}
        empty={data.length === 0}
      >
        {data.map((s) => (
          <tr key={s.id}>
            <Td className="font-medium">{s.name}</Td>
            <Td className="text-muted-foreground">{s.display_hint}</Td>
            <Td>{s.customer ?? "—"}</Td>
            <Td>{s.activations}</Td>
            <Td>{s.devices}</Td>
            <Td>v{s.version}</Td>
            <Td>{fmtDateTime(s.updated_at)}</Td>
            <Td>
              <div className="flex gap-2">
                <Button size="sm" variant="secondary" onClick={() => setEditing(s)}>
                  Editar
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => {
                    if (confirm(`Remover "${s.name}"? Os aparelhos deixarão de recebê-la.`))
                      void act(del({ data: { id: s.id } }), "Fonte removida.", [
                        "sources",
                        "activations",
                        "devices",
                      ]);
                  }}
                >
                  Remover
                </Button>
              </div>
            </Td>
          </tr>
        ))}
      </DataTable>
      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing === "new" ? "Nova fonte" : "Editar fonte"}</DialogTitle>
          </DialogHeader>
          {editing && (
            <SourceForm
              {...(editing !== "new" ? { source: editing } : {})}
              customers={cs}
              onSaved={() => setEditing(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}