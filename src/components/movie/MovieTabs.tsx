import { useTranslation } from 'react-i18next';
import { CastSection } from '../CastSection';
import { ReviewsSection } from '../ReviewsSection';
import type { MovieTabsProps, TabType } from '../../types/movie.types';

// Styling constants
const STYLES = {
  container: "border-b border-border",
  tabList: "flex gap-8",
  tab: (isActive: boolean) => `
    pb-4 px-2 font-medium transition-colors relative
    ${isActive 
      ? 'text-purple-500 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-purple-500'
      : 'text-text-secondary hover:text-text-primary'
    }
  `,
  content: "mb-8"
};

export function MovieTabs({ activeTab, onTabChange, movieId, mediaType }: MovieTabsProps) {
  const { t } = useTranslation();

  const renderTab = (tab: TabType, label: string) => (
    <button
      className={STYLES.tab(activeTab === tab)}
      onClick={() => onTabChange(tab)}
    >
      {label}
    </button>
  );

  return (
    <>
      <div className={STYLES.container}>
        <div className={STYLES.tabList}>
          {renderTab('cast', t('movie.cast'))}
          {renderTab('reviews', t('movie.reviews'))}
        </div>
      </div>

      <div className={STYLES.content}>
        {activeTab === 'cast' ? (
          <CastSection movieId={movieId} type={mediaType} />
        ) : (
          <ReviewsSection movieId={movieId} type={mediaType} />
        )}
      </div>
    </>
  );
} 