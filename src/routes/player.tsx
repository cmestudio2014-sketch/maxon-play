import React, { useState } from "react";

export default function Player() {
  const [url, setUrl] = useState("");

  return (
    <div style={{
      minHeight: "100vh",
      background: "#080808",
      color: "white",
      fontFamily: "Arial, sans-serif"
    }}>
      <header style={{
        padding: "20px",
        borderBottom: "1px solid #292929",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <div>
          <strong style={{ fontSize: "24px" }}>MAXON PLAY</strong>
          <div style={{ color: "#aaa", fontSize: "13px" }}>WEB PLAYER</div>
        </div>

        <a
          href="/"
          style={{
            color: "white",
            textDecoration: "none",
            background: "#7c3aed",
            padding: "10px 18px",
            borderRadius: "20px"
          }}
        >
          VOLTAR
        </a>
      </header>

      <main style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "35px 20px"
      }}>
        <h1>▶ Web Player</h1>

        <p style={{ color: "#aaa" }}>
          Reproduza seu conteúdo autorizado diretamente no navegador.
        </p>

        <div style={{
          display: "flex",
          gap: "10px",
          marginTop: "25px",
          marginBottom: "25px",
          flexWrap: "wrap"
        }}>
          <input
            type="text"
            placeholder="Cole aqui a URL do stream"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            style={{
              flex: "1",
              minWidth: "260px",
              padding: "14px",
              borderRadius: "8px",
              border: "1px solid #444",
              background: "#151515",
              color: "white"
            }}
          />

          <button
            onClick={() => setUrl(url.trim())}
            style={{
              padding: "14px 24px",
              border: "0",
              borderRadius: "8px",
              background: "#7c3aed",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            REPRODUZIR
          </button>
        </div>

        <div style={{
          background: "#111",
          border: "1px solid #292929",
          borderRadius: "12px",
          overflow: "hidden"
        }}>
          {url ? (
            <video
              src={url}
              controls
              autoPlay
              playsInline
              style={{
                width: "100%",
                aspectRatio: "16/9",
                background: "black"
              }}
            />
          ) : (
            <div style={{
              aspectRatio: "16/9",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#777"
            }}>
              MAXON PLAY — Selecione um conteúdo para assistir
            </div>
          )}
        </div>

        <p style={{
          color: "#777",
          fontSize: "12px",
          marginTop: "20px"
        }}>
          Utilize somente streams e conteúdos que você tenha autorização para acessar.
        </p>
      </main>
    </div>
  );
}
