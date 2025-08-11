import { dogParks } from '@/data/dogParks';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

const prospectPark = dogParks.find(p => p.slug === 'prospect-park-dog-run');

export const metadata: Metadata = {
  title: 'Prospect Park Dog Beach - Off-Leash Dog Swimming in Brooklyn | DogRunNearMe',
  description: 'Prospect Park Dog Beach offers a safe spot for dogs to cool off in Brooklyn. See rules, hours, nearby dog runs, and directions.',
  keywords: [
    'prospect park dog beach',
    'dog beach brooklyn',
    'dog swimming brooklyn',
    'prospect park dogs',
    'off-leash dog beach nyc',
    'dog friendly beach brooklyn',
    'long meadow dog beach',
  ].join(', '),
  openGraph: {
    title: 'Prospect Park Dog Beach - Off-Leash Dog Swimming in Brooklyn',
    description:
      'Find Prospect Park Dog Beach details: location, guidelines, and nearby Prospect Park Dog Run amenities.',
  },
};

export default function ProspectParkDogBeachPage() {
  // Fallback coordinates if data is unavailable
  const lat = prospectPark?.location.coordinates.lat ?? 40.6602;
  const lng = prospectPark?.location.coordinates.lng ?? -73.9690;
  const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=800x400&maptype=roadmap&markers=color:blue%7Clabel:B%7C${lat},${lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;

  return (
    <div className="bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <nav className="mb-6">
          <Link href="/park/prospect-park-dog-run" className="text-blue-600 hover:underline">
            ← Back to Prospect Park Dog Run
          </Link>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Prospect Park Dog Beach
        </h1>
        <p className="text-gray-600 mb-6">
          Off-leash dog-friendly water access located within Prospect Park, Brooklyn.
        </p>

        <Image
          src={staticMapUrl}
          alt="Map showing the area of Prospect Park Dog Beach in Brooklyn"
          width={800}
          height={400}
          className="w-full rounded-lg mb-8"
        />

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">What to Know</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Popular cool-down spot for dogs inside Prospect Park.</li>
            <li>Follow posted off-leash hours and seasonal guidance from NYC Parks.</li>
            <li>Bring fresh water and a towel; rinse and dry your dog after swimming.</li>
            <li>Watch for posted advisories and avoid after heavy rain when water quality may be lower.</li>
          </ul>
        </section>

        <section className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Nearby Dog Run</h3>
            <p className="text-gray-700">
              The <Link href="/park/prospect-park-dog-run" className="text-blue-600 hover:underline">Prospect Park Dog Run</Link> offers separate areas, water fountains, shade, and seating.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Getting There</h3>
            <p className="text-gray-700">Use the Prospect Park entrances closest to Long Meadow; follow park signage to the dog-friendly water access.</p>
            <Link
              href={`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`}
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-3 text-blue-600 hover:underline"
            >
              Open in Google Maps →
            </Link>
          </div>
        </section>

        <section className="bg-green-50 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-2">Safety & Etiquette</h2>
          <p className="text-gray-700">
            Keep your dog under voice control, be courteous to others, and clean up after your pet. For the latest rules and advisories, see NYC Parks guidance.
          </p>
        </section>
      </div>
    </div>
  );
} 