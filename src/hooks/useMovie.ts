import { useState, useEffect } from 'react';
import { requestDetails } from '../api/tmdb';
import type { Movie } from '../types/movie';
import { useTranslation } from 'react-i18next';

interface MovieDetailsResponse {
  id: number;
  title?: string;
  name?: string;
  release_date?: string;
  first_air_date?: string;
  runtime?: number;
  episode_run_time?: number[];
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  vote_count: number;
  tagline: string;
  genres: Array<{ id: number; name: string; }>;
}

export function useMovie(id: string, type: 'movie' | 'tv') {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { i18n } = useTranslation();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await requestDetails(id, type) as MovieDetailsResponse;
        setMovie({
          ...data,
          media_type: type,
          title: data.title || data.name || '',
          release_date: data.release_date || data.first_air_date,
          runtime: data.runtime || (data.episode_run_time?.[0] ?? 0),
        } as Movie);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch movie details');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchMovie();
    }
  }, [id, type, i18n.language]);

  return { movie, isLoading, error };
} 