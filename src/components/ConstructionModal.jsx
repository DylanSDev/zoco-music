import { X, ArrowRight } from 'lucide-react'

export function ConstructionModal({ isOpen, onClose }) {
  if (!isOpen) return null

  return (
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
            Próximamente la experiencia SPA de streaming de alta fidelidad.
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
  )
}
