import { Search, Bell, User } from "lucide-react";

export function Navbar({ placeholder = "Buscar artistas, canciones, podcasts..." }) {
  return (
    <nav className="flex w-full items-center justify-between mb-8">
      <div className="relative w-full max-w-2xl">
        <Search className="absolute left-4 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-white/70 pointer-events-none" />
        <input
          type="text"
          placeholder={placeholder}
          className="h-12 w-full rounded-full border border-white/10 bg-[#0F2A3B]/40 pl-12 pr-4 text-sm text-white placeholder-[#9bb2c4] backdrop-blur-md transition-colors focus:border-[#F1FF00]/50 focus:outline-none focus:ring-1 focus:ring-[#F1FF00]/50"
        />
      </div>

      <div className="flex items-center gap-4 ml-4">
        <button className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-white/10 bg-[#0F2A3B]/40 text-[#9bb2c4] backdrop-blur-md transition-all hover:text-[#F1FF00] hover:border-[#F1FF00]/40">
          <Bell className="h-5 w-5" />
        </button>
        <button className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-[#F1FF00]/40 bg-[#0F2A3B]/60 text-[#F1FF00] backdrop-blur-md transition-all duration-300 hover:shadow-neon hover:scale-105">
          <User className="h-5 w-5" />
        </button>
      </div>
    </nav>
  );
}
