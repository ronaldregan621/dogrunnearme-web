import { DogPark } from '@/types/dogPark';
import parkPhotos from './park-photos.json';

type ParkPhotos = {
  [key: string]: string[];
};

const allParkPhotos: ParkPhotos = parkPhotos;

let dogParksData: DogPark[] = [
  {
    id: 'central-park-dog-run',
    name: 'Central Park Dog Run',
    slug: 'central-park-dog-run',
    location: {
      address: 'Central Park, New York, NY',
      borough: 'Manhattan',
      coordinates: { lat: 40.7829, lng: -73.9654 }
    },
    status: 'open',
    features: {
      separateAreas: true,
      waterFountain: true,
      shade: true,
      seating: true,
      agilityEquipment: true,
      doubleGates: true,
      wasteBags: true,
      lighting: true
    },
    accessibility: {
      wheelchairAccessible: true,
      pavedPaths: true,
      easyEntry: true
    },
    safety: {
      rating: 4.2,
      separateSmallDogArea: true,
      regularMaintenance: true,
      emergencyContact: true
    },
    hours: {
      open: '6:00 AM',
      close: '10:00 PM',
      extendedHours: false
    },
    crowdLevel: 'moderate',
    reviews: [
      {
        id: '1',
        author: 'Sarah M.',
        rating: 4,
        comment: 'Great space for my golden retriever. Separate areas for small and large dogs make it much safer.',
        date: '2025-07-15'
      },
      {
        id: '2',
        author: 'Mike R.',
        rating: 5,
        comment: 'Love the water fountain and shade. My dog can play for hours without getting overheated.',
        date: '2025-07-14'
      }
    ],
    photos: [], // This will be replaced by the build script
    seo: {
      title: 'Central Park Dog Run - Best Dog Park in Manhattan',
      description: 'Central Park Dog Run features separate areas for small and large dogs, water fountains, shade, and agility equipment. Open 6 AM to 10 PM daily.',
      keywords: ['central park dog run', 'manhattan dog park', 'nyc dog park', 'separate dog areas']
    }
  },
  {
    id: 'washington-square-dog-run',
    name: 'Washington Square Park Dog Run',
    slug: 'washington-square-dog-run',
    location: {
      address: 'Washington Square South & Thompson St, Manhattan',
      borough: 'Manhattan',
      coordinates: { lat: 40.7308, lng: -73.9973 }
    },
    status: 'open',
    features: {
      separateAreas: true,
      waterFountain: true,
      shade: false,
      seating: true,
      agilityEquipment: false,
      doubleGates: true,
      wasteBags: true,
      lighting: true
    },
    accessibility: {
      wheelchairAccessible: true,
      pavedPaths: true,
      easyEntry: true
    },
    safety: {
      rating: 4.0,
      separateSmallDogArea: true,
      regularMaintenance: true,
      emergencyContact: true
    },
    hours: {
      open: '6:00 AM',
      close: '12:00 AM',
      extendedHours: true
    },
    crowdLevel: 'busy',
    reviews: [
      {
        id: '3',
        author: 'Jennifer L.',
        rating: 4,
        comment: 'Convenient location in the Village. Separate areas for small and large dogs. Gets crowded during peak hours.',
        date: '2025-07-16'
      },
      {
        id: '4',
        author: 'David K.',
        rating: 3,
        comment: 'Good park but could use more shade. My small dog loves the separate area.',
        date: '2025-07-13'
      }
    ],
    photos: [],
    seo: {
      title: 'Washington Square Park Dog Run - Greenwich Village',
      description: 'Washington Square Park Dog Run offers separate areas for small and large dogs. Open until midnight with extended hours.',
      keywords: ['washington square dog run', 'greenwich village dog park', 'nyc dog park', 'extended hours']
    }
  },
  {
    id: 'chelsea-waterside-dog-park',
    name: 'Chelsea Waterside Dog Park',
    slug: 'chelsea-waterside-dog-park',
    location: {
      address: 'Chelsea Waterside Park, Manhattan',
      borough: 'Manhattan',
      coordinates: { lat: 40.7484, lng: -74.0097 }
    },
    status: 'open',
    features: {
      separateAreas: true,
      waterFountain: true,
      shade: true,
      seating: true,
      agilityEquipment: true,
      doubleGates: true,
      wasteBags: true,
      lighting: true
    },
    accessibility: {
      wheelchairAccessible: true,
      pavedPaths: true,
      easyEntry: true
    },
    safety: {
      rating: 4.5,
      separateSmallDogArea: true,
      regularMaintenance: true,
      emergencyContact: true
    },
    hours: {
      open: '6:00 AM',
      close: '1:00 AM',
      extendedHours: true
    },
    crowdLevel: 'moderate',
    reviews: [
      {
        id: '5',
        author: 'Alex T.',
        rating: 5,
        comment: 'Newly renovated with great amenities. Separate areas for large and small dogs, lots of seating for humans.',
        date: '2025-07-17'
      },
      {
        id: '6',
        author: 'Maria S.',
        rating: 4,
        comment: 'Spacious run with water fountains and shade. My dog loves the agility equipment.',
        date: '2025-07-12'
      }
    ],
    photos: [],
    seo: {
      title: 'Chelsea Waterside Dog Park - Best Dog Park in Chelsea',
      description: 'Chelsea Waterside Dog Park features separate areas for large and small dogs, seating, water fountains, and extended hours until 1 AM.',
      keywords: ['chelsea waterside dog park', 'chelsea dog park', 'nyc dog park', 'separate dog areas']
    }
  },
  {
    id: 'carl-schurz-dog-run',
    name: 'Carl Schurz Dog Run',
    slug: 'carl-schurz-dog-run',
    location: {
      address: '83rd St & East River, Manhattan',
      borough: 'Manhattan',
      coordinates: { lat: 40.7769, lng: -73.9457 }
    },
    status: 'open',
    features: {
      separateAreas: true,
      waterFountain: true,
      shade: true,
      seating: true,
      agilityEquipment: false,
      doubleGates: true,
      wasteBags: true,
      lighting: true
    },
    accessibility: {
      wheelchairAccessible: true,
      pavedPaths: true,
      easyEntry: true
    },
    safety: {
      rating: 4.3,
      separateSmallDogArea: true,
      regularMaintenance: true,
      emergencyContact: true
    },
    hours: {
      open: '6:00 AM',
      close: '10:00 PM',
      extendedHours: false
    },
    crowdLevel: 'light',
    reviews: [
      {
        id: '7',
        author: 'Tom B.',
        rating: 4,
        comment: 'Great separate small dog run on 83rd and the East River. Peaceful location with good amenities.',
        date: '2025-07-16'
      },
      {
        id: '8',
        author: 'Lisa P.',
        rating: 5,
        comment: 'Perfect for my small dog. Separate area keeps her safe from larger dogs. Beautiful river views.',
        date: '2025-07-14'
      }
    ],
    photos: [],
    seo: {
      title: 'Carl Schurz Dog Run - Upper East Side Dog Park',
      description: 'Carl Schurz Dog Run offers a separate small dog area with river views. Located at 83rd St & East River.',
      keywords: ['carl schurz dog run', 'upper east side dog park', 'small dog park nyc', 'east river dog park']
    }
  },
  {
    id: 'corlears-hook-dog-run',
    name: 'Corlears Hook Park Dog Run',
    slug: 'corlears-hook-dog-run',
    location: {
      address: 'Corlears Hook Park, Manhattan',
      borough: 'Manhattan',
      coordinates: { lat: 40.7128, lng: -73.9758 }
    },
    status: 'open',
    features: {
      separateAreas: true,
      waterFountain: true,
      shade: true,
      seating: true,
      agilityEquipment: true,
      doubleGates: true,
      wasteBags: true,
      lighting: true
    },
    accessibility: {
      wheelchairAccessible: true,
      pavedPaths: true,
      easyEntry: true
    },
    safety: {
      rating: 4.1,
      separateSmallDogArea: true,
      regularMaintenance: true,
      emergencyContact: true
    },
    hours: {
      open: '6:00 AM',
      close: '10:00 PM',
      extendedHours: false
    },
    crowdLevel: 'moderate',
    reviews: [
      {
        id: '9',
        author: 'Rachel M.',
        rating: 4,
        comment: 'Has separated big and small dog areas and is pretty big. Great for active dogs.',
        date: '2025-07-15'
      },
      {
        id: '10',
        author: 'Chris D.',
        rating: 4,
        comment: 'Spacious park with good separation. Water fountain and shade make it comfortable for both dogs and owners.',
        date: '2025-07-13'
      }
    ],
    photos: [],
    seo: {
      title: 'Corlears Hook Park Dog Run - Spacious Dog Park in Manhattan',
      description: 'Corlears Hook Park Dog Run features separated big and small dog areas with water fountains, shade, and agility equipment.',
      keywords: ['corlears hook dog run', 'manhattan dog park', 'separate dog areas', 'spacious dog park']
    }
  },
  {
    id: 'prospect-park-dog-run',
    name: 'Prospect Park Dog Run',
    slug: 'prospect-park-dog-run',
    location: {
      address: 'Prospect Park, Brooklyn',
      borough: 'Brooklyn',
      coordinates: { lat: 40.6602, lng: -73.9690 }
    },
    status: 'open',
    features: {
      separateAreas: true,
      waterFountain: true,
      shade: true,
      seating: true,
      agilityEquipment: true,
      doubleGates: true,
      wasteBags: true,
      lighting: true
    },
    accessibility: {
      wheelchairAccessible: true,
      pavedPaths: true,
      easyEntry: true
    },
    safety: {
      rating: 4.4,
      separateSmallDogArea: true,
      regularMaintenance: true,
      emergencyContact: true
    },
    hours: {
      open: '6:00 AM',
      close: '10:00 PM',
      extendedHours: false
    },
    crowdLevel: 'busy',
    reviews: [
      {
        id: '11',
        author: 'Emma W.',
        rating: 5,
        comment: 'Best dog park in Brooklyn! Separate areas, water fountains, and lots of space to run.',
        date: '2025-07-17'
      },
      {
        id: '12',
        author: 'James L.',
        rating: 4,
        comment: 'Great community feel. Separate small dog area keeps my little one safe.',
        date: '2025-07-16'
      }
    ],
    photos: [],
    seo: {
      title: 'Prospect Park Dog Run - Best Dog Park in Brooklyn',
      description: 'Prospect Park Dog Run offers separate areas for small and large dogs with water fountains, shade, and agility equipment.',
      keywords: ['prospect park dog run', 'brooklyn dog park', 'nyc dog park', 'separate dog areas']
    }
  },
  {
    id: 'pelham-bay-dog-run',
    name: 'Pelham Bay Dog Run',
    slug: 'pelham-bay-dog-run',
    location: {
      address: 'Pelham Bay Park, Bronx',
      borough: 'Bronx',
      coordinates: { lat: 40.8587, lng: -73.8087 }
    },
    status: 'open',
    features: {
      separateAreas: true,
      waterFountain: true,
      shade: true,
      seating: true,
      agilityEquipment: false,
      doubleGates: true,
      wasteBags: true,
      lighting: true
    },
    accessibility: {
      wheelchairAccessible: true,
      pavedPaths: true,
      easyEntry: true
    },
    safety: {
      rating: 4.0,
      separateSmallDogArea: true,
      regularMaintenance: true,
      emergencyContact: true
    },
    hours: {
      open: '6:00 AM',
      close: '10:00 PM',
      extendedHours: false
    },
    crowdLevel: 'light',
    reviews: [
      {
        id: '13',
        author: 'Mike S.',
        rating: 4,
        comment: 'Two separate play areas and a water fountain available. Great for Bronx dog owners.',
        date: '2025-07-15'
      },
      {
        id: '14',
        author: 'Sarah K.',
        rating: 4,
        comment: 'Peaceful location with good separation between small and large dogs.',
        date: '2025-07-14'
      }
    ],
    photos: [],
    seo: {
      title: 'Pelham Bay Dog Run - Bronx Dog Park',
      description: 'Pelham Bay Dog Run features two separate play areas and water fountains. Perfect for Bronx dog owners.',
      keywords: ['pelham bay dog run', 'bronx dog park', 'nyc dog park', 'separate dog areas']
    }
  },
  {
    id: 'bull-moose-dog-run',
    name: 'Bull Moose Dog Run',
    slug: 'bull-moose-dog-run',
    location: {
      address: 'New York, NY',
      borough: 'Manhattan',
      coordinates: { lat: 40.7589, lng: -73.9851 }
    },
    status: 'open',
    features: {
      separateAreas: true,
      waterFountain: true,
      shade: false,
      seating: true,
      agilityEquipment: false,
      doubleGates: true,
      wasteBags: true,
      lighting: true
    },
    accessibility: {
      wheelchairAccessible: true,
      pavedPaths: true,
      easyEntry: true
    },
    safety: {
      rating: 4.2,
      separateSmallDogArea: true,
      regularMaintenance: true,
      emergencyContact: true
    },
    hours: {
      open: '6:00 AM',
      close: '10:00 PM',
      extendedHours: false
    },
    crowdLevel: 'moderate',
    reviews: [
      {
        id: '15',
        author: 'David R.',
        rating: 4,
        comment: 'There are two areas: a larger one, and a smaller one for small dogs. Good community.',
        date: '2025-07-16'
      },
      {
        id: '16',
        author: 'Anna M.',
        rating: 4,
        comment: 'Convenient location with separate areas. Could use more shade though.',
        date: '2025-07-13'
      }
    ],
    photos: [],
    seo: {
      title: 'Bull Moose Dog Run - Manhattan Dog Park',
      description: 'Bull Moose Dog Run offers two separate areas for large and small dogs with water fountains and seating.',
      keywords: ['bull moose dog run', 'manhattan dog park', 'nyc dog park', 'separate dog areas']
    }
  },
  {
    id: 'gantry-state-dog-run',
    name: 'Gantry State Dog Run',
    slug: 'gantry-state-dog-run',
    location: {
      address: 'Gantry Plaza State Park, Queens',
      borough: 'Queens',
      coordinates: { lat: 40.7505, lng: -73.9634 }
    },
    status: 'open',
    features: {
      separateAreas: true,
      waterFountain: true,
      shade: true,
      seating: true,
      agilityEquipment: true,
      doubleGates: true,
      wasteBags: true,
      lighting: true
    },
    accessibility: {
      wheelchairAccessible: true,
      pavedPaths: true,
      easyEntry: true
    },
    safety: {
      rating: 4.3,
      separateSmallDogArea: true,
      regularMaintenance: true,
      emergencyContact: true
    },
    hours: {
      open: '6:00 AM',
      close: '10:00 PM',
      extendedHours: false
    },
    crowdLevel: 'moderate',
    reviews: [
      {
        id: '17',
        author: 'Lisa T.',
        rating: 5,
        comment: 'Small dogs always seem to have a good time here. Great views of the Manhattan skyline.',
        date: '2025-07-17'
      },
      {
        id: '18',
        author: 'John P.',
        rating: 4,
        comment: 'Beautiful location with separate areas. Water fountain and shade make it comfortable.',
        date: '2025-07-15'
      }
    ],
    photos: [],
    seo: {
      title: 'Gantry State Dog Run - Queens Dog Park with Manhattan Views',
      description: 'Gantry State Dog Run offers separate areas for small and large dogs with beautiful Manhattan skyline views.',
      keywords: ['gantry state dog run', 'queens dog park', 'nyc dog park', 'manhattan skyline views']
    }
  },
  {
    id: 'clove-lakes-dog-run',
    name: 'Clove Lakes Dog Run',
    slug: 'clove-lakes-dog-run',
    location: {
      address: 'Clove Lakes Park, Staten Island',
      borough: 'Staten Island',
      coordinates: { lat: 40.6189, lng: -74.1087 }
    },
    status: 'open',
    features: {
      separateAreas: true,
      waterFountain: true,
      shade: true,
      seating: true,
      agilityEquipment: false,
      doubleGates: true,
      wasteBags: true,
      lighting: true
    },
    accessibility: {
      wheelchairAccessible: true,
      pavedPaths: true,
      easyEntry: true
    },
    safety: {
      rating: 4.1,
      separateSmallDogArea: true,
      regularMaintenance: true,
      emergencyContact: true
    },
    hours: {
      open: '6:00 AM',
      close: '10:00 PM',
      extendedHours: false
    },
    crowdLevel: 'light',
    reviews: [
      {
        id: '19',
        author: 'Robert M.',
        rating: 4,
        comment: 'Peaceful Staten Island dog park with separate areas. Beautiful lake views.',
        date: '2025-07-16'
      },
      {
        id: '20',
        author: 'Patricia L.',
        rating: 4,
        comment: 'Great for small dogs with separate area. Water fountain and shade available.',
        date: '2025-07-14'
      }
    ],
    photos: [],
    seo: {
      title: 'Clove Lakes Dog Run - Staten Island Dog Park',
      description: 'Clove Lakes Dog Run offers separate areas for small and large dogs with beautiful lake views in Staten Island.',
      keywords: ['clove lakes dog run', 'staten island dog park', 'nyc dog park', 'lake views']
    }
  }
];

export const dogParks: DogPark[] = dogParksData.map(park => {
  const photos = allParkPhotos[park.id] || [];
  return { ...park, photos };
}); 