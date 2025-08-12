'use client';

import Link from 'next/link';
import Image from 'next/image';
// Swiper imports kept for now but not used while Street View is default
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Pagination, Autoplay } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/pagination';
import { DogPark } from '@/types/dogPark';

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

  const streetViewUrl = `https://maps.googleapis.com/maps/api/streetview?size=800x400&location=${park.location.coordinates.lat},${park.location.coordinates.lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;

  return (
    <div id={park.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-40 w-full bg-gray-200 relative">
        <Image
          src={streetViewUrl}
          alt={`Street View of ${park.name} at ${park.location.address}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="p-4">
        <div className="flex items-center mb-3 text-sm">
          <span className={`font-medium ${park.status === 'open' ? 'text-green-600' : park.status === 'maintenance' ? 'text-yellow-600' : 'text-red-600'}`}>
            {park.status === 'open' ? '🟢 Open Now' : park.status === 'maintenance' ? '⚠️ Maintenance' : '🔴 Closed'}
          </span>
          {Number.isFinite((park as any).distance) && (
            <span className="text-gray-700 ml-3">{(park as any).distance.toFixed(1)} mi away</span>
          )}
        </div>
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

        <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
          <span>Safety: {park.safety.rating}/5</span>
          <span>{park.hours.open} - {park.hours.close}</span>
        </div>

        <div className="flex gap-2">
          <Link 
            href={`/park/${park.slug}`}
            className="flex-1 bg-blue-600 text-white text-center py-2 rounded hover:bg-blue-700 transition-colors"
          >
            View Details
          </Link>
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${park.location.coordinates.lat},${park.location.coordinates.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 border border-gray-300 text-gray-800 text-center py-2 rounded hover:bg-gray-50 transition-colors"
          >
            Directions
          </a>
        </div>
      </div>
    </div>
  );
} 