export interface CastMember {
  id: number;
  name: string;
  profile_path: string | null;
  character: string;
}

export interface CastSectionProps {
  movieId: string;
  type: 'movie' | 'tv';
}

export interface CastCardProps {
  person: CastMember;
} 