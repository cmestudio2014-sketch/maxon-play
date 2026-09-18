import React, { useRef, useState } from "react";

type Channel = {
  name: string;
  url: string;
  logo?: string;
  group?: string;
};

function parseM3U(text: string): Channel[] {
  const lines = text.split(/\r?\n/);
  const channels: Channel[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line.startsWith("#EXTINF:")) {
      const logo = line.match(/tvg-logo="([^"]*)"/)?.[1] || "";
      const group = line.match(/group-title="([^"]*)"/)?.[1] || "";
      const name = line.substring(line.lastIndexOf(",") + 1).trim() || "Canal";

      let j = i + 1;

      while (j < lines.length && (!lines[j].trim() || lines[j].trim().startsWith("#"))) {
        j++;
      }

      if (j < lines.length) {
        const url = lines[j].trim();

        if (url && !url.startsWith("#")) {
          channels.push({ name, url, logo, group });
        }
      }
    }
  }

  return channels;
}

export default function Player() {
  const [playlistUrl, setPlaylistUrl] = useState("");
  const [channels, setChannels] = useState<Channel[]>([]);
  const [selected, setSelected] = useState<Channel | null>(null);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);

  async function loadPlaylist() {
    const url = playlistUrl.trim();

    if (!url) {
      setStatus("Informe a URL da lista M3U.");
      return;
    }

    setStatus("Carregando lista...");

    try {
      const response = await fetch("/api/playlist");

      if (!response.ok) {
        throw new Error("Não foi possível acessar a lista.");
      }

      const text = await response.text();
      const parsed = parseM3U(text);

      if (!parsed.length) {
        throw new Error("Nenhum canal foi encontrado nessa lista.");
      }

      setChannels(parsed);
      setSelected(null);
      setStatus(`${parsed.length} itens carregados.`);
    } catch (error) {
      console.error(error);
      setStatus(
        "Não foi possível carregar a lista. O servidor pode estar bloqueando acesso pelo navegador (CORS)."
      );
    }
  }

  const filtered = channels.filter((channel) =>
    `${channel.name} ${channel.group || ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#080808",
        color: "#fff",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <header
        style={{
          padding: "18px 24px",
          borderBottom: "1px solid #292929",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <strong style={{ fontSize: 24 }}>MAXON PLAY</strong>
          <div style={{ color: "#999", fontSize: 12 }}>WEB PLAYER</div>
        </div>

        <a
          href="/"
          style={{
            background: "#7c3aed",
            color: "#fff",
            textDecoration: "none",
            padding: "10px 18px",
            borderRadius: 22,
            fontWeight: "bold",
          }}
        >
          VOLTAR
        </a>
      </header>

      <main style={{ maxWidth: 1400, margin: "0 auto", padding: 24 }}>
        <h2>📺 Minha lista</h2>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <input
            value={playlistUrl}
            onChange={(e) => setPlaylistUrl(e.target.value)}
            placeholder="Cole aqui a URL M3U"
            style={{
              flex: 1,
              minWidth: 260,
              padding: 14,
              borderRadius: 8,
              border: "1px solid #444",
              background: "#151515",
              color: "#fff",
            }}
          />

          <button
            onClick={loadPlaylist}
            style={{
              padding: "14px 22px",
              border: 0,
              borderRadius: 8,
              background: "#7c3aed",
              color: "#fff",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            CARREGAR LISTA
          </button>
        </div>

        {status && (
          <p style={{ color: "#aaa", fontSize: 14 }}>
            {status}
          </p>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: channels.length ? "320px 1fr" : "1fr",
            gap: 20,
            marginTop: 25,
          }}
        >
          {channels.length > 0 && (
            <aside
              style={{
                background: "#111",
                border: "1px solid #292929",
                borderRadius: 12,
                padding: 12,
                maxHeight: 650,
                overflowY: "auto",
              }}
            >
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="🔎 Buscar canal..."
                style={{
                  boxSizing: "border-box",
                  width: "100%",
                  padding: 12,
                  marginBottom: 12,
                  borderRadius: 8,
                  border: "1px solid #333",
                  background: "#191919",
                  color: "#fff",
                }}
              />

              {filtered.map((channel, index) => (
                <button
                  key={`${channel.url}-${index}`}
                  onClick={() => setSelected(channel)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: 10,
                    marginBottom: 5,
                    border: 0,
                    borderRadius: 8,
                    background:
                      selected?.url === channel.url ? "#292929" : "transparent",
                    color: "#fff",
                    textAlign: "left",
                    cursor: "pointer",
                  }}
                >
                  {channel.logo ? (
                    <img
                      src={channel.logo}
                      alt=""
                      style={{
                        width: 38,
                        height: 38,
                        objectFit: "contain",
                        borderRadius: 5,
                      }}
                    />
                  ) : (
                    <span style={{ fontSize: 22 }}>📺</span>
                  )}

                  <span>
                    <strong>{channel.name}</strong>
                    {channel.group && (
                      <small
                        style={{
                          display: "block",
                          color: "#888",
                          marginTop: 3,
                        }}
                      >
                        {channel.group}
                      </small>
                    )}
                  </span>
                </button>
              ))}
            </aside>
          )}

          <section>
            <div
              style={{
                background: "#111",
                border: "1px solid #292929",
                borderRadius: 12,
                overflow: "hidden",
              }}
            >
              {selected ? (
                <video
                  ref={videoRef}
                  key={selected.url}
                  src={selected.url}
                  controls
                  autoPlay
                  playsInline
                  style={{
                    display: "block",
                    width: "100%",
                    aspectRatio: "16/9",
                    background: "#000",
                  }}
                />
              ) : (
                <div
                  style={{
                    aspectRatio: "16/9",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#777",
                  }}
                >
                  MAXON PLAY — Selecione um canal
                </div>
              )}
            </div>

            {selected && (
              <div style={{ marginTop: 15 }}>
                <strong style={{ fontSize: 20 }}>{selected.name}</strong>

                {selected.group && (
                  <div style={{ color: "#888", marginTop: 5 }}>
                    {selected.group}
                  </div>
                )}

                <button
                  onClick={() => videoRef.current?.requestFullscreen()}
                  style={{
                    marginTop: 15,
                    padding: "10px 18px",
                    border: 0,
                    borderRadius: 8,
                    background: "#7c3aed",
                    color: "#fff",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  ⛶ TELA CHEIA
                </button>
              </div>
            )}
          </section>
        </div>

        <p style={{ color: "#666", fontSize: 12, marginTop: 25 }}>
          Utilize somente playlists e conteúdos que você tenha autorização para acessar.
        </p>
      </main>
    </div>
  );
}
