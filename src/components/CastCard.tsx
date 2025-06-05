import type { CastCardProps } from '../types/cast.types';
import { UserIcon } from './icons/UserIcon';

// Configuration for TMDB image URLs
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w185';

// Component for displaying individual cast member information
export function CastCard({ person }: CastCardProps) {
  return (
    <div className="text-center">
      <div className="aspect-[2/3] mb-2 rounded-lg overflow-hidden bg-bg-secondary">
        {person.profile_path ? (
          <img
            src={`${TMDB_IMAGE_BASE_URL}${person.profile_path}`}
            alt={person.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-bg-secondary text-text-secondary">
            <UserIcon />
          </div>
        )}
      </div>
      <h3 className="font-medium text-text-primary">{person.name}</h3>
      <p className="text-sm text-text-secondary">{person.character}</p>
    </div>
  );
} 