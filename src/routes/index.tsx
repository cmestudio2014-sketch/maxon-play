import { createFileRoute, Link } from "@tanstack/react-router";
import { MonitorPlay, KeyRound, ShieldCheck, Tv } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteFooter, SiteHeader } from "@/components/brand";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MAXON PLAY — Player de TV para suas listas autorizadas" },
      {
        name: "description",
        content:
          "Player moderno para Android TV, Samsung Tizen e navegador. Ative com uma KEY e use suas listas M3U ou Xtream autorizadas.",
      },
      { property: "og:title", content: "MAXON PLAY — Player de TV" },
      {
        property: "og:description",
        content: "Ative com uma KEY e assista suas listas autorizadas na TV.",
      },
    ],
  }),
  component: Home,
});

const features = [
  {
    icon: Tv,
    title: "Feito para a TV",
    text: "Navegação por controle remoto, cards grandes e leitura confortável no sofá.",
  },
  {
    icon: KeyRound,
    title: "Ativação por KEY",
    text: "Abra o app, veja seu Device ID e digite a KEY. Pronto.",
  },
  {
    icon: MonitorPlay,
    title: "Suas listas",
    text: "M3U ou Xtream Codes do seu provedor autorizado — a lista pode chegar sozinha na TV.",
  },
  {
    icon: ShieldCheck,
    title: "Seguro",
    text: "Credenciais criptografadas e entregues apenas ao aparelho licenciado.",
  },
];

function Home() {
  return (
    <div className="min-h-screen bg-hero">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4">
        <section className="py-20 md:py-28">
          <p className="mb-4 inline-flex rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground">
            Android TV · Samsung Tizen · Web
          </p>
          <h1 className="max-w-3xl text-5xl font-extrabold leading-[1.05] md:text-7xl">
            Sua TV, do seu jeito. <span className="text-brand">MAXON PLAY.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Um player rápido e bonito para as listas que você já tem direito de assistir. Sem canais
            embutidos, sem complicação.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild variant="hero" size="xl">
              <Link to="/planos">Ver planos</Link>
            </Button>
            <Button asChild variant="secondary" size="xl" className="tv-focus">
              <Link to="/ativar">Ativar dispositivo</Link>
            </Button>
          </div>
        </section>
        <section className="grid gap-4 pb-24 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f.title} className="rounded-2xl border border-border bg-card/70 p-6">
              <f.icon className="h-7 w-7 text-primary" />
              <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.text}</p>
            </div>
          ))}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}