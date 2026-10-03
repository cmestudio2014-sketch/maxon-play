import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Copy, Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { SourceForm } from "@/components/source-form";
import {
  assignSource,
  changeActivationDevice,
  createActivation,
  forceSync,
  listActivations,
  listCustomers,
  listPlans,
  listSources,
  regenerateKey,
  renewActivation,
  setActivationBlocked,
  type Activation,
} from "@/lib/admin.functions";

export const Route = createFileRoute("/admin/ativacoes")({ component: Ativacoes });

function Ativacoes() {
  const fns = {
    list: useServerFn(listActivations),
    customers: useServerFn(listCustomers),
    plans: useServerFn(listPlans),
    sources: useServerFn(listSources),
    create: useServerFn(createActivation),
    renew: useServerFn(renewActivation),
    block: useServerFn(setActivationBlocked),
    change: useServerFn(changeActivationDevice),
    regen: useServerFn(regenerateKey),
    assign: useServerFn(assignSource),
    sync: useServerFn(forceSync),
  };
  const act = useAction();
  const { data = [] } = useAdminQuery("activations", () => fns.list());
  const { data: customers = [] } = useAdminQuery("customers", () => fns.customers());
  const { data: plans = [] } = useAdminQuery("plans", () => fns.plans());
  const { data: sources = [] } = useAdminQuery("sources", () => fns.sources());
  const [creating, setCreating] = useState(false);
  const [newKey, setNewKey] = useState<string | null>(null);
  const [changing, setChanging] = useState<Activation | null>(null);
  const [assigning, setAssigning] = useState<Activation | null>(null);
  const [filter, setFilter] = useState("");
  const rows = data.filter((a) => !filter || a.status === filter);

  return (
    <>
      <PageHeader
        title="Ativações"
        desc="Cada KEY ativa 1 dispositivo. A KEY completa aparece apenas uma vez, ao ser gerada."
        action={
          <Button variant="hero" onClick={() => setCreating(true)}>
            <Plus />
            Gerar KEY
          </Button>
        }
      />
      <div className="mb-4 flex gap-2">
        {["", "pendente", "ativa", "expirada", "bloqueada"].map((s) => (
          <Button
            key={s}
            size="sm"
            variant={filter === s ? "default" : "secondary"}
            onClick={() => setFilter(s)}
          >
            {s || "Todas"}
          </Button>
        ))}
      </div>
      <DataTable
        head={[
          "KEY",
          "Cliente",
          "Plano",
          "Status",
          "Início",
          "Expira",
          "Dispositivo",
          "Fonte atribuída",
          "",
        ]}
        empty={rows.length === 0}
      >
        {rows.map((a) => (
          <tr key={a.id}>
            <Td className="font-mono">••••-{a.key_last4}</Td>
            <Td>{a.customer ?? "—"}</Td>
            <Td>{a.plan}</Td>
            <Td>
              <StatusBadge s={a.status} />
            </Td>
            <Td>{fmtDate(a.starts_at)}</Td>
            <Td>{fmtDate(a.expires_at)}</Td>
            <Td className="font-mono text-xs">
              {a.display_id ? (
                <span className="text-primary">{a.display_id}</span>
              ) : (
                <span className="text-muted-foreground">não vinculada</span>
              )}
            </Td>
            <Td>{a.source_name ?? <span className="text-muted-foreground">nenhuma</span>}</Td>
            <Td>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" variant="secondary">
                    Ações
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() =>
                      act(fns.renew({ data: { id: a.id, days: 30 } }), "Renovado por 30 dias.", [
                        "activations",
                      ])
                    }
                  >
                    Renovar 30 dias
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      act(fns.renew({ data: { id: a.id, days: 365 } }), "Renovado por 12 meses.", [
                        "activations",
                      ])
                    }
                  >
                    Renovar 12 meses
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setAssigning(a)}>
                    Fonte atribuída…
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      act(
                        fns.sync({ data: { target: "activation", id: a.id } }),
                        "Sincronização solicitada.",
                      )
                    }
                  >
                    Sincronizar no aparelho
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setChanging(a)}>
                    Trocar dispositivo…
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={async () => {
                      const r = await act(fns.regen({ data: { id: a.id } }), "Nova KEY gerada.", [
                        "activations",
                      ]);
                      if (r) setNewKey(r.key);
                    }}
                  >
                    Gerar nova KEY
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-destructive"
                    onClick={() =>
                      act(
                        fns.block({ data: { id: a.id, blocked: a.status !== "bloqueada" } }),
                        "Status atualizado.",
                        ["activations"],
                      )
                    }
                  >
                    {a.status === "bloqueada" ? "Desbloquear" : "Bloquear"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </Td>
          </tr>
        ))}
      </DataTable>

      <CreateDialog
        open={creating}
        onClose={() => setCreating(false)}
        customers={customers}
        plans={plans}
        sources={sources}
        onCreate={async (d) => {
          const r = await act(fns.create({ data: d }), "KEY gerada.", ["activations", "sources"]);
          if (r) {
            setCreating(false);
            setNewKey(r.key);
          }
        }}
      />

      <Dialog open={!!newKey} onOpenChange={(o) => !o && setNewKey(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>KEY gerada</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Copie e envie ao cliente agora. Por segurança ela não será exibida novamente.
          </p>
          <p className="rounded-xl bg-secondary p-4 text-center font-mono text-2xl tracking-widest text-primary">
            {newKey}
          </p>
          <Button
            variant="hero"
            onClick={() => {
              void navigator.clipboard.writeText(newKey ?? "");
              toast.success("Copiada!");
            }}
          >
            <Copy />
            Copiar KEY
          </Button>
        </DialogContent>
      </Dialog>

      <Dialog open={!!changing} onOpenChange={(o) => !o && setChanging(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Trocar dispositivo</DialogTitle>
          </DialogHeader>
          {changing && (
            <ChangeDevice
              a={changing}
              onSubmit={async (display_id, reason) => {
                const r = await act(
                  fns.change({ data: { id: changing.id, display_id, reason } }),
                  "Dispositivo atualizado (auditado).",
                  ["activations", "devices"],
                );
                if (r) setChanging(null);
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={!!assigning} onOpenChange={(o) => !o && setAssigning(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Fonte atribuída</DialogTitle>
          </DialogHeader>
          {assigning && (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                O aparelho recebe a alteração automaticamente no próximo status/heartbeat.
              </p>
              <select
                className={selectCls}
                defaultValue={assigning.source_id ?? ""}
                onChange={async (e) => {
                  const r = await act(
                    fns.assign({
                      data: {
                        target: "activation",
                        id: assigning.id,
                        source_id: e.target.value || null,
                      },
                    }),
                    e.target.value ? "Fonte atribuída." : "Fonte removida.",
                    ["activations", "sources"],
                  );
                  if (r) setAssigning(null);
                }}
              >
                <option value="">— nenhuma (usuário adiciona manualmente) —</option>
                {sources.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} · {s.display_hint}
                  </option>
                ))}
              </select>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

type CreateInput = {
  customer_id: string | null;
  plan_id: string;
  start_now: boolean;
  source_id: string | null;
};
function CreateDialog({
  open,
  onClose,
  customers,
  plans,
  sources,
  onCreate,
}: {
  open: boolean;
  onClose: () => void;
  customers: { id: string; name: string }[];
  plans: { id: string; name: string; active: boolean }[];
  sources: { id: string; name: string; display_hint: string }[];
  onCreate: (d: CreateInput) => Promise<void>;
}) {
  const [f, setF] = useState<CreateInput>({
    customer_id: null,
    plan_id: "",
    start_now: false,
    source_id: null,
  });
  const [sendList, setSendList] = useState(false);
  const [newSource, setNewSource] = useState(false);
  const planId = f.plan_id || plans.find((p) => p.active)?.id || "";
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Gerar KEY de ativação</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <Field label="Cliente">
            <select
              className={selectCls}
              value={f.customer_id ?? ""}
              onChange={(e) => setF({ ...f, customer_id: e.target.value || null })}
            >
              <option value="">— sem cliente —</option>
              {customers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Plano">
            <select
              className={selectCls}
              value={planId}
              onChange={(e) => setF({ ...f, plan_id: e.target.value })}
            >
              {plans.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                  {p.active ? "" : " (inativo)"}
                </option>
              ))}
            </select>
          </Field>
          <label className="flex items-center justify-between gap-3 rounded-lg border border-border p-3 text-sm">
            <span>
              Iniciar validade agora{" "}
              <span className="block text-xs text-muted-foreground">
                Desligado: a contagem começa na ativação na TV.
              </span>
            </span>
            <Switch checked={f.start_now} onCheckedChange={(v) => setF({ ...f, start_now: v })} />
          </label>
          <label className="flex items-center justify-between gap-3 rounded-lg border border-border p-3 text-sm">
            <span>
              Enviar lista ao ativar{" "}
              <span className="block text-xs text-muted-foreground">
                A TV carrega a lista autorizada sozinha após a ativação.
              </span>
            </span>
            <Switch
              checked={sendList}
              onCheckedChange={(v) => {
                setSendList(v);
                if (!v) setF({ ...f, source_id: null });
              }}
            />
          </label>
          {sendList &&
            (newSource ? (
              <div className="rounded-lg border border-border p-3">
                <SourceForm
                  customerId={f.customer_id}
                  onSaved={(id) => {
                    setF({ ...f, source_id: id });
                    setNewSource(false);
                  }}
                  onCancel={() => setNewSource(false)}
                />
              </div>
            ) : (
              <div className="flex gap-2">
                <select
                  className={selectCls}
                  value={f.source_id ?? ""}
                  onChange={(e) => setF({ ...f, source_id: e.target.value || null })}
                >
                  <option value="">— escolha uma fonte —</option>
                  {sources.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} · {s.display_hint}
                    </option>
                  ))}
                </select>
                <Button variant="secondary" onClick={() => setNewSource(true)}>
                  Nova fonte
                </Button>
              </div>
            ))}
          <Button
            variant="hero"
            className="w-full"
            disabled={!planId || (sendList && !f.source_id)}
            onClick={() => onCreate({ ...f, plan_id: planId })}
          >
            Gerar KEY
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ChangeDevice({
  a,
  onSubmit,
}: {
  a: Activation;
  onSubmit: (displayId: string | null, reason: string) => Promise<void>;
}) {
  const [id, setId] = useState(a.display_id ?? "");
  const [reason, setReason] = useState("");
  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">
        Atual: <span className="font-mono">{a.display_id ?? "nenhum"}</span>. Deixe em branco para
        desvincular (a lista deixa de ser entregue).
      </p>
      <Field label="Novo MAC / Device ID" hint="Mostrado na tela de ativação do app.">
        <Input
          value={id}
          onChange={(e) => setId(e.target.value.toUpperCase())}
          placeholder="AA:BB:CC:DD:EE:FF"
          className="font-mono"
        />
      </Field>
      <Field label="Motivo (obrigatório, fica na auditoria)">
        <Input value={reason} onChange={(e) => setReason(e.target.value)} />
      </Field>
      <Button
        variant="hero"
        className="w-full"
        disabled={reason.trim().length < 3}
        onClick={() => onSubmit(id.trim() || null, reason)}
      >
        Confirmar troca
      </Button>
    </div>
  );
}