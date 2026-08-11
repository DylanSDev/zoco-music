import { useState } from "react";
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Heart, Volume2 } from "lucide-react";

export function BottomPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(true);

  return (
    <div className="fixed bottom-20 left-4 right-4 z-40 mx-auto max-w-7xl rounded-2xl border border-white/10 bg-[#0F2A3B]/40 px-4 py-3 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl transition-all duration-300 md:bottom-6 md:left-24 md:right-6 md:px-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-xl border border-white/5">
            <img
              src="https://images.unsplash.com/photo-1614680376593-902f74fa0d41?w=80&auto=format&fit=crop&q=60"
              alt="Midnight Drive"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="min-w-0">
            <h4 className="truncate font-sans text-sm font-semibold text-white">Midnight Drive</h4>
            <p className="truncate font-sans text-xs text-[#9bb2c4]">Cybernetic Pulse</p>
          </div>
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`ml-2 hidden flex-shrink-0 transition-colors duration-200 hover:text-white sm:block ${
              isLiked ? "text-[#F1FF00]" : "text-[#9bb2c4]"
            }`}
          >
            <Heart className="h-5 w-5 fill-current" />
          </button>
        </div>

        <div className="flex flex-1 flex-col items-center gap-2 max-w-xl">
          <div className="flex items-center gap-5">
            <button className="hidden text-[#9bb2c4] transition-colors hover:text-white sm:block">
              <Shuffle className="h-4 w-4" />
            </button>
            <button className="text-[#9bb2c4] transition-colors hover:text-white">
              <SkipBack className="h-5 w-5 fill-current" />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F1FF00] text-[#06131c] transition-transform duration-200 hover:scale-105 active:scale-95"
            >
              {isPlaying ? <Pause className="h-5 w-5 fill-current" /> : <Play className="h-5 w-5 fill-current ml-0.5" />}
            </button>
            <button className="text-[#9bb2c4] transition-colors hover:text-white">
              <SkipForward className="h-5 w-5 fill-current" />
            </button>
            <button className="hidden text-[#9bb2c4] transition-colors hover:text-white sm:block">
              <Repeat className="h-4 w-4" />
            </button>
          </div>

          <div className="hidden w-full items-center gap-3 sm:flex">
            <span className="font-sans text-xs text-[#9bb2c4]">2:14</span>
            <div className="relative h-1.5 flex-1 rounded-full bg-white/10">
              <div
                className="absolute h-full rounded-full bg-gradient-to-r from-[#F1FF00] to-yellow-400"
                style={{ width: "50%" }}
              />
            </div>
            <span className="font-sans text-xs text-[#9bb2c4]">4:30</span>
          </div>
        </div>

        <div className="hidden items-center gap-3 sm:flex min-w-[120px] justify-end">
          <Volume2 className="h-5 w-5 text-[#9bb2c4]" />
          <div className="relative h-1.5 w-20 rounded-full bg-white/10">
            <div className="absolute h-full rounded-full bg-[#F1FF00]" style={{ width: "70%" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
