const fs = require('fs');
const path = require('path');

const vehiclesPath = path.join(__dirname, '../src/data/vehicles.ts');
const faultsPath = path.join(__dirname, '../src/data/faults.ts');

const carImages = [
  'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1503376794736-73f1a5bd89e2?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1502877338535-34cb0ca2305a?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1485291571150-772bcfc10da5?auto=format&fit=crop&q=80&w=800'
];

function updateVehicles() {
  let content = fs.readFileSync(vehiclesPath, 'utf8');
  
  let imgIndex = 0;
  content = content.replace(/slug:\s*'([^']+)',/g, (match, slug) => {
    const imageUrl = carImages[imgIndex % carImages.length];
    imgIndex++;
    return `slug: '${slug}',\n    imageUrl: '${imageUrl}',`;
  });

  fs.writeFileSync(vehiclesPath, content, 'utf8');
  console.log('Updated vehicles.ts');
}

function updateFaults() {
  let content = fs.readFileSync(faultsPath, 'utf8');
  
  // Replace USD with LKR
  content = content.replace(/currency:\s*'USD'/g, "currency: 'LKR'");
  
  // Multiply estimatedCost min/max
  content = content.replace(/estimatedCost:\s*{\s*min:\s*(\d+),\s*max:\s*(\d+),\s*currency:\s*'LKR'\s*}/g, (match, min, max) => {
    const newMin = parseInt(min) * 300;
    const newMax = parseInt(max) * 300;
    return `estimatedCost: { min: ${newMin}, max: ${newMax}, currency: 'LKR' }`;
  });

  // Multiply spareParts estimatedPrice min/max
  content = content.replace(/estimatedPrice:\s*{\s*min:\s*(\d+),\s*max:\s*(\d+)\s*}/g, (match, min, max) => {
    const newMin = parseInt(min) * 300;
    const newMax = parseInt(max) * 300;
    return `estimatedPrice: { min: ${newMin}, max: ${newMax} }`;
  });

  fs.writeFileSync(faultsPath, content, 'utf8');
  console.log('Updated faults.ts');
}

updateVehicles();
updateFaults();
