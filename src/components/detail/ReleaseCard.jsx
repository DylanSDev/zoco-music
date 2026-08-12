export const ReleaseCard = ({ release }) => {
  return (
    <div className="flex flex-col gap-3 group cursor-pointer bg-white/5 p-3 rounded-2xl hover:bg-white/10 transition-colors border border-white/5">
      <div className="relative aspect-square w-full rounded-xl overflow-hidden shadow-lg">
        <img 
          src={release.image} 
          alt={release.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="flex flex-col px-1">
        <h4 className="text-white font-semibold text-sm truncate font-inter">
          {release.title}
        </h4>
        <p className="text-white/50 text-xs font-medium font-inter mt-1">
          {release.year} • {release.type}
        </p>
      </div>
    </div>
  );
};
