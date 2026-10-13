import { o as __toESM } from "../_runtime.mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as useAction, l as useAdminQuery, n as Field, r as PageHeader, s as selectCls } from "./admin-ui-C_f-BTaD.mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { C as listCustomers, T as listPlans, j as listSources, n as activateDeviceByTvCode } from "./admin.functions-B14al4zO.mjs";
import { t as Button } from "./button-CTmx8QDF.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { O as Film, T as KeyRound, a as TvMinimal, d as ShieldCheck, v as Music2 } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.streaming-D9c7qgFn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var services = [
	{
		name: "Netflix",
		icon: TvMinimal
	},
	{
		name: "Prime Video",
		icon: Film
	},
	{
		name: "Crunchyroll",
		icon: Film
	},
	{
		name: "HBO Max",
		icon: TvMinimal
	},
	{
		name: "Spotify",
		icon: Music2
	},
	{
		name: "Surfshark",
		icon: ShieldCheck
	}
];
function Streaming() {
	const activate = useServerFn(activateDeviceByTvCode);
	const getCustomers = useServerFn(listCustomers);
	const getPlans = useServerFn(listPlans);
	const getSources = useServerFn(listSources);
	const act = useAction();
	const { data: customers = [] } = useAdminQuery("customers", () => getCustomers());
	const { data: plans = [] } = useAdminQuery("plans", () => getPlans());
	const { data: sources = [] } = useAdminQuery("sources", () => getSources());
	const [code, setCode] = (0, import_react.useState)("");
	const [customerId, setCustomerId] = (0, import_react.useState)("");
	const [planId, setPlanId] = (0, import_react.useState)("");
	const [sourceId, setSourceId] = (0, import_react.useState)("");
	async function submit() {
		if (await act(activate({ data: {
			code,
			customer_id: customerId || null,
			plan_id: planId,
			source_id: sourceId || null
		} }), "TV ativada com sucesso.", ["activations", "devices"])) setCode("");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Ativação de Streaming",
			desc: "Central de serviços e ativações de streaming do MAXON PLAY."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mb-6 rounded-2xl border border-primary/40 bg-card p-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-xl bg-primary/10 p-2 text-primary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { className: "h-5 w-5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg font-bold",
					children: "Ativação da TV — MAXON PLAY"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Digite o código de 6 números mostrado na TV. O código é temporário e de uso único."
				})] })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 md:grid-cols-2 xl:grid-cols-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Código da TV",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							inputMode: "numeric",
							maxLength: 6,
							placeholder: "123456",
							value: code,
							onChange: (e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6)),
							className: "font-mono text-lg tracking-[0.2em]"
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
							}), customers.filter((x) => x.status === "ativo").map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: x.id,
								children: x.name
							}, x.id))]
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
								children: "Selecione"
							}), plans.filter((p) => p.active).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
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
								children: "Padrão"
							}), sources.map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: x.id,
								children: x.name
							}, x.id))]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-end",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "w-full",
							variant: "hero",
							disabled: code.length !== 6 || !planId,
							onClick: submit,
							children: "ATIVAR TV"
						})
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-3",
			children: services.map((service) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-2xl border border-border bg-card p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-xl bg-secondary p-2 text-primary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(service.icon, { className: "h-5 w-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-lg font-bold",
							children: service.name
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-muted-foreground",
						children: "Gerenciamento de ativações autorizadas."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-4 w-full",
						variant: "secondary",
						disabled: true,
						children: "Integração pendente"
					})
				]
			}, service.name))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 rounded-2xl border border-border bg-card p-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-semibold",
				children: "Integração BOT ATIVA"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: "Área preparada para integrações autorizadas com o backend. Credenciais e tokens não são expostos no navegador."
			})]
		})
	] });
}
//#endregion
export { Streaming as component };
