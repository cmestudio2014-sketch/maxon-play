import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { C as regenerateKey, _ as listPlans, a as createActivation, c as forceSync, f as listActivations, h as listCustomers, i as changeActivationDevice, j as setActivationBlocked, r as assignSource, w as renewActivation, y as listSources } from "./admin.functions-DZ71ovy-.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as Button } from "./button-CTmx8QDF.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as Td, c as useAction, i as StatusBadge, l as useAdminQuery, n as Field, r as PageHeader, s as selectCls, t as DataTable } from "./admin-ui-C_f-BTaD.mjs";
import { a as fmtDate } from "./brand-DsXviQDH.mjs";
import { C as Copy, E as ChevronRight, O as Check, T as Circle, p as Plus } from "../_libs/lucide-react.mjs";
import { a as Label2, c as Root2, d as SubTrigger2, f as Trigger, i as ItemIndicator2, l as Separator2, n as Content2, o as Portal2, r as Item2, s as RadioItem2, t as CheckboxItem2, u as SubContent2 } from "../_libs/@radix-ui/react-dropdown-menu+[...].mjs";
import { t as Switch } from "./switch-Cn1w-cIH.mjs";
import { i as DialogTitle, n as DialogContent, r as DialogHeader, t as Dialog } from "./dialog-B69u1cPq.mjs";
import { t as SourceForm } from "./source-form-CZO8BkeQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.ativacoes-BLQNNRcR.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var DropdownMenu = Root2;
var DropdownMenuTrigger = Trigger;
var DropdownMenuSubTrigger = import_react.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SubTrigger2, {
	ref,
	className: cn("flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", inset && "pl-8", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "ml-auto" })]
}));
DropdownMenuSubTrigger.displayName = SubTrigger2.displayName;
var DropdownMenuSubContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubContent2, {
	ref,
	className: cn("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)", className),
	...props
}));
DropdownMenuSubContent.displayName = SubContent2.displayName;
var DropdownMenuContent = import_react.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	sideOffset,
	className: cn("z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md", "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)", className),
	...props
}) }));
DropdownMenuContent.displayName = Content2.displayName;
var DropdownMenuItem = import_react.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item2, {
	ref,
	className: cn("relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0", inset && "pl-8", className),
	...props
}));
DropdownMenuItem.displayName = Item2.displayName;
var DropdownMenuCheckboxItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CheckboxItem2, {
	ref,
	className: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemIndicator2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }) })
	}), children]
}));
DropdownMenuCheckboxItem.displayName = CheckboxItem2.displayName;
var DropdownMenuRadioItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RadioItem2, {
	ref,
	className: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemIndicator2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, { className: "h-2 w-2 fill-current" }) })
	}), children]
}));
DropdownMenuRadioItem.displayName = RadioItem2.displayName;
var DropdownMenuLabel = import_react.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label2, {
	ref,
	className: cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className),
	...props
}));
DropdownMenuLabel.displayName = Label2.displayName;
var DropdownMenuSeparator = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator2, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-muted", className),
	...props
}));
DropdownMenuSeparator.displayName = Separator2.displayName;
var DropdownMenuShortcut = ({ className, ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("ml-auto text-xs tracking-widest opacity-60", className),
		...props
	});
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";
function Ativacoes() {
	const fns = {
		list: useServerFn(listActivations),
		customers: useServerFn(listCustomers),
		plans: useServerFn(listPlans),
		sources: useServerFn(listSources),
		create: useServerFn(createActivation),
		renew: useServerFn(renewActivation),
		block: useServerFn(setActivationBlocked),
		change: useServerFn(changeActivationDevice),
		regen: useServerFn(regenerateKey),
		assign: useServerFn(assignSource),
		sync: useServerFn(forceSync)
	};
	const act = useAction();
	const { data = [] } = useAdminQuery("activations", () => fns.list());
	const { data: customers = [] } = useAdminQuery("customers", () => fns.customers());
	const { data: plans = [] } = useAdminQuery("plans", () => fns.plans());
	const { data: sources = [] } = useAdminQuery("sources", () => fns.sources());
	const [creating, setCreating] = (0, import_react.useState)(false);
	const [newKey, setNewKey] = (0, import_react.useState)(null);
	const [changing, setChanging] = (0, import_react.useState)(null);
	const [assigning, setAssigning] = (0, import_react.useState)(null);
	const [filter, setFilter] = (0, import_react.useState)("");
	const rows = data.filter((a) => !filter || a.status === filter);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Ativações",
			desc: "Cada KEY ativa 1 dispositivo. A KEY completa aparece apenas uma vez, ao ser gerada.",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "hero",
				onClick: () => setCreating(true),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), "Gerar KEY"]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-4 flex gap-2",
			children: [
				"",
				"pendente",
				"ativa",
				"expirada",
				"bloqueada"
			].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				variant: filter === s ? "default" : "secondary",
				onClick: () => setFilter(s),
				children: s || "Todas"
			}, s))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
			head: [
				"KEY",
				"Cliente",
				"Plano",
				"Status",
				"Início",
				"Expira",
				"Dispositivo",
				"Fonte atribuída",
				""
			],
			empty: rows.length === 0,
			children: rows.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Td, {
					className: "font-mono",
					children: ["••••-", a.key_last4]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: a.customer ?? "—" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: a.plan }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { s: a.status }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: fmtDate(a.starts_at) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: fmtDate(a.expires_at) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, {
					className: "font-mono text-xs",
					children: a.display_id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-primary",
						children: a.display_id
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground",
						children: "não vinculada"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: a.source_name ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-muted-foreground",
					children: "nenhuma"
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "secondary",
						children: "Ações"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
					align: "end",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
							onClick: () => act(fns.renew({ data: {
								id: a.id,
								days: 30
							} }), "Renovado por 30 dias.", ["activations"]),
							children: "Renovar 30 dias"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
							onClick: () => act(fns.renew({ data: {
								id: a.id,
								days: 365
							} }), "Renovado por 12 meses.", ["activations"]),
							children: "Renovar 12 meses"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
							onClick: () => setAssigning(a),
							children: "Fonte atribuída…"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
							onClick: () => act(fns.sync({ data: {
								target: "activation",
								id: a.id
							} }), "Sincronização solicitada."),
							children: "Sincronizar no aparelho"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
							onClick: () => setChanging(a),
							children: "Trocar dispositivo…"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
							onClick: async () => {
								const r = await act(fns.regen({ data: { id: a.id } }), "Nova KEY gerada.", ["activations"]);
								if (r) setNewKey(r.key);
							},
							children: "Gerar nova KEY"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
							className: "text-destructive",
							onClick: () => act(fns.block({ data: {
								id: a.id,
								blocked: a.status !== "bloqueada"
							} }), "Status atualizado.", ["activations"]),
							children: a.status === "bloqueada" ? "Desbloquear" : "Bloquear"
						})
					]
				})] }) })
			] }, a.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreateDialog, {
			open: creating,
			onClose: () => setCreating(false),
			customers,
			plans,
			sources,
			onCreate: async (d) => {
				const r = await act(fns.create({ data: d }), "KEY gerada.", ["activations", "sources"]);
				if (r) {
					setCreating(false);
					setNewKey(r.key);
				}
			}
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: !!newKey,
			onOpenChange: (o) => !o && setNewKey(null),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "KEY gerada" }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Copie e envie ao cliente agora. Por segurança ela não será exibida novamente."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "rounded-xl bg-secondary p-4 text-center font-mono text-2xl tracking-widest text-primary",
					children: newKey
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "hero",
					onClick: () => {
						navigator.clipboard.writeText(newKey ?? "");
						toast.success("Copiada!");
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {}), "Copiar KEY"]
				})
			] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: !!changing,
			onOpenChange: (o) => !o && setChanging(null),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Trocar dispositivo" }) }), changing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChangeDevice, {
				a: changing,
				onSubmit: async (display_id, reason) => {
					if (await act(fns.change({ data: {
						id: changing.id,
						display_id,
						reason
					} }), "Dispositivo atualizado (auditado).", ["activations", "devices"])) setChanging(null);
				}
			})] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: !!assigning,
			onOpenChange: (o) => !o && setAssigning(null),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Fonte atribuída" }) }), assigning && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "O aparelho recebe a alteração automaticamente no próximo status/heartbeat."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					className: "flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
					defaultValue: assigning.source_id ?? "",
					onChange: async (e) => {
						if (await act(fns.assign({ data: {
							target: "activation",
							id: assigning.id,
							source_id: e.target.value || null
						} }), e.target.value ? "Fonte atribuída." : "Fonte removida.", ["activations", "sources"])) setAssigning(null);
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "",
						children: "— nenhuma (usuário adiciona manualmente) —"
					}), sources.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
						value: s.id,
						children: [
							s.name,
							" · ",
							s.display_hint
						]
					}, s.id))]
				})]
			})] })
		})
	] });
}
function CreateDialog({ open, onClose, customers, plans, sources, onCreate }) {
	const [f, setF] = (0, import_react.useState)({
		customer_id: null,
		plan_id: "",
		start_now: false,
		source_id: null
	});
	const [sendList, setSendList] = (0, import_react.useState)(false);
	const [newSource, setNewSource] = (0, import_react.useState)(false);
	const planId = f.plan_id || plans.find((p) => p.active)?.id || "";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (o) => !o && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-h-[90vh] overflow-y-auto",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Gerar KEY de ativação" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Cliente",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							className: selectCls,
							value: f.customer_id ?? "",
							onChange: (e) => setF({
								...f,
								customer_id: e.target.value || null
							}),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "— sem cliente —"
							}), customers.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: c.id,
								children: c.name
							}, c.id))]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Plano",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							className: selectCls,
							value: planId,
							onChange: (e) => setF({
								...f,
								plan_id: e.target.value
							}),
							children: plans.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: p.id,
								children: [p.name, p.active ? "" : " (inativo)"]
							}, p.id))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center justify-between gap-3 rounded-lg border border-border p-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							"Iniciar validade agora",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-xs text-muted-foreground",
								children: "Desligado: a contagem começa na ativação na TV."
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
							checked: f.start_now,
							onCheckedChange: (v) => setF({
								...f,
								start_now: v
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center justify-between gap-3 rounded-lg border border-border p-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							"Enviar lista ao ativar",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-xs text-muted-foreground",
								children: "A TV carrega a lista autorizada sozinha após a ativação."
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
							checked: sendList,
							onCheckedChange: (v) => {
								setSendList(v);
								if (!v) setF({
									...f,
									source_id: null
								});
							}
						})]
					}),
					sendList && (newSource ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-lg border border-border p-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SourceForm, {
							customerId: f.customer_id,
							onSaved: (id) => {
								setF({
									...f,
									source_id: id
								});
								setNewSource(false);
							},
							onCancel: () => setNewSource(false)
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							className: "flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
							value: f.source_id ?? "",
							onChange: (e) => setF({
								...f,
								source_id: e.target.value || null
							}),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "— escolha uma fonte —"
							}), sources.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: s.id,
								children: [
									s.name,
									" · ",
									s.display_hint
								]
							}, s.id))]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "secondary",
							onClick: () => setNewSource(true),
							children: "Nova fonte"
						})]
					})),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "hero",
						className: "w-full",
						disabled: !planId || sendList && !f.source_id,
						onClick: () => onCreate({
							...f,
							plan_id: planId
						}),
						children: "Gerar KEY"
					})
				]
			})]
		})
	});
}
function ChangeDevice({ a, onSubmit }) {
	const [id, setId] = (0, import_react.useState)(a.display_id ?? "");
	const [reason, setReason] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted-foreground",
				children: [
					"Atual: ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono",
						children: a.display_id ?? "nenhum"
					}),
					". Deixe em branco para desvincular (a lista deixa de ser entregue)."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Novo MAC / Device ID",
				hint: "Mostrado na tela de ativação do app.",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: id,
					onChange: (e) => setId(e.target.value.toUpperCase()),
					placeholder: "AA:BB:CC:DD:EE:FF",
					className: "font-mono"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Motivo (obrigatório, fica na auditoria)",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: reason,
					onChange: (e) => setReason(e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "hero",
				className: "w-full",
				disabled: reason.trim().length < 3,
				onClick: () => onSubmit(id.trim() || null, reason),
				children: "Confirmar troca"
			})
		]
	});
}
//#endregion
export { Ativacoes as component };
