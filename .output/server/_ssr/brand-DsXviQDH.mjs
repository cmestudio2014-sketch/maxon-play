import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/brand-DsXviQDH.js
var import_jsx_runtime = require_jsx_runtime();
function Logo({ className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: `inline-flex items-center gap-2 font-display font-extrabold tracking-tight ${className}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "grid h-8 w-8 place-items-center rounded-lg bg-brand text-primary-foreground",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
				viewBox: "0 0 24 24",
				className: "h-4 w-4",
				fill: "currentColor",
				"aria-hidden": true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M8 5v14l11-7z" })
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["MAXON", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-brand",
			children: " PLAY"
		})] })]
	});
}
function SiteHeader() {
	const link = "rounded-lg px-3 py-2 text-sm text-muted-foreground hover:text-foreground tv-focus";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-16 max-w-6xl items-center justify-between px-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: "tv-focus rounded-lg",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { className: "text-lg" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "flex items-center gap-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/planos",
						className: link,
						activeProps: { className: "text-foreground" },
						children: "Planos"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/ativar",
						className: link,
						activeProps: { className: "text-foreground" },
						children: "Ativar"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/cliente",
						className: link,
						activeProps: { className: "text-foreground" },
						children: "Minha conta"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/player",
						className: link,
						activeProps: { className: "text-foreground" },
						children: "Web Player"
					})
				]
			})]
		})
	});
}
function SiteFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "border-t border-border py-8 text-center text-xs text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "MAXON PLAY é um player. Não fornecemos canais, filmes, listas ou servidores — use apenas conteúdo autorizado." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/admin",
				className: "hover:text-foreground",
				children: "Área administrativa"
			})
		})]
	});
}
var brl = (cents) => (cents / 100).toLocaleString("pt-BR", {
	style: "currency",
	currency: "BRL"
});
var fmtDate = (d) => d ? new Date(d).toLocaleDateString("pt-BR") : "—";
var fmtDateTime = (d) => d ? new Date(d).toLocaleString("pt-BR", {
	dateStyle: "short",
	timeStyle: "short"
}) : "—";
//#endregion
export { fmtDate as a, brl as i, SiteFooter as n, fmtDateTime as o, SiteHeader as r, Logo as t };
