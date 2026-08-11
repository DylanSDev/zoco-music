import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Home, Search, Library, User, ChevronRight, ChevronLeft } from "lucide-react";
import logo from "../../assets/ZocoMusic-Icono_Neón-FondoTransparente.png";

export function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <aside
      className={`fixed bottom-0 left-0 right-0 z-40 flex h-16 flex-row items-center justify-around border-t border-[rgba(241,255,0,0.15)] bg-[#0F2A3B] px-4 transition-all duration-300 ease-in-out md:relative md:bottom-auto md:top-0 md:h-screen md:flex-col md:justify-start md:border-r md:border-t-0 md:py-8 md:px-3 ${
        isExpanded ? "md:w-60" : "md:w-20"
      }`}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute -right-3 top-9 z-50 hidden h-6 w-6 items-center justify-center rounded-full border border-[#F1FF00]/30 bg-[#0F2A3B] text-[#9bb2c4] shadow-neon transition-all hover:border-[#F1FF00] hover:text-[#F1FF00] md:flex"
      >
        {isExpanded ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
      </button>

      <div className={`hidden w-full items-center md:mb-10 md:flex ${isExpanded ? "justify-start px-2 gap-3" : "justify-center"}`}>
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center">
          <img src={logo} alt="Zoco Music" className="h-full w-full object-contain drop-shadow-[0_0_8px_rgba(241,255,0,0.5)]" />
        </div>
        {isExpanded && (
          <span className="animate-[fadeIn_0.2s_ease-out] font-heading text-xl font-extrabold tracking-wider text-white">
            ZOCO
          </span>
        )}
      </div>

      <nav className="flex w-full flex-row justify-around gap-2 md:flex-col md:items-stretch md:gap-4">
        <NavLink
          to="/home"
          className={({ isActive }) =>
            `group relative flex h-12 w-full items-center transition-all duration-300 ease-out rounded-r-xl rounded-l-lg ${
              isExpanded ? "px-4 gap-4" : "justify-center"
            } ${
              isActive
                ? "bg-[#F1FF00]/10 text-[#F1FF00] border-l-[4px] border-[#F1FF00]"
                : "text-[#9bb2c4] hover:bg-white/5 hover:text-white border-l-[4px] border-transparent"
            }`
          }
        >
          <Home className="h-5 w-5 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" fill="currentColor" />
          {isExpanded && (
            <span className="font-sans text-sm font-semibold truncate animate-[fadeIn_0.2s_ease-out]">
              Inicio
            </span>
          )}
        </NavLink>

        <NavLink
          to="/search"
          className={({ isActive }) =>
            `group relative flex h-12 w-full items-center transition-all duration-300 ease-out rounded-r-xl rounded-l-lg ${
              isExpanded ? "px-4 gap-4" : "justify-center"
            } ${
              isActive
                ? "bg-[#F1FF00]/10 text-[#F1FF00] border-l-[4px] border-[#F1FF00]"
                : "text-[#9bb2c4] hover:bg-white/5 hover:text-white border-l-[4px] border-transparent"
            }`
          }
        >
          <Search className="h-5 w-5 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" fill="currentColor" />
          {isExpanded && (
            <span className="font-sans text-sm font-semibold truncate animate-[fadeIn_0.2s_ease-out]">
              Buscar
            </span>
          )}
        </NavLink>

        <NavLink
          to="/library"
          className={({ isActive }) =>
            `group relative flex h-12 w-full items-center transition-all duration-300 ease-out rounded-r-xl rounded-l-lg ${
              isExpanded ? "px-4 gap-4" : "justify-center"
            } ${
              isActive
                ? "bg-[#F1FF00]/10 text-[#F1FF00] border-l-[4px] border-[#F1FF00]"
                : "text-[#9bb2c4] hover:bg-white/5 hover:text-white border-l-[4px] border-transparent"
            }`
          }
        >
          <Library className="h-5 w-5 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" fill="currentColor" />
          {isExpanded && (
            <span className="font-sans text-sm font-semibold truncate animate-[fadeIn_0.2s_ease-out]">
              Biblioteca
            </span>
          )}
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `group relative flex h-12 w-full items-center transition-all duration-300 ease-out rounded-r-xl rounded-l-lg ${
              isExpanded ? "px-4 gap-4" : "justify-center"
            } ${
              isActive
                ? "bg-[#F1FF00]/10 text-[#F1FF00] border-l-[4px] border-[#F1FF00]"
                : "text-[#9bb2c4] hover:bg-white/5 hover:text-white border-l-[4px] border-transparent"
            }`
          }
        >
          <User className="h-5 w-5 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" fill="currentColor" />
          {isExpanded && (
            <span className="font-sans text-sm font-semibold truncate animate-[fadeIn_0.2s_ease-out]">
              Perfil
            </span>
          )}
        </NavLink>
      </nav>
    </aside>
  );
}
export default Sidebar;
