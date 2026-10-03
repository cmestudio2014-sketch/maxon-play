// Reprodução: AVPlay (Samsung) quando disponível; fallback <video> HTML5.
(function () {
  var usingAv = false;
  window.MaxonPlayer = {
    play: function (item) {
      document.getElementById("player").classList.remove("hidden");
      document.getElementById("nowPlaying").textContent = item.name;
      try {
        if (window.webapis && webapis.avplay) {
          usingAv = true;
          webapis.avplay.open(item.url);
          webapis.avplay.setDisplayRect(0, 0, 1920, 1080);
          webapis.avplay.setListener({
            onerror: function () {
              MaxonPlayer.stop();
            },
          });
          webapis.avplay.prepareAsync(
            function () {
              webapis.avplay.play();
            },
            function () {
              MaxonPlayer.stop();
            },
          );
          return;
        }
      } catch (e) {
        usingAv = false;
      }
      var v = document.getElementById("html5");
      v.classList.remove("hidden");
      v.src = item.url;
      v.play();
    },
    stop: function () {
      try {
        if (usingAv) {
          webapis.avplay.stop();
          webapis.avplay.close();
        }
      } catch (e) {
        /* noop */
      }
      var v = document.getElementById("html5");
      v.pause();
      v.removeAttribute("src");
      v.classList.add("hidden");
      document.getElementById("player").classList.add("hidden");
      usingAv = false;
    },
    isOpen: function () {
      return !document.getElementById("player").classList.contains("hidden");
    },
  };
})();