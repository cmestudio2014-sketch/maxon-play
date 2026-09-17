import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Film,
  Tv,
  Sparkles,
  Baby,
  Lock,
  Trophy,
  ShieldCheck,
  Check,
} from "lucide-react";

const CDN = "https://www.acessocineflix.vip/wp-content/uploads";
const LOGO = "/logo-maxonplay.svg";
const CTA_URL = "https://go.tribopay.com.br/sok63sercg";

const postersA = [
  "2026/01/A-Minecraft-Movie.webp",
  "2026/01/Jurassic-World-Rebirth.webp",
  "2026/01/Lilo-e-Stich.webp",
  "2026/01/Quarteto-Fantastico.webp",
  "2026/01/Superman.webp",
  "2026/01/Como-treinar-seu-dragao.webp",
  "2026/01/F1-o-filme.webp",
  "2026/01/Demon-Slayer.webp",
];
const postersB = [
  "2026/01/Ballerina.webp",
  "2026/01/Megan-2.webp",
  "2026/01/Compa.webp",
  "2026/01/Entre-montanhas.webp",
  "2026/01/Nobody.webp",
  "2026/01/Wandinha.webp",
  "2026/01/Genv.webp",
  "2026/01/Dexter.webp",
];
const postersC = [
  "2026/01/Pitt.webp",
  "2026/01/Brid.webp",
  "2026/01/Peace.webp",
  "2026/01/Peaky.webp",
  "2026/01/Round6.webp",
  "2026/01/Breaking.webp",
  "2026/01/twd.webp",
  "2026/01/Game.webp",
  "2026/01/Stranger.webp",
];

const streamings = [
  "2026/01/IMG1.webp",
  "2026/01/IMG2.webp",
  "2026/01/IMG3.webp",
  "2026/01/IMG4.webp",
  "2026/01/IMG5.webp",
  "2026/01/SKY-APP.webp",
  "2026/01/IMG7.webp",
  "2026/01/IMG8.webp",
];

const esportes = Array.from(
  { length: 12 },
  (_, i) => `2026/01/FUTEBOL-${String(i + 1).padStart(2, "0")}.webp`,
);

const beneficios = [
  {
    icon: Film,
    title: "Filmes incríveis",
    text: "Assista a clássicos, lançamentos e grandes produções vencedoras de prêmios, tudo em alta definição e com uma seleção que agrada a todos os gostos.",
  },
  {
    icon: Tv,
    title: "Séries Imperdíveis",
    text: "Descubra séries aclamadas e sucessos do momento, com temporadas completas disponíveis para você maratonar sem limites.",
  },
  {
    icon: Sparkles,
    title: "Animes Crunchyroll",
    text: "Possuímos uma lista enorme com todos os animes do momento atualizados e em qualidade HD para você maratonar.",
  },
  {
    icon: Baby,
    title: "Canais infantis",
    text: "Toda a lista para a criançada se divertir além de Disney+ e muito mais!",
  },
  {
    icon: Lock,
    title: "Canais adultos",
    text: "Toda a lista de canais adultos protegida com senha para bloqueio e segurança das crianças.",
  },
  {
    icon: Trophy,
    title: "Esportes ao vivo",
    text: "Prepare-se para ter literalmente todos os acessos dos canais de esporte, futebol, artes marciais e muito mais!",
  },
];

const comparativo = [
  { img: "2026/01/C1-1.webp", price: "" },
  { img: "2026/01/C6.webp", price: "" },
  { img: "2026/01/C4.webp", price: "" },
  { img: "2026/01/C1-2.webp", price: "" },
  { img: "2026/01/C7-1.webp", price: "" },
  { img: "2026/01/C8.webp", price: "" },
  { img: "2026/01/C10.webp", price: "" },
  { img: "2026/01/C9.webp", price: "" },
  { img: "2026/01/SKY.webp", price: "" },
  { img: "2026/01/PARAMOUNT.webp", price: "" },
  { img: "2026/01/CRUNCHROLL.webp", price: "" },
  { img: "2026/01/CLARO-TV.webp", price: "" },
];

const planos = [
  {
    nome: "Anual",
    sub: "",
    preco: "R$ 90,00",
    obs: "Pagamento único anual",
    link: "https://go.tribopay.com.br/sok63sercg",
    destaque: true,
  },
  {
    nome: "Mensal",
    sub: "",
    preco: "R$ 30,00",
    obs: "Acesso por 30 dias",
    link: "https://go.tribopay.com.br/h2fze",
    destaque: false,
  },
];

