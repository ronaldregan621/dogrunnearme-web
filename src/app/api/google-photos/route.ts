import { NextRequest, NextResponse } from 'next/server';

const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;

interface GooglePhoto {
  photo_reference: string;
  width: number;
  height: number;
  html_attributions: string[];
  url: string;
}

interface GooglePlacePhoto {
  photo_reference: string;
  width: number;
  height: number;
  html_attributions?: string[];
}

async function findPlaceId(query: string): Promise<{ place_id: string; name: string } | null> {
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
    console.error(`Error finding place for "${query}":`, error);
    return null;
  }
}

async function getPlacePhotos(placeId: string, maxPhotos: number = 5): Promise<GooglePhoto[]> {
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
      const photos = data.result.photos.slice(0, maxPhotos).map((photo: GooglePlacePhoto) => ({
        photo_reference: photo.photo_reference,
        width: photo.width,
        height: photo.height,
        html_attributions: photo.html_attributions || [],
        url: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${photo.photo_reference}&key=${GOOGLE_PLACES_API_KEY}`
      }));
      
      return photos;
    }
    return [];
  } catch (error) {
    console.error(`Error fetching photos for place ID ${placeId}:`, error);
    return [];
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');

  if (!query) {
    return NextResponse.json(
      { error: 'Query parameter is required' },
      { status: 400 }
    );
  }

  if (!GOOGLE_PLACES_API_KEY) {
    return NextResponse.json(
      { error: 'Google Places API key not configured' },
      { status: 500 }
    );
  }

  try {
    // Find the place ID
    const placeInfo = await findPlaceId(query);
    if (!placeInfo) {
      return NextResponse.json(
        { photos: [], message: 'Place not found' },
        { status: 200 }
      );
    }

    // Get photos for this place
    const photos = await getPlacePhotos(placeInfo.place_id);

    return NextResponse.json({
      place_id: placeInfo.place_id,
      name: placeInfo.name,
      photos: photos,
      query: query
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch photos' },
      { status: 500 }
    );
  }
} 