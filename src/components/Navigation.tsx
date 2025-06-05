import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const navigation = [
  { name: 'navigation.popular', href: '/' },
  { name: 'navigation.movies', href: '/movies' },
  { name: 'navigation.tvShows', href: '/tv' },
  { name: 'navigation.favorites', href: '/favorites' },
];

interface NavigationProps {
  className?: string;
}

export function Navigation({ className = "flex items-center space-x-4" }: NavigationProps) {
  const location = useLocation();
  const { t } = useTranslation();

  const isCurrentPath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className={className}>
      {navigation.map((item) => (
        <Link
          key={item.name}
          to={item.href}
          className={`nav-link group ${
            isCurrentPath(item.href) ? 'nav-link-active' : 'nav-link-inactive'
          }`}
        >
          <span className="nav-text group-hover:text-[var(--nav-text-hover)]">
            {t(item.name)}
          </span>
        </Link>
      ))}
    </div>
  );
} 