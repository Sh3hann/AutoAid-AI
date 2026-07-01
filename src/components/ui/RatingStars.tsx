'use client';

import { cn } from '@/lib/utils';

const sizeStyles = {
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
} as const;

export interface RatingStarsProps {
  rating: number; // 0–5
  size?: keyof typeof sizeStyles;
  className?: string;
}

function Star({
  fill,
  size,
}: {
  fill: 'full' | 'half' | 'empty';
  size: keyof typeof sizeStyles;
}) {
  const id = `half-${Math.random().toString(36).slice(2, 8)}`;

  return (
    <svg
      viewBox="0 0 24 24"
      className={cn(sizeStyles[size], 'shrink-0')}
    >
      {fill === 'half' && (
        <defs>
          <linearGradient id={id}>
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="50%" stopColor="transparent" />
          </linearGradient>
        </defs>
      )}
      <path
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        fill={
          fill === 'full'
            ? '#F59E0B'
            : fill === 'half'
              ? `url(#${id})`
              : 'none'
        }
        stroke="#F59E0B"
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Star rating display with half-star precision.
 */
export function RatingStars({
  rating,
  size = 'md',
  className,
}: RatingStarsProps) {
  const clamped = Math.min(5, Math.max(0, rating));

  const stars = Array.from({ length: 5 }, (_, i) => {
    const starIndex = i + 1;
    if (clamped >= starIndex) return 'full' as const;
    if (clamped >= starIndex - 0.5) return 'half' as const;
    return 'empty' as const;
  });

  return (
    <div className={cn('inline-flex items-center gap-0.5', className)}>
      {stars.map((fill, i) => (
        <Star key={i} fill={fill} size={size} />
      ))}
    </div>
  );
}
