// Parser M3U e cliente Xtream Codes (browser). Nenhuma lista/servidor embutido.
import type { SourceConfig } from "./device-client";

export type Item = {
  id: string;
  name: string;
  logo?: string;
  group: string;
  url: string;
  kind: "live" | "movie" | "series";
  category?: "ao_vivo" | "futebol" | "infantil" | "filmes" | "series" | "adulto";
};


function classifyCategory(
  name: string,
  group: string,
  kind: Item["kind"],
): NonNullable<Item["category"]> {
  const text = (group + " " + name)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  if (/\b(adulto|adult|xxx|erotic|erotico)\b|18\+/.test(text)) return "adulto";
  if (/\b(infantil|crianca|kids|junior|cartoon|desenho)\b/.test(text)) return "infantil";
  if (/\b(futebol|soccer|football|brasileirao|libertadores|champions|esporte|sport|fifa|uefa)\b|premier league|serie a|serie b|copa do mundo/.test(text)) return "futebol";
  if (kind === "movie") return "filmes";
  if (kind === "series") return "series";
  return "ao_vivo";
}

export function parseM3U(text: string): Item[] {
  const lines = text.split(/\r?\n/);
  const out: Item[] = [];
  let meta: { name: string; logo?: string; group: string } | null = null;
  for (const raw of lines) {
    const line = raw.trim();
    if (line.startsWith("#EXTINF")) {
      const attr = (k: string) => new RegExp(`${k}="([^"]*)"`).exec(line)?.[1];
      const logo = attr("tvg-logo");
      meta = {
        name: line.split(",").slice(1).join(",").trim() || "Sem nome",
        group: attr("group-title") || "Geral",
        ...(logo ? { logo } : {}),
      };
    } else if (line && !line.startsWith("#") && meta) {
      const kind: Item["kind"] = /\/movie\//.test(line)
        ? "movie"
        : /\/series\//.test(line)
          ? "series"
          : "live";
      out.push({ id: `${out.length}`, ...meta, url: line, kind, category: classifyCategory(meta.name, meta.group, kind) });
      meta = null;
    }
  }
  return out;
}

type XtCat = { category_id: string; category_name: string };
type XtStream = {
  stream_id?: number;
  series_id?: number;
  name: string;
  stream_icon?: string;
  cover?: string;
  category_id: string;
  container_extension?: string;
};

export async function loadXtream(s: {
  server: string;
  username: string;
  password: string;
}): Promise<Item[]> {
  const base = s.server.replace(/\/+$/, "");
  // Credenciais vão no corpo (POST) quando o servidor aceita; fallback GET exigido pelo protocolo Xtream.
  const api = async <T>(action: string): Promise<T> => {
    const body = new URLSearchParams({ username: s.username, password: s.password, action });
    let r = await fetch(`${base}/player_api.php`, { method: "POST", body }).catch(() => null);
    if (!r || !r.ok) r = await fetch(`${base}/player_api.php?${body.toString()}`);
    return (await r.json()) as T;
  };
  const auth = await fetch(`${base}/player_api.php?username=${encodeURIComponent(s.username)}&password=${encodeURIComponent(s.password)}`).then(r => r.json()).catch(() => ({})) as { user_info?: { allowed_output_formats?: string[] } };
  const liveExt = auth.user_info?.allowed_output_formats?.includes("m3u8") ? "m3u8" : auth.user_info?.allowed_output_formats?.includes("ts") ? "ts" : "ts";
  const [lc, ls, vc, vs, sc, ss] = await Promise.all([
    api<XtCat[]>("get_live_categories"),
    api<XtStream[]>("get_live_streams"),
    api<XtCat[]>("get_vod_categories"),
    api<XtStream[]>("get_vod_streams"),
    api<XtCat[]>("get_series_categories"),
    api<XtStream[]>("get_series"),
  ]);
  const cat = (cs: XtCat[]) => new Map(cs.map((c) => [c.category_id, c.category_name]));
  const lm = cat(lc),
    vm = cat(vc),
    sm = cat(sc);
  const u = encodeURIComponent(s.username),
    p = encodeURIComponent(s.password);
  return [
    ...ls.map((x) => ({
      id: `l${x.stream_id}`,
      name: x.name,
      logo: x.stream_icon ?? "",
      group: lm.get(x.category_id) ?? "Geral",
      url: `${base}/live/${u}/${p}/${x.stream_id}.${liveExt}`,
      kind: "live" as const,
      category: classifyCategory(x.name, lm.get(x.category_id) ?? "Geral", "live"),
    })),
    ...vs.map((x) => ({
      id: `v${x.stream_id}`,
      name: x.name,
      logo: x.stream_icon ?? "",
      group: vm.get(x.category_id) ?? "Geral",
      url: `${base}/movie/${u}/${p}/${x.stream_id}.${x.container_extension ?? "mp4"}`,
      kind: "movie" as const,
      category: classifyCategory(x.name, vm.get(x.category_id) ?? "Geral", "movie"),
    })),
    ...ss.map((x) => ({
      id: `s${x.series_id}`,
      name: x.name,
      logo: x.cover ?? "",
      group: sm.get(x.category_id) ?? "Geral",
      url: "",
      kind: "series" as const,
      category: classifyCategory(x.name, sm.get(x.category_id) ?? "Geral", "series"),
    })),
  ];
}

export async function loadSource(src: SourceConfig): Promise<Item[]> {
  if (src.type === "m3u") {
    const r = await fetch(src.m3u_url);
    if (!r.ok) throw new Error(`Falha ao baixar a lista (${r.status}).`);
    return parseM3U(await r.text());
  }
  return loadXtream(src);
}
