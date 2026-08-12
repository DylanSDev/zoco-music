import { Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function QuickMixCard({ title, imageUrl, id, typeRoute }) {
  const navigate = useNavigate();
  
  const handleClick = () => {
    if (id && typeRoute) {
      navigate(`/detail/${typeRoute}/${id}`);
    }
  };

  return (
    <div 
      onClick={handleClick}
      className="group relative flex items-center gap-4 overflow-hidden rounded-xl border border-white/5 bg-black/20 pr-4 transition-all duration-300 hover:bg-black/40 backdrop-blur-md cursor-pointer"
    >
      <div className="h-16 w-16 flex-shrink-0 overflow-hidden">
        <img src={imageUrl} alt={title} className="h-full w-full object-cover" />
      </div>
      <span className="flex-1 truncate font-sans text-sm font-semibold text-white">{title}</span>
      <button className="flex h-10 w-10 scale-0 items-center justify-center rounded-full bg-[#F1FF00] text-[#06131c] shadow-neon transition-all duration-300 group-hover:scale-100 hover:scale-105 active:scale-95">
        <Play className="h-5 w-5 fill-current ml-0.5" />
      </button>
    </div>
  );
}
