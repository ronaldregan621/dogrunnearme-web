const fs = require('fs');
const path = require('path');

// You'll need to get your Google Places API key from:
// https://console.cloud.google.com/apis/credentials
const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;

if (!GOOGLE_PLACES_API_KEY) {
  console.error('❌ GOOGLE_PLACES_API_KEY environment variable is required');
  console.error('💡 Get your API key from: https://console.cloud.google.com/apis/credentials');
  console.error('💡 Enable these APIs: Places API, Maps Static API');
  console.error('💡 Set the key: export GOOGLE_PLACES_API_KEY="your-key-here"');
  process.exit(1);
}

// Park locations to search for (matching your existing park IDs)
const parkSearchQueries = [
  { id: 'central-park-dog-run', query: 'Central Park Dog Run NYC' },
  { id: 'tompkins-square-dog-run', query: 'Tompkins Square Park Dog Run NYC' },
  { id: 'washington-square-dog-run', query: 'Washington Square Park Dog Run NYC' },
  { id: 'prospect-park-dog-beach', query: 'Prospect Park Dog Beach Brooklyn' },
  { id: 'chelsea-waterside-dog-park', query: 'Chelsea Waterside Dog Park NYC' },
  { id: 'carl-schurz-dog-run', query: 'Carl Schurz Park Dog Run NYC' },
  { id: 'riverside-dog-run', query: 'Riverside Park Dog Run NYC' },
  { id: 'madison-square-dog-run', query: 'Madison Square Park Dog Run NYC' },
  { id: 'union-square-dog-run', query: 'Union Square Dog Run NYC' },
  { id: 'fort-greene-dog-run', query: 'Fort Greene Park Dog Run Brooklyn' },
  { id: 'mccarren-dog-run', query: 'McCarren Park Dog Run Brooklyn' },
  { id: 'maria-hernandez-dog-run', query: 'Maria Hernandez Park Dog Run Brooklyn' },
  { id: 'brooklyn-bridge-dog-run', query: 'Brooklyn Bridge Park Dog Run' },
  { id: 'domino-dog-run', query: 'Domino Park Dog Run Brooklyn' },
  { id: 'gantry-plaza-dog-run', query: 'Gantry Plaza State Park Dog Run Queens' },
  { id: 'astoria-park-dog-run', query: 'Astoria Park Dog Run Queens' },
  { id: 'flushing-meadows-dog-run', query: 'Flushing Meadows Dog Run Queens' },
  { id: 'pelham-bay-dog-run', query: 'Pelham Bay Park Dog Run Bronx' },
  { id: 'van-cortlandt-dog-run', query: 'Van Cortlandt Park Dog Run Bronx' },
  { id: 'conference-house-dog-run', query: 'Conference House Park Dog Run Staten Island' }
];

async function findPlaceId(query) {
  const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(query)}&inputtype=textquery&fields=place_id,name&key=${GOOGLE_PLACES_API_KEY}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (data.error_message) {
      throw new Error(data.error_message);
    }
    
    if (data.candidates && data.candidates.length > 0) {
      return {
        place_id: data.candidates[0].place_id,
        name: data.candidates[0].name
      };
    }
    return null;
  } catch (error) {
    console.error(`Error finding place for "${query}":`, error.message);
    return null;
  }
}

async function getPlacePhotos(placeId, maxPhotos = 5) {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=photos&key=${GOOGLE_PLACES_API_KEY}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (data.error_message) {
      throw new Error(data.error_message);
    }
    
    if (data.result && data.result.photos) {
      const photos = data.result.photos.slice(0, maxPhotos).map(photo => ({
        photo_reference: photo.photo_reference,
        width: photo.width,
        height: photo.height,
        html_attributions: photo.html_attributions || [],
        // Generate the photo URL that works in Next.js Image component
        url: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${photo.photo_reference}&key=${GOOGLE_PLACES_API_KEY}`
      }));
      
      return photos;
    }
    return [];
  } catch (error) {
    console.error(`Error fetching photos for place ID ${placeId}:`, error.message);
    return [];
  }
}

async function fetchAllParkPhotos() {
  console.log('🔍 Fetching Google Photos for NYC Dog Parks...\n');
  console.log(`🔑 Using API Key: ${GOOGLE_PLACES_API_KEY.substring(0, 20)}...\n`);
  
  const results = {};
  let totalPhotos = 0;
  
  for (const park of parkSearchQueries) {
    console.log(`📍 Searching for: ${park.query}`);
    
    // Find the place ID
    const placeInfo = await findPlaceId(park.query);
    if (!placeInfo) {
      console.log(`   ❌ Could not find place ID\n`);
      results[park.id] = { photos: [], error: 'Place not found' };
      continue;
    }
    
    console.log(`   ✅ Found: ${placeInfo.name} (${placeInfo.place_id})`);
    
    // Get photos for this place
    const photos = await getPlacePhotos(placeInfo.place_id);
    console.log(`   📸 Found ${photos.length} photos\n`);
    
    totalPhotos += photos.length;
    
    results[park.id] = {
      place_id: placeInfo.place_id,
      name: placeInfo.name,
      photos: photos,
      query: park.query,
      updated: new Date().toISOString()
    };
    
    // Rate limiting - Google allows 1000 requests per day, be conservative
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  
  // Create scripts directory if it doesn't exist
  const scriptsDir = path.dirname(__filename);
  if (!fs.existsSync(scriptsDir)) {
    fs.mkdirSync(scriptsDir, { recursive: true });
  }
  
  // Save results to JSON file
  const outputPath = path.join(__dirname, '../src/data/google-photos.json');
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
  
  console.log(`\n✅ Results saved to: ${outputPath}`);
  console.log(`📊 Summary: ${totalPhotos} total photos found`);
  
  Object.entries(results).forEach(([parkId, data]) => {
    const count = data.photos?.length || 0;
    const status = count > 0 ? '✅' : '❌';
    console.log(`   ${status} ${parkId}: ${count} photos`);
  });
  
  console.log(`\n💡 Next steps:`);
  console.log(`   1. Run: npm run update-photos`);
  console.log(`   2. Review the updated photos in your park cards`);
  console.log(`   3. Test the site locally with: npm run dev`);
  
  return results;
}

// Run the script
if (require.main === module) {
  fetchAllParkPhotos()
    .then(() => {
      console.log('\n🎉 Google Photos fetch completed!');
    })
    .catch(error => {
      console.error('❌ Script failed:', error);
      process.exit(1);
    });
}

module.exports = { fetchAllParkPhotos, findPlaceId, getPlacePhotos }; 