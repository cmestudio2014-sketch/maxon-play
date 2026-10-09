import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { fmtDate, fmtDateTime } from "@/components/brand";
import {
  activateDeviceByDisplayId,
  activateDeviceDirect,
  assignSource,
  forceSync,
  listCustomers,
  listDevices,
  listPlans,
  listSources,
  setDeviceStatus,
  type Device,
} from "@/lib/admin.functions";

export const Route = createFileRoute("/admin/dispositivos")({ component: Dispositivos });

function Dispositivos() {
  const list = useServerFn(listDevices);
  const sources = useServerFn(listSources);
  const customersFn = useServerFn(listCustomers);
  const plansFn = useServerFn(listPlans);
  const setStatus = useServerFn(setDeviceStatus);
  const assign = useServerFn(assignSource);
  const sync = useServerFn(forceSync);
  const activateDirect = useServerFn(activateDeviceDirect);
  const activateByDisplayId = useServerFn(activateDeviceByDisplayId);
  const act = useAction();
  const { data = [] } = useAdminQuery("devices", () => list());
  const { data: srcs = [] } = useAdminQuery("sources", () => sources());
  const { data: customers = [] } = useAdminQuery("customers", () => customersFn());
  const { data: plans = [] } = useAdminQuery("plans", () => plansFn());
  const [search, setSearch] = useState("");
  const [activating, setActivating] = useState<Device | null>(null);
  const [manualOpen, setManualOpen] = useState(false);
  const rows = data.filter((d) =>
    `${d.display_id} ${d.model} ${d.customer ?? ""}`.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <>
      <PageHeader
        title="Dispositivos"
        desc="O app registra o Device ID automaticamente. Receba o código do cliente e ative o aparelho diretamente aqui."
      />
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <Input
          placeholder="Buscar Device ID, modelo ou cliente"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <Button variant="hero" onClick={() => setManualOpen(true)}>+ ATIVAR POR MAC / DEVICE ID</Button>
      </div>
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
            <Td><StatusBadge s={d.license_status} /></Td>
            <Td>{fmtDate(d.expires_at)}</Td>
            <Td>
              <div className="flex items-center gap-2">
                <select
                  className={`${selectCls} h-8 w-44`}
                  value={d.source_id ?? ""}
                  onChange={(e) =>
                    act(
                      assign({ data: { target: "device", id: d.id, source_id: e.target.value || null } }),
                      "Fonte atualizada. O aparelho sincroniza em instantes.",
                      ["devices", "sources"],
                    )
                  }
                >
                  <option value="">— herdar da ativação —</option>
                  {srcs.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
                <Button size="sm" variant="ghost" onClick={() => act(sync({ data: { target: "device", id: d.id } }), "Sincronização solicitada.")}>Sincronizar</Button>
              </div>
            </Td>
            <Td>{fmtDate(d.created_at)}</Td>
            <Td>{fmtDateTime(d.last_seen_at)}</Td>
            <Td><StatusBadge s={d.status} /></Td>
            <Td>
              <div className="flex gap-2">
                {d.license_status !== "ativa" && (
                  <Button size="sm" variant="hero" onClick={() => setActivating(d)}>Ativar</Button>
                )}
                <Button
                  size="sm"
                  variant={d.status === "bloqueado" ? "secondary" : "destructive"}
                  onClick={() => act(setStatus({ data: { id: d.id, status: d.status === "bloqueado" ? "ativo" : "bloqueado" } }), "Status atualizado.", ["devices"])}
                >
                  {d.status === "bloqueado" ? "Desbloquear" : "Bloquear"}
                </Button>
              </div>
            </Td>
          </tr>
        ))}
      </DataTable>

      <ManualActivationDialog
        open={manualOpen}
        customers={customers}
        plans={plans.filter((p) => p.active)}
        sources={srcs}
        onClose={() => setManualOpen(false)}
        onActivate={async (data: any) => {
          const r = await act(activateByDisplayId({ data }), "MAC / Device ID ativado com sucesso.", ["devices", "activations"]);
          if (r) setManualOpen(false);
        }}
      />

      <ActivateDeviceDialog
        device={activating}
        customers={customers}
        plans={plans.filter((p) => p.active)}
        sources={srcs}
        onClose={() => setActivating(null)}
        onActivate={async (data: any) => {
          const r = await act(activateDirect({ data }), "Dispositivo ativado com sucesso.", ["devices", "activations"]);
          if (r) setActivating(null);
        }}
      />
    </>
  );
}

