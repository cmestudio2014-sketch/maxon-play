import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { A as setDeviceStatus, _ as listSources, m as listDevices, o as forceSync, t as assignSource } from "./admin.functions-DkikgWna.mjs";
import { t as Button } from "./button-CTmx8QDF.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { a as Td, c as useAction, i as StatusBadge, l as useAdminQuery, r as PageHeader, s as selectCls, t as DataTable } from "./admin-ui-C_f-BTaD.mjs";
import { a as fmtDate, o as fmtDateTime } from "./brand-DsXviQDH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.dispositivos-LpXE3Q7M.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Dispositivos() {
	const list = useServerFn(listDevices);
	const sources = useServerFn(listSources);
	const setStatus = useServerFn(setDeviceStatus);
	const assign = useServerFn(assignSource);
	const sync = useServerFn(forceSync);
	const act = useAction();
	const { data = [] } = useAdminQuery("devices", () => list());
	const { data: srcs = [] } = useAdminQuery("sources", () => sources());
	const [search, setSearch] = (0, import_react.useState)("");
	const rows = data.filter((d) => `${d.display_id} ${d.model} ${d.customer ?? ""}`.toLowerCase().includes(search.toLowerCase()));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Dispositivos",
			desc: "Registrados automaticamente quando o app abre. MAC / Device ID é um identificador do app (não é o MAC físico)."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			placeholder: "Buscar Device ID, modelo ou cliente",
			value: search,
			onChange: (e) => setSearch(e.target.value),
			className: "mb-4 max-w-sm"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
			head: [
				"MAC / Device ID",
				"Plataforma",
				"Modelo",
				"Cliente",
				"Licença",
				"Vence",
				"Fonte atribuída (aparelho)",
				"Cadastro",
				"Última conexão",
				"Status",
				""
			],
			empty: rows.length === 0,
			children: rows.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, {
					className: "font-mono text-primary",
					children: d.display_id
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, {
					className: "capitalize",
					children: d.platform
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: d.model || "—" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: d.customer ?? "—" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { s: d.license_status }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: fmtDate(d.expires_at) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						className: `${selectCls} h-8 w-44`,
						value: d.source_id ?? "",
						onChange: (e) => act(assign({ data: {
							target: "device",
							id: d.id,
							source_id: e.target.value || null
						} }), "Fonte atualizada. O aparelho sincroniza em instantes.", ["devices", "sources"]),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "— herdar da ativação —"
						}), srcs.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: s.id,
							children: s.name
						}, s.id))]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "ghost",
						title: "Sincronizar no aparelho",
						onClick: () => act(sync({ data: {
							target: "device",
							id: d.id
						} }), "Sincronização solicitada."),
						children: "Sincronizar no aparelho"
					})]
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: fmtDate(d.created_at) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: fmtDateTime(d.last_seen_at) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { s: d.status }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: d.status === "bloqueado" ? "secondary" : "destructive",
					onClick: () => act(setStatus({ data: {
						id: d.id,
						status: d.status === "bloqueado" ? "ativo" : "bloqueado"
					} }), "Status atualizado.", ["devices"]),
					children: d.status === "bloqueado" ? "Desbloquear" : "Bloquear"
				}) })
			] }, d.id))
		})
	] });
}
//#endregion
export { Dispositivos as component };
