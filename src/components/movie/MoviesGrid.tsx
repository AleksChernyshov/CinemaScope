import { MovieCard } from "./MovieCard";
import type { MoviesGridProps } from "../../types/pages.types";
import type { Movie } from "../../types/movie";

// Styling constants
const STYLES = {
  grid: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
};

export function MoviesGrid({ movies, isLoading, lastElementRef }: MoviesGridProps) {
  return (
    <div className={STYLES.grid}>
      {movies.map((movie: Movie, index: number) => (
        <div
          key={`movie-${movie.id}-${index}`}
          ref={index === movies.length - 1 ? lastElementRef : undefined}
        >
          <MovieCard movie={movie} />
        </div>
      ))}
    </div>
  );
} 