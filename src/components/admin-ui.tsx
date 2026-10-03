import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { toast } from "sonner";

/** Busca dados do painel (server function sem argumentos). */
export function useAdminQuery<T>(key: string, fn: () => Promise<T>) {
  return useQuery({ queryKey: ["admin", key], queryFn: fn });
}

/** Executa uma ação, mostra toast e recarrega a(s) lista(s). */
export function useAction() {
  const qc = useQueryClient();
  return async <T,>(
    p: Promise<T>,
    success: string,
    keys: string[] = [],
  ): Promise<T | undefined> => {
    try {
      const r = await p;
      toast.success(success);
      await Promise.all(keys.map((k) => qc.invalidateQueries({ queryKey: ["admin", k] })));
      return r;
    } catch (e) {
      toast.error(friendly(e));
      return undefined;
    }
  };
}

export function friendly(e: unknown): string {
  const m = (e as Error)?.message ?? "Erro inesperado.";
  try {
    const parsed = JSON.parse(m) as { message?: string }[];
    if (Array.isArray(parsed) && parsed[0]?.message) return parsed.map((x) => x.message).join("; ");
  } catch {
    /* não é erro zod */
  }
  return m;
}

export function PageHeader({
  title,
  desc,
  action,
}: {
  title: string;
  desc?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold md:text-3xl">{title}</h1>
        {desc && <p className="mt-1 text-sm text-muted-foreground">{desc}</p>}
      </div>
      {action}
    </div>
  );
}

const tones: Record<string, string> = {
  ativa: "bg-success/15 text-success",
  ativo: "bg-success/15 text-success",
  pago: "bg-success/15 text-success",
  pendente: "bg-warning/15 text-warning",
  expirada: "bg-muted text-muted-foreground",
  inativo: "bg-muted text-muted-foreground",
  bloqueada: "bg-destructive/15 text-destructive",
  bloqueado: "bg-destructive/15 text-destructive",
  cancelado: "bg-destructive/15 text-destructive",
};
export function StatusBadge({ s }: { s: string | null | undefined }) {
  if (!s) return <span className="text-muted-foreground">—</span>;
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${tones[s] ?? "bg-secondary text-secondary-foreground"}`}
    >
      {s}
    </span>
  );
}

export function DataTable({
  head,
  children,
  empty,
}: {
  head: string[];
  children: ReactNode;
  empty?: boolean;
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-border bg-card">
      <table className="w-full text-sm">
        <thead className="bg-secondary/50 text-left text-xs uppercase tracking-wider text-muted-foreground">
          <tr>
            {head.map((h) => (
              <th key={h} className="whitespace-nowrap px-4 py-3 font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">{children}</tbody>
      </table>
      {empty && <p className="p-8 text-center text-muted-foreground">Nenhum registro.</p>}
    </div>
  );
}
export const Td = ({ children, className = "" }: { children?: ReactNode; className?: string }) => (
  <td className={`whitespace-nowrap px-4 py-3 ${className}`}>{children}</td>
);

export function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-medium">{label}</span>
      {children}
      {hint && <span className="block text-xs text-muted-foreground">{hint}</span>}
    </label>
  );
}

export const selectCls =
  "flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring";