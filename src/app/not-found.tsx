'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-surface dark:bg-primary flex flex-col items-center justify-center relative overflow-hidden px-6">
      {/* Background glowing effects */}
      <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-accent/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] bg-secondary/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, type: 'spring' }}
        className="glass-card relative z-10 p-10 md:p-16 max-w-2xl w-full text-center rounded-3xl border border-white/20 dark:border-white/10 shadow-2xl"
      >
        <motion.div
          initial={{ rotate: -10 }}
          animate={{ rotate: 10 }}
          transition={{ repeat: Infinity, duration: 4, repeatType: 'mirror', ease: 'easeInOut' }}
          className="text-8xl md:text-9xl mb-6 inline-block drop-shadow-2xl"
        >
          🚧
        </motion.div>
        
        <h1 className="text-4xl md:text-6xl font-black font-heading mb-4 text-transparent bg-clip-text bg-gradient-to-br from-text-primary to-text-muted dark:from-white dark:to-white/50 tracking-tight">
          404 <br /> Dead End
        </h1>
        
        <p className="text-lg md:text-xl text-text-secondary dark:text-text-dark-secondary mb-10 leading-relaxed max-w-md mx-auto">
          It looks like you took a wrong turn! The vehicle, fault, or page you are looking for has been towed away or doesn't exist.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/">
            <Button size="lg" className="w-full sm:w-auto text-base px-8 py-6 rounded-2xl shadow-glow-blue">
              🏠 Return to Garage
            </Button>
          </Link>
          <Link href="/search">
            <Button size="lg" variant="secondary" className="w-full sm:w-auto text-base px-8 py-6 rounded-2xl">
              🔍 Search Database
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-accent/40"
          initial={{ 
            x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : 0, 
            y: typeof window !== 'undefined' ? Math.random() * window.innerHeight : 0 
          }}
          animate={{ 
            y: [null, typeof window !== 'undefined' ? Math.random() * -500 : -100],
            opacity: [0, 1, 0]
          }}
          transition={{ 
            duration: 5 + Math.random() * 5, 
            repeat: Infinity, 
            ease: 'linear',
            delay: Math.random() * 5
          }}
        />
      ))}
    </div>
  );
}
