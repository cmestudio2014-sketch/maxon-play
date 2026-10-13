import { _ as createFileRoute, g as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as getSession } from "./admin.functions-B14al4zO.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-D-VI0uzP.js
var $$splitNotFoundComponentImporter = () => import("./admin-XSFcTZjy2.mjs");
var $$splitErrorComponentImporter = () => import("./admin-dRt9Haal.mjs");
var $$splitComponentImporter = () => import("./admin-g80qGev3.mjs");
var Route = createFileRoute("/admin")({
	head: () => ({ meta: [
		{ title: "Painel — MAXON PLAY" },
		{
			name: "description",
			content: "Painel administrativo e de vendas MAXON PLAY."
		},
		{
			property: "og:title",
			content: "Painel MAXON PLAY"
		},
		{
			property: "og:description",
			content: "Gestão de clientes, ativações e vendas."
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	loader: () => getSession(),
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent"),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent")
});
//#endregion
export { Route as t };
