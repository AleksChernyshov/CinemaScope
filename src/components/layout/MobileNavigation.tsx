import { Navigation } from './Navigation';
import { useLocation } from 'react-router-dom';

export function MobileNavigation() {
  const location = useLocation();
  const path = location.pathname;
  
  // Hide navigation on movie details and profile pages
  if (path.startsWith('/movie/') || path === '/profile') {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-4 lg:hidden">
      <Navigation className="flex flex-wrap justify-center gap-2" />
    </div>
  );
} 