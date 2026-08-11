export function VibeCard({ genre, gradientClass }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl border border-white/5 bg-[#0F2A3B]/20 p-6 flex items-center justify-center h-28 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group`}>
      <div className={`absolute inset-0 bg-gradient-to-br opacity-20 blur-md group-hover:opacity-40 transition-opacity duration-300 ${gradientClass}`} />
      <span className="font-heading text-xl font-bold tracking-wide text-white/40 group-hover:text-[#F1FF00] group-hover:shadow-neon transition-colors duration-300 z-10">
        {genre}
      </span>
    </div>
  );
}
