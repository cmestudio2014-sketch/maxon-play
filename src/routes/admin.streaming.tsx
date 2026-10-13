import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Film, Music2, ShieldCheck, Tv2, KeyRound } from "lucide-react";
import { PageHeader, Field, selectCls, useAction, useAdminQuery } from "@/components/admin-ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { activateDeviceByTvCode, listCustomers, listPlans, listSources } from "@/lib/admin.functions";

export const Route = createFileRoute("/admin/streaming")({ component: Streaming });

const services = [
  { name: "Netflix", icon: Tv2 },
  { name: "Prime Video", icon: Film },
  { name: "Crunchyroll", icon: Film },
  { name: "HBO Max", icon: Tv2 },
  { name: "Spotify", icon: Music2 },
  { name: "Surfshark", icon: ShieldCheck },
];

function Streaming() {
  const activate = useServerFn(activateDeviceByTvCode);
  const getCustomers = useServerFn(listCustomers);
  const getPlans = useServerFn(listPlans);
  const getSources = useServerFn(listSources);
  const act = useAction();
  const { data: customers = [] } = useAdminQuery("customers", () => getCustomers());
  const { data: plans = [] } = useAdminQuery("plans", () => getPlans());
  const { data: sources = [] } = useAdminQuery("sources", () => getSources());
  const [code, setCode] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [planId, setPlanId] = useState("");
  const [sourceId, setSourceId] = useState("");

  async function submit() {
    const r = await act(
      activate({ data: { code, customer_id: customerId || null, plan_id: planId, source_id: sourceId || null } }),
      "TV ativada com sucesso.",
      ["activations", "devices"],
    );
    if (r) setCode("");
  }

  return (
    <>
      <PageHeader title="Ativação de Streaming" desc="Central de serviços e ativações de streaming do MAXON PLAY." />

      <section className="mb-6 rounded-2xl border border-primary/40 bg-card p-5">
        <div className="mb-4 flex items-center gap-3">
          <div className="rounded-xl bg-primary/10 p-2 text-primary"><KeyRound className="h-5 w-5" /></div>
          <div>
            <h2 className="font-display text-lg font-bold">Ativação da TV — MAXON PLAY</h2>
            <p className="text-sm text-muted-foreground">Digite o código de 6 números mostrado na TV. O código é temporário e de uso único.</p>
          </div>
        </div>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          <Field label="Código da TV">
            <Input inputMode="numeric" maxLength={6} placeholder="123456" value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
              className="font-mono text-lg tracking-[0.2em]" />
          </Field>
          <Field label="Cliente">
            <select className={selectCls} value={customerId} onChange={(e) => setCustomerId(e.target.value)}>
              <option value="">Sem cliente</option>
              {customers.filter((x) => x.status === "ativo").map((x) => <option key={x.id} value={x.id}>{x.name}</option>)}
            </select>
          </Field>
          <Field label="Plano">
            <select className={selectCls} value={planId} onChange={(e) => setPlanId(e.target.value)}>
              <option value="">Selecione</option>
              {plans.filter((p) => p.active).map((p) => <option key={p.id} value={p.id}>{p.name} — {p.duration_days} dias</option>)}
            </select>
          </Field>
          <Field label="Fonte / Lista">
            <select className={selectCls} value={sourceId} onChange={(e) => setSourceId(e.target.value)}>
              <option value="">Padrão</option>
              {sources.map((x) => <option key={x.id} value={x.id}>{x.name}</option>)}
            </select>
          </Field>
          <div className="flex items-end">
            <Button className="w-full" variant="hero" disabled={code.length !== 6 || !planId} onClick={submit}>ATIVAR TV</Button>
          </div>
        </div>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => (
          <section key={service.name} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-secondary p-2 text-primary"><service.icon className="h-5 w-5" /></div>
              <h2 className="font-display text-lg font-bold">{service.name}</h2>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">Gerenciamento de ativações autorizadas.</p>
            <Button className="mt-4 w-full" variant="secondary" disabled>Integração pendente</Button>
          </section>
        ))}
      </div>
      <div className="mt-6 rounded-2xl border border-border bg-card p-5">
        <h2 className="font-semibold">Integração BOT ATIVA</h2>
        <p className="mt-2 text-sm text-muted-foreground">Área preparada para integrações autorizadas com o backend. Credenciais e tokens não são expostos no navegador.</p>
      </div>
    </>
  );
}
