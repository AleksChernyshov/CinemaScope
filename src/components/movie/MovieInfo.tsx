import type { MovieInfoProps } from '../../types/movie.types';
import { MovieMetadata } from './MovieMetadata';
import { MovieGenres } from './MovieGenres';
import { StarIcon } from '../icons/StarIcon';

// Styling constants
const STYLES = {
  container: "flex-grow",
  header: "flex items-center justify-between mb-2",
  title: "text-6xl tracking-wider",
  favoriteButton: `p-2 rounded-full 
                   bg-black/50 backdrop-blur-sm
                   transition-all duration-300 
                   hover:bg-purple-500/50 hover:scale-110
                   group/fav
                   inline-flex items-center justify-center
                   leading-none`,
  favoriteIcon: {
    active: "w-8 h-8 text-purple-500",
    inactive: "w-8 h-8 text-white group-hover/fav:text-purple-500 transition-colors duration-300"
  },
  tagline: "text-2xl text-purple-500 mb-4 font-inter italic",
  overview: "text-text-secondary text-lg leading-relaxed mb-8"
};

export function MovieInfo({ movie, isFavorited, onFavoriteClick }: MovieInfoProps) {
  return (
    <div className={STYLES.container}>
      <div className={STYLES.header}>
        <h1 className={STYLES.title}>{movie.title}</h1>
        <button onClick={onFavoriteClick} className={STYLES.favoriteButton}>
          <StarIcon 
            filled={isFavorited}
            className={isFavorited ? STYLES.favoriteIcon.active : STYLES.favoriteIcon.inactive}
          />
        </button>
      </div>

      {movie.tagline && (
        <p className={STYLES.tagline}>{movie.tagline}</p>
      )}

      <MovieMetadata movie={movie} />
      <MovieGenres genres={movie.genres} />

      <p className={STYLES.overview}>{movie.overview}</p>
    </div>
  );
} 