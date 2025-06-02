import { useState, useEffect } from 'react';
import { requestCredits } from '../api/tmdb';
import { useTranslation } from 'react-i18next';

interface CastSectionProps {
  movieId: string;
  type: 'movie' | 'tv';
}

export function CastSection({ movieId, type }: CastSectionProps) {
  const [cast, setCast] = useState<Array<{ id: number; name: string; profile_path: string | null; character: string; }>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchCast = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await requestCredits(movieId, type);
        setCast(data.cast.slice(0, 12));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch cast');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCast();
  }, [movieId, type]);

  if (isLoading) {
    return <div className="text-text-secondary">{t('loading.cast')}</div>;
  }

  if (error) {
    return <div className="text-error">{t('errors.fetchCast')}</div>;
  }

  return (
    <div className="py-6">
      <h2 className="text-3xl mb-6">{t('movie.castAndCrew')}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {cast.map((person) => (
          <div key={person.id} className="text-center">
            <div className="aspect-[2/3] mb-2 rounded-lg overflow-hidden bg-bg-secondary">
              {person.profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w185${person.profile_path}`}
                  alt={person.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-bg-secondary text-text-secondary">
                  <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                  </svg>
                </div>
              )}
            </div>
            <h3 className="font-medium text-text-primary">{person.name}</h3>
            <p className="text-sm text-text-secondary">{person.character}</p>
          </div>
        ))}
      </div>
    </div>
  );
} 