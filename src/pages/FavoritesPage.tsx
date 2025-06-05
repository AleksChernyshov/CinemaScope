import { useTranslation } from 'react-i18next';
import { EmptyState } from '../components/EmptyState';
import { MovieGrid } from '../components/MovieGrid';
import { useFavoritesStore } from '../store/favoritesStore';
import type { Movie } from '../types/movie';

// Styling constants
const STYLES = {
  container: "container mx-auto px-4 py-8",
  title: "text-4xl font-bebas-neue mb-8 text-center"
};

export function FavoritesPage() {
  const { t } = useTranslation();
  const favorites = useFavoritesStore((state: { favorites: Movie[] }) => state.favorites);

  if (favorites.length === 0) {
    return (
      <EmptyState 
        title={t('pages.favorites.title')}
        message={t('pages.favorites.empty')}
      />
    );
  }

  return (
    <div className={STYLES.container}>
      <h1 className={STYLES.title}>{t('pages.favorites.title')}</h1>
      <MovieGrid movies={favorites} />
    </div>
  );
} 