import { CheckCircle2 } from "lucide-react";

export const DetailHero = ({ type, title, subtitle, stats, coverImage }) => {
  return (
    <div className="relative w-full h-[50vh] min-h-[440px] flex flex-col justify-end px-8 md:px-14 pb-12 pt-36 rounded-b-3xl overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${coverImage})` }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-[#0F2A3B] via-[#0F2A3B]/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#06131c]/80 via-transparent to-transparent" />
      
      <div className="relative z-10 flex flex-col gap-3 px-2">
        <div className="flex items-center gap-2 text-[#F1FF00] text-sm font-semibold tracking-wider uppercase font-inter">
          <CheckCircle2 size={16} fill="#F1FF00" className="text-[#0F2A3B]" />
          <span>{subtitle}</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black text-white font-[Montserrat_Arabic] tracking-tighter shadow-sm drop-shadow-lg" style={{ textShadow: "0 0 40px rgba(241,255,0,0.3)" }}>
          {title}
        </h1>
        
        <p className="text-white/70 text-sm font-medium font-inter mt-2">
          {stats}
        </p>
      </div>
    </div>
  );
};
