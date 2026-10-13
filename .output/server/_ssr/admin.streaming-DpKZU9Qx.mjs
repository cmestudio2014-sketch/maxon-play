import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Button } from "./button-CTmx8QDF.mjs";
import { r as PageHeader } from "./admin-ui-C_f-BTaD.mjs";
import { O as Film, a as TvMinimal, d as ShieldCheck, v as Music2 } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.streaming-DpKZU9Qx.js
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Ativação de Streaming",
			desc: "Central de serviços e ativações de streaming do MAXON PLAY."
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
				children: "Área preparada para integração segura com o backend. Credenciais e tokens não serão expostos no navegador."
			})]
		})
	] });
}
//#endregion
export { Streaming as component };
