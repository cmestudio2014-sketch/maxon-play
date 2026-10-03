// Cliente da API MAXON PLAY (mesmo contrato do Android). Token curto em memória.
(function () {
  var token = null;
  function call(method, path, body) {
    var headers = { "Content-Type": "application/json" };
    if (token) headers.Authorization = "Bearer " + token;
    return fetch(MAXON_CONFIG.API_BASE_URL + "/api/v1" + path, {
      method: method,
      headers: headers,
      body: body ? JSON.stringify(body) : undefined,
    }).then(function (r) {
      return r
        .json()
        .catch(function () {
          return null;
        })
        .then(function (j) {
          if (!j || !j.ok) {
            var e = new Error((j && j.error && j.error.message) || "Falha de rede");
            e.code = j && j.error && j.error.code;
            e.status = r.status;
            throw e;
          }
          if (j.data && j.data.token) token = j.data.token;
          return j.data;
        });
    });
  }
  window.MaxonApi = {
    register: function () {
      return call("POST", "/device/register", {
        device_uid: MaxonDevice.uid(),
        platform: "tizen",
        model: MaxonDevice.model(),
        app_version: MAXON_CONFIG.APP_VERSION,
      });
    },
    activate: function (key) {
      return call("POST", "/activation/activate", { key: key });
    },
    status: function () {
      return call("GET", "/device/status");
    },
    heartbeat: function () {
      return call("POST", "/device/heartbeat", {}).catch(function (e) {
        if (e.status === 401) return window.MaxonApi.register();
        throw e;
      });
    },
    config: function () {
      return call("GET", "/device/config");
    },
  };
})();