import { useTranslation } from 'react-i18next';
import { UserIcon } from '../icons/UserIcon';
import type { ReviewCardProps } from '../../types/review.types';

// Styling constants
const STYLES = {
  container: "bg-bg-secondary/50 rounded-xl p-6",
  header: "flex items-center gap-4 mb-4",
  avatar: "size-12 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-500",
  authorName: "font-medium text-text-primary",
  date: "text-sm text-text-secondary",
  content: "text-text-secondary leading-relaxed whitespace-pre-line",
  link: "inline-block mt-4 text-sm text-purple-500 hover:text-purple-400 transition-colors"
};

// Component for displaying individual review
export function ReviewCard({ review }: ReviewCardProps) {
  const { t } = useTranslation();
  const reviewDate = new Date(review.created_at).toLocaleDateString();

  return (
    <div className={STYLES.container}>
      <div className={STYLES.header}>
        <div className={STYLES.avatar}>
          <UserIcon />
        </div>
        <div>
          <h3 className={STYLES.authorName}>{review.author}</h3>
          <p className={STYLES.date}>{reviewDate}</p>
        </div>
      </div>
      <p className={STYLES.content}>
        {review.content}
      </p>
      <a
        href={review.url}
        target="_blank"
        rel="noopener noreferrer"
        className={STYLES.link}
      >
        {t('movie.reviewSource')}
      </a>
    </div>
  );
} 