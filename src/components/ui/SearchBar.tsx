'use client';

import { useState, useRef, useEffect, useCallback, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

export interface SearchBarResult {
  id: string;
  title: string;
  description?: string;
  icon?: ReactNode;
  href?: string;
}

export interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (query: string) => void;
  onSubmit?: (query: string) => void;
  onResultClick?: (result: SearchBarResult) => void;
  results?: SearchBarResult[];
  loading?: boolean;
  debounceMs?: number;
  className?: string;
}

/**
 * Large glass-style search bar with dropdown results, debounced input,
 * and a "Press Enter to search" hint.
 */
export function SearchBar({
  placeholder = 'Search vehicles, faults, warning lights…',
  value: controlledValue,
  onChange,
  onSubmit,
  onResultClick,
  results = [],
  loading = false,
  debounceMs = 300,
  className,
}: SearchBarProps) {
  const [internalValue, setInternalValue] = useState(controlledValue ?? '');
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const query = controlledValue ?? internalValue;

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleChange = useCallback(
    (val: string) => {
      setInternalValue(val);
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        onChange?.(val);
      }, debounceMs);
      if (val.length > 0) setOpen(true);
      else setOpen(false);
    },
    [onChange, debounceMs],
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSubmit?.(query);
      setOpen(false);
    }
    if (e.key === 'Escape') setOpen(false);
  };

  const showDropdown = open && (results.length > 0 || loading);

  return (
    <div ref={wrapperRef} className={cn('relative w-full max-w-2xl', className)}>
      {/* Input */}
      <div className="glass-input flex items-center gap-3 rounded-2xl px-5 py-3.5 transition-all focus-within:border-secondary focus-within:ring-2 focus-within:ring-secondary/20">
        {/* Magnifying glass */}
        <svg
          className="h-5 w-5 shrink-0 text-text-muted dark:text-text-dark-muted"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>

        <input
          type="text"
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={() => {
            if (query.length > 0) setOpen(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm font-medium text-text-primary outline-none placeholder:text-text-muted dark:text-text-dark-primary dark:placeholder:text-text-dark-muted"
        />

        {/* Loading spinner */}
        {loading && (
          <svg className="h-5 w-5 shrink-0 animate-spin text-secondary" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
        )}

        {/* Clear */}
        {query.length > 0 && !loading && (
          <button
            type="button"
            onClick={() => {
              handleChange('');
              setOpen(false);
            }}
            className="shrink-0 text-text-muted hover:text-text-primary dark:text-text-dark-muted dark:hover:text-text-dark-primary"
          >
            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </button>
        )}
      </div>

      {/* Hint */}
      {query.length > 0 && (
        <p className="mt-1.5 text-right text-[11px] text-text-muted dark:text-text-dark-muted">
          Press <kbd className="rounded bg-gray-200 px-1 py-0.5 font-mono text-[10px] dark:bg-slate-700">Enter</kbd> to search
        </p>
      )}

      {/* Dropdown */}
      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-white/20 bg-white/90 shadow-xl backdrop-blur-xl dark:border-white/[0.08] dark:bg-slate-900/90"
          >
            {loading && results.length === 0 && (
              <div className="flex items-center gap-3 px-5 py-4 text-sm text-text-muted dark:text-text-dark-muted">
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
                Searching…
              </div>
            )}

            {results.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => {
                  onResultClick?.(r);
                  setOpen(false);
                }}
                className="flex w-full items-center gap-3 px-5 py-3 text-left transition-colors hover:bg-secondary/5 dark:hover:bg-secondary/10"
              >
                {r.icon && (
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary/10 text-secondary dark:bg-secondary/20">
                    {r.icon}
                  </span>
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-text-primary dark:text-text-dark-primary">
                    {r.title}
                  </p>
                  {r.description && (
                    <p className="truncate text-xs text-text-muted dark:text-text-dark-muted">
                      {r.description}
                    </p>
                  )}
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
