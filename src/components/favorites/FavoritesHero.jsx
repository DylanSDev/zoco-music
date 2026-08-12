import { Heart, Play, Shuffle, Search } from "lucide-react";

export function FavoritesHero({
  title,
  description,
  totalTracks,
  totalDuration,
  onPlayAll,
  onShuffle,
  searchQuery,
  onSearchChange,
}) {
  return (
    <div className="relative flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-8 p-6 md:p-8 rounded-3xl border border-[#F1FF00]/20 bg-[#0F2A3B]/60 backdrop-blur-2xl shadow-lg mb-8 overflow-hidden">
      <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-[#F1FF00]/15 blur-3xl pointer-events-none" />

      <div className="relative flex h-36 w-36 md:h-44 md:w-44 flex-shrink-0 items-center justify-center rounded-2xl md:rounded-3xl border border-[#F1FF00]/40 bg-gradient-to-br from-[#F1FF00]/30 via-[#0F2A3B] to-[#06131c] shadow-[0_0_30px_rgba(241,255,0,0.3)]">
        <Heart className="h-16 w-16 md:h-20 md:w-20 text-[#F1FF00] fill-current animate-pulse drop-shadow-[0_0_15px_rgba(241,255,0,0.8)]" />
      </div>

      <div className="flex flex-1 flex-col items-center md:items-start text-center md:text-left z-10">
        <span className="font-heading text-xs font-bold tracking-widest text-[#F1FF00] uppercase mb-1 drop-shadow-neon">
          Colección Guardada
        </span>
        <h1 className="font-heading text-3xl md:text-5xl font-black text-white tracking-tight leading-none mb-3">
          {title}
        </h1>
        <p className="font-sans text-xs md:text-sm text-[#9bb2c4] max-w-xl mb-4 leading-relaxed">
          {description}
        </p>

        <div className="flex items-center gap-3 text-xs font-semibold text-white/70 mb-6">
          <span>{totalTracks} canciones</span>
          <span>•</span>
          <span>{totalDuration}</span>
        </div>

        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 w-full">
          <button
            onClick={onPlayAll}
            className="flex items-center gap-2.5 rounded-full bg-[#F1FF00] px-6 py-3 font-sans text-sm font-bold text-black shadow-neon transition-all duration-300 hover:bg-yellow-300 hover:scale-105 active:scale-95"
          >
            <Play className="h-5 w-5 fill-current ml-0.5" />
            <span>Reproducir</span>
          </button>

          <button
            onClick={onShuffle}
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 font-sans text-sm font-semibold text-white transition-all duration-300 hover:bg-white/10 hover:border-[#F1FF00]/30"
          >
            <Shuffle className="h-4 w-4 text-[#F1FF00]" />
            <span>Aleatorio</span>
          </button>

          <div className="relative flex-1 max-w-xs ml-auto hidden lg:block">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Filtrar tus favoritos..."
              className="h-10 w-full rounded-full border border-white/10 bg-[#06131c]/60 pl-10 pr-4 text-xs text-white placeholder-[#9bb2c4]/60 backdrop-blur-md transition-colors focus:border-[#F1FF00]/50 focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
