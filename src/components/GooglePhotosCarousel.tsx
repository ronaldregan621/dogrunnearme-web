'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

interface GooglePhoto {
  photo_reference: string;
  width: number;
  height: number;
  html_attributions: string[];
  url: string;
}

interface GooglePhotosCarouselProps {
  parkName: string;
  fallbackPhotos?: string[];
  className?: string;
}

export default function GooglePhotosCarousel({ 
  parkName, 
  fallbackPhotos = [], 
  className = "h-40 w-full" 
}: GooglePhotosCarouselProps) {
  const [photos, setPhotos] = useState<GooglePhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPhotos() {
      try {
        setLoading(true);
        
        // Call our API route to get Google Photos
        const response = await fetch(`/api/google-photos?query=${encodeURIComponent(parkName + ' dog run NYC')}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch photos');
        }
        
        const data = await response.json();
        
        if (data.photos && data.photos.length > 0) {
          setPhotos(data.photos);
        }
        
      } catch (err) {
        console.error('Error fetching Google Photos:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    fetchPhotos();
  }, [parkName]);

  // Show loading state
  if (loading) {
    return (
      <div className={`${className} bg-gray-200 animate-pulse flex items-center justify-center`}>
        <div className="text-gray-500 text-sm">Loading photos...</div>
      </div>
    );
  }

  // If we have Google Photos, show them
  if (photos.length > 0) {
    return (
      <div className={className}>
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          className="h-full w-full"
        >
          {photos.slice(0, 5).map((photo, idx) => (
            <SwiperSlide key={photo.photo_reference} className="h-full w-full">
              <div className="relative h-full w-full">
                <Image
                  src={photo.url}
                  alt={`${parkName} photo ${idx + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {/* Google attribution */}
                {photo.html_attributions.length > 0 && (
                  <div className="absolute bottom-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1">
                    <div dangerouslySetInnerHTML={{ 
                      __html: photo.html_attributions[0].replace(/target="_blank"/g, 'target="_blank" rel="noopener noreferrer"')
                    }} />
                  </div>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  }

  // Fallback to existing photos or Street View
  if (fallbackPhotos.length > 0) {
    return (
      <div className={className}>
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          className="h-full w-full"
        >
          {fallbackPhotos.slice(0, 5).map((url, idx) => (
            <SwiperSlide key={idx} className="h-full w-full">
              <Image
                src={url}
                alt={`${parkName} photo ${idx + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  }

  // Final fallback - show error or empty state
  return (
    <div className={`${className} bg-gray-200 flex items-center justify-center`}>
      <div className="text-gray-500 text-sm text-center p-4">
        {error ? `Error loading photos: ${error}` : 'No photos available'}
      </div>
    </div>
  );
} 