import { Play, MoreHorizontal } from "lucide-react";
import { Button } from "../ui/Button";

export const DetailActions = () => {
  return (
    <div className="flex items-center gap-4 px-6 md:px-10 py-6">
      <Button variant="icon" size="icon" className="w-14 h-14 hover:scale-105 transition-transform shadow-[0_0_20px_rgba(241,255,0,0.4)]">
        <Play fill="currentColor" size={24} className="ml-1" />
      </Button>
      
      <Button variant="outline" className="rounded-full px-6 text-xs font-semibold uppercase tracking-widest border-[#F1FF00]/30 hover:border-[#F1FF00]">
        Follow
      </Button>
      
      <Button variant="ghost" size="icon" className="rounded-full w-10 h-10 ml-2">
        <MoreHorizontal size={24} />
      </Button>
    </div>
  );
};
