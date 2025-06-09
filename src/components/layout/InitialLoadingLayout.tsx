import logo from '../../assets/CinemaScope-logo.png';
import { Spinner } from '../common/Spinner';

// Styling constants
const STYLES = {
  nav: "bg-bg-secondary/95 backdrop-blur-md sticky top-0 z-50 rounded-b-xl shadow-header",
  container: "container mx-auto px-4",
  wrapper: "relative flex h-16 sm:h-20 justify-between items-center",
  logo: "h-12 sm:h-16 w-auto"
};

export function InitialLoadingLayout() {
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary bg-[url('/assets/bg-light.png')] dark:bg-[url('/assets/bg-dark.png')] bg-cover bg-center bg-no-repeat bg-fixed">
      {/* Header */}
      <nav className={STYLES.nav}>
        <div className={STYLES.container}>
          <div className={STYLES.wrapper}>
            <div className="flex items-center shrink-0">
              <img src={logo} alt="CinemaScope" className={STYLES.logo} />
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[calc(100vh-80px)]">
        <div className="flex flex-col items-center gap-4">
          <Spinner size="lg" />
          <span className="font-bebas-neue text-2xl text-text-secondary">Loading...</span>
        </div>
      </div>
    </div>
  );
} 