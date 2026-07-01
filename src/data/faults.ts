import type { Fault, FaultCategory, DifficultyLevel, UrgencyLevel, BodyType } from '@/types';

export const faults: Fault[] = [
  {
    id: 'transmission-slipping',
    slug: 'transmission-slipping',
    name: 'Transmission Slipping',
    category: 'Transmission',
    description: 'The engine revs but the vehicle does not accelerate proportionally, or the gears change unpredictably with a noticeable delay.',
    symptoms: [
      'Engine revs up, but speed does not increase',
      'Delayed engagement when shifting gears',
      'Burnt smell coming from under the hood',
      'Unusual noise (humming or clunking) when shifting'
    ],
    possibleCauses: [
      'Low transmission fluid level',
      'Worn out transmission bands or clutches',
      'Solenoid failure',
      'Torque converter issues'
    ],
    difficulty: 'Hard',
    estimatedCost: { min: 90000, max: 750000, currency: 'LKR' },
    estimatedTime: '3-6 hours',
    toolsNeeded: ['Fluid Catch Pan', 'Socket Set', 'Transmission Funnel', 'Car Jacks and Jack Stands'],
    spareParts: [
      { name: 'Transmission Fluid (ATF)', estimatedPrice: { min: 12000, max: 30000 } },
      { name: 'Transmission Solenoid Kit', estimatedPrice: { min: 30000, max: 75000 } },
      { name: 'Replacement Clutch Packs', estimatedPrice: { min: 75000, max: 180000 } }
    ],
    canSelfRepair: 'Maybe',
    selfRepairCondition: 'Only if the issue is low fluid level. If the bands or solenoids are damaged internally, professional rebuild is required.',
    safetyWarning: 'Ensure the vehicle is cool and parked on flat ground before working. Transmission fluid can get extremely hot.',
    repairSteps: [
      { step: 1, title: 'Check Transmission Fluid Level', description: 'Run the engine for a few minutes, pull the dipstick (if equipped), check if the level is low and note the fluid color. If it smells burnt, a flush is needed.' },
      { step: 2, title: 'Top up Fluid', description: 'If the fluid level is low, top it up using a transmission funnel with the exact specification of ATF specified in your owner manual.' },
      { step: 3, title: 'Inspect for Leaks', description: 'Slide under the vehicle and inspect the transmission pan, cooling lines, and seals for red or brown fluid leaks.' },
      { step: 4, title: 'Scan OBD-II Codes', description: 'Connect an OBD-II scanner to verify if any transmission codes (like P0700 series) are present.' }
    ],
    precautions: ['Always use the manufacturer-recommended transmission fluid.', 'Do not overfill the transmission.'],
    whenNotToDrive: 'If the transmission is slipping severely or overheating (fluid smell), do not continue driving. It can destroy the internal gear components completely.',
    emergencyInstructions: 'Pull over to a safe area, switch the car off, and call for a tow to avoid catastrophic internal transmission destruction.',
    applicableVehicleTypes: ['Sedan', 'SUV', 'Hatchback', 'Coupe', 'Convertible', 'Wagon', 'Pickup', 'Van', 'Truck', 'Bus'],
    urgency: 'High'
  },
  {
    id: 'coolant-leak',
    slug: 'coolant-leak',
    name: 'Coolant Leak',
    category: 'Cooling',
    description: 'Loss of engine coolant fluid, usually leading to engine overheating and sweet-smelling steam from the engine bay.',
    symptoms: [
      'Sweet-smelling exhaust or engine bay aroma',
      'Puddle of bright green, pink, or orange fluid under the engine',
      'Engine temperature gauge rising into the red zone',
      'Low coolant reservoir warning light'
    ],
    possibleCauses: [
      'Cracked radiator or overflow tank',
      'Failed water pump seal',
      'Damaged radiator or heater hoses',
      'Blown head gasket'
    ],
    difficulty: 'Medium',
    estimatedCost: { min: 24000, max: 180000, currency: 'LKR' },
    estimatedTime: '1-3 hours',
    toolsNeeded: ['Hose Clamp Pliers', 'Screwdrivers', 'Socket Set', 'Coolant Drain Pan'],
    spareParts: [
      { name: 'Replacement Coolant Hose', estimatedPrice: { min: 4500, max: 13500 } },
      { name: 'Pre-diluted Coolant (50/50)', estimatedPrice: { min: 6000, max: 12000 } },
      { name: 'Radiator Assembly', estimatedPrice: { min: 36000, max: 105000 } }
    ],
    canSelfRepair: 'Yes',
    selfRepairCondition: 'Changing hoses or topping up coolant is easy. Replacing the radiator is moderate. Head gasket failure requires a professional.',
    safetyWarning: 'NEVER open the radiator cap when the engine is hot. Doing so can cause explosive steam release and result in severe burns.',
    repairSteps: [
      { step: 1, title: 'Let the Engine Cool', description: 'Wait at least 30-45 minutes for the engine to cool down completely before inspecting or touching the cooling system.' },
      { step: 2, title: 'Identify the Leak Source', description: 'Look for wet spots or white crusty residue along hoses, radiator cores, and the water pump area.' },
      { step: 3, title: 'Replace Damaged Hose or Radiator', description: 'Drain the remaining coolant, remove clamps on the leaking hose, slide the new one on, and secure clamps tightly.' },
      { step: 4, title: 'Refill and Bleed System', description: 'Fill the system with 50/50 mix coolant, run the engine with the radiator cap off to let air bubbles escape, then cap it.' }
    ],
    precautions: ['Dispose of used coolant safely; it is highly toxic to pets.', 'Never mix different types or colors of coolant.'],
    whenNotToDrive: 'If the temperature gauge is in the red zone or coolant is leaking rapidly, stop driving immediately. Running a hot engine will warp cylinder heads and crack engine blocks.',
    emergencyInstructions: 'Pull over immediately, turn on heater to full (it pulls heat away from the engine), shut down the engine, and call roadside assistance.',
    applicableVehicleTypes: ['Sedan', 'SUV', 'Hatchback', 'Coupe', 'Convertible', 'Wagon', 'Pickup', 'Van', 'Truck', 'Bus', 'Motorcycle'],
    urgency: 'High'
  },
  {
    id: 'engine-misfire',
    slug: 'engine-misfire',
    name: 'Engine Misfire',
    category: 'Engine',
    description: 'One or more cylinders fail to ignite fuel correctly, causing rough idling, shaking, loss of power, and an active check engine light.',
    symptoms: [
      'Rough, shaky running engine',
      'Flashing check engine light',
      'Noticeable loss of power under acceleration',
      'Popping sound or raw fuel smell from exhaust'
    ],
    possibleCauses: [
      'Fouled or worn spark plugs',
      'Failed ignition coils',
      'Clogged fuel injectors',
      'Vacuum leak or low engine compression'
    ],
    difficulty: 'Medium',
    estimatedCost: { min: 15000, max: 120000, currency: 'LKR' },
    estimatedTime: '1-2 hours',
    toolsNeeded: ['Spark Plug Socket', 'Ratchet', 'Extension Bar', 'OBD-II Code Reader'],
    spareParts: [
      { name: 'Spark Plugs Set', estimatedPrice: { min: 6000, max: 24000 } },
      { name: 'Ignition Coil Pack', estimatedPrice: { min: 12000, max: 36000 } }
    ],
    canSelfRepair: 'Yes',
    selfRepairCondition: 'Spark plug and coil replacement is highly manageable for DIYers with basic socket sets.',
    safetyWarning: 'Disconnect the battery before performing electrical or ignition system repairs.',
    repairSteps: [
      { step: 1, title: 'Scan for Codes', description: 'Plug in your OBD-II scanner and read code P0300 (random misfire) or P0301-P0308 (denoting specific cylinder misfire).' },
      { step: 2, title: 'Access Ignition Coils', description: 'Remove the engine cover and disconnect the electrical connector to the coil of the misfiring cylinder.' },
      { step: 3, title: 'Inspect and Replace Spark Plug', description: 'Remove the coil, use a spark plug socket to remove the plug, check for fouling, gap the new plug, and install it.' },
      { step: 4, title: 'Reinstall Coil and Test', description: 'Swap the ignition coil to see if the misfire follows it. If not, secure everything back and clear codes.' }
    ],
    precautions: ['Always torque spark plugs to specification.', 'Ensure spark plugs are correctly gapped.'],
    whenNotToDrive: 'Do NOT drive if the check engine light is FLASHING. A flashing light indicates severe misfire that will overheat and destroy the expensive catalytic converter.',
    emergencyInstructions: 'Pull over, shut down the engine, and consult an assistance provider or tow service.',
    applicableVehicleTypes: ['Sedan', 'SUV', 'Hatchback', 'Coupe', 'Convertible', 'Wagon', 'Pickup', 'Van', 'Truck', 'Bus', 'Motorcycle', 'Scooter'],
    urgency: 'High'
  },
  {
    id: 'brake-pad-worn',
    slug: 'brake-pad-worn',
    name: 'Worn Brake Pads',
    category: 'Brakes',
    description: 'Friction material on the brake pads has worn down to the wear indicator, causing squealing or grinding noises during braking.',
    symptoms: [
      'High-pitched squealing noise when applying brakes',
      'Grinding noise (metal-on-metal)',
      'Brake pedal feels soft or spongy',
      'Brake wear warning light on dashboard'
    ],
    possibleCauses: [
      'Normal wear and tear over mileage',
      'Stuck brake caliper causing uneven wear',
      'Low quality brake pad material'
    ],
    difficulty: 'Medium',
    estimatedCost: { min: 18000, max: 75000, currency: 'LKR' },
    estimatedTime: '1-2 hours',
    toolsNeeded: ['C-Clamp', 'Jack and Jack Stands', 'Lug Wrench', 'Socket Set'],
    spareParts: [
      { name: 'Front/Rear Brake Pads Set', estimatedPrice: { min: 7500, max: 24000 } },
      { name: 'Brake Clean Spray', estimatedPrice: { min: 1500, max: 3000 } }
    ],
    canSelfRepair: 'Yes',
    selfRepairCondition: 'Standard replacement is straightforward if you have jack stands and know how to safely lift the vehicle.',
    safetyWarning: 'Never support a vehicle with just a scissor jack; always use secure jack stands. Work on one side at a time.',
    repairSteps: [
      { step: 1, title: 'Lift Vehicle and Remove Wheel', description: 'Loosen lug nuts, lift the car, place on jack stands, and fully remove the wheel.' },
      { step: 2, title: 'Remove Caliper Bolts', description: 'Locate and remove the two bolts securing the caliper to the bracket. Slide the caliper off and suspend it with a wire hook.' },
      { step: 3, title: 'Replace Pads', description: 'Slide out the old pads, insert new shims/clips, apply grease to pad backs (not friction sides!), and slide in new pads.' },
      { step: 4, title: 'Compress Caliper Piston', description: 'Use a C-clamp and an old pad to push the caliper piston back in. Reinstall caliper, tighten bolts, and pump the pedal.' }
    ],
    precautions: ['Never apply grease or cleaner to the pad friction surfaces.', 'Ensure you pump the brake pedal before driving.'],
    whenNotToDrive: 'If you hear grinding noises, stop driving soon. Running metal-on-metal will destroy the brake rotors, leading to much higher repair costs and poor stopping distances.',
    emergencyInstructions: 'Drive slowly to the nearest service shop immediately, or call a mobile mechanic.',
    applicableVehicleTypes: ['Sedan', 'SUV', 'Hatchback', 'Coupe', 'Convertible', 'Wagon', 'Pickup', 'Van', 'Truck', 'Bus', 'Motorcycle', 'Scooter'],
    urgency: 'Medium'
  },
  {
    id: 'alternator-failure',
    slug: 'alternator-failure',
    name: 'Alternator Failure',
    category: 'Electrical',
    description: 'The alternator fails to generate charge for the battery and run the vehicle electronics, leading to battery drainage and complete system shutdown.',
    symptoms: [
      'Red battery warning light on dashboard',
      'Dimming headlights and dashboard cluster',
      'Electrical components behaving erratically',
      'Engine dies while driving and won\'t jump start'
    ],
    possibleCauses: [
      'Worn out alternator carbon brushes',
      'Failed voltage regulator',
      'Broken serpentine belt',
      'Internal diode burnout'
    ],
    difficulty: 'Medium',
    estimatedCost: { min: 45000, max: 150000, currency: 'LKR' },
    estimatedTime: '1-3 hours',
    toolsNeeded: ['Serpentine Belt Tool', 'Socket Set', 'Multimeter', 'Wrench Set'],
    spareParts: [
      { name: 'Replacement Alternator Unit', estimatedPrice: { min: 36000, max: 105000 } },
      { name: 'Serpentine Belt', estimatedPrice: { min: 6000, max: 15000 } }
    ],
    canSelfRepair: 'Yes',
    selfRepairCondition: 'Accessible alternators on front-wheel drive or inline engines are easy to replace. Difficult mounting locations require professional access.',
    safetyWarning: 'Always disconnect the negative battery terminal before starting. The main alternator wire connects directly to the battery and can spark heavily.',
    repairSteps: [
      { step: 1, title: 'Test Battery Voltage', description: 'Use a multimeter. If the engine is running and voltage is under 13.5V, the alternator is not charging.' },
      { step: 2, title: 'Remove Serpentine Belt', description: 'Use the tensioner tool to rotate the belt tensioner, relieving force, and slide the belt off the alternator pulley.' },
      { step: 3, title: 'Disconnect Electrical Wires', description: 'Remove the plastic boot, unscrew the main B+ harness wire nut, and unplug the wiring connector harness.' },
      { step: 4, title: 'Unbolt and Swap Alternator', description: 'Remove the mounting bolts, slide out the old alternator, bolt in the new one, reinstall the belt, and reconnect battery.' }
    ],
    precautions: ['Double check belt routing diagram before putting the serpentine belt back.', 'Never tap the alternator pulley with a hammer.'],
    whenNotToDrive: 'Do not attempt to drive with a failed alternator. Once the battery drains (which takes 15-30 minutes), the engine spark plug system will stop firing and the car will die instantly in traffic.',
    emergencyInstructions: 'Pull over immediately, find a safe spot, park the vehicle, and call a towing service.',
    applicableVehicleTypes: ['Sedan', 'SUV', 'Hatchback', 'Coupe', 'Convertible', 'Wagon', 'Pickup', 'Van', 'Truck', 'Bus', 'Motorcycle'],
    urgency: 'High'
  },
  {
    id: 'charging-error',
    slug: 'charging-error',
    name: 'EV Charging Error',
    category: 'EV/Hybrid',
    description: 'Electric vehicle refuses to accept charge or stops charging abruptly, accompanied by error messages on the screen.',
    symptoms: [
      'Charging light flashes red on charge port',
      'Dashboard displays "Unable to Charge" alert',
      'Charger locks but immediately unlocks without charging',
      'Intermittent charging status'
    ],
    possibleCauses: [
      'Faulty EVSE charging handle or station plug',
      'Dirty or corroded charging port pins',
      'EV onboard charger (OBC) thermal cutoff',
      'EV BMS software lock due to grid voltage fluctuations'
    ],
    difficulty: 'Medium',
    estimatedCost: { min: 15000, max: 360000, currency: 'LKR' },
    estimatedTime: '30 mins - 2 hours',
    toolsNeeded: ['Contact Cleaner Spray', 'Lint-free swab', 'OBD-II scanner compatible with EVs'],
    spareParts: [
      { name: 'Charge Port Door Actuator', estimatedPrice: { min: 24000, max: 54000 } },
      { name: 'Onboard Charger Assembly', estimatedPrice: { min: 180000, max: 600000 } }
    ],
    canSelfRepair: 'Maybe',
    selfRepairCondition: 'Cleaning the charging pins and rebooting the EV system is safe. Replacing high-voltage components like the onboard charger is strictly professional-only.',
    safetyWarning: 'Never insert metallic objects into high-voltage charging port sockets. Ensure charging station breaker is off before testing charger cords.',
    repairSteps: [
      { step: 1, title: 'Verify with Another Charger', description: 'Try plugging into a different EV charger (AC vs DC Fast Charger) to isolate if the issue is with your vehicle or the charger itself.' },
      { step: 2, title: 'Clean Port Contacts', description: 'Inspect the J1772 or CCS1/CCS2 charging inlet. Spray electronic contact cleaner and wipe with a clean lint-free cloth.' },
      { step: 3, title: 'Perform System Reboot', description: 'Use the vehicle screen settings to execute a full system display and electronics reboot, which resets fault registers.' },
      { step: 4, title: 'Check 12V Battery', description: 'Many EV charging errors stem from a weak auxiliary 12V battery. Test battery voltage and replace if under 12.1V.' }
    ],
    precautions: ['Always turn off the vehicle before initiating a port clean.', 'Ensure the charging connector is fully pushed in.'],
    whenNotToDrive: 'You can drive the car normally if it has remaining battery, but if the charge rate is 0%, you must resolve it before running out of power.',
    emergencyInstructions: 'Locate a slow level 1/2 charger if level 3 DC fast charging fails. It might bypass onboard charger errors.',
    applicableVehicleTypes: ['Sedan', 'SUV', 'Hatchback', 'Crossover'],
    urgency: 'Medium'
  },
  {
    id: 'battery-dead',
    slug: 'battery-dead',
    name: 'Dead Battery',
    category: 'Electrical',
    description: 'The vehicle 12V battery does not have enough charge to crank the engine or power onboard computer systems.',
    symptoms: [
      'Engine will not crank; clicking noise when key is turned',
      'Dashboard lights flicker or remain dim',
      'Keyless entry does not unlock doors',
      'Clock and radio settings reset'
    ],
    possibleCauses: [
      'Lights or radio left on overnight',
      'Corroded battery terminals',
      'Extreme cold weather freezing battery cells',
      'Battery reached its natural end of life (3-5 years)'
    ],
    difficulty: 'Easy',
    estimatedCost: { min: 24000, max: 60000, currency: 'LKR' },
    estimatedTime: '15-30 minutes',
    toolsNeeded: ['Wrench (10mm usually)', 'Wire brush', 'Jumper Cables or Jump Pack'],
    spareParts: [
      { name: '12V Lead Acid / AGM Battery', estimatedPrice: { min: 21000, max: 54000 } },
      { name: 'Battery Terminal Anti-Corrosion Spray', estimatedPrice: { min: 1500, max: 3600 } }
    ],
    canSelfRepair: 'Yes',
    selfRepairCondition: 'Battery replacement is one of the easiest repairs and highly recommended for beginners.',
    safetyWarning: 'Batteries contain highly corrosive sulfuric acid and produce explosive hydrogen gas. Wear eye protection and do not smoke near battery terminals.',
    repairSteps: [
      { step: 1, title: 'Jump Start the Vehicle', description: 'Connect red cable to positive terminals, black cable to donor battery negative and dead car ground. Start donor car, then start the dead car.' },
      { step: 2, title: 'Clean Terminals', description: 'If keeping old battery, disconnect terminals (negative first!), brush off white battery corrosion with wire brush, and tighten connections.' },
      { step: 3, title: 'Unbolt Hold-Down Bracket', description: 'Remove the mounting bracket holding the battery tray secure.' },
      { step: 4, title: 'Install New Battery', description: 'Lift the old battery out, drop the new one in, secure the bracket. Connect the positive terminal first, then the negative.' }
    ],
    precautions: ['Always connect/disconnect negative terminal last/first to prevent short circuits.', 'Recycle the old battery at an auto parts store.'],
    whenNotToDrive: 'Once jump-started, you must drive for 20-30 minutes to allow the alternator to recharge the battery. Do not drive to remote areas until battery passes a load test.',
    emergencyInstructions: 'Call a jump start roadside service or use a portable lithium-ion jump starter pack.',
    applicableVehicleTypes: ['Sedan', 'SUV', 'Hatchback', 'Coupe', 'Convertible', 'Wagon', 'Pickup', 'Van', 'Truck', 'Bus', 'Motorcycle', 'Scooter', 'Three Wheeler', 'ATV'],
    urgency: 'Medium'
  },
  {
    id: 'tyre-puncture',
    slug: 'tyre-puncture',
    name: 'Tyre Puncture / Flat Tyre',
    category: 'Tyres',
    description: 'A sharp object penetrates the tyre casing, letting air pressure drop rapidly and making the wheel run on the rim.',
    symptoms: [
      'Flapping or thumping noise while driving',
      'Vehicle pulls strongly to one side',
      'TPMS low pressure warning light illuminates',
      'Hissing noise coming from tyre tread'
    ],
    possibleCauses: [
      'Nails, screws, or glass on the roadway',
      'Striking potholes or curbs at speed',
      'Failed tyre valve stem'
    ],
    difficulty: 'Easy',
    estimatedCost: { min: 3000, max: 12000, currency: 'LKR' },
    estimatedTime: '20-40 minutes',
    toolsNeeded: ['Tyre Plug Kit', 'Jack', 'Lug Wrench', 'Portable Air Pump'],
    spareParts: [
      { name: 'Tyre Plugs Pack', estimatedPrice: { min: 1500, max: 4500 } },
      { name: 'Replacement Tyre Valve Core', estimatedPrice: { min: 600, max: 2400 } }
    ],
    canSelfRepair: 'Yes',
    selfRepairCondition: 'Plugging a tyre is simple if the puncture is in the main tread area. Sidewall punctures cannot be repaired and require tyre replacement.',
    safetyWarning: 'Never stand under the car supported only by a jack. Pull completely off the road and out of traffic before changing a tyre.',
    repairSteps: [
      { step: 1, title: 'Find the Puncture', description: 'Inspect tread for nails or screws. Spray soapy water; bubbles indicate escaping air.' },
      { step: 2, title: 'Pull Out Object & Ream Hole', description: 'Use pliers to pull out the nail, then insert the spiral reaming tool from the kit to clean and roughen the hole.' },
      { step: 3, title: 'Insert Plug', description: 'Thread the rubber plug strip through the eye of the needle tool, coat in rubber cement (if provided), and push it firmly into the puncture.' },
      { step: 4, title: 'Inflate and Check', description: 'Pull the tool straight out, trim excess plug flush with tread, and pump tyre back to manufacturer specification.' }
    ],
    precautions: ['Do not repair punctures located near the shoulder or sidewall.', 'Plugged tyres should be inspected by a shop as soon as possible.'],
    whenNotToDrive: 'Do NOT drive on a completely flat tyre. Doing so will permanently destroy the tyre structure and wheel rim within a few hundred meters.',
    emergencyInstructions: 'Pull over safely, use the spare tire, or spray tyre inflator sealant to limp to a tyre shop.',
    applicableVehicleTypes: ['Sedan', 'SUV', 'Hatchback', 'Coupe', 'Convertible', 'Wagon', 'Pickup', 'Van', 'Truck', 'Bus', 'Motorcycle', 'Scooter', 'Three Wheeler', 'ATV'],
    urgency: 'High'
  }
];

export function getFaultBySlug(slug: string): Fault | undefined {
  return faults.find(f => f.slug === slug);
}

export function getFaultsByCategory(category: FaultCategory): Fault[] {
  return faults.filter(f => f.category === category);
}

export function searchFaults(query: string): Fault[] {
  const q = query.toLowerCase();
  return faults.filter(
    f => f.name.toLowerCase().includes(q) ||
         f.description.toLowerCase().includes(q) ||
         f.symptoms.some(s => s.toLowerCase().includes(q))
  );
}
