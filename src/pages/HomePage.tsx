import { useEffect, useState } from 'react';
import { requestTrendingMovies } from '../api/tmdb';
import { MovieGrid } from '../components/movie/MovieGrid';
import { LoadingState } from '../components/common/LoadingState';
import { ErrorState } from '../components/common/ErrorState';
import type { Movie } from '../types/movie';

// Styling constants
const STYLES = {
  container: "container mx-auto px-4 py-8"
};

export function HomePage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await requestTrendingMovies();
        setMovies(data.results);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch movies');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className={STYLES.container}>
      {isLoading && <LoadingState />}
      {error && <ErrorState message={error} />}
      {!isLoading && !error && <MovieGrid movies={movies} />}
    </div>
  );
} 