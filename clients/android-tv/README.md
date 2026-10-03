# MAXON PLAY — Android TV (template)

Kotlin + Media3 ExoPlayer + Leanback launcher. Abra esta pasta no Android Studio (Koala+), ajuste `API_BASE_URL` em `app/build.gradle.kts` e gere o APK.

## Fluxo
1. `DeviceId` cria um UUID de instalação (app-scoped) salvo em SharedPreferences. **Não lê MAC físico.**
2. `POST /api/v1/device/register` → recebe `device_id` (formato MAC, exibido na tela), `status`, `config_version` e `token` (15 min).
3. Tela de ativação mostra **MAC / Device ID** + campo **KEY** → `POST /api/v1/activation/activate`.
4. Se `config_version != "none"` → `GET /api/v1/device/config` → recebe a fonte autorizada (M3U ou Xtream) e carrega sem digitar nada.
5. `ConfigSync` envia `POST /device/heartbeat` a cada 5 min; se `config_version` mudar, baixa a nova config. Se virar `"none"` (licença expirada/bloqueada, aparelho desvinculado), apaga a config local.
6. Sem fonte atribuída → a home oferece "Adicionar lista manualmente".

## Segurança
- Config fica em `EncryptedSharedPreferences` (androidx.security-crypto).
- Token só em memória/prefs criptografadas; nunca em logs.
- Use sempre HTTPS (`usesCleartextTraffic=false`).

## Estrutura
```
app/src/main/AndroidManifest.xml      LEANBACK_LAUNCHER, banner, sem touchscreen obrigatório
app/src/main/java/app/maxonplay/tv/
  DeviceId.kt        UUID persistido
  Api.kt             cliente HTTP (OkHttp) — register/activate/status/heartbeat/config
  ConfigStore.kt     armazenamento criptografado da fonte
  ConfigSync.kt      heartbeat + config_version
  Playlist.kt        parser M3U e cliente Xtream
  MainActivity.kt    ativação → home (Live TV, Filmes, Séries, Favoritos, Busca, Configurações)
  PlayerActivity.kt  Media3 ExoPlayer (HLS/TS/MP4)
```
Navegação D-pad: todos os itens são `focusable` com estado de foco visível (`res/drawable/focus_bg.xml`).

Nenhuma lista, canal ou servidor vem embutido.