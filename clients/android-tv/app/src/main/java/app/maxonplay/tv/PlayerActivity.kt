package app.maxonplay.tv

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.media3.common.MediaItem
import androidx.media3.exoplayer.ExoPlayer
import androidx.media3.ui.PlayerView

/** Reprodução com Media3 ExoPlayer (HLS, TS, MP4). D-pad controla via PlayerView. */
class PlayerActivity : AppCompatActivity() {
    private var player: ExoPlayer? = null

    override fun onStart() {
        super.onStart()
        val view = PlayerView(this).also { setContentView(it) }
        player = ExoPlayer.Builder(this).build().also { p ->
            view.player = p
            p.setMediaItem(MediaItem.fromUri(intent.getStringExtra("url") ?: return finish()))
            p.prepare(); p.playWhenReady = true
        }
        view.requestFocus()
    }

    override fun onStop() { player?.release(); player = null; super.onStop() }
}