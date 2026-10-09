import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { N as setSaleStatus, _ as listPlans, h as listCustomers, o as createSale, v as listSales } from "./admin.functions-DZ71ovy-.mjs";
import { t as Button } from "./button-CTmx8QDF.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as Td, c as useAction, i as StatusBadge, l as useAdminQuery, n as Field, r as PageHeader, s as selectCls, t as DataTable } from "./admin-ui-C_f-BTaD.mjs";
import { i as brl, o as fmtDateTime } from "./brand-DsXviQDH.mjs";
import { C as Copy, p as Plus } from "../_libs/lucide-react.mjs";
import { i as DialogTitle, n as DialogContent, r as DialogHeader, t as Dialog } from "./dialog-B69u1cPq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.vendas-BfMwYJUN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Vendas() {
	const list = useServerFn(listSales);
	const customers = useServerFn(listCustomers);
	const plans = useServerFn(listPlans);
	const create = useServerFn(createSale);
	const setStatus = useServerFn(setSaleStatus);
	const act = useAction();
	const { data = [] } = useAdminQuery("sales", () => list());
	const { data: cs = [] } = useAdminQuery("customers", () => customers());
	const { data: ps = [] } = useAdminQuery("plans", () => plans());
	const [open, setOpen] = (0, import_react.useState)(false);
	const [key, setKey] = (0, import_react.useState)(null);
	const [f, setF] = (0, import_react.useState)({
		customer_id: "",
		plan_id: "",
		coupon_code: "",
		payment_method: "pix",
		status: "pendente"
	});
	const markPaid = async (id) => {
		const r = await act(setStatus({ data: {
			id,
			status: "pago",
			generate_key: true
		} }), "Venda marcada como paga.", [
			"sales",
			"activations",
			"dashboard"
		]);
		if (r?.key) setKey(r.key);
	};
	const submit = async () => {
		const planId = f.plan_id || ps[0]?.id || "";
		const r = await act(create({ data: {
			customer_id: f.customer_id,
			plan_id: planId,
			payment_method: f.payment_method,
			status: f.status,
			...f.coupon_code ? { coupon_code: f.coupon_code } : {}
		} }), "Venda registrada.", ["sales", "dashboard"]);
		if (r) {
			setOpen(false);
			if (f.status === "pago") await markPaid(r.id);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Vendas",
			desc: "Ao marcar como paga, uma KEY é gerada para o cliente.",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "hero",
				onClick: () => setOpen(true),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), "Nova venda"]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
			head: [
				"Pedido",
				"Cliente",
				"Plano",
				"Valor",
				"Cupom",
				"Método",
				"Status",
				"Data",
				"Vendedor",
				""
			],
			empty: data.length === 0,
			children: data.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, {
					className: "font-mono text-xs",
					children: s.order_number
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: s.customer ?? "—" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: s.plan ?? "—" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: brl(s.amount_cents) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: s.coupon ?? "—" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, {
					className: "capitalize",
					children: s.payment_method
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { s: s.status }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: fmtDateTime(s.created_at) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: s.seller ?? "—" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: s.status === "pendente" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "hero",
						onClick: () => markPaid(s.id),
						children: "Marcar pago"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "ghost",
						onClick: () => act(setStatus({ data: {
							id: s.id,
							status: "cancelado",
							generate_key: false
						} }), "Venda cancelada.", ["sales", "dashboard"]),
						children: "Cancelar"
					})]
				}) })
			] }, s.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open,
			onOpenChange: setOpen,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Nova venda" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Cliente",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							className: selectCls,
							value: f.customer_id,
							onChange: (e) => setF({
								...f,
								customer_id: e.target.value
							}),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "— selecione —"
							}), cs.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: c.id,
								children: c.name
							}, c.id))]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Plano",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							className: selectCls,
							value: f.plan_id || ps[0]?.id || "",
							onChange: (e) => setF({
								...f,
								plan_id: e.target.value
							}),
							children: ps.filter((p) => p.active).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: p.id,
								children: [
									p.name,
									" — ",
									brl(p.price_cents)
								]
							}, p.id))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Cupom (opcional)",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: f.coupon_code,
							onChange: (e) => setF({
								...f,
								coupon_code: e.target.value.toUpperCase()
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Método de pagamento",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							className: selectCls,
							value: f.payment_method,
							onChange: (e) => setF({
								...f,
								payment_method: e.target.value
							}),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "pix",
									children: "PIX"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "dinheiro",
									children: "Dinheiro"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "cartao",
									children: "Cartão"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "transferencia",
									children: "Transferência"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "outro",
									children: "Outro"
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Status",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							className: selectCls,
							value: f.status,
							onChange: (e) => setF({
								...f,
								status: e.target.value
							}),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "pendente",
								children: "Pendente"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "pago",
								children: "Pago (gera KEY)"
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "hero",
						className: "w-full",
						disabled: !f.customer_id,
						onClick: submit,
						children: "Registrar venda"
					})
				]
			})] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: !!key,
			onOpenChange: (o) => !o && setKey(null),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "KEY do cliente" }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Envie ao cliente agora — ela não será exibida novamente. Para enviar lista ao ativar, atribua uma fonte em Ativações."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "rounded-xl bg-secondary p-4 text-center font-mono text-2xl tracking-widest text-primary",
					children: key
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "hero",
					onClick: () => {
						navigator.clipboard.writeText(key ?? "");
						toast.success("Copiada!");
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {}), "Copiar"]
				})
			] })
		})
	] });
}
//#endregion
export { Vendas as component };
