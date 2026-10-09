import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { A as saveUser, b as listUsers } from "./admin.functions-DZ71ovy-.mjs";
import { t as Button } from "./button-CTmx8QDF.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { a as Td, c as useAction, i as StatusBadge, l as useAdminQuery, n as Field, r as PageHeader, t as DataTable } from "./admin-ui-C_f-BTaD.mjs";
import { o as fmtDateTime } from "./brand-DsXviQDH.mjs";
import { p as Plus } from "../_libs/lucide-react.mjs";
import { t as Switch } from "./switch-Cn1w-cIH.mjs";
import { i as DialogTitle, n as DialogContent, r as DialogHeader, t as Dialog } from "./dialog-B69u1cPq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.usuarios-SYpomu82.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Usuarios() {
	const list = useServerFn(listUsers);
	const save = useServerFn(saveUser);
	const act = useAction();
	const { data = [], error } = useAdminQuery("users", () => list());
	const [f, setF] = (0, import_react.useState)(null);
	const open = (u) => setF(u ? {
		id: u.id,
		name: u.name,
		email: u.email,
		role: u.role,
		active: u.active,
		password: ""
	} : {
		name: "",
		email: "",
		role: "vendedor",
		active: true,
		password: ""
	});
	const submit = async () => {
		if (!f) return;
		if (await act(save({ data: f }), "Usuário salvo.", ["users"])) setF(null);
	};
	if (error) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-destructive",
		children: error.message
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Usuários",
			desc: "Admin: acesso total. Vendedor: clientes, ativações, fontes e vendas.",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "hero",
				onClick: () => open(),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), "Novo usuário"]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
			head: [
				"Nome",
				"Email",
				"Papel",
				"Status",
				"Último login",
				""
			],
			children: data.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, {
					className: "font-medium",
					children: u.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: u.email }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, {
					className: "capitalize",
					children: u.role
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { s: u.active ? "ativo" : "inativo" }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: fmtDateTime(u.last_login_at) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: "secondary",
					onClick: () => open(u),
					children: "Editar"
				}) })
			] }, u.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: !!f,
			onOpenChange: (o) => !o && setF(null),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: f?.id ? "Editar usuário" : "Novo usuário" }) }), f && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
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
						label: "Email",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "email",
							value: f.email,
							onChange: (e) => setF({
								...f,
								email: e.target.value
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Papel",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							className: "flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
							value: f.role,
							onChange: (e) => setF({
								...f,
								role: e.target.value
							}),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "vendedor",
								children: "Vendedor"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "admin",
								children: "Admin"
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: f.id ? "Nova senha (opcional)" : "Senha",
						hint: "Mínimo 10 caracteres",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "password",
							value: f.password,
							onChange: (e) => setF({
								...f,
								password: e.target.value
							}),
							autoComplete: "new-password"
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
export { Usuarios as component };
