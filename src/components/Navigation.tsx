import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const navigation = [
  { name: 'navigation.popular', href: '/' },
  { name: 'navigation.movies', href: '/movies' },
  { name: 'navigation.tvShows', href: '/tv' },
  { name: 'navigation.favorites', href: '/favorites' },
];

interface NavigationProps {
  mobile?: boolean;
  as?: React.ElementType;
}

export function Navigation({ mobile = false, as: Component = 'div' }: NavigationProps) {
  const location = useLocation();
  const { t } = useTranslation();

  const isCurrentPath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <Component className={mobile ? "space-y-1 px-2 pb-3 pt-2" : "flex space-x-4"}>
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
    </Component>
  );
} 