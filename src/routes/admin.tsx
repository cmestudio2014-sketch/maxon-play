import { createFileRoute, Link, Outlet, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import {
  BarChart3,
  Users,
  MonitorSmartphone,
  KeyRound,
  ListVideo,
  Tag,
  ShoppingCart,
  Ticket,
  UserCog,
  Settings,
  ScrollText,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/brand";
import { Field, friendly } from "@/components/admin-ui";
import { getSession, login, logout, setupFirstAdmin } from "@/lib/admin.functions";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Painel — MAXON PLAY" },
      { name: "description", content: "Painel administrativo e de vendas MAXON PLAY." },
      { property: "og:title", content: "Painel MAXON PLAY" },
      { property: "og:description", content: "Gestão de clientes, ativações e vendas." },
      { name: "robots", content: "noindex" },
    ],
  }),
  loader: () => getSession(),
  component: AdminLayout,
  errorComponent: ({ error }) => (
    <div className="p-10 text-center text-destructive">{friendly(error)}</div>
  ),
  notFoundComponent: () => <div className="p-10 text-center">Página não encontrada.</div>,
});

const nav = [
  { to: "/admin", label: "Dashboard", icon: BarChart3, exact: true },
  { to: "/admin/clientes", label: "Clientes", icon: Users },
  { to: "/admin/dispositivos", label: "Dispositivos", icon: MonitorSmartphone },
  { to: "/admin/ativacoes", label: "Ativações", icon: KeyRound },
  { to: "/admin/fontes", label: "Fontes / Listas", icon: ListVideo },
  { to: "/admin/vendas", label: "Vendas", icon: ShoppingCart },
  { to: "/admin/planos", label: "Planos", icon: Tag, admin: true },
  { to: "/admin/cupons", label: "Cupons", icon: Ticket, admin: true },
  { to: "/admin/usuarios", label: "Usuários", icon: UserCog, admin: true },
  { to: "/admin/configuracoes", label: "Configurações", icon: Settings, admin: true },
  { to: "/admin/auditoria", label: "Auditoria", icon: ScrollText, admin: true },
] as const;

function AdminLayout() {
  const { user, setupAllowed } = Route.useLoaderData();
  const router = useRouter();
  const doLogout = useServerFn(logout);
  if (!user) return <AdminLogin setupAllowed={setupAllowed} />;
  return (
    <div className="flex min-h-screen">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar p-4 md:flex">
        <Link to="/" className="mb-6 px-2">
          <Logo />
        </Link>
        <nav className="flex-1 space-y-1 overflow-y-auto">
          {nav
            .filter((n) => !("admin" in n) || user.role === "admin")
            .map((n) => (
              <Link
                key={n.to}
                to={n.to}
                activeOptions={{ exact: "exact" in n }}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                activeProps={{ className: "bg-sidebar-accent text-primary" }}
              >
                <n.icon className="h-4 w-4" />
                {n.label}
              </Link>
            ))}
        </nav>
        <div className="mt-4 border-t border-sidebar-border pt-4 text-sm">
          <p className="truncate font-medium">{user.name}</p>
          <p className="text-xs text-muted-foreground">{user.role}</p>
          <Button
            variant="ghost"
            size="sm"
            className="mt-2 w-full justify-start"
            onClick={async () => {
              await doLogout();
              await router.invalidate();
            }}
          >
            <LogOut />
            Sair
          </Button>
        </div>
      </aside>
      <div className="flex-1 overflow-x-hidden">
        <nav className="flex gap-1 overflow-x-auto border-b border-border p-2 md:hidden">
          {nav
            .filter((n) => !("admin" in n) || user.role === "admin")
            .map((n) => (
              <Link
                key={n.to}
                to={n.to}
                activeOptions={{ exact: "exact" in n }}
                className="whitespace-nowrap rounded-md px-3 py-1.5 text-xs"
                activeProps={{ className: "bg-secondary text-primary" }}
              >
                {n.label}
              </Link>
            ))}
        </nav>
        <main className="p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function AdminLogin({ setupAllowed }: { setupAllowed: boolean }) {
  const router = useRouter();
  const doLogin = useServerFn(login);
  const doSetup = useServerFn(setupFirstAdmin);
  const [f, setF] = useState({ name: "", email: "", password: "" });
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    try {
      const r = setupAllowed
        ? await doSetup({ data: f })
        : await doLogin({ data: { email: f.email, password: f.password } });
      if (!r.ok) setErr(r.error);
      else await router.invalidate();
    } catch (e) {
      setErr(friendly(e));
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className="grid min-h-screen place-items-center bg-hero px-4">
      <form
        onSubmit={submit}
        className="w-full max-w-sm space-y-4 rounded-3xl border border-border bg-card p-8"
      >
        <Logo className="text-xl" />
        <h1 className="text-xl font-bold">
          {setupAllowed ? "Criar primeiro administrador" : "Entrar no painel"}
        </h1>
        {setupAllowed && (
          <p className="text-xs text-muted-foreground">
            Nenhum admin existe ainda. Em produção, o admin é criado por ADMIN_EMAIL/ADMIN_PASSWORD.
          </p>
        )}
        {setupAllowed && (
          <Field label="Nome">
            <Input value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} required />
          </Field>
        )}
        <Field label="Email">
          <Input
            type="email"
            value={f.email}
            onChange={(e) => setF({ ...f, email: e.target.value })}
            required
            autoComplete="username"
          />
        </Field>
        <Field label="Senha" {...(setupAllowed ? { hint: "Mínimo 10 caracteres" } : {})}>
          <Input
            type="password"
            value={f.password}
            onChange={(e) => setF({ ...f, password: e.target.value })}
            required
            autoComplete={setupAllowed ? "new-password" : "current-password"}
          />
        </Field>
        {err && <p className="text-sm text-destructive">{err}</p>}
        <Button type="submit" variant="hero" size="lg" className="w-full" disabled={busy}>
          {busy ? "Aguarde…" : setupAllowed ? "Criar e entrar" : "Entrar"}
        </Button>
      </form>
    </div>
  );
}