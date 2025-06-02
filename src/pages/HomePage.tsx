import { useEffect, useState } from 'react';
import { requestTrendingMovies } from '../api/tmdb';
import type { Movie } from '../types/movie';
import { MovieCard } from '../components/MovieCard';

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
    <div className="container mx-auto px-4 py-8">
      {isLoading && (
        <div className="text-center text-text-secondary">Loading...</div>
      )}

      {error && (
        <div className="text-center text-error">{error}</div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
} 