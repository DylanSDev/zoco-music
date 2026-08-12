import { FavoriteTrackRow } from "./FavoriteTrackRow";
import { Heart, Music } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function FavoritesTrackList({ tracks, likedIds, onToggleLike }) {
  const navigate = useNavigate();

  if (tracks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center rounded-2xl border border-white/5 bg-[#0F2A3B]/30 backdrop-blur-md p-8">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F1FF00]/10 text-[#F1FF00] mb-4 shadow-neon">
          <Heart className="h-8 w-8" />
        </div>
        <h3 className="font-heading text-xl font-bold text-white mb-2">
          No tienes canciones favoritas aún
        </h3>
        <p className="font-sans text-xs md:text-sm text-[#9bb2c4] max-w-sm mb-6 leading-relaxed">
          Explora la música y guarda tus temas preferidos marcando el icono de corazón.
        </p>
        <button
          onClick={() => navigate("/home")}
          className="flex items-center gap-2 rounded-full bg-[#F1FF00] px-6 py-2.5 font-sans text-xs font-bold text-black shadow-neon transition-all hover:scale-105"
        >
          <Music className="h-4 w-4" />
          <span>Explorar Inicio</span>
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full rounded-2xl border border-white/5 bg-[#0F2A3B]/40 backdrop-blur-md p-4 md:p-6 shadow-lg">
      <div className="hidden md:flex items-center justify-between px-3 pb-3 mb-2 border-b border-white/10 text-xs font-bold uppercase tracking-wider text-[#9bb2c4]">
        <div className="flex items-center gap-4 flex-1">
          <span className="w-6 text-center">#</span>
          <span>Título</span>
        </div>
        <div className="flex-1 px-4">
          <span>Álbum</span>
        </div>
        <div className="w-24 text-right pr-2">
          <span>Duración</span>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        {tracks.map((track, idx) => (
          <FavoriteTrackRow
            key={track.id}
            track={track}
            index={idx}
            isLiked={likedIds.has(track.id)}
            onToggleLike={onToggleLike}
            queue={tracks}
          />
        ))}
      </div>
    </div>
  );
}
