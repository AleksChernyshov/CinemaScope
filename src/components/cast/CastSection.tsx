import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { requestCredits } from '../../api/tmdb';
import { CastCard } from './CastCard';
import { Spinner } from '../common/Spinner';
import type { CastMember, CastSectionProps } from '../../types/cast.types';

// Main component for displaying movie/TV show cast section
export function CastSection({ movieId, type }: CastSectionProps) {
  // State management
  const [cast, setCast] = useState<CastMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { t } = useTranslation();

  // Fetch cast data on component mount or when movieId/type changes
  useEffect(() => {
    const fetchCast = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await requestCredits(movieId, type);
        setCast(data.cast);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch cast');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCast();
  }, [movieId, type]);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex flex-col items-center gap-2">
        <Spinner size="lg" />
        <span className="font-bebas-neue text-2xl text-text-secondary">{t('loading.cast')}</span>
      </div>
    );
  }

  // Error state
  if (error) {
    return <div className="text-error">{t('errors.fetchCast')}</div>;
  }

  // Render cast grid
  return (
    <div className="py-6">
      <h2 className="text-3xl mb-6">{t('movie.castAndCrew')}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {cast.map((person) => (
          <CastCard key={person.id} person={person} />
        ))}
      </div>
    </div>
  );
} 