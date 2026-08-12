import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Music, X } from "lucide-react";
import { usePlayerStore } from "../../store/usePlayerStore";

export function PreviewDisabledModal() {
  const showPreviewModal = usePlayerStore((s) => s.showPreviewModal);
  const setShowPreviewModal = usePlayerStore((s) => s.setShowPreviewModal);

  useEffect(() => {
    if (showPreviewModal) {
      const timer = setTimeout(() => {
        setShowPreviewModal(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [showPreviewModal, setShowPreviewModal]);

  if (!showPreviewModal) return null;

  return createPortal(
    <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] animate-[slideDown_0.3s_ease-out]">
      <div className="relative flex items-center gap-4 w-max max-w-sm rounded-full border border-white/10 bg-[#0F2A3B]/95 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] py-3 px-5">
        <button
          onClick={() => setShowPreviewModal(false)}
          className="absolute -top-2 -right-2 bg-[#06131c] rounded-full p-1 border border-white/10 text-white/40 hover:text-white transition-colors"
        >
          <X size={14} />
        </button>

        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#F1FF00]/10 border border-[#F1FF00]/20 flex items-center justify-center">
          <Music size={14} className="text-[#F1FF00]" />
        </div>

        <div className="flex flex-col">
          <h3 className="text-white font-bold text-sm font-[Montserrat_Arabic] leading-tight">
            Inicia sesión para escuchar
          </h3>
          <p className="text-white/50 text-xs font-sans">
            Previews deshabilitados por Spotify.
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}
