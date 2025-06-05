import type { LoadingStateProps } from '../types/pages.types';

// Styling constants
const STYLES = {
  container: "text-center text-text-secondary"
};

export function LoadingState({ message = 'Loading...' }: LoadingStateProps) {
  return (
    <div className={STYLES.container}>
      {message}
    </div>
  );
} 