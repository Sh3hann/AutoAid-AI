/**
 * AutoAid AI — Local Diagnostic Engine
 * 
 * Provides AI-like vehicle diagnosis WITHOUT requiring an external API key.
 * Uses keyword matching, symptom-fault correlation, and vehicle-specific
 * fault weighting to generate accurate diagnoses.
 */

import type { DiagnosisInput, DiagnosisResult, DiagnosisFault, UrgencyLevel, Fault } from '@/types';

/** Symptom keywords mapped to fault slugs with base confidence */
const SYMPTOM_FAULT_MAP: Record<string, { faultSlugs: string[]; confidence: number }> = {
  // Engine starting issues
  'won\'t start': { faultSlugs: ['engine-wont-start', 'battery-dead', 'starter-motor-failure', 'fuel-pump-failure'], confidence: 75 },
  'wont start': { faultSlugs: ['engine-wont-start', 'battery-dead', 'starter-motor-failure', 'fuel-pump-failure'], confidence: 75 },
  'no start': { faultSlugs: ['engine-wont-start', 'battery-dead', 'starter-motor-failure'], confidence: 70 },
  'cranks but': { faultSlugs: ['fuel-pump-failure', 'spark-plug-issue', 'injector-failure'], confidence: 65 },
  'clicking': { faultSlugs: ['battery-dead', 'starter-motor-failure'], confidence: 80 },
  'dead battery': { faultSlugs: ['battery-dead', 'alternator-failure'], confidence: 90 },
  'jump start': { faultSlugs: ['battery-dead', 'alternator-failure'], confidence: 85 },
  
  // Engine performance
  'misfire': { faultSlugs: ['engine-misfire', 'spark-plug-issue', 'injector-failure'], confidence: 80 },
  'rough idle': { faultSlugs: ['engine-misfire', 'spark-plug-issue', 'injector-failure', 'vacuum-leak'], confidence: 70 },
  'stalling': { faultSlugs: ['fuel-pump-failure', 'engine-misfire', 'injector-failure'], confidence: 65 },
  'loss of power': { faultSlugs: ['turbo-failure', 'fuel-pump-failure', 'catalytic-converter-failure'], confidence: 60 },
  'surging': { faultSlugs: ['fuel-pump-failure', 'injector-failure'], confidence: 60 },
  'hesitation': { faultSlugs: ['spark-plug-issue', 'fuel-pump-failure', 'injector-failure'], confidence: 55 },
  
  // Overheating
  'overheating': { faultSlugs: ['engine-overheating', 'radiator-leak', 'thermostat-failure', 'water-pump-failure'], confidence: 85 },
  'temperature high': { faultSlugs: ['engine-overheating', 'thermostat-failure', 'coolant-leak'], confidence: 80 },
  'steam': { faultSlugs: ['engine-overheating', 'radiator-leak', 'coolant-leak'], confidence: 85 },
  'coolant': { faultSlugs: ['coolant-leak', 'radiator-leak', 'thermostat-failure', 'water-pump-failure'], confidence: 70 },
  'radiator': { faultSlugs: ['radiator-leak', 'engine-overheating'], confidence: 75 },
  
  // Brakes
  'brake': { faultSlugs: ['brake-failure', 'brake-pad-worn', 'brake-fluid-leak'], confidence: 65 },
  'squeaking brake': { faultSlugs: ['brake-pad-worn'], confidence: 85 },
  'grinding brake': { faultSlugs: ['brake-pad-worn', 'brake-failure'], confidence: 80 },
  'soft pedal': { faultSlugs: ['brake-fluid-leak', 'brake-failure'], confidence: 75 },
  'brake pedal': { faultSlugs: ['brake-fluid-leak', 'brake-failure', 'brake-pad-worn'], confidence: 65 },
  'abs': { faultSlugs: ['abs-light', 'brake-failure'], confidence: 80 },
  
  // Transmission
  'transmission': { faultSlugs: ['transmission-slipping', 'gear-wont-shift', 'transmission-fluid-leak'], confidence: 70 },
  'gear': { faultSlugs: ['gear-wont-shift', 'transmission-slipping', 'clutch-failure'], confidence: 65 },
  'slipping': { faultSlugs: ['transmission-slipping', 'clutch-failure'], confidence: 75 },
  'clutch': { faultSlugs: ['clutch-failure'], confidence: 85 },
  'grinding gear': { faultSlugs: ['gear-wont-shift', 'clutch-failure'], confidence: 80 },
  
  // Steering & Suspension
  'steering': { faultSlugs: ['power-steering-failure', 'steering-vibration'], confidence: 70 },
  'vibration': { faultSlugs: ['steering-vibration', 'wheel-bearing-noise', 'brake-pad-worn'], confidence: 60 },
  'noise': { faultSlugs: ['suspension-noise', 'wheel-bearing-noise'], confidence: 50 },
  'knocking': { faultSlugs: ['suspension-noise', 'engine-misfire'], confidence: 60 },
  'pulling': { faultSlugs: ['steering-vibration', 'brake-pad-worn'], confidence: 55 },
  'suspension': { faultSlugs: ['suspension-noise'], confidence: 75 },
  
  // Electrical
  'check engine': { faultSlugs: ['check-engine-light', 'engine-misfire', 'catalytic-converter-failure'], confidence: 70 },
  'warning light': { faultSlugs: ['check-engine-light', 'battery-warning-light'], confidence: 60 },
  'electrical': { faultSlugs: ['fuse-blown', 'alternator-failure', 'battery-dead'], confidence: 55 },
  'fuse': { faultSlugs: ['fuse-blown'], confidence: 85 },
  'horn': { faultSlugs: ['horn-failure'], confidence: 90 },
  'wiper': { faultSlugs: ['wiper-failure'], confidence: 90 },
  'window': { faultSlugs: ['window-motor-issue'], confidence: 85 },
  'headlight': { faultSlugs: ['headlight-issue'], confidence: 90 },
  'tail light': { faultSlugs: ['tail-light-issue'], confidence: 90 },
  
  // Leaks
  'oil leak': { faultSlugs: ['oil-leak', 'low-oil-pressure'], confidence: 80 },
  'leak': { faultSlugs: ['oil-leak', 'coolant-leak', 'fuel-leak', 'exhaust-leak', 'brake-fluid-leak'], confidence: 50 },
  'smoke': { faultSlugs: ['oil-leak', 'engine-overheating', 'turbo-failure'], confidence: 65 },
  'burning smell': { faultSlugs: ['oil-leak', 'clutch-failure', 'brake-pad-worn'], confidence: 70 },
  
  // Tyres
  'tyre': { faultSlugs: ['tyre-puncture', 'flat-tyre'], confidence: 75 },
  'tire': { faultSlugs: ['tyre-puncture', 'flat-tyre'], confidence: 75 },
  'flat': { faultSlugs: ['flat-tyre', 'tyre-puncture'], confidence: 85 },
  'puncture': { faultSlugs: ['tyre-puncture'], confidence: 90 },
  
  // HVAC
  'ac': { faultSlugs: ['ac-not-cooling'], confidence: 80 },
  'air conditioning': { faultSlugs: ['ac-not-cooling'], confidence: 85 },
  'heater': { faultSlugs: ['heater-failure'], confidence: 85 },
  'no heat': { faultSlugs: ['heater-failure', 'thermostat-failure'], confidence: 80 },
  
  // EV/Hybrid specific
  'charging': { faultSlugs: ['charging-error', 'charging-port-fault'], confidence: 80 },
  'range': { faultSlugs: ['high-voltage-battery-fault', 'bms-error'], confidence: 60 },
  'battery degradation': { faultSlugs: ['high-voltage-battery-fault', 'bms-error'], confidence: 75 },
  'hybrid': { faultSlugs: ['hybrid-system-failure'], confidence: 70 },
  'electric motor': { faultSlugs: ['electric-motor-failure', 'inverter-failure'], confidence: 75 },
  'inverter': { faultSlugs: ['inverter-failure'], confidence: 90 },
  'dc converter': { faultSlugs: ['dc-converter-failure'], confidence: 90 },
  'regenerative': { faultSlugs: ['electric-motor-failure', 'bms-error'], confidence: 65 },
  
  // General
  'door': { faultSlugs: ['door-lock-issue'], confidence: 80 },
  'airbag': { faultSlugs: ['airbag-warning'], confidence: 85 },
  'exhaust': { faultSlugs: ['exhaust-leak', 'catalytic-converter-failure'], confidence: 70 },
  'fuel': { faultSlugs: ['fuel-pump-failure', 'fuel-leak', 'injector-failure'], confidence: 55 },
};

