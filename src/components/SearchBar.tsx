import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SearchInput } from './SearchInput';
import { getSearchPlaceholderKey } from '../utils/searchUtils';
import type { SearchBarProps } from '../types/search.types';

// Constants
const DEBOUNCE_DELAY = 500;

// Styling constants
const STYLES = {
  wrapper: "relative w-full max-w-xl mx-auto"
};

// Main search bar component with debounced search
export function SearchBar({ onSearch }: SearchBarProps) {
  // Hooks
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('query') || '');
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  // Update URL and trigger search with debounce
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

  // Handle debounced search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      debouncedSearch(query);
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timer);
  }, [query, debouncedSearch]);

  const placeholderKey = getSearchPlaceholderKey(location.pathname);
  const placeholder = t(`search.placeholder.${placeholderKey}`);

  return (
    <div className={STYLES.wrapper}>
      <SearchInput
        value={query}
        onChange={setQuery}
        placeholder={placeholder}
      />
    </div>
  );
} 