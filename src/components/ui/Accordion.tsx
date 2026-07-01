'use client';

import { useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

export interface AccordionItem {
  id: string;
  title: string;
  content: ReactNode;
  icon?: ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  defaultOpenId?: string;
  className?: string;
}

/**
 * Accordion with smooth height animation, chevron rotation,
 * and single-open-at-a-time behavior.
 */
export function Accordion({ items, defaultOpenId, className }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId ?? null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className={cn('space-y-3', className)}>
      {items.map((item) => {
        const isOpen = openId === item.id;

        return (
          <div
            key={item.id}
            className={cn(
              'overflow-hidden rounded-2xl border transition-colors duration-200',
              isOpen
                ? 'border-secondary/30 bg-secondary/[0.03] dark:border-secondary/20 dark:bg-secondary/[0.06]'
                : 'border-gray-200/60 bg-white/60 backdrop-blur dark:border-white/[0.06] dark:bg-slate-800/40',
            )}
          >
            {/* Header */}
            <button
              type="button"
              onClick={() => toggle(item.id)}
              className="flex w-full items-center gap-3 px-5 py-4 text-left"
            >
              {item.icon && (
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary/10 text-secondary dark:bg-secondary/20">
                  {item.icon}
                </span>
              )}

              <span className="flex-1 text-sm font-semibold text-text-primary dark:text-text-dark-primary">
                {item.title}
              </span>

              {/* Chevron */}
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.25 }}
                className="text-text-muted dark:text-text-dark-muted"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </motion.span>
            </button>

            {/* Content */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 text-sm leading-relaxed text-text-secondary dark:text-text-dark-secondary">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
