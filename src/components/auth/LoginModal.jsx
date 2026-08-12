import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { LoginModalLogoPanel } from "./LoginModalLogoPanel";
import { LoginModalContent } from "./LoginModalContent";

export function LoginModal({ isOpen, onClose, onSpotifyLogin }) {
  const [shouldRender, setShouldRender] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setIsClosing(false);
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else if (shouldRender && !isClosing) {
      handleClose();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && shouldRender && !isClosing) {
        handleClose();
      }
    };
    if (shouldRender) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [shouldRender, isClosing]);

  const handleClose = () => {
    if (isClosing) return;
    setIsClosing(true);
    setTimeout(() => {
      setShouldRender(false);
      setIsClosing(false);
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
      onClose();
    }, 200);
  };

  if (!shouldRender) return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#06131c]/80 backdrop-blur-xl transition-all duration-300 ${
        isClosing ? "animate-overlay-out" : "animate-overlay-in"
      }`}
      onClick={handleClose}
    >
      <div
        className={`relative w-full max-w-2xl rounded-2xl md:rounded-3xl border border-[#F1FF00]/20 bg-[#0F2A3B]/95 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col md:flex-row transition-all duration-300 max-h-[90vh] my-auto ${
          isClosing ? "animate-modal-out" : "animate-modal-in"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute -top-12 left-1/4 h-24 w-1/2 bg-[#F1FF00]/10 blur-2xl pointer-events-none" />
        <LoginModalLogoPanel />
        <LoginModalContent onClose={handleClose} onSpotifyLogin={onSpotifyLogin} />
      </div>
    </div>,
    document.body
  );
}

export default LoginModal;


