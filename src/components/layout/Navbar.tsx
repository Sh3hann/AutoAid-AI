'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/common/ThemeToggle';

/* -------------------------------------------------- */
/*  Nav data                                          */
/* -------------------------------------------------- */

interface NavLink {
  label: string;
  href: string;
  emergency?: boolean;
}

const navLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Vehicles', href: '/vehicles' },
  { label: 'Diagnose', href: '/diagnose' },
  { label: 'Warning Lights', href: '/warning-lights' },
  { label: 'Assistance', href: '/assistance' },
  { label: 'Emergency', href: '/emergency', emergency: true },
];

/* -------------------------------------------------- */
/*  Sidebar overlay variants                          */
/* -------------------------------------------------- */

const sidebarVariants = {
  closed: { x: '100%' },
  open: { x: 0 },
};

const overlayVariants = {
  closed: { opacity: 0 },
  open: { opacity: 1 },
};

/* -------------------------------------------------- */
/*  Component                                         */
/* -------------------------------------------------- */

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        'glass-nav sticky top-0 z-50 w-full transition-shadow duration-300',
        scrolled && 'shadow-lg shadow-black/[0.04] dark:shadow-black/20',
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* -------- Logo -------- */}
        <Link href="/" className="flex items-center gap-2.5">
          {/* Car + Wrench inline SVG */}
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-secondary to-accent shadow-md">
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Car body */}
              <path d="M5 17h14M5 17a2 2 0 01-2-2v-3a1 1 0 011-1h1l2-4h10l2 4h1a1 1 0 011 1v3a2 2 0 01-2 2" />
              {/* Wheels */}
              <circle cx="7.5" cy="17" r="1.5" />
              <circle cx="16.5" cy="17" r="1.5" />
              {/* Wrench accent */}
              <path d="M14.5 6.5l2-2m0 0l1.5.3.3 1.5-1.8 1.8" />
            </svg>
          </span>

          <span className="font-heading text-xl font-extrabold tracking-tight text-text-primary dark:text-text-dark-primary">
            Auto<span className="gradient-text">Aid</span>{' '}
            <span className="text-sm font-bold text-accent">AI</span>
          </span>
        </Link>

        {/* -------- Desktop nav links -------- */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) =>
            link.emergency ? (
              <Link
                key={link.href}
                href={link.href}
                className="emergency-pulse ml-2 flex items-center gap-1.5 rounded-full bg-danger px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-danger-light"
              >
                {/* SOS icon */}
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
                SOS
              </Link>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3.5 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-gray-100 hover:text-text-primary dark:text-text-dark-secondary dark:hover:bg-slate-800 dark:hover:text-text-dark-primary"
              >
                {link.label}
              </Link>
            ),
          )}
        </nav>

        {/* -------- Right side actions -------- */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          {/* Emergency SOS — visible on smaller screens too */}
          <Link
            href="/emergency"
            className="emergency-pulse flex h-10 items-center gap-1.5 rounded-full bg-danger px-3.5 text-sm font-bold text-white transition-colors hover:bg-danger-light lg:hidden"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
            </svg>
            SOS
          </Link>

          {/* Hamburger */}
          <motion.button
            type="button"
            onClick={() => setMobileOpen(true)}
            whileTap={{ scale: 0.9 }}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-text-primary transition-colors hover:bg-gray-100 dark:text-text-dark-primary dark:hover:bg-slate-800 lg:hidden"
            aria-label="Open menu"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </motion.button>
        </div>
      </div>

      {/* -------- Mobile sidebar -------- */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="nav-overlay"
              variants={overlayVariants}
              initial="closed"
              animate="open"
              exit="closed"
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Panel */}
            <motion.div
              key="nav-panel"
              variants={sidebarVariants}
              initial="closed"
              animate="open"
              exit="closed"
              transition={{ type: 'spring', stiffness: 350, damping: 35 }}
              className="fixed right-0 top-0 z-50 flex h-full w-72 flex-col bg-white/95 backdrop-blur-xl dark:bg-slate-900/95 lg:hidden"
            >
              {/* Close */}
              <div className="flex items-center justify-between border-b border-gray-200/50 px-5 py-4 dark:border-white/[0.06]">
                <span className="font-heading text-lg font-bold text-text-primary dark:text-text-dark-primary">
                  Menu
                </span>
                <motion.button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  whileTap={{ scale: 0.9 }}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-text-muted hover:bg-gray-100 dark:text-text-dark-muted dark:hover:bg-slate-800"
                  aria-label="Close menu"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>

              {/* Links */}
              <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-4">
                {navLinks.map((link, i) =>
                  link.emergency ? (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * i }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="emergency-pulse mt-2 flex items-center gap-2 rounded-xl bg-danger px-4 py-3 text-sm font-bold text-white"
                      >
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                        </svg>
                        Emergency SOS
                      </Link>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * i }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center rounded-xl px-4 py-3 text-sm font-medium text-text-secondary transition-colors hover:bg-gray-100 hover:text-text-primary dark:text-text-dark-secondary dark:hover:bg-slate-800 dark:hover:text-text-dark-primary"
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ),
                )}
              </nav>

              {/* Bottom brand */}
              <div className="border-t border-gray-200/50 p-5 dark:border-white/[0.06]">
                <p className="text-xs text-text-muted dark:text-text-dark-muted">
                  © 2024 AutoAid AI
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
