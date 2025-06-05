import { requestDetails } from './tmdb';
import type { Movie, MovieDetailsResponse } from '../types/movie';

export async function getTVShowDetails(showId: number, language: string): Promise<Movie> {
  const data = await requestDetails(showId, 'tv') as MovieDetailsResponse;
  return {
    ...data,
    media_type: 'tv',
    title: data.name || data.title || '',
    release_date: data.first_air_date || data.release_date,
    runtime: data.episode_run_time?.[0] ?? data.runtime ?? 0,
  } as Movie;
} 
