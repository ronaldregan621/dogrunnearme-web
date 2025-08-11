'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
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

  const hasPhotos = park.photos && park.photos.length > 0;

  return (
    <div id={park.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-40 w-full bg-gray-200">
        {hasPhotos ? (
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            className="h-full w-full"
          >
            {park.photos.map((url, idx) => (
              <SwiperSlide key={idx} className="h-full w-full">
                <Image
                  src={url}
                  alt={`${park.name} photo ${idx + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="h-full w-full flex items-center justify-center text-gray-500">
            No Photo Available
          </div>
        )}
      </div>

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