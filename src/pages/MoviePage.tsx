import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { useFavoritesStore } from '../store/favoritesStore';
import { useMovie } from '../hooks/useMovie';
import { AuthModal } from '../components/auth/AuthModal';
import { LoadingState } from '../components/common/LoadingState';
import { ErrorState } from '../components/common/ErrorState';
import { MoviePoster } from '../components/movie/MoviePoster';
import { MovieInfo } from '../components/movie/MovieInfo';
import { MovieTabs } from '../components/movie/MovieTabs';
import type { TabType, AuthMode } from '../types/movie.types';


// Styling constants
const STYLES = {
  page: "min-h-screen -mt-20",
  backdrop: {
    container: "h-[calc(384px+160px)] relative overflow-hidden",
    image: "w-full h-full object-cover",
    overlay: "absolute inset-0 bg-gradient-to-t from-bg-primary from-0% via-bg-primary/90 via-90% to-bg-primary/20 to-90%",
    placeholder: "w-full h-full bg-bg-secondary/50"
  },
  content: {
    container: "container mx-auto px-4 relative z-10",
    wrapper: "flex flex-col md:flex-row gap-8 -mt-32"
  }
};

export function MoviePage() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavoritesStore();
  
  const [activeTab, setActiveTab] = useState<TabType>('cast');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>('login');

  const mediaType = (location.state as any)?.mediaType || 'movie';
  const { movie, isLoading, error } = useMovie(id!, mediaType);
  const isFavorited = id ? isFavorite(parseInt(id)) : false;

  const handleFavoriteClick = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    
    if (!movie) return;

    if (isFavorited) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    if (movie) {
      addToFavorites(movie);
    }
  };

  if (isLoading) {
    return <LoadingState message={t('loading.details')} />;
  }

  if (error || !movie) {
    return <ErrorState message={t('errors.fetchDetails')} />;
  }

  return (
    <>
      <div className={STYLES.page}>
        <div className="relative">
          <div className={STYLES.backdrop.container}>
            {movie.backdrop_path ? (
              <>
                <img
                  src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                  alt={movie.title}
                  className={STYLES.backdrop.image}
                />
                <div className={STYLES.backdrop.overlay} />
              </>
            ) : (
              <div className={STYLES.backdrop.placeholder} />
            )}
          </div>

          <div className={STYLES.content.container}>
            <div className={STYLES.content.wrapper}>
              <MoviePoster 
                movie={movie} 
                onBack={() => navigate(-1)} 
              />
              <div className="flex-grow">
                <MovieInfo 
                  movie={movie}
                  isFavorited={isFavorited}
                  onFavoriteClick={handleFavoriteClick}
                />
                <MovieTabs
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                  movieId={id!}
                  mediaType={mediaType}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

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