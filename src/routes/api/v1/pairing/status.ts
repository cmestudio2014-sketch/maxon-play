import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { apiHandler, deviceFromAuth, fail, ok, parseBody, preflight } from "@/lib/server/api.server";
import { pairingStatus } from "@/lib/server/pairing.server";
import { getDevice, statusWithConfig } from "@/lib/server/devices.server";
const Body = z.object({ code: z.string().regex(/^\d{6}$/) });
export const Route = createFileRoute("/api/v1/pairing/status")({ server: { handlers: {
  OPTIONS: ({ request }) => preflight(request),
  POST: ({ request }) => apiHandler(request, "pairing-status", 60, async () => {
    const id = deviceFromAuth(request);
    if (!id) return fail(request, 401, "UNAUTHORIZED", "Token ausente ou expirado.");
    const b = await parseBody(request, Body); if ("error" in b) return fail(request, 400, "VALIDATION", b.error);
    const p = await pairingStatus(id, b.data.code);
    if (p.status === "ativado") { const dev = await getDevice(id); return ok(request, { ...p, device: dev ? await statusWithConfig(dev) : null }); }
    return ok(request, p);
  }),
} } });
