import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { h as listCustomers, s as deleteSource, y as listSources } from "./admin.functions-DZ71ovy-.mjs";
import { t as Button } from "./button-CTmx8QDF.mjs";
import { a as Td, c as useAction, l as useAdminQuery, r as PageHeader, t as DataTable } from "./admin-ui-C_f-BTaD.mjs";
import { o as fmtDateTime } from "./brand-DsXviQDH.mjs";
import { c as ShieldCheck, p as Plus } from "../_libs/lucide-react.mjs";
import { i as DialogTitle, n as DialogContent, r as DialogHeader, t as Dialog } from "./dialog-B69u1cPq.mjs";
import { t as SourceForm } from "./source-form-CZO8BkeQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.fontes-Z47ej9pN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Fontes() {
	const list = useServerFn(listSources);
	const customers = useServerFn(listCustomers);
	const del = useServerFn(deleteSource);
	const act = useAction();
	const { data = [] } = useAdminQuery("sources", () => list());
	const { data: cs = [] } = useAdminQuery("customers", () => customers());
	const [editing, setEditing] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Fontes / Listas",
			desc: "Listas M3U ou Xtream autorizadas, entregues automaticamente ao aparelho licenciado.",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "hero",
				onClick: () => setEditing("new"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), "Nova fonte"]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex items-start gap-3 rounded-2xl border border-border bg-card p-4 text-sm text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "mt-0.5 h-5 w-5 shrink-0 text-success" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				"Credenciais são criptografadas e nunca exibidas novamente. Só aparelhos com licença ativa recebem a fonte; ao expirar, bloquear ou desvincular, o acesso é revogado. Atribua em",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Ativações" }),
				" ou ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Dispositivos" }),
				"."
			] })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
			head: [
				"Nome",
				"Tipo / destino",
				"Cliente",
				"Ativações",
				"Aparelhos",
				"Versão",
				"Atualizada",
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
					children: s.display_hint
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: s.customer ?? "—" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: s.activations }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: s.devices }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Td, { children: ["v", s.version] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: fmtDateTime(s.updated_at) }),
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
							if (confirm(`Remover "${s.name}"? Os aparelhos deixarão de recebê-la.`)) act(del({ data: { id: s.id } }), "Fonte removida.", [
								"sources",
								"activations",
								"devices"
							]);
						},
						children: "Remover"
					})]
				}) })
			] }, s.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: !!editing,
			onOpenChange: (o) => !o && setEditing(null),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
				className: "max-h-[90vh] overflow-y-auto",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: editing === "new" ? "Nova fonte" : "Editar fonte" }) }), editing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SourceForm, {
					...editing !== "new" ? { source: editing } : {},
					customers: cs,
					onSaved: () => setEditing(null)
				})]
			})
		})
	] });
}
//#endregion
export { Fontes as component };
