'use client';

import { use, useMemo } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { motion } from 'motion/react';
import { getFaultBySlug } from '@/data/faults';
import { getDifficultyColor } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Accordion } from '@/components/ui/Accordion';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function FaultDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const fault = useMemo(() => getFaultBySlug(resolvedParams.slug), [resolvedParams.slug]);

  if (!fault) {
    notFound();
  }

  // Set color styling based on urgency
  const urgencyStyle = useMemo(() => {
    switch (fault.urgency) {
      case 'Critical': return 'bg-danger text-white border-danger';
      case 'High': return 'bg-danger/10 text-danger border-danger/20';
      case 'Medium': return 'bg-warning/10 text-warning border-warning/20';
      default: return 'bg-success/10 text-success border-success/20';
    }
  }, [fault.urgency]);

  // Convert repair steps to accordion format
  const accordionSteps = useMemo(() => {
    return fault.repairSteps.map((step) => ({
      id: `step-${step.step}`,
      title: `Step ${step.step}: ${step.title}`,
      content: (
        <div className="space-y-3">
          <p className="text-sm leading-relaxed text-text-secondary dark:text-text-dark-secondary">
            {step.description}
          </p>
          {step.warning && (
            <div className="p-3.5 rounded-xl bg-danger/5 border border-danger/15 text-xs text-danger flex items-start gap-2.5">
              <span className="text-sm mt-0.5">⚠️</span>
              <div>
                <span className="font-bold block mb-0.5">Step Warning</span>
                {step.warning}
              </div>
            </div>
          )}
        </div>
      )
    }));
  }, [fault.repairSteps]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-surface-secondary dark:bg-primary py-12 print:bg-white print:py-0 print:text-black">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 print:px-0">
        
        {/* Navigation / Actions - Hidden during print */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 print:hidden">
          <nav className="text-sm text-text-muted dark:text-text-dark-muted">
            <Link href="/" className="hover:text-secondary">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/faults" className="hover:text-secondary">Faults</Link>
            <span className="mx-2">/</span>
            <span className="text-text-primary dark:text-text-dark-primary font-medium">{fault.name}</span>
          </nav>
          
          <div className="flex items-center gap-3">
            <Button size="sm" variant="secondary" onClick={handlePrint} className="flex items-center gap-2">
              🖨️ Print Guide
            </Button>
            <Button size="sm" variant="secondary" onClick={handlePrint} className="flex items-center gap-2">
              📄 Download PDF
            </Button>
          </div>
        </div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-3xl overflow-hidden p-8 md:p-10 bg-gradient-to-br from-primary via-primary-light to-primary dark:from-primary-dark dark:via-primary dark:to-primary-light text-white shadow-lg mb-10 print:bg-none print:text-black print:border print:border-gray-200 print:shadow-none"
        >
          <div className="relative z-10">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Badge variant="accent">{fault.category}</Badge>
              <Badge className={getDifficultyColor(fault.difficulty)}>{fault.difficulty}</Badge>
              <Badge className={urgencyStyle}>{fault.urgency} Urgency</Badge>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold font-heading mb-3 print:text-2xl">
              {fault.name}
            </h1>
            
            <p className="text-white/70 print:text-gray-700 text-sm md:text-base leading-relaxed max-w-3xl">
              {fault.description}
            </p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Main Content (Cols 1 & 2) */}
          <div className="md:col-span-2 space-y-8 print:col-span-3">
            
            {/* Symptoms & Causes */}
            <div className="grid sm:grid-cols-2 gap-6">
              <GlassCard padding="lg" title="Symptoms" className="print:border print:border-gray-200 print:shadow-none">
                <ul className="space-y-3 mt-4">
                  {fault.symptoms.map((sym, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-text-secondary dark:text-text-dark-secondary">
                      <span className="text-danger mt-0.5">•</span>
                      <span>{sym}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>

              <GlassCard padding="lg" title="Possible Causes" className="print:border print:border-gray-200 print:shadow-none">
                <ol className="space-y-3 mt-4">
                  {fault.possibleCauses.map((cause, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-text-secondary dark:text-text-dark-secondary">
                      <span className="font-bold text-secondary dark:text-accent">{idx + 1}.</span>
                      <span>{cause}</span>
                    </li>
                  ))}
                </ol>
              </GlassCard>
            </div>

            {/* Safety Warning (Critically Important) */}
            <div className="p-5 rounded-2xl bg-danger/10 border-2 border-danger/20 text-danger">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">⚠️</span>
                <h3 className="font-extrabold text-base uppercase tracking-wider font-heading">CRITICAL SAFETY WARNING</h3>
              </div>
              <p className="text-xs md:text-sm font-semibold leading-relaxed">
                {fault.safetyWarning}
              </p>
            </div>

            {/* Repair Guide Step-by-Step */}
            <GlassCard padding="lg" title="Step-by-Step Repair Guide" className="print:border print:border-gray-200 print:shadow-none">
              <p className="text-xs text-text-secondary dark:text-text-dark-secondary mt-2 mb-6">
                Follow these instructions carefully to troubleshoot and resolve the issue. Always wear safety gear.
              </p>
              
              <div className="print:hidden">
                <Accordion items={accordionSteps} defaultOpenId="step-1" />
              </div>

              {/* Print fallback for accordion steps */}
              <div className="hidden print:block space-y-6">
                {fault.repairSteps.map((step) => (
                  <div key={step.step} className="border-b border-gray-200 pb-4">
                    <h4 className="font-bold text-sm mb-2">Step {step.step}: {step.title}</h4>
                    <p className="text-xs text-gray-700 leading-relaxed">{step.description}</p>
                    {step.warning && (
                      <p className="text-xs text-red-600 font-semibold mt-2">Warning: {step.warning}</p>
                    )}
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* Precautions */}
            <GlassCard padding="lg" title="Precautions & Setup" className="print:border print:border-gray-200 print:shadow-none">
              <ul className="space-y-3 mt-4">
                {fault.precautions.map((prec, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-text-secondary dark:text-text-dark-secondary">
                    <span className="text-warning mt-0.5">⚠️</span>
                    <span>{prec}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>

          </div>

          {/* Side Panels - Tools, Parts, Assessment (Col 3) */}
          <div className="space-y-8 print:col-span-3">
            
            {/* Quick Estimates */}
            <GlassCard padding="lg" title="Estimates" className="print:border print:border-gray-200 print:shadow-none">
              <div className="space-y-4 mt-4">
                <div>
                  <span className="text-xs text-text-muted block">Repair Cost Range</span>
                  <span className="font-extrabold text-xl font-heading text-text-primary dark:text-text-dark-primary">
                    Rs. {fault.estimatedCost.min.toLocaleString()} - Rs. {fault.estimatedCost.max.toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-text-muted block">Estimated Labor Time</span>
                  <span className="font-bold text-sm text-text-secondary dark:text-text-dark-secondary">
                    {fault.estimatedTime}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-text-muted block">Can I repair myself?</span>
                  <div className="flex items-center gap-1.5 mt-1">
                    <Badge variant={fault.canSelfRepair === 'Yes' ? 'success' : fault.canSelfRepair === 'Maybe' ? 'warning' : 'danger'}>
                      {fault.canSelfRepair}
                    </Badge>
                  </div>
                  {fault.selfRepairCondition && (
                    <p className="text-[10px] text-text-muted mt-1.5 leading-relaxed">
                      {fault.selfRepairCondition}
                    </p>
                  )}
                </div>
              </div>
            </GlassCard>

            {/* Tools Needed */}
            <GlassCard padding="lg" title="Tools Required" className="print:border print:border-gray-200 print:shadow-none">
              <ul className="space-y-2.5 mt-4">
                {fault.toolsNeeded.map((tool) => (
                  <li key={tool} className="flex items-center gap-2.5 text-xs text-text-secondary dark:text-text-dark-secondary">
                    <span>🔧</span>
                    <span>{tool}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>

            {/* Spare Parts */}
            <GlassCard padding="lg" title="Required Parts" className="print:border print:border-gray-200 print:shadow-none">
              <div className="space-y-3 mt-4">
                {fault.spareParts.map((part) => (
                  <div key={part.name} className="flex items-center justify-between text-xs p-2 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                    <span className="text-text-secondary dark:text-text-dark-secondary">{part.name}</span>
                    <span className="font-bold text-text-primary dark:text-text-dark-primary">
                      Rs. {part.estimatedPrice.min.toLocaleString()} - Rs. {part.estimatedPrice.max.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* Emergency & Drivability */}
            <div className="p-5 rounded-2xl bg-danger/5 border border-danger/10 text-danger space-y-4 print:border print:border-red-200">
              <div>
                <h4 className="font-extrabold text-xs uppercase tracking-wider mb-1">When NOT to Drive</h4>
                <p className="text-[11px] leading-relaxed text-danger/80">{fault.whenNotToDrive}</p>
              </div>
              <div className="pt-3 border-t border-danger/10">
                <h4 className="font-extrabold text-xs uppercase tracking-wider mb-1">Emergency Instructions</h4>
                <p className="text-[11px] leading-relaxed text-danger/80">{fault.emergencyInstructions}</p>
              </div>
            </div>

            {/* Find Mechanic CTA */}
            <Link href="/assistance" className="block print:hidden">
              <Button variant="accent" className="w-full text-center py-3.5 shadow-glow-cyan">
                📍 Find Nearby Mechanic
              </Button>
            </Link>

          </div>

        </div>

      </div>
    </div>
  );
}
