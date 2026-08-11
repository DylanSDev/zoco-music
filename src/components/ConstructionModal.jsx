import { X, ArrowRight } from 'lucide-react'

export function ConstructionModal({ isOpen, isMiniOpen, onClose, onCloseMini }) {
  return (
    <>
      {isMiniOpen && (
        <div className="glass-mini-card">
          <button
            className="glass-mini-close-btn"
            onClick={onCloseMini}
            aria-label="Cerrar"
          >
            <X size={14} />
          </button>
          <div className="glass-mini-content">
            <h3 className="glass-mini-title">ZOCO Music</h3>
            <p className="glass-mini-text">
              ZOCO Music es una SPA de streaming de alta fidelidad inspirada en Spotify. Explora música, guarda tus favoritos y experimenta con nuestro asistente inteligente.
            </p>
          </div>
        </div>
      )}

      {isOpen && (
        <div className="glass-modal-overlay" onClick={onClose}>
          <div className="glass-modal-card" onClick={(e) => e.stopPropagation()}>
            <button
              className="glass-modal-close-btn"
              onClick={onClose}
              aria-label="Cerrar notificación"
            >
              <X size={16} />
            </button>

            <div className="glass-modal-header">
              <h2 className="glass-modal-headline">
                Sitio en<br />construcción
              </h2>
              <p className="glass-modal-subtext">
                ZOCO Music es una SPA de streaming de alta fidelidad inspirada en Spotify. Explora música, guarda tus favoritos y experimenta con nuestro asistente inteligente.
              </p>
            </div>

            <div className="glass-modal-footer">
              <button
                className="glass-pill-btn"
                onClick={onClose}
                aria-label="Explorar"
              >
                <ArrowRight size={20} className="pill-arrow-icon" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
