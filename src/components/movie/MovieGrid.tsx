import { MovieCard } from './MovieCard';
import type { MovieGridProps } from '../../types/pages.types';
import type { Movie } from '../../types/movie';

// Styling constants
const STYLES = {
  grid: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
};

export function MovieGrid({ movies }: MovieGridProps) {
  return (
    <div className={STYLES.grid}>
      {movies.map((movie: Movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
} 