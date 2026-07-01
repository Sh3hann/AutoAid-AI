import type { WarningLight, WarningColor, WarningSeverity } from '@/types';

export const warningLights: WarningLight[] = [
  {
    id: 'check-engine',
    name: 'Check Engine',
    slug: 'check-engine',
    svgPath: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
    color: 'amber',
    severity: 'Warning',
    meaning: 'Indicates a problem detected within the engine control unit (ECU) relating to emissions, ignition, fuel systems, or sensors.',
    whatToDo: 'Read diagnostic trouble codes (DTCs) with an OBD-II scanner. Ensure fuel cap is tight. Schedule diagnostic check.',
    canDrive: true,
    canDriveNote: 'Safe to drive if the light is solid and vehicle runs normally. Do NOT drive if the light is flashing, which indicates a severe misfire.',
    category: 'Engine',
    relatedFaults: ['engine-misfire', 'spark-plug-issue', 'injector-failure', 'fuel-pump-failure']
  },
  {
    id: 'abs',
    name: 'Anti-lock Brake System (ABS)',
    slug: 'abs',
    svgPath: 'M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0-18v16m8-8H4',
    color: 'amber',
    severity: 'Warning',
    meaning: 'Fault detected in the anti-lock braking sensors or controller. Normal braking remains active, but emergency anti-skid protection is disabled.',
    whatToDo: 'Avoid hard emergency braking. Inspect wheel speed sensors for dirt or damage, check brake fluid levels.',
    canDrive: true,
    canDriveNote: 'Normal braking works, but ABS will not engage during panic stops. Drive carefully and get it checked.',
    category: 'Brakes',
    relatedFaults: ['abs-light', 'brake-failure']
  },
  {
    id: 'battery',
    name: 'Battery Charge Warning',
    slug: 'battery',
    svgPath: 'M3 7h18v12H3V7zm3-4h4v4H6V3zm8 0h4v4h-4V3zM6 13h4m4 0h4m-4-2v4',
    color: 'red',
    severity: 'Critical',
    meaning: 'The battery voltage has dropped below acceptable limits, or the alternator has failed to generate charging power.',
    whatToDo: 'Turn off all unnecessary electronics (radio, AC, heated seats). Find a safe location to park immediately.',
    canDrive: false,
    canDriveNote: 'The engine will run for only 15-30 minutes on battery reserve before stalling completely.',
    category: 'Electrical',
    relatedFaults: ['battery-dead', 'alternator-failure']
  },
  {
    id: 'oil',
    name: 'Engine Oil Pressure',
    slug: 'oil',
    svgPath: 'M19.453 10.158c-.5-.5-1.5-.7-2.3-.5-.4-.1-.8-.1-1.2 0-.8-.1-1.6.2-2.3.8-1 1-1 2.7 0 3.8.5.5 1.5.7 2.3.5.4.1.8.1 1.2 0 .8.1 1.6-.2 2.3-.8 1-1.1 1-2.8 0-3.8zM4 19h16v2H4v-2z',
    color: 'red',
    severity: 'Critical',
    meaning: 'Engine oil pressure has dropped below safe limits. Continued running will cause immediate metal-on-metal engine seizure.',
    whatToDo: 'Pull over safely and turn off the engine immediately. Check engine oil level. Top up if low. Do not start unless resolved.',
    canDrive: false,
    canDriveNote: 'Driving with low oil pressure will destroy your engine within seconds.',
    category: 'Engine',
    relatedFaults: ['low-oil-pressure', 'oil-leak']
  },
  {
    id: 'coolant',
    name: 'Engine Temperature Warning',
    slug: 'coolant',
    svgPath: 'M12 4v16m8-8H4M12 4c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4z',
    color: 'red',
    severity: 'Critical',
    meaning: 'The engine coolant temperature exceeds safe operating thresholds. Engine is overheating.',
    whatToDo: 'Pull over safely. Turn engine off. Let it cool for 30 minutes. Check coolant level in reservoir. Look for leaks.',
    canDrive: false,
    canDriveNote: 'Severe overheating will warp cylinder heads, destroy gaskets, and seize pistons.',
    category: 'Cooling',
    relatedFaults: ['engine-overheating', 'coolant-leak']
  },
  {
    id: 'tyre-pressure',
    name: 'Tire Pressure Warning (TPMS)',
    slug: 'tyre-pressure',
    svgPath: 'M12 18a6 6 0 100-12 6 6 0 000 12zM3 12h18',
    color: 'amber',
    severity: 'Warning',
    meaning: 'One or more tyres has dropped in air pressure by 25% or more below manufacturer recommendation.',
    whatToDo: 'Check air pressure of all tyres using a gauge. Inspect for punctures. Inflate to spec.',
    canDrive: true,
    canDriveNote: 'Drive slowly to the nearest air pump. Avoid high speeds and hard cornering.',
    category: 'Tyres',
    relatedFaults: ['tyre-puncture', 'flat-tyre']
  },
  {
    id: 'brake',
    name: 'Brake System Warning',
    slug: 'brake',
    svgPath: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z',
    color: 'red',
    severity: 'Critical',
    meaning: 'Brake fluid level is dangerously low, or the parking brake is engaged, or there is a hydraulic fault.',
    whatToDo: 'Verify parking brake is fully released. If light remains on, pull over. Check brake fluid level. If empty, tow.',
    canDrive: false,
    canDriveNote: 'You may have complete brake system failure or a spongy brake pedal. Do not risk driving.',
    category: 'Brakes',
    relatedFaults: ['brake-failure', 'brake-fluid-leak', 'brake-pad-worn']
  },
  {
    id: 'traction',
    name: 'Traction Control / ESC',
    slug: 'traction',
    svgPath: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z',
    color: 'amber',
    severity: 'Warning',
    meaning: 'Traction control system is actively stabilizing the vehicle (flashing), or there is a fault in the stability sensors (solid).',
    whatToDo: 'If solid, stability control is off. Drive carefully in wet or icy conditions. Check wheel sensors.',
    canDrive: true,
    canDriveNote: 'Drive cautiously, especially in bad weather. Stabilizing aids are disabled.',
    category: 'Safety',
    relatedFaults: ['steering-vibration']
  },
  {
    id: 'airbag',
    name: 'Airbag / SRS Warning',
    slug: 'airbag',
    svgPath: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z',
    color: 'red',
    severity: 'Critical',
    meaning: 'Fault detected in the Supplemental Restraint System (SRS). Airbags may not deploy in an accident.',
    whatToDo: 'Have the vehicle inspected immediately. Avoid taking passengers if possible.',
    canDrive: true,
    canDriveNote: 'Vehicle is drivable, but airbags will NOT inflate during a collision, making it highly unsafe.',
    category: 'Safety',
    relatedFaults: ['airbag-warning']
  },
  {
    id: 'ev-battery',
    name: 'EV High-Voltage Battery',
    slug: 'ev-battery',
    svgPath: 'M7 2v2H5v16h14V4h-2V2H7zm8 10h-2v4h-2v-4H9V10h2V6h2v4h2v2z',
    color: 'red',
    severity: 'Critical',
    meaning: 'High-voltage battery fault or thermal warning. Cell degradation or charge mismatch.',
    whatToDo: 'Safely pull over. Stop the vehicle. Do not charge. Get expert roadside EV assistance.',
    canDrive: false,
    canDriveNote: 'Driving can cause high-voltage fires or permanent battery cell destruction.',
    category: 'EV/Hybrid',
    relatedFaults: ['high-voltage-battery-fault', 'bms-error']
  },
  {
    id: 'hybrid-system',
    name: 'Hybrid System Fault',
    slug: 'hybrid-system',
    svgPath: 'M12 3v18M3 12h18M12 3a9 9 0 00-9 9 9 9 0 009 9 9 9 0 009-9 9 9 0 00-9-9z',
    color: 'amber',
    severity: 'Warning',
    meaning: 'Fault in the hybrid powertrain inverter, electric motor sync, or hybrid battery controls.',
    whatToDo: 'Limp to a safe area. Shut off engine. Check inverter coolant. Seek specialist inspection.',
    canDrive: true,
    canDriveNote: 'Vehicle may enter "Limp Mode" with severely reduced power. Drive slowly to a shop.',
    category: 'EV/Hybrid',
    relatedFaults: ['hybrid-system-failure', 'inverter-failure']
  }
];

export function getWarningLightBySlug(slug: string): WarningLight | undefined {
  return warningLights.find(wl => wl.slug === slug);
}

export function getWarningLightsByCategory(category: string): WarningLight[] {
  return warningLights.filter(wl => wl.category.toLowerCase() === category.toLowerCase());
}

export function getWarningLightsBySeverity(severity: WarningSeverity): WarningLight[] {
  return warningLights.filter(wl => wl.severity === severity);
}
