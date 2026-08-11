import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Home, Search, Library, User, ChevronRight, ChevronLeft } from "lucide-react";
import logo from "../../assets/ZocoMusic-Icono_Neón-FondoTransparente.png";

export function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <aside
      className={`fixed bottom-0 left-0 right-0 z-40 flex h-16 flex-row items-center justify-around border-t border-[rgba(241,255,0,0.15)] bg-[#0F2A3B]/80 px-4 backdrop-blur-lg transition-all duration-300 ease-in-out md:relative md:bottom-auto md:top-0 md:h-screen md:flex-col md:justify-start md:border-r md:border-t-0 md:py-8 md:px-3 ${
        isExpanded ? "md:w-60" : "md:w-20"
      }`}
    >
      <div className="hidden w-full items-center justify-between px-3 md:flex md:mb-8">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center">
          <img src={logo} alt="Zoco Music" className="h-full w-full object-contain drop-shadow-[0_0_8px_rgba(241,255,0,0.5)]" />
        </div>
        {isExpanded && (
          <span className="font-heading text-lg font-extrabold tracking-wider text-white animate-[fadeIn_0.2s_ease-out]">
            ZOCO
          </span>
        )}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="hidden h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-[#0F2A3B]/60 text-[#9bb2c4] transition-all hover:border-[#F1FF00]/40 hover:text-[#F1FF00] md:flex"
        >
          {isExpanded ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </button>
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
          <Home className="h-5 w-5 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
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
          <Search className="h-5 w-5 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
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
          <Library className="h-5 w-5 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
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
          <User className="h-5 w-5 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
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
