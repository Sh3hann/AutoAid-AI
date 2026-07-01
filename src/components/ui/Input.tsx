'use client';

import {
  forwardRef,
  useState,
  type InputHTMLAttributes,
  type TextareaHTMLAttributes,
  type ReactNode,
} from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

/* -------------------------------------------------- */
/*  Shared props                                      */
/* -------------------------------------------------- */

interface SharedProps {
  label?: string;
  error?: string;
  icon?: ReactNode;
  /** If true, the label floats above the input when focused / filled. */
  floatingLabel?: boolean;
  wrapperClassName?: string;
}

/* -------------------------------------------------- */
/*  Input                                             */
/* -------------------------------------------------- */

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    SharedProps {
  as?: 'input';
}

/* -------------------------------------------------- */
/*  Textarea                                          */
/* -------------------------------------------------- */

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement>,
    SharedProps {
  as: 'textarea';
}

export type FieldProps = InputProps | TextareaProps;

const baseFieldClasses = cn(
  'w-full glass-input px-4 py-3 text-sm font-medium outline-none',
  'text-text-primary dark:text-text-dark-primary',
  'placeholder:text-text-muted dark:placeholder:text-text-dark-muted',
  'focus:border-secondary focus:ring-2 focus:ring-secondary/20',
  'disabled:cursor-not-allowed disabled:opacity-50',
  'transition-all duration-200',
);

/**
 * Premium glass-style input / textarea with optional floating label,
 * left icon, and error messaging.
 */
export const Input = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  FieldProps
>((props, ref) => {
  const {
    as = 'input',
    label,
    error,
    icon,
    floatingLabel = false,
    wrapperClassName,
    className,
    ...rest
  } = props;

  const [focused, setFocused] = useState(false);
  const hasValue =
    rest.value !== undefined && rest.value !== '' && rest.value !== null;

  const showFloating = floatingLabel && (focused || hasValue);

  return (
    <div className={cn('relative w-full', wrapperClassName)}>
      {/* Static label */}
      {label && !floatingLabel && (
        <label className="mb-1.5 block text-sm font-semibold text-text-primary dark:text-text-dark-primary">
          {label}
        </label>
      )}

      <div className="relative">
        {/* Icon */}
        {icon && (
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted dark:text-text-dark-muted">
            {icon}
          </span>
        )}

        {/* Floating label */}
        {label && floatingLabel && (
          <motion.label
            initial={false}
            animate={{
              y: showFloating ? -26 : 0,
              x: showFloating ? (icon ? -28 : 0) : 0,
              scale: showFloating ? 0.85 : 1,
              color: showFloating
                ? focused
                  ? '#2563EB'
                  : '#94A3B8'
                : '#94A3B8',
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className={cn(
              'pointer-events-none absolute top-3 origin-left text-sm font-medium',
              icon ? 'left-10' : 'left-4',
            )}
          >
            {label}
          </motion.label>
        )}

        {as === 'textarea' ? (
          <textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            onFocus={(e) => {
              setFocused(true);
              (rest as TextareaHTMLAttributes<HTMLTextAreaElement>).onFocus?.(e);
            }}
            onBlur={(e) => {
              setFocused(false);
              (rest as TextareaHTMLAttributes<HTMLTextAreaElement>).onBlur?.(e);
            }}
            className={cn(
              baseFieldClasses,
              'min-h-[120px] resize-y rounded-xl',
              icon && 'pl-10',
              error && 'border-danger focus:border-danger focus:ring-danger/20',
              className,
            )}
            {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            ref={ref as React.Ref<HTMLInputElement>}
            onFocus={(e) => {
              setFocused(true);
              (rest as InputHTMLAttributes<HTMLInputElement>).onFocus?.(e);
            }}
            onBlur={(e) => {
              setFocused(false);
              (rest as InputHTMLAttributes<HTMLInputElement>).onBlur?.(e);
            }}
            className={cn(
              baseFieldClasses,
              'h-12 rounded-xl',
              icon && 'pl-10',
              error && 'border-danger focus:border-danger focus:ring-danger/20',
              className,
            )}
            {...(rest as InputHTMLAttributes<HTMLInputElement>)}
          />
        )}
      </div>

      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="mt-1.5 flex items-center gap-1 text-xs font-medium text-danger"
          >
            <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
});

Input.displayName = 'Input';
