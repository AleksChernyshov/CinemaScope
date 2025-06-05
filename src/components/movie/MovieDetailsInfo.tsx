import { useTranslation } from 'react-i18next';
import { FavoriteButton } from './FavoriteButton';

interface MovieDetailsInfoProps {
  movie: {
    title: string;
    name?: string;
    release_date?: string;
    runtime?: number;
    vote_average: number;
    vote_count: number;
    tagline?: string;
    overview: string;
    genres: Array<{ id: number; name: string }>;
  };
  isFavorited: boolean;
  onFavoriteClick: () => void;
}

// Styling constants
const STYLES = {
  container: "text-white",
  titleBlock: "mb-2",
  title: "text-4xl font-bold",
  year: "text-text-secondary",
  tagline: "text-purple-400 italic mb-4",
  metadata: "flex items-center gap-2 text-sm text-text-secondary mb-6",
  rating: "flex items-center gap-1",
  star: "text-yellow-500",
  ratingValue: "text-text-primary",
  separator: "w-1 h-1 rounded-full bg-text-secondary",
  overview: "text-base text-text-secondary leading-relaxed mb-6",
  genres: "flex flex-wrap gap-2",
  genre: "px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-sm hover:bg-purple-500/20 transition-colors"
};

export function MovieDetailsInfo({ movie, isFavorited, onFavoriteClick }: MovieDetailsInfoProps) {
  const { t } = useTranslation();

  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : null;
  const rating = movie.vote_average.toFixed(1);

  return (
    <div className={STYLES.container}>
      <div className={STYLES.titleBlock}>
        <h1 className={STYLES.title}>
          {movie.title || movie.name}
          {releaseYear && (
            <span className={STYLES.year}> ({releaseYear})</span>
          )}
        </h1>
      </div>

      {movie.tagline && (
        <p className={STYLES.tagline}>{movie.tagline}</p>
      )}

      <div className={STYLES.metadata}>
        {movie.release_date && (
          <>
            <span>{new Date(movie.release_date).toLocaleDateString()}</span>
            <span className={STYLES.separator} />
          </>
        )}
        {movie.runtime && movie.runtime > 0 && (
          <>
            <span>{t('movie.runtime', { minutes: movie.runtime })}</span>
            <span className={STYLES.separator} />
          </>
        )}
        <div className={STYLES.rating}>
          <span className={STYLES.star}>★</span>
          <span className={STYLES.ratingValue}>{rating}</span>
        </div>
        <span className={STYLES.separator} />
        <span>{t('movie.votes', { count: movie.vote_count })}</span>
        <FavoriteButton
          isFavorited={isFavorited}
          isAuthenticated={true}
          onClick={onFavoriteClick}
        />
      </div>

      {movie.overview && (
        <p className={STYLES.overview}>{movie.overview}</p>
      )}

      {movie.genres && movie.genres.length > 0 && (
        <div className={STYLES.genres}>
          {movie.genres.map(genre => (
            <span key={genre.id} className={STYLES.genre}>
              {genre.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
} 