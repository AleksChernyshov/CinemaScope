import { Navigation } from './Navigation';

export function MobileNavigation() {
  return (
    <div className="container mx-auto px-4 py-4 lg:hidden">
      <Navigation className="flex flex-wrap justify-center gap-2" />
    </div>
  );
} 