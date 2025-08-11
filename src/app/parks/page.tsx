'use client';
export const dynamic = 'force-dynamic';

import { useState, useMemo, useEffect } from 'react';
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

export default function ParksDirectory() {
  const searchParams = useSearchParams();
  const nearParam = searchParams.get('near'); // e.g., "40.73,-73.99"

  const boroughs = Array.from(new Set(dogParks.map((p) => p.location.borough))).sort();

  const [query, setQuery] = useState('');
  const [selectedBorough, setSelectedBorough] = useState<string>('All');
  const [selectedAmenities, setSelectedAmenities] = useState<Set<string>>(new Set());
  const [minRating, setMinRating] = useState<number>(0);

  const filteredParks = useMemo(() => {
    let list = dogParks.filter((park) => {
      // Search query (name)
      if (query && !park.name.toLowerCase().includes(query.toLowerCase())) return false;
      // Borough filter
      if (selectedBorough !== 'All' && park.location.borough !== selectedBorough) return false;
      // Minimum safety rating filter (0–5)
      if (minRating > 0 && park.safety.rating < minRating) return false;
      // Amenities filter (all selected must be true)
      for (const amenity of selectedAmenities) {
        if (!park.features[amenity as keyof DogPark['features']]) return false;
      }
      return true;
    });

    // If near param provided, sort by distance
    if (nearParam) {
      const [lat, lng] = nearParam.split(',').map(Number);
      const dist = (p: DogPark) => haversine(lat, lng, p.location.coordinates.lat, p.location.coordinates.lng);
      list = [...list].sort((a, b) => dist(a) - dist(b));
    }
    return list;
  }, [query, selectedBorough, minRating, selectedAmenities, nearParam]);

  // Scroll to first park if near search applied
  useEffect(()=>{
    if(nearParam && filteredParks.length>0){
      const el=document.getElementById(filteredParks[0].id);
      el?.scrollIntoView({behavior:'smooth'});
    }
  },[nearParam, filteredParks]);

  const toggleAmenity = (key: string) => {
    setSelectedAmenities((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(key)) newSet.delete(key);
      else newSet.add(key);
      return newSet;
    });
  };

  function haversine(lat1:number,lng1:number,lat2:number,lng2:number){
    const R=6371;const toRad=(v:number)=>v*(Math.PI/180);
    const dLat=toRad(lat2-lat1);const dLng=toRad(lng2-lng1);
    const a=Math.sin(dLat/2)**2+Math.cos(toRad(lat1))*Math.cos(toRad(lat2))*Math.sin(dLng/2)**2;
    return R*2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <div className="bg-blue-600 text-white py-10 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">NYC Dog Park Directory</h1>
          <p className="text-blue-100 mt-2">Filter by amenities, rating, borough, and more—data refreshed monthly.</p>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search by name</label>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g., Tompkins Square"
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Borough */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Borough</label>
            <select
              value={selectedBorough}
              onChange={(e) => setSelectedBorough(e.target.value)}
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="All">All</option>
              {boroughs.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          {/* Min Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Min Safety Rating</label>
            <input
              type="number"
              min={0}
              max={5}
              step={0.1}
              value={minRating}
              onChange={(e) => setMinRating(parseFloat(e.target.value) || 0)}
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Amenities expandable */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Amenities</label>
            <div className="flex flex-wrap gap-2">
              {ALL_AMENITIES.map(({ key, label }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => toggleAmenity(key)}
                  className={`px-2 py-1 rounded-full text-xs border ${selectedAmenities.has(key) ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300'} transition-colors`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredParks.length === 0 ? (
          <p className="text-gray-600">No parks match your filters.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredParks.map((park) => (
              <ParkCard key={park.id} park={park} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 