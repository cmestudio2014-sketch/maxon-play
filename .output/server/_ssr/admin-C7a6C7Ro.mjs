import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { b as useRouter, h as Outlet, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { P as setupFirstAdmin, S as logout, x as login } from "./admin.functions-DZ71ovy-.mjs";
import { t as Route } from "./admin-BfZA5_gW.mjs";
import { t as Button } from "./button-CTmx8QDF.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { n as Field, o as friendly } from "./admin-ui-C_f-BTaD.mjs";
import { t as Logo } from "./brand-DsXviQDH.mjs";
import { _ as LogOut, a as Ticket, d as ScrollText, k as ChartColumn, l as Settings, m as MonitorSmartphone, n as Users, o as Tag, r as UserCog, s as ShoppingCart, v as ListVideo, y as KeyRound } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-C7a6C7Ro.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var nav = [
	{
		to: "/admin",
		label: "Dashboard",
		icon: ChartColumn,
		exact: true
	},
	{
		to: "/admin/clientes",
		label: "Clientes",
		icon: Users
	},
	{
		to: "/admin/dispositivos",
		label: "Dispositivos",
		icon: MonitorSmartphone
	},
	{
		to: "/admin/ativacoes",
		label: "Ativações",
		icon: KeyRound
	},
	{
		to: "/admin/fontes",
		label: "Fontes / Listas",
		icon: ListVideo
	},
	{
		to: "/admin/vendas",
		label: "Vendas",
		icon: ShoppingCart
	},
	{
		to: "/admin/planos",
		label: "Planos",
		icon: Tag,
		admin: true
	},
	{
		to: "/admin/cupons",
		label: "Cupons",
		icon: Ticket,
		admin: true
	},
	{
		to: "/admin/usuarios",
		label: "Usuários",
		icon: UserCog,
		admin: true
	},
	{
		to: "/admin/configuracoes",
		label: "Configurações",
		icon: Settings,
		admin: true
	},
	{
		to: "/admin/auditoria",
		label: "Auditoria",
		icon: ScrollText,
		admin: true
	}
];
function AdminLayout() {
	const { user, setupAllowed } = Route.useLoaderData();
	const router = useRouter();
	const doLogout = useServerFn(logout);
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminLogin, { setupAllowed });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar p-4 md:flex",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "mb-6 px-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "flex-1 space-y-1 overflow-y-auto",
					children: nav.filter((n) => !("admin" in n) || user.role === "admin").map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: n.to,
						activeOptions: { exact: "exact" in n },
						className: "flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
						activeProps: { className: "bg-sidebar-accent text-primary" },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(n.icon, { className: "h-4 w-4" }), n.label]
					}, n.to))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 border-t border-sidebar-border pt-4 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate font-medium",
							children: user.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: user.role
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "ghost",
							size: "sm",
							className: "mt-2 w-full justify-start",
							onClick: async () => {
								await doLogout();
								await router.invalidate();
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, {}), "Sair"]
						})
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex-1 overflow-x-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "flex gap-1 overflow-x-auto border-b border-border p-2 md:hidden",
				children: nav.filter((n) => !("admin" in n) || user.role === "admin").map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: n.to,
					activeOptions: { exact: "exact" in n },
					className: "whitespace-nowrap rounded-md px-3 py-1.5 text-xs",
					activeProps: { className: "bg-secondary text-primary" },
					children: n.label
				}, n.to))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "p-4 md:p-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
			})]
		})]
	});
}
function AdminLogin({ setupAllowed }) {
	const router = useRouter();
	const doLogin = useServerFn(login);
	const doSetup = useServerFn(setupFirstAdmin);
	const [f, setF] = (0, import_react.useState)({
		name: "",
		email: "",
		password: ""
	});
	const [err, setErr] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const submit = async (e) => {
		e.preventDefault();
		setBusy(true);
		setErr(null);
		try {
			const r = setupAllowed ? await doSetup({ data: f }) : await doLogin({ data: {
				email: f.email,
				password: f.password
			} });
			if (!r.ok) setErr(r.error);
			else await router.invalidate();
		} catch (e) {
			setErr(friendly(e));
		} finally {
			setBusy(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-screen place-items-center bg-hero px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: submit,
			className: "w-full max-w-sm space-y-4 rounded-3xl border border-border bg-card p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { className: "text-xl" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-bold",
					children: setupAllowed ? "Criar primeiro administrador" : "Entrar no painel"
				}),
				setupAllowed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: "Nenhum admin existe ainda. Em produção, o admin é criado por ADMIN_EMAIL/ADMIN_PASSWORD."
				}),
				setupAllowed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Nome",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: f.name,
						onChange: (e) => setF({
							...f,
							name: e.target.value
						}),
						required: true
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
						}),
						required: true,
						autoComplete: "username"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Senha",
					...setupAllowed ? { hint: "Mínimo 10 caracteres" } : {},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "password",
						value: f.password,
						onChange: (e) => setF({
							...f,
							password: e.target.value
						}),
						required: true,
						autoComplete: setupAllowed ? "new-password" : "current-password"
					})
				}),
				err && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-destructive",
					children: err
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					variant: "hero",
					size: "lg",
					className: "w-full",
					disabled: busy,
					children: busy ? "Aguarde…" : setupAllowed ? "Criar e entrar" : "Entrar"
				})
			]
		})
	});
}
//#endregion
export { AdminLayout as component };
