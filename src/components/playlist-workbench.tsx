import { useMemo, useRef, useState } from "react";
import {
  ArrowLeft, ArrowRight, Download, FileUp, Link2, ListPlus,
  Plus, Trash2, Upload, Check, RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Channel = { id: string; name: string; url: string; group?: string; logo?: string };

function parseM3U(text: string): Channel[] {
  const lines = text.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  const result: Channel[] = [];
  let pending: Omit<Channel, "id" | "url"> = { name: "" };
  for (const line of lines) {
    if (line.startsWith("#EXTINF")) {
      const name = line.split(",").slice(1).join(",").trim() || "Canal sem nome";
      const group = line.match(/group-title="([^"]*)"/i)?.[1];
      const logo = line.match(/tvg-logo="([^"]*)"/i)?.[1];
      pending = { name, ...(group !== undefined && { group }), ...(logo !== undefined && { logo }) };
    } else if (!line.startsWith("#")) {
      result.push({ id: crypto.randomUUID(), name: pending.name || line, url: line, ...(pending.group !== undefined && { group: pending.group }), ...(pending.logo !== undefined && { logo: pending.logo }) });
      pending = { name: "" };
    }
  }
  return result;
}

function toM3U(channels: Channel[]) {
  return "#EXTM3U\n" + channels.map((c) =>
    `#EXTINF:-1${c.group ? ` group-title="${c.group.replaceAll('"', "'")}"` : ""}${c.logo ? ` tvg-logo="${c.logo.replaceAll('"', "'")}"` : ""},${c.name}\n${c.url}`
  ).join("\n") + "\n";
}

