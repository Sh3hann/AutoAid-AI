'use client';

import { useState, type ReactNode } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

export interface TabItem {
  id: string;
  label: string;
  icon?: ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  defaultTab?: string;
  activeTab?: string;
  onChange?: (tabId: string) => void;
  className?: string;
}

/**
 * Horizontal tab navigation with animated sliding active indicator.
 */
export function Tabs({
  tabs,
  defaultTab,
  activeTab: controlledActive,
  onChange,
  className,
}: TabsProps) {
  const [internalActive, setInternalActive] = useState(
    defaultTab ?? tabs[0]?.id ?? '',
  );

  const activeId = controlledActive ?? internalActive;

  const handleSelect = (id: string) => {
    setInternalActive(id);
    onChange?.(id);
  };

  return (
    <div
      className={cn(
        'inline-flex gap-1 rounded-xl bg-gray-100/80 p-1 backdrop-blur dark:bg-slate-800/60',
        className,
      )}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeId;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => handleSelect(tab.id)}
            className={cn(
              'relative flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors',
              isActive
                ? 'text-secondary dark:text-secondary-light'
                : 'text-text-secondary hover:text-text-primary dark:text-text-dark-muted dark:hover:text-text-dark-primary',
            )}
          >
            {/* Animated pill indicator */}
            {isActive && (
              <motion.span
                layoutId="tab-indicator"
                className="absolute inset-0 rounded-lg bg-white shadow-sm dark:bg-slate-700"
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              />
            )}

            <span className="relative z-10 flex items-center gap-2">
              {tab.icon && <span className="flex items-center">{tab.icon}</span>}
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
