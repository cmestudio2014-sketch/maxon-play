// Parser M3U + cliente Xtream (credenciais via POST no corpo). Sem listas embutidas.
(function () {
  function parseM3U(text) {
    var out = [],
      meta = null;
    text.split(/\r?\n/).forEach(function (raw) {
      var line = raw.trim();
      if (line.indexOf("#EXTINF") === 0) {
        var attr = function (k) {
          var m = new RegExp(k + '="([^"]*)"').exec(line);
          return m ? m[1] : "";
        };
        meta = {
          name: line.split(",").slice(1).join(",").trim() || "Sem nome",
          logo: attr("tvg-logo"),
          group: attr("group-title") || "Geral",
        };
      } else if (line && line[0] !== "#" && meta) {
        meta.url = line;
        meta.id = String(out.length);
        meta.kind = /\/movie\//.test(line) ? "movie" : /\/series\//.test(line) ? "series" : "live";
        out.push(meta);
        meta = null;
      }
    });
    return out;
  }
  function xtream(s) {
    var base = s.server.replace(/\/+$/, "");
    var api = function (action) {
      var body =
        "username=" +
        encodeURIComponent(s.username) +
        "&password=" +
        encodeURIComponent(s.password) +
        "&action=" +
        action;
      return fetch(base + "/player_api.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body,
      })
        .then(function (r) {
          return r.json();
        })
        .catch(function () {
          return [];
        });
    };
    var u = encodeURIComponent(s.username),
      p = encodeURIComponent(s.password);
    return Promise.all([
      api("get_live_categories"),
      api("get_live_streams"),
      api("get_vod_categories"),
      api("get_vod_streams"),
    ]).then(function (r) {
      var map = function (cs) {
        var m = {};
        (cs || []).forEach(function (c) {
          m[c.category_id] = c.category_name;
        });
        return m;
      };
      var lc = map(r[0]),
        vc = map(r[2]);
      return (r[1] || [])
        .map(function (x) {
          return {
            id: "l" + x.stream_id,
            name: x.name,
            logo: x.stream_icon,
            group: lc[x.category_id] || "Geral",
            kind: "live",
            url: base + "/live/" + u + "/" + p + "/" + x.stream_id + ".m3u8",
          };
        })
        .concat(
          (r[3] || []).map(function (x) {
            return {
              id: "v" + x.stream_id,
              name: x.name,
              logo: x.stream_icon,
              group: vc[x.category_id] || "Geral",
              kind: "movie",
              url:
                base +
                "/movie/" +
                u +
                "/" +
                p +
                "/" +
                x.stream_id +
                "." +
                (x.container_extension || "mp4"),
            };
          }),
        );
    });
  }
  window.MaxonPlaylist = {
    load: function (src) {
      if (!src) return Promise.resolve([]);
      if (src.type === "m3u")
        return fetch(src.m3u_url)
          .then(function (r) {
            return r.text();
          })
          .then(parseM3U);
      if (src.type === "xtream") return xtream(src);
      return Promise.resolve([]);
    },
  };
})();