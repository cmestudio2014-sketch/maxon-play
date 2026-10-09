import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { t as Button } from "./button-CTmx8QDF.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { a as fmtDate, n as SiteFooter, o as fmtDateTime, r as SiteHeader } from "./brand-DsXviQDH.mjs";
import { n as lookupLicense } from "./public.functions-BNt73a9n.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cliente-BUw0ZkWr.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Cliente() {
	const lookup = useServerFn(lookupLicense);
	const [key, setKey] = (0, import_react.useState)("");
	const [lic, setLic] = (0, import_react.useState)(null);
	const [err, setErr] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const submit = async (e) => {
		e.preventDefault();
		setBusy(true);
		setErr(null);
		try {
			const r = await lookup({ data: { key } });
			if (r.ok) setLic(r.license);
			else {
				setLic(null);
				setErr(r.error);
			}
		} catch {
			setErr("Verifique a KEY digitada.");
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
						children: "Minha conta"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-muted-foreground",
						children: "Digite sua KEY para ver a validade e o aparelho vinculado."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: submit,
						className: "mt-8 flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: key,
							onChange: (e) => setKey(e.target.value.toUpperCase()),
							placeholder: "XXXX-XXXX-XXXX-XXXX",
							className: "h-12 font-mono"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							variant: "hero",
							size: "lg",
							disabled: busy || key.length < 16,
							children: "Consultar"
						})]
					}),
					err && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-destructive",
						children: err
					}),
					lic && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 space-y-4 rounded-3xl border border-border bg-card p-8",
						children: [
							lic.customer && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-lg",
								children: ["Olá, ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: lic.customer })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: "KEY",
								v: lic.key
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: "Plano",
								v: lic.plan
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: "Status",
								v: lic.status
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: "Válido até",
								v: fmtDate(lic.expires_at)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", { className: "border-border" }),
							lic.device ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									k: "Dispositivo",
									v: lic.device.id
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									k: "Plataforma",
									v: `${lic.device.platform ?? ""} ${lic.device.model ?? ""}`
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									k: "Última conexão",
									v: fmtDateTime(lic.device.last_seen_at)
								})
							] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted-foreground",
								children: "Nenhum dispositivo vinculado ainda."
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
var Row = ({ k, v }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
	className: "flex justify-between gap-4",
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "text-muted-foreground",
		children: k
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "font-medium",
		children: v
	})]
});
//#endregion
export { Cliente as component };
