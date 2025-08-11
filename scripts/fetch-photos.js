// Compatibility stub for legacy builds
const fs = require('fs');
const path = require('path');

try {
  const dataPath = path.join(__dirname, '..', 'src', 'data', 'park-photos.json');
  const dir = path.dirname(dataPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(dataPath)) fs.writeFileSync(dataPath, '{}');
  console.log('Skipping legacy fetch-photos step (compat stub).');
} catch (e) {
  console.log('Compat stub encountered an error but will not fail build:', e.message);
} 