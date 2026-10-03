import { l as createServerFn } from "./createServerFn-DDDJMFWM.mjs";
import { t as createSsrRpc } from "./createSsrRpc-B28PUaCx.mjs";
import { a as objectType, i as numberType, n as enumType, o as stringType, r as literalType, s as unionType, t as booleanType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.functions-DkikgWna.js
var uuid = stringType().uuid();
var getSession = createServerFn({ method: "GET" }).handler(createSsrRpc("dc54eae1edc361315022ee97c40ae4ea0f12ea2cc904d1487c081fb538f9c5b6"));
var login = createServerFn({ method: "POST" }).inputValidator((d) => objectType({
	email: stringType().email().max(120),
	password: stringType().min(1).max(200)
}).parse(d)).handler(createSsrRpc("7a264258ea05d71b79dac878d9ffb746a26219259b8e3fa8f01dfd039abab085"));
var setupFirstAdmin = createServerFn({ method: "POST" }).inputValidator((d) => objectType({
	name: stringType().min(2).max(80),
	email: stringType().email().max(120),
	password: stringType().min(10).max(200)
}).parse(d)).handler(createSsrRpc("4006b4dc89298c141643adcbf1246f8704810cd6d97933528ee240acb1149e32"));
var logout = createServerFn({ method: "POST" }).handler(createSsrRpc("7c22a38a244b147aa46b746e87c79c3b801ae277b30fe90addd051105f42ea6a"));
var getDashboard = createServerFn({ method: "GET" }).handler(createSsrRpc("11e6a2fd1fff029943bfdcd8ae9d8192cd136468d209063ff1004e8c8e147db6"));
var listCustomers = createServerFn({ method: "GET" }).handler(createSsrRpc("bbbc6bac537dd93f6b1643dc038c6fb8fcc130edf741772fb605f18dd1b4445f"));
var CustomerInput = objectType({
	id: uuid.optional(),
	name: stringType().trim().min(2).max(100),
	whatsapp: stringType().trim().regex(/^\+?\d{10,15}$/, "WhatsApp com DDI+DDD, só números"),
	email: stringType().trim().email().max(120).or(literalType("")).optional(),
	notes: stringType().max(1e3).default(""),
	status: enumType([
		"ativo",
		"inativo",
		"bloqueado"
	]).default("ativo")
});
var saveCustomer = createServerFn({ method: "POST" }).inputValidator((d) => CustomerInput.parse(d)).handler(createSsrRpc("1f1b8b0281a452d5a0a06cc6fc7ebe7bc1a66f8145c45061f67b57c73dde3fa6"));
var listDevices = createServerFn({ method: "GET" }).handler(createSsrRpc("37a6697a58f4b78e4e732d516574cb4b3ad109823d3ca0c4b4cbf1943545c1c4"));
var setDeviceStatus = createServerFn({ method: "POST" }).inputValidator((d) => objectType({
	id: uuid,
	status: enumType(["ativo", "bloqueado"])
}).parse(d)).handler(createSsrRpc("feee79c3c19e7f1350dbe0859ae3f43d11013733558e7d54eae0dbb634c83b2a"));
var listActivations = createServerFn({ method: "GET" }).handler(createSsrRpc("ee411b1eb65902ff1a3d14e18ead7a6f3a825780124da48f83f8ff27ac736213"));
var createActivation = createServerFn({ method: "POST" }).inputValidator((d) => objectType({
	customer_id: uuid.nullable(),
	plan_id: uuid,
	start_now: booleanType().default(false),
	source_id: uuid.nullable().default(null)
}).parse(d)).handler(createSsrRpc("73aa50d19eda8d7231756aaad8018530cc19a6735ca1b5f0bafa44a1801ac7a8"));
var renewActivation = createServerFn({ method: "POST" }).inputValidator((d) => objectType({
	id: uuid,
	days: unionType([literalType(30), literalType(365)])
}).parse(d)).handler(createSsrRpc("928a9dc207cd4930e7d245b3bec8819c14892795788ac73abd566055fdddfd8f"));
var setActivationBlocked = createServerFn({ method: "POST" }).inputValidator((d) => objectType({
	id: uuid,
	blocked: booleanType()
}).parse(d)).handler(createSsrRpc("ebeed6f1e1a2be64b1e0eeb709267ada0ae50e4fe6eb0f5af14ebc11ec7672a0"));
var changeActivationDevice = createServerFn({ method: "POST" }).inputValidator((d) => objectType({
	id: uuid,
	display_id: stringType().trim().max(40).nullable(),
	reason: stringType().trim().min(3).max(300)
}).parse(d)).handler(createSsrRpc("284b4d861652f7bb13bde556ebbb8d8ed3780d9f2b9c1cdf3306fec0dda6c880"));
var regenerateKey = createServerFn({ method: "POST" }).inputValidator((d) => objectType({ id: uuid }).parse(d)).handler(createSsrRpc("efae2cba8bf6b240421334393f5e5214577db6dc7df6dddbcd35b4da7a2bf011"));
var listPlans = createServerFn({ method: "GET" }).handler(createSsrRpc("6a4c15486b3510a7d503ea724d6da07ff761e5ad6f5d15d78fbf29f03da824a7"));
var savePlan = createServerFn({ method: "POST" }).inputValidator((d) => objectType({
	id: uuid.optional(),
	code: stringType().trim().regex(/^[a-z0-9-]{2,30}$/),
	name: stringType().trim().min(2).max(40),
	description: stringType().max(300).default(""),
	duration_days: numberType().int().min(1).max(3650),
	price_cents: numberType().int().min(0).max(1e7),
	highlight: booleanType(),
	active: booleanType(),
	sort: numberType().int().min(0).max(999)
}).parse(d)).handler(createSsrRpc("5f1d95ccfc76f6049488a31da4444963902deebaf99d1eeec2578bb507452601"));
var listSales = createServerFn({ method: "GET" }).handler(createSsrRpc("cfec4b59a1c318a4e5dd66d8040166f8097da9a9e261071cceafdf956af5b6dc"));
var createSale = createServerFn({ method: "POST" }).inputValidator((d) => objectType({
	customer_id: uuid,
	plan_id: uuid,
	coupon_code: stringType().trim().max(30).optional(),
	payment_method: enumType([
		"pix",
		"dinheiro",
		"cartao",
		"transferencia",
		"outro"
	]),
	status: enumType(["pendente", "pago"])
}).parse(d)).handler(createSsrRpc("99802eb76ec666c3288b05c5dd6fade86646b81bbc11eb5c7eac9f56be96868b"));
var setSaleStatus = createServerFn({ method: "POST" }).inputValidator((d) => objectType({
	id: uuid,
	status: enumType([
		"pendente",
		"pago",
		"cancelado"
	]),
	generate_key: booleanType().default(false)
}).parse(d)).handler(createSsrRpc("a69b68940b33d587d1b0d4ed1ea45d3577206254f38fb9733390123c67913763"));
var listCoupons = createServerFn({ method: "GET" }).handler(createSsrRpc("5be0bc667c26e29e57bc08b777386155f5971b8e88aed68fb3ca925393a8ae81"));
var saveCoupon = createServerFn({ method: "POST" }).inputValidator((d) => objectType({
	id: uuid.optional(),
	code: stringType().trim().toUpperCase().regex(/^[A-Z0-9_-]{3,30}$/),
	percent_off: numberType().int().min(1).max(100),
	max_uses: numberType().int().min(1).nullable(),
	expires_at: stringType().nullable(),
	active: booleanType()
}).parse(d)).handler(createSsrRpc("7d200662f95d083d3ec6289006d6775af2f59f731bf9975c50d4270c46c9c00e"));
var listUsers = createServerFn({ method: "GET" }).handler(createSsrRpc("ae1d531e1714d053869d1e069815a71e199346ef621d80ab0f46be85080718ab"));
var saveUser = createServerFn({ method: "POST" }).inputValidator((d) => objectType({
	id: uuid.optional(),
	name: stringType().trim().min(2).max(80),
	email: stringType().trim().email().max(120),
	role: enumType(["admin", "vendedor"]),
	active: booleanType(),
	password: stringType().min(10).max(200).optional().or(literalType(""))
}).parse(d)).handler(createSsrRpc("e80a7ac87c9a302fc9a7840d3333e8cff0e60218c059c3681396154d351abd97"));
var getSettingsAdmin = createServerFn({ method: "GET" }).handler(createSsrRpc("c58b4c11eb85c44781657b98c3a546fdabeb9514fe85c2963a862aef7e654007"));
var saveSettings = createServerFn({ method: "POST" }).inputValidator((d) => objectType({
	brand_name: stringType().trim().min(2).max(40),
	whatsapp_number: stringType().trim().regex(/^(\d{10,15})?$/, "Somente números com DDI (ex: 5511999999999)"),
	whatsapp_message: stringType().trim().max(300),
	support_hours: stringType().trim().max(80)
}).parse(d)).handler(createSsrRpc("4fd75b29b7e95d89fa1c14c63821ab2c1ba9b2c0d3915ece8fe8ff7e18fe35cb"));
var listAudit = createServerFn({ method: "GET" }).handler(createSsrRpc("467f84d6d531fdce76f0581f425531ca1e810bf08231fdda18eb058ea8dfbac5"));
var listSources = createServerFn({ method: "GET" }).handler(createSsrRpc("efd96b6bfc7cd77f8b9591c31b08ea5613ac244e8aee4ef2a5bbb26fb1f24ffd"));
var httpUrl = stringType().trim().url().max(500).refine((u) => /^https?:\/\//i.test(u), "Use http(s)://");
var saveSource = createServerFn({ method: "POST" }).inputValidator((d) => objectType({
	id: uuid.optional(),
	name: stringType().trim().min(2).max(80),
	type: enumType(["m3u", "xtream"]),
	customer_id: uuid.nullable(),
	m3u_url: httpUrl.optional().or(literalType("")),
	epg_url: httpUrl.optional().or(literalType("")),
	server: httpUrl.optional().or(literalType("")),
	username: stringType().trim().max(120).optional(),
	password: stringType().max(200).optional()
}).parse(d)).handler(createSsrRpc("bcfa4267e66ec3a19ad39d421b6708fe9015f6f27785bab1b16ad2c1162b64e9"));
var deleteSource = createServerFn({ method: "POST" }).inputValidator((d) => objectType({ id: uuid }).parse(d)).handler(createSsrRpc("49b12827469d696a322522d244d8b7f467ee584ed3dc5228a225e118af83c8ac"));
/** Fonte atribuída à ativação ou ao aparelho. source_id null = remover. O app sincroniza no próximo heartbeat. */
var assignSource = createServerFn({ method: "POST" }).inputValidator((d) => objectType({
	target: enumType(["activation", "device"]),
	id: uuid,
	source_id: uuid.nullable()
}).parse(d)).handler(createSsrRpc("1d5c59ed6c4ec656ddd06fd43ec0a9e8f59495143e31696bcf2d7def517b367b"));
/** "Sincronizar no aparelho": força nova config_version para o app recarregar a lista. */
var forceSync = createServerFn({ method: "POST" }).inputValidator((d) => objectType({
	target: enumType(["activation", "device"]),
	id: uuid
}).parse(d)).handler(createSsrRpc("df8b4326699fdbf0d6dc3c19070d34e75baf9b8d224f4649b3039284e2d4c51f"));
//#endregion
export { setDeviceStatus as A, saveCoupon as C, saveSource as D, saveSettings as E, setupFirstAdmin as M, saveUser as O, renewActivation as S, savePlan as T, listSources as _, deleteSource as a, logout as b, getSession as c, listAudit as d, listCoupons as f, listSales as g, listPlans as h, createSale as i, setSaleStatus as j, setActivationBlocked as k, getSettingsAdmin as l, listDevices as m, changeActivationDevice as n, forceSync as o, listCustomers as p, createActivation as r, getDashboard as s, assignSource as t, listActivations as u, listUsers as v, saveCustomer as w, regenerateKey as x, login as y };