/** Warning light to fault mapping */
const WARNING_LIGHT_FAULT_MAP: Record<string, string[]> = {
  'check-engine': ['check-engine-light', 'engine-misfire', 'catalytic-converter-failure', 'spark-plug-issue'],
  'abs': ['abs-light', 'brake-failure'],
  'battery': ['battery-dead', 'alternator-failure', 'battery-warning-light'],
  'oil': ['low-oil-pressure', 'oil-leak'],
  'coolant': ['engine-overheating', 'coolant-leak', 'thermostat-failure'],
  'tyre-pressure': ['tyre-puncture', 'flat-tyre'],
  'brake': ['brake-failure', 'brake-pad-worn', 'brake-fluid-leak'],
  'traction': ['steering-vibration'],
  'airbag': ['airbag-warning'],
  'engine-temperature': ['engine-overheating', 'thermostat-failure', 'water-pump-failure'],
  'transmission': ['transmission-slipping', 'gear-wont-shift'],
  'ev-battery': ['high-voltage-battery-fault', 'bms-error'],
  'hybrid-system': ['hybrid-system-failure', 'inverter-failure'],
  'charging': ['charging-error', 'charging-port-fault'],
  'power-steering': ['power-steering-failure'],
  'dpf': ['exhaust-leak'],
  'glow-plug': ['engine-wont-start'],
};

