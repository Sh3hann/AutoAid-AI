'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { faults } from '@/data/faults';
import { getDifficultyColor } from '@/lib/utils';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import type { FaultCategory } from '@/types';

const categories: (FaultCategory | 'All')[] = [
  'All',
  'Engine',
  'Electrical',
  'Brakes',
  'Transmission',
  'Cooling',
  'Tyres',
  'EV/Hybrid'
];

export default function FaultsPage() {
  const [selectedCategory, setSelectedCategory] = useState<FaultCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaults = useMemo(() => {
    return faults.filter(fault => {
      const matchesCategory = selectedCategory === 'All' || fault.category === selectedCategory;
      const matchesSearch = fault.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            fault.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            fault.symptoms.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-surface-secondary dark:bg-primary py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold font-heading mb-4 text-text-primary dark:text-text-dark-primary"
          >
            Vehicle Faults & <span className="gradient-text">Repair Guides</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-text-secondary dark:text-text-dark-secondary max-w-2xl mx-auto"
          >
            Browse commonly reported faults across mechanical, electrical, and electronic systems. Find safety warnings, tools needed, and detailed repair instructions.
          </motion.p>
        </div>

        {/* Filter Toolbar */}
        <div className="mb-10 space-y-6">
          {/* Search bar */}
          <div className="max-w-xl mx-auto">
            <Input
              type="text"
              placeholder="Search by fault name, description or symptoms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-sm"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                  selectedCategory === cat
                    ? 'bg-secondary text-white border-secondary'
                    : 'bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 text-text-secondary dark:text-text-dark-secondary hover:border-secondary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFaults.map((fault, i) => (
            <motion.div
              key={fault.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link href={`/faults/${fault.slug}`} className="block h-full group">
                <GlassCard padding="md" className="h-full flex flex-col hover:border-secondary transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="accent" className="text-[10px] uppercase font-bold py-0.5">
                      {fault.category}
                    </Badge>
                    <div className="flex gap-2">
                      <Badge className={getDifficultyColor(fault.difficulty)}>{fault.difficulty}</Badge>
                      <Badge variant={fault.urgency === 'Critical' || fault.urgency === 'High' ? 'danger' : 'warning'}>{fault.urgency}</Badge>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold font-heading mb-2 text-text-primary dark:text-text-dark-primary group-hover:text-secondary transition-colors">
                    {fault.name}
                  </h3>
                  
                  <p className="text-xs text-text-secondary dark:text-text-dark-secondary leading-relaxed line-clamp-3 mb-6">
                    {fault.description}
                  </p>

                  <div className="mt-auto pt-4 border-t border-gray-100 dark:border-white/5 flex items-center justify-between text-xs text-text-muted">
                    <div>
                      <span className="block text-[10px] uppercase tracking-wider text-text-muted mb-0.5">Est. Cost</span>
                      <span className="font-bold text-text-secondary dark:text-text-dark-secondary">
                        Rs. {fault.estimatedCost.min.toLocaleString()} - Rs. {fault.estimatedCost.max.toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase tracking-wider text-text-muted mb-0.5">Est. Time</span>
                      <span className="font-semibold text-text-secondary dark:text-text-dark-secondary">
                        {fault.estimatedTime}
                      </span>
                    </div>
                  </div>
                </GlassCard>
              </Link>
            </motion.div>
          ))}

          {filteredFaults.length === 0 && (
            <div className="col-span-full text-center py-12">
              <span className="text-4xl mb-4 block">🔍</span>
              <h3 className="font-bold text-lg text-text-primary dark:text-text-dark-primary">No Faults Found</h3>
              <p className="text-sm text-text-muted mt-2">Try adjusting your search filters or browse other categories.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
