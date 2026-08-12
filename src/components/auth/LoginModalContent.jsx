import { X } from "lucide-react";
import { SpotifyButton } from "./SpotifyButton";

export function LoginModalContent({ onClose, onSpotifyLogin }) {
  return (
    <div className="relative flex flex-col justify-between p-5 md:p-8 md:w-1/2 overflow-hidden">
      <button
        onClick={onClose}
        aria-label="Cerrar modal"
        className="absolute right-3 top-3 md:right-4 md:top-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#9bb2c4] transition-all hover:bg-white/10 hover:text-white"
      >
        <X className="h-4 w-4" />
      </button>

      <div className="flex flex-col gap-2 md:gap-4 mt-1 md:mt-2">
        <h2 className="font-heading text-xl md:text-3xl font-bold tracking-tight text-white pr-6 md:pr-0">
          Descubre tu ritmo
        </h2>
        <p className="font-sans text-xs md:text-sm leading-relaxed text-[#9bb2c4]">
          Conecta tu cuenta para reproducir el catálogo completo, acceder a tus favoritos y disfrutar de una experiencia inmersiva.
        </p>
      </div>

      <div className="mt-5 md:mt-8 flex flex-col gap-3 md:gap-4">
        <SpotifyButton onClick={onSpotifyLogin} />
        <p className="font-sans text-[10px] md:text-[11px] leading-tight text-center text-[#9bb2c4]/60 max-w-xs mx-auto">
          Solo utilizamos tu cuenta para sincronizar tu música. No publicaremos nada sin tu permiso.
        </p>
      </div>
    </div>
  );
}

