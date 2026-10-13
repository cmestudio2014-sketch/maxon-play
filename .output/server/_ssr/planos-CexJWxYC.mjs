import { t as queryOptions } from "../_libs/tanstack__react-query.mjs";
import { t as getPublicCatalog } from "./public.functions-2o6Z5LM0.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/planos-CexJWxYC.js
var catalogQuery = queryOptions({
	queryKey: ["catalog"],
	queryFn: () => getPublicCatalog()
});
//#endregion
export { catalogQuery as t };
