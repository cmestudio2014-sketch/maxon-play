import { createFileRoute } from "@tanstack/react-router";
import { apiHandler, deviceFromAuth, fail, ok, preflight } from "@/lib/server/api.server";
import { statusWithConfig, deviceToken, getDevice } from "@/lib/server/devices.server";
import { q } from "@/lib/server/db.server";

export const Route = createFileRoute("/api/v1/device/heartbeat")({
  server: {
    handlers: {
      OPTIONS: ({ request }) => preflight(request),
      POST: ({ request }) =>
        apiHandler(request, "heartbeat", 30, async () => {
          const id = deviceFromAuth(request);
          if (!id)
            return fail(
              request,
              401,
              "UNAUTHORIZED",
              "Token ausente ou expirado. Chame /device/register.",
            );
          const dev = await getDevice(id);
          if (!dev) return fail(request, 404, "DEVICE_NOT_FOUND", "Dispositivo não encontrado.");
          await q("UPDATE devices SET last_seen_at=now() WHERE id=$1", [id]);
          // Token renovado a cada heartbeat (tokens curtos).
          return ok(request, { ...(await statusWithConfig(dev)), ...deviceToken(dev.id) });
        }),
    },
  },
});