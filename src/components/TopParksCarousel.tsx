"use client";

import { dogParks } from '@/data/dogParks';
import { DogPark } from '@/types/dogPark';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

function getCompositeScore(park: DogPark) {
  const amenityCount = Object.values(park.features).filter(Boolean).length;
  const rating = park.safety.rating; // 0–5
  return amenityCount + rating;
}

// pick first review comment if available
function getQuote(park: DogPark) {
  if (park.reviews && park.reviews.length > 0) {
    return park.reviews[0].comment;
  }
  return 'Loved by NYC dog owners!';
}

export default function TopParksCarousel() {
  const topParks = [...dogParks]
    .sort((a, b) => getCompositeScore(b) - getCompositeScore(a))
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Why People Love These Parks</h2>
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        loop
        className="">
        {topParks.map((park) => (
          <SwiperSlide key={park.id}>
            <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-2xl mx-auto">
              <Image
                src={`https://maps.googleapis.com/maps/api/streetview?size=600x300&location=${park.location.coordinates.lat},${park.location.coordinates.lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
                alt={park.name}
                width={600}
                height={300}
                className="w-full object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{park.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{park.location.address}</p>
                <p className="italic text-gray-700 mb-6">“{getQuote(park)}”</p>
                <Link
                  href={`/park/${park.slug}`}
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  View Park Details
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
} 