import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { l as getDashboard } from "./admin.functions-DZ71ovy-.mjs";
import { a as Td, i as StatusBadge, l as useAdminQuery, r as PageHeader, t as DataTable } from "./admin-ui-C_f-BTaD.mjs";
import { a as fmtDate, i as brl, o as fmtDateTime } from "./brand-DsXviQDH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.index-B0WBAqpj.js
var import_jsx_runtime = require_jsx_runtime();
function Dashboard() {
	const fn = useServerFn(getDashboard);
	const { data, isLoading, error } = useAdminQuery("dashboard", () => fn());
	if (error) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-destructive",
		children: error.message
	});
	if (isLoading || !data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-muted-foreground",
		children: "Carregando…"
	});
	const cards = [
		["Clientes", String(data.customers)],
		["Ativações ativas", String(data.active)],
		["Expiradas", String(data.expired)],
		["Vendas pagas", String(data.salesPaid)],
		["Receita total", brl(data.revenue)],
		["Receita 30 dias", brl(data.revenue30)],
		["Vendas pendentes", String(data.pending)]
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Dashboard",
			desc: "Visão geral do MAXON PLAY."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
			children: cards.map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-border bg-card p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-wider text-muted-foreground",
					children: k
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 font-display text-3xl font-bold",
					children: v
				})]
			}, k))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 grid gap-8 xl:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-3 text-lg font-semibold",
				children: "Vencimentos nos próximos 7 dias"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
				head: [
					"Cliente",
					"Plano",
					"KEY",
					"Vence"
				],
				empty: data.expiring.length === 0,
				children: data.expiring.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Td, { children: [e.customer ?? "—", e.whatsapp && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						className: "ml-2 text-xs text-primary",
						href: `https://wa.me/${(e.whatsapp ?? "").replace(/\D/g, "")}`,
						target: "_blank",
						rel: "noreferrer",
						children: "WhatsApp"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: e.plan }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Td, {
						className: "font-mono",
						children: ["…", e.key_last4]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: fmtDate(e.expires_at) })
				] }, e.id))
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-3 text-lg font-semibold",
				children: "Vendas recentes"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
				head: [
					"Pedido",
					"Cliente",
					"Valor",
					"Status",
					"Data"
				],
				empty: data.recentSales.length === 0,
				children: data.recentSales.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, {
						className: "font-mono text-xs",
						children: s.order_number
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: s.customer ?? "—" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: brl(s.amount_cents) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { s: s.status }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: fmtDateTime(s.created_at) })
				] }, s.id))
			})] })]
		})
	] });
}
//#endregion
export { Dashboard as component };
