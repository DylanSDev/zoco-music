import { RecentHistoryCard } from "./RecentHistoryCard";

export function RecentHistorySection({ items = [] }) {
  return (
    <section className="w-full mt-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-2xl font-bold tracking-tight text-white">
          Historial Reciente
        </h2>
        <button className="font-sans text-xs font-bold text-[#F1FF00] hover:underline transition-all">
          Ver todo
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {items.map((item) => (
          <RecentHistoryCard
            key={item.id}
            title={item.title}
            subtitle={item.subtitle}
            image={item.image}
            duration={item.duration}
          />
        ))}
      </div>
    </section>
  );
}
