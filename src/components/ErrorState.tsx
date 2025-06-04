import type { ErrorStateProps } from '../types/pages.types';

// Styling constants
const STYLES = {
  container: "text-center text-error"
};

export function ErrorState({ message }: ErrorStateProps) {
  return (
    <div className={STYLES.container}>
      {message}
    </div>
  );
} 