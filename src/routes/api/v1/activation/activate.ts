import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import {
  apiHandler,
  clientIp,
  deviceFromAuth,
  fail,
  ok,
  parseBody,
  preflight,
} from "@/lib/server/api.server";
import {
  activateKey,
  statusWithConfig,
  findByKey,
  getDevice,
  keyProblem,
} from "@/lib/server/devices.server";
import { audit } from "@/lib/server/audit.server";

const Body = z.object({ key: z.string().trim().min(16).max(24) });

export const Route = createFileRoute("/api/v1/activation/activate")({
  server: {
    handlers: {
      OPTIONS: ({ request }) => preflight(request),
      POST: ({ request }) =>
        apiHandler(request, "activation", 10, async () => {
          const id = deviceFromAuth(request);
          if (!id) return fail(request, 401, "UNAUTHORIZED", "Token ausente ou expirado.");
          const dev = await getDevice(id);
          if (!dev) return fail(request, 404, "DEVICE_NOT_FOUND", "Dispositivo não encontrado.");
          if (dev.status === "bloqueado")
            return fail(request, 403, "DEVICE_BLOCKED", "Dispositivo bloqueado.");
          const b = await parseBody(request, Body);
          if ("error" in b) return fail(request, 400, "VALIDATION", b.error);
          const a = await findByKey(b.data.key);
          const p = keyProblem(a, id);
          if (p) {
            await audit({
              actorType: "device",
              actorId: id,
              action: "activation.denied",
              entity: "device",
              entityId: id,
              details: { reason: p.code },
            });
            return fail(request, 422, p.code, p.message);
          }
          await activateKey(a!, id, clientIp(request));
          return ok(request, await statusWithConfig(dev));
        }),
    },
  },
});