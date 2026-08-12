import { create } from "zustand";

export const usePlayerStore = create((set) => ({
  currentSong: {
    title: "Midnight Drive",
    artist: "Cybernetic Pulse",
    imageUrl: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/daily-music-remix-spotify-album-cover-art-design-template-1ea8a797c35a4eafb323d9c3f7d08130_screen.jpg?ts=1602184061",
    duration: "0:30",
    previewUrl: "https://p.scdn.co/mp3-preview/2f7c00e62ff1875151525a815a513524b0b14c33",
    spotifyUri: "spotify:track:40riOyB19BabwWQZbd5Yx6"
  },
  isPlaying: false,
  isExpanded: false,
  currentTime: 0,
  duration: 30,
  volume: 0.8,
  isMuted: false,
  playbackMode: "preview",
  seekTime: null,

  playSong: (song) =>
    set({
      currentSong: song,
      isPlaying: true,
      currentTime: 0,
      seekTime: 0
    }),

  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setCurrentTime: (currentTime) => set({ currentTime }),
  setDuration: (duration) => set({ duration }),
  setVolume: (volume) => set({ volume }),
  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
  seekTo: (seconds) => set({ seekTime: seconds, currentTime: seconds }),
  setIsExpanded: (expanded) => set({ isExpanded: expanded }),
  setPlaybackMode: (playbackMode) => set({ playbackMode })
}));