/** Urgency classification based on fault types */
const CRITICAL_FAULTS = new Set([
  'brake-failure', 'brake-fluid-leak', 'power-steering-failure',
  'engine-overheating', 'fuel-leak', 'airbag-warning',
  'high-voltage-battery-fault',
]);

const HIGH_URGENCY_FAULTS = new Set([
  'low-oil-pressure', 'coolant-leak', 'radiator-leak',
  'transmission-slipping', 'alternator-failure', 'turbo-failure',
  'hybrid-system-failure', 'electric-motor-failure', 'inverter-failure',
  'timing-belt-issue', 'water-pump-failure', 'abs-light',
  'dc-converter-failure', 'bms-error',
]);

const LOW_URGENCY_FAULTS = new Set([
  'ac-not-cooling', 'heater-failure', 'horn-failure', 'wiper-failure',
  'window-motor-issue', 'headlight-issue', 'tail-light-issue',
  'door-lock-issue', 'fuse-blown',
]);

/** Fault database reference for cost/time estimates */
const FAULT_ESTIMATES: Record<string, { cost: { min: number; max: number }; time: string; name: string }> = {
  'engine-wont-start': { cost: { min: 50, max: 500 }, time: '1-3 hours', name: 'Engine Won\'t Start' },
  'battery-dead': { cost: { min: 100, max: 300 }, time: '30 minutes', name: 'Dead Battery' },
  'starter-motor-failure': { cost: { min: 200, max: 600 }, time: '2-4 hours', name: 'Starter Motor Failure' },
  'alternator-failure': { cost: { min: 300, max: 800 }, time: '2-3 hours', name: 'Alternator Failure' },
  'engine-overheating': { cost: { min: 100, max: 1500 }, time: '1-6 hours', name: 'Engine Overheating' },
  'engine-misfire': { cost: { min: 100, max: 500 }, time: '1-3 hours', name: 'Engine Misfire' },
  'spark-plug-issue': { cost: { min: 50, max: 200 }, time: '30-60 minutes', name: 'Spark Plug Issue' },
  'injector-failure': { cost: { min: 200, max: 800 }, time: '2-4 hours', name: 'Fuel Injector Failure' },
  'fuel-pump-failure': { cost: { min: 300, max: 1000 }, time: '2-4 hours', name: 'Fuel Pump Failure' },
  'timing-belt-issue': { cost: { min: 500, max: 1500 }, time: '4-8 hours', name: 'Timing Belt Issue' },
  'turbo-failure': { cost: { min: 1000, max: 3000 }, time: '4-8 hours', name: 'Turbocharger Failure' },
  'low-oil-pressure': { cost: { min: 50, max: 2000 }, time: '1-6 hours', name: 'Low Oil Pressure' },
  'brake-failure': { cost: { min: 200, max: 1000 }, time: '2-4 hours', name: 'Brake System Failure' },
  'abs-light': { cost: { min: 100, max: 800 }, time: '1-3 hours', name: 'ABS Warning' },
  'brake-pad-worn': { cost: { min: 100, max: 400 }, time: '1-2 hours', name: 'Worn Brake Pads' },
  'brake-fluid-leak': { cost: { min: 100, max: 500 }, time: '1-3 hours', name: 'Brake Fluid Leak' },
  'radiator-leak': { cost: { min: 200, max: 800 }, time: '2-4 hours', name: 'Radiator Leak' },
  'coolant-leak': { cost: { min: 100, max: 600 }, time: '1-4 hours', name: 'Coolant Leak' },
  'thermostat-failure': { cost: { min: 100, max: 400 }, time: '1-2 hours', name: 'Thermostat Failure' },
  'water-pump-failure': { cost: { min: 300, max: 800 }, time: '3-5 hours', name: 'Water Pump Failure' },
  'transmission-slipping': { cost: { min: 500, max: 3000 }, time: '4-8 hours', name: 'Transmission Slipping' },
  'gear-wont-shift': { cost: { min: 200, max: 2000 }, time: '2-6 hours', name: 'Gear Shifting Issues' },
  'clutch-failure': { cost: { min: 500, max: 1500 }, time: '4-8 hours', name: 'Clutch Failure' },
  'transmission-fluid-leak': { cost: { min: 100, max: 500 }, time: '1-3 hours', name: 'Transmission Fluid Leak' },
  'check-engine-light': { cost: { min: 50, max: 1000 }, time: '1-4 hours', name: 'Check Engine Light' },
  'battery-warning-light': { cost: { min: 100, max: 500 }, time: '30-90 minutes', name: 'Battery Warning' },
  'fuse-blown': { cost: { min: 5, max: 50 }, time: '15-30 minutes', name: 'Blown Fuse' },
  'horn-failure': { cost: { min: 50, max: 200 }, time: '30-60 minutes', name: 'Horn Failure' },
  'wiper-failure': { cost: { min: 30, max: 150 }, time: '30-60 minutes', name: 'Wiper Failure' },
  'window-motor-issue': { cost: { min: 100, max: 400 }, time: '1-2 hours', name: 'Window Motor Issue' },
  'power-steering-failure': { cost: { min: 300, max: 1500 }, time: '2-6 hours', name: 'Power Steering Failure' },
  'suspension-noise': { cost: { min: 100, max: 800 }, time: '2-4 hours', name: 'Suspension Noise' },
  'wheel-bearing-noise': { cost: { min: 200, max: 600 }, time: '2-4 hours', name: 'Wheel Bearing Noise' },
  'steering-vibration': { cost: { min: 50, max: 500 }, time: '1-3 hours', name: 'Steering Vibration' },
  'hybrid-system-failure': { cost: { min: 500, max: 5000 }, time: '2-8 hours', name: 'Hybrid System Failure' },
  'electric-motor-failure': { cost: { min: 1000, max: 8000 }, time: '4-12 hours', name: 'Electric Motor Failure' },
  'charging-error': { cost: { min: 100, max: 2000 }, time: '1-4 hours', name: 'Charging Error' },
  'high-voltage-battery-fault': { cost: { min: 2000, max: 15000 }, time: '4-16 hours', name: 'HV Battery Fault' },
  'bms-error': { cost: { min: 500, max: 3000 }, time: '2-6 hours', name: 'BMS Error' },
  'inverter-failure': { cost: { min: 1000, max: 5000 }, time: '4-8 hours', name: 'Inverter Failure' },
  'charging-port-fault': { cost: { min: 200, max: 1000 }, time: '1-3 hours', name: 'Charging Port Fault' },
  'dc-converter-failure': { cost: { min: 500, max: 2000 }, time: '2-6 hours', name: 'DC Converter Failure' },
  'airbag-warning': { cost: { min: 200, max: 1500 }, time: '1-4 hours', name: 'Airbag Warning' },
  'door-lock-issue': { cost: { min: 50, max: 300 }, time: '1-2 hours', name: 'Door Lock Issue' },
  'headlight-issue': { cost: { min: 20, max: 300 }, time: '30-60 minutes', name: 'Headlight Issue' },
  'tail-light-issue': { cost: { min: 15, max: 200 }, time: '20-45 minutes', name: 'Tail Light Issue' },
  'tyre-puncture': { cost: { min: 10, max: 50 }, time: '20-40 minutes', name: 'Tyre Puncture' },
  'flat-tyre': { cost: { min: 50, max: 200 }, time: '30-60 minutes', name: 'Flat Tyre' },
  'ac-not-cooling': { cost: { min: 100, max: 800 }, time: '1-4 hours', name: 'AC Not Cooling' },
  'heater-failure': { cost: { min: 100, max: 500 }, time: '1-3 hours', name: 'Heater Failure' },
  'exhaust-leak': { cost: { min: 100, max: 600 }, time: '1-4 hours', name: 'Exhaust Leak' },
  'fuel-leak': { cost: { min: 100, max: 800 }, time: '1-4 hours', name: 'Fuel Leak' },
  'oil-leak': { cost: { min: 100, max: 1000 }, time: '1-6 hours', name: 'Oil Leak' },
  'catalytic-converter-failure': { cost: { min: 500, max: 2500 }, time: '2-4 hours', name: 'Catalytic Converter Failure' },
};

