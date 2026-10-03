import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Button } from "./button-CTmx8QDF.mjs";
import { n as SiteFooter, r as SiteHeader } from "./brand-DsXviQDH.mjs";
import { c as ShieldCheck, h as MonitorPlay, i as Tv, y as KeyRound } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-C8iipSYK.js
var import_jsx_runtime = require_jsx_runtime();
var features = [
	{
		icon: Tv,
		title: "Feito para a TV",
		text: "Navegação por controle remoto, cards grandes e leitura confortável no sofá."
	},
	{
		icon: KeyRound,
		title: "Ativação por KEY",
		text: "Abra o app, veja seu Device ID e digite a KEY. Pronto."
	},
	{
		icon: MonitorPlay,
		title: "Suas listas",
		text: "M3U ou Xtream Codes do seu provedor autorizado — a lista pode chegar sozinha na TV."
	},
	{
		icon: ShieldCheck,
		title: "Seguro",
		text: "Credenciais criptografadas e entregues apenas ao aparelho licenciado."
	}
];
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-hero",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto max-w-6xl px-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "py-20 md:py-28",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-4 inline-flex rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground",
							children: "Android TV · Samsung Tizen · Web"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "max-w-3xl text-5xl font-extrabold leading-[1.05] md:text-7xl",
							children: ["Sua TV, do seu jeito. ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-brand",
								children: "MAXON PLAY."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 max-w-xl text-lg text-muted-foreground",
							children: "Um player rápido e bonito para as listas que você já tem direito de assistir. Sem canais embutidos, sem complicação."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-10 flex flex-wrap gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "hero",
								size: "xl",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/planos",
									children: "Ver planos"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "secondary",
								size: "xl",
								className: "tv-focus",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/ativar",
									children: "Ativar dispositivo"
								})
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "grid gap-4 pb-24 sm:grid-cols-2 lg:grid-cols-4",
					children: features.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-border bg-card/70 p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(f.icon, { className: "h-7 w-7 text-primary" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-4 text-lg font-semibold",
								children: f.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: f.text
							})
						]
					}, f.title))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { Home as component };
