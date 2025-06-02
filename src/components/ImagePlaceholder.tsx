import { FilmIcon } from '@heroicons/react/24/outline';

interface ImagePlaceholderProps {
  title: string;
  message?: string;
  aspectRatio?: string;
  iconSize?: string;
  className?: string;
}

export function ImagePlaceholder({ 
  title, 
  message = 'No Image Available',
  aspectRatio = 'aspect-[2/3]',
  iconSize = 'w-16 h-16',
  className = ''
}: ImagePlaceholderProps) {
  return (
    <div className={`w-full flex flex-col items-center justify-center bg-bg-secondary border border-bg-secondary/20 ${aspectRatio} ${className}`}>
      <FilmIcon className={`${iconSize} text-text-secondary/50 mb-4`} />
      <div className="text-text-secondary text-sm text-center px-4">
        <p className="font-medium mb-1">{message}</p>
        <p className="text-text-secondary/70">{title}</p>
      </div>
    </div>
  );
} 