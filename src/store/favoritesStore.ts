import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Movie } from '../types/movie';

interface FavoriteMovie {
  id: number;
  media_type: 'movie' | 'tv';
}

interface FavoritesState {
  favoriteIds: FavoriteMovie[];
  addToFavorites: (movie: Movie) => void;
  removeFromFavorites: (movieId: number) => void;
  isFavorite: (movieId: number) => boolean;
  clearFavorites: () => void;
  getFavoriteIds: () => FavoriteMovie[];
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favoriteIds: [] as FavoriteMovie[],
      
      addToFavorites: (movie: Movie) => {
        const { favoriteIds } = get();
        if (!favoriteIds.some(m => m.id === movie.id)) {
          set({ 
            favoriteIds: [...favoriteIds, { id: movie.id, media_type: movie.media_type }]
          });
        }
      },

      removeFromFavorites: (movieId: number) => {
        set((state) => ({
          favoriteIds: state.favoriteIds.filter(movie => movie.id !== movieId)
        }));
      },

      isFavorite: (movieId: number) => {
        return get().favoriteIds.some(movie => movie.id === movieId);
      },

      clearFavorites: () => {
        set({ favoriteIds: [] });
      },

      getFavoriteIds: () => {
        return get().favoriteIds;
      }
    }),
    {
      name: 'favorites-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ favoriteIds: state.favoriteIds }),
    }
  )
); 