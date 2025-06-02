import { useState, useEffect } from 'react';
import { requestReviews } from '../api/tmdb';
import { useTranslation } from 'react-i18next';

interface ReviewsSectionProps {
  movieId: string;
  type: 'movie' | 'tv';
}

export function ReviewsSection({ movieId, type }: ReviewsSectionProps) {
  const [reviews, setReviews] = useState<Array<{
    id: string;
    author: string;
    content: string;
    created_at: string;
    url: string;
  }>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();

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

  if (isLoading) {
    return <div className="text-text-secondary">{t('loading.reviews')}</div>;
  }

  if (error) {
    return <div className="text-error">{t('errors.fetchReviews')}</div>;
  }

  if (reviews.length === 0) {
    return <div className="text-text-secondary py-6">{t('movie.noReviews')}</div>;
  }

  return (
    <div className="py-6">
      <h2 className="text-3xl mb-6">
        {t(type === 'movie' ? 'movie.movieReviews' : 'movie.tvShowReviews')}
      </h2>
      <div className="space-y-8">
        {reviews.map((review) => (
          <div key={review.id} className="bg-bg-secondary/50 rounded-xl p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="size-12 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-500">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-text-primary">{review.author}</h3>
                <p className="text-sm text-text-secondary">
                  {new Date(review.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
            <p className="text-text-secondary leading-relaxed whitespace-pre-line">
              {review.content}
            </p>
            <a
              href={review.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-sm text-purple-500 hover:text-purple-400 transition-colors"
            >
              {t('movie.reviewSource')}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
} 