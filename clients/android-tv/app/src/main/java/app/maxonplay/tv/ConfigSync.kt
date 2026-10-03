package app.maxonplay.tv

import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.Job
import kotlinx.coroutines.delay
import kotlinx.coroutines.isActive
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import org.json.JSONObject

/**
 * Sincroniza a fonte atribuída. Chame [apply] com qualquer resposta de register/activate/status/heartbeat.
 * - config_version igual → nada a fazer
 * - "none" → licença inativa ou sem fonte: remove fonte gerenciada (acesso revogado)
 * - diferente → GET /device/config e aplica
 */
class ConfigSync(
    private val api: Api,
    private val store: ConfigStore,
    private val onChanged: (JSONObject?) -> Unit,
    private val onStatus: (JSONObject) -> Unit,
) {
    private var job: Job? = null

    suspend fun apply(status: JSONObject) = withContext(Dispatchers.IO) {
        val version = status.optString("config_version", "none")
        if (version == store.configVersion) return@withContext
        if (version == "none" || status.optString("status") != "ativo") {
            store.managedSource = null
        } else {
            val cfg = api.config()
            store.managedSource = cfg.optJSONObject("source")
        }
        store.configVersion = version
        withContext(Dispatchers.Main) { onChanged(store.activeSource()) }
    }

    fun start(scope: CoroutineScope, intervalMs: Long = 5 * 60_000L) {
        job?.cancel()
        job = scope.launch(Dispatchers.IO) {
            while (isActive) {
                delay(intervalMs)
                runCatching {
                    val st = try { api.heartbeat() } catch (e: ApiException) {
                        if (e.http == 401) api.register(DeviceIdHolder.uid) else throw e
                    }
                    withContext(Dispatchers.Main) { onStatus(st) }
                    apply(st)
                }
            }
        }
    }

    fun stop() { job?.cancel() }
}

object DeviceIdHolder { lateinit var uid: String }