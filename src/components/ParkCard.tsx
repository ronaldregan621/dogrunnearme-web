'use client';

import { DogPark } from '@/types/dogPark';
import Link from 'next/link';
import GooglePhotosCarousel from './GooglePhotosCarousel';

interface ParkCardProps {
  park: DogPark;
}

export default function ParkCard({ park }: ParkCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'text-green-600';
      case 'closed': return 'text-red-600';
      case 'maintenance': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'open': return 'Open';
      case 'closed': return 'Closed';
      case 'maintenance': return 'Maintenance';
      default: return 'Unknown';
    }
  };

  // Create fallback Street View URL
  const streetViewUrl = park.location.coordinates 
    ? `https://maps.googleapis.com/maps/api/streetview?size=600x300&location=${park.location.coordinates.lat},${park.location.coordinates.lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
    : null;

  const fallbackPhotos = park.photos.length > 0 
    ? park.photos 
    : streetViewUrl 
    ? [streetViewUrl] 
    : [];

  return (
    <div id={park.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* Google Photos Carousel */}
      <GooglePhotosCarousel 
        parkName={park.name}
        fallbackPhotos={fallbackPhotos}
        className="h-40 w-full"
      />

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
            {park.name}
          </h3>
          <span className={`text-sm font-medium ${getStatusColor(park.status)}`}>
            {getStatusText(park.status)}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-3">
          {park.location.address}
        </p>

        {/* Features */}
        <div className="flex flex-wrap gap-1 mb-3">
          {park.features.separateAreas && (
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
              Separate Areas
            </span>
          )}
          {park.features.waterFountain && (
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
              Water
            </span>
          )}
          {park.features.shade && (
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
              Shade
            </span>
          )}
          {park.features.seating && (
            <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">
              Seating
            </span>
          )}
        </div>

        {/* Rating and Hours */}
        <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
          <span>Safety: {park.safety.rating}/5</span>
          <span>{park.hours.open} - {park.hours.close}</span>
        </div>

        {/* View Details Link */}
        <Link 
          href={`/park/${park.slug}`}
          className="block w-full bg-blue-600 text-white text-center py-2 rounded hover:bg-blue-700 transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
} 