import logo from "../../assets/ZocoMusic-Icono_Neón-FondoTransparente.png";

export function LoginModalLogoPanel() {
  return (
    <div className="relative flex flex-col items-center justify-center border-b border-white/10 bg-[#081824]/90 p-6 md:p-8 md:w-1/2 md:border-b-0 md:border-r md:border-white/10 overflow-hidden">
      <div className="absolute inset-0 bg-radial-glow opacity-20 pointer-events-none" />
      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="relative mb-3 flex items-center justify-center">
          <div className="absolute -inset-2 rounded-full bg-[#F1FF00]/5 blur-lg pointer-events-none" />
          <div className="animate-neon-flicker">
            <img
              src={logo}
              alt="ZOCO Music"
              className="h-14 md:h-20 w-auto object-contain filter drop-shadow-[0_0_10px_rgba(241,255,0,0.45)]"
            />
          </div>
        </div>
        <div className="mt-2 flex flex-col items-center">
          <span className="font-heading text-3xl md:text-4xl font-black tracking-wider text-white leading-none">
            ZOCO
          </span>
          <span className="font-heading text-xs md:text-sm font-bold tracking-[0.3em] text-[#F1FF00] drop-shadow-[0_0_8px_rgba(241,255,0,0.6)] leading-none mt-1.5 uppercase animate-neon-flicker">
            MUSIC
          </span>
        </div>
      </div>
    </div>
  );
}


