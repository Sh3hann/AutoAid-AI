'use client';

import { type ReactNode } from 'react';
import { motion, type Variants } from 'motion/react';
import { cn } from '@/lib/utils';

const animationVariants: Record<string, Variants> = {
  'fade-up': {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  'fade-left': {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  },
  'fade-right': {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  },
};

export type ScrollRevealVariant = keyof typeof animationVariants;

export interface ScrollRevealProps {
  variant?: ScrollRevealVariant;
  /** Delay in seconds */
  delay?: number;
  duration?: number;
  className?: string;
  children: ReactNode;
}

/**
 * Wrapper that animates children into view on scroll using `whileInView`.
 */
export function ScrollReveal({
  variant = 'fade-up',
  delay = 0,
  duration = 0.5,
  className,
  children,
}: ScrollRevealProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={animationVariants[variant]}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
