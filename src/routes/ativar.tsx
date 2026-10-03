import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SiteFooter, SiteHeader, fmtDate } from "@/components/brand";
import { activate, register, type DeviceStatus } from "@/lib/device-client";

export const Route = createFileRoute("/ativar")({
  head: () => ({
    meta: [
      { title: "Ativar dispositivo — MAXON PLAY" },
      {
        name: "description",
        content: "Veja o Device ID deste aparelho e ative o MAXON PLAY com sua KEY.",
      },
      { property: "og:title", content: "Ativar MAXON PLAY" },
      { property: "og:description", content: "Digite sua KEY para ativar o player." },
    ],
  }),
  component: Ativar,
});

function Ativar() {
  const [dev, setDev] = useState<DeviceStatus | null>(null);
  const [key, setKey] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    register()
      .then(setDev)
      .catch((e: Error) => setErr(e.message));
  }, []);

  const onKey = (v: string) => {
    const c = v
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, "")
      .slice(0, 16);
    setKey(c.replace(/(.{4})(?=.)/g, "$1-"));
  };
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      const d = await activate(key);
      setDev((p) => ({ ...(p ?? d), ...d }));
      toast.success("Dispositivo ativado!");
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-hero">
      <SiteHeader />
      <main className="mx-auto max-w-2xl px-4 py-16">
        <h1 className="text-4xl font-extrabold">Ativar dispositivo</h1>
        <p className="mt-2 text-muted-foreground">
          Na TV, o app mostra esta mesma tela. Aqui você ativa o Web Player deste navegador.
        </p>
        <div className="mt-8 rounded-3xl border border-border bg-card p-8">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">MAC / Device ID</p>
          <p className="mt-2 font-mono text-3xl font-bold tracking-wider text-primary md:text-4xl">
            {dev?.device_id ?? (err ? "indisponível" : "carregando…")}
          </p>
          {err && <p className="mt-2 text-sm text-destructive">{err}</p>}
          {dev?.status === "ativo" ? (
            <div className="mt-8 rounded-2xl bg-accent p-6">
              <p className="text-lg font-semibold text-accent-foreground">
                Ativo · {dev.license?.plan}
              </p>
              <p className="text-sm text-muted-foreground">
                Válido até {fmtDate(dev.license?.expires_at)} ({dev.license?.days_left} dias)
              </p>
              <Button asChild variant="hero" size="lg" className="mt-4">
                <Link to="/player">Abrir Web Player</Link>
              </Button>
            </div>
          ) : (
            <form onSubmit={submit} className="mt-8 space-y-4">
              {dev && dev.status !== "nao_ativado" && (
                <p className="text-sm text-warning">Status atual: {dev.status}</p>
              )}
              <label className="block text-sm font-medium" htmlFor="key">
                KEY de ativação
              </label>
              <Input
                id="key"
                value={key}
                onChange={(e) => onKey(e.target.value)}
                placeholder="XXXX-XXXX-XXXX-XXXX"
                className="h-16 text-center font-mono text-2xl tracking-widest tv-focus"
                autoComplete="off"
              />
              <Button
                type="submit"
                variant="hero"
                size="xl"
                className="w-full"
                disabled={busy || key.length < 19 || !dev}
              >
                {busy ? "Ativando…" : "Ativar"}
              </Button>
            </form>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}