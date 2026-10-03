import { Link } from "@tanstack/react-router";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 font-display font-extrabold tracking-tight ${className}`}
    >
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand text-primary-foreground">
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
      <span>
        MAXON<span className="text-brand"> PLAY</span>
      </span>
    </span>
  );
}

export function SiteHeader() {
  const link = "rounded-lg px-3 py-2 text-sm text-muted-foreground hover:text-foreground tv-focus";
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="tv-focus rounded-lg">
          <Logo className="text-lg" />
        </Link>
        <nav className="flex items-center gap-1">
          <Link to="/planos" className={link} activeProps={{ className: "text-foreground" }}>
            Planos
          </Link>
          <Link to="/ativar" className={link} activeProps={{ className: "text-foreground" }}>
            Ativar
          </Link>
          <Link to="/cliente" className={link} activeProps={{ className: "text-foreground" }}>
            Minha conta
          </Link>
          <Link to="/player" className={link} activeProps={{ className: "text-foreground" }}>
            Web Player
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border py-8 text-center text-xs text-muted-foreground">
      <p>
        MAXON PLAY é um player. Não fornecemos canais, filmes, listas ou servidores — use apenas
        conteúdo autorizado.
      </p>
      <p className="mt-2">
        <Link to="/admin" className="hover:text-foreground">
          Área administrativa
        </Link>
      </p>
    </footer>
  );
}

export const brl = (cents: number) =>
  (cents / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
export const fmtDate = (d: string | Date | null | undefined) =>
  d ? new Date(d).toLocaleDateString("pt-BR") : "—";
export const fmtDateTime = (d: string | Date | null | undefined) =>
  d ? new Date(d).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" }) : "—";