const http = require("http");
const { spawn } = require("child_process");

const PORT = Number(process.env.PORT || 80);
const VITE_PORT = 4173;

const vite = process.platform === "win32"
  ? "node_modules\\.bin\\vite.cmd"
  : "node_modules/.bin/vite";

const child = spawn(
  vite,
  ["--host", "127.0.0.1", "--port", String(VITE_PORT)],
  { stdio: "inherit" }
);

const server = http.createServer(async (req, res) => {

  if (req.url === "/api/playlist") {
    try {
      const url = process.env.IPTV_PLAYLIST_URL;

      if (!url) {
        res.writeHead(500, {"Content-Type":"text/plain"});
        return res.end("IPTV_PLAYLIST_URL nao configurada");
      }

      const resposta = await fetch(url);
      const texto = await resposta.text();

      res.writeHead(200, {
        "Content-Type": "application/vnd.apple.mpegurl",
        "Cache-Control": "no-store"
      });

      return res.end(texto);

    } catch (erro) {
      console.error(erro);
      res.writeHead(502, {"Content-Type":"text/plain"});
      return res.end("Erro ao carregar playlist");
    }
  }

  const proxy = http.request({
    hostname: "127.0.0.1",
    port: VITE_PORT,
    path: req.url,
    method: req.method,
    headers: req.headers
  }, resposta => {
    res.writeHead(resposta.statusCode || 500, resposta.headers);
    resposta.pipe(res);
  });

  proxy.on("error", () => {
    res.writeHead(503);
    res.end("MAXON PLAY iniciando...");
  });

  req.pipe(proxy);
});

server.listen(PORT, "0.0.0.0", () => {
  console.log("MAXON PLAY porta " + PORT);
});

child.on("exit", code => process.exit(code ?? 0));
process.on("SIGTERM", () => child.kill("SIGTERM"));
