import { useState, useEffect } from "react";
import {
  Heart,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  ChevronLeft,
} from "lucide-react";
import { usePlayerStore } from "../../store/usePlayerStore";

function formatSeconds(sec) {
  if (!sec || isNaN(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s < 10 ? "0" : ""}${s}`;
}

export function MobilePlayerModal() {
  const {
    currentSong, isPlaying, isExpanded, currentTime, duration,
    togglePlay, setIsExpanded, seekTo, playNext, playPrev,
    addFavorite, removeFavorite, isFavorite
  } = usePlayerStore();

  const [isClosing, setIsClosing] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  const liked = isFavorite(currentSong?.id);
  const progressPercent = duration > 0 ? Math.min((currentTime / duration) * 100, 100) : 0;

  useEffect(() => {
    if (isExpanded) {
      setShouldRender(true);
      setIsClosing(false);
    } else if (shouldRender) {
      setIsClosing(true);
      const timer = setTimeout(() => {
        setShouldRender(false);
        setIsClosing(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isExpanded, shouldRender]);

  if (!shouldRender || !currentSong) return null;

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    seekTo(((e.clientX - rect.left) / rect.width) * duration);
  };

  const handleToggleFavorite = () => {
    if (liked) {
      removeFavorite(currentSong.id);
    } else {
      addFavorite(currentSong);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col justify-center items-center overflow-hidden bg-black/40 backdrop-blur-md md:hidden p-6 ${isClosing ? "animate-[overlayFadeOut_0.3s_ease-in_both]" : "animate-[overlayFadeIn_0.3s_ease-out_both]"}`}
    >
      <div className={`relative flex w-full max-w-[340px] flex-col overflow-hidden rounded-[2rem] bg-[#a8b8d0]/10 p-5 backdrop-blur-2xl shadow-[0_30px_60px_rgba(0,0,0,0.6),inset_0_0_20px_rgba(241,255,0,0.15)] border border-[#F1FF00]/30 ${isClosing ? "animate-[fadeOut_0.3s_ease-in_both]" : "animate-[fadeIn_0.3s_ease-out_both]"}`}>
        <div className="relative z-20 flex w-full items-center justify-between mb-4">
          <button
            onClick={() => setIsExpanded(false)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-md transition-colors hover:bg-[#F1FF00]/20 hover:text-[#F1FF00]"
          >
            <ChevronLeft className="h-5 w-5 pr-0.5" />
          </button>
          <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-white/50">
            Reproduciendo
          </span>
          <div className="w-9" />
        </div>

        <div className="relative z-10 flex w-full flex-col items-center flex-1">
          <div className="relative mb-5 w-full aspect-square overflow-hidden rounded-3xl shadow-2xl bg-black/20">
            <img
              src={currentSong.imageUrl}
              alt={currentSong.title}
              className="h-full w-full object-cover"
            />
            <button
              onClick={handleToggleFavorite}
              className={`absolute top-3 right-3 rounded-full bg-black/40 p-2 backdrop-blur-md transition-transform hover:scale-110 ${liked ? "text-[#F1FF00]" : "text-white/70"}`}
            >
              <Heart className={`h-5 w-5 ${liked ? "fill-current" : ""}`} />
            </button>
          </div>

          <div className="flex w-full flex-col items-center text-center px-2">
            <h2 className="font-heading text-xl font-black text-white line-clamp-1">
              {currentSong.title}
            </h2>
            <p className="font-sans text-sm text-white/80">
              {currentSong.artist}
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 mt-4">
            <div className="flex w-full items-center justify-between px-2">
              <button className="text-white/80 transition-colors hover:text-[#F1FF00]">
                <Shuffle className="h-4 w-4" />
              </button>
              <button className="text-white/80 transition-colors hover:text-[#F1FF00]">
                <Repeat className="h-4 w-4" />
              </button>
            </div>

            <div className="flex w-full flex-col gap-1.5 px-1">
              <div
                onClick={handleSeek}
                className="relative h-1.5 w-full rounded-full bg-white/20 cursor-pointer"
              >
                <div
                  className="absolute h-full rounded-full bg-gradient-to-r from-[#F1FF00] to-yellow-400 transition-all"
                  style={{ width: `${progressPercent}%` }}
                />
                <div
                  className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_10px_rgba(241,255,0,0.8)]"
                  style={{ left: `${progressPercent}%` }}
                />
              </div>
              <div className="flex w-full justify-between font-sans text-[10px] text-white/80 font-medium">
                <span>{formatSeconds(currentTime)}</span>
                <span>{formatSeconds(duration)}</span>
              </div>
            </div>

            <div className="flex w-full items-center justify-center gap-6 mt-1 mb-5">
              <button
                onClick={playPrev}
                className="text-white transition-colors hover:text-[#F1FF00] hover:scale-110 active:scale-95"
              >
                <SkipBack className="h-8 w-8 fill-current" />
              </button>
              <button
                onClick={togglePlay}
                className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F1FF00] text-[#06131c] shadow-neon transition-transform active:scale-95 flex-shrink-0"
              >
                {isPlaying ? (
                  <Pause className="h-7 w-7 fill-current" />
                ) : (
                  <Play className="h-7 w-7 fill-current ml-1" />
                )}
              </button>
              <button
                onClick={playNext}
                className="text-white transition-colors hover:text-[#F1FF00] hover:scale-110 active:scale-95"
              >
                <SkipForward className="h-8 w-8 fill-current" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
