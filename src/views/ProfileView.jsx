import { MainLayout } from "../components/layout/MainLayout";
import { ProfileHeader } from "../components/profile/ProfileHeader";
import { SpotifySyncCard } from "../components/profile/SpotifySyncCard";
import { RecentHistorySection } from "../components/profile/RecentHistorySection";
import { userProfileData } from "../data/profileMockData";

export function ProfileView() {
  const handleLogout = () => {
    window.location.hash = "#/";
  };

  return (
    <MainLayout navbarPlaceholder="Buscar en tu perfil...">
      <div className="flex flex-col gap-6 w-full pb-12">
        <ProfileHeader
          name={userProfileData.name}
          role={userProfileData.role}
          avatarUrl={userProfileData.avatarUrl}
          onLogout={handleLogout}
        />

        <SpotifySyncCard status={userProfileData.spotifyStatus} />

        <RecentHistorySection items={userProfileData.recentHistory} />
      </div>
    </MainLayout>
  );
}

export default ProfileView;
