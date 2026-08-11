import { HashRouter, Routes, Route } from "react-router-dom";
import { SplashScreen } from "./components/SplashScreen";
import { AmbientBackground } from "./components/AmbientBackground";
import "./App.css";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="*" element={<SplashScreen />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
