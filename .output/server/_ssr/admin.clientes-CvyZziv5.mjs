import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { E as saveCustomer, h as listCustomers } from "./admin.functions-DZ71ovy-.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as Button } from "./button-CTmx8QDF.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { a as Td, c as useAction, i as StatusBadge, l as useAdminQuery, n as Field, r as PageHeader, t as DataTable } from "./admin-ui-C_f-BTaD.mjs";
import { a as fmtDate } from "./brand-DsXviQDH.mjs";
import { p as Plus } from "../_libs/lucide-react.mjs";
import { i as DialogTitle, n as DialogContent, r as DialogHeader, t as Dialog } from "./dialog-B69u1cPq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.clientes-CvyZziv5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Textarea.displayName = "Textarea";
var empty = {
	name: "",
	whatsapp: "",
	email: "",
	notes: "",
	status: "ativo"
};
function Clientes() {
	const list = useServerFn(listCustomers);
	const save = useServerFn(saveCustomer);
	const act = useAction();
	const { data = [] } = useAdminQuery("customers", () => list());
	const [form, setForm] = (0, import_react.useState)(null);
	const [search, setSearch] = (0, import_react.useState)("");
	const rows = data.filter((c) => `${c.name} ${c.whatsapp} ${c.email ?? ""}`.toLowerCase().includes(search.toLowerCase()));
	const edit = (c) => setForm({
		id: c.id,
		name: c.name,
		whatsapp: c.whatsapp,
		email: c.email ?? "",
		notes: c.notes,
		status: c.status
	});
	const submit = async (e) => {
		e.preventDefault();
		if (!form) return;
		if (await act(save({ data: form }), "Cliente salvo.", ["customers"])) setForm(null);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Clientes",
			desc: `${data.length} cadastrados`,
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "hero",
				onClick: () => setForm(empty),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), "Novo cliente"]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			placeholder: "Buscar por nome, WhatsApp ou email",
			value: search,
			onChange: (e) => setSearch(e.target.value),
			className: "mb-4 max-w-sm"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
			head: [
				"Nome",
				"WhatsApp",
				"Email",
				"Ativações",
				"Status",
				"Desde",
				""
			],
			empty: rows.length === 0,
			children: rows.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, {
					className: "font-medium",
					children: c.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: `https://wa.me/${(c.whatsapp ?? "").replace(/\D/g, "")}`,
					target: "_blank",
					rel: "noreferrer",
					className: "text-primary",
					children: c.whatsapp
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: c.email ?? "—" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: c.activations }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { s: c.status }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: fmtDate(c.created_at) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: "secondary",
					onClick: () => edit(c),
					children: "Editar"
				}) })
			] }, c.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: !!form,
			onOpenChange: (o) => !o && setForm(null),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: form?.id ? "Editar cliente" : "Novo cliente" }) }), form && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: submit,
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Nome",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: form.name,
							onChange: (e) => setForm({
								...form,
								name: e.target.value
							}),
							required: true
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "WhatsApp",
						hint: "DDI + DDD + número, só dígitos. Ex: 5511999999999",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: form.whatsapp,
							onChange: (e) => setForm({
								...form,
								whatsapp: e.target.value.replace(/\D/g, "")
							}),
							required: true
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Email (opcional)",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "email",
							value: form.email,
							onChange: (e) => setForm({
								...form,
								email: e.target.value
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Observações",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							value: form.notes,
							onChange: (e) => setForm({
								...form,
								notes: e.target.value
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Status",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							className: "flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
							value: form.status,
							onChange: (e) => setForm({
								...form,
								status: e.target.value
							}),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "ativo",
									children: "Ativo"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "inativo",
									children: "Inativo"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "bloqueado",
									children: "Bloqueado"
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						variant: "hero",
						className: "w-full",
						children: "Salvar"
					})
				]
			})] })
		})
	] });
}
//#endregion
export { Clientes as component };
