'use client';

import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

const sizeMap = {
  sm: { wrapper: 'h-6 w-6', border: 'border-2' },
  md: { wrapper: 'h-10 w-10', border: 'border-[3px]' },
  lg: { wrapper: 'h-16 w-16', border: 'border-4' },
} as const;

export interface LoadingSpinnerProps {
  size?: keyof typeof sizeMap;
  text?: string;
  className?: string;
}

/**
 * Branded loading spinner using accent/secondary gradient colours
 * with an optional label below.
 */
export function LoadingSpinner({
  size = 'md',
  text,
  className,
}: LoadingSpinnerProps) {
  const s = sizeMap[size];

  return (
    <div className={cn('flex flex-col items-center gap-3', className)}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
        className={cn(
          'rounded-full',
          s.wrapper,
          s.border,
          'border-secondary/20 border-t-secondary dark:border-accent/20 dark:border-t-accent',
        )}
      />
      {text && (
        <p className="text-sm font-medium text-text-muted dark:text-text-dark-muted">
          {text}
        </p>
      )}
    </div>
  );
}
