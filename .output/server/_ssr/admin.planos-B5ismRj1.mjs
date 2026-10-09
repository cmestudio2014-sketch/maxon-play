import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { D as savePlan, _ as listPlans } from "./admin.functions-DZ71ovy-.mjs";
import { t as Button } from "./button-CTmx8QDF.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { a as Td, c as useAction, i as StatusBadge, l as useAdminQuery, n as Field, r as PageHeader, t as DataTable } from "./admin-ui-C_f-BTaD.mjs";
import { i as brl } from "./brand-DsXviQDH.mjs";
import { p as Plus } from "../_libs/lucide-react.mjs";
import { t as Switch } from "./switch-Cn1w-cIH.mjs";
import { i as DialogTitle, n as DialogContent, r as DialogHeader, t as Dialog } from "./dialog-B69u1cPq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.planos-B5ismRj1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Planos() {
	const list = useServerFn(listPlans);
	const save = useServerFn(savePlan);
	const act = useAction();
	const { data = [] } = useAdminQuery("plans", () => list());
	const [f, setF] = (0, import_react.useState)(null);
	const open = (p) => setF(p ? {
		...p,
		price: (p.price_cents / 100).toFixed(2)
	} : {
		code: "",
		name: "",
		description: "",
		duration_days: 30,
		price_cents: 0,
		highlight: false,
		active: true,
		sort: data.length + 1,
		price: ""
	});
	const submit = async () => {
		if (!f) return;
		const { price, ...rest } = f;
		if (await act(save({ data: {
			...rest,
			price_cents: Math.round(Number(price.replace(",", ".")) * 100)
		} }), "Plano salvo. A página /planos já mostra o novo valor.", ["plans"])) setF(null);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Planos",
			desc: "Preços exibidos em /planos e usados nas vendas.",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "hero",
				onClick: () => open(),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), "Novo plano"]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
			head: [
				"Nome",
				"Código",
				"Duração",
				"Preço",
				"Destaque",
				"Status",
				""
			],
			children: data.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, {
					className: "font-medium",
					children: p.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, {
					className: "font-mono text-xs",
					children: p.code
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Td, { children: [p.duration_days, " dias"] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: brl(p.price_cents) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: p.highlight ? "Sim" : "—" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { s: p.active ? "ativo" : "inativo" }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: "secondary",
					onClick: () => open(p),
					children: "Editar"
				}) })
			] }, p.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: !!f,
			onOpenChange: (o) => !o && setF(null),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: f?.id ? "Editar plano" : "Novo plano" }) }), f && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Nome",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: f.name,
									onChange: (e) => setF({
										...f,
										name: e.target.value
									})
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Código",
								hint: "minúsculas, ex: mensal",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: f.code,
									onChange: (e) => setF({
										...f,
										code: e.target.value.toLowerCase()
									})
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Duração (dias)",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									value: f.duration_days,
									onChange: (e) => setF({
										...f,
										duration_days: Number(e.target.value)
									})
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Preço (R$)",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									inputMode: "decimal",
									value: f.price,
									onChange: (e) => setF({
										...f,
										price: e.target.value
									})
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Descrição",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: f.description,
							onChange: (e) => setF({
								...f,
								description: e.target.value
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Ordem",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "number",
							value: f.sort,
							onChange: (e) => setF({
								...f,
								sort: Number(e.target.value)
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-6 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
								checked: f.highlight,
								onCheckedChange: (v) => setF({
									...f,
									highlight: v
								})
							}), "Destaque"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
								checked: f.active,
								onCheckedChange: (v) => setF({
									...f,
									active: v
								})
							}), "Ativo"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "hero",
						className: "w-full",
						onClick: submit,
						children: "Salvar"
					})
				]
			})] })
		})
	] });
}
//#endregion
export { Planos as component };
