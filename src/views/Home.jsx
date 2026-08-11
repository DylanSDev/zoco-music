import { Sidebar } from "../components/layout/Sidebar";
import { BottomPlayer } from "../components/layout/BottomPlayer";
import { QuickMixCard } from "../components/home/QuickMixCard";
import { MusicCard } from "../components/home/MusicCard";
import { SongRow } from "../components/home/SongRow";
import { VibeCard } from "../components/home/VibeCard";
import { AmbientBackground } from "../components/layout/AmbientBackground";
import { Bell } from "lucide-react";

export function Home() {
  const quickMixes = [
    { title: "Daily Mix 1", imageUrl: "https://images.unsplash.com/photo-1614680376593-902f74fa0d41?w=150&auto=format&fit=crop&q=60" },
    { title: "Synthwave Nights", imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=150&auto=format&fit=crop&q=60" },
    { title: "Techno Bunker", imageUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=150&auto=format&fit=crop&q=60" },
    { title: "Chillout Lounge", imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=150&auto=format&fit=crop&q=60" },
    { title: "Heavy Bass Mix", imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=150&auto=format&fit=crop&q=60" },
    { title: "Retrowave", imageUrl: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=150&auto=format&fit=crop&q=60" },
  ];

  const recommended = [
    { title: "Midnight Drive", subtitle: "Cybernetic Pulse", imageUrl: "https://images.unsplash.com/photo-1614680376593-902f74fa0d41?w=300&auto=format&fit=crop&q=60" },
    { title: "Neon Lights", subtitle: "The Midnight", imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=300&auto=format&fit=crop&q=60" },
    { title: "Dark Matter", subtitle: "Techno Syndicate", imageUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300&auto=format&fit=crop&q=60" },
    { title: "Ocean Breeze", subtitle: "Chill Vibes", imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&auto=format&fit=crop&q=60" },
  ];

  const newReleases = [
    { title: "Electric Dreams", artist: "Synthwave Sessions", duration: "3:45", imageUrl: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=100&auto=format&fit=crop&q=60", isFavorite: false },
    { title: "Future Past", artist: "Retro Collective", duration: "4:12", imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=100&auto=format&fit=crop&q=60", isFavorite: false },
    { title: "Bass Drop", artist: "DJ Max", duration: "2:58", imageUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=100&auto=format&fit=crop&q=60", isFavorite: true },
    { title: "Acid Rain", artist: "Techno Core", duration: "3:15", imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=100&auto=format&fit=crop&q=60", isFavorite: true },
    { title: "Summer Breeze", artist: "Chill Agents", duration: "4:05", imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=100&auto=format&fit=crop&q=60", isFavorite: false },
  ];

  const vibes = [
    { genre: "Electrónica", gradientClass: "from-blue-600 to-cyan-500" },
    { genre: "Chillout", gradientClass: "from-green-500 to-teal-400" },
  ];

  return (
    <div className="relative flex min-h-screen bg-[#06131c] text-white overflow-hidden">
      <AmbientBackground />

      <Sidebar />

      <div className="flex-1 h-screen overflow-y-auto pb-40 pt-6 px-4 md:pt-8 md:pr-8 md:pl-8">
        <header className="flex items-center justify-between mb-8 pl-4 md:pl-0">
          <h1 className="font-heading text-3xl font-black tracking-tight text-white md:text-4xl">
            Buenas tardes
          </h1>
          <div className="flex items-center gap-4">
            <button className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#0F2A3B]/40 text-[#9bb2c4] backdrop-blur-md transition-colors hover:text-[#F1FF00]">
              <Bell className="h-5 w-5" />
            </button>
            <div className="h-10 w-10 overflow-hidden rounded-full border border-[#F1FF00]/30 shadow-neon">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60"
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </header>

        <main className="space-y-12">
          <section>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {quickMixes.map((mix, index) => (
                <QuickMixCard key={index} title={mix.title} imageUrl={mix.imageUrl} />
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold tracking-tight mb-6">
              Recomendados para ti
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {recommended.map((item, index) => (
                <MusicCard key={index} title={item.title} subtitle={item.subtitle} imageUrl={item.imageUrl} />
              ))}
            </div>
          </section>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <section className="lg:col-span-7">
              <h2 className="font-heading text-2xl font-bold tracking-tight mb-6">
                Nuevos Lanzamientos
              </h2>
              <div className="space-y-3">
                {newReleases.map((song, index) => (
                  <SongRow
                    key={index}
                    title={song.title}
                    artist={song.artist}
                    duration={song.duration}
                    imageUrl={song.imageUrl}
                    isFavoriteInitial={song.isFavorite}
                  />
                ))}
              </div>
            </section>

            <section className="lg:col-span-5">
              <h2 className="font-heading text-2xl font-bold tracking-tight mb-6">
                Explora tu Vibra
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {vibes.map((vibe, index) => (
                  <VibeCard key={index} genre={vibe.genre} gradientClass={vibe.gradientClass} />
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>

      <BottomPlayer />
    </div>
  );
}
export default Home;
