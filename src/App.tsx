import { createBrowserRouter, RouterProvider, ScrollRestoration, Outlet } from 'react-router-dom';
import { Header } from './components/Header';
import { PopularPage } from './pages/PopularPage';
import { MoviePage } from './pages/MoviePage';
import { MoviesPage } from './pages/MoviesPage';
import { TVShowsPage } from './pages/TVShowsPage';
import { ThemeProvider } from './contexts/ThemeContext';
import { ScrollToTopButton } from './components/ScrollToTopButton';

const Layout = () => {
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      <Header />
      <Outlet />
      <ScrollToTopButton />
      <ScrollRestoration />
    </div>
  );
};

const router = createBrowserRouter([
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
    ],
  },
]);

export function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
