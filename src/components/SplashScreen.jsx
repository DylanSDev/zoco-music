import { useState, useEffect } from 'react'
import { Volume2, VolumeX, Sparkles } from 'lucide-react'
import { ConstructionModal } from './ConstructionModal'
import { AmbientBackground } from './AmbientBackground'

export function SplashScreen() {
  const [showSplash, setShowSplash] = useState(() => {
    return !localStorage.getItem('zoco_music_visited')
  })
  const [isMuted, setIsMuted] = useState(true)
  const [isMiniOpen, setIsMiniOpen] = useState(true)
  const [isFullOpen, setIsFullOpen] = useState(false)

  useEffect(() => {
    if (showSplash) {
      localStorage.setItem('zoco_music_visited', 'true')
      const splashTimer = setTimeout(() => {
        setShowSplash(false)
      }, 10000)
      return () => clearTimeout(splashTimer)
    }
  }, [showSplash])

  useEffect(() => {
    const miniTimer = setTimeout(() => {
      setIsMiniOpen(false)
    }, 5000)
    return () => clearTimeout(miniTimer)
  }, [])

  const toggleSound = () => {
    setIsMuted((prev) => !prev)
  }

  const handleOpenFull = () => {
    setIsMiniOpen(false)
    setIsFullOpen(true)
  }

  return (
    <>
      <AmbientBackground />
      {showSplash && (
        <button
          className="sound-toggle-btn"
          onClick={toggleSound}
          aria-label={isMuted ? 'Activar sonido' : 'Desactivar sonido'}
          title={isMuted ? 'Activar sonido del video' : 'Silenciar video'}
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
      )}

      <main className="landing-hero-wrapper">
        {showSplash && (
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
        )}

        <div className="brand-text-container">
          <h1 className={`brand-title ${!showSplash ? 'static' : ''}`}>
            <span className="brand-zoco">ZOCO</span>
            <span className="brand-music">MUSIC</span>
          </h1>
        </div>
      </main>

      <ConstructionModal
        isOpen={isFullOpen}
        isMiniOpen={isMiniOpen}
        onClose={() => setIsFullOpen(false)}
        onCloseMini={() => setIsMiniOpen(false)}
      />

      {!isFullOpen && (
        <button
          className="reopen-modal-btn"
          onClick={handleOpenFull}
          aria-label="Ver Estado del Sitio"
        >
          <Sparkles size={16} />
          <span>Estado del Sitio</span>
        </button>
      )}
    </>
  )
}
