export function TopResultCard({ name, subtitle, type, imageUrl, isAlbum = false }) {
  return (
    <div className="group relative flex h-full min-h-[200px] md:min-h-[250px] cursor-pointer flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0F2A3B]/40 p-3 sm:p-4 lg:p-6 transition-all duration-300 hover:border-[#F1FF00]/50 hover:bg-[#0F2A3B]/60 hover:shadow-[0_0_30px_rgba(241,255,0,0.15)]">
      {/* Background glow effect */}
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#F1FF00]/20 mix-blend-screen blur-[60px] transition-all duration-500 group-hover:bg-[#F1FF00]/30 group-hover:blur-[80px]" />
      <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-cyan-500/10 mix-blend-screen blur-[40px]" />

      <div className="relative z-10 flex flex-col items-start gap-2 lg:gap-3 h-full justify-between">
        <div className={`h-16 w-16 md:h-24 md:w-24 lg:h-32 lg:w-32 overflow-hidden border-2 border-transparent transition-all duration-300 group-hover:border-[#F1FF00]/50 group-hover:shadow-neon shadow-lg ${isAlbum ? 'rounded-xl' : 'rounded-full'}`}>
          <img src={imageUrl} alt={name} className="h-full w-full object-cover" />
        </div>

        <div className="flex flex-col items-start gap-1 w-full">
          <h3 className="font-heading text-lg sm:text-xl md:text-2xl font-black tracking-tight text-white transition-colors duration-300 group-hover:text-[#F1FF00] line-clamp-2 w-full">
            {name}
          </h3>
          {subtitle && (
            <span className="font-sans text-[10px] sm:text-xs md:text-sm font-medium text-[#9bb2c4] mb-1 truncate w-full">{subtitle}</span>
          )}
          <span className="rounded-full bg-white/10 px-2 py-0.5 sm:px-3 sm:py-1 font-sans text-[9px] sm:text-[10px] md:text-xs font-semibold text-white/90 backdrop-blur-md mt-1">
            {type}
          </span>
        </div>
      </div>
    </div>
  );
}
