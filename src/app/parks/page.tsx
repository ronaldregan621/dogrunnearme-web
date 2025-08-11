'use client';
export const dynamic = 'force-dynamic';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { dogParks } from '@/data/dogParks';
import ParkCard from '@/components/ParkCard';
import { DogPark } from '@/types/dogPark';

const ALL_AMENITIES: { key: keyof DogPark['features']; label: string }[] = [
  { key: 'separateAreas', label: 'Separate Areas' },
  { key: 'waterFountain', label: 'Water Fountain' },
  { key: 'shade', label: 'Shade' },
  { key: 'seating', label: 'Seating' },
  { key: 'agilityEquipment', label: 'Agility Equipment' },
  { key: 'doubleGates', label: 'Double Gates' },
  { key: 'wasteBags', label: 'Waste Bags' },
  { key: 'lighting', label: 'Night Lighting' },
];

// Haversine formula to calculate distance between two coordinates
function haversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 3959; // Earth's radius in miles
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function ParksContent() {
  const searchParams = useSearchParams();
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<string>('all');

  const nearParam = searchParams.get('near');

  const filteredParks = useMemo(() => {
    let filtered = dogParks.filter((park) => {
      // Amenity filters
      if (selectedAmenities.length > 0) {
        const hasAllAmenities = selectedAmenities.every(amenity => 
          park.features[amenity as keyof DogPark['features']]
        );
        if (!hasAllAmenities) return false;
      }

      // Rating filter (using safety rating)
      if (selectedRating !== 'all') {
        const minRating = parseFloat(selectedRating);
        if (park.safety.rating < minRating) return false;
      }

      return true;
    });

    // Sort by distance if nearParam is provided
    if (nearParam) {
      try {
        const [lat, lng] = nearParam.split(',').map(Number);
        if (!isNaN(lat) && !isNaN(lng)) {
          filtered = filtered
            .map(park => ({
              ...park,
              distance: park.location.coordinates ? 
                haversine(lat, lng, park.location.coordinates.lat, park.location.coordinates.lng) : 
                Infinity
            }))
            .sort((a, b) => a.distance - b.distance);
        }
      } catch (error) {
        console.error('Error parsing near parameter:', error);
      }
    }

    return filtered;
  }, [selectedAmenities, selectedRating, nearParam]);

  // Scroll to closest park if nearParam is present
  useEffect(() => {
    if (nearParam && filteredParks.length > 0) {
      const closestPark = filteredParks[0];
      const element = document.getElementById(closestPark.id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [nearParam, filteredParks]);

  const handleAmenityChange = (amenity: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) 
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  const clearFilters = () => {
    setSelectedAmenities([]);
    setSelectedRating('all');
  };

  const activeFiltersCount = selectedAmenities.length + 
    (selectedRating !== 'all' ? 1 : 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            NYC Dog Parks Directory
          </h1>
          <p className="text-gray-600">
            Find the perfect dog park for you and your furry friend
          </p>
          {nearParam && (
            <p className="text-blue-600 mt-2">
              📍 Showing parks sorted by distance from your location
            </p>
          )}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
            {activeFiltersCount > 0 && (
              <button
                onClick={clearFilters}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Clear all ({activeFiltersCount})
              </button>
            )}
          </div>

          {/* Amenities */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Amenities</h3>
            <div className="flex flex-wrap gap-2">
              {ALL_AMENITIES.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => handleAmenityChange(key)}
                  className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                    selectedAmenities.includes(key)
                      ? 'bg-blue-100 border-blue-300 text-blue-800'
                      : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Rating Filter */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Safety Rating
              </label>
              <select
                value={selectedRating}
                onChange={(e) => setSelectedRating(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Any Rating</option>
                <option value="4.0">4.0+ Stars</option>
                <option value="4.5">4.5+ Stars</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredParks.length} of {dogParks.length} parks
          </p>
        </div>

        {/* Parks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredParks.map((park) => (
            <ParkCard key={park.id} park={park} />
          ))}
        </div>

        {filteredParks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No parks match your current filters.
            </p>
            <button
              onClick={clearFilters}
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ParksPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading parks...</p>
      </div>
    </div>}>
      <ParksContent />
    </Suspense>
  );
} 