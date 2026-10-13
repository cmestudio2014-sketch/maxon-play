import { t as queryOptions } from "../_libs/tanstack__react-query.mjs";
import { t as getPublicCatalog } from "./public.functions-s2zw6Zgo.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/planos-CByTE3l-.js
var catalogQuery = queryOptions({
	queryKey: ["catalog"],
	queryFn: () => getPublicCatalog()
});
//#endregion
export { catalogQuery as t };
