import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dog Park FAQs - Find a Dog Park Near You in NYC',
  description: 'Frequently asked questions about finding a dog park nearby within 5 miles, off-leash hours, indoor dog parks, and what makes a park dog-friendly in NYC.',
};

export default function FAQPage() {
  return (
    <div className="bg-white py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Your top questions about finding the perfect dog park near you in NYC.
          </p>
        </div>
        <div className="mt-16">
          <dl className="space-y-10">
            <div>
              <dt className="text-lg font-semibold leading-7 text-gray-900">
                How can I find dog parks within 5 miles of my location?
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600">
                The easiest way is to use our <a href="/parks" className="text-blue-600 hover:underline font-medium">"Find Near Me"</a> button on the homepage or parks directory. With your permission, it uses your device's location to automatically sort all parks by distance, showing you the closest options first. It's perfect for finding local dog parks within 5 miles or even closer.
              </dd>
            </div>

            <div>
              <dt className="text-lg font-semibold leading-7 text-gray-900">
                Are there indoor dog parks in NYC?
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600">
                While this directory focuses on public, outdoor dog parks, there are a few private, indoor dog parks and doggy daycare facilities in NYC. These typically require a membership or day pass. We recommend searching on Yelp or Google Maps for "indoor dog park" to find the latest options for rainy or cold days.
              </dd>
            </div>

            <div>
              <dt className="text-lg font-semibold leading-7 text-gray-900">
                What's the difference between a "dog park" and a "dog run"?
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600">
                The terms are often used interchangeably in NYC. Generally, a "dog run" is a fenced-off area where dogs can be off-leash, and it might be part of a larger park. A "dog park" might be a larger, dedicated space with more amenities. Our directory includes both, as they all serve the main purpose: giving your dog a safe place to play off-leash.
              </dd>
            </div>

            <div>
              <dt className="text-lg font-semibold leading-7 text-gray-900">
                What makes a park "dog-friendly"?
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600">
                All parks in our directory are dog-friendly, meaning they have designated off-leash areas. Key features that make a park especially dog-friendly include separate areas for small and large dogs, access to water fountains, waste bag dispensers, and secure double-gated entries. Our filters allow you to find parks with the specific amenities you and your dog need.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
} 