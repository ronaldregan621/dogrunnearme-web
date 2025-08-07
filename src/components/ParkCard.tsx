'use client';

import Link from 'next/link';
import { DogPark } from '@/types/dogPark';

interface ParkCardProps {
  park: DogPark;
}

export default function ParkCard({ park }: ParkCardProps) {
  const getCrowdLevelColor = (level: string) => {
    switch (level) {
      case 'light': return 'text-green-600 bg-green-100';
      case 'moderate': return 'text-yellow-600 bg-yellow-100';
      case 'busy': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'text-green-600 bg-green-100';
      case 'closed': return 'text-red-600 bg-red-100';
      case 'maintenance': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const averageRating = park.reviews.length > 0 
    ? park.reviews.reduce((sum, review) => sum + review.rating, 0) / park.reviews.length 
    : 0;

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              <Link href={`/park/${park.slug}`} className="hover:text-blue-600 transition-colors">
                {park.name}
              </Link>
            </h3>
            <p className="text-gray-600 text-sm mb-2">{park.location.address}</p>
            <p className="text-gray-500 text-sm capitalize">{park.location.borough}</p>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(park.status)}`}>
              {park.status}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCrowdLevelColor(park.crowdLevel)}`}>
              {park.crowdLevel} crowd
            </span>
          </div>
        </div>

        {/* Safety Rating */}
        <div className="flex items-center mb-4">
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-700 mr-2">Safety:</span>
            <div className="flex items-center">
              <span className="text-lg font-semibold text-green-600 mr-1">{park.safety.rating}</span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${i < Math.round(park.safety.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Features:</h4>
          <div className="flex flex-wrap gap-2">
            {park.features.separateAreas && (
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Separate Areas</span>
            )}
            {park.features.waterFountain && (
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Water Fountain</span>
            )}
            {park.features.shade && (
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Shade</span>
            )}
            {park.features.agilityEquipment && (
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Agility Equipment</span>
            )}
            {park.hours.extendedHours && (
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Extended Hours</span>
            )}
          </div>
        </div>

        {/* Hours */}
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Hours:</span> {park.hours.open} - {park.hours.close}
            {park.hours.extendedHours && <span className="text-green-600 ml-1">(Extended)</span>}
          </p>
        </div>

        {/* Reviews Summary */}
        {park.reviews.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-700 mr-2">Reviews:</span>
                <div className="flex items-center">
                  <span className="text-lg font-semibold text-yellow-600 mr-1">{averageRating.toFixed(1)}</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < Math.round(averageRating) ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <span className="text-sm text-gray-500">({park.reviews.length} reviews)</span>
            </div>
          </div>
        )}

        {/* Accessibility */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Accessibility:</h4>
          <div className="flex flex-wrap gap-2">
            {park.accessibility.wheelchairAccessible && (
              <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">Wheelchair Accessible</span>
            )}
            {park.accessibility.pavedPaths && (
              <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">Paved Paths</span>
            )}
            {park.accessibility.easyEntry && (
              <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">Easy Entry</span>
            )}
          </div>
        </div>

        {/* View Details Button */}
        <Link 
          href={`/park/${park.slug}`}
          className="block w-full text-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
        >
          View Details
        </Link>
      </div>
    </div>
  );
} 