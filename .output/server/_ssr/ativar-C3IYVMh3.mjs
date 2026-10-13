import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Button } from "./button-CTmx8QDF.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as fmtDate, n as SiteFooter, r as SiteHeader } from "./brand-DsXviQDH.mjs";
import { i as register, t as activate } from "./device-client-o4zISu5E.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ativar-C3IYVMh3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Ativar() {
	const [dev, setDev] = (0, import_react.useState)(null);
	const [key, setKey] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [err, setErr] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		register().then(setDev).catch((e) => setErr(e.message));
	}, []);
	const onKey = (v) => {
		const c = v.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 16);
		setKey(c.replace(/(.{4})(?=.)/g, "$1-"));
	};
	const submit = async (e) => {
		e.preventDefault();
		setBusy(true);
		try {
			const d = await activate(key);
			setDev((p) => ({
				...p ?? d,
				...d
			}));
			toast.success("Dispositivo ativado!");
		} catch (e) {
			toast.error(e.message);
		} finally {
			setBusy(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-hero",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto max-w-2xl px-4 py-16",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-4xl font-extrabold",
						children: "Ativar dispositivo"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-muted-foreground",
						children: "Na TV, o app mostra esta mesma tela. Aqui você ativa o Web Player deste navegador."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 rounded-3xl border border-border bg-card p-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs uppercase tracking-widest text-muted-foreground",
								children: "MAC / Device ID"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 font-mono text-3xl font-bold tracking-wider text-primary md:text-4xl",
								children: dev?.device_id ?? (err ? "indisponível" : "carregando…")
							}),
							err && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-destructive",
								children: err
							}),
							dev?.status === "ativo" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-8 rounded-2xl bg-accent p-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-lg font-semibold text-accent-foreground",
										children: ["Ativo · ", dev.license?.plan]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-sm text-muted-foreground",
										children: [
											"Válido até ",
											fmtDate(dev.license?.expires_at),
											" (",
											dev.license?.days_left,
											" dias)"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										asChild: true,
										variant: "hero",
										size: "lg",
										className: "mt-4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/player",
											children: "Abrir Web Player"
										})
									})
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								onSubmit: submit,
								className: "mt-8 space-y-4",
								children: [
									dev && dev.status !== "nao_ativado" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-sm text-warning",
										children: ["Status atual: ", dev.status]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "block text-sm font-medium",
										htmlFor: "key",
										children: "KEY de ativação"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "key",
										value: key,
										onChange: (e) => onKey(e.target.value),
										placeholder: "XXXX-XXXX-XXXX-XXXX",
										className: "h-16 text-center font-mono text-2xl tracking-widest tv-focus",
										autoComplete: "off"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "submit",
										variant: "hero",
										size: "xl",
										className: "w-full",
										disabled: busy || key.length < 19 || !dev,
										children: busy ? "Ativando…" : "Ativar"
									})
								]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { Ativar as component };
