import { Play, Pause } from "lucide-react";
import { usePlayerStore } from "../../store/usePlayerStore";

export function RecentHistoryCard({ title, subtitle, image, duration }) {
  const { currentSong, isPlaying, playSong, togglePlay, setIsExpanded } = usePlayerStore();
  const isCurrentTrack = currentSong?.title === title;

  const handlePlayTrack = (e) => {
    e.stopPropagation();
    if (isCurrentTrack) {
      togglePlay();
    } else {
      playSong({
        title,
        artist: subtitle,
        imageUrl: image,
        duration: duration || "3:45"
      });
    }
    if (window.innerWidth < 768) {
      setIsExpanded(true);
    }
  };

  return (
    <div
      onClick={handlePlayTrack}
      className={`group relative flex flex-col rounded-2xl border bg-[#0F2A3B]/40 backdrop-blur-md p-4 transition-all duration-300 hover:border-[#F1FF00]/40 hover:bg-[#0F2A3B]/70 hover:shadow-lg cursor-pointer ${
        isCurrentTrack ? "border-[#F1FF00]/60 bg-[#0F2A3B]/80" : "border-white/5"
      }`}
    >
      <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-3 bg-[#06131c]">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${
          isCurrentTrack ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}>
          <div className="h-12 w-12 rounded-full bg-[#F1FF00] text-black flex items-center justify-center shadow-neon transform scale-90 group-hover:scale-100 transition-transform">
            {isCurrentTrack && isPlaying ? (
              <Pause className="h-6 w-6 fill-current" />
            ) : (
              <Play className="h-6 w-6 fill-current ml-0.5" />
            )}
          </div>
        </div>
      </div>

      <h4 className={`font-sans text-base font-bold truncate transition-colors ${
        isCurrentTrack ? "text-[#F1FF00]" : "text-white group-hover:text-[#F1FF00]"
      }`}>
        {title}
      </h4>
      <p className="font-sans text-xs text-[#9bb2c4] truncate mt-0.5">
        {subtitle}
      </p>
    </div>
  );
}

