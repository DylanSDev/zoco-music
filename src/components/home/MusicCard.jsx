import { Play } from "lucide-react";

export function MusicCard({ title, subtitle, imageUrl }) {
  return (
    <div className="group relative rounded-2xl border border-white/5 bg-black/20 p-4 transition-all duration-300 hover:bg-black/40 hover:shadow-lg backdrop-blur-md">
      <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-white/5 mb-4">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <button className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F1FF00] text-[#06131c] shadow-neon transition-transform duration-300 hover:scale-105 active:scale-95 translate-y-4 group-hover:translate-y-0">
            <Play className="h-6 w-6 fill-current ml-0.5" />
          </button>
        </div>
      </div>
      <h3 className="truncate font-sans text-base font-bold text-white mb-1">{title}</h3>
      <p className="truncate font-sans text-xs text-[#9bb2c4]">{subtitle}</p>
    </div>
  );
}
