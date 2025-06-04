import { useTranslation } from 'react-i18next';
import type { MovieMetadataProps } from '../../types/movie.types';
import { StarIcon } from '../icons/StarIcon';

// Styling constants
const STYLES = {
  container: "flex items-center gap-4 mb-4",
  rating: "flex items-center gap-1",
  star: "w-4 h-4 text-yellow-500",
  score: "text-text-primary",
  separator: "text-text-secondary",
  metadata: "text-text-secondary"
};

export function MovieMetadata({ movie }: MovieMetadataProps) {
  const { t } = useTranslation();

  return (
    <div className={STYLES.container}>
      <div className={STYLES.rating}>
        <StarIcon filled className={STYLES.star} />
        <span className={STYLES.score}>{movie.vote_average.toFixed(1)}</span>
      </div>
      <span className={STYLES.separator}>•</span>
      <span className={STYLES.metadata}>{movie.release_date?.split('-')[0]}</span>
      {typeof movie.runtime === 'number' && movie.runtime > 0 && (
        <>
          <span className={STYLES.separator}>•</span>
          <span className={STYLES.metadata}>
            {t('movie.runtime', { count: movie.runtime })}
          </span>
        </>
      )}
      {movie.vote_count > 0 && (
        <>
          <span className={STYLES.separator}>•</span>
          <span className={STYLES.metadata}>
            {t('movie.votes', { count: movie.vote_count })}
          </span>
        </>
      )}
    </div>
  );
} 