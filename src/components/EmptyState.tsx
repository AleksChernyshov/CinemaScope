import type { EmptyStateProps } from '../types/pages.types';

// Styling constants
const STYLES = {
  container: "container mx-auto px-4 py-8 text-center",
  title: "text-4xl font-bebas-neue mb-8",
  message: "text-text-secondary text-lg"
};

export function EmptyState({ title, message }: EmptyStateProps) {
  return (
    <div className={STYLES.container}>
      <h1 className={STYLES.title}>{title}</h1>
      <p className={STYLES.message}>{message}</p>
    </div>
  );
} 