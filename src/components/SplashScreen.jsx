import { useState } from 'react'
import { Volume2, VolumeX, Sparkles } from 'lucide-react'
import { ConstructionModal } from './ConstructionModal'

export function SplashScreen() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isMuted, setIsMuted] = useState(true)

  const toggleSound = () => {
    setIsMuted((prev) => !prev)
  }

  return (
    <>
      <button
        className="sound-toggle-btn"
        onClick={toggleSound}
        aria-label={isMuted ? 'Activar sonido' : 'Desactivar sonido'}
        title={isMuted ? 'Activar sonido del video' : 'Silenciar video'}
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>

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
            <span className="brand-music">MUSIC</span>
          </h1>
        </div>
      </main>

      <ConstructionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

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