/**
 * Extract keywords from user symptom description
 */
function extractKeywords(text: string): string[] {
  const normalized = text.toLowerCase().trim();
  const keywords: string[] = [];
  
  // Check multi-word phrases first (longer matches take priority)
  const sortedPhrases = Object.keys(SYMPTOM_FAULT_MAP).sort((a, b) => b.length - a.length);
  
  for (const phrase of sortedPhrases) {
    if (normalized.includes(phrase)) {
      keywords.push(phrase);
    }
  }
  
  return keywords;
}

/**
 * Calculate fault confidence scores based on symptom matches
 */
function calculateFaultScores(
  keywords: string[],
  warningLights: string[],
  fuelType: string
): Map<string, number> {
  const scores = new Map<string, number>();
  
  // Score from symptom keywords
  for (const keyword of keywords) {
    const mapping = SYMPTOM_FAULT_MAP[keyword];
    if (mapping) {
      for (const faultSlug of mapping.faultSlugs) {
        const currentScore = scores.get(faultSlug) || 0;
        // Each matching keyword adds confidence, but with diminishing returns
        const addition = mapping.confidence * (currentScore === 0 ? 1 : 0.3);
        scores.set(faultSlug, Math.min(currentScore + addition, 98));
      }
    }
  }
  
  // Boost scores from warning lights
  for (const light of warningLights) {
    const faultSlugs = WARNING_LIGHT_FAULT_MAP[light];
    if (faultSlugs) {
      for (const faultSlug of faultSlugs) {
        const currentScore = scores.get(faultSlug) || 0;
        scores.set(faultSlug, Math.min(currentScore + 15, 98));
      }
    }
  }
  
  // Adjust for EV/Hybrid specific faults
  const isEV = fuelType === 'Electric';
  const isHybrid = fuelType === 'Hybrid';
  
  for (const [faultSlug, score] of scores) {
    const isEVFault = faultSlug.includes('charging') || faultSlug.includes('inverter') || 
                       faultSlug.includes('bms') || faultSlug.includes('dc-converter') ||
                       faultSlug.includes('electric-motor') || faultSlug.includes('high-voltage');
    const isHybridFault = faultSlug.includes('hybrid');
    const isICEFault = faultSlug.includes('spark-plug') || faultSlug.includes('injector') ||
                        faultSlug.includes('turbo') || faultSlug.includes('timing-belt') ||
                        faultSlug.includes('clutch') || faultSlug.includes('exhaust');
    
    if (isEV && isICEFault) {
      scores.set(faultSlug, score * 0.1); // Greatly reduce ICE faults for EVs
    } else if (isEV && isEVFault) {
      scores.set(faultSlug, Math.min(score * 1.3, 98)); // Boost EV faults for EVs
    } else if (!isEV && !isHybrid && (isEVFault || isHybridFault)) {
      scores.set(faultSlug, score * 0.1); // Reduce EV/Hybrid faults for ICE vehicles
    } else if (isHybrid && isHybridFault) {
      scores.set(faultSlug, Math.min(score * 1.3, 98)); // Boost hybrid faults for hybrids
    }
  }
  
  return scores;
}

