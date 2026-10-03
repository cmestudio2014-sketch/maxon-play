// Fluxo: register → (ativação) → config sincronizada por config_version → home. Navegação por teclas do controle.
(function () {
  var $ = function (id) {
    return document.getElementById(id);
  };
  var state = {
    version: localStorage.getItem("maxon.config_version") || "",
    managed: null,
    items: [],
    tab: "live",
    favs: JSON.parse(localStorage.getItem("maxon.favs") || "[]"),
  };
  // Fonte gerenciada fica só em memória/localStorage do app (pacote .wgt com encryption="enable").
  try {
    state.managed = JSON.parse(localStorage.getItem("maxon.managed") || "null");
  } catch (e) {
    state.managed = null;
  }

  function show(id) {
    ["activation", "home"].forEach(function (s) {
      $(s).classList.toggle("hidden", s !== id);
    });
    focusFirst();
  }
  function source() {
    return state.managed || JSON.parse(localStorage.getItem("maxon.manual") || "null");
  }

  function applyStatus(st) {
    if (st.status !== "ativo") {
      showActivation(st);
      return Promise.resolve();
    }
    if (st.config_version === state.version) return Promise.resolve();
    var p = st.config_version === "none" ? Promise.resolve({ source: null }) : MaxonApi.config();
    return p.then(function (cfg) {
      state.managed = cfg.source;
      state.version = st.config_version;
      if (cfg.source) localStorage.setItem("maxon.managed", JSON.stringify(cfg.source));
      else localStorage.removeItem("maxon.managed");
      localStorage.setItem("maxon.config_version", state.version);
      return loadHome();
    });
  }

  function showActivation(st) {
    $("deviceId").textContent = st.device_id;
    $("actStatus").textContent =
      st.status === "nao_ativado" ? "Digite a KEY recebida após a compra." : "Status: " + st.status;
    // Licença inativa: revoga a fonte gerenciada local.
    state.managed = null;
    localStorage.removeItem("maxon.managed");
    state.version = "none";
    localStorage.setItem("maxon.config_version", "none");
    show("activation");
  }

  function loadHome() {
    show("home");
    var src = source();
    $("info").textContent = src
      ? state.managed
        ? "Lista enviada pelo provedor (atualiza automaticamente)."
        : "Lista adicionada manualmente."
      : "Nenhuma lista configurada.";
    $("manual").classList.toggle("hidden", !!state.managed);
    if (!src) {
      selectTab("settings");
      return Promise.resolve();
    }
    return MaxonPlaylist.load(src).then(function (items) {
      state.items = items;
      selectTab(state.tab === "settings" ? "live" : state.tab);
    });
  }

  function selectTab(tab) {
    state.tab = tab;
    $("settings").classList.toggle("hidden", tab !== "settings");
    $("grid").classList.toggle("hidden", tab === "settings");
    $("search").classList.toggle("hidden", tab !== "search");
    if (tab !== "settings") render();
  }

  function render() {
    var q = $("search").value.toLowerCase();
    var list = state.items
      .filter(function (i) {
        if (state.tab === "fav") return state.favs.indexOf(i.id) >= 0;
        if (state.tab === "search") return q.length > 1 && i.name.toLowerCase().indexOf(q) >= 0;
        return i.kind === state.tab;
      })
      .slice(0, 60);
    $("grid").innerHTML = "";
    list.forEach(function (i) {
      var b = document.createElement("button");
      b.className = "focusable card";
      b.innerHTML = (i.logo ? '<img src="' + encodeURI(i.logo) + '">' : "") + "<span></span>";
      b.querySelector("span").textContent = i.name;
      b.onclick = function () {
        MaxonPlayer.play(i);
      };
      b.dataset.id = i.id;
      $("grid").appendChild(b);
    });
  }

  // ---- Navegação por controle remoto (setas, OK, Voltar, teclas coloridas) ----
  function focusables() {
    return Array.prototype.filter.call(document.querySelectorAll(".focusable"), function (el) {
      return el.offsetParent !== null;
    });
  }
  function focusFirst() {
    var f = focusables();
    if (f[0]) f[0].focus();
  }
  function move(dx, dy) {
    var cur = document.activeElement,
      els = focusables();
    if (els.indexOf(cur) < 0) return focusFirst();
    var r = cur.getBoundingClientRect(),
      best = null,
      bestD = Infinity;
    els.forEach(function (el) {
      if (el === cur) return;
      var o = el.getBoundingClientRect(),
        ddx = o.left - r.left,
        ddy = o.top - r.top;
      if ((dx && Math.sign(ddx) !== dx) || (dy && Math.sign(ddy) !== dy)) return;
      if (dx && Math.abs(ddy) > r.height) return;
      var d = Math.abs(ddx) + Math.abs(ddy) * (dx ? 3 : 1);
      if (d < bestD) {
        bestD = d;
        best = el;
      }
    });
    if (best) best.focus();
  }
  function registerKeys() {
    try {
      ["MediaPlayPause", "MediaStop", "ColorF0Red", "ColorF2Yellow"].forEach(function (k) {
        tizen.tvinputdevice.registerKey(k);
      });
    } catch (e) {
      /* navegador */
    }
  }
  document.addEventListener("keydown", function (e) {
    switch (e.keyCode) {
      case 37:
        move(-1, 0);
        break;
      case 39:
        move(1, 0);
        break;
      case 38:
        move(0, -1);
        break;
      case 40:
        move(0, 1);
        break;
      case 13:
        if (document.activeElement && document.activeElement.tagName === "BUTTON")
          document.activeElement.click();
        break;
      case 403: {
        // vermelho: favoritar
        var id = document.activeElement && document.activeElement.dataset.id;
        if (id) {
          var i = state.favs.indexOf(id);
          if (i >= 0) state.favs.splice(i, 1);
          else state.favs.push(id);
          localStorage.setItem("maxon.favs", JSON.stringify(state.favs));
        }
        break;
      }
      case 10009:
      case 8:
      case 27: // Voltar
        if (MaxonPlayer.isOpen()) {
          MaxonPlayer.stop();
          e.preventDefault();
        } else if (e.keyCode === 10009) {
          try {
            tizen.application.getCurrentApplication().exit();
          } catch (x) {
            /* noop */
          }
        }
        break;
    }
  });

  // ---- Eventos ----
  $("keyInput").addEventListener("input", function () {
    var c = this.value
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, "")
      .slice(0, 16);
    this.value = c.replace(/(.{4})(?=.)/g, "$1-");
  });
  $("activateBtn").onclick = function () {
    $("actError").textContent = "";
    MaxonApi.activate($("keyInput").value)
      .then(applyStatus)
      .then(function () {
        if (!state.items.length) return loadHome();
      })
      .catch(function (e) {
        $("actError").textContent = e.message;
      });
  };
  Array.prototype.forEach.call(document.querySelectorAll(".tab"), function (t) {
    t.onclick = function () {
      selectTab(t.dataset.tab);
    };
  });
  $("search").addEventListener("input", render);
  $("manualSave").onclick = function () {
    localStorage.setItem(
      "maxon.manual",
      JSON.stringify({ type: "m3u", m3u_url: $("manualUrl").value }),
    );
    loadHome();
  };
  $("syncNow").onclick = function () {
    state.version = "";
    MaxonApi.heartbeat().then(applyStatus);
  };

  // ---- Boot ----
  registerKeys();
  MaxonApi.register()
    .then(function (st) {
      return st.status === "ativo"
        ? applyStatus(st).then(function () {
            if (!state.items.length) return loadHome();
          })
        : showActivation(st);
    })
    .catch(function (e) {
      $("net").textContent = "Sem conexão: " + e.message;
    });
  setInterval(function () {
    MaxonApi.heartbeat()
      .then(applyStatus)
      .catch(function () {});
  }, MAXON_CONFIG.HEARTBEAT_MS);
})();