import { useTranslation } from 'react-i18next';
import { MovieCard } from '../components/MovieCard';
import { useFavoritesStore } from '../store/favoritesStore';
import type { Movie } from '../types/movie';

export function FavoritesPage() {
  const { t } = useTranslation();
  const favorites = useFavoritesStore((state: { favorites: Movie[] }) => state.favorites);

  if (favorites.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-4xl font-bebas-neue mb-8">{t('pages.favorites.title')}</h1>
        <p className="text-text-secondary text-lg">
          {t('pages.favorites.empty')}
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bebas-neue mb-8 text-center">{t('pages.favorites.title')}</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {favorites.map((movie: Movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
} 