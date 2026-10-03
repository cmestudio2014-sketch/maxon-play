import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { E as saveSettings, l as getSettingsAdmin } from "./admin.functions-DkikgWna.mjs";
import { t as Button } from "./button-CTmx8QDF.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { c as useAction, l as useAdminQuery, n as Field, r as PageHeader } from "./admin-ui-C_f-BTaD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.configuracoes-Jljabnj0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Config() {
	const get = useServerFn(getSettingsAdmin);
	const save = useServerFn(saveSettings);
	const act = useAction();
	const { data } = useAdminQuery("settings", () => get());
	const [f, setF] = (0, import_react.useState)({
		brand_name: "",
		whatsapp_number: "",
		whatsapp_message: "",
		support_hours: ""
	});
	(0, import_react.useEffect)(() => {
		if (data) setF({
			brand_name: data["brand_name"] ?? "",
			whatsapp_number: data["whatsapp_number"] ?? "",
			whatsapp_message: data["whatsapp_message"] ?? "",
			support_hours: data["support_hours"] ?? ""
		});
	}, [data]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Configurações",
		desc: "Dados exibidos na página pública de planos."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-xl space-y-4 rounded-2xl border border-border bg-card p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Nome da marca",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: f.brand_name,
					onChange: (e) => setF({
						...f,
						brand_name: e.target.value
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "WhatsApp de vendas",
				hint: "Só números com DDI e DDD, ex: 5511999999999. Usado no botão Comprar agora.",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: f.whatsapp_number,
					onChange: (e) => setF({
						...f,
						whatsapp_number: e.target.value.replace(/\D/g, "")
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Mensagem padrão",
				hint: "Use {plano} para inserir o nome do plano.",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: f.whatsapp_message,
					onChange: (e) => setF({
						...f,
						whatsapp_message: e.target.value
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Horário de atendimento",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: f.support_hours,
					onChange: (e) => setF({
						...f,
						support_hours: e.target.value
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "hero",
				onClick: () => act(save({ data: f }), "Configurações salvas.", ["settings"]),
				children: "Salvar"
			})
		]
	})] });
}
//#endregion
export { Config as component };
