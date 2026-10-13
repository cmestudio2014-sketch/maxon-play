import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Layers3, Plus, ShieldCheck, Sparkles, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { DataTable, Field, PageHeader, Td, useAction, useAdminQuery } from "@/components/admin-ui";
import { deletePlaylist, getPlaylistEditor, listPlaylists, listSources, savePlaylist, type Playlist, type Source } from "@/lib/admin.functions";

export const Route = createFileRoute("/admin/editor-listas")({ component: EditorListas });

function EditorListas() {
  const list=useServerFn(listPlaylists), sourcesFn=useServerFn(listSources), get=useServerFn(getPlaylistEditor);
  const save=useServerFn(savePlaylist), del=useServerFn(deletePlaylist), act=useAction();
  const {data=[]}=useAdminQuery("playlists",()=>list());
  const {data:sources=[]}=useAdminQuery("sources",()=>sourcesFn());
  const [editing,setEditing]=useState<Playlist|"new"|null>(null);
  const [selected,setSelected]=useState<string[]>([]);
  const [loading,setLoading]=useState(false);

  const openEdit=async(p:Playlist)=>{
    setLoading(true);
    try { const r=await get({data:{id:p.id}}); setSelected(r.selected.filter(x=>x.active).map(x=>x.source_id)); setEditing(p); }
    finally { setLoading(false); }
  };
  return <>
    <PageHeader title="Editor de Listas" desc="Monte sua programação MAXON PLAY usando fontes M3U e Xtream autorizadas, sem expor credenciais."
      action={<Button variant="hero" onClick={()=>{setSelected([]);setEditing("new")}}><Plus/>Nova lista</Button>}/>
    <div className="mb-6 grid gap-3 md:grid-cols-3">
      <Info icon={<Layers3/>} title="1. Fontes" text="Cadastre M3U ou Xtream em Fontes / Listas."/>
      <Info icon={<Sparkles/>} title="2. Organize" text="Combine fontes e defina a ordem de preferência."/>
      <Info icon={<ShieldCheck/>} title="3. Publique" text="A configuração permanece protegida no painel."/>
    </div>
    <DataTable head={["Lista","Fontes combinadas","Quantidade","Status",""]} empty={data.length===0}>
      {data.map(p=><tr key={p.id}>
        <Td className="font-medium">{p.name}<div className="max-w-xs truncate text-xs text-muted-foreground">{p.description}</div></Td>
        <Td className="max-w-md truncate text-muted-foreground">{p.source_names||"Nenhuma fonte"}</Td>
        <Td>{p.sources}</Td><Td>{p.active?"Ativa":"Inativa"}</Td>
        <Td><div className="flex gap-2">
          <Button size="sm" variant="secondary" disabled={loading} onClick={()=>void openEdit(p)}>Organizar</Button>
          <Button size="sm" variant="destructive" onClick={()=>{if(confirm(`Remover "${p.name}"?`)) void act(del({data:{id:p.id}}),"Lista removida.",["playlists"])}}><Trash2 className="h-4 w-4"/>Remover</Button>
        </div></Td>
      </tr>)}
    </DataTable>
    <Dialog open={!!editing} onOpenChange={o=>!o&&setEditing(null)}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader><DialogTitle>{editing==="new"?"Criar lista MAXON PLAY":"Organizar lista"}</DialogTitle></DialogHeader>
        {editing&&<PlaylistForm initial={editing==="new"?null:editing} sources={sources} selected={selected} onSave={async d=>{
          await act(save({data:d}),"Lista salva e organizada.",["playlists"]); setEditing(null);
        }}/>}
      </DialogContent>
    </Dialog>
  </>;
}
function Info({icon,title,text}:{icon:React.ReactNode;title:string;text:string}) {
  return <div className="rounded-2xl border border-border bg-card p-4"><div className="mb-2 flex items-center gap-2 font-semibold text-primary">{icon}{title}</div><p className="text-sm text-muted-foreground">{text}</p></div>;
}
function PlaylistForm({initial,sources,selected,onSave}:{initial:Playlist|null;sources:Source[];selected:string[];onSave:(d:{id?:string;name:string;description:string;active:boolean;source_ids:string[]})=>Promise<void>}) {
  const [name,setName]=useState(initial?.name??"MAXON PLAY");
  const [description,setDescription]=useState(initial?.description??"");
  const [active,setActive]=useState(initial?.active??true);
  const [ids,setIds]=useState(selected);
  const [busy,setBusy]=useState(false);
  const toggle=(id:string)=>setIds(v=>v.includes(id)?v.filter(x=>x!==id):[...v,id]);
  const move=(id:string,dir:-1|1)=>setIds(v=>{const i=v.indexOf(id),j=i+dir;if(i<0||j<0||j>=v.length)return v;const n=[...v];[n[i],n[j]]=[n[j],n[i]];return n});
  return <form className="space-y-4" onSubmit={async e=>{e.preventDefault();setBusy(true);try{await onSave({...initial?{id:initial.id}:{},name,description,active,source_ids:ids})}finally{setBusy(false)}}}>
    <Field label="Nome da lista"><Input value={name} onChange={e=>setName(e.target.value)} required/></Field>
    <Field label="Descrição"><Input value={description} onChange={e=>setDescription(e.target.value)} placeholder="Ex: Lista principal MAXON PLAY"/></Field>
    <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={active} onChange={e=>setActive(e.target.checked)}/> Lista ativa</label>
    <div><p className="mb-2 text-sm font-medium">Fontes disponíveis</p>
      <div className="space-y-2 rounded-xl border border-border p-2">
        {sources.length===0&&<p className="p-3 text-sm text-muted-foreground">Cadastre primeiro uma fonte M3U ou Xtream.</p>}
        {sources.map(s=>{const checked=ids.includes(s.id),pos=ids.indexOf(s.id);return <div key={s.id} className="flex items-center gap-3 rounded-lg bg-secondary/40 p-3">
          <input type="checkbox" checked={checked} onChange={()=>toggle(s.id)}/>
          <div className="min-w-0 flex-1"><p className="truncate font-medium">{s.name}</p><p className="truncate text-xs text-muted-foreground">{s.type.toUpperCase()} · {s.display_hint}</p></div>
          {checked&&<><span className="text-xs text-muted-foreground">#{pos+1}</span><Button type="button" size="sm" variant="secondary" disabled={pos===0} onClick={()=>move(s.id,-1)}>↑</Button><Button type="button" size="sm" variant="secondary" disabled={pos===ids.length-1} onClick={()=>move(s.id,1)}>↓</Button></>}
        </div>})}
      </div>
    </div>
    <Button className="w-full" variant="hero" type="submit" disabled={busy}>{busy?"Salvando…":"Salvar e organizar lista"}</Button>
  </form>;
}
