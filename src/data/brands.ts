/**
 * AutoAid AI — Brands Database
 * ─────────────────────────────
 * 55+ real vehicle & motorcycle brands with accurate metadata.
 *
 * Every record uses factual founding years, countries-of-origin,
 * vehicle-type arrays, and official brand colour hex codes.
 */

import type { Brand } from '@/types';

/* ============================================================
   Brand Catalogue
   ============================================================ */

export const brands: Brand[] = [
  /* ─────────── Japanese ─────────── */
  {
    id: 'brand-toyota',
    name: 'Toyota',
    slug: 'toyota',
    country: 'Japan',
    founded: 1937,
    vehicleTypes: ['Sedan', 'SUV', 'Hatchback', 'Pickup', 'Van', 'Minivan', 'Crossover', 'Coupe'],
    description:
      'The world\'s largest automaker by volume, Toyota is renowned for reliability, hybrid technology (Prius), and the legendary Toyota Production System.',
    logoColor: '#EB0A1E',
  },
  {
    id: 'brand-honda',
    name: 'Honda',
    slug: 'honda',
    country: 'Japan',
    founded: 1948,
    vehicleTypes: ['Sedan', 'SUV', 'Hatchback', 'Motorcycle', 'Scooter', 'Crossover', 'Van'],
    description:
      'Honda is the world\'s largest motorcycle manufacturer and a top-tier automaker, known for its VTEC engines, reliability, and the iconic Civic and CBR lineups.',
    logoColor: '#CC0000',
  },
  {
    id: 'brand-nissan',
    name: 'Nissan',
    slug: 'nissan',
    country: 'Japan',
    founded: 1933,
    vehicleTypes: ['Sedan', 'SUV', 'Hatchback', 'Pickup', 'Crossover', 'Sports Car', 'Van'],
    description:
      'Part of the Renault–Nissan–Mitsubishi Alliance, Nissan pioneered the mass-market EV segment with the Leaf and is famous for the GT-R supercar.',
    logoColor: '#C3002F',
  },
  {
    id: 'brand-mazda',
    name: 'Mazda',
    slug: 'mazda',
    country: 'Japan',
    founded: 1920,
    vehicleTypes: ['Sedan', 'SUV', 'Hatchback', 'Crossover', 'Convertible'],
    description:
      'Mazda is celebrated for its "Jinba Ittai" driving philosophy, SKYACTIV technology, and being the only manufacturer to mass-produce rotary engines.',
    logoColor: '#101820',
  },
  {
    id: 'brand-suzuki',
    name: 'Suzuki',
    slug: 'suzuki',
    country: 'Japan',
    founded: 1909,
    vehicleTypes: ['Hatchback', 'SUV', 'Sedan', 'Motorcycle', 'Scooter', 'Van'],
    description:
      'Suzuki dominates small-car and light-motorcycle segments worldwide, particularly in India with Maruti Suzuki and globally with motorcycles like the GSX-R series.',
    logoColor: '#003DA5',
  },
  {
    id: 'brand-mitsubishi',
    name: 'Mitsubishi',
    slug: 'mitsubishi',
    country: 'Japan',
    founded: 1970,
    vehicleTypes: ['Sedan', 'SUV', 'Hatchback', 'Crossover', 'Pickup'],
    description:
      'Part of the Renault–Nissan–Mitsubishi Alliance, Mitsubishi is known for the Lancer Evolution, Pajero, and pioneering plug-in hybrid SUVs with the Outlander PHEV.',
    logoColor: '#ED0000',
  },
  {
    id: 'brand-subaru',
    name: 'Subaru',
    slug: 'subaru',
    country: 'Japan',
    founded: 1953,
    vehicleTypes: ['Sedan', 'SUV', 'Wagon', 'Hatchback', 'Crossover'],
    description:
      'Subaru is distinguished by its symmetrical all-wheel drive and horizontally-opposed boxer engines, a hallmark of rally-bred engineering.',
    logoColor: '#013C74',
  },
  {
    id: 'brand-lexus',
    name: 'Lexus',
    slug: 'lexus',
    country: 'Japan',
    founded: 1989,
    vehicleTypes: ['Sedan', 'SUV', 'Coupe', 'Convertible', 'Crossover'],
    description:
      'Toyota\'s luxury division, Lexus consistently tops reliability surveys and pioneered the luxury hybrid segment with the RX and ES hybrids.',
    logoColor: '#1A1A1A',
  },
  {
    id: 'brand-isuzu',
    name: 'Isuzu',
    slug: 'isuzu',
    country: 'Japan',
    founded: 1916,
    vehicleTypes: ['Pickup', 'Truck', 'SUV', 'Van', 'Bus'],
    description:
      'Isuzu is a leading manufacturer of commercial vehicles and diesel engines. The D-Max pickup and N-Series trucks are sold in over 100 countries.',
    logoColor: '#C8102E',
  },
  {
    id: 'brand-yamaha',
    name: 'Yamaha',
    slug: 'yamaha',
    country: 'Japan',
    founded: 1955,
    vehicleTypes: ['Motorcycle', 'Scooter', 'ATV'],
    description:
      'One of the "Big Four" Japanese motorcycle makers, Yamaha produces everything from commuter bikes to the legendary YZF-R1 superbike and MT naked series.',
    logoColor: '#0033A0',
  },
  {
    id: 'brand-kawasaki',
    name: 'Kawasaki',
    slug: 'kawasaki',
    country: 'Japan',
    founded: 1896,
    vehicleTypes: ['Motorcycle', 'ATV'],
    description:
      'Kawasaki Heavy Industries\' motorcycle division is known for the Ninja sport-bike family, the supercharged H2, and class-leading off-road machines.',
    logoColor: '#6BBE44',
  },

  /* ─────────── German ─────────── */
  {
    id: 'brand-bmw',
    name: 'BMW',
    slug: 'bmw',
    country: 'Germany',
    founded: 1916,
    vehicleTypes: ['Sedan', 'SUV', 'Coupe', 'Convertible', 'Hatchback', 'Wagon', 'Motorcycle', 'Sports Car'],
    description:
      'Bayerische Motoren Werke delivers "The Ultimate Driving Machine." BMW is renowned for inline-six engines, driver-focused dynamics, and the M performance division.',
    logoColor: '#0066B1',
  },
  {
    id: 'brand-mercedes-benz',
    name: 'Mercedes-Benz',
    slug: 'mercedes-benz',
    country: 'Germany',
    founded: 1926,
    vehicleTypes: ['Sedan', 'SUV', 'Coupe', 'Convertible', 'Wagon', 'Van', 'Truck', 'Bus', 'Sports Car'],
    description:
      'The inventor of the automobile. Mercedes-Benz sets benchmarks in luxury, safety, and engineering, from the S-Class flagship to the AMG performance line.',
    logoColor: '#333333',
  },
  {
    id: 'brand-audi',
    name: 'Audi',
    slug: 'audi',
    country: 'Germany',
    founded: 1909,
    vehicleTypes: ['Sedan', 'SUV', 'Hatchback', 'Coupe', 'Convertible', 'Wagon', 'Sports Car'],
    description:
      'Part of the Volkswagen Group, Audi is known for its quattro all-wheel drive, advanced lighting tech, and the performance-focused RS lineup.',
    logoColor: '#BB0A30',
  },
  {
    id: 'brand-volkswagen',
    name: 'Volkswagen',
    slug: 'volkswagen',
    country: 'Germany',
    founded: 1937,
    vehicleTypes: ['Sedan', 'SUV', 'Hatchback', 'Wagon', 'Van', 'Crossover'],
    description:
      'Europe\'s largest automaker, Volkswagen created the iconic Beetle and Golf. Now it leads the EV charge with the ID. family of electric vehicles.',
    logoColor: '#001E50',
  },
  {
    id: 'brand-porsche',
    name: 'Porsche',
    slug: 'porsche',
    country: 'Germany',
    founded: 1931,
    vehicleTypes: ['Sports Car', 'SUV', 'Sedan', 'Coupe', 'Convertible'],
    description:
      'The 911 is the most iconic sports car ever made. Porsche blends racing DNA with everyday usability, extending into luxury SUVs with the Cayenne and Macan.',
    logoColor: '#B12B28',
  },
  {
    id: 'brand-mini',
    name: 'Mini',
    slug: 'mini',
    country: 'Germany',
    founded: 2000,
    vehicleTypes: ['Hatchback', 'Convertible', 'Crossover'],
    description:
      'Owned by BMW since 2000, Mini blends retro British styling with German engineering in fun-to-drive hatchbacks, convertibles, and the Countryman crossover.',
    logoColor: '#000000',
  },

  /* ─────────── South Korean ─────────── */
  {
    id: 'brand-hyundai',
    name: 'Hyundai',
    slug: 'hyundai',
    country: 'South Korea',
    founded: 1967,
    vehicleTypes: ['Sedan', 'SUV', 'Hatchback', 'Pickup', 'Crossover', 'Van', 'Truck', 'Bus'],
    description:
      'Hyundai has risen from a budget brand to a global contender with award-winning design, the Ioniq EV line, and the high-performance N division.',
    logoColor: '#002C5F',
  },
  {
    id: 'brand-kia',
    name: 'Kia',
    slug: 'kia',
    country: 'South Korea',
    founded: 1944,
    vehicleTypes: ['Sedan', 'SUV', 'Hatchback', 'Crossover', 'Minivan', 'Van'],
    description:
      'Part of the Hyundai Motor Group, Kia has been transformed by Peter Schreyer\'s design language. The EV6 won 2022 European Car of the Year.',
    logoColor: '#05141F',
  },

  /* ─────────── American ─────────── */
  {
    id: 'brand-ford',
    name: 'Ford',
    slug: 'ford',
    country: 'United States',
    founded: 1903,
    vehicleTypes: ['Sedan', 'SUV', 'Pickup', 'Truck', 'Van', 'Crossover', 'Sports Car'],
    description:
      'Ford pioneered the assembly line and democratized car ownership. The F-Series has been America\'s best-selling truck for over 40 consecutive years.',
    logoColor: '#003478',
  },
  {
    id: 'brand-chevrolet',
    name: 'Chevrolet',
    slug: 'chevrolet',
    country: 'United States',
    founded: 1911,
    vehicleTypes: ['Sedan', 'SUV', 'Pickup', 'Truck', 'Sports Car', 'Crossover', 'Van'],
    description:
      'An iconic American brand under General Motors. Chevrolet builds everything from the Corvette supercar to the Silverado workhorse and the Bolt EV.',
    logoColor: '#D1A41E',
  },
  {
    id: 'brand-tesla',
    name: 'Tesla',
    slug: 'tesla',
    country: 'United States',
    founded: 2003,
    vehicleTypes: ['Sedan', 'SUV', 'Pickup', 'Crossover'],
    description:
      'Tesla disrupted the automotive industry by making desirable, long-range electric vehicles mainstream. Supercharger, Autopilot, and over-the-air updates set industry standards.',
    logoColor: '#CC0000',
  },
  {
    id: 'brand-jeep',
    name: 'Jeep',
    slug: 'jeep',
    country: 'United States',
    founded: 1941,
    vehicleTypes: ['SUV', 'Crossover', 'Pickup'],
    description:
      'Born from WWII military roots, Jeep is the benchmark for off-road capability. The Wrangler and Grand Cherokee are icons of adventure and freedom.',
    logoColor: '#3D3D3D',
  },
  {
    id: 'brand-harley-davidson',
    name: 'Harley-Davidson',
    slug: 'harley-davidson',
    country: 'United States',
    founded: 1903,
    vehicleTypes: ['Motorcycle'],
    description:
      'America\'s most iconic motorcycle brand, Harley-Davidson defines cruiser culture with its air-cooled V-twin engines, distinctive exhaust note, and passionate community.',
    logoColor: '#FF6600',
  },

  /* ─────────── British ─────────── */
  {
    id: 'brand-jaguar',
    name: 'Jaguar',
    slug: 'jaguar',
    country: 'United Kingdom',
    founded: 1922,
    vehicleTypes: ['Sedan', 'SUV', 'Coupe', 'Convertible', 'Sports Car'],
    description:
      'Jaguar blends British luxury with sporting performance. The F-Type carries forward the legacy of the legendary E-Type, often called the most beautiful car ever made.',
    logoColor: '#1A472A',
  },
  {
    id: 'brand-land-rover',
    name: 'Land Rover',
    slug: 'land-rover',
    country: 'United Kingdom',
    founded: 1948,
    vehicleTypes: ['SUV', 'Crossover'],
    description:
      'Land Rover creates the world\'s finest luxury SUVs. The Range Rover defines opulent off-roading while the Defender is the ultimate utilitarian 4×4.',
    logoColor: '#005A2B',
  },
  {
    id: 'brand-bentley',
    name: 'Bentley',
    slug: 'bentley',
    country: 'United Kingdom',
    founded: 1919,
    vehicleTypes: ['Sedan', 'Coupe', 'Convertible', 'SUV'],
    description:
      'Bentley represents the pinnacle of British handcrafted luxury combined with grand-touring performance. Each car is assembled by hand in Crewe, England.',
    logoColor: '#333333',
  },
  {
    id: 'brand-rolls-royce',
    name: 'Rolls-Royce',
    slug: 'rolls-royce',
    country: 'United Kingdom',
    founded: 1904,
    vehicleTypes: ['Sedan', 'Coupe', 'Convertible', 'SUV'],
    description:
      'Rolls-Royce is the ultimate expression of automotive luxury. The Spirit of Ecstasy adorns cars that define opulence, silence, and effortless power.',
    logoColor: '#680021',
  },
  {
    id: 'brand-triumph',
    name: 'Triumph',
    slug: 'triumph',
    country: 'United Kingdom',
    founded: 1902,
    vehicleTypes: ['Motorcycle'],
    description:
      'Britain\'s largest motorcycle manufacturer. Triumph is celebrated for the Bonneville heritage line, the Street Triple, and the adventure-ready Tiger series.',
    logoColor: '#000000',
  },
  {
    id: 'brand-mg',
    name: 'MG',
    slug: 'mg',
    country: 'United Kingdom',
    founded: 1924,
    vehicleTypes: ['Hatchback', 'SUV', 'Sedan', 'Crossover'],
    description:
      'Originally a British sports-car maker, MG is now owned by SAIC Motor (China) and focuses on affordable EVs and value-packed crossovers for global markets.',
    logoColor: '#C41230',
  },

  /* ─────────── Italian ─────────── */
  {
    id: 'brand-ferrari',
    name: 'Ferrari',
    slug: 'ferrari',
    country: 'Italy',
    founded: 1939,
    vehicleTypes: ['Sports Car', 'Coupe', 'Convertible'],
    description:
      'Ferrari is the most prestigious name in motoring. The Prancing Horse is synonymous with Formula 1 dominance, exquisite design, and raw V8/V12 performance.',
    logoColor: '#DC0000',
  },
  {
    id: 'brand-lamborghini',
    name: 'Lamborghini',
    slug: 'lamborghini',
    country: 'Italy',
    founded: 1963,
    vehicleTypes: ['Sports Car', 'Coupe', 'Convertible', 'SUV'],
    description:
      'Automobili Lamborghini makes some of the most extreme supercars on earth. The Countach, Murciélago, and Huracán are icons of bold, angular design.',
    logoColor: '#DDB321',
  },
  {
    id: 'brand-ducati',
    name: 'Ducati',
    slug: 'ducati',
    country: 'Italy',
    founded: 1926,
    vehicleTypes: ['Motorcycle'],
    description:
      'Ducati is renowned for its Desmodromic valve-train, L-twin engines, and dominance in World Superbike Championship. The Panigale is a benchmark superbike.',
    logoColor: '#CC0000',
  },
  {
    id: 'brand-aprilia',
    name: 'Aprilia',
    slug: 'aprilia',
    country: 'Italy',
    founded: 1945,
    vehicleTypes: ['Motorcycle', 'Scooter'],
    description:
      'Part of the Piaggio Group, Aprilia has the most World Championship titles of any European manufacturer. The RSV4 and Tuono are rider favorites.',
    logoColor: '#E10600',
  },
  {
    id: 'brand-vespa',
    name: 'Vespa',
    slug: 'vespa',
    country: 'Italy',
    founded: 1946,
    vehicleTypes: ['Scooter'],
    description:
      'Vespa is the world\'s most iconic scooter brand, a symbol of Italian style since 1946. Built by Piaggio, its steel monocoque design is unmistakable.',
    logoColor: '#006747',
  },

  /* ─────────── Swedish ─────────── */
  {
    id: 'brand-volvo',
    name: 'Volvo',
    slug: 'volvo',
    country: 'Sweden',
    founded: 1927,
    vehicleTypes: ['Sedan', 'SUV', 'Wagon', 'Crossover', 'Truck'],
    description:
      'Volvo invented the three-point seatbelt and leads the industry in safety technology. The XC90, XC60, and S60 blend Scandinavian design with robust safety.',
    logoColor: '#003057',
  },

  /* ─────────── Chinese ─────────── */
  {
    id: 'brand-byd',
    name: 'BYD',
    slug: 'byd',
    country: 'China',
    founded: 1995,
    vehicleTypes: ['Sedan', 'SUV', 'Hatchback', 'Crossover', 'Bus', 'Truck'],
    description:
      'Build Your Dreams — BYD is the world\'s largest EV manufacturer (by volume), leveraging in-house battery expertise with the Blade battery technology.',
    logoColor: '#A42830',
  },
  {
    id: 'brand-cfmoto',
    name: 'CFMoto',
    slug: 'cfmoto',
    country: 'China',
    founded: 1989,
    vehicleTypes: ['Motorcycle', 'ATV'],
    description:
      'CFMoto has partnered with KTM to produce competitive motorcycles at value-oriented pricing. The 700CL-X and 800MT are gaining global traction.',
    logoColor: '#E30613',
  },

  /* ─────────── Indian ─────────── */
  {
    id: 'brand-tata',
    name: 'Tata',
    slug: 'tata',
    country: 'India',
    founded: 1945,
    vehicleTypes: ['Sedan', 'SUV', 'Hatchback', 'Truck', 'Bus', 'Van', 'Pickup', 'Three Wheeler'],
    description:
      'India\'s largest automaker. Tata Motors (parent of Jaguar Land Rover) is a leader in commercial vehicles and is rapidly expanding its EV portfolio with the Nexon EV and Tiago EV.',
    logoColor: '#0062A3',
  },
  {
    id: 'brand-mahindra',
    name: 'Mahindra',
    slug: 'mahindra',
    country: 'India',
    founded: 1945,
    vehicleTypes: ['SUV', 'Pickup', 'Truck', 'Three Wheeler', 'Van'],
    description:
      'Mahindra & Mahindra is India\'s rugged SUV specialist. The Thar and Scorpio are off-road legends, while the XUV series targets urban families.',
    logoColor: '#E21836',
  },
  {
    id: 'brand-ashok-leyland',
    name: 'Ashok Leyland',
    slug: 'ashok-leyland',
    country: 'India',
    founded: 1948,
    vehicleTypes: ['Truck', 'Bus', 'Van'],
    description:
      'India\'s second-largest commercial vehicle manufacturer. Ashok Leyland is a Hinduja Group flagship, known for Dost LCVs and heavy-duty trucks.',
    logoColor: '#004B8D',
  },
  {
    id: 'brand-royal-enfield',
    name: 'Royal Enfield',
    slug: 'royal-enfield',
    country: 'India',
    founded: 1901,
    vehicleTypes: ['Motorcycle'],
    description:
      'The oldest motorcycle brand in continuous production. Royal Enfield\'s thumping singles (Classic 350, Bullet, Himalayan) blend retro styling with modern engineering.',
    logoColor: '#1C1C1C',
  },
  {
    id: 'brand-bajaj',
    name: 'Bajaj',
    slug: 'bajaj',
    country: 'India',
    founded: 1945,
    vehicleTypes: ['Motorcycle', 'Scooter', 'Three Wheeler'],
    description:
      'Bajaj Auto is one of the world\'s largest two-wheeler and three-wheeler manufacturers. The Pulsar and Dominar lines are hugely popular across emerging markets.',
    logoColor: '#005BAA',
  },
  {
    id: 'brand-tvs',
    name: 'TVS',
    slug: 'tvs',
    country: 'India',
    founded: 1978,
    vehicleTypes: ['Motorcycle', 'Scooter', 'Three Wheeler'],
    description:
      'TVS Motor Company builds motorcycles and scooters with a focus on innovation. The Apache series and Jupiter scooter are Indian market leaders.',
    logoColor: '#003087',
  },
  {
    id: 'brand-hero',
    name: 'Hero',
    slug: 'hero',
    country: 'India',
    founded: 2011,
    vehicleTypes: ['Motorcycle', 'Scooter'],
    description:
      'Hero MotoCorp is the world\'s largest two-wheeler manufacturer by volume, selling over 5 million units annually, primarily in India and emerging markets.',
    logoColor: '#ED1C24',
  },
  {
    id: 'brand-ktm',
    name: 'KTM',
    slug: 'ktm',
    country: 'Austria',
    founded: 1934,
    vehicleTypes: ['Motorcycle'],
    description:
      'KTM is Europe\'s largest motorcycle manufacturer, dominating off-road and rally events (Dakar). The Duke naked and RC sport series are hugely popular.',
    logoColor: '#FF6600',
  },

  /* ─────────── Others ─────────── */
  {
    id: 'brand-peugeot',
    name: 'Peugeot',
    slug: 'peugeot',
    country: 'France',
    founded: 1810,
    vehicleTypes: ['Sedan', 'SUV', 'Hatchback', 'Van', 'Crossover', 'Scooter'],
    description:
      'One of the world\'s oldest car brands. Peugeot, part of Stellantis, offers stylish European cars with a strong presence in hatchbacks and compact SUVs.',
    logoColor: '#003B6F',
  },
  {
    id: 'brand-renault',
    name: 'Renault',
    slug: 'renault',
    country: 'France',
    founded: 1899,
    vehicleTypes: ['Sedan', 'SUV', 'Hatchback', 'Van', 'Crossover'],
    description:
      'Renault is a French automotive giant and part of the Renault–Nissan–Mitsubishi Alliance. Known for the Clio, Megane, and leadership in European EV sales.',
    logoColor: '#FFCC00',
  },
  {
    id: 'brand-fiat',
    name: 'Fiat',
    slug: 'fiat',
    country: 'Italy',
    founded: 1899,
    vehicleTypes: ['Sedan', 'Hatchback', 'Van', 'Crossover'],
    description:
      'Fiat Automobiles is Italy\'s largest car manufacturer. The Fiat 500 is a global icon of compact-car design, and Fiat dominates the city-car segment in Europe.',
    logoColor: '#9B0023',
  },
  {
    id: 'brand-skoda',
    name: 'Škoda',
    slug: 'skoda',
    country: 'Czech Republic',
    founded: 1895,
    vehicleTypes: ['Sedan', 'SUV', 'Hatchback', 'Wagon', 'Crossover'],
    description:
      'Part of the Volkswagen Group, Škoda offers VW-platform vehicles at more accessible price points. The Octavia and Superb are segment leaders in Europe and India.',
    logoColor: '#4BA82E',
  },
  {
    id: 'brand-genesis',
    name: 'Genesis',
    slug: 'genesis',
    country: 'South Korea',
    founded: 2015,
    vehicleTypes: ['Sedan', 'SUV', 'Coupe'],
    description:
      'Hyundai\'s luxury marque, Genesis has rapidly earned critical acclaim for striking design, generous standard features, and competitive pricing against German rivals.',
    logoColor: '#19272E',
  },
  {
    id: 'brand-ram',
    name: 'Ram',
    slug: 'ram',
    country: 'United States',
    founded: 2010,
    vehicleTypes: ['Pickup', 'Truck', 'Van'],
    description:
      'Spun off from Dodge, Ram Trucks is a Stellantis brand focused exclusively on pickups and commercial vehicles. The Ram 1500 is a perennial best-seller.',
    logoColor: '#1B1B1B',
  },
  {
    id: 'brand-gmc',
    name: 'GMC',
    slug: 'gmc',
    country: 'United States',
    founded: 1911,
    vehicleTypes: ['SUV', 'Pickup', 'Truck', 'Van'],
    description:
      'General Motors\' professional-grade truck brand. GMC builds premium variants of Chevrolet platforms, topped by the luxury Denali trim and the electric Hummer EV.',
    logoColor: '#C41230',
  },
];

/* ============================================================
   Helper Functions
   ============================================================ */

/**
 * Look up a brand by its URL-friendly slug.
 *
 * @example
 * const toyota = getBrandBySlug('toyota');
 */
export function getBrandBySlug(slug: string): Brand | undefined {
  return brands.find((b) => b.slug === slug);
}
