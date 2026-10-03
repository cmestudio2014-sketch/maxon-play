# MAXON PLAY — Samsung Tizen (Web App local .wgt)

App empacotado localmente (não é hosted app): HTML/CSS/JS dentro do `.wgt`; só a API é remota.

## Configurar
1. Edite `js/config.js` → `API_BASE_URL` (URL da Square Cloud, https).
2. Em `config.xml`, ajuste `<access origin>` para o domínio da API e, se quiser, o `tizen:application id`.
3. Adicione `icon.png` (512×512) próprio.

## Empacotar (.wgt)
- **Tizen Studio**: File → Import → Tizen → Tizen Project → esta pasta; Certificate Manager → criar perfil Samsung; Build Signed Package.
- **CLI**: `tizen package -t wgt -s <perfil> -- clients/tizen-tv` e `tizen install -n MaxonPlay.wgt -t <tv>`.

## Fluxo
- `device.js`: UUID de aplicação via `webapis.appcommon.getUuid()` quando disponível; fallback UUID v4 gerado e salvo em `localStorage`. Nunca MAC físico.
- Tela inicial: **MAC / Device ID** (retornado por `/device/register`) + campo **KEY**.
- Após ativar: se `config_version != "none"`, `GET /device/config` traz a fonte autorizada e a lista carrega sozinha.
- Heartbeat a cada 5 min; mudança de `config_version` recarrega a lista; `"none"`/licença inativa apaga a fonte gerenciada.
- Sem fonte → Configurações mostra "Adicionar lista manualmente".
- Reprodução via **AVPlay** (`webapis.avplay`), fallback `<video>`.
- Teclas: setas, OK (Enter), Voltar (10009), Vermelho (favoritar).

Sem canais, listas ou servidores embutidos.