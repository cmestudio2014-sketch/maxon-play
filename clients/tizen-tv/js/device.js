// Identificador app-scoped: tenta UUID de aplicação via API da TV; fallback UUID gerado e persistido.
(function () {
  var KEY = "maxon.device_uid";
  function uuid4() {
    var b = new Uint8Array(16);
    (window.crypto || window.msCrypto).getRandomValues(b);
    b[6] = (b[6] & 0x0f) | 0x40;
    b[8] = (b[8] & 0x3f) | 0x80;
    var h = Array.prototype.map
      .call(b, function (x) {
        return ("0" + x.toString(16)).slice(-2);
      })
      .join("");
    return (
      h.slice(0, 8) +
      "-" +
      h.slice(8, 12) +
      "-" +
      h.slice(12, 16) +
      "-" +
      h.slice(16, 20) +
      "-" +
      h.slice(20)
    );
  }
  window.MaxonDevice = {
    uid: function () {
      var id = localStorage.getItem(KEY);
      if (id) return id;
      try {
        // webapis.appcommon.getUuid() / productinfo.getDuid() variam por firmware; usamos apenas se disponível
        // e sempre prefixado, mantendo o ID restrito ao app (não é MAC físico).
        if (window.webapis && webapis.appcommon && webapis.appcommon.getUuid)
          id = "tizen-" + webapis.appcommon.getUuid();
      } catch (e) {
        id = null;
      }
      if (!id || id.length < 20) id = "tizen-" + uuid4();
      localStorage.setItem(KEY, id);
      return id;
    },
    model: function () {
      try {
        return (webapis.productinfo.getRealModel() || "Samsung TV").slice(0, 80);
      } catch (e) {
        return "Samsung TV";
      }
    },
  };
})();