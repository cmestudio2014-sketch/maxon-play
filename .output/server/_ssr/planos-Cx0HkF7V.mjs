import { t as queryOptions } from "../_libs/tanstack__react-query.mjs";
import { t as getPublicCatalog } from "./public.functions-CFmWURzT.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/planos-Cx0HkF7V.js
var catalogQuery = queryOptions({
	queryKey: ["catalog"],
	queryFn: () => getPublicCatalog()
});
//#endregion
export { catalogQuery as t };
