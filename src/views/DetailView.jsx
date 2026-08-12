import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { DetailHero } from "../components/detail/DetailHero";
import { DetailActions } from "../components/detail/DetailActions";
import { TrackList } from "../components/detail/TrackList";
import { ReleaseCard } from "../components/detail/ReleaseCard";
import { MainLayout } from "../components/layout/MainLayout";
import { detailMockData } from "../data/mockData";
import { Button } from "../components/ui/Button";

export const DetailView = () => {
  const { type, id } = useParams();
  const navigate = useNavigate();

  // Find the requested data or fallback to bad-bunny if invalid/not provided
  const category = type === 'album' ? 'albums' : type === 'mix' ? 'mixes' : 'artists';
  const targetId = id || 'bad-bunny';
  const data = detailMockData[category]?.[targetId] || detailMockData.artists['bad-bunny'];

  return (
    <MainLayout>
      <div className="w-full text-white relative animate-[fadeIn_0.3s_ease-out_both]">
        {/* Negative margins to pull the hero banner completely flush to the top edge */}
        <div className="-mt-[160px] md:-mt-[200px] -mx-4 md:-mx-12 lg:-mx-16 2xl:-mx-24 relative mb-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate(-1)}
            className="absolute top-36 md:top-44 right-12 md:right-20 z-30 bg-black/30 hover:bg-black/50 backdrop-blur-md rounded-full w-10 h-10 border border-white/10 shadow-lg transition-all"
          >
            <ArrowLeft size={20} className="text-white hover:text-[#F1FF00]" />
          </Button>

        <DetailHero 
          type={data.type}
          title={data.title}
          subtitle={data.subtitle}
          stats={data.stats}
          coverImage={data.coverImage}
        />
      </div>
      
      <div className="max-w-7xl mx-auto">
        <DetailActions tracks={data.tracks} artistName={data.title} />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-6 md:px-10 mt-4">
          <div className="lg:col-span-8">
            <TrackList tracks={data.tracks} artistName={data.title} />
          </div>
          
          <div className="lg:col-span-4">
            <h2 className="text-xl font-bold text-white mb-4 px-4 py-1 font-[Montserrat_Arabic]">
              {data.type === 'artist' ? 'Otros discos' : data.type === 'mix' ? 'Más mixes' : 'Más del artista'}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {data.relatedReleases.map(release => (
                <ReleaseCard key={release.id} release={release} />
              ))}
            </div>
          </div>
        </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default DetailView;
