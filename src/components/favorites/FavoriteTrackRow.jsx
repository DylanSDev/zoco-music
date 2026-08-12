import { Play, Pause, Heart } from "lucide-react";
import { usePlayerStore } from "../../store/usePlayerStore";

export function FavoriteTrackRow({ track, index, isLiked, onToggleLike, queue }) {
  const { currentSong, isPlaying, playSong, togglePlay, setIsExpanded } = usePlayerStore();
  const isCurrent = currentSong?.id === track.id;

  const handlePlay = (e) => {
    e.stopPropagation();
    if (isCurrent) {
      togglePlay();
    } else {
      playSong({
        id: track.id,
        title: track.title,
        artist: track.artist,
        imageUrl: track.image,
        duration: track.duration,
        previewUrl: track.previewUrl,
        spotifyUri: track.spotifyUri
      }, queue ?? null);
    }
    if (window.innerWidth < 768) {
      setIsExpanded(true);
    }
  };

  return (
    <div
      onClick={handlePlay}
      className={`group flex items-center justify-between gap-4 p-3 rounded-xl border transition-all duration-300 cursor-pointer ${
        isCurrent
          ? "border-[#F1FF00]/40 bg-[#F1FF00]/10 shadow-sm"
          : "border-transparent bg-white/0 hover:border-white/10 hover:bg-white/5"
      }`}
    >
      <div className="flex items-center gap-3.5 min-w-0 flex-1">
        <span className="w-6 text-center font-sans text-xs font-bold text-[#9bb2c4] group-hover:hidden">
          {index + 1}
        </span>
        <button
          onClick={handlePlay}
          className="hidden w-6 items-center justify-center text-[#F1FF00] group-hover:flex"
        >
          {isCurrent && isPlaying ? (
            <Pause className="h-4 w-4 fill-current" />
          ) : (
            <Play className="h-4 w-4 fill-current ml-0.5" />
          )}
        </button>

        <div className="relative h-11 w-11 flex-shrink-0 overflow-hidden rounded-lg border border-white/10 bg-[#06131c]">
          <img
            src={track.image}
            alt={track.title}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="min-w-0 flex-1">
          <h4
            className={`truncate font-sans text-sm font-bold transition-colors ${
              isCurrent ? "text-[#F1FF00]" : "text-white group-hover:text-[#F1FF00]"
            }`}
          >
            {track.title}
          </h4>
          <p className="truncate font-sans text-xs text-[#9bb2c4]">
            {track.artist}
          </p>
        </div>
      </div>

      <div className="hidden md:block flex-1 min-w-0 px-4">
        <p className="truncate font-sans text-xs text-[#9bb2c4]">
          {track.album}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleLike(track.id);
          }}
          className="p-1.5 transition-transform duration-200 hover:scale-110"
        >
          <Heart
            className={`h-4 w-4 transition-colors ${
              isLiked
                ? "text-[#F1FF00] fill-current drop-shadow-[0_0_8px_rgba(241,255,0,0.7)]"
                : "text-white/40 hover:text-white"
            }`}
          />
        </button>

        <span className="font-sans text-xs font-medium text-[#9bb2c4] w-12 text-right">
          {track.duration}
        </span>
      </div>
    </div>
  );
}
