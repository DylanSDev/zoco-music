import { CheckCircle2, LogOut, Music2 } from "lucide-react";
import { useSpotifyStore } from "../../store/useSpotifyStore";
import { redirectToSpotifyAuthorize } from "../../utils/spotifyAuth";

export function SpotifySyncCard() {
  const { isAuthenticated, userProfile, isPremium, logout } = useSpotifyStore();

  return (
    <div className="w-full my-4 rounded-2xl border border-emerald-500/20 bg-[#0A1A24]/60 backdrop-blur-xl p-5 md:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg hover:border-emerald-500/40 transition-all duration-300">
      <div className="flex items-center gap-4 text-center sm:text-left">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#1DB954] text-black shadow-[0_0_15px_rgba(29,185,84,0.4)]">
          <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.02 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.48-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.281 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.18-.1.2-1.26-.42-.18-.6.42-1.26 1.02-1.44C9.54 6.06 16.56 6.3 21 8.94c.54.3.72 1.02.42 1.56-.3.42-1.02.6-1.56.36z" />
          </svg>
        </div>
        <div className="flex flex-col">
          <h3 className="font-heading text-lg font-bold text-white leading-tight">
            {isAuthenticated
              ? `Conectado como ${userProfile?.display_name || "Usuario de Spotify"}`
              : "Conecta tu cuenta de Spotify"}
          </h3>
          <p className="font-sans text-xs text-[#9bb2c4] mt-0.5">
            {isAuthenticated
              ? isPremium
                ? "Suscripción Spotify Premium (Reproducción HD Completa)"
                : "Cuenta Spotify Free (Vistas previas de 30s)"
              : "Inicia sesión para streaming de canciones completas"}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 flex-shrink-0">
        {isAuthenticated ? (
          <>
            <div className="px-4 py-1.5 rounded-full border border-[#F1FF00]/30 bg-[#0F2A3B]/90 text-[#F1FF00] text-xs font-semibold flex items-center gap-2 shadow-neon">
              <CheckCircle2 className="h-4 w-4 text-[#F1FF00]" />
              <span>{isPremium ? "Premium Active" : "Sincronizado"}</span>
            </div>
            <button
              onClick={logout}
              className="p-2 rounded-full border border-white/10 bg-white/5 text-[#9bb2c4] hover:text-white hover:bg-white/10 transition-all"
              title="Desconectar Spotify"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </>
        ) : (
          <button
            onClick={redirectToSpotifyAuthorize}
            className="px-4 py-2 rounded-xl bg-[#1DB954] hover:bg-[#1ed760] text-black font-bold text-xs flex items-center gap-2 shadow-lg transition-all duration-300 hover:scale-105"
          >
            <Music2 className="h-4 w-4" />
            <span>Conectar</span>
          </button>
        )}
      </div>
    </div>
  );
}
