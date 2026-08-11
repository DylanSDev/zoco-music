export function VibeCard({
  genre,
  imageUrl,
  ambientGlowClass,
  hoverTextColor,
  hoverBorderColor,
  glowBlobColor,
}) {
  return (
    <div
      className={`group relative flex h-full min-h-[130px] w-full items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#091824]/60 p-4 transition-all duration-300 backdrop-blur-xl cursor-pointer ${
        hoverBorderColor || "hover:border-[#F1FF00]/40 hover:shadow-[0_0_25px_rgba(241,255,0,0.15)]"
      }`}
    >
      {imageUrl && (
        <img
          src={imageUrl}
          alt={genre}
          className="absolute inset-0 h-full w-full object-cover opacity-25 transition-all duration-500 group-hover:scale-105 group-hover:opacity-45"
        />
      )}

      <div
        className={`absolute inset-0 bg-gradient-to-br opacity-40 transition-opacity duration-300 group-hover:opacity-80 ${
          ambientGlowClass || "from-[#F1FF00]/15 via-blue-900/40 to-transparent"
        }`}
      />

      <div
        className={`absolute -top-12 -left-12 h-32 w-32 rounded-full blur-2xl transition-all duration-500 group-hover:scale-125 ${
          glowBlobColor || "bg-[#F1FF00]/10 group-hover:bg-[#F1FF00]/25"
        }`}
      />

      <span
        className={`relative z-10 font-heading text-xl font-extrabold tracking-wide text-[#8fa8bc] transition-all duration-300 md:text-2xl ${
          hoverTextColor || "group-hover:text-[#F1FF00] group-hover:drop-shadow-[0_0_10px_rgba(241,255,0,0.6)]"
        }`}
      >
        {genre}
      </span>
    </div>
  );
}
