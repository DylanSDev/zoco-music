import { useEffect } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { SplashScreen } from "./components/common/SplashScreen";
import { Home } from "./views/Home";
import { Search } from "./views/Search";
import { DetailView } from "./views/DetailView";
import { ProfileView } from "./views/ProfileView";
import { FavoritesView } from "./views/FavoritesView";
import { AudioEngine } from "./components/player/AudioEngine";
import { useSpotifyStore } from "./store/useSpotifyStore";
import "./App.css";

function App() {
  const handleAuthCallback = useSpotifyStore((state) => state.handleAuthCallback);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    
    // Si estamos en la ventana emergente, enviamos el código a la ventana principal y cerramos la emergente
    if (code && window.opener) {
      window.opener.postMessage({ type: "SPOTIFY_AUTH_CODE", code }, window.location.origin);
      window.close();
      return;
    }

    // En la ventana principal, escuchamos el código proveniente del popup
    const handleMessage = (event) => {
      if (event.origin !== window.location.origin) return;
      if (event.data?.type === "SPOTIFY_AUTH_CODE") {
        handleAuthCallback(event.data.code);
      }
    };

    window.addEventListener("message", handleMessage);
    
    // Como respaldo en caso de no estar en popup (ej: redirect tradicional)
    handleAuthCallback();

    return () => window.removeEventListener("message", handleMessage);
  }, [handleAuthCallback]);

  return (
    <HashRouter>
      <AudioEngine />
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/favorites" element={<FavoritesView />} />
        <Route path="/favoritos" element={<FavoritesView />} />
        <Route path="/profile" element={<ProfileView />} />
        <Route path="/detail" element={<DetailView />} />
        <Route path="/detail/:type/:id" element={<DetailView />} />
        <Route path="*" element={<SplashScreen />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
