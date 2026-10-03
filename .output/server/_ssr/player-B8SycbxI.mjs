import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Button } from "./button-CTmx8QDF.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as fmtDate, t as Logo } from "./brand-DsXviQDH.mjs";
import { S as Film, b as House, f as RefreshCw, i as Tv, l as Settings, u as Search, w as Clapperboard, x as Heart } from "../_libs/lucide-react.mjs";
import { i as register, n as fetchConfig, r as heartbeat } from "./device-client-o4zISu5E.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/player-B8SycbxI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function parseM3U(text) {
	const lines = text.split(/\r?\n/);
	const out = [];
	let meta = null;
	for (const raw of lines) {
		const line = raw.trim();
		if (line.startsWith("#EXTINF")) {
			const attr = (k) => new RegExp(`${k}="([^"]*)"`).exec(line)?.[1];
			const logo = attr("tvg-logo");
			meta = {
				name: line.split(",").slice(1).join(",").trim() || "Sem nome",
				group: attr("group-title") || "Geral",
				...logo ? { logo } : {}
			};
		} else if (line && !line.startsWith("#") && meta) {
			const kind = /\/movie\//.test(line) ? "movie" : /\/series\//.test(line) ? "series" : "live";
			out.push({
				id: `${out.length}`,
				...meta,
				url: line,
				kind
			});
			meta = null;
		}
	}
	return out;
}
async function loadXtream(s) {
	const base = s.server.replace(/\/+$/, "");
	const api = async (action) => {
		const body = new URLSearchParams({
			username: s.username,
			password: s.password,
			action
		});
		let r = await fetch(`${base}/player_api.php`, {
			method: "POST",
			body
		}).catch(() => null);
		if (!r || !r.ok) r = await fetch(`${base}/player_api.php?${body.toString()}`);
		return await r.json();
	};
	const [lc, ls, vc, vs, sc, ss] = await Promise.all([
		api("get_live_categories"),
		api("get_live_streams"),
		api("get_vod_categories"),
		api("get_vod_streams"),
		api("get_series_categories"),
		api("get_series")
	]);
	const cat = (cs) => new Map(cs.map((c) => [c.category_id, c.category_name]));
	const lm = cat(lc), vm = cat(vc), sm = cat(sc);
	const u = encodeURIComponent(s.username), p = encodeURIComponent(s.password);
	return [
		...ls.map((x) => ({
			id: `l${x.stream_id}`,
			name: x.name,
			logo: x.stream_icon ?? "",
			group: lm.get(x.category_id) ?? "Geral",
			url: `${base}/live/${u}/${p}/${x.stream_id}.m3u8`,
			kind: "live"
		})),
		...vs.map((x) => ({
			id: `v${x.stream_id}`,
			name: x.name,
			logo: x.stream_icon ?? "",
			group: vm.get(x.category_id) ?? "Geral",
			url: `${base}/movie/${u}/${p}/${x.stream_id}.${x.container_extension ?? "mp4"}`,
			kind: "movie"
		})),
		...ss.map((x) => ({
			id: `s${x.series_id}`,
			name: x.name,
			logo: x.cover ?? "",
			group: sm.get(x.category_id) ?? "Geral",
			url: "",
			kind: "series"
		}))
	];
}
async function loadSource(src) {
	if (src.type === "m3u") {
		const r = await fetch(src.m3u_url);
		if (!r.ok) throw new Error(`Falha ao baixar a lista (${r.status}).`);
		return parseM3U(await r.text());
	}
	return loadXtream(src);
}
var MANUAL_KEY = "maxon.manual_source";
var FAV_KEY = "maxon.favorites";
function Player() {
	const [dev, setDev] = (0, import_react.useState)(null);
	const [source, setSource] = (0, import_react.useState)(null);
	const [managed, setManaged] = (0, import_react.useState)(false);
	const [items, setItems] = (0, import_react.useState)([]);
	const [tab, setTab] = (0, import_react.useState)("home");
	const [group, setGroup] = (0, import_react.useState)(null);
	const [q, setQ] = (0, import_react.useState)("");
	const [playing, setPlaying] = (0, import_react.useState)(null);
	const [favs, setFavs] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const version = (0, import_react.useRef)("");
	const apply = (0, import_react.useCallback)(async (src) => {
		setSource(src);
		setItems([]);
		if (!src) return;
		setLoading(true);
		try {
			setItems(await loadSource(src));
		} catch (e) {
			toast.error(`Não foi possível carregar a lista: ${e.message}`);
		} finally {
			setLoading(false);
		}
	}, []);
	const sync = (0, import_react.useCallback)(async (st) => {
		setDev(st);
		if (st.config_version === version.current) return;
		version.current = st.config_version;
		if (st.status === "ativo" && st.config_version !== "none") {
			const cfg = await fetchConfig();
			setManaged(true);
			toast.success("Lista atualizada pelo provedor.");
			await apply(cfg.source);
		} else {
			setManaged(false);
			const manual = localStorage.getItem(MANUAL_KEY);
			await apply(st.status === "ativo" && manual ? JSON.parse(manual) : null);
		}
	}, [apply]);
	(0, import_react.useEffect)(() => {
		setFavs(JSON.parse(localStorage.getItem(FAV_KEY) ?? "[]"));
		register().then(sync).catch((e) => toast.error(e.message));
		const t = setInterval(() => {
			heartbeat().then(sync).catch(() => void 0);
		}, 6e4);
		return () => clearInterval(t);
	}, [sync]);
	const toggleFav = (id) => {
		const next = favs.includes(id) ? favs.filter((f) => f !== id) : [...favs, id];
		setFavs(next);
		localStorage.setItem(FAV_KEY, JSON.stringify(next));
	};
	const visible = (0, import_react.useMemo)(() => {
		let list = items;
		if (tab === "live" || tab === "movie" || tab === "series") list = list.filter((i) => i.kind === tab);
		if (tab === "fav") list = list.filter((i) => favs.includes(i.id));
		if (tab === "search") list = q.length < 2 ? [] : list.filter((i) => i.name.toLowerCase().includes(q.toLowerCase()));
		if (group && tab !== "search") list = list.filter((i) => i.group === group);
		return list.slice(0, 300);
	}, [
		items,
		tab,
		favs,
		q,
		group
	]);
	const groups = (0, import_react.useMemo)(() => [...new Set(items.filter((i) => tab === "home" || i.kind === tab).map((i) => i.group))].slice(0, 80), [items, tab]);
	if (dev && dev.status !== "ativo") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-screen place-items-center bg-hero p-6 text-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { className: "text-2xl" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-lg",
					children: [
						"Este navegador ainda não está ativo (",
						dev.status,
						")."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-2xl text-primary",
					children: dev.device_id
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "hero",
					size: "xl",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/ativar",
						children: "Ativar com KEY"
					})
				})
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "flex w-20 shrink-0 flex-col items-center gap-2 border-r border-border bg-sidebar py-4 lg:w-56 lg:items-stretch lg:px-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-4 px-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { className: "hidden lg:inline-flex" })
			}), [
				[
					"home",
					"Início",
					House
				],
				[
					"live",
					"Live TV",
					Tv
				],
				[
					"movie",
					"Filmes",
					Film
				],
				[
					"series",
					"Séries",
					Clapperboard
				],
				[
					"fav",
					"Favoritos",
					Heart
				],
				[
					"search",
					"Busca",
					Search
				],
				[
					"settings",
					"Configurações",
					Settings
				]
			].map(([t, label, Icon]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => {
					setTab(t);
					setGroup(null);
				},
				className: `tv-focus flex items-center gap-3 rounded-xl px-3 py-3 text-sm ${tab === t ? "bg-sidebar-accent text-primary" : "text-sidebar-foreground/80 hover:bg-sidebar-accent"}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "hidden lg:inline",
					children: label
				})]
			}, t))]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "flex-1 overflow-x-hidden p-6",
			children: [playing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VideoPlayer, {
				item: playing,
				onClose: () => setPlaying(null)
			}), tab === "settings" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsPanel, {
				dev,
				managed,
				source,
				onManual: (s) => {
					localStorage.setItem(MANUAL_KEY, JSON.stringify(s));
					apply(s);
				},
				onClear: () => {
					localStorage.removeItem(MANUAL_KEY);
					apply(null);
				},
				onSync: () => {
					version.current = "";
					heartbeat().then(sync);
				}
			}) : !source ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto mt-20 max-w-md text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl font-bold",
						children: "Nenhuma lista configurada"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-muted-foreground",
						children: "Seu provedor ainda não enviou uma lista. Você pode adicionar sua lista autorizada manualmente."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "hero",
						size: "lg",
						className: "mt-6",
						onClick: () => setTab("settings"),
						children: "Adicionar lista"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				tab === "search" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					autoFocus: true,
					placeholder: "Buscar canais, filmes, séries…",
					value: q,
					onChange: (e) => setQ(e.target.value),
					className: "mb-6 h-14 text-lg"
				}),
				tab !== "search" && tab !== "fav" && groups.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-6 flex gap-2 overflow-x-auto pb-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setGroup(null),
						className: `tv-focus whitespace-nowrap rounded-full px-4 py-2 text-sm ${!group ? "bg-primary text-primary-foreground" : "bg-secondary"}`,
						children: "Todos"
					}), groups.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setGroup(g),
						className: `tv-focus whitespace-nowrap rounded-full px-4 py-2 text-sm ${group === g ? "bg-primary text-primary-foreground" : "bg-secondary"}`,
						children: g
					}, g))]
				}),
				loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground",
					children: "Carregando lista…"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6",
					children: visible.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "group relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => i.url ? setPlaying(i) : toast.info("Episódios de séries: disponível nos apps de TV."),
							className: "tv-focus flex aspect-video w-full flex-col items-center justify-center overflow-hidden rounded-xl border border-border bg-card p-3 text-center",
							children: [i.logo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: i.logo,
								alt: "",
								loading: "lazy",
								className: "max-h-14 object-contain"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tv, { className: "h-8 w-8 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-2 line-clamp-2 text-xs font-medium",
								children: i.name
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							"aria-label": "Favoritar",
							onClick: () => toggleFav(i.id),
							className: "absolute right-2 top-2 rounded-full bg-background/70 p-1.5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: `h-4 w-4 ${favs.includes(i.id) ? "fill-primary text-primary" : ""}` })
						})]
					}, i.id))
				}),
				!loading && visible.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground",
					children: "Nada por aqui."
				})
			] })]
		})]
	});
}
function VideoPlayer({ item, onClose }) {
	const ref = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const v = ref.current;
		if (!v) return;
		let hls = null;
		if (/\.m3u8(\?|$)/.test(item.url) && !v.canPlayType("application/vnd.apple.mpegurl")) import("../_libs/hls.js.mjs").then((n) => n.t).then(({ default: Hls }) => {
			if (!Hls.isSupported()) return;
			const h = new Hls();
			h.loadSource(item.url);
			h.attachMedia(v);
			hls = h;
		});
		else v.src = item.url;
		v.play().catch(() => void 0);
		const esc = (e) => {
			if (e.key === "Escape" || e.key === "Backspace") onClose();
		};
		window.addEventListener("keydown", esc);
		return () => {
			hls?.destroy();
			window.removeEventListener("keydown", esc);
		};
	}, [item, onClose]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-50 flex flex-col bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-semibold",
				children: item.name
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "secondary",
				onClick: onClose,
				children: "Fechar (Esc)"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
			ref,
			controls: true,
			autoPlay: true,
			className: "h-full w-full bg-background"
		})]
	});
}
function SettingsPanel({ dev, managed, source, onManual, onClear, onSync }) {
	const [type, setType] = (0, import_react.useState)("m3u");
	const [f, setF] = (0, import_react.useState)({
		url: "",
		server: "",
		username: "",
		password: ""
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-xl space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-2xl font-bold",
				children: "Configurações"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-border bg-card p-5 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["MAC / Device ID: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-primary",
						children: dev?.device_id
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"Plano: ",
						dev?.license?.plan,
						" · válido até ",
						fmtDate(dev?.license?.expires_at)
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"Lista:",
						" ",
						source ? managed ? "enviada pelo provedor" : "adicionada manualmente" : "nenhuma"
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "secondary",
						className: "mt-3",
						onClick: onSync,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {}), "Sincronizar agora"]
					})
				]
			}),
			managed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Sua lista é gerenciada pelo provedor e atualiza automaticamente."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3 rounded-2xl border border-border bg-card p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-semibold",
						children: "Adicionar lista autorizada"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: type === "m3u" ? "default" : "secondary",
							onClick: () => setType("m3u"),
							children: "URL M3U"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: type === "xtream" ? "default" : "secondary",
							onClick: () => setType("xtream"),
							children: "Xtream Codes"
						})]
					}),
					type === "m3u" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						placeholder: "https://…/lista.m3u",
						value: f.url,
						onChange: (e) => setF({
							...f,
							url: e.target.value
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							placeholder: "Servidor (https://…)",
							value: f.server,
							onChange: (e) => setF({
								...f,
								server: e.target.value
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							placeholder: "Usuário",
							value: f.username,
							onChange: (e) => setF({
								...f,
								username: e.target.value
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "password",
							placeholder: "Senha",
							value: f.password,
							onChange: (e) => setF({
								...f,
								password: e.target.value
							})
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "hero",
							onClick: () => onManual(type === "m3u" ? {
								type: "m3u",
								m3u_url: f.url
							} : {
								type: "xtream",
								server: f.server,
								username: f.username,
								password: f.password
							}),
							children: "Salvar e carregar"
						}), source && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							onClick: onClear,
							children: "Remover lista"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Fica salva só neste navegador. Alguns provedores bloqueiam acesso via navegador (CORS); nos apps de TV isso não ocorre."
					})
				]
			})
		]
	});
}
//#endregion
export { Player as component };
