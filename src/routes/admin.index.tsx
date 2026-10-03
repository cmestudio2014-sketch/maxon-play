import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { DataTable, PageHeader, StatusBadge, Td, useAdminQuery } from "@/components/admin-ui";
import { brl, fmtDate, fmtDateTime } from "@/components/brand";
import { getDashboard } from "@/lib/admin.functions";

export const Route = createFileRoute("/admin/")({ component: Dashboard });

function Dashboard() {
  const fn = useServerFn(getDashboard);
  const { data, isLoading, error } = useAdminQuery("dashboard", () => fn());
  if (error) return <p className="text-destructive">{(error as Error).message}</p>;
  if (isLoading || !data) return <p className="text-muted-foreground">Carregando…</p>;
  const cards = [
    ["Clientes", String(data.customers)],
    ["Ativações ativas", String(data.active)],
    ["Expiradas", String(data.expired)],
    ["Vendas pagas", String(data.salesPaid)],
    ["Receita total", brl(data.revenue)],
    ["Receita 30 dias", brl(data.revenue30)],
    ["Vendas pendentes", String(data.pending)],
  ];
  return (
    <>
      <PageHeader title="Dashboard" desc="Visão geral do MAXON PLAY." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(([k, v]) => (
          <div key={k} className="rounded-2xl border border-border bg-card p-5">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">{k}</p>
            <p className="mt-2 font-display text-3xl font-bold">{v}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 grid gap-8 xl:grid-cols-2">
        <section>
          <h2 className="mb-3 text-lg font-semibold">Vencimentos nos próximos 7 dias</h2>
          <DataTable head={["Cliente", "Plano", "KEY", "Vence"]} empty={data.expiring.length === 0}>
            {data.expiring.map((e) => (
              <tr key={e.id}>
                <Td>
                  {e.customer ?? "—"}
                  {e.whatsapp && (
                    <a
                      className="ml-2 text-xs text-primary"
                      href={`https://wa.me/${(e.whatsapp ?? "").replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      WhatsApp
                    </a>
                  )}
                </Td>
                <Td>{e.plan}</Td>
                <Td className="font-mono">…{e.key_last4}</Td>
                <Td>{fmtDate(e.expires_at)}</Td>
              </tr>
            ))}
          </DataTable>
        </section>
        <section>
          <h2 className="mb-3 text-lg font-semibold">Vendas recentes</h2>
          <DataTable
            head={["Pedido", "Cliente", "Valor", "Status", "Data"]}
            empty={data.recentSales.length === 0}
          >
            {data.recentSales.map((s) => (
              <tr key={s.id}>
                <Td className="font-mono text-xs">{s.order_number}</Td>
                <Td>{s.customer ?? "—"}</Td>
                <Td>{brl(s.amount_cents)}</Td>
                <Td>
                  <StatusBadge s={s.status} />
                </Td>
                <Td>{fmtDateTime(s.created_at)}</Td>
              </tr>
            ))}
          </DataTable>
        </section>
      </div>
    </>
  );
}