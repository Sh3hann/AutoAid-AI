/* ============================================
   AutoAid AI — TypeScript Type Definitions
   ============================================ */

/** Vehicle fuel types */
export type FuelType = 'Petrol' | 'Diesel' | 'Hybrid' | 'Electric' | 'CNG' | 'LPG';

/** Vehicle body types */
export type BodyType = 'Sedan' | 'SUV' | 'Hatchback' | 'Coupe' | 'Convertible' | 'Wagon' | 'Pickup' | 'Van' | 'Truck' | 'Bus' | 'Motorcycle' | 'Scooter' | 'Three Wheeler' | 'ATV' | 'Sports Car' | 'Minivan' | 'Crossover';

/** Transmission types */
export type TransmissionType = 'Automatic' | 'Manual' | 'CVT' | 'DCT' | 'AMT' | 'Single Speed';

/** Drivetrain types */
export type DrivetrainType = 'FWD' | 'RWD' | 'AWD' | '4WD' | 'Chain Drive' | 'Belt Drive' | 'Shaft Drive';

/** Vehicle category for quick cards */
export type VehicleCategory = 'Cars' | 'Bikes' | 'Hybrid' | 'Electric' | 'Truck' | 'Bus' | 'Scooter' | 'SUV';

/** Fault severity levels */
export type DifficultyLevel = 'Easy' | 'Medium' | 'Hard' | 'Expert';

/** Urgency levels for diagnosis */
export type UrgencyLevel = 'Low' | 'Medium' | 'High' | 'Critical';

/** Warning light severity */
export type WarningSeverity = 'Info' | 'Warning' | 'Critical';

/** Warning light color */
export type WarningColor = 'green' | 'blue' | 'amber' | 'red' | 'white';

/** Fault category */
export type FaultCategory = 'Engine' | 'Electrical' | 'Brakes' | 'Transmission' | 'Cooling' | 'Steering' | 'Suspension' | 'Body' | 'EV/Hybrid' | 'Exhaust' | 'Fuel' | 'HVAC' | 'Tyres' | 'Lights' | 'Safety';

/** Service category for roadside assistance */
export type ServiceCategory = 'Mechanic' | 'EV Repair' | 'Hybrid Specialist' | 'Bike Mechanic' | 'Towing' | 'Fuel Station' | 'Charging Station' | 'Tyre Shop' | 'Battery Shop' | 'Car Wash' | 'Inspection Center';

/* ============================================
   Brand
   ============================================ */

export interface Brand {
  id: string;
  name: string;
  slug: string;
  country: string;
  founded: number;
  vehicleTypes: BodyType[];
  description: string;
  logoColor: string;
}

/* ============================================
   Vehicle
   ============================================ */

export interface Vehicle {
  id: string;
  slug: string;
  imageUrl?: string;
  brand: string;
  model: string;
  year: number;
  bodyType: BodyType;
  fuelType: FuelType;
  transmission: TransmissionType;
  drivetrain: DrivetrainType;
  engine: EngineSpec;
  performance: PerformanceSpec;
  dimensions?: DimensionsSpec;
  safetyRating?: number; // 1-5 stars
  price?: { min: number; max: number };
  commonFaults: string[]; // fault slugs
  maintenanceSchedule: MaintenanceItem[];
  description: string;
  features: string[];
}

export interface EngineSpec {
  type: string; // e.g., "2.5L 4-Cylinder", "Electric Motor", etc.
  displacement?: number; // in cc
  cylinders?: number;
  fuelSystem?: string;
  turbo?: boolean;
  batteryCapacity?: number; // kWh for EVs
  motorPower?: number; // kW for EVs
  range?: number; // km for EVs
}

export interface PerformanceSpec {
  horsepower: number;
  torque: number; // Nm
  topSpeed?: number; // km/h
  acceleration?: number; // 0-100 km/h in seconds
  fuelEconomy?: number; // L/100km or kWh/100km
}

export interface DimensionsSpec {
  length: number;
  width: number;
  height: number;
  wheelbase: number;
  weight: number;
}

export interface MaintenanceItem {
  task: string;
  intervalKm: number;
  intervalMonths: number;
  estimatedCost: { min: number; max: number };
  difficulty: DifficultyLevel;
}

/* ============================================
   Fault
   ============================================ */

export interface Fault {
  id: string;
  slug: string;
  name: string;
  category: FaultCategory;
  description: string;
  symptoms: string[];
  possibleCauses: string[];
  difficulty: DifficultyLevel;
  estimatedCost: { min: number; max: number; currency: string };
  estimatedTime: string;
  toolsNeeded: string[];
  spareParts: SparePart[];
  canSelfRepair: 'Yes' | 'No' | 'Maybe';
  selfRepairCondition?: string;
  safetyWarning: string;
  repairSteps: RepairStep[];
  precautions: string[];
  whenNotToDrive: string;
  emergencyInstructions: string;
  applicableVehicleTypes: BodyType[];
  urgency: UrgencyLevel;
}

export interface SparePart {
  name: string;
  estimatedPrice: { min: number; max: number };
}

export interface RepairStep {
  step: number;
  title: string;
  description: string;
  warning?: string;
}

/* ============================================
   Warning Light
   ============================================ */

export interface WarningLight {
  id: string;
  name: string;
  slug: string;
  svgPath: string;
  color: WarningColor;
  severity: WarningSeverity;
  meaning: string;
  whatToDo: string;
  canDrive: boolean;
  canDriveNote?: string;
  category: string;
  relatedFaults: string[]; // fault slugs
}

/* ============================================
   Service Provider (Roadside Assistance)
   ============================================ */

export interface ServiceProvider {
  id: string;
  name: string;
  category: ServiceCategory;
  address: string;
  lat: number;
  lng: number;
  phone: string;
  rating: number;
  reviewCount: number;
  isOpen: boolean;
  hours: string;
  website?: string;
  services: string[];
  distance?: number;
}

/* ============================================
   AI Diagnosis
   ============================================ */

export interface DiagnosisInput {
  vehicleBrand: string;
  vehicleModel: string;
  vehicleYear: number;
  mileage?: number;
  fuelType: FuelType;
  warningLights: string[];
  symptoms: string;
  additionalInfo?: string;
}

export interface DiagnosisResult {
  possibleFaults: DiagnosisFault[];
  urgency: UrgencyLevel;
  canDrive: boolean;
  canDriveNote: string;
  needsTowing: boolean;
  needsMechanic: boolean;
  needsEmergency: boolean;
  recommendations: string[];
  estimatedCost: { min: number; max: number };
  estimatedTime: string;
}

export interface DiagnosisFault {
  faultSlug: string;
  faultName: string;
  confidence: number; // 0-100
  description: string;
  urgency: UrgencyLevel;
  estimatedCost: { min: number; max: number };
}

/* ============================================
   Chat Message
   ============================================ */

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  type?: 'text' | 'vehicle-select' | 'symptom-input' | 'warning-lights' | 'diagnosis-result' | 'voice';
  data?: DiagnosisInput | DiagnosisResult | string[];
}

/* ============================================
   Search
   ============================================ */

export interface SearchResult {
  type: 'vehicle' | 'fault' | 'brand' | 'warning-light' | 'obd-code';
  title: string;
  description: string;
  slug: string;
  url: string;
  icon?: string;
  category?: string;
}
