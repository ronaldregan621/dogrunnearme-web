import { dogParks } from '@/data/dogParks';
import Image from 'next/image';
import { notFound } from 'next/navigation';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Page({ params }: any) {
  const park = dogParks.find((p) => p.slug === params.slug);
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
          alt={park.name}
          width={800}
          height={400}
          className="w-full rounded-lg mb-8"
        />

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
      </div>
    </div>
  );
} 