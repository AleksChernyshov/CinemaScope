import { Link } from 'react-router-dom';
import logo from '../../assets/CinemaScope-logo.png';
import { ThemeToggle } from '../theme/ThemeToggle';
import { UserMenu } from '../user/UserMenu';
import { LanguageToggle } from '../language/LanguageToggle';
import { Navigation } from './Navigation';

// Styling constants
const HEADER_STYLES = {
  nav: "bg-bg-secondary/95 backdrop-blur-md sticky top-0 z-50 rounded-b-xl shadow-header",
  container: "container mx-auto px-2 sm:px-4",
  wrapper: "relative flex h-14 sm:h-16 lg:h-20 justify-between items-center gap-2 sm:gap-4",
  controls: "flex items-center gap-1.5 sm:gap-2 lg:gap-3",
  logo: "h-8 sm:h-12 lg:h-16 w-auto",
  desktopNav: "hidden lg:flex lg:items-center lg:justify-center absolute left-1/2 -translate-x-1/2"
};

// Main header component with logo and controls
export function Header() {
  return (
    <nav className={HEADER_STYLES.nav}>
      <div className={HEADER_STYLES.container}>
        <div className={HEADER_STYLES.wrapper}>
          {/* Logo */}
          <div className="flex items-center shrink-0">
            <Link to="/" className="block">
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
    </nav>
  );
}