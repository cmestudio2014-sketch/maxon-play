import { createFileRoute } from "@tanstack/react-router";
import { apiHandler, deviceFromAuth, fail, ok, preflight } from "@/lib/server/api.server";
import { getDevice } from "@/lib/server/devices.server";
import { issuePairingCode } from "@/lib/server/pairing.server";

export const Route = createFileRoute("/api/v1/pairing/request")({ server: { handlers: {
  OPTIONS: ({ request }) => preflight(request),
  POST: ({ request }) => apiHandler(request, "pairing-request", 12, async () => {
    const id = deviceFromAuth(request);
    if (!id) return fail(request, 401, "UNAUTHORIZED", "Token ausente ou expirado.");
    const dev = await getDevice(id);
    if (!dev) return fail(request, 404, "DEVICE_NOT_FOUND", "Dispositivo não encontrado.");
    if (dev.status === "bloqueado") return fail(request, 403, "DEVICE_BLOCKED", "Dispositivo bloqueado.");
    return ok(request, await issuePairingCode(id));
  }),
} } });
