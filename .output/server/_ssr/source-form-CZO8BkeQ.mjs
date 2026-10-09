import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { k as saveSource } from "./admin.functions-DZ71ovy-.mjs";
import { t as Button } from "./button-CTmx8QDF.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { c as useAction, n as Field, s as selectCls } from "./admin-ui-C_f-BTaD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/source-form-CZO8BkeQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Cadastro/edição de fonte autorizada. Dados salvos nunca voltam ao navegador — em branco = manter. */
function SourceForm({ source, customerId, customers, onSaved, onCancel }) {
	const save = useServerFn(saveSource);
	const act = useAction();
	const editing = !!source;
	const [cust, setCust] = (0, import_react.useState)(source?.customer_id ?? customerId ?? null);
	const [f, setF] = (0, import_react.useState)({
		name: source?.name ?? "",
		type: source?.type ?? "m3u",
		m3u_url: "",
		epg_url: "",
		server: "",
		username: "",
		password: ""
	});
	const keep = editing ? "Deixe em branco para manter o valor salvo" : void 0;
	const submit = async () => {
		const r = await act(save({ data: {
			...source ? { id: source.id } : {},
			...f,
			customer_id: cust
		} }), "Fonte salva (criptografada).", [
			"sources",
			"activations",
			"devices"
		]);
		if (r) onSaved(r.id);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-lg bg-accent p-3 text-xs text-accent-foreground",
				children: "Use apenas listas/credenciais autorizadas fornecidas pelo cliente ou provedor licenciado."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Nome interno",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: f.name,
					onChange: (e) => setF({
						...f,
						name: e.target.value
					}),
					placeholder: "Ex: Lista do cliente Ana"
				})
			}),
			customers && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Cliente (opcional)",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					className: "flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
					value: cust ?? "",
					onChange: (e) => setCust(e.target.value || null),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "",
						children: "— nenhum —"
					}), customers.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: c.id,
						children: c.name
					}, c.id))]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Tipo",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					className: selectCls,
					value: f.type,
					onChange: (e) => setF({
						...f,
						type: e.target.value
					}),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "m3u",
						children: "URL M3U autorizada"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "xtream",
						children: "Xtream Codes"
					})]
				})
			}),
			f.type === "m3u" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "URL M3U",
				...keep ? { hint: keep } : {},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					type: "url",
					value: f.m3u_url,
					onChange: (e) => setF({
						...f,
						m3u_url: e.target.value
					}),
					placeholder: "https://provedor-autorizado/lista.m3u",
					autoComplete: "off"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "URL EPG (opcional)",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					type: "url",
					value: f.epg_url,
					onChange: (e) => setF({
						...f,
						epg_url: e.target.value
					}),
					autoComplete: "off"
				})
			})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Servidor",
					...keep ? { hint: keep } : {},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "url",
						value: f.server,
						onChange: (e) => setF({
							...f,
							server: e.target.value
						}),
						placeholder: "https://servidor-autorizado:porta",
						autoComplete: "off"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Usuário",
					...keep ? { hint: keep } : {},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: f.username,
						onChange: (e) => setF({
							...f,
							username: e.target.value
						}),
						autoComplete: "off"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Senha",
					...keep ? { hint: keep } : {},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "password",
						value: f.password,
						onChange: (e) => setF({
							...f,
							password: e.target.value
						}),
						autoComplete: "new-password"
					})
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "hero",
					className: "flex-1",
					disabled: f.name.trim().length < 2,
					onClick: submit,
					children: "Salvar fonte"
				}), onCancel && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					onClick: onCancel,
					children: "Cancelar"
				})]
			})
		]
	});
}
//#endregion
export { SourceForm as t };