const faq = [
  {
    q: "Precisa de Internet para funcionar?",
    a: "Sim, o App MAXON IPTV precisa de internet para o seu funcionamento, mas uma internet básica já é mais que suficiente.",
  },
  {
    q: "Precisa de especialista para configurar?",
    a: "Não, nosso sistema é muito simples de instalar. Ensinamos o passo a passo detalhado para você colocar tudo para funcionar.",
  },
  {
    q: "O pagamento é mensal?",
    a: "Não. Agora temos apenas o plano anual por R$ 90,00, com acesso liberado a todos os canais e conteúdos.",
  },
  {
    q: "Moro em zona rural, funciona pra mim?",
    a: "Sim! Funciona em toda zona rural do Brasil, com uma internet básica ou até mesmo 3G/4G do celular, sem travamentos.",
  },
  {
    q: "MAXON IPTV funciona em Angola?",
    a: "Sim! A MAXON IPTV funciona em toda Angola e todas as províncias, sem travamentos e com milhares de conteúdos.",
  },
  {
    q: "Quantos canais são liberados?",
    a: "Você vai ter acesso a mais de 2 mil canais abertos e fechados, Netflix, Amazon Prime, Disney+, Max, Globoplay e muito mais!",
  },
  {
    q: "Como vou receber o acesso?",
    a: "Imediatamente! Após o pagamento ser confirmado, enviamos no seu e-mail o acesso à plataforma e todos os tutoriais de uso.",
  },
  {
    q: "Em quantos aparelhos posso usar?",
    a: "Nossos planos têm capacidade para 3 telas simultâneas.",
  },
];

function PosterColumn({
  items,
  dir,
}: {
  items: string[];
  dir: "omni-up" | "omni-down";
}) {
  const loop = [...items, ...items];
  return (
    <div className="h-[420px] overflow-hidden md:h-[520px]">
      <div className={`flex flex-col gap-3 ${dir}`}>
        {loop.map((src, i) => (
          <img
            key={`${src}-${i}`}
            src={`${CDN}/${src}`}
            alt="Título disponível na MAXON IPTV"
            loading="lazy"
            className="w-full rounded-xl border border-border object-cover"
          />
        ))}
      </div>
    </div>
  );
}

