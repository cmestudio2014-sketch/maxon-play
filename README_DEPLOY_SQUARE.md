# Deploy na Square Cloud — MAXON PLAY

Runtime: Node.js (TanStack Start, preset `node-server`). Entrada: `scripts/square-start.mjs` (definida em `squarecloud.app`).

## 1. Banco PostgreSQL (gratuito)
Crie um banco em Neon / Supabase / Railway (qualquer PostgreSQL 13+). Copie a connection string (`postgres://...?sslmode=require`).
As migrations e o seed rodam sozinhos no primeiro boot (idempotentes).

## 2. Variáveis
Na Square Cloud → app → **Variáveis de ambiente**, cole o conteúdo de `.env.example` com valores reais:
- `DATABASE_URL`, `APP_URL`
- `JWT_SECRET` e `CONFIG_ENCRYPTION_KEY` → `openssl rand -hex 32` (dois valores diferentes)
- `ADMIN_EMAIL`, `ADMIN_PASSWORD` (≥10 caracteres)
- `WHATSAPP_NUMBER` (opcional; editável no painel)

**Não troque `CONFIG_ENCRYPTION_KEY` depois**: as credenciais das fontes salvas ficam ilegíveis.

## 3. Verificar localmente (opcional, recomendado)
```bash
npm install
cp .env.example .env   # preencha
node --env-file=.env scripts/predeploy-check.mjs   # env + conexão + migrations + build
```

## 4. Enviar
- **ZIP**: compacte o projeto **sem** `node_modules`, `.output`, `.git`, `.data`, `.env` e faça upload no painel.
- **GitHub**: conecte o repositório na Square Cloud.

No start, `square-start.mjs` instala dependências se necessário, executa `build:node` (se `.output` não existir ou `FORCE_BUILD=true`), roda migrations e sobe em `0.0.0.0:$PORT` (padrão 80).

## 5. Conferir
- `https://SEU-APP.squareweb.app/health` → `{"status":"ok","db":"postgres"}`
- `/admin` → login com `ADMIN_EMAIL`/`ADMIN_PASSWORD`
- `/planos`, `/ativar`, `/cliente`, `/player`

## 6. Apps de TV
Troque a URL base em `clients/android-tv/app/build.gradle.kts` (`API_BASE_URL`) e `clients/tizen-tv/js/config.js` + `config.xml` (`<access origin>`).