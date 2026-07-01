'use client';

import { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { vehicles } from '@/data/vehicles';
import type { Vehicle, BodyType, FuelType } from '@/types';

/* ─── Constants ─── */
const BODY_TYPES: BodyType[] = ['Sedan', 'SUV', 'Hatchback', 'Coupe', 'Convertible', 'Wagon', 'Pickup', 'Van', 'Truck', 'Crossover', 'Sports Car', 'Minivan'];
const FUEL_TYPES: FuelType[] = ['Petrol', 'Diesel', 'Hybrid', 'Electric', 'CNG', 'LPG'];
const SORT_OPTIONS = [
  { label: 'Name A-Z', value: 'name-asc' },
  { label: 'Name Z-A', value: 'name-desc' },
  { label: 'Year (Newest)', value: 'year-desc' },
  { label: 'Year (Oldest)', value: 'year-asc' },
  { label: 'Horsepower ↑', value: 'hp-asc' },
  { label: 'Horsepower ↓', value: 'hp-desc' },
] as const;

/* ─── Fuel badge color helper ─── */
function getFuelColor(fuel: string): string {
  switch (fuel) {
    case 'Electric': return 'bg-accent/15 text-accent dark:bg-accent/25';
    case 'Hybrid':   return 'bg-success/15 text-success dark:bg-success/25';
    case 'Diesel':   return 'bg-warning/15 text-warning dark:bg-warning/25';
    default:         return 'bg-secondary/15 text-secondary dark:bg-secondary/25';
  }
}

/* ─── Body-type icon helper ─── */
function getBodyIcon(bt: string): string {
  const map: Record<string, string> = {
    Sedan: '🚗', SUV: '🚙', Hatchback: '🚘', Coupe: '🏎️', Convertible: '🏎️',
    Wagon: '🚗', Pickup: '🛻', Van: '🚐', Truck: '🚚', Crossover: '🚙',
    'Sports Car': '🏎️', Minivan: '🚐', Bus: '🚌', Motorcycle: '🏍️',
  };
  return map[bt] ?? '🚗';
}

/* ═══════════════════════════════════════════
   Vehicle Browser Page
   ═══════════════════════════════════════════ */
export default function VehiclesPage() {
  /* ─── State ─── */
  const [search, setSearch] = useState('');
  const [bodyFilter, setBodyFilter] = useState<string>('All');
  const [fuelFilter, setFuelFilter] = useState<string>('All');
  const [brandFilter, setBrandFilter] = useState<string>('All');
  const [sort, setSort] = useState<string>('name-asc');
  const [view, setView] = useState<'grid' | 'list'>('grid');

  /* ─── Derived data ─── */
  const allBrands = useMemo(() => {
    const set = new Set(vehicles.map((v) => v.brand));
    return Array.from(set).sort();
  }, []);

  const filtered = useMemo(() => {
    let result = [...vehicles];
    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (v) =>
          v.brand.toLowerCase().includes(q) ||
          v.model.toLowerCase().includes(q) ||
          v.bodyType.toLowerCase().includes(q) ||
          v.fuelType.toLowerCase().includes(q),
      );
    }
    // Filters
    if (bodyFilter !== 'All') result = result.filter((v) => v.bodyType === bodyFilter);
    if (fuelFilter !== 'All') result = result.filter((v) => v.fuelType === fuelFilter);
    if (brandFilter !== 'All') result = result.filter((v) => v.brand === brandFilter);

    // Sort
    result.sort((a, b) => {
      switch (sort) {
        case 'name-asc':  return `${a.brand} ${a.model}`.localeCompare(`${b.brand} ${b.model}`);
        case 'name-desc': return `${b.brand} ${b.model}`.localeCompare(`${a.brand} ${a.model}`);
        case 'year-desc': return b.year - a.year;
        case 'year-asc':  return a.year - b.year;
        case 'hp-desc':   return b.performance.horsepower - a.performance.horsepower;
        case 'hp-asc':    return a.performance.horsepower - b.performance.horsepower;
        default:          return 0;
      }
    });
    return result;
  }, [search, bodyFilter, fuelFilter, brandFilter, sort]);

  const resetFilters = useCallback(() => {
    setSearch('');
    setBodyFilter('All');
    setFuelFilter('All');
    setBrandFilter('All');
  }, []);

  /* ─── Render ─── */
  return (
    <section className="min-h-screen">
      {/* ── Hero Header ── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-light to-primary dark:from-primary-dark dark:via-primary dark:to-primary-light">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(37,99,235,0.25),transparent)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-4xl font-bold text-white sm:text-5xl"
          >
            Vehicle <span className="gradient-text">Database</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-3 max-w-2xl text-lg text-slate-300"
          >
            Browse our comprehensive database of cars, trucks, SUVs and more. Find detailed specs, common faults, and maintenance guides for every vehicle.
          </motion.p>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* ── Filter Bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="glass-card mb-8 p-4 sm:p-6"
        >
          {/* Top row: search + view toggle + sort */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-lg">
              <svg className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search vehicles..."
                className="glass-input w-full py-2.5 pl-10 pr-4 text-sm outline-none"
              />
            </div>

            <div className="flex items-center gap-3">
              {/* Sort */}
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="glass-input px-3 py-2.5 text-sm outline-none"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>

              {/* View toggle */}
              <div className="flex rounded-xl border border-black/10 dark:border-white/10 overflow-hidden">
                <button
                  onClick={() => setView('grid')}
                  className={cn(
                    'px-3 py-2 transition-colors',
                    view === 'grid'
                      ? 'bg-secondary text-white'
                      : 'bg-transparent text-text-secondary dark:text-text-dark-secondary hover:bg-black/5 dark:hover:bg-white/5',
                  )}
                  aria-label="Grid view"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 16 16"><path d="M1 2.5A1.5 1.5 0 012.5 1h3A1.5 1.5 0 017 2.5v3A1.5 1.5 0 015.5 7h-3A1.5 1.5 0 011 5.5v-3zm8 0A1.5 1.5 0 0110.5 1h3A1.5 1.5 0 0115 2.5v3A1.5 1.5 0 0113.5 7h-3A1.5 1.5 0 019 5.5v-3zm-8 8A1.5 1.5 0 012.5 9h3A1.5 1.5 0 017 10.5v3A1.5 1.5 0 015.5 15h-3A1.5 1.5 0 011 13.5v-3zm8 0A1.5 1.5 0 0110.5 9h3a1.5 1.5 0 011.5 1.5v3a1.5 1.5 0 01-1.5 1.5h-3A1.5 1.5 0 019 13.5v-3z" /></svg>
                </button>
                <button
                  onClick={() => setView('list')}
                  className={cn(
                    'px-3 py-2 transition-colors',
                    view === 'list'
                      ? 'bg-secondary text-white'
                      : 'bg-transparent text-text-secondary dark:text-text-dark-secondary hover:bg-black/5 dark:hover:bg-white/5',
                  )}
                  aria-label="List view"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 16 16"><path fillRule="evenodd" d="M2.5 12a.5.5 0 01.5-.5h10a.5.5 0 010 1H3a.5.5 0 01-.5-.5zm0-4a.5.5 0 01.5-.5h10a.5.5 0 010 1H3a.5.5 0 01-.5-.5zm0-4a.5.5 0 01.5-.5h10a.5.5 0 010 1H3a.5.5 0 01-.5-.5z" /></svg>
                </button>
              </div>
            </div>
          </div>

          {/* Filter row */}
          <div className="mt-4 flex flex-wrap gap-3">
            {/* Brand filter */}
            <select
              value={brandFilter}
              onChange={(e) => setBrandFilter(e.target.value)}
              className="glass-input px-3 py-2 text-sm outline-none"
            >
              <option value="All">All Brands</option>
              {allBrands.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>

            {/* Body type filter */}
            <select
              value={bodyFilter}
              onChange={(e) => setBodyFilter(e.target.value)}
              className="glass-input px-3 py-2 text-sm outline-none"
            >
              <option value="All">All Body Types</option>
              {BODY_TYPES.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>

            {/* Fuel type filter */}
            <select
              value={fuelFilter}
              onChange={(e) => setFuelFilter(e.target.value)}
              className="glass-input px-3 py-2 text-sm outline-none"
            >
              <option value="All">All Fuel Types</option>
              {FUEL_TYPES.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>

            {(search || bodyFilter !== 'All' || fuelFilter !== 'All' || brandFilter !== 'All') && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1 rounded-xl border border-danger/30 px-3 py-2 text-sm text-danger hover:bg-danger/10 transition-colors"
              >
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                Clear filters
              </button>
            )}
          </div>

          {/* Result count */}
          <p className="mt-3 text-sm text-text-muted dark:text-text-dark-muted">
            Showing <span className="font-semibold text-secondary">{filtered.length}</span> of {vehicles.length} vehicles
          </p>
        </motion.div>

        {/* ── Results ── */}
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center justify-center py-24 text-center"
            >
              <span className="text-6xl">🔍</span>
              <h3 className="mt-4 font-heading text-xl font-semibold">No vehicles found</h3>
              <p className="mt-2 text-text-secondary dark:text-text-dark-secondary">
                Try adjusting your search or filters.
              </p>
              <button
                onClick={resetFilters}
                className="mt-6 rounded-xl bg-secondary px-6 py-2.5 text-sm font-medium text-white hover:bg-secondary-dark transition-colors"
              >
                Reset Filters
              </button>
            </motion.div>
          ) : view === 'grid' ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filtered.map((v, i) => (
                <VehicleCard key={v.id} vehicle={v} index={i} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-4"
            >
              {filtered.map((v, i) => (
                <VehicleListItem key={v.id} vehicle={v} index={i} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   Grid Card
   ═══════════════════════════════════════════ */
function VehicleCard({ vehicle: v, index }: { vehicle: Vehicle; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.05, 0.4), duration: 0.4 }}
    >
      <Link href={`/vehicles/${v.slug}`} className="group block">
        <div className="glass-card overflow-hidden p-5 h-full flex flex-col">
          {/* Header & Image */}
          <div className="flex flex-col mb-2">
            {v.imageUrl && (
              <div className="w-full h-40 mb-4 rounded-xl overflow-hidden relative bg-black/5 dark:bg-white/5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={v.imageUrl} alt={`${v.brand} ${v.model}`} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
              </div>
            )}
            <div className="flex items-start justify-between">
              <div>
                <span className="text-2xl hidden">{getBodyIcon(v.bodyType)}</span>
                <h3 className="font-heading text-lg font-semibold group-hover:text-secondary transition-colors">
                  {v.brand} {v.model}
                </h3>
                <p className="text-sm text-text-muted dark:text-text-dark-muted">{v.year}</p>
              </div>
              <svg className="h-5 w-5 mt-1 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* Badges */}
          <div className="mt-3 flex flex-wrap gap-2">
            <span className={cn('rounded-full px-2.5 py-0.5 text-xs font-medium', getFuelColor(v.fuelType))}>
              {v.fuelType}
            </span>
            <span className="rounded-full bg-slate-100 dark:bg-white/10 px-2.5 py-0.5 text-xs font-medium text-text-secondary dark:text-text-dark-secondary">
              {v.bodyType}
            </span>
          </div>

          {/* Specs */}
          <div className="mt-4 grid grid-cols-2 gap-3 border-t border-black/5 dark:border-white/5 pt-4 flex-1">
            <div>
              <p className="text-xs text-text-muted dark:text-text-dark-muted">Horsepower</p>
              <p className="font-heading text-lg font-semibold">{v.performance.horsepower}<span className="text-xs font-normal text-text-muted"> hp</span></p>
            </div>
            <div>
              <p className="text-xs text-text-muted dark:text-text-dark-muted">Torque</p>
              <p className="font-heading text-lg font-semibold">{v.performance.torque}<span className="text-xs font-normal text-text-muted"> Nm</span></p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-4 flex items-center justify-between border-t border-black/5 dark:border-white/5 pt-3">
            <div className="flex items-center gap-1 text-xs text-text-muted dark:text-text-dark-muted">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {v.commonFaults.length} known fault{v.commonFaults.length !== 1 ? 's' : ''}
            </div>
            <span className="text-xs text-text-muted dark:text-text-dark-muted">{v.transmission}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   List Item
   ═══════════════════════════════════════════ */
function VehicleListItem({ vehicle: v, index }: { vehicle: Vehicle; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: Math.min(index * 0.04, 0.3), duration: 0.35 }}
    >
      <Link href={`/vehicles/${v.slug}`} className="group block">
        <div className="glass-card flex flex-col sm:flex-row sm:items-center gap-4 p-4 sm:p-5">
          <span className="text-3xl">{getBodyIcon(v.bodyType)}</span>

          <div className="flex-1 min-w-0">
            <h3 className="font-heading text-base font-semibold group-hover:text-secondary transition-colors truncate">
              {v.brand} {v.model} <span className="text-text-muted font-normal">({v.year})</span>
            </h3>
            <div className="mt-1 flex flex-wrap gap-2">
              <span className={cn('rounded-full px-2.5 py-0.5 text-xs font-medium', getFuelColor(v.fuelType))}>{v.fuelType}</span>
              <span className="rounded-full bg-slate-100 dark:bg-white/10 px-2.5 py-0.5 text-xs font-medium text-text-secondary dark:text-text-dark-secondary">{v.bodyType}</span>
              <span className="rounded-full bg-slate-100 dark:bg-white/10 px-2.5 py-0.5 text-xs font-medium text-text-secondary dark:text-text-dark-secondary">{v.transmission}</span>
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm">
            <div className="text-center">
              <p className="font-heading text-lg font-bold">{v.performance.horsepower}</p>
              <p className="text-xs text-text-muted dark:text-text-dark-muted">hp</p>
            </div>
            <div className="text-center">
              <p className="font-heading text-lg font-bold">{v.performance.torque}</p>
              <p className="text-xs text-text-muted dark:text-text-dark-muted">Nm</p>
            </div>
            <div className="text-center">
              <p className="font-heading text-lg font-bold">{v.commonFaults.length}</p>
              <p className="text-xs text-text-muted dark:text-text-dark-muted">faults</p>
            </div>
          </div>

          <svg className="hidden sm:block h-5 w-5 text-text-muted group-hover:text-secondary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </Link>
    </motion.div>
  );
}
