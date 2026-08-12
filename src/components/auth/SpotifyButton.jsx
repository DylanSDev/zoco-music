import { redirectToSpotifyAuthorize } from "../../utils/spotifyAuth";

export function SpotifyButton({ onClick }) {
  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    } else {
      redirectToSpotifyAuthorize();
    }
  };

  return (
    <button
      onClick={handleClick}
      className="group relative flex w-full items-center justify-center gap-3 rounded-xl bg-[#1DB954] py-3.5 px-6 font-sans text-sm font-bold text-black shadow-lg shadow-[#1DB954]/20 transition-all duration-300 hover:bg-[#1ed760] hover:shadow-[#1DB954]/40 hover:scale-[1.02] active:scale-[0.98]"
    >
      <svg
        className="h-5 w-5 fill-current transition-transform duration-300 group-hover:scale-110"
        viewBox="0 0 24 24"
      >
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.02 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.48-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.281 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.18-.1.2-1.26-.42-.18-.6.42-1.26 1.02-1.44C9.54 6.06 16.56 6.3 21 8.94c.54.3.72 1.02.42 1.56-.3.42-1.02.6-1.56.36z" />
      </svg>
      <span>Continuar con Spotify</span>
    </button>
  );
}
