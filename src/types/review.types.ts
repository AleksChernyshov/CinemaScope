export interface Review {
  id: string;
  author: string;
  content: string;
  created_at: string;
  url: string;
}

export interface ReviewsSectionProps {
  movieId: string;
  type: 'movie' | 'tv';
}

export interface ReviewCardProps {
  review: Review;
} 