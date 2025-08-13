import { dogParks } from '@/data/dogParks';
import { dogFriendlyTrails } from '@/data/dogFriendlyTrails';
import { dogSwimmingSpots } from '@/data/dogSwimmingSpots';
import ParkCard from '@/components/ParkCard';
// import TopParksCarousel from '@/components/TopParksCarousel';
import HeroButtons from '@/components/HeroButtons';
import AboutSection from '@/components/AboutSection';
import { Dog, Fence, Clock, Accessibility, Mountain, Waves } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';
import HeroGameSection from '@/components/HeroGameSection';

export const metadata: Metadata = {
  title: 'Find a Dog Park Near Me - The Best NYC Dog Parks, Voted by Redditors',
  description: "Looking for a dog park near me in NYC? Discover the best off-leash areas with our complete guide, featuring safety reviews, photos, and community insights. Because dog runs beat dog parks every time.",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1>Find your dog's new favorite spot in 30 seconds</h1>
          <p className="hero-subtitle">See what 10,000+ NYC dog parents are raving about right now</p>
          <div className="browse-hooks">
            <span className="hook">This week's most talked-about parks</span>
            <span className="hook">Secret spots your neighbors don't want you to know</span>
            <span className="hook">Parks perfect for your dog's personality</span>
          </div>
        </div>
      </section>

      <HeroGameSection />

      {/* Removed Top Parks Carousel for MVP stability */}
      {/* <TopParksCarousel /> */}

      {/* Stats Section */}
      <div className="bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <Dog className="w-10 h-10 mx-auto text-blue-500 mb-2" />
              <div className="text-3xl font-bold text-gray-900 mb-1">{dogParks.length}</div>
              <p className="text-gray-600">Dog Parks</p>
            </div>
            <div className="text-center">
              <Fence className="w-10 h-10 mx-auto text-green-500 mb-2" />
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {dogParks.filter(park => park.features.separateAreas).length}
              </div>
              <p className="text-gray-600">Separate Areas</p>
            </div>
            <div className="text-center">
              <Clock className="w-10 h-10 mx-auto text-purple-500 mb-2" />
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {dogParks.filter(park => park.hours.extendedHours).length}
              </div>
              <p className="text-gray-600">Extended Hours</p>
            </div>
            <div className="text-center">
              <Accessibility className="w-10 h-10 mx-auto text-orange-500 mb-2" />
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {dogParks.filter(park => park.accessibility.wheelchairAccessible).length}
              </div>
              <p className="text-gray-600">Accessible</p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose Our Directory?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We&apos;ve researched every NYC dog park to bring you the most comprehensive and up-to-date information
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Tried & Loved</h3>
            <p className="text-gray-600">
              Real stories from dog parents like you, plus which parks are perfect for nervous rescues vs. social butterflies
            </p>
          </div>

          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Fresh Intel</h3>
            <p className="text-gray-600">
              Park conditions and busy times updated this week by local dog parents (see what changed!)
            </p>
          </div>

          <div className="text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Your Perfect Match Awaits</h3>
            <p className="text-gray-600">
              Find parks with exactly what you need: fencing, water bowls, parking, and the right vibe for your pup
            </p>
            <div className="mt-4 flex flex-wrap gap-3 justify-center text-sm">
              <Link href="/nyc/manhattan" className="text-blue-600 hover:underline">Manhattan</Link>
              <Link href="/nyc/brooklyn" className="text-blue-600 hover:underline">Brooklyn</Link>
              <Link href="/nyc/queens" className="text-blue-600 hover:underline">Queens</Link>
              <Link href="/nyc/bronx" className="text-blue-600 hover:underline">Bronx</Link>
              <Link href="/nyc/staten-island" className="text-blue-600 hover:underline">Staten Island</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Parks Grid */}
      <div className="bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              This Week&apos;s Favorites
            </h2>
            <p className="text-xl text-gray-600">
              Parks other dog parents can&apos;t stop talking about (see why everyone&apos;s obsessed)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dogParks.slice(0, 6).map((park) => (
              <ParkCard key={park.id} park={park} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/parks" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              See This Week&apos;s Most Popular Spots
            </Link>
          </div>
        </div>
      </div>

      {/* Paws on the Path Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
              <Mountain className="w-8 h-8 text-green-600" />
              Paws on the Path
            </h2>
            <p className="text-xl text-gray-600">
              Explore the best dog-friendly hiking and walking trails in and around NYC.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {dogFriendlyTrails.map((trail) => (
              <div key={trail.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-40 w-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">Image</span>
                </div>
                <div className="p-4">
                  <div className="text-sm font-semibold text-blue-600">{trail.location.area}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mt-1">{trail.name}</h3>
                  <p className="text-gray-600 text-sm mt-2">{trail.length} · {trail.difficulty}</p>
                  <Link href={`/trails/${trail.slug}`} className="text-blue-600 hover:text-blue-700 font-semibold mt-4 inline-block">
                    Explore Trail &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/trails" className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
              View All Trails
            </Link>
          </div>
        </div>
      </div>

      {/* Doggie Paddles Section */}
      <div className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
              <Waves className="w-8 h-8 text-blue-600" />
              Doggie Paddles
            </h2>
            <p className="text-xl text-gray-600">
              Discover NYC&#39;s top dog-friendly swimming spots.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {dogSwimmingSpots.map((spot) => (
              <div key={spot.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-40 w-full bg-blue-200 flex items-center justify-center">
                  <span className="text-blue-500">Image</span>
                </div>
                <div className="p-4">
                  <div className="text-sm font-semibold text-blue-600">{spot.location.area}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mt-1">{spot.name}</h3>
                  <p className="text-gray-600 text-sm mt-2">{spot.type} · <span className="font-medium">{spot.water_quality}</span></p>
                  <Link href={`/swimming/${spot.slug}`} className="text-blue-600 hover:text-blue-700 font-semibold mt-4 inline-block">
                    Learn More &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/swimming" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              View All Swimming Spots
            </Link>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Find Your Spot in 30 Seconds
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join 10,000+ dog parents who discovered their go-to parks here (see what you&apos;ve been missing)
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <HeroButtons />
          </div>
        </div>
      </div>

      <AboutSection />
    </div>
  );
}
