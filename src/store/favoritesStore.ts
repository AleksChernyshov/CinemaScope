import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Movie } from '../types/movie';

interface FavoritesState {
  favorites: Movie[];
  addToFavorites: (movie: Movie) => void;
  removeFromFavorites: (movieId: number) => void;
  isFavorite: (movieId: number) => boolean;
  clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [] as Movie[],
      
      addToFavorites: (movie: Movie) => {
        const { favorites } = get();
        if (!favorites.some((m: Movie) => m.id === movie.id)) {
          set({ favorites: [...favorites, movie] });
        }
      },

      removeFromFavorites: (movieId: number) => {
        set((state: FavoritesState) => ({
          favorites: state.favorites.filter((movie: Movie) => movie.id !== movieId)
        }));
      },

      isFavorite: (movieId: number) => {
        return get().favorites.some((movie: Movie) => movie.id === movieId);
      },

      clearFavorites: () => {
        set({ favorites: [] });
      }
    }),
    {
      name: 'favorites-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state: FavoritesState) => ({ favorites: state.favorites }),
    }
  )
); 