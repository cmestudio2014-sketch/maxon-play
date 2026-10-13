import { t as queryOptions } from "../_libs/tanstack__react-query.mjs";
import { t as getPublicCatalog } from "./public.functions-DXDU3K-G.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/planos-B2FADFtN.js
var catalogQuery = queryOptions({
	queryKey: ["catalog"],
	queryFn: () => getPublicCatalog()
});
//#endregion
export { catalogQuery as t };
