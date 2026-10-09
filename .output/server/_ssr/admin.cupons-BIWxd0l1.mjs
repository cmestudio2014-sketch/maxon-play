import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { T as saveCoupon, m as listCoupons } from "./admin.functions-DZ71ovy-.mjs";
import { t as Button } from "./button-CTmx8QDF.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { a as Td, c as useAction, i as StatusBadge, l as useAdminQuery, n as Field, r as PageHeader, t as DataTable } from "./admin-ui-C_f-BTaD.mjs";
import { a as fmtDate } from "./brand-DsXviQDH.mjs";
import { p as Plus } from "../_libs/lucide-react.mjs";
import { t as Switch } from "./switch-Cn1w-cIH.mjs";
import { i as DialogTitle, n as DialogContent, r as DialogHeader, t as Dialog } from "./dialog-B69u1cPq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.cupons-BIWxd0l1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Cupons() {
	const list = useServerFn(listCoupons);
	const save = useServerFn(saveCoupon);
	const act = useAction();
	const { data = [] } = useAdminQuery("coupons", () => list());
	const [f, setF] = (0, import_react.useState)(null);
	const open = (c) => setF(c ? {
		id: c.id,
		code: c.code,
		percent_off: c.percent_off,
		max_uses: c.max_uses ? String(c.max_uses) : "",
		expires_at: c.expires_at ? new Date(c.expires_at).toISOString().slice(0, 10) : "",
		active: c.active
	} : {
		code: "",
		percent_off: 10,
		max_uses: "",
		expires_at: "",
		active: true
	});
	const submit = async () => {
		if (!f) return;
		if (await act(save({ data: {
			...f.id ? { id: f.id } : {},
			code: f.code,
			percent_off: f.percent_off,
			max_uses: f.max_uses ? Number(f.max_uses) : null,
			expires_at: f.expires_at || null,
			active: f.active
		} }), "Cupom salvo.", ["coupons"])) setF(null);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Cupons",
			desc: "Descontos percentuais aplicados nas vendas.",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "hero",
				onClick: () => open(),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), "Novo cupom"]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
			head: [
				"Código",
				"Desconto",
				"Usos",
				"Expira",
				"Status",
				""
			],
			empty: data.length === 0,
			children: data.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, {
					className: "font-mono",
					children: c.code
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Td, { children: [c.percent_off, "%"] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Td, { children: [c.uses, c.max_uses ? ` / ${c.max_uses}` : ""] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: fmtDate(c.expires_at) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { s: c.active ? "ativo" : "inativo" }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: "secondary",
					onClick: () => open(c),
					children: "Editar"
				}) })
			] }, c.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: !!f,
			onOpenChange: (o) => !o && setF(null),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: f?.id ? "Editar cupom" : "Novo cupom" }) }), f && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Código",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: f.code,
							onChange: (e) => setF({
								...f,
								code: e.target.value.toUpperCase()
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Desconto (%)",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "number",
							min: 1,
							max: 100,
							value: f.percent_off,
							onChange: (e) => setF({
								...f,
								percent_off: Number(e.target.value)
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Limite de usos (opcional)",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "number",
							value: f.max_uses,
							onChange: (e) => setF({
								...f,
								max_uses: e.target.value
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Expira em (opcional)",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "date",
							value: f.expires_at,
							onChange: (e) => setF({
								...f,
								expires_at: e.target.value
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center gap-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
							checked: f.active,
							onCheckedChange: (v) => setF({
								...f,
								active: v
							})
						}), "Ativo"]
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
export { Cupons as component };
