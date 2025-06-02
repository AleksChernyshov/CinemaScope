import { useEffect, useState } from 'react';
import { ArrowUpIcon } from '@heroicons/react/24/outline';

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > window.innerHeight);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <button
      onClick={scrollToTop}
      className="cinema-button fixed bottom-8 right-8 flex items-center justify-center size-12 rounded-full 
               bg-bg-primary/80 backdrop-blur-sm border border-purple-500/50
               text-text-primary hover:text-purple-500 hover:bg-bg-secondary/80 
               ring-1 ring-purple-500/50 hover:ring-purple-500
               hover:shadow-[0_0_25px_rgba(168,85,247,0.7)]
               transition-all duration-300 group z-50"
    >
      <ArrowUpIcon className="w-6 h-6 transition-transform group-hover:scale-125" />
    </button>
  );
} 