export function PlaylistWorkbench() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [a, setA] = useState<Channel[]>([]);
  const [b, setB] = useState<Channel[]>([]);
  const [out, setOut] = useState<Channel[]>([]);
  const [selectedA, setSelectedA] = useState<string[]>([]);
  const [selectedB, setSelectedB] = useState<string[]>([]);
  const [selectedOut, setSelectedOut] = useState<string[]>([]);
  const [activeTarget, setActiveTarget] = useState<"a" | "b">("a");
  const [url, setUrl] = useState("");
  const [notice, setNotice] = useState("Importe arquivos M3U/M3U8 para começar a editar.");
  const [query, setQuery] = useState("");

  const importFile = async (file?: File) => {
    if (!file) return;
    const text = await file.text();
    const parsed = parseM3U(text);
    if (!parsed.length) {
      setNotice("Nenhum canal reconhecido. Confira se o arquivo é uma playlist M3U/M3U8 válida.");
      return;
    }
    if (activeTarget === "a") setA(parsed);
    else setB(parsed);
    setNotice(`${parsed.length} canais importados para a Lista ${activeTarget.toUpperCase()}.`);
  };

  const toggle = (id: string, list: "a" | "b" | "out") => {
    const [values, setValues] = list === "a" ? [selectedA, setSelectedA] : list === "b" ? [selectedB, setSelectedB] : [selectedOut, setSelectedOut];
    values.includes(id) ? setValues(values.filter((v) => v !== id)) : setValues([...values, id]);
  };

  const addToOutput = (source: "a" | "b", move: boolean) => {
    const src = source === "a" ? a : b;
    const selected = source === "a" ? selectedA : selectedB;
    const picked = src.filter((c) => selected.includes(c.id));
    setOut((old) => [...old, ...picked.filter((c) => !old.some((x) => x.url === c.url))]);
    if (move) {
      source === "a" ? setA(src.filter((c) => !selected.includes(c.id))) : setB(src.filter((c) => !selected.includes(c.id)));
    }
    source === "a" ? setSelectedA([]) : setSelectedB([]);
    setNotice(`${picked.length} canal(is) enviado(s) para a lista de exportação.`);
  };

  const moveBetweenSources = (from: "a" | "b") => {
    const src = from === "a" ? a : b;
    const pickedIds = from === "a" ? selectedA : selectedB;
    const picked = src.filter((c) => pickedIds.includes(c.id));
    if (from === "a") {
      setB((old) => [...old, ...picked.filter((c) => !old.some((x) => x.url === c.url))]);
      setA(a.filter((c) => !pickedIds.includes(c.id)));
      setSelectedA([]);
    } else {
      setA((old) => [...old, ...picked.filter((c) => !old.some((x) => x.url === c.url))]);
      setB(b.filter((c) => !pickedIds.includes(c.id)));
      setSelectedB([]);
    }
  };

  const exportList = (channels: Channel[], filename = "maxon-play.m3u") => {
    if (!channels.length) { setNotice("A lista de exportação está vazia."); return; }
    const blob = new Blob([toM3U(channels)], { type: "audio/x-mpegurl;charset=utf-8" });
    const href = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = href;
    anchor.download = filename;
    anchor.click();
    URL.revokeObjectURL(href);
    setNotice(`Arquivo ${filename} gerado com ${channels.length} canais.`);
  };

  const filtered = (items: Channel[]) => items.filter((c) => `${c.name} ${c.group ?? ""}`.toLowerCase().includes(query.toLowerCase()));
  const stats = useMemo(() => ({ a: a.length, b: b.length, out: out.length }), [a, b, out]);

  const renderList = (title: string, items: Channel[], key: "a" | "b" | "out", selected: string[]) => (
    <section className={`min-w-0 rounded-xl border ${key === "out" ? "border-primary/50 bg-primary/5" : "border-border bg-card"}`}>
      <div className="flex items-center justify-between gap-2 border-b border-border p-3">
        <div className="min-w-0"><h3 className="font-semibold">{title}</h3><p className="text-xs text-muted-foreground">{items.length} canais</p></div>
        {key !== "out" && <Button size="sm" variant="ghost" onClick={() => setActiveTarget(key)} title="Definir destino da importação">{activeTarget === key ? <Check className="h-4 w-4 text-primary" /> : <Upload className="h-4 w-4" />}</Button>}
      </div>
      <div className="max-h-[420px] min-h-[220px] space-y-1 overflow-y-auto p-2"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const payload = e.dataTransfer.getData("text/plain");
          if (!payload) return;
          const [from, id] = payload.split(":");
          if (key === "out" && (from === "a" || from === "b")) {
            const src = from === "a" ? a : b;
            const channel = src.find((c) => c.id === id);
            if (channel) setOut((old) => old.some((x) => x.url === channel.url) ? old : [...old, channel]);
          } else if ((key === "a" || key === "b") && (from === "a" || from === "b") && key !== from) {
            const src = from === "a" ? a : b;
            const channel = src.find((c) => c.id === id);
            if (channel) {
              (key === "a" ? setA : setB)((old) => old.some((x) => x.url === channel.url) ? old : [...old, channel]);
              (from === "a" ? setA : setB)((old) => old.filter((x) => x.id !== id));
            }
          }
        }}>
        {filtered(items).length === 0 ? <p className="p-5 text-center text-sm text-muted-foreground">{items.length ? "Nenhum resultado para a busca." : "Importe uma playlist para preencher este quadro."}</p> :
          filtered(items).map((channel) => (
            <div key={channel.id} draggable={key !== "out"} onDragStart={(e) => e.dataTransfer.setData("text/plain", `${key}:${channel.id}`)}
              className={`flex cursor-pointer items-start gap-2 rounded-lg border p-2 text-sm ${selected.includes(channel.id) ? "border-primary bg-primary/10" : "border-transparent hover:bg-muted"}`}
              onClick={() => toggle(channel.id, key)}>
              <input type="checkbox" checked={selected.includes(channel.id)} onChange={() => toggle(channel.id, key)} onClick={(e) => e.stopPropagation()} aria-label={`Selecionar ${channel.name}`} />
              <div className="min-w-0 flex-1"><p className="break-words font-medium">{channel.name}</p><p className="truncate text-xs text-muted-foreground">{channel.group || channel.url}</p></div>
            </div>
          ))}
      </div>
      <div className="flex flex-wrap gap-2 border-t border-border p-2">
        {key === "a" && <Button size="sm" variant="outline" disabled={!selected.length} onClick={() => moveBetweenSources("a")}><ArrowRight className="h-4 w-4" /> Mover para B</Button>}
        {key === "b" && <Button size="sm" variant="outline" disabled={!selected.length} onClick={() => moveBetweenSources("b")}><ArrowLeft className="h-4 w-4" /> Mover para A</Button>}
        {key !== "out" && <Button size="sm" disabled={!selected.length} onClick={() => addToOutput(key, false)}><Plus className="h-4 w-4" /> Copiar para exportação</Button>}
        {key === "out" && <Button size="sm" variant="destructive" disabled={!selected.length} onClick={() => {setOut(out.filter((c) => !selectedOut.includes(c.id)));setSelectedOut([]);}}><Trash2 className="h-4 w-4" /> Remover selecionados</Button>}
      </div>
    </section>
  );

  return (
    <div className="mt-8 space-y-4">
      <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4">
        <div><h2 className="text-lg font-bold">Editor de listas</h2><p className="text-sm text-muted-foreground">Duas listas para editar e um terceiro quadro exclusivo para exportação.</p></div>
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => fileRef.current?.click()}><FileUp className="h-4 w-4" /> Importar arquivo</Button>
          <Button variant="secondary" onClick={() => { setActiveTarget(activeTarget === "a" ? "b" : "a"); setNotice(`Próxima importação de arquivo será direcionada à Lista ${activeTarget === "a" ? "B" : "A"}.`); }}><ListPlus className="h-4 w-4" /> Destino: Lista {activeTarget.toUpperCase()}</Button>
          <Button variant="outline" onClick={() => exportList(out, "maxon-play.m3u")}><Download className="h-4 w-4" /> Exportar M3U</Button>
          <Button variant="outline" onClick={() => exportList(out, "maxon-play.m3u8")}><Download className="h-4 w-4" /> Exportar M3U8</Button>
          <Button variant="outline" onClick={() => { setA([]); setB([]); setOut([]); setSelectedA([]); setSelectedB([]); setSelectedOut([]); setNotice("Quadros limpos. Os arquivos originais não foram alterados."); }}><RefreshCw className="h-4 w-4" /> Limpar quadros</Button>
          <input ref={fileRef} type="file" accept=".m3u,.m3u8,audio/x-mpegurl,application/vnd.apple.mpegurl" className="hidden" onChange={(e) => { void importFile(e.target.files?.[0]); e.currentTarget.value = ""; }} />
        </div>
        <div className="grid gap-2 md:grid-cols-[1fr_auto]">
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar canais por nome ou grupo..." />
          <div className="flex gap-2">
            <Input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="URL direta M3U/M3U8" aria-label="URL de playlist" />
            <Button variant="outline" onClick={() => setNotice(url.trim() ? "Importação por URL precisa do endpoint seguro do servidor; não será feita diretamente no navegador." : "Cole uma URL de playlist.")}><Link2 className="h-4 w-4" /> URL</Button>
          </div>
        </div>
        <p role="status" className="text-sm text-muted-foreground">{notice}</p>
      </div>
      <div className="grid gap-4 xl:grid-cols-3">
        {renderList("Quadro 1 — Lista A", a, "a", selectedA)}
        {renderList("Quadro 2 — Lista B", b, "b", selectedB)}
        {renderList("Quadro 3 — Exportação", out, "out", selectedOut)}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border p-3 text-sm">
        <span className="text-muted-foreground">Lista A: {stats.a} · Lista B: {stats.b} · Exportação: {stats.out}</span>
        <Button onClick={() => exportList(out, "maxon-play-final.m3u")}><Download className="h-4 w-4" /> Baixar lista final</Button>
      </div>
      <p className="text-xs text-muted-foreground">A edição local não modifica as playlists originais. A importação por URL e o cadastro de servidores serão conectados ao backend numa etapa própria.</p>
    </div>
  );
}
