import { HashRouter, Routes, Route } from "react-router-dom";
import { SplashScreen } from "./components/common/SplashScreen";
import { Home } from "./views/Home";
import "./App.css";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<SplashScreen />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
