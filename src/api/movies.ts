import { requestDetails } from './tmdb';
import type { Movie, MovieDetailsResponse } from '../types/movie';

export async function getMovieDetails(movieId: number, language: string): Promise<Movie> {
  const data = await requestDetails(movieId, 'movie') as MovieDetailsResponse;
  return {
    ...data,
    media_type: 'movie',
    title: data.title || data.name || '',
    release_date: data.release_date || data.first_air_date,
    runtime: data.runtime || (data.episode_run_time?.[0] ?? 0),
  };
}
