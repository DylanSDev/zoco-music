import { Sidebar } from "../components/layout/Sidebar";
import { BottomPlayer } from "../components/layout/BottomPlayer";
import { QuickMixCard } from "../components/home/QuickMixCard";
import { MusicCard } from "../components/home/MusicCard";
import { SongRow } from "../components/home/SongRow";
import { VibeCard } from "../components/home/VibeCard";
import { AmbientBackground } from "../components/layout/AmbientBackground";
import { Navbar } from "../components/layout/Navbar";
import { SectionHeader } from "../components/common/SectionHeader";

export function Home() {
  const dailyMixImage = "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/daily-music-remix-spotify-album-cover-art-design-template-1ea8a797c35a4eafb323d9c3f7d08130_screen.jpg?ts=1602184061";
  const venngageImage = "https://cdn.venngage.com/template/thumbnail/small/bf008bfe-9bf6-4511-b795-e86f070bfff5.webp";
  const gstaticImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_KUyYdZviDH5CCB9qsTYsPZuxEsh1UIZP-nCeTVoNsPx0FR_elQd8obIO&s=10";

  const quickMixes = [
    { title: "Daily Mix 1", imageUrl: dailyMixImage },
    { title: "Synthwave Nights", imageUrl: venngageImage },
    { title: "Techno Bunker", imageUrl: gstaticImage },
    { title: "Chillout Lounge", imageUrl: venngageImage },
    { title: "Heavy Bass Mix", imageUrl: gstaticImage },
    { title: "Retrowave", imageUrl: dailyMixImage },
  ];

  const recommended = [
    { title: "Midnight Drive", subtitle: "Cybernetic Pulse", imageUrl: dailyMixImage },
    { title: "Neon Lights", subtitle: "The Midnight", imageUrl: venngageImage },
    { title: "Dark Matter", subtitle: "Techno Syndicate", imageUrl: gstaticImage },
    { title: "Ocean Breeze", subtitle: "Chill Vibes", imageUrl: dailyMixImage },
  ];

  const newReleases = [
    { title: "Electric Dreams", artist: "Synthwave Sessions", duration: "3:45", imageUrl: venngageImage, isFavorite: false },
    { title: "Future Past", artist: "Retro Collective", duration: "4:12", imageUrl: gstaticImage, isFavorite: false },
    { title: "Bass Drop", artist: "DJ Max", duration: "2:58", imageUrl: dailyMixImage, isFavorite: true },
    { title: "Acid Rain", artist: "Techno Core", duration: "3:15", imageUrl: venngageImage, isFavorite: true },
    { title: "Summer Breeze", artist: "Chill Agents", duration: "4:05", imageUrl: gstaticImage, isFavorite: false },
  ];

  const vibes = [
    {
      genre: "Electrónica",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAdgYkydM00SzESHErJr5hM-tgFpnyibvJLyquwTF08VmENCdAU50xVxy9&s=10",
      ambientGlowClass: "from-cyan-500/35 via-blue-950/40 to-transparent",
      hoverTextColor: "group-hover:text-cyan-400 group-hover:drop-shadow-[0_0_12px_rgba(34,211,238,0.8)]",
      hoverBorderColor: "hover:border-cyan-400/50 hover:shadow-[0_0_25px_rgba(34,211,238,0.25)]",
      glowBlobColor: "bg-cyan-400/20 group-hover:bg-cyan-400/40",
    },
    {
      genre: "Chillout",
      imageUrl: "https://escapadas.mexicodesconocido.com.mx/wp-content/uploads/2024/10/miguel-escudero-acapulco.jpg",
      ambientGlowClass: "from-[#F1FF00]/30 via-teal-950/40 to-transparent",
      hoverTextColor: "group-hover:text-[#F1FF00] group-hover:drop-shadow-[0_0_12px_rgba(241,255,0,0.8)]",
      hoverBorderColor: "hover:border-[#F1FF00]/50 hover:shadow-[0_0_25px_rgba(241,255,0,0.25)]",
      glowBlobColor: "bg-[#F1FF00]/20 group-hover:bg-[#F1FF00]/40",
    },
    {
      genre: "Synthwave",
      imageUrl: "https://i.blogs.es/f370df/24yvinp.jpg/1366_2000.png",
      ambientGlowClass: "from-fuchsia-500/35 via-purple-950/40 to-transparent",
      hoverTextColor: "group-hover:text-fuchsia-400 group-hover:drop-shadow-[0_0_12px_rgba(232,121,249,0.8)]",
      hoverBorderColor: "hover:border-fuchsia-400/50 hover:shadow-[0_0_25px_rgba(232,121,249,0.25)]",
      glowBlobColor: "bg-fuchsia-400/20 group-hover:bg-fuchsia-400/40",
    },
    {
      genre: "Perreo",
      imageUrl: "https://img.magnific.com/foto-gratis/amigos-tintinean-vasos-bebida-bar-moderno_1150-18971.jpg?semt=ais_test_b&w=740&q=80",
      ambientGlowClass: "from-emerald-500/35 via-rose-950/40 to-transparent",
      hoverTextColor: "group-hover:text-emerald-400 group-hover:drop-shadow-[0_0_12px_rgba(52,211,153,0.8)]",
      hoverBorderColor: "hover:border-emerald-400/50 hover:shadow-[0_0_25px_rgba(52,211,153,0.25)]",
      glowBlobColor: "bg-emerald-400/20 group-hover:bg-emerald-400/40",
    },
  ];

  return (
    <div className="relative flex min-h-screen bg-[#06131c] text-white overflow-hidden">
      <AmbientBackground />

      <Sidebar />

      <div className="relative z-10 flex-1 h-screen overflow-y-auto pb-40 pt-6 px-4 md:pt-12 md:px-12 lg:px-16 2xl:px-24">
        <Navbar />

        <h1 className="font-heading text-3xl font-black tracking-tight text-white md:text-4xl mb-3">
          Buenas tardes
        </h1>

        <main className="space-y-10">
          <section>
            <SectionHeader title="Tus Mixes" isNeon={true} />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {quickMixes.map((mix, index) => (
                <QuickMixCard key={index} title={mix.title} imageUrl={mix.imageUrl} />
              ))}
            </div>
          </section>

          <section>
            <SectionHeader title="Recomendados para ti" />
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {recommended.map((item, index) => (
                <MusicCard key={index} title={item.title} subtitle={item.subtitle} imageUrl={item.imageUrl} />
              ))}
            </div>
          </section>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 items-stretch">
            <section className="flex flex-col h-full">
              <SectionHeader title="Nuevos Lanzamientos" />
              <div className="flex flex-col justify-between flex-1 space-y-3">
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
                  />
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
