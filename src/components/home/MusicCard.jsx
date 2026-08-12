import { Play, Pause } from "lucide-react";
import { usePlayerStore } from "../../store/usePlayerStore";

export function MusicCard({ title, subtitle, imageUrl, duration = "3:30", previewUrl, spotifyUri }) {
  const { currentSong, isPlaying, playSong, togglePlay, setIsExpanded } = usePlayerStore();
  const isCurrentTrack = currentSong?.title === title;

  const handlePlay = (e) => {
    e.stopPropagation();
    if (isCurrentTrack) {
      togglePlay();
    } else {
      playSong({
        title,
        artist: subtitle,
        imageUrl,
        duration,
        previewUrl,
        spotifyUri
      });
    }
    if (window.innerWidth < 768) {
      setIsExpanded(true);
    }
  };

  return (
    <div
      onClick={handlePlay}
      className={`group relative rounded-2xl border p-4 transition-all duration-300 backdrop-blur-md cursor-pointer ${
        isCurrentTrack
          ? "border-[#F1FF00]/50 bg-[#0F2A3B]/80 shadow-[0_0_20px_rgba(241,255,0,0.15)]"
          : "border-white/5 bg-black/20 hover:bg-black/40 hover:border-white/10 hover:shadow-lg"
      }`}
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-white/5 mb-4">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div
          className={`absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity duration-300 ${
            isCurrentTrack ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
        >
          <button
            onClick={handlePlay}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F1FF00] text-[#06131c] shadow-neon transition-transform duration-300 hover:scale-105 active:scale-95"
          >
            {isCurrentTrack && isPlaying ? (
              <Pause className="h-6 w-6 fill-current" />
            ) : (
              <Play className="h-6 w-6 fill-current ml-0.5" />
            )}
          </button>
        </div>
      </div>
      <h3
        className={`truncate font-sans text-base font-bold mb-1 transition-colors ${
          isCurrentTrack ? "text-[#F1FF00]" : "text-white group-hover:text-[#F1FF00]"
        }`}
      >
        {title}
      </h3>
      <p className="truncate font-sans text-xs text-[#9bb2c4]">{subtitle}</p>
    </div>
  );
}
