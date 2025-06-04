import { useCallback, useRef } from 'react';

interface UseInfiniteScrollProps {
  isLoading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
}

export function useInfiniteScroll({ isLoading, hasMore, onLoadMore }: UseInfiniteScrollProps) {
  const observer = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback((node: HTMLDivElement) => {
    if (isLoading) return;

    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore && !isLoading) {
        onLoadMore();
      }
    });

    if (node) {
      observer.current.observe(node);
    }
  }, [isLoading, hasMore, onLoadMore]);

  return { lastElementRef };
} 