'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import { serviceProviders, getNearestServices } from '@/data/services';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import type { ServiceCategory } from '@/types';

const categories: ServiceCategory[] = [
  'Mechanic',
  'EV Repair',
  'Hybrid Specialist',
  'Towing',
  'Fuel Station',
  'Charging Station',
  'Tyre Shop',
  'Battery Shop',
  'Car Wash'
];

export default function AssistancePage() {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>('Mechanic');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number }>({ lat: 6.9042, lng: 79.8512 }); // Default Colombo
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [activeItem, setActiveItem] = useState<typeof serviceProviders[0] | null>(null);

  // Attempt to read current user geolocation
  useEffect(() => {
    if (navigator.geolocation) {
      setIsLocating(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          });
          setIsLocating(false);
        },
        () => {
          // Blocked or failed, keep Colombo default
          setIsLocating(false);
        }
      );
    }
  }, []);

  // Compute nearest providers based on category and current geolocation
  const sortedProviders = useMemo(() => {
    return getNearestServices(userLocation.lat, userLocation.lng, selectedCategory);
  }, [selectedCategory, userLocation]);

  // Set first item as active by default when category changes
  useEffect(() => {
    if (sortedProviders.length > 0) {
      setActiveItem(sortedProviders[0]);
    } else {
      setActiveItem(null);
    }
  }, [sortedProviders]);

  return (
    <div className="min-h-screen bg-surface-secondary dark:bg-primary py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold font-heading mb-4 text-text-primary dark:text-text-dark-primary"
          >
            Roadside <span className="gradient-text">Assistance Finder</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-text-secondary dark:text-text-dark-secondary max-w-2xl mx-auto text-sm"
          >
            Instantly locate emergency breakdown services, mechanics, EV fast chargers, and tow trucks closest to your current location.
          </motion.p>
        </div>

        {/* Categories Carousel */}
        <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar mb-8 justify-start md:justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold border whitespace-nowrap transition-all flex items-center gap-2 ${
                selectedCategory === cat
                  ? 'bg-secondary text-white border-secondary shadow-glow-blue'
                  : 'bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 text-text-secondary dark:text-text-dark-secondary hover:border-secondary'
              }`}
            >
              <span>
                {cat === 'Mechanic' && '🔧'}
                {cat === 'EV Repair' && '⚡'}
                {cat === 'Hybrid Specialist' && '🔋'}
                {cat === 'Towing' && '🛻'}
                {cat === 'Fuel Station' && '⛽'}
                {cat === 'Charging Station' && '🔌'}
                {cat === 'Tyre Shop' && '🛞'}
                {cat === 'Battery Shop' && '🔋'}
                {cat === 'Car Wash' && '🧼'}
              </span>
              {cat}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          
          {/* Service Providers Listing (Cols 1 & 2) */}
          <div className="lg:col-span-2 space-y-4 max-h-[650px] overflow-y-auto pr-2">
            <div className="flex justify-between items-center text-xs text-text-muted mb-2">
              <span>Found {sortedProviders.length} providers nearby</span>
              {isLocating && <span>📍 Updating GPS...</span>}
            </div>

            {sortedProviders.map((provider) => (
              <div 
                key={provider.id}
                onClick={() => setActiveItem(provider)}
                className={`cursor-pointer p-4 rounded-2xl border transition-all ${
                  activeItem?.id === provider.id
                    ? 'bg-secondary/5 border-secondary dark:bg-secondary/10 dark:border-secondary'
                    : 'bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 hover:border-secondary'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-sm text-text-primary dark:text-text-dark-primary">
                    {provider.name}
                  </h4>
                  <Badge variant="accent" className="text-[10px]">
                    {provider.distance} km
                  </Badge>
                </div>
                
                <p className="text-xs text-text-secondary dark:text-text-dark-secondary mb-3 leading-relaxed">
                  {provider.address}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-yellow-500 font-bold text-xs">★</span>
                    <span className="text-xs font-bold text-text-secondary dark:text-text-dark-secondary">{provider.rating}</span>
                    <span className="text-[10px] text-text-muted">({provider.reviewCount} reviews)</span>
                  </div>

                  <Badge variant={provider.isOpen ? 'success' : 'default'} className="text-[10px] py-0 px-2">
                    {provider.isOpen ? 'Open Now' : 'Closed'}
                  </Badge>
                </div>
              </div>
            ))}

            {sortedProviders.length === 0 && (
              <div className="text-center py-12">
                <span className="text-3xl mb-3 block">📍</span>
                <h4 className="font-bold text-sm text-text-primary dark:text-text-dark-primary">No Providers Found</h4>
                <p className="text-xs text-text-muted mt-1">We couldn&apos;t find any service providers in this category near Colombo.</p>
              </div>
            )}
          </div>

          {/* Interactive Map fallbacks & Details Panel (Cols 3, 4, 5) */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Visual Vector Grid Map (Premium look) */}
            <div className="h-80 rounded-3xl bg-slate-900 border border-white/10 relative overflow-hidden flex items-center justify-center shadow-lg">
              {/* Map grid lines */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px]" />
              
              {/* Radial center glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-secondary/15 rounded-full blur-[80px]" />

              {/* User Center GPS Marker */}
              <div className="relative z-10 flex flex-col items-center">
                <span className="relative flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-accent"></span>
                </span>
                <span className="text-[10px] font-bold text-accent mt-2 bg-slate-950/80 px-2 py-0.5 rounded-md border border-accent/25">YOUR LOCATION</span>
              </div>

              {/* Active Marker relative direction */}
              {activeItem && (
                <div className="absolute z-10 flex flex-col items-center" style={{ top: '30%', left: '65%' }}>
                  <span className="relative flex h-3.5 w-3.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-danger opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-danger"></span>
                  </span>
                  <span className="text-[9px] font-bold text-danger mt-1.5 bg-slate-950/80 px-2 py-0.5 rounded-md border border-danger/25 whitespace-nowrap uppercase">
                    {activeItem.name}
                  </span>
                </div>
              )}

              {/* Navigation overlays */}
              <div className="absolute bottom-4 left-4 bg-slate-950/80 px-3 py-1.5 rounded-xl border border-white/5 text-[10px] text-slate-400">
                 Colombo Metropolitan GPS Grid
              </div>
            </div>

            {/* Active Provider Details Card */}
            {activeItem && (
              <GlassCard padding="lg">
                <h3 className="font-bold font-heading text-lg text-text-primary dark:text-text-dark-primary mb-1">
                  {activeItem.name}
                </h3>
                <p className="text-xs text-text-secondary dark:text-text-dark-secondary mb-4">
                  {activeItem.address}
                </p>

                <div className="grid grid-cols-2 gap-4 text-xs mb-6">
                  <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                    <span className="text-text-muted block mb-0.5">Hours of Service</span>
                    <span className="font-bold text-text-secondary dark:text-text-dark-secondary">{activeItem.hours}</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                    <span className="text-text-muted block mb-0.5">Distance</span>
                    <span className="font-bold text-text-secondary dark:text-text-dark-secondary">{activeItem.distance} km away</span>
                  </div>
                </div>

                <div className="mb-6">
                  <span className="text-xs text-text-muted block mb-2 font-semibold">SERVICES OFFERED</span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeItem.services.map((serv) => (
                      <span key={serv} className="px-2.5 py-1 rounded-lg bg-secondary/10 text-secondary dark:text-accent font-semibold text-[10px]">
                        {serv}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a href={`tel:${activeItem.phone}`} className="flex-1">
                    <Button className="w-full text-center py-3">
                      📞 Call Assistance ({activeItem.phone})
                    </Button>
                  </a>
                  {activeItem.website && (
                    <a href={activeItem.website} target="_blank" rel="noopener noreferrer" className="flex-1">
                      <Button variant="secondary" className="w-full text-center py-3">
                        🌐 Visit Website
                      </Button>
                    </a>
                  )}
                </div>
              </GlassCard>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
