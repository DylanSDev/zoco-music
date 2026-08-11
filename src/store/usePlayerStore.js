import { create } from 'zustand';

export const usePlayerStore = create((set) => ({
  currentSong: {
    title: "Midnight Drive",
    artist: "Cybernetic Pulse",
    imageUrl: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/daily-music-remix-spotify-album-cover-art-design-template-1ea8a797c35a4eafb323d9c3f7d08130_screen.jpg?ts=1602184061",
    duration: "4:30"
  },
  isPlaying: false,
  isExpanded: false,
  playSong: (song) => set({ currentSong: song, isPlaying: true }),
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setIsExpanded: (expanded) => set({ isExpanded: expanded }),
}));
