import axios from 'axios';
import type { MovieResponse } from '../types/movie';
import i18next from 'i18next';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = "c1e53addfa80b01d9b5d3a3d23b4febe"

interface CreditsResponse {
  id: number;
  cast: Array<{
    id: number;
    name: string;
    profile_path: string | null;
    character: string;
  }>;
  crew: Array<{
    id: number;
    name: string;
    profile_path: string | null;
    job: string;
  }>;
}

interface ReviewResponse {
  id: number;
  page: number;
  results: Array<{
    id: string;
    author: string;
    content: string;
    created_at: string;
    url: string;
  }>;
  total_pages: number;
  total_results: number;
}

const getLanguage = () => {
  return i18next.language || 'en';
};

export async function requestTrendingMovies(page = 1): Promise<MovieResponse> {
  const { data } = await axios.get<MovieResponse>(
    `${BASE_URL}/trending/all/week?api_key=${API_KEY}&page=${page}&language=${getLanguage()}&include_image_language=en`,
  );
  return data;
}

export async function requestDetails(movieId: string | number, type: 'movie' | 'tv') {
  const { data } = await axios.get(
    `${BASE_URL}/${type}/${movieId}?api_key=${API_KEY}&language=${getLanguage()}&append_to_response=videos&include_image_language=en`,
  );
  return data;
}

export async function requestLatestMovies(page = 1): Promise<MovieResponse> {
  const { data } = await axios.get<MovieResponse>(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}&language=${getLanguage()}&include_image_language=en`,
  );
  return data;
}

export async function requestTV(page = 1): Promise<MovieResponse> {
  const { data } = await axios.get<MovieResponse>(
    `${BASE_URL}/tv/popular?api_key=${API_KEY}&page=${page}&language=${getLanguage()}&include_image_language=en`,
  );
  return data;
}

export async function requestCredits(movieId: string | number, type: 'movie' | 'tv'): Promise<CreditsResponse> {
  const { data } = await axios.get<CreditsResponse>(
    `${BASE_URL}/${type}/${movieId}/credits?api_key=${API_KEY}&language=${getLanguage()}`,
  );
  return data;
}

export async function requestReviews(movieId: string | number, type: 'movie' | 'tv'): Promise<ReviewResponse> {
  const { data } = await axios.get<ReviewResponse>(
    `${BASE_URL}/${type}/${movieId}/reviews?api_key=${API_KEY}&language=${getLanguage()}`,
  );
  return data;
}

export async function requestSearch(query: string, page = 1): Promise<MovieResponse> {
  const { data } = await axios.get<MovieResponse>(
    `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${query}&page=${page}&language=${getLanguage()}`,
  );
  return data;
}

export async function requestSearchMovies(query: string, page = 1): Promise<MovieResponse> {
  const { data } = await axios.get<MovieResponse>(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}&language=${getLanguage()}`,
  );
  return data;
}

export async function requestSearchTV(query: string, page = 1): Promise<MovieResponse> {
  const { data } = await axios.get<MovieResponse>(
    `${BASE_URL}/search/tv?api_key=${API_KEY}&query=${query}&page=${page}&language=${getLanguage()}`,
  );
  return data;
} 