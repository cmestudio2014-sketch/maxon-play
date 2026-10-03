package app.maxonplay.tv

import android.content.Intent
import android.os.Bundle
import android.view.Gravity
import android.view.ViewGroup
import android.widget.Button
import android.widget.EditText
import android.widget.LinearLayout
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import org.json.JSONObject

/**
 * Template mínimo: tela de ativação (MAC / Device ID + KEY) e home.
 * Substitua as Views simples por Leanback BrowseSupportFragment para a home completa
 * (Live TV, Filmes, Séries, Favoritos, Busca, Configurações).
 */
class MainActivity : AppCompatActivity() {
    private val api = Api()
    private lateinit var store: ConfigStore
    private lateinit var sync: ConfigSync
    private lateinit var root: LinearLayout

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        store = ConfigStore(this)
        DeviceIdHolder.uid = DeviceId.get(this)
        root = LinearLayout(this).apply { orientation = LinearLayout.VERTICAL; gravity = Gravity.CENTER; setPadding(96, 64, 96, 64) }
        setContentView(root)
        sync = ConfigSync(api, store, onChanged = { showHome() }, onStatus = { st -> if (st.optString("status") != "ativo") showActivation(st) })
        boot()
    }

    private fun boot() = lifecycleScope.launch {
        val st = runCatching { withContext(Dispatchers.IO) { api.register(DeviceIdHolder.uid) } }.getOrElse { e -> return@launch text("Sem conexão: ${e.message}") }
        if (st.optString("status") == "ativo") { sync.apply(st); showHome(); sync.start(lifecycleScope) } else showActivation(st)
    }

    private fun showActivation(st: JSONObject) {
        root.removeAllViews()
        text("MAXON PLAY", 40f)
        text("MAC / Device ID", 18f)
        text(st.optString("device_id"), 44f)
        if (st.optString("status") != "nao_ativado") text("Status: ${st.optString("status")}", 18f)
        val key = EditText(this).apply { hint = "XXXX-XXXX-XXXX-XXXX"; textSize = 28f; isSingleLine = true; isFocusable = true }
        root.addView(key, ViewGroup.LayoutParams(900, ViewGroup.LayoutParams.WRAP_CONTENT))
        val btn = Button(this).apply { text = "Ativar"; textSize = 22f; setBackgroundResource(R.drawable.focus_bg) }
        root.addView(btn)
        btn.setOnClickListener {
            lifecycleScope.launch {
                runCatching { withContext(Dispatchers.IO) { api.activate(key.text.toString()) } }
                    .onSuccess { res -> sync.apply(res); showHome(); sync.start(lifecycleScope) }
                    .onFailure { e -> text(e.message ?: "Erro", 18f) }
            }
        }
        key.requestFocus()
    }

    private fun showHome() {
        root.removeAllViews()
        val source = store.activeSource()
        text("MAXON PLAY", 36f)
        if (source == null) {
            text("Nenhuma lista configurada.", 22f)
            root.addView(Button(this).apply { text = "Adicionar lista manualmente"; setBackgroundResource(R.drawable.focus_bg); setOnClickListener { manualDialog() } })
            return
        }
        text(if (store.managedSource != null) "Lista enviada pelo provedor" else "Lista manual", 18f)
        lifecycleScope.launch {
            val items = runCatching { withContext(Dispatchers.IO) { Playlist.load(source) } }.getOrElse { emptyList() }
            text("${items.size} itens carregados", 18f)
            items.take(30).forEach { item ->
                root.addView(Button(this@MainActivity).apply {
                    text = "${item.group} · ${item.name}"; isFocusable = true; setBackgroundResource(R.drawable.focus_bg)
                    setOnClickListener { startActivity(Intent(this@MainActivity, PlayerActivity::class.java).putExtra("url", item.url)) }
                })
            }
        }
    }

    private fun manualDialog() {
        val input = EditText(this).apply { hint = "URL M3U autorizada" }
        androidx.appcompat.app.AlertDialog.Builder(this).setTitle("Adicionar lista").setView(input)
            .setPositiveButton("Salvar") { _, _ -> store.manualSource = JSONObject().put("type", "m3u").put("m3u_url", input.text.toString()); showHome() }
            .setNegativeButton("Cancelar", null).show()
    }

    private fun text(s: String, size: Float = 20f) = root.addView(TextView(this).apply { text = s; textSize = size; gravity = Gravity.CENTER })

    override fun onDestroy() { sync.stop(); super.onDestroy() }
}