import { useState } from "react";
import { MainLayout } from "../components/layout/MainLayout";
import { FavoritesHero } from "../components/favorites/FavoritesHero";
import { FavoritesTrackList } from "../components/favorites/FavoritesTrackList";
import { favoritesMockData } from "../data/favoritesMockData";
import { usePlayerStore } from "../store/usePlayerStore";

export function FavoritesView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [likedIds, setLikedIds] = useState(
    new Set(favoritesMockData.tracks.map((t) => t.id))
  );

  const { playSong, setIsExpanded } = usePlayerStore();

  const activeTracks = favoritesMockData.tracks.filter(
    (t) =>
      likedIds.has(t.id) &&
      (t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.album.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleToggleLike = (id) => {
    setLikedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handlePlayAll = () => {
    if (activeTracks.length > 0) {
      const first = activeTracks[0];
      playSong({
        title: first.title,
        artist: first.artist,
        imageUrl: first.image,
        duration: first.duration,
      });
      if (window.innerWidth < 768) {
        setIsExpanded(true);
      }
    }
  };

  const handleShuffle = () => {
    if (activeTracks.length > 0) {
      const randomIndex = Math.floor(Math.random() * activeTracks.length);
      const randomTrack = activeTracks[randomIndex];
      playSong({
        title: randomTrack.title,
        artist: randomTrack.artist,
        imageUrl: randomTrack.image,
        duration: randomTrack.duration,
      });
      if (window.innerWidth < 768) {
        setIsExpanded(true);
      }
    }
  };

  return (
    <MainLayout navbarPlaceholder="Buscar en tus favoritos...">
      <div className="flex flex-col gap-6 w-full pb-12">
        <FavoritesHero
          title={favoritesMockData.title}
          description={favoritesMockData.description}
          totalTracks={activeTracks.length}
          totalDuration={favoritesMockData.totalDuration}
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
