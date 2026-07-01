import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function combining clsx and tailwind-merge
 * for conditional and conflict-free className merging
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format currency with locale-appropriate formatting
 */
export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format a number with commas
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num);
}

/**
 * Slugify a string for URL-safe usage
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Truncate text to a max length with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

/**
 * Get difficulty color class based on level
 */
export function getDifficultyColor(level: string): string {
  switch (level.toLowerCase()) {
    case 'easy': return 'text-success bg-success/10 border-success/20';
    case 'medium': return 'text-warning bg-warning/10 border-warning/20';
    case 'hard': return 'text-danger bg-danger/10 border-danger/20';
    case 'expert': return 'text-danger-light bg-danger/20 border-danger/30';
    default: return 'text-text-secondary bg-gray-100 border-gray-200';
  }
}

/**
 * Get urgency color class based on level
 */
export function getUrgencyColor(level: string): string {
  switch (level.toLowerCase()) {
    case 'low': return 'text-success bg-success/10';
    case 'medium': return 'text-warning bg-warning/10';
    case 'high': return 'text-danger bg-danger/10';
    case 'critical': return 'text-white bg-danger';
    default: return 'text-text-secondary bg-gray-100';
  }
}

/**
 * Debounce helper
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
