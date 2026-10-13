import { o as __toESM } from "../_runtime.mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { a as Td, c as useAction, l as useAdminQuery, n as Field, r as PageHeader, t as DataTable } from "./admin-ui-C_f-BTaD.mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { P as savePlaylist, S as listPlaylists, T as listSources, p as getPlaylistEditor, s as deletePlaylist } from "./admin.functions-CgwOPZ9w.mjs";
import { t as Button } from "./button-CTmx8QDF.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { S as Layers, a as Trash2, c as Sparkles, g as Plus, u as ShieldCheck } from "../_libs/lucide-react.mjs";
import { i as DialogTitle, n as DialogContent, r as DialogHeader, t as Dialog } from "./dialog-B69u1cPq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.editor-listas-CvoreYsg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function EditorListas() {
	const list = useServerFn(listPlaylists), sourcesFn = useServerFn(listSources), get = useServerFn(getPlaylistEditor);
	const save = useServerFn(savePlaylist), del = useServerFn(deletePlaylist), act = useAction();
	const { data = [] } = useAdminQuery("playlists", () => list());
	const { data: sources = [] } = useAdminQuery("sources", () => sourcesFn());
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [selected, setSelected] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const openEdit = async (p) => {
		setLoading(true);
		try {
			const r = await get({ data: { id: p.id } });
			setSelected(r.selected.filter((x) => x.active).map((x) => x.source_id));
			setEditing(p);
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Editor de Listas",
			desc: "Monte sua programação MAXON PLAY usando fontes M3U e Xtream autorizadas, sem expor credenciais.",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "hero",
				onClick: () => {
					setSelected([]);
					setEditing("new");
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), "Nova lista"]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6 grid gap-3 md:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, {}),
					title: "1. Fontes",
					text: "Cadastre M3U ou Xtream em Fontes / Listas."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {}),
					title: "2. Organize",
					text: "Combine fontes e defina a ordem de preferência."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {}),
					title: "3. Publique",
					text: "A configuração permanece protegida no painel."
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
			head: [
				"Lista",
				"Fontes combinadas",
				"Quantidade",
				"Status",
				""
			],
			empty: data.length === 0,
			children: data.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Td, {
					className: "font-medium",
					children: [p.name, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "max-w-xs truncate text-xs text-muted-foreground",
						children: p.description
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, {
					className: "max-w-md truncate text-muted-foreground",
					children: p.source_names || "Nenhuma fonte"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: p.sources }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: p.active ? "Ativa" : "Inativa" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "secondary",
						disabled: loading,
						onClick: () => void openEdit(p),
						children: "Organizar"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "destructive",
						onClick: () => {
							if (confirm(`Remover "${p.name}"?`)) act(del({ data: { id: p.id } }), "Lista removida.", ["playlists"]);
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" }), "Remover"]
					})]
				}) })
			] }, p.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: !!editing,
			onOpenChange: (o) => !o && setEditing(null),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
				className: "max-h-[90vh] overflow-y-auto",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: editing === "new" ? "Criar lista MAXON PLAY" : "Organizar lista" }) }), editing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaylistForm, {
					initial: editing === "new" ? null : editing,
					sources,
					selected,
					onSave: async (d) => {
						await act(save({ data: d }), "Lista salva e organizada.", ["playlists"]);
						setEditing(null);
					}
				})]
			})
		})
	] });
}
function Info({ icon, title, text }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-border bg-card p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-2 flex items-center gap-2 font-semibold text-primary",
			children: [icon, title]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: text
		})]
	});
}
function PlaylistForm({ initial, sources, selected, onSave }) {
	const [name, setName] = (0, import_react.useState)(initial?.name ?? "MAXON PLAY");
	const [description, setDescription] = (0, import_react.useState)(initial?.description ?? "");
	const [active, setActive] = (0, import_react.useState)(initial?.active ?? true);
	const [ids, setIds] = (0, import_react.useState)(selected);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const toggle = (id) => setIds((v) => v.includes(id) ? v.filter((x) => x !== id) : [...v, id]);
	const move = (id, dir) => setIds((v) => {
		const i = v.indexOf(id), j = i + dir;
		if (i < 0 || j < 0 || j >= v.length) return v;
		const n = [...v];
		[n[i], n[j]] = [n[j], n[i]];
		return n;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "space-y-4",
		onSubmit: async (e) => {
			e.preventDefault();
			setBusy(true);
			try {
				await onSave({
					...initial ? { id: initial.id } : {},
					name,
					description,
					active,
					source_ids: ids
				});
			} finally {
				setBusy(false);
			}
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Nome da lista",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: name,
					onChange: (e) => setName(e.target.value),
					required: true
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Descrição",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: description,
					onChange: (e) => setDescription(e.target.value),
					placeholder: "Ex: Lista principal MAXON PLAY"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex items-center gap-2 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "checkbox",
					checked: active,
					onChange: (e) => setActive(e.target.checked)
				}), " Lista ativa"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-2 text-sm font-medium",
				children: "Fontes disponíveis"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2 rounded-xl border border-border p-2",
				children: [sources.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "p-3 text-sm text-muted-foreground",
					children: "Cadastre primeiro uma fonte M3U ou Xtream."
				}), sources.map((s) => {
					const checked = ids.includes(s.id), pos = ids.indexOf(s.id);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 rounded-lg bg-secondary/40 p-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked,
								onChange: () => toggle(s.id)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate font-medium",
									children: s.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "truncate text-xs text-muted-foreground",
									children: [
										s.type.toUpperCase(),
										" · ",
										s.display_hint
									]
								})]
							}),
							checked && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs text-muted-foreground",
									children: ["#", pos + 1]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									size: "sm",
									variant: "secondary",
									disabled: pos === 0,
									onClick: () => move(s.id, -1),
									children: "↑"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									size: "sm",
									variant: "secondary",
									disabled: pos === ids.length - 1,
									onClick: () => move(s.id, 1),
									children: "↓"
								})
							] })
						]
					}, s.id);
				})]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "w-full",
				variant: "hero",
				type: "submit",
				disabled: busy,
				children: busy ? "Salvando…" : "Salvar e organizar lista"
			})
		]
	});
}
//#endregion
export { EditorListas as component };
