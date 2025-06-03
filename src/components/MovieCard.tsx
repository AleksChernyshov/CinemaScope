import { Link } from 'react-router-dom';
import type { Movie } from '../types/movie';
import { ImagePlaceholder } from './ImagePlaceholder';
import { useTranslation } from 'react-i18next';
import { useFavoritesStore } from '../store/favoritesStore';
import { useAuth } from '../contexts/AuthContext';
import { AuthModal } from './AuthModal';
import { useState } from 'react';

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavoritesStore();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  
  const title = movie.title || movie.name || movie.original_title || movie.original_name || 'Untitled';
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;
  const rating = typeof movie.vote_average === 'number' ? movie.vote_average.toFixed(1) : 'N/A';
  const voteCount = movie.vote_count || 0;
  const isFavorited = isFavorite(movie.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    
    if (isFavorited) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    addToFavorites(movie);
  };

  return (
    <>
      <Link 
        to={`/movie/${movie.id}`} 
        state={{ mediaType: movie.media_type }}
        className="block perspective-1000"
      >
        <div className="relative group overflow-hidden rounded-xl shadow-lg 
                      transition-all duration-500 ease-out transform-gpu
                      hover:shadow-[0_0_15px_rgba(168,85,247,0.4),0_0_30px_rgba(168,85,247,0.2)]
                      hover:scale-[1.015] hover:rotate-1 hover:-translate-y-2
                      before:absolute before:inset-0 before:z-10
                      before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent)]
                      before:translate-x-[-200%]
                      before:animate-[shine_0s_ease-in]
                      group-hover:before:animate-[shine_1s_ease-in]
                      after:absolute after:inset-0 after:z-[-1] after:rounded-xl
                      after:bg-gradient-to-r after:from-purple-500/0 after:via-purple-500/0 after:to-purple-500/0
                      after:transition-all after:duration-500
                      group-hover:after:from-purple-500/20 group-hover:after:via-purple-500/20 group-hover:after:to-purple-500/20">
          
          {/* Favorite Button */}
          <button
            onClick={handleFavoriteClick}
            className="absolute top-2 right-2 z-20 p-2 rounded-full 
                     bg-black/50 backdrop-blur-sm
                     transition-all duration-300 
                     hover:bg-purple-500/50 hover:scale-110
                     opacity-0 group-hover:opacity-100
                     group/fav"
          >
            {isAuthenticated && isFavorited ? (
              <svg 
                className="w-6 h-6 text-purple-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
              </svg>
            ) : (
              <svg 
                className="w-6 h-6 text-white group-hover/fav:text-purple-500 transition-colors duration-300"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                />
              </svg>
            )}
          </button>

          <div className="relative w-full">
            {posterUrl ? (
              <img
                src={posterUrl}
                alt={title}
                className="w-full h-auto aspect-[2/3] object-cover"
                loading="lazy"
              />
            ) : (
              <ImagePlaceholder 
                title={title}
                message={t('movie.noPoster')}
              />
            )}
          </div>

          {/* Info Overlay */}
          <div className="absolute inset-0 flex flex-col justify-end">
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Content */}
            <div className="relative p-4 translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="font-bebas-neue text-2xl leading-tight tracking-wide truncate mb-2">{title}</h3>
              <div className="flex items-center gap-3 text-sm">
                <div className="flex items-center gap-1.5">
                  <span className="text-purple-500">★</span>
                  <span className="text-purple-400 font-medium">
                    {rating}
                  </span>
                </div>
                {voteCount > 0 && (
                  <>
                    <span className="text-text-secondary/70">•</span>
                    <span className="text-text-secondary/70">
                      {t('movie.votes', { count: voteCount })}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>

      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
        onSwitchMode={() => setAuthMode(mode => mode === 'login' ? 'register' : 'login')}
        onSuccess={handleAuthSuccess}
      />
    </>
  );
} 