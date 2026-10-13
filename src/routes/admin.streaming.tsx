import { createFileRoute } from "@tanstack/react-router";
import { Film, Music2, ShieldCheck, Tv2 } from "lucide-react";
import { PageHeader } from "@/components/admin-ui";
import { Button } from "@/components/ui/button";

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
  return (
    <>
      <PageHeader title="Ativação de Streaming" desc="Central de serviços e ativações de streaming do MAXON PLAY." />
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
        <p className="mt-2 text-sm text-muted-foreground">Área preparada para integração segura com o backend. Credenciais e tokens não serão expostos no navegador.</p>
      </div>
    </>
  );
}
