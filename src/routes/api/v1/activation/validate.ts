import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import {
  apiHandler,
  deviceFromAuth,
  fail,
  ok,
  parseBody,
  preflight,
} from "@/lib/server/api.server";
import { findByKey, keyProblem } from "@/lib/server/devices.server";

const Body = z.object({ key: z.string().trim().min(16).max(24) });

export const Route = createFileRoute("/api/v1/activation/validate")({
  server: {
    handlers: {
      OPTIONS: ({ request }) => preflight(request),
      POST: ({ request }) =>
        apiHandler(request, "activation", 10, async () => {
          const id = deviceFromAuth(request);
          if (!id) return fail(request, 401, "UNAUTHORIZED", "Token ausente ou expirado.");
          const b = await parseBody(request, Body);
          if ("error" in b) return fail(request, 400, "VALIDATION", b.error);
          const a = await findByKey(b.data.key);
          const p = keyProblem(a, id);
          if (p) return fail(request, 422, p.code, p.message);
          return ok(request, {
            valid: true,
            already_bound: a!.device_id === id,
            duration_days: a!.duration_days,
          });
        }),
    },
  },
});