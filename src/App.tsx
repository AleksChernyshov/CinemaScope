import { createHashRouter, RouterProvider, Outlet } from 'react-router-dom';
import { Header } from './components/Header';
import { MobileNavigation } from './components/MobileNavigation';
import { PopularPage } from './pages/PopularPage';
import { MoviePage } from './pages/MoviePage';
import { MoviesPage } from './pages/MoviesPage';
import { TVShowsPage } from './pages/TVShowsPage';
import { FavoritesPage } from './pages/FavoritesPage';
import Profile from './pages/Profile';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ScrollToTopButton } from './components/ScrollToTopButton';

const Layout = () => {
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      <Header />
      <MobileNavigation />
      <Outlet />
      <ScrollToTopButton />
    </div>
  );
};

const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <PopularPage />,
      },
      {
        path: 'movies',
        element: <MoviesPage />,
      },
      {
        path: 'tv',
        element: <TVShowsPage />,
      },
      {
        path: 'movie/:id',
        element: <MoviePage />,
      },
      {
        path: 'favorites',
        element: (
          <ProtectedRoute>
            <FavoritesPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  );
}
