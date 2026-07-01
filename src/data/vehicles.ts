import type { Vehicle, BodyType, FuelType } from '@/types';

export const vehicles: Vehicle[] = [
  {
    id: 'toyota-camry-2024',
    slug: 'toyota-camry-2024',
    imageUrl: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=80&w=800',
    brand: 'Toyota',
    model: 'Camry',
    year: 2024,
    bodyType: 'Sedan',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    drivetrain: 'FWD',
    engine: {
      type: '2.5L 4-Cylinder DOHC',
      displacement: 2487,
      cylinders: 4,
      fuelSystem: 'Direct & Port Injection',
      turbo: false
    },
    performance: {
      horsepower: 203,
      torque: 250,
      topSpeed: 210,
      acceleration: 7.6,
      fuelEconomy: 7.1
    },
    safetyRating: 5,
    price: { min: 26420, max: 36845 },
    commonFaults: [
      'transmission-slipping',
      'coolant-leak',
      'engine-misfire',
      'brake-pad-worn',
      'alternator-failure'
    ],
    maintenanceSchedule: [
      { task: 'Engine Oil & Filter Change', intervalKm: 10000, intervalMonths: 6, estimatedCost: { min: 60, max: 120 }, difficulty: 'Easy' },
      { task: 'Tire Rotation & Brake Inspection', intervalKm: 10000, intervalMonths: 6, estimatedCost: { min: 40, max: 80 }, difficulty: 'Easy' },
      { task: 'Cabin & Engine Air Filter Replacement', intervalKm: 30000, intervalMonths: 18, estimatedCost: { min: 50, max: 100 }, difficulty: 'Easy' },
      { task: 'Automatic Transmission Fluid Flush', intervalKm: 100000, intervalMonths: 60, estimatedCost: { min: 200, max: 350 }, difficulty: 'Medium' }
    ],
    description: 'A benchmark in midsize sedans, the 2024 Toyota Camry combines everyday comfort with dependable mechanics, outstanding fuel economy, and strong resale value.',
    features: ['Toyota Safety Sense 2.5+', '9-inch Touchscreen Display', 'Apple CarPlay & Android Auto', 'Dual-Zone Climate Control']
  },
  {
    id: 'tesla-model-3-2024',
    slug: 'tesla-model-3-2024',
    imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800',
    brand: 'Tesla',
    model: 'Model 3',
    year: 2024,
    bodyType: 'Sedan',
    fuelType: 'Electric',
    transmission: 'Single Speed',
    drivetrain: 'RWD',
    engine: {
      type: 'AC Permanent Magnet Motor',
      batteryCapacity: 60,
      motorPower: 208,
      range: 438
    },
    performance: {
      horsepower: 272,
      torque: 420,
      topSpeed: 201,
      acceleration: 5.8,
      fuelEconomy: 14.4
    },
    safetyRating: 5,
    price: { min: 38990, max: 50990 },
    commonFaults: [
      'charging-error',
      'window-motor-issue',
      'charging-port-fault',
      'bms-error',
      'door-lock-issue'
    ],
    maintenanceSchedule: [
      { task: 'Cabin Air Filter Replacement', intervalKm: 20000, intervalMonths: 12, estimatedCost: { min: 50, max: 90 }, difficulty: 'Easy' },
      { task: 'Brake Fluid Test & Flush', intervalKm: 40000, intervalMonths: 24, estimatedCost: { min: 100, max: 180 }, difficulty: 'Medium' },
      { task: 'Air Conditioning Service (Desiccant Bag)', intervalKm: 80000, intervalMonths: 48, estimatedCost: { min: 150, max: 250 }, difficulty: 'Hard' }
    ],
    description: 'The redefined Highland update of the Tesla Model 3 brings quieter interior acoustics, upgraded premium suspension materials, and optimized aerodynamic efficiency.',
    features: ['Autopilot', '15.4-inch Center Touchscreen', '8-inch Rear Display', 'Premium 17-Speaker Audio']
  },
  {
    id: 'toyota-prius-2024',
    slug: 'toyota-prius-2024',
    imageUrl: 'https://images.unsplash.com/photo-1503376794736-73f1a5bd89e2?auto=format&fit=crop&q=80&w=800',
    brand: 'Toyota',
    model: 'Prius',
    year: 2024,
    bodyType: 'Sedan',
    fuelType: 'Hybrid',
    transmission: 'CVT',
    drivetrain: 'FWD',
    engine: {
      type: '2.0L 4-Cylinder Hybrid System',
      displacement: 1987,
      cylinders: 4,
      fuelSystem: 'Direct & Port Injection',
      turbo: false
    },
    performance: {
      horsepower: 194,
      torque: 188,
      topSpeed: 180,
      acceleration: 7.2,
      fuelEconomy: 4.1
    },
    safetyRating: 5,
    price: { min: 27650, max: 36065 },
    commonFaults: [
      'hybrid-system-failure',
      'brake-pad-worn',
      'fuse-blown',
      'wiper-failure',
      'coolant-leak'
    ],
    maintenanceSchedule: [
      { task: 'Engine Oil & Filter Change', intervalKm: 10000, intervalMonths: 6, estimatedCost: { min: 70, max: 130 }, difficulty: 'Easy' },
      { task: 'Hybrid Cooling System Dust Filter Cleaning', intervalKm: 20000, intervalMonths: 12, estimatedCost: { min: 30, max: 70 }, difficulty: 'Easy' },
      { task: 'Inverter Coolant Replacement', intervalKm: 150000, intervalMonths: 96, estimatedCost: { min: 180, max: 280 }, difficulty: 'Hard' }
    ],
    description: 'The award-winning 2024 Toyota Prius sheds its quirky styling for a sleek, modern fastback design, while improving on its iconic efficiency metrics.',
    features: ['Toyota Safety Sense 3.0', 'Electronic On-Demand AWD', '12.3-inch Multimedia Display', 'Panoramic View Monitor']
  },
  {
    id: 'bmw-3-series-2024',
    slug: 'bmw-3-series-2024',
    imageUrl: 'https://images.unsplash.com/photo-1502877338535-34cb0ca2305a?auto=format&fit=crop&q=80&w=800',
    brand: 'BMW',
    model: '3 Series',
    year: 2024,
    bodyType: 'Sedan',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    drivetrain: 'RWD',
    engine: {
      type: '2.0L TwinPower Turbo inline 4',
      displacement: 1998,
      cylinders: 4,
      fuelSystem: 'Direct Injection',
      turbo: true
    },
    performance: {
      horsepower: 255,
      torque: 400,
      topSpeed: 250,
      acceleration: 5.6,
      fuelEconomy: 7.8
    },
    safetyRating: 5,
    price: { min: 44500, max: 62000 },
    commonFaults: [
      'oil-leak',
      'coolant-leak',
      'starter-motor-failure',
      'check-engine-light',
      'wheel-bearing-noise'
    ],
    maintenanceSchedule: [
      { task: 'Engine Oil & Microfilter Change', intervalKm: 12000, intervalMonths: 12, estimatedCost: { min: 120, max: 220 }, difficulty: 'Easy' },
      { task: 'Spark Plugs Replacement', intervalKm: 60000, intervalMonths: 36, estimatedCost: { min: 180, max: 300 }, difficulty: 'Medium' },
      { task: 'Brake Rotor & Brake Pad Replacement', intervalKm: 50000, intervalMonths: 24, estimatedCost: { min: 400, max: 750 }, difficulty: 'Medium' }
    ],
    description: 'Representing sport luxury, the G20-generation 3 Series features crisp handling dynamics, class-leading engine tuning, and premium interior luxury.',
    features: ['BMW Curved Display', 'iDrive 8 Operating System', 'Adaptive M Suspension', 'Parking Assistant Plus']
  },
  {
    id: 'ford-f-150-2024',
    slug: 'ford-f-150-2024',
    imageUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=800',
    brand: 'Ford',
    model: 'F-150',
    year: 2024,
    bodyType: 'Pickup',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    drivetrain: '4WD',
    engine: {
      type: '3.5L EcoBoost V6',
      displacement: 3497,
      cylinders: 6,
      fuelSystem: 'Direct & Port Injection',
      turbo: true
    },
    performance: {
      horsepower: 400,
      torque: 678,
      topSpeed: 180,
      acceleration: 5.4,
      fuelEconomy: 11.8
    },
    safetyRating: 5,
    price: { min: 36570, max: 77800 },
    commonFaults: [
      'spark-plug-issue',
      'turbo-failure',
      'alternator-failure',
      'steering-vibration',
      'injector-failure'
    ],
    maintenanceSchedule: [
      { task: 'Engine Oil, Filter Change & Multi-Point Inspection', intervalKm: 12000, intervalMonths: 6, estimatedCost: { min: 80, max: 150 }, difficulty: 'Easy' },
      { task: 'Transfer Case Fluid Replacement', intervalKm: 50000, intervalMonths: 24, estimatedCost: { min: 150, max: 250 }, difficulty: 'Medium' },
      { task: 'Front & Rear Axle Fluid Flush', intervalKm: 80000, intervalMonths: 48, estimatedCost: { min: 250, max: 400 }, difficulty: 'Medium' }
    ],
    description: 'The best-selling vehicle in North America continues to set standards. The 2024 F-150 boasts robust towing capacities, high utility smart features, and optional hybrid powertrains.',
    features: ['Pro Power Onboard', 'SYNC 4 with 12-inch screen', 'Co-Pilot360 Assist 2.0', 'Power Tailgate']
  },
  {
    id: 'toyota-rav4-2024',
    slug: 'toyota-rav4-2024',
    imageUrl: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=800',
    brand: 'Toyota',
    model: 'RAV4',
    year: 2024,
    bodyType: 'SUV',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    drivetrain: 'AWD',
    engine: {
      type: '2.5L 4-Cylinder Dynamic Force',
      displacement: 2487,
      cylinders: 4,
      fuelSystem: 'Direct & Port Injection',
      turbo: false
    },
    performance: {
      horsepower: 203,
      torque: 243,
      topSpeed: 190,
      acceleration: 8.0,
      fuelEconomy: 8.4
    },
    safetyRating: 5,
    price: { min: 28675, max: 38300 },
    commonFaults: [
      'brake-pad-worn',
      'suspension-noise',
      'door-lock-issue',
      'battery-dead',
      'spark-plug-issue'
    ],
    maintenanceSchedule: [
      { task: 'Engine Oil & Filter Change', intervalKm: 10000, intervalMonths: 6, estimatedCost: { min: 60, max: 120 }, difficulty: 'Easy' },
      { task: 'Tire Rotation & Balance', intervalKm: 10000, intervalMonths: 6, estimatedCost: { min: 30, max: 60 }, difficulty: 'Easy' },
      { task: 'Brake Fluid Flush', intervalKm: 40000, intervalMonths: 24, estimatedCost: { min: 100, max: 180 }, difficulty: 'Medium' }
    ],
    description: 'Blending rugged looks with car-like manners, the 2024 RAV4 is highly practical, spacious, and reliable, maintaining its spot as a leading crossover SUV.',
    features: ['Toyota Safety Sense 2.5', 'Dual Chrome Exhaust Tips', 'Connected Services Capable', 'AWD Integrated Management']
  },
  {
    id: 'royal-enfield-classic-350-2024',
    slug: 'royal-enfield-classic-350-2024',
    imageUrl: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&q=80&w=800',
    brand: 'Royal Enfield',
    model: 'Classic 350',
    year: 2024,
    bodyType: 'Motorcycle',
    fuelType: 'Petrol',
    transmission: 'Manual',
    drivetrain: 'Chain Drive',
    engine: {
      type: 'J-Series Single Cylinder SOHC',
      displacement: 349,
      cylinders: 1,
      fuelSystem: 'Electronic Fuel Injection',
      turbo: false
    },
    performance: {
      horsepower: 20,
      torque: 27,
      topSpeed: 114,
      acceleration: 15.0,
      fuelEconomy: 2.8
    },
    safetyRating: 4,
    price: { min: 4600, max: 5500 },
    commonFaults: [
      'battery-dead',
      'clutch-failure',
      'fuse-blown',
      'suspension-noise'
    ],
    maintenanceSchedule: [
      { task: 'Engine Oil & Filter Replacement', intervalKm: 5000, intervalMonths: 6, estimatedCost: { min: 30, max: 60 }, difficulty: 'Easy' },
      { task: 'Chain Adjusting, Lubrication & Tightening', intervalKm: 1000, intervalMonths: 2, estimatedCost: { min: 10, max: 25 }, difficulty: 'Easy' },
      { task: 'Spark Plug Inspection & Cleaning', intervalKm: 10000, intervalMonths: 12, estimatedCost: { min: 15, max: 35 }, difficulty: 'Easy' },
      { task: 'Valve Clearance Adjustments', intervalKm: 10000, intervalMonths: 12, estimatedCost: { min: 60, max: 120 }, difficulty: 'Medium' }
    ],
    description: 'Timeless retro design meets modern manufacturing reliability. Re-engineered on Royal Enfield\'s new J-platform, it delivers a smooth thump and steady handling.',
    features: ['Retro Styling', 'Dual Channel ABS', 'Digital Analog Instrument Cluster', 'Tripper Navigation Pod']
  },
  {
    id: 'yamaha-mt-15-2024',
    slug: 'yamaha-mt-15-2024',
    imageUrl: 'https://images.unsplash.com/photo-1485291571150-772bcfc10da5?auto=format&fit=crop&q=80&w=800',
    brand: 'Yamaha',
    model: 'MT-15',
    year: 2024,
    bodyType: 'Motorcycle',
    fuelType: 'Petrol',
    transmission: 'Manual',
    drivetrain: 'Chain Drive',
    engine: {
      type: 'Liquid Cooled 4V SOHC VVA',
      displacement: 155,
      cylinders: 1,
      fuelSystem: 'Fuel Injection',
      turbo: false
    },
    performance: {
      horsepower: 18,
      torque: 14,
      topSpeed: 130,
      acceleration: 11.4,
      fuelEconomy: 2.1
    },
    safetyRating: 4,
    price: { min: 2200, max: 2500 },
    commonFaults: [
      'clutch-failure',
      'fuse-blown',
      'battery-dead',
      'wheel-bearing-noise'
    ],
    maintenanceSchedule: [
      { task: 'Engine Oil & Oil Filter Change', intervalKm: 3000, intervalMonths: 3, estimatedCost: { min: 25, max: 50 }, difficulty: 'Easy' },
      { task: 'Spark Plug Clean & Gap Adjustment', intervalKm: 6000, intervalMonths: 6, estimatedCost: { min: 10, max: 20 }, difficulty: 'Easy' },
      { task: 'Drive Chain Clean & Lube', intervalKm: 500, intervalMonths: 1, estimatedCost: { min: 5, max: 15 }, difficulty: 'Easy' }
    ],
    description: 'Nicknamed the "Dark Warrior," the MT-15 features Yamaha\'s aggressive streetfighter styling, responsive handling, and high-revving VVA engine.',
    features: ['Variable Valve Actuation', 'Assist & Slipper Clutch', 'Upside Down Front Forks', 'Traction Control System']
  },
  {
    id: 'vespa-150-2024',
    slug: 'vespa-150-2024',
    imageUrl: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=80&w=800',
    brand: 'Vespa',
    model: '150',
    year: 2024,
    bodyType: 'Scooter',
    fuelType: 'Petrol',
    transmission: 'CVT',
    drivetrain: 'Belt Drive',
    engine: {
      type: 'Single Cylinder 3V i-Get',
      displacement: 150,
      cylinders: 1,
      fuelSystem: 'Electronic Injection',
      turbo: false
    },
    performance: {
      horsepower: 12,
      torque: 12,
      topSpeed: 95,
      acceleration: 14.5,
      fuelEconomy: 2.5
    },
    safetyRating: 3,
    price: { min: 4500, max: 5500 },
    commonFaults: [
      'battery-dead',
      'fuse-blown',
      'tyre-puncture',
      'brake-pad-worn'
    ],
    maintenanceSchedule: [
      { task: 'Engine Oil & Gear Oil Change', intervalKm: 5000, intervalMonths: 6, estimatedCost: { min: 30, max: 60 }, difficulty: 'Easy' },
      { task: 'Drive Belt & Rollers Inspection', intervalKm: 10000, intervalMonths: 12, estimatedCost: { min: 80, max: 150 }, difficulty: 'Medium' },
      { task: 'Spark Plug Change', intervalKm: 10000, intervalMonths: 12, estimatedCost: { min: 10, max: 25 }, difficulty: 'Easy' }
    ],
    description: 'Vespa represents the iconic Italian scooter design. Combining monocoque steel construction with advanced environmental i-Get engines for classic elegance.',
    features: ['Full Steel Body', 'ABS Front Brake System', 'LED Headlamp & Tail Light', 'USB Charging Port']
  },
  {
    id: 'isuzu-npr-2024',
    slug: 'isuzu-npr-2024',
    imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800',
    brand: 'Isuzu',
    model: 'NPR',
    year: 2024,
    bodyType: 'Truck',
    fuelType: 'Diesel',
    transmission: 'Automatic',
    drivetrain: 'RWD',
    engine: {
      type: '5.2L Turbo-Diesel Inline 4',
      displacement: 5193,
      cylinders: 4,
      fuelSystem: 'Common Rail Direct Injection',
      turbo: true
    },
    performance: {
      horsepower: 215,
      torque: 613,
      topSpeed: 120,
      acceleration: 16.0,
      fuelEconomy: 14.5
    },
    safetyRating: 4,
    price: { min: 48000, max: 58000 },
    commonFaults: [
      'low-oil-pressure',
      'coolant-leak',
      'starter-motor-failure',
      'brake-fluid-leak',
      'alternator-failure'
    ],
    maintenanceSchedule: [
      { task: 'Engine Oil & Oil Filter Change', intervalKm: 15000, intervalMonths: 6, estimatedCost: { min: 120, max: 200 }, difficulty: 'Easy' },
      { task: 'Fuel Filter Element Replacement', intervalKm: 30000, intervalMonths: 12, estimatedCost: { min: 60, max: 110 }, difficulty: 'Easy' },
      { task: 'DPF Regeneration & Diagnostic Test', intervalKm: 50000, intervalMonths: 24, estimatedCost: { min: 100, max: 250 }, difficulty: 'Medium' }
    ],
    description: 'The Isuzu NPR is the industry standard for light-duty commercial cab-over trucks, offering immense carrying capacity, exceptional reliability, and excellent driver visibility.',
    features: ['Cab-Over-Engine Design', 'Hexapod Cabin Architecture', 'Dual airbags', 'Advanced Driver Assist System']
  }
];

export function getVehicleBySlug(slug: string): Vehicle | undefined {
  return vehicles.find(v => v.slug === slug);
}

export function getVehiclesByBrand(brand: string): Vehicle[] {
  return vehicles.filter(v => v.brand.toLowerCase() === brand.toLowerCase());
}

export function getVehiclesByType(type: BodyType): Vehicle[] {
  return vehicles.filter(v => v.bodyType === type);
}

export function getVehiclesByFuel(fuel: FuelType): Vehicle[] {
  return vehicles.filter(v => v.fuelType === fuel);
}

export function getAllBrandsFromVehicles(): string[] {
  return Array.from(new Set(vehicles.map(v => v.brand))).sort();
}

export function getAllBodyTypes(): BodyType[] {
  return Array.from(new Set(vehicles.map(v => v.bodyType))).sort();
}
