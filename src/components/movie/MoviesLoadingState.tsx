import type { MoviesLoadingStateProps } from '../../types/pages.types';

// Styling constants
const STYLES = {
  container: "text-center text-text-secondary mt-8"
};

export function MoviesLoadingState({ message }: MoviesLoadingStateProps) {
  return (
    <div className={STYLES.container}>
      {message}
    </div>
  );
} 