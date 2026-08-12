import { MainLayout } from "../components/layout/MainLayout";
import { FilterChips } from "../components/home/FilterChips";
import { SectionHeader } from "../components/common/SectionHeader";
import { TopResultCard } from "../components/search/TopResultCard";
import { SongRow } from "../components/home/SongRow";

export function Search() {
  const searchChips = ["Todo", "Artistas", "Canciones", "Álbumes"];

  const topResult = {
    name: "Oasis",
    type: "Artista",
    imageUrl: "https://www.latercera.com/resizer/v2/KBCP47BZSVGRPJ2LBMFZAHHWMI.jpg?auth=9d702d73397ee4324b6641d5a35790c9bc64a0877c56fe47a3893eb8700b1a10&smart=true&width=800&height=502&quality=70",
  };

  const songs = [
    { title: "Wonderwall", artist: "Oasis", duration: "4:18", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRI8wvVBRcH0f_pwjb_QltOM5dwyLnHa9DUUHMnkWSB-w&s", isFavorite: false },
    { title: "Don't Look Back In Anger", artist: "Oasis", duration: "4:48", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRet2jFA5_c8pILw3WXQ9XwKOpeus6VgoKQcO8g0wvPy8GTnr-Umoc5d_Sv&s=10", isFavorite: false },
    { title: "Champagne Supernova", artist: "Oasis", duration: "7:27", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRet2jFA5_c8pILw3WXQ9XwKOpeus6VgoKQcO8g0wvPy8GTnr-Umoc5d_Sv&s=10", isFavorite: false },
    { title: "Live Forever", artist: "Oasis", duration: "4:36", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRet2jFA5_c8pILw3WXQ9XwKOpeus6VgoKQcO8g0wvPy8GTnr-Umoc5d_Sv&s=10", isFavorite: false },
  ];

  return (
    <MainLayout navbarPlaceholder="¿Qué quieres escuchar? (ej. Oasis, Coldplay...)">
      <div className="mb-6 pt-2">
        <FilterChips chips={searchChips} />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 items-stretch">
        <section className="flex flex-col h-full w-full col-span-1 animate-[fadeIn_0.4s_ease-out_both]">
          <SectionHeader title="Artista" />
          <div className="flex-1 w-full flex">
            <TopResultCard 
              name={topResult.name} 
              subtitle="Banda de Rock Británico"
              type={topResult.type} 
              imageUrl={topResult.imageUrl} 
              id="oasis"
              typeRoute="artist"
            />
          </div>
        </section>
        
        <section className="flex flex-col h-full w-full col-span-1 animate-[fadeIn_0.5s_ease-out_0.1s_both]">
          <SectionHeader title="Álbum" />
          <div className="flex-1 w-full flex">
            <TopResultCard 
              name="(What's the Story) Morning Glory?" 
              subtitle="Oasis"
              type="Álbum"
              isAlbum={true}
              imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRI8wvVBRcH0f_pwjb_QltOM5dwyLnHa9DUUHMnkWSB-w&s" 
              id="morning-glory"
              typeRoute="album"
            />
          </div>
        </section>

        <section className="flex flex-col w-full col-span-2 animate-[fadeIn_0.6s_ease-out_0.2s_both]">
          <SectionHeader title="Canciones" />
          <div className="flex flex-col gap-2 w-full">
            {songs.map((song, index) => (
              <div 
                key={index} 
                className="animate-[fadeIn_0.4s_ease-out_both]"
                style={{ animationDelay: `${0.3 + index * 0.1}s` }}
              >
                <SongRow
                  title={song.title}
                  artist={song.artist}
                  duration={song.duration}
                  imageUrl={song.imageUrl}
                  isFavoriteInitial={song.isFavorite}
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
