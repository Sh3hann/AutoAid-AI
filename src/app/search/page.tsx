'use client';

import { use, useState, useEffect, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'motion/react';
import { vehicles } from '@/data/vehicles';
import { faults } from '@/data/faults';
import { warningLights } from '@/data/warning-lights';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';

const popularSearches = [
  'check engine',
  'brake failure',
  'Prius',
  'Tesla Model 3',
  'dead battery',
  'flat tyre'
];

interface SearchResultItem {
  id: string;
  type: 'vehicle' | 'fault' | 'warning-light';
  title: string;
  description: string;
  slug: string;
  category?: string;
  badgeText?: string;
  link: string;
}

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);

  // Sync state if query param changes
  useEffect(() => {
    setQuery(searchParams.get('q') || '');
  }, [searchParams]);

  // Combine database searches
  const searchResults = useMemo((): SearchResultItem[] => {
    if (!query.trim()) return [];
    
    const results: SearchResultItem[] = [];
    const q = query.toLowerCase();

    // 1. Search vehicles
    vehicles.forEach(v => {
      if (
        v.brand.toLowerCase().includes(q) ||
        v.model.toLowerCase().includes(q) ||
        v.description.toLowerCase().includes(q)
      ) {
        results.push({
          id: `veh-${v.id}`,
          type: 'vehicle',
          title: `${v.brand} ${v.model} (${v.year})`,
          description: v.description,
          slug: v.slug,
          category: 'Vehicle',
          badgeText: v.fuelType,
          link: `/vehicles/${v.slug}`
        });
      }
    });

    // 2. Search faults
    faults.forEach(f => {
      if (
        f.name.toLowerCase().includes(q) ||
        f.description.toLowerCase().includes(q) ||
        f.symptoms.some(s => s.toLowerCase().includes(q))
      ) {
        results.push({
          id: `fault-${f.id}`,
          type: 'fault',
          title: f.name,
          description: f.description,
          slug: f.slug,
          category: 'Diagnostic Fault',
          badgeText: f.difficulty,
          link: `/faults/${f.slug}`
        });
      }
    });

    // 3. Search warning lights
    warningLights.forEach(wl => {
      if (
        wl.name.toLowerCase().includes(q) ||
        wl.meaning.toLowerCase().includes(q)
      ) {
        results.push({
          id: `light-${wl.id}`,
          type: 'warning-light',
          title: `${wl.name} Light`,
          description: wl.meaning,
          slug: wl.slug,
          category: 'Warning Light',
          badgeText: wl.severity,
          link: `/warning-lights`
        });
      }
    });

    return results;
  }, [query]);

  // Grouped results
  const groupedResults = useMemo(() => {
    const groups: Record<string, SearchResultItem[]> = {
      'Vehicles': [],
      'Diagnostic Faults': [],
      'Warning Lights': []
    };

    searchResults.forEach(item => {
      if (item.type === 'vehicle') groups['Vehicles'].push(item);
      if (item.type === 'fault') groups['Diagnostic Faults'].push(item);
      if (item.type === 'warning-light') groups['Warning Lights'].push(item);
    });

    return groups;
  }, [searchResults]);

  const handlePopularSearch = (term: string) => {
    setQuery(term);
    // update URL
    const params = new URLSearchParams(window.location.search);
    params.set('q', term);
    window.history.pushState(null, '', `?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-surface-secondary dark:bg-primary py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Universal Search Input */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold font-heading mb-4 text-text-primary dark:text-text-dark-primary">
            Universal <span className="gradient-text">Search</span>
          </h1>
          <p className="text-text-secondary dark:text-text-dark-secondary text-sm max-w-lg mx-auto mb-6">
            Search across our entire vehicle database, diagnostic guides, and dashboard warning light indices.
          </p>
          
          <div className="max-w-xl mx-auto">
            <Input
              type="text"
              placeholder="Search anything (e.g., Tesla, coolant, check engine)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full text-sm"
            />
          </div>
        </div>

        {/* Popular Searches */}
        {!query.trim() && (
          <div className="text-center py-6">
            <span className="text-xs text-text-muted font-semibold block mb-3">POPULAR SEARCHES</span>
            <div className="flex flex-wrap justify-center gap-2">
              {popularSearches.map(term => (
                <button
                  key={term}
                  onClick={() => handlePopularSearch(term)}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-secondary transition-all text-text-secondary dark:text-text-dark-secondary"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Results Display */}
        {query.trim() && (
          <div className="space-y-8">
            <div className="flex items-center justify-between text-xs text-text-muted">
              <span>Showing results for &quot;{query}&quot;</span>
              <span>{searchResults.length} matches found</span>
            </div>

            {searchResults.length > 0 ? (
              Object.entries(groupedResults).map(([groupName, items]) => {
                if (items.length === 0) return null;
                return (
                  <div key={groupName} className="space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-text-muted pl-1">
                      {groupName} ({items.length})
                    </h3>
                    
                    <div className="space-y-3">
                      {items.map((item, idx) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05 }}
                        >
                          <Link href={item.link} className="block group">
                            <GlassCard padding="md" className="group-hover:border-secondary transition-all">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-bold text-sm text-text-primary dark:text-text-dark-primary group-hover:text-secondary transition-colors">
                                  {item.title}
                                </h4>
                                {item.badgeText && (
                                  <Badge variant="accent" className="text-[10px] py-0 px-2">
                                    {item.badgeText}
                                  </Badge>
                                )}
                              </div>
                              <p className="text-xs text-text-secondary dark:text-text-dark-secondary leading-relaxed line-clamp-2">
                                {item.description}
                              </p>
                              <span className="text-[10px] text-secondary dark:text-accent font-semibold block mt-2 group-hover:translate-x-1 transition-transform">
                                View Details →
                              </span>
                            </GlassCard>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-12">
                <span className="text-4xl mb-4 block">🔍</span>
                <h3 className="font-bold text-lg text-text-primary dark:text-text-dark-primary">No Matches Found</h3>
                <p className="text-sm text-text-muted mt-2">We couldn&apos;t find anything matching your search term. Double check spelling or try a different term.</p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-surface-secondary dark:bg-primary flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-secondary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <span className="text-sm text-text-muted">Loading search engine...</span>
        </div>
      </div>
    }>
      <SearchResultsContent />
    </Suspense>
  );
}
