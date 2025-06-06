import type { MoviesLoadingStateProps } from '../../types/pages.types';
import { Spinner } from '../common/Spinner';

export function MoviesLoadingState({ message }: MoviesLoadingStateProps) {
  return (
    <div className="flex flex-col items-center gap-4 mt-8">
      <Spinner size="lg" />
      <span className="font-bebas-neue text-2xl text-text-secondary">{message}</span>
    </div>
  );
} 