import { Sparkles, LogOut, User } from "lucide-react";

export function ProfileHeader({ name, role, onLogout }) {
  return (
    <div className="relative flex flex-col items-center justify-center pt-4 pb-6 text-center">
      <div className="relative flex items-center justify-center mb-4">
        <div className="absolute -inset-6 rounded-full bg-[#F1FF00]/25 blur-3xl animate-pulse" />
        <div className="relative h-28 w-28 md:h-36 md:w-36 rounded-full border-2 border-[#F1FF00]/40 flex items-center justify-center shadow-[0_0_35px_rgba(241,255,0,0.35)] bg-[#0F2A3B]">
          <User className="h-12 w-12 md:h-16 md:w-16 text-[#F1FF00]/80" />
        </div>
      </div>

      <h1 className="font-heading text-3xl md:text-5xl font-black text-white tracking-tight leading-none mb-3">
        {name}
      </h1>

      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#F1FF00]/40 bg-[#0F2A3B]/80 text-[#F1FF00] text-xs font-bold tracking-wider uppercase shadow-neon">
        <Sparkles className="h-3.5 w-3.5 fill-current" />
        <span>{role}</span>
      </div>

      <button
        onClick={onLogout}
        className="mt-5 inline-flex items-center gap-2 px-5 py-2 rounded-full border border-red-500/20 bg-red-500/5 text-red-400 hover:text-red-300 hover:border-red-500/40 hover:bg-red-500/10 text-xs font-semibold transition-all duration-300 cursor-pointer"
      >
        <LogOut className="h-4 w-4" />
        <span>Cerrar sesión</span>
      </button>
    </div>
  );
}
