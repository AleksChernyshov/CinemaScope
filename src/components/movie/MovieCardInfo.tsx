import { useTranslation } from 'react-i18next';

interface MovieCardInfoProps {
  title: string;
  rating: string;
  voteCount: number;
}

// Styling constants
const STYLES = {
  wrapper: "absolute inset-0 flex flex-col justify-end",
  gradient: "absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300",
  content: "relative p-4 translate-y-8 group-hover:translate-y-0 transition-transform duration-300",
  title: "font-bebas-neue text-2xl leading-tight tracking-wide truncate mb-2",
  stats: "flex items-center gap-1.5 text-sm min-w-0",
  rating: "inline-flex items-center shrink-0 gap-1",
  ratingValue: "text-purple-400 font-medium",
  separator: "text-text-secondary/70 shrink-0",
  votes: "text-text-secondary/70 truncate min-w-0"
};

export function MovieCardInfo({ title, rating, voteCount }: MovieCardInfoProps) {
  const { t } = useTranslation();

  return (
    <div className={STYLES.wrapper}>
      <div className={STYLES.gradient} />
      
      <div className={STYLES.content}>
        <h3 className={STYLES.title}>{title}</h3>
        <div className={STYLES.stats}>
          <div className={STYLES.rating}>
            <span className="text-purple-500">★</span>
            <span className={STYLES.ratingValue}>{rating}</span>
          </div>
          {voteCount > 0 && (
            <>
              <span className={STYLES.separator}>•</span>
              <span className={STYLES.votes}>
                {t('movie.votes', { count: voteCount })}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
} 