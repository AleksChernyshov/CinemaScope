import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { requestLatestMovies, requestSearchMovies } from '../api/tmdb';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import type { Movie } from '../types/movie';
import { SearchBar } from '../components/ui/SearchBar';
import { MoviesGrid } from '../components/movie/MoviesGrid';
import { MoviesEmptyState } from '../components/movie/MoviesEmptyState';
import { MoviesLoadingState } from '../components/movie/MoviesLoadingState';

// Styling constants
const STYLES = {
  container: "container mx-auto px-4 py-8",
  header: "text-center mb-8",
  title: "text-5xl tracking-wider mb-6",
  error: "text-center text-error"
};

export function MoviesPage() {
  const [searchParams] = useSearchParams();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { t, i18n } = useTranslation();

  const handleSearch = useCallback(async (query: string) => {
    try {
      setIsLoading(true);
      setCurrentPage(1);
      if (query) {
        const data = await requestSearchMovies(query);
        const moviesWithType = data.results.map(movie => ({
          ...movie,
          media_type: 'movie' as const
        }));
        setMovies(moviesWithType);
        setHasMore(1 < data.total_pages);
      } else {
        const data = await requestLatestMovies(1);
        const moviesWithType = data.results.map(movie => ({
          ...movie,
          media_type: 'movie' as const
        }));
        setMovies(moviesWithType);
        setHasMore(1 < data.total_pages);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch movies');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadMoreMovies = useCallback(async (page: number) => {
    if (isLoading) return;
    
    try {
      setIsLoading(true);
      const query = searchParams.get('query');
      const data = query 
        ? await requestSearchMovies(query, page)
        : await requestLatestMovies(page);
      
      const moviesWithType = data.results.map(movie => ({
        ...movie,
        media_type: 'movie' as const
      }));
      
      setMovies(prevMovies => [...prevMovies, ...moviesWithType]);
      setHasMore(page < data.total_pages);
      setCurrentPage(page);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch movies');
    } finally {
      setIsLoading(false);
    }
  }, [searchParams, isLoading]);

  const { lastElementRef } = useInfiniteScroll({
    isLoading,
    hasMore,
    onLoadMore: useCallback(() => loadMoreMovies(currentPage + 1), [loadMoreMovies, currentPage])
  });

  useEffect(() => {
    const query = searchParams.get('query');
    handleSearch(query || '');
  }, [searchParams, handleSearch, i18n.language]);

  return (
    <div className={STYLES.container}>
      <div className={STYLES.header}>
        <h1 className={STYLES.title}>
          {searchParams.get('query') 
            ? t('headings.searchResults')
            : t('pages.movies.title')}
        </h1>
        <SearchBar onSearch={handleSearch} />
      </div>

      {error && (
        <div className={STYLES.error}>{t('errors.fetchMovies')}</div>
      )}

      {!isLoading && movies.length === 0 ? (
        <MoviesEmptyState searchQuery={searchParams.get('query')} />
      ) : (
        <MoviesGrid 
          movies={movies}
          isLoading={isLoading}
          lastElementRef={lastElementRef}
        />
      )}

      {isLoading && currentPage === 1 && (
        <MoviesLoadingState message={t('loading.movies')} />
      )}
    </div>
  );
} 