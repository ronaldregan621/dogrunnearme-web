import { dogParks } from '@/data/dogParks';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';

type PageParams = { slug: string };

export async function generateMetadata({ params }: { params: Promise<PageParams> }): Promise<Metadata> {
  const { slug } = await params;
  const park = dogParks.find((p) => p.slug === slug);
  if (!park) {
    return {
      title: 'Park Not Found',
    };
  }

  const title = `${park.name} - ${park.location.borough} | DogRunNearMe`;
  const description = `Find details for ${park.name}, a dog-friendly park in ${park.location.borough}. View off-leash hours, amenities, safety ratings, and user photos.`;
  const keywords = `dog park ${park.location.borough}, ${park.name}, dog runs ${park.location.borough}, ${park.location.address}`;

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      images: [
        {
          url: `https://www.dogrunnearme.com/api/og?title=${encodeURIComponent(park.name)}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function Page({ params }: { params: Promise<PageParams> }) {
  const { slug } = await params;
  const park = dogParks.find((p) => p.slug === slug);
  if (!park) return notFound();

  const streetViewUrl = `https://maps.googleapis.com/maps/api/streetview?size=800x400&location=${park.location.coordinates.lat},${park.location.coordinates.lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{park.name}</h1>
        <p className="text-gray-600 mb-4">
          {park.location.address} · {park.location.borough}
        </p>

        <Image
          src={streetViewUrl}
          alt={`A street view image of ${park.name} in ${park.location.borough}, a popular dog run near me.`}
          width={800}
          height={400}
          className="w-full rounded-lg mb-4"
        />

        <div className="mb-8">
          <a
            href={`https://maps.google.com/maps?q=${encodeURIComponent(`${park.name}, ${park.location.address}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Directions to ${park.name}`}
            className="inline-block border border-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-50 transition-colors"
          >
            📍 Directions
          </a>
        </div>

        {/* Features */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Features</h2>
        <ul className="list-disc list-inside grid grid-cols-2 gap-2 mb-8">
          {Object.entries(park.features)
            .filter(([, val]) => val)
            .map(([key]) => (
              <li key={key} className="capitalize text-gray-700 text-sm">
                {key.replace(/([A-Z])/g, ' $1')}
              </li>
            ))}
        </ul>

        {/* Safety & Accessibility */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Safety Rating</h3>
            <p className="text-green-600 font-bold text-2xl">{park.safety.rating.toFixed(1)} / 5</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Accessibility</h3>
            <ul className="list-disc list-inside text-sm text-gray-700">
              {Object.entries(park.accessibility)
                .filter(([, val]) => val)
                .map(([key]) => (
                  <li key={key} className="capitalize">
                    {key.replace(/([A-Z])/g, ' $1')}
                  </li>
                ))}
            </ul>
          </div>
        </div>

        {park.slug === 'prospect-park-dog-run' && (
          <div className="mt-12 border-t pt-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Prospect Park Dog Beach</h2>
            <p className="text-gray-700 mb-3">
              Looking for a place for your pup to cool off? Explore the dog-friendly water access inside Prospect Park.
            </p>
            <Link href="/park/prospect-park-dog-run/dog-beach" className="inline-block text-blue-600 font-semibold hover:underline mr-4">
              View Prospect Park Dog Beach →
            </Link>
            <Link href="/guides/prospect-park-with-dogs.md" className="inline-block text-green-700 font-semibold hover:underline">
              Prospect Park With Dogs Guide →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
} 