import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { useFavoritesStore } from '../../store/favoritesStore';
import { ImagePlaceholder } from '../ui/ImagePlaceholder';
import { AuthModal } from '../auth/AuthModal';
import { FavoriteButton } from './FavoriteButton';
import { MovieCardInfo } from './MovieCardInfo';
import type { MovieCardProps } from '../../types/movie.types';

// Configuration
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

// Styling constants
const CARD_STYLES = {
  wrapper: `block perspective-1000`,
  container: `relative group overflow-hidden rounded-xl shadow-lg 
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
              group-hover:after:from-purple-500/20 group-hover:after:via-purple-500/20 group-hover:after:to-purple-500/20`,
  image: "w-full h-auto aspect-[2/3] object-cover"
};

// Main movie card component
export function MovieCard({ movie }: MovieCardProps) {
  // Hooks
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavoritesStore();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  
  // Derived values
  const title = movie.title || movie.name || movie.original_title || movie.original_name || 'Untitled';
  const posterUrl = movie.poster_path ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}` : null;
  const rating = typeof movie.vote_average === 'number' ? movie.vote_average.toFixed(1) : 'N/A';
  const voteCount = movie.vote_count || 0;
  const isFavorited = isFavorite(movie.id);

  // Event handlers
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
        className={CARD_STYLES.wrapper}
      >
        <div className={CARD_STYLES.container}>
          <FavoriteButton
            isFavorited={isFavorited}
            isAuthenticated={isAuthenticated}
            onClick={handleFavoriteClick}
          />

          <div className="relative w-full">
            {posterUrl ? (
              <img
                src={posterUrl}
                alt={title}
                className={CARD_STYLES.image}
                loading="lazy"
              />
            ) : (
              <ImagePlaceholder 
                title={title}
                message={t('movie.noPoster')}
              />
            )}
          </div>

          <MovieCardInfo
            title={title}
            rating={rating}
            voteCount={voteCount}
          />
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