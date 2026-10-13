import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { C as listPlaylistCatalog, D as listSources, I as savePlaylist, L as savePlaylistItemRule, g as importSourceCatalog, p as getPlaylistEditor, s as deletePlaylist, w as listPlaylists } from "./admin.functions-Cms7KLgc.mjs";
import { t as Button } from "./button-CTmx8QDF.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { a as Td, c as useAction, l as useAdminQuery, n as Field, r as PageHeader, t as DataTable } from "./admin-ui-C_f-BTaD.mjs";
import { E as Film, O as Clapperboard, S as Layers, a as Trash2, c as Sparkles, g as Plus, h as RefreshCw, i as Tv, p as Search, u as ShieldCheck } from "../_libs/lucide-react.mjs";
import { i as DialogTitle, n as DialogContent, r as DialogHeader, t as Dialog } from "./dialog-B69u1cPq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.editor-listas-ClELEQYV.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function EditorListas() {
	const list = useServerFn(listPlaylists), sourcesFn = useServerFn(listSources), get = useServerFn(getPlaylistEditor), save = useServerFn(savePlaylist), del = useServerFn(deletePlaylist), catalogFn = useServerFn(listPlaylistCatalog), importFn = useServerFn(importSourceCatalog), ruleFn = useServerFn(savePlaylistItemRule), act = useAction();
	const { data = [] } = useAdminQuery("playlists", () => list());
	const { data: sources = [] } = useAdminQuery("sources", () => sourcesFn());
	const [editing, setEditing] = (0, import_react.useState)(null), [selected, setSelected] = (0, import_react.useState)([]), [catalogFor, setCatalogFor] = (0, import_react.useState)(null), [items, setItems] = (0, import_react.useState)([]), [busy, setBusy] = (0, import_react.useState)(false), [q, setQ] = (0, import_react.useState)(""), [kind, setKind] = (0, import_react.useState)("all");
	const openEdit = async (p) => {
		setBusy(true);
		try {
			const r = await get({ data: { id: p.id } });
			setSelected(r.selected.filter((x) => x.active).map((x) => x.source_id));
			setEditing(p);
		} finally {
			setBusy(false);
		}
	};
	const openCatalog = async (p) => {
		setBusy(true);
		try {
			const x = await catalogFn({ data: { playlist_id: p.id } });
			setItems(x);
			setCatalogFor(p);
		} finally {
			setBusy(false);
		}
	};
	const filtered = (0, import_react.useMemo)(() => items.filter((x) => (kind === "all" || x.kind === kind) && (!q || `${x.name} ${x.category} ${x.source_name}`.toLowerCase().includes(q.toLowerCase()))), [
		items,
		q,
		kind
	]);
	const counts = {
		live: items.filter((x) => x.kind === "live").length,
		movie: items.filter((x) => x.kind === "movie").length,
		series: items.filter((x) => x.kind === "series").length
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Editor de Listas",
			desc: "Sua programação MAXON PLAY: importe catálogos autorizados, pesquise e escolha o que entra.",
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
					title: "1. Fontes do fornecedor",
					text: "M3U e Xtream ficam protegidos e separados da sua lista."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {}),
					title: "2. Minha lista MAXON PLAY",
					text: "Combine fontes e abra o catálogo para organizar o conteúdo."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {}),
					title: "3. Controle",
					text: "Pesquise, filtre e ative ou oculte itens sem expor credenciais."
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
			head: [
				"Minha lista",
				"Fontes do fornecedor",
				"Qtd.",
				"Status",
				""
			],
			empty: !data.length,
			children: data.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Td, {
					className: "font-medium",
					children: [p.name, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-muted-foreground",
						children: p.description
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, {
					className: "max-w-md truncate text-muted-foreground",
					children: p.source_names || "Nenhuma"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: p.sources }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: p.active ? "Ativa" : "Inativa" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "secondary",
							disabled: busy,
							onClick: () => void openCatalog(p),
							children: "Abrir catálogo"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "secondary",
							onClick: () => void openEdit(p),
							children: "Fontes"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "destructive",
							onClick: () => {
								if (confirm(`Remover "${p.name}"?`)) act(del({ data: { id: p.id } }), "Lista removida.", ["playlists"]);
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
						})
					]
				}) })
			] }, p.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: !!editing,
			onOpenChange: (o) => !o && setEditing(null),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
				className: "max-h-[90vh] overflow-y-auto",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: editing === "new" ? "Criar lista MAXON PLAY" : "Fontes da lista" }) }), editing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaylistForm, {
					initial: editing === "new" ? null : editing,
					sources,
					selected,
					onSave: async (d) => {
						await act(save({ data: d }), "Lista salva.", ["playlists"]);
						setEditing(null);
					}
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: !!catalogFor,
			onOpenChange: (o) => !o && setCatalogFor(null),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
				className: "max-h-[92vh] max-w-5xl overflow-y-auto",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, { children: ["Catálogo — ", catalogFor?.name] }) }), catalogFor && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-2",
							children: sources.filter((s) => catalogFor.source_names.includes(s.name)).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "secondary",
								disabled: busy,
								onClick: async () => {
									setBusy(true);
									try {
										if (await act(importFn({ data: { source_id: s.id } }), `Catálogo importado.`, [])) {
											const x = await catalogFn({ data: { playlist_id: catalogFor.id } });
											setItems(x);
										}
									} finally {
										setBusy(false);
									}
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {}),
									"Importar ",
									s.name
								]
							}, s.id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-2 md:grid-cols-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tv, {}),
									label: "TV ao vivo",
									n: counts.live
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Film, {}),
									label: "Filmes",
									n: counts.movie
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clapperboard, {}),
									label: "Séries",
									n: counts.series
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, {}),
									label: "Total",
									n: items.length
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative min-w-64 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									className: "pl-9",
									value: q,
									onChange: (e) => setQ(e.target.value),
									placeholder: "Buscar canal, filme, série ou categoria..."
								})]
							}), [
								"all",
								"live",
								"movie",
								"series"
							].map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: kind === k ? "hero" : "secondary",
								onClick: () => setKind(k),
								children: k === "all" ? "Tudo" : k === "live" ? "TV" : k === "movie" ? "Filmes" : "Séries"
							}, k))]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-xl border border-border",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "max-h-[48vh] overflow-y-auto divide-y divide-border",
								children: [!filtered.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "p-6 text-center text-muted-foreground",
									children: "Importe uma fonte acima ou ajuste a busca."
								}), filtered.slice(0, 2e3).map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3 p-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										checked: x.enabled,
										onChange: async (e) => {
											const enabled = e.target.checked;
											setItems((v) => v.map((i) => i.id === x.id ? {
												...i,
												enabled
											} : i));
											await ruleFn({ data: {
												playlist_id: catalogFor.id,
												item_id: x.id,
												enabled
											} });
										}
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0 flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: x.enabled ? "font-medium" : "font-medium text-muted-foreground line-through",
											children: x.custom_name || x.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "truncate text-xs text-muted-foreground",
											children: [
												x.kind === "live" ? "TV" : x.kind === "movie" ? "Filme" : "Série",
												" · ",
												x.custom_category || x.category,
												" · ",
												x.source_name
											]
										})]
									})]
								}, x.id))]
							})
						}),
						filtered.length > 2e3 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Mostrando 2.000 resultados. Use a busca para refinar."
						})
					]
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
function Stat({ icon, label, n }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-border bg-secondary/30 p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 text-sm text-muted-foreground",
			children: [icon, label]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-2xl font-bold",
			children: n
		})]
	});
}
function PlaylistForm({ initial, sources, selected, onSave }) {
	const [name, setName] = (0, import_react.useState)(initial?.name ?? "MAXON PLAY"), [description, setDescription] = (0, import_react.useState)(initial?.description ?? ""), [active, setActive] = (0, import_react.useState)(initial?.active ?? true), [ids, setIds] = (0, import_react.useState)(selected), [busy, setBusy] = (0, import_react.useState)(false);
	const toggle = (id) => setIds((v) => v.includes(id) ? v.filter((x) => x !== id) : [...v, id]);
	const move = (id, d) => setIds((v) => {
		const i = v.indexOf(id), j = i + d;
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
				label: "Nome da sua lista",
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
					onChange: (e) => setDescription(e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex gap-2 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "checkbox",
					checked: active,
					onChange: (e) => setActive(e.target.checked)
				}), "Ativa"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-2",
				children: sources.map((s) => {
					const c = ids.includes(s.id), p = ids.indexOf(s.id);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 rounded-lg bg-secondary/40 p-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: c,
								onChange: () => toggle(s.id)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium",
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
							c && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs",
									children: ["#", p + 1]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									size: "sm",
									variant: "secondary",
									onClick: () => move(s.id, -1),
									children: "↑"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									size: "sm",
									variant: "secondary",
									onClick: () => move(s.id, 1),
									children: "↓"
								})
							] })
						]
					}, s.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "w-full",
				variant: "hero",
				disabled: busy,
				children: busy ? "Salvando…" : "Salvar lista"
			})
		]
	});
}
//#endregion
export { EditorListas as component };
