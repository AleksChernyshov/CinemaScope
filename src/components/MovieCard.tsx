import { Link } from 'react-router-dom';
import type { Movie } from '../types/movie';
import { ImagePlaceholder } from './ImagePlaceholder';
import { useTranslation } from 'react-i18next';

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  const { t } = useTranslation();
  const title = movie.title || movie.name || movie.original_title || movie.original_name || 'Untitled';
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;
  const rating = typeof movie.vote_average === 'number' ? movie.vote_average.toFixed(1) : 'N/A';
  const voteCount = movie.vote_count || 0;

  return (
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
  );
} 