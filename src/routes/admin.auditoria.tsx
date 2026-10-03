import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { DataTable, PageHeader, Td, useAdminQuery } from "@/components/admin-ui";
import { fmtDateTime } from "@/components/brand";
import { listAudit } from "@/lib/admin.functions";

export const Route = createFileRoute("/admin/auditoria")({ component: Auditoria });

function Auditoria() {
  const list = useServerFn(listAudit);
  const { data = [], error } = useAdminQuery("audit", () => list());
  const [q, setQ] = useState("");
  const rows = data.filter((l) =>
    `${l.action} ${l.actor_label ?? ""} ${l.entity ?? ""} ${l.details}`
      .toLowerCase()
      .includes(q.toLowerCase()),
  );
  if (error) return <p className="text-destructive">{(error as Error).message}</p>;
  return (
    <>
      <PageHeader
        title="Auditoria"
        desc="Últimos 300 eventos. KEYs, senhas e credenciais nunca são gravadas."
      />
      <Input
        placeholder="Filtrar"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        className="mb-4 max-w-sm"
      />
      <DataTable head={["Data", "Ator", "Ação", "Entidade", "Detalhes"]} empty={rows.length === 0}>
        {rows.map((l) => (
          <tr key={l.id}>
            <Td>{fmtDateTime(l.created_at)}</Td>
            <Td>{l.actor_label ?? l.actor_type}</Td>
            <Td className="font-mono text-xs text-primary">{l.action}</Td>
            <Td className="text-xs">
              {l.entity ?? "—"}
              {l.entity_id ? ` · ${l.entity_id.slice(0, 8)}` : ""}
            </Td>
            <Td className="max-w-md truncate font-mono text-xs text-muted-foreground">
              {l.details === "{}" ? "" : l.details}
            </Td>
          </tr>
        ))}
      </DataTable>
    </>
  );
}