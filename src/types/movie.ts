export interface Movie {
  id: number;
  title: string;
  name?: string;
  original_title?: string;
  original_name?: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  vote_average: number;
  vote_count: number;
  release_date?: string;
  first_air_date?: string;
  media_type: 'movie' | 'tv';
  runtime?: number;
  episode_run_time?: number[];
  tagline?: string;
  genres: Array<{ id: number; name: string }>;
}

export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface MovieDetailsResponse {
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