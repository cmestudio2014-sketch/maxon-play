import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DataTable,
  PageHeader,
  StatusBadge,
  Td,
  selectCls,
  useAction,
  useAdminQuery,
} from "@/components/admin-ui";
import { fmtDate, fmtDateTime } from "@/components/brand";
import {
  assignSource,
  forceSync,
  listDevices,
  listSources,
  setDeviceStatus,
} from "@/lib/admin.functions";

export const Route = createFileRoute("/admin/dispositivos")({ component: Dispositivos });

function Dispositivos() {
  const list = useServerFn(listDevices);
  const sources = useServerFn(listSources);
  const setStatus = useServerFn(setDeviceStatus);
  const assign = useServerFn(assignSource);
  const sync = useServerFn(forceSync);
  const act = useAction();
  const { data = [] } = useAdminQuery("devices", () => list());
  const { data: srcs = [] } = useAdminQuery("sources", () => sources());
  const [search, setSearch] = useState("");
  const rows = data.filter((d) =>
    `${d.display_id} ${d.model} ${d.customer ?? ""}`.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <>
      <PageHeader
        title="Dispositivos"
        desc="Registrados automaticamente quando o app abre. MAC / Device ID é um identificador do app (não é o MAC físico)."
      />
      <Input
        placeholder="Buscar Device ID, modelo ou cliente"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 max-w-sm"
      />
      <DataTable
        head={[
          "MAC / Device ID",
          "Plataforma",
          "Modelo",
          "Cliente",
          "Licença",
          "Vence",
          "Fonte atribuída (aparelho)",
          "Cadastro",
          "Última conexão",
          "Status",
          "",
        ]}
        empty={rows.length === 0}
      >
        {rows.map((d) => (
          <tr key={d.id}>
            <Td className="font-mono text-primary">{d.display_id}</Td>
            <Td className="capitalize">{d.platform}</Td>
            <Td>{d.model || "—"}</Td>
            <Td>{d.customer ?? "—"}</Td>
            <Td>
              <StatusBadge s={d.license_status} />
            </Td>
            <Td>{fmtDate(d.expires_at)}</Td>
            <Td>
              <div className="flex items-center gap-2">
                <select
                  className={`${selectCls} h-8 w-44`}
                  value={d.source_id ?? ""}
                  onChange={(e) =>
                    act(
                      assign({
                        data: { target: "device", id: d.id, source_id: e.target.value || null },
                      }),
                      "Fonte atualizada. O aparelho sincroniza em instantes.",
                      ["devices", "sources"],
                    )
                  }
                >
                  <option value="">— herdar da ativação —</option>
                  {srcs.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
                <Button
                  size="sm"
                  variant="ghost"
                  title="Sincronizar no aparelho"
                  onClick={() =>
                    act(sync({ data: { target: "device", id: d.id } }), "Sincronização solicitada.")
                  }
                >
                  Sincronizar no aparelho
                </Button>
              </div>
            </Td>
            <Td>{fmtDate(d.created_at)}</Td>
            <Td>{fmtDateTime(d.last_seen_at)}</Td>
            <Td>
              <StatusBadge s={d.status} />
            </Td>
            <Td>
              <Button
                size="sm"
                variant={d.status === "bloqueado" ? "secondary" : "destructive"}
                onClick={() =>
                  act(
                    setStatus({
                      data: { id: d.id, status: d.status === "bloqueado" ? "ativo" : "bloqueado" },
                    }),
                    "Status atualizado.",
                    ["devices"],
                  )
                }
              >
                {d.status === "bloqueado" ? "Desbloquear" : "Bloquear"}
              </Button>
            </Td>
          </tr>
        ))}
      </DataTable>
    </>
  );
}