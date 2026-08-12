import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { MainLayout } from "../components/layout/MainLayout";
import { FilterChips } from "../components/home/FilterChips";
import { SectionHeader } from "../components/common/SectionHeader";
import { TopResultCard } from "../components/search/TopResultCard";
import { SongRow } from "../components/home/SongRow";
import {
  searchSpotifyTracks,
  searchSpotifyArtists,
  searchSpotifyAlbums
} from "../services/spotifyApi";

export function Search() {
  const searchChips = ["Todo", "Artistas", "Canciones", "Álbumes"];
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const [tracks, setTracks] = useState([]);
  const [topArtist, setTopArtist] = useState(null);
  const [topAlbum, setTopAlbum] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setTracks([]);
      setTopArtist(null);
      setTopAlbum(null);
      return;
    }

    let isMounted = true;
    setIsLoading(true);

    Promise.all([
      searchSpotifyTracks(query, 5),
      searchSpotifyArtists(query, 1),
      searchSpotifyAlbums(query, 1)
    ])
      .then(([trackResults, artistResults, albumResults]) => {
        if (!isMounted) return;
        setTracks(trackResults);
        setTopArtist(artistResults[0] ?? null);
        setTopAlbum(albumResults[0] ?? null);
      })
      .catch(() => {})
      .finally(() => { if (isMounted) setIsLoading(false); });

    return () => { isMounted = false; };
  }, [query]);

  return (
    <MainLayout navbarPlaceholder="¿Qué quieres escuchar? (ej. Oasis, Bad Bunny, Queen...)">
      <div className="mb-6 pt-2">
        <FilterChips chips={searchChips} />
      </div>

      {!query.trim() ? (
        <p className="text-white/40 text-sm text-center py-16">
          Escribe algo para buscar artistas, canciones y álbumes...
        </p>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 items-stretch">
          <section className="flex flex-col h-full w-full col-span-1 animate-[fadeIn_0.4s_ease-out_both]">
            <SectionHeader title="Artista" />
            <div className="flex-1 w-full flex">
              {topArtist ? (
                <TopResultCard
                  name={topArtist.title}
                  subtitle={topArtist.subtitle}
                  type="Artista"
                  imageUrl={topArtist.imageUrl}
                  id={topArtist.id}
                  typeRoute="artist"
                />
              ) : (
                <div className="flex-1 flex items-center justify-center text-white/30 text-sm">
                  {isLoading ? "Buscando..." : "Sin resultados"}
                </div>
              )}
            </div>
          </section>

          <section className="flex flex-col h-full w-full col-span-1 animate-[fadeIn_0.5s_ease-out_0.1s_both]">
            <SectionHeader title="Álbum" />
            <div className="flex-1 w-full flex">
              {topAlbum ? (
                <TopResultCard
                  name={topAlbum.title}
                  subtitle={topAlbum.subtitle}
                  type="Álbum"
                  isAlbum={true}
                  imageUrl={topAlbum.imageUrl}
                  id={topAlbum.id}
                  typeRoute="album"
                />
              ) : (
                <div className="flex-1 flex items-center justify-center text-white/30 text-sm">
                  {isLoading ? "Buscando..." : "Sin resultados"}
                </div>
              )}
            </div>
          </section>

          <section className="flex flex-col w-full col-span-2 animate-[fadeIn_0.6s_ease-out_0.2s_both]">
            <SectionHeader title={isLoading ? "Buscando en Spotify..." : "Canciones"} />
            <div className="flex flex-col gap-2 w-full">
              {tracks.map((song, index) => (
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
              {!isLoading && tracks.length === 0 && (
                <p className="text-white/30 text-sm py-8 text-center">
                  No se encontraron canciones.
                </p>
              )}
            </div>
          </section>
        </div>
      )}
    </MainLayout>
  );
}

export default Search;
