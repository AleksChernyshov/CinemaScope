export type SearchPlaceholderKey = 'popular' | 'movies' | 'tvShows' | 'favorites';

export interface SearchBarProps {
  onSearch: (query: string) => void;
}

export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
} 