import { Play, Pause } from "lucide-react";
import { usePlayerStore } from "../../store/usePlayerStore";

export const TrackList = ({ tracks = [], artistName }) => {
  const { currentSong, isPlaying, playSong, togglePlay, setIsExpanded } = usePlayerStore();

  const handleTrackClick = (track) => {
    const isCurrentTrack = currentSong?.title === track.title;
    if (isCurrentTrack) {
      togglePlay();
    } else {
      playSong({
        title: track.title,
        artist: artistName || track.artist || "Artista",
        imageUrl: track.image || track.imageUrl,
        duration: track.duration || "3:30",
        previewUrl: track.previewUrl,
        spotifyUri: track.spotifyUri
      });
    }
    if (window.innerWidth < 768) {
      setIsExpanded(true);
    }
  };

  return (
    <div className="flex flex-col w-full font-inter">
      <h2 className="text-xl font-bold text-white mb-4 px-4 py-1 font-[Montserrat_Arabic]">Popular</h2>

      <div className="flex flex-col gap-2">
        {tracks.map((track, index) => {
          const isCurrentTrack = currentSong?.title === track.title;
          return (
            <div
              key={track.id || index}
              onClick={() => handleTrackClick(track)}
              className={`flex items-center gap-4 p-3 rounded-xl border transition-all duration-300 group cursor-pointer ${
                isCurrentTrack
                  ? "border-[#F1FF00]/40 bg-[#F1FF00]/10 shadow-sm"
                  : "border-transparent bg-white/0 hover:border-white/10 hover:bg-white/5"
              }`}
            >
              <div className="w-5 text-center flex items-center justify-center flex-shrink-0">
                {isCurrentTrack ? (
                  <button className="text-[#F1FF00]">
                    {isPlaying ? (
                      <Pause className="h-4 w-4 fill-current" />
                    ) : (
                      <Play className="h-4 w-4 fill-current ml-0.5" />
                    )}
                  </button>
                ) : (
                  <>
                    <span className="text-white/40 font-medium text-sm group-hover:hidden">
                      {index + 1}
                    </span>
                    <Play className="h-4 w-4 text-[#F1FF00] fill-current ml-0.5 hidden group-hover:block" />
                  </>
                )}
              </div>

              <img
                src={track.image || track.imageUrl}
                alt={track.title}
                className="w-10 h-10 rounded-md object-cover flex-shrink-0"
              />

              <div className="flex-1 min-w-0">
                <h3
                  className={`font-medium text-sm truncate transition-colors ${
                    isCurrentTrack ? "text-[#F1FF00] font-bold" : "text-white group-hover:text-[#F1FF00]"
                  }`}
                >
                  {track.title}
                </h3>
              </div>

              <span className="text-white/40 text-xs text-right w-24 hidden md:block">
                {track.plays || ""}
              </span>

              <span className="text-white/40 text-xs w-10 text-right">
                {track.duration}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
