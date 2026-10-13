import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { a as useQueryClient, r as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-ui-C_f-BTaD.js
var import_jsx_runtime = require_jsx_runtime();
/** Busca dados do painel (server function sem argumentos). */
function useAdminQuery(key, fn) {
	return useQuery({
		queryKey: ["admin", key],
		queryFn: fn
	});
}
/** Executa uma ação, mostra toast e recarrega a(s) lista(s). */
function useAction() {
	const qc = useQueryClient();
	return async (p, success, keys = []) => {
		try {
			const r = await p;
			toast.success(success);
			await Promise.all(keys.map((k) => qc.invalidateQueries({ queryKey: ["admin", k] })));
			return r;
		} catch (e) {
			toast.error(friendly(e));
			return;
		}
	};
}
function friendly(e) {
	const m = e?.message ?? "Erro inesperado.";
	try {
		const parsed = JSON.parse(m);
		if (Array.isArray(parsed) && parsed[0]?.message) return parsed.map((x) => x.message).join("; ");
	} catch {}
	return m;
}
function PageHeader({ title, desc, action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-6 flex flex-wrap items-end justify-between gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-2xl font-bold md:text-3xl",
			children: title
		}), desc && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted-foreground",
			children: desc
		})] }), action]
	});
}
var tones = {
	ativa: "bg-success/15 text-success",
	ativo: "bg-success/15 text-success",
	pago: "bg-success/15 text-success",
	pendente: "bg-warning/15 text-warning",
	expirada: "bg-muted text-muted-foreground",
	inativo: "bg-muted text-muted-foreground",
	bloqueada: "bg-destructive/15 text-destructive",
	bloqueado: "bg-destructive/15 text-destructive",
	cancelado: "bg-destructive/15 text-destructive"
};
function StatusBadge({ s }) {
	if (!s) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "text-muted-foreground",
		children: "—"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${tones[s] ?? "bg-secondary text-secondary-foreground"}`,
		children: s
	});
}
function DataTable({ head, children, empty }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "overflow-x-auto rounded-2xl border border-border bg-card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "w-full text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
				className: "bg-secondary/50 text-left text-xs uppercase tracking-wider text-muted-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: head.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					className: "whitespace-nowrap px-4 py-3 font-semibold",
					children: h
				}, h)) })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
				className: "divide-y divide-border",
				children
			})]
		}), empty && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "p-8 text-center text-muted-foreground",
			children: "Nenhum registro."
		})]
	});
}
var Td = ({ children, className = "" }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
	className: `whitespace-nowrap px-4 py-3 ${className}`,
	children
});
function Field({ label, children, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block space-y-1.5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm font-medium",
				children: label
			}),
			children,
			hint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block text-xs text-muted-foreground",
				children: hint
			})
		]
	});
}
var selectCls = "flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring";
//#endregion
export { Td as a, useAction as c, StatusBadge as i, useAdminQuery as l, Field as n, friendly as o, PageHeader as r, selectCls as s, DataTable as t };