/**
 * Determine overall urgency based on identified faults
 */
function determineUrgency(faultSlugs: string[]): UrgencyLevel {
  for (const slug of faultSlugs) {
    if (CRITICAL_FAULTS.has(slug)) return 'Critical';
  }
  for (const slug of faultSlugs) {
    if (HIGH_URGENCY_FAULTS.has(slug)) return 'High';
  }
  for (const slug of faultSlugs) {
    if (!LOW_URGENCY_FAULTS.has(slug)) return 'Medium';
  }
  return 'Low';
}

/**
 * Determine if the vehicle can be driven
 */
function canDrive(faultSlugs: string[]): { canDrive: boolean; note: string } {
  const noDriveFaults = [
    'brake-failure', 'brake-fluid-leak', 'engine-overheating',
    'fuel-leak', 'power-steering-failure', 'high-voltage-battery-fault',
    'flat-tyre', 'timing-belt-issue',
  ];
  
  const shortDistanceFaults = [
    'coolant-leak', 'radiator-leak', 'low-oil-pressure', 'oil-leak',
    'transmission-slipping', 'alternator-failure', 'water-pump-failure',
    'abs-light', 'hybrid-system-failure',
  ];
  
  for (const slug of faultSlugs) {
    if (noDriveFaults.includes(slug)) {
      return { canDrive: false, note: 'Do NOT drive the vehicle. This fault poses a serious safety risk. Call for towing assistance immediately.' };
    }
  }
  
  for (const slug of faultSlugs) {
    if (shortDistanceFaults.includes(slug)) {
      return { canDrive: true, note: 'You may drive a very short distance (under 5 km) to the nearest safe location or mechanic, but avoid highways and drive slowly. Monitor the situation closely.' };
    }
  }
  
  return { canDrive: true, note: 'The vehicle should be safe to drive to a mechanic, but get the issue checked as soon as possible.' };
}

