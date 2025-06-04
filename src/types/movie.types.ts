import type { Movie } from './movie';

export type TabType = 'cast' | 'reviews';
export type AuthMode = 'login' | 'register';
export type MediaType = 'movie' | 'tv';

export interface MovieHeaderProps {
  movie: Movie;
  onBack: () => void;
}

export interface MoviePosterProps {
  movie: Movie;
  onBack: () => void;
}

export interface MovieInfoProps {
  movie: Movie;
  isFavorited: boolean;
  onFavoriteClick: () => void;
}

export interface MovieTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  movieId: string;
  mediaType: MediaType;
}

export interface MovieMetadataProps {
  movie: Movie;
}

export interface MovieGenresProps {
  genres: Array<{ id: number; name: string; }>;
} 