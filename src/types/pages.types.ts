import type { Movie } from './movie';

export interface EmptyStateProps {
  title: string;
  message: string;
}

export interface MovieGridProps {
  movies: Movie[];
}

export interface LoadingStateProps {
  message?: string;
}

export interface ErrorStateProps {
  message: string;
}

export interface MoviesGridProps {
  movies: Movie[];
  isLoading: boolean;
  lastElementRef: (node: HTMLDivElement) => void;
}

export interface MoviesEmptyStateProps {
  searchQuery: string | null;
}

export interface MoviesLoadingStateProps {
  message: string;
} 