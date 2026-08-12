export const TrackList = ({ tracks }) => {
  return (
    <div className="flex flex-col w-full font-inter">
      <h2 className="text-xl font-bold text-white mb-4 px-4 py-1 font-[Montserrat_Arabic]">Popular</h2>
      
      <div className="flex flex-col gap-2">
        {tracks.map((track, index) => (
          <div 
            key={track.id} 
            className="flex items-center gap-4 p-2 rounded-xl hover:bg-white/5 transition-colors group cursor-pointer"
          >
            <span className="text-white/40 font-medium text-sm w-4 text-right">
              {index + 1}
            </span>
            
            <img 
              src={track.image} 
              alt={track.title} 
              className="w-10 h-10 rounded-md object-cover"
            />
            
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-medium text-sm truncate group-hover:text-[#F1FF00] transition-colors">
                {track.title}
              </h3>
            </div>
            
            <span className="text-white/40 text-xs text-right w-24 hidden md:block">
              {track.plays}
            </span>
            
            <span className="text-white/40 text-xs w-10 text-right">
              {track.duration}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
