import { dogSwimmingSpots } from '@/data/dogSwimmingSpots';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';

type PageParams = { slug: string };

export async function generateMetadata({ params }: { params: Promise<PageParams> }): Promise<Metadata> {
  const { slug } = await params;
  const spot = dogSwimmingSpots.find((s) => s.slug === slug);
  if (!spot) {
    return { title: 'Swimming Spot Not Found' } as any;
  }
  return {
    title: spot.seo.title,
    description: spot.seo.description,
    keywords: spot.seo.keywords.join(', '),
  } as any;
}

export default async function SwimmingSpotDetailsPage({ params }: { params: Promise<PageParams> }) {
  const { slug } = await params;
  const spot = dogSwimmingSpots.find((s) => s.slug === slug);
  if (!spot) return notFound();

  const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${spot.location.coordinates.lat},${spot.location.coordinates.lng}&zoom=13&size=800x400&maptype=roadmap&markers=color:blue%7Clabel:S%7C${spot.location.coordinates.lat},${spot.location.coordinates.lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">{spot.name}</h1>
          <p className="mt-2 text-lg text-gray-600">{spot.location.area}</p>
        </div>

        <Image
          src={staticMapUrl}
          alt={`Map showing the location of ${spot.name}`}
          width={800}
          height={400}
          className="w-full rounded-lg shadow-lg mb-8"
        />

        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-8">
            <div>
              <div className="text-sm font-semibold text-gray-500 uppercase">Spot Type</div>
              <div className="text-2xl font-bold text-gray-900">{spot.type}</div>
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-500 uppercase">Water Quality</div>
              <div className="text-2xl font-bold text-gray-900">{spot.water_quality}</div>
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-500 uppercase">Primary Rule</div>
              <div className="text-lg text-gray-900">{spot.rules}</div>
            </div>
          </div>

          <div className="prose prose-lg max-w-none text-gray-700">
            <h2 className="text-2xl font-semibold text-gray-900">About this Spot</h2>
            <p>{spot.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
} 