import React from "react";
import { createRoot } from "react-dom/client";
import Home from "./routes/index";
import Player from "./routes/player";
import Admin from "./routes/admin";
import Client from "./routes/cliente";
import "./styles.css";

const path = window.location.pathname.replace(/\/+$/, "") || "/";
let App = Home;
if (path === "/player") App = Player;
else if (path === "/admin" || path.startsWith("/admin/")) App = Admin;
else if (path === "/cliente" || path.startsWith("/cliente/")) App = Client;

createRoot(document.getElementById("root")!).render(<React.StrictMode><App /></React.StrictMode>);
