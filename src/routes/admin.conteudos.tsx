import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Plus, Pencil, Trash2, Film, Tv, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DataTable, PageHeader, Td, useAction, useAdminQuery } from "@/components/admin-ui";
import {
  deleteCatalogContent,
  listCatalogContent,
  saveCatalogContent,
  type CatalogContent,
} from "@/lib/admin.functions";

export const Route = createFileRoute("/admin/conteudos")({ component: Conteudos });

const categories = [
  { value: "ao_vivo", label: "Ao Vivo" },
  { value: "futebol", label: "Futebol" },
  { value: "infantil", label: "Infantil" },
  { value: "filmes", label: "Filmes" },
  { value: "series", label: "Séries" },
] as const;

function categoryLabel(value: string) {
  return categories.find((c) => c.value === value)?.label ?? value;
}

function Conteudos() {
  const list = useServerFn(listCatalogContent);
  const remove = useServerFn(deleteCatalogContent);
  const act = useAction();
  const { data = [] } = useAdminQuery("catalog-contents", () => list());
  const [category, setCategory] = useState("todos");
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<CatalogContent | "new" | null>(null);
  const filtered = data.filter((item) =>
    (category === "todos" || item.category === category) &&
    (item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <>
      <PageHeader
        title="Conteúdos"
        desc="Adicione, organize, edite e remova conteúdos autorizados por categoria."
        action={
          <Button variant="hero" onClick={() => setEditing("new")}>
            <Plus className="mr-2 h-4 w-4" /> Adicionar conteúdo
          </Button>
        }
      />
      <div className="mb-5 rounded-xl border border-border bg-card p-4 text-sm text-muted-foreground">
        Cadastre canais e links de reprodução que você tem autorização para distribuir. A organização
        do catálogo fica separada das credenciais das Fontes / Listas.
      </div>
      <div className="mb-4 flex flex-wrap gap-2">
        <Button size="sm" variant={category === "todos" ? "default" : "outline"} onClick={() => setCategory("todos")}>
          Todos ({data.length})
        </Button>
        {categories.map((c) => (
          <Button key={c.value} size="sm" variant={category === c.value ? "default" : "outline"} onClick={() => setCategory(c.value)}>
            {c.label} ({data.filter((item) => item.category === c.value).length})
          </Button>
        ))}
      </div>
      <div className="mb-4 max-w-md relative">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input className="pl-9" placeholder="Buscar conteúdo..." value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      <DataTable head={["Conteúdo", "Categoria", "Link de reprodução", "Status", "Ações"]} empty={filtered.length === 0}>
        {filtered.map((item) => (
          <tr key={item.id}>
            <Td>
              <div className="flex items-center gap-3">
                {item.logo_url ? (
                  <img src={item.logo_url} alt="" className="h-10 w-14 rounded-md object-contain bg-muted" loading="lazy" />
                ) : (
                  <div className="grid h-10 w-14 place-items-center rounded-md bg-muted text-muted-foreground">
                    {item.category === "ao_vivo" || item.category === "futebol" ? <Tv className="h-5 w-5" /> : <Film className="h-5 w-5" />}
                  </div>
                )}
                <div>
                  <div className="font-medium">{item.title}</div>
                  {item.description && <div className="max-w-xs truncate text-xs text-muted-foreground">{item.description}</div>}
                </div>
              </div>
            </Td>
            <Td>{categoryLabel(item.category)}</Td>
            <Td><a className="block max-w-[240px] truncate text-primary underline-offset-4 hover:underline" href={item.content_url} target="_blank" rel="noreferrer">{item.content_url}</a></Td>
            <Td><span className={item.enabled ? "text-success" : "text-muted-foreground"}>{item.enabled ? "Ativo" : "Desativado"}</span></Td>
            <Td>
              <div className="flex gap-2">
                <Button size="sm" variant="secondary" onClick={() => setEditing(item)}><Pencil className="mr-1 h-3.5 w-3.5" />Editar</Button>
                <Button size="sm" variant="destructive" onClick={() => {
                  if (confirm(`Excluir "${item.title}"? Esta ação não pode ser desfeita.`)) {
                    void act(remove({ data: { id: item.id } }), "Conteúdo removido.", ["catalog-contents"]);
                  }
                }}><Trash2 className="mr-1 h-3.5 w-3.5" />Excluir</Button>
              </div>
            </Td>
          </tr>
        ))}
      </DataTable>
      <Dialog open={!!editing} onOpenChange={(open) => !open && setEditing(null)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>{editing === "new" ? "Adicionar conteúdo" : "Editar conteúdo"}</DialogTitle>
          </DialogHeader>
          {editing && <ContentForm key={editing === "new" ? "new" : editing.id} item={editing === "new" ? null : editing} onSaved={() => setEditing(null)} />}
        </DialogContent>
      </Dialog>
    </>
  );
}

function ContentForm({ item, onSaved }: { item: CatalogContent | null; onSaved: () => void }) {
  const save = useServerFn(saveCatalogContent);
  const act = useAction();
  const [title, setTitle] = useState(item?.title ?? "");
  const [category, setCategory] = useState(item?.category ?? "ao_vivo");
  const [contentUrl, setContentUrl] = useState(item?.content_url ?? "");
  const [logoUrl, setLogoUrl] = useState(item?.logo_url ?? "");
  const [description, setDescription] = useState(item?.description ?? "");
  const [enabled, setEnabled] = useState(item?.enabled ?? true);
  const [sortOrder, setSortOrder] = useState(String(item?.sort_order ?? 0));

  return (
    <form className="space-y-4" onSubmit={(e) => {
      e.preventDefault();
      void act(save({ data: {
        ...(item ? { id: item.id } : {}),
        title,
        category: category as CatalogContent["category"],
        content_url: contentUrl,
        logo_url: logoUrl,
        description,
        enabled,
        sort_order: Number(sortOrder) || 0,
      }}), item ? "Conteúdo atualizado." : "Conteúdo adicionado.", ["catalog-contents"], onSaved);
    }}>
      <div>
        <label className="mb-1 block text-sm font-medium">Nome do conteúdo *</label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} maxLength={120} required placeholder="Ex.: Canal de notícias" />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Categoria *</label>
        <select className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm" value={category} onChange={(e) => setCategory(e.target.value)} required>
          {categories.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
        </select>
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">URL de reprodução *</label>
        <Input type="url" value={contentUrl} onChange={(e) => setContentUrl(e.target.value)} maxLength={1000} required placeholder="https://..." />
        <p className="mt-1 text-xs text-muted-foreground">Use um endereço HTTP/HTTPS válido de conteúdo autorizado.</p>
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">URL do logo ou capa (opcional)</label>
        <Input type="url" value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} maxLength={500} placeholder="https://..." />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Descrição (opcional)</label>
        <Textarea value={description} onChange={(e) => setDescription(e.target.value)} maxLength={500} rows={3} placeholder="Descrição breve" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1 block text-sm font-medium">Ordem de exibição</label>
          <Input type="number" min={0} max={99999} value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} />
        </div>
        <label className="flex items-center gap-2 pt-7 text-sm">
          <input type="checkbox" checked={enabled} onChange={(e) => setEnabled(e.target.checked)} />
          Conteúdo ativo
        </label>
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onSaved}>Cancelar</Button>
        <Button type="submit" variant="hero">{item ? "Salvar alterações" : "Adicionar conteúdo"}</Button>
      </div>
    </form>
  );
}