function ActivateDeviceDialog({ device, customers, plans, sources, onClose, onActivate }: any) {
  const [customerId, setCustomerId] = useState("");
  const [planId, setPlanId] = useState("");
  const [sourceId, setSourceId] = useState("");

  return (
    <Dialog open={!!device} onOpenChange={(o) => !o && onClose()}>
      <DialogContent>
        <DialogHeader><DialogTitle>Ativar dispositivo</DialogTitle></DialogHeader>
        <div className="space-y-4">
          <div className="rounded-md border p-3">
            <div className="text-xs text-muted-foreground">MAC / Device ID</div>
            <div className="font-mono font-semibold text-primary">{device?.display_id}</div>
          </div>
          <Field label="Cliente">
            <select className={selectCls} value={customerId} onChange={(e) => setCustomerId(e.target.value)}>
              <option value="">Sem cliente</option>
              {customers.filter((c: any) => c.status === "ativo").map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </Field>
          <Field label="Plano">
            <select className={selectCls} value={planId} onChange={(e) => setPlanId(e.target.value)}>
              <option value="">Selecione o plano</option>
              {plans.map((p: any) => <option key={p.id} value={p.id}>{p.name} — {p.duration_days} dias</option>)}
            </select>
          </Field>
          <Field label="Fonte / Lista">
            <select className={selectCls} value={sourceId} onChange={(e) => setSourceId(e.target.value)}>
              <option value="">Nenhuma / padrão</option>
              {sources.map((s: any) => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </Field>
          <Button
            className="w-full"
            variant="hero"
            disabled={!device || !planId}
            onClick={() => onActivate({ device_id: device.id, customer_id: customerId || null, plan_id: planId, source_id: sourceId || null })}
          >
            ATIVAR DISPOSITIVO
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}


function ManualActivationDialog({ open, customers, plans, sources, onClose, onActivate }: any) {
  const [displayId, setDisplayId] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [planId, setPlanId] = useState("");
  const [sourceId, setSourceId] = useState("");

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent>
        <DialogHeader><DialogTitle>Ativar por MAC / Device ID</DialogTitle></DialogHeader>
        <div className="space-y-4">
          <Field label="MAC / Device ID">
            <Input
              autoFocus
              placeholder="Ex.: 0A:95:91:80:D6:5D"
              value={displayId}
              onChange={(e) => setDisplayId(e.target.value.toUpperCase())}
            />
          </Field>
          <Field label="Cliente">
            <select className={selectCls} value={customerId} onChange={(e) => setCustomerId(e.target.value)}>
              <option value="">Sem cliente</option>
              {customers.filter((c: any) => c.status === "ativo").map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </Field>
          <Field label="Plano">
            <select className={selectCls} value={planId} onChange={(e) => setPlanId(e.target.value)}>
              <option value="">Selecione o plano</option>
              {plans.map((p: any) => <option key={p.id} value={p.id}>{p.name} — {p.duration_days} dias</option>)}
            </select>
          </Field>
          <Field label="Fonte / Lista">
            <select className={selectCls} value={sourceId} onChange={(e) => setSourceId(e.target.value)}>
              <option value="">Nenhuma / padrão</option>
              {sources.map((s: any) => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </Field>
          <Button
            className="w-full"
            variant="hero"
            disabled={!displayId.trim() || !planId}
            onClick={() => onActivate({ display_id: displayId.trim(), customer_id: customerId || null, plan_id: planId, source_id: sourceId || null })}
          >
            ATIVAR MAC / DEVICE ID
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
