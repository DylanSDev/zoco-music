import { useEffect, useRef, useState } from "react";
import { usePlayerStore } from "../../store/usePlayerStore";
import { useSpotifyStore } from "../../store/useSpotifyStore";

const audio = new Audio();

export function AudioEngine() {
  const playerRef = useRef(null);
  const loadedUrlRef = useRef("");
  const isAudioPlayingRef = useRef(false);
  const [deviceId, setDeviceId] = useState(null);

  const {
    currentSong,
    isPlaying,
    volume,
    isMuted,
    seekTime,
    setCurrentTime,
    playNext,
    setPlaybackMode,
  } = usePlayerStore();

  const { accessToken, isPremium } = useSpotifyStore();

  useEffect(() => {
    setPlaybackMode(isPremium && accessToken ? "sdk" : "preview");
  }, [isPremium, accessToken, setPlaybackMode]);

  useEffect(() => {
    if (!isPremium || !accessToken) return;
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    document.body.appendChild(script);
    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "ZOCO Music Player",
        getOAuthToken: (cb) => cb(accessToken),
        volume,
      });
      player.addListener("ready", ({ device_id }) => setDeviceId(device_id));
      player.addListener("player_state_changed", (state) => {
        if (!state) return;
        usePlayerStore.setState({
          isPlaying: !state.paused,
          currentTime: state.position / 1000,
          duration: state.duration / 1000,
        });
      });
      player.connect();
      playerRef.current = player;
    };
    return () => {
      if (playerRef.current) playerRef.current.disconnect();
    };
  }, [isPremium, accessToken]);

  const prevSongIdRef = useRef(null);

  useEffect(() => {
    if (!isPremium || !deviceId || !currentSong?.spotifyUri) return;
    const endpoint = `https://api.spotify.com/v1/me/player/${isPlaying ? "play" : "pause"}?device_id=${deviceId}`;
    const shouldSendBody = isPlaying && prevSongIdRef.current !== currentSong?.id;
    fetch(endpoint, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      ...(shouldSendBody ? { body: JSON.stringify({ uris: [currentSong.spotifyUri] }) } : {}),
    }).catch(() => {});
    if (isPlaying) prevSongIdRef.current = currentSong?.id;
  }, [currentSong?.spotifyUri, deviceId, isPremium, accessToken, isPlaying]);

  useEffect(() => {
    if (isPremium && playerRef.current) return;
    const url = currentSong?.previewUrl || "";
    if (url && loadedUrlRef.current !== url) {
      loadedUrlRef.current = url;
      audio.src = url;
      audio.currentTime = 0;
      isAudioPlayingRef.current = false;
    }
    if (url) {
      if (isPlaying && !isAudioPlayingRef.current) {
        audio.play().catch(() => {});
        isAudioPlayingRef.current = true;
      } else if (!isPlaying && isAudioPlayingRef.current) {
        audio.pause();
        isAudioPlayingRef.current = false;
      }
    }
  }, [currentSong?.previewUrl, currentSong?.id, isPlaying, isPremium]);

  useEffect(() => {
    if (!isPlaying || !currentSong) return;
    const interval = setInterval(() => {
      const { currentTime, duration } = usePlayerStore.getState();
      if (currentTime >= duration) {
        playNext();
      } else {
        setCurrentTime(currentTime + 0.5);
      }
    }, 500);
    return () => clearInterval(interval);
  }, [isPlaying, currentSong?.id, setCurrentTime, playNext]);

  useEffect(() => {
    audio.volume = isMuted ? 0 : volume;
    if (playerRef.current) playerRef.current.setVolume(isMuted ? 0 : volume);
  }, [volume, isMuted]);

  useEffect(() => {
    if (seekTime !== null) {
      if (isPremium && playerRef.current) {
        playerRef.current.seek(seekTime * 1000);
      } else {
        audio.currentTime = seekTime;
      }
    }
  }, [seekTime, isPremium]);

  return null;
}
