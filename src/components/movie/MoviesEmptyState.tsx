import { useTranslation } from 'react-i18next';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import type { MoviesEmptyStateProps } from '../../types/pages.types';

// Styling constants
const STYLES = {
  container: "text-center py-12",
  icon: "w-16 h-16 mx-auto mb-4 text-text-secondary/50",
  title: "text-2xl font-medium text-text-primary mb-2",
  message: "text-text-secondary"
};

export function MoviesEmptyState({ searchQuery }: MoviesEmptyStateProps) {
  const { t } = useTranslation();

  return (
    <div className={STYLES.container}>
      <MagnifyingGlassIcon className={STYLES.icon} />
      <h2 className={STYLES.title}>
        {t('movies.noResults')}
      </h2>
      <p className={STYLES.message}>
        {searchQuery 
          ? t('movies.noResultsForQuery', { query: searchQuery })
          : t('movies.noMoviesAvailable')
        }
      </p>
    </div>
  );
} 