import React from "react";
import { createRoot } from "react-dom/client";
import Home from "./routes/index";
import Player from "./routes/player";
import "./styles.css";

const path = window.location.pathname.replace(/\/+$/, "") || "/";

const App = path === "/player" ? Player : Home;

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
