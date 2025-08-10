"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function HeroButtons() {
  const router = useRouter();

  const handleNearMe = () => {
    if (!navigator.geolocation) {
      alert('Geolocation not supported');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const coords = `${latitude.toFixed(4)},${longitude.toFixed(4)}`;
        router.push(`/parks?near=${coords}`);
      },
      () => alert('Location permission denied')
    );
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Link
        href="/parks"
        className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
      >
        Browse All Parks
      </Link>
      <button
        onClick={handleNearMe}
        className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
      >
        Find Near Me
      </button>
    </div>
  );
} 