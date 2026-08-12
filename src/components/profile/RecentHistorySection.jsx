import { RecentHistoryCard } from "./RecentHistoryCard";
import { usePlayerStore } from "../../store/usePlayerStore";

export function RecentHistorySection({ items = [] }) {
  const clearHistory = usePlayerStore((s) => s.clearHistory);

  if (items.length === 0) {
    return (
      <section className="w-full mt-10">
        <h2 className="font-heading text-2xl font-bold tracking-tight text-white mb-4">
          Historial Reciente
        </h2>
        <p className="text-white/40 text-sm">Aún no has reproducido ninguna canción.</p>
      </section>
    );
  }

  return (
    <section className="w-full mt-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-2xl font-bold tracking-tight text-white">
          Historial Reciente
        </h2>
        <button
          onClick={clearHistory}
          className="font-sans text-xs font-bold text-[#F1FF00] hover:underline transition-all"
        >
          Limpiar
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {items.slice(0, 8).map((item) => (
          <RecentHistoryCard
            key={item.id}
            id={item.id}
            title={item.title}
            subtitle={item.artist}
            image={item.imageUrl}
            duration={item.duration}
            previewUrl={item.previewUrl}
            spotifyUri={item.spotifyUri}
          />
        ))}
      </div>
    </section>
  );
}
