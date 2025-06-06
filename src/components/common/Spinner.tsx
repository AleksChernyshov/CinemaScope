interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
}

const SIZES = {
  sm: 'w-8 h-8 border-2',
  md: 'w-12 h-12 border-3',
  lg: 'w-16 h-16 border-4'
};

export function Spinner({ size = 'md' }: SpinnerProps) {
  return (
    <div className="flex justify-center items-center p-4">
      <div 
        className={`
          ${SIZES[size]}
          rounded-full
          border-purple-500/20
          border-t-purple-500
          animate-spin
        `}
      />
    </div>
  );
} 