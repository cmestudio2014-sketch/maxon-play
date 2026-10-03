package app.maxonplay.tv

import okhttp3.FormBody
import okhttp3.OkHttpClient
import okhttp3.Request
import org.json.JSONArray
import org.json.JSONObject
import java.net.URLEncoder

data class Item(val id: String, val name: String, val logo: String?, val group: String, val url: String, val kind: String)

/** Carrega a fonte autorizada do usuário. Nenhuma lista embutida. */
object Playlist {
    private val http = OkHttpClient()

    fun load(source: JSONObject): List<Item> = when (source.optString("type")) {
        "m3u" -> parseM3U(get(source.getString("m3u_url")))
        "xtream" -> xtream(source.getString("server").trimEnd('/'), source.getString("username"), source.getString("password"))
        else -> emptyList()
    }

    private fun get(url: String): String = http.newCall(Request.Builder().url(url).build()).execute().use { it.body?.string() ?: "" }

    fun parseM3U(text: String): List<Item> {
        val out = mutableListOf<Item>()
        var name = ""; var logo: String? = null; var group = "Geral"; var pending = false
        val attr = { line: String, k: String -> Regex("$k=\"([^\"]*)\"").find(line)?.groupValues?.get(1) }
        text.lineSequence().map { it.trim() }.forEach { line ->
            if (line.startsWith("#EXTINF")) {
                name = line.substringAfter(",").trim().ifEmpty { "Sem nome" }
                logo = attr(line, "tvg-logo"); group = attr(line, "group-title") ?: "Geral"; pending = true
            } else if (pending && line.isNotEmpty() && !line.startsWith("#")) {
                val kind = when { "/movie/" in line -> "movie"; "/series/" in line -> "series"; else -> "live" }
                out += Item(out.size.toString(), name, logo, group, line, kind); pending = false
            }
        }
        return out
    }

    /** Credenciais enviadas no corpo POST (evita query string). */
    private fun xtream(base: String, user: String, pass: String): List<Item> {
        fun api(action: String): JSONArray {
            val body = FormBody.Builder().add("username", user).add("password", pass).add("action", action).build()
            val txt = http.newCall(Request.Builder().url("$base/player_api.php").post(body).build()).execute().use { it.body?.string() ?: "[]" }
            return runCatching { JSONArray(txt) }.getOrDefault(JSONArray())
        }
        fun cats(a: String) = api(a).let { arr -> (0 until arr.length()).associate { arr.getJSONObject(it).let { c -> c.optString("category_id") to c.optString("category_name") } } }
        val u = URLEncoder.encode(user, "UTF-8"); val p = URLEncoder.encode(pass, "UTF-8")
        val out = mutableListOf<Item>()
        val lc = cats("get_live_categories"); val vc = cats("get_vod_categories")
        api("get_live_streams").let { a -> for (i in 0 until a.length()) a.getJSONObject(i).let { s ->
            out += Item("l${s.optInt("stream_id")}", s.optString("name"), s.optString("stream_icon"), lc[s.optString("category_id")] ?: "Geral", "$base/live/$u/$p/${s.optInt("stream_id")}.m3u8", "live") } }
        api("get_vod_streams").let { a -> for (i in 0 until a.length()) a.getJSONObject(i).let { s ->
            out += Item("v${s.optInt("stream_id")}", s.optString("name"), s.optString("stream_icon"), vc[s.optString("category_id")] ?: "Geral", "$base/movie/$u/$p/${s.optInt("stream_id")}.${s.optString("container_extension", "mp4")}", "movie") } }
        return out
    }
}