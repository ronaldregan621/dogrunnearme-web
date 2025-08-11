const fs = require('fs');
const path = require('path');

function updateParkPhotos() {
  console.log('🔄 Updating park data with Google Photos...\n');

  // Read the Google photos data
  const googlePhotosPath = path.join(__dirname, '../src/data/google-photos.json');
  if (!fs.existsSync(googlePhotosPath)) {
    console.error('❌ Google photos data not found. Run fetch-google-photos.js first.');
    process.exit(1);
  }

  const googlePhotos = JSON.parse(fs.readFileSync(googlePhotosPath, 'utf8'));

  // Read the current park data
  const parkDataPath = path.join(__dirname, '../src/data/dogParks.ts');
  let parkDataContent = fs.readFileSync(parkDataPath, 'utf8');

  // Update each park's photos array
  Object.entries(googlePhotos).forEach(([parkId, data]) => {
    if (data.photos && data.photos.length > 0) {
      const photoUrls = data.photos.map(photo => `"${photo.url}"`).join(',\n      ');
      
      // Find the park in the data and update its photos array
      const parkRegex = new RegExp(`(id: '${parkId}'[\\s\\S]*?photos: \\[)[\\s\\S]*?(\\],)`, 'm');
      const match = parkDataContent.match(parkRegex);
      
      if (match) {
        const updatedPhotos = `${match[1]}\n      ${photoUrls}\n    ${match[2]}`;
        parkDataContent = parkDataContent.replace(parkRegex, updatedPhotos);
        console.log(`✅ Updated ${parkId}: ${data.photos.length} photos`);
      } else {
        console.log(`⚠️  Could not find park ${parkId} in data file`);
      }
    } else {
      console.log(`⚠️  No photos found for ${parkId}`);
    }
  });

  // Write the updated park data back
  fs.writeFileSync(parkDataPath, parkDataContent);
  console.log(`\n✅ Park data updated successfully!`);
  
  // Also create a backup
  const backupPath = parkDataPath.replace('.ts', '.backup.ts');
  fs.writeFileSync(backupPath, parkDataContent);
  console.log(`💾 Backup saved to: ${backupPath}`);
}

// Add Google Photos attribution component
const attributionComponent = `import React from 'react';

interface GooglePhotoAttributionProps {
  attributions: string[];
}

export function GooglePhotoAttribution({ attributions }: GooglePhotoAttributionProps) {
  if (!attributions || attributions.length === 0) return null;

  return (
    <div className="text-xs text-gray-500 mt-1">
      {attributions.map((attribution, index) => (
        <div key={index} dangerouslySetInnerHTML={{ __html: attribution }} />
      ))}
    </div>
  );
}`;

// Save the attribution component
const attributionPath = path.join(__dirname, '../src/components/GooglePhotoAttribution.tsx');
fs.writeFileSync(attributionPath, attributionComponent);
console.log(`📝 Created Google Photo Attribution component: ${attributionPath}`);

// Run the update
if (require.main === module) {
  updateParkPhotos();
}

module.exports = { updateParkPhotos }; 