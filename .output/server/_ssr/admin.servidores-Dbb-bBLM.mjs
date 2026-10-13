import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { b as listProviderServers, j as saveProviderServer, s as deleteProviderServer } from "./admin.functions-Bo_9ItgC.mjs";
import { t as Button } from "./button-CTmx8QDF.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { a as Td, c as useAction, l as useAdminQuery, n as Field, r as PageHeader, t as DataTable } from "./admin-ui-C_f-BTaD.mjs";
import { m as Plus, u as Server } from "../_libs/lucide-react.mjs";
import { i as DialogTitle, n as DialogContent, r as DialogHeader, t as Dialog } from "./dialog-B69u1cPq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.servidores-Dbb-bBLM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Servidores() {
	const list = useServerFn(listProviderServers);
	const save = useServerFn(saveProviderServer);
	const del = useServerFn(deleteProviderServer);
	const act = useAction();
	const { data = [] } = useAdminQuery("provider-servers", () => list());
	const [editing, setEditing] = (0, import_react.useState)(null);
	const current = editing === "new" ? null : editing;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Servidores",
			desc: "DNS/servidores autorizados fornecidos pelo seu provedor.",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "hero",
				onClick: () => setEditing("new"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), " Novo servidor"]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
			head: [
				"Nome",
				"DNS / URL base",
				"Prioridade",
				"Status",
				""
			],
			empty: data.length === 0,
			children: data.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, {
					className: "font-medium",
					children: s.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, {
					className: "text-muted-foreground",
					children: s.base_url
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: s.priority }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: s.active ? "Ativo" : "Inativo" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "secondary",
						onClick: () => setEditing(s),
						children: "Editar"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "destructive",
						onClick: () => {
							if (confirm(`Remover "${s.name}"?`)) act(del({ data: { id: s.id } }), "Servidor removido.", ["provider-servers"]);
						},
						children: "Remover"
					})]
				}) })
			] }, s.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: !!editing,
			onOpenChange: (o) => !o && setEditing(null),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: editing === "new" ? "Novo servidor" : "Editar servidor" }) }), editing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServerForm, {
				initial: current,
				onSave: async (data) => {
					await act(save({ data }), "Servidor salvo.", ["provider-servers"]);
					setEditing(null);
				}
			})] })
		})
	] });
}
function ServerForm({ initial, onSave }) {
	const [name, setName] = (0, import_react.useState)(initial?.name ?? "");
	const [baseUrl, setBaseUrl] = (0, import_react.useState)(initial?.base_url ?? "");
	const [priority, setPriority] = (0, import_react.useState)(initial?.priority ?? 100);
	const [active, setActive] = (0, import_react.useState)(initial?.active ?? true);
	const [busy, setBusy] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "space-y-4",
		onSubmit: async (e) => {
			e.preventDefault();
			setBusy(true);
			try {
				await onSave({
					...initial ? { id: initial.id } : {},
					name,
					base_url: baseUrl,
					priority,
					active
				});
			} finally {
				setBusy(false);
			}
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Nome interno",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: name,
					onChange: (e) => setName(e.target.value),
					placeholder: "Ex: Servidor 1",
					required: true
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "DNS / URL base",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: baseUrl,
					onChange: (e) => setBaseUrl(e.target.value),
					placeholder: "https://servidor.exemplo",
					required: true
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Prioridade",
				hint: "Menor número = maior prioridade",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					type: "number",
					min: 1,
					max: 999,
					value: priority,
					onChange: (e) => setPriority(Number(e.target.value)),
					required: true
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex items-center gap-2 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "checkbox",
					checked: active,
					onChange: (e) => setActive(e.target.checked)
				}), " Ativo"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				type: "submit",
				variant: "hero",
				className: "w-full",
				disabled: busy,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Server, { className: "h-4 w-4" }),
					" ",
					busy ? "Salvando…" : "Salvar servidor"
				]
			})
		]
	});
}
//#endregion
export { Servidores as component };
