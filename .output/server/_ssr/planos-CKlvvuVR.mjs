import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { a as Trigger2, i as Root2, n as Header, r as Item, t as Content2, v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as Button } from "./button-CTmx8QDF.mjs";
import { n as useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { i as brl, n as SiteFooter, r as SiteHeader } from "./brand-DsXviQDH.mjs";
import { D as ChevronDown, O as Check, g as MessageCircle } from "../_libs/lucide-react.mjs";
import { t as catalogQuery } from "./planos-BYVmd1VK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/planos-CKlvvuVR.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Accordion = Root2;
var AccordionItem = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
	ref,
	className: cn("border-b", className),
	...props
}));
AccordionItem.displayName = "AccordionItem";
var AccordionTrigger = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
	className: "flex",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Trigger2, {
		ref,
		className: cn("flex flex-1 items-center justify-between py-4 text-sm font-medium cursor-pointer transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" })]
	})
}));
AccordionTrigger.displayName = Trigger2.displayName;
var AccordionContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("pb-4 pt-0", className),
		children
	})
}));
AccordionContent.displayName = Content2.displayName;
var faq = [
	["O MAXON PLAY vem com canais?", "Não. O MAXON PLAY é apenas o player. Você usa listas M3U ou credenciais Xtream que já tem direito de usar, fornecidas pelo seu provedor autorizado."],
	["Como ativo na TV?", "Instale o app, abra-o e anote o Device ID exibido. Depois digite a KEY recebida após a compra. A ativação é imediata."],
	["Funciona em quantos aparelhos?", "Cada KEY ativa 1 dispositivo. Precisa trocar de aparelho? Fale com o suporte."],
	["Quais aparelhos são compatíveis?", "Android TV / TV Box, Samsung Smart TV (Tizen) e navegador (Web Player)."],
	["A lista pode ser configurada para mim?", "Sim. Se seu provedor autorizado enviar os dados ao suporte, a lista é carregada automaticamente na TV após a ativação."]
];
function Planos() {
	const { data } = useSuspenseQuery(catalogQuery);
	const buy = (plan) => {
		const msg = (data.whatsappMessage || "Olá! Quero o plano {plano}.").replace("{plano}", plan);
		const digits = data.whatsapp.replace(/\D/g, "");
		return digits.length >= 10 ? `https://wa.me/${digits}?text=${encodeURIComponent(msg)}` : void 0;
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-hero",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto max-w-5xl px-4 py-16",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "text-4xl font-extrabold md:text-5xl",
							children: ["Escolha seu ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-brand",
								children: "plano"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-muted-foreground",
							children: "Pagamento único. Ativação na hora pelo WhatsApp."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-12 grid gap-6 md:grid-cols-2",
						children: data.plans.map((p) => {
							const monthly = p.duration_days >= 300 ? p.price_cents / 12 : null;
							const href = buy(p.name);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `relative flex flex-col rounded-3xl border bg-card p-8 ${p.highlight ? "border-primary shadow-glow" : "border-border"}`,
								children: [
									p.highlight && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "absolute -top-3 left-8 rounded-full bg-brand px-3 py-1 text-xs font-bold text-primary-foreground",
										children: "Mais vantajoso"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-2xl font-bold",
										children: p.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-sm text-muted-foreground",
										children: p.description
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-6 font-display text-5xl font-extrabold",
										children: brl(p.price_cents)
									}),
									monthly && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-sm text-primary",
										children: [
											"equivale a ",
											brl(Math.round(monthly)),
											"/mês"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
										className: "mt-6 space-y-2 text-sm",
										children: [
											"1 dispositivo",
											`${p.duration_days} dias de acesso`,
											"Android TV, Tizen e Web",
											"Suporte via WhatsApp"
										].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4 text-success" }), t]
										}, t))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-8 flex-1" }),
									href ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										asChild: true,
										variant: "hero",
										size: "xl",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
											href,
											target: "_blank",
											rel: "noopener noreferrer",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, {}), "Comprar agora"]
										})
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "secondary",
										size: "xl",
										disabled: true,
										children: "WhatsApp não configurado"
									})
								]
							}, p.id);
						})
					}),
					data.supportHours && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-6 text-center text-sm text-muted-foreground",
						children: ["Atendimento: ", data.supportHours]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mx-auto mt-20 max-w-3xl",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mb-6 text-center text-3xl font-bold",
							children: "Perguntas frequentes"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Accordion, {
							type: "single",
							collapsible: true,
							className: "rounded-2xl border border-border bg-card px-6",
							children: faq.map(([q, a]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionItem, {
								value: q,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionTrigger, {
									className: "text-left",
									children: q
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionContent, {
									className: "text-muted-foreground",
									children: a
								})]
							}, q))
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { Planos as component };
