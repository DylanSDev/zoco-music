import { MainLayout } from "../components/layout/MainLayout";
import { ProfileHeader } from "../components/profile/ProfileHeader";
import { SpotifySyncCard } from "../components/profile/SpotifySyncCard";
import { RecentHistorySection } from "../components/profile/RecentHistorySection";
import { useSpotifyStore } from "../store/useSpotifyStore";
import { usePlayerStore } from "../store/usePlayerStore";

export function ProfileView() {
  const { userProfile, isAuthenticated, logout } = useSpotifyStore();
  const history = usePlayerStore((s) => s.history);

  const handleLogout = () => {
    logout();
    window.location.hash = "#/";
  };

  const name = userProfile?.display_name || "Usuario";
  const spotifyStatus = isAuthenticated ? "connected" : "disconnected";

  return (
    <MainLayout navbarPlaceholder="Buscar en tu perfil...">
      <div className="flex flex-col gap-6 w-full pb-12">
        <ProfileHeader
          name={name}
          role={isAuthenticated ? "Usuario Premium" : "Oyente"}
          onLogout={handleLogout}
        />

        <SpotifySyncCard status={spotifyStatus} />

        <RecentHistorySection items={history} />
      </div>
    </MainLayout>
  );
}

export default ProfileView;
