import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EmptyState } from '../components/EmptyState';
import { MovieGrid } from '../components/MovieGrid';
import { useFavoritesStore } from '../store/favoritesStore';
import { MoviesLoadingState } from '../components/movies/MoviesLoadingState';
import { getMovieDetails } from '../api/movies';
import { getTVShowDetails } from '../api/tvShows';
import type { Movie } from '../types/movie';

// Styling constants
const STYLES = {
  container: "container mx-auto px-4 py-8",
  title: "text-4xl font-bebas-neue mb-8 text-center"
};

export function FavoritesPage() {
  const { t, i18n } = useTranslation();
  const favoriteIds = useFavoritesStore(state => state.getFavoriteIds());
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchFavorites() {
      setIsLoading(true);
      try {
        const promises = favoriteIds.map(async (favorite) => {
          if (favorite.media_type === 'movie') {
            return getMovieDetails(favorite.id, i18n.language);
          } else {
            return getTVShowDetails(favorite.id, i18n.language);
          }
        });

        const movies = await Promise.all(promises);
        setFavorites(movies);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
      setIsLoading(false);
    }

    fetchFavorites();
  }, [favoriteIds, i18n.language]);

  if (favoriteIds.length === 0) {
    return (
      <EmptyState 
        title={t('pages.favorites.title')}
        message={t('pages.favorites.empty')}
      />
    );
  }

  if (isLoading) {
    return <MoviesLoadingState message={t('loading.favorites')} />;
  }

  return (
    <div className={STYLES.container}>
      <h1 className={STYLES.title}>{t('pages.favorites.title')}</h1>
      <MovieGrid movies={favorites} />
    </div>
  );
} 