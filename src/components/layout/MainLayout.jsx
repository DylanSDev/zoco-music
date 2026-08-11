import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { BottomPlayer } from "./BottomPlayer";
import { AmbientBackground } from "./AmbientBackground";
import { Navbar } from "./Navbar";

export function MainLayout({ children, navbarPlaceholder }) {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  return (
    <div className="relative flex min-h-screen bg-[#06131c] text-white overflow-hidden">
      <AmbientBackground />
      
      <Sidebar
        isExpanded={isSidebarExpanded}
        onToggleExpand={() => setIsSidebarExpanded(!isSidebarExpanded)}
      />

      <div className="relative z-10 flex-1 h-screen overflow-y-auto pb-40 pt-6 px-4 md:pt-12 md:px-12 lg:px-16 2xl:px-24">
        <Navbar placeholder={navbarPlaceholder} />
        {children}
      </div>

      <BottomPlayer isSidebarExpanded={isSidebarExpanded} />
    </div>
  );
}
