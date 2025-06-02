import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useMovie } from '../hooks/useMovie';
import { ImagePlaceholder } from '../components/ImagePlaceholder';
import { CastSection } from '../components/CastSection';
import { ReviewsSection } from '../components/ReviewsSection';
import { useState } from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

type TabType = 'cast' | 'reviews';

export function MoviePage() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<TabType>('cast');
  const mediaType = (location.state as any)?.mediaType || 'movie';
  const { movie, isLoading, error } = useMovie(id!, mediaType);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-text-secondary">{t('loading.details')}</p>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-error">{t('errors.fetchDetails')}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen -mt-20">
      <div className="relative">
        {/* Backdrop Section */}
        <div className="h-[calc(384px+160px)] relative overflow-hidden">
          {movie.backdrop_path ? (
            <>
              <img
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-primary from-0% via-bg-primary/90 via-90% to-bg-primary/20 to-90%" />
            </>
          ) : (
            <div className="w-full h-full bg-bg-secondary/50" />
          )}
        </div>

        {/* Content Section */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row gap-8 -mt-32">
            <div className="shrink-0 md:w-64 relative">
              {/* Back Button */}
              <button
                onClick={() => navigate(-1)}
                className="cinema-button absolute -top-24 left-0 flex items-center gap-2 px-4 py-2 rounded-full 
                         bg-bg-primary/80 backdrop-blur-sm border border-purple-500/50
                         text-text-primary hover:text-purple-500 hover:bg-bg-secondary/80 
                         ring-1 ring-purple-500/50 hover:ring-purple-500
                         hover:shadow-[0_0_25px_rgba(168,85,247,0.7)]
                         transition-all duration-300 group"
              >
                <ArrowLeftIcon className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                <span>{t('movie.back')}</span>
              </button>

              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-64 rounded-xl shadow-2xl ring-1 ring-white/10 ring-offset-2 ring-offset-purple-500/20 ring-purple-500/50"
                />
              ) : (
                <ImagePlaceholder 
                  title={movie.title}
                  message={t('movie.noPoster')}
                  className="rounded-xl shadow-2xl ring-1 ring-white/10 ring-offset-2 ring-offset-purple-500/20 ring-purple-500/50"
                  iconSize="w-20 h-20"
                />
              )}
            </div>
            
            <div className="flex-1">
              <h1 className="text-6xl tracking-wider mb-2">
                {movie.title}
              </h1>
              
              {movie.tagline && (
                <p className="text-2xl text-purple-500 mb-4 font-inter italic">
                  {movie.tagline}
                </p>
              )}
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500">★</span>
                  <span className="text-text-primary">{movie.vote_average.toFixed(1)}</span>
                </div>
                <span className="text-text-secondary">•</span>
                <span className="text-text-secondary">{movie.release_date?.split('-')[0]}</span>
                {typeof movie.runtime === 'number' && movie.runtime > 0 && (
                  <>
                    <span className="text-text-secondary">•</span>
                    <span className="text-text-secondary">{t('movie.runtime', { count: movie.runtime })}</span>
                  </>
                )}
                {movie.vote_count > 0 && (
                  <>
                    <span className="text-text-secondary">•</span>
                    <span className="text-text-secondary">{t('movie.votes', { count: movie.vote_count })}</span>
                  </>
                )}
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="px-3 py-1 rounded-full text-sm bg-purple-500/10 text-purple-500"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
              
              <p className="text-text-secondary text-lg leading-relaxed mb-8">
                {movie.overview}
              </p>

              {/* Tabs */}
              <div className="border-b border-border">
                <div className="flex gap-8">
                  <button
                    className={`pb-4 px-2 font-medium transition-colors relative ${
                      activeTab === 'cast'
                        ? 'text-purple-500 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-purple-500'
                        : 'text-text-secondary hover:text-text-primary'
                    }`}
                    onClick={() => setActiveTab('cast')}
                  >
                    {t('movie.cast')}
                  </button>
                  <button
                    className={`pb-4 px-2 font-medium transition-colors relative ${
                      activeTab === 'reviews'
                        ? 'text-purple-500 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-purple-500'
                        : 'text-text-secondary hover:text-text-primary'
                    }`}
                    onClick={() => setActiveTab('reviews')}
                  >
                    {t('movie.reviews')}
                  </button>
                </div>
              </div>

              {/* Tab Content */}
              <div className="mb-8">
                {id && activeTab === 'cast' ? (
                  <CastSection movieId={id} type={mediaType} />
                ) : id ? (
                  <ReviewsSection movieId={id} type={mediaType} />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 