/**
 * Generate recommendations based on diagnosis
 */
function generateRecommendations(faultSlugs: string[], urgency: UrgencyLevel): string[] {
  const recommendations: string[] = [];
  
  if (urgency === 'Critical') {
    recommendations.push('🚨 Stop driving immediately and pull over to a safe location');
    recommendations.push('📞 Call for emergency roadside assistance or towing');
    recommendations.push('⚠️ Turn on hazard lights and stay away from traffic');
  } else if (urgency === 'High') {
    recommendations.push('🔧 Visit a mechanic as soon as possible — ideally today');
    recommendations.push('📋 Avoid long drives until the issue is resolved');
  } else if (urgency === 'Medium') {
    recommendations.push('📅 Schedule a mechanic visit within the next few days');
    recommendations.push('👀 Monitor the issue — if it worsens, stop driving');
  } else {
    recommendations.push('📅 Schedule a repair at your convenience');
    recommendations.push('💡 This is a non-urgent issue but should still be addressed');
  }
  
  // Fault-specific recommendations
  if (faultSlugs.includes('battery-dead')) {
    recommendations.push('🔋 Try jump-starting the vehicle with jumper cables or a portable jump starter');
  }
  if (faultSlugs.includes('tyre-puncture') || faultSlugs.includes('flat-tyre')) {
    recommendations.push('🔧 Use the spare tyre if available, or call for tyre service');
  }
  if (faultSlugs.some(s => s.includes('charging'))) {
    recommendations.push('⚡ Check if your charging cable and charging station are functioning correctly');
  }
  
  recommendations.push('📱 Use our Roadside Assistance feature to find nearby help');
  
  return recommendations;
}

