import { useSpotifyStore } from "../store/useSpotifyStore";

const BASE_URL = "https://api.spotify.com/v1";
const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID || "26d7e960ef024900b73ce0baeced10ac";
const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET || "";

let appToken = null;
let appTokenExpiry = 0;

async function getAppToken() {
  if (!CLIENT_SECRET) return null;
  if (appToken && Date.now() < appTokenExpiry) return appToken;

  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`
      },
      body: "grant_type=client_credentials"
    });
    if (!response.ok) return null;
    const data = await response.json();
    appToken = data.access_token;
    appTokenExpiry = Date.now() + (data.expires_in - 60) * 1000;
    return appToken;
  } catch {
    return null;
  }
}

async function getToken() {
  const userToken = useSpotifyStore.getState().accessToken;
  if (userToken) return userToken;
  return getAppToken();
}

async function spotifyFetch(path) {
  const token = await getToken();
  if (!token) return null;
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!response.ok) return null;
  return response.json();
}

function formatDuration(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

function mapTrack(track) {
  return {
    id: track.id,
    title: track.name,
    artist: track.artists?.map((a) => a.name).join(", ") ?? "",
    artistId: track.artists?.[0]?.id ?? null,
    album: track.album?.name ?? "",
    albumId: track.album?.id ?? null,
    imageUrl: track.album?.images?.[0]?.url ?? "",
    durationMs: track.duration_ms,
    duration: formatDuration(track.duration_ms),
    previewUrl: track.preview_url ?? null,
    spotifyUri: track.uri,
    isExplicit: track.explicit,
    plays: track.popularity ? `${(track.popularity * 1_000_000).toLocaleString()}` : null
  };
}

export async function searchSpotifyTracks(query, limit = 20) {
  if (!query?.trim()) return [];
  const data = await spotifyFetch(
    `/search?${new URLSearchParams({ q: query, type: "track", limit: limit.toString() })}`
  );
  return (data?.tracks?.items ?? []).map(mapTrack);
}

export async function getFeaturedPlaylists(limit = 6) {
  const data = await spotifyFetch(
    `/search?${new URLSearchParams({ q: "mix", type: "playlist", limit: limit.toString() })}`
  );
  return (data?.playlists?.items ?? []).map((pl) => ({
    id: pl.id,
    title: pl.name,
    subtitle: pl.owner?.display_name ? `Por ${pl.owner.display_name}` : "Spotify Mix",
    imageUrl: pl.images?.[0]?.url ?? "",
    spotifyUri: pl.uri
  }));
}

export async function getNewReleases(limit = 5) {
  const albumsData = await spotifyFetch(
    `/browse/new-releases?${new URLSearchParams({ limit: limit.toString(), country: "US" })}`
  );
  const albums = albumsData?.albums?.items ?? [];
  if (albums.length === 0) return [];

  const trackResults = await Promise.all(
    albums.map((al) =>
      spotifyFetch(`/albums/${al.id}/tracks?limit=1&market=US`).then((res) => {
        const track = res?.items?.[0];
        if (!track) return null;
        return {
          id: track.id,
          title: al.name,
          artist: al.artists?.map((a) => a.name).join(", ") ?? "",
          imageUrl: al.images?.[0]?.url ?? "",
          duration: formatDuration(track.duration_ms),
          previewUrl: track.preview_url ?? null,
          spotifyUri: track.uri,
          albumId: al.id
        };
      }).catch(() => null)
    )
  );

  return trackResults.filter(Boolean);
}



export async function searchSpotifyArtists(query, limit = 6) {
  if (!query?.trim()) return [];
  const data = await spotifyFetch(
    `/search?${new URLSearchParams({ q: query, type: "artist", limit: limit.toString() })}`
  );
  return (data?.artists?.items ?? []).map((a) => ({
    id: a.id,
    title: a.name,
    subtitle: a.genres?.[0] ?? "Artista",
    imageUrl: a.images?.[0]?.url ?? "",
    spotifyUri: a.uri,
    followers: a.followers?.total ?? 0,
    popularity: a.popularity
  }));
}

export async function searchSpotifyAlbums(query, limit = 6) {
  if (!query?.trim()) return [];
  const data = await spotifyFetch(
    `/search?${new URLSearchParams({ q: query, type: "album", limit: limit.toString() })}`
  );
  return (data?.albums?.items ?? []).map((al) => ({
    id: al.id,
    title: al.name,
    subtitle: al.artists?.map((a) => a.name).join(", ") ?? "",
    imageUrl: al.images?.[0]?.url ?? "",
    spotifyUri: al.uri,
    year: al.release_date?.slice(0, 4) ?? "",
    totalTracks: al.total_tracks
  }));
}

export async function searchSpotifyPlaylists(query, limit = 6) {
  if (!query?.trim()) return [];
  const data = await spotifyFetch(
    `/search?${new URLSearchParams({ q: query, type: "playlist", limit: limit.toString() })}`
  );
  return (data?.playlists?.items ?? []).map((pl) => ({
    id: pl.id,
    title: pl.name,
    subtitle: pl.owner?.display_name ? `Por ${pl.owner.display_name}` : "Spotify Mix",
    imageUrl: pl.images?.[0]?.url ?? "",
    spotifyUri: pl.uri
  }));
}

export async function getArtist(artistId) {
  const artist = await spotifyFetch(`/artists/${artistId}`);
  if (!artist) return null;
  return {
    id: artist.id,
    type: "artist",
    title: artist.name,
    subtitle: artist.genres?.slice(0, 2).join(", ") || "Artista",
    stats: artist.followers?.total
      ? `${artist.followers.total.toLocaleString()} seguidores`
      : "",
    coverImage: artist.images?.[0]?.url ?? "",
    spotifyUri: artist.uri
  };
}

export async function getArtistTopTracks(artistId) {
  const data = await spotifyFetch(`/artists/${artistId}/top-tracks?market=ES`);
  return (data?.tracks ?? []).map(mapTrack);
}

export async function getArtistAlbums(artistId, limit = 6) {
  const data = await spotifyFetch(
    `/artists/${artistId}/albums?${new URLSearchParams({
      include_groups: "album,single",
      limit: limit.toString(),
      market: "ES"
    })}`
  );
  return (data?.items ?? []).map((al) => ({
    id: al.id,
    title: al.name,
    year: al.release_date?.slice(0, 4) ?? "",
    type: al.album_type === "single" ? "Single" : "Album",
    image: al.images?.[0]?.url ?? ""
  }));
}

export async function getAlbum(albumId) {
  const album = await spotifyFetch(`/albums/${albumId}`);
  if (!album) return null;
  return {
    id: album.id,
    type: "album",
    title: album.name,
    subtitle: album.artists?.map((a) => a.name).join(", ") ?? "",
    stats: `Publicado en ${album.release_date?.slice(0, 4) ?? ""} • ${album.total_tracks} canciones`,
    coverImage: album.images?.[0]?.url ?? "",
    spotifyUri: album.uri,
    artistId: album.artists?.[0]?.id ?? null
  };
}

export async function getAlbumTracks(albumId) {
  const album = await spotifyFetch(`/albums/${albumId}`);
  if (!album) return [];
  const artistName = album.artists?.map((a) => a.name).join(", ") ?? "";
  const coverImage = album.images?.[0]?.url ?? "";
  return (album.tracks?.items ?? []).map((t) => ({
    id: t.id,
    title: t.name,
    artist: t.artists?.map((a) => a.name).join(", ") || artistName,
    artistId: t.artists?.[0]?.id ?? null,
    album: album.name,
    albumId: album.id,
    imageUrl: coverImage,
    durationMs: t.duration_ms,
    duration: formatDuration(t.duration_ms),
    previewUrl: t.preview_url ?? null,
    spotifyUri: t.uri,
    isExplicit: t.explicit,
    plays: null
  }));
}

export async function getPlaylist(playlistId) {
  const pl = await spotifyFetch(`/playlists/${playlistId}`);
  if (!pl) return null;

  const tracks = (pl.tracks?.items ?? [])
    .filter((item) => item.track && item.track.type === "track")
    .map((item) => mapTrack(item.track));

  return {
    id: pl.id,
    type: "mix",
    title: pl.name,
    subtitle: pl.owner?.display_name ? `Por ${pl.owner.display_name}` : "Spotify",
    stats: `${pl.tracks?.total ?? 0} canciones`,
    coverImage: pl.images?.[0]?.url ?? "",
    spotifyUri: pl.uri,
    tracks
  };
}

export async function getUserSavedTracks(limit = 50) {
  const data = await spotifyFetch(`/me/tracks?limit=${limit}&market=ES`);
  if (!data) return null;
  return (data.items ?? []).map((item) => mapTrack(item.track));
}

export async function getSpotifyTrack(trackId) {
  const track = await spotifyFetch(`/tracks/${trackId}`);
  if (!track) return null;
  return mapTrack(track);
}
