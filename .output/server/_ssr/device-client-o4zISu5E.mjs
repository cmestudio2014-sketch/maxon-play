//#region node_modules/.nitro/vite/services/ssr/assets/device-client-o4zISu5E.js
var UID_KEY = "maxon.device_uid";
var TOKEN_KEY = "maxon.device_token";
function deviceUid() {
	let id = localStorage.getItem(UID_KEY);
	if (!id) {
		id = `web-${crypto.randomUUID()}`;
		localStorage.setItem(UID_KEY, id);
	}
	return id;
}
async function call(path, init = {}) {
	const token = sessionStorage.getItem(TOKEN_KEY);
	const res = await fetch(`/api/v1${path}`, {
		...init,
		headers: {
			"Content-Type": "application/json",
			...token ? { Authorization: `Bearer ${token}` } : {},
			...init.headers ?? {}
		}
	});
	const body = await res.json().catch(() => null);
	if (!body?.ok) throw Object.assign(new Error(body?.error?.message ?? "Falha de comunicação."), {
		code: body?.error?.code ?? "NETWORK",
		status: res.status
	});
	return body.data;
}
async function register() {
	const d = await call("/device/register", {
		method: "POST",
		body: JSON.stringify({
			device_uid: deviceUid(),
			platform: "web",
			model: navigator.userAgent.slice(0, 60),
			app_version: "web-1.0"
		})
	});
	if (d.token) sessionStorage.setItem(TOKEN_KEY, d.token);
	return d;
}
async function activate(key) {
	return call("/activation/activate", {
		method: "POST",
		body: JSON.stringify({ key })
	});
}
async function heartbeat() {
	try {
		const d = await call("/device/heartbeat", {
			method: "POST",
			body: "{}"
		});
		if (d.token) sessionStorage.setItem(TOKEN_KEY, d.token);
		return d;
	} catch (e) {
		if (e.status === 401) return register();
		throw e;
	}
}
async function fetchConfig() {
	return call("/device/config");
}
//#endregion
export { register as i, fetchConfig as n, heartbeat as r, activate as t };
