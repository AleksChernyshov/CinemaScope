import type { MovieGenresProps } from '../../types/movie.types';

// Styling constants
const STYLES = {
  container: "flex flex-wrap gap-2 mb-6",
  genre: "px-3 py-1 rounded-full text-sm bg-purple-500/10 text-purple-500"
};

export function MovieGenres({ genres }: MovieGenresProps) {
  return (
    <div className={STYLES.container}>
      {genres.map((genre) => (
        <span key={genre.id} className={STYLES.genre}>
          {genre.name}
        </span>
      ))}
    </div>
  );
} 