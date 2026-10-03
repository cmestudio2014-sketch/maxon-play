package app.maxonplay.tv

import android.os.Build
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.RequestBody.Companion.toRequestBody
import org.json.JSONObject
import java.util.concurrent.TimeUnit

class ApiException(val code: String, message: String, val http: Int) : Exception(message)

/** Cliente da API MAXON PLAY. Respostas: { ok, data } | { ok:false, error:{code,message} }. */
class Api(private val baseUrl: String = BuildConfig.API_BASE_URL) {
    private val http = OkHttpClient.Builder().callTimeout(20, TimeUnit.SECONDS).build()
    private val json = "application/json".toMediaType()
    @Volatile var token: String? = null

    private fun call(method: String, path: String, body: JSONObject? = null): JSONObject {
        val b = Request.Builder().url("$baseUrl/api/v1$path")
        token?.let { b.header("Authorization", "Bearer $it") }
        if (method == "POST") b.post((body ?: JSONObject()).toString().toRequestBody(json)) else b.get()
        http.newCall(b.build()).execute().use { res ->
            val obj = JSONObject(res.body?.string() ?: "{}")
            if (!obj.optBoolean("ok")) {
                val e = obj.optJSONObject("error")
                throw ApiException(e?.optString("code") ?: "NETWORK", e?.optString("message") ?: "Falha de rede", res.code)
            }
            return obj.getJSONObject("data")
        }
    }

    fun register(deviceUid: String): JSONObject = call("POST", "/device/register", JSONObject()
        .put("device_uid", deviceUid).put("platform", "android")
        .put("model", "${Build.MANUFACTURER} ${Build.MODEL}".take(80)).put("app_version", BuildConfig.VERSION_NAME))
        .also { token = it.optString("token", token) }

    fun activate(key: String) = call("POST", "/activation/activate", JSONObject().put("key", key))
    fun status() = call("GET", "/device/status")
    fun heartbeat() = call("POST", "/device/heartbeat").also { token = it.optString("token", token) }
    /** Fonte autorizada atribuída pelo painel. Só funciona com licença ativa. */
    fun config() = call("GET", "/device/config")
}