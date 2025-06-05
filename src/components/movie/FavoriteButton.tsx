import { StarIcon } from "../icons/StarIcon";

interface FavoriteButtonProps {
  isFavorited: boolean;
  isAuthenticated: boolean;
  onClick: (e: React.MouseEvent) => void;
}

// Styling constants
const BUTTON_STYLES = {
  base: `absolute top-2 right-2 z-20 p-2 rounded-full 
         bg-black/50 backdrop-blur-sm
         transition-all duration-300 
         hover:bg-purple-500/50 hover:scale-110
         opacity-0 group-hover:opacity-100
         group/fav`,
  icon: {
    favorited: "w-6 h-6 text-purple-500",
    default: "w-6 h-6 text-white group-hover/fav:text-purple-500 transition-colors duration-300"
  }
};

// Favorite button component with star icon
export function FavoriteButton({ isFavorited, isAuthenticated, onClick }: FavoriteButtonProps) {
  return (
    <button
      onClick={onClick}
      className={BUTTON_STYLES.base}
    >
      <StarIcon 
        filled={isAuthenticated && isFavorited}
        className={isAuthenticated && isFavorited ? BUTTON_STYLES.icon.favorited : BUTTON_STYLES.icon.default}
      />
    </button>
  );
} 