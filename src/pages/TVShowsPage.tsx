import { useEffect, useState, useRef, useCallback } from 'react';
import { requestTV, requestSearchTV } from '../api/tmdb';
import type { Movie } from '../types/movie';
import { MovieCard } from '../components/movie/MovieCard';
import { SearchBar } from '../components/ui/SearchBar';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MoviesEmptyState } from '../components/movie/MoviesEmptyState';
import { MoviesLoadingState } from '../components/movie/MoviesLoadingState';

// Styling constants
const STYLES = {
  container: "container mx-auto px-4 py-8",
  header: "text-center mb-8",
  title: "text-5xl tracking-wider mb-6",
  error: "text-center text-error",
  grid: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
};

export function TVShowsPage() {
  const [searchParams] = useSearchParams();
  const [shows, setShows] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const { t, i18n } = useTranslation();

  const loadMoreShows = useCallback(async (page: number) => {
    if (isLoading) return;
    
    try {
      setIsLoading(true);
      const query = searchParams.get('query');
      const data = query 
        ? await requestSearchTV(query, page)
        : await requestTV(page);
      
      const showsWithType = data.results.map((show: Movie) => ({
        ...show,
        media_type: 'tv' as const
      }));
      
      setShows(prevShows => [...prevShows, ...showsWithType]);
      setHasMore(page < data.total_pages);
      setCurrentPage(page);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch TV shows');
    } finally {
      setIsLoading(false);
    }
  }, [searchParams, isLoading]);

  const handleSearch = useCallback(async (query: string) => {
    try {
      setIsLoading(true);
      const data = query 
        ? await requestSearchTV(query)
        : await requestTV(1);
      
      const showsWithType = data.results.map((show: Movie) => ({
        ...show,
        media_type: 'tv' as const
      }));
      
      setCurrentPage(1);
      setShows(showsWithType);
      setHasMore(1 < data.total_pages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch TV shows');
      setShows([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const lastElementRef = useCallback((node: HTMLDivElement) => {
    if (isLoading) return;
    
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMoreShows(currentPage + 1);
      }
    });

    if (node) {
      observerRef.current.observe(node);
    }
  }, [isLoading, hasMore, currentPage, loadMoreShows]);

  useEffect(() => {
    const query = searchParams.get('query');
    handleSearch(query || '');

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [searchParams, handleSearch, i18n.language]);

  return (
    <div className={STYLES.container}>
      <div className={STYLES.header}>
        <h1 className={STYLES.title}>
          {searchParams.get('query') 
            ? t('headings.searchResults')
            : t('pages.tvShows.title')}
        </h1>
        <SearchBar onSearch={handleSearch} />
      </div>

      {error && (
        <div className={STYLES.error}>{t('errors.fetchMovies')}</div>
      )}

      {!isLoading && shows.length === 0 ? (
        <MoviesEmptyState searchQuery={searchParams.get('query')} />
      ) : (
        <div className={STYLES.grid}>
          {shows.map((show, index) => (
            <div
              key={`tv-${show.id}-${currentPage}-${index}`}
              ref={index === shows.length - 1 ? lastElementRef : undefined}
            >
              <MovieCard movie={show} />
            </div>
          ))}
        </div>
      )}

      {isLoading && currentPage === 1 && (
        <MoviesLoadingState message={t('loading.movies')} />
      )}
    </div>
  );
} 