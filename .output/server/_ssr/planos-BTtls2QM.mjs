import { t as queryOptions } from "../_libs/tanstack__react-query.mjs";
import { t as getPublicCatalog } from "./public.functions-Ug-mCXtr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/planos-BTtls2QM.js
var catalogQuery = queryOptions({
	queryKey: ["catalog"],
	queryFn: () => getPublicCatalog()
});
//#endregion
export { catalogQuery as t };
