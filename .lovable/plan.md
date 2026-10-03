# MAXON PLAY IPTV — Plano de construção

Plataforma legal de player IPTV: painel de vendas/ativação, API para dispositivos, web player para listas do próprio usuário e base de código para Android TV e Samsung Tizen. Nenhum canal, lista, credencial ou asset de terceiros incluído.

## Decisão principal: banco e deploy

O preview roda na infraestrutura Lovable; a Square Cloud roda Node.js. Para servir os dois sem retrabalho:

- **Banco: PostgreSQL puro** acessado por uma camada própria (`src/server/db`) usando `DATABASE_URL`. Funciona com Lovable Cloud (Postgres gerenciado) no preview e com qualquer PostgreSQL externo na Square Cloud (Neon, Supabase free, Railway etc.).
- **Autenticação própria** (email + senha com hash, sessão JWT curta em cookie httpOnly) e RBAC admin/vendedor — independente de provedor, portátil.
- **Build Node** para Square Cloud (preset Node do TanStack Start) com `squarecloud.app`, `START` e `/health`.

Suposição: Lovable Cloud será ativado apenas como Postgres para o preview. Se preferir outro caminho, ajuste antes de aprovar.

## Páginas públicas
- `/` — landing MAXON PLAY (logo textual, chamada, links para planos e ativação)
- `/planos` — cards 30 dias e 12 meses (preços vindos do banco), CTA "Comprar agora" via WhatsApp configurável, FAQ
- `/ativar` — mostra "MAC / Device ID" + campo KEY
- `/cliente` — consulta por KEY + WhatsApp: validade e dispositivos (mascarados)
- `/player` — web player: adicionar playlist M3U ou Xtream Codes (salva só no navegador), Live TV, Filmes, Séries, Favoritos, Busca, Configurações, navegação por teclado/controle

## Painel `/admin` (login obrigatório)
- Dashboard: clientes, ativações ativas/expiradas, vendas, receita, vencimentos próximos (7 dias)
- Clientes, Dispositivos, Ativações (gerar KEY segura, renovar 30d/12m, bloquear/desbloquear, trocar dispositivo com auditoria)
- Planos (preço editável; seed R$30 e R$90), Vendas, Cupons, Usuários (somente admin), Logs/auditoria, Configurações (WhatsApp, nome da marca)
- Vendedor: clientes, ativações, vendas; sem usuários/planos/configurações

## API REST `/api/v1`
- `POST device/register`, `POST activation/validate`, `POST activation/activate`, `GET device/status`, `POST device/heartbeat`, além de `GET /health`
- Respostas `{ ok, data | error: { code, message } }`, validação Zod, rate limit por IP/dispositivo, token de dispositivo curto (JWT 15 min) renovado no heartbeat, nunca retorna KEY completa nem dados do cliente
- Documentação em `docs/API.md` + OpenAPI `docs/openapi.yaml`

## Clientes de TV (`clients/`)
- `clients/android-tv/` — Kotlin + Media3 ExoPlayer, Leanback launcher, foco D-pad, installation ID (UUID persistido), telas de ativação/home, parser M3U e cliente Xtream, Gradle
- `clients/tizen/` — Web App local (.wgt): `config.xml`, HTML/CSS/JS, AVPlay com fallback `<video>`, teclas do controle, ID via `tizen.systeminfo`/UUID persistido, instruções de empacotamento com Tizen Studio/CLI
- `docs/` — especificação de identificador, fluxo de ativação, segurança

## Square Cloud
- `squarecloud.app`, `.env.example` (DATABASE_URL, JWT_SECRET, APP_URL, WHATSAPP_NUMBER, ADMIN_EMAIL, ADMIN_PASSWORD, RATE_LIMIT_*), scripts `build`/`start`/`db:migrate`/`db:seed`
- `db/migrations/*.sql` e `db/seed.sql` (dados demo fictícios, sem conteúdo IPTV)
- `README_DEPLOY.md` curto: exportar ZIP/GitHub, criar banco externo, configurar variáveis, migrar, subir

## Design
Escuro, TV-friendly: fundo grafite profundo, acento laranja-âmbar elétrico, tipografia Sora (títulos) + Manrope (texto), cards grandes com foco visível (anel brilhante) para navegação por controle. Logo textual "MAXON ▶ PLAY".

## Detalhes técnicos
- TanStack Start + server functions para o painel; server routes para a API pública (`/api/v1/*` verificando token do dispositivo internamente)
- `pg` driver com pool; consultas parametrizadas; repositórios por entidade
- KEYs: 16 chars base32 via `crypto.getRandomValues`, armazenadas com hash SHA-256 + últimos 4 dígitos para exibição
- Rate limit em memória no preview; documentado uso de Redis/Upstash opcional em produção
- Entrega em etapas: (1) base, banco, auth e painel; (2) API + páginas públicas; (3) player web; (4) clientes TV + deploy docs