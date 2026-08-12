import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Music } from "lucide-react";
import { DetailHero } from "../components/detail/DetailHero";
import { DetailActions } from "../components/detail/DetailActions";
import { TrackList } from "../components/detail/TrackList";
import { ReleaseCard } from "../components/detail/ReleaseCard";
import { MainLayout } from "../components/layout/MainLayout";
import { Button } from "../components/ui/Button";
import { useSpotifyStore } from "../store/useSpotifyStore";
import {
  getArtist,
  getArtistTopTracks,
  getArtistAlbums,
  getAlbum,
  getAlbumTracks,
  getPlaylist
} from "../services/spotifyApi";

function DetailSkeleton() {
  return (
    <div className="w-full animate-pulse">
      <div className="h-64 bg-white/5 rounded-2xl mb-6" />
      <div className="space-y-3 px-6">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-14 bg-white/5 rounded-xl" />
        ))}
      </div>
    </div>
  );
}

function NotAuthenticated({ onBack }) {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-24 text-center">
      <div className="w-16 h-16 rounded-full bg-[#F1FF00]/10 border border-[#F1FF00]/30 flex items-center justify-center">
        <Music size={28} className="text-[#F1FF00]" />
      </div>
      <div className="space-y-2">
        <h2 className="text-xl font-bold text-white font-[Montserrat_Arabic]">
          Inicia sesión para ver detalles
        </h2>
        <p className="text-white/50 text-sm max-w-xs">
          Conecta tu cuenta de Spotify para acceder al perfil de artistas, álbumes y playlists.
        </p>
      </div>
      <Button variant="ghost" onClick={onBack} className="text-[#F1FF00] border border-[#F1FF00]/30 hover:bg-[#F1FF00]/10">
        <ArrowLeft size={16} className="mr-2" /> Volver
      </Button>
    </div>
  );
}

async function loadDetailData(type, id) {
  if (type === "artist") {
    const [artist, tracks, albums] = await Promise.all([
      getArtist(id),
      getArtistTopTracks(id),
      getArtistAlbums(id)
    ]);
    if (!artist) return null;
    return { ...artist, tracks, relatedReleases: albums };
  }

  if (type === "album") {
    const [album, tracks] = await Promise.all([
      getAlbum(id),
      getAlbumTracks(id)
    ]);
    if (!album) return null;
    const related = await getArtistAlbums(album.artistId, 4).catch(() => []);
    return { ...album, tracks, relatedReleases: related };
  }

  if (type === "mix") {
    const playlist = await getPlaylist(id);
    if (!playlist) return null;
    return { ...playlist, relatedReleases: [] };
  }

  return null;
}

export const DetailView = () => {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const isAuthenticated = useSpotifyStore((s) => s.isAuthenticated);

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated || !type || !id) {
      setIsLoading(false);
      return;
    }

    let isMounted = true;
    setIsLoading(true);

    loadDetailData(type, id)
      .then((result) => { if (isMounted) setData(result); })
      .catch(() => { if (isMounted) setData(null); })
      .finally(() => { if (isMounted) setIsLoading(false); });

    return () => { isMounted = false; };
  }, [type, id, isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <MainLayout>
        <NotAuthenticated onBack={() => navigate(-1)} />
      </MainLayout>
    );
  }

  if (isLoading) {
    return (
      <MainLayout>
        <DetailSkeleton />
      </MainLayout>
    );
  }

  if (!data) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
          <p className="text-white/50">No se encontró la información solicitada.</p>
          <Button variant="ghost" onClick={() => navigate(-1)} className="text-[#F1FF00]">
            <ArrowLeft size={16} className="mr-2" /> Volver
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="w-full text-white relative animate-[fadeIn_0.3s_ease-out_both]">
        <div className="-mt-[160px] md:-mt-[200px] -mx-4 md:-mx-12 lg:-mx-16 2xl:-mx-24 relative mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="absolute top-36 md:top-44 right-12 md:right-20 z-30 bg-black/30 hover:bg-black/50 backdrop-blur-md rounded-full w-10 h-10 border border-white/10 shadow-lg transition-all"
          >
            <ArrowLeft size={20} className="text-white hover:text-[#F1FF00]" />
          </Button>

          <DetailHero
            type={data.type}
            title={data.title}
            subtitle={data.subtitle}
            stats={data.stats}
            coverImage={data.coverImage}
          />
        </div>

        <div className="max-w-7xl mx-auto">
          <DetailActions tracks={data.tracks} artistName={data.title} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-6 md:px-10 mt-4">
            <div className="lg:col-span-8">
              <TrackList tracks={data.tracks} artistName={data.title} />
            </div>

            {data.relatedReleases?.length > 0 && (
              <div className="lg:col-span-4">
                <h2 className="text-xl font-bold text-white mb-4 px-4 py-1 font-[Montserrat_Arabic]">
                  {data.type === "artist" ? "Otros discos" : data.type === "mix" ? "Más mixes" : "Más del artista"}
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {data.relatedReleases.map((release) => (
                    <ReleaseCard key={release.id} release={release} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default DetailView;
