package app.maxonplay.tv

import android.content.Context
import java.util.UUID

/** Identificador app-scoped (installation ID). Não usa MAC físico nem IDs de hardware. */
object DeviceId {
    private const val PREFS = "maxon_device"
    private const val KEY = "installation_uuid"

    fun get(context: Context): String {
        val prefs = context.getSharedPreferences(PREFS, Context.MODE_PRIVATE)
        prefs.getString(KEY, null)?.let { return it }
        val id = "android-" + UUID.randomUUID().toString()
        prefs.edit().putString(KEY, id).apply()
        return id
    }
}