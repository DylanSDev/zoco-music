import { useState, useEffect } from "react";
import { QuickMixCard } from "../components/home/QuickMixCard";
import { MusicCard } from "../components/home/MusicCard";
import { SongRow } from "../components/home/SongRow";
import { VibeCard } from "../components/home/VibeCard";
import { SectionHeader } from "../components/common/SectionHeader";
import { FilterChips } from "../components/home/FilterChips";
import { MainLayout } from "../components/layout/MainLayout";
import { searchSpotifyTracks, searchSpotifyPlaylists } from "../services/spotifyApi";
import { useSpotifyStore } from "../store/useSpotifyStore";

export function Home() {
  const isAuthenticated = useSpotifyStore((s) => s.isAuthenticated);
  const [quickMixes, setQuickMixes] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const [vibeTracks, setVibeTracks] = useState([]);
  const [activeVibe, setActiveVibe] = useState(null);
  const [activeChip, setActiveChip] = useState("Todos");
  const [isLoading, setIsLoading] = useState(true);



  const vibes = [
    {
      genre: "Electrónica",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAdgYkydM00SzESHErJr5hM-tgFpnyibvJLyquwTF08VmENCdAU50xVxy9&s=10",
      ambientGlowClass: "from-cyan-500/35 via-blue-950/40 to-transparent",
      hoverTextColor: "group-hover:text-cyan-400 group-hover:drop-shadow-[0_0_12px_rgba(34,211,238,0.8)]",
      hoverBorderColor: "hover:border-cyan-400/50 hover:shadow-[0_0_25px_rgba(34,211,238,0.25)]",
      glowBlobColor: "bg-cyan-400/20 group-hover:bg-cyan-400/40"
    },
    {
      genre: "Chillout",
      imageUrl: "https://escapadas.mexicodesconocido.com.mx/wp-content/uploads/2024/10/miguel-escudero-acapulco.jpg",
      ambientGlowClass: "from-[#F1FF00]/30 via-teal-950/40 to-transparent",
      hoverTextColor: "group-hover:text-[#F1FF00] group-hover:drop-shadow-[0_0_12px_rgba(241,255,0,0.8)]",
      hoverBorderColor: "hover:border-[#F1FF00]/50 hover:shadow-[0_0_25px_rgba(241,255,0,0.25)]",
      glowBlobColor: "bg-[#F1FF00]/20 group-hover:bg-[#F1FF00]/40"
    },
    {
      genre: "Synthwave",
      imageUrl: "https://i.blogs.es/f370df/24yvinp.jpg/1366_2000.png",
      ambientGlowClass: "from-fuchsia-500/35 via-purple-950/40 to-transparent",
      hoverTextColor: "group-hover:text-fuchsia-400 group-hover:drop-shadow-[0_0_12px_rgba(232,121,249,0.8)]",
      hoverBorderColor: "hover:border-fuchsia-400/50 hover:shadow-[0_0_25px_rgba(232,121,249,0.25)]",
      glowBlobColor: "bg-fuchsia-400/20 group-hover:bg-fuchsia-400/40"
    },
    {
      genre: "Perreo",
      imageUrl: "https://img.magnific.com/foto-gratis/amigos-tintinean-vasos-bebida-bar-moderno_1150-18971.jpg?semt=ais_test_b&w=740&q=80",
      ambientGlowClass: "from-emerald-500/35 via-rose-950/40 to-transparent",
      hoverTextColor: "group-hover:text-emerald-400 group-hover:drop-shadow-[0_0_12px_rgba(52,211,153,0.8)]",
      hoverBorderColor: "hover:border-emerald-400/50 hover:shadow-[0_0_25px_rgba(52,211,153,0.25)]",
      glowBlobColor: "bg-emerald-400/20 group-hover:bg-emerald-400/40"
    }
  ];

  useEffect(() => {
    let isMounted = true;

    async function loadSpotifyHomeData() {
      setIsLoading(true);
      try {
        const [mixData, recData, newRelData] = await Promise.all([
          searchSpotifyPlaylists("Mix", 6),
          searchSpotifyTracks("Top Hits", 4),
          searchSpotifyTracks("Pop Rock", 5)
        ]);

        if (isMounted) {
          setQuickMixes(mixData);
          setRecommended(recData);
          setNewReleases(newRelData);
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadSpotifyHomeData();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleVibeClick = async (genre) => {
    if (activeVibe === genre) {
      setActiveVibe(null);
      setVibeTracks([]);
      return;
    }

    setActiveVibe(genre);
    setIsLoading(true);
    const tracks = await searchSpotifyTracks(genre, 8);
    setVibeTracks(tracks);
    setIsLoading(false);
  };

  const handleChipSelect = async (chip) => {
    setActiveChip(chip);
    if (chip === "Todos") {
      setActiveVibe(null);
      setVibeTracks([]);
      return;
    }

    setIsLoading(true);
    const tracks = await searchSpotifyTracks(chip, 8);
    setVibeTracks(tracks);
    setActiveVibe(chip);
    setIsLoading(false);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "Buenos días";
    if (hour >= 12 && hour < 20) return "Buenas tardes";
    return "Buenas noches";
  };

  return (
    <MainLayout>
      <h1 className="font-heading text-3xl font-black tracking-tight text-white md:text-4xl mb-4 animate-[fadeIn_0.4s_ease-out_both]">
        {getGreeting()}
      </h1>

      <div className="animate-[fadeIn_0.4s_ease-out_both]">
        <FilterChips activeChip={activeChip} onSelectChip={handleChipSelect} />
      </div>

      <main className="space-y-10">
        <section className="animate-[fadeIn_0.5s_ease-out_0.1s_both]">
          <SectionHeader title={isAuthenticated ? "Tus Mixes" : "Mixes"} isNeon={true} />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {quickMixes.map((mix, index) => (
              <QuickMixCard
                key={mix.id || index}
                title={mix.title}
                imageUrl={mix.imageUrl}
                id={mix.id || mix.title.toLowerCase().replace(/\s+/g, "-")}
                typeRoute="mix"
              />
            ))}
          </div>
        </section>

        {activeVibe && (
          <section className="animate-[fadeIn_0.5s_ease-out_both] p-5 rounded-2xl border border-[#F1FF00]/30 bg-[#0F2A3B]/60 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-4">
              <SectionHeader title={`Canciones de Vibra: ${activeVibe}`} isNeon={true} />
              <button
                onClick={() => {
                  setActiveVibe(null);
                  setVibeTracks([]);
                }}
                className="text-xs text-[#F1FF00] hover:underline"
              >
                Limpiar filtro
              </button>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {vibeTracks.map((song, index) => (
                <SongRow
                  key={song.id || index}
                  title={song.title}
                  artist={song.artist}
                  duration={song.duration}
                  imageUrl={song.imageUrl}
                  previewUrl={song.previewUrl}
                  spotifyUri={song.spotifyUri}
                />
              ))}
            </div>
          </section>
        )}

        <section className="animate-[fadeIn_0.6s_ease-out_0.2s_both]">
          <SectionHeader title="Recomendados para ti" />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {recommended.map((item, index) => (
              <MusicCard
                key={item.id || index}
                title={item.title}
                subtitle={item.artist || item.subtitle}
                imageUrl={item.imageUrl}
                duration={item.duration}
                previewUrl={item.previewUrl}
                spotifyUri={item.spotifyUri}
              />
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 items-stretch animate-[fadeIn_0.7s_ease-out_0.3s_both]">
          <section className="flex flex-col h-full">
            <SectionHeader title="Nuevos Lanzamientos" />
            <div className="flex flex-col justify-between flex-1 space-y-3">
              {newReleases.map((song, index) => (
                <SongRow
                  key={song.id || index}
                  title={song.title}
                  artist={song.artist}
                  duration={song.duration}
                  imageUrl={song.imageUrl}
                  previewUrl={song.previewUrl}
                  spotifyUri={song.spotifyUri}
                />
              ))}
            </div>
          </section>

          <section className="flex flex-col h-full">
            <SectionHeader title="Explora tu Vibra" />
            <div className="grid grid-cols-2 gap-4 flex-1">
              {vibes.map((vibe, index) => (
                <VibeCard
                  key={index}
                  genre={vibe.genre}
                  imageUrl={vibe.imageUrl}
                  ambientGlowClass={vibe.ambientGlowClass}
                  hoverTextColor={vibe.hoverTextColor}
                  hoverBorderColor={vibe.hoverBorderColor}
                  glowBlobColor={vibe.glowBlobColor}
                  isSelected={activeVibe === vibe.genre}
                  onClick={() => handleVibeClick(vibe.genre)}
                />
              ))}
            </div>
          </section>
        </div>
      </main>
    </MainLayout>
  );
}

export default Home;
