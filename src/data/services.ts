import type { ServiceProvider, ServiceCategory } from '@/types';

export const serviceProviders: ServiceProvider[] = [
  {
    id: 'prov-colombo-motors',
    name: 'Colombo Hybrid & EV Specialist',
    category: 'Hybrid Specialist',
    address: 'No. 45, Baseline Road, Colombo 08',
    lat: 6.9189,
    lng: 79.8778,
    phone: '+94 11 234 5678',
    rating: 4.8,
    reviewCount: 154,
    isOpen: true,
    hours: '8:00 AM - 6:00 PM',
    website: 'https://colombohybrid.lk',
    services: ['Battery Diagnostic', 'Cell Balancing', 'Inverter Repairs', 'Coolant Flush', 'General Tuning']
  },
  {
    id: 'prov-metro-tow',
    name: 'Metro Towing & Recovery Services',
    category: 'Towing',
    address: 'No. 120, Galle Road, Colombo 03',
    lat: 6.9042,
    lng: 79.8512,
    phone: '+94 77 123 4567',
    rating: 4.9,
    reviewCount: 320,
    isOpen: true,
    hours: '24 Hours',
    website: 'https://metrotow.lk',
    services: ['Flatbed Towing', 'Accident Recovery', 'Wheel Lift Towing', 'Jump Starts', 'Lockout Assistance']
  },
  {
    id: 'prov-quick-fix-auto',
    name: 'QuickFix Auto Care Center',
    category: 'Mechanic',
    address: 'No. 312, Elvitigala Mawatha, Colombo 05',
    lat: 6.8925,
    lng: 79.8791,
    phone: '+94 11 987 6543',
    rating: 4.5,
    reviewCount: 98,
    isOpen: true,
    hours: '8:30 AM - 5:30 PM',
    services: ['Engine Tune Up', 'Brake Pad Replacement', 'Oil Change', 'AC Charge', 'Diagnostics']
  },
  {
    id: 'prov-ev-charge-colombo',
    name: 'Supercharge Center Colombo',
    category: 'Charging Station',
    address: 'Majestic City Parking Basement, Colombo 04',
    lat: 6.8967,
    lng: 79.8551,
    phone: '+94 11 111 2222',
    rating: 4.7,
    reviewCount: 65,
    isOpen: true,
    hours: '24 Hours',
    services: ['CCS2 Fast Charger (120kW)', 'Type 2 AC Charger (22kW)', 'RFID / App Payment', 'Lounge access']
  },
  {
    id: 'prov-apex-tyres',
    name: 'Apex Tyre & Alignment Lounge',
    category: 'Tyre Shop',
    address: 'No. 78, Kandy Road, Kelaniya',
    lat: 6.9632,
    lng: 79.9142,
    phone: '+94 11 456 7890',
    rating: 4.6,
    reviewCount: 112,
    isOpen: true,
    hours: '8:00 AM - 7:00 PM',
    services: ['Tyre Patching', 'Wheel Alignment', 'Wheel Balancing', 'Nitrogen Inflation', 'New Tyres Sales']
  },
  {
    id: 'prov-spark-battery',
    name: 'Spark Battery & Power Shop',
    category: 'Battery Shop',
    address: 'No. 15, Nawala Road, Rajagiriya',
    lat: 6.9082,
    lng: 79.8965,
    phone: '+94 71 888 9999',
    rating: 4.4,
    reviewCount: 88,
    isOpen: true,
    hours: '8:00 AM - 8:00 PM',
    services: ['12V Battery Testing', 'Battery Replacement', 'Jump Packs', 'Terminal Anti-corrosion Treatment']
  }
];

export function getServicesByCategory(category: ServiceCategory): ServiceProvider[] {
  return serviceProviders.filter(sp => sp.category === category);
}

// Distance calculation using Haversine formula
export function getNearestServices(lat: number, lng: number, category?: ServiceCategory): ServiceProvider[] {
  const providers = category ? getServicesByCategory(category) : serviceProviders;
  
  return providers
    .map(p => {
      const R = 6371; // Earth radius in km
      const dLat = ((p.lat - lat) * Math.PI) / 180;
      const dLng = ((p.lng - lng) * Math.PI) / 180;
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat * Math.PI) / 180) *
          Math.cos((p.lat * Math.PI) / 180) *
          Math.sin(dLng / 2) *
          Math.sin(dLng / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = parseFloat((R * c).toFixed(1)); // distance in km
      
      return { ...p, distance };
    })
    .sort((a, b) => (a.distance || 0) - (b.distance || 0));
}