function Cta({ className = "" }: { className?: string }) {
  return (
    <Button
      asChild
      size="lg"
      className="h-14 rounded-full px-10 text-base font-bold uppercase tracking-wide shadow-lg shadow-primary/30"
    >
      <a href={CTA_URL} className={className}>
        Adquira o seu agora
      </a>
    </Button>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Topbar */}
      <div className="sticky top-0 z-50 border-b border-border bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-3 sm:flex-row sm:justify-between">
          <p className="text-center text-sm font-semibold uppercase tracking-wide">
            Clique no botão abaixo para renovar seu plano
          </p>
          <Button asChild className="rounded-full font-bold uppercase">
            <a href={CTA_URL}>
              &nbsp;
              <br />
              promoção
              <br />
              &nbsp;<strong>AGORA</strong>
            </a>
          </Button>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-primary/25 blur-[120px]" />
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 lg:grid-cols-2">
          <div className="relative z-10">
            <img
              src={LOGO}
              alt="Logotipo MAXON PLAY"
              className="mb-8 h-20 w-auto rounded-xl md:h-24"
            />
            <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">
              Conteúdo ilimitado por{" "}
              <span className="text-primary">
                um valor que cabe no seu bolso!
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              Tenha acesso a mais de 2 mil canais, incluindo Netflix, Disney+,
              HBO Max e mais, por um preço acessível! Com a MAXON IPTV, você
              economiza e assiste com qualidade.
            </p>
            <div className="mt-8">
              <Cta />
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Planos anual por partir de R$ 90,00&nbsp;· todo sos canais liberados
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <PosterColumn items={postersA} dir="omni-up" />
            <PosterColumn items={postersB} dir="omni-down" />
            <PosterColumn items={postersC} dir="omni-up" />
          </div>
        </div>
      </section>

      {/* Como funciona / plano */}
      <section className="mx-auto max-w-6xl px-4 py-16 text-center">
        <h2 className="text-3xl font-bold md:text-4xl">
          Veja como a MAXON IPTV funciona
        </h2>
        <div className="mx-auto mt-10 max-w-xl rounded-3xl border border-border bg-card p-8">
          <h3 className="text-2xl font-bold">Plano Anual</h3>
          <p className="mt-3 text-muted-foreground">
            O pacote completo de entretenimento: canais ao vivo, filmes, séries
            e os streamings que você mais gosta.
          </p>
          <p className="mt-6 text-lg">
            Por apenas{" "}
            <span className="font-bold text-primary underline">
              R$ 90,00/ano
            </span>
          </p>
          <Button
            asChild
            size="lg"
            className="mt-6 h-13 w-full rounded-full font-bold uppercase"
          >
            <a href={CTA_URL}>Assine agora</a>
          </Button>
        </div>
        <p className="mt-10 text-muted-foreground">
          A MAXON IPTV é compatível com Smart TVs, smartphones, tablets e
          computadores
        </p>
        <img
          src={`${CDN}/2026/01/MARCAS.webp`}
          alt="Dispositivos compatíveis com a MAXON IPTV"
          loading="lazy"
          className="mx-auto mt-6 w-full max-w-3xl"
        />
      </section>

      {/* Benefícios */}
      <section className="border-y border-border bg-card/40 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-3xl font-bold md:text-4xl">
            Seus filmes, séries e animes favoritos, com a experiência que você
            merece
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-center text-lg text-muted-foreground">
            <span className="text-primary">
              A televisão do futuro é pela internet,
            </span>{" "}
            sem antenas e sem decodificadores
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {beneficios.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary"
              >
                <Icon className="h-9 w-9 text-primary" />
                <h3 className="mt-4 text-xl font-bold">{title}</h3>
                <p className="mt-2 text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Streamings */}
      <section className="mx-auto max-w-6xl px-4 py-16 text-center">
        <h2 className="text-3xl font-bold md:text-4xl">
          Tenha acesso ao conteúdo de vários serviços de streaming em uma única
          plataforma!
        </h2>
        <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-4">
          {streamings.map((s) => (
            <img
              key={s}
              src={`${CDN}/${s}`}
              alt="Serviço de streaming incluso"
              loading="lazy"
              className="w-full rounded-xl"
            />
          ))}
        </div>
        <div className="mt-10">
          <Cta />
        </div>
      </section>

      {/* Esportes */}
      <section className="border-y border-border bg-card/40 py-16">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">
            Para os fãs de esporte, a MAXON IPTV é o lugar certo!
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-muted-foreground">
            Acompanhe os maiores campeonatos de futebol do Brasil e do mundo,
            além de transmissões de outros esportes que você ama.
          </p>
          <div className="mt-10 overflow-hidden">
            <div className="omni-left flex w-max gap-5">
              {[...esportes, ...esportes].map((s, i) => (
                <img
                  key={`${s}-${i}`}
                  src={`${CDN}/${s}`}
                  alt="Campeonato disponível ao vivo"
                  loading="lazy"
                  className="h-28 w-auto rounded-xl md:h-36"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Comparativo */}
      <section className="mx-auto max-w-6xl px-4 py-16 text-center">
        <h2 className="text-3xl font-bold md:text-4xl">
          <span className="text-primary">Isso é o que você pagaria</span> se
          assinasse todas as plataformas de streaming:
        </h2>
        <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {comparativo.map((c) => (
            <div
              key={c.img}
              className="rounded-2xl border border-border bg-card p-4"
            >
              <img
                src={`${CDN}/${c.img}`}
                alt="Plataforma de streaming avulsa"
                loading="lazy"
                className="mx-auto w-full rounded-lg"
              />
              <p className="mt-3 font-semibold text-muted-foreground">
                {c.price}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-10 text-2xl font-bold">
          Ao todo você pagaria R$ 514,85 por mês
        </p>
        <p className="mt-2 text-2xl font-bold">
          Já com a MAXON IPTV{" "}
           <span className="text-accent">você paga apenas R$ 90,00 Anual!!</span>
        </p>
        <div className="mt-8">
          <Cta />
        </div>
      </section>

      {/* Planos */}
      <section
        id="planos"
        className="border-y border-border bg-card/40 py-16"
      >
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-3xl font-bold md:text-4xl">
            Aproveite essa oportunidade e assine já!
          </h2>
          <p className="mt-4 text-center">
            <span className="inline-block rounded-full bg-accent px-5 py-2 text-sm font-bold uppercase text-accent-foreground">
              Oferta válida apenas hoje!
            </span>
          </p>
          <div className="mx-auto mt-12 grid max-w-2xl gap-6 md:grid-cols-2">
            {planos.map((p) => (
              <div
                key={p.nome}
                className={`flex flex-col rounded-2xl border p-6 text-center ${
                  p.destaque
                    ? "border-primary bg-primary/10 shadow-lg shadow-primary/20"
                    : "border-border bg-card"
                }`}
              >
                <p className="text-sm uppercase text-muted-foreground">Plano</p>
                <h3 className="mt-1 text-xl font-extrabold">{p.nome}</h3>
                {p.sub && (
                  <p className="mt-1 text-sm font-semibold text-primary">
                    {p.sub}
                  </p>
                )}
                 <p className="mt-4 text-3xl font-extrabold">{p.preco}</p>
                <p className="mt-2 min-h-10 text-sm text-muted-foreground">
                  {p.obs}
                </p>
                <Button
                  asChild
                  className="mt-6 rounded-full font-bold uppercase"
                  variant={p.destaque ? "default" : "secondary"}
                >
                  <a href={p.link ?? CTA_URL}>Comprar agora</a>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Garantia */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2">
        <img
          src={`${CDN}/2026/01/Group-1730.webp`}
          alt="Selo de garantia de 7 dias da MAXON IPTV"
          loading="lazy"
          className="mx-auto w-full max-w-sm"
        />
        <div>
          <h2 className="text-3xl font-bold">
            <span className="text-primary">
                Tenha todos os canais liberados{"\u00a0"}
             </span>
          </h2>
          <p className="mt-4 text-muted-foreground">
             Sem letras miúdas no contrato: você pode experimentar a MAXON IPTV e
             todos os conteúdos atualizados. Todo mes renovamos as listas de
             fornecedores de canais{"\u00a0"}
          </p>
          <ul className="mt-6 space-y-2 text-muted-foreground">
            {[
              "Acesso liberado após a compra",
              "Suporte humano todos os dias",
            ].map((i) => (
              <li key={i} className="flex items-center gap-2">
                <Check className="h-5 w-5 text-accent" /> {i}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Cta />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-y border-border bg-card/40 py-16">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-center text-3xl font-bold md:text-4xl">
            Ainda com dúvidas? Temos a resposta.
          </h2>
          <Accordion type="single" collapsible className="mt-10">
            {faq.map((f) => (
              <AccordionItem key={f.q} value={f.q}>
                <AccordionTrigger className="text-left text-base font-semibold">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="mt-10 rounded-2xl border border-border bg-card p-6 text-center">
            <h3 className="text-xl font-bold">Não encontrou a sua dúvida?</h3>
            <p className="mt-2 text-muted-foreground">
              Nossa equipe está à disposição para tirar a sua dúvida! Fale
              diretamente conosco clicando no botão abaixo.
            </p>
            <Button
              asChild
              className="mt-5 rounded-full font-bold uppercase"
              variant="secondary"
            >
              <a href={CTA_URL}>Falar com suporte</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <img src={LOGO} alt="Logotipo MAXON PLAY" className="h-14 w-auto rounded-lg" />
            <h3 className="mt-5 font-bold">Suporte ao cliente</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Atendimento todos os dias pelo nosso canal oficial.
            </p>
          </div>
          <div>
            <h3 className="font-bold">Formas de Pagamento</h3>
            <img
              src={`${CDN}/2026/01/FORMAS-DE-PAGAMENTO.webp`}
              alt="Formas de pagamento aceitas"
              loading="lazy"
              className="mt-3 w-full max-w-xs"
            />
            <p className="mt-4 text-sm text-muted-foreground">
              A venda da plataforma MAXON IPTV em qualquer outro site é proibida.
              Não compre falsificações e garanta um produto de qualidade
              comprando apenas através do nosso site oficial.
            </p>
          </div>
          <div>
            <h3 className="flex items-center gap-2 font-bold">
              <ShieldCheck className="h-5 w-5 text-accent" /> Site seguro
            </h3>
            <div className="mt-3 flex items-center gap-4">
              <img
                src={`${CDN}/2026/01/SELO-SITE-SEGURO.webp`}
                alt="Selo de site seguro"
                loading="lazy"
                className="h-16 w-auto"
              />
              <img
                src={`${CDN}/2026/01/SELO-RECLAME-AQUI.webp`}
                alt="Selo Reclame Aqui"
                loading="lazy"
                className="h-16 w-auto"
              />
            </div>
          </div>
        </div>
        <p className="mt-10 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          Esta página não tem qualquer vínculo com o Facebook S/A e suas
          empresas, apenas usamos a plataforma para promover os nossos produtos.
        </p>
      </footer>
    </div>
  );
}

