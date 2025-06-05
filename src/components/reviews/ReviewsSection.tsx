import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { requestReviews } from '../../api/tmdb';
import { ReviewCard } from './ReviewCard';
import type { Review, ReviewsSectionProps } from '../../types/review.types';

// Styling constants
const STYLES = {
  container: "py-6",
  title: "text-3xl mb-6",
  reviewsList: "space-y-8",
  message: "text-text-secondary",
  error: "text-error",
  noReviews: "text-text-secondary py-6"
};

// Main reviews section component
export function ReviewsSection({ movieId, type }: ReviewsSectionProps) {
  // State management
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { t } = useTranslation();

  // Fetch reviews data
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await requestReviews(movieId, type);
        setReviews(data.results);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch reviews');
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [movieId, type]);

  // Loading state
  if (isLoading) {
    return <div className={STYLES.message}>{t('loading.reviews')}</div>;
  }

  // Error state
  if (error) {
    return <div className={STYLES.error}>{t('errors.fetchReviews')}</div>;
  }

  // Empty state
  if (reviews.length === 0) {
    return <div className={STYLES.noReviews}>{t('movie.noReviews')}</div>;
  }

  // Render reviews list
  return (
    <div className={STYLES.container}>
      <h2 className={STYLES.title}>
        {t(type === 'movie' ? 'movie.movieReviews' : 'movie.tvShowReviews')}
      </h2>
      <div className={STYLES.reviewsList}>
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
} 