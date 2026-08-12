import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { MainLayout } from "../components/layout/MainLayout";
import { FilterChips } from "../components/home/FilterChips";
import { SectionHeader } from "../components/common/SectionHeader";
import { TopResultCard } from "../components/search/TopResultCard";
import { SongRow } from "../components/home/SongRow";
import { searchSpotifyTracks } from "../services/spotifyApi";

export function Search() {
  const searchChips = ["Todo", "Artistas", "Canciones", "Álbumes"];
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const defaultSongs = [
    {
      title: "Wonderwall",
      artist: "Oasis",
      duration: "4:18",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRI8wvVBRcH0f_pwjb_QltOM5dwyLnHa9DUUHMnkWSB-w&s",
      previewUrl: "https://p.scdn.co/mp3-preview/2f7c00e62ff1875151525a815a513524b0b14c33",
      spotifyUri: "spotify:track:40riOyB19BabwWQZbd5Yx6"
    },
    {
      title: "Don't Look Back In Anger",
      artist: "Oasis",
      duration: "4:48",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRet2jFA5_c8pILw3WXQ9XwKOpeus6VgoKQcO8g0wvPy8GTnr-Umoc5d_Sv&s=10",
      previewUrl: "https://p.scdn.co/mp3-preview/a91176b668f845a7c29e64e52ec7a2aa44ec5bfd",
      spotifyUri: "spotify:track:0292g26aXvM0i6pGvYQ6Xm"
    },
    {
      title: "Champagne Supernova",
      artist: "Oasis",
      duration: "7:27",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRet2jFA5_c8pILw3WXQ9XwKOpeus6VgoKQcO8g0wvPy8GTnr-Umoc5d_Sv&s=10",
      spotifyUri: "spotify:track:3qK10Nsc4Ld86Nnd42i9e7"
    }
  ];

  useEffect(() => {
    let isMounted = true;
    if (query.trim()) {
      setIsLoading(true);
      searchSpotifyTracks(query)
        .then((tracks) => {
          if (isMounted) {
            setSearchResults(tracks);
            setIsLoading(false);
          }
        })
        .catch(() => {
          if (isMounted) setIsLoading(false);
        });
    } else {
      setSearchResults([]);
      setIsLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [query]);

  const displaySongs = query.trim() ? searchResults : defaultSongs;
  const topResult = searchResults[0] || {
    name: "Oasis",
    artist: "Oasis",
    imageUrl: "https://www.latercera.com/resizer/v2/KBCP47BZSVGRPJ2LBMFZAHHWMI.jpg?auth=9d702d73397ee4324b6641d5a35790c9bc64a0877c56fe47a3893eb8700b1a10&smart=true&width=800&height=502&quality=70"
  };

  return (
    <MainLayout navbarPlaceholder="¿Qué quieres escuchar? (ej. Oasis, Bad Bunny, Queen...)">
      <div className="mb-6 pt-2">
        <FilterChips chips={searchChips} />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 items-stretch">
        <section className="flex flex-col h-full w-full col-span-1 animate-[fadeIn_0.4s_ease-out_both]">
          <SectionHeader title="Artista" />
          <div className="flex-1 w-full flex">
            <TopResultCard
              name={topResult.artist || topResult.name}
              subtitle="Banda / Artista"
              type="Artista"
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
              name={topResult.album || "(What's the Story) Morning Glory?"}
              subtitle={topResult.artist || "Oasis"}
              type="Álbum"
              isAlbum={true}
              imageUrl={topResult.imageUrl}
              id="morning-glory"
              typeRoute="album"
            />
          </div>
        </section>

        <section className="flex flex-col w-full col-span-2 animate-[fadeIn_0.6s_ease-out_0.2s_both]">
          <SectionHeader title={isLoading ? "Buscando en Spotify..." : "Canciones"} />
          <div className="flex flex-col gap-2 w-full">
            {displaySongs.map((song, index) => (
              <div
                key={song.id || index}
                className="animate-[fadeIn_0.4s_ease-out_both]"
                style={{ animationDelay: `${0.1 + index * 0.05}s` }}
              >
                <SongRow
                  title={song.title}
                  artist={song.artist}
                  duration={song.duration}
                  imageUrl={song.imageUrl}
                  previewUrl={song.previewUrl}
                  spotifyUri={song.spotifyUri}
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </MainLayout>
  );
}

export default Search;
