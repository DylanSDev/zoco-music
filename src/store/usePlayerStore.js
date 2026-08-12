import { create } from "zustand";

const LS_FAVORITES = "zoco_favorites";
const LS_HISTORY = "zoco_history";
const HISTORY_MAX = 30;

function loadFromStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

export const usePlayerStore = create((set, get) => ({
  currentSong: null,
  isPlaying: false,
  isExpanded: false,
  currentTime: 0,
  duration: 30,
  volume: 0.8,
  isMuted: false,
  playbackMode: "preview",
  seekTime: null,

  favorites: loadFromStorage(LS_FAVORITES, []),
  history: loadFromStorage(LS_HISTORY, []),

  playSong: (song) => {
    const { history } = get();
    const filtered = history.filter((h) => h.id !== song.id);
    const newHistory = [song, ...filtered].slice(0, HISTORY_MAX);
    saveToStorage(LS_HISTORY, newHistory);
    set({ currentSong: song, isPlaying: true, currentTime: 0, seekTime: 0, history: newHistory });
  },

  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setCurrentTime: (currentTime) => set({ currentTime }),
  setDuration: (duration) => set({ duration }),
  setVolume: (volume) => set({ volume }),
  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
  seekTo: (seconds) => set({ seekTime: seconds, currentTime: seconds }),
  setIsExpanded: (expanded) => set({ isExpanded: expanded }),
  setPlaybackMode: (playbackMode) => set({ playbackMode }),

  addFavorite: (song) => {
    const { favorites } = get();
    if (favorites.some((f) => f.id === song.id)) return;
    const next = [song, ...favorites];
    saveToStorage(LS_FAVORITES, next);
    set({ favorites: next });
  },

  removeFavorite: (songId) => {
    const next = get().favorites.filter((f) => f.id !== songId);
    saveToStorage(LS_FAVORITES, next);
    set({ favorites: next });
  },

  isFavorite: (songId) => get().favorites.some((f) => f.id === songId),

  clearHistory: () => {
    saveToStorage(LS_HISTORY, []);
    set({ history: [] });
  }
}));
