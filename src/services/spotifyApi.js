import { useSpotifyStore } from "../store/useSpotifyStore";

const BASE_URL = "https://api.spotify.com/v1";

async function getAuthHeader() {
  const token = useSpotifyStore.getState().accessToken;
  if (token) {
    return { Authorization: `Bearer ${token}` };
  }

  try {
    const res = await fetch("https://open.spotify.com/get_access_token?reason=transport&productType=web_player");
    if (res.ok) {
      const data = await res.json();
      if (data.accessToken) {
        return { Authorization: `Bearer ${data.accessToken}` };
      }
    }
  } catch (err) {
    return {};
  }

  return {};
}

export async function searchSpotifyTracks(query) {
  if (!query || !query.trim()) return [];

  const headers = await getAuthHeader();
  if (!headers.Authorization) return [];

  const params = new URLSearchParams({
    q: query,
    type: "track",
    limit: "20"
  });

  const response = await fetch(`${BASE_URL}/search?${params.toString()}`, { headers });
  if (!response.ok) return [];

  const data = await response.json();
  const tracks = data.tracks?.items || [];

  return tracks.map((track) => ({
    id: track.id,
    title: track.name,
    artist: track.artists.map((a) => a.name).join(", "),
    album: track.album.name,
    imageUrl: track.album.images[0]?.url || "",
    durationMs: track.duration_ms,
    duration: formatDuration(track.duration_ms),
    previewUrl: track.preview_url,
    spotifyUri: track.uri,
    isExplicit: track.explicit
  }));
}

export async function getSpotifyTrack(trackId) {
  const headers = await getAuthHeader();
  if (!headers.Authorization) return null;

  const response = await fetch(`${BASE_URL}/tracks/${trackId}`, { headers });
  if (!response.ok) return null;

  const track = await response.json();
  return {
    id: track.id,
    title: track.name,
    artist: track.artists.map((a) => a.name).join(", "),
    album: track.album.name,
    imageUrl: track.album.images[0]?.url || "",
    durationMs: track.duration_ms,
    duration: formatDuration(track.duration_ms),
    previewUrl: track.preview_url,
    spotifyUri: track.uri
  };
}

function formatDuration(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}
