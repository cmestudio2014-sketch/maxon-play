# FINAL CHECKLIST — MAXON PLAY

## Já automático
- [x] Migrations + seed idempotentes no boot (planos 30 dias R$30 e 12 meses R$90, editáveis no painel).
- [x] Primeiro admin criado a partir de `ADMIN_EMAIL`/`ADMIN_PASSWORD` (sem senha fixa no repositório).
- [x] Expiração automática de licenças (sweep periódico + verificação a cada requisição).
- [x] Build `node-server` e start em `0.0.0.0:$PORT` via `squarecloud.app` → `scripts/square-start.mjs`.
- [x] `/health` com teste do banco.
- [x] Headers de segurança, rate limit (login, ativação, API), validação Zod, RBAC admin/vendedor.
- [x] `JWT_SECRET` e `CONFIG_ENCRYPTION_KEY` obrigatórios em produção (≥32 caracteres, diferentes).
- [x] KEYs aleatórias (crypto), guardadas por hash; logs mostram só os 4 últimos caracteres.
- [x] Fontes / Listas: M3U ou Xtream criptografadas (AES-256-GCM), "Enviar lista ao ativar", "Fonte atribuída", "Sincronizar no aparelho", `config_version`, revogação ao expirar/bloquear/desvincular, auditoria sem credenciais.
- [x] API `/api/v1` documentada (`docs/API.md`, `docs/openapi.yaml`).
- [x] Templates `clients/android-tv` (Kotlin/Media3/Leanback) e `clients/tizen-tv` (.wgt local, AVPlay, remote keys).
- [x] `scripts/predeploy-check.mjs` valida env, conexão, migrations e build.
- [x] Testado: build de produção + PostgreSQL real → `/health` ok, `/planos` com preços do banco, admin criado.

## Valores reais que você precisa informar
1. `DATABASE_URL` — PostgreSQL externo (Neon/Supabase gratuito).
2. `APP_URL` — URL final da Square Cloud (https).
3. `JWT_SECRET` e `CONFIG_ENCRYPTION_KEY` — `openssl rand -hex 32` (duas vezes). Guarde a chave de criptografia em local seguro.
4. `ADMIN_EMAIL` e `ADMIN_PASSWORD`.
5. `WHATSAPP_NUMBER` (opcional; também em Painel > Configurações).
6. URL da API nos apps: `API_BASE_URL` (Android) e `js/config.js` + `<access origin>` (Tizen).
7. Ícones/banner próprios dos apps (`icon.png`, `banner`, `ic_launcher`) e certificado de assinatura (Android keystore / perfil Samsung).

## Após o primeiro boot
- Entre em `/admin`, revise preços em **Planos** e o WhatsApp em **Configurações**.
- Mantenha `SEED_DEMO=false` em produção.