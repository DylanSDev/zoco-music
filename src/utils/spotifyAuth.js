const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID || "26d7e960ef024900b73ce0baeced10ac";
const SCOPES = [
  "user-read-private",
  "user-read-email",
  "streaming",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing"
].join(" ");

function generateRandomString(length) {
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
}

async function sha256(plain) {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return crypto.subtle.digest("SHA-256", data);
}

function base64urlencode(a) {
  return btoa(String.fromCharCode.apply(null, new Uint8Array(a)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export async function redirectToSpotifyAuthorize() {
  const verifier = generateRandomString(64);
  window.localStorage.setItem("spotify_code_verifier", verifier);

  const hashed = await sha256(verifier);
  const challenge = base64urlencode(hashed);

  const redirectUri = window.location.origin + window.location.pathname;

  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: "code",
    redirect_uri: redirectUri,
    scope: SCOPES,
    code_challenge_method: "S256",
    code_challenge: challenge
  });

  const width = 450;
  const height = 730;
  const left = window.screen.width / 2 - width / 2;
  const top = window.screen.height / 2 - height / 2;

  window.open(
    `https://accounts.spotify.com/authorize?${params.toString()}`,
    "SpotifyLogin",
    `menubar=no,location=no,resizable=no,scrollbars=no,status=no,width=${width},height=${height},top=${top},left=${left}`
  );
}

const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET || "";

export async function exchangeCodeForToken(code) {
  const verifier = window.localStorage.getItem("spotify_code_verifier");
  const redirectUri = window.location.origin + window.location.pathname;

  const params = new URLSearchParams({
    grant_type: "authorization_code",
    code: code,
    redirect_uri: redirectUri,
    client_id: CLIENT_ID,
    code_verifier: verifier
  });

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded"
  };

  if (CLIENT_SECRET) {
    headers["Authorization"] = `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`;
  }

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers,
    body: params
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    console.error("Token exchange failed:", errData);
    throw new Error("Failed to exchange code for token");
  }

  return response.json();
}

export async function fetchSpotifyProfile(accessToken) {
  const response = await fetch("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  if (!response.ok) {
    throw new Error("Failed to fetch Spotify profile");
  }

  return response.json();
}
