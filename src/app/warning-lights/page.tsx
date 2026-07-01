'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { warningLights } from '@/data/warning-lights';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export default function WarningLightsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedLight, setSelectedLight] = useState<typeof warningLights[0] | null>(null);
  const [detectedLights, setDetectedLights] = useState<string[]>([]);
  const [isDetecting, setIsDetecting] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>('');

  const categories = useMemo(() => {
    return ['All', 'Engine', 'Brakes', 'Electrical', 'Safety', 'EV/Hybrid'];
  }, []);

  const filteredLights = useMemo(() => {
    return warningLights.filter(light => {
      const matchesCategory = selectedCategory === 'All' || light.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesSearch = light.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            light.meaning.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Simulate AI dashboard warning light detection
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setIsDetecting(true);
    setDetectedLights([]);

    setTimeout(() => {
      setIsDetecting(false);
      // Simulate detecting Check Engine and ABS warning lights
      setDetectedLights(['check-engine', 'abs']);
    }, 2000);
  };

  const getSeverityBadgeColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'danger';
      case 'Warning': return 'warning';
      default: return 'info';
    }
  };

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
            Dashboard <span className="gradient-text">Warning Light Detector</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-text-secondary dark:text-text-dark-secondary max-w-2xl mx-auto"
          >
            Identify dashboard lights instantly. Click on any light to read its meaning, safety ratings, drivability checks, and related faults.
          </motion.p>
        </div>

        {/* AI Scanner Block */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-3xl mx-auto mb-12"
        >
          <GlassCard padding="lg" className="border-2 border-secondary/20 bg-secondary/5 dark:bg-secondary/5 text-center">
            <h3 className="text-lg font-bold font-heading text-text-primary dark:text-text-dark-primary mb-2">📸 AI Dashboard Photo Scanner</h3>
            <p className="text-xs text-text-secondary dark:text-text-dark-secondary mb-6 max-w-lg mx-auto">
              Upload a picture of your vehicle dashboard instrument cluster. Our AI scanner detects warning lights and gives diagnostic reports instantly.
            </p>
            
            <div className="flex flex-col items-center justify-center">
              <label className="relative flex flex-col items-center justify-center w-full max-w-md h-32 border-2 border-dashed border-gray-300 dark:border-white/10 hover:border-secondary dark:hover:border-secondary rounded-2xl cursor-pointer bg-white dark:bg-white/5 transition-all">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <span className="text-3xl mb-2">📷</span>
                  <p className="text-xs text-text-muted">
                    {fileName ? fileName : 'Click to upload or drag & drop dashboard image'}
                  </p>
                </div>
                <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
              </label>

              {isDetecting && (
                <div className="mt-4 flex items-center gap-2.5 text-xs text-text-secondary">
                  <div className="w-4 h-4 border-2 border-secondary border-t-transparent rounded-full animate-spin" />
                  <span>Scanning image with AI Engine...</span>
                </div>
              )}

              {detectedLights.length > 0 && (
                <div className="mt-6 p-4 rounded-2xl bg-warning/5 border border-warning/15 text-left w-full max-w-md">
                  <span className="text-xs font-bold block text-warning mb-2">⚠️ Warning Lights Detected:</span>
                  <div className="space-y-2">
                    {detectedLights.map(slug => {
                      const wl = warningLights.find(l => l.slug === slug);
                      if (!wl) return null;
                      return (
                        <div key={wl.id} className="flex items-center justify-between text-xs">
                          <span className="font-bold text-text-primary dark:text-text-dark-primary">{wl.name}</span>
                          <button 
                            onClick={() => setSelectedLight(wl)}
                            className="text-secondary dark:text-accent font-semibold hover:underline"
                          >
                            View Guide →
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </GlassCard>
        </motion.div>

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
          {/* Search */}
          <div className="w-full md:max-w-xs">
            <input
              type="text"
              placeholder="Search warning lights..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 outline-none text-xs focus:border-secondary"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-1.5 justify-center">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
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

        {/* Colors Legend */}
        <div className="flex flex-wrap justify-center gap-6 text-xs mb-8 text-text-muted">
          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500" /> Red (Critical - Pull Over)</div>
          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Amber (Warning - Diagnose Soon)</div>
          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-green-500" /> Green/Blue (Info - Active System)</div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredLights.map((light) => (
            <div 
              key={light.id} 
              onClick={() => setSelectedLight(light)}
              className="group cursor-pointer p-5 rounded-2xl glass-card text-center hover:scale-105 transition-all flex flex-col items-center justify-center"
            >
              <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 transition-transform group-hover:scale-110 shadow-sm ${
                light.color === 'red' ? 'bg-red-500/10 text-red-500' :
                light.color === 'amber' ? 'bg-amber-500/10 text-amber-500' :
                'bg-green-500/10 text-green-500'
              }`}>
                {/* SVG Warning light icon */}
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={light.svgPath} />
                </svg>
              </div>
              
              <h4 className="font-bold text-xs text-text-primary dark:text-text-dark-primary group-hover:text-secondary transition-colors line-clamp-2">
                {light.name}
              </h4>
              <Badge variant={getSeverityBadgeColor(light.severity)} className="mt-2 text-[9px] py-0 px-1.5">
                {light.severity}
              </Badge>
            </div>
          ))}
        </div>

        {/* Detail Modal */}
        <AnimatePresence>
          {selectedLight && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
              onClick={() => setSelectedLight(null)}
            >
              <motion.div 
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                className="w-full max-w-xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-white/10 rounded-3xl p-6 shadow-2xl relative"
                onClick={e => e.stopPropagation()}
              >
                {/* Close Button */}
                <button 
                  onClick={() => setSelectedLight(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 flex items-center justify-center text-text-muted transition-all"
                >
                  ✕
                </button>

                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center ${
                    selectedLight.color === 'red' ? 'bg-red-500/10 text-red-500' :
                    selectedLight.color === 'amber' ? 'bg-amber-500/10 text-amber-500' :
                    'bg-green-500/10 text-green-500'
                  }`}>
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={selectedLight.svgPath} />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-text-primary dark:text-text-dark-primary">{selectedLight.name}</h3>
                    <div className="flex gap-2 mt-1">
                      <Badge variant={getSeverityBadgeColor(selectedLight.severity)}>{selectedLight.severity}</Badge>
                      <Badge variant="accent">{selectedLight.category}</Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <span className="font-bold block text-text-primary dark:text-text-dark-primary mb-1">Meaning & Context</span>
                    <p className="text-text-secondary dark:text-text-dark-secondary leading-relaxed">{selectedLight.meaning}</p>
                  </div>

                  <div>
                    <span className="font-bold block text-text-primary dark:text-text-dark-primary mb-1">Immediate Actions</span>
                    <p className="text-text-secondary dark:text-text-dark-secondary leading-relaxed">{selectedLight.whatToDo}</p>
                  </div>

                  <div className={`p-3 rounded-xl border ${selectedLight.canDrive ? 'bg-success/5 border-success/20 text-success' : 'bg-danger/5 border-danger/20 text-danger'}`}>
                    <span className="font-bold block mb-1">🚗 Can I continue driving?</span>
                    <p className="text-text-secondary dark:text-text-dark-secondary">{selectedLight.canDriveNote || (selectedLight.canDrive ? 'Yes, but diagnose the issue soon.' : 'No, pull over immediately.')}</p>
                  </div>

                  {selectedLight.relatedFaults.length > 0 && (
                    <div>
                      <span className="font-bold block text-text-primary dark:text-text-dark-primary mb-1.5">Related Diagnostic Faults:</span>
                      <div className="flex flex-wrap gap-2">
                        {selectedLight.relatedFaults.map(slug => (
                          <Link 
                            key={slug} 
                            href={`/faults/${slug}`} 
                            onClick={() => setSelectedLight(null)}
                            className="px-3 py-1.5 bg-secondary/15 text-secondary dark:text-accent rounded-lg font-semibold hover:bg-secondary/20 transition-all"
                          >
                            🔧 {slug.replace(/-/g, ' ')}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
