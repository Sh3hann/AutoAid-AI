'use client';

import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

export interface ProgressBarProps {
  value: number; // 0–100
  label?: string;
  showPercentage?: boolean;
  className?: string;
}

function getBarColor(value: number) {
  if (value > 70) return 'from-success to-success-light';
  if (value > 40) return 'from-warning to-warning-light';
  return 'from-danger to-danger-light';
}

function getTextColor(value: number) {
  if (value > 70) return 'text-success';
  if (value > 40) return 'text-warning';
  return 'text-danger';
}

/**
 * Animated progress bar with automatic colour grading
 * (green > 70 %, yellow > 40 %, red ≤ 40 %).
 */
export function ProgressBar({
  value,
  label,
  showPercentage = true,
  className,
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div className={cn('w-full', className)}>
      {/* Label / percentage row */}
      {(label || showPercentage) && (
        <div className="mb-1.5 flex items-center justify-between">
          {label && (
            <span className="text-sm font-medium text-text-primary dark:text-text-dark-primary">
              {label}
            </span>
          )}
          {showPercentage && (
            <span
              className={cn(
                'text-sm font-bold tabular-nums',
                getTextColor(clamped),
              )}
            >
              {clamped}%
            </span>
          )}
        </div>
      )}

      {/* Track */}
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-200/60 dark:bg-slate-700/60">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${clamped}%` }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          className={cn(
            'h-full rounded-full bg-gradient-to-r',
            getBarColor(clamped),
          )}
        />
      </div>
    </div>
  );
}
