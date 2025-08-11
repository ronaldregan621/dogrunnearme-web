import { dogFriendlyTrails } from '@/data/dogFriendlyTrails';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Paws on the Path: NYC\'s Top Dog-Friendly Trails',
  description: 'Discover the best dog-friendly hiking and walking trails in and around NYC. Find trails by difficulty, length, and location.',
};

export default function TrailsPage() {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Paws on the Path
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Explore the best dog-friendly hiking and walking trails in and around NYC.
          </p>
        </div>

        <div className="space-y-12">
          {dogFriendlyTrails.map((trail, index) => (
            <div key={trail.id} className={`flex flex-col md:flex-row gap-8 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
              <div className="md:w-1/2">
                <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-gray-200">
                  {/* Placeholder for an image */}
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-gray-500">Image Coming Soon</span>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
                  {trail.location.area} &middot; {trail.difficulty}
                </div>
                <h2 className="mt-2 text-2xl font-bold text-gray-900">
                  <Link href={`/trails/${trail.slug}`} className="hover:text-blue-700">
                    {trail.name}
                  </Link>
                </h2>
                <p className="mt-3 text-gray-600">
                  {trail.description}
                </p>
                <div className="mt-4 flex items-center text-sm text-gray-500">
                  <span>{trail.length}</span>
                  <span className="mx-2">&middot;</span>
                  <span>{trail.leash_rules}</span>
                </div>
                <div className="mt-6">
                  <Link href={`/trails/${trail.slug}`} className="text-blue-600 hover:text-blue-700 font-semibold">
                    View Trail Details &rarr;
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