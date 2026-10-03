package app.maxonplay.tv

import android.content.Context
import androidx.security.crypto.EncryptedSharedPreferences
import androidx.security.crypto.MasterKey
import org.json.JSONObject

/** Guarda a fonte (gerenciada ou manual) em armazenamento criptografado. */
class ConfigStore(context: Context) {
    private val prefs = EncryptedSharedPreferences.create(
        context, "maxon_config",
        MasterKey.Builder(context).setKeyScheme(MasterKey.KeyScheme.AES256_GCM).build(),
        EncryptedSharedPreferences.PrefKeyEncryptionScheme.AES256_SIV,
        EncryptedSharedPreferences.PrefValueEncryptionScheme.AES256_GCM,
    )

    var configVersion: String
        get() = prefs.getString("config_version", "") ?: ""
        set(v) = prefs.edit().putString("config_version", v).apply()

    /** JSON {type:"m3u", m3u_url} ou {type:"xtream", server, username, password}. */
    var managedSource: JSONObject?
        get() = prefs.getString("managed", null)?.let { JSONObject(it) }
        set(v) = prefs.edit().apply { if (v == null) remove("managed") else putString("managed", v.toString()) }.apply()

    var manualSource: JSONObject?
        get() = prefs.getString("manual", null)?.let { JSONObject(it) }
        set(v) = prefs.edit().apply { if (v == null) remove("manual") else putString("manual", v.toString()) }.apply()

    /** Fonte efetiva: a enviada pelo provedor tem prioridade sobre a manual. */
    fun activeSource(): JSONObject? = managedSource ?: manualSource
}