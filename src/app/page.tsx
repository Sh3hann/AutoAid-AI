'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'motion/react';

/* ── Vehicle category quick cards ── */
const categories = [
  { name: 'Cars', icon: '🚗', count: 30, href: '/vehicles?type=Sedan', color: 'from-blue-500 to-blue-700' },
  { name: 'SUVs', icon: '🚙', count: 12, href: '/vehicles?type=SUV', color: 'from-emerald-500 to-emerald-700' },
  { name: 'Electric', icon: '⚡', count: 8, href: '/vehicles?fuel=Electric', color: 'from-cyan-500 to-cyan-700' },
  { name: 'Hybrid', icon: '🔋', count: 4, href: '/vehicles?fuel=Hybrid', color: 'from-green-500 to-green-700' },
  { name: 'Trucks', icon: '🛻', count: 4, href: '/vehicles?type=Pickup', color: 'from-amber-500 to-amber-700' },
  { name: 'Bikes', icon: '🏍️', count: 8, href: '/vehicles?type=Motorcycle', color: 'from-red-500 to-red-700' },
  { name: 'Scooters', icon: '🛵', count: 3, href: '/vehicles?type=Scooter', color: 'from-purple-500 to-purple-700' },
  { name: 'Luxury', icon: '✨', count: 4, href: '/vehicles?type=Sports+Car', color: 'from-yellow-500 to-yellow-700' },
];

const features = [
  {
    title: 'AI Diagnosis',
    description: 'Describe your symptoms and our AI instantly identifies potential problems with confidence scores.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
      </svg>
    ),
    href: '/diagnose',
    color: 'text-secondary',
  },
  {
    title: 'Repair Guides',
    description: 'Step-by-step repair guides with difficulty ratings, tools needed, and safety warnings.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.22-3.06a1.5 1.5 0 010-2.58l5.22-3.06a1.5 1.5 0 011.58 0l5.22 3.06a1.5 1.5 0 010 2.58l-5.22 3.06a1.5 1.5 0 01-1.58 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 22.5V12" />
      </svg>
    ),
    href: '/faults',
    color: 'text-accent',
  },
  {
    title: 'Roadside Help',
    description: 'Find nearby mechanics, towing services, EV charging stations, and emergency help instantly.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
    href: '/assistance',
    color: 'text-success',
  },
  {
    title: 'Warning Lights',
    description: 'Identify dashboard warning lights instantly with our visual detector and get immediate guidance.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
    ),
    href: '/warning-lights',
    color: 'text-warning',
  },
];

const steps = [
  { num: '01', title: 'Select Vehicle', desc: 'Choose your vehicle brand, model, and year' },
  { num: '02', title: 'Describe Issue', desc: 'Tell us what\'s happening — type, speak, or upload' },
  { num: '03', title: 'Get Diagnosis', desc: 'AI analyzes symptoms and identifies possible faults' },
  { num: '04', title: 'Fix or Find Help', desc: 'Follow repair guides or find nearby assistance' },
];

const stats = [
  { value: 50, suffix: '+', label: 'Vehicle Brands' },
  { value: 500, suffix: '+', label: 'Vehicle Models' },
  { value: 1000, suffix: '+', label: 'Repair Guides' },
  { value: 24, suffix: '/7', label: 'AI Assistance' },
];

/* ── Animated Counter ── */
function Counter({ value, suffix = '', label }: { value: number; suffix?: string; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-bold font-heading gradient-text">
        {count}{suffix}
      </div>
      <div className="text-sm md:text-base text-text-secondary dark:text-text-dark-secondary mt-2">{label}</div>
    </div>
  );
}

/* ── Floating particles for hero background ── */
function Particles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-secondary/10 dark:bg-accent/10"
          style={{
            width: Math.random() * 6 + 2,
            height: Math.random() * 6 + 2,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

/* ── Main Home Page ── */
export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="overflow-hidden">
      {/* ══════════════ HERO SECTION ══════════════ */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-primary via-primary-light to-primary dark:from-primary-dark dark:via-primary dark:to-primary-light overflow-hidden">
        <Particles />

        {/* Gradient Orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-secondary/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/20 rounded-full blur-[128px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            AI-Powered Vehicle Diagnostics
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-heading text-white leading-tight mb-6"
          >
            Your AI-Powered
            <br />
            <span className="bg-gradient-to-r from-accent-light to-secondary-light bg-clip-text text-transparent">
              Roadside Companion
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10"
          >
            Diagnose vehicle problems instantly, get step-by-step repair guides,
            and find nearby roadside assistance — all powered by AI.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="max-w-2xl mx-auto mb-8"
          >
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-secondary to-accent rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity" />
              <div className="relative flex items-center bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden">
                <svg className="w-5 h-5 text-white/40 ml-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by brand, model, fault, or OBD code..."
                  className="flex-1 bg-transparent text-white placeholder-white/40 px-4 py-4 md:py-5 outline-none text-base md:text-lg"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && searchQuery.trim()) {
                      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
                    }
                  }}
                />
                <Link
                  href={searchQuery.trim() ? `/search?q=${encodeURIComponent(searchQuery)}` : '/vehicles'}
                  className="m-2 px-6 py-2.5 md:py-3 bg-gradient-to-r from-secondary to-accent text-white font-semibold rounded-xl hover:opacity-90 transition-opacity text-sm md:text-base"
                >
                  Search
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-3 text-sm"
          >
            <Link
              href="/diagnose"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur border border-white/20 text-white rounded-xl transition-all"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
              AI Diagnosis
            </Link>
            <Link
              href="/warning-lights"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur border border-white/20 text-white rounded-xl transition-all"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z" />
              </svg>
              Warning Lights
            </Link>
            <Link
              href="/emergency"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-danger/80 hover:bg-danger backdrop-blur border border-danger text-white rounded-xl transition-all"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
              </svg>
              Emergency SOS
            </Link>
          </motion.div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-white dark:from-primary to-transparent" />
      </section>

      {/* ══════════════ CATEGORY CARDS ══════════════ */}
      <section className="py-20 bg-white dark:bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Browse by <span className="gradient-text">Vehicle Type</span>
            </h2>
            <p className="text-text-secondary dark:text-text-dark-secondary max-w-2xl mx-auto">
              We support every type of road vehicle — from compact cars to heavy trucks and electric motorcycles.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  href={cat.href}
                  className="group flex flex-col items-center gap-3 p-5 rounded-2xl glass-card hover:scale-105 transition-all duration-300"
                >
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform`}>
                    {cat.icon}
                  </div>
                  <span className="font-semibold text-sm">{cat.name}</span>
                  <span className="text-xs text-text-muted dark:text-text-dark-muted">{cat.count}+ models</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ FEATURES ══════════════ */}
      <section className="py-20 bg-surface-secondary dark:bg-surface-dark-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Everything You Need, <span className="gradient-text">In One Place</span>
            </h2>
            <p className="text-text-secondary dark:text-text-dark-secondary max-w-2xl mx-auto">
              From AI-powered diagnosis to roadside assistance, we&apos;ve got you covered at every step.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={feature.href} className="block h-full">
                  <div className="group h-full p-6 rounded-2xl glass-card hover:shadow-glow-blue dark:hover:shadow-glow-cyan transition-all duration-300">
                    <div className={`${feature.color} mb-4 w-14 h-14 rounded-xl bg-gray-100 dark:bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-bold font-heading mb-2">{feature.title}</h3>
                    <p className="text-sm text-text-secondary dark:text-text-dark-secondary leading-relaxed">
                      {feature.description}
                    </p>
                    <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-secondary dark:text-accent group-hover:gap-2 transition-all">
                      Learn more
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ HOW IT WORKS ══════════════ */}
      <section className="py-20 bg-white dark:bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              How <span className="gradient-text">AutoAid AI</span> Works
            </h2>
            <p className="text-text-secondary dark:text-text-dark-secondary max-w-2xl mx-auto">
              Get from problem to solution in minutes, not hours.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Connecting line (desktop only) */}
            <div className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-secondary via-accent to-success" />

            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative text-center"
              >
                <div className="relative z-10 w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center shadow-glow-blue">
                  <span className="text-2xl font-bold text-white font-heading">{step.num}</span>
                </div>
                <h3 className="text-lg font-bold font-heading mb-2">{step.title}</h3>
                <p className="text-sm text-text-secondary dark:text-text-dark-secondary">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ STATS ══════════════ */}
      <section className="py-20 bg-gradient-to-br from-primary via-primary-light to-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyem0wLTR2Mkgy NHYtMmgxMnptLTEyLTZ2MmgtMnYtMmgyem0wLTR2MmgtMnYtMmgyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat) => (
              <Counter key={stat.label} value={stat.value} suffix={stat.suffix} label={stat.label} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ CTA ══════════════ */}
      <section className="py-20 bg-white dark:bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold font-heading mb-6">
              Ready to Diagnose Your
              <br />
              <span className="gradient-text">Vehicle Problem?</span>
            </h2>
            <p className="text-lg text-text-secondary dark:text-text-dark-secondary mb-10 max-w-2xl mx-auto">
              Our AI-powered diagnostic engine is ready to help. No account needed — start instantly.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/diagnose"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-secondary to-accent text-white font-bold rounded-2xl shadow-glow-blue hover:shadow-glow-cyan hover:scale-105 transition-all text-lg"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
                Start AI Diagnosis
              </Link>
              <Link
                href="/vehicles"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-gray-300 dark:border-white/20 text-text-primary dark:text-white font-bold rounded-2xl hover:bg-gray-50 dark:hover:bg-white/5 transition-all text-lg"
              >
                Browse Vehicles
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
