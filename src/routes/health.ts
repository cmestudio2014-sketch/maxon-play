import { createFileRoute } from "@tanstack/react-router";
import { dbKind, q, ready } from "@/lib/server/db.server";

export const Route = createFileRoute("/health")({
  server: {
    handlers: {
      GET: async () => {
        const started = Date.now();
        try {
          await ready();
          await q("SELECT 1");
          return Response.json(
            {
              status: "ok",
              db: await dbKind(),
              latency_ms: Date.now() - started,
              time: new Date().toISOString(),
            },
            { headers: { "Cache-Control": "no-store" } },
          );
        } catch (e) {
          console.error("[health]", (e as Error).message);
          return Response.json(
            { status: "error", db: "unavailable" },
            { status: 503, headers: { "Cache-Control": "no-store" } },
          );
        }
      },
    },
  },
});