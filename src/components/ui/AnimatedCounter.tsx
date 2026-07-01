'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, motion, useMotionValue, useTransform, animate } from 'motion/react';
import { cn } from '@/lib/utils';

export interface AnimatedCounterProps {
  value: number;
  /** Duration of the animation in seconds */
  duration?: number;
  prefix?: string;
  suffix?: string;
  /** Decimal places to show */
  decimals?: number;
  className?: string;
}

/**
 * Animates a numeric value from 0 to `value` when the element enters
 * the viewport. Supports prefix, suffix, and custom decimal places.
 */
export function AnimatedCounter({
  value,
  duration = 2,
  prefix = '',
  suffix = '',
  decimals = 0,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const motionVal = useMotionValue(0);
  const rounded = useTransform(motionVal, (v) =>
    v.toFixed(decimals),
  );
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(motionVal, value, {
      duration,
      ease: [0.25, 0.1, 0.25, 1],
    });

    const unsubscribe = rounded.on('change', (v) => setDisplay(v));

    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [isInView, value, duration, motionVal, rounded]);

  return (
    <motion.span
      ref={ref}
      className={cn(
        'tabular-nums font-heading font-bold text-text-primary dark:text-text-dark-primary',
        className,
      )}
    >
      {prefix}
      {display}
      {suffix}
    </motion.span>
  );
}