/**
 * Main diagnosis function — the core of the local AI engine
 */
export function diagnose(input: DiagnosisInput): DiagnosisResult {
  // Extract keywords from symptoms
  const keywords = extractKeywords(input.symptoms);
  
  // Calculate fault scores
  const faultScores = calculateFaultScores(keywords, input.warningLights, input.fuelType);
  
  // Sort by confidence and take top results
  const sortedFaults = Array.from(faultScores.entries())
    .filter(([, score]) => score > 10) // Filter out very low confidence
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5); // Top 5 faults
  
  // Build diagnosis faults
  const possibleFaults: DiagnosisFault[] = sortedFaults.map(([slug, confidence]) => {
    const estimate = FAULT_ESTIMATES[slug];
    const urgency = CRITICAL_FAULTS.has(slug) ? 'Critical' as UrgencyLevel :
                     HIGH_URGENCY_FAULTS.has(slug) ? 'High' as UrgencyLevel :
                     LOW_URGENCY_FAULTS.has(slug) ? 'Low' as UrgencyLevel : 'Medium' as UrgencyLevel;
    
    return {
      faultSlug: slug,
      faultName: estimate?.name || slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      confidence: Math.round(confidence),
      description: `Based on the symptoms you described, this could be a ${(estimate?.name || slug).toLowerCase()} issue.`,
      urgency,
      estimatedCost: estimate?.cost || { min: 100, max: 500 },
    };
  });
  
  // If no faults found, provide a generic response
  if (possibleFaults.length === 0) {
    possibleFaults.push({
      faultSlug: 'general-inspection',
      faultName: 'General Inspection Recommended',
      confidence: 50,
      description: 'Based on the information provided, we recommend a professional inspection to properly diagnose the issue.',
      urgency: 'Medium',
      estimatedCost: { min: 50, max: 150 },
    });
  }
  
  const topFaultSlugs = possibleFaults.map(f => f.faultSlug);
  const urgency = determineUrgency(topFaultSlugs);
  const driveAssessment = canDrive(topFaultSlugs);
  const recommendations = generateRecommendations(topFaultSlugs, urgency);
  
  // Calculate aggregate cost range
  const totalMinCost = Math.min(...possibleFaults.map(f => f.estimatedCost.min));
  const totalMaxCost = Math.max(...possibleFaults.map(f => f.estimatedCost.max));
  
  // Estimate total time from primary fault
  const primaryEstimate = FAULT_ESTIMATES[topFaultSlugs[0]];
  
  return {
    possibleFaults,
    urgency,
    canDrive: driveAssessment.canDrive,
    canDriveNote: driveAssessment.note,
    needsTowing: !driveAssessment.canDrive,
    needsMechanic: urgency !== 'Low',
    needsEmergency: urgency === 'Critical',
    recommendations,
    estimatedCost: { min: totalMinCost, max: totalMaxCost },
    estimatedTime: primaryEstimate?.time || '1-4 hours',
  };
}

/**
 * Generate AI-like introductory messages for the chat flow
 */
export function getGreetingMessage(): string {
  return "👋 Hello! I'm your AutoAid AI diagnostic assistant. I'll help you identify what might be wrong with your vehicle. Let's start by gathering some information about your vehicle and the issue you're experiencing.";
}

export function getFollowUpQuestions(step: number): string {
  const questions = [
    "What vehicle do you have? Please select the brand and model.",
    "What year is your vehicle?",
    "What's the approximate mileage on your vehicle?",
    "What type of fuel does your vehicle use?",
    "Are any warning lights currently on? Select all that apply.",
    "Please describe what's happening with your vehicle. Include any sounds, smells, or behaviors you've noticed.",
  ];
  return questions[step] || questions[questions.length - 1];
}
