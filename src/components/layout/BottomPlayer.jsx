import { useState } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Heart,
  Volume2,
  VolumeX,
} from "lucide-react";

export function BottomPlayer({ isSidebarExpanded = false }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  const coverImage =
    "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/daily-music-remix-spotify-album-cover-art-design-template-1ea8a797c35a4eafb323d9c3f7d08130_screen.jpg?ts=1602184061";

  return (
    <div
      className={`fixed bottom-20 left-4 right-4 z-40 rounded-2xl border border-white/10 bg-[#0F2A3B]/60 px-4 py-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-2xl transition-all duration-300 md:bottom-5 ${
        isSidebarExpanded
          ? "md:left-[calc(14rem+3rem)] lg:left-[calc(14rem+4rem)] 2xl:left-[calc(14rem+6rem)]"
          : "md:left-[calc(5rem+3rem)] lg:left-[calc(5rem+4rem)] 2xl:left-[calc(5rem+6rem)]"
      } md:right-16 lg:right-20 2xl:right-28`}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg border border-white/10 md:h-11 md:w-11">
            <img
              src={coverImage}
              alt="Midnight Drive"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="min-w-0">
            <h4 className="truncate font-sans text-xs font-bold text-white md:text-sm">
              Midnight Drive
            </h4>
            <p className="truncate font-sans text-[11px] text-[#9bb2c4]">
              Cybernetic Pulse
            </p>
          </div>
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`ml-1 hidden flex-shrink-0 transition-colors duration-200 hover:text-white sm:block ${
              isLiked ? "text-[#F1FF00]" : "text-[#9bb2c4]"
            }`}
          >
            <Heart className="h-4 w-4 fill-current" />
          </button>
        </div>

        <div className="flex flex-1 flex-col items-center gap-1.5 max-w-md">
          <div className="flex items-center gap-4">
            <button className="hidden text-[#9bb2c4] transition-colors hover:text-white sm:block">
              <Shuffle className="h-3.5 w-3.5" />
            </button>
            <button className="text-[#9bb2c4] transition-colors hover:text-white">
              <SkipBack className="h-4 w-4 fill-current" />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F1FF00] text-[#06131c] shadow-neon transition-transform duration-200 hover:scale-105 active:scale-95"
            >
              {isPlaying ? (
                <Pause className="h-4 w-4 fill-current" />
              ) : (
                <Play className="h-4 w-4 fill-current ml-0.5" />
              )}
            </button>
            <button className="text-[#9bb2c4] transition-colors hover:text-white">
              <SkipForward className="h-4 w-4 fill-current" />
            </button>
            <button className="hidden text-[#9bb2c4] transition-colors hover:text-white sm:block">
              <Repeat className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="hidden w-full items-center gap-2.5 sm:flex">
            <span className="font-sans text-[10px] text-[#9bb2c4]">2:14</span>
            <div className="relative h-1 flex-1 rounded-full bg-white/10">
              <div
                className="absolute h-full rounded-full bg-gradient-to-r from-[#F1FF00] to-yellow-400"
                style={{ width: "50%" }}
              />
            </div>
            <span className="font-sans text-[10px] text-[#9bb2c4]">4:30</span>
          </div>
        </div>

        <div className="hidden items-center gap-2.5 sm:flex min-w-[120px] justify-end">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="text-[#9bb2c4] transition-colors hover:text-[#F1FF00]"
          >
            {isMuted ? (
              <VolumeX className="h-4 w-4 text-[#9bb2c4]/50" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
          </button>
          <div className="relative h-1 w-20 rounded-full bg-white/10 cursor-pointer">
            <div
              className={`absolute h-full rounded-full transition-all ${
                isMuted ? "bg-white/20 w-0" : "bg-[#F1FF00] w-[70%]"
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default BottomPlayer;
