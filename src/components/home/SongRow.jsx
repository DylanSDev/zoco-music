import { useState } from "react";
import { Heart, Play } from "lucide-react";
import { usePlayerStore } from "../../store/usePlayerStore";

export function SongRow({ title, artist, duration, imageUrl, isFavoriteInitial = false }) {
  const [isFavorite, setIsFavorite] = useState(isFavoriteInitial);
  const { playSong } = usePlayerStore();

  const handlePlay = () => {
    playSong({ title, artist, duration, imageUrl });
  };

  return (
    <div 
      className="group flex items-center justify-between rounded-xl border border-white/5 bg-[#0F2A3B]/10 p-3 transition-all duration-200 hover:bg-[#0F2A3B]/40 cursor-pointer"
      onClick={handlePlay}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg border border-white/5">
          <img src={imageUrl} alt={title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
            <Play className="h-4 w-4 text-[#F1FF00] fill-current" />
          </div>
        </div>
        <div className="min-w-0">
          <h4 className="truncate font-sans text-sm font-semibold text-white">{title}</h4>
          <p className="truncate font-sans text-xs text-[#9bb2c4]">{artist}</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span className="font-sans text-xs text-[#9bb2c4]">{duration}</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
          className={`transition-colors duration-200 hover:text-white ${
            isFavorite ? "text-[#F1FF00]" : "text-[#9bb2c4]"
          }`}
        >
          <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
        </button>
      </div>
    </div>
  );
}
