import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, selectCls, useAction } from "@/components/admin-ui";
import { saveSource, uploadM3uSource, type Source } from "@/lib/admin.functions";

type F = {
  name: string;
  type: "m3u" | "xtream";
  m3u_url: string;
  epg_url: string;
  server: string;
  username: string;
  password: string;
};

/** Cadastro/edição de fonte autorizada. Dados salvos nunca voltam ao navegador — em branco = manter. */
export function SourceForm({
  source,
  customerId,
  customers,
  onSaved,
  onCancel,
}: {
  source?: Source;
  customerId?: string | null;
  customers?: { id: string; name: string }[];
  onSaved: (id: string) => void;
  onCancel?: () => void;
}) {
  const save = useServerFn(saveSource);
  const upload = useServerFn(uploadM3uSource);
  const act = useAction();
  const editing = !!source;
  const [cust, setCust] = useState<string | null>(source?.customer_id ?? customerId ?? null);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [mode, setMode] = useState<"url" | "file">("url");
  const [f, setF] = useState<F>({
    name: source?.name ?? "",
    type: source?.type ?? "m3u",
    m3u_url: "",
    epg_url: "",
    server: "",
    username: "",
    password: "",
  });
  const keep = editing ? "Deixe em branco para manter o valor salvo" : undefined;
  const submit = async () => {
    if (!editing && f.type === "m3u" && mode === "file") {
      if (!uploadFile) return;
      if (uploadFile.size > 8_000_000) { alert("Arquivo maior que 8 MB."); return; }
      const content = await uploadFile.text();
      const r = await act(upload({ data: { name:f.name, customer_id:cust, filename:uploadFile.name, content } }), "Arquivo M3U importado.", ["sources"]);
      if (r) onSaved(r.id);
      return;
    }
    const r = await act(
      save({ data: { ...(source ? { id: source.id } : {}), ...f, customer_id: cust } }),
      "Fonte salva (criptografada).",
      ["sources", "activations", "devices"],
    );
    if (r) onSaved(r.id);
  };
  return (
    <div className="space-y-3">
      <p className="rounded-lg bg-accent p-3 text-xs text-accent-foreground">
        Use apenas listas/credenciais autorizadas fornecidas pelo cliente ou provedor licenciado.
      </p>
      <Field label="Nome interno">
        <Input
          value={f.name}
          onChange={(e) => setF({ ...f, name: e.target.value })}
          placeholder="Ex: Lista do cliente Ana"
        />
      </Field>
      {customers && (
        <Field label="Cliente (opcional)">
          <select
            className={selectCls}
            value={cust ?? ""}
            onChange={(e) => setCust(e.target.value || null)}
          >
            <option value="">— nenhum —</option>
            {customers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </Field>
      )}
      <Field label="Tipo">
        <select
          className={selectCls}
          value={f.type}
          onChange={(e) => setF({ ...f, type: e.target.value as F["type"] })}
        >
          <option value="m3u">URL M3U autorizada</option>
          <option value="xtream">Xtream Codes</option>
        </select>
      </Field>
      {f.type === "m3u" ? (
        <>
          {!editing && <div className="grid grid-cols-2 gap-2">
            <Button type="button" variant={mode==="url"?"hero":"secondary"} onClick={()=>setMode("url")}>URL M3U</Button>
            <Button type="button" variant={mode==="file"?"hero":"secondary"} onClick={()=>setMode("file")}>Enviar arquivo M3U</Button>
          </div>}
          {mode==="file" && !editing ? <Field label="Arquivo .m3u / .m3u8" hint="Máximo 8 MB. O painel importa os itens e protege as URLs.">
            <Input type="file" accept=".m3u,.m3u8,audio/x-mpegurl,application/vnd.apple.mpegurl" onChange={(e)=>setUploadFile(e.target.files?.[0]??null)} />
          </Field> : <>
          <Field label="URL M3U" {...(keep ? { hint: keep } : {})}>
            <Input
              type="url"
              value={f.m3u_url}
              onChange={(e) => setF({ ...f, m3u_url: e.target.value })}
              placeholder="https://provedor-autorizado/lista.m3u"
              autoComplete="off"
            />
          </Field>
          <Field label="URL EPG (opcional)">
            <Input
              type="url"
              value={f.epg_url}
              onChange={(e) => setF({ ...f, epg_url: e.target.value })}
              autoComplete="off"
            />
          </Field>
          </>}
        </>
      ) : (
        <>
          <Field label="Servidor" {...(keep ? { hint: keep } : {})}>
            <Input
              type="url"
              value={f.server}
              onChange={(e) => setF({ ...f, server: e.target.value })}
              placeholder="https://servidor-autorizado:porta"
              autoComplete="off"
            />
          </Field>
          <Field label="Usuário" {...(keep ? { hint: keep } : {})}>
            <Input
              value={f.username}
              onChange={(e) => setF({ ...f, username: e.target.value })}
              autoComplete="off"
            />
          </Field>
          <Field label="Senha" {...(keep ? { hint: keep } : {})}>
            <Input
              type="password"
              value={f.password}
              onChange={(e) => setF({ ...f, password: e.target.value })}
              autoComplete="new-password"
            />
          </Field>
        </>
      )}
      <div className="flex gap-2">
        <Button
          variant="hero"
          className="flex-1"
          disabled={f.name.trim().length < 2 || (!editing && f.type==="m3u" && mode==="file" && !uploadFile)}
          onClick={submit}
        >
          {!editing && f.type==="m3u" && mode==="file" ? "Importar arquivo M3U" : "Salvar fonte"}
        </Button>
        {onCancel && (
          <Button variant="secondary" onClick={onCancel}>
            Cancelar
          </Button>
        )}
      </div>
    </div>
  );
}