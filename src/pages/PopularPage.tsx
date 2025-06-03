import { useEffect, useState, useRef, useCallback } from 'react';
import { requestTrendingMovies, requestSearchMovies } from '../api/tmdb';
import type { Movie } from '../types/movie';
import { MovieCard } from '../components/MovieCard';
import { SearchBar } from '../components/SearchBar';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function PopularPage() {
  const [searchParams] = useSearchParams();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef<HTMLDivElement>(null);
  const { t, i18n } = useTranslation();

  const loadMoreMovies = async (page: number) => {
    try {
      setIsLoading(true);
      const query = searchParams.get('query');
      const data = query 
        ? await requestSearchMovies(query, page)
        : await requestTrendingMovies(page);
      setMovies(prevMovies => [...prevMovies, ...data.results]);
      setHasMore(page < data.total_pages);
      setCurrentPage(page);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch movies');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = useCallback(async (query: string) => {
    try {
      setIsLoading(true);
      setCurrentPage(1);
      if (query) {
        const data = await requestSearchMovies(query);
        setMovies(data.results);
        setHasMore(1 < data.total_pages);
      } else {
        const data = await requestTrendingMovies(1);
        setMovies(data.results);
        setHasMore(1 < data.total_pages);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch movies');
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
        loadMoreMovies(currentPage + 1);
      }
    });

    if (node) {
      observerRef.current.observe(node);
    }
  }, [isLoading, hasMore, currentPage]);

  useEffect(() => {
    const query = searchParams.get('query');
    handleSearch(query || '');

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    setMovies([]);
    setCurrentPage(1);
    const query = searchParams.get('query');
    handleSearch(query || '');
  }, [i18n.language]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-5xl tracking-wider mb-6">
          {searchParams.get('query') 
            ? t('headings.searchResults')
            : t('pages.popular.title')}
        </h1>
        <SearchBar onSearch={handleSearch} />
      </div>

      {error && (
        <div className="text-center text-error">{error}</div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {movies.map((movie, index) => (
          <div
            key={`popular-${movie.id}-${currentPage}-${index}`}
            ref={index === movies.length - 1 ? lastElementRef : undefined}
          >
            <MovieCard movie={movie} />
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