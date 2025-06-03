import { useEffect, useState, useRef, useCallback } from 'react';
import { requestTV, requestSearchTV } from '../api/tmdb';
import type { Movie } from '../types/movie';
import { MovieCard } from '../components/MovieCard';
import { SearchBar } from '../components/SearchBar';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function TVShowsPage() {
  const [searchParams] = useSearchParams();
  const [shows, setShows] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef<HTMLDivElement>(null);
  const { t, i18n } = useTranslation();

  const loadMoreShows = useCallback(async (page: number) => {
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
  }, [searchParams]);

  const handleSearch = useCallback(async (query: string) => {
    try {
      setIsLoading(true);
      setShows([]);
      setCurrentPage(1);
      if (query) {
        const data = await requestSearchTV(query);
        const showsWithType = data.results.map((show: Movie) => ({
          ...show,
          media_type: 'tv' as const
        }));
        setShows(showsWithType);
        setHasMore(1 < data.total_pages);
      } else {
        const data = await requestTV(1);
        const showsWithType = data.results.map((show: Movie) => ({
          ...show,
          media_type: 'tv' as const
        }));
        setShows(showsWithType);
        setHasMore(1 < data.total_pages);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch TV shows');
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
  }, [searchParams, handleSearch]);

  useEffect(() => {
    setShows([]);
    setCurrentPage(1);
    const query = searchParams.get('query');
    handleSearch(query || '');
  }, [i18n.language, searchParams, handleSearch]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-5xl tracking-wider mb-6">
          {searchParams.get('query') 
            ? t('headings.searchResults')
            : t('pages.tvShows.title')}
        </h1>
        <SearchBar onSearch={handleSearch} />
      </div>

      {error && (
        <div className="text-center text-error">{t('errors.fetchMovies')}</div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {shows.map((show, index) => (
          <div
            key={`tv-${show.id}-${currentPage}-${index}`}
            ref={index === shows.length - 1 ? lastElementRef : undefined}
          >
            <MovieCard movie={show} />
          </div>
        ))}
      </div>

      {isLoading && (
        <div className="text-center text-text-secondary mt-8" ref={loadingRef}>
          {t('loading.movies')}
        </div>
      )}
    </div>
  );
} 