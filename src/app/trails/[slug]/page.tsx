import { dogFriendlyTrails } from '@/data/dogFriendlyTrails';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';

type PageParams = { slug: string };

export async function generateMetadata({ params }: { params: Promise<PageParams> }): Promise<Metadata> {
  const { slug } = await params;
  const trail = dogFriendlyTrails.find((t) => t.slug === slug);
  if (!trail) {
    return { title: 'Trail Not Found' } as any;
  }
  return {
    title: trail.seo.title,
    description: trail.seo.description,
    keywords: trail.seo.keywords.join(', '),
  } as any;
}

export default async function TrailDetailsPage({ params }: { params: Promise<PageParams> }) {
  const { slug } = await params;
  const trail = dogFriendlyTrails.find((t) => t.slug === slug);
  if (!trail) return notFound();

  const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${trail.location.coordinates.lat},${trail.location.coordinates.lng}&zoom=13&size=800x400&maptype=roadmap&markers=color:blue%7Clabel:P%7C${trail.location.coordinates.lat},${trail.location.coordinates.lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">{trail.name}</h1>
          <p className="mt-2 text-lg text-gray-600">{trail.location.area}</p>
        </div>

        <Image
          src={staticMapUrl}
          alt={`Map showing the location of ${trail.name}`}
          width={800}
          height={400}
          className="w-full rounded-lg shadow-lg mb-8"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-8">
          <div>
            <div className="text-sm font-semibold text-gray-500 uppercase">Length</div>
            <div className="text-2xl font-bold text-gray-900">{trail.length}</div>
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-500 uppercase">Difficulty</div>
            <div className="text-2xl font-bold text-gray-900">{trail.difficulty}</div>
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-500 uppercase">Leash Rules</div>
            <div className="text-lg text-gray-900">{trail.leash_rules}</div>
          </div>
        </div>

        <div className="prose prose-lg max-w-none text-gray-700">
          <p>{trail.description}</p>
        </div>
      </div>
    </div>
  );
} 