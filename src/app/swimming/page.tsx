import { dogSwimmingSpots } from '@/data/dogSwimmingSpots';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Doggie Paddles: NYC\'s Top Dog-Friendly Swimming Spots',
  description: 'Discover the best dog-friendly beaches, lakes, and swimming holes in and around NYC where your pup can cool off.',
};

export default function SwimmingPage() {
  const getWaterQualityColor = (quality: string) => {
    switch (quality) {
      case 'Good': return 'bg-green-100 text-green-800';
      case 'Fair': return 'bg-yellow-100 text-yellow-800';
      case 'Check Before Visiting': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Doggie Paddles
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Dive into the best dog-friendly swimming spots in and around NYC.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dogSwimmingSpots.map((spot) => (
            <div key={spot.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 w-full bg-blue-200 flex items-center justify-center">
                <span className="text-blue-500">Image Coming Soon</span>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center text-sm">
                  <p className="font-semibold text-blue-600 uppercase tracking-wide">{spot.location.area}</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getWaterQualityColor(spot.water_quality)}`}>
                    {spot.water_quality}
                  </span>
                </div>
                <h2 className="mt-2 text-2xl font-bold text-gray-900">
                  <Link href={`/swimming/${spot.slug}`} className="hover:text-blue-700">
                    {spot.name}
                  </Link>
                </h2>
                <p className="mt-3 text-gray-600 h-24 overflow-hidden">
                  {spot.description}
                </p>
                <div className="mt-6">
                  <Link href={`/swimming/${spot.slug}`} className="text-blue-600 hover:text-blue-700 font-semibold">
                    View Swimming Rules &rarr;
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 