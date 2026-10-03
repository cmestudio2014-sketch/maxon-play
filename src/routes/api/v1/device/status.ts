import { createFileRoute } from "@tanstack/react-router";
import { apiHandler, deviceFromAuth, fail, ok, preflight } from "@/lib/server/api.server";
import { statusWithConfig, getDevice } from "@/lib/server/devices.server";

export const Route = createFileRoute("/api/v1/device/status")({
  server: {
    handlers: {
      OPTIONS: ({ request }) => preflight(request),
      GET: ({ request }) =>
        apiHandler(request, "status", 60, async () => {
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
          return ok(request, await statusWithConfig(dev));
        }),
    },
  },
});