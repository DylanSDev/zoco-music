import { useState } from 'react'
import { Volume2, VolumeX, ArrowRight, X, Sparkles } from 'lucide-react'
import './App.css'

function App() {
  const [isModalOpen, setIsModalOpen] = useState(true)
  const [isMuted, setIsMuted] = useState(true)

  const toggleSound = () => {
    setIsMuted((prev) => !prev)
  }

  return (
    <>
      {/* Botón flotante de volumen en la esquina de la página */}
      <button
        className="sound-toggle-btn"
        onClick={toggleSound}
        aria-label={isMuted ? 'Activar sonido' : 'Desactivar sonido'}
        title={isMuted ? 'Activar sonido del video' : 'Silenciar video'}
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>

      {/* Landing minimalista: Logo animado a la izquierda + ZOCO Music a la derecha */}
      <main className="landing-hero-wrapper">
        <div className="logo-video-container">
          <video
            src="/Logo-Animation.mp4"
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="logo-video"
            onClick={toggleSound}
            title="Haz clic para activar/desactivar el sonido"
          />
        </div>

        <div className="brand-text-container">
          <h1 className="brand-title">
            <span className="brand-zoco">ZOCO</span>
            <span className="brand-music">Music</span>
          </h1>
        </div>
      </main>

      {/* Modal Glassmorphism Ultratranslúcido & Minimalista (Inspirado en la imagen de referencia) */}
      {isModalOpen && (
        <div className="glass-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="glass-modal-card" onClick={(e) => e.stopPropagation()}>
            <button
              className="glass-modal-close-btn"
              onClick={() => setIsModalOpen(false)}
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
                onClick={() => setIsModalOpen(false)}
                aria-label="Explorar"
              >
                <ArrowRight size={20} className="pill-arrow-icon" />
              </button>
            </div>
          </div>
        </div>
      )}


      {/* Botón flotante para reactivar modal */}
      {!isModalOpen && (
        <button
          className="reopen-modal-btn"
          onClick={() => setIsModalOpen(true)}
        >
          <Sparkles size={16} />
          <span>Estado del Sitio</span>
        </button>
      )}
    </>
  )
}

export default App



