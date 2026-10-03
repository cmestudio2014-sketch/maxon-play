import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { apiHandler, fail, ok, parseBody, preflight } from "@/lib/server/api.server";
import { statusWithConfig, deviceToken, registerDevice } from "@/lib/server/devices.server";
import { audit } from "@/lib/server/audit.server";

const Body = z.object({
  device_uid: z
    .string()
    .trim()
    .min(16)
    .max(128)
    .regex(/^[A-Za-z0-9._:-]+$/, "formato inválido"),
  platform: z.enum(["android", "tizen", "web"]),
  model: z.string().trim().max(80).default(""),
  app_version: z.string().trim().max(20).default(""),
});

export const Route = createFileRoute("/api/v1/device/register")({
  server: {
    handlers: {
      OPTIONS: ({ request }) => preflight(request),
      POST: ({ request }) =>
        apiHandler(request, "register", 20, async () => {
          const b = await parseBody(request, Body);
          if ("error" in b) return fail(request, 400, "VALIDATION", b.error);
          const dev = await registerDevice({
            deviceUid: b.data.device_uid,
            platform: b.data.platform,
            model: b.data.model,
            appVersion: b.data.app_version,
          });
          if (dev.status === "bloqueado")
            return fail(request, 403, "DEVICE_BLOCKED", "Dispositivo bloqueado.");
          await audit({
            actorType: "device",
            actorId: dev.id,
            action: "device.register",
            entity: "device",
            entityId: dev.id,
            details: { platform: dev.platform },
          });
          return ok(request, { ...(await statusWithConfig(dev)), ...deviceToken(dev.id) });
        }),
    },
  },
});