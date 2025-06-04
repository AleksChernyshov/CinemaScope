import type { SearchPlaceholderKey } from '../types/search.types';

// Map of paths to their corresponding placeholder keys
const PATH_TO_PLACEHOLDER: Record<string, SearchPlaceholderKey> = {
  '/': 'popular',
  '/movies': 'movies',
  '/tv': 'tvShows',
  '/favorites': 'favorites'
};

export function getSearchPlaceholderKey(path: string): SearchPlaceholderKey {
  return PATH_TO_PLACEHOLDER[path] || 'popular';
} 