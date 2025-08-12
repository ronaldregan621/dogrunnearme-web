import { dogParks } from '@/data/dogParks';
import type { Metadata } from 'next';
import Link from 'next/link';

const BOROUGH_LABELS: Record<string, string> = {
  'manhattan': 'Manhattan',
  'brooklyn': 'Brooklyn',
  'queens': 'Queens',
  'bronx': 'Bronx',
  'staten-island': 'Staten Island',
};

export async function generateStaticParams() {
  return Object.keys(BOROUGH_LABELS).map((b) => ({ borough: b }));
}

export async function generateMetadata({ params }: { params: Promise<{ borough: string }> }): Promise<Metadata> {
  const { borough } = await params;
  const label = BOROUGH_LABELS[borough] || 'NYC';
  return {
    title: `Dog Parks in ${label} | Find a Dog Park Near Me`,
    description: `Browse the best dog parks in ${label}. Filter by amenities, safety, hours, and more.`,
  };
}

export default async function BoroughParksPage({ params }: { params: Promise<{ borough: string }> }) {
  const { borough } = await params;
  const label = BOROUGH_LABELS[borough] || 'NYC';
  const parks = dogParks.filter((p) => p.location.borough.toLowerCase() === label.toLowerCase());

  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: parks.map((park, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `https://www.dogrunnearme.com/park/${park.slug}`,
      name: park.name,
    })),
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Dog Parks in {label}</h1>
      <p className="text-gray-600 mb-6">Find the top dog parks in {label}. Click any park for details, directions, and amenities.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {parks.map((park) => (
          <Link key={park.id} href={`/park/${park.slug}`} className="block p-4 bg-white rounded shadow hover:shadow-md transition">
            <div className="text-sm text-gray-500">{park.location.address}</div>
            <div className="text-lg font-semibold text-gray-900">{park.name}</div>
            <div className="text-sm text-gray-600 mt-1">Safety {park.safety.rating}/5 · {park.features.separateAreas ? 'Separate areas' : 'Single area'}</div>
          </Link>
        ))}
      </div>
      {parks.length === 0 && (
        <p className="text-gray-600">No parks found in {label} yet.</p>
      )}
    </div>
  );
} 