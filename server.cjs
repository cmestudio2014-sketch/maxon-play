const http = require("http");
const { spawn } = require("child_process");

const PORT = Number(process.env.PORT || 80);
const VITE_PORT = 4173;

const vite =
  process.platform === "win32"
    ? "node_modules\\.bin\\vite.cmd"
    : "node_modules/.bin/vite";

const child = spawn(
  vite,
  ["preview", "--host", "127.0.0.1", "--port", String(VITE_PORT)],
  { stdio: "inherit" }
);

child.on("exit", (code) => {
  console.log("Vite finalizado:", code);
});

const server = http.createServer(async (req, res) => {
  try {
    if (req.url === "/api/playlist") {
      const playlistUrl = process.env.IPTV_PLAYLIST_URL;

      if (!playlistUrl) {
        res.writeHead(500, { "Content-Type": "application/json" });
        return res.end(
          JSON.stringify({ error: "Playlist não configurada." })
        );
      }

      const response = await fetch(playlistUrl, {
        redirect: "follow",
        headers: {
          "User-Agent": "MAXON-PLAY/1.0",
        },
      });

      if (!response.ok) {
        throw new Error(`Servidor IPTV respondeu ${response.status}`);
      }

      const playlist = await response.text();

      res.writeHead(200, {
        "Content-Type": "audio/x-mpegurl; charset=utf-8",
        "Cache-Control": "no-store",
      });

      return res.end(playlist);
    }

    const proxyReq = http.request(
      {
        hostname: "127.0.0.1",
        port: VITE_PORT,
        path: req.url,
        method: req.method,
        headers: req.headers,
      },
      (proxyRes) => {
        res.writeHead(proxyRes.statusCode || 500, proxyRes.headers);
        proxyRes.pipe(res);
      }
    );

    proxyReq.on("error", () => {
      res.writeHead(503, { "Content-Type": "text/plain" });
      res.end("MAXON PLAY iniciando...");
    });

    req.pipe(proxyReq);
  } catch (error) {
    console.error(error);

    res.writeHead(502, {
      "Content-Type": "application/json",
    });

    res.end(
      JSON.stringify({
        error: "Não foi possível carregar a playlist.",
      })
    );
  }
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`MAXON PLAY online na porta ${PORT}`);
});

process.on("SIGTERM", () => child.kill("SIGTERM"));
process.on("SIGINT", () => child.kill("SIGTERM"));
