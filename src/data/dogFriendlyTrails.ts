import { DogFriendlyTrail } from '@/types/dogFriendlyTrail';

export const dogFriendlyTrails: DogFriendlyTrail[] = [
  {
    id: 'prospect-park-bridle-path',
    name: 'Prospect Park Bridle Path',
    slug: 'prospect-park-bridle-path',
    location: {
      area: 'Brooklyn',
      address: 'Prospect Park, Brooklyn, NY',
      coordinates: { lat: 40.6602, lng: -73.9690 },
    },
    length: '3.5 miles loop',
    difficulty: 'Easy',
    description: 'A beautiful and scenic loop that takes you through the heart of Prospect Park. Mostly flat with paved and unpaved sections, it\'s perfect for a relaxing walk with your pup.',
    leash_rules: 'Dogs must be on a leash at all times.',
    photos: [],
    seo: {
      title: 'Prospect Park Bridle Path | Dog-Friendly Trails in Brooklyn',
      description: 'Explore the 3.5-mile Bridle Path in Prospect Park, a top-rated dog-friendly trail in Brooklyn. Leash required.',
      keywords: ['dog-friendly trail Brooklyn', 'Prospect Park', 'easy hiking trail NYC'],
    }
  },
  {
    id: 'van-cortlandt-park-john-muir-trail',
    name: 'Van Cortlandt Park - John Muir Trail',
    slug: 'van-cortlandt-park-john-muir-trail',
    location: {
      area: 'The Bronx',
      address: 'Van Cortlandt Park, Bronx, NY',
      coordinates: { lat: 40.8933, lng: -73.8901 },
    },
    length: '1.5 miles loop',
    difficulty: 'Moderate',
    description: 'Escape the city on this wooded trail that features varied terrain, including hills and rocky paths. It\'s a great way to give your dog a real taste of nature without leaving the Bronx.',
    leash_rules: 'Dogs must be on a leash no longer than 6 feet.',
    photos: [],
    seo: {
      title: 'John Muir Trail in Van Cortlandt Park | Dog-Friendly Hiking NYC',
      description: 'A moderate, 1.5-mile dog-friendly hiking trail in the Bronx. Discover a scenic and natural escape for you and your leashed dog.',
      keywords: ['dog-friendly trail Bronx', 'Van Cortlandt Park', 'moderate hiking trail NYC'],
    }
  },
  {
    id: 'inwood-hill-park-hiking-trail',
    name: 'Inwood Hill Park Hiking Trail',
    slug: 'inwood-hill-park-hiking-trail',
    location: {
      area: 'Manhattan',
      address: 'Inwood Hill Park, New York, NY',
      coordinates: { lat: 40.8711, lng: -73.9234 },
    },
    length: '2.0 miles loop',
    difficulty: 'Moderate',
    description: 'Discover the last natural forest and salt marsh in Manhattan. This trail offers surprisingly rugged terrain and beautiful views of the Hudson River and the Palisades.',
    leash_rules: 'Leash required. Off-leash hours are available in designated areas before 9 a.m. and after 9 p.m.',
    photos: [],
    seo: {
      title: 'Inwood Hill Park Hiking Trail | Dog-Friendly Trails Manhattan',
      description: 'A beautiful 2-mile loop trail in Manhattan\'s last natural forest. A perfect urban escape for you and your dog.',
      keywords: ['dog-friendly trail Manhattan', 'Inwood Hill Park', 'off-leash hours hiking'],
    }
  },
]; 