import { useEffect, useRef, useState } from "react";
import { usePlayerStore } from "../../store/usePlayerStore";
import { useSpotifyStore } from "../../store/useSpotifyStore";
import { PreviewDisabledModal } from "./PreviewDisabledModal";

export function AudioEngine() {
  const audioRef = useRef(null);
  const playerRef = useRef(null);
  const currentPreviewUrlRef = useRef("");
  const resolvedUrlRef = useRef("");
  const [deviceId, setDeviceId] = useState(null);

  const {
    currentSong, isPlaying, volume, isMuted, seekTime,
    setIsPlaying, setCurrentTime, setDuration,
    setPlaybackMode, setShowPreviewModal
  } = usePlayerStore();

  const { accessToken, isPremium } = useSpotifyStore();

  useEffect(() => {
    if (!audioRef.current) audioRef.current = new Audio();
    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      if (audio.duration && !isNaN(audio.duration)) setDuration(audio.duration);
    };
    const handleEnded = () => { setIsPlaying(false); setCurrentTime(0); };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [setCurrentTime, setDuration, setIsPlaying]);

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
        volume
      });
      player.addListener("ready", ({ device_id }) => setDeviceId(device_id));
      player.addListener("player_state_changed", (state) => {
        if (!state) return;
        setIsPlaying(!state.paused);
        setCurrentTime(state.position / 1000);
        setDuration(state.duration / 1000);
      });
      player.connect();
      playerRef.current = player;
    };

    return () => { if (playerRef.current) playerRef.current.disconnect(); };
  }, [isPremium, accessToken]);

  useEffect(() => {
    if (isPremium && deviceId && currentSong?.spotifyUri && isPlaying) {
      fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
        body: JSON.stringify({ uris: [currentSong.spotifyUri] })
      }).catch(console.error);
    }
  }, [currentSong?.spotifyUri, deviceId, isPremium, accessToken]);

  useEffect(() => {
    if (isPremium && playerRef.current) return;

    const audio = audioRef.current;
    if (!audio || !currentSong) return;

    const url = currentSong.previewUrl || "";

    if (!url) {
      audio.pause();
      if (isPlaying) {
        setIsPlaying(false);
        setShowPreviewModal(true);
      }
      return;
    }

    if (currentPreviewUrlRef.current !== url) {
      currentPreviewUrlRef.current = url;
      audio.src = url;
      audio.currentTime = 0;
    }

    if (isPlaying) {
      audio.play().catch((err) => {
        console.error("Audio playback error", err);
        setIsPlaying(false);
        setShowPreviewModal(true);
      });
    } else {
      audio.pause();
    }
  }, [currentSong?.previewUrl, currentSong?.id, isPlaying, isPremium, setIsPlaying, setShowPreviewModal]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) audio.volume = isMuted ? 0 : volume;
    if (playerRef.current) playerRef.current.setVolume(isMuted ? 0 : volume);
  }, [volume, isMuted]);

  useEffect(() => {
    if (seekTime !== null) {
      if (isPremium && playerRef.current) playerRef.current.seek(seekTime * 1000);
      else if (audioRef.current) audioRef.current.currentTime = seekTime;
    }
  }, [seekTime, isPremium]);

  return <PreviewDisabledModal />;
}
