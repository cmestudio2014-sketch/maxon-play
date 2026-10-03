import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { d as listAudit } from "./admin.functions-DkikgWna.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { a as Td, l as useAdminQuery, r as PageHeader, t as DataTable } from "./admin-ui-C_f-BTaD.mjs";
import { o as fmtDateTime } from "./brand-DsXviQDH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.auditoria-CiBdH2gO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Auditoria() {
	const list = useServerFn(listAudit);
	const { data = [], error } = useAdminQuery("audit", () => list());
	const [q, setQ] = (0, import_react.useState)("");
	const rows = data.filter((l) => `${l.action} ${l.actor_label ?? ""} ${l.entity ?? ""} ${l.details}`.toLowerCase().includes(q.toLowerCase()));
	if (error) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-destructive",
		children: error.message
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Auditoria",
			desc: "Últimos 300 eventos. KEYs, senhas e credenciais nunca são gravadas."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			placeholder: "Filtrar",
			value: q,
			onChange: (e) => setQ(e.target.value),
			className: "mb-4 max-w-sm"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
			head: [
				"Data",
				"Ator",
				"Ação",
				"Entidade",
				"Detalhes"
			],
			empty: rows.length === 0,
			children: rows.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: fmtDateTime(l.created_at) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: l.actor_label ?? l.actor_type }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, {
					className: "font-mono text-xs text-primary",
					children: l.action
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Td, {
					className: "text-xs",
					children: [l.entity ?? "—", l.entity_id ? ` · ${l.entity_id.slice(0, 8)}` : ""]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, {
					className: "max-w-md truncate font-mono text-xs text-muted-foreground",
					children: l.details === "{}" ? "" : l.details
				})
			] }, l.id))
		})
	] });
}
//#endregion
export { Auditoria as component };
