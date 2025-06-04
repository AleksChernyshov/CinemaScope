import { Disclosure } from '@headlessui/react';
import { Link } from 'react-router-dom';
import logo from '../assets/CinemaScope-logo.png';
import { ThemeToggle } from './ThemeToggle';
import { Navigation } from './Navigation';
import { UserMenu } from './UserMenu';
import { LanguageToggle } from './LanguageToggle';
import { MenuButton } from './MenuButton';

// Styling constants
const HEADER_STYLES = {
  nav: "bg-bg-secondary/95 backdrop-blur-md sticky top-0 z-50 rounded-b-xl shadow-header",
  container: "container mx-auto px-4",
  wrapper: "relative flex h-20 justify-between items-center",
  mobileMenu: "flex sm:hidden",
  desktopNav: "hidden sm:flex sm:items-center sm:justify-center absolute left-1/2 -translate-x-1/2",
  controls: "flex items-center gap-3",
  logo: "h-16 w-auto"
};

const NAVIGATION_ITEMS = [
  { to: '/', label: 'pages.home' },
  { to: '/movies', label: 'pages.movies' },
  { to: '/tv', label: 'pages.tvShows' },
  { to: '/popular', label: 'pages.popular' },
  { to: '/favorites', label: 'pages.favorites' }
];

// Main header component with navigation and controls
export function Header() {
  return (
    <Disclosure as="nav" className={HEADER_STYLES.nav}>
      {({ open }) => (
        <>
          <div className={HEADER_STYLES.container}>
            <div className={HEADER_STYLES.wrapper}>
              {/* Mobile menu button */}
              <div className={HEADER_STYLES.mobileMenu}>
                <MenuButton open={open} />
              </div>

              {/* Logo */}
              <div className="flex items-center">
                <Link to="/" className="shrink-0">
                  <img src={logo} alt="CinemaScope" className={HEADER_STYLES.logo} />
                </Link>
              </div>

              {/* Desktop navigation */}
              <div className={HEADER_STYLES.desktopNav}>
                <Navigation />
              </div>

              {/* Right side controls */}
              <div className={HEADER_STYLES.controls}>
                <LanguageToggle />
                <ThemeToggle />
                <UserMenu />
              </div>
            </div>
          </div>

          {/* Mobile navigation panel */}
          <Disclosure.Panel className="sm:hidden">
            <Navigation mobile as={Disclosure.Button} />
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}