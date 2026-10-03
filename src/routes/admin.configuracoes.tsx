import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, PageHeader, useAction, useAdminQuery } from "@/components/admin-ui";
import { getSettingsAdmin, saveSettings } from "@/lib/admin.functions";

export const Route = createFileRoute("/admin/configuracoes")({ component: Config });

function Config() {
  const get = useServerFn(getSettingsAdmin);
  const save = useServerFn(saveSettings);
  const act = useAction();
  const { data } = useAdminQuery("settings", () => get());
  const [f, setF] = useState({
    brand_name: "",
    whatsapp_number: "",
    whatsapp_message: "",
    support_hours: "",
  });
  useEffect(() => {
    if (data)
      setF({
        brand_name: data["brand_name"] ?? "",
        whatsapp_number: data["whatsapp_number"] ?? "",
        whatsapp_message: data["whatsapp_message"] ?? "",
        support_hours: data["support_hours"] ?? "",
      });
  }, [data]);
  return (
    <>
      <PageHeader title="Configurações" desc="Dados exibidos na página pública de planos." />
      <div className="max-w-xl space-y-4 rounded-2xl border border-border bg-card p-6">
        <Field label="Nome da marca">
          <Input
            value={f.brand_name}
            onChange={(e) => setF({ ...f, brand_name: e.target.value })}
          />
        </Field>
        <Field
          label="WhatsApp de vendas"
          hint="Só números com DDI e DDD, ex: 5511999999999. Usado no botão Comprar agora."
        >
          <Input
            value={f.whatsapp_number}
            onChange={(e) => setF({ ...f, whatsapp_number: e.target.value.replace(/\D/g, "") })}
          />
        </Field>
        <Field label="Mensagem padrão" hint="Use {plano} para inserir o nome do plano.">
          <Input
            value={f.whatsapp_message}
            onChange={(e) => setF({ ...f, whatsapp_message: e.target.value })}
          />
        </Field>
        <Field label="Horário de atendimento">
          <Input
            value={f.support_hours}
            onChange={(e) => setF({ ...f, support_hours: e.target.value })}
          />
        </Field>
        <Button
          variant="hero"
          onClick={() => act(save({ data: f }), "Configurações salvas.", ["settings"])}
        >
          Salvar
        </Button>
      </div>
    </>
  );
}