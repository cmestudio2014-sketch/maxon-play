import { createFileRoute } from "@tanstack/react-router";
import { apiHandler, deviceFromAuth, fail, ok, preflight } from "@/lib/server/api.server";
import { activeLicenseFor, deviceStatusPayload, getDevice } from "@/lib/server/devices.server";
import { deviceConfig } from "@/lib/server/sources.server";
import { audit } from "@/lib/server/audit.server";

// Entrega a fonte autorizada atribuída. Somente para dispositivo com licença ATIVA.
// Credenciais trafegam só no corpo da resposta HTTPS (nunca em query string).
export const Route = createFileRoute("/api/v1/device/config")({
  server: {
    handlers: {
      OPTIONS: ({ request }) => preflight(request),
      GET: ({ request }) =>
        apiHandler(request, "config", 20, async () => {
          const id = deviceFromAuth(request);
          if (!id) return fail(request, 401, "UNAUTHORIZED", "Token ausente ou expirado.");
          const dev = await getDevice(id);
          if (!dev) return fail(request, 404, "DEVICE_NOT_FOUND", "Dispositivo não encontrado.");
          const st = deviceStatusPayload(dev, await activeLicenseFor(id));
          if (st.status !== "ativo")
            return fail(
              request,
              403,
              "LICENSE_INACTIVE",
              "Licença inativa: configuração indisponível.",
            );
          const cfg = await deviceConfig(id);
          await audit({
            actorType: "device",
            actorId: id,
            action: "config.fetch",
            entity: "device",
            entityId: id,
            details: { config_version: cfg.config_version, has_source: !!cfg.source },
          });
          return ok(request, cfg);
        }),
    },
  },
});