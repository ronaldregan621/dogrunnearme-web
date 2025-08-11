import { DogSwimmingSpot } from '@/types/dogSwimmingSpot';

export const dogSwimmingSpots: DogSwimmingSpot[] = [
  {
    id: 'prospect-park-dog-beach',
    name: 'Prospect Park Dog Beach',
    slug: 'prospect-park-dog-beach',
    location: {
      area: 'Brooklyn',
      address: 'Prospect Park, Brooklyn, NY',
      coordinates: { lat: 40.6602, lng: -73.9690 },
    },
    type: 'Lake',
    water_quality: 'Good',
    description: 'A dedicated swimming area for dogs located in Prospect Park\'s Long Meadow. It\'s a popular spot for dogs to cool off and socialize in the summer months.',
    rules: 'Dogs can be off-leash in the Long Meadow before 9 a.m. and after 9 p.m.',
    photos: [],
    seo: {
      title: 'Prospect Park Dog Beach | Dog Swimming in Brooklyn',
      description: 'Find info on Prospect Park\'s Dog Beach, a popular spot for dogs to swim off-leash in Brooklyn. Check rules and off-leash hours.',
      keywords: ['dog swimming Brooklyn', 'Prospect Park Dog Beach', 'dog friendly lake NYC'],
    }
  },
  {
    id: 'plumb-beach',
    name: 'Plumb Beach',
    slug: 'plumb-beach',
    location: {
      area: 'Brooklyn',
      address: 'Plumb Beach, Brooklyn, NY',
      coordinates: { lat: 40.5815, lng: -73.9240 },
    },
    type: 'Beach',
    water_quality: 'Check Before Visiting',
    description: 'A natural shoreline on the north side of the Rockaway Inlet. It\'s a calm spot perfect for dogs who are new to swimming in the ocean. The water is shallow and the waves are gentle.',
    rules: 'Dogs are allowed on the sand and in the water from October 1 to May 1. Leash required.',
    photos: [],
    seo: {
      title: 'Plumb Beach | Dog-Friendly Beach in Brooklyn',
      description: 'Plumb Beach is a dog-friendly beach in Brooklyn, perfect for a calm ocean swim with your leashed dog during the offseason (Oct 1 - May 1).',
      keywords: ['dog friendly beach Brooklyn', 'Plumb Beach', 'dog swimming NYC'],
    }
  },
  {
    id: 'montauk-beaches',
    name: 'Montauk Beaches',
    slug: 'montauk-beaches',
    location: {
      area: 'Long Island',
      address: 'Montauk, NY',
      coordinates: { lat: 41.0359, lng: -71.9545 },
    },
    type: 'Beach',
    water_quality: 'Good',
    description: 'While a bit of a trip from NYC, the beaches in Montauk are famously dog-friendly. Many areas allow dogs off-leash during the offseason, offering miles of sand for them to run and swim.',
    rules: 'Rules vary by beach. Generally, dogs are allowed off-leash on ocean beaches from Oct 1 to May 1.',
    photos: [],
    seo: {
      title: 'Montauk Beaches | Off-Leash Dog-Friendly Beaches Near NYC',
      description: 'Planning a trip? The beaches of Montauk are very dog-friendly, with many allowing off-leash swimming during the offseason.',
      keywords: ['dog friendly beach Long Island', 'Montauk', 'off-leash dog beach'],
    }
  },
]; 