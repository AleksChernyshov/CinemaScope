import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import { ImagePlaceholder } from '../ui/ImagePlaceholder';
import type { MoviePosterProps } from '../../types/movie.types';

// Styling constants
const STYLES = {
  container: "shrink-0 md:w-64 relative",
  backButton: `cinema-button absolute -top-24 left-0 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full 
               bg-bg-primary/80 backdrop-blur-sm border border-purple-500/50
               text-text-primary hover:text-purple-500 hover:bg-bg-secondary/80 
               ring-1 ring-purple-500/50 hover:ring-purple-500
               hover:shadow-[0_0_25px_rgba(168,85,247,0.7)]
               transition-all duration-300 group`,
  backIcon: "w-5 h-5 transition-transform group-hover:-translate-x-1",
  backText: "inline-block leading-none translate-y-[1px]",
  poster: "w-64 rounded-xl shadow-2xl ring-1 ring-white/10 ring-offset-2 ring-offset-purple-500/20 ring-purple-500/50"
};

export function MoviePoster({ movie, onBack }: MoviePosterProps) {
  const { t } = useTranslation();

  return (
    <div className={STYLES.container}>
      <button onClick={onBack} className={STYLES.backButton}>
        <ArrowLeftIcon className={STYLES.backIcon} />
        <span className={STYLES.backText}>{t('movie.back')}</span>
      </button>

      {movie.poster_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className={STYLES.poster}
        />
      ) : (
        <ImagePlaceholder 
          title={movie.title}
          message={t('movie.noPoster')}
          className={STYLES.poster}
          iconSize="w-20 h-20"
        />
      )}
    </div>
  );
} 