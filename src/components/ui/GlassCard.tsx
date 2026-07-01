'use client';

import { type ReactNode } from 'react';
import { motion, type HTMLMotionProps } from 'motion/react';
import { cn } from '@/lib/utils';

const paddingStyles = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
} as const;

export type GlassCardVariant = 'default' | 'hover-lift' | 'gradient-border';
export type GlassCardPadding = keyof typeof paddingStyles;

export interface GlassCardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  variant?: GlassCardVariant;
  padding?: GlassCardPadding;
  glow?: boolean;
  children: ReactNode;
}

/**
 * Premium glassmorphism card with backdrop-blur, optional hover-lift,
 * gradient border, and glow effects.
 */
export function GlassCard({
  variant = 'default',
  padding = 'md',
  glow = false,
  className,
  children,
  ...props
}: GlassCardProps) {
  return (
    <motion.div
      whileHover={
        variant === 'hover-lift'
          ? { y: -6, transition: { type: 'spring', stiffness: 300, damping: 20 } }
          : undefined
      }
      className={cn(
        // Base glass styles
        'rounded-2xl backdrop-blur-xl',
        'bg-white/70 border border-white/30 shadow-glass',
        'dark:bg-slate-800/60 dark:border-white/[0.08] dark:shadow-glass-dark',
        'transition-shadow duration-300',

        // Variant: gradient-border
        variant === 'gradient-border' && 'gradient-border border-0',

        // Hover-lift shadow upgrade
        variant === 'hover-lift' &&
          'hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)]',

        // Glow on hover
        glow &&
          'hover:shadow-glow-blue dark:hover:shadow-glow-cyan',

        paddingStyles[padding],
        className,
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
