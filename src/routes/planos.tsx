import { createFileRoute } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { Check, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SiteFooter, SiteHeader, brl } from "@/components/brand";
import { getPublicCatalog } from "@/lib/public.functions";

const catalogQuery = queryOptions({ queryKey: ["catalog"], queryFn: () => getPublicCatalog() });

export const Route = createFileRoute("/planos")({
  head: () => ({
    meta: [
      { title: "Planos MAXON PLAY — 30 dias e 12 meses" },
      {
        name: "description",
        content: "Escolha seu plano MAXON PLAY e ative o app na sua TV em minutos.",
      },
      { property: "og:title", content: "Planos MAXON PLAY" },
      {
        property: "og:description",
        content: "Planos de 30 dias e 12 meses para o player MAXON PLAY.",
      },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(catalogQuery),
  component: Planos,
  errorComponent: () => (
    <div className="p-10 text-center">Não foi possível carregar os planos.</div>
  ),
  notFoundComponent: () => <div className="p-10 text-center">Não encontrado.</div>,
});

const faq: [string, string][] = [
  [
    "O MAXON PLAY vem com canais?",
    "Não. O MAXON PLAY é apenas o player. Você usa listas M3U ou credenciais Xtream que já tem direito de usar, fornecidas pelo seu provedor autorizado.",
  ],
  [
    "Como ativo na TV?",
    "Instale o app, abra-o e anote o Device ID exibido. Depois digite a KEY recebida após a compra. A ativação é imediata.",
  ],
  [
    "Funciona em quantos aparelhos?",
    "Cada KEY ativa 1 dispositivo. Precisa trocar de aparelho? Fale com o suporte.",
  ],
  [
    "Quais aparelhos são compatíveis?",
    "Android TV / TV Box, Samsung Smart TV (Tizen) e navegador (Web Player).",
  ],
  [
    "A lista pode ser configurada para mim?",
    "Sim. Se seu provedor autorizado enviar os dados ao suporte, a lista é carregada automaticamente na TV após a ativação.",
  ],
];

function Planos() {
  const { data } = useSuspenseQuery(catalogQuery);
  const buy = (plan: string) => {
    const msg = (data.whatsappMessage || "Olá! Quero o plano {plano}.").replace("{plano}", plan);
    const digits = data.whatsapp.replace(/\D/g, "");
    return digits.length >= 10
      ? `https://wa.me/${digits}?text=${encodeURIComponent(msg)}`
      : undefined;
  };
  return (
    <div className="min-h-screen bg-hero">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold md:text-5xl">
            Escolha seu <span className="text-brand">plano</span>
          </h1>
          <p className="mt-3 text-muted-foreground">
            Pagamento único. Ativação na hora pelo WhatsApp.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {data.plans.map((p) => {
            const monthly = p.duration_days >= 300 ? p.price_cents / 12 : null;
            const href = buy(p.name);
            return (
              <div
                key={p.id}
                className={`relative flex flex-col rounded-3xl border bg-card p-8 ${p.highlight ? "border-primary shadow-glow" : "border-border"}`}
              >
                {p.highlight && (
                  <span className="absolute -top-3 left-8 rounded-full bg-brand px-3 py-1 text-xs font-bold text-primary-foreground">
                    Mais vantajoso
                  </span>
                )}
                <h2 className="text-2xl font-bold">{p.name}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{p.description}</p>
                <p className="mt-6 font-display text-5xl font-extrabold">{brl(p.price_cents)}</p>
                {monthly && (
                  <p className="text-sm text-primary">equivale a {brl(Math.round(monthly))}/mês</p>
                )}
                <ul className="mt-6 space-y-2 text-sm">
                  {[
                    "1 dispositivo",
                    `${p.duration_days} dias de acesso`,
                    "Android TV, Tizen e Web",
                    "Suporte via WhatsApp",
                  ].map((t) => (
                    <li key={t} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-success" />
                      {t}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex-1" />
                {href ? (
                  <Button asChild variant="hero" size="xl">
                    <a href={href} target="_blank" rel="noopener noreferrer">
                      <MessageCircle />
                      Comprar agora
                    </a>
                  </Button>
                ) : (
                  <Button variant="secondary" size="xl" disabled>
                    WhatsApp não configurado
                  </Button>
                )}
              </div>
            );
          })}
        </div>
        {data.supportHours && (
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Atendimento: {data.supportHours}
          </p>
        )}
        <section className="mx-auto mt-20 max-w-3xl">
          <h2 className="mb-6 text-center text-3xl font-bold">Perguntas frequentes</h2>
          <Accordion
            type="single"
            collapsible
            className="rounded-2xl border border-border bg-card px-6"
          >
            {faq.map(([q, a]) => (
              <AccordionItem key={q} value={q}>
                <AccordionTrigger className="text-left">{q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}