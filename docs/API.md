# API MAXON PLAY — /api/v1

Base: `https://SEU-APP.squareweb.app/api/v1` · JSON · HTTPS obrigatório · OpenAPI: `docs/openapi.yaml`.

Resposta padrão:
```json
{ "ok": true,  "data": { ... } }
{ "ok": false, "error": { "code": "KEY_INVALID", "message": "..." } }
```
Autenticação de aparelho: `Authorization: Bearer <token>` (JWT de 15 min, renovado em register/heartbeat). Rate limit por IP e por aparelho (HTTP 429 `RATE_LIMITED`).

| Método | Rota | Auth | Descrição |
|---|---|---|---|
| POST | `/device/register` | — | `{device_uid, platform: android\|tizen\|web, model?, app_version?}` → `{device_id, status, expires_at, plan, config_version, token}` |
| POST | `/activation/validate` | Bearer | `{key}` → informa se a KEY pode ser usada neste aparelho (não ativa) |
| POST | `/activation/activate` | Bearer | `{key}` → vincula KEY ao aparelho; retorna status + `config_version` |
| GET | `/device/status` | Bearer | status atual + `config_version` |
| POST | `/device/heartbeat` | Bearer | atualiza última conexão; retorna status + `config_version` + novo token |
| GET | `/device/config` | Bearer | fonte autorizada atribuída: `{config_version, source}` |
| GET | `/health` | — | `{status:"ok", db}` |

`status`: `nao_ativado` · `ativo` · `expirado` · `bloqueado`.

## Device ID
- `device_uid` é app-scoped: Android = UUID de instalação persistido; Tizen = UUID de aplicação ou UUID v4 persistido. Nunca MAC físico.
- `device_id` (resposta) é um identificador de exibição no formato `XX:XX:XX:XX:XX:XX`, derivado no servidor. A UI rotula "MAC / Device ID".

## Fonte remota (config_version)
- `config_version` = `"none"` quando não há fonte ou licença inativa; caso contrário, um hash que muda quando o admin envia/altera/remove a fonte.
- App guarda a última versão. Se mudar → `GET /device/config`. Se virar `"none"` → apagar a fonte gerenciada local.
- `source`: `{type:"m3u", m3u_url, epg_url?}` ou `{type:"xtream", server, username, password}` ou `null`.
- Credenciais são criptografadas (AES-256-GCM, `CONFIG_ENCRYPTION_KEY`) no banco, nunca registradas em log e só retornadas a aparelho com licença ativa vinculada. Licença expirada/bloqueada → `403 LICENSE_INACTIVE`.
- Xtream: os apps enviam usuário/senha no corpo POST de `player_api.php` (evita query string). URLs de stream seguem o formato do provedor.

## Códigos de erro
`VALIDATION` 400 · `UNAUTHORIZED` 401 · `LICENSE_INACTIVE` 403 · `DEVICE_BLOCKED` 403 · `DEVICE_NOT_FOUND` 404 · `KEY_INVALID` 404 · `KEY_IN_USE` 409 · `KEY_BLOCKED` 403 · `KEY_EXPIRED` 403 · `RATE_LIMITED` 429 · `INTERNAL` 500.