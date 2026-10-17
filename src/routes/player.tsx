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

type Tab = "home" | "live" | "ao_vivo" | "futebol" | "infantil" | "movie" | "filmes" | "series" | "adulto" | "fav" | "search" | "settings";
const MANUAL_KEY = "maxon.manual_source";
const FAV_KEY = "maxon.favorites";

function Player() {
  const [dev, setDev] = useState<DeviceStatus | null>(null);
  const [source, setSource] = useState<SourceConfig | null>(null);
  const [managed, setManaged] = useState(false);
  const [items, setItems] = useState<Item[]>([]);
  const [catalogItems, setCatalogItems] = useState<Item[]>([]);
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
        const allowed = new Set(["ao_vivo", "futebol", "infantil", "filmes", "series", "adulto"]);
        setCatalogItems((cfg.catalog ?? []).filter((c) => allowed.has(c.category)).map((c) => ({
          id: c.id,
          name: c.name,
          logo: c.logo || "",
          group: c.category,
          url: c.url,
          category: c.category,
          kind: (c.category === "filmes" ? "movie" : c.category === "series" ? "series" : "live") as Item["kind"],
        })));
        setManaged(true);
        toast.success("Lista e catálogo atualizados pelo painel.");
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

  const allItems = useMemo(() => [...items, ...catalogItems], [items, catalogItems]);

  const visible = useMemo(() => {
    let list = allItems;
    if (tab === "live") list = list.filter((i) => i.kind === "live");
    if (tab === "movie") list = list.filter((i) => i.kind === "movie");
    if (tab === "series") list = list.filter((i) => i.kind === "series");
    if (["ao_vivo", "futebol", "infantil", "filmes", "adulto"].includes(tab))
      list = list.filter((i) => i.category === tab || (tab === "ao_vivo" && i.kind === "live" && !i.category));
    if (tab === "fav") list = list.filter((i) => favs.includes(i.id));
    if (tab === "search")
      list = q.length < 2 ? [] : list.filter((i) => i.name.toLowerCase().includes(q.toLowerCase()));
    if (group && tab !== "search") list = list.filter((i) => i.group === group);
    return list.slice(0, 300);
  }, [allItems, tab, favs, q, group]);
  const groups = useMemo(
    () =>
      [...new Set(allItems.filter((i) => tab === "home" || i.kind === tab || i.category === tab).map((i) => i.group))].slice(
        0,
        80,
      ),
    [allItems, tab],
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
    ["ao_vivo", "Ao Vivo", Tv],
    ["futebol", "Futebol", Tv],
    ["infantil", "Infantil", Home],
    ["movie", "Filmes", Film],
    ["filmes", "Filmes do painel", Film],
    ["series", "Séries", Clapperboard],
    ["adulto", "Adulto", Tv],
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
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    let disposed = false;
    let hls: import("hls.js").default | null = null;
    let tsPlayer: { destroy: () => void } | null = null;
    let startupTimer: ReturnType<typeof setTimeout> | null = null;
    let lastProgress = 0;
    setError("");

    const armStartupWatch = (label: string) => {
      if (startupTimer) clearTimeout(startupTimer);
      startupTimer = setTimeout(() => {
        if (!disposed && v.currentTime <= 0 && v.readyState < 3)
          setError(label + " conectado, mas nenhum quadro reproduzível chegou em 12 segundos. Pode ser codec incompatível ou origem sem dados.");
      }, 12000);
    };
    const clearStartupWatch = () => { if (startupTimer) { clearTimeout(startupTimer); startupTimer = null; } };
    const onProgress = () => {
      if (v.currentTime > lastProgress + 0.05) {
        lastProgress = v.currentTime;
        clearStartupWatch();
        setError("");
      }
    };
    v.addEventListener("playing", onProgress);
    v.addEventListener("timeupdate", onProgress);

    const original = item.url.trim();
    const candidates = /^https?:\/\//i.test(original)
      ? item.kind === "live"
        ? [...new Set([
            original,
            original.replace(/\.(?:m3u8|ts)(?=([?#]|$))/i, ".ts"),
            original.replace(/\.(?:m3u8|ts)(?=([?#]|$))/i, ".m3u8"),
            original.replace(/\.(?:m3u8|ts)(?=([?#]|$))/i, ""),
          ])]
        : [original]
      : [];

    const proxy = (u: string) => "/api/stream-proxy?url=" + encodeURIComponent(u);
    const probe = async (u: string) => (await fetch("/api/stream-probe?url=" + encodeURIComponent(u))).json() as Promise<{ ok: boolean; status: number; contentType: string; format: "hls" | "mpegts" | "mp4" | "unknown"; detail?: string }>;
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape" || e.key === "Backspace") onClose(); };
    window.addEventListener("keydown", esc);

    const playDirect = async (u: string) => {
      v.src = proxy(u);
      try { await v.play(); return true; } catch { return false; }
    };

    const start = async () => {
      if (!candidates.length) { setError("URL de vídeo inválida."); return; }
      let selected = candidates[0];
      if (!selected) { setError("URL de vídeo inválida."); return; }
      let detected = item.kind === "live" ? await probe(selected) : null;
      if (item.kind === "live" && detected && !detected.ok) {
        for (const candidate of candidates.slice(1)) {
          const result = await probe(candidate);
          if (disposed) return;
          if (result.ok) { selected = candidate; detected = result; break; }
        }
      }
      if (disposed) return;
      if (detected && !detected.ok) {
        setError("O servidor recusou todas as formas de Live testadas (TS, HLS e URL sem extensão): HTTP " + detected.status + ".");
        return;
      }
      const { default: Hls } = await import("hls.js");
      const hlsCandidate = detected?.format === "hls" ? selected : candidates.find(u => /\.m3u8(?:[?#]|$)/i.test(u) || /[?&](?:output|type)=hls(?:&|$)/i.test(u));

      if (hlsCandidate && Hls.isSupported()) {
        const h = new Hls({ enableWorker: true, lowLatencyMode: false, maxBufferLength: 30, manifestLoadingMaxRetry: 2, fragLoadingMaxRetry: 2 });
        hls = h;
        armStartupWatch("HLS");
        h.on(Hls.Events.MANIFEST_PARSED, () => { if (!disposed) void v.play().catch(() => setError("Clique em reproduzir para iniciar.")); });
        h.on(Hls.Events.ERROR, (_event, data) => {
          if (!data.fatal || disposed) return;
          if (data.type === Hls.ErrorTypes.MEDIA_ERROR) { h.recoverMediaError(); return; }
          h.destroy(); hls = null;
          const ts = candidates.find(u => /\.ts(?:[?#]|$)/i.test(u));
          if (ts) {
            void import("mpegts.js").then(({ default: mpegts }) => {
              if (disposed) return;
              if (!mpegts.isSupported()) {
                setError("Este navegador não suporta MPEG-TS via Media Source Extensions.");
                return;
              }
              v.removeAttribute("src");
              v.load();
              const player = mpegts.createPlayer({
                type: "mpegts",
                isLive: item.kind === "live",
                url: proxy(ts),
              }, { enableWorker: false, lazyLoad: item.kind !== "live" });
              tsPlayer = player;
              player.on(mpegts.Events.ERROR, (type: string, detail: string, info?: { code?: number; msg?: string }) => {
                if (disposed) return;
                const status = typeof info?.code === "number" ? info.code : null;
                if (detail === "HttpStatusCodeInvalid") {
                  setError(status
                    ? "Falha HTTP " + status + " ao carregar TS. " + (
                      status === 401 || status === 403 ? "Acesso recusado pelo servidor de vídeo." :
                      status === 404 ? "Stream não encontrado no servidor." :
                      status === 502 || status === 504 ? "Servidor de origem indisponível ou sem resposta." :
                      "O servidor não entregou um vídeo válido."
                    )
                    : "Servidor recusou o TS (HTTP inválido). Consulte o diagnóstico de rede.");
                } else {
                  setError("Falha de reprodução: " + type + " / " + detail);
                }
              });
              player.attachMediaElement(v);
              player.load();
              void Promise.resolve(player.play()).catch(() => {
                if (!disposed) setError("Não foi possível iniciar MPEG-TS; verifique o servidor ou codec.");
              });
            }).catch(() => { if (!disposed) setError("Falha ao carregar mecanismo MPEG-TS."); });
          } else {
            const code = data.response?.code;
            setError(code ? "Servidor de vídeo respondeu HTTP " + code + "." : "Não foi possível abrir o stream HLS pelo servidor.");
          }
        });
        h.attachMedia(v);
        h.loadSource(detected?.ok ? proxy(hlsCandidate) : hlsCandidate);
        return;
      }

      if (detected?.format === "mpegts") {
        const { default: mpegts } = await import("mpegts.js");
        if (!mpegts.isSupported()) { setError("MPEG-TS detectado, mas Media Source não é suportado."); return; }
        const player = mpegts.createPlayer({ type: "mpegts", isLive: true, url: proxy(selected) }, { enableWorker: false });
        tsPlayer = player;
        player.on(mpegts.Events.ERROR, (type: string, detail: string, info?: { code?: number; msg?: string }) => {
          if (disposed) return;
          const code = typeof info?.code === "number" ? info.code : null;
          setError(code ? "MPEG-TS falhou: HTTP " + code + " — " + detail + "." : "MPEG-TS falhou: " + type + " / " + detail + ".");
        });
        player.attachMediaElement(v); player.load();
        armStartupWatch("MPEG-TS");
        void Promise.resolve(player.play()).catch(() => setError("MPEG-TS detectado, mas a reprodução não iniciou.")); return;
      }
      armStartupWatch("Stream");
      const ok = await playDirect(selected);
      if (!ok && !disposed) setError("Servidor respondeu HTTP " + (detected?.status ?? "?") + ", formato " + (detected?.format ?? "desconhecido") + ", tipo " + (detected?.contentType ?? "desconhecido") + ".");
    };

    void start().catch(() => { if (!disposed) setError("Falha ao iniciar o mecanismo de reprodução."); });
    return () => {
      disposed = true;
      clearStartupWatch();
      v.removeEventListener("playing", onProgress);
      v.removeEventListener("timeupdate", onProgress);
      hls?.destroy();
      tsPlayer?.destroy();
      v.pause(); v.removeAttribute("src"); v.load();
      window.removeEventListener("keydown", esc);
    };
  }, [item, onClose, retry]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background">
      <div className="flex items-center justify-between gap-3 p-4">
        <p className="truncate font-semibold">{item.name}</p>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => setRetry(n => n + 1)}>Tentar novamente</Button>
          <Button variant="secondary" onClick={onClose}>Fechar (Esc)</Button>
        </div>
      </div>
      {error && <p role="alert" className="mx-4 mb-3 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">{error}</p>}
      <video ref={ref} controls playsInline autoPlay className="min-h-0 flex-1 w-full bg-black" />
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