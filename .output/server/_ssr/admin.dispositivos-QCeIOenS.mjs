import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { M as setDeviceStatus, _ as listPlans, c as forceSync, g as listDevices, h as listCustomers, n as activateDeviceDirect, r as assignSource, t as activateDeviceByDisplayId, y as listSources } from "./admin.functions-DZ71ovy-.mjs";
import { t as Button } from "./button-CTmx8QDF.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { a as Td, c as useAction, i as StatusBadge, l as useAdminQuery, n as Field, r as PageHeader, s as selectCls, t as DataTable } from "./admin-ui-C_f-BTaD.mjs";
import { a as fmtDate, o as fmtDateTime } from "./brand-DsXviQDH.mjs";
import { i as DialogTitle, n as DialogContent, r as DialogHeader, t as Dialog } from "./dialog-B69u1cPq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.dispositivos-QCeIOenS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Dispositivos() {
	const list = useServerFn(listDevices);
	const sources = useServerFn(listSources);
	const customersFn = useServerFn(listCustomers);
	const plansFn = useServerFn(listPlans);
	const setStatus = useServerFn(setDeviceStatus);
	const assign = useServerFn(assignSource);
	const sync = useServerFn(forceSync);
	const activateDirect = useServerFn(activateDeviceDirect);
	const activateByDisplayId = useServerFn(activateDeviceByDisplayId);
	const act = useAction();
	const { data = [] } = useAdminQuery("devices", () => list());
	const { data: srcs = [] } = useAdminQuery("sources", () => sources());
	const { data: customers = [] } = useAdminQuery("customers", () => customersFn());
	const { data: plans = [] } = useAdminQuery("plans", () => plansFn());
	const [search, setSearch] = (0, import_react.useState)("");
	const [activating, setActivating] = (0, import_react.useState)(null);
	const [manualOpen, setManualOpen] = (0, import_react.useState)(false);
	const rows = data.filter((d) => `${d.display_id} ${d.model} ${d.customer ?? ""}`.toLowerCase().includes(search.toLowerCase()));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Dispositivos",
			desc: "O app registra o Device ID automaticamente. Receba o código do cliente e ative o aparelho diretamente aqui."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex flex-wrap items-center gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				placeholder: "Buscar Device ID, modelo ou cliente",
				value: search,
				onChange: (e) => setSearch(e.target.value),
				className: "max-w-sm"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "hero",
				onClick: () => setManualOpen(true),
				children: "+ ATIVAR POR MAC / DEVICE ID"
			})]
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
						onClick: () => act(sync({ data: {
							target: "device",
							id: d.id
						} }), "Sincronização solicitada."),
						children: "Sincronizar"
					})]
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: fmtDate(d.created_at) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: fmtDateTime(d.last_seen_at) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { s: d.status }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [d.license_status !== "ativa" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "hero",
						onClick: () => setActivating(d),
						children: "Ativar"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: d.status === "bloqueado" ? "secondary" : "destructive",
						onClick: () => act(setStatus({ data: {
							id: d.id,
							status: d.status === "bloqueado" ? "ativo" : "bloqueado"
						} }), "Status atualizado.", ["devices"]),
						children: d.status === "bloqueado" ? "Desbloquear" : "Bloquear"
					})]
				}) })
			] }, d.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ManualActivationDialog, {
			open: manualOpen,
			customers,
			plans: plans.filter((p) => p.active),
			sources: srcs,
			onClose: () => setManualOpen(false),
			onActivate: async (data) => {
				if (await act(activateByDisplayId({ data }), "MAC / Device ID ativado com sucesso.", ["devices", "activations"])) setManualOpen(false);
			}
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActivateDeviceDialog, {
			device: activating,
			customers,
			plans: plans.filter((p) => p.active),
			sources: srcs,
			onClose: () => setActivating(null),
			onActivate: async (data) => {
				if (await act(activateDirect({ data }), "Dispositivo ativado com sucesso.", ["devices", "activations"])) setActivating(null);
			}
		})
	] });
}
function ActivateDeviceDialog({ device, customers, plans, sources, onClose, onActivate }) {
	const [customerId, setCustomerId] = (0, import_react.useState)("");
	const [planId, setPlanId] = (0, import_react.useState)("");
	const [sourceId, setSourceId] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: !!device,
		onOpenChange: (o) => !o && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Ativar dispositivo" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-md border p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-muted-foreground",
						children: "MAC / Device ID"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-mono font-semibold text-primary",
						children: device?.display_id
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Cliente",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						className: selectCls,
						value: customerId,
						onChange: (e) => setCustomerId(e.target.value),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "Sem cliente"
						}), customers.filter((c) => c.status === "ativo").map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: c.id,
							children: c.name
						}, c.id))]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Plano",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						className: selectCls,
						value: planId,
						onChange: (e) => setPlanId(e.target.value),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "Selecione o plano"
						}), plans.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
							value: p.id,
							children: [
								p.name,
								" — ",
								p.duration_days,
								" dias"
							]
						}, p.id))]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Fonte / Lista",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						className: selectCls,
						value: sourceId,
						onChange: (e) => setSourceId(e.target.value),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "Nenhuma / padrão"
						}), sources.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: s.id,
							children: s.name
						}, s.id))]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "w-full",
					variant: "hero",
					disabled: !device || !planId,
					onClick: () => onActivate({
						device_id: device.id,
						customer_id: customerId || null,
						plan_id: planId,
						source_id: sourceId || null
					}),
					children: "ATIVAR DISPOSITIVO"
				})
			]
		})] })
	});
}
function ManualActivationDialog({ open, customers, plans, sources, onClose, onActivate }) {
	const [displayId, setDisplayId] = (0, import_react.useState)("");
	const [customerId, setCustomerId] = (0, import_react.useState)("");
	const [planId, setPlanId] = (0, import_react.useState)("");
	const [sourceId, setSourceId] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (o) => !o && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Ativar por MAC / Device ID" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "MAC / Device ID",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						autoFocus: true,
						placeholder: "Ex.: 0A:95:91:80:D6:5D",
						value: displayId,
						onChange: (e) => setDisplayId(e.target.value.toUpperCase())
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Cliente",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						className: selectCls,
						value: customerId,
						onChange: (e) => setCustomerId(e.target.value),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "Sem cliente"
						}), customers.filter((c) => c.status === "ativo").map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: c.id,
							children: c.name
						}, c.id))]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Plano",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						className: selectCls,
						value: planId,
						onChange: (e) => setPlanId(e.target.value),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "Selecione o plano"
						}), plans.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
							value: p.id,
							children: [
								p.name,
								" — ",
								p.duration_days,
								" dias"
							]
						}, p.id))]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Fonte / Lista",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						className: selectCls,
						value: sourceId,
						onChange: (e) => setSourceId(e.target.value),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "Nenhuma / padrão"
						}), sources.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: s.id,
							children: s.name
						}, s.id))]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "w-full",
					variant: "hero",
					disabled: !displayId.trim() || !planId,
					onClick: () => onActivate({
						display_id: displayId.trim(),
						customer_id: customerId || null,
						plan_id: planId,
						source_id: sourceId || null
					}),
					children: "ATIVAR MAC / DEVICE ID"
				})
			]
		})] })
	});
}
//#endregion
export { Dispositivos as component };
