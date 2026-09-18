const { spawn } = require("child_process");
const port = process.env.PORT || "80";
const vite = process.platform === "win32" ? "node_modules\\.bin\\vite.cmd" : "node_modules/.bin/vite";
const child = spawn(vite, ["--host","0.0.0.0","--port",String(port)], { stdio:"inherit" });
child.on("exit", code => process.exit(code ?? 0));
process.on("SIGTERM", () => child.kill("SIGTERM"));
