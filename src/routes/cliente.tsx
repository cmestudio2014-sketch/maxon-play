import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SiteFooter, SiteHeader, fmtDate, fmtDateTime } from "@/components/brand";
import { lookupLicense } from "@/lib/public.functions";

export const Route = createFileRoute("/cliente")({
  head: () => ({
    meta: [
      { title: "Minha conta — MAXON PLAY" },
      {
        name: "description",
        content: "Consulte a validade do seu plano e o dispositivo vinculado à sua KEY.",
      },
      { property: "og:title", content: "Minha conta MAXON PLAY" },
      { property: "og:description", content: "Consulte validade e dispositivo." },
    ],
  }),
  component: Cliente,
});

type License = {
  key: string;
  plan: string;
  status: string;
  expires_at: string | null;
  customer: string | null;
  device: {
    id: string;
    platform: string | null;
    model: string | null;
    last_seen_at: string | null;
  } | null;
};

function Cliente() {
  const lookup = useServerFn(lookupLicense);
  const [key, setKey] = useState("");
  const [lic, setLic] = useState<License | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    try {
      const r = await lookup({ data: { key } });
      if (r.ok) setLic(r.license as License);
      else {
        setLic(null);
        setErr(r.error);
      }
    } catch {
      setErr("Verifique a KEY digitada.");
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className="min-h-screen bg-hero">
      <SiteHeader />
      <main className="mx-auto max-w-2xl px-4 py-16">
        <h1 className="text-4xl font-extrabold">Minha conta</h1>
        <p className="mt-2 text-muted-foreground">
          Digite sua KEY para ver a validade e o aparelho vinculado.
        </p>
        <form onSubmit={submit} className="mt-8 flex gap-2">
          <Input
            value={key}
            onChange={(e) => setKey(e.target.value.toUpperCase())}
            placeholder="XXXX-XXXX-XXXX-XXXX"
            className="h-12 font-mono"
          />
          <Button type="submit" variant="hero" size="lg" disabled={busy || key.length < 16}>
            Consultar
          </Button>
        </form>
        {err && <p className="mt-4 text-destructive">{err}</p>}
        {lic && (
          <div className="mt-8 space-y-4 rounded-3xl border border-border bg-card p-8">
            {lic.customer && (
              <p className="text-lg">
                Olá, <b>{lic.customer}</b>
              </p>
            )}
            <Row k="KEY" v={lic.key} />
            <Row k="Plano" v={lic.plan} />
            <Row k="Status" v={lic.status} />
            <Row k="Válido até" v={fmtDate(lic.expires_at)} />
            <hr className="border-border" />
            {lic.device ? (
              <>
                <Row k="Dispositivo" v={lic.device.id} />
                <Row k="Plataforma" v={`${lic.device.platform ?? ""} ${lic.device.model ?? ""}`} />
                <Row k="Última conexão" v={fmtDateTime(lic.device.last_seen_at)} />
              </>
            ) : (
              <p className="text-muted-foreground">Nenhum dispositivo vinculado ainda.</p>
            )}
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
const Row = ({ k, v }: { k: string; v: string }) => (
  <div className="flex justify-between gap-4">
    <span className="text-muted-foreground">{k}</span>
    <span className="font-medium">{v}</span>
  </div>
);