import { HashRouter, Routes, Route } from "react-router-dom";
import { SplashScreen } from "./components/common/SplashScreen";
import { Home } from "./views/Home";
import { Search } from "./views/Search";
import { DetailView } from "./views/DetailView";
import { ProfileView } from "./views/ProfileView";
import "./App.css";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/profile" element={<ProfileView />} />
        <Route path="/detail" element={<DetailView />} />
        <Route path="/detail/:type/:id" element={<DetailView />} />
        <Route path="*" element={<SplashScreen />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
