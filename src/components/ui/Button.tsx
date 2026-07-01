'use client';

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { motion, type HTMLMotionProps } from 'motion/react';
import { cn } from '@/lib/utils';

const variantStyles = {
  primary:
    'bg-gradient-to-r from-secondary to-accent text-white shadow-md hover:shadow-glow-blue dark:hover:shadow-glow-blue',
  secondary:
    'border-2 border-secondary text-secondary hover:bg-secondary hover:text-white dark:border-secondary-light dark:text-secondary-light dark:hover:bg-secondary-light dark:hover:text-white',
  ghost:
    'text-text-secondary hover:bg-gray-100 dark:text-text-dark-secondary dark:hover:bg-slate-800',
  danger:
    'bg-danger text-white shadow-md hover:bg-danger-light hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]',
  accent:
    'bg-gradient-to-r from-accent to-accent-light text-white shadow-md hover:shadow-glow-cyan',
} as const;

const sizeStyles = {
  sm: 'px-3.5 py-1.5 text-sm gap-1.5',
  md: 'px-5 py-2.5 text-sm gap-2',
  lg: 'px-7 py-3.5 text-base gap-2.5',
} as const;

export type ButtonVariant = keyof typeof variantStyles;
export type ButtonSize = keyof typeof sizeStyles;

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  rounded?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  children: ReactNode;
}

/**
 * Premium animated button with multiple variants, sizes, and states.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      rounded = false,
      disabled,
      iconLeft,
      iconRight,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;

    return (
      <motion.button
        ref={ref}
        whileHover={isDisabled ? undefined : { scale: 1.03 }}
        whileTap={isDisabled ? undefined : { scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        disabled={isDisabled}
        className={cn(
          'relative inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-surface-dark',
          rounded ? 'rounded-full' : 'rounded-xl',
          variantStyles[variant],
          sizeStyles[size],
          isDisabled && 'pointer-events-none opacity-50',
          className,
        )}
        {...(props as HTMLMotionProps<'button'>)}
      >
        {/* Loading spinner */}
        {loading && (
          <svg
            className="h-4 w-4 animate-spin"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
        )}

        {!loading && iconLeft && (
          <span className="flex shrink-0 items-center">{iconLeft}</span>
        )}

        <span>{children}</span>

        {!loading && iconRight && (
          <span className="flex shrink-0 items-center">{iconRight}</span>
        )}
      </motion.button>
    );
  },
);

Button.displayName = 'Button';
