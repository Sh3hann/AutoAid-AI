'use client';

import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

const variantStyles = {
  default:
    'bg-gray-100 text-gray-700 dark:bg-slate-700 dark:text-slate-200',
  success:
    'bg-success/10 text-success dark:bg-success/20 dark:text-success-light',
  warning:
    'bg-warning/10 text-warning dark:bg-warning/20 dark:text-warning-light',
  danger:
    'bg-danger/10 text-danger dark:bg-danger/20 dark:text-danger-light',
  info:
    'bg-secondary/10 text-secondary dark:bg-secondary/20 dark:text-secondary-light',
  accent:
    'bg-accent/10 text-accent dark:bg-accent/20 dark:text-accent-light',
} as const;

const dotColors = {
  default: 'bg-gray-500 dark:bg-slate-400',
  success: 'bg-success',
  warning: 'bg-warning',
  danger: 'bg-danger',
  info: 'bg-secondary',
  accent: 'bg-accent',
} as const;

const sizeStyles = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-xs',
} as const;

export type BadgeVariant = keyof typeof variantStyles;
export type BadgeSize = keyof typeof sizeStyles;

export interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  pulse?: boolean;
  className?: string;
  children: ReactNode;
}

/**
 * Compact status badge with optional dot indicator and pulse animation.
 */
export function Badge({
  variant = 'default',
  size = 'md',
  dot = false,
  pulse = false,
  className,
  children,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full font-semibold tracking-wide',
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
    >
      {dot && (
        <span className="relative flex h-2 w-2">
          {pulse && (
            <span
              className={cn(
                'absolute inline-flex h-full w-full animate-ping rounded-full opacity-75',
                dotColors[variant],
              )}
            />
          )}
          <span
            className={cn(
              'relative inline-flex h-2 w-2 rounded-full',
              dotColors[variant],
            )}
          />
        </span>
      )}
      {children}
    </span>
  );
}
