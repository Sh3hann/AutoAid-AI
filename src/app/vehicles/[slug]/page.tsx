'use client';

import { use, useMemo } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { motion } from 'motion/react';
import { getVehicleBySlug } from '@/data/vehicles';
import { getFaultBySlug } from '@/data/faults';
import { getDifficultyColor } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Accordion } from '@/components/ui/Accordion';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function VehicleDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const vehicle = useMemo(() => getVehicleBySlug(resolvedParams.slug), [resolvedParams.slug]);

  if (!vehicle) {
    notFound();
  }

  // Load fault data for common faults
  const vehicleFaults = useMemo(() => {
    return vehicle.commonFaults
      .map(slug => getFaultBySlug(slug))
      .filter((f): f is NonNullable<typeof f> => !!f);
  }, [vehicle.commonFaults]);

  // Group specs for rendering
  const specs = [
    { label: 'Body Type', value: vehicle.bodyType, icon: '🚗' },
    { label: 'Fuel Type', value: vehicle.fuelType, icon: '⛽' },
    { label: 'Transmission', value: vehicle.transmission, icon: '⚙️' },
    { label: 'Drivetrain', value: vehicle.drivetrain, icon: '🛞' },
    { label: 'Horsepower', value: `${vehicle.performance.horsepower} hp`, icon: '⚡' },
    { label: 'Torque', value: `${vehicle.performance.torque} Nm`, icon: '💪' },
    { label: 'Top Speed', value: vehicle.performance.topSpeed ? `${vehicle.performance.topSpeed} km/h` : 'N/A', icon: '🏁' },
    { label: 'Acceleration (0-100)', value: vehicle.performance.acceleration ? `${vehicle.performance.acceleration}s` : 'N/A', icon: '⏱️' },
    { label: 'Fuel/Energy Cons.', value: vehicle.performance.fuelEconomy ? (vehicle.fuelType === 'Electric' ? `${vehicle.performance.fuelEconomy} kWh/100km` : `${vehicle.performance.fuelEconomy} L/100km`) : 'N/A', icon: '📉' }
  ];

  return (
    <div className="min-h-screen bg-surface-secondary dark:bg-primary py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <nav className="text-sm text-text-muted dark:text-text-dark-muted mb-8">
          <Link href="/" className="hover:text-secondary">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/vehicles" className="hover:text-secondary">Vehicles</Link>
          <span className="mx-2">/</span>
          <span className="text-text-primary dark:text-text-dark-primary font-medium">{vehicle.brand} {vehicle.model}</span>
        </nav>

        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-3xl overflow-hidden mb-12 p-8 md:p-12 bg-gradient-to-br from-primary via-primary-light to-primary dark:from-primary-dark dark:via-primary dark:to-primary-light text-white shadow-xl"
        >
          {/* Accent decoration */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-accent/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <Badge variant="accent">{vehicle.year}</Badge>
                <Badge variant="info">{vehicle.bodyType}</Badge>
                <Badge variant="success">{vehicle.fuelType}</Badge>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-4">
                {vehicle.brand} <span className="bg-gradient-to-r from-accent-light to-secondary-light bg-clip-text text-transparent">{vehicle.model}</span>
              </h1>
              
              <p className="text-lg text-white/70 mb-8 leading-relaxed">
                {vehicle.description}
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href={`/diagnose?brand=${vehicle.brand}&model=${vehicle.model}`}>
                  <Button size="lg" className="shadow-glow-blue">
                    🔌 Diagnose This Vehicle
                  </Button>
                </Link>
                {vehicle.price && (
                  <div className="flex items-center px-6 py-2 rounded-2xl bg-white/10 border border-white/10">
                    <span className="text-sm text-white/50 mr-2">Est. Price:</span>
                    <span className="font-bold font-heading text-lg">Rs. {vehicle.price.min.toLocaleString()} - Rs. {vehicle.price.max.toLocaleString()}</span>
                  </div>
                )}
              </div>
            </div>

            {vehicle.imageUrl && (
              <div className="w-full md:w-1/2 lg:w-5/12">
                <div className="rounded-2xl overflow-hidden shadow-2xl relative border border-white/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={vehicle.imageUrl} alt={`${vehicle.brand} ${vehicle.model}`} className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700" />
                </div>
              </div>
            )}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Main Specs & Features (Col 1 & 2) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Specs Grid */}
            <GlassCard padding="lg" title="Specifications">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                {specs.map((spec) => (
                  <div key={spec.label} className="p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                    <span className="text-2xl mb-2 block">{spec.icon}</span>
                    <span className="text-xs text-text-muted dark:text-text-dark-muted block mb-1">{spec.label}</span>
                    <span className="font-bold text-sm text-text-primary dark:text-text-dark-primary">{spec.value}</span>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* Features */}
            <GlassCard padding="lg" title="Key Features">
              <ul className="grid md:grid-cols-2 gap-3 mt-4">
                {vehicle.features.map((feat) => (
                  <li key={feat} className="flex items-center gap-3 text-sm text-text-secondary dark:text-text-dark-secondary">
                    <span className="w-5 h-5 rounded-full bg-success/15 text-success flex items-center justify-center text-xs">✓</span>
                    {feat}
                  </li>
                ))}
              </ul>
            </GlassCard>

            {/* Maintenance Timeline */}
            <GlassCard padding="lg" title="Maintenance Schedule">
              <div className="mt-6 space-y-4">
                {vehicle.maintenanceSchedule.map((item, idx) => (
                  <div key={idx} className="flex flex-col md:flex-row md:items-center justify-between p-5 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 gap-4">
                    <div>
                      <h4 className="font-bold text-base text-text-primary dark:text-text-dark-primary">{item.task}</h4>
                      <p className="text-xs text-text-muted mt-1">
                        Interval: Every <span className="font-semibold text-text-secondary dark:text-text-dark-secondary">{item.intervalKm.toLocaleString()} km</span> or <span className="font-semibold text-text-secondary dark:text-text-dark-secondary">{item.intervalMonths} months</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="text-xs text-text-muted block">Est. Cost</span>
                        <span className="font-bold text-sm text-text-secondary dark:text-text-dark-secondary">
                          ${item.estimatedCost.min} - ${item.estimatedCost.max}
                        </span>
                      </div>
                      <Badge className={getDifficultyColor(item.difficulty)}>{item.difficulty}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

          </div>

          {/* Sidebar - Common Faults & Known Issues (Col 3) */}
          <div className="space-y-8">
            <GlassCard padding="lg" title="Common Issues & Faults">
              <p className="text-sm text-text-secondary dark:text-text-dark-secondary mt-2 mb-6">
                These are the most common mechanical and electrical faults reported for this vehicle type. Click any fault to view the step-by-step repair guide.
              </p>
              
              <div className="space-y-4">
                {vehicleFaults.map((fault) => (
                  <Link href={`/faults/${fault.slug}`} key={fault.id} className="block group">
                    <div className="p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 group-hover:border-secondary transition-all">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-sm text-text-primary dark:text-text-dark-primary group-hover:text-secondary transition-colors">
                          {fault.name}
                        </span>
                        <Badge variant={fault.urgency === 'Critical' || fault.urgency === 'High' ? 'danger' : 'warning'} className="text-[10px] py-0 px-2">
                          {fault.urgency}
                        </Badge>
                      </div>
                      <p className="text-xs text-text-muted dark:text-text-dark-muted line-clamp-2 leading-relaxed">
                        {fault.description}
                      </p>
                      <div className="flex justify-between items-center mt-3 pt-2 border-t border-gray-200/50 dark:border-white/5 text-[11px] text-text-muted">
                        <span>Est. Cost: ${fault.estimatedCost.min}-${fault.estimatedCost.max}</span>
                        <span className="text-secondary group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 font-semibold">
                          Guide →
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
                {vehicleFaults.length === 0 && (
                  <div className="text-center py-6 text-text-muted">
                    No commonly reported faults for this model.
                  </div>
                )}
              </div>
            </GlassCard>

            {/* Safety Rating */}
            {vehicle.safetyRating && (
              <GlassCard padding="lg" title="Safety Rating">
                <div className="flex items-center gap-4 mt-4">
                  <div className="text-4xl">🛡️</div>
                  <div>
                    <div className="flex gap-1 text-yellow-500 text-xl font-bold">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i}>{i < (vehicle.safetyRating || 0) ? '★' : '☆'}</span>
                      ))}
                    </div>
                    <span className="text-xs text-text-muted mt-1 block">5-Star NHTSA / Euro NCAP Safety Rating equivalent</span>
                  </div>
                </div>
              </GlassCard>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
