import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Heart, Search, Settings, Tv, Film, Clapperboard, Home, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo, fmtDate } from "@/components/brand";
import {
  fetchConfig,
  heartbeat,
  register,
  type DeviceStatus,
  type SourceConfig,
} from "@/lib/device-client";
import { loadSource, type Item } from "@/lib/playlist";

export const Route = createFileRoute("/player")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Web Player — MAXON PLAY" },
      {
        name: "description",
        content: "Assista suas listas M3U ou Xtream autorizadas no navegador.",
      },
      { property: "og:title", content: "MAXON PLAY Web Player" },
      { property: "og:description", content: "Player web para listas autorizadas." },
    ],
  }),
  component: Player,
});

type Tab = "home" | "live" | "movie" | "series" | "fav" | "search" | "settings";
const MANUAL_KEY = "maxon.manual_source";
const FAV_KEY = "maxon.favorites";

function Player() {
  const [dev, setDev] = useState<DeviceStatus | null>(null);
  const [source, setSource] = useState<SourceConfig | null>(null);
  const [managed, setManaged] = useState(false);
  const [items, setItems] = useState<Item[]>([]);
  const [tab, setTab] = useState<Tab>("home");
  const [group, setGroup] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const [playing, setPlaying] = useState<Item | null>(null);
  const [favs, setFavs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const version = useRef<string>("");

  const apply = useCallback(async (src: SourceConfig | null) => {
    setSource(src);
    setItems([]);
    if (!src) return;
    setLoading(true);
    try {
      setItems(await loadSource(src));
    } catch (e) {
      toast.error(`Não foi possível carregar a lista: ${(e as Error).message}`);
    } finally {
      setLoading(false);
    }
  }, []);

  // Sincroniza configuração atribuída pelo painel (config_version).
  const sync = useCallback(
    async (st: DeviceStatus) => {
      setDev(st);
      if (st.config_version === version.current) return;
      version.current = st.config_version;
      if (st.status === "ativo" && st.config_version !== "none") {
        const cfg = await fetchConfig();
        setManaged(true);
        toast.success("Lista atualizada pelo provedor.");
        await apply(cfg.source);
      } else {
        setManaged(false);
        const manual = localStorage.getItem(MANUAL_KEY);
        await apply(st.status === "ativo" && manual ? (JSON.parse(manual) as SourceConfig) : null);
      }
    },
    [apply],
  );

  useEffect(() => {
    setFavs(JSON.parse(localStorage.getItem(FAV_KEY) ?? "[]") as string[]);
    register()
      .then(sync)
      .catch((e: Error) => toast.error(e.message));
    const t = setInterval(() => {
      heartbeat()
        .then(sync)
        .catch(() => undefined);
    }, 60_000);
    return () => clearInterval(t);
  }, [sync]);

  const toggleFav = (id: string) => {
    const next = favs.includes(id) ? favs.filter((f) => f !== id) : [...favs, id];
    setFavs(next);
    localStorage.setItem(FAV_KEY, JSON.stringify(next));
  };

  const visible = useMemo(() => {
    let list = items;
    if (tab === "live" || tab === "movie" || tab === "series")
      list = list.filter((i) => i.kind === tab);
    if (tab === "fav") list = list.filter((i) => favs.includes(i.id));
    if (tab === "search")
      list = q.length < 2 ? [] : list.filter((i) => i.name.toLowerCase().includes(q.toLowerCase()));
    if (group && tab !== "search") list = list.filter((i) => i.group === group);
    return list.slice(0, 300);
  }, [items, tab, favs, q, group]);
  const groups = useMemo(
    () =>
      [...new Set(items.filter((i) => tab === "home" || i.kind === tab).map((i) => i.group))].slice(
        0,
        80,
      ),
    [items, tab],
  );

  if (dev && dev.status !== "ativo") {
    return (
      <div className="grid min-h-screen place-items-center bg-hero p-6 text-center">
        <div className="max-w-md space-y-4">
          <Logo className="text-2xl" />
          <p className="text-lg">Este navegador ainda não está ativo ({dev.status}).</p>
          <p className="font-mono text-2xl text-primary">{dev.device_id}</p>
          <Button asChild variant="hero" size="xl">
            <Link to="/ativar">Ativar com KEY</Link>
          </Button>
        </div>
      </div>
    );
  }

  const tabs: [Tab, string, typeof Tv][] = [
    ["home", "Início", Home],
    ["live", "Live TV", Tv],
    ["movie", "Filmes", Film],
    ["series", "Séries", Clapperboard],
    ["fav", "Favoritos", Heart],
    ["search", "Busca", Search],
    ["settings", "Configurações", Settings],
  ];
  return (
    <div className="flex min-h-screen">
      <aside className="flex w-20 shrink-0 flex-col items-center gap-2 border-r border-border bg-sidebar py-4 lg:w-56 lg:items-stretch lg:px-3">
        <div className="mb-4 px-2">
          <Logo className="hidden lg:inline-flex" />
        </div>
        {tabs.map(([t, label, Icon]) => (
          <button
            key={t}
            onClick={() => {
              setTab(t);
              setGroup(null);
            }}
            className={`tv-focus flex items-center gap-3 rounded-xl px-3 py-3 text-sm ${tab === t ? "bg-sidebar-accent text-primary" : "text-sidebar-foreground/80 hover:bg-sidebar-accent"}`}
          >
            <Icon className="h-5 w-5" />
            <span className="hidden lg:inline">{label}</span>
          </button>
        ))}
      </aside>
      <main className="flex-1 overflow-x-hidden p-6">
        {playing && <VideoPlayer item={playing} onClose={() => setPlaying(null)} />}
        {tab === "settings" ? (
          <SettingsPanel
            dev={dev}
            managed={managed}
            source={source}
            onManual={(s) => {
              localStorage.setItem(MANUAL_KEY, JSON.stringify(s));
              void apply(s);
            }}
            onClear={() => {
              localStorage.removeItem(MANUAL_KEY);
              void apply(null);
            }}
            onSync={() => {
              version.current = "";
              void heartbeat().then(sync);
            }}
          />
        ) : !source ? (
          <div className="mx-auto mt-20 max-w-md text-center">
            <h2 className="text-2xl font-bold">Nenhuma lista configurada</h2>
            <p className="mt-2 text-muted-foreground">
              Seu provedor ainda não enviou uma lista. Você pode adicionar sua lista autorizada
              manualmente.
            </p>
            <Button variant="hero" size="lg" className="mt-6" onClick={() => setTab("settings")}>
              Adicionar lista
            </Button>
          </div>
        ) : (
          <>
            {tab === "search" && (
              <Input
                autoFocus
                placeholder="Buscar canais, filmes, séries…"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="mb-6 h-14 text-lg"
              />
            )}
            {tab !== "search" && tab !== "fav" && groups.length > 0 && (
              <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
                <button
                  onClick={() => setGroup(null)}
                  className={`tv-focus whitespace-nowrap rounded-full px-4 py-2 text-sm ${!group ? "bg-primary text-primary-foreground" : "bg-secondary"}`}
                >
                  Todos
                </button>
                {groups.map((g) => (
                  <button
                    key={g}
                    onClick={() => setGroup(g)}
                    className={`tv-focus whitespace-nowrap rounded-full px-4 py-2 text-sm ${group === g ? "bg-primary text-primary-foreground" : "bg-secondary"}`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            )}
            {loading && <p className="text-muted-foreground">Carregando lista…</p>}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
              {visible.map((i) => (
                <div key={i.id} className="group relative">
                  <button
                    onClick={() =>
                      i.url
                        ? setPlaying(i)
                        : toast.info("Episódios de séries: disponível nos apps de TV.")
                    }
                    className="tv-focus flex aspect-video w-full flex-col items-center justify-center overflow-hidden rounded-xl border border-border bg-card p-3 text-center"
                  >
                    {i.logo ? (
                      <img src={i.logo} alt="" loading="lazy" className="max-h-14 object-contain" />
                    ) : (
                      <Tv className="h-8 w-8 text-muted-foreground" />
                    )}
                    <span className="mt-2 line-clamp-2 text-xs font-medium">{i.name}</span>
                  </button>
                  <button
                    aria-label="Favoritar"
                    onClick={() => toggleFav(i.id)}
                    className="absolute right-2 top-2 rounded-full bg-background/70 p-1.5"
                  >
                    <Heart
                      className={`h-4 w-4 ${favs.includes(i.id) ? "fill-primary text-primary" : ""}`}
                    />
                  </button>
                </div>
              ))}
            </div>
            {!loading && visible.length === 0 && (
              <p className="text-muted-foreground">Nada por aqui.</p>
            )}
          </>
        )}
      </main>
    </div>
  );
}

function VideoPlayer({ item, onClose }: { item: Item; onClose: () => void }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    let hls: { destroy: () => void } | null = null;
    if (/\.m3u8(\?|$)/.test(item.url) && !v.canPlayType("application/vnd.apple.mpegurl")) {
      void import("hls.js").then(({ default: Hls }) => {
        if (!Hls.isSupported()) return;
        const h = new Hls();
        h.loadSource(item.url);
        h.attachMedia(v);
        hls = h;
      });
    } else v.src = item.url;
    void v.play().catch(() => undefined);
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Backspace") onClose();
    };
    window.addEventListener("keydown", esc);
    return () => {
      hls?.destroy();
      window.removeEventListener("keydown", esc);
    };
  }, [item, onClose]);
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background">
      <div className="flex items-center justify-between p-4">
        <p className="font-semibold">{item.name}</p>
        <Button variant="secondary" onClick={onClose}>
          Fechar (Esc)
        </Button>
      </div>
      <video ref={ref} controls autoPlay className="h-full w-full bg-background" />
    </div>
  );
}

function SettingsPanel({
  dev,
  managed,
  source,
  onManual,
  onClear,
  onSync,
}: {
  dev: DeviceStatus | null;
  managed: boolean;
  source: SourceConfig | null;
  onManual: (s: SourceConfig) => void;
  onClear: () => void;
  onSync: () => void;
}) {
  const [type, setType] = useState<"m3u" | "xtream">("m3u");
  const [f, setF] = useState({ url: "", server: "", username: "", password: "" });
  return (
    <div className="max-w-xl space-y-6">
      <h2 className="text-2xl font-bold">Configurações</h2>
      <div className="rounded-2xl border border-border bg-card p-5 text-sm">
        <p>
          MAC / Device ID: <span className="font-mono text-primary">{dev?.device_id}</span>
        </p>
        <p>
          Plano: {dev?.license?.plan} · válido até {fmtDate(dev?.license?.expires_at)}
        </p>
        <p>
          Lista:{" "}
          {source ? (managed ? "enviada pelo provedor" : "adicionada manualmente") : "nenhuma"}
        </p>
        <Button size="sm" variant="secondary" className="mt-3" onClick={onSync}>
          <RefreshCw />
          Sincronizar agora
        </Button>
      </div>
      {managed ? (
        <p className="text-sm text-muted-foreground">
          Sua lista é gerenciada pelo provedor e atualiza automaticamente.
        </p>
      ) : (
        <div className="space-y-3 rounded-2xl border border-border bg-card p-5">
          <p className="font-semibold">Adicionar lista autorizada</p>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant={type === "m3u" ? "default" : "secondary"}
              onClick={() => setType("m3u")}
            >
              URL M3U
            </Button>
            <Button
              size="sm"
              variant={type === "xtream" ? "default" : "secondary"}
              onClick={() => setType("xtream")}
            >
              Xtream Codes
            </Button>
          </div>
          {type === "m3u" ? (
            <Input
              placeholder="https://…/lista.m3u"
              value={f.url}
              onChange={(e) => setF({ ...f, url: e.target.value })}
            />
          ) : (
            <>
              <Input
                placeholder="Servidor (https://…)"
                value={f.server}
                onChange={(e) => setF({ ...f, server: e.target.value })}
              />
              <Input
                placeholder="Usuário"
                value={f.username}
                onChange={(e) => setF({ ...f, username: e.target.value })}
              />
              <Input
                type="password"
                placeholder="Senha"
                value={f.password}
                onChange={(e) => setF({ ...f, password: e.target.value })}
              />
            </>
          )}
          <div className="flex gap-2">
            <Button
              variant="hero"
              onClick={() =>
                onManual(
                  type === "m3u"
                    ? { type: "m3u", m3u_url: f.url }
                    : {
                        type: "xtream",
                        server: f.server,
                        username: f.username,
                        password: f.password,
                      },
                )
              }
            >
              Salvar e carregar
            </Button>
            {source && (
              <Button variant="ghost" onClick={onClear}>
                Remover lista
              </Button>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            Fica salva só neste navegador. Alguns provedores bloqueiam acesso via navegador (CORS);
            nos apps de TV isso não ocorre.
          </p>
        </div>
      )}
    </div>
  );
}