import { create } from "zustand";
import { exchangeCodeForToken, fetchSpotifyProfile } from "../utils/spotifyAuth";

const STORED_ACCESS_TOKEN = localStorage.getItem("spotify_access_token");
const STORED_REFRESH_TOKEN = localStorage.getItem("spotify_refresh_token");
const STORED_USER_PROFILE = localStorage.getItem("spotify_user_profile");

let parsedProfile = null;
if (STORED_USER_PROFILE) {
  try {
    parsedProfile = JSON.parse(STORED_USER_PROFILE);
  } catch (e) {
    parsedProfile = null;
  }
}

export const useSpotifyStore = create((set, get) => ({
  accessToken: STORED_ACCESS_TOKEN || null,
  refreshToken: STORED_REFRESH_TOKEN || null,
  userProfile: parsedProfile || null,
  isAuthenticated: Boolean(STORED_ACCESS_TOKEN),
  isPremium: parsedProfile?.product === "premium",

  setAuthData: (accessToken, refreshToken, userProfile) => {
    if (accessToken) localStorage.setItem("spotify_access_token", accessToken);
    if (refreshToken) localStorage.setItem("spotify_refresh_token", refreshToken);
    if (userProfile) localStorage.setItem("spotify_user_profile", JSON.stringify(userProfile));

    set({
      accessToken,
      refreshToken,
      userProfile,
      isAuthenticated: Boolean(accessToken),
      isPremium: userProfile?.product === "premium"
    });
  },

  logout: () => {
    localStorage.removeItem("spotify_access_token");
    localStorage.removeItem("spotify_refresh_token");
    localStorage.removeItem("spotify_user_profile");
    localStorage.removeItem("spotify_code_verifier");

    set({
      accessToken: null,
      refreshToken: null,
      userProfile: null,
      isAuthenticated: false,
      isPremium: false
    });
  },

  handleAuthCallback: async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (!code) return;

    try {
      const tokenData = await exchangeCodeForToken(code);
      const profile = await fetchSpotifyProfile(tokenData.access_token);

      get().setAuthData(tokenData.access_token, tokenData.refresh_token, profile);

      const cleanUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);
    } catch (err) {
      console.error("Authentication callback error", err);
    }
  }
}));
