import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('query') || '');
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  // Determine which placeholder to use based on the current path
  const getPlaceholderKey = () => {
    const path = location.pathname;
    if (path === '/') return 'popular';
    if (path === '/movies') return 'movies';
    if (path === '/tv') return 'tvShows';
    if (path === '/favorites') return 'favorites';
    return 'popular';
  };

  const debouncedSearch = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams);
      if (value) {
        params.set('query', value);
      } else {
        params.delete('query');
      }
      navigate(`?${params.toString()}`, { replace: true });
      onSearch(value);
    },
    [searchParams, navigate, onSearch]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      debouncedSearch(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query, debouncedSearch]);

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <div className="relative">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-text-secondary" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t(`search.placeholder.${getPlaceholderKey()}`)}
          className="w-full pl-10 pr-4 py-3 bg-bg-secondary border border-bg-secondary/50 
                   dark:bg-bg-primary dark:border-purple-500/20
                   rounded-full text-text-primary placeholder:text-text-secondary 
                   outline-none focus:ring-2 focus:border-purple-500/50
                   focus:ring-purple-500/20 transition-all shadow-sm"
        />
      </div>
    </div>
  );
} 