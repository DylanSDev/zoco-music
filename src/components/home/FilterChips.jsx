import { useState } from "react";

export function FilterChips({ chips = [], activeChip: externalActive, onSelectChip }) {
  const [internalActive, setInternalActive] = useState("Todos");
  const [isExpanded, setIsExpanded] = useState(false);

  const activeChip = externalActive !== undefined ? externalActive : internalActive;

  const defaultChips = [
    "Todos",
    "Entrenamiento",
    "Actívate",
    "Fiesta",
    "Para sentirte bien",
    "Viaje diario",
    "Relajación",
    "Romance",
    "Concentración"
  ];

  const list = chips.length > 0 ? chips : defaultChips;

  const handleChipClick = (chip) => {
    if (onSelectChip) {
      onSelectChip(chip);
    } else {
      setInternalActive(chip);
    }
  };

  return (
    <div className="flex flex-col items-start justify-start mb-8 w-full">
      <div
        className={`w-full flex flex-wrap items-center justify-start gap-2 transition-all duration-300 ${
          isExpanded
            ? "max-h-[500px]"
            : "max-h-[34px] overflow-hidden md:max-h-none md:overflow-visible"
        }`}
      >
        {list.map((chip, index) => {
          const isActive = activeChip === chip;
          return (
            <button
              key={index}
              onClick={() => handleChipClick(chip)}
              className={`rounded-xl px-3 py-1.5 md:px-4 md:py-2 font-sans text-xs font-semibold transition-all duration-200 border cursor-pointer ${
                isActive
                  ? "bg-[#F1FF00] text-[#06131c] border-[#F1FF00] font-bold shadow-neon"
                  : "bg-white/10 text-white/80 border-white/5 hover:bg-white/20 hover:text-white hover:border-[#F1FF00]/30"
              }`}
            >
              {chip}
            </button>
          );
        })}
      </div>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-2.5 font-sans text-xs font-semibold text-[#9bb2c4] hover:text-[#F1FF00] transition-colors duration-200 cursor-pointer md:hidden"
      >
        {isExpanded ? "Ver menos" : "Ver más"}
      </button>
    </div>
  );
}
