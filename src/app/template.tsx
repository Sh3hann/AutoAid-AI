'use client';

import { motion } from 'motion/react';

/**
 * Template component for page transitions.
 * Unlike layout.tsx, this re-renders on every navigation,
 * enabling smooth page transition animations.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}
