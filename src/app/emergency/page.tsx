'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';

export default function EmergencyPage() {
  const [sosActivated, setSosActivated] = useState<boolean>(false);
  const [coords, setCoords] = useState<{ lat: number | null; lng: number | null }>({ lat: null, lng: null });
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Auto get location on load if SOS is triggered
  useEffect(() => {
    if (sosActivated) {
      getLocation();
    }
  }, [sosActivated]);

  const getLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setIsLocating(false);
      },
      () => {
        // Fallback to Colombo, Sri Lanka if blocked
        setCoords({ lat: 6.9042, lng: 79.8512 });
        setIsLocating(false);
      }
    );
  };

  const handleShareLocation = async () => {
    const shareText = `Emergency SOS! I need vehicle assistance. My location coordinates are: Latitude: ${coords.lat}, Longitude: ${coords.lng}. Map link: https://www.google.com/maps/search/?api=1&query=${coords.lat},${coords.lng}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'AutoAid AI Emergency SOS',
          text: shareText,
        });
      } catch (err) {
        console.error(err);
      }
    } else {
      // Clipboard copy fallback
      navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between py-12 relative overflow-hidden">
      
      {/* Red ambient glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-danger/10 rounded-full blur-[128px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 flex-1 flex flex-col justify-center">
        
        {/* Header */}
        <div className="text-center mb-8">
          <Badge variant="danger" className="animate-pulse mb-4 text-xs tracking-wider uppercase font-bold py-1 px-3">
            🚨 EMERGENCY DISPATCH MODE
          </Badge>
          <h1 className="text-3xl md:text-4xl font-extrabold font-heading text-white mb-2">
            AutoAid SOS Helpline
          </h1>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            If you are in danger, stuck in traffic, or have had an accident, press the button below.
          </p>
        </div>

        {/* SOS Pulse Button Container */}
        <div className="flex justify-center items-center py-10">
          <AnimatePresence mode="wait">
            {!sosActivated ? (
              <motion.button
                key="sos-btn"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={() => setSosActivated(true)}
                className="w-48 h-48 md:w-56 md:h-56 rounded-full bg-danger hover:bg-danger-light text-white font-extrabold text-2xl font-heading shadow-2xl flex flex-col items-center justify-center border-4 border-white/20 transition-all cursor-pointer emergency-pulse"
              >
                <span>SOS</span>
                <span className="text-xs uppercase tracking-widest font-normal text-white/70 mt-1">I Need Help</span>
              </motion.button>
            ) : (
              <motion.div
                key="sos-active"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full space-y-6"
              >
                {/* GPS Info */}
                <GlassCard padding="lg" className="border-danger/30 bg-danger/5 text-center">
                  <span className="text-sm font-bold text-danger block mb-2">📍 Broadcasting Your GPS Location</span>
                  
                  {isLocating ? (
                    <p className="text-xs text-slate-400">Fetching accurate GPS coordinates...</p>
                  ) : (
                    <div className="space-y-4">
                      <p className="font-mono text-xs text-slate-300">
                        Latitude: <span className="text-white font-bold">{coords.lat ?? 'Obtaining...'}</span> | Longitude: <span className="text-white font-bold">{coords.lng ?? 'Obtaining...'}</span>
                      </p>
                      
                      <div className="flex justify-center gap-3">
                        <Button size="sm" variant="secondary" onClick={getLocation} className="text-xs">
                          🔄 Refresh Location
                        </Button>
                        <Button size="sm" onClick={handleShareLocation} className="bg-danger hover:bg-danger-light text-xs">
                          {copied ? '✅ Copied text!' : '📤 Share Location Link'}
                        </Button>
                      </div>
                    </div>
                  )}
                </GlassCard>

                {/* Local Dispatch contacts */}
                <div className="grid sm:grid-cols-3 gap-4">
                  <GlassCard padding="md" className="border-white/10 bg-white/5">
                    <span className="text-2xl mb-2 block">🚒</span>
                    <span className="text-xs text-slate-400 block mb-0.5">Fire & Rescue</span>
                    <span className="font-bold font-heading text-lg block">Dial 111</span>
                    <a href="tel:111" className="text-xs text-danger font-semibold mt-2 inline-block hover:underline">
                      Call Dispatcher →
                    </a>
                  </GlassCard>

                  <GlassCard padding="md" className="border-white/10 bg-white/5">
                    <span className="text-2xl mb-2 block">🚑</span>
                    <span className="text-xs text-slate-400 block mb-0.5">Medical Ambulance</span>
                    <span className="font-bold font-heading text-lg block">Dial 110</span>
                    <a href="tel:110" className="text-xs text-danger font-semibold mt-2 inline-block hover:underline">
                      Call Ambulance →
                    </a>
                  </GlassCard>

                  <GlassCard padding="md" className="border-white/10 bg-white/5">
                    <span className="text-2xl mb-2 block">👮</span>
                    <span className="text-xs text-slate-400 block mb-0.5">Emergency Police</span>
                    <span className="font-bold font-heading text-lg block">Dial 119</span>
                    <a href="tel:119" className="text-xs text-danger font-semibold mt-2 inline-block hover:underline">
                      Call Police →
                    </a>
                  </GlassCard>
                </div>

                {/* Nearby Tow / Mechanics Dispatch */}
                <GlassCard padding="lg" className="border-white/10 bg-white/5 text-left">
                  <h3 className="font-bold font-heading text-sm mb-4">🚨 Dispatch Roadside Assistance Now</h3>
                  <div className="space-y-4 text-xs">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                      <div>
                        <span className="font-bold block text-sm">Metro Towing & Recovery</span>
                        <span className="text-[10px] text-slate-400">Flatbed Towing • 1.5 km away</span>
                      </div>
                      <a href="tel:+94771234567" className="px-4 py-2 bg-danger text-white rounded-lg font-bold hover:bg-danger-light transition-colors">
                        📞 Call Tow
                      </a>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                      <div>
                        <span className="font-bold block text-sm">Colombo Hybrid & EV Specialist</span>
                        <span className="text-[10px] text-slate-400">Mobile Mechanic • 3.2 km away</span>
                      </div>
                      <a href="tel:+94112345678" className="px-4 py-2 bg-secondary text-white rounded-lg font-bold hover:bg-secondary-dark transition-colors">
                        📞 Call Repair
                      </a>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Back Link */}
        <div className="text-center mt-6">
          <Link href="/" className="text-slate-400 hover:text-white transition-colors text-xs font-semibold">
            ← Cancel and return to homepage
          </Link>
        </div>

      </div>

    </div>
  );
}
