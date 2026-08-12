import { useState } from "react";
import { MainLayout } from "../components/layout/MainLayout";
import { FavoritesHero } from "../components/favorites/FavoritesHero";
import { FavoritesTrackList } from "../components/favorites/FavoritesTrackList";
import { usePlayerStore } from "../store/usePlayerStore";

export function FavoritesView() {
  const [searchQuery, setSearchQuery] = useState("");

  const { favorites, removeFavorite, playSong, setIsExpanded } = usePlayerStore();

  const likedIds = new Set(favorites.map((f) => f.id));

  const activeTracks = favorites
    .filter(
      (t) =>
        t.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.artist?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.album?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .map((t) => ({
      id: t.id,
      title: t.title,
      artist: t.artist,
      album: t.album ?? "",
      duration: t.duration,
      image: t.imageUrl,
      previewUrl: t.previewUrl,
      spotifyUri: t.spotifyUri,
      liked: true
    }));

  const handleToggleLike = (id) => removeFavorite(id);

  const handlePlay = (track) => {
    playSong({
      id: track.id,
      title: track.title,
      artist: track.artist,
      imageUrl: track.image,
      duration: track.duration,
      previewUrl: track.previewUrl,
      spotifyUri: track.spotifyUri
    }, activeTracks);
    if (window.innerWidth < 768) setIsExpanded(true);
  };

  const handlePlayAll = () => {
    if (activeTracks.length > 0) handlePlay(activeTracks[0]);
  };

  const handleShuffle = () => {
    if (activeTracks.length > 0) {
      handlePlay(activeTracks[Math.floor(Math.random() * activeTracks.length)]);
    }
  };

  const totalDuration = (() => {
    const totalSecs = activeTracks.reduce((acc, t) => {
      const [m, s] = (t.duration || "0:00").split(":").map(Number);
      return acc + m * 60 + (s || 0);
    }, 0);
    const hours = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    return hours > 0 ? `${hours}h ${mins}min` : `${mins} min`;
  })();

  return (
    <MainLayout navbarPlaceholder="Buscar en tus favoritos...">
      <div className="flex flex-col gap-6 w-full pb-12">
        <FavoritesHero
          title="Tus Canciones Favoritas"
          description="Canciones que guardaste mientras escuchas."
          totalTracks={activeTracks.length}
          totalDuration={totalDuration}
          onPlayAll={handlePlayAll}
          onShuffle={handleShuffle}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <FavoritesTrackList
          tracks={activeTracks}
          likedIds={likedIds}
          onToggleLike={handleToggleLike}
        />
      </div>
    </MainLayout>
  );
}

export default FavoritesView